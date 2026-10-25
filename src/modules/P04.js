/* ===================== MODULE P04 — Animations et transitions maîtrisées ===================== */
const SECSP04 = ['Des transitions sobres', 'Les familles d\'animation', 'Ordre, minutage et déclencheurs'];

(function () {
  if (document.getElementById('cssP04')) return;
  const kf = (n, a, d) => `@keyframes ${n}{0%,${a}%{opacity:0;transform:scale(.4)}${a + d}%,92%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}`;
  const s = document.createElement('style'); s.id = 'cssP04';
  s.textContent = `
.p4-rel{position:relative;display:inline-block}
.p4-t{position:relative;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px -22px rgba(14,23,38,.5),0 0 0 1px rgba(14,23,38,.08)}
.p4-o{position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:18px;background-color:#C43E1C;box-shadow:inset 0 -10px 0 rgba(0,0,0,.15)}
.p4-lb{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:21px;font-weight:800}
.p4-lb i{font-style:normal;font-size:24px}
.p4-ap{animation:p4ap 3.2s infinite}@keyframes p4ap{0%,34%{opacity:0}35%,100%{opacity:1}}
.p4-fd{animation:p4fd 3.2s infinite}@keyframes p4fd{0%,20%{opacity:0}50%,100%{opacity:1}}
.p4-wp{animation:p4wp 3.2s infinite}@keyframes p4wp{0%,20%{clip-path:inset(0 100% 0 0)}50%,100%{clip-path:inset(0 0 0 0)}}
.p4-zm{animation:p4zm 3.2s infinite}@keyframes p4zm{0%,20%{opacity:0;transform:scale(.1)}50%,100%{opacity:1;transform:scale(1)}}
.p4-bn{animation:p4bn 3.2s infinite}@keyframes p4bn{0%,15%{opacity:0;transform:translateY(-150px)}16%{opacity:1;transform:translateY(-150px)}35%{transform:translateY(0)}44%{transform:translateY(-44px)}53%{transform:translateY(0)}60%{transform:translateY(-12px)}66%,100%{opacity:1;transform:translateY(0)}}
.p4-fl{animation:p4fl 3.2s infinite}@keyframes p4fl{0%,20%{transform:translateY(160px)}50%,100%{transform:translateY(0)}}
.p4-pu{animation:p4pu 2.4s infinite}@keyframes p4pu{0%,30%,70%,100%{transform:scale(1)}50%{transform:scale(1.3)}}
.p4-rt{animation:p4rt 2.8s infinite}@keyframes p4rt{0%,25%{transform:rotate(0)}75%,100%{transform:rotate(360deg)}}
.p4-co{animation:p4co 2.8s infinite}@keyframes p4co{0%,25%,85%,100%{background-color:#C43E1C}45%,65%{background-color:#F5B301}}
.p4-ds{animation:p4ds 3.2s infinite}@keyframes p4ds{0%,40%{opacity:1}41%,85%{opacity:0}86%,100%{opacity:1}}
.p4-fo{animation:p4fo 3.2s infinite}@keyframes p4fo{0%,30%{opacity:1}60%,85%{opacity:0}100%{opacity:1}}
.p4-zo{animation:p4zo 3.2s infinite}@keyframes p4zo{0%,30%{opacity:1;transform:scale(1)}60%,85%{opacity:0;transform:scale(.1)}100%{opacity:1;transform:scale(1)}}
.p4-sl{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;font:800 26px "Segoe UI",var(--font)}
.p4-sl small{font-size:15px;font-weight:600;opacity:.75;margin-top:6px}
.p4-tf{animation:p4tf 4s infinite}@keyframes p4tf{0%,35%{opacity:0}60%,100%{opacity:1}}
.p4-pa{animation:p4pa 4s infinite}@keyframes p4pa{0%,35%{transform:translateX(0)}60%,100%{transform:translateX(-100%)}}
.p4-pb{animation:p4pb 4s infinite}@keyframes p4pb{0%,35%{transform:translateX(100%)}60%,100%{transform:translateX(0)}}
.p4-mo{position:absolute;animation:p4mo 4s infinite ease-in-out}@keyframes p4mo{0%,35%{left:30px;top:120px;width:70px;height:70px;border-radius:50%;background:#0EA5E9}60%,100%{left:250px;top:40px;width:150px;height:110px;border-radius:18px;background:#C43E1C}}
.p4-mt1{animation:p4mt1 4s infinite}@keyframes p4mt1{0%,35%{opacity:1}55%,100%{opacity:0}}
.p4-mt2{animation:p4mt2 4s infinite}@keyframes p4mt2{0%,40%{opacity:0}60%,100%{opacity:1}}
.p4-vx{animation:p4vx 4s infinite}@keyframes p4vx{0%,30%{transform:none}45%{transform:rotate(540deg) scale(.15)}60%,100%{transform:none}}
.p4-d1{animation:p4d1 5s infinite}@keyframes p4d1{0%,30%{opacity:0}36%,100%{opacity:1}}
.p4-d2{animation:p4d2 5s infinite}@keyframes p4d2{0%,30%{opacity:0}45%,100%{opacity:1}}
.p4-d3{animation:p4d3 5s infinite}@keyframes p4d3{0%,30%{opacity:0}80%,100%{opacity:1}}
${kf('p4c1', 12, 4)}${kf('p4c2', 40, 4)}${kf('p4c3', 68, 4)}${kf('p4w1', 12, 8)}${kf('p4a2', 20, 8)}${kf('p4a3', 28, 8)}
.p4-ck{animation:p4ck 6s infinite}@keyframes p4ck{0%,10%,16%,38%,44%,66%,72%,100%{opacity:0;transform:scale(.6)}12%,40%,68%{opacity:1;transform:scale(1.1)}}
.p4-st{display:flex;gap:16px;justify-content:center;align-items:center;height:100%}
.p4-st i{width:70px;height:70px;border-radius:14px;background:#C43E1C}
.p4-pn{background:#fff;border-radius:14px;box-shadow:var(--sh);overflow:hidden;font-family:"Segoe UI",var(--font)}
.p4-pn .hd{display:flex;align-items:center;gap:10px;padding:12px 16px;background:#F3F4F6;font-weight:800;font-size:18px;border-bottom:1px solid #E3E8EF}
.p4-pn .li{position:absolute;left:12px;right:12px;height:54px;display:flex;align-items:center;gap:12px;padding:0 12px;border-radius:8px;font-size:19px;transition:top .8s cubic-bezier(.6,0,.2,1),background .4s,box-shadow .4s}
.p4-pn .li b{width:26px;text-align:center;color:#6B7A90}
.p4-pn .li .bar{margin-left:auto;height:12px;border-radius:6px;background:#16A34A;opacity:.7}
.p4-pn .li.cur{background:#FFF1EC;box-shadow:0 0 0 2px #FA582D}
.p4-bg{display:inline-grid;place-items:center;min-width:28px;height:28px;padding:0 6px;border-radius:6px;background:#FFF1EC;border:2px solid #FA582D;color:#C43E1C;font:800 15px var(--font)}
.p4-step{display:grid;place-items:center;border-radius:20px;color:#fff;font-size:26px;font-weight:800;box-shadow:0 18px 30px -16px rgba(0,0,0,.5)}
.p4-bnc.on{animation:p4bnc 1s cubic-bezier(.3,.6,.4,1) both}
@keyframes p4bnc{0%{transform:translateY(-140px)}45%{transform:translateY(0)}62%{transform:translateY(-30px)}78%{transform:translateY(0)}90%{transform:translateY(-8px)}100%{transform:none}}
.p4-q button{all:unset;cursor:pointer;display:flex;align-items:center;gap:14px;padding:14px 22px;border-radius:14px;background:#fff;box-shadow:0 0 0 2px #CBD5E1;font-size:24px;font-weight:700;transition:all .3s}
.p4-q button:hover{box-shadow:0 0 0 3px #FA582D}
.p4-q .ans{opacity:0;transform:translateY(10px);transition:all .5s}
.p4-q.ok .ans{opacity:1;transform:none}
.p4-q.ok button.good{background:#ECFDF3;box-shadow:0 0 0 3px #16A34A}
.p4-pn2 .tg{position:absolute;display:grid;place-items:center;width:180px;height:96px;border-radius:16px;background:#E2E8F0;color:#33445E;font-size:20px;font-weight:700}
.p4-pn2 .tg .p4-bg{position:absolute;left:-14px;top:-14px;opacity:0;transition:opacity .4s}
.p4-pn2 .tg.on2 .p4-bg,.p4-pn2 .src .p4-bg{opacity:1}
.p4-pn2 .br{position:absolute;font-size:44px;transition:left .7s,top .7s}
`;
  document.head.appendChild(s);
})();

