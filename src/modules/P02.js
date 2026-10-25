/* ===================== MODULE P02 — Mettre en forme : thèmes, texte, formes et alignement ===================== */
const SECSP02 = ['Thèmes et variantes', 'Mettre en forme le texte', 'Formes, icônes et alignement'];

(function () {
  if (document.getElementById('cssP02')) return;
  const s = document.createElement('style'); s.id = 'cssP02';
  s.textContent = `
.p2-ed{position:absolute;inset:0;display:flex}
.p2-th{width:140px;flex:none;background:#F3F4F6;border-right:1px solid #E3E8EF;padding:12px 8px;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.p2-tb{display:flex;gap:6px;font:700 11px var(--font);color:#6B7A90}
.p2-tb>div{border-radius:4px;box-shadow:0 0 0 1px #CBD5E1;overflow:hidden;line-height:0}
.p2-tb.sel>div{box-shadow:0 0 0 3px #C43E1C}
.p2-main{position:relative;flex:1;display:flex;align-items:center;justify-content:center}
.p2-thb{display:inline-grid;place-items:center;width:58px;height:40px;border-radius:5px;font:800 16px Georgia,serif;box-shadow:0 0 0 1px #CBD5E1}
.p2-rel{position:relative;display:inline-block}
.p2-k{display:flex;align-items:center;gap:16px;padding:14px 20px}
.p2-k .kk kbd{font-size:18px;padding:6px 12px}
.p2-k span.d{font-size:21px;font-weight:700}
.p2-k small{display:block;font-size:17px;color:#6B7A90;font-weight:600}
.p2-pal{display:grid;grid-template-columns:repeat(10,30px);gap:4px}
.p2-pal i{width:30px;height:22px;border:1px solid rgba(0,0,0,.08)}
.p2-dm{position:relative;transition:background .8s}
.p2-dm .sh{position:absolute;display:grid;place-items:center;color:#fff;font-size:22px;font-weight:800;border-radius:18px;transition:background .8s}
.p2-dm .th{background:var(--a1);transition:background .8s}
.p2-dm[data-th="a"]{--a1:#C43E1C;--bg:#fff}
.p2-dm[data-th="b"]{--a1:#0C7C8C;--bg:#F0F9FF}
.p2-mix span{transition:font-family .1s,color .6s,font-size .6s}
.p2-mix[data-st="1"] span{font-family:Aptos,"Segoe UI",var(--font)!important;color:#1B2A41!important;font-size:30px!important;font-style:normal!important;text-decoration:none!important;font-weight:600!important}
.p2-sz{display:flex;align-items:baseline;gap:22px;padding:10px 0;border-bottom:1px dashed #CBD5E1}
.p2-sz b{width:150px;flex:none;font:800 20px var(--mono);color:#C43E1C}
.p2-al{position:relative;width:860px;height:484px;background:#fff;border-radius:12px;box-shadow:0 30px 60px -25px rgba(14,23,38,.5),0 0 0 1px rgba(14,23,38,.1)}
.p2-al .sh{position:absolute;width:150px;height:90px;border-radius:16px;display:grid;place-items:center;color:#fff;font-size:20px;font-weight:800;background:linear-gradient(135deg,#0C7C8C,#14B8A6);transition:left .9s cubic-bezier(.6,0,.2,1),top .9s cubic-bezier(.6,0,.2,1);box-shadow:0 10px 20px -10px rgba(0,0,0,.4)}
.p2-al .gd{position:absolute;border:0 dashed #DC2626;opacity:0;transition:opacity .4s}
.p2-al[data-st="1"] .gh,.p2-al[data-st="2"] .gv,.p2-al[data-st="3"] .gc{opacity:1}
.p2-menu{background:#fff;border-radius:12px;box-shadow:var(--sh);padding:8px 0;font-size:19px}
.p2-menu div{position:relative;padding:8px 20px;display:flex;gap:12px;align-items:center;transition:background .3s,color .3s}
.p2-menu div.on{background:#FFF1EC;color:#C43E1C;font-weight:800}
.p2-menu hr{border:0;border-top:1px solid #E3E8EF;margin:6px 0}
.p2-gl{animation:p2gl 4.5s ease-in-out infinite}
@keyframes p2gl{0%,10%{left:80px;top:300px}40%,70%{left:330px;top:197px}100%{left:80px;top:300px}}
.p2-gx{animation:p2gx 4.5s ease-in-out infinite}
@keyframes p2gx{0%,38%{opacity:0}42%,68%{opacity:1}72%,100%{opacity:0}}
.p2-pn .tg{position:absolute;width:190px;height:100px;border-radius:6px;display:grid;place-items:center;font-size:20px;font-weight:700;background:#E2E8F0;color:#33445E;border:2px solid #94A3B8;transition:all .7s}
.p2-pn .tg.on2,.p2-pn .src{background:linear-gradient(135deg,#7C3AED,#C084FC);color:#fff;border:3px solid #3B0764;border-radius:26px;box-shadow:0 14px 26px -12px rgba(124,58,237,.8)}
.p2-pn .br{position:absolute;font-size:44px;transition:left .7s,top .7s;filter:drop-shadow(0 6px 8px rgba(0,0,0,.3))}
.p2-fs{position:absolute;display:grid;place-items:center;font-size:24px;font-weight:800;transition:all .8s}
.p2-ic{display:grid;place-items:center;width:74px;height:74px;border-radius:12px;background:#F3F4F6;transition:all .5s}
.p2-ic svg{width:44px;height:44px;stroke:#33445E;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.p2-ic.sel{background:#FFF1EC;box-shadow:0 0 0 3px #FA582D}
.p2-orb{animation:spin 30s linear infinite;transform-box:fill-box;transform-origin:center}
`;
  document.head.appendChild(s);
})();

