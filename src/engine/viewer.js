/* =========================================================
   Office Academy Motion Viewer — moteur (dérivé du viewer EDU-210)
   ========================================================= */
(function(){
const M = window.MODULE;
const S = M.slides;
const $ = (q,r=document)=>r.querySelector(q);
const $$ = (q,r=document)=>[...r.querySelectorAll(q)];
const W=1600,H=900;
const store = (k,v)=>{try{ if(v===undefined) return JSON.parse(localStorage.getItem('office-'+M.code+'-'+k)); localStorage.setItem('office-'+M.code+'-'+k,JSON.stringify(v)); }catch(e){return null}};

/* ---------- DOM ---------- */
document.body.insertAdjacentHTML('afterbegin', netSprite());
document.title = `Office Academy · ${M.code} · ${M.title}`;
const app = document.createElement('div'); app.id='app';
app.innerHTML = `
<div id="progress"></div>
<div id="stage-wrap"><div id="stage"><div id="slide-host"></div><div id="orig"><span class="tag">DIAPO ORIGINALE</span></div><canvas id="ink" width="${W*2}" height="${H*2}"></canvas></div></div>
<canvas id="laser"></canvas>
<div id="spot"></div>
<div id="blackout"></div>
<div id="board"><div class="grid"></div><svg class="links"></svg><div id="bnodes"></div><canvas id="bcan"></canvas>
  <div id="palette"></div>
  <div id="btop"><span class="t">ATELIER SCHÉMA</span>
    <button data-b="link">${ui('link')} Relier</button>
    <button data-b="zone">${ui('zone')} Zone</button>
    <button data-b="note">${ui('note')} Post-it</button>
    <button data-b="flow">${ui('play')} Flux animé</button>
    <button data-b="dark">${ui('moon')} Fond</button>
    <button data-b="clearall">${ui('clear')} Tout effacer</button>
    <button data-b="close">${ui('close')} Fermer (W)</button>
  </div>
  <div id="trash">${ui('clear')}</div>
</div>
<div id="hot"></div>
<div id="toolbar"></div>
<aside id="notes"></aside>
<div id="overview"></div>
<div id="help"></div>
<div id="toast"></div>`;
document.body.appendChild(app);
const stage=$('#stage'), host=$('#slide-host'), ink=$('#ink'), ictx=ink.getContext('2d');
const lc=$('#laser'), lctx=lc.getContext('2d');
ictx.scale(2,2);

/* ---------- scale ---------- */
let scale=1, offX=0, offY=0, zoomT=null;
function fit(){
  const vw=innerWidth, vh=innerHeight;
  scale=Math.min(vw/W, vh/H);
  offX=(vw-W*scale)/2; offY=(vh-H*scale)/2;
  applyStageTransform();
  lc.width=vw*devicePixelRatio; lc.height=vh*devicePixelRatio; lc.style.width=vw+'px'; lc.style.height=vh+'px';
  lctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  board.resize();
}
function applyStageTransform(){
  let t=`translate(${offX}px,${offY}px) scale(${scale})`;
  if(zoomT){ const {x,y,z}=zoomT; t=`translate(${innerWidth/2}px,${innerHeight/2}px) scale(${z}) translate(${-x}px,${-y}px) `+t; }
  stage.style.transform=t;
}
stage.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';
function toStage(e){ const r=stage.getBoundingClientRect(); return [(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]; }

/* ---------- state ---------- */
let cur=0, step=0, maxStep=0, slideEl=null;
const inks = {}; // slide index -> strokes
const hidden=new Set((window.__HID&&window.__HID.length?window.__HID:(store('hidden')||[])).filter(i=>i>=0&&i<S.length));
function saveHidden(){ store('hidden',[...hidden]); try{ parent.postMessage({edu:'hidden',code:M.code,list:[...hidden]},'*'); }catch(e){} }
function nextVis(i,d){ let j=i+d; while(j>=0&&j<S.length&&hidden.has(j)) j+=d; return (j>=0&&j<S.length)?j:-1; }
function firstVis(){ return hidden.has(0)&&nextVis(0,1)>=0?nextVis(0,1):0; }
function lastVis(){ const L=S.length-1; return hidden.has(L)&&nextVis(L,-1)>=0?nextVis(L,-1):L; }
function toggleHide(i=cur){ if(hidden.has(i)) hidden.delete(i); else hidden.add(i); saveHidden(); updateCounter(); toast(hidden.has(i)?`Diapo ${i+1} masquée — elle sera sautée`:`Diapo ${i+1} réaffichée`); }
function goHome(){ try{ if(parent!==window) parent.postMessage({edu:'home'},'*'); else toast('Ouvrez le fichier principal pour revenir aux modules'); }catch(e){} }
let mode='pointer', color='#FF2D2D', size=1;
const COLORS=['#FF2D2D','#FA582D','#FFD60A','#22C55E','#0EA5E9','#7C3AED','#FFFFFF','#0E1726'];
const SIZES=[3,6,11];

/* ---------- render slide ---------- */
function slideHTML(i){
  const s=S[i];
  const body = typeof s.html==='function'? s.html(i): s.html;
  const foot = s.nofoot?'' : `<div class="foot"><span class="num">${i+1}</span><span>OFFICE ACADEMY · ${M.code} · ${M.short||M.title}</span><span class="sp"></span>${LOGO(s.cls==='dark'?'w':'')}<div class="bar"></div></div>`;
  return `<div class="slide ${s.cls||'light'} ${s.t||''}" data-i="${i}">${body}${foot}</div>`;
}
function numberSteps(el){
  let n=0; const used=new Set();
  $$('[data-s]',el).forEach(x=>{const v=+x.dataset.s; used.add(v); n=Math.max(n,v)});
  // auto-number .f without data-s
  let auto=0;
  $$('.f',el).forEach(x=>{ if(!x.dataset.s){ auto++; while(used.has(auto)) auto++; x.dataset.s=auto; used.add(auto); n=Math.max(n,auto);} });
  $$('[data-off]',el).forEach(x=>n=Math.max(n,+x.dataset.off));
  $$('.shot[data-st]',el).forEach(sh=>{ const st=JSON.parse(sh.dataset.st); st.forEach(v=>n=Math.max(n,v)); n=Math.max(n,+sh.dataset.rc||0); });
  if(S[cur].steps) n=Math.max(n,S[cur].steps);
  return n;
}
function go(i, st=0, dir=1){
  if(i<0||i>=S.length) return;
  const old=slideEl;
  if(old && i!==cur){
    old.style.transition='opacity .45s, transform .55s cubic-bezier(.6,0,.4,1), filter .45s';
    old.style.opacity='0'; old.style.transform=`translateX(${dir>0?-80:80}px) scale(.96)`; old.style.filter='blur(8px)';
    old.style.zIndex=1; setTimeout(()=>old.remove(),560);
  } else if(old){ old.remove(); }
  cur=i;
  const wrap=document.createElement('div'); wrap.innerHTML=slideHTML(i); const el=wrap.firstElementChild;
  el.style.zIndex=2;
  if(old && old.parentNode){ el.style.opacity='0'; el.style.transform=`translateX(${dir>0?80:-80}px) scale(1.03)`; el.style.filter='blur(10px)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.transition='opacity .6s .08s, transform .75s .05s cubic-bezier(.2,.8,.2,1), filter .6s .08s'; el.style.opacity='1'; el.style.transform='none'; el.style.filter='none'; })); }
  host.appendChild(el); slideEl=el;
  // auto stagger
  $$('[data-stg]',el).forEach(c=>{ const base=parseFloat(c.dataset.stg)||.1, d0=parseFloat(c.dataset.d0||.2); [...c.children].forEach((k,j)=>{k.classList.add('a'); if(c.dataset.anim) k.classList.add(c.dataset.anim); k.style.setProperty('--d',(d0+j*base).toFixed(2)+'s')}); });
  maxStep=numberSteps(el);
  step=Math.min(st,maxStep);
  try{ S[i].enter && S[i].enter(el, api); }catch(e){console.error(e)}
  applyStep(true);
  redrawInk();
  $('#orig').classList.remove('on'); updateOrig();
  $('#progress').style.width=((i+1)/S.length*100)+'%';
  updateCounter(); renderNotes();
  if(location.hash!=='#'+(i+1)) history.replaceState(null,'','#'+(i+1));
  store('last',i);
}
function applyStep(initial){
  const el=slideEl; if(!el) return;
  $$('[data-s]',el).forEach(x=>{ x.classList.toggle('on', +x.dataset.s<=step); });
  $$('[data-off]',el).forEach(x=>{ x.classList.toggle('off', step>=+x.dataset.off); });
  $$('[data-cur]',el).forEach(x=>{ const r=x.dataset.cur.split('-').map(Number); x.classList.toggle('cur', step>=r[0] && step<=(r[1]??r[0])); });
  $$('.shot[data-st]',el).forEach(sh=>shotStep(sh));
  try{ S[cur].step && S[cur].step(step, el, api, initial); }catch(e){console.error(e)}
  updateCounter();
}
function next(){ if(step<maxStep){ step++; applyStep(); } else { const j=nextVis(cur,1); if(j>=0) go(j,0,1); } }
function prev(){ if(step>0){ step--; applyStep(); } else { const j=nextVis(cur,-1); if(j>=0) go(j,999,-1); } }

/* ---------- screenshot component ---------- */
function shotStep(sh){
  const st=JSON.parse(sh.dataset.st); const hs=$$('.hs',sh); const caps=sh.dataset.cap? $$('#'+sh.dataset.cap+' .c',slideEl):[];
  let k=-1; st.forEach((v,j)=>{ if(step>=v) k=j; });
  const rc=+sh.dataset.rc||0, recap= rc && step>=rc; if(recap) k=hs.length;
  hs.forEach((h,j)=>{ h.classList.toggle('cur',j===k); h.classList.toggle('seen',j<k); });
  caps.forEach((c,j)=>{ c.classList.toggle('cur',j===k); c.classList.toggle('seen',j<k); });
  sh.classList.toggle('recap',!!recap); sh.classList.toggle('focus',k>=0&&k<hs.length);
  const zm=$('.zm',sh), vp=$('.vp',sh), ring=$('.ring',sh);
  const vw=vp.clientWidth||+sh.dataset.vw, vh=vp.clientHeight||+sh.dataset.vh;
  let z=1, tx=0, ty=0, R=null;
  if(k>=0 && k<hs.length){
    R=JSON.parse(hs[k].dataset.r); const zq=hs[k].dataset.z; const auto=sh.dataset.az!=='0';
    let want = zq? +zq : (auto? 1.7 : 1);
    // jamais rogner la cible : elle doit tenir dans ~82% de la fenêtre
    const fit=Math.min(.82/Math.max(R[2],.01), .78/Math.max(R[3],.01));
    z=Math.max(1, Math.min(want, fit, 2.6));
    const cx=(R[0]+R[2]/2)*vw, cy=(R[1]+R[3]/2)*vh;
    tx=vw/2-cx*z; ty=vh/2-cy*z; tx=Math.min(0,Math.max(vw-vw*z,tx)); ty=Math.min(0,Math.max(vh-vh*z,ty));
  }
  zm.style.transform=`translate(${tx}px,${ty}px) scale(${z})`;
  if(ring){
    if(R){ const pd=6; ring.style.left=(tx+R[0]*vw*z-pd)+'px'; ring.style.top=(ty+R[1]*vh*z-pd)+'px'; ring.style.width=(R[2]*vw*z+2*pd)+'px'; ring.style.height=(R[3]*vh*z+2*pd)+'px'; ring.classList.add('on'); $('.b',ring).textContent=k+1; }
    else ring.classList.remove('on');
  }
}

/* ---------- counter / toolbar ---------- */
const tb=$('#toolbar');
tb.innerHTML=`
 <button data-a="home" data-tip="Choix des modules (M)">${ui('home')}</button>
 <span class="sep"></span>
 <button data-a="prev" data-tip="Précédent (←)">${ui('prev')}</button>
 <div class="cnt" id="cnt"></div>
 <button data-a="next" data-tip="Suivant (→ / espace / clic)">${ui('next')}</button>
 <span class="sep"></span>
 <button data-m="pointer" data-tip="Pointeur (V / Échap)">${ui('pointer')}</button>
 <button data-m="laser" data-tip="Laser (L)">${ui('laser')}</button>
 <button data-m="pen" data-tip="Stylo (P)">${ui('pen')}</button>
 <button data-m="hl" data-tip="Surligneur (H)">${ui('hl')}</button>
 <button data-m="arrow" data-tip="Flèche (A)">${ui('arrow')}</button>
 <button data-m="rect" data-tip="Rectangle (R)">${ui('rect')}</button>
 <button data-m="ellipse" data-tip="Cercle (E)">${ui('ellipse')}</button>
 <button data-m="text" data-tip="Texte (T)">${ui('text')}</button>
 <button data-m="eraser" data-tip="Gomme (X)">${ui('eraser')}</button>
 <span class="sep"></span>
 ${COLORS.map((c,j)=>`<span class="sw" data-c="${c}" style="background:${c}" title="Couleur ${j+1}"></span>`).join('')}
 <span class="sep"></span>
 ${SIZES.map((z,j)=>`<span class="sz" data-z="${j}" title="Épaisseur"><i style="width:${4+j*4}px;height:${4+j*4}px"></i></span>`).join('')}
 <button data-a="undo" data-tip="Annuler (Ctrl+Z)">${ui('undo')}</button>
 <button data-a="clear" data-tip="Effacer la diapo (C / double-clic)">${ui('clear')}</button>
 <span class="sep"></span>
 <button data-a="spot" data-tip="Projecteur (S)">${ui('spot')}</button>
 <button data-a="zoom" data-tip="Loupe (Z)">${ui('zoom')}</button>
 <button data-a="board" data-tip="Atelier schéma (W)">${ui('board')}</button>
 <button data-a="orig" data-tip="Diapo originale (O)">${ui('orig')}</button>
 <button data-a="notes" data-tip="Notes formateur (N)">${ui('notes')}</button>
 <button data-a="hide" data-tip="Masquer / afficher la diapo (D)">${ui('eyeoff')}</button>
 <button data-a="grid" data-tip="Vue d'ensemble (G)">${ui('grid')}</button>
 <button data-a="full" data-tip="Plein écran (F)">${ui('full')}</button>
 <button data-a="help" data-tip="Raccourcis (?)">${ui('help')}</button>`;
function updateCounter(){
  const dots = maxStep? `<div class="stepdots">${Array.from({length:Math.min(maxStep,14)},(_,j)=>`<i class="${j<step?'on':''}"></i>`).join('')}</div>`:'';
  $('#cnt').innerHTML=`${cur+1}<small> / ${S.length}</small>${hidden.has(cur)?'<span class="hidtag">MASQUÉE</span>':''}${dots}`;
  const hb=$('[data-a=hide]',tb); if(hb){ hb.classList.toggle('on',hidden.has(cur)); hb.innerHTML=ui(hidden.has(cur)?'eye':'eyeoff'); }
}
function syncTb(){
  $$('[data-m]',tb).forEach(b=>b.classList.toggle('on',b.dataset.m===mode));
  $$('.sw',tb).forEach(b=>b.classList.toggle('on',b.dataset.c===color));
  $$('.sz',tb).forEach(b=>b.classList.toggle('on',+b.dataset.z===size));
  $('[data-a=spot]',tb).classList.toggle('on',spotOn);
  $('[data-a=zoom]',tb).classList.toggle('on',zoomMode||!!zoomT);
  $('[data-a=board]',tb).classList.toggle('on',board.on);
  $('[data-a=orig]',tb).classList.toggle('on',$('#orig').classList.contains('on'));
  $('[data-a=notes]',tb).classList.toggle('on',$('#notes').classList.contains('on'));
  document.body.classList.toggle('laser',mode==='laser');
  const drawing=['pen','hl','arrow','rect','ellipse','text','eraser'].includes(mode);
  document.body.classList.toggle('drawing',drawing && !board.on);
  document.body.classList.toggle('pen',drawing);
  document.body.classList.toggle('board-pen',drawing && board.on);
}
tb.addEventListener('click',e=>{
  const b=e.target.closest('button,.sw,.sz'); if(!b) return; e.stopPropagation();
  if(b.dataset.m) setMode(b.dataset.m);
  else if(b.dataset.c){ color=b.dataset.c; if(mode==='pointer'||mode==='eraser') setMode('pen'); syncTb(); }
  else if(b.dataset.z!==undefined){ size=+b.dataset.z; syncTb(); }
  else act(b.dataset.a);
});
function setMode(m){ mode=(mode===m && m!=='pointer')?'pointer':m; if(mode!=='laser') clearLaser(); syncTb(); toast(MODE_NAMES[mode]); }
const MODE_NAMES={pointer:'Pointeur',laser:'Pointeur laser',pen:'Stylo',hl:'Surligneur',arrow:'Flèche',rect:'Rectangle',ellipse:'Cercle / ellipse',text:'Texte',eraser:'Gomme'};
function act(a){
  ({prev, next, undo, clear:clearInk, spot:toggleSpot, zoom:toggleZoom, board:()=>board.toggle(), orig:toggleOrig,
    notes:()=>{$('#notes').classList.toggle('on');syncTb()}, grid:toggleOverview, home:goHome, hide:()=>toggleHide(), full:toggleFull, help:()=>$('#help').classList.toggle('on')}[a]||(()=>{}))();
}
let tbTimer; function wake(){ tb.classList.remove('hide'); clearTimeout(tbTimer); tbTimer=setTimeout(()=>{ if(!tb.matches(':hover') && !$('#hot').matches(':hover')) tb.classList.add('hide') },2600); }
addEventListener('mousemove',e=>{ if(e.clientY>innerHeight-110) wake(); });
$('#hot').addEventListener('mouseenter',wake);
let toastT; function toast(t){ const el=$('#toast'); el.textContent=t; el.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('on'),1100); }

/* ---------- ink (dessin sur diapo) ---------- */
function strokesFor(i){ return inks[i]||(inks[i]=[]); }
function drawStroke(c,s){
  c.save(); c.lineCap='round'; c.lineJoin='round'; c.strokeStyle=s.c; c.fillStyle=s.c; c.lineWidth=s.w;
  if(s.k==='hl'){ c.globalAlpha=.35; c.lineWidth=s.w*3.2; c.lineCap='butt'; }
  if(s.k==='pen'||s.k==='hl'){
    const p=s.p; if(p.length<2){ c.beginPath(); c.arc(p[0][0],p[0][1],s.w/2,0,7); c.fill(); }
    else{ c.beginPath(); c.moveTo(p[0][0],p[0][1]); for(let j=1;j<p.length-1;j++){ const mx=(p[j][0]+p[j+1][0])/2,my=(p[j][1]+p[j+1][1])/2; c.quadraticCurveTo(p[j][0],p[j][1],mx,my);} c.lineTo(p[p.length-1][0],p[p.length-1][1]); c.stroke(); }
  } else if(s.k==='arrow'){
    const [a,b]=[s.p[0],s.p[s.p.length-1]]; const ang=Math.atan2(b[1]-a[1],b[0]-a[0]), L=Math.max(14,s.w*4.2);
    c.shadowColor='rgba(0,0,0,.25)'; c.shadowBlur=6;
    c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0]-Math.cos(ang)*L*.6,b[1]-Math.sin(ang)*L*.6); c.stroke();
    c.beginPath(); c.moveTo(b[0],b[1]); c.lineTo(b[0]-L*Math.cos(ang-.45),b[1]-L*Math.sin(ang-.45)); c.lineTo(b[0]-L*Math.cos(ang+.45),b[1]-L*Math.sin(ang+.45)); c.closePath(); c.fill();
  } else if(s.k==='rect'){
    const [a,b]=[s.p[0],s.p[s.p.length-1]]; c.beginPath(); if(c.roundRect) c.roundRect(Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]),10); else c.rect(Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1])); c.stroke();
  } else if(s.k==='ellipse'){
    const [a,b]=[s.p[0],s.p[s.p.length-1]]; c.beginPath(); c.ellipse((a[0]+b[0])/2,(a[1]+b[1])/2,Math.abs(b[0]-a[0])/2||1,Math.abs(b[1]-a[1])/2||1,0,0,7); c.stroke();
  } else if(s.k==='text'){
    c.font=`800 ${s.fs}px ${getComputedStyle(document.body).fontFamily}`; c.textBaseline='top';
    c.lineWidth=5; c.strokeStyle=(s.c==='#FFFFFF')?'rgba(0,0,0,.6)':'rgba(255,255,255,.85)';
    s.t.split('\n').forEach((ln,j)=>{ c.strokeText(ln,s.p[0][0],s.p[0][1]+j*s.fs*1.15); c.fillText(ln,s.p[0][0],s.p[0][1]+j*s.fs*1.15); });
  }
  c.restore();
}
function redrawInk(extra){ ictx.clearRect(0,0,W,H); strokesFor(cur).forEach(s=>drawStroke(ictx,s)); if(extra) drawStroke(ictx,extra); }
function hitStroke(s,x,y,r){
  if(s.k==='text'){ const p=s.p[0]; return x>p[0]-r && x<p[0]+s.t.length*s.fs*.6+r && y>p[1]-r && y<p[1]+s.fs*1.2*s.t.split('\n').length+r; }
  const pts = (s.k==='pen'||s.k==='hl')? s.p : (()=>{ const [a,b]=[s.p[0],s.p[s.p.length-1]]; if(s.k==='rect') return [a,[b[0],a[1]],b,[a[0],b[1]],a]; if(s.k==='ellipse'){ const o=[]; for(let t=0;t<=6.3;t+=.2) o.push([(a[0]+b[0])/2+Math.cos(t)*Math.abs(b[0]-a[0])/2,(a[1]+b[1])/2+Math.sin(t)*Math.abs(b[1]-a[1])/2]); return o;} return [a,b]; })();
  for(let j=0;j<pts.length;j++){ const p=pts[j], q=pts[j+1]||p; const dx=q[0]-p[0], dy=q[1]-p[1]; const L=dx*dx+dy*dy; let t=L?((x-p[0])*dx+(y-p[1])*dy)/L:0; t=Math.max(0,Math.min(1,t)); const px=p[0]+t*dx, py=p[1]+t*dy; if((px-x)**2+(py-y)**2 < (r+s.w)**2) return true; }
  return false;
}
let drag=null;
function inkDown(e, ctx, list, toLocal, redraw){
  const [x,y]=toLocal(e);
  if(mode==='text'){ textInput(e,x,y,list,redraw,toLocal); return null; }
  if(mode==='eraser'){ eraseAt(list,x,y,redraw); return {erasing:true,list,toLocal,redraw}; }
  const s={k:mode,c:color,w:SIZES[size],p:[[x,y]]};
  return {s,list,toLocal,redraw};
}
function eraseAt(list,x,y,redraw){ for(let j=list.length-1;j>=0;j--){ if(hitStroke(list[j],x,y,14)){ list.splice(j,1); } } redraw(); }
function textInput(e,x,y,list,redraw){
  const old=$('#txtin'); if(old) old.blur();
  const inp=document.createElement('div'); inp.id='txtin'; inp.contentEditable='true';
  const fs=[26,36,52][size];
  const tgt = board.on? $('#board') : stage;
  inp.style.left=(board.on? e.clientX : x)+'px'; inp.style.top=(board.on? e.clientY : y)+'px'; inp.style.fontSize=fs+'px'; inp.style.color=color; inp.style.position=board.on?'fixed':'absolute';
  tgt.appendChild(inp); setTimeout(()=>inp.focus(),10);
  const done=()=>{ const t=inp.innerText.trim(); inp.remove(); if(t){ list.push({k:'text',c:color,w:2,fs,t,p:[[x,y]]}); redraw(); } };
  inp.addEventListener('blur',done,{once:true});
  inp.addEventListener('keydown',ev=>{ ev.stopPropagation(); if(ev.key==='Escape'||(ev.key==='Enter'&&!ev.shiftKey)){ ev.preventDefault(); inp.blur(); } });
}
function bindInk(canvas, getList, toLocal, redraw, prevFn){
  canvas.addEventListener('pointerdown',e=>{
    if(e.button!==0) return; e.preventDefault(); e.stopPropagation();
    drag=inkDown(e,null,getList(),toLocal,redraw); if(drag) canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove',e=>{
    if(!drag) return; const [x,y]=toLocal(e);
    if(drag.erasing){ eraseAt(drag.list,x,y,drag.redraw); return; }
    const p=drag.s.p; if(drag.s.k==='pen'||drag.s.k==='hl'){ const l=p[p.length-1]; if((l[0]-x)**2+(l[1]-y)**2>4) p.push([x,y]); } else { p[1]=[x,y]; }
    prevFn(drag.s);
  });
  const up=()=>{ if(drag && drag.s){ if(drag.s.p.length>1 || drag.s.k==='pen') drag.list.push(drag.s); drag.redraw(); } drag=null; };
  canvas.addEventListener('pointerup',up); canvas.addEventListener('pointercancel',up);
  canvas.addEventListener('dblclick',e=>{ e.preventDefault(); const l=getList(); if(l.length){ l.length=0; redraw(); toast('Dessins effacés'); } });
}
bindInk(ink, ()=>strokesFor(cur), toStage, ()=>redrawInk(), s=>redrawInk(s));
function undo(){ const l = board.on? board.strokes : strokesFor(cur); l.pop(); board.on? board.redraw() : redrawInk(); }
function clearInk(){ if(board.on){ board.strokes.length=0; board.redraw(); } else { strokesFor(cur).length=0; redrawInk(); } toast('Dessins effacés'); }

