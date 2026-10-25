/* =========================================================
   OFFICE KIT — helpers de diapos pour la formation Word · Excel · PowerPoint
   (s'ajoute au kit de base : H, PATH, TITLE, SEC, OBJ, QUIZ, END, UL, CARD, FLOW, RECAP, labTasks…)
   Repère : diapo 1600 × 900 px. Étapes : tout élément .f data-s="n" apparaît au clic n.
   Aucune image externe : toutes les « captures » sont des maquettes HTML/SVG animées.
   ========================================================= */
const APP = {
  word:  { n: 'Word',       L: 'W', c: '#185ABD', c2: '#41A5EE', tabs: ['Fichier', 'Accueil', 'Insertion', 'Création', 'Mise en page', 'Références', 'Publipostage', 'Révision', 'Affichage'] },
  excel: { n: 'Excel',      L: 'X', c: '#107C41', c2: '#33C481', tabs: ['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Formules', 'Données', 'Révision', 'Affichage'] },
  ppt:   { n: 'PowerPoint', L: 'P', c: '#C43E1C', c2: '#FF8F6B', tabs: ['Fichier', 'Accueil', 'Insertion', 'Création', 'Transitions', 'Animations', 'Diaporama', 'Révision', 'Affichage'] },
};
APP.powerpoint = APP.ppt;

/* ---- icônes Office 64×64 (atelier de schémas W + I('excel',x,y,s) dans les SVG) ---- */
const _tile = (c1, c2, L) => `<defs><linearGradient id="tg${L}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>
  <rect x="14" y="6" width="44" height="52" rx="8" fill="url(#tg${L})"/><path d="M36 18h16M36 28h16M36 38h16M36 48h12" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>
  <rect x="4" y="16" width="32" height="32" rx="6" fill="${c1}"/><text x="20" y="41" font-size="24" font-weight="900" fill="#fff" text-anchor="middle" font-family="Georgia,serif">${L}</text>`;