/* mini diapo (miniatures) */
function MINIP02(o = {}) {
  const [bg, fg, ac] = SLDTHEMES[o.th || 'blanc'] || SLDTHEMES.blanc, w = o.w || 104, lay = o.lay || 'content';
  const T = (x, y, s, t, anc = 'start') => `<text x="${x}" y="${y}" font-size="${s}" font-weight="800" fill="${fg}" text-anchor="${anc}" font-family="Segoe UI,Arial">${t}</text>`;
  const L = (x, y, ww) => `<rect x="${x}" y="${y}" width="${ww}" height="4" rx="2" fill="${fg}" opacity=".4"/>`;
  const ttl = (o.t ? T(12, 19, 11, o.t) : `<rect x="12" y="10" width="86" height="9" rx="2" fill="${fg}" opacity=".85"/>`) + `<rect x="12" y="24" width="136" height="1.5" fill="${ac}"/>`;
  const bul = (x, y, n, ww) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 11}" width="4" height="4" fill="${ac}"/>${L(x + 8, y + i * 11, ww - (i % 3) * 12)}`).join('');
  const g = lay === 'title' ? (o.t ? T(80, 47, 13, o.t, 'middle') : `<rect x="28" y="36" width="104" height="11" rx="2" fill="${fg}" opacity=".9"/>`) + `<rect x="50" y="55" width="60" height="5" rx="2" fill="${fg}" opacity=".4"/><rect x="66" y="27" width="28" height="2.5" fill="${ac}"/>`
    : lay === 'cta' ? ttl + bul(12, 34, 3, 90) + `<rect x="45" y="66" width="70" height="16" rx="8" fill="${ac}"/>` : ttl + bul(12, 36, o.n || 4, 100);
  return `<svg viewBox="0 0 160 90" style="width:${w}px;height:${Math.round(w * 9 / 16)}px;display:block;background:${bg};border-radius:4px">${g}</svg>`;
}
/* vue Normal (miniatures + diapo) */
function EDP02(th, slide, sel = 2) {
  const ts = [['title', 'Salon Talents 2026'], ['content', 'Infos pratiques'], ['cta', 'Au programme']];
  return `<div class="p2-ed"><div class="p2-th">${ts.map(([l, t], i) => `<div class="p2-tb ${i + 1 === sel ? 'sel' : ''}"><span>${i + 1}</span><div>${MINIP02({ lay: l, t, th })}</div></div>`).join('')}</div><div class="p2-main">${slide}</div></div>`;
}
const HOTP02 = n => `<em class="ow-hot f zoom" data-s="${n}"><b>${n}</b></em>`;
const THBP02 = t => { const [bg, fg, ac] = SLDTHEMES[t]; return `<span class="p2-thb" style="background:${bg};color:${fg};border-bottom:5px solid ${ac}">Aa</span>`; };
/* pictogrammes simples pour la boîte Icônes */
const ICOP02 = { team: '<circle cx="12" cy="8" r="3.2"/><circle cx="5" cy="10" r="2.4"/><circle cx="19" cy="10" r="2.4"/><path d="M6.5 20a5.5 5.5 0 0 1 11 0"/><path d="M1.5 19a3.6 3.6 0 0 1 5-3.2M22.5 19a3.6 3.6 0 0 0-5-3.2"/>',
  hand: '<path d="M2 14l4-4 4 2 3-3 4 1 5 5"/><path d="M6 10l6 6a2 2 0 0 0 3 0l4-4"/><path d="M2 14v4h3"/>', grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/><path d="M22 9v6"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', pin: '<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>', cv: '<path d="M6 3h9l4 4v14H6z"/><circle cx="11" cy="10" r="2"/><path d="M8 16a3 3 0 0 1 6 0M15 3v4h4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>' };
const ICP02 = (k, c = '#33445E') => `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke:${c}">${ICOP02[k]}</svg>`;

window.MODULE = { code: 'P02', title: 'Mettre en forme : thèmes, texte, formes et alignement', short: 'Mise en forme', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Mettre en forme', html: TITLE({ mod: 'POWERPOINT · MODULE 02 · DÉBUTANT', title: 'Une allure <span class="grad">pro</span> en quelques clics', sub: '« Le thème décide, vous n\'avez plus à bricoler »', agenda: SECSP02, art: APPART('ppt') }),
  n: `<p>Module 02 (environ 55 minutes) : donner une allure professionnelle et <b>cohérente</b> à un deck, sans bricolage diapo par diapo.</p>
  <p>Fil rouge : le deck d'annonce du <b>Salon Talents 2026</b> du service RH de Néolia, qui tournera sur les écrans d'accueil.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Appliquer un <b>thème</b> et une <b>variante</b> à tout le deck', 'Choisir ses couleurs dans les <b>couleurs du thème</b>', 'Mettre en forme le <b>texte</b> avec mesure', 'Insérer <b>formes</b> et <b>icônes</b>', '<b>Aligner</b>, <b>distribuer</b>, <b>reproduire</b> la mise en forme']),
  n: `<p>Le fil conducteur : <b>ne jamais mettre en forme à la main ce que le thème ou un outil peut faire pour vous</b>. Un deck cohérent se reconnaît en une seconde ; un deck bricolé aussi.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP02, 0), n: `<p>Première partie : le thème, ses variantes et ses couleurs.</p>` },

/* 4 — QU'EST-CE QU'UN THÈME */
{ title: 'Qu\'est-ce qu\'un thème ?', html: `${H('Un thème = quatre ingrédients', 'L\'identité visuelle du deck')}
<svg viewBox="0 0 1460 640" style="position:absolute;left:70px;top:170px;width:1460px;height:640px">
 <circle cx="730" cy="320" r="270" fill="none" stroke="#FA582D" stroke-opacity=".25" stroke-width="2" stroke-dasharray="6 10" class="p2-orb"/>
 ${[[380, 130, 1], [1080, 130, 2], [380, 510, 3], [1080, 510, 4]].map(([x, y, s]) => `<g class="f" data-s="${s}"><path d="M${x} ${y} L730 320" stroke="#FA582D" stroke-width="3" stroke-dasharray="8 8" class="flow"/></g>`).join('')}
</svg>
${SLD({ x: 560, y: 340, w: 480, theme: 'ocean', title: 'Salon Talents 2026', sub: 'Rencontrez nos équipes et nos métiers', d: .2 })}
<div class="card f zoom" data-s="1" style="position:absolute;left:110px;top:200px;width:380px;padding:18px 22px"><b style="font-size:24px">🎨 Couleurs</b><div style="display:flex;gap:6px;margin-top:10px">${['#0C4A6E', '#F0F9FF', '#5EEAD4', '#0EA5E9', '#F59E0B', '#7C3AED', '#16A34A', '#DC2626'].map(c => `<i style="width:34px;height:34px;border-radius:6px;background:${c};box-shadow:0 0 0 1px #CBD5E1"></i>`).join('')}</div><div style="font-size:17px;color:#6B7A90;margin-top:6px">une palette de 12 couleurs</div></div>
<div class="card f zoom" data-s="2" style="position:absolute;left:1110px;top:200px;width:380px;padding:18px 22px"><b style="font-size:24px">🔤 Polices</b><div style="display:flex;gap:26px;margin-top:8px;align-items:baseline"><span style="font:800 34px Georgia,serif">Aa <small style="font-size:15px;color:#6B7A90">titres</small></span><span style="font:400 30px 'Segoe UI',Arial">Aa <small style="font-size:15px;color:#6B7A90">corps</small></span></div></div>
<div class="card f zoom" data-s="3" style="position:absolute;left:110px;top:590px;width:380px;padding:18px 22px"><b style="font-size:24px">✨ Effets</b><div style="display:flex;gap:18px;margin-top:10px"><i style="width:60px;height:40px;border-radius:8px;background:#0EA5E9"></i><i style="width:60px;height:40px;border-radius:8px;background:#0EA5E9;box-shadow:6px 6px 0 rgba(0,0,0,.25)"></i><i style="width:60px;height:40px;border-radius:8px;background:linear-gradient(#5EEAD4,#0EA5E9);box-shadow:0 0 14px #5EEAD4"></i></div></div>
<div class="card f zoom" data-s="4" style="position:absolute;left:1110px;top:590px;width:380px;padding:18px 22px"><b style="font-size:24px">🖼 Arrière-plans</b><div style="display:flex;gap:10px;margin-top:10px">${['#0C4A6E', 'linear-gradient(135deg,#0C4A6E,#0EA5E9)', 'linear-gradient(180deg,#F0F9FF,#BAE6FD)', '#082F49'].map(c => `<i style="width:62px;height:40px;border-radius:6px;background:${c};box-shadow:0 0 0 1px #CBD5E1"></i>`).join('')}</div></div>
<div class="chip dark f" data-s="5" style="position:absolute;left:600px;top:230px;font-size:20px;padding:10px 20px">Toutes les diapos d\'un coup</div>`,
  n: `<p>Un <b>thème</b> est un ensemble cohérent qui s'applique à toutes les diapositives d'un coup.</p>
  <p><b>Étape 1 — Couleurs</b> : une palette de 12 couleurs (texte/arrière-plan, 6 accents, liens).</p>
  <p><b>Étape 2 — Polices</b> : une police pour les titres, une pour le corps.</p>
  <p><b>Étape 3 — Effets</b> : ombres, reflets, lueurs appliqués aux formes.</p>
  <p><b>Étape 4 — Styles d'arrière-plan</b> : couleurs unies ou dégradés assortis.</p>
  <p><b>Étape 5</b> : tout cela se change en un clic pour tout le deck. C'est ce qui permet de ne plus « bricoler ».</p>` },

