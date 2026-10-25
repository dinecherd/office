#!/usr/bin/env python3
"""Office Academy — assemble la formation animée en UN fichier HTML autonome (hors ligne),
sur le modèle de la formation EDU-210 : hub de modules + chaque module ouvert dans une iframe
construite à partir de blocs <script type="text/plain"> (CSS, kit, contenu, moteur).

  python3 build.py            → index.html + Office-Formation-Complete.html (copie à télécharger)
  python3 build.py --check    → vérifie aussi la syntaxe de chaque module avec node
"""
import json, os, re, subprocess, sys, html

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
rd = lambda p: open(os.path.join(SRC, p), encoding="utf-8").read()

mods = json.load(open(os.path.join(SRC, "modules.json"), encoding="utf-8"))
present = [m for m in mods if os.path.exists(os.path.join(SRC, "modules", m["code"] + ".js"))]
if "--check" in sys.argv:
    bad = 0
    for m in present:
        r = subprocess.run(["node", "--check", os.path.join(SRC, "modules", m["code"] + ".js")], capture_output=True, text=True)
        if r.returncode: bad += 1; print("✘", m["code"], r.stderr.strip().splitlines()[-1] if r.stderr else "")
    if bad: sys.exit(1)

def block(i, txt):
    # neutralise toute fermeture de balise script dans le contenu
    safe = txt.replace("</script", "<\\/script")
    return '<script type="text/plain" id="' + i + '">' + safe + '</script>\n'

CSS = rd("engine/viewer.css") + "\n" + rd("engine/kit-office.css")
PRE = rd("engine/kit-base.js") + "\n" + rd("engine/kit-office.js")
JS = rd("engine/viewer.js")
D0 = "const IMG={};const IMGX=IMG;const IMGI={};const ORIG=[];"

APPS = {
    "intro": ("Introduction", "#FA582D", "#FF8A3D", "★"),
    "word": ("Word", "#185ABD", "#41A5EE", "W"),
    "excel": ("Excel", "#107C41", "#33C481", "X"),
    "ppt": ("PowerPoint", "#C43E1C", "#FF8F6B", "P"),
}
LV = {1: "Débutant", 2: "Intermédiaire", 3: "Avancé", 4: "Expert"}
LABURL = "https://dinecherd.github.io/panw/pages/office.html"

cards, k = {}, 0
for m in present:
    k += 1
    n, c1, c2, L = APPS[m["app"]]
    lvl = f'<span class="hc">{LV[m["level"]]}</span>' if m.get("level") else ""
    num = m["code"][1:] if m["app"] != "intro" else "00"
    cards.setdefault(m["app"], []).append(
        f'<button class="c" style="animation-delay:{k*0.035:.2f}s;--a1:{c1};--a2:{c2}" data-m="{m["code"]}">{lvl}'
        f'<b>{L}<i>{num}</i></b><h2>{html.escape(m["title"])}</h2><small>{html.escape(m["desc"])}</small></button>')
sections = ""
for app in ["intro", "word", "excel", "ppt"]:
    if app not in cards: continue
    n, c1, c2, L = APPS[app]
    head = "Pour commencer" if app == "intro" else f'<span style="color:{c2}">{L}</span> {n} · du débutant à l\'expert'
    sections += f'<h3>{head}</h3><div class="g">{"".join(cards[app])}</div>'

nslides = 0
blocks = block("e-css", CSS) + block("e-pre", PRE) + block("e-js", JS) + block("d-0", D0)
for m in present:
    src = rd("modules/" + m["code"] + ".js")
    nslides += len(re.findall(r"^\s*\{\s*(?:t:|title:)", src, re.M))
    blocks += block("c-" + m["code"], src)