/* ---------- laser ---------- */
let trail=[], lraf=null, lastLaser=null;
function clearLaser(){ trail=[]; lctx.clearRect(0,0,innerWidth,innerHeight); lastLaser=null; }
addEventListener('pointermove',e=>{
  if(mode==='laser'){ const t=performance.now(); trail.push({x:e.clientX,y:e.clientY,t}); lastLaser={x:e.clientX,y:e.clientY}; if(!lraf) lraf=requestAnimationFrame(drawLaser); }
  if(spotOn){ $('#spot').style.setProperty('--x',e.clientX+'px'); $('#spot').style.setProperty('--y',e.clientY+'px'); }
},{passive:true});
function drawLaser(){
  lraf=null; const now=performance.now(); trail=trail.filter(p=>now-p.t<520);
  lctx.clearRect(0,0,innerWidth,innerHeight);
  if(mode!=='laser') return;
  const c = color==='#0E1726'? '#111' : color;
  lctx.lineCap='round'; lctx.lineJoin='round';
  for(let j=1;j<trail.length;j++){
    const a=trail[j-1], b=trail[j], age=(now-b.t)/520;
    lctx.strokeStyle=c; lctx.globalAlpha=Math.max(0,1-age)*.85; lctx.lineWidth=(1-age)*10+2;
    lctx.shadowColor=c; lctx.shadowBlur=16;
    lctx.beginPath(); lctx.moveTo(a.x,a.y); lctx.lineTo(b.x,b.y); lctx.stroke();
  }
  if(lastLaser){
    lctx.globalAlpha=1; lctx.shadowColor=c; lctx.shadowBlur=30;
    const g=lctx.createRadialGradient(lastLaser.x,lastLaser.y,0,lastLaser.x,lastLaser.y,22);
    g.addColorStop(0,'#fff'); g.addColorStop(.25,c); g.addColorStop(1,'rgba(0,0,0,0)');
    lctx.fillStyle=g; lctx.beginPath(); lctx.arc(lastLaser.x,lastLaser.y,22,0,7); lctx.fill();
    lctx.fillStyle='#fff'; lctx.beginPath(); lctx.arc(lastLaser.x,lastLaser.y,3.2,0,7); lctx.fill();
  }
  lctx.shadowBlur=0; lctx.globalAlpha=1;
  if(trail.length) lraf=requestAnimationFrame(drawLaser);
}