/* mini diapo démo : tuile + objet animé */
const TILEP04 = (anim, w = 300, h = 169, inner = '') => `<div class="p4-t" style="width:${w}px;height:${h}px">${inner || `<div class="p4-o ${anim}"></div>`}</div>`;
const HOTP04 = n => `<em class="ow-hot f zoom" data-s="${n}"><b>${n}</b></em>`;
const STARP04 = c => `<span style="color:${c};font-size:26px">★</span>`;

window.MODULE = { code: 'P04', title: 'Animations et transitions maîtrisées', short: 'Animations et transitions', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Animations et transitions', html: TITLE({ mod: 'POWERPOINT · MODULE 04 · INTERMÉDIAIRE', title: 'Le mouvement au <span class="grad">service</span> du discours', sub: '« Guider le regard, pas distraire »', agenda: SECSP04, art: APPART('ppt') }),
  n: `<p>Module 04 (environ 55 minutes). Le mouvement est l'outil le plus puissant… et le plus mal utilisé de PowerPoint.</p>
  <p>Règle du module : <b>sobriété, ordre, raison</b>. Chaque animation doit servir le discours. Fil rouge : le deck de formation des intérimaires de l'entrepôt <b>LogiNord</b>.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Choisir une <b>transition sobre</b> et l\'appliquer partout', 'Distinguer les <b>4 familles</b> d\'animation', 'Animer dans un <b>ordre</b> qui sert le discours', 'Régler le <b>démarrage</b> : au clic, avec, après la précédente', 'Utiliser le <b>volet Animation</b> et les <b>déclencheurs</b>']),
  n: `<p>Question d'ouverture : « Qui a déjà subi une présentation avec des transitions Vortex et des textes qui arrivent en tournoyant ? » Les rires du groupe valent mieux qu'un long discours.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP04, 0), n: `<p>Première partie : les transitions, l'effet <b>entre</b> deux diapositives.</p>` },

