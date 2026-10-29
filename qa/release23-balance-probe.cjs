// Exploratory paired bot runs. These are not player win rates or proof of fun.
const fs=require('node:fs'),path=require('node:path'),{JSDOM,VirtualConsole}=require('jsdom');
const input=process.argv[2]||'output/dualjob-debug.html',out=process.argv[3]||'output/release23-probe.json',seeds=Number(process.argv[4]||3);
const html=fs.readFileSync(input,'utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const dom=new JSDOM(html,{url:'https://probe.test/?debug=1',runScripts:'dangerously',virtualConsole:new VirtualConsole(),beforeParse(w){w.scrollTo=()=>{};w.matchMedia=()=>({matches:true})}});
const w=dom.window,g=w.__dj;w.__djFast=true;g.meta.tutorialDone=true;
let random=1;w.Math.random=()=>((random=(Math.imul(random,1664525)+1013904223)>>>0)/4294967296);
function best(){
 const s=g.state,now=g.turnForecast(s);let best=null;
 for(let i=0;i<s.hand.length;i++){
  const id=s.hand[i];if(id==='fatigue'||g.getCost(id)>s.energy)continue;
  for(let j=0;j<s.enemies.length;j++){
   if(s.enemies[j].hp<=0)continue;
   const keep=random,p=g.projectSelection(i,j);random=keep;if(p.terminal==='defeat')continue;
   const a=p.after;let score=0;
   s.enemies.forEach((e,n)=>{const b=a.enemies[n];score+=e.hp-b.hp+1.5*(b.curse-e.curse)+.7*(b.debt-e.debt)+(e.hp>0&&b.hp<=0?12:0)});
   score+=1.8*(now.net-p.forecast.net)+1.5*(a.hp-s.hp)+1.4*(a.ingredient+a.reagent-s.ingredient-s.reagent)+1.5*(a.hand.length-s.hand.length+1)+2*(a.energy-s.energy);
   if(p.dual)score+=3;if(p.terminal==='victory')score+=100;
   if(!best||score>best.score)best={i,j,score};if(g.targetMode(id)==='self')break;
  }
 }
 return best&&best.score>0?best:null;
}
function fight(){
 const s=g.state,r={stage:s.stage+1,type:s.nodeType,startHp:s.hp,turns:0,cards:0,maxCardsPerTurn:0,phase2Turn:null,reviewTurns:[],verdictTurns:[],bossKilledTurn:null,capHit:false};
 while(s.phase==='battle'&&s.turn<=60){
  let n=0;
  while(s.phase==='battle'&&n<100){
   const b=best();if(!b)break;g.playCard(b.i,b.j);n++;r.cards++;
   if(s.bossPhase===2&&r.phase2Turn===null)r.phase2Turn=s.turn;
   if(s.nodeType==='boss'&&s.enemies[0].hp<=0&&r.bossKilledTurn===null)r.bossKilledTurn=s.turn;
  }
  r.maxCardsPerTurn=Math.max(r.maxCardsPerTurn,n);r.turns=s.turn;
  if(n===100){r.capHit=true;break}
  if(s.phase==='battle'){
   const boss=s.enemies.find(e=>e.id==='boss'&&e.hp>e.curse*2);
   if(boss?.intent.pattern==='hr-review')r.reviewTurns.push(s.turn);
   if(boss?.intent.pattern==='hr-verdict')r.verdictTurns.push(s.turn);
   g.endTurn();if(s.bossPhase===2&&r.phase2Turn===null)r.phase2Turn=s.turn-1;
   if(s.nodeType==='boss'&&s.enemies[0].hp<=0&&r.bossKilledTurn===null)r.bossKilledTurn=s.turn-1;
  }
 }
 r.endHp=s.hp;r.result=s.phase;r.goldAfter=s.gold;return r;
}
const routes={safe:[0,1,2,1,2,1,1,0,0],battle:[0,0,1,1,1,2,2,0,0],elite:[0,0,0,1,0,2,0,0,0]},rows=[];
for(const pair of Object.keys(g.pairs))for(const training of g.trainingOptions({real:pair.split('-')[0],fantasy:pair.split('-')[1]}))for(const [route,choices]of Object.entries(routes))for(let seed=1;seed<=seeds;seed++){
 random=seed;g.pick(pair);g.newRun();g.modal='';const s=g.state,battles=[];let steps=0,capHit=false;
 while(!['victory','defeat'].includes(s.phase)&&steps++<100){
  if(s.phase==='training')g.chooseTraining(training);
  else if(s.phase==='map'){
   if(g.floorDecisionPending())g.takeFloorDecision(s.stage,s.stage===6?1:0);
   g.chooseNode(choices[s.stage]);
  }else if(s.phase==='battle'){const b=fight();battles.push(b);if(b.capHit||s.phase==='battle'){capHit=true;break}}
  else if(s.phase==='rest'){
   const ids=g.availableUpgrades(),id=ids.includes(g.pairs[pair].sig)?g.pairs[pair].sig:ids[0];
   if(s.hp<=s.maxHp-20||!id)g.restAction('heal');else g.restAction('upgrade',id);
  }else if(s.phase==='shop'){g.buyItem('relic',0);g.buyItem('relic',1);g.nextStage()}
  else if(s.phase==='event')g.selectEvent(2); // Guaranteed safe skip/recovery, same policy in all cases.
  else if(s.phase==='reward'){
   const target=g.TRAINING[training].cards;let i=s.rewardOptions.findIndex(id=>target.includes(id));
   g.pickReward(i>=0?i:-1);
  }else if(s.phase==='relicReward')g.pickRelic(0);
  else throw Error('unexpected phase '+s.phase);
 }
 rows.push({pair,training,route,seed,result:s.phase,hp:s.hp,maxHp:s.maxHp,gold:s.gold,upgrades:Object.keys(s.upgrades).length,relics:[...s.relics],deck:[...s.deck],victories:s.defeated,capHit,battles});
}
// Same synthetic boss loadout/HP/seed; isolate draw, energy and discount items.
const ablations=[];
for(const pair of Object.keys(g.pairs))for(const mode of ['base','draw','energy','discount','combined'])for(let seed=1;seed<=seeds;seed++){
 random=seed;g.pick(pair);g.newRun();const s=g.state;s.stage=8;s.nodeType='boss';s.trainingId=g.trainingOptions()[0];
 s.upgrades={[g.pairs[pair].sig]:true};
 if(['draw','combined'].includes(mode)){s.deck.push('hustle');s.upgrades.hustle=true}
 if(['energy','combined'].includes(mode))s.relics.push('dualContract');
 if(['discount','combined'].includes(mode))s.relics.push('overtimeClock');
 g.spawnEnemy();ablations.push({pair,mode,seed,...fight()});
}
const loops=[];
for(const pair of Object.keys(g.pairs)){
 random=1;g.pick(pair);g.newRun();g.chooseNode(0);const s=g.state,id=s.real==='chef'?'taste':'receipt';
 // A legal five-card deck after removals, all drawn at battle start.
 s.deck=[id,...s.deck.filter(k=>k!==id).slice(0,4)];s.hand=[...s.deck];s.drawPile=[];s.discard=[];
 const energy=s.energy;let uses=0;
 while(uses<100&&s.hand.includes(id)){g.playCard(s.hand.indexOf(id),0);uses++}
 loops.push({pair,id,uses,energyDelta:s.energy-energy,stillInHand:s.hand.includes(id)});
}
const result={note:'Fixed-seed greedy bot, not player win rates. Routes share start seed/deck and decision policy; RNG paths diverge. Events choose option 2, no overtime, upgrades prefer signature. Ablations are synthetic equal boss fixtures, not acquired runs.',seeds,rows,ablations,loops};
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(result,null,2));
for(const route of Object.keys(routes)){const rs=rows.filter(r=>r.route===route),wins=rs.filter(r=>r.result==='victory');console.log(JSON.stringify({route,runs:rs.length,wins:wins.length,caps:rs.filter(r=>r.capHit).length,meanHp:+(rs.reduce((a,r)=>a+r.hp,0)/rs.length).toFixed(1),meanGold:+(rs.reduce((a,r)=>a+r.gold,0)/rs.length).toFixed(1),bossVerdicts:rs.filter(r=>r.battles.some(b=>b.verdictTurns.length)).length}))}
console.log('LOOPS',JSON.stringify(loops));console.log('SAVED',out);w.close();
