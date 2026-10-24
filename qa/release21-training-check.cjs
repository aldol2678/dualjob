// New-run training, economics, preview and persistence contracts; local QA only.
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot(packet){return new JSDOM(html,{url:'https://training.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.innerWidth=390;w.innerHeight=844;w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});if(packet)w.localStorage.setItem('dualJobSave_v1',packet)}})}
const dom=boot(),w=dom.window,g=w.__dj,d=w.document;assert(g);g.meta.tutorialDone=true;
const clone=x=>JSON.parse(JSON.stringify(x));let checks=0;
function check(name,fn){fn();checks++;console.log('PASS',name)}
function start(pair='chef-warlock'){w.__djFast=true;g.pick(pair);g.newRun();g.modal='';g.state.tutorial=null;return g.state}
function train(id){const s=start(g.TRAINING[id].pair);s.stage=2;s.phase='rest';g.restAction('heal');assert.equal(s.phase,'training');assert(g.chooseTraining(id));return s}
function battle(id){const s=train(id);s.stage=4;s.nodeType='battle';g.spawnEnemy();s.hp=40;s.energy=30;s.dualTurnUsed=true;s.hand=[];s.ingredient=0;s.reagent=0;for(const e of s.enemies){e.hp=e.maxHp=200;e.block=e.debt=e.curse=0;e.intent={type:'attack',amount:5}}return s}
const stateFields=s=>clone(Object.fromEntries(['hp','block','energy','ingredient','reagent','trainingTurn','enemies','usedReal','usedFantasy','synergies'].map(k=>[k,s[k]])));
function play(id,target=0){
 const s=g.state;s.hand=[id];const before=JSON.stringify(s),storage=w.localStorage.getItem(g.saveSlot),random=w.Math.random;
 w.Math.random=()=>0.25;const p=g.projectSelection(0,target);assert.equal(JSON.stringify(s),before,'preview mutated live run');assert.equal(w.localStorage.getItem(g.saveSlot),storage,'preview wrote storage');
 w.Math.random=()=>0.25;g.playCard(0,target);w.Math.random=random;assert.deepEqual(stateFields(s),stateFields(p.after),'projection/execution mismatch: '+id);return p;
}
check('all eight courses: stage-three rest/reward/elite completion gates once; choices are job-scoped',()=>{
 for(const id of Object.keys(g.TRAINING)){
  const s=train(id);assert.equal(s.stage,3);assert.equal(s.phase,'map');assert.equal(s.trainingId,id);assert(!g.chooseTraining(id));assert.equal(g.trainingOptions().length,2);
 }
 for(const phase of ['reward','relicReward']){const s=start();s.stage=2;s.phase=phase;s.rewardOptions=phase==='reward'?['chop']:['manaAmp'];if(phase==='reward')g.pickReward(0);else g.pickRelic(0);assert.equal(s.phase,'training');assert.equal(s.stage,3);const before=JSON.stringify(s);g.chooseNode(1);assert.equal(JSON.stringify(s),before);assert(!g.chooseTraining('enforcement'));}
});
check('selection/switch/cancel is read-only; confirm applies once and stale selection cannot affect a new run',()=>{
 let s=start();s.stage=2;g.nextStage();w.__djFast=false;g.render();g.save();const before=JSON.stringify(s),saved=w.localStorage.getItem(g.saveSlot);
 assert(d.querySelector('[data-act=confirmTraining]').disabled);assert.equal(d.querySelectorAll('.training-option').length,2);
 d.querySelector('[data-id=fermentation]').click();d.querySelector('[data-id=furnace]').click();assert.equal(JSON.stringify(s),before);assert.equal(w.localStorage.getItem(g.saveSlot),saved);
 const btn=d.querySelector('[data-act=confirmTraining]');btn.click();assert.equal(s.trainingId,'furnace');assert.equal(s.phase,'map');d.querySelector('#app').appendChild(btn);btn.click();assert.equal(s.trainingId,'furnace');btn.remove();
 s=start();s.stage=2;g.nextStage();w.__djFast=false;g.render();d.querySelector('[data-id=furnace]').click();start();s=g.state;s.stage=2;g.nextStage();w.__djFast=false;g.render();assert(d.querySelector('[data-act=confirmTraining]').disabled);
});
check('enforcement: +4 cap, kill transfer, survivor refund, no-spend does not use trigger',()=>{
 let s=battle('enforcement');s.enemies[0].debt=2;s.enemies[0].hp=15;play('collect');assert.equal(s.enemies[0].hp,0);assert.equal(s.enemies[1].debt,2);assert(s.trainingTurn.used);
 s.enemies[1].debt=2;const hp=s.enemies[1].hp;play('collect',1);assert.equal(hp-s.enemies[1].hp,11);
 s=battle('enforcement');play('collect');assert(!s.trainingTurn.used);s.enemies[0].debt=4;s.relics=['ledgerBeyond'];play('collect');assert.equal(s.enemies[0].hp,174);assert.equal(s.enemies[0].debt,2);assert(s.trainingTurn.used);
});
check('posthumous: highest-debt tie uses leftmost, consumes one, buffs before damage, forecast is pure',()=>{
 const s=battle('posthumous');s.enemies[0].debt=3;s.enemies[1].debt=3;s.enemies[0].curse=s.enemies[1].curse=1;s.enemies[0].hp=4;const before=JSON.stringify(s),hp=s.hp;
 const forecast=g.turnForecast(s);assert.equal(JSON.stringify(s),before);assert.equal(forecast.trainingBlock,4);g.endTurn();assert.equal(s.enemies[0].hp,0);assert.equal(s.enemies[0].debt,2);assert.equal(s.enemies[1].debt,3);assert.equal(hp-s.hp,forecast.net);assert(!s.trainingTurn.used);
});
check('cashflow: refund once before/after kill; self-target follows highest HP; capped resources',()=>{
 let s=battle('cashflow');s.reagent=2;play('blast');assert.equal(s.reagent,1);assert.equal(s.enemies[0].debt,1);play('blast');assert.equal(s.reagent,0);assert.equal(s.enemies[0].debt,1);
 s=battle('cashflow');s.reagent=2;s.enemies[0].hp=10;play('blast');assert.equal(s.enemies[1].debt,1);
 s=battle('cashflow');s.reagent=2;s.enemies[2].hp=300;s.enemies[2].maxHp=300;play('elixir');assert.equal(s.enemies[2].debt,1);assert.equal(s.reagent,1);
 s=battle('cashflow');play('blast');assert(!s.trainingTurn.used);
});
check('investment: 3 reagent threshold; ends with 2, +5 defense, deterministic highest-HP debt',()=>{
 const s=battle('investment');s.reagent=3;s.enemies[1].hp=s.enemies[1].maxHp=250;const hp=s.hp,f=g.turnForecast(s);assert.equal(f.trainingBlock,5);g.endTurn();assert.equal(s.reagent,2);assert.equal(s.enemies[1].debt,2);assert.equal(hp-s.hp,f.net);
 assert.equal(g.turnForecast(s).trainingBlock,0);
});
check('fermentation: every survivor, single survivor +2; infinitePot refund does not hide spending',()=>{
 let s=battle('fermentation');s.ingredient=2;s.relics=['infinitePot'];play('lunch');assert.equal(s.ingredient,2);assert(s.enemies.every(e=>e.curse===1));play('lunch');assert(s.enemies.every(e=>e.curse===1));
 s=battle('fermentation');s.enemies[1].hp=s.enemies[2].hp=0;s.ingredient=2;play('lunch');assert.equal(s.enemies[0].curse,2);
 s=battle('fermentation');play('lunch');assert(!s.trainingTurn.used);
});
check('furnace: 28/1 base signature; upgrades apply once; AoE primary only; healing cards do not consume trigger',()=>{
 let s=battle('furnace');s.ingredient=3;const p=play('infernalMenu');assert.equal(p.records.find(r=>r.k==='dmg').raw,28);assert.equal(s.hp,41);
 s=battle('furnace');s.ingredient=3;s.upgrades.infernalMenu=true;play('infernalMenu');assert.equal(s.enemies[0].hp,169);assert.equal(s.hp,43);
 s=battle('furnace');s.ingredient=2;play('spiceStorm',1);assert.deepEqual(s.enemies.map(e=>200-e.hp).join(','),'11,15,11');
 s=battle('furnace');s.ingredient=2;play('lunch');assert(!s.trainingTurn.used);assert.equal(s.hp,48);
});
check('furnace: ravenFeather relic heal is not penalized; last-enemy victory preserves correct heal',()=>{
 const s=battle('furnace');s.relics=['ravenFeather'];s.enemies[0].curse=1;s.enemies[0].hp=10;s.enemies[1].hp=s.enemies[2].hp=0;s.ingredient=3;play('infernalMenu');assert.equal(s.hp,45);assert.equal(s.phase,'reward');
});
check('course: consecutive family order only, neutral breaks, one flat block, one fusion boost, expires',()=>{
 let s=battle('course');play('taste');play('guard');play('extract');assert(!s.trainingTurn.used);play('taste');assert(s.trainingTurn.used);assert(s.trainingTurn.fusionReady);assert.equal(s.block,13);
 s.ingredient=s.reagent=2;play('grandFeast');assert.equal(s.enemies[0].hp,175);assert(!s.trainingTurn.fusionReady);s.ingredient=s.reagent=2;play('grandFeast');assert.equal(s.enemies[0].hp,154);
 s=battle('course');s.upgrades.extract=true;play('taste');play('extract');assert.equal(s.block,4);g.endTurn();assert.deepEqual(clone(s.trainingTurn),{used:false,lastFamily:null,fusionReady:false});
});
check('molecular: ingredient-only/reagent-only/both; actual spending wins over card label and refunds',()=>{
 let s=battle('molecular');s.ingredient=2;s.relics=['infinitePot'];play('lunch');assert.equal(s.ingredient,2);assert.equal(s.reagent,1);play('blast');assert.equal(s.ingredient,2);
 s=battle('molecular');s.reagent=2;play('blast');assert.equal(s.ingredient,1);
 s=battle('molecular');s.ingredient=s.reagent=2;play('grandFeast');assert.equal(s.block,4);assert.equal(s.ingredient+s.reagent,0);
 s=battle('molecular');s.ingredient=2;play('grandFeast');assert.equal(s.reagent,1);assert.equal(s.block,0);
 s=battle('molecular');play('grandFeast');assert(!s.trainingTurn.used);
});
check('normal auto dual and dualContract stack once with course; no additional energy/draw from training',()=>{
 const s=battle('course');s.dualTurnUsed=false;s.relics=['dualContract'];s.energy=3;s.hand=['taste','extract'];g.playCard(0);g.playCard(0);assert.equal(s.synergies,1);assert.equal(s.energy,4);assert.equal(s.block,4);assert(s.trainingTurn.fusionReady);
});
check('all eight courses reload mid-battle without resetting used flag or fusion readiness',()=>{
 for(const id of Object.keys(g.TRAINING)){
  const s=battle(id);s.trainingTurn.used=true;if(id==='course'){s.trainingTurn.fusionReady=true;s.trainingTurn.lastFamily='fantasy'}
  w.__djFast=false;g.save();const packet=w.localStorage.getItem(g.saveSlot),r=boot(packet);r.window.document.querySelector('[data-act=resume]').click();
  assert.equal(r.window.__dj.state.trainingId,id);assert.deepEqual(clone(r.window.__dj.state.trainingTurn),clone(s.trainingTurn));r.window.close();
  const parsed=g.parseBackup(g.backupText());assert.deepEqual(clone(parsed.run.trainingTurn),clone(s.trainingTurn));
 }
});
check('pending training reload; malformed new fields reject backup without altering live state',()=>{
 const s=start();s.stage=2;g.nextStage();w.__djFast=false;g.save();const r=boot(w.localStorage.getItem(g.saveSlot));r.window.document.querySelector('[data-act=resume]').click();assert.equal(r.window.__dj.state.phase,'training');assert.equal(r.window.document.querySelectorAll('.training-option').length,2);r.window.close();
 const packet=JSON.parse(g.backupText()),before=JSON.stringify(s);
 for(const mutate of [p=>p.run.trainingId='enforcement',p=>delete p.run.trainingTurn,p=>p.run.trainingTurn.used='false',p=>p.run.contentRevision=999]){const q=clone(packet);mutate(q);assert.throws(()=>g.parseBackup(JSON.stringify(q)));}
 assert.equal(JSON.stringify(s),before);
});
check('old revision remains legacy on resume, backup, stage transition and shop',()=>{
 const s=start();delete s.contentRevision;delete s.trainingId;delete s.trainingTurn;s.stage=2;s.phase='rest';const packet=JSON.stringify({schema:1,run:s,meta:g.meta,settings:{readableBattle:false}}),r=boot(packet),a=r.window.__dj;
 r.window.document.querySelector('[data-act=resume]').click();assert.equal(a.state.contentRevision,20);a.restAction('heal');assert.equal(a.state.phase,'map');a.chooseNode(1);assert.equal(a.state.phase,'shop');assert.equal(a.state.shop.welfare,undefined);assert.equal(a.parseBackup(a.backupText()).run.contentRevision,20);r.window.close();
});
check('welfare: exact 10G discount, job fit, persistent quote, confirmation debit, no duplicate purchase',()=>{
 const expected={'accountant-warlock':['overtimeClock','manaAmp'],'accountant-alchemist':['overtimeClock','lunchVoucher'],'chef-warlock':['protectiveApron','manaAmp'],'chef-alchemist':['overtimeClock','protectiveApron']};
 for(const pair of Object.keys(expected)){
  const s=start(pair);s.stage=2;g.nextStage();assert(g.chooseTraining(g.trainingOptions()[0]));g.chooseNode(1);const offer=clone(s.shop.welfare);assert(expected[pair].includes(offer.id));assert(offer.price>=35&&offer.price<=41);assert.equal(s.shop.relics.length,2);assert.equal(new Set(s.shop.relics).size,2);
  s.gold=42;w.__djFast=false;g.save();g.render();const r=boot(w.localStorage.getItem(g.saveSlot));r.window.document.querySelector('[data-act=resume]').click();assert.deepEqual(clone(r.window.__dj.state.shop.welfare),offer);r.window.close();
  d.querySelector('[data-act=previewShopRelic][data-index="0"]').click();assert.equal(s.gold,42);assert(d.body.textContent.includes('−'+offer.price+'G'));d.querySelector('[data-act=confirmPending]').click();assert.equal(s.gold,42-offer.price);assert(s.relics.includes(offer.id));const gold=s.gold;g.buyItem('relic',0);assert.equal(s.gold,gold);assert.equal(g.parseBackup(g.backupText()).run.shop.welfare.price,offer.price);
 }
});
check('welfare: insufficient money, all preferred owned, all commons owned, no discount outside fourth floor',()=>{
 let s=start();s.stage=3;g.chooseNode(1);const before=JSON.stringify(s);g.buyItem('relic',0);assert.equal(JSON.stringify(s),before);
 s=start();s.relics=['protectiveApron','manaAmp'];s.stage=3;g.chooseNode(1);assert(s.shop.welfare);assert(!s.relics.includes(s.shop.welfare.id));
 s=start();s.relics=['overtimeClock','manaAmp','lunchVoucher','copperBuckle','paydayCoupon','protectiveApron'];s.stage=3;g.chooseNode(1);assert.equal(s.shop.welfare,undefined);
 for(const stage of [0,1,5,7]){s=start();s.stage=stage;if(stage===5)g.takeFloorDecision(5,0);g.chooseNode(g.mapRows[stage].indexOf('shop'));assert.equal(s.shop.welfare,undefined);}
});
check('welfare: malformed discount rejected rather than silently granting a cheaper price',()=>{
 const s=start();s.stage=2;g.nextStage();assert(g.chooseTraining(g.trainingOptions()[0]));g.chooseNode(1);const q=JSON.parse(g.backupText());q.run.shop.welfare.price=0;assert.throws(()=>g.parseBackup(JSON.stringify(q)));assert(g.shopRelicPrice(0)>0);
});
assert.deepEqual(errors,[]);w.close();console.log(`ALL ${checks} training groups PASS (JSDOM; device/touch and balance are separate checks).`);
