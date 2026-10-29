"""Build static hosting, standalone HTML and a private local QA fixture."""
from pathlib import Path
import re,hashlib,json,base64,shutil
ROOT=Path(__file__).resolve().parent.parent
SRC=ROOT/'src';DIST=ROOT/'dist';OUT=ROOT/'output'
DIST.mkdir(exist_ok=True);OUT.mkdir(exist_ok=True)
# Remove only generated output. Source assets are never modified.
if (DIST/'assets').exists():shutil.rmtree(DIST/'assets')
shutil.copytree(SRC/'assets',DIST/'assets')
page=(SRC/'index.html').read_text()
js=(SRC/'assets/game.js').read_text();css=(SRC/'assets/styles.css').read_text()
assert 'window.__dj' not in js,'Debug controls must stay outside production source'
for source,prefix,ext in [(js,'game','js'),(css,'styles','css')]:
 name=f'{prefix}-{hashlib.sha256(source.encode()).hexdigest()[:16]}.{ext}'
 (DIST/'assets'/name).write_text(source)
 (DIST/'assets'/f'{prefix}.{ext}').unlink()
 page=page.replace(f'assets/{prefix}.{ext}',f'assets/{name}')
(DIST/'index.html').write_text(page)
for name in ['404.html','robots.txt']:shutil.copy2(SRC/name,DIST/name)
shutil.copy2(ROOT/'vercel.json',DIST/'vercel.json')
manifest={'version':'0.6.22','assets':{}}
for p in sorted((DIST/'assets').iterdir()):
 b=p.read_bytes();manifest['assets'][p.name]={'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
(OUT/'asset-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
# Standalone files retain the same code and all runtime assets.
standalone=(SRC/'index.html').read_text()
inline_js=js;inline_css=css
mime={'.webp':'image/webp','.svg':'image/svg+xml','.woff':'font/woff','.jpg':'image/jpeg'}
for p in (SRC/'assets').iterdir():
 if p.suffix not in mime:continue
 uri='data:'+mime[p.suffix]+';base64,'+base64.b64encode(p.read_bytes()).decode()
 inline_js=inline_js.replace('assets/'+p.name,uri)
 inline_css=inline_css.replace('./'+p.name,uri)
 standalone=standalone.replace('href="assets/'+p.name+'"','href="'+uri+'"')
standalone=standalone.replace('<link rel="stylesheet" href="assets/styles.css"/>','<style>\n'+inline_css+'\n</style>')
standalone=standalone.replace('<script src="assets/game.js"></script>','<script>'+inline_js+'</script>')
(OUT/'dualjob.html').write_text(standalone)
# Tests need introspection; this file is ignored by Git and never placed in dist.
test_js=inline_js.replace('const save=()=>{','const save=()=>{if(window.__djFast)return;')
test_js=test_js.replace('function render(){','function render(){if(window.__djFast)return;')
needle='render();\n})();';assert test_js.count(needle)==1
test_js=test_js.replace(needle,(ROOT/'qa/debug-hook.js').read_text()+needle)
(OUT/'dualjob-debug.html').write_text(standalone.replace('<script>'+inline_js+'</script>','<script>'+test_js+'</script>'))
print('Built dist/, output/dualjob.html and local-only QA fixture')
