// Deterministic exploratory bot, NOT player win rates or a release balance gate.
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const dom=new JSDOM(html,{url:'https://probe.test/?debug=1',runScripts:'dangerously',virtualConsole:new VirtualConsole(),beforeParse(w){w.scrollTo=()=>{};w.matchMedia=()=>({matches:true})}});
const w=dom.window,g=w.__dj;w.__djFast=true;g.meta.tutorialDone=true;
let rng=1;w.Math.random=()=>((rng=(Math.imul(rng,1664525)+1013904223)>>>0)/4294967296);
function bestCard(){
 const s=g.state,current=g.turnForecast(s);let best=null;
 for(let i=0;i<s.hand.length;i++){
  const id=s.hand[i];if(id==='fatigue'||g.getCost(id)>s.energy)continue;
  for(let j=0;j<s.enemies.length;j++){
   if(s.enemies[j].hp<=0)continue;
   const checkpoint=rng,p=g.projectSelection(i,j);rng=checkpoint;
   if(p.terminal==='defeat')continue;
   let score=0,a=p.after;
   for(let n=0;n<s.enemies.length;n++){
    const e=s.enemies[n],b=a.enemies[n];
    score+=e.hp-b.hp+1.5*(b.curse-e.curse)+0.7*(b.debt-e.debt)+(e.hp>0&&b.hp<=0?12:0);
   }
   score+=1.8*(current.net-p.forecast.net)+1.5*(a.hp-s.hp)+1.4*(a.ingredient+a.reagent-s.ingredient-s.reagent)+1.5*(a.hand.length-s.hand.length+1)+2*(a.energy-s.energy);
   if(p.dual)score+=3;if(p.terminal==='victory')score+=100;
   if(!best||score>best.score)best={i,j,score};
   if(g.targetMode(id)==='self')break;
  }
 }
 return best&&best.score>0?best:null;
}
const rows=[],seeds=Number(process.argv[2]||20),route=[0,0,1,1,0,1,2,0,0];
for(const pair of Object.keys(g.pairs))for(const id of [null,...Object.keys(g.TRAINING).filter(k=>g.TRAINING[k].pair===pair)]){
 let wins=0,five=0,reachedFive=0,totalTurns=0,winHp=0;
 for(let seed=1;seed<=seeds;seed++){
  rng=seed;g.pick(pair);g.newRun();g.modal='';let steps=0,s=g.state;
  while(!['victory','defeat'].includes(s.phase)&&steps++<1000){
   if(s.phase==='training'){if(id)g.chooseTraining(id);else s.phase='map';}
   else if(s.phase==='map'){if(g.floorDecisionPending())g.takeFloorDecision(s.stage,0);if(s.stage===4)reachedFive++;g.chooseNode(route[s.stage]);}
   else if(s.phase==='rest')g.restAction('heal');
   else if(s.phase==='shop'){g.buyItem('relic',0);g.nextStage();}
   else if(s.phase==='reward'){if(s.stage===4)five++;g.pickReward(0);}
   else if(s.phase==='relicReward'){if(s.stage===4)five++;g.pickRelic(0);}
   else if(s.phase==='battle'){
    let cards=0;while(s.phase==='battle'&&cards++<30){const b=bestCard();if(!b)break;g.playCard(b.i,b.j);}
    if(s.phase==='battle'){g.endTurn();totalTurns++;if(s.turn>60)throw Error('combat timeout');}
   }else throw Error('unexpected phase '+s.phase);
  }
  if(steps>=1000)throw Error('run timeout');
  if(s.phase==='victory'){wins++;winHp+=s.hp;}
 }
 const row={pair,training:id||'control',runs:seeds,reachedFive,clearedFive:five,wins,meanEndTurns:+(totalTurns/seeds).toFixed(1),meanWinHp:wins?+(winHp/wins).toFixed(1):null};rows.push(row);console.log(JSON.stringify(row));
}
fs.writeFileSync('output/release21-balance-probe.json',JSON.stringify({note:'Exploratory fixed-route greedy bot. Control uses revision21 shop but no training. Same initial seeds; RNG paths diverge. No overtime, upgrades, or deck optimization.',rows},null,2));w.close();
