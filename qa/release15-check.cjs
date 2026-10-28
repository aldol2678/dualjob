const fs=require('fs'),assert=require('assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const strip=s=>s.replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const dev=strip(fs.readFileSync('output/dualjob-debug.html','utf8')),release=strip(fs.readFileSync('output/dualjob.html','utf8'));
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
function boot({source=dev,seed={},failWrite=false,failRead=false}={}){
 const switches={failWrite,failRead};const dom=new JSDOM(source,{url:'https://dualjob.test/?debug=1',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.matchMedia=()=>({matches:true});w.scrollTo=()=>{};for(const [k,v]of Object.entries(seed))w.localStorage.setItem(k,v);const set=w.Storage.prototype.setItem,get=w.Storage.prototype.getItem;w.Storage.prototype.setItem=function(k,v){if(switches.failWrite)throw new w.DOMException('blocked','QuotaExceededError');return set.call(this,k,v)};w.Storage.prototype.getItem=function(k){if(switches.failRead)throw new w.DOMException('blocked','SecurityError');return get.call(this,k)}}});
 return {w:dom.window,d:dom.window.document,g:dom.window.__dj,switches,click(s){const e=this.d.querySelector(s);assert(e,s);e.click()},close(){dom.window.close()}};
}
function start(t,key='chef-warlock'){t.g.meta.tutorialDone=true;t.g.pick(key);t.g.newRun();return t.g.state}
function paste(t,text){if(!t.d.querySelector('[data-act=saveManager]'))t.click('[data-act=battleMenu]');t.click('[data-act=saveManager]');t.d.querySelector('#backup-input').value=text;t.click('[data-act=previewBackupText]')}
const slot='dualJobSave_v1';let count=0;const check=(name,fn)=>{fn();count++;console.log('PASS',name)};
check('release hides debug even with debug URL, shows save/about and retains licenses',()=>{const t=boot({source:release});assert.equal(t.g,undefined);t.click('[data-act=saveManager]');assert(t.d.querySelector('#backup-file'));t.click('[data-act=closeModal]');t.click('[data-act=releaseAbout]');assert.equal(t.d.querySelector('a[href^="mailto:"]'),null);assert(!/이메일로 제보하기|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(t.d.body.textContent));assert(!/mailto:/i.test(release));assert(t.d.body.textContent.includes('버그 제보'));assert(t.d.body.textContent.includes('공개 테스트'));assert(release.includes('SIL OPEN FONT LICENSE'));t.close()});
check('backup preview is read-only, cancel is safe, commit is atomic and survives reload',()=>{
 const a=boot();start(a,'accountant-alchemist');a.g.state.gold=77;a.g.save();const text=a.g.backupText();a.close();
 const t=boot();const old=start(t);old.gold=12;t.g.save();const before=t.w.localStorage.getItem(slot),live=JSON.stringify(old);paste(t,text);assert.equal(t.g.modal,'restoreSave');assert.equal(t.w.localStorage.getItem(slot),before);assert.equal(JSON.stringify(t.g.state),live);t.click('[data-act=cancelRestore]');assert.equal(t.w.localStorage.getItem(slot),before);
 t.d.querySelector('#backup-input').value=text;t.click('[data-act=previewBackupText]');t.click('[data-act=commitRestore]');assert.equal(t.g.state,null);const restored=t.w.localStorage.getItem(slot);assert.equal(JSON.parse(restored).run.gold,77);assert.equal(JSON.parse(restored).run.real,'accountant');assert(!t.d.querySelector('[data-act=commitRestore]'));t.close();
 const re=boot({seed:{[slot]:restored}});re.click('[data-act=resume]');assert.equal(re.g.state.gold,77);assert.equal(re.g.state.fantasy,'alchemist');re.close();
});
check('failed restore keeps prior persisted and live state; storage retry and backup remain available',()=>{
 const donor=boot();start(donor);donor.g.state.gold=80;const text=donor.g.backupText();donor.close();const t=boot();start(t);t.g.save();const old=t.w.localStorage.getItem(slot),live=JSON.stringify(t.g.state);paste(t,text);t.switches.failWrite=true;t.click('[data-act=commitRestore]');assert.equal(t.w.localStorage.getItem(slot),old);assert.equal(JSON.stringify(t.g.state),live);assert(t.g.saveIssue);assert(t.d.querySelector('#backup-output').value.includes('aldol-dualjob'));t.switches.failWrite=false;t.click('[data-act=retrySave]');assert.equal(t.g.saveIssue,'');t.close();
});
check('malformed, oversized, future, prototype, unknown card and invalid shop imports never write',()=>{
 const t=boot();start(t);t.g.save();const good=t.g.backupText(),baseline=t.w.localStorage.getItem(slot);const bad=['{','x'.repeat(524289),good.replace('"backupVersion": 1','"backupVersion": 99'),good.replace('"game":','"__proto__": {},"game":')];
 const x=JSON.parse(good);x.run.deck=['not-a-card'];bad.push(JSON.stringify(x));const y=JSON.parse(good);y.run.phase='shop';y.run.shop={cards:['constructor'],relics:[],removed:0,cardBought:{},relicBought:{}};bad.push(JSON.stringify(y));
 for(const s of bad){t.g.modal='';t.g.render();paste(t,s);assert.equal(t.g.modal,'saveManager');assert(!t.d.querySelector('[data-act=commitRestore]'));assert.equal(t.w.localStorage.getItem(slot),baseline)}t.close();
});
check('all four jobs and all active phases round-trip, including settings and terminal meta-only backup',()=>{
 const t=boot();for(const key of Object.keys(t.g.pairs)){
  for(const type of ['battle','shop','rest','event']){const s=start(t,key);const row=t.g.mapRows.findIndex(r=>r.includes(type));s.stage=row;t.g.chooseNode(t.g.mapRows[row].indexOf(type));t.g.modal='';const p=t.g.parseBackup(t.g.backupText());assert.equal(p.run.phase,type);assert.equal(p.run.real,s.real)}
  for(const phase of ['reward','relicReward']){const s=start(t,key);s.phase=phase;s.rewardOptions=phase==='reward'?['chop','soul','guard']:['copperBuckle'];const p=t.g.parseBackup(t.g.backupText());assert.equal(p.run.phase,phase)}
 }
 t.g.state.phase='victory';t.g.meta.wins=3;const p=t.g.parseBackup(t.g.backupText());assert.equal(p.run,null);assert.equal(p.meta.wins,3);t.close();
});
check('legacy save migrates without changing original; blocked/corrupt storage shows warning',()=>{
 const a=boot();start(a);a.g.chooseNode(0);const old=JSON.stringify(a.g.state);a.close();const t=boot({seed:{dualJobRun_v06:old}});t.click('[data-act=resume]');assert.equal(t.w.localStorage.getItem('dualJobRun_v06'),old);assert.equal(JSON.parse(t.w.localStorage.getItem(slot)).run.phase,'battle');t.close();
 for(const options of [{failWrite:true},{failRead:true},{seed:{[slot]:'{invalid'}}]){const q=boot(options);assert(q.g.saveIssue);start(q);assert(q.g.backupText().includes('aldol-dualjob'));q.close()}
});
assert.deepEqual(errors,[]);console.log('ALL '+count+' release groups PASS; actual file-picker/download/browser visuals unverified.');