/* 4 — TRANSITION OU ANIMATION */
{ title: 'Transition ou animation ?', html: `${H('Transition ou animation ?', 'Deux outils, deux rôles')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:1fr 1fr;gap:50px">
 <div class="card f left" data-s="1" style="padding:26px 30px">
  <div style="display:flex;align-items:center;gap:12px;font-size:28px;font-weight:900;color:#0EA5E9">↔ Transition</div>
  <div style="font-size:21px;color:#33445E;margin:6px 0 18px">L\'effet <b>entre deux diapositives</b></div>
  ${TILEP04('', 600, 300, `<div class="p4-sl" style="background:#0C4A6E;color:#F0F9FF">Diapo 1<small>Bienvenue chez LogiNord</small></div><div class="p4-sl p4-tf" style="background:#14532D;color:#F0FDF4">Diapo 2<small>Processus d\'un colis</small></div>`)}
  <div class="chip blu" style="margin-top:16px;font-size:18px">onglet Transitions</div>
 </div>
 <div class="card f right" data-s="2" style="padding:26px 30px">
  <div style="display:flex;align-items:center;gap:12px;font-size:28px;font-weight:900;color:#16A34A">✨ Animation</div>
  <div style="font-size:21px;color:#33445E;margin:6px 0 18px">Le mouvement d\'<b>un élément dans la diapo</b></div>
  ${TILEP04('', 600, 300, `<div style="position:absolute;left:30px;top:24px;font:800 26px 'Segoe UI',var(--font)">Notre engagement</div><div class="p4-zm" style="position:absolute;left:200px;top:110px;font:900 90px 'Segoe UI',var(--font);color:#C43E1C">98 %</div>`)}
  <div class="chip ok" style="margin-top:16px;font-size:18px">onglet Animations</div>
 </div>
</div>`,
  n: `<p>Deux notions souvent confondues.</p>
  <p><b>Étape 1 — la transition</b> : l'effet qui se joue au passage d'une diapo à la suivante (ici un fondu). Elle se règle dans l'onglet <b>Transitions</b>, une par diapo.</p>
  <p><b>Étape 2 — l'animation</b> : le mouvement d'un <b>objet</b> à l'intérieur de la diapo (ici le chiffre 98 % qui apparaît en zoom). Onglet <b>Animations</b>, autant que nécessaire par diapo.</p>` },

/* 5 — L'ONGLET TRANSITIONS */
{ title: 'L\'onglet Transitions', html: `${H('Une transition, puis Appliquer partout', 'L\'onglet Transitions', PATH('Transitions > Accès à cette diapositive > Fondu'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1080, h: 620, title: 'Formation LogiNord.pptx', tab: 'Transitions',
  groups: [['Aperçu', ['👁 Aperçu']], ['Accès à cette diapositive', ['🚫 Aucune', '✨ Morphose', '🌫 Fondu', '👉 Poussée', '🧹 Balayer', '⚙️ Options d\'effet']], ['Minutage', ['⏱ Durée : 00,75', '✅ Appliquer partout']]],
  hot: { '🌫 Fondu': 1, '⚙️ Options d\'effet': 2, '⏱ Durée : 00,75': 3, '✅ Appliquer partout': 4 },
  body: `<div style="position:absolute;inset:0;display:flex"><div style="width:170px;background:#F3F4F6;border-right:1px solid #E3E8EF;padding:12px 10px;display:flex;flex-direction:column;gap:12px">
   ${[['#14532D', 'Bienvenue'], ['#14532D', 'Processus'], ['#14532D', 'Engagement'], ['#14532D', 'Sécurité']].map(([c, t], i) => `<div style="display:flex;gap:6px;font:700 12px var(--font);color:#6B7A90"><div style="display:flex;flex-direction:column;align-items:center;gap:4px"><span>${i + 1}</span><span class="f" data-s="${i === 0 ? 1 : 4}" style="color:#C43E1C;font-size:14px">★</span></div><div style="width:120px;height:68px;border-radius:4px;background:${c};color:#F0FDF4;display:grid;place-items:center;font-size:12px;${i === 0 ? 'box-shadow:0 0 0 3px #C43E1C' : ''}">${t}</div></div>`).join('')}
  </div><div style="flex:1;display:grid;place-items:center">${SLD({ inwin: true, w: 640, theme: 'foret', layout: 'title', title: 'Bienvenue chez LogiNord', sub: 'Formation intérimaires' })}</div></div>` })}
<div class="col" style="position:absolute;left:1190px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 · Fondu</b> : sobre, universel', 1)}
 ${CARD('<b>2 · Options d\'effet</b> : direction, variante', 2)}
 ${CARD('<b>3 · Durée</b> : 0,5 à 1 s', 3)}
 ${CARD('<b>4 · Appliquer partout</b> : ★ sur toutes les miniatures', 4)}
</div>`,
  n: `<p><b>Étape 1</b> : on sélectionne une diapo, puis <i>Transitions › Accès à cette diapositive › Fondu</i>. L'aperçu se joue immédiatement. Une petite étoile apparaît à côté de la miniature : c'est le marqueur de transition.</p>
  <p><b>Étape 2</b> : <i>Options d'effet</i> : variante de l'effet (pour le fondu : « En douceur » ou « Par le noir »).</p>
  <p><b>Étape 3</b> : groupe <i>Minutage › Durée</i> : 0,5 à 1 seconde.</p>
  <p><b>Étape 4</b> : <i>Appliquer partout</i> : la même transition sur toutes les diapos. Les étoiles apparaissent sur toutes les miniatures. C'est la tâche 1 du lab.</p>` },

/* 6 — TRANSITIONS EN DÉMO */
{ title: 'Trois transitions en démo', html: `${H('Sobres… et une pour les moments forts', 'Transitions en démonstration')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
 <div class="f zoom" data-s="1">${TILEP04('', 460, 259, `<div class="p4-sl" style="background:#0C4A6E;color:#fff">Diapo A</div><div class="p4-sl p4-tf" style="background:#14532D;color:#fff">Diapo B</div>`)}<div class="p4-lb"><i>🌫</i>Fondu<span class="chip ok" style="margin-left:auto">sobre ✔</span></div><div style="font-size:18px;color:#6B7A90;margin-top:4px">le choix par défaut</div></div>
 <div class="f zoom" data-s="2">${TILEP04('', 460, 259, `<div class="p4-sl p4-pa" style="background:#0C4A6E;color:#fff">Diapo A</div><div class="p4-sl p4-pb" style="background:#14532D;color:#fff">Diapo B</div>`)}<div class="p4-lb"><i>👉</i>Poussée<span class="chip ok" style="margin-left:auto">sobre ✔</span></div><div style="font-size:18px;color:#6B7A90;margin-top:4px">sens de lecture : on avance</div></div>
 <div class="f zoom" data-s="3">${TILEP04('', 460, 259, `<div style="position:absolute;inset:0;background:#F8FAFC"></div><div class="p4-mo"></div><div class="p4-mt1" style="position:absolute;left:24px;bottom:20px;font:800 24px 'Segoe UI',sans-serif">Réception</div><div class="p4-mt2" style="position:absolute;left:250px;bottom:20px;font:800 24px 'Segoe UI',sans-serif;color:#C43E1C">Stockage</div>`)}<div class="p4-lb"><i>✨</i>Morphose<span class="chip" style="margin-left:auto">moment fort ★</span></div><div style="font-size:18px;color:#6B7A90;margin-top:4px">l\'objet se transforme d\'une diapo à l\'autre</div></div>
</div>
${TIP('Morphose : dupliquez la diapo (Ctrl+D), déplacez / redimensionnez les objets sur la copie, appliquez Morphose à la copie.', { s: 4, kind: 'tip', x: 70, y: 640, w: 1460 })}`,
  n: `<p>Les démos tournent en boucle.</p>
  <p><b>Étape 1 — Fondu</b> : la diapo B apparaît en fondu sur la diapo A. Discret, universel.</p>
  <p><b>Étape 2 — Poussée</b> : B pousse A vers la gauche : sensation d'avancer dans l'histoire.</p>
  <p><b>Étape 3 — Morphose</b> : les objets présents sur les deux diapos se déplacent et se transforment (position, taille, couleur). À réserver aux moments forts, par exemple l'entrée dans une section.</p>
  <p><b>Étape 4</b> : la recette Morphose : dupliquer la diapo, modifier la copie, appliquer Morphose sur la copie. Démo en direct fortement conseillée.</p>` },

/* 7 — LA DURÉE */
{ title: 'La bonne durée', html: `${H('0,5 à 1 seconde, pas plus', 'Durée de la transition')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
 ${[['p4-d1', '0,3 s', 'sec, presque une coupure', '#F5B301'], ['p4-d2', '0,75 s', 'fluide, idéal', '#16A34A'], ['p4-d3', '2,5 s', 'le public attend…', '#DC2626']].map(([a, d, t, c], i) => `
 <div class="f zoom" data-s="${i + 1}">${TILEP04('', 460, 259, `<div class="p4-sl" style="background:#0C4A6E;color:#fff">Diapo A</div><div class="p4-sl ${a}" style="background:#14532D;color:#fff">Diapo B</div>`)}<div class="p4-lb" style="color:${c}"><span style="font-size:34px">${d}</span><span style="font-size:20px;color:#33445E;font-weight:600">${t}</span></div></div>`).join('')}
</div>
<svg viewBox="0 0 1460 120" class="f" data-s="4" style="position:absolute;left:70px;top:610px;width:1460px;height:120px;overflow:visible">
 <rect x="0" y="40" width="1460" height="16" rx="8" fill="#E3E8EF"/><rect x="180" y="40" width="300" height="16" rx="8" fill="#16A34A"/><rect x="900" y="40" width="560" height="16" rx="8" fill="#DC2626" opacity=".55"/>
 ${[[0, '0 s'], [180, '0,5 s'], [480, '1 s'], [900, '2 s'], [1440, '3 s']].map(([x, t]) => `<text x="${x}" y="92" font-size="20" font-weight="700" fill="#6B7A90" text-anchor="${x ? 'middle' : 'start'}">${t}</text>`).join('')}
 <text x="330" y="26" text-anchor="middle" font-size="20" font-weight="800" fill="#16A34A">zone de confort</text>
 <circle cx="330" cy="48" r="14" fill="#fff" stroke="#16A34A" stroke-width="4" class="pulse"/>
</svg>`,
  n: `<p>Les trois tuiles jouent la même transition Fondu, avec trois durées différentes (regardez-les en boucle).</p>
  <p><b>Étape 1</b> : 0,3 s : presque une coupure sèche.</p>
  <p><b>Étape 2</b> : 0,75 s : fluide sans faire attendre — le bon réglage.</p>
  <p><b>Étape 3</b> : 2,5 s : le public attend, et l'orateur aussi.</p>
  <p><b>Étape 4</b> : zone de confort 0,5 à 1 s. Réglage : <i>Transitions › Minutage › Durée</i>.</p>` },

/* 8 — À FAIRE / À ÉVITER */
{ title: 'L\'effet catalogue', html: `${H('Une transition, pas un catalogue', 'À faire / à éviter')}
${VS({ l: { t: 'Une transition par diapo', c: '#DC2626', ic: '✘', html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">${['Vortex', 'Rideaux', 'Origami', 'Tourbillon', 'Bascule', 'Avion'].map((t, i) => `<div><div class="p4-t" style="height:84px;background:${['#7C3AED', '#DC2626', '#F59E0B', '#0EA5E9', '#16A34A', '#DB2777'][i]}"><div class="p4-sl ${i === 0 ? 'p4-vx' : ''}" style="color:#fff;font-size:15px">${i + 1}</div></div><div style="font-size:16px;font-weight:700;margin-top:4px">${t}</div></div>`).join('')}</div><ul class="lst sm"><li>Effet « catalogue » : décrédibilise</li></ul>` },
  r: { t: 'Un Fondu partout + une exception', c: '#16A34A', ic: '✔', html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">${['Fondu', 'Fondu', 'Morphose ★', 'Fondu', 'Fondu', 'Fondu'].map((t, i) => `<div><div class="p4-t" style="height:84px;background:#14532D"><div class="p4-sl" style="color:#fff;font-size:15px">${i + 1}</div></div><div style="font-size:16px;font-weight:700;margin-top:4px;${i === 2 ? 'color:#C43E1C' : ''}">${t}</div></div>`).join('')}</div><ul class="lst sm"><li>Cohérence rassurante, exception remarquée</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : une transition différente par diapo (Vortex, Rideaux, Origami…). L'effet « catalogue » détourne l'attention du contenu et décrédibilise immédiatement le propos.</p>
  <p><b>Étape 2 — à faire</b> : une transition sobre appliquée partout ; une exception (Morphose, Zoom) réservée à un moment fort. L'exception ne fonctionne que si elle est rare.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP04, 1), n: `<p>Deuxième partie : les animations d'objets — quatre familles, chacune avec un rôle.</p>` },

/* 10 — LES 4 FAMILLES */
{ title: 'Les quatre familles', html: `${H('Quatre familles, quatre couleurs', 'Les effets d\'animation', PATH('Animations > Animation > Ajouter une animation'))}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
 ${[['Entrée', '#16A34A', 'Faire apparaître', 'p4-zm'], ['Emphase', '#F5B301', 'Attirer l\'attention', 'p4-pu'], ['Sortie', '#DC2626', 'Faire disparaître', 'p4-fo'], ['Trajectoire', '#0EA5E9', 'Déplacer sur un chemin', '']].map(([t, c, d, a], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:20px;border-top:6px solid ${c}">
  <div style="display:flex;align-items:center;gap:10px">${STARP04(c)}<b style="font-size:26px">${t}</b></div>
  <div style="font-size:19px;color:#33445E;margin:4px 0 14px">${d}</div>
  ${TILEP04(a, 296, 175, a ? '' : `<svg viewBox="0 0 296 175" style="position:absolute;inset:0"><path d="M40 130 C 100 20, 200 20, 270 120" fill="none" stroke="#0EA5E9" stroke-width="3" stroke-dasharray="8 6"/><path d="M34 124 l12 0 l-6 12z" fill="#16A34A"/><path d="M264 114 l12 0 l-6 12z" fill="#DC2626"/><rect x="-22" y="-22" width="44" height="44" rx="10" fill="#C43E1C"><animateMotion dur="2.6s" repeatCount="indefinite" path="M40 130 C 100 20, 200 20, 270 120"/></rect></svg>`)}
 </div>`).join('')}
</div>
${TIP('Repère : la couleur de l\'étoile dans la galerie indique la famille — <b>verte</b> entrée, <b>jaune</b> emphase, <b>rouge</b> sortie.', { s: 5, kind: 'tip', x: 70, y: 600, w: 1460 })}`,
  n: `<p>Les quatre familles, chacune en démo continue.</p>
  <p><b>Étape 1 — Entrée</b> (étoile verte) : faire apparaître un objet (Apparaître, Fondu, Balayer, Zoom…).</p>
  <p><b>Étape 2 — Emphase</b> (étoile jaune) : attirer l'attention sur un objet déjà visible (Impulsion, Pulsation de couleur…).</p>
  <p><b>Étape 3 — Sortie</b> (étoile rouge) : faire disparaître.</p>
  <p><b>Étape 4 — Trajectoire</b> : déplacer un objet le long d'un chemin ; le triangle vert marque le départ, le rouge l'arrivée.</p>
  <p><b>Étape 5</b> : le code couleur se retrouve dans la galerie et dans le volet Animation.</p>` },

/* 11 — EFFETS D'ENTRÉE */
{ title: 'Les effets d\'entrée', html: `${H('Six effets d\'entrée à connaître', 'Entrée · démonstration')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px 30px">
 ${[['Apparaître', 'p4-ap', 'instantané, le plus sobre', 1], ['Fondu', 'p4-fd', 'doux, polyvalent', 1], ['Balayer', 'p4-wp', 'révèle dans le sens de lecture', 1], ['Zoom', 'p4-zm', 'met en valeur un chiffre', 0], ['Rebondir', 'p4-bn', 'ludique : avec modération', 0], ['Entrée brusque', 'p4-fl', 'arrive du bord de la diapo', 0]].map(([t, a, d, ok], i) => `
 <div class="f zoom" data-s="${i + 1}">${TILEP04(a, 460, 210)}<div class="p4-lb">${STARP04('#16A34A')}${t}<span style="margin-left:auto;font-size:17px;color:#6B7A90;font-weight:600">${d}</span></div></div>`).join('')}
</div>`,
  n: `<p>Six effets d'entrée, chacun joué en boucle.</p>
  <p><b>Étape 1 — Apparaître</b> (l'« apparition ») : instantané, le plus sobre, parfait pour révéler une liste pas à pas.</p>
  <p><b>Étape 2 — Fondu</b> : doux, convient à tout.</p>
  <p><b>Étape 3 — Balayer</b> : révèle de gauche à droite ; idéal pour une flèche, une frise, un graphique.</p>
  <p><b>Étape 4 — Zoom</b> : fait ressortir un chiffre clé (tâche 4 du lab : le 98 %).</p>
  <p><b>Étape 5 — Rebondir</b> : ludique ; une fois par présentation maximum.</p>
  <p><b>Étape 6 — Entrée brusque</b> : arrive depuis un bord (Options d'effet pour la direction).</p>
  <p>Démo : Animations › galerie, puis « Autres effets d'entrée » pour la liste complète classée Simple / Discret / Modéré / Captivant.</p>` },

/* 12 — EMPHASE ET SORTIE */
{ title: 'Emphase et sortie', html: `${H('Souligner, puis faire disparaître', 'Emphase et sortie · démonstration')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px 30px">
 ${[['Impulsion', 'p4-pu', '#F5B301'], ['Rotation', 'p4-rt', '#F5B301'], ['Pulsation de couleur', 'p4-co', '#F5B301'], ['Disparaître', 'p4-ds', '#DC2626'], ['Fondu', 'p4-fo', '#DC2626'], ['Zoom', 'p4-zo', '#DC2626']].map(([t, a, c], i) => `
 <div class="f zoom" data-s="${i < 3 ? 1 : 2}">${TILEP04(a, 460, 210)}<div class="p4-lb">${STARP04(c)}${t}<span class="chip ${i < 3 ? '' : 'bad'}" style="margin-left:auto">${i < 3 ? 'emphase' : 'sortie'}</span></div></div>`).join('')}
</div>
${TIP('L\'emphase est rare : <b>une</b> par diapo, sur <b>le</b> chiffre ou <b>le</b> mot qui compte.', { s: 3, kind: 'ok', x: 70, y: 720, w: 1460 })}`,
  n: `<p><b>Étape 1 — Emphase</b> (étoiles jaunes) : l'objet est déjà là ; on attire l'œil dessus au moment où on en parle. Impulsion (léger battement), Rotation, Pulsation de couleur.</p>
  <p><b>Étape 2 — Sortie</b> (étoiles rouges) : Disparaître, Fondu, Zoom. Utile pour remplacer un élément par un autre au même endroit (avant / après).</p>
  <p><b>Étape 3</b> : une emphase par diapo, sur l'élément clé. Au-delà, plus rien ne ressort.</p>` },

/* 13 — TRAJECTOIRE */
{ title: 'Les trajectoires', html: `${H('Montrer un déplacement', 'Trajectoire')}
<div class="p4-t a pop" style="position:absolute;left:70px;top:190px;width:900px;height:506px;--d:.2s;background:#F0FDF4">
 <svg viewBox="0 0 900 506" style="position:absolute;inset:0">
  ${[['Réception', 60, 60, '#0EA5E9'], ['Stockage', 360, 330, '#F5B301'], ['Expédition', 690, 80, '#16A34A']].map(([t, x, y, c]) => `<rect x="${x}" y="${y}" width="170" height="100" rx="14" fill="#fff" stroke="${c}" stroke-width="4"/><text x="${x + 85}" y="${y + 60}" text-anchor="middle" font-size="24" font-weight="800" fill="#14532D">${t}</text>`).join('')}
  <path d="M145 170 C 150 330, 300 380, 360 380 M530 380 C 650 380, 770 300, 775 190" fill="none" stroke="#94A3B8" stroke-width="4" stroke-dasharray="10 8" class="draw" pathLength="1" style="--d:.4s"/>
  <path d="M137 168 l16 0 l-8 14z" fill="#16A34A"/><path d="M767 196 l16 0 l-8 -14z" fill="#DC2626"/>
  <text font-size="54"><animateMotion dur="5s" repeatCount="indefinite" path="M120 200 C 125 340, 300 400, 420 400 L 500 400 C 650 400, 760 320, 755 210"/>🚚</text>
 </svg>
</div>
<div class="p4-pn f right" data-s="1" style="position:absolute;left:1010px;right:70px;top:190px">
 <div class="hd">Trajectoires</div>
 ${['Lignes', 'Arcs', 'Virages', 'Formes', 'Boucles', 'Chemin personnalisé'].map((t, i) => `<div style="padding:12px 18px;font-size:20px;border-bottom:1px solid #EEF0F3;${i === 5 ? 'background:#FFF1EC;color:#C43E1C;font-weight:800' : ''}">${['╱', '◠', '↪', '◯', '∞', '✎'][i]}  ${t}</div>`).join('')}
</div>
${TIP('Chemin personnalisé : cliquez point par point, <b>double-clic</b> pour terminer.', { s: 2, kind: 'tip', x: 1010, y: 620, w: 520 })}`,
  n: `<p>Démo en boucle : le camion suit le circuit Réception › Stockage › Expédition — une trajectoire raconte un <b>déplacement réel</b>.</p>
  <p><b>Étape 1</b> : <i>Animations › Ajouter une animation › Trajectoires</i> : Lignes, Arcs, Virages, Formes, Boucles, Chemin personnalisé. Le chemin s'affiche en pointillés : triangle vert au départ, rouge à l'arrivée ; on le modifie avec <i>Options d'effet › Modifier les points</i>.</p>
  <p><b>Étape 2</b> : Chemin personnalisé : un clic par point, double-clic pour finir.</p>
  <p>Alternative souvent plus simple : la transition <b>Morphose</b> entre deux diapos.</p>` },

/* 14 — L'ONGLET ANIMATIONS */
{ title: 'L\'onglet Animations', html: `${H('L\'onglet Animations', 'Le poste de pilotage', PATH('Animations > Animation avancée > Volet Animation'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1100, h: 620, title: 'Formation LogiNord.pptx', tab: 'Animations',
  groups: [['Aperçu', ['👁 Aperçu']], ['Animation', ['⭐ Apparaître', '🌫 Fondu', '🔍 Zoom', '⚙️ Options d\'effet']], ['Animation avancée', ['➕ Ajouter une animation', '📋 Volet Animation', '⚡ Déclencheur', '🖌 Reproduire l\'animation']], ['Minutage', ['▶ Au clic ▾', '⏱ 00,50']]],
  hot: { '🔍 Zoom': 1, '➕ Ajouter une animation': 2, '📋 Volet Animation': 3, '▶ Au clic ▾': 4 },
  body: `<div style="position:absolute;inset:0;display:grid;place-items:center"><div class="sd" style="position:relative;width:700px;height:394px;background:#14532D;color:#F0FDF4">
   <div style="position:absolute;left:40px;top:28px;font-size:30px;font-weight:800">Processus d\'un colis</div>
   ${['Réception', 'Stockage', 'Expédition'].map((t, i) => `<div style="position:absolute;left:${50 + i * 215}px;top:170px;width:180px;height:96px;border-radius:16px;background:#A3E635;color:#14532D;display:grid;place-items:center;font-size:22px;font-weight:800">${t}<span class="p4-bg" style="position:absolute;left:-12px;top:-12px">${i + 1}</span></div>`).join('')}
  </div></div>` })}
<div class="col" style="position:absolute;left:1210px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 · Galerie</b> : un clic = <u>remplace</u> l\'effet', 1)}
 ${CARD('<b>2 · Ajouter une animation</b> : <u>empile</u> un effet', 2)}
 ${CARD('<b>3 · Volet Animation</b> : la liste ordonnée', 3)}
 ${CARD('<b>4 · Minutage</b> : démarrer, durée, délai', 4)}
</div>`,
  n: `<p>L'onglet <b>Animations</b> en quatre zones. Les petits numéros orange à côté des formes indiquent l'ordre des animations (visibles uniquement quand l'onglet Animations est actif).</p>
  <p><b>Étape 1</b> : la <b>galerie</b> : un clic applique l'effet… et <b>remplace</b> celui qui existait.</p>
  <p><b>Étape 2</b> : <b>Ajouter une animation</b> : ajoute un effet supplémentaire au même objet.</p>
  <p><b>Étape 3</b> : <b>Volet Animation</b> : la liste de tous les effets de la diapo, dans l'ordre.</p>
  <p><b>Étape 4</b> : <b>Minutage</b> : Démarrer (au clic, avec, après), Durée, Délai, Réorganiser.</p>` },

/* 15 — LE PIÈGE DE LA GALERIE */
{ title: 'Remplacer ou ajouter ?', html: `${H('Le piège : la galerie remplace', 'Cumuler deux effets')}
<div class="card a pop" style="position:absolute;left:70px;top:190px;width:700px;height:440px;--d:.2s">
 <div class="p4-step" style="position:absolute;left:230px;top:120px;width:240px;height:150px;background:#14532D">98 %</div>
 <div class="p4-tags" style="position:absolute;left:180px;top:300px;width:340px;display:flex;flex-direction:column;gap:8px;font-size:21px;font-weight:700"></div>
</div>
<div class="col" style="position:absolute;left:820px;right:70px;top:190px;gap:16px">
 <div class="card f right" data-s="1" style="padding:16px 22px;font-size:21px">${STARP04('#16A34A')} Effet de départ : <b>Fondu</b></div>
 <div class="card f right" data-s="2" style="padding:16px 22px;font-size:21px;border-left:6px solid #DC2626">Clic sur <b>Zoom</b> dans la galerie<br><span style="color:#DC2626">→ le Fondu est <b>remplacé</b></span></div>
 <div class="card f right" data-s="3" style="padding:16px 22px;font-size:21px;border-left:6px solid #16A34A"><b>Ajouter une animation › Impulsion</b><br><span style="color:#16A34A">→ les deux effets <b>s\'empilent</b> : 1, 2</span></div>
</div>`,
  steps: 3, step(n, el) {
    const T = { 0: [], 1: [['1', '★ Fondu (entrée)', '#16A34A']], 2: [['1', '★ Zoom (entrée)', '#16A34A'], ['', '<s>Fondu</s> remplacé', '#DC2626']], 3: [['1', '★ Zoom (entrée)', '#16A34A'], ['2', '★ Impulsion (emphase)', '#B45309']] }[n] || [];
    el.querySelector('.p4-tags').innerHTML = T.map(([b, t, c]) => `<div style="display:flex;align-items:center;gap:10px;color:${c}">${b ? `<span class="p4-bg">${b}</span>` : '<span style="width:28px"></span>'}${t}</div>`).join('');
  },
  n: `<p>Démo : le chiffre 98 % de la diapo « Notre engagement ».</p>
  <p><b>Étape 1</b> : il porte un effet d'entrée Fondu (badge 1).</p>
  <p><b>Étape 2</b> : on clique sur Zoom dans la galerie : le Fondu disparaît, <b>remplacé</b> par Zoom. Toujours un seul badge.</p>
  <p><b>Étape 3</b> : on veut en plus une emphase quand on en parle : <i>Ajouter une animation › Impulsion</i>. Deux badges : 1 (entrée) puis 2 (emphase).</p>
  <p>Retenez : galerie = remplacer ; Ajouter une animation = cumuler.</p>` },

/* 16 — UNE RAISON */
{ title: 'La règle d\'or', html: `${H('Chaque animation a une raison', 'La règle d\'or')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">
 ${[['Révéler pas à pas', 'le public suit votre parole', `<div class="p4-st">${[0, 1, 2].map(i => `<i class="p4-ap" style="animation-delay:${i * .5}s;animation-duration:3s"></i>`).join('')}</div>`], ['Souligner', 'le chiffre au moment où vous le dites', `<div class="p4-st"><b class="p4-pu" style="font-size:64px;color:#C43E1C">98 %</b></div>`], ['Montrer une étape', 'un flux, un déplacement, une évolution', `<svg viewBox="0 0 460 210" style="position:absolute;inset:0"><path d="M60 105 H400" stroke="#CBD5E1" stroke-width="6" stroke-dasharray="12 10"/><circle r="18" fill="#C43E1C"><animateMotion dur="2.5s" repeatCount="indefinite" path="M60 105 H400"/></circle></svg>`]].map(([t, d, demo], i) => `
 <div class="f zoom" data-s="${i + 1}">${TILEP04('', 460, 210, demo)}<div class="p4-lb">✔ ${t}</div><div style="font-size:18px;color:#6B7A90">${d}</div></div>`).join('')}
</div>
<div class="card f" data-s="4" style="position:absolute;left:70px;right:70px;top:580px;padding:20px 28px;display:flex;align-items:center;gap:20px;border-left:8px solid #DC2626">
 <span style="font-size:44px">🎪</span><div><b style="font-size:26px">« Pour faire joli » n\'est pas une raison.</b><div style="font-size:20px;color:#33445E">Si vous ne pouvez pas dire pourquoi elle est là : <b>supprimez-la</b>.</div></div>
</div>`,
  n: `<p>Trois bonnes raisons d'animer, chacune en démo.</p>
  <p><b>Étape 1 — Révéler pas à pas</b> : le public ne lit pas en avance, il suit votre parole.</p>
  <p><b>Étape 2 — Souligner</b> : l'emphase sur le chiffre au moment précis où vous le prononcez.</p>
  <p><b>Étape 3 — Montrer une étape</b> : un flux, un processus, une évolution dans le temps.</p>
  <p><b>Étape 4</b> : tout le reste est décoration. Test : « pourquoi cette animation ? » Sans réponse, on supprime (sélectionner l'objet › galerie › Aucune).</p>` },

/* 17 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP04, 2), n: `<p>Troisième partie : l'ordre des effets, le démarrage, le volet Animation et les déclencheurs.</p>` },

/* 18 — LE VOLET ANIMATION */
{ title: 'Le volet Animation', html: `${H('Le volet Animation : l\'ordre du film', 'Réorganiser', PATH('Animations > Animation avancée > Volet Animation'))}
<div class="p4-pn a pop" style="position:absolute;left:70px;top:190px;width:620px;height:420px;--d:.2s">
 <div class="hd">📋 Volet Animation <span style="margin-left:auto" class="chip dark">▶ Lire à partir de</span></div>
 <div class="vl" style="position:relative;height:360px">
  ${[['Expédition', 160], ['Réception', 200], ['Stockage', 120], ['Taux de service : 98 %', 90]].map(([t, w], i) => `<div class="li" data-n="${t}" style="top:${16 + i * 66}px"><b>${i + 1}</b>${STARP04(i === 3 ? '#16A34A' : '#16A34A')}<span>${t}</span><span class="bar" style="width:${w / 2}px"></span></div>`).join('')}
 </div>
</div>
<div class="col" style="position:absolute;left:740px;right:70px;top:190px;gap:16px">
 <div class="card f right" data-s="1" style="padding:16px 22px;font-size:21px;border-left:6px solid #DC2626">✘ Expédition avant Réception : <b>l\'histoire est fausse</b></div>
 <div class="card f right" data-s="2" style="padding:16px 22px;font-size:21px"><b>Glisser</b> la ligne, ou <b>Déplacer avant / après</b> (Minutage)</div>
 <div class="card f right" data-s="3" style="padding:16px 22px;font-size:21px;border-left:6px solid #16A34A">✔ Réception › Stockage › Expédition</div>
 <div class="card f right" data-s="4" style="padding:16px 22px;font-size:21px">Les barres = <b>durée et délai</b> de chaque effet</div>
</div>`,
  steps: 4, step(n, el) { const order = n >= 2 ? ['Réception', 'Stockage', 'Expédition', 'Taux de service : 98 %'] : ['Expédition', 'Réception', 'Stockage', 'Taux de service : 98 %'];
    el.querySelectorAll('.p4-pn .li').forEach(li => { const k = order.indexOf(li.dataset.n); li.style.top = (16 + k * 66) + 'px'; li.querySelector('b').textContent = k + 1; li.classList.toggle('cur', (n === 1 && li.dataset.n === 'Expédition') || (n === 2 && li.dataset.n === 'Réception')); }); },
  n: `<p>Le volet Animation liste les effets de la diapo dans leur ordre d'exécution.</p>
  <p><b>Étape 1</b> : on a animé les formes dans le désordre : Expédition sort en premier. L'histoire racontée est fausse.</p>
  <p><b>Étape 2</b> : on glisse la ligne dans le volet, ou on utilise <i>Minutage › Réorganiser l'animation › Déplacer avant / Déplacer après</i>.</p>
  <p><b>Étape 3</b> : l'ordre suit maintenant le processus réel — tâche 3 du lab.</p>
  <p><b>Étape 4</b> : les barres de la chronologie montrent durée et délai ; on peut les étirer à la souris. Le bouton « Lire à partir de » rejoue la séquence.</p>` },

/* 19 — DÉMARRER */
{ title: 'Au clic, avec, après', html: `${H('Trois façons de démarrer', 'Minutage › Démarrer')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
 ${[['Au clic', 'attend votre clic (ou Espace)', ['p4c1', 'p4c2', 'p4c3'], true], ['Avec la précédente', 'en même temps que l\'effet précédent', ['p4w1', 'p4w1', 'p4w1']], ['Après la précédente', 'enchaîne automatiquement', ['p4w1', 'p4a2', 'p4a3']]].map(([t, d, an, ck], i) => `
 <div class="f zoom" data-s="${i + 1}">${TILEP04('', 460, 220, `<div class="p4-st">${an.map(a => `<i style="animation:${a} 6s infinite"></i>`).join('')}</div>${ck ? '<span class="p4-ck" style="position:absolute;right:16px;bottom:10px;font-size:40px">🖱️</span>' : ''}`)}
  <div class="p4-lb"><span class="chip dark" style="font-size:19px">${t}</span></div><div style="font-size:19px;color:#33445E;margin-top:6px">${d}</div></div>`).join('')}
</div>
<svg viewBox="0 0 1460 170" class="f" data-s="4" style="position:absolute;left:70px;top:590px;width:1460px;height:170px">
 ${[0, 1, 2].map(r => [0, 1, 2].map(k => { const x = [[0, 160, 320], [0, 0, 0], [0, 110, 220]][r][k]; return `<rect x="${r * 500 + 20 + x}" y="${20 + k * 40}" width="100" height="26" rx="6" fill="#16A34A" opacity=".75"/>`; }).join('')).join('')}
 ${[0, 1, 2].map(r => `<path d="M${r * 500 + 10} 140 H${r * 500 + 460}" stroke="#94A3B8" stroke-width="2"/> <text x="${r * 500 + 460}" y="164" text-anchor="end" font-size="16" fill="#6B7A90">temps →</text>`).join('')}
</svg>`,
  n: `<p>Les trois tuiles rejouent la même séquence de trois formes avec les trois options de <i>Animations › Minutage › Démarrer</i>.</p>
  <p><b>Étape 1 — Au clic</b> : chaque forme attend un clic (souris, Espace, N, flèche). C'est l'orateur qui rythme.</p>
  <p><b>Étape 2 — Avec la précédente</b> : la forme démarre en même temps que l'effet précédent : les trois apparaissent ensemble.</p>
  <p><b>Étape 3 — Après la précédente</b> : la forme démarre quand la précédente a fini : enchaînement automatique.</p>
  <p><b>Étape 4</b> : la chronologie du volet Animation résume les trois cas. Combinez : un clic pour la 1re forme, « Après la précédente » pour la flèche qui suit.</p>` },

/* 20 — ORDRE : LA DÉMO DU LAB */
{ title: 'Démo : le processus d\'un colis', html: `${H('Démo : le processus d\'un colis', 'L\'ordre au service du discours')}
<div class="sd a pop" style="left:70px;top:180px;width:960px;height:540px;background:#14532D;color:#F0FDF4;--d:.15s">
 <div style="position:absolute;left:50px;top:36px;font-size:40px;font-weight:800">Processus d\'un colis</div>
 <div style="position:absolute;left:50px;top:96px;font-size:22px;opacity:.75">3 étapes, 1 objectif : zéro erreur</div>
 ${['📥 Réception', '🏬 Stockage', '🚚 Expédition'].map((t, i) => `<div class="p4-step f p4-bnc" data-s="${i + 1}" style="position:absolute;left:${50 + i * 300}px;top:220px;width:250px;height:150px;background:#A3E635;color:#14532D">${t}</div>`).join('')}
 ${[0, 1].map(i => `<svg class="f" data-s="${i + 2}" viewBox="0 0 50 40" style="position:absolute;left:${305 + i * 300}px;top:275px;width:40px;height:40px"><path d="M4 20 H40 M30 8 L44 20 L30 32" fill="none" stroke="#A3E635" stroke-width="6" stroke-linecap="round"/></svg>`).join('')}
 <div class="f zoom" data-s="4" style="position:absolute;left:50px;top:420px;font-size:28px;font-weight:700">Taux de service : <b style="font-size:56px;color:#A3E635">98 %</b></div>
</div>
<div class="p4-pn a r" style="position:absolute;left:1070px;right:70px;top:180px;--d:.3s">
 <div class="hd">📋 Volet Animation</div>
 <div style="position:relative;height:300px">
  ${[['Réception', 'Rebondir'], ['Stockage', 'Rebondir'], ['Expédition', 'Rebondir'], ['98 %', 'Zoom']].map(([t, e], i) => `<div class="li vli" data-k="${i + 1}" style="top:${14 + i * 66}px;font-size:18px"><b>${i + 1}</b>${STARP04('#16A34A')}<span>${t}</span><small style="margin-left:auto;color:#6B7A90">${e}</small></div>`).join('')}
 </div>
</div>
${TIP('Diapo de <b>titre</b> : aucune animation. Puis testez : <b>Maj+F5</b>.', { s: 5, kind: 'ok', x: 1070, y: 520, w: 460 })}`,
  steps: 5, step(n, el) { el.querySelectorAll('.vli').forEach(l => l.classList.toggle('cur', +l.dataset.k === n)); },
  n: `<p>Cette diapo est elle-même animée comme le demande le lab : cliquez pour faire avancer.</p>
  <p><b>Étapes 1 à 3</b> : Réception, Stockage, Expédition entrent dans l'ordre du processus réel, une par clic (effet Rebondir ici pour la démo ; Fondu ou Apparaître dans la vraie vie). La ligne correspondante s'allume dans le volet.</p>
  <p><b>Étape 4</b> : le chiffre clé 98 % entre en Zoom (tâche 4 du lab).</p>
  <p><b>Étape 5</b> : pas d'animation sur la diapo de titre (tâche 5), puis on teste avec <b>Maj+F5</b> sur la diapo active.</p>` },

/* 21 — PAR PARAGRAPHE */
{ title: 'Une puce par clic', html: `${H('Une puce par clic', 'Options d\'effet › Par paragraphe')}
${SLD({ x: 70, y: 190, w: 820, theme: 'foret', title: 'Sécurité : 3 règles', bullets: ['Chaussures de sécurité obligatoires', 'Gilet haute visibilité en permanence', 'Circuler dans les allées piétonnes'], bs: 2 })}
<div class="p4-pn a r" style="position:absolute;left:940px;right:70px;top:190px;--d:.3s">
 <div class="hd"><span class="p4-rel" style="padding:2px 8px">⚙️ Options d\'effet${HOTP04(1)}</span></div>
 <div style="padding:8px 18px;font-size:16px;font-weight:800;color:#6B7A90">SÉQUENCE</div>
 ${['En tant qu\'objet unique', 'Tout à la fois', 'Par paragraphe'].map((t, i) => `<div style="padding:12px 20px;font-size:21px;${i === 2 ? 'background:#FFF1EC;color:#C43E1C;font-weight:800' : ''}">${i === 2 ? '◉' : '○'} ${t}</div>`).join('')}
</div>
${TIP('Le texte de la puce = ce que vous dites. Elle apparaît <b>quand</b> vous en parlez.', { s: 5, kind: 'tip', x: 940, y: 520, w: 590 })}`,
  n: `<p>Pour une liste à puces animée, une seule animation suffit sur l'espace réservé.</p>
  <p><b>Étape 1</b> : on applique un effet (Apparaître ou Fondu) à la zone de texte, puis <i>Options d'effet › Séquence › Par paragraphe</i> (c'est souvent le réglage par défaut).</p>
  <p><b>Étapes 2 à 4</b> : chaque clic révèle une puce — comme sur cette diapo.</p>
  <p><b>Étape 5</b> : le public ne lit pas la règle 3 pendant que vous parlez de la règle 1. Dans le volet, la ligne se déplie pour régler chaque puce séparément.</p>` },

/* 22 — REPRODUIRE L'ANIMATION */
{ title: 'Reproduire l\'animation', html: `${H('Le pinceau des animations', 'Reproduire l\'animation', PATH('Animations > Animation avancée > Reproduire l\'animation'))}
<div class="p4-pn2 card a pop" style="position:absolute;left:70px;top:190px;width:900px;height:440px;--d:.2s">
 <div class="tg src" style="left:50px;top:80px;background:#A3E635;color:#14532D"><span class="p4-bg">1</span>Réception</div>
 ${['Stockage', 'Expédition', 'Livraison'].map((t, i) => `<div class="tg" style="left:${330 + (i % 2) * 280}px;top:${i < 2 ? 80 : 270}px"><span class="p4-bg">${i + 2}</span>${t}</div>`).join('')}
 <div class="br" style="left:210px;top:130px">🖌️</div>
 <div style="position:absolute;left:50px;top:190px;width:180px;text-align:center;font-size:17px;color:#6B7A90">Zoom · 0,5 s · Au clic</div>
</div>
<div class="col" style="position:absolute;left:1010px;right:70px;top:190px;gap:16px">
 <div class="card f right" data-s="1" style="padding:16px 22px;font-size:21px">Copie l\'<b>effet</b>, la <b>durée</b>, le <b>démarrage</b>, les options</div>
 <div class="card f right" data-s="2" style="padding:16px 22px;font-size:21px"><b>Double-clic</b> sur le pinceau : plusieurs cibles</div>
 <div class="card f right" data-s="3" style="padding:16px 22px;font-size:21px"><b>Échap</b> pour arrêter</div>
</div>`,
  steps: 3, step(n, el) { const T = el.querySelectorAll('.p4-pn2 .tg:not(.src)'), b = el.querySelector('.p4-pn2 .br'); const pos = [[210, 130], [490, 130], [770, 130], [490, 320]][n];
    b.style.left = pos[0] + 'px'; b.style.top = pos[1] + 'px'; T.forEach((t, i) => { const on = n >= i + 1; t.classList.toggle('on2', on); t.style.background = on ? '#A3E635' : '#E2E8F0'; t.style.color = on ? '#14532D' : '#33445E'; }); },
  n: `<p>Comme le pinceau de mise en forme (module 02), mais pour les animations.</p>
  <p><b>Étape 1</b> : on sélectionne l'objet modèle, <i>Reproduire l'animation</i>, puis clic sur la cible : effet, durée, démarrage et options sont copiés. Le badge d'ordre suit (2).</p>
  <p><b>Étapes 2-3</b> : double-clic sur le bouton pour l'appliquer à plusieurs objets d'affilée, Échap pour arrêter. Vérifiez ensuite l'ordre dans le volet.</p>` },

/* 23 — DÉCLENCHEURS */
{ title: 'Les déclencheurs', html: `${H('Déclencheurs : l\'interactivité simple', 'Sur clic de…', PATH('Animations > Animation avancée > Déclencheur > Sur clic de'))}
<div class="sd a pop p4-q" style="left:70px;top:185px;width:860px;height:484px;background:#fff;color:#0E1726;--d:.2s">
 <div style="position:absolute;left:40px;top:30px;font-size:30px;font-weight:800">Quel est notre taux de service ?</div>
 <div style="position:absolute;left:40px;top:110px;display:flex;flex-direction:column;gap:16px;width:360px">
  ${[['A', '92 %'], ['B', '98 %', 1], ['C', '99,9 %']].map(([k, v, g]) => `<button class="${g ? 'good' : ''}" onclick="event.stopPropagation();this.closest('.p4-q').classList.toggle('ok')"><span class="p4-bg">${k}</span>${v}</button>`).join('')}
 </div>
 <div class="ans" style="position:absolute;left:440px;top:120px;width:380px;padding:22px;border-radius:16px;background:#ECFDF3;border:3px solid #16A34A;font-size:22px"><b style="font-size:26px;color:#15803D">✔ 98 %</b><br>soit 2 colis sur 100 en écart : notre objectif est zéro.</div>
 <div style="position:absolute;left:40px;bottom:24px;font-size:17px;color:#6B7A90">👆 Cliquez sur une réponse (démo réelle)</div>
</div>
<div class="p4-pn f right" data-s="1" style="position:absolute;left:970px;right:70px;top:185px">
 <div class="hd">Volet Sélection ${KEYS('Alt+F10')}</div>
 ${[['Rectangle 12', 'Bouton A'], ['Rectangle 13', 'Bouton B'], ['Rectangle 14', 'Bouton C'], ['ZoneTexte 15', 'Réponse B']].map(([a, b]) => `<div style="padding:10px 18px;font-size:19px;border-bottom:1px solid #EEF0F3;display:flex;gap:10px"><s style="color:#94A3B8">${a}</s>→<b>${b}</b><span style="margin-left:auto">👁</span></div>`).join('')}
</div>
<div class="card f right" data-s="2" style="position:absolute;left:970px;right:70px;top:470px;padding:14px 20px;font-size:20px">⚡ Déclencheur › <b>Sur clic de › Bouton B</b><br><span style="font-size:17px;color:#6B7A90">anime « Réponse B »</span></div>
${TIP('Clic à côté d\'un bouton = diapo suivante. Testez en diaporama !', { s: 3, kind: 'warn', x: 970, y: 600, w: 560 })}`,
  n: `<p>Un <b>déclencheur</b> lance une animation quand on clique sur un objet précis, et non n'importe où. Cliquez sur une réponse : la démo fonctionne réellement dans cette diapo.</p>
  <p><b>Étape 1</b> : d'abord, nommer les objets dans le <b>volet Sélection</b> (<b>Alt+F10</b>, ou Accueil › Organiser › Volet Sélection) : « Bouton B » au lieu de « Rectangle 13 ». Sinon le menu des déclencheurs est illisible.</p>
  <p><b>Étape 2</b> : sélectionner « Réponse B », lui donner une animation d'entrée, puis <i>Déclencheur › Sur clic de › Bouton B</i>. Un éclair apparaît dans le volet Animation. <i>Sur signet</i> déclenche un effet à un moment précis d'une vidéo.</p>
  <p><b>Étape 3</b> : piège : en diaporama, cliquer à côté du bouton fait passer à la diapo suivante. Notez-le dans vos notes et testez avec Maj+F5.</p>` },

/* 24 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Le mouvement, avec une raison', k: 'Récap animé', hub: '5', hsub: 'règles', hk: 'ANIMATIONS',
  items: [{ ic: '↔', t: 'Une transition sobre partout', d: 'Fondu 0,5-1 s, Appliquer partout ; Morphose = exception' }, { ic: '⭐', t: '4 familles', d: 'Entrée verte, emphase jaune, sortie rouge, trajectoire' },
    { ic: '➕', t: 'Ajouter une animation', d: 'La galerie remplace, Ajouter empile' }, { ic: '📋', t: 'Volet Animation', d: 'L\'ordre du discours ; au clic / avec / après' }, { ic: '⚡', t: 'Déclencheurs', d: 'Nommer les objets (Alt+F10), tester en diaporama' }] }),
  n: `<p>Récap. Question au groupe : « Quelle différence entre Avec la précédente et Après la précédente ? » et « Comment cumuler deux effets ? »</p>` },

/* 25 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Six raccourcis pour animer', 'Raccourcis')}
${KEYCARDS([{ k: 'Alt+F10', d: 'Volet Sélection : nommer, masquer, réordonner' }, { k: 'Maj+F5', d: 'Tester la diapo active en diaporama' }, { k: 'Espace', d: 'Diaporama : animation ou diapo suivante' }, { k: 'P', d: 'Diaporama : étape précédente' }, { k: 'Ctrl+Z', d: 'Annuler la dernière animation ajoutée' }, { k: 'F6', d: 'Passer au volet suivant (ruban, miniatures, notes)' }], { cols: 3, y: 200 })}
${TIP('Testez <b>toujours</b> vos animations en diaporama : l\'aperçu du ruban ne montre pas les déclencheurs.', { s: 7, kind: 'key', x: 70, y: 600, w: 1000 })}`,
  n: `<p>Les six raccourcis du module. Maj+F5 est le réflexe n° 1 : on anime, on teste, on corrige.</p>` },

/* 26 — LAB */
{ title: 'Lab', html: LAB({ app: 'ppt', mod: 'p04', lab: 0, title: 'Lab — Le processus de l\'entrepôt', tasks: ['La <b>même transition sobre</b> (Fondu) sur <b>toutes</b> les diapos', '« Processus d\'un colis » : <b>3 formes</b> Réception, Stockage, Expédition', 'Les animer dans l\'<b>ordre</b> Réception › Stockage › Expédition', '« Notre engagement » : le <b>98 %</b> en <b>Zoom</b>', 'Diapo de <b>titre</b> sans animation, puis test en <b>diaporama</b>'] }),
  n: `<p>Scénario : l'entrepôt LogiNord forme ses intérimaires avec un deck projeté en salle de pause ; le responsable veut un processus révélé étape par étape, un chiffre clé qui ressort et un enchaînement sobre.</p>
  <p>Solution : Transitions › Fondu sur toutes les diapos ; diapo 2 : trois rectangles arrondis alignés ; animation d'entrée sur chacun, ordre 1-2-3 ; diapo 3 : Zoom sur le corps contenant « 98 % » ; diapo 1 sans animation ; F5 pour vérifier.</p>
  <p>Vigilance : tâche 3, l'ordre d'animation dépend de l'ordre dans lequel on a animé — vérifier dans le volet.</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quelle est la meilleure pratique pour les transitions ?', o: ['Une transition différente par diapo', 'Une transition sobre appliquée partout, une exception pour un moment fort', 'Toujours Vortex pour dynamiser', 'Durée de 3 secondes minimum'], a: [1], e: 'La cohérence rassure ; l\'exception ne fonctionne que si elle est rare.' },
  { q: 'Comment cumuler une animation d\'entrée ET une emphase sur la même forme ?', o: ['Cliquer deux effets dans la galerie', 'Utiliser Ajouter une animation pour le second effet', 'Dupliquer la forme', 'C\'est impossible'], a: [1], e: 'La galerie remplace l\'effet existant ; Ajouter une animation l\'empile.' },
  { q: 'Quelle option enchaîne automatiquement un effet à la fin du précédent ?', o: ['Au clic', 'Avec la précédente', 'Après la précédente', 'Sur signet'], a: [2], e: 'Après la précédente démarre quand l\'effet précédent est terminé ; Avec la précédente le lance en même temps.' },
  { q: 'À quoi sert un déclencheur « Sur clic de » ?', o: ['À lancer le diaporama', 'À lancer une animation quand on clique sur un objet précis', 'À changer de thème', 'À enregistrer le minutage'], a: [1], e: 'C\'est la base de l\'interactivité : quiz, FAQ, révélation à la demande.' },
  { q: 'Pourquoi renommer les objets dans le volet Sélection avant de créer des déclencheurs ?', o: ['Pour l\'accessibilité uniquement', 'Parce que la liste des déclencheurs affiche les noms d\'objets (Rectangle 12…)', 'C\'est obligatoire', 'Pour réduire la taille du fichier'], a: [1], e: 'Des noms explicites (« Bouton A ») évitent de se tromper d\'objet dans le menu Déclencheur.' },
  { q: 'Quelle couleur d\'étoile correspond aux effets d\'emphase ?', o: ['Verte', 'Jaune', 'Rouge', 'Bleue'], a: [1], e: 'Vert = entrée, jaune = emphase, rouge = sortie.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) c · 4) b · 5) b · 6) b.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P04', html: END(), n: `<p>Fin du module 04. Prochain module : <b>masque et modèles</b> — industrialiser l'identité visuelle.</p>` },
] };
