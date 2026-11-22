// v0.8.0 new-jobs checks: courier/spirit base jobs + five fusions.
// Same jsdom harness pattern as release70-expansion-check.cjs.
// Synthetic QA, not human fun or mobile-device verification.
const fs=require('node:fs'),assert=require('node:assert');
const {JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/<style>[\s\S]*?<\/style>/g,'').replace(/(data:[^;"'\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const dom=new JSDOM(html,{url:'https://t.test/?debug=1',runScripts:'dangerously',virtualConsole:new VirtualConsole(),beforeParse(w){w.scrollTo=()=>{};w.matchMedia=()=>({matches:true})}});
const g=dom.window.__dj;dom.window.__djFast=true;g.meta.tutorialDone=true;
let count=0,cases=0;
function check(name,fn){fn();count++;console.log('PASS',name)}
function start(pair='accountant-warlock',stage=0){g.modal='';g.pick(pair);g.newRun();const s=g.state;s.stage=stage;if(stage>=3)s.trainingId=g.trainingOptions()[0];return s}
function battle(pair='accountant-warlock',stage=0){const s=start(pair,stage);s.nodeType='battle';g.spawnEnemy();s.enemies=[0,1,2].map(i=>({id:'clerk',name:'검증 대상',icon:'📋',hp:200,maxHp:200,block:0,debt:4,curse:3,baseAttack:5,intent:{type:'attack',amount:5}}));s.hp=40;s.maxHp=72;s.hand=[];s.drawPile=Array(20).fill('guard');s.discard=[];s.turnDiscard={};s.energy=20;s.ingredient=3;s.reagent=3;s.order=6;s.spirit=1;s.targetIndex=0;return s}
function use(id){g.state.hand=[id];g.playCard(0,0)}
const summary=s=>JSON.stringify({hp:s.hp,energy:s.energy,block:s.block,ingredient:s.ingredient,reagent:s.reagent,order:s.order,spirit:s.spirit,hand:s.hand,drawPile:s.drawPile,discard:s.discard,turnDiscard:s.turnDiscard,relicUsed:s.relicUsed,relicTurn:s.relicTurn,trainingTurn:s.trainingTurn,detour:s.detour,statute:s.statute,collectionTick:s.collectionTick,deliveryBonus2x:s.deliveryBonus2x,spiritBonus:s.spiritBonus,dualTurnUsed:s.dualTurnUsed,enemies:s.enemies.map(e=>[e.hp,e.block,e.debt,e.curse,e.baseAttack,e.orderMark])});
const NEW_PAIRS=['courier-warlock','courier-alchemist','courier-spirit','accountant-spirit','chef-spirit'];

check('v0.8.0 careers: nine pairs, start decks 11-12, guide and dual text',()=>{
 assert.equal(Object.keys(g.pairs).length,9);
 for(const pair of NEW_PAIRS){
  const s=start(pair);assert.ok([11,12].includes(s.deck.length),pair+' deck '+s.deck.length);
  assert.ok(s.deck.every(k=>g.allCardKeys().includes(k)),pair+' deck outside pool');
  const guide=g.JOB_GUIDE[pair];assert.ok(guide&&guide.resources&&guide.combo, pair+' guide');
  assert.ok(g.DUAL_EFFECTS[pair]&&g.DUAL_EFFECTS[pair].length>=2,pair+' dual');
  assert.ok(g.cards[g.pairs[pair].sig],pair+' sig card');
  // specialization: two choices at stage 3, choosable from the training phase
  const t=start(pair,3);t.trainingId=null;t.phase='training';const opts=g.trainingOptions();assert.equal(opts.length,2,pair+' trainings');
  assert.ok(opts.every(id=>g.TRAINING[id]&&g.TRAINING[id].pair===pair));
  g.chooseTraining(opts[1]);assert.equal(g.state.trainingId,opts[1]);
 }
});

check('v0.8.0 card effects: 32-card table (lostFound and spiritLien separate)',()=>{
 // battle setup: order 6, spirit 1, ingredient 3, reagent 3, enemies hp 200 debt 4 curse 3, hp 40
 const T={
  swiftDelivery:{attack:5},orderStack:{order:8,hand:1},designatedDelivery:{attack:6,order:7},
  dawnDelivery:{order:7,hand:1},codPickup:{block:6,order:7},deliveryStamp:{attack:7,order:4,hand:1},
  rightTurn:{block:4,detour:true},elevatorOut:{attack:4,orderMark:true},nightSurcharge:{attack:14},
  deliveryCanon:{order:9,statute:true},
  summonSpirit:{spirit:2},spiritBond:{block:6,hp:42,spirit:0},emberSpirit:{spirit:2,spiritBonus:2},
  windSpirit:{hand:2,spirit:0},earthSpirit:{block:10,spirit:0},spiritWrath:{attack:21,spirit:0,setup:{spirit:3}},
  spiritContract:{spirit:2,debt:5},spiritUpkeep:{hp:42,setup:{spirit:2}},spiritSighting:{spirit:2,hand:1},
  grandSpirit:{attack:12,attackAll:12,block:6,spirit:0,setup:{spirit:3}},spiritDismissal:{baseAttack:2,spirit:0},
  underworldExpress:{attack:12,attackAll:12,order:4},soulReceipt:{curse:1,order:9,hp:44},
  sameDayAlchemy:{attack:7,order:8,reagent:2},explosiveParcel:{attack:14,order:4,reagent:1},
  spiritQuick:{attack:6,spirit:0,deliveryBonus2x:true},spiritHub:{spirit:2,order:8,spiritBonus:2},
  spiritCollection:{debt:8,spirit:0,collectionTick:true},
  spiritFeast:{hp:48,block:8,ingredient:1,spirit:1,setup:{spirit:2}},
  livingCourse:{attack:9,ingredient:2,spirit:2},
 };
 for(const [id,exp]of Object.entries(T)){
  const s=battle();Object.assign(s,exp.setup||{});
  use(id);
  for(const [k,v]of Object.entries(exp)){if(k==='setup')continue;
   const actual=k==='attack'?200-s.enemies[0].hp:k==='attackAll'?200-s.enemies[1].hp:k==='debt'||k==='curse'?s.enemies[0][k]:k==='hand'?s.hand.length:k==='orderMark'?s.enemies.every(e=>e.orderMark===1):k==='baseAttack'?s.enemies[0].baseAttack:s[k];
   assert.equal(actual,v,id+' '+k+' (got '+actual+')');
  }
 }
});

check('lostFound retrieval scales with spent order; spiritLien needs debt 5',()=>{
 let s=battle();s.discard=['strike','guard'];s.order=6;use('lostFound');
 assert.equal(s.hand.length,2);assert.equal(s.order,5);assert.deepEqual(s.hand,['guard','strike']);
 s=battle();s.discard=['strike','guard'];s.order=0;use('lostFound');
 assert.equal(s.hand.length,1);assert.equal(s.order,0);
 s=battle();use('spiritLien');assert.equal(s.enemies[0].hp,200);assert.equal(s.spirit,1);
 s=battle();s.enemies[0].debt=5;use('spiritLien');assert.equal(s.enemies[0].hp,190);assert.equal(s.spirit,2);
});

check('dual effects fire once per turn for the five new pairs',()=>{
 // starters chosen so card effects are known; assert at-least the dual amounts
 const PLAN={
  'courier-warlock':{real:'swiftDelivery',fantasy:'curse',min:{order:2,curse:3,block:5}},
  'courier-alchemist':{real:'swiftDelivery',fantasy:'extract',min:{order:2,reagent:3,block:5}},
  'courier-spirit':{real:'swiftDelivery',fantasy:'summonSpirit',min:{order:1,spirit:2,hand:1}},
  'accountant-spirit':{real:'ledger',fantasy:'summonSpirit',min:{debt:4,spirit:2,block:11}},
  'chef-spirit':{real:'chop',fantasy:'summonSpirit',min:{ingredient:2,spirit:2,hp:42}},
 };
 for(const [pair,p]of Object.entries(PLAN)){
  const s=battle(pair);s.order=0;s.spirit=0;s.ingredient=0;s.reagent=0;s.hp=40;
  s.hand=[p.real,p.fantasy];g.playCard(0,0);g.playCard(0,0);
  assert.equal(s.dualTurnUsed,true,pair+' dual fired');
  for(const [k,v]of Object.entries(p.min)){
   const actual=k==='debt'||k==='curse'?s.enemies[0][k]:k==='hand'?s.hand.length:s[k];
   assert.ok(actual>=v,pair+' dual '+k+' got '+actual+' want >= '+v);
  }
  // second real+fantasy card pair in the same turn must not refire the dual:
  // synergies count and lastDual text stay put (card effects themselves may
  // still move resources, so compare the dual bookkeeping, not the totals)
  const synBefore=s.synergies,dualBefore=JSON.stringify(s.lastDual);
  s.hand=[p.real,p.fantasy];g.playCard(0,0);g.playCard(0,0);
  assert.equal(s.synergies,synBefore,pair+' dual refired (synergies)');
  assert.equal(JSON.stringify(s.lastDual),dualBefore,pair+' dual refired (lastDual)');
 }
});

check('order on kill, spirit end-turn damage, statute and detour',()=>{
 let s=battle('courier-warlock');s.enemies[0].hp=5;use('swiftDelivery');
 assert.equal(s.order,7);assert.equal(s.turnKills,1);
 use('swiftDelivery');assert.equal(s.enemies[1].hp,191); // second kill-chain hit: 5+4
 s=battle('courier-warlock');s.enemies[0].hp=4;use('elevatorOut');assert.equal(s.order,7); // kill before mark: base gain only
 s.enemies[1].hp=5;use('swiftDelivery');assert.equal(s.order,9); // marked kill: base + mark bonus
 s=battle('courier-spirit');s.spirit=2;s.enemies.forEach(e=>e.curse=0);g.endTurn();
 assert.equal(s.enemies.reduce((n,e)=>n+(200-e.hp),0),6); // 2 spirits x 3 (curse tick zeroed out)
 s=battle('courier-spirit');s.spirit=1;s.enemies.forEach(e=>e.curse=0);use('emberSpirit');g.endTurn();
 assert.equal(s.enemies.reduce((n,e)=>n+(200-e.hp),0),8); // 2 spirits x 3 + bonus 2
 s=battle('courier-warlock');use('deliveryCanon');g.endTurn();assert.equal(s.energy,4); // statute: +1 energy next turn
 s=battle('courier-warlock');use('rightTurn');g.endTurn();assert.equal(s.order,7); // detour: +1 order at next turn start
});

check('v0.8.0 trainings: preview pure and play matches projection (10 trainings x pair cards)',()=>{
 // agingSpirit is a 25% proc on ANY ingredient gain (card or dual effect),
 // so its rows are nondeterministic for projection-vs-play; it is covered
 // separately below with a forced Math.random.
 for(const pair of NEW_PAIRS){
  const s=battle(pair,7);s.energy=20;s.ingredient=3;s.reagent=3;s.order=6;s.spirit=2;s.relics=g.eligibleRelics();
  const ids=g.allCardKeys().filter(k=>k!=='fatigue'&&g.cards[k].release===8);
  for(const training of g.trainingOptions()){
   if(training==='agingSpirit')continue;
   s.trainingId=training;
   for(const id of ids){
    for(const up of [false,true]){
     s.hand=[id];s.drawPile=Array(20).fill('guard');s.discard=[];s.turnDiscard={};s.energy=20;s.ingredient=3;s.reagent=3;s.order=6;s.spirit=2;s.hp=40;s.block=0;s.dualTurnUsed=false;
     s.upgrades={[id]:up};s.usedReal=g.cards[id].family==='fantasy';s.usedFantasy=g.cards[id].family==='real';
     const before=summary(s);const p=g.projectSelection(0);
     assert.ok(p,pair+' '+training+' '+id+' no projection');
     assert.equal(summary(s),before,pair+' '+training+' '+id+' preview mutated state');
     const after=p.after;
     s.hand=[id];g.playCard(0,0);
     assert.equal(summary(s),summary(after),pair+' '+training+' '+id+' up='+up+' play!=projection');
     cases++;
    }
   }
  }
 }
});

check('v0.8.0 relics: start bonuses, caps, job and pair triggers',()=>{
 let s=start('courier-warlock');s.relics=['swiftParcelBox'];s.deck=s.deck.filter(k=>k!=='dawnDelivery');s.nodeType='battle';g.spawnEnemy();assert.equal(s.order,1); // dawnDelivery in the opening hand would add another +1
 s=start('courier-spirit');s.relics=['spiritCharm'];s.deck=s.deck.filter(k=>k!=='dawnDelivery');s.nodeType='battle';g.spawnEnemy();assert.equal(s.spirit,1);
 s=battle('courier-warlock');s.relics=['orderSatchel'];s.order=15;use('orderStack');assert.equal(s.order,16);
 s=battle('courier-warlock');s.order=15;use('orderStack');assert.equal(s.order,12);
 s=battle('courier-spirit');s.relics=['spiritLantern'];s.spirit=3;use('summonSpirit');assert.equal(s.spirit,4);
 s=battle('courier-spirit');s.spirit=3;use('summonSpirit');assert.equal(s.spirit,3);
 s=battle('courier-warlock');s.relics=['deliveryLog'];s.enemies[0].hp=5;use('swiftDelivery');assert.equal(s.order,8); // base 1 + log 1
 s=battle('courier-spirit');s.relics=['spiritFlute'];s.spirit=2;s.enemies.forEach(e=>e.curse=0);g.endTurn();
 assert.equal(s.enemies.reduce((n,e)=>n+(200-e.hp),0),8); // 2 spirits x (3+1)
 const once=(pair,relic,card,check)=>{const s=battle(pair);s.relics=[relic];use(card);check(s);use(card);check(s);};
 once('courier-warlock','deadLetter','deliveryStamp',s=>assert.equal(s.enemies[0].curse,4));
 once('courier-alchemist','expressFlask','blast',s=>assert.equal(s.order,7));
 once('courier-spirit','parcelSpirit','windSpirit',s=>assert.equal(s.order,7));
 once('accountant-spirit','collectionSeal','collect',s=>assert.equal(s.spirit,2));
 once('chef-spirit','feastBell','lunch',s=>assert.equal(s.spirit,2));
});

check('agingSpirit proc: 25% on ingredient gain, tested with forced random',()=>{
 const s=battle('chef-spirit',7);s.trainingId='agingSpirit';s.spirit=1;
 const orig=dom.window.Math.random;
 try{
  dom.window.Math.random=()=>0.1;use('taste');assert.equal(s.spirit,2,'proc should fire at 0.1');
  dom.window.Math.random=()=>0.9;use('taste');assert.equal(s.spirit,2,'proc should not fire at 0.9');
 }finally{dom.window.Math.random=orig}
});

check('save compatibility: old-style runs load, new-run backups round-trip order/spirit',()=>{
 for(const pair of NEW_PAIRS){
  const s=start(pair);const pkt=g.parseBackup(g.backupText());
  assert.equal(pkt.run.order,0);assert.equal(pkt.run.spirit,0);
  assert.equal(pkt.run.real+'-'+pkt.run.fantasy,pair);
 }
 // old-style run object (classic: no campaignId, contentRevision 20,
 // no order/spirit fields) sanitizes to zeros
 const s=start('accountant-warlock');const raw=JSON.parse(JSON.stringify(s));
 delete raw.order;delete raw.spirit;delete raw.campaignId;raw.contentRevision=20;
 const clean=g.sanitizeRun(raw);assert.ok(clean);assert.equal(clean.order,0);assert.equal(clean.spirit,0);
 // new run with resources round-trips through a backup
 const s2=battle('courier-spirit');s2.order=9;s2.spirit=3;
 const pkt2=g.parseBackup(g.backupText());assert.equal(pkt2.run.order,9);assert.equal(pkt2.run.spirit,3);
 // classic (no campaignId) old-pair run still loads with campaign length 9
 const s3=start('accountant-warlock');delete s3.campaignId;
 assert.equal(g.campaignLength(g.parseBackup(g.backupText()).run),9);
});

dom.window.close();console.log(`ALL ${count} v0.8.0 groups PASS; ${cases} training projection cases. Synthetic QA, not human fun or mobile-device verification.`);