/* 5 — APPLIQUER UN THÈME */
{ title: 'Appliquer un thème', html: `${H('Un clic, tout le deck change', 'Appliquer un thème', PATH('Création > Thèmes'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1060, h: 620, title: 'Salon Talents.pptx', tab: 'Création',
  groups: [['Thèmes', ['blanc', 'nuit', 'ocean', 'sunset', 'foret'].map(THBP02).concat(['▾'])], ['Variantes', ['▤', '▤', '▤', '▾ Autres']], ['Personnaliser', ['📐 Taille des diapositives', '🎨 Format de l\'arrière-plan']]],
  hot: { [THBP02('ocean')]: 1, '▾ Autres': 3 },
  body: `${EDP02('blanc', SLD({ inwin: true, w: 620, title: 'Infos pratiques', bullets: ['Date : 12 mars 2026', 'Lieu : siège de Néolia, Nantes', 'Entrée libre de 9 h à 17 h'] }))}
   <div class="f" data-s="2" style="position:absolute;inset:0;transition-duration:1s">${EDP02('ocean', SLD({ inwin: true, w: 620, theme: 'ocean', title: 'Infos pratiques', bullets: ['Date : 12 mars 2026', 'Lieu : siège de Néolia, Nantes', 'Entrée libre de 9 h à 17 h'] }))}</div>` })}
<div class="col" style="position:absolute;left:1170px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Survolez</b> : aperçu en direct', 1)}
 ${CARD('<b>2 · Cliquez</b> : <u>toutes</u> les diapos changent', 2)}
 ${CARD('<b>3 · Variantes</b> : déclinaisons du même thème', 3)}
 ${CARD('Clic droit sur un thème › <b>Appliquer aux diapositives sélectionnées</b>', 4, 'font-size:17px')}
</div>`,
  n: `<p><b>Étape 1</b> : <i>Création › Thèmes</i>. En survolant une vignette, l'aperçu s'applique en direct sur la diapo.</p>
  <p><b>Étape 2</b> : un clic applique le thème à <b>toutes</b> les diapositives : couleurs, polices, arrière-plans. Regardez les miniatures à gauche changer elles aussi.</p>
  <p><b>Étape 3</b> : le groupe <b>Variantes</b> propose des déclinaisons (autres couleurs, autre fond) du même thème.</p>
  <p><b>Étape 4</b> : clic droit sur un thème › <i>Appliquer aux diapositives sélectionnées</i> — à utiliser avec parcimonie, un deck = un thème.</p>
  <p>Démo : Création › Thèmes, survolez trois thèmes, puis appliquez-en un. C'est la tâche 1 du lab.</p>` },

/* 6 — VARIANTES */
{ title: 'Variantes et personnalisation', html: `${H('Décliner sans tout casser', 'Variantes', PATH('Création > Variantes > Autres'))}
<div class="p2-menu a pop" style="position:absolute;left:70px;top:190px;width:400px;--d:.2s">
 ${[['🎨', 'Couleurs', 1], ['🔤', 'Polices', 2], ['✨', 'Effets', 3], ['🖼', 'Styles d\'arrière-plan', 4]].map(([ic, t, s]) => `<div class="p2-mi" data-k="${s}"><span style="font-size:26px">${ic}</span><b>${t}</b><span style="margin-left:auto">▸</span></div>`).join('')}
</div>
<div style="position:absolute;left:530px;right:70px;top:180px;display:grid;grid-template-columns:1fr 1fr;gap:26px">
 ${[['ocean', 'Couleurs : Océan', 1], ['violet', 'Couleurs : Violet', 1], ['foret', 'Couleurs : Forêt', 1], ['sunset', 'Couleurs : Couchant', 1]].map(([t, l], i) => `<div class="f zoom" data-s="${i === 0 ? 1 : i + 1}" style="position:relative;height:290px">${SLD({ x: 0, y: 0, w: 470, theme: t, title: 'Au programme', bullets: ['Job dating', 'Ateliers CV', 'Visite des ateliers'] })}<span class="chip dark" style="position:absolute;right:10px;top:10px">${l}</span></div>`).join('')}
</div>
${TIP('Réglez <b>Couleurs</b> et <b>Polices</b> séparément : l\'agence vous impose sa palette ? Personnaliser les couleurs › créez la vôtre.', { s: 5, x: 70, y: 470, w: 400 })}`,
  steps: 5, step(n, el) { el.querySelectorAll('.p2-mi').forEach(m => m.classList.toggle('on', n >= 1 && n <= 4 && +m.dataset.k === Math.min(n, 1))); },
  n: `<p>La flèche <b>Autres</b> du groupe Variantes ouvre quatre sous-menus indépendants : <b>Couleurs</b>, <b>Polices</b>, <b>Effets</b>, <b>Styles d'arrière-plan</b>.</p>
  <p><b>Étapes 1 à 4</b> : la même diapo avec quatre jeux de couleurs. Le contenu ne bouge pas, seule l'identité change.</p>
  <p><b>Étape 5</b> : <i>Couleurs › Personnaliser les couleurs</i> permet de saisir la charte de l'entreprise (codes hexadécimaux) et de l'enregistrer sous un nom. Même chose pour les polices.</p>` },

/* 7 — COULEURS DU THÈME */
{ title: 'Couleurs du thème', html: `${H('Couleurs du thème ou couleurs figées ?', 'Le nuancier')}
<div class="card a pop" style="position:absolute;left:70px;top:180px;width:420px;padding:18px 22px;--d:.2s">
 <div style="font-size:17px;font-weight:800;color:#6B7A90;margin-bottom:8px">Couleurs du thème</div>
 <div class="p2-rel"><div class="p2-pal">${['#FFFFFF', '#000000', '#E7E6E6', '#44546A', '#C43E1C', '#ED7D31', '#A5A5A5', '#FFC000', '#5B9BD5', '#70AD47'].map(c => `<i style="background:${c}"></i>`).join('')}</div>${HOTP02(1)}</div>
 <div class="p2-pal" style="margin-top:4px">${Array.from({ length: 50 }, (_, i) => `<i style="background:${['#F2F2F2', '#7F7F7F', '#D0CECE', '#8496B0', '#F4B9A9', '#F8CBAD', '#DBDBDB', '#FFE699', '#BDD7EE', '#C5E0B4'][i % 10]};opacity:${1 - Math.floor(i / 10) * .12}"></i>`).join('')}</div>
 <div style="font-size:17px;font-weight:800;color:#6B7A90;margin:12px 0 8px">Couleurs standard</div>
 <div class="p2-rel"><div class="p2-pal">${['#C00000', '#FF0000', '#FFC000', '#FFFF00', '#92D050', '#00B050', '#00B0F0', '#0070C0', '#002060', '#7030A0'].map(c => `<i style="background:${c}"></i>`).join('')}</div>${HOTP02(2)}</div>
 <div style="font-size:17px;margin-top:12px">🎨 Autres couleurs…</div>
</div>
<div class="p2-dm card a pop" data-th="a" style="position:absolute;left:540px;top:180px;width:620px;height:400px;background:var(--bg);--d:.3s">
 <div class="sh th" style="left:40px;top:70px;width:250px;height:150px">Accent 1</div>
 <div class="sh" style="left:330px;top:70px;width:250px;height:150px;background:#FF0000">Rouge standard</div>
 <div style="position:absolute;left:40px;top:250px;width:250px;text-align:center;font-size:19px;font-weight:700;color:#16A34A" class="f" data-s="3">✔ suit le thème</div>
 <div style="position:absolute;left:330px;top:250px;width:250px;text-align:center;font-size:19px;font-weight:700;color:#DC2626" class="f" data-s="3">✘ reste figé</div>
 <div class="chip dark f" data-s="3" style="position:absolute;left:40px;bottom:30px;font-size:18px">Nouveau thème appliqué ↻</div>
</div>
${TIP('<b>Autres couleurs…</b> = une valeur figée (ex. #FF0000) : à réserver aux exceptions validées par la charte.', { s: 3, kind: 'warn', x: 70, y: 630, w: 1090 })}
<div class="col" style="position:absolute;left:1200px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Ligne du haut</b> = couleurs du thème + nuances', 1)}
 ${CARD('<b>2 · Couleurs standard</b> = figées', 2)}
 ${CARD('<b>3 · Changement de charte</b> : seules les couleurs du thème suivent', 3)}
</div>`,
  steps: 3, step(n, el) { el.querySelector('.p2-dm').dataset.th = n >= 3 ? 'b' : 'a'; },
  n: `<p>Le nuancier (Couleur de police, Remplissage, Contour…) a toujours la même structure.</p>
  <p><b>Étape 1</b> : la zone <b>Couleurs du thème</b> : la première ligne et ses nuances (plus clair / plus foncé). Ce sont des <b>références</b> (« Accent 1 »), pas des couleurs fixes.</p>
  <p><b>Étape 2</b> : <b>Couleurs standard</b> et <b>Autres couleurs</b> : des valeurs figées.</p>
  <p><b>Étape 3</b> : démo — on change de thème. La forme « Accent 1 » passe du rouge au bleu canard ; la forme en rouge standard reste rouge et jure avec le nouveau thème.</p>
  <p>Bonne pratique : choisissez le thème <b>tôt</b> et prenez toutes vos couleurs dans la ligne du thème.</p>` },