/* ---------- spotlight / zoom / blackout / original ---------- */
let spotOn=false, zoomMode=false;
function toggleSpot(){ spotOn=!spotOn; $('#spot').classList.toggle('on',spotOn); syncTb(); }
addEventListener('wheel',e=>{ if(spotOn){ const r=parseFloat(getComputedStyle($('#spot')).getPropertyValue('--r'))||170; $('#spot').style.setProperty('--r',Math.max(60,Math.min(600,r-e.deltaY*.4))+'px'); }},{passive:true});
function toggleZoom(){ if(zoomT){ zoomT=null; zoomMode=false; applyStageTransform(); } else { zoomMode=!zoomMode; toast(zoomMode?'Loupe : cliquez sur la zone à agrandir':'Loupe désactivée'); } syncTb(); }
function zoomAt(e){ const [x,y]=toStage(e); zoomT={x:offX+x*scale,y:offY+y*scale,z:2.2}; zoomMode=false; applyStageTransform(); syncTb(); }
function toggleOrig(){ const o=$('#orig'); if(!ORIG[cur]){ toast('Pas de diapo originale pour celle-ci'); return; } o.classList.toggle('on'); syncTb(); }
function updateOrig(){ const o=$('#orig'); o.style.backgroundImage = ORIG[cur]? `url(${ORIG[cur]})` : 'none'; }
function toggleFull(){ if(!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); }

