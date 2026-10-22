// Regression for v0.6.19: use local debug fixture, no production debug hooks.
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot(packet){
 return new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  w.innerWidth=388;w.innerHeight=780;w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});
  if(packet)w.localStorage.setItem('dualJobSave_v1',packet);
 }});
}
const dom=boot(),w=dom.window,g=w.__dj,d=w.document;assert(g);
g.meta.tutorialDone=true;g.pick('chef-warlock');g.newRun();g.modal='';
let s=g.state,deckBefore=s.deck.length;
s.stage=2;s.nodeType='elite';g.spawnEnemy();
assert.equal(s.floorCopy,'infernalMenu');assert.equal(s.hand.length,6);
assert(s.hand.includes('infernalMenu'));assert.equal(s.deck.length,deckBefore);
console.log('PASS copier makes a combat-only copy, without changing permanent deck');
s.stage=5;s.phase='map';g.render();assert(g.floorDecisionPending());
const before=JSON.stringify(s);g.chooseNode(2);assert.equal(JSON.stringify(s),before);
assert.equal(d.querySelectorAll('.floor-special-choice').length,2);
assert.equal(d.querySelector('[data-act=goJourneyRoute]')?.disabled,true);
assert(g.takeFloorDecision(5,1));assert.equal(s.deferredBonus,28);assert.equal(s.workFatigue,1);
assert(!g.takeFloorDecision(5,0));
g.chooseNode(2);assert.equal(s.phase,'battle');
const gold=s.gold;g.victory();assert.equal(s.gold,gold+40);assert.equal(s.deferredBonus,0);
g.nextStage();assert.equal(s.stage,6);assert.equal(s.phase,'map');
assert(g.takeFloorDecision(6,0));assert.equal(s.workFatigue,2);
console.log('PASS floor commitments once-only, delayed payout on victory and night shift fatigue');
const pairs=['accountant-warlock','accountant-alchemist','chef-warlock','chef-alchemist'];
for(const key of pairs){
 g.pick(key);g.newRun();g.modal='';s=g.state;s.stage=3;s.phase='map';
 assert.equal(g.eventCatalog.filter(e=>e.pair===key).length,1);
 assert.equal(g.eventCatalog.filter(e=>e.pair).length,4);
 // Every career event must be limited to the selected pair.
 const other=g.eventCatalog.filter(e=>e.pair&&e.pair!==key);
 assert.equal(other.length,3);
 g.chooseNode(2);assert.equal(s.phase,'event');
 assert(!g.eventCatalog[s.eventId].pair||g.eventCatalog[s.eventId].pair===key);
}
g.pick('accountant-alchemist');g.newRun();g.modal='';s=g.state;s.stage=3;s.phase='event';s.eventId=15;
const goldBefore=s.gold,maxBefore=s.maxHp;
assert(g.eventAllowed(15,1));g.selectEvent(1);
assert.equal(s.gold,goldBefore-18);assert.equal(s.maxHp,maxBefore+6);
console.log('PASS four job-specific encounter pools and choice effects');
g.pick('chef-warlock');g.newRun();g.modal='';s=g.state;s.stage=8;s.nodeType='boss';g.spawnEnemy();
assert.equal(s.bossPhase,1);
const boss=s.enemies.find(e=>e.id==='boss');boss.hp=51;s.hand=['strike'];s.energy=3;s.targetIndex=0;
g.playCard(0,0);assert.equal(s.bossPhase,2);assert(boss.hp>0&&boss.hp<=50);
s.hp=s.maxHp=900;g.chooseIntent();assert.equal(boss.intent.pattern,'hr-review');
g.endTurn();assert.equal(boss.intent.pattern,'hr-verdict');
s.usedReal=false;s.usedFantasy=false;const without=g.turnForecast(s).incoming;
s.usedReal=true;s.usedFantasy=true;const withBoth=g.turnForecast(s).incoming;assert.equal(without-withBoth,12);
const hpBefore=s.hp,net=g.turnForecast(s).net;g.endTurn();
assert.equal(hpBefore-s.hp,net);assert.equal(s.energy,4);
g.render();assert(d.querySelector('.boss-phase'),'mobile shows boss-phase notice');
g.save();
const saved=w.localStorage.getItem('dualJobSave_v1'),reloaded=boot(saved);assert(reloaded.window.__dj);
reloaded.window.document.querySelector('[data-act=resume]').click();
assert.equal(reloaded.window.__dj.state.bossPhase,2);
reloaded.window.close();
assert.deepEqual(errors,[]);w.close();
console.log('PASS boss phase trigger, damage forecast, energy reward, mobile warning and saved-run resume (JSDOM only)');
