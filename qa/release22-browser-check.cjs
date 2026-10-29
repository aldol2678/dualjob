// Local test browser only. Fixtures never ship in dist; touch here is emulated.
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path'),{chromium}=require('playwright');
(async()=>{
 const root=process.cwd(),errors=[];
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));server.unref();
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
 fs.mkdirSync('output/qa22',{recursive:true});
 try{
 for(const [width,height] of [[1180,752],[390,844],[844,390]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<1000,hasTouch:width<1000,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/output/dualjob-debug.html?debug=1');
  for(const pair of ['chef-warlock','accountant-warlock','accountant-alchemist','chef-alchemist']){
   await page.evaluate(pair=>{const g=window.__dj;g.pick(pair);g.meta.tutorialDone=true;g.newRun();g.chooseNode(0);g.modal='';const s=g.state;s.tutorial=null;s.hp=40;s.energy=10;s.hand=[...new Set(s.deck)];s.upgrades=Object.fromEntries(s.hand.map(id=>[id,true]));g.render()},pair);
   const tap=async(sel)=>width<1000?page.locator(sel).tap():page.locator(sel).click();
   const attack=await page.evaluate(()=>window.__dj.state.hand.findIndex(id=>window.__dj.targetMode(id)==='enemy'));
   await tap(`[data-act=selectCard][data-index="${attack}"]`);
   const layout=await page.evaluate(()=>{
    const box=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,b:r.bottom,right:r.right}};
    return {width:innerWidth,height:innerHeight,scroll:document.documentElement.scrollWidth,items:[...document.querySelectorAll('.enemy-intent,.energy-meter,.mb-selection,.end-turn-btn,.selected-card .card-name')].map(el=>({text:el.textContent.trim(),...box(el)}))};
   });
   assert(layout.scroll<=width+1,JSON.stringify(layout));
   assert(layout.items.every(r=>r.x>=-1&&r.y>=-1&&r.right<=width+1&&r.b<=height+1),JSON.stringify(layout));
   const before=await page.evaluate(()=>window.__dj.state.energy);
   await tap('[data-act=targetSelf]');assert.equal(await page.evaluate(()=>window.__dj.state.energy),before);
   await tap('[data-act=targetEnemy][data-index="0"]');assert(await page.evaluate(()=>window.__dj.state.cardsPlayed===1));
   await tap('[data-act=targetEnemy][data-index="0"]');assert.equal(await page.evaluate(()=>window.__dj.state.cardsPlayed),1);
   const self=await page.evaluate(()=>window.__dj.state.hand.findIndex(id=>window.__dj.targetMode(id)==='self'));
   await tap(`[data-act=selectCard][data-index="${self}"]`);await tap('[data-act=cancelSelection]');
   await tap(`[data-act=selectCard][data-index="${self}"]`);await tap('[data-act=useSelected]');
   assert.equal(await page.evaluate(()=>window.__dj.state.cardsPlayed),2);
   await tap('[data-act=endTurn]');assert.equal(await page.evaluate(()=>window.__dj.state.turn),2);
   const saved=await page.evaluate(()=>JSON.stringify(window.__dj.state));
   await page.reload();await tap('[data-act=resume]');
   assert.equal(await page.evaluate(()=>window.__dj.state.turn),2);
   assert.equal(await page.evaluate(()=>window.__dj.state.enemiesDefeated),JSON.parse(saved).enemiesDefeated);
   // A ten-card boss fixture checks the most crowded combat UI.
   await page.evaluate(()=>{const g=window.__dj,s=g.state;s.stage=8;s.nodeType='boss';g.spawnEnemy();s.bossPhase=2;s.hand=Array(10).fill(g.pairs[g.keyPair()].sig);s.energy=3;g.modal='';g.render()});
   await tap('[data-act=selectCard][data-index="0"]');
   const crowded=await page.evaluate(()=>[...document.querySelectorAll('.enemy-intent,.energy-meter,.mb-selection,.selected-card .card-name,.boss-phase')].map(el=>{const r=el.getBoundingClientRect();return {text:el.textContent.trim(),top:r.top,bottom:r.bottom,right:r.right,left:r.left}}));
   assert(crowded.every(r=>r.top>=-1&&r.bottom<=height+1&&r.left>=-1&&r.right<=width+1),JSON.stringify(crowded));
   if(pair==='chef-alchemist')await page.screenshot({path:`output/qa22/battle-${width}x${height}.png`,fullPage:true});
   console.log(`PASS Chromium ${width}x${height} ${pair}: layout, target, self, cancel, single execution, turn, reload, boss/10 cards`);
  }
  await context.close();
 }
 const page=await browser.newPage();await page.goto(origin+'/dist/index.html');assert.equal(await page.evaluate(()=>typeof window.__dj),'undefined');
 assert.deepEqual(errors,[]);console.log('PASS production has no debug hook; no page errors');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