const _file = (c, t) => `<path d="M14 4h26l12 12v44H14z" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><path d="M40 4v12h12" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/><rect x="8" y="34" width="40" height="18" rx="4" fill="${c}"/><text x="28" y="47.5" font-size="${t.length > 4 ? 8.5 : 11}" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial">${t}</text>`;
Object.assign(NET, {
  word: { l: 'Word', s: _tile('#185ABD', '#41A5EE', 'W') },
  excel: { l: 'Excel', s: _tile('#107C41', '#33C481', 'X') },
  ppt: { l: 'PowerPoint', s: _tile('#C43E1C', '#FF8F6B', 'P') },
  outlook: { l: 'Outlook', s: _tile('#0F5FB7', '#28A8EA', 'O') },
  teams: { l: 'Teams', s: _tile('#4B53BC', '#7B83EB', 'T') },
  onedrive: { l: 'OneDrive', s: `<path d="M18 46h30a10 10 0 0 0 1-20 14 14 0 0 0-27-3 11 11 0 0 0-4 23z" fill="#0F78D4"/><path d="M26 46h28a8 8 0 0 0 0-16 12 12 0 0 0-22-2 9 9 0 0 0-6 18z" fill="#28A8EA"/>` },
  sharepoint: { l: 'SharePoint', s: `<circle cx="36" cy="24" r="16" fill="#036C70"/><circle cx="44" cy="38" r="13" fill="#1A9BA1"/><circle cx="34" cy="48" r="10" fill="#37C6D0"/><rect x="6" y="20" width="28" height="28" rx="6" fill="#03787C"/><text x="20" y="41" font-size="20" font-weight="900" fill="#fff" text-anchor="middle" font-family="Georgia,serif">S</text>` },
  copilot: { l: 'Copilot', s: `<defs><linearGradient id="gcp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563EB"/><stop offset=".5" stop-color="#7C3AED"/><stop offset="1" stop-color="#F59E0B"/></linearGradient></defs><path d="M32 6l6 18 18 8-18 8-6 18-6-18-18-8 18-8z" fill="url(#gcp)"/><circle cx="50" cy="12" r="4" fill="#F59E0B"/>` },
  docx: { l: 'Document .docx', s: _file('#185ABD', 'DOCX') },
  xlsx: { l: 'Classeur .xlsx', s: _file('#107C41', 'XLSX') },
  pptx: { l: 'Présentation .pptx', s: _file('#C43E1C', 'PPTX') },
  pdf: { l: 'PDF', s: _file('#DC2626', 'PDF') },
  csv: { l: 'Fichier CSV', s: _file('#475569', 'CSV') },
  tpl: { l: 'Modèle', s: _file('#7C3AED', 'MODÈLE') },
  folder: { l: 'Dossier', s: `<path d="M6 16a4 4 0 0 1 4-4h14l6 6h24a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#F5B301"/><path d="M6 24h52v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#FCD34D"/>` },
  img: { l: 'Image', s: `<rect x="6" y="10" width="52" height="44" rx="6" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="2"/><circle cx="22" cy="24" r="6" fill="#F59E0B"/><path d="M8 50l16-16 10 10 8-8 14 14z" fill="#0EA5E9"/>` },
  chart: { l: 'Graphique', s: `<rect x="6" y="6" width="52" height="52" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><rect x="14" y="34" width="8" height="16" rx="2" fill="#107C41"/><rect x="28" y="22" width="8" height="28" rx="2" fill="#33C481"/><rect x="42" y="14" width="8" height="36" rx="2" fill="#FA582D"/>` },
  tablei: { l: 'Tableau', s: `<rect x="6" y="10" width="52" height="44" rx="6" fill="#fff" stroke="#33445E" stroke-width="2"/><rect x="6" y="10" width="52" height="11" rx="6" fill="#33445E"/><path d="M6 32h52M6 43h52M24 10v44M42 10v44" stroke="#33445E" stroke-width="2"/>` },
  formula: { l: 'Formule', s: `<rect x="6" y="14" width="52" height="36" rx="8" fill="#ECFDF3" stroke="#107C41" stroke-width="2"/><text x="32" y="40" font-size="20" font-weight="900" fill="#107C41" text-anchor="middle" font-family="Georgia,serif" font-style="italic">fx</text>` },
  filteri: { l: 'Filtre / tri', s: `<path d="M8 10h48L38 32v18l-12 6V32z" fill="#0EA5E9"/>` },
  macro: { l: 'Macro VBA', s: `<rect x="6" y="10" width="52" height="44" rx="6" fill="#1E293B"/><text x="32" y="38" font-size="14" font-weight="900" fill="#FBBF24" text-anchor="middle" font-family="Consolas,monospace">Sub()</text><circle cx="50" cy="18" r="4" fill="#22C55E"/>` },
  mail: { l: 'E-mail', s: `<rect x="6" y="14" width="52" height="36" rx="6" fill="#0F78D4"/><path d="M6 18l26 18 26-18" fill="none" stroke="#fff" stroke-width="3"/>` },
  print: { l: 'Imprimer', s: `<rect x="16" y="6" width="32" height="18" rx="2" fill="#fff" stroke="#33445E" stroke-width="2"/><rect x="6" y="22" width="52" height="24" rx="6" fill="#33445E"/><rect x="16" y="38" width="32" height="20" rx="2" fill="#fff" stroke="#33445E" stroke-width="2"/><circle cx="48" cy="30" r="2.5" fill="#22C55E"/>` },
});
if (!NET.cloud) NET.cloud = { l: 'Cloud', s: `<path d="M18 48h30a11 11 0 0 0 1-22 15 15 0 0 0-29-3 12 12 0 0 0-2 25z" fill="#38BDF8"/>` };
['lock', 'ai', 'user', 'users', 'admin', 'laptop', 'mobile'].forEach(k => { if (!NET[k]) NET[k] = { l: k, s: `<circle cx="32" cy="32" r="24" fill="#94A3B8"/>` }; });

/* étape : attributs pour un élément qui apparaît au clic s (ou animé à l'entrée si s absent) */
const _st = (s, d = .2, cls = '') => s ? `class="f ${cls}" data-s="${s}"` : `class="a ${cls}" style="--d:${d}s"`;

/* ---------- fenêtre d'application (maquette animée) ----------
   APPWIN({app:'excel', x, y, w, h, title:'Ventes.xlsx', tab:'Accueil', groups:[['Presse-papiers',['📋 Coller','✂ Couper']],['Police',['G','I','S']]],
           hot:{'G':2,'📋 Coller':3}, body:'<html…>', s:1})
   hot = bouton du ruban → étape à laquelle il est entouré + numéroté. body = contenu de la zone de travail (GRID, PAGE, SLD…). */