/* 8 — À FAIRE / À ÉVITER */
{ title: 'Le thème, tôt', html: `${H('Choisissez le thème en premier', 'À faire / à éviter')}
${VS({ l: { t: 'Thème choisi à la fin', c: '#DC2626', ic: '✘', html: `<div style="display:flex;gap:10px;margin-bottom:16px">${['blanc', 'blanc', 'blanc'].map((t, i) => `<div style="flex:1;border-radius:6px;overflow:hidden;box-shadow:0 0 0 1px #E3E8EF">${MINIP02({ th: ['blanc', 'sunset', 'nuit'][i], w: 196, lay: ['title', 'content', 'cta'][i] })}</div>`).join('')}</div>
   <ul class="lst sm"><li>Couleurs « Autres couleurs » partout</li><li>Polices tapées à la main</li><li>Tout est à reprendre diapo par diapo</li></ul>` },
  r: { t: 'Thème choisi au départ', c: '#16A34A', ic: '✔', html: `<div style="display:flex;gap:10px;margin-bottom:16px">${['title', 'content', 'cta'].map(l => `<div style="flex:1;border-radius:6px;overflow:hidden;box-shadow:0 0 0 1px #E3E8EF">${MINIP02({ th: 'ocean', w: 196, lay: l })}</div>`).join('')}</div>
   <ul class="lst sm"><li>Couleurs prises dans la ligne du thème</li><li>Polices titre / corps du thème</li><li>Nouvelle charte ? Un clic.</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : construire tout le deck en noir sur blanc puis « habiller » à la fin, ou piocher dans « Autres couleurs ». Chaque diapo a ses couleurs, rien n'est homogène.</p>
  <p><b>Étape 2 — à faire</b> : thème choisi au départ, couleurs du thème, polices du thème. Le jour où la charte change, un clic suffit.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP02, 1), n: `<p>Deuxième partie : la mise en forme du texte, avec mesure.</p>` },

/* 10 — POLICE ET PARAGRAPHE */
{ title: 'Police et Paragraphe', html: `${H('Les groupes Police et Paragraphe', 'Mettre en forme le texte', PATH('Accueil > Police'))}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 940, h: 600, title: 'Salon Talents.pptx', tab: 'Accueil',
  groups: [['Police', ['Aptos ▾', '28 ▾', 'A⁺', 'A⁻', 'G', 'I', 'S', 'A▾']], ['Paragraphe', ['•≡', '1≡', '⬅', '☰', '➡', '↕']]], hot: { 'G': 1, 'I': 2, 'A▾': 3, '☰': 4 },
  body: `<div style="position:absolute;inset:0;display:grid;place-items:center"><div class="sd" style="position:relative;width:640px;height:360px;background:#0C4A6E;color:#F0F9FF;--sac:#5EEAD4">
    <div class="sd-tt" style="font-size:30px;text-align:center">Infos pratiques</div>
    <ul class="sd-ul" style="font-size:22px"><li><span style="font-weight:400" class="p2-b">Date : 12 mars 2026</span></li><li>Lieu : siège de Néolia, <i class="p2-i">Nantes</i></li><li>Entrée <span class="p2-c">libre</span> de 9 h à 17 h</li></ul></div></div>` })}
<div class="col" style="position:absolute;left:1050px;right:70px;top:180px;gap:14px">
 ${[['Ctrl+G', 'Gras'], ['Ctrl+I', 'Italique'], ['Ctrl+U', 'Souligné'], ['Ctrl+E', 'Centrer'], ['Ctrl+Maj+>', 'Agrandir la police']].map(([k, d], i) => `<div class="card p2-k f right" data-s="${[1, 2, 2, 4, 5][i]}">${KEYS(k)}<span class="d">${d}</span></div>`).join('')}
</div>`,
  steps: 5, step(n, el) { const q = c => el.querySelector(c); q('.p2-b').style.fontWeight = n >= 1 ? 800 : 400; q('.p2-i').style.fontStyle = n >= 2 ? 'italic' : 'normal'; q('.p2-c').style.color = n >= 3 ? '#5EEAD4' : 'inherit'; q('.p2-c').style.fontWeight = n >= 3 ? 800 : 400; q('.sd-ul').style.textAlign = 'left'; },
  n: `<p>Le groupe <i>Accueil › Police</i> : police, taille, agrandir/réduire (A⁺ A⁻), gras, italique, souligné, couleur. Le groupe <i>Paragraphe</i> : puces, numéros, retraits, alignement, interligne, colonnes.</p>
  <p><b>Étape 1</b> : la date passe en <b>gras</b> (Ctrl+G) — c'est la tâche 2 du lab.</p>
  <p><b>Étape 2</b> : italique (Ctrl+I) pour une nuance ; souligné (Ctrl+U) à éviter (voir plus loin).</p>
  <p><b>Étape 3</b> : couleur de police — prise dans la <b>ligne du thème</b>.</p>
  <p><b>Étape 4</b> : centrer : Ctrl+E (gauche Ctrl+L, droite Ctrl+R, justifier Ctrl+J).</p>
  <p><b>Étape 5</b> : Ctrl+Maj+&gt; / &lt; agrandit / réduit la taille par paliers.</p>` },

/* 11 — TAILLES REPÈRES */
{ title: 'Tailles repères', html: `${H('Lisible du fond de la salle', 'Tailles repères en projection')}
<div class="card a pop" style="position:absolute;left:70px;top:180px;width:960px;padding:16px 34px;--d:.2s">
 <div class="p2-sz f left" data-s="1"><b>40 pt</b><span style="font-size:52px;font-weight:800">Titre de diapo</span></div>
 <div class="p2-sz f left" data-s="2"><b>24 pt</b><span style="font-size:32px">Texte courant, puces</span></div>
 <div class="p2-sz f left" data-s="3"><b>18 pt</b><span style="font-size:24px">Minimum absolu : sources, légendes</span></div>
 <div class="p2-sz f left" data-s="4" style="border:0"><b style="color:#DC2626">12 pt</b><span style="font-size:15px;color:#6B7A90;text-decoration:line-through">Personne ne lira cette ligne depuis le fond de la salle de réunion</span><span class="chip bad" style="margin-left:auto">✘</span></div>
</div>
<svg viewBox="0 0 440 480" class="a fade" style="position:absolute;left:1080px;top:180px;width:440px;height:480px;--d:.4s">
 <rect x="40" y="20" width="360" height="200" rx="8" fill="#0E1726"/><rect x="56" y="36" width="328" height="168" fill="#fff"/><text x="220" y="110" text-anchor="middle" font-size="34" font-weight="800" fill="#0E1726">Titre 40</text><text x="220" y="150" text-anchor="middle" font-size="20" fill="#33445E">corps 24</text>
 ${[0, 1, 2, 3].map(i => `<g class="f" data-s="${i + 1}"><circle cx="${110 + i * 75}" cy="${300 + i * 40}" r="18" fill="${i === 3 ? '#DC2626' : '#16A34A'}"/><path d="M${110 + i * 75 - 22} ${340 + i * 40} q22 -26 44 0" fill="${i === 3 ? '#DC2626' : '#16A34A'}"/></g>`).join('')}
</svg>
${TIP('Deux polices maximum : celles du thème (titre + corps).', { s: 5, kind: 'ok', x: 70, y: 690, w: 960 })}`,
  n: `<p>Repères pour la projection en salle :</p>
  <p><b>Étape 1</b> : titres 32 à 44 pt.</p><p><b>Étape 2</b> : corps 20 à 28 pt.</p>
  <p><b>Étape 3</b> : jamais moins de 18 pt, même pour une source.</p>
  <p><b>Étape 4</b> : 12 pt = illisible pour le dernier rang. Si ça ne tient pas, il y a trop de texte : retour à la règle des 6 puces du module 01.</p>
  <p><b>Étape 5</b> : deux polices maximum, celles du thème. Test pratique : reculez de 3 mètres de votre écran d'ordinateur ; si vous ne lisez plus, c'est trop petit.</p>` },

