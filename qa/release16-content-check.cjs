const fs=require('fs'),assert=require('assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot(packet){return new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.innerWidth=320;w.innerHeight=640;w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});if(packet)w.localStorage.setItem('dualJobSave_v1',packet)}})}
const dom=boot(),w=dom.window,g=w.__dj,d=w.document;g.meta.tutorialDone=true;g.pick('chef-warlock');g.newRun();g.modal='';
const names=['출입 심사대','서류 보관실','복사실','사내 복지층','계약 심사부','결산실','야근 전용층','인사 대기실','인사부장실'];
for(let stage=0;stage<9;stage++){
 g.state.stage=stage;g.state.phase='map';g.render();assert.equal(d.querySelector('.map-flow h1').textContent,names[stage]);
 assert.equal(d.querySelectorAll('.route-floor-name').length,9);assert(d.querySelector('.floor-intro').textContent.length>10);
 if([4,7,8].includes(stage))assert(d.querySelector('.floor-intro strong').textContent.includes('인사부장'));
 const before=JSON.stringify(g.state);d.querySelector('[data-act=selectJourneyRoute]').click();g.render();assert.equal(JSON.stringify(g.state),before);
}
console.log('PASS nine named floors, mandatory director messages, non-mutating map previews at 320×640 DOM');
assert.deepEqual(Array.from(g.encounterPool(0,'battle')),['intake']);assert.deepEqual(Array.from(g.encounterPool(8,'boss')),['interview']);
const reached=new Set();let combinations=0;
for(let stage=0;stage<9;stage++)for(const type of g.mapRows[stage]){
 if(!['battle','elite','boss'].includes(type))continue;
 const pool=Array.from(g.encounterPool(stage,type));
 for(const random of [0,0.999]){
  g.newRun();g.modal='';if(stage>=3){g.state.stage=2;g.nextStage();assert(g.chooseTraining('furnace'));}g.state.stage=stage;g.state.nodeType=type;
  const original=w.Math.random;w.Math.random=()=>random;g.spawnEnemy();w.Math.random=original;
  const ids=g.state.enemies.map(e=>e.id).join(',');const id=pool.find(k=>g.ENCOUNTERS[k].ids.join(',')===ids);assert(id);reached.add(id);
  assert(g.state.enemies.length>=2&&g.state.enemies.length<=3);assert.equal(new Set(g.state.enemies.map(e=>e.id)).size,g.state.enemies.length);
  const backup=g.parseBackup(g.backupText());assert.equal(backup.run.enemies.map(e=>e.id).join(','),ids);
  const before=JSON.stringify(g.state.enemies);g.render();g.render();assert.equal(JSON.stringify(g.state.enemies),before);
  // Verify forecast against actual resolution across charging, fatigue and protection turns.
  w.__djFast=true;g.state.hp=g.state.maxHp=1000;
  for(let turn=0;turn<4;turn++){const forecast=g.turnForecast(g.state),hp=g.state.hp;g.endTurn();assert.equal(hp-g.state.hp,forecast.net,`${stage}/${id}/${turn}`);}
  w.__djFast=false;combinations++;
 }
}
assert.equal(reached.size,9);console.log('PASS all nine encounter compositions reachable; '+combinations+' stage/branch rolls, four-turn forecast/execution and backup round trips');
g.newRun();g.modal='';g.state.stage=2;g.nextStage();assert(g.chooseTraining('furnace'));g.state.stage=6;g.state.nodeType='battle';g.spawnEnemy();g.save();
const packet=w.localStorage.getItem('dualJobSave_v1'),expected=JSON.stringify(g.state.enemies);const resumed=boot(packet);
resumed.window.document.querySelector('[data-act=resume]').click();assert.equal(JSON.stringify(resumed.window.__dj.state.enemies),expected);resumed.window.close();
console.log('PASS reload resumes the same enemies and intents without rerolling');
assert.deepEqual(errors,[]);w.close();
