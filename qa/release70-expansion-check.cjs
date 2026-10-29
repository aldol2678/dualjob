const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/<style>[\s\S]*?<\/style>/g,'').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
function boot(packet){const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));const dom=new JSDOM(html,{url:'https://expansion.test/?debug=1',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});if(packet)w.localStorage.setItem('dualJobSave_v1',JSON.stringify(packet))}});assert(dom.window.__dj,errors.join('\n'));return dom}
const dom=boot(),w=dom.window,g=w.__dj;w.__djFast=true;g.meta.tutorialDone=true;let count=0,cases=0;
function check(name,fn){fn();console.log('PASS',name);count++}
function start(pair='accountant-warlock',stage=0){g.modal='';g.pick(pair);g.newRun();const s=g.state;s.stage=stage;if(stage>=3)s.trainingId=g.trainingOptions()[0];return s}
function battle(pair='accountant-warlock',stage=0){const s=start(pair,stage);s.nodeType='battle';g.spawnEnemy();s.enemies=[0,1,2].map(i=>({id:'clerk',name:'검증 대상',icon:'📋',hp:200,maxHp:200,block:0,debt:4,curse:3,baseAttack:5,intent:{type:'attack',amount:5}}));s.hp=40;s.maxHp=72;s.hand=[];s.drawPile=Array(20).fill('guard');s.discard=[];s.turnDiscard={};s.energy=20;s.ingredient=3;s.reagent=3;s.targetIndex=0;return s}
function use(id){g.state.hand=[id];g.playCard(0,0)}
const summary=s=>JSON.stringify({hp:s.hp,energy:s.energy,block:s.block,ingredient:s.ingredient,reagent:s.reagent,hand:s.hand,drawPile:s.drawPile,discard:s.discard,turnDiscard:s.turnDiscard,relicUsed:s.relicUsed,relicTurn:s.relicTurn,trainingTurn:s.trainingTurn,enemies:s.enemies.map(e=>[e.hp,e.block,e.debt,e.curse])});
check('first-career prototype: 12-zone map, supply choice, actual combat and backup',()=>{
 const s=start();assert.equal(g.campaignLength(),12);assert.equal(g.routeRows()[11][0],'boss');assert.equal(g.allCardKeys().length,27);
 s.stage=4;s.trainingId='posthumous';g.chooseNode(0);assert.equal(s.nodeType,'supply');const offers=JSON.stringify(s.supplyOffers);g.chooseSupplyFocus('fusion');assert.equal(s.rewardOptions.length,2);
 assert.equal(g.parseBackup(g.backupText()).run.supplyFocus,'fusion');g.chooseSupplyFocus('fantasy');g.chooseSupplyFocus('fusion');assert.equal(JSON.stringify(s.supplyOffers),offers);
 const card=s.rewardOptions.find(k=>k==='soulLien');assert(card);g.pickReward(s.rewardOptions.indexOf(card));assert.equal(s.stage,5);assert(s.deck.includes(card));assert.equal(s.supplyOffers,undefined);
 g.takeFloorDecision(5,0);g.chooseNode(2);s.hand=[card];s.energy=3;s.enemies[0].debt=4;g.playCard(0,0);assert(s.enemies[0].hp<s.enemies[0].maxHp);assert(g.parseBackup(g.backupText()));
});
check('all four careers: 55 playable cards, 20 relics, eligible pools and classic isolation',()=>{
 assert.equal(Object.keys(g.cards).length,56);assert.equal(Object.keys(g.relics).length,20);
 for(const pair of Object.keys(g.pairs)){
  const s=start(pair);assert.equal(g.allCardKeys().length,27);assert.equal(g.allCardKeys().filter(k=>g.cards[k].family==='fusion').length,2);
  assert.equal(g.eligibleRelics().length,15);assert(g.eligibleRelics().every(k=>!g.relics[k].pair||g.relics[k].pair===pair));
  delete s.campaignId;assert.equal(g.campaignLength(),9);assert.equal(g.allCardKeys().length,20);assert.equal(g.eligibleRelics().length,12);assert(g.allCardKeys().every(k=>!g.cards[k].release));
 }
});
check('new card effects: resource consumption, retention, conditional draw and area effects',()=>{
 const expected={partialCollect:{attack:10,debt:2},spreadLedger:{debt:6,otherDebt:6},interestClaim:{attack:12,debt:4},prepStation:{ingredient:6},slowSimmer:{block:10,ingredient:3},serveNow:{attack:9,ingredient:2,draw:1},bindingSeal:{curse:6},cashCurse:{attack:14,curse:1},shadowShelter:{block:10,curse:3},stockSolution:{reagent:6},reactiveShield:{block:13,reagent:1},recycleFlask:{attack:10,reagent:2,draw:1},soulLien:{attack:12,debt:4,curse:4},goldReserve:{block:8,debt:2,reagent:5},hellMarinade:{ingredient:1,curse:6,otherCurse:6},courseExchange:{block:10,ingredient:2,reagent:2,draw:1}};
 for(const [id,exp]of Object.entries(expected)){const s=battle();use(id);for(const [k,v]of Object.entries(exp)){const actual=k==='attack'?200-s.enemies[0].hp:k==='debt'||k==='curse'?s.enemies[0][k]:k==='otherDebt'?s.enemies[1].debt:k==='otherCurse'?s.enemies[1].curse:k==='draw'?s.hand.length:s[k];assert.equal(actual,v,id+' '+k)}}
 for(const id of ['serveNow','recycleFlask','courseExchange']){const s=battle();s.ingredient=s.reagent=0;use(id);assert.equal(s.hand.length,0,id+' drew without resources')}
});
check('new cards with all eight specializations, upgrades and applicable relics: previews are pure and exact',()=>{
 for(const pair of Object.keys(g.pairs))for(const training of Object.keys(g.TRAINING).filter(k=>g.TRAINING[k].pair===pair))for(const id of Object.keys(g.EXPANSION_CARDS).filter(k=>g.cards[k].job===pair.split('-')[0]||g.cards[k].job===pair.split('-')[1]||g.cards[k].pair===pair))for(const up of [false,true])for(const resources of [0,3]){
  const s=battle(pair,7);s.trainingId=training;s.ingredient=s.reagent=resources;s.hand=[id];s.upgrades={[id]:up};s.relics=g.eligibleRelics();s.usedReal=g.cards[id].family==='fantasy';s.usedFantasy=g.cards[id].family==='real';
  const before=JSON.stringify(s),p=g.projectSelection(0,0);assert(p,id);assert.equal(JSON.stringify(s),before,'preview mutation '+id);g.playCard(0,0);assert.equal(summary(s),summary(p.after),pair+' '+training+' '+id);cases++;
 }
});
check('eight new relics activate on their documented conditions and only once per scope',()=>{
 let s=battle();s.relics=['spectralSeal'];use('partialCollect');assert.equal(s.block,4);use('partialCollect');assert.equal(s.block,4);
 s=battle();s.relics=['compoundAbacus'];use('blast');assert.equal(s.enemies[0].debt,6);s.reagent=3;use('blast');assert.equal(s.enemies[0].debt,6);
 s=battle();s.relics=['emberLadle'];use('serveNow');assert.equal(s.hp,43);use('serveNow');assert.equal(s.hp,43);
 s=battle();s.relics=['pairedCutlery'];use('courseExchange');assert.equal(s.hand.length,2);use('courseExchange');assert.equal(s.hand.length,1);
 s=battle();s.relics=['crossBadge'];assert.equal(g.getCost('hellTax'),1);use('hellTax');assert.equal(g.getCost('hellTax'),2);g.endTurn();assert.equal(g.getCost('hellTax'),2);g.spawnEnemy();assert.equal(g.getCost('hellTax'),1);
 s=start();s.nodeType='battle';s.relics=['reservePocket'];g.spawnEnemy();assert.equal(s.hand.length,6);s.workFatigue=3;g.spawnEnemy();assert.equal(s.hand.length,6);assert(s.hand.includes('fatigue'));
 s=battle();s.relics=['lastStand'];use('serveNow');assert.equal(s.block,4);use('serveNow');assert.equal(s.block,4);g.endTurn();use('guard');assert.equal(s.block,13);
 s=battle();s.relics=['sturdyFolder'];use('guard');assert.equal(s.block,12);use('guard');assert.equal(s.block,21);
});
check('new enemy patterns: live resource/dual conditions, turn forecast and saved intent',()=>{
 for(const variant of ['stock-audit','cross-exam'])for(const resource of [0,4])for(const dual of [false,true]){
  const s=battle('chef-alchemist',9);s.trainingId='molecular';s.enemies=s.enemies.slice(0,1);Object.assign(s.enemies[0],{id:'wraith',variant,curse:0});s.ingredient=resource;s.reagent=0;s.usedReal=s.usedFantasy=dual;g.chooseIntent();const a=g.enemyAction(s.enemies[0]);assert.equal(a.damage,5+(variant==='stock-audit'&&resource===4?5:0)-(variant==='cross-exam'&&dual?4:0));
  const restored=g.parseBackup(g.backupText()).run;assert.equal(restored.enemies[0].variant,variant);const hp=s.hp,net=g.turnForecast(s).net;g.endTurn();assert.equal(hp-s.hp,net);assert.equal(s.enemies[0].intent.type,'guard');
 }
});
check('all four careers: supply reload is stable, pick/skip advances once, no focus reroll',()=>{
 for(const pair of Object.keys(g.pairs))for(const stage of [4,8]){
  const s=start(pair,stage);g.chooseNode(0);const offers=JSON.stringify(s.supplyOffers);g.chooseSupplyFocus('fusion');const packet=g.parseBackup(g.backupText()),re=boot(packet);re.window.document.querySelector('[data-act=resume]').click();assert.equal(JSON.stringify(re.window.__dj.state.supplyOffers),offers);assert.equal(re.window.__dj.state.supplyFocus,'fusion');re.window.close();
  const count=s.deck.length;g.pickReward(stage===4?0:-1);assert.equal(s.deck.length,count+(stage===4?1:0));assert.equal(s.stage,stage+1);g.pickReward(0);assert.equal(s.stage,stage+1);
 }
});
check('legacy nine-zone saves finish at original boss; new late-zone actions and metadata round-trip',()=>{
 for(const pair of Object.keys(g.pairs)){
  let s=start(pair,8);delete s.campaignId;s.nodeType='boss';g.spawnEnemy();const old=g.parseBackup(g.backupText());assert.equal(g.campaignLength(old.run),9);assert.equal(g.routeRooms(old.run)[8].label,'인사부장실');s.enemies.forEach(e=>e.hp=0);g.victory();assert.equal(s.phase,'victory');
  s=battle(pair,11);s.nodeType='boss';use('guard');assert.equal(g.parseBackup(g.backupText()).run.stage,11);assert.equal(g.parseBackup(g.backupText()).run.actionLog[0].stage,11);g.meta.best=12;assert.equal(g.parseBackup(g.backupText()).meta.best,12);
  const bad=JSON.parse(g.backupText());bad.run.campaignId='future';assert.throws(()=>g.parseBackup(JSON.stringify(bad)));bad.run.campaignId='classic06';assert.throws(()=>g.parseBackup(JSON.stringify(bad)));
 }
});
check('malformed supply backups are rejected without mutating live state',()=>{
 const s=start('chef-warlock',4);g.chooseNode(0);const text=g.backupText(),before=JSON.stringify(s);
 for(const mutate of [r=>r.supplyFocus='bad',r=>r.supplyOffers.real.push('chop'),r=>r.supplyOffers.real[0]='goldAudit',r=>r.rewardOptions=['strike'],r=>r.campaignId='classic06']){const x=JSON.parse(text);mutate(x.run);assert.throws(()=>g.parseBackup(JSON.stringify(x)))}assert.equal(JSON.stringify(s),before);
});
w.close();console.log(`ALL ${count} expansion groups PASS; ${cases} new-card projection cases. Synthetic QA, not human fun or mobile-device verification.`);