function APPWIN(o) {
  const A = APP[o.app] || APP.word, tabs = o.tabs || A.tabs, tab = o.tab || 'Accueil', hot = o.hot || {};
  const btn = b => { const big = /^\S+\s/.test(b) && /[\u{1F300}-\u{1FAFF}☀-➿]/u.test(b.split(' ')[0]);
    const h = hot[b];
    return `<span class="ow-b${big ? ' big' : ''}">${big ? `<i>${b.split(' ')[0]}</i>${b.slice(b.indexOf(' ') + 1)}` : b}${h ? `<em class="ow-hot f zoom" data-s="${h}"><b>${h}</b></em>` : ''}</span>`; };
  const hotTab = hot['tab:' + tab];
  return `<div class="ow ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .15}s;`}left:${o.x ?? 70}px;top:${o.y ?? 160}px;width:${o.w ?? 900}px;${o.h ? `height:${o.h}px;` : ''}--ac:${A.c};--ac2:${A.c2}">
    <div class="ow-tb"><span class="ow-lg">${A.L}</span><b>${o.title || (A.n === 'Excel' ? 'Classeur1' : A.n === 'Word' ? 'Document1' : 'Présentation1')}</b><span class="ow-mut">— ${A.n}</span><span class="ow-sp"></span><span class="ow-srch">🔍 Rechercher</span><i></i><i></i><i></i></div>
    ${o.noribbon ? '' : `<div class="ow-tabs">${tabs.map(t => `<span class="${t === tab ? 'on' : ''}">${t}${hot['tab:' + t] ? `<em class="ow-hot f zoom" data-s="${hot['tab:' + t]}"><b>${hot['tab:' + t]}</b></em>` : ''}</span>`).join('')}</div>
    ${o.groups ? `<div class="ow-rb">${o.groups.map(([n, bs]) => `<div class="ow-g"><div class="ow-gb">${bs.map(btn).join('')}</div><small>${n}</small></div>`).join('')}</div>` : ''}`}
    <div class="ow-body" style="${o.bodyStyle || ''}">${o.body || ''}</div>${hotTab ? '' : ''}</div>`;
}

/* ---------- grille Excel ----------
   GRID({x, y, w, cols:6, colw:[160,110,…], rows:[['Produit','Prix HT','TTC'],['Stylo',1.5,''],…], head:true,
         fx:{ref:'C2', f:'=B2*1,2', s:2},            // barre de formule tapée à l'étape s
         val:[{r:'C2', v:'1,80', s:3}],                // valeur qui apparaît dans une cellule à l'étape s
         hl:[{r:'B2:B5', s:2, c:'#2563EB', t:'plage'}],// cadre coloré (+ étiquette) à l'étape s
         sel:'C2', inwin:true })                       // inwin : rendu pour être placé dans APPWIN.body (positions relatives) */
function GRID(o) {
  const rows = o.rows || [], nc = o.cols || Math.max(...rows.map(r => r.length), 1), nr = o.nrows || rows.length + 1;
  const RH = o.rh || 38, CW0 = 46, cw = c => (o.colw && o.colw[c]) || o.cw || 120;
  const X = c => CW0 + Array.from({ length: c }, (_, i) => cw(i)).reduce((a, b) => a + b, 0);
  const ref = r => { const m = /^([A-Z])(\d+)$/.exec(r); return { c: m[1].charCodeAt(0) - 65, r: +m[2] - 1 }; };
  const box = (rg) => { const [a, b] = rg.split(':'), p = ref(a), q = ref(b || a); return { x: X(Math.min(p.c, q.c)), y: (o.fx === false ? 0 : 0) + RH * (Math.min(p.r, q.r) + 1), w: X(Math.max(p.c, q.c) + 1) - X(Math.min(p.c, q.c)), h: RH * (Math.abs(q.r - p.r) + 1) }; };
  const fmt = v => typeof v === 'number' ? String(v).replace('.', ',') : (v ?? '');
  const isNum = v => typeof v === 'number' || /^-?[\d\s]+([,.]\d+)?\s?(€|%)?$/.test(String(v || ''));
  const vals = {}; (o.val || []).forEach(v => { vals[v.r] = v; });
  const W = X(nc);
  let h = `<div class="xg-cols" style="height:${RH}px">${Array.from({ length: nc }, (_, c) => `<span style="left:${X(c)}px;width:${cw(c)}px">${String.fromCharCode(65 + c)}</span>`).join('')}</div>`;
  for (let r = 0; r < nr - 1; r++) {
    h += `<div class="xg-row" style="top:${RH * (r + 1)}px;height:${RH}px"><span class="xg-rn">${r + 1}</span>${Array.from({ length: nc }, (_, c) => {
      const k = String.fromCharCode(65 + c) + (r + 1), v = rows[r] ? rows[r][c] : '', vv = vals[k];
      const head = o.head !== false && r === 0;
      return `<span class="xg-c${head ? ' hd' : ''}${isNum(v) && !head ? ' n' : ''}" style="left:${X(c)}px;width:${cw(c)}px">${fmt(v)}${vv ? `<b class="xg-v f" data-s="${vv.s}" style="${vv.c ? `color:${vv.c}` : ''}">${vv.v}</b>` : ''}</span>`;
    }).join('')}</div>`;
  }
  const hl = (o.hl || []).map(q => { const b = box(q.r); return `<div class="xg-hl ${q.s ? 'f zoom' : 'a pop'}" ${q.s ? `data-s="${q.s}"` : `style="--d:${q.d ?? .5}s"`} style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;--hc:${q.c || '#2563EB'}">${q.t ? `<i>${q.t}</i>` : ''}</div>`; }).join('');
  const sel = o.sel ? (() => { const b = box(o.sel); return `<div class="xg-sel" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px"></div>`; })() : '';
  const fx = o.fx ? `<div class="xg-fx"><span class="xg-nm">${o.fx.ref || o.sel || 'A1'}</span><em>fx</em><span class="xg-f" style="${(o.fx.f || '').length > 22 ? `font-size:${Math.max(12, Math.floor(19 * 23 / (o.fx.f || '').length))}px` : ''}"><b class="tw f" data-s="${o.fx.s || 1}" style="--n:${(o.fx.f || '').length}">${o.fx.f || ''}</b></span></div>` : '';
  const pos = o.inwin ? `position:relative;margin:${o.m ?? 0}px` : `position:absolute;left:${o.x ?? 70}px;top:${o.y ?? 170}px`;
  return `<div class="xg ${o.inwin ? '' : 'a pop'}" style="${pos};width:${W + 2}px;${o.inwin ? '' : `--d:${o.d ?? .2}s`}">${fx}<div class="xg-grid" style="height:${RH * nr}px">${h}${sel}${hl}</div></div>`;
}

