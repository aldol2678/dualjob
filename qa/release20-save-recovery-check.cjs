// v0.6.20 storage/reload regression. Simulated same-origin localStorage in fresh JSDOM windows.
// Browser context isolation and Android physical hardware are deliberately NOT claimed.
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace(/(data:[^;"'<>\\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const MAIN='dualJobSave_v1',RECOVERY='dualJobSave_v1_recovery',errors=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot(entries={},options={}){
 const dom=new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  w.innerWidth=390;w.innerHeight=780;w.scrollTo=()=>{};w.matchMedia=()=>({matches:true});
  for(const [k,v] of Object.entries(entries))w.localStorage.setItem(k,v);
  if(options.failKey){const original=w.Storage.prototype.setItem;
   w.Storage.prototype.setItem=function(k,v){if(k===options.failKey)throw new w.DOMException('QuotaExceededError','QuotaExceededError');return original.call(this,k,v)};
  }
 }});
 const {window:w}=dom;return {dom,w,g:w.__dj,d:w.document,read:()=>Object.fromEntries([MAIN,RECOVERY].map(k=>[k,w.localStorage.getItem(k)])),close:()=>dom.window.close()};
}
function check(label,fn){fn();console.log('PASS',label)}
const initial=boot();assert(initial.g);initial.g.meta.tutorialDone=true;initial.g.pick('chef-warlock');initial.g.newRun();
const state=initial.g.state;state.phase='map';state.stage=1;state.hp=50;state.gold=42;state.deck.push('strike');initial.g.save();
const raw=initial.read();assert(raw[MAIN]&&raw[MAIN]===raw[RECOVERY]);const saved=JSON.parse(raw[MAIN]);assert.equal(saved.run.stage,1);
check('primary and recovery copies stored atomically at 2nd map',()=>assert.equal(JSON.parse(raw[RECOVERY]).run.gold,42));
const normal=boot(raw);check('reload in same origin exposes resume CTA',()=>{
 assert(normal.g);assert(normal.d.querySelector('[data-act=resume]'));assert.equal(normal.g.state,null);
 normal.d.querySelector('[data-act=resume]').click();
 assert.equal(normal.g.state.stage,1);assert.equal(normal.g.state.hp,50);assert.equal(normal.g.state.gold,42);
});normal.close();
const missing=boot({[RECOVERY]:raw[RECOVERY]});check('missing primary restores secondary without losing progress',()=>{
 assert(missing.d.querySelector('[data-act=resume]'));missing.d.querySelector('[data-act=resume]').click();assert.equal(missing.g.state.stage,1);
 assert.equal(JSON.parse(missing.read()[MAIN]).run.stage,1);
});missing.close();
const corrupt=boot({[MAIN]:'not-json',[RECOVERY]:raw[RECOVERY]});check('corrupt primary falls back to secondary with warning',()=>{
 assert(corrupt.d.querySelector('[data-act=resume]'));assert(corrupt.g.saveIssue.includes('복구'));
 const original=corrupt.read()[MAIN];assert.equal(original,'not-json');
 corrupt.d.querySelector('[data-act=resume]').click();
 assert.equal(corrupt.g.state.gold,42);assert.equal(JSON.parse(corrupt.read()[MAIN]).run.gold,42);
});corrupt.close();
const malformed=JSON.stringify({...saved,run:{...saved.run,deck:[]}}),badRun=boot({[MAIN]:malformed,[RECOVERY]:raw[RECOVERY]});
check('valid packet with corrupt embedded run falls back without overwriting source first',()=>{
 assert(badRun.d.querySelector('[data-act=resume]'));assert(badRun.g.saveIssue.includes('복구'));
 assert.equal(badRun.read()[MAIN],malformed);
 badRun.d.querySelector('[data-act=resume]').click();
 assert.equal(badRun.g.state.stage,1);assert.equal(badRun.g.state.deck.length,saved.run.deck.length);
});badRun.close();
const ended=JSON.stringify({...saved,run:null}),stale=boot({[MAIN]:ended,[RECOVERY]:raw[RECOVERY]});
check('intentional run:null never resurrects stale recovery',()=>assert.equal(stale.d.querySelector('[data-act=resume]'),null));stale.close();
const noMirror=boot({}, {failKey:RECOVERY});noMirror.g.meta.tutorialDone=true;noMirror.g.newRun();
check('recovery-slot write failure leaves successful primary save intact',()=>{
 assert(JSON.parse(noMirror.read()[MAIN]).run);assert.equal(noMirror.read()[RECOVERY],null);
 assert(noMirror.g.saveIssue.includes('복구 저장본'));
});noMirror.close();
const noSave=boot({}, {failKey:MAIN});noSave.g.newRun();
check('primary write failure is prominently diagnosed, not called saved',()=>{
 assert.equal(noSave.read()[MAIN],null);assert(noSave.g.saveIssue.includes('저장하지 못했어요'));
 assert.equal(noSave.d.querySelector('#save-alert').hidden,false);
});noSave.close();
const exit=boot(raw);exit.d.querySelector('[data-act=resume]').click();exit.g.state.gold=66;exit.w.dispatchEvent(new exit.w.Event('pagehide'));
check('pagehide flush retains last unsaved run state',()=>assert.equal(JSON.parse(exit.read()[MAIN]).run.gold,66));exit.close();
const isolated=boot();check('separate browser context is UNKNOWN/no shared localStorage',()=>assert.equal(isolated.d.querySelector('[data-act=resume]'),null));isolated.close();
initial.close();assert.deepEqual(errors,[]);
console.log('PASS v0.6.20 recovery/reload: 10 checks; JSDOM storage simulation only');