/* ---------- notes ---------- */
function renderNotes(){
  const s=S[cur]; const t=(s.title||'').replace(/<[^>]+>/g,'');
  $('#notes').innerHTML=`<h3>NOTES FORMATEUR · DIAPO ${cur+1}</h3><h2>${t}</h2><div class="nt">${s.n||'<p style="opacity:.6">Pas de note pour cette diapo.</p>'}</div>
  <div class="nx">${maxStep? `Cette diapo comporte <b style="color:#FF8A3D">${maxStep} étape(s)</b> révélées au clic.`:''}</div>`;
}

/* ---------- overview ---------- */
function toggleOverview(){
  const o=$('#overview');
  if(!o.classList.contains('on')){
    o.innerHTML=`<div class="ovtop"><h2><span>${M.code}</span> · ${M.title}</h2><button class="ovb" data-ov="show">${ui('eye')} Tout réafficher</button><button class="ovb" data-ov="home">← Choix des modules</button></div><div class="g">${S.map((s,i)=>`<div class="it ${i===cur?'cur':''} ${hidden.has(i)?'hid':''}" data-i="${i}"><div class="th" style="${ORIG[i]?`background-image:url(${ORIG[i]})`:'background:linear-gradient(135deg,#1B2A41,#33445E)'}"><b>${i+1}</b><span class="hl">MASQUÉE</span><button class="hb" title="Masquer / afficher cette diapo">${ui(hidden.has(i)?'eye':'eyeoff')}</button></div><div class="tt">${(s.title||'').replace(/<[^>]+>/g,'')}</div></div>`).join('')}</div>`;
    $$('.ovb svg',o).forEach(x=>{x.style.cssText='width:16px;height:16px;vertical-align:-3px'});
    $$('.it',o).forEach(it=>it.onclick=e=>{ const i=+it.dataset.i, hb=e.target.closest('.hb');
      if(hb){ e.stopPropagation(); toggleHide(i); it.classList.toggle('hid',hidden.has(i)); hb.innerHTML=ui(hidden.has(i)?'eye':'eyeoff'); return; }
      o.classList.remove('on'); go(i,0); });
    $('[data-ov=show]',o).onclick=()=>{ hidden.clear(); saveHidden(); updateCounter(); $$('.it',o).forEach(it=>{ it.classList.remove('hid'); $('.hb',it).innerHTML=ui('eyeoff'); }); toast('Toutes les diapos sont réaffichées'); };
    $('[data-ov=home]',o).onclick=goHome;
  }
  o.classList.toggle('on');
}

