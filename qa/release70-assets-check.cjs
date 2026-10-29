// Asset byte checks and real Chromium rendering; not physical-device QA.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),sharp=require('sharp'),{chromium}=require('playwright');
(async()=>{
 const manifest=JSON.parse(fs.readFileSync('docs/art-production-v070.json'));
 assert.equal(manifest.assets.length,14);assert.equal(new Set(manifest.assets.map(a=>a.sha256)).size,14);
 for(const a of manifest.assets){const b=fs.readFileSync('src/'+a.file),m=await sharp(b).metadata(),stats=await sharp(b).stats();assert.equal(b.length,a.byte_size);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),a.sha256);assert.equal(m.width,a.width);assert.equal(m.height,a.height);assert(m.hasAlpha);assert.equal(stats.channels[3].min,0);assert.equal(stats.channels[3].max,255)}
 const root=process.cwd(),errors=[],requests=[];
 const debug=fs.readFileSync('output/dualjob-debug.html','utf8').replace('window.__dj={','window.__dj={CARD_ART,RELIC_ART,UI_PORTRAITS,enemyPortrait,renderCard,relicTile,');
 const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname==='/art-debug.html'){res.setHeader('Content-Type','text/html');return res.end(debug)}const file=path.resolve(root,'.'+url.pathname);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();try{res.setHeader('Content-Type',file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.woff2')?'font/woff2':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));server.unref();const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
 const page=await browser.newPage({viewport:{width:1050,height:900}});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url()+' '+r.status());if(r.url().endsWith('.woff2'))requests.push(r.url())});
 await page.goto(origin+'/dist/index.html');
 for(const font of ['400 16px "DJ Pretendard"','700 16px "DJ Pretendard"','700 16px "DJ Gmarket"'])assert.equal(await page.evaluate(async font=>(await document.fonts.load(font,'겸직금지 담보 숙성')).length,font),1);
 assert.equal(new Set(requests).size,3);
 await page.goto(origin+'/art-debug.html?debug=1');
 const mapping=await page.evaluate(assets=>{const g=window.__dj;return assets.map(a=>{const ref=a.kind==='card'?g.CARD_ART[a.content_id]:a.kind==='relic'?g.RELIC_ART[a.content_id]:g.UI_PORTRAITS[a.id];return {id:a.id,embedded:ref.startsWith('data:image/webp;base64,'),name:a.kind==='card'?g.cards[a.content_id].name:a.kind==='relic'?g.relics[a.content_id].name:a.content_id==='stock-audit'?'재고 감사관':'겸직 심사관',ref}})},manifest.assets);
 assert(mapping.every(a=>a.embedded));assert.equal(new Set(mapping.map(a=>a.ref)).size,14);
 const cardIds=manifest.assets.filter(a=>a.kind==='card').map(a=>a.content_id),relicIds=manifest.assets.filter(a=>a.kind==='relic').map(a=>a.content_id);
 for(const [width,height]of [[1180,752],[390,844],[320,568],[844,390]]){
  await page.setViewportSize({width,height});
  await page.evaluate(({cardIds,relicIds})=>{const g=window.__dj;g.meta.tutorialDone=true;g.meta.seenPairs=Object.keys(g.pairs);g.pick('accountant-warlock');g.newRun();g.modal='';g.state.stage=9;g.state.trainingId='posthumous';g.chooseNode(1);g.modal='';const e=g.state.enemies[0];g.state.enemies=['stock-audit','cross-exam'].map((variant,i)=>({...e,id:'wraith',variant,name:i?'겸직 심사관':'재고 감사관',hp:40,maxHp:40}));g.state.enemies.forEach(e=>g.chooseIntent(e));g.state.hand=cardIds;g.state.relics=relicIds;g.render()},{cardIds,relicIds});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('[data-asset="enemy_stock-audit"]').count(),1);assert.equal(await page.locator('[data-asset="enemy_cross-exam"]').count(),1);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert((await page.locator('.card-name').first().evaluate(e=>getComputedStyle(e).fontFamily)).includes('DJ Pretendard'));
  assert(await page.evaluate(()=>[...document.querySelectorAll('img.card-art')].every(e=>e.complete&&e.naturalWidth===384)));
  await page.screenshot({path:`output/qa70/art-battle-${width}x${height}.png`,fullPage:true,animations:'disabled'});
  const before=await page.evaluate(()=>JSON.stringify(window.__dj.state));await page.locator('[data-act=battleMenu]').first().click();await page.locator('.modal [data-act=relics]').click();assert.equal(await page.locator('.modal .relic-art').count(),8);assert.equal(await page.locator('.owned-relics .relic-tile').first().evaluate(e=>getComputedStyle(e).opacity),'1');assert((await page.locator('.modal').innerText()).includes('8/15'));assert.equal(await page.evaluate(()=>JSON.stringify(window.__dj.state)),before);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(width===390)await page.screenshot({path:'output/qa70/art-relics-390.png',fullPage:true,animations:'disabled'});
  await page.evaluate(()=>{const g=window.__dj;delete g.state.campaignId;g.state.stage=8;g.render()});assert((await page.locator('.modal').innerText()).includes('8/12'));
  console.log(`PASS ${width}x${height}: distinct enemy portraits, card art, small-label font, relic preview purity, 15/12 counts, no overflow`);
 }
 await page.setViewportSize({width:1050,height:1000});
 const names=Object.fromEntries(mapping.map(a=>[a.id,a.name]));
 const tiles=manifest.assets.map(a=>`<article><div class="large ${a.kind}"><img src="../src/${a.file}" alt="${names[a.id]}"/></div><strong>${names[a.id]}</strong><div class="small ${a.kind}"><img src="../src/${a.file}" alt=""/></div><small>${a.kind==='card'?'112px':'48px'} 검수 · ${(a.byte_size/1024).toFixed(1)} KiB</small></article>`).join('');
 const board=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>겸직금지 0.7 신규 에셋</title><style>@font-face{font-family:DJ;src:url(../src/assets/pretendard-bold.woff2)}*{box-sizing:border-box}body{margin:0;padding:24px;background:#141422;color:#f2dfbb;font:16px DJ,sans-serif}h1{font-size:23px;margin:0 0 8px}p{color:#beb2ca;margin:0 0 20px;font-size:13px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}article{padding:12px;border-radius:14px;background:#2d263f;text-align:center}strong,small{display:block}strong{font-size:15px;margin:10px 0}.large{height:140px;display:flex;justify-content:center;align-items:center}.large img{max-width:100%;max-height:140px}.small{height:60px;display:flex;justify-content:center;align-items:center;background:#1a1828;border-radius:8px}.small img{width:48px;height:48px;object-fit:contain}.small.card img{width:112px;height:auto}small{font-size:10px;color:#b9afc9;margin-top:8px}</style><h1>겸직금지! 0.7 · 신규 에셋 14종</h1><p>융합 카드 4 · 유물 8 · 후반 적 2 / 하단은 작은 UI 크기 검수 / 로컬 후보, 미배포</p><div class="grid">${tiles}</div></html>`;
 fs.writeFileSync('docs/art-review-v070.html',board);await page.goto(origin+'/docs/art-review-v070.html');await page.evaluate(()=>document.fonts.ready);await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>i.decode()))});await page.screenshot({path:'docs/art-review-v070.png',fullPage:true,animations:'disabled'});
 assert.deepEqual(errors,[]);console.log('PASS 14 unique byte hashes, dimensions/alpha, embedded runtime paths, hosted WOFF2 loading, review board. Browser emulation only.');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
