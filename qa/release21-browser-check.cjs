// Optional browser QA: install playwright and its Chromium, or set CHROMIUM_PATH.
const assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path'),{chromium}=require('playwright');
(async()=>{
 const root=process.cwd();const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}if(file.endsWith(path.sep))file+='index.html';try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}});await new Promise(r=>server.listen(0,'127.0.0.1',r));server.unref();const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
 fs.mkdirSync('output/qa21',{recursive:true});const errors=[];
 for(const [width,height] of [[320,568],[360,640],[390,844],[430,932],[1280,800]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<500,reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/output/dualjob-debug.html?debug=1');
  await page.evaluate(()=>{const g=window.__dj;g.meta.tutorialDone=true;g.pick('chef-warlock');g.newRun();g.modal='';g.state.stage=2;g.nextStage()});
  assert(await page.locator('[data-act=confirmTraining]').isDisabled());
  const tap=async(selector)=>width<500?page.locator(selector).tap():page.locator(selector).click();
  const snapshot=await page.evaluate(()=>JSON.stringify(window.__dj.state));
  await tap('[data-id=fermentation]');await tap('[data-id=furnace]');
  assert.equal(await page.evaluate(()=>JSON.stringify(window.__dj.state)),snapshot);
  const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('.training-option,.training-dock .btn')].map(x=>{const r=x.getBoundingClientRect();return {w:r.width,h:r.height}})}));
  assert(layout.scroll<=layout.width+1,JSON.stringify(layout));assert(layout.buttons.every(b=>b.h>=48&&b.w>=44));
  await page.screenshot({path:`output/qa21/training-${width}.png`,fullPage:true});
  await tap('[data-act=confirmTraining]');assert.equal(await page.evaluate(()=>window.__dj.state.trainingId),'furnace');
  await page.evaluate(()=>{const g=window.__dj;g.state.gold=100;g.chooseNode(1);g.render()});
  await tap('[data-act=previewShopRelic][data-index="0"]');await tap('[data-act=confirmPending]');
  assert.equal(await page.evaluate(()=>window.__dj.state.relics.length),1);
  await page.evaluate(()=>{const g=window.__dj;g.nextStage();g.chooseNode(1);g.modal='';g.render();g.save()});
  await page.screenshot({path:`output/qa21/battle-${width}.png`,fullPage:true});
  {
   const box=await page.locator('.training-location').boundingBox();assert(box&&box.height>=44&&box.width>=44);
   await tap('.training-location');assert(await page.locator('.modal').innerText().then(t=>t.includes('지옥 화덕')));await tap('.close-x');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  }
  await page.reload();await tap('[data-act=resume]');assert.equal(await page.evaluate(()=>window.__dj.state.trainingId),'furnace');assert.equal(await page.evaluate(()=>window.__dj.state.phase),'battle');
  console.log(`PASS Chromium ${width}x${height}: select, confirm, purchase, battle, info, reload`);await context.close();
 }
 const page=await browser.newPage();await page.goto(origin+'/dist/');assert.equal(await page.evaluate(()=>typeof window.__dj),'undefined');await page.close();assert.deepEqual(errors,[]);await browser.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});