/* ---------- help ---------- */
$('#help').innerHTML=`<div class="box"><h2><span>⌨</span> Raccourcis du viewer — ${M.code}</h2><div class="cols">${[
 ['Suivant / étape suivante','→ · Espace · Clic'],['Précédent','← · Clic droit'],['Première / dernière diapo','Début · Fin'],['Aller à la diapo n°','tapez n + Entrée'],
 ['Pointeur laser','L'],['Stylo / Surligneur','P / H'],['Flèche / Rectangle / Cercle','A / R / E'],['Texte','T'],['Gomme','X'],['Couleur 1 à 8','1 … 8'],['Épaisseur','[ ]'],
 ['Annuler','Ctrl + Z'],['Effacer les dessins','C · double-clic'],['Projecteur (molette = taille)','S'],['Loupe','Z'],['Atelier schéma (tableau)','W'],
 ['Masquer / afficher la diapo','D'],['Retour au choix des modules','M'],['Diapo originale','O'],['Notes formateur','N'],['Vue d\'ensemble','G'],['Écran noir / blanc','B / . '],['Plein écran','F'],['Revenir au pointeur','V · Échap'],['Rejouer l\'animation','Maj + R']
].map(([a,b])=>`<div class="k"><span>${a}</span><span>${b.split(' · ').map(x=>`<kbd>${x}</kbd>`).join(' ')}</span></div>`).join('')}</div></div>`;
$('#help').onclick=()=>$('#help').classList.remove('on');