HUB_CSS = """
:root{--or:#FA582D;--or2:#FF8A3D}*{box-sizing:border-box;margin:0}html,body{background:#070C18}
#hub{min-height:100vh;background:radial-gradient(900px 600px at 85% 10%,rgba(250,88,45,.22),transparent 60%),radial-gradient(800px 600px at 0 100%,rgba(24,90,189,.2),transparent 60%),radial-gradient(700px 500px at 50% 60%,rgba(16,124,65,.12),transparent 60%),#070C18;color:#fff;font-family:"Segoe UI",-apple-system,Roboto,Arial,sans-serif;padding:60px 6vw}
.top{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.top .sp{flex:1}
.k{color:var(--or2);letter-spacing:.3em;font-weight:800;font-size:14px}h1{font-size:clamp(34px,5vw,64px);font-weight:900;letter-spacing:-.03em;margin:10px 0 8px}h1 span{background:linear-gradient(90deg,#41A5EE,#33C481 45%,var(--or2));-webkit-background-clip:text;background-clip:text;color:transparent}
p.s{color:#94A3B8;font-size:18px;margin-bottom:22px;max-width:980px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px}
h3{color:#CBD5E1;font-size:15px;letter-spacing:.2em;text-transform:uppercase;margin:38px 0 16px}
.c{position:relative;display:block;text-align:left;font:inherit;cursor:pointer;color:#fff;padding:28px;border-radius:22px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:.25s;animation:r .7s both}
.c:hover,.c:focus-visible{transform:translateY(-6px);border-color:var(--a2);box-shadow:0 20px 60px -20px var(--a1);outline:none}
.c b{position:relative;display:inline-grid;place-items:center;width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,var(--a1),var(--a2));font:900 30px Georgia,serif;margin-bottom:18px}
.c b i{position:absolute;right:-10px;bottom:-8px;font:800 12px "Segoe UI",Arial;font-style:normal;background:#0B1224;border:1px solid rgba(255,255,255,.25);border-radius:7px;padding:1px 6px}
.c h2{font-size:21px;margin-bottom:6px;line-height:1.25}.c small{color:#94A3B8;font-size:15px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.hc{position:absolute;right:16px;top:16px;font-size:12px;font-weight:700;color:#FFB37A;background:rgba(250,88,45,.15);border:1px solid rgba(250,88,45,.4);border-radius:8px;padding:3px 8px}
@keyframes r{from{opacity:0;transform:translateY(30px)}}
.t{margin-top:44px;color:#64748B;font-size:14px;line-height:1.7}.t kbd{background:#1E293B;border:1px solid #334155;border-radius:6px;padding:1px 7px;color:#fff;font-size:12px}
.act{display:flex;gap:12px;flex-wrap:wrap;margin:6px 0 10px}
.act a{display:inline-flex;align-items:center;gap:8px;font:700 15px "Segoe UI",Arial;color:#fff;text-decoration:none;padding:11px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);transition:.2s}
.act a:hover{border-color:var(--or);transform:translateY(-2px)}.act a.pri{background:linear-gradient(135deg,var(--or),var(--or2));border-color:transparent;box-shadow:0 14px 40px -14px rgba(250,88,45,.7)}
.stats{display:flex;gap:30px;flex-wrap:wrap;margin:8px 0 6px;color:#94A3B8;font-size:14px}.stats b{display:block;color:#fff;font-size:30px;font-weight:900}
.tiles{display:flex;gap:10px}.tiles i{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;font:900 22px Georgia,serif;font-style:normal;animation:fl 5s ease-in-out infinite}
.tiles i:nth-child(2){animation-delay:-1.6s}.tiles i:nth-child(3){animation-delay:-3.2s}@keyframes fl{50%{transform:translateY(-6px) rotate(-4deg)}}
#view{position:fixed;inset:0;display:none;background:#070C18}#view iframe{width:100%;height:100%;border:0;display:block}
#bar{position:fixed;left:50%;translate:-50% 0;top:6px;z-index:9;display:none;gap:8px;opacity:.18;transition:opacity .2s}#bar:hover{opacity:1}
#bar button{font:700 13px "Segoe UI",-apple-system,Arial,sans-serif;color:#fff;background:rgba(7,12,24,.85);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:7px 12px;cursor:pointer}#bar button:hover{border-color:var(--or)}
#ld{position:fixed;inset:0;display:none;place-items:center;color:#fff;font:700 20px "Segoe UI",Arial,sans-serif;background:#070C18;z-index:10}
@media (max-width:600px){#hub{padding:36px 16px}}
"""

