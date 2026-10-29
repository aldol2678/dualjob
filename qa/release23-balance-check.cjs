const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync(process.argv[2]||'output/dualjob-debug.html','utf8').replace(/<style>[\s\S]*?<\/style>/g,'').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
function boot(packet){return new JSDOM(html,{url:'https://balance.test/?debug=1',runScripts:'dangerously',virtualConsole:new VirtualConsole(),beforeParse(w){w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});if(packet)w.localStorage.setItem('dualJobSave_v1',packet)}})}
const dom=boot(),w=dom.window,g=w.__dj;w.__djFast=true;g.meta.tutorialDone=true;let count=0;
function check(name,fn){fn();console.log('PASS',name);count++}
function start(pair='chef-warlock',boss=false){g.pick(pair);g.newRun();g.modal='';if(boss){g.state.stage=8;g.state.nodeType='boss';g.state.trainingId=g.trainingOptions()[0];g.spawnEnemy()}else g.chooseNode(0);const s=g.state;s.tutorial=null;s.hp=s.maxHp=500;return s}
const cardsIn=s=>[...s.hand,...s.drawPile,...s.discard].sort();
check('four careers: a thin deck cannot repeatedly redraw its zero-cost card; next turn releases it',()=>{
 for(const pair of Object.keys(g.pairs)){
  const s=start(pair),id=s.real==='chef'?'taste':'receipt';s.deck=[id,...s.deck.filter(k=>k!==id).slice(0,4)];s.hand=[...s.deck];s.drawPile=[];s.discard=[];
  const all=cardsIn(s),before=JSON.stringify(s);const p=g.projectSelection(0,0);assert.equal(JSON.stringify(s),before,'preview mutated live state');
  g.playCard(0,0);assert(!s.hand.includes(id),'used card recycled in the same turn');assert.equal(s.energy,3);assert.deepEqual(cardsIn(s),all);assert.equal(p.after.hand.length,s.hand.length);
  g.endTurn();assert(s.hand.includes(id));assert.deepEqual(cardsIn(s),all);assert.equal(JSON.stringify(s.turnDiscard),'{}');
 }
});
check('duplicate copies and previous-turn discards stay usable; current-turn copies stay held',()=>{
 const s=start('chef-alchemist');s.hand=['taste','hustle'];s.drawPile=[];s.discard=['taste','chop'];s.turnDiscard={};s.deck=cardsIn(s);
 const all=cardsIn(s);g.playCard(0);assert.equal(s.turnDiscard.taste,1);
 g.playCard(s.hand.indexOf('hustle'));assert(s.hand.includes('taste'),'other copy should be drawable');
 g.playCard(s.hand.indexOf('taste'));assert.equal(s.turnDiscard.taste,2);assert(!s.hand.includes('taste'));assert(!s.hand.includes('hustle'));assert.deepEqual(cardsIn(s),all);
 assert.equal(g.cardNumbers('hustle',{live:false}).draw,2,'base card description must remain unchanged');
});
check('draw/energy/discount combination terminates without losing any copies',()=>{
 const s=start('accountant-alchemist');s.deck=['receipt','extract','hustle','hustle','guard'];s.hand=[...s.deck];s.drawPile=[];s.discard=[];
 s.upgrades={receipt:true,extract:true,hustle:true};s.relics=['dualContract','overtimeClock'];const all=cardsIn(s);
 let used=0;while(used<100){const i=s.hand.findIndex(id=>id!=='guard'&&g.getCost(id)<=s.energy);if(i<0)break;g.playCard(i,0);used++}
 assert.equal(used,4);assert.equal(s.energy,4);assert.deepEqual(cardsIn(s),all);assert.equal(s.synergies,1);
});
check('mid-turn lock survives backup and reload; old saves without it load; invalid locks are rejected',()=>{
 const s=start();s.hand=['taste','chop','broth','curse','veil'];s.deck=[...s.hand];s.drawPile=[];s.discard=[];g.playCard(0);
 const backup=g.backupText(),p=g.parseBackup(backup);assert.equal(p.run.turnDiscard.taste,1);
 const re=boot(JSON.stringify(p));re.window.document.querySelector('[data-act=resume]').click();assert.equal(re.window.__dj.state.turnDiscard.taste,1);assert(!re.window.__dj.state.hand.includes('taste'));re.window.close();
 const old=JSON.parse(backup);delete old.run.turnDiscard;assert.equal(JSON.stringify(g.parseBackup(JSON.stringify(old)).run.turnDiscard),'{}');
 for(const bad of [null,[],{taste:2},{taste:-1},{taste:.5},{unknown:1}]){const x=JSON.parse(backup);x.run.turnDiscard=bad;assert.throws(()=>g.parseBackup(JSON.stringify(x)))}
});
check('boss threshold preserves current intent and forecast; first verdict has a full response turn',()=>{
 const s=start('chef-warlock',true),boss=s.enemies[0];boss.hp=51;s.hand=['strike'];s.drawPile=[];s.discard=[];const intent=JSON.stringify(boss.intent);
 g.playCard(0,0);assert.equal(s.bossPhase,2);assert.equal(JSON.stringify(boss.intent),intent);
 let hp=s.hp,net=g.turnForecast(s).net;g.endTurn();assert.equal(hp-s.hp,net);assert.equal(s.turn,2);assert.equal(boss.intent.pattern,'hr-verdict');
 const noDual=g.turnForecast(s).incoming;s.usedReal=s.usedFantasy=true;assert.equal(noDual-g.turnForecast(s).incoming,12);
 hp=s.hp;net=g.turnForecast(s).net;g.endTurn();assert.equal(hp-s.hp,net);assert.equal(s.energy,4);assert.equal(boss.intent.pattern,'hr-review');
 g.endTurn();assert.equal(boss.intent.pattern,'hr-verdict');
});
check('curse threshold cannot cause a surprise verdict; old telegraphed review values persist',()=>{
 const s=start('chef-warlock',true),boss=s.enemies[0];boss.hp=51;boss.curse=1;
 const hp=s.hp,net=g.turnForecast(s).net;g.endTurn();assert.equal(hp-s.hp,net);assert.equal(s.bossPhase,2);assert.equal(boss.intent.pattern,'hr-verdict');
 boss.intent={type:'prepare',amount:0,nextAmount:19,pattern:'hr-review'};g.endTurn();assert.equal(boss.intent.amount,19);assert.equal(boss.intent.pattern,'hr-verdict');
});
check('a lethal burst still cancels the boss action; no forced phase or HP inflation',()=>{
 const s=start('chef-warlock',true),boss=s.enemies[0];assert.equal(boss.maxHp,100);boss.hp=5;s.enemies.slice(1).forEach(e=>e.hp=0);s.hand=['strike'];
 g.playCard(0,0);assert.equal(s.phase,'victory');assert.equal(s.turn,1);
});
w.close();console.log(`ALL ${count} Patch B groups PASS`);