/* ---------- click navigation ---------- */
stage.addEventListener('click',e=>{
  if(zoomMode){ zoomAt(e); return; }
  if(zoomT){ zoomT=null; applyStageTransform(); syncTb(); return; }
  if(mode!=='pointer' && mode!=='laser') return;
  if(e.target.closest('button,a,input,.qz-opts,.interactive,[contenteditable]')) return;
  next();
});
addEventListener('contextmenu',e=>{ if(board.on) return; e.preventDefault(); prev(); });

/* ---------- keyboard ---------- */
let numBuf='', numT;
addEventListener('keydown',e=>{
  if(e.target.isContentEditable || e.target.tagName==='INPUT') return;
  const k=e.key;
  if((e.ctrlKey||e.metaKey) && k.toLowerCase()==='z'){ e.preventDefault(); undo(); return; }
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  if(/^[0-9]$/.test(k) && numBuf===''){ /* couleur directe 1-8 sauf si on tape un numéro */ }
  if(/^[0-9]$/.test(k)){ numBuf+=k; clearTimeout(numT); numT=setTimeout(()=>{ if(numBuf.length===1 && +numBuf>=1 && +numBuf<=8){ color=COLORS[+numBuf-1]; if(mode==='pointer'||mode==='eraser') mode='pen'; syncTb(); toast('Couleur '+numBuf);} numBuf=''; },550); return; }
  if(k==='Enter' && numBuf){ const n=+numBuf; numBuf=''; clearTimeout(numT); if(n>=1&&n<=S.length) go(n-1,0); return; }
  const map={ArrowRight:next,ArrowDown:next,' ':next,PageDown:next,Enter:next,ArrowLeft:prev,ArrowUp:prev,PageUp:prev,Backspace:prev,
    Home:()=>go(firstVis()),End:()=>go(lastVis()), m:goHome, d:()=>toggleHide(), l:()=>setMode('laser'),p:()=>setMode('pen'),h:()=>setMode('hl'),a:()=>setMode('arrow'),r:()=>setMode('rect'),e:()=>setMode('ellipse'),t:()=>setMode('text'),x:()=>setMode('eraser'),v:()=>setMode('pointer'),
    c:clearInk,s:toggleSpot,z:toggleZoom,w:()=>board.toggle(),o:toggleOrig,n:()=>act('notes'),g:toggleOverview,f:toggleFull,'?':()=>$('#help').classList.toggle('on'),
    b:()=>{const b=$('#blackout'); b.classList.remove('white'); b.classList.toggle('on')}, '.':()=>{const b=$('#blackout'); b.classList.add('white'); b.classList.toggle('on')},
    R:()=>go(cur,0), '[':()=>{size=Math.max(0,size-1);syncTb()}, ']':()=>{size=Math.min(2,size+1);syncTb()}, k:()=>board.on&&board.btn('link'),
    Escape:()=>{ if($('#help').classList.contains('on')) $('#help').classList.remove('on'); else if($('#overview').classList.contains('on')) $('#overview').classList.remove('on'); else if(zoomT||zoomMode){zoomT=null;zoomMode=false;applyStageTransform();syncTb()} else if($('#blackout').classList.contains('on')) $('#blackout').classList.remove('on'); else setMode('pointer'); }};
  const fn=map[k]||map[k.toLowerCase?.()];
  if(board.on && ['ArrowRight','ArrowLeft',' ','Enter','Backspace','ArrowUp','ArrowDown','PageUp','PageDown'].includes(k)){ if(k==='Delete'||k==='Backspace') board.delSel(); return; }
  if(board.on && (k==='Delete')){ board.delSel(); return; }
  if(fn){ e.preventDefault(); fn(); wake(); }
});

/* =========================================================
   ATELIER SCHÉMA (whiteboard façon draw.io)
   ========================================================= */