LOADER = r"""
(function(){
const order=[...document.querySelectorAll('.c')].map(c=>c.dataset.m);
const T=id=>document.getElementById(id).textContent;
const hub=document.getElementById('hub'),view=document.getElementById('view'),bar=document.getElementById('bar'),ld=document.getElementById('ld');
let cur=null;
let HID={};try{HID=JSON.parse(localStorage.getItem('office-hidden')||'{}')||{}}catch(e){}
addEventListener('message',e=>{const d=e.data||{};if(d.edu==='home')close();else if(d.edu==='hidden'&&d.code){HID[d.code]=d.list||[];try{localStorage.setItem('office-hidden',JSON.stringify(HID))}catch(e){}}});
function open(code){
  ld.style.display='grid';
  setTimeout(()=>{
    const doc='<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Office Academy · '+code+'</title><style>'+T('e-css')+'</style></head><body>'
      +'<script>try{const r=history.replaceState.bind(history);history.replaceState=function(){try{r.apply(null,arguments)}catch(e){}}}catch(e){}<\/script>'
      +'<script>try{const P=parent.document;document.documentElement.requestFullscreen=()=>P.documentElement.requestFullscreen();document.exitFullscreen=()=>P.exitFullscreen();Object.defineProperty(document,"fullscreenElement",{get:()=>P.fullscreenElement})}catch(e){}<\/script>'
      +'<script>window.__HID='+JSON.stringify(HID[code]||[])+'<\/script><script>'+T('d-0')+'<\/script><script>'+T('e-pre')+'<\/script><script>'+T('c-'+code)+'<\/script><script>'+T('e-js')+'<\/script></body></html>';
    view.innerHTML='';const f=document.createElement('iframe');f.setAttribute('allow','fullscreen');
    f.srcdoc=doc;view.appendChild(f);cur=code;
    hub.style.display='none';view.style.display='block';bar.style.display='flex';
    f.onload=()=>{ld.style.display='none';try{f.contentWindow.focus()}catch(e){}};
    try{history.replaceState(null,'','#'+code)}catch(e){}
  },30);
}
function close(){view.innerHTML='';view.style.display='none';bar.style.display='none';hub.style.display='block';cur=null;try{history.replaceState(null,'','#')}catch(e){}}
document.querySelectorAll('.c').forEach(c=>c.onclick=()=>open(c.dataset.m));
document.getElementById('back').onclick=close;
document.getElementById('prev').onclick=()=>{const i=order.indexOf(cur);if(i>0)open(order[i-1])};
document.getElementById('next').onclick=()=>{const i=order.indexOf(cur);if(i<order.length-1)open(order[i+1])};
const dl=document.getElementById('dl');
if(location.protocol==='file:'){dl.style.display='none';}
const h=location.hash.slice(1);if(order.includes(h))open(h);
})();
"""

page = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Office Academy · Formation animée Word, Excel, PowerPoint</title>
<meta name="description" content="Formation Microsoft Office animée, du débutant à l'expert : Word, Excel et PowerPoint. Diapos animées, pointeur laser, dessin, notes formateur, quiz, labs interactifs. 100 % hors ligne.">
<style>{HUB_CSS}</style></head><body>
<div id="hub">
<div class="top"><div class="tiles"><i style="background:linear-gradient(135deg,#185ABD,#41A5EE)">W</i><i style="background:linear-gradient(135deg,#107C41,#33C481)">X</i><i style="background:linear-gradient(135deg,#C43E1C,#FF8F6B)">P</i></div><div class="k">OFFICE ACADEMY · MICROSOFT 365</div></div>
<h1>Word · Excel · PowerPoint — <span>formation animée</span></h1>
<p class="s">Toute la formation dans un seul fichier, 100 % hors ligne : diapos animées, pointeur laser, dessin, notes formateur, atelier de schémas, quiz — et des labs interactifs vérifiés en direct.</p>
<div class="stats"><span><b>{len(present)}</b>modules</span><span><b>{nslides}</b>diapositives animées</span><span><b>4</b>niveaux · débutant → expert</span><span><b>3</b>applications</span></div>
<div class="act"><a class="pri" id="dl" href="Office-Formation-Complete.html" download>⬇ Télécharger la formation (hors ligne, 1 fichier)</a><a href="{LABURL}" target="_blank" rel="noopener">🧪 Labs interactifs ↗</a><a href="{LABURL}#/export" target="_blank" rel="noopener">📦 Kit formateur & supports ↗</a></div>
{sections}
<div class="t">Dans chaque module : <kbd>→</kbd>/clic avancer · <kbd>L</kbd> laser · <kbd>P</kbd> stylo · <kbd>H</kbd> surligneur · <kbd>A</kbd> flèche · <kbd>1</kbd>…<kbd>8</kbd> couleurs · <kbd>W</kbd> atelier schéma · <kbd>N</kbd> notes formateur · <kbd>G</kbd> vue d'ensemble · <kbd>D</kbd> masquer/afficher la diapo · <kbd>?</kbd> tous les raccourcis · <kbd>M</kbd> ou bouton maison pour revenir ici.<br>
Microsoft, Word, Excel, PowerPoint et Microsoft 365 sont des marques de Microsoft Corporation. Formation indépendante. Conçu par Dinèche RADJOU.</div></div>
<div id="view"></div><div id="bar"><button id="back">← Modules</button><button id="prev">‹ Module préc.</button><button id="next">Module suiv. ›</button></div><div id="ld">Chargement du module…</div>
{blocks}<script>{LOADER}</script></body></html>"""

for name in ["index.html", "Office-Formation-Complete.html"]:
    open(os.path.join(ROOT, name), "w", encoding="utf-8").write(page)
print(f"OK · {len(present)}/{len(mods)} modules · ~{nslides} diapos · {len(page)//1024} Ko")