/* ---------- page Word ----------
   PAGE({x, y, w:620, h:780, html:'…', s, ruler:true})   contenu : <h1>, <h2>, <p>, <ul>, LINES(n) pour du texte factice
   Classes utiles dans html : .pg-mark (surligné), .pg-new (apparition), éléments .f data-s pour les étapes */
function PAGE(o) {
  return `<div class="pg ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .2}s;`}${o.inwin ? 'position:relative;margin:18px auto;' : `left:${o.x ?? 70}px;top:${o.y ?? 160}px;`}width:${o.w ?? 620}px;${o.h ? `min-height:${o.h}px;` : ''}">
   ${o.header ? `<div class="pg-hdr">${o.header}</div>` : ''}<div class="pg-in">${o.html || ''}</div>${o.footer ? `<div class="pg-ftr">${o.footer}</div>` : ''}</div>`;
}
/* lignes de texte factice (barres grises) — n lignes, dernière plus courte */
function LINES(n = 3, o = {}) { return `<div class="pg-lines ${o.cls || ''}" ${o.s ? `data-s="${o.s}"` : ''}>${Array.from({ length: n }, (_, i) => `<i style="width:${i === n - 1 ? 55 + (i * 17) % 30 : 92 - (i * 7) % 12}%"></i>`).join('')}</div>`; }

/* ---------- mini diapositive PowerPoint ----------
   SLD({x, y, w:520, theme:'blanc|nuit|ocean|sunset|foret', title:'…', sub:'…', bullets:['…'], layout:'title|content|two|section|blank',
        art:'<svg/html libre positionné en % >', s, cls}) */
const SLDTHEMES = { blanc: ['#FFFFFF', '#0E1726', '#C43E1C'], nuit: ['#0F172A', '#F8FAFC', '#38BDF8'], ocean: ['#0C4A6E', '#F0F9FF', '#5EEAD4'],
  sunset: ['#7C2D12', '#FFF7ED', '#FDBA74'], foret: ['#14532D', '#F0FDF4', '#A3E635'], violet: ['#3B0764', '#FAF5FF', '#F0ABFC'] };
function SLD(o) {
  const [bg, fg, ac] = SLDTHEMES[o.theme || 'blanc'] || SLDTHEMES.blanc, w = o.w ?? 520, k = w / 520, lay = o.layout || (o.bullets ? 'content' : 'title');
  const inner = lay === 'title' || lay === 'section'
    ? `<div class="sd-c"><div class="sd-t" style="font-size:${(lay === 'section' ? 30 : 34) * k}px">${o.title || ''}</div>${o.sub ? `<div class="sd-s" style="font-size:${15 * k}px">${o.sub}</div>` : ''}</div>`
    : `<div class="sd-tt" style="font-size:${24 * k}px">${o.title || ''}</div>${lay === 'two' ? `<div class="sd-two" style="font-size:${14 * k}px"><div>${(o.left || []).map(b => `<p>${b}</p>`).join('')}</div><div>${(o.right || []).map(b => `<p>${b}</p>`).join('')}</div></div>`
      : `<ul class="sd-ul" style="font-size:${15 * k}px">${(o.bullets || []).map((b, i) => `<li ${o.bs ? `class="f" data-s="${o.bs + i}"` : ''}>${b}</li>`).join('')}</ul>`}`;
  return `<div class="sd ${o.s ? 'f zoom' : 'a pop'} ${o.cls || ''}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .2}s;`}${o.inwin ? 'position:relative;margin:20px auto;' : `left:${o.x ?? 70}px;top:${o.y ?? 170}px;`}width:${w}px;height:${w * 9 / 16}px;background:${bg};color:${fg};--sac:${ac}">${inner}${o.art || ''}${o.badge ? `<span class="sd-badge">${o.badge}</span>` : ''}</div>`;
}

/* ---------- touches clavier ----------
   KEYS('Ctrl+Maj+L')  → touches stylées en ligne ;  KEYCARDS([{k:'Ctrl+C', d:'Copier'}, …], {cols:3, y:180})  → grille de cartes révélées une à une */
function KEYS(s, o = {}) {
  const parts = String(s).split(/\+(?!$)/);
  return `<span class="kk ${o.cls || ''}">${parts.map(p => `<kbd>${p}</kbd>`).join('<i>+</i>')}</span>`;
}
function KEYCARDS(list, o = {}) {
  const cols = o.cols || 3;
  return `<div style="position:absolute;left:${o.x ?? 70}px;right:${o.r ?? 70}px;top:${o.y ?? 180}px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:18px">
    ${list.map((k, i) => `<div class="card kc f zoom" data-s="${(o.s0 || 1) + i}">${KEYS(k.k)}<span>${k.d}</span></div>`).join('')}</div>`;
}

/* ---------- procédure pas à pas avec chemin du ruban ----------
   PROC([{p:'Accueil > Styles > Titre 1', t:'Applique le style au paragraphe'}, …], {x, y, w}) */
function PROC(list, o = {}) {
  return `<div style="position:absolute;left:${o.x ?? 70}px;top:${o.y ?? 175}px;width:${o.w ?? 700}px;display:flex;flex-direction:column;gap:${o.gap ?? 14}px">
   ${list.map((it, i) => `<div class="card pr f left" data-s="${(o.s0 || 1) + i}"><span class="num-badge or">${i + 1}</span><div>${it.p ? PATH(it.p) : ''}${it.t ? `<div class="pr-t">${it.t}</div>` : ''}${it.k ? `<div style="margin-top:6px">${KEYS(it.k)}</div>` : ''}</div></div>`).join('')}</div>`;
}

/* ---------- comparaison avant / après (ou à faire / à éviter) ----------
   VS({l:{t:'Avant', items:['…'], c:'#DC2626', ic:'✘'}, r:{t:'Après', items:['…'], c:'#16A34A', ic:'✔'}, y:180}) */
function VS(o) {
  const col = (q, side, s0) => `<div class="card vs f ${side}" data-s="${s0}" style="--vc:${q.c}"><div class="vs-h"><span>${q.ic || ''}</span>${q.t}</div>${q.html || `<ul class="lst sm">${(q.items || []).map(t => `<li>${t}</li>`).join('')}</ul>`}</div>`;
  return `<div style="position:absolute;left:70px;right:70px;top:${o.y ?? 180}px;display:grid;grid-template-columns:1fr ${o.mid ? 'auto ' : ''}1fr;gap:30px;align-items:stretch">
   ${col(o.l, 'left', o.s1 || 1)}${o.mid ? `<div class="vs-mid a pop" style="--d:.4s">${o.mid}</div>` : ''}${col(o.r, 'right', o.s2 || 2)}</div>`;
}

/* ---------- astuce formateur / piège ----------
   TIP('Texte', {x, y, w, s, kind:'tip|warn|ok'}) */
function TIP(html, o = {}) {
  const ic = { tip: '💡', warn: '⚠️', ok: '✅', key: '⌨️' }[o.kind || 'tip'];
  return `<div class="otip ${o.kind || 'tip'} ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .8}s;`}left:${o.x ?? 70}px;${o.y != null ? `top:${o.y}px;` : `bottom:${o.b ?? 70}px;`}width:${o.w ?? 600}px"><span>${ic}</span><div>${html}</div></div>`;
}

/* ---------- lab interactif (lien vers les labs vérifiés en direct) ----------
   LAB({app:'excel', mod:'x03', title:'Lab — Les primes', tasks:['…','…'], lab:0}) → diapo « Atelier pratique » */
const LABURL = 'https://dinecherd.github.io/panw/pages/office.html';
function LAB(o) {
  const A = APP[o.app] || APP.word, appKey = o.app === 'ppt' ? 'powerpoint' : o.app;
  const url = `${LABURL}#/${appKey}/${o.mod}/labs${o.lab != null ? '/' + o.lab : ''}`;
  return `${H(o.title || 'Atelier pratique', 'Lab · à vous de jouer')}
  <div style="position:absolute;left:70px;top:175px;width:880px;display:flex;flex-direction:column;gap:14px">
   ${(o.tasks || []).map((t, i) => `<div class="card f left" data-s="${i + 1}" style="display:flex;gap:16px;align-items:center;padding:14px 20px"><span class="num-badge or">${i + 1}</span><span style="font-size:21px;font-weight:600">${t}</span></div>`).join('')}
  </div>
  <a class="labgo a pop" style="--d:.5s;--ac:${A.c};--ac2:${A.c2}" href="${url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
   <span class="ow-lg" style="width:84px;height:84px;font-size:46px;border-radius:22px">${A.L}</span>
   <b>Lab interactif ${A.n}</b><small>Les tâches se valident en direct dans le simulateur</small><span class="chip dark">Ouvrir le lab ↗</span>
   <em>${url.replace('https://', '')}</em></a>`;
}