const board = (()=>{
  const el=$('#board'), nodesEl=$('#bnodes'), svg=$('#board svg.links'), can=$('#bcan'), ctx=can.getContext('2d');
  const B={on:false,strokes:[],nodes:[],links:[],flow:true,sel:null,linkMode:false,linkSrc:null,id:1};
  const saved=store('board'); if(saved){ Object.assign(B,{strokes:saved.strokes||[],nodes:saved.nodes||[],links:saved.links||[],id:saved.id||1,flow:saved.flow!==false}); if(saved.dark) el.classList.add('dk'); }
  const groups=[['APPLICATIONS',['word','excel','ppt','outlook','teams','onedrive','sharepoint','copilot']],['FICHIERS',['docx','xlsx','pptx','pdf','csv','tpl','folder','img']],['ACTEURS',['user','users','admin','laptop','mobile']],['OUTILS',['chart','tablei','formula','filteri','macro','mail','print','lock','cloud','ai']]];
  $('#palette').innerHTML=groups.map(([g,ks])=>`<h4>${g}</h4>`+ks.map(k=>`<div class="pi" draggable="true" data-k="${k}"><svg viewBox="0 0 64 64"><use href="#i-${k}"/></svg>${NET[k].l}</div>`).join('')).join('');
  $$('#palette .pi').forEach(p=>{
    p.addEventListener('dragstart',e=>{ e.dataTransfer.setData('k',p.dataset.k); });
    p.addEventListener('dblclick',()=>{ const c=B.nodes.filter(n=>n.k!=='zone'&&n.k!=='note').length; add({k:p.dataset.k,x:260+(c%6)*170,y:200+Math.floor(c/6)*170%(innerHeight-300)}); });
  });
  el.addEventListener('dragover',e=>e.preventDefault());
  el.addEventListener('drop',e=>{ e.preventDefault(); const k=e.dataTransfer.getData('k'); if(k) add({k,x:e.clientX,y:e.clientY}); });
  function save(){ store('board',{strokes:B.strokes,nodes:B.nodes,links:B.links,id:B.id,flow:B.flow,dark:el.classList.contains('dk')}); }
  function add(n){ n.id=B.id++; if(n.k==='zone'){ n.w=n.w||380; n.h=n.h||260; n.l=n.l||'Zone'; n.col=n.col||['#FA582D','#0EA5E9','#16A34A','#7C3AED','#DC2626'][B.nodes.filter(x=>x.k==='zone').length%5]; } else if(n.k==='note'){ n.l=n.l||'Note…'; } else n.l=n.l??NET[n.k].l; B.nodes.push(n); render(); save(); return n; }
  function render(){
    nodesEl.innerHTML='';
    [...B.nodes].sort((a,b)=>(a.k==='zone'?0:1)-(b.k==='zone'?0:1)).forEach(n=>{
      const d=document.createElement('div'); d.className='bn'+(n.k==='zone'?' zone':'')+(n.k==='note'?' note':'')+(B.sel===n.id?' sel':'')+(B.linkSrc===n.id?' link-src':''); d.dataset.id=n.id;
      if(n.k==='zone'){ d.style.cssText=`left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;--zc:${n.col}`; d.innerHTML=`<span class="lb" contenteditable="false">${n.l}</span><span class="rs"></span>`; }
      else if(n.k==='note'){ d.style.cssText=`left:${n.x}px;top:${n.y}px`; d.innerHTML=`<span class="lb" contenteditable="false">${n.l}</span>`; }
      else { d.style.cssText=`left:${n.x}px;top:${n.y}px`; d.innerHTML=`<svg viewBox="0 0 64 64"><use href="#i-${n.k}"/></svg><span class="lb" contenteditable="false">${n.l}</span>`; }
      nodesEl.appendChild(d); bindNode(d,n);
    });
    renderLinks();
  }
  function center(n){ return n.k==='zone'? [n.x+n.w/2,n.y+n.h/2] : [n.x,n.y]; }
  function renderLinks(){
    svg.innerHTML=`<defs><marker id="bah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5 0 10z" fill="#FA582D"/></marker></defs>`+B.links.map((l,j)=>{
      const a=B.nodes.find(n=>n.id===l.a), b=B.nodes.find(n=>n.id===l.b); if(!a||!b) return '';
      const [x1,y1]=center(a),[x2,y2]=center(b); const ang=Math.atan2(y2-y1,x2-x1); const off=46;
      const sx=x1+Math.cos(ang)*off, sy=y1+Math.sin(ang)*off, ex=x2-Math.cos(ang)*off, ey=y2-Math.sin(ang)*off;
      return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#94A3B8" stroke-width="10" stroke-opacity=".001" data-j="${j}"/>
        <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${l.c||'#33445E'}" stroke-width="3.5" stroke-linecap="round" marker-end="url(#bah)" ${B.flow?'class="flow"':''} style="pointer-events:none"/>
        ${B.flow?`<circle r="6" fill="#FA582D" filter="url(#gl)" style="pointer-events:none"><animateMotion dur="${1.6+(j%3)*.4}s" repeatCount="indefinite" path="M${sx},${sy} L${ex},${ey}"/></circle>`:''}`;
    }).join('');
    $$('line[data-j]',svg).forEach(ln=>ln.addEventListener('dblclick',()=>{ B.links.splice(+ln.dataset.j,1); renderLinks(); save(); toast('Lien supprimé'); }));
  }
  function bindNode(d,n){
    const lb=$('.lb',d);
    lb.addEventListener('dblclick',e=>{ e.stopPropagation(); lb.contentEditable='true'; lb.focus(); document.execCommand?.('selectAll',false,null); });
    lb.addEventListener('blur',()=>{ lb.contentEditable='false'; n.l=lb.innerText.trim()||n.l; save(); });
    lb.addEventListener('keydown',e=>{ e.stopPropagation(); if(e.key==='Enter' && n.k!=='note'){ e.preventDefault(); lb.blur(); } if(e.key==='Escape') lb.blur(); });
    d.addEventListener('pointerdown',e=>{
      if(lb.isContentEditable || document.body.classList.contains('board-pen')) return;
      e.preventDefault(); e.stopPropagation();
      if(B.linkMode){ if(!B.linkSrc){ B.linkSrc=n.id; render(); toast('Cliquez sur la 2e icône'); } else if(B.linkSrc!==n.id){ B.links.push({a:B.linkSrc,b:n.id}); B.linkSrc=null; render(); save(); } return; }
      B.sel=n.id; $$('.bn',nodesEl).forEach(x=>x.classList.toggle('sel',+x.dataset.id===n.id));
      const resize=e.target.classList.contains('rs');
      const sx=e.clientX, sy=e.clientY, ox=n.x, oy=n.y, ow=n.w, oh=n.h;
      const kids = n.k==='zone' && !resize ? B.nodes.filter(m=>m.k!=='zone' && m.x>n.x && m.x<n.x+n.w && m.y>n.y && m.y<n.y+n.h).map(m=>({m,x:m.x,y:m.y})) : [];
      const mv=ev=>{ const dx=ev.clientX-sx, dy=ev.clientY-sy;
        if(resize){ n.w=Math.max(120,ow+dx); n.h=Math.max(80,oh+dy); d.style.width=n.w+'px'; d.style.height=n.h+'px'; }
        else { n.x=ox+dx; n.y=oy+dy; d.style.left=n.x+'px'; d.style.top=n.y+'px'; kids.forEach(k=>{k.m.x=k.x+dx;k.m.y=k.y+dy; const kd=$(`.bn[data-id="${k.m.id}"]`,nodesEl); if(kd){kd.style.left=k.m.x+'px';kd.style.top=k.m.y+'px';}}); }
        const tr=$('#trash').getBoundingClientRect(); $('#trash').classList.toggle('hot', ev.clientX>tr.left-20&&ev.clientY>tr.top-20);
        renderLinks(); };
      const upf=ev=>{ removeEventListener('pointermove',mv); removeEventListener('pointerup',upf); if($('#trash').classList.contains('hot')){ del(n.id); $('#trash').classList.remove('hot'); } save(); };
      addEventListener('pointermove',mv); addEventListener('pointerup',upf);
    });
  }
  function del(id){ B.nodes=B.nodes.filter(n=>n.id!==id); B.links=B.links.filter(l=>l.a!==id&&l.b!==id); B.sel=null; render(); save(); }
  el.addEventListener('pointerdown',e=>{ if(e.target===el||e.target.classList.contains('grid')||e.target===nodesEl){ B.sel=null; if(B.linkSrc){B.linkSrc=null;} render(); } });
  function resize(){ can.width=innerWidth*devicePixelRatio; can.height=innerHeight*devicePixelRatio; can.style.width=innerWidth+'px'; can.style.height=innerHeight+'px'; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); redraw(); }
  function redraw(extra){ ctx.clearRect(0,0,innerWidth,innerHeight); B.strokes.forEach(s=>drawStroke(ctx,s)); if(extra) drawStroke(ctx,extra); save(); }
  bindInk(can, ()=>B.strokes, e=>[e.clientX,e.clientY], ()=>redraw(), s=>redraw(s));
  function btn(b){
    if(b==='link'){ B.linkMode=!B.linkMode; B.linkSrc=null; if(B.linkMode) setMode('pointer'); toast(B.linkMode?'Mode liaison : cliquez 2 icônes (double-clic sur un lien = supprimer)':'Mode liaison désactivé'); render(); }
    if(b==='zone') add({k:'zone',x:innerWidth/2-190,y:innerHeight/2-130});
    if(b==='note') add({k:'note',x:innerWidth/2,y:innerHeight/2});
    if(b==='flow'){ B.flow=!B.flow; renderLinks(); save(); }
    if(b==='dark'){ el.classList.toggle('dk'); save(); }
    if(b==='clearall'){ if(confirmClear()){ B.nodes=[];B.links=[];B.strokes=[]; render(); redraw(); save(); } }
    if(b==='close') toggle();
    $$('#btop button').forEach(x=>x.classList.toggle('on', (x.dataset.b==='link'&&B.linkMode)||(x.dataset.b==='flow'&&B.flow)));
  }
  let clrT=0; function confirmClear(){ const t=Date.now(); if(t-clrT<1500) return true; clrT=t; toast('Cliquez encore pour tout effacer'); return false; }
  $$('#btop button').forEach(x=>x.onclick=()=>btn(x.dataset.b));
  function toggle(){ B.on=!B.on; el.classList.toggle('on',B.on); if(B.on){ resize(); render(); btn('_'); } syncTb(); }
  B.toggle=toggle; B.resize=resize; B.redraw=redraw; B.btn=btn; B.delSel=()=>{ if(B.sel) del(B.sel); };
  return B;
})();

/* ---------- API pour les diapos ---------- */
const api={ next, prev, go, toast, get step(){return step}, get cur(){return cur},
  confetti(el,x=800,y=450){ const cols=['#FA582D','#FF8A3D','#FFD60A','#22C55E','#0EA5E9','#7C3AED']; for(let j=0;j<90;j++){ const c=document.createElement('i'); c.className='confetti'; c.style.background=cols[j%cols.length]; c.style.left=x+'px'; c.style.top=y+'px'; el.appendChild(c); const a=Math.random()*Math.PI*2, v=200+Math.random()*420; c.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${Math.cos(a)*v}px,${Math.sin(a)*v+300}px) rotate(${Math.random()*900}deg)`,opacity:0}],{duration:1400+Math.random()*900,easing:'cubic-bezier(.1,.7,.3,1)',fill:'forwards'}); setTimeout(()=>c.remove(),2400);} },
  count(el){ $$('[data-count]',el).forEach(x=>{ const to=parseFloat(x.dataset.count), dec=(x.dataset.count.split('.')[1]||'').length, dur=+(x.dataset.dur||1600), delay=+(x.dataset.delay||0); const t0=performance.now()+delay; const f=t=>{ const p=Math.min(1,Math.max(0,(t-t0)/dur)); const e=1-Math.pow(1-p,3); x.textContent=(to*e).toLocaleString('fr-FR',{minimumFractionDigits:dec,maximumFractionDigits:dec}); if(p<1) requestAnimationFrame(f); }; requestAnimationFrame(f); }); }
};
window.VIEWER=api;

