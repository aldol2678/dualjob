const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const {JSDOM,VirtualConsole,requestInterceptor}=require('jsdom');
const root=path.resolve('.'),web=path.join(root,'dist');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'output/asset-manifest.json'),'utf8'));
for(const [name,info]of Object.entries(manifest.assets)){
 const bytes=fs.readFileSync(path.join(web,'assets',name));assert.equal(bytes.length,info.bytes);
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),info.sha256);
}
const html=fs.readFileSync(path.join(web,'index.html'),'utf8');
const js=fs.readFileSync(path.join(web,html.match(/<script src="([^"]+)/)[1]),'utf8');
const css=fs.readFileSync(path.join(web,html.match(/rel="stylesheet" href="([^"]+)/)[1]),'utf8');
assert(!js.includes('window.__dj'));assert(!/<script>/.test(html));
for(const m of js.matchAll(/assets\/[^'"`\s)<>]+\.(webp|svg|woff)/g))assert(fs.existsSync(path.join(web,m[0])),m[0]);
for(const m of css.matchAll(/url\(["']?(\.\/[^"')]+)["']?\)/g))assert(fs.existsSync(path.join(web,'assets',m[1])),m[1]);
const errors=[],loaded=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
const localFiles=requestInterceptor(async request=>{const u=new URL(request.url);assert.equal(u.origin,'https://dualjob.test');const p=path.resolve(web,'.'+u.pathname);assert(p.startsWith(web+path.sep));loaded.push(u.pathname);return new Response(fs.readFileSync(p),{headers:{'Content-Type':p.endsWith('.js')?'application/javascript':'text/css'}})});
(async()=>{
 const dom=new JSDOM(html,{url:'https://dualjob.test/?debug=1',runScripts:'dangerously',resources:{interceptors:[localFiles]},virtualConsole:vc,beforeParse(w){w.matchMedia=()=>({matches:true});w.scrollTo=()=>{}}});
 await new Promise(resolve=>dom.window.addEventListener('load',resolve));
 const d=dom.window.document;assert.equal(dom.window.__dj,undefined);assert.equal(d.querySelectorAll('.career-tile').length,4);
 d.querySelector('[data-act=saveManager]').click();assert(d.querySelector('#backup-output'));d.querySelector('[data-act=closeModal]').click();
 d.querySelector('[data-act=start]').click();assert(d.querySelector('.current-routes'));
 assert(loaded.some(x=>x.endsWith('.js'))&&loaded.some(x=>x.endsWith('.css')));assert.deepEqual(errors,[]);dom.window.close();
 console.log('PASS web build: '+Object.keys(manifest.assets).length+' asset hashes; CSS/JS paths; external-resource DOM boot; save menu; game start; no public debug hook. HTTP headers/rendered device behavior unverified.');
})().catch(e=>{console.error(e);process.exitCode=1});
