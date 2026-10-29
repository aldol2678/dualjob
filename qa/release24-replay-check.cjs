const readRun=w=>{const p=w.localStorage.getItem('dualJobSave_v1');if(!p)return w.localStorage.getItem('dualJobRun_v06');const r=JSON.parse(p).run;return r===null?null:JSON.stringify(r)};
const fs=require('fs'),assert=require('assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync(process.argv[2]||'output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot(reduced=false,saved){
 let now=0,id=0,hidden=false,reduceListener;const timers=new Map(),mq={matches:reduced,addEventListener:(name,fn)=>reduceListener=fn};
 const dom=new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  w.Math.random=()=>0.42;Object.defineProperty(w.performance,'now',{value:()=>now});w.innerWidth=388;w.innerHeight=768;w.scrollTo=()=>{};w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};w.matchMedia=()=>mq;
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
function speed(t,id){t.click('[data-act=battleMenu]');t.click('[data-act=combatSpeed][data-speed="'+id+'"]');assert.equal(t.g.currentSavePacket().settings.combatSpeed,id);t.click('[data-act=closeModal]')}
check('three speeds commit identical enemy-turn results immediately; fast uses half the frame time',()=>{
 const states=[];
 for(const id of ['normal','fast','minimal']){const t=boot(),s=battle(t);speed(t,id);t.click('[data-act=endTurn]');states.push(JSON.stringify(s));
  const committed=JSON.stringify(s);t.click('[data-act=endTurn]');assert.equal(JSON.stringify(s),committed,'double tap advanced another turn');
  assert.equal(JSON.parse(readRun(t.w)).turn,2);
  if(id==='minimal')assert(!kind(t));else{assert.equal(kind(t),'start');const duration=id==='fast'?590:1180;t.advance(duration-1);assert(kind(t));t.advance(1);assert(!kind(t))}
  t.advance(5000);assert.equal(JSON.stringify(s),committed);t.close();
 }assert.equal(new Set(states).size,1);
});
check('minimal blocks only accidental repeat: a card or new battle permits the next turn',()=>{
 const t=boot(),s=battle(t);speed(t,'minimal');t.click('[data-act=endTurn]');assert.equal(s.turn,2);t.click('[data-act=endTurn]');assert.equal(s.turn,2);
 s.hand=['guard'];t.g.render();t.click('[data-act=selectCard]');t.click('[data-act=useSelected]');t.click('[data-act=endTurn]');assert.equal(s.turn,3);
 s.stage=1;t.g.render();t.click('[data-act=endTurn]');assert.equal(s.turn,4);t.close();
});
check('all four careers: card and dual results identical across speeds; costs remain readable',()=>{
 for(const key of ['chef-warlock','chef-alchemist','accountant-warlock','accountant-alchemist']){
  const results=[];for(const id of ['normal','fast','minimal']){const t=boot(),s=battle(t,key);s.hand=['soul'];s.usedReal=true;s.hp=50;s.energy=10;t.g.render();speed(t,id);
   t.click('[data-act=selectCard]');t.click('[data-act=useSelected]');results.push(JSON.stringify(s));
   if(id!=='minimal'){assert(t.d.querySelector('.combat-status-copy').textContent.includes('에너지 −0'));t.advance(id==='fast'?150:300);assert.equal(kind(t),'dual');t.click('[data-act=skipCombat]')}
   assert.equal(s.synergies,1);t.advance(5000);assert.equal(JSON.stringify(s),results.at(-1));t.close();
  }assert.equal(new Set(results).size,1,key);
 }
});
check('OS reduced motion overrides normal and fast; minimal never adds moving overlays',()=>{
 for(const id of ['normal','fast','minimal']){const t=boot(true),s=battle(t);speed(t,id);s.hand=['soul'];s.usedReal=true;t.g.render();t.click('[data-act=selectCard]');t.click('[data-act=useSelected]');assert(!kind(t));assert(!t.d.querySelector('.fx-card-fly,.fx-pop,.combat-dual-notice'));t.close()}
});
check('grouped logs preserve cause/effect order, survive backup, and previews do not mutate them',()=>{
 const t=boot(true),s=battle(t);s.hand=['flambe'];s.ingredient=3;s.trainingId='furnace';s.stage=3;t.g.render();
 const before=JSON.stringify(s);t.g.projectSelection(0);t.g.previewCard('flambe');assert.equal(JSON.stringify(s),before);
 t.click('[data-act=selectCard]');t.click('[data-act=targetEnemy]');const group=s.actionLog[0];assert.equal(group.turn,1);assert(group.label.includes(t.g.cards.flambe.name));
 assert(group.lines[0].includes('사용 · 에너지'));assert(group.lines.findIndex(x=>x.includes('재료')&&x.includes('소비'))<group.lines.findIndex(x=>x.includes('에게')&&x.includes('피해')));assert(group.lines.some(x=>x.startsWith('🎓')));
 const snapshot=JSON.stringify(s.actionLog);t.g.render();t.g.projectSelection(0);assert.equal(JSON.stringify(s.actionLog),snapshot);
 const restored=t.g.parseBackup(t.g.backupText()).run;assert.equal(JSON.stringify(restored.actionLog),snapshot);
 t.click('[data-act=battleMenu]');t.click('[data-act=log]');assert(t.d.querySelector('.log-group[open]'));assert.equal(t.d.querySelectorAll('.log-group li').length,group.lines.length);t.close();
});
check('log bounds, malformed backups, old saves and HTML escaping',()=>{
 const t=boot(true),s=battle(t);for(let i=0;i<15;i++){s.hand=['guard'];s.energy=10;t.g.playCard(0)}assert.equal(s.actionLog.length,12);
 const x=JSON.parse(t.g.backupText());for(const value of [null,{},[{}],Array(13).fill(s.actionLog[0]),[{...s.actionLog[0],lines:['x'.repeat(501)]}]]){const copy=JSON.parse(JSON.stringify(x));copy.run.actionLog=value;assert.throws(()=>t.g.parseBackup(JSON.stringify(copy)))}
 delete x.run.actionLog;delete x.settings.combatSpeed;const old=t.g.parseBackup(JSON.stringify(x));assert.equal(old.run.actionLog.length,0);assert.equal(old.settings.combatSpeed,'normal');
 s.actionLog[0].label='<img src=x onerror=alert(1)>';t.g.modal='log';t.g.render();assert(!t.d.querySelector('.log-group img'));assert(t.d.querySelector('.log-group').textContent.includes('<img'));t.close();
});
check('speed settings round-trip and restore; invalid values rejected',()=>{
 for(const id of ['normal','fast','minimal']){const t=boot(),s=battle(t);speed(t,id);const packet=t.g.parseBackup(t.g.backupText());assert.equal(packet.settings.combatSpeed,id);
  t.g.modal='saveManager';t.g.render();t.g.prepareRestore(t.g.backupText());t.g.commitRestore();assert.equal(t.g.currentSavePacket().settings.combatSpeed,id);
  const data=t.w.localStorage.getItem('dualJobSave_v1');assert.equal(JSON.parse(data).settings.combatSpeed,id);t.close();
 }
 const t=boot(),x=JSON.parse(t.g.backupText());x.settings.combatSpeed='turbo';assert.throws(()=>t.g.parseBackup(JSON.stringify(x)));t.close();
});
check('eight specializations: result recap, alternative goals and same-job retry preserve meta, reset run',()=>{
 const catalog=boot();const courses=JSON.parse(JSON.stringify(catalog.g.TRAINING));catalog.close();
 for(const [id,course]of Object.entries(courses)){
  const t=boot(true),s=battle(t,course.pair);s.trainingId=id;s.stage=8;s.nodeType='boss';s.relics=['overtimeClock','dualContract'];s.upgrades[s.deck[0]]=true;s.upgrades.strike=true;s.deck=s.deck.filter(x=>x!=='strike');s.hand=['chop'];s.enemies=s.enemies.slice(0,1);s.enemies[0].hp=1;t.g.playCard(0);
  assert.equal(s.phase,'victory');const recap=t.d.querySelector('.run-build');assert(recap.textContent.includes(course.name));assert(recap.textContent.includes('이중계약서'));assert(recap.textContent.includes(t.g.cards[s.deck[0]].name));assert.notEqual(recap.querySelector('.retry-goal b').textContent,course.name);
  const wins=t.g.meta.wins,attempts=t.g.meta.attempts;t.click('[data-act=retrySame]');assert.equal(t.g.keyPair(),course.pair);assert.equal(t.g.state.phase,'map');assert.equal(t.g.state.trainingId,null);assert.equal(t.g.state.relics.length,0);assert.equal(t.g.meta.wins,wins);assert.equal(t.g.meta.attempts,attempts+1);
  t.g.state.stage=2;t.g.nextStage();assert.equal(t.g.state.phase,'training');assert.equal(t.g.trainingOptions().length,2);t.close();
 }
});
assert.deepEqual(errors,[]);console.log('ALL '+groups+' Patch C groups PASS; mocked clocks/geometry, not human fun or physical-device QA.');