/* ---------- quiz ---------- */
window.initQuiz=function(el, Q){
  const box=$('.quiz',el); let qi=0, score=0; const res=[];
  function draw(){
    const q=Q[qi]; const multi=q.a.length>1;
    box.innerHTML=`<div class="qz-top"><span class="chip dark">Question ${qi+1} / ${Q.length}</span><div class="qz-dots">${Q.map((_,j)=>`<i class="${j===qi?'cur':''} ${res[j]===true?'ok':res[j]===false?'ko':''}"></i>`).join('')}</div><span class="qz-score">Score : ${score} / ${Q.length}</span></div>
      <div class="qz-q a">${q.q}${multi?`<small>(${q.a.length} réponses)</small>`:''}</div>
      <div class="qz-opts" data-stg=".08" data-d0=".1">${q.o.map((o,j)=>`<button data-j="${j}" class="a"><span class="k">${'ABCDEFGH'[j]}</span>${o}</button>`).join('')}</div>
      <div class="qz-act"><button class="btn or" data-v>Valider</button><div class="qz-exp"></div><button class="btn gh" data-n style="display:none">${qi<Q.length-1?'Question suivante →':'Voir le résultat'}</button></div>`;
    $$('.qz-opts button',box).forEach((b,j)=>{ b.style.setProperty('--d',(.1+j*.08)+'s'); b.onclick=e=>{ e.stopPropagation(); if(box.dataset.done) return; if(!multi) $$('.qz-opts button',box).forEach(x=>x.classList.remove('sel')); b.classList.toggle('sel'); }; });
    box.dataset.done='';
    $('[data-v]',box).onclick=e=>{ e.stopPropagation(); if(box.dataset.done) return; const sel=$$('.qz-opts button.sel',box).map(b=>+b.dataset.j); if(!sel.length){ api.toast('Choisissez une réponse'); return; }
      box.dataset.done=1; const ok= sel.length===q.a.length && sel.every(x=>q.a.includes(x)); res[qi]=ok; if(ok) score++;
      $$('.qz-opts button',box).forEach(b=>{ const j=+b.dataset.j; if(q.a.includes(j)) b.classList.add('good'); else if(b.classList.contains('sel')) b.classList.add('wrong'); });
      const ex=$('.qz-exp',box); ex.innerHTML=(ok?'<b style="color:#16A34A">✔ Bonne réponse ! </b>':'<b style="color:#DC2626">✘ Pas tout à fait. </b>')+(q.e||''); ex.classList.add('on');
      $('[data-v]',box).style.display='none'; $('[data-n]',box).style.display='';
      if(ok) api.confetti(el, 800, 520);
      $('.qz-score',box).textContent=`Score : ${score} / ${Q.length}`; };
    $('[data-n]',box).onclick=e=>{ e.stopPropagation(); if(qi<Q.length-1){ qi++; draw(); } else end(); };
  }
  function end(){
    const pct=Math.round(score/Q.length*100);
    box.innerHTML=`<div style="margin:auto;text-align:center" class="a pop"><div class="big grad" style="font-size:140px;line-height:1">${score}/${Q.length}</div><div style="font-size:30px;font-weight:700;margin:10px 0 30px">${pct===100?'Parfait ! 🎉 Prêt pour la suite.':pct>=50?'Bien joué — revoyez les points manqués.':'On reprend ensemble les notions clés 💪'}</div><button class="btn or" data-r>Recommencer</button></div>`;
    if(pct===100){ api.confetti(el,800,400); setTimeout(()=>api.confetti(el,500,300),300); setTimeout(()=>api.confetti(el,1100,300),500); }
    $('[data-r]',box).onclick=e=>{ e.stopPropagation(); qi=0;score=0;res.length=0;draw(); };
  }
  draw();
};

/* ---------- start ---------- */
addEventListener('resize',fit);
fit(); syncTb();
const h=parseInt(location.hash.slice(1)); const ST=window.__START;
if(ST){ document.body.classList.add('pv'); go(Math.min(ST.i,S.length-1), ST.st||0); }
else go(!isNaN(h)&&h>=1&&h<=S.length? h-1 : firstVis(), 0);
wake();
if(!window.__START) setTimeout(()=>toast('Astuce : appuyez sur ? pour voir tous les raccourcis'),1200);
})();
