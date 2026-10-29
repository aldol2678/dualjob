// Local Chromium with emulated touch. No player saves or production changes.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{
 const root=process.cwd(),errors=[],server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));server.unref();const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']});fs.mkdirSync('output/qa70',{recursive:true});
 try{
 for(const [width,height]of [[1180,752],[390,844],[320,568],[844,390]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<1000,hasTouch:width<1000,reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/output/dualjob-debug.html?debug=1');
  const tap=sel=>width<1000?page.locator(sel).tap():page.locator(sel).click();
  for(const pair of ['accountant-warlock','accountant-alchemist','chef-warlock','chef-alchemist']){
   await page.evaluate(pair=>{const g=window.__dj;Math.random=()=>0.42;g.meta.tutorialDone=true;g.meta.seenPairs=Object.keys(g.pairs);g.pick(pair);g.newRun();g.modal='';g.state.stage=8;g.state.trainingId=g.trainingOptions()[0];g.render()},pair);
   assert.equal(await page.locator('.route-overview-row').count(),12);assert((await page.locator('.flow-kicker').innerText()).includes('9/12'));
   await tap('[data-act=selectJourneyRoute][data-index="0"]');await tap('[data-act=goJourneyRoute]');await tap('[data-act=supplyFocus][data-family=fusion]');assert.equal(await page.locator('.journey-rewards>.card').count(),2);
   const candidates=await page.evaluate(()=>JSON.stringify(window.__dj.state.supplyOffers));await page.reload();await tap('[data-act=resume]');assert.equal(await page.evaluate(()=>JSON.stringify(window.__dj.state.supplyOffers)),candidates);assert.equal(await page.locator('[data-family=fusion]').getAttribute('aria-pressed'),'true');
   await tap('[data-act=selectJourneyReward][data-index="0"]');assert((await page.locator('.reward-copy').innerText()).includes('획득 후'));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'supply horizontal overflow');
   if(pair==='chef-alchemist')await page.screenshot({path:`output/qa70/supply-${width}x${height}.png`,fullPage:true,animations:'disabled'});
   await tap('[data-act=takeJourneyReward]');assert.equal(await page.evaluate(()=>window.__dj.state.stage),9);
   await tap('[data-act=selectJourneyRoute][data-index="0"]');await tap('[data-act=goJourneyRoute]');
   await page.evaluate(()=>{const g=window.__dj,s=g.state;s.energy=10;s.hp=s.maxHp=150;s.ingredient=s.reagent=3;s.hand=g.allCardKeys().filter(k=>g.cards[k].release===7).slice(0,5);g.render()});
   assert(await page.locator('.enemy-intent').count()>0);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'battle overflow');
   if(pair==='chef-alchemist')await page.screenshot({path:`output/qa70/battle-${width}x${height}.png`,fullPage:true,animations:'disabled'});
   await tap('[data-act=selectCard][data-index="0"]');
   const self=await page.evaluate(()=>window.__dj.targetMode(window.__dj.state.hand[0])==='self');await tap(self?'[data-act=targetSelf]':'[data-act=targetEnemy][data-index="0"], [data-act=targetEnemy][data-target="0"]');assert.equal(await page.evaluate(()=>window.__dj.state.cardsPlayed),1);
   await page.evaluate(()=>{const g=window.__dj,s=g.state;s.stage=11;s.phase='map';s.nodeType=null;g.save();g.render()});await page.reload();await tap('[data-act=resume]');assert((await page.locator('.flow-kicker').innerText()).includes('12/12'));
   await tap('[data-act=selectJourneyRoute][data-index="0"]');await tap('[data-act=goJourneyRoute]');assert.equal(await page.evaluate(()=>window.__dj.state.nodeType),'boss');
   // Existing saves keep nine rooms and old boss placement.
   await page.evaluate(()=>{const g=window.__dj,s=g.state;delete s.campaignId;s.stage=8;s.phase='map';s.actionLog=[];g.save();g.render()});await page.reload();await tap('[data-act=resume]');assert((await page.locator('.flow-kicker').innerText()).includes('9/9'));
   console.log(`PASS ${width}x${height} ${pair}: supply compare/reload/take, late battle card, 12-zone boss, classic resume`);
  }
  await context.close();
 }
 assert.deepEqual(errors,[]);console.log('PASS all 16 browser journeys; no page errors. Touch emulation, not physical Android/iOS.');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
