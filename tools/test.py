#!/usr/bin/env python3
"""Teste un ou plusieurs modules en Chrome headless : parcourt toutes les diapos et toutes les étapes,
relève les erreurs JS, et peut produire des captures.  Usage :
  python3 tools/test.py W01 X02          → rapport d'erreurs
  python3 tools/test.py W01 --shot 5,8   → captures des diapos 5 et 8 (étape max) dans tools/out/W01-5.png …
  python3 tools/test.py --all            → tous les modules présents"""
import os, sys, re, json, subprocess, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SRC = os.path.join(ROOT, "src"); OUT = os.path.join(ROOT, "tools", "out")
os.makedirs(OUT, exist_ok=True)
CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
rd = lambda p: open(os.path.join(SRC, p), encoding="utf-8").read()
CSS = rd("engine/viewer.css") + rd("engine/kit-office.css"); PRE = rd("engine/kit-base.js") + "\n" + rd("engine/kit-office.js"); JS = rd("engine/viewer.js")
D0 = "const IMG={};const IMGX=IMG;const IMGI={};const ORIG=[];"
_sv = sys.argv[sys.argv.index("--shot") + 1] if "--shot" in sys.argv else None
args = [a for a in sys.argv[1:] if not a.startswith("--") and a != _sv]
if "--all" in sys.argv: args = sorted(f[:-3] for f in os.listdir(os.path.join(SRC, "modules")) if f.endswith(".js"))
shots = []
if "--shot" in sys.argv: shots = [int(x) for x in sys.argv[sys.argv.index("--shot") + 1].split(",")]
TEST = r"""<script>
window.__ERR=[];addEventListener('error',e=>__ERR.push((e.message||'')+' @'+e.lineno));
const _ce=console.error;console.error=(...a)=>{__ERR.push('console.error '+a.map(x=>x&&x.stack?x.stack.split('\n')[0]:String(x)).join(' '));_ce(...a)};
</script>"""
RUN = r"""<script>
setTimeout(()=>{const V=window.VIEWER,S=window.MODULE.slides,rep=[];
 for(let i=0;i<S.length;i++){ const before=__ERR.length; try{V.go(i,0);}catch(e){__ERR.push('go '+i+' '+e.message)}
   let n=0; while(n<40){ const st=V.step; V.next(); if(V.cur!==i){break} n++; if(V.step===st)break; }
   const el=document.querySelector('.slide[data-i="'+i+'"]');
   let over=0; if(el){ el.querySelectorAll('.card,.ow,.xg,.pg,.sd,.otip,.labgo,.callout').forEach(x=>{const r=x.getBoundingClientRect(),s=document.getElementById('stage').getBoundingClientRect(),k=s.width/1600; if(r.right>s.right+4*k||r.bottom>s.bottom+4*k)over++;}); }
   rep.push({i:i+1,t:S[i].title,steps:n,err:__ERR.slice(before),over});
 }
 const pre=document.createElement('pre');pre.id='RESULT';pre.textContent=JSON.stringify({n:S.length,err:__ERR,rep});document.body.append(pre);
},400);</script>"""
def page(code, extra):
    return f'<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{TEST}<script>{D0}</script><script>{PRE}</script><script>{rd("modules/"+code+".js")}</script><script>{JS}</script>{extra}</body></html>'
bad = 0
for code in args:
    p = os.path.join(OUT, code + ".html")
    open(p, "w").write(page(code, RUN))
    r = subprocess.run([CH, "--headless=new", "--disable-gpu", "--virtual-time-budget=60000", "--window-size=1600,900", "--dump-dom", "file://" + p], capture_output=True, text=True, timeout=300)
    m = re.search(r'<pre id="RESULT">(.*?)</pre>', r.stdout, re.S)
    if not m: print(code, "✘ pas de résultat (erreur fatale ?)"); bad += 1; continue
    d = json.loads(html.unescape(m.group(1)))
    errs = [f"  diapo {x['i']} « {x['t']} » : {e}" for x in d["rep"] for e in x["err"]]
    over = [f"  diapo {x['i']} « {x['t']} » : {x['over']} bloc(s) hors cadre" for x in d["rep"] if x["over"]]
    glob = [e for e in d["err"] if not any(e in x["err"] for x in d["rep"])]
    print(f"{code} : {d['n']} diapos, {sum(x['steps'] for x in d['rep'])} étapes — {'OK' if not errs and not glob else 'ERREURS'}")
    for l in glob + errs + over: print(l)
    bad += bool(errs or glob)
    for s in shots:
        sp = os.path.join(OUT, f"{code}-{s}.html")
        open(sp, "w").write(page(code, "<style>*,*::before,*::after{animation-delay:0s!important;animation-duration:.01s!important;transition:none!important}.slide{opacity:1!important;transform:none!important;filter:none!important}</style><script>setTimeout(()=>{VIEWER.go(%d,99);document.querySelectorAll('.slide').forEach(e=>{if(e!==document.querySelector('.slide:last-child'))e.remove()})},300)</script>" % (s - 1)))
        subprocess.run([CH, "--headless=new", "--disable-gpu", "--virtual-time-budget=6000", "--window-size=1600,900", "--hide-scrollbars", "--screenshot=" + os.path.join(OUT, f"{code}-{s}.png"), "file://" + sp], capture_output=True, timeout=120)
        print("  capture :", os.path.join(OUT, f"{code}-{s}.png"))
sys.exit(1 if bad else 0)
