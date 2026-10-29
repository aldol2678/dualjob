const readRun=w=>{const p=w.localStorage.getItem('dualJobSave_v1');if(!p)return w.localStorage.getItem('dualJobRun_v06');const r=JSON.parse(p).run;return r===null?null:JSON.stringify(r)};
const fs=require('fs'),assert=require('assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync(process.argv[2]||'output/dual_job_original_cards_v0_6.html','utf8');
const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
const dom=new JSDOM(html,{url:'https://local.test/?debug=1',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){w.matchMedia=()=>({matches:true});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}});
const w=dom.window,d=w.document,g=w.__dj;assert(g,'debug hook');let count=0;
function check(name,fn){fn();count++;console.log('PASS',name)}
function click(sel,detail=0){const e=d.querySelector(sel);assert(e,'missing '+sel);e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,detail}));}
function fresh(pair='chef-warlock'){
 g.modal='';g.pick(pair);g.meta.tutorialDone=true;g.newRun();g.chooseNode(0);g.state.tutorial=null;g.state.hp=50;g.state.energy=3;g.state.enemies=[0,1,2].map(i=>({id:'clerk',name:'상대'+i,icon:'👻',hp:70,maxHp:70,block:i*2,debt:i*2,curse:i,baseAttack:8,intent:{type:'attack',amount:8}}));g.state.targetIndex=0;g.render();return g.state;
}
function hand(ids){g.state.hand=ids;g.render()}
check('tap selects without modal or spending energy',()=>{fresh();hand(['chop','broth']);click('[data-act=selectCard]');assert.equal(g.modal,'');assert.equal(g.selectedCard.id,'chop');assert.equal(g.state.energy,3);assert(d.querySelector('.quick-preview').textContent.includes('재료 손질'));assert(d.querySelector('.hp-projection'));});
check('target tap uses chosen card on specified enemy',()=>{click('[data-act=targetEnemy][data-index="1"]');assert.equal(g.state.enemies[1].hp,66);assert.equal(g.state.enemies[0].hp,70);assert.equal(g.state.energy,2);assert.equal(g.selectedCard,null)});
check('self card applies via hero tap',()=>{click('[data-act=selectCard]');click('[data-act=targetSelf]');assert.equal(g.state.block,6);assert.equal(g.state.hand.length,0)});
check('wrong target does not spend self card',()=>{fresh();hand(['guard']);click('[data-act=selectCard]');click('[data-act=targetEnemy][data-index="1"]');assert.equal(g.state.hand.length,1);assert.equal(g.state.energy,3);assert.equal(g.state.targetIndex,1);});
check('cancel and Escape leave battle unchanged',()=>{const before=JSON.stringify(g.state);click('[data-act=cancelSelection]');assert.equal(g.selectedCard,null);click('[data-act=selectCard]');d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(g.selectedCard,null);assert.equal(JSON.stringify(g.state),before)});
check('unaffordable card remains inspectable and cannot be cast',()=>{fresh();hand(['flambe']);g.state.energy=0;g.render();click('[data-act=selectCard]');assert(d.querySelector('.quick-preview').textContent.includes('에너지 2 부족'));assert.equal(d.querySelectorAll('.can-target').length,0);click('[data-act=targetEnemy]');assert.equal(g.state.hand.length,1);click('[data-act=selectedDetails]');assert.equal(g.modal,'card');assert(d.querySelector('[data-act=confirmPlay]').disabled);click('[data-act=closeModal]');assert(g.selectedCard);});
check('fatigue card is selectable but unplayable',()=>{fresh();hand(['fatigue']);click('[data-act=selectCard]');click('[data-act=targetEnemy]');assert.equal(g.state.hand.length,1);assert.equal(g.state.energy,3)});
check('turn end clears selected card',()=>{fresh();hand(['guard']);click('[data-act=selectCard]');click('[data-act=endTurn]');assert.equal(g.selectedCard,null);assert.equal(g.state.turn,2)});
check('forecast removes enemies killed by curse before attacks',()=>{fresh();g.state.enemies[0].hp=2;g.state.enemies[0].curse=1;g.state.block=3;assert.equal(g.turnForecast(g.state).net,13);g.state.enemies[1].intent.type='guard';assert.equal(g.turnForecast(g.state).net,5)});
const summarize=s=>JSON.stringify({hp:s.hp,block:s.block,energy:s.energy,ingredient:s.ingredient,reagent:s.reagent,synergies:s.synergies,relicUsed:s.relicUsed,relicTurn:s.relicTurn,enemies:s.enemies.map(e=>[e.hp,e.block,e.debt,e.curse])});
check('projection matches actual card + synergy across all 4 jobs and all playable cards',()=>{
 let combos=0;
 for(const pair of Object.keys(g.pairs))for(const id of Object.keys(g.cards).filter(k=>k!=='fatigue')){
  fresh(pair);hand([id]);const s=g.state;s.energy=10;s.ingredient=3;s.reagent=3;s.usedReal=g.cards[id].family==='fantasy';s.usedFantasy=g.cards[id].family==='real';s.upgrades={[id]:true};s.relics=['dualContract','protectiveApron'];s.relicTurn={};s.relicUsed={};
  const before=JSON.stringify(s),stored=readRun(w),meta=JSON.stringify(g.meta),p=g.projectSelection(0,1);assert(p);
  assert.equal(JSON.stringify(g.state),before,'preview mutation '+id);assert.equal(JSON.stringify(g.meta),meta);assert.equal(readRun(w),stored);
  w.__djFast=true;g.playCard(0,1);w.__djFast=false;
  assert.equal(summarize(g.state),summarize(p.after),pair+' '+id);combos++;
 }
 console.log('  projection cases',combos);
});
check('lethal self damage and revival projection match actual',()=>{for(const relics of [[],['severancePackage']]){fresh();hand(['soul']);g.state.hp=2;g.state.relics=relics;const p=g.projectSelection(0);g.playCard(0);assert.equal(g.state.hp,p.after.hp);assert.equal(g.state.block,p.after.block);assert.equal(p.terminal,relics.length?null:'defeat')}});
function pointer(type,target,x,y){const e=new w.Event(type,{bubbles:true,cancelable:true});Object.assign(e,{pointerId:7,button:0,clientX:x,clientY:y});target.dispatchEvent(e)}
function rect(e,x,y,width,height){e.getBoundingClientRect=()=>({left:x,top:y,right:x+width,bottom:y+height,width,height})}
check('horizontal gesture remains scroll even when moved over enemy',()=>{fresh();hand(['chop','guard','chop','guard','chop']);const card=d.querySelector('.hand .card'),h=d.querySelector('.hand');rect(d.querySelector('.enemy-unit'),0,0,200,150);pointer('pointerdown',card,200,450);pointer('pointermove',d,140,447);assert.equal(h.scrollLeft,60);pointer('pointermove',d,100,40);pointer('pointerup',d,100,40);click('[data-act=selectCard]',1);assert.equal(g.state.hand.length,5);assert.equal(g.state.energy,3);assert.equal(g.selectedCard,null);});
check('upward drag uses once and suppresses follow-up click',()=>{fresh();hand(['chop','guard']);rect(d.querySelector('.enemy-unit'),0,0,200,150);const card=d.querySelector('.hand .card');pointer('pointerdown',card,100,450);pointer('pointermove',d,103,420);pointer('pointermove',d,100,50);pointer('pointerup',d,100,50);click('[data-act=selectCard]',1);assert.equal(g.state.hand.length,1);assert.equal(g.state.energy,2);assert.equal(g.selectedCard,null)});
check('drop outside targets and pointer cancellation never spend card',()=>{fresh();hand(['chop']);let card=d.querySelector('.hand .card');pointer('pointerdown',card,100,450);pointer('pointermove',d,100,410);pointer('pointerup',d,100,300);assert.equal(g.state.energy,3);assert.equal(g.state.hand.length,1);card=d.querySelector('.hand .card');pointer('pointerdown',card,100,450);pointer('pointermove',d,100,410);pointer('pointercancel',d,100,410);assert.equal(d.querySelector('.drag-ghost'),null);assert.equal(g.state.hand.length,1)});
check('card front has readable effect labels',()=>{fresh();hand(['chop','guard']);assert(d.querySelector('.face-label').textContent==='공격');assert([...d.querySelectorAll('.face-label')].some(e=>e.textContent==='방어'))});
check('v0.5-C2.2 save imports to new key without overwriting original',()=>{fresh();const old=JSON.stringify(g.state);w.localStorage.setItem('dualJobRun_v05C22',old);w.localStorage.removeItem('dualJobRun_v06');const dom2=new JSDOM(html,{url:'https://local.test/?debug=1',runScripts:'dangerously',virtualConsole:vc,beforeParse(v){v.matchMedia=()=>({matches:true});v.scrollTo=()=>{};v.localStorage.setItem('dualJobRun_v05C22',old);}});const v=dom2.window;const btn=v.document.querySelector('[data-act=importRun]');assert(btn);btn.click();assert.equal(v.localStorage.getItem('dualJobRun_v05C22'),old);assert(readRun(v));assert.equal(v.__dj.state.phase,'battle');dom2.window.close()});
assert.deepEqual(errors,[]);console.log('ALL',count,'checks PASS; script errors:',errors.length);dom.window.close();
