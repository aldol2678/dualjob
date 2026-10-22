const readRun=w=>{const p=w.localStorage.getItem('dualJobSave_v1');if(!p)return w.localStorage.getItem('dualJobRun_v06');const r=JSON.parse(p).run;return r===null?null:JSON.stringify(r)};
const fs=require('fs'),assert=require('assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync(process.argv[2]||'output/dual_job_original_cards_v0_6_10.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot(reduced=false,saved){
 let now=0,id=0,hidden=false,reduceListener;const timers=new Map(),mq={matches:reduced,addEventListener:(name,fn)=>reduceListener=fn};
 const dom=new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  w.innerWidth=388;w.innerHeight=768;w.scrollTo=()=>{};w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};w.matchMedia=()=>mq;
  w.setTimeout=(fn,delay=0)=>{timers.set(++id,{fn,at:now+delay});return id};w.clearTimeout=i=>timers.delete(i);
  Object.defineProperty(w.document,'hidden',{get:()=>hidden});
  w.HTMLElement.prototype.getBoundingClientRect=function(){return {left:0,top:0,right:300,bottom:240,width:300,height:240}};
  if(saved)w.localStorage.setItem('dualJobRun_v06',saved);
 }});
 const w=dom.window,d=w.document,g=w.__dj;
 function advance(ms){const end=now+ms;let count=0;while(true){const next=[...timers].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;assert(++count<1000);now=next[1].at;timers.delete(next[0]);next[1].fn()}now=end}
 return {dom,w,d,g,advance,hide(){hidden=true;d.dispatchEvent(new w.Event('visibilitychange'))},reduce(){mq.matches=true;reduceListener({matches:true})},click(s){const el=d.querySelector(s);assert(el,'missing '+s);el.click()},close(){dom.window.close()}};
}
function battle(t,key='chef-warlock'){
 const g=t.g;g.meta.tutorialDone=true;g.pick(key);g.newRun();g.chooseNode(0);g.modal='';const s=g.state;s.tutorial=null;s.hand=['chop','broth','soul'];s.hp=s.maxHp=72;s.block=3;s.energy=10;s.nodeType='battle';
 s.enemies=[['clerk','공격자',{type:'attack',amount:8}],['healer','보호자',{type:'guard',block:4,allyBlock:8,targetIndex:0}],['golem','충전자',{type:'charge',nextAmount:16}]].map(([id,name,intent])=>({id,name,intent,icon:'x',hp:100,maxHp:100,block:0,debt:0,curse:0,baseAttack:8}));s.targetIndex=0;g.render();return s;
}
const kind=t=>t.d.querySelector('.combat-playing')?.dataset.combatKind;
let groups=0;function check(name,fn){fn();groups++;console.log('PASS',name)}
check('enemy frames show acting unit and intermediate HP; final state saved immediately; input locked',()=>{
 const t=boot(),s=battle(t);t.click('[data-act=endTurn]');assert.equal(s.turn,2);assert.equal(s.hp,67);assert.equal(JSON.parse(readRun(t.w)).turn,2);assert.equal(kind(t),'start');assert(t.d.querySelector('.hero-health').textContent.includes('72/72'));
 const stable=JSON.stringify(s);t.d.querySelector('[data-act=endTurn]').dispatchEvent(new t.w.MouseEvent('click',{bubbles:true}));assert.equal(JSON.stringify(s),stable);
 t.advance(120);assert.equal(kind(t),'enemy');assert.equal(t.d.querySelector('.combat-acting').dataset.target,'0');assert(t.d.querySelector('.hero-health').textContent.includes('67/72'));assert(t.d.querySelector('.combat-pop').textContent.includes('방어 3'));
 t.advance(300);assert.equal(t.d.querySelector('.combat-acting').dataset.target,'1');assert(t.d.querySelector('[data-target="0"] .eblock').textContent.includes('8'));
 t.advance(300);assert.equal(t.d.querySelector('.combat-acting').dataset.target,'2');assert(t.d.querySelector('.combat-status').textContent.includes('충전'));
 t.advance(300);assert.equal(kind(t),'turnStart');assert.equal(t.d.querySelectorAll('.hand .card').length,5);t.advance(160);assert(!kind(t));assert(!t.d.querySelector('[data-act=endTurn]').disabled);assert.equal(JSON.stringify(s),stable);t.close();
});
check('skip, Escape, background and reduced-motion changes finish without repeating resolution',()=>{
 for(const how of ['skip','escape','hide','reduce']){const t=boot(),s=battle(t);t.click('[data-act=endTurn]');const committed=JSON.stringify(s);
  if(how==='skip')t.click('[data-act=skipCombat]');else if(how==='escape'){const event=new t.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true});t.d.dispatchEvent(event);assert(!event.defaultPrevented)}else t[how]();
  assert(!kind(t));assert(!t.d.querySelector('[aria-busy=true]'));t.advance(5000);assert.equal(JSON.stringify(s),committed);t.close();
 }
 const t=boot(true),s=battle(t);t.click('[data-act=endTurn]');assert.equal(s.turn,2);assert(!kind(t));t.close();
});
check('curse kill cancels enemy attack and final reward arrives once, including resize during playback',()=>{
 const t=boot(),s=battle(t);s.enemies=s.enemies.slice(0,1);s.enemies[0].hp=2;s.enemies[0].curse=2;t.g.render();const gold=s.gold;t.click('[data-act=endTurn]');assert.equal(s.phase,'reward');assert.equal(s.gold,gold+12);assert.equal(s.hp,72);assert.equal(JSON.parse(readRun(t.w)).phase,'reward');
 t.advance(120);assert.equal(kind(t),'tick');assert(t.d.querySelector('.just-defeated'));assert(t.d.body.classList.contains('mobile-stage'));t.w.dispatchEvent(new t.w.Event('resize'));t.g.render();assert.equal(kind(t),'tick');
 t.advance(160);assert.equal(kind(t),'finish');t.advance(260);assert(!kind(t));assert(!t.d.body.classList.contains('mobile-stage'));assert.equal(s.gold,gold+12);assert.equal(s.defeated,1);t.advance(5000);assert.equal(s.gold,gold+12);t.close();
});
check('card kill, elite reward, boss victory and self-cost defeat commit once before presentation',()=>{
 for(const node of ['battle','elite','boss','self']){const t=boot(),s=battle(t);s.nodeType=node==='self'?'battle':node;s.enemies=s.enemies.slice(0,1);s.enemies[0].hp=1;s.hand=[node==='self'?'soul':'chop'];if(node==='self')s.hp=1;t.g.render();t.click('[data-act=selectCard]');t.click(node==='self'?'[data-act=useSelected]':'[data-act=targetEnemy]');
  assert.equal(kind(t),'card');assert.equal(s.phase,{battle:'reward',elite:'relicReward',boss:'victory',self:'defeat'}[node]);const stable=JSON.stringify(s),wins=t.g.meta.wins;
  if(node!=='self')assert(t.d.querySelector('.just-defeated'));if(['boss','self'].includes(node))assert.equal(readRun(t.w),null);
  t.click('[data-act=skipCombat]');t.advance(5000);assert.equal(JSON.stringify(s),stable);assert.equal(t.g.meta.wins,wins);t.close();
 }
});
check('revival is a separate frame and does not consume its relic twice',()=>{
 const t=boot(),s=battle(t);s.enemies=s.enemies.slice(0,1);s.hp=1;s.block=0;s.relics=['severancePackage'];t.g.render();t.click('[data-act=endTurn]');assert.equal(s.hp,20);assert(s.relicUsed.severancePackage);t.advance(420);assert.equal(kind(t),'revive');assert(t.d.querySelector('.hero-health').textContent.includes('20/72'));t.advance(1000);assert.equal(s.turn,2);assert.equal(s.hp,20);t.close();
});
check('all four dual jobs show capped actual gains, condition completion and one activation',()=>{
 for(const key of ['chef-warlock','chef-alchemist','accountant-warlock','accountant-alchemist']){const t=boot(),s=battle(t,key);s.usedReal=true;s.hp=s.maxHp;s.ingredient=12;s.reagent=12;s.enemies.forEach(e=>{e.curse=30;e.debt=40});s.hand=['soul'];t.g.render();t.click('[data-act=selectCard]');t.click('[data-act=useSelected]');assert.equal(s.synergies,1);assert(s.dualTurnUsed);t.advance(300);assert.equal(kind(t),'dual');assert(t.d.querySelector('.mb-dual.done.dual-result'));assert(t.d.querySelector('.combat-status').textContent.includes(s.lastDual.text));assert(s.lastDual.text.includes('+0'));
  if(key==='chef-warlock')assert(s.lastDual.text.includes('체력 +2'));const committed=JSON.stringify(s);t.click('[data-act=skipCombat]');t.advance(2000);assert.equal(JSON.stringify(s),committed);t.close();
 }
});
check('resume uses committed state even when original window closes mid-animation',()=>{
 const t=boot(),s=battle(t);t.click('[data-act=endTurn]');const saved=readRun(t.w),hp=s.hp,turn=s.turn;t.close();const resumed=boot(true,saved);resumed.click('[data-act=resume]');assert.equal(resumed.g.state.hp,hp);assert.equal(resumed.g.state.turn,turn);assert(!kind(resumed));assert(!saved.includes('combatPlayback'));resumed.close();
});
assert.deepEqual(errors,[]);console.log('ALL '+groups+' combat-flow groups PASS. Controlled timers and mock geometry; real rendering/touch unverified.');