/* 12 — LE GRAS AVEC MESURE */
{ title: 'Le gras avec mesure', html: `${H('Le gras fait ressortir… s\'il est rare', 'Mettre en valeur')}
${VS({ l: { t: 'Tout en gras, souligné', c: '#DC2626', ic: '✘', html: `<div class="sd" style="position:relative;width:100%;height:270px;background:#fff;color:#0E1726;margin-bottom:14px;box-shadow:0 0 0 1px #E3E8EF"><div style="padding:22px 26px;font-size:21px;line-height:1.6;font-weight:800"><u>Le Salon Talents</u> revient <u>le 12 mars</u> au <span style="color:#FF0000">siège de Néolia</span> : <u>job dating</u>, <span style="color:#7030A0">ateliers CV</span>, <u>visites</u> et <span style="color:#00B050">rencontres</span> !</div></div>
   <ul class="lst sm"><li>Plus rien ne ressort</li><li>Souligné = « lien cliquable ? »</li></ul>` },
  r: { t: '1-2 mots clés, couleur d\'accent', c: '#16A34A', ic: '✔', html: `<div class="sd" style="position:relative;width:100%;height:270px;background:#0C4A6E;color:#F0F9FF;margin-bottom:14px"><div style="padding:22px 26px;font-size:21px;line-height:1.6">Le Salon Talents revient le <b style="color:#5EEAD4">12 mars</b> au siège de Néolia : job dating, ateliers CV et visites des ateliers.</div></div>
   <ul class="lst sm"><li>L\'œil va droit à la date</li><li>Couleur prise dans le thème</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : gras partout, souligné, trois couleurs « standard ». Quand tout est mis en valeur, plus rien ne l'est. Et à l'écran, un texte souligné évoque un <b>lien hypertexte</b>.</p>
  <p><b>Étape 2 — à faire</b> : un ou deux mots clés en <b>gras</b> et/ou dans la <b>couleur d'accent du thème</b>. Le regard va droit à l'information.</p>` },

/* 13 — EFFACER LA MISE EN FORME */
{ title: 'Effacer la mise en forme', html: `${H('Retour au thème : Ctrl+Espace', 'Effacer la mise en forme manuelle')}
<div class="card a pop p2-mix" data-st="0" style="position:absolute;left:70px;top:190px;width:900px;height:300px;padding:40px 46px;--d:.2s;font-size:30px;line-height:1.7">
 <span style="font-family:'Comic Sans MS',cursive;color:#7030A0">Inscrivez-vous</span> <span style="font-family:'Times New Roman',serif;font-style:italic;color:#00B050;font-size:36px">dès maintenant</span> <span style="font-family:'Courier New',monospace;color:#FF0000;text-decoration:underline">sur talents.neolia.fr</span> <span style="font-family:Impact,Arial Black;color:#0070C0;font-size:34px">avant le 1er mars</span>
 <div class="chip f" data-s="1" style="position:absolute;right:20px;bottom:18px;font-size:18px">police et couleurs du thème ✔</div>
</div>
<div class="card p2-k a r" style="position:absolute;left:1010px;right:70px;top:190px;--d:.4s">${KEYS('Ctrl+Espace')}<div><span class="d">Effacer la mise en forme</span><small>des caractères sélectionnés</small></div></div>
<div class="card p2-k f right" data-s="2" style="position:absolute;left:1010px;right:70px;top:320px"><span style="font-size:36px">A̶</span><div><span class="d">Accueil › Police</span><small>bouton « Effacer toute la mise en forme »</small></div></div>
${TIP('Le <b>souligné</b> évoque un lien hypertexte : préférez le gras ou la couleur d\'accent.', { s: 3, kind: 'warn', x: 70, y: 540, w: 900 })}
${TIP('Texte collé d\'un autre fichier ? Collage spécial › <b>Conserver uniquement le texte</b> (Ctrl+Maj+V… ou l\'icône « A » du bouton Coller).', { s: 4, kind: 'tip', x: 70, y: 660, w: 1460 })}`,
  steps: 4, step(n, el) { el.querySelector('.p2-mix').dataset.st = n >= 1 ? 1 : 0; },
  n: `<p>Un texte récupéré d'un mail ou d'un autre deck arrive avec ses polices et couleurs.</p>
  <p><b>Étape 1</b> : sélection puis <b>Ctrl+Espace</b> : la mise en forme manuelle des caractères disparaît, le texte reprend la police et la couleur du thème.</p>
  <p><b>Étape 2</b> : même effet avec le bouton <i>Effacer toute la mise en forme</i> du groupe Police.</p>
  <p><b>Étape 3</b> : le souligné à l'écran = lien. Évitez-le pour mettre en valeur.</p>
  <p><b>Étape 4</b> : prévention : au collage, choisissez l'option <b>Conserver uniquement le texte</b> (icône A du bouton Options de collage).</p>` },

/* 14 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP02, 2), n: `<p>Troisième partie : formes, icônes, puis les outils d'alignement — ce qui distingue un deck amateur d'un deck pro.</p>` },

/* 15 — INSÉRER UNE FORME */
{ title: 'Insérer une forme', html: `${H('Des formes plutôt que des cliparts', 'Formes', PATH('Insertion > Illustrations > Formes'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1010, h: 620, title: 'Salon Talents.pptx', tab: 'Insertion',
  groups: [['Diapositives', ['📄 Nouvelle diapositive']], ['Tableaux', ['▦ Tableau']], ['Images', ['🖼 Images']], ['Illustrations', ['⬠ Formes', '★ Icônes', '◫ SmartArt', '📊 Graphique']], ['Texte', ['🅰 Zone de texte']]], hot: { '⬠ Formes': 1 },
  body: `<div style="position:absolute;inset:0;display:grid;place-items:center">${SLD({ inwin: true, w: 700, theme: 'ocean', title: 'Infos pratiques', bullets: ['Date : 12 mars 2026', 'Lieu : siège de Néolia, Nantes'],
     art: `<svg viewBox="0 0 700 394" style="position:absolute;inset:0"><g class="f" data-s="3"><rect x="220" y="270" width="260" height="70" rx="35" fill="#5EEAD4" stroke="#F0F9FF" stroke-width="3" pathLength="1" class="draw"/></g>
       <g class="f" data-s="4"><text x="350" y="314" text-anchor="middle" font-size="26" font-weight="800" fill="#0C4A6E" font-family="Segoe UI,Arial">Inscrivez-vous</text></g></svg>` })}</div>
   <div class="f zoom" data-s="2" style="position:absolute;left:330px;top:0;width:330px;background:#fff;box-shadow:var(--sh);border-radius:0 0 10px 10px;padding:10px 14px;font-size:13px;color:#6B7A90">
    <b style="color:#1B2A41">Rectangles</b><div style="display:flex;gap:10px;margin:6px 0 10px;font-size:26px;color:#33445E"><span>▭</span><span class="p2-rel" style="padding:0 4px">▢${HOTP02(2)}</span><span>⬭</span></div>
    <b style="color:#1B2A41">Formes de base</b><div style="display:flex;gap:10px;margin-top:6px;font-size:26px;color:#33445E"><span>◯</span><span>△</span><span>◇</span><span>⬠</span><span>⬡</span></div>
    <b style="color:#1B2A41">Flèches pleines</b><div style="display:flex;gap:10px;margin-top:6px;font-size:26px;color:#33445E"><span>➜</span><span>⬅</span><span>⬆</span><span>⇨</span></div></div>` })}
<div class="col" style="position:absolute;left:1120px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 · Formes</b> : la galerie s\'ouvre', 1)}
 ${CARD('<b>2 · Rectangle arrondi</b> : cliquez-glissez', 2)}
 ${CARD('<b>3 · Tapez</b> : la forme accepte du texte', 4)}
 ${CARD('⌨️ <b>Maj</b> en traçant = cercle, carré, trait parfaits', 5)}
 ${CARD('🅰 <b>Zone de texte</b> : pour une légende, pas pour un titre', 6)}
</div>`,
  n: `<p><b>Étape 1</b> : <i>Insertion › Formes</i> ouvre la galerie (rectangles, formes de base, flèches, organigrammes, bulles…).</p>
  <p><b>Étape 2</b> : on choisit le <b>rectangle à coins arrondis</b>, idéal pour un bouton d'appel à l'action.</p>
  <p><b>Étape 3</b> : on clique-glisse sur la diapo pour tracer.</p>
  <p><b>Étape 4</b> : forme sélectionnée, on tape directement le texte « Inscrivez-vous » (tâche 3 du lab).</p>
  <p><b>Étape 5</b> : <b>Maj</b> maintenue pendant le tracé : cercle parfait, carré parfait, trait horizontal/vertical.</p>
  <p><b>Étape 6</b> : la zone de texte (<i>Insertion › Zone de texte</i>) sert aux légendes et annotations, pas à remplacer les espaces réservés.</p>` },

/* 16 — FORMAT DE FORME */
{ title: 'Format de forme', html: `${H('L\'onglet contextuel Format de forme', 'Mettre en forme la forme')}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1010, h: 610, title: 'Salon Talents.pptx', tab: 'Format de forme', tabs: ['Fichier', 'Accueil', 'Insertion', 'Création', 'Transitions', 'Animations', 'Diaporama', 'Format de forme'],
  groups: [['Styles de formes', ['▤', '▤', 'Remplissage ▾', '\u2003', 'Contour ▾', '\u2003', 'Effets ▾']], ['Organiser', ['⧉ Grouper', '⊞ Aligner']], ['Taille', ['↕ 2,5 cm', '↔ 8 cm']]], hot: { 'tab:Format de forme': 1, 'Remplissage ▾': 2, 'Contour ▾': 3, 'Effets ▾': 4, '↔ 8 cm': 5 },
  body: `<div style="position:absolute;inset:0;display:grid;place-items:center"><div class="sd" style="position:relative;width:700px;height:394px;background:#0C4A6E">
   <div class="p2-fs" style="left:180px;top:140px;width:220px;height:100px;border-radius:50px;background:#94A3B8;color:#0E1726">Inscrivez-vous</div></div></div>` })}
<div class="col" style="position:absolute;left:1120px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 ·</b> N\'apparaît que si une forme est <b>sélectionnée</b>', 1)}
 ${CARD('<b>2 · Remplissage</b> : couleur du thème', 2)}
 ${CARD('<b>3 · Contour</b> : couleur, épaisseur', 3)}
 ${CARD('<b>4 · Effets</b> : ombre, lumière… avec parcimonie', 4)}
 ${CARD('<b>5 · Taille</b> : dimensions exactes en cm', 5)}
</div>
${TIP('Forme réussie ? Clic droit › <b>Définir comme forme par défaut</b>.', { s: 6, kind: 'ok', x: 1120, y: 700, w: 410 })}`,
  steps: 6, step(n, el) { const f = el.querySelector('.p2-fs'); f.style.background = n >= 2 ? '#5EEAD4' : '#94A3B8'; f.style.border = n >= 3 ? '4px solid #F0F9FF' : '0 solid transparent'; f.style.boxShadow = n >= 4 ? '0 14px 30px -8px rgba(0,0,0,.6)' : 'none'; f.style.width = n >= 5 ? '320px' : '220px'; f.style.left = n >= 5 ? '190px' : '180px'; },
  n: `<p><b>Étape 1</b> : dès qu'une forme est sélectionnée, l'onglet contextuel <b>Format de forme</b> apparaît à droite du ruban.</p>
  <p><b>Étape 2</b> : <i>Remplissage de forme</i> : on prend une couleur du thème (ici l'accent turquoise).</p>
  <p><b>Étape 3</b> : <i>Contour de forme</i> : couleur, épaisseur, tirets — ou « Sans contour ».</p>
  <p><b>Étape 4</b> : <i>Effets sur la forme</i> : ombre, lumière, biseau… une ombre douce suffit.</p>
  <p><b>Étape 5</b> : groupe <i>Taille</i> : hauteur et largeur exactes, pour des boutons tous identiques.</p>
  <p><b>Étape 6</b> : clic droit › <i>Définir comme forme par défaut</i> : toutes les formes suivantes reprendront ce style.</p>` },

/* 17 — ICÔNES */
{ title: 'Les icônes', html: `${H('Des pictogrammes vectoriels recolorables', 'Icônes', PATH('Insertion > Illustrations > Icônes'))}
<div class="card a pop" style="position:absolute;left:70px;top:180px;width:760px;padding:20px 24px;--d:.2s">
 <div style="display:flex;gap:10px;font-size:16px;font-weight:700;color:#6B7A90;margin-bottom:12px"><span style="color:#C43E1C;border-bottom:3px solid #C43E1C">Icônes</span><span>Images</span><span>Personnages découpés</span><span>Autocollants</span></div>
 <div style="display:flex;align-items:center;gap:10px;height:46px;padding:0 16px;border-radius:8px;box-shadow:0 0 0 2px #CBD5E1;font-size:20px">🔍 <b class="tw f" data-s="1" style="--n:6;border-color:#C43E1C;font-weight:600">équipe</b></div>
 <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:12px;margin-top:16px">${Object.keys(ICOP02).map(k => `<div class="p2-ic ${k === 'team' ? 'pick' : ''}">${ICP02(k)}</div>`).join('')}</div>
 <div style="display:flex;justify-content:flex-end;margin-top:16px"><span class="chip dark f" data-s="2" style="font-size:18px">Insérer (1)</span></div>
</div>
${SLD({ x: 880, y: 180, w: 650, theme: 'ocean', title: 'Au programme', bullets: ['Job dating', 'Ateliers CV', 'Visite des ateliers'], s: 3,
   art: `<div class="p2-icx" style="position:absolute;right:50px;top:120px;width:170px;height:170px;transition:all .6s">${ICP02('team', '#F0F9FF').replace('<svg', '<svg style="width:100%;height:100%;stroke-width:1.6"')}</div>` })}
<div class="col" style="position:absolute;left:880px;right:70px;top:570px;gap:12px">
 ${CARD('<b>Format graphique › Remplissage</b> : recolorer dans l\'accent du thème', 4)}
 ${CARD('Vectorielles : nettes à <b>toutes les tailles</b>', 5)}
</div>`,
  steps: 5, step(n, el) { el.querySelectorAll('.p2-ic.pick').forEach(x => x.classList.toggle('sel', n >= 2)); const s = el.querySelector('.p2-icx svg'); if (s) s.style.stroke = n >= 4 ? '#5EEAD4' : '#F0F9FF'; },
  n: `<p><b>Étape 1</b> : <i>Insertion › Icônes</i> ouvre la bibliothèque Microsoft 365 ; on cherche par mot clé (« équipe », « calendrier », « diplôme »).</p>
  <p><b>Étape 2</b> : on coche une ou plusieurs icônes puis <b>Insérer</b>.</p>
  <p><b>Étape 3</b> : l'icône se place sur la diapo (tâche 5 du lab : illustrer « Au programme »).</p>
  <p><b>Étape 4</b> : onglet <i>Format graphique › Remplissage graphique</i> : on la recolore dans l'accent du thème.</p>
  <p><b>Étape 5</b> : ce sont des images vectorielles (SVG) : nettes même agrandies. On peut même les convertir en forme pour modifier chaque partie.</p>` },

/* 18 — ALIGNER ET DISTRIBUER */
{ title: 'Aligner et distribuer', html: `${H('Aligner, distribuer : jamais à l\'œil', 'Organiser', PATH('Format de forme > Organiser > Aligner'))}
<div class="p2-al a pop" data-st="0" style="position:absolute;left:70px;top:190px;--d:.2s">
 ${['Job dating', 'Ateliers CV', 'Visites', 'Inscription'].map((t, i) => `<div class="sh">${t}</div>`).join('')}
 <div class="gd gh" style="left:0;right:0;top:242px;border-top-width:2px"></div>
 ${[0, 1, 2].map(i => `<div class="gd gv" style="top:220px;height:44px;left:${190 + i * 200}px;width:50px;border-top-width:2px;border-left-width:0"><span style="position:absolute;top:-30px;left:2px;font:800 15px var(--font);color:#DC2626">↔ 50</span></div>`).join('')}
 <div class="gd gc" style="top:0;bottom:0;left:430px;border-left-width:2px"></div>
</div>
<div class="p2-menu a pop" style="position:absolute;left:980px;right:70px;top:190px;--d:.3s">
 ${[['⫷', 'Aligner à gauche'], ['⫼', 'Centrer', 3], ['⫸', 'Aligner à droite'], ['⊤', 'Aligner en haut'], ['⊟', 'Aligner au milieu', 1], ['⊥', 'Aligner en bas'], ['hr'], ['⇹', 'Distribuer horizontalement', 2], ['⇳', 'Distribuer verticalement'], ['hr'], ['☐', 'Aligner sur la diapositive', 3], ['☑', 'Aligner les objets sélectionnés', 1]].map(([ic, t, k]) => ic === 'hr' ? '<hr>' : `<div class="p2-am" data-k="${k || 0}"><span style="width:26px;text-align:center">${ic}</span>${t}</div>`).join('')}
</div>`,
  steps: 3, step(n, el) {
    const P = [[[30, 50], [250, 170], [460, 40], [660, 230]], [[30, 197], [250, 197], [460, 197], [660, 197]], [[40, 197], [240, 197], [440, 197], [640, 197]], [[55, 197], [255, 197], [455, 197], [655, 197]]][n] || [];
    el.querySelectorAll('.p2-al .sh').forEach((s, i) => { s.style.left = P[i][0] + 'px'; s.style.top = P[i][1] + 'px'; });
    el.querySelector('.p2-al').dataset.st = n; el.querySelectorAll('.p2-am').forEach(m => m.classList.toggle('on', n > 0 && +m.dataset.k === n));
  },
  n: `<p>Démo animée : quatre formes posées « à peu près ».</p>
  <p><b>Étape 1 — Aligner au milieu</b> (avec « Aligner les objets sélectionnés ») : toutes les formes prennent la même ligne médiane. Le trait rouge le montre.</p>
  <p><b>Étape 2 — Distribuer horizontalement</b> : PowerPoint calcule des écarts identiques entre les formes (ici 50 px).</p>
  <p><b>Étape 3 — Aligner sur la diapositive › Centrer</b> : l'ensemble est centré sur la diapo (les quatre formes doivent être groupées, ou on aligne une forme seule).</p>
  <p>Où trouver la commande : <i>Format de forme › Organiser › Aligner</i>, ou <i>Accueil › Dessin › Organiser › Aligner</i>. Sélection multiple : Maj+clic ou cadre de sélection.</p>` },

/* 19 — REPÈRES ACTIFS */
{ title: 'Repères actifs et grille', html: `${H('Les repères vous guident', 'Repères actifs, grille, repères')}
<div class="p2-al a pop" style="position:absolute;left:70px;top:190px;--d:.2s">
 <div class="gd p2-gx" style="left:0;right:0;top:242px;border-top-width:2px"></div><div class="gd p2-gx" style="top:0;bottom:0;left:430px;border-left-width:2px"></div>
 <div class="sh p2-gl" style="width:200px;background:linear-gradient(135deg,#C43E1C,#FF8F6B)">Inscrivez-vous</div>
 <div class="p2-gx" style="position:absolute;left:440px;top:20px;font:800 16px var(--font);color:#DC2626">centre de la diapo</div>
</div>
<div class="col" style="position:absolute;left:980px;right:70px;top:190px;gap:14px">
 <div class="card p2-k f right" data-s="1"><span style="font-size:34px;color:#DC2626">┆</span><div><span class="d">Repères actifs</span><small>pointillés rouges : centres, bords, écarts égaux</small></div></div>
 <div class="card p2-k f right" data-s="2">${KEYS('Maj+F9')}<div><span class="d">Grille</span><small>afficher / masquer</small></div></div>
 <div class="card p2-k f right" data-s="3">${KEYS('Alt+F9')}<div><span class="d">Repères</span><small>lignes de guidage déplaçables</small></div></div>
 <div class="card p2-k f right" data-s="4">${KEYS('Maj+→')}<div><span class="d">Déplacer à l\'horizontale</span><small>Maj + glisser = trajectoire droite</small></div></div>
</div>`,
  n: `<p>Démo en boucle : on déplace le bouton « Inscrivez-vous » ; en passant au centre de la diapo, des <b>repères actifs</b> rouges apparaissent : le bouton est centré.</p>
  <p><b>Étape 1</b> : les repères actifs signalent les centres, les bords alignés et même les écarts identiques entre objets.</p>
  <p><b>Étape 2</b> : <b>Maj+F9</b> affiche la grille. <b>Étape 3</b> : <b>Alt+F9</b> affiche les repères (que l'on peut déplacer, et ajouter au masque).</p>
  <p><b>Étape 4</b> : maintenir <b>Maj</b> en glissant contraint le déplacement à l'horizontale ou la verticale ; les flèches du clavier déplacent finement (Ctrl+flèche encore plus finement).</p>
  <p>Lien avec le lab : tâche 4, descendre le bouton dans la moitié basse puis le centrer horizontalement.</p>` },

/* 20 — LE PIÈGE DE L'ALIGNEMENT */
{ title: 'Sur la diapo ou entre objets ?', html: `${H('Le piège : sur la diapo ou entre objets ?', 'Aligner au centre')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:1fr 1fr;gap:40px">
 ${[['☑ Aligner les objets sélectionnés', 'Centrés <b>entre eux</b>', 1, 140], ['☐ Aligner sur la diapositive', 'Centrés <b>sur la diapo</b>', 2, 290]].map(([t, d, s, x]) => `
 <div class="card f zoom" data-s="${s}" style="padding:22px 26px"><div class="chip dark" style="font-size:18px">${t}</div>
  <svg viewBox="0 0 600 300" style="width:100%;height:280px;margin-top:14px"><rect x="10" y="10" width="580" height="280" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
   <path d="M300 10 V290" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 6"/>
   <path d="M${x + 60} 30 V270" stroke="#DC2626" stroke-width="3" stroke-dasharray="8 6"/>
   <rect x="${x}" y="50" width="120" height="60" rx="12" fill="#0C7C8C"/><rect x="${x - 20}" y="130" width="160" height="60" rx="12" fill="#14B8A6"/><rect x="${x + 20}" y="210" width="80" height="50" rx="12" fill="#5EEAD4"/></svg>
  <div style="font-size:23px;margin-top:6px">${d}</div></div>`).join('')}
</div>
${TIP('Vérifiez l\'option cochée <b>en bas du menu Aligner</b> avant de cliquer.', { s: 3, kind: 'warn', x: 70, y: 700, w: 1000 })}`,
  n: `<p>Même commande « Centrer », deux résultats :</p>
  <p><b>Étape 1</b> : avec <b>Aligner les objets sélectionnés</b> coché (par défaut dès qu'on a plusieurs objets), les formes s'alignent <b>entre elles</b>, sur l'axe médian de la sélection — qui peut être à gauche de la diapo.</p>
  <p><b>Étape 2</b> : avec <b>Aligner sur la diapositive</b>, l'axe est celui de la diapo.</p>
  <p><b>Étape 3</b> : l'option se coche tout en bas du menu Aligner. Pour une forme seule, PowerPoint aligne automatiquement sur la diapo.</p>` },

/* 21 — REPRODUIRE LA MISE EN FORME */
{ title: 'Reproduire la mise en forme', html: `${H('Le pinceau : copier un style', 'Reproduire la mise en forme', PATH('Accueil > Presse-papiers > Reproduire la mise en forme'))}
<div class="p2-pn card a pop" style="position:absolute;left:70px;top:190px;width:900px;height:470px;--d:.2s">
 <div class="tg src" style="left:40px;top:60px">Job dating</div>
 <div class="tg" style="left:330px;top:60px">Ateliers CV</div><div class="tg" style="left:620px;top:60px">Visites</div><div class="tg" style="left:330px;top:250px">Conférences</div>
 <div class="br" style="left:200px;top:110px">🖌️</div>
 <div style="position:absolute;left:40px;top:180px;font-size:17px;color:#6B7A90;width:190px;text-align:center">modèle</div>
</div>
<div class="col" style="position:absolute;left:1010px;right:70px;top:190px;gap:14px">
 <div class="card p2-k f right" data-s="1"><span style="font-size:34px">🖌️</span><div><span class="d">Clic simple</span><small>une seule application</small></div></div>
 <div class="card p2-k f right" data-s="2"><span style="font-size:34px">🖌️🖌️</span><div><span class="d">Double-clic</span><small>mode verrouillé… jusqu\'à Échap</small></div></div>
 <div class="card p2-k f right" data-s="4">${KEYS('Ctrl+Maj+C')}<span class="d">Copier la mise en forme</span></div>
 <div class="card p2-k f right" data-s="4">${KEYS('Ctrl+Maj+V')}<span class="d">Coller la mise en forme</span></div>
</div>`,
  steps: 4, step(n, el) { const T = el.querySelectorAll('.p2-pn .tg:not(.src)'), b = el.querySelector('.p2-pn .br'); const pos = [[200, 110], [490, 110], [780, 110], [490, 300], [490, 300]][n];
    b.style.left = pos[0] + 'px'; b.style.top = pos[1] + 'px'; T.forEach((t, i) => t.classList.toggle('on2', n >= i + 1)); },
  n: `<p>On a mis en forme le bouton « Job dating » ; on veut le même style sur les trois autres.</p>
  <p><b>Étape 1</b> : on sélectionne le modèle, <b>clic</b> sur le pinceau <i>Reproduire la mise en forme</i>, puis clic sur la cible : remplissage, contour, police, effets sont copiés. Une seule application.</p>
  <p><b>Étapes 2-3</b> : <b>double-clic</b> sur le pinceau : il reste actif, on applique sur autant d'objets que voulu, puis <b>Échap</b> pour sortir.</p>
  <p><b>Étape 4</b> : au clavier : <b>Ctrl+Maj+C</b> sur le modèle, puis <b>Ctrl+Maj+V</b> sur chaque cible. Fonctionne aussi pour du texte.</p>` },

/* 22 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Une allure pro, sans bricolage', k: 'Récap animé', hub: '5', hsub: 'outils', hk: 'MISE EN FORME',
  items: [{ ic: '🎨', t: 'Thème d\'abord', d: 'Création › Thèmes, puis Variantes' }, { ic: '🟧', t: 'Couleurs du thème', d: 'La ligne du haut du nuancier : elles suivent' },
    { ic: '🅰', t: 'Texte sobre', d: '≥ 18 pt, 2 polices, gras rare, pas de souligné' }, { ic: '⬠', t: 'Formes et icônes', d: 'Insertion, Maj pour tracer parfait' }, { ic: '⊞', t: 'Aligner, distribuer, reproduire', d: 'Jamais à l\'œil : outils et pinceau' }] }),
  n: `<p>Récap : demandez au groupe quelle différence entre « couleurs du thème » et « couleurs standard », et comment centrer une forme sur la diapo.</p>` },

/* 23 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Huit raccourcis de mise en forme', 'Raccourcis')}
${KEYCARDS([{ k: 'Ctrl+G', d: 'Gras' }, { k: 'Ctrl+I', d: 'Italique' }, { k: 'Ctrl+E', d: 'Centrer le paragraphe' }, { k: 'Ctrl+Espace', d: 'Effacer la mise en forme des caractères' }, { k: 'Ctrl+Maj+C', d: 'Copier la mise en forme' }, { k: 'Ctrl+Maj+V', d: 'Coller la mise en forme' }, { k: 'Maj+F9', d: 'Afficher / masquer la grille' }, { k: 'Alt+F9', d: 'Afficher / masquer les repères' }], { cols: 4, y: 200 })}
${TIP('En français : <b>Ctrl+G</b> = Gras (et non Ctrl+B), <b>Ctrl+U</b> = Souligné.', { s: 9, kind: 'key', x: 70, y: 600, w: 900 })}`,
  n: `<p>Les huit raccourcis du module. Sur Mac : ⌘+B pour le gras, ⌘+Maj+C / ⌘+Maj+V pour copier/coller la mise en forme.</p>` },

/* 24 — LAB */
{ title: 'Lab', html: LAB({ app: 'ppt', mod: 'p02', lab: 0, title: 'Lab — Le flyer du Salon Talents RH', tasks: ['Appliquer un <b>thème</b> autre que « blanc » à tout le deck', '« Infos pratiques » : la date (12 mars) en <b>gras</b>', 'Ajouter une <b>forme</b> contenant <b>Inscrivez-vous</b>', 'La descendre dans la <b>moitié basse</b> et la <b>centrer</b> horizontalement', 'Illustrer « Au programme » avec une <b>icône</b>'] }),
  n: `<p>Scénario : le service RH de Néolia (900 salariés) annonce le Salon Talents 2026 sur les écrans d'accueil ; le deck est fade et mal aligné.</p>
  <p>Solution : Création › Thèmes (ex. Océan) ; diapo 2, sélectionner « Date : 12 mars 2026 » › Ctrl+G ; Insertion › Formes › rectangle arrondi, taper « Inscrivez-vous sur talents.neolia.fr » ; glisser vers le bas puis Aligner sur la diapositive › Centrer ; diapo 3 : Insertion › Icônes (🤝 ou 🎓).</p>
  <p>Vigilance : tâche 4, vérifier « Aligner sur la diapositive ».</p>` },

/* 25 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Que contient un thème PowerPoint ?', o: ['Uniquement une image de fond', 'Couleurs, polices, effets et styles d\'arrière-plan', 'Les animations et transitions', 'Le texte des diapositives'], a: [1], e: 'Le thème définit l\'identité visuelle : palette, polices titre/corps, effets et arrière-plans.' },
  { q: 'Pourquoi choisir ses couleurs dans la ligne « Couleurs du thème » ?', o: ['Elles sont plus vives', 'Elles suivent automatiquement si on change de thème ou de variante', 'Elles s\'impriment mieux', 'Elles sont obligatoires'], a: [1], e: 'Les couleurs du thème sont des références : elles se mettent à jour avec la charte. Les couleurs standard sont figées.' },
  { q: 'Quel est le raccourci du gras dans PowerPoint en français ?', o: ['Ctrl+B', 'Ctrl+G', 'Ctrl+Maj+G', 'Alt+G'], a: [1], e: 'Dans Office en français, Ctrl+G = Gras, Ctrl+I = Italique, Ctrl+U = Souligné.' },
  { q: 'Comment espacer régulièrement 4 formes alignées horizontalement ?', o: ['À l\'œil avec les flèches', 'Format de forme › Aligner › Distribuer horizontalement', 'Les grouper', 'Les mettre dans un tableau'], a: [1], e: 'Distribuer horizontalement calcule des écarts identiques entre les objets sélectionnés.' },
  { q: 'Comment appliquer la même mise en forme à plusieurs objets d\'affilée avec le pinceau ?', o: ['Clic simple sur le pinceau', 'Double-clic sur Reproduire la mise en forme, puis Échap pour arrêter', 'Clic droit › Coller', 'Ctrl+Maj+F'], a: [1], e: 'Le double-clic verrouille l\'outil : on peut l\'appliquer autant de fois que nécessaire, Échap pour sortir.' },
  { q: 'Que fait Ctrl+Espace sur un texte sélectionné ?', o: ['Insère un espace insécable', 'Efface la mise en forme manuelle des caractères', 'Centre le texte', 'Ouvre la zone Rechercher'], a: [1], e: 'Ctrl+Espace supprime la mise en forme manuelle : le texte reprend la police et la couleur du thème.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b · 5) b · 6) b.</p>` },

/* 26 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P02', html: END(), n: `<p>Fin du module 02. Prochain module : <b>structurer un message</b> — storytelling, une idée par diapo, sections.</p>` },
] };
