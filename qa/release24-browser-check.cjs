// Isolated local Chromium QA fixtures; touch is emulated, not an Android device.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{
 const root=process.cwd(),errors=[],server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));server.unref();
 const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']});

 fs.mkdirSync('output/qa24',{recursive:true});
 try{
  for(const [width,height]of [[1180,752],[390,844],[844,390]]){
   const context=await browser.newContext({viewport:{width,height},isMobile:width<1000,hasTouch:width<1000,reducedMotion:'no-preference'}),page=await context.newPage();
   page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/output/dualjob-debug.html?debug=1');
   const tap=sel=>width<1000?page.locator(sel).tap():page.locator(sel).click();
   for(const pair of ['chef-warlock','chef-alchemist','accountant-warlock','accountant-alchemist']){
    const committed=[];
    for(const speed of ['normal','fast','minimal']){
     await page.evaluate(pair=>{
      Math.random=()=>0.42;const g=window.__dj;g.meta.tutorialDone=true;g.meta.seenPairs=Object.keys(g.pairs);g.pick(pair);g.newRun();g.chooseNode(0);g.modal='';const s=g.state;s.tutorial=null;
      s.hp=s.maxHp=200;s.energy=10;s.hand=['chop','soul','guard','broth','strike'];s.usedReal=true;s.enemies.forEach(e=>e.hp=e.maxHp=200);g.render();
     },pair);
     await tap('[data-act=battleMenu]');await tap('[data-act=combatSpeed][data-speed="'+speed+'"]');
     assert.equal(await page.locator('[data-act=combatSpeed][data-speed="'+speed+'"]').getAttribute('aria-pressed'),'true');
     if(pair==='chef-warlock'&&speed==='fast')await page.screenshot({path:`output/qa24/menu-${width}x${height}.png`,fullPage:true,animations:'disabled'});
     await tap('.close-x[data-act=closeModal]');await tap('[data-act=selectCard][data-id=soul]');await tap('[data-act=useSelected]');
     if(speed!=='minimal'){
      const geometry=await page.evaluate(()=>{const status=document.querySelector('.combat-status'),intent=document.querySelector('.enemy-intent');if(!status)return null;const a=status.getBoundingClientRect(),b=intent.getBoundingClientRect();return {inside:a.left>=0&&a.right<=innerWidth+1&&a.top>=0&&a.bottom<=innerHeight+1,overlap:a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top}});
      assert(geometry&&geometry.inside&&!geometry.overlap,'feedback hides intent');
      await page.locator('.combat-playing').waitFor({state:'detached'});
     }else assert.equal(await page.locator('.combat-playing,.combat-dual-notice').count(),0);
     committed.push(await page.evaluate(()=>JSON.stringify(window.__dj.state)));
     await page.reload();await tap('[data-act=resume]');
     assert.equal(await page.evaluate(()=>window.__dj.currentSavePacket().settings.combatSpeed),speed);
     assert.equal(await page.evaluate(()=>window.__dj.state.actionLog[0].label),'영혼 거래 사용');
     await tap('[data-act=battleMenu]');await tap('[data-act=log]');
     assert((await page.locator('.log-group[open]').innerText()).includes('에너지 0 소비'));
     if(pair==='chef-warlock'&&speed==='fast')await page.screenshot({path:`output/qa24/log-${width}x${height}.png`,fullPage:true,animations:'disabled'});
     await tap('.close-x[data-act=closeModal]');
     await page.evaluate(()=>{const g=window.__dj,s=g.state;s.stage=8;s.nodeType='boss';s.trainingId=g.trainingOptions()[0];s.relics=['dualContract','overtimeClock'];s.upgrades[s.deck[0]]=true;s.enemies.forEach(e=>e.hp=0);g.victory()});
     assert((await page.locator('.run-build').innerText()).includes('이중계약서'));
     assert.equal(await page.locator('.retry-goal b').count(),1);
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow');
     if(pair==='chef-warlock'&&speed==='fast')await page.screenshot({path:`output/qa24/result-${width}x${height}.png`,fullPage:true,animations:'disabled'});
     await tap('[data-act=retrySame]');assert.equal(await page.evaluate(()=>window.__dj.keyPair()),pair);assert.equal(await page.evaluate(()=>window.__dj.state.trainingId),null);
     console.log(`PASS ${width}x${height} ${pair} ${speed}: feedback, reload, grouped log, result, retry`);
    }
    assert.equal(new Set(committed).size,1,'speed changes state');
   }
   await page.emulateMedia({reducedMotion:'reduce'});await tap('[data-act=battleMenu]');await tap('[data-act=combatSpeed][data-speed=fast]');assert((await page.locator('.combat-speed').innerText()).includes('우선 적용'));
   const style=await page.locator('.combat-speed .btn').first().evaluate(el=>getComputedStyle(el).animationName);assert.equal(style,'none');
   await context.close();
  }
  assert.deepEqual(errors,[]);console.log('PASS no browser page errors; emulated touch only');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
