const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
// Rendering is tested separately in Chromium; omit assets/CSS for fast rule checks.
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/<style>[\s\S]*?<\/style>/g,'').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const dom=new JSDOM(html,{url:'https://clarity.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});w.innerWidth=1180;w.innerHeight=752;}});
const w=dom.window,g=w.__dj,d=w.document;let checks=0;
const click=s=>{const el=d.querySelector(s);assert(el,s);el.click();};
const check=(name,fn)=>{fn();checks++;console.log('PASS',name)};
function start(pair='chef-warlock'){
 w.__djFast=true;g.pick(pair);g.meta.tutorialDone=true;g.newRun();g.chooseNode(0);g.modal='';
 const s=g.state;s.tutorial=null;s.hp=40;s.energy=20;s.dualTurnUsed=true;
 s.enemies.forEach(e=>{e.hp=e.maxHp=200;e.block=e.debt=e.curse=0});return s;
}
function render(){w.__djFast=false;g.render();}
check('four careers: upgraded card rules and accessible totals match effect recorder',()=>{
 for(const pair of Object.keys(g.pairs)){
  const s=start(pair);s.ingredient=s.reagent=2;s.enemies[0].debt=3;
  for(const id of [...s.deck])s.upgrades[id]=true;
  s.hand=[...new Set(s.deck)];render();
  for(const card of d.querySelectorAll('.hand .card')){
   const id=card.dataset.id,n=g.cardNumbers(id),label=card.getAttribute('aria-label');
   if(n.attack)assert(label.includes('공격 '+n.attack),id+label);
   if(n.heal)assert(label.includes('회복 '+n.heal),id+label);
  }
 }
 const s=start('chef-alchemist');s.upgrades={chop:true,grandFeast:true};s.hand=['chop','grandFeast'];render();
 assert(d.querySelector('[data-id=chop]').getAttribute('aria-label').includes('피해 9. 재료 +1.'));
 assert(d.querySelector('[data-id=grandFeast]').getAttribute('aria-label').includes('체력 7 회복'));
 click('[data-act=battleMenu]');click('[data-act=deck]');
 assert(d.querySelector('.modal').textContent.includes('융합 카드 일반 강화: 적용'));
 assert(!d.querySelector('.modal').textContent.includes('융합 카드 강화 미적용'));
});
check('live draw count honors hand cap while base comparison remains uncapped',()=>{
 const s=start();s.hand=Array(10).fill('hustle');
 assert.equal(g.cardNumbers('hustle').draw,1);
 assert.equal(g.cardNumbers('hustle',{live:false}).draw,2);
});
check('resource limits report actual gain without changing caps',()=>{
 const s=start();s.ingredient=12;s.reagent=12;s.enemies[0].debt=40;s.enemies[0].curse=30;
 for(const [id,key] of [['taste','ingredient'],['extract','reagent'],['receipt','debt'],['veil','curse']]){
  s.hand=[id];assert.equal(g.cardNumbers(id)[key],0);g.playCard(0,0);
 }
 assert.equal(s.ingredient,12);assert.equal(s.reagent,12);assert.equal(s.enemies[0].debt,40);assert.equal(s.enemies[0].curse,30);
});
check('two victories with 2+3 enemies count five, including curse and AoE; previews never count',()=>{
 const s=start();s.enemies=s.enemies.slice(0,2);s.enemies.forEach(e=>{e.hp=1;e.curse=1});
 g.endTurn();assert.equal(s.defeated,1);assert.equal(s.enemiesDefeated,2);
 s.nodeType='battle';g.spawnEnemy();s.enemies=[0,1,2].map(()=>({...s.enemies[0],hp:1}));s.hand=['spiceStorm'];s.energy=3;
 const before=s.enemiesDefeated;g.projectSelection(0);g.cardNumbers('spiceStorm');assert.equal(s.enemiesDefeated,before);
 g.playCard(0,0);assert.equal(s.defeated,2);assert.equal(s.enemiesDefeated,5);
 s.phase='victory';render();const text=d.querySelector('.end-stats').textContent;
 assert(text.includes('2승리한 전투'));assert(text.includes('5처치한 적'));assert(text.includes('최종 보유 골드'));
});
check('partial battle kills survive backup; legacy totals remain unknown; invalid totals rejected',()=>{
 const s=start();s.hand=['chop'];s.enemies[0].hp=1;g.playCard(0,0);assert.equal(s.enemiesDefeated,1);
 assert.equal(g.parseBackup(g.backupText()).run.enemiesDefeated,1);
 const packet=JSON.parse(g.backupText());delete packet.run.enemiesDefeated;
 const old=g.parseBackup(JSON.stringify(packet));assert.equal(old.run.enemiesDefeated,null);
 g.state=old.run;g.state.hand=['chop'];g.state.energy=3;g.state.enemies[1].hp=1;g.playCard(0,1);assert.equal(g.state.enemiesDefeated,null);
 packet.run.enemiesDefeated=-1;assert.throws(()=>g.parseBackup(JSON.stringify(packet)));
 packet.run.enemiesDefeated=1.5;assert.throws(()=>g.parseBackup(JSON.stringify(packet)));
});
check('first input instructions, invalid target, cancel and double click preserve one action',()=>{
 const s=start();s.hand=['chop','broth'];render();
 assert(d.querySelector('.mb-selection').textContent.includes('① 카드 선택'));
 click('[data-id=chop]');assert(d.querySelector('.mb-selection').textContent.includes('② 사용할 적을 탭'));
 click('[data-act=targetSelf]');assert.equal(s.energy,20);assert.equal(s.hand.length,2);
 click('[data-act=cancelSelection]');click('[data-id=broth]');assert(d.querySelector('.mb-selection').textContent.includes('내 캐릭터 또는 사용'));
 click('[data-act=useSelected]');assert.equal(s.block,6);assert.equal(s.energy,19);
 click('[data-act=targetSelf]');assert.equal(s.block,6);assert.equal(s.energy,19);
});
dom.window.close();console.log(`ALL ${checks} Patch A groups PASS`);
