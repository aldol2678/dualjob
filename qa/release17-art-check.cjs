const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto'),{JSDOM,VirtualConsole}=require('jsdom');
const source=fs.readFileSync('src/assets/game.js','utf8');
const map=name=>JSON.parse(source.match(new RegExp('const '+name+'=(\\{[^\\n]+\\});'))[1]);
const cardArt=map('CARD_ART'),relicArt=map('RELIC_ART');
assert.equal(Object.keys(cardArt).length,40);assert.equal(Object.keys(relicArt).length,12);
for(const file of [...Object.values(cardArt),...Object.values(relicArt)])assert(fs.existsSync('src/'+file),file);
for(const a of JSON.parse(fs.readFileSync('docs/art-production-v0617.json','utf8')).assets){const b=fs.readFileSync('src/'+a.file);assert.equal(b.length,a.byte_size);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),a.sha256)}
const html=fs.readFileSync('output/dualjob-debug.html','utf8').replace('window.__dj={','window.__dj={renderCard,relicTile,relics,').replace(/(data:[^;"'<>\s]+;base64,)[A-Za-z0-9+/=]+/g,'$1AA==');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')errors.push(e.message)});
const dom=new JSDOM(html,{url:'https://qa.test/?debug=1',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){w.innerWidth=360;w.innerHeight=740;w.matchMedia=()=>({matches:true});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{}}});
const w=dom.window,g=w.__dj,d=w.document;g.meta.tutorialDone=true;g.newRun();g.modal='';g.state.tutorial=null;
const holder=d.createElement('div');
for(const id of Object.keys(g.cards)){
 holder.innerHTML=g.renderCard(id,{preview:true});const img=holder.querySelector('img.card-art');assert(img,id);assert.equal(img.dataset.asset,'card_'+id);assert(img.src.startsWith('data:image/webp;base64,'));assert.equal(img.alt,'');assert(!holder.querySelector('.art-symbol'));assert(holder.querySelector('.card-name').textContent.includes(g.cards[id].name));
}
g.state.phase='shop';g.state.shop={cards:['audit','eclipse','grandFeast'],relics:[],cardBought:{},relicBought:{},removed:0};
g.render();assert.equal(d.querySelectorAll('.shop-icon img').length,3);
const before=JSON.stringify(g.state);d.querySelector('[data-act=previewShopCard]').click();assert(d.querySelector('.txn-icon .card-thumb'));assert.equal(JSON.stringify(g.state),before);d.querySelector('[data-act=closeModal]').click();
for(const id of Object.keys(g.relics)){
 g.state.shop.relics=[id];g.render();assert.equal(d.querySelector('.relic-art').dataset.asset,'relic_'+id);
 const before=JSON.stringify(g.state);d.querySelector('[data-act=previewShopRelic]').click();assert.equal(d.querySelector('.txn-icon .relic-art').dataset.asset,'relic_'+id);assert.equal(JSON.stringify(g.state),before);d.querySelector('[data-act=closeModal]').click();
}
g.state.relics=Object.keys(g.relics);g.modal='relics';g.render();assert.equal(d.querySelectorAll('#modal .relic-art').length||d.querySelectorAll('.modal .relic-art').length,12);
assert.deepEqual(errors,[]);dom.window.close();
console.log('PASS art: 40 illustrated cards, 12 illustrated relics, 39 byte hashes, standalone image embedding, shop previews retain state, owned relic gallery. Browser geometry is not measured by this test.');
