const fs=require('fs'),assert=require('assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
const dom=new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.innerWidth=388;w.innerHeight=768;w.scrollTo=()=>{};w.matchMedia=()=>({matches:true})}});
const {window:w}=dom,d=w.document,g=w.__dj;g.meta.tutorialDone=true;g.pick('chef-warlock');g.newRun();g.chooseNode(0);g.modal='';g.state.tutorial=null;
const s=g.state;s.hp=s.maxHp=72;s.enemies.forEach(e=>{e.hp=e.maxHp=200});
const click=sel=>{const e=d.querySelector(sel);assert(e,sel);e.click()};
for(const n of [1,2,3,5,8]){s.hand=Array(n).fill('drain');g.render();assert.equal(d.querySelector('.hand').dataset.handCount,String(n));assert.equal(d.querySelectorAll('.hand-slot').length,n);assert(d.querySelector('.mb-toolbar').compareDocumentPosition(d.querySelector('.mb-hand'))&w.Node.DOCUMENT_POSITION_FOLLOWING)}
console.log('PASS hand counts 1/2/3/5/8, energy controls precede hand');
for(const energy of [0,1,2,3,4,7,12]){s.energy=energy;g.render();assert.equal(d.querySelector('.energy-meter').dataset.energyState,String(Math.min(4,energy)));assert.equal(d.querySelector('.energy-value>b').textContent,String(energy))}
s.energy=0;s.hand=['veil','drain'];s.overtimeUsed=true;g.render();assert(d.querySelector('.mb-selection').textContent.includes('사용할 카드가 없어요'));assert(d.querySelector('.end-turn-btn').classList.contains('ready-pulse'));
s.hand=['soul'];g.render();assert(!d.querySelector('.end-turn-btn').classList.contains('ready-pulse'));assert(d.querySelector('.mb-selection').textContent.includes('카드 선택'));
s.hand=['drain'];s.overtimeUsed=false;g.render();assert(d.querySelector('.mb-selection').textContent.includes('초과근무 가능'));assert(!d.querySelector('.end-turn-btn').classList.contains('ready-pulse'));
s.hand=['fatigue'];g.render();assert(d.querySelector('.end-turn-btn').classList.contains('ready-pulse'));
console.log('PASS zero-cost cards, overtime availability and fatigue-only hands');
s.hand=['drain'];s.energy=0;s.overtimeUsed=true;g.render();const before=JSON.stringify(s);click('[data-act=selectCard]');assert.equal(JSON.stringify(s),before);assert(d.querySelector('.energy-detail').textContent.includes('1 부족'));assert(!d.querySelector('.energy-after'));click('[data-act=cancelSelection]');
for(const [card,energy] of [['infernalMenu',3],['soul',0],['hustle',1]]){
 s.hand=[card];s.energy=energy;s.usedReal=false;s.usedFantasy=false;s.dualTurnUsed=false;g.render();const original=JSON.stringify(s);click('[data-act=selectCard]');const predicted=g.projectSelection(0).after.energy;assert.equal(d.querySelector('.energy-after strong').textContent,String(predicted));assert.equal(JSON.stringify(s),original);g.playCard(0);assert.equal(s.energy,predicted);g.render();
}
// Energy gained from a relic-triggered dual job must be included, not just current minus cost.
s.hand=['curse'];s.energy=1;s.usedReal=true;s.usedFantasy=false;s.dualTurnUsed=false;s.relics=['dualContract'];s.relicTurn={};g.render();click('[data-act=selectCard]');assert.equal(d.querySelector('.energy-after strong').textContent,'1');const predicted=g.projectSelection(0).after.energy;g.playCard(0);assert.equal(s.energy,predicted);
console.log('PASS preview is non-mutating, spending / energy gain / dual relic match actual resolution');
s.hand=['drain'];s.energy=3;s.enemies=[{id:'golem',name:'복사기 골렘',hp:66,maxHp:66,curse:0,debt:0,block:0,baseAttack:12,intent:{type:'charge',nextAmount:20}},{id:'healer',name:'고블린 주술사',hp:26,maxHp:26,curse:0,debt:0,block:0,baseAttack:5,intent:{type:'guard',block:4,allyBlock:8,targetIndex:0}},{id:'minion',name:'보조 서류 정령',hp:23,maxHp:23,curse:0,debt:0,block:0,baseAttack:5,intent:{type:'attack',amount:5}}];s.targetIndex=0;s.block=6;g.render();
assert(d.querySelector('[data-target="0"] .enemy-intent').textContent.includes('이번: 충전'));assert(d.querySelector('[data-target="0"] .enemy-intent').textContent.includes('다음: 강타 20'));assert(d.querySelector('[data-target="1"] .enemy-intent').textContent.includes('골렘 방어 +8'));assert(d.querySelector('.forecast').textContent.includes('피해 0'));
console.log('PASS charge / guard timing and damage forecast');
const manifest=JSON.parse(fs.readFileSync('docs/energy-assets-v0618.json'));assert.equal(manifest.assets.length,5);
for(let i=0;i<5;i++){const a=manifest.assets[i],svg=fs.readFileSync('src/'+a.file,'utf8'),v=new JSDOM(svg,{contentType:'image/svg+xml'});assert.equal(v.window.document.querySelectorAll('[data-lit="true"]').length,Math.min(3,i));assert(!svg.includes('<script'));assert(!svg.includes('<image'));assert(!svg.includes('<text'));v.window.close()}
assert.deepEqual(errors,[]);w.close();console.log('PASS five SVG states have exactly 0/1/2/3/3 lit cells, separate text, no scripts. DOM assertions only; rendered mobile geometry/touch not verified by this test.');