/* ---------- carte « chiffre clé » ----------  STAT({v:'80 %', t:'des utilisateurs…', x, y, w, s, c}) */
function STAT(o) {
  return `<div class="card stat2 ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .3}s;`}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w ?? 300}px;--sc:${o.c || '#FA582D'}"><b>${o.v}</b><span>${o.t}</span></div>`;
}

/* ---------- art de titre par application (pour TITLE({art: APPART('excel')})) ---------- */
function APPART(app) {
  const A = APP[app] || APP.word;
  return `<svg viewBox="0 0 760 900" style="width:100%;height:100%">
   <defs><linearGradient id="ga${A.L}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${A.c2}"/><stop offset="1" stop-color="${A.c}"/></linearGradient></defs>
   ${[0, 1, 2, 3, 4].map(i => `<rect x="${150 + i * 26}" y="${210 + i * 26}" width="${430 - i * 52}" height="${480 - i * 52}" rx="${44 - i * 6}" fill="none" stroke="url(#ga${A.L})" stroke-opacity="${.12 + i * .1}" stroke-width="2" class="draw" pathLength="1" style="--d:${i * .12}s"/>`).join('')}
   <g class="a pop float" style="--d:.35s"><rect x="250" y="320" width="230" height="260" rx="40" fill="url(#ga${A.L})" filter="url(#gl)"/><text x="365" y="500" font-size="170" font-weight="900" fill="#fff" text-anchor="middle" font-family="Georgia,serif">${A.L}</text></g>
   ${[0, 1, 2, 3, 4, 5].map(i => `<circle r="${5 + (i % 3) * 2}" fill="${i % 2 ? A.c2 : '#FA582D'}" filter="url(#gl)"><animateMotion dur="${6 + i}s" begin="${i * .7}s" repeatCount="indefinite" path="M365 450 m-${250 + i * 12} 0 a${250 + i * 12} ${250 + i * 12} 0 1 0 ${500 + i * 24} 0 a${250 + i * 12} ${250 + i * 12} 0 1 0 -${500 + i * 24} 0"/></circle>`).join('')}
  </svg>`;
}
