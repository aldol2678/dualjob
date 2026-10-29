// Isolated local Chromium QA fixtures; touch is emulated, not an Android device.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{
 const root=process.cwd(),errors=[],server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));server.unref();
 const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']});
 fs.mkdirSync('output/qa23',{recursive:true});
 try{
  for(const [width,height]of [[1180,752],[390,844],[844,390]]){
   const context=await browser.newContext({viewport:{width,height},isMobile:width<1000,hasTouch:width<1000,reducedMotion:'reduce'}),page=await context.newPage();
   page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/output/dualjob-debug.html?debug=1');
   const tap=sel=>width<1000?page.locator(sel).tap():page.locator(sel).click();
   for(const pair of ['chef-warlock','chef-alchemist','accountant-warlock','accountant-alchemist']){
    const id=await page.evaluate(pair=>{
     const g=window.__dj;g.meta.tutorialDone=true;g.pick(pair);g.newRun();g.chooseNode(0);g.modal='';const s=g.state,id=s.real==='chef'?'taste':'receipt';
     s.tutorial=null;s.deck=[id,...s.deck.filter(k=>k!==id).slice(0,4)];s.hand=[...s.deck];s.drawPile=[];s.discard=[];g.render();return id;
    },pair);
    await tap(`[data-act=selectCard][data-id="${id}"]`);
    await tap(id==='receipt'?'[data-act=targetEnemy][data-index="0"]':'[data-act=useSelected]');
    assert.equal(await page.locator(`[data-act=selectCard][data-id="${id}"]`).count(),0);
    await page.reload();await tap('[data-act=resume]');
    const brief=page.getByRole('button',{name:'확인, 전투 시작',exact:true});if(await brief.isVisible())await brief.click();
    assert.equal(await page.evaluate(id=>window.__dj.state.turnDiscard[id],id),1);
    await tap('[data-act=endTurn]');assert.equal(await page.locator(`[data-act=selectCard][data-id="${id}"]`).count(),1);
    await page.evaluate(()=>{
     const g=window.__dj,s=g.state;s.stage=8;s.nodeType='boss';s.trainingId=g.trainingOptions()[0];g.spawnEnemy();g.modal='';s.tutorial=null;
     s.hp=s.maxHp=500;s.enemies[0].hp=51;s.enemies.slice(1).forEach(e=>e.hp=0);s.hand=['strike'];s.drawPile=[];s.discard=[];g.render();
    });
    await tap('[data-act=selectCard][data-id=strike]');await tap('[data-act=targetEnemy][data-index="0"]');
    assert((await page.locator('.boss-phase').innerText()).includes('현재 예고는 유지'));
    await tap('[data-act=endTurn]');assert((await page.locator('.boss-phase').innerText()).includes('이번 턴 겸직 적발'));
    const fits=await page.evaluate(()=>[...document.querySelectorAll('.boss-phase,.enemy-intent,.energy-meter,.end-turn-btn')].every(el=>{const r=el.getBoundingClientRect();return r.left>=-1&&r.top>=-1&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1}));assert(fits);
    if(pair==='chef-warlock')await page.screenshot({path:`output/qa23/verdict-${width}x${height}.png`,fullPage:true});
    console.log(`PASS ${width}x${height} ${pair}: cycle, saved lock, next-turn release, boss warning and layout`);
   }
   await context.close();
  }
  assert.deepEqual(errors,[]);console.log('PASS no browser page errors');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
