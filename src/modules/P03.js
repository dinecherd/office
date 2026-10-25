/* ===================== MODULE P03 — Structurer un message : storytelling, une idée par diapo, sections ===================== */
const SECSP03 = ['Partir du message', 'Une idée par diapo', 'Sections, ouverture et conclusion'];

(function () {
  if (document.getElementById('cssP03')) return;
  const s = document.createElement('style'); s.id = 'cssP03';
  s.textContent = `
.p3-rel{position:relative;display:inline-block}
.p3-q{display:flex;flex-direction:column;gap:12px;padding:26px 26px 22px}
.p3-q .big{font-size:64px;line-height:1}
.p3-q b.t{font-size:30px}
.p3-q .ex{margin-top:8px;padding:12px 16px;border-radius:12px;background:#F0F9FF;font-size:19px;color:#0C4A6E;border-left:5px solid #0EA5E9}
.p3-tt{display:grid;grid-template-columns:300px 70px 1fr;align-items:center;gap:16px;padding:16px 24px}
.p3-tt .th{font-size:26px;color:#6B7A90;font-weight:700;transition:color .5s}
.p3-tt .ms{font-size:24px;font-weight:800;color:#0E1726}
.p3-tt.on .th{text-decoration:line-through;color:#DC2626}
.p3-ol{font-size:18px;line-height:1.55;color:#1B2A41}
.p3-ol>div{display:flex;gap:10px;align-items:baseline;padding:3px 0}
.p3-ol i{font-style:normal;width:26px;color:#6B7A90;font-weight:700;text-align:right}
.p3-ol .sc{font:800 14px var(--font);color:#0C7C8C;letter-spacing:.06em;margin-top:8px}
.p3-cd{animation:p3cd 3s linear infinite}
@keyframes p3cd{from{stroke-dashoffset:0}to{stroke-dashoffset:1}}
.p3-pn{background:#F3F4F6;border-radius:16px;padding:16px 14px;display:flex;flex-direction:column;gap:6px;font-family:"Segoe UI",var(--font)}
.p3-pn .sh{display:flex;align-items:center;gap:8px;font:800 17px var(--font);color:#0C7C8C;padding:6px 6px;border-radius:6px}
.p3-pn .sh small{color:#6B7A90;font-weight:600;font-size:15px;margin-left:auto}
.p3-pn .tbs{display:flex;flex-direction:column;gap:8px;padding-left:22px;overflow:hidden;max-height:400px;transition:max-height .7s ease,opacity .5s}
.p3-pn.col .tbs{max-height:0;opacity:0}
.p3-pn .tb{display:flex;gap:6px;font:700 12px var(--font);color:#6B7A90}
.p3-pn .tb>div{border-radius:4px;overflow:hidden;line-height:0;box-shadow:0 0 0 1px #CBD5E1}
.p3-pn .ar{display:inline-block;transition:rotate .5s}
.p3-pn.col .ar{rotate:-90deg}
.p3-strip{display:flex;gap:12px}
.p3-strip>div{position:relative;border-radius:6px;overflow:hidden;line-height:0;box-shadow:0 0 0 1px #CBD5E1;transition:box-shadow .4s,translate .4s}
.p3-strip>div b{position:absolute;left:6px;bottom:4px;font:800 13px var(--font);color:#6B7A90;line-height:1}
.p3-strip>div.cur{box-shadow:0 0 0 4px #FA582D,0 18px 30px -12px rgba(250,88,45,.7);translate:0 -8px}
.p3-fn{animation:p3fn 3.2s ease-in infinite}
@keyframes p3fn{0%{opacity:0;translate:0 -30px}15%{opacity:1}70%{opacity:1;translate:var(--tx) 210px;scale:.3}100%{opacity:0;translate:var(--tx) 230px;scale:.2}}
`;
  document.head.appendChild(s);
})();

function MINIP03(o = {}) {
  const [bg, fg, ac] = SLDTHEMES[o.th || 'ocean'] || SLDTHEMES.ocean, w = o.w || 104, lay = o.lay || 'content';
  const T = (x, y, s, t, anc = 'start') => `<text x="${x}" y="${y}" font-size="${s}" font-weight="800" fill="${fg}" text-anchor="${anc}" font-family="Segoe UI,Arial">${t}</text>`;
  const L = (x, y, ww) => `<rect x="${x}" y="${y}" width="${ww}" height="4" rx="2" fill="${fg}" opacity=".4"/>`;
  const ttl = (o.t ? T(12, 19, 11, o.t) : `<rect x="12" y="10" width="86" height="9" rx="2" fill="${fg}" opacity=".85"/>`) + `<rect x="12" y="24" width="136" height="1.5" fill="${ac}"/>`;
  const bul = (x, y, n, ww) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 9}" width="4" height="4" fill="${ac}"/>${L(x + 8, y + i * 9, ww - (i % 3) * 12)}`).join('');
  const g = lay === 'title' ? (o.t ? T(80, 47, 13, o.t, 'middle') : `<rect x="28" y="36" width="104" height="11" rx="2" fill="${fg}" opacity=".9"/>`) + `<rect x="50" y="55" width="60" height="5" rx="2" fill="${fg}" opacity=".4"/>`
    : lay === 'section' ? `<rect x="0" y="0" width="8" height="90" fill="${ac}"/>` + (o.t ? T(20, 50, 14, o.t) : `<rect x="20" y="40" width="96" height="11" rx="2" fill="${fg}" opacity=".9"/>`)
    : lay === 'big' ? T(80, 56, 28, o.t || '1/5', 'middle') + `<rect x="50" y="66" width="60" height="4" rx="2" fill="${ac}"/>`
    : lay === 'chart' ? ttl + [26, 34, 40, 52].map((h, i) => `<rect x="${30 + i * 28}" y="${82 - h}" width="16" height="${h}" rx="2" fill="${i === 3 ? ac : fg}" opacity="${i === 3 ? 1 : .35}"/>`).join('')
    : ttl + bul(12, 33, o.n || 4, 100);
  return `<svg viewBox="0 0 160 90" style="width:${w}px;height:${Math.round(w * 9 / 16)}px;display:block;background:${bg}">${g}</svg>`;
}
const HOTP03 = n => `<em class="ow-hot f zoom" data-s="${n}"><b>${n}</b></em>`;
const EMP03 = (x, y, e) => `<text x="${x}" y="${y + 14}" text-anchor="middle" font-size="40">${e}</text>`;

window.MODULE = { code: 'P03', title: 'Structurer un message : storytelling, une idée par diapo, sections', short: 'Structurer un message', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Structurer un message', html: TITLE({ mod: 'POWERPOINT · MODULE 03 · INTERMÉDIAIRE', title: 'Raconter une <span class="grad">histoire</span>, pas une liste', sub: '« Du catalogue de puces à la décision »', agenda: SECSP03, art: APPART('ppt') }),
  n: `<p>Module 03 (environ 60 minutes). On quitte la technique pure : il s'agit de passer d'un catalogue de puces à une <b>histoire claire</b> qui mène le public jusqu'à une <b>décision</b>.</p>
  <p>Fil rouge : Karim, responsable logistique chez <b>TransAlp</b>, doit obtenir 80 k€ du comité de direction pour un second quai de chargement.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Construire un <b>fil narratif</b> : Situation › Complication › Résolution', 'Écrire des <b>titres-messages</b>', 'Appliquer la règle <b>une idée par diapo</b>', 'Organiser le deck en <b>sections</b>, le relire en <b>mode Plan</b>', 'Conclure par un <b>appel à l\'action</b> explicite']),
  n: `<p>Question d'ouverture au groupe : « Quelle est la dernière présentation dont vous vous souvenez ? Pourquoi ? » En général, on se souvient d'une histoire, d'un chiffre, d'une image — jamais d'une liste de puces.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP03, 0), n: `<p>Première partie : tout se joue <b>avant</b> d'ouvrir PowerPoint.</p>` },

/* 4 — TROIS QUESTIONS */
{ title: 'Trois questions avant de commencer', html: `${H('Avant d\'ouvrir PowerPoint', 'Trois questions')}
<div style="position:absolute;left:70px;right:70px;top:185px;display:grid;grid-template-columns:repeat(3,1fr);gap:26px">
 ${[['👥', 'Qui ?', 'Le public, ce qu\'il sait déjà', 'Comité de direction : connaît le site, pas le détail des retards'], ['🎯', 'Quoi retenir ?', 'Le message clé, en une phrase', 'Un second quai à 80 k€ supprime les retards et se rembourse en 14 mois'], ['🚀', 'Quoi faire ?', 'L\'action attendue après', 'Valider le budget aujourd\'hui pour des travaux en juillet']].map(([ic, t, d, ex], i) => `
 <div class="card p3-q f zoom" data-s="${i * 2 + 1}"><span class="big">${ic}</span><b class="t">${t}</b><span style="font-size:21px;color:#33445E">${d}</span><div class="ex f" data-s="${i * 2 + 2}">TransAlp : ${ex}</div></div>`).join('')}
</div>
${TIP('Pas de réponse claire à la question 3 ? Ce n\'est peut-être pas une présentation, mais un e-mail.', { s: 7, kind: 'tip', x: 70, y: 690, w: 1460 })}`,
  n: `<p>Trois questions à poser <b>avant</b> la première diapo.</p>
  <p><b>Étapes 1-2 — Qui ?</b> Le comité de direction de TransAlp connaît le site mais pas le détail des retards : inutile d'expliquer ce qu'est un quai, il faut des chiffres.</p>
  <p><b>Étapes 3-4 — Quoi retenir ?</b> Une phrase, pas trois. Si vous n'arrivez pas à l'écrire, le deck ne sera pas clair non plus.</p>
  <p><b>Étapes 5-6 — Quoi faire ?</b> L'action attendue : valider, financer, changer une pratique.</p>
  <p><b>Étape 7</b> : une présentation sans action attendue est souvent une information qui tiendrait dans un e-mail.</p>` },

/* 5 — LE MESSAGE CLÉ */
{ title: 'Le message clé', html: `${H('Des dizaines de faits, un seul message', 'Le message clé')}
<div style="position:absolute;left:70px;top:180px;width:860px;height:300px">
 ${['Délai 48 h', '1 commande / 5 en retard', 'Camions : 40 min d\'attente', 'Pénalités 6 k€ / mois', 'Second quai', 'Coût 80 k€', 'Travaux 6 semaines', 'ROI 14 mois', 'Permis de construire'].map((t, i) => `<span class="chip f zoom" data-s="1" style="position:absolute;left:${[20, 300, 600, 60, 340, 620, 120, 400, 640][i]}px;top:${[0, 10, 0, 70, 80, 70, 140, 150, 140][i]}px;font-size:19px;padding:8px 16px">${t}</span>`).join('')}
</div>
<svg viewBox="0 0 860 420" class="f" data-s="2" style="position:absolute;left:70px;top:390px;width:860px;height:420px;overflow:visible">
 <path d="M60 0 H800 L520 200 V250 H340 V200 Z" fill="#FA582D" fill-opacity=".1" stroke="#FA582D" stroke-width="3" stroke-linejoin="round"/>
 ${[0, 1, 2, 3, 4].map(i => `<circle r="9" fill="#FA582D" opacity="0"><animate attributeName="opacity" values="0;1;1;0" dur="2.5s" begin="${i * .5}s" repeatCount="indefinite"/><animateMotion dur="2.5s" begin="${i * .5}s" repeatCount="indefinite" path="M${130 + i * 150} -30 L430 200 L430 245"/></circle>`).join('')}
</svg>
<div class="card f zoom" data-s="3" style="position:absolute;left:1000px;right:70px;top:300px;padding:30px 34px;border-left:8px solid #FA582D">
 <div style="font-size:18px;font-weight:800;color:#FA582D;letter-spacing:.14em">MESSAGE CLÉ</div>
 <div style="font-size:31px;font-weight:800;line-height:1.3;margin-top:12px">Un second quai à <span class="grad">80 k€</span> supprime les retards et se rembourse en 14 mois.</div>
</div>
<svg viewBox="0 0 1600 900" class="f" data-s="3" style="position:absolute;left:0;top:0;width:1600px;height:900px;pointer-events:none"><path d="M500 650 C 520 760, 860 720, 990 480" fill="none" stroke="#FA582D" stroke-width="5" stroke-dasharray="10 8"/><path d="M972 494 L992 470 L1000 500" fill="none" stroke="#FA582D" stroke-width="5" stroke-linecap="round"/></svg>`,
  n: `<p><b>Étape 1</b> : le brouillon de Karim contient neuf faits, tous vrais, tous au même niveau.</p>
  <p><b>Étape 2</b> : l'entonnoir : on trie, on hiérarchise. Qu'est-ce qui fait bouger le comité ? Le coût des retards et le retour sur investissement.</p>
  <p><b>Étape 3</b> : le <b>message clé</b> en une phrase. Tout le deck sert à démontrer cette phrase ; ce qui ne la sert pas va dans les notes ou en annexe.</p>
  <p>Exercice rapide : demandez à chacun d'écrire le message clé de sa prochaine présentation en moins de 20 mots.</p>` },

/* 6 — SCR */
{ title: 'Situation, Complication, Résolution', html: `${H('Le schéma SCR', 'Situation › Complication › Résolution')}
<svg viewBox="0 0 1460 330" style="position:absolute;left:70px;top:170px;width:1460px;height:330px;overflow:visible">
 <defs><linearGradient id="p3arc" x1="0" x2="1"><stop offset="0" stop-color="#0EA5E9"/><stop offset=".5" stop-color="#DC2626"/><stop offset="1" stop-color="#16A34A"/></linearGradient></defs>
 <path d="M40 270 H1420" stroke="#CBD5E1" stroke-width="2"/><text x="1420" y="300" text-anchor="end" font-size="17" fill="#6B7A90" font-weight="700">temps de la présentation →</text>
 <text x="10" y="40" font-size="17" fill="#6B7A90" font-weight="700">tension ↑</text>
 <path d="M80 230 C 300 230, 420 220, 560 150 S 760 30, 830 40 S 1000 160, 1100 200 S 1300 230, 1400 225" fill="none" stroke="url(#p3arc)" stroke-width="7" stroke-linecap="round" class="draw" pathLength="1" style="--d:.3s;animation-duration:2.4s"/>
 ${[[250, 228, 1, '#0EA5E9'], [830, 40, 2, '#DC2626'], [1300, 228, 3, '#16A34A']].map(([x, y, s, c]) => `<g class="f zoom" data-s="${s}"><circle cx="${x}" cy="${y}" r="22" fill="${c}"/><circle cx="${x}" cy="${y}" r="22" fill="none" stroke="${c}" stroke-width="3" class="pulse"/><text x="${x}" y="${y + 7}" text-anchor="middle" font-size="20" font-weight="900" fill="#fff">${'SCR'[s - 1]}</text></g>`).join('')}
</svg>
<div style="position:absolute;left:70px;right:70px;top:530px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
 ${[['Situation', '#0EA5E9', 'Le contexte partagé', 'Nos livraisons partent en 48 h.'], ['Complication', '#DC2626', 'Le problème, la tension', 'Depuis janvier, 1 commande sur 5 arrive en retard.'], ['Résolution', '#16A34A', 'Votre proposition', 'Un second quai règle le problème pour 80 k€.']].map(([t, c, d, ex], i) => `
 <div class="card f" data-s="${i + 1}" style="padding:20px 24px;border-top:6px solid ${c}"><b style="font-size:26px;color:${c}">${t}</b><div style="font-size:18px;color:#6B7A90;margin-top:2px">${d}</div><div style="font-size:21px;font-weight:700;margin-top:10px">« ${ex} »</div></div>`).join('')}
</div>`,
  n: `<p>Le schéma <b>SCR</b> fonctionne pour presque tout. La courbe montre la <b>tension</b> que vit le public.</p>
  <p><b>Étape 1 — Situation</b> : ce que tout le monde sait et accepte (« nos livraisons partent en 48 h »). Tension basse.</p>
  <p><b>Étape 2 — Complication</b> : ce qui a changé, le problème (« 1 commande sur 5 en retard »). C'est le pic : le public se demande « et alors, que fait-on ? »</p>
  <p><b>Étape 3 — Résolution</b> : votre proposition, qui fait retomber la tension (« un second quai pour 80 k€ »).</p>
  <p>Piège : commencer par la solution. Sans complication, la solution n'a pas de valeur aux yeux du public.</p>` },

/* 7 — LE FLOW DE L'HISTOIRE */
{ title: 'Le fil de l\'histoire', html: `${H('Le fil de l\'histoire, diapo par diapo', 'Storytelling : la structure du deck')}
${FLOW({ x: 70, y: 160, w: 1460, h: 640,
  z: [{ x: 20, y: 10, w: 560, h: 270, l: 'OUVERTURE', c: '#0EA5E9', s: 1 }, { x: 620, y: 10, w: 830, h: 270, l: 'SECTION 1 · LE CONSTAT', c: '#DC2626', s: 2 }, { x: 620, y: 330, w: 830, h: 290, l: 'SECTION 2 · LA SOLUTION', c: '#16A34A', s: 3 }, { x: 20, y: 330, w: 560, h: 290, l: 'CONCLUSION', c: '#FA582D', s: 4 }],
  n: { t: { x: 160, y: 130, pw: 110, ph: 90, html: EMP03(160, 130, '🎬'), l: 'Titre', sub: 'Projet second quai', s: 1 }, so: { x: 440, y: 130, pw: 110, ph: 90, html: EMP03(440, 130, '📋'), l: 'Sommaire', sub: '3 parties', s: 1 },
    c: { x: 740, y: 130, pw: 110, ph: 90, html: EMP03(740, 130, '§'), l: 'Le constat', sub: 'titre de section', s: 2 }, r1: { x: 1030, y: 130, pw: 110, ph: 90, html: EMP03(1030, 130, '⏱'), l: '1 sur 5 en retard', s: 2 }, r2: { x: 1320, y: 130, pw: 110, ph: 90, html: EMP03(1320, 130, '💸'), l: '6 k€ / mois perdus', s: 2 },
    so2: { x: 1320, y: 460, pw: 110, ph: 90, html: EMP03(1320, 460, '§'), l: 'La solution', sub: 'titre de section', s: 3 }, k: { x: 1030, y: 460, pw: 110, ph: 90, html: EMP03(1030, 460, '🏗'), l: '80 k€, 14 mois', s: 3 }, tr: { x: 740, y: 460, pw: 110, ph: 90, html: EMP03(740, 460, '📅'), l: '6 semaines cet été', s: 3 },
    d: { x: 300, y: 460, pw: 130, ph: 100, html: EMP03(300, 460, '✅'), l: 'Décision attendue', sub: 'valider 80 k€', hot: true, s: 4 } },
  l: [{ a: 't', b: 'so', s: 1 }, { a: 'so', b: 'c', s: 2 }, { a: 'c', b: 'r1', s: 2 }, { a: 'r1', b: 'r2', s: 2 }, { a: 'r2', b: 'so2', s: 3, r: [[1425, 130], [1425, 460]] }, { a: 'so2', b: 'k', s: 3 }, { a: 'k', b: 'tr', s: 3 }, { a: 'tr', b: 'd', s: 4 }],
  p: [{ s: 5, keep: true, c: '#FA582D', seg: [{ via: ['t', 'so', 'c', 'r1', 'r2'], lab: 'le public', t: 3.2 }, { via: ['r2', 'so2', 'k', 'tr', 'd'], lab: 'le public', t: 3.2 }] }] })}`,
  steps: 5,
  n: `<p>La structure complète du deck de Karim, telle que demandée dans le lab.</p>
  <p><b>Étape 1 — Ouverture</b> : diapo de titre puis <b>sommaire en 2e position</b> (3 parties maximum).</p>
  <p><b>Étape 2 — Section « Le constat »</b> : une diapo de titre de section, puis une idée par diapo : les retards, puis leur coût.</p>
  <p><b>Étape 3 — Section « La solution »</b> : le second quai à 80 k€ rentabilisé en 14 mois, puis le planning des travaux.</p>
  <p><b>Étape 4 — Conclusion</b> : la diapo « Décision attendue », qui restera affichée pendant les questions.</p>
  <p><b>Étape 5</b> : le point orange, c'est le public : il suit un chemin unique, sans retour en arrière ni détour. Chaque diapo fait avancer l'histoire.</p>` },

/* 8 — ÉCRIRE EN MODE PLAN */
{ title: 'Écrire l\'histoire en mode Plan', html: `${H('Les titres seuls doivent raconter l\'histoire', 'Le test du mode Plan', PATH('Affichage > Mode Plan'))}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 860, h: 620, title: 'Projet second quai.pptx', tab: 'Affichage', groups: [['Affichages des présentations', ['▭ Normal', '☰ Mode Plan', '▦ Trieuse de diapositives', '🗒 Page de notes']]], hot: { '☰ Mode Plan': 1 },
  body: `<div style="position:absolute;inset:0;background:#fff;padding:20px 28px" class="p3-ol">
   ${['Projet second quai', 'Sommaire', 'Le constat', '1 commande sur 5 arrive en retard', 'Les retards nous coûtent 6 k€ par mois', 'La solution', 'Un second quai pour 80 k€, rentabilisé en 14 mois', '6 semaines de travaux cet été, un seul risque', 'Décision attendue aujourd\'hui'].map((t, i) => `<div class="f left" data-s="2"><i>${i + 1}</i><span>▭</span><b style="${[2, 5].includes(i) ? 'color:#0C7C8C' : ''}">${t}</b></div>`).join('')}
  </div>` })}
<div class="col" style="position:absolute;left:980px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Affichage › Mode Plan', 1)}
 ${CARD('<b>2 ·</b> Écrivez <b>uniquement les titres</b>', 2)}
 ${CARD('<b>3 ·</b> Lisez-les à voix haute : l\'histoire tient-elle ?', 3)}
 ${CARD('✔ Oui ? La structure est bonne. Place aux puces.', 4, 'background:#ECFDF3')}
 ${CARD('<b>Alt+Maj+←/→</b> : monter / descendre un niveau', 5)}
</div>`,
  n: `<p>Méthode de rédaction recommandée.</p>
  <p><b>Étape 1</b> : <i>Affichage › Mode Plan</i>.</p>
  <p><b>Étape 2</b> : on tape uniquement les titres, une diapo par ligne (Entrée = nouvelle diapo).</p>
  <p><b>Étape 3</b> : on lit la colonne de titres à voix haute. « Projet second quai. Le constat : 1 commande sur 5 arrive en retard, les retards nous coûtent 6 k€ par mois. La solution : un second quai pour 80 k€… Décision attendue aujourd'hui. » C'est une histoire.</p>
  <p><b>Étape 4</b> : si la suite des titres raconte l'histoire à elle seule, la structure est bonne ; on peut détailler.</p>
  <p><b>Étape 5</b> : <b>Alt+Maj+Flèche gauche/droite</b> remonte/abaisse le niveau d'une ligne (titre ↔ puce) en mode Plan.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP03, 1), n: `<p>Deuxième partie : chaque diapo défend <b>une seule idée</b>, annoncée par son titre.</p>` },

/* 10 — TITRE-THÈME VS TITRE-MESSAGE */
{ title: 'Titre-thème ou titre-message', html: `${H('Un titre qui donne la conclusion', 'Titre-thème vs titre-message')}
${SLD({ x: 70, y: 200, w: 680, theme: 'blanc', title: 'Résultats T3', s: 1, layout: 'title-only', art: `<svg viewBox="0 0 680 382" style="position:absolute;inset:0">${[120, 150, 140, 210].map((h, i) => `<rect x="${90 + i * 130}" y="${340 - h}" width="80" height="${h}" rx="6" fill="${i === 3 ? '#C43E1C' : '#CBD5E1'}"/>`).join('')}<path d="M60 160 H640" stroke="#16A34A" stroke-width="3" stroke-dasharray="8 6"/><text x="640" y="150" text-anchor="end" font-size="16" fill="#16A34A" font-weight="700">objectif</text></svg>` })}
${SLD({ x: 850, y: 200, w: 680, theme: 'blanc', title: 'Le T3 dépasse l\'objectif de 12 % grâce au e-commerce', s: 2, layout: 'title-only', art: `<svg viewBox="0 0 680 382" style="position:absolute;inset:0">${[120, 150, 140, 210].map((h, i) => `<rect x="${90 + i * 130}" y="${340 - h}" width="80" height="${h}" rx="6" fill="${i === 3 ? '#C43E1C' : '#CBD5E1'}"/>`).join('')}<path d="M60 160 H640" stroke="#16A34A" stroke-width="3" stroke-dasharray="8 6"/><text x="466" y="200" text-anchor="end" font-size="26" fill="#C43E1C" font-weight="900">+12 %</text></svg>` })}
<div class="chip bad f" data-s="1" style="position:absolute;left:70px;top:610px;font-size:20px;padding:10px 18px">✘ Le public doit deviner</div>
<div class="chip ok f" data-s="2" style="position:absolute;left:850px;top:610px;font-size:20px;padding:10px 18px">✔ La conclusion est dans le titre</div>
${TIP('Un titre-message est une <b>phrase</b> avec un verbe : il peut tenir sur deux lignes.', { s: 3, x: 70, y: 690, w: 1460 })}`,
  n: `<p><b>Étape 1 — titre-thème</b> : « Résultats T3 ». Le public regarde le graphique et doit deviner ce qu'il faut en conclure. Chacun en tire une conclusion différente.</p>
  <p><b>Étape 2 — titre-message</b> : « Le T3 dépasse l'objectif de 12 % grâce au e-commerce ». La conclusion est donnée, le graphique sert de <b>preuve</b>.</p>
  <p><b>Étape 3</b> : un titre-message est une phrase avec un verbe ; il peut faire deux lignes, c'est normal. Il alimente aussi le mode Plan et la navigation.</p>` },

/* 11 — TRANSFORMER LES TITRES */
{ title: 'Transformer ses titres', html: `${H('Du thème au message', 'Réécrire les titres')}
<div class="col" style="position:absolute;left:70px;right:70px;top:190px;gap:18px">
 ${[['Budget', 'Le projet tient dans l\'enveloppe de 80 k€'], ['Planning', 'Mise en service possible dès septembre'], ['Risques', 'Deux risques à surveiller, aucun bloquant'], ['Retards', '1 commande sur 5 arrive en retard depuis janvier']].map(([a, b], i) => `
 <div class="card p3-tt" data-k="${i + 1}"><span class="th">${a}</span><span class="f" data-s="${i + 1}" style="font-size:36px;color:#FA582D;font-weight:900">➜</span><span class="ms f right" data-s="${i + 1}">${b}</span></div>`).join('')}
</div>
${TIP('Astuce : demandez-vous « <b>et alors ?</b> » devant chaque titre. La réponse est votre titre-message.', { s: 5, kind: 'ok', x: 70, y: 690, w: 1460 })}`,
  steps: 5, step(n, el) { el.querySelectorAll('.p3-tt').forEach(r => r.classList.toggle('on', n >= +r.dataset.k)); },
  n: `<p>Quatre exemples de réécriture. À chaque clic, le titre-thème est barré et remplacé par un titre-message.</p>
  <p><b>Étapes 1 à 4</b> : Budget → « Le projet tient dans l'enveloppe de 80 k€ » ; Planning → « Mise en service possible dès septembre » ; Risques → « Deux risques à surveiller, aucun bloquant » ; Retards → « 1 commande sur 5 arrive en retard depuis janvier ».</p>
  <p><b>Étape 5</b> : la question « et alors ? » transforme n'importe quel thème en message. Exercice : faites réécrire trois titres d'un deck réel des participants.</p>
  <p>Lien lab : tâche 4, un titre-message contenant « 80 k€ ».</p>` },

/* 12 — UNE IDÉE PAR DIAPO */
{ title: 'Une idée par diapo', html: `${H('Une diapo = une idée', 'Scinder le fourre-tout')}
<div class="sd a pop" style="left:70px;top:190px;width:520px;height:292px;background:#0C4A6E;color:#F0F9FF;--sac:#5EEAD4;--d:.2s">
 <div class="sd-tt" style="font-size:22px">Tout sur le projet</div>
 <ul class="sd-ul" style="font-size:12px;top:24%;gap:.3em">${['Délai actuel 48 h', '1 commande sur 5 en retard depuis janvier', 'Camions en attente 40 min en moyenne', 'Pénalités clients : 6 k€ par mois', 'Solution : second quai', 'Coût : 80 k€', 'Travaux : 6 semaines en été', 'Retour sur investissement : 14 mois', 'Risque : permis de construire'].map(t => `<li>${t}</li>`).join('')}</ul>
 <span class="chip" style="position:absolute;right:10px;bottom:10px;background:#fff;color:#B91C1C">9 puces · 4 idées</span>
</div>
<svg viewBox="0 0 200 520" class="f" data-s="1" style="position:absolute;left:610px;top:180px;width:150px;height:520px">${[60, 190, 320, 450].map((y, i) => `<path d="M10 ${150} C 90 ${150}, 110 ${y}, 190 ${y}" fill="none" stroke="#FA582D" stroke-width="4" class="draw" pathLength="1" style="--d:${i * .15}s"/>`).join('')}</svg>
<div style="position:absolute;left:780px;right:70px;top:180px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
 ${[['1 commande sur 5 en retard', ['Délai visé : 48 h', 'Camions : 40 min d\'attente']], ['Les retards coûtent 6 k€/mois', ['Pénalités clients', 'Clients mécontents']], ['Un 2e quai à 80 k€', ['Rentabilisé en 14 mois', 'Capacité doublée']], ['Travaux : 6 semaines cet été', ['Juillet-août', 'Un risque : le permis']]].map(([t, b], i) => `
 <div class="f zoom" data-s="${i + 2}" style="position:relative;height:200px">${SLD({ x: 0, y: 0, w: 355, theme: 'ocean', title: t, bullets: b })}</div>`).join('')}
</div>
${TIP('Une diapo de plus ne coûte rien ; une diapo illisible coûte l\'attention du public.', { s: 6, kind: 'ok', x: 70, y: 600, w: 520 })}`,
  n: `<p>La diapo « Tout sur le projet » du brouillon de Karim : 9 puces qui défendent en réalité 4 idées.</p>
  <p><b>Étape 1</b> : on identifie les idées. <b>Étapes 2 à 5</b> : une diapo par idée, chacune avec un titre-message et 2-3 puces au maximum.</p>
  <p><b>Étape 6</b> : on passe de 1 à 4 diapos, mais chacune se comprend en 3 secondes. Technique dans PowerPoint : dupliquer la diapo (Ctrl+D) autant de fois que d'idées, puis supprimer sur chaque copie les puces qui ne servent pas son titre.</p>
  <p>Lien lab : tâche 3, aucune zone de plus de 5 puces, 7 diapos minimum.</p>` },

/* 13 — TEST DES 3 SECONDES */
{ title: 'Le test des 3 secondes', html: `${H('Compris en 3 secondes ?', 'Le test')}
<svg viewBox="0 0 300 300" class="a pop" style="position:absolute;left:640px;top:250px;width:320px;height:320px;--d:.2s">
 <circle cx="150" cy="150" r="120" fill="#fff" stroke="#E3E8EF" stroke-width="18"/>
 <circle cx="150" cy="150" r="120" fill="none" stroke="#FA582D" stroke-width="18" stroke-linecap="round" pathLength="1" stroke-dasharray="1" class="p3-cd" transform="rotate(-90 150 150)"/>
 <text x="150" y="172" text-anchor="middle" font-size="76" font-weight="900" fill="#0E1726">3 s</text>
</svg>
<div class="f left" data-s="1" style="position:absolute;left:70px;top:230px;width:520px">
 <div class="sd" style="position:relative;width:520px;height:292px;background:#fff;color:#0E1726"><div style="padding:16px 20px;font-size:11px;line-height:1.5">${'Le projet de second quai de chargement vise à réduire les retards constatés depuis janvier sur une commande sur cinq, en offrant une capacité supplémentaire de chargement pour un coût estimé à 80 k€, dont le retour sur investissement est attendu sous 14 mois compte tenu des pénalités clients actuelles et des temps d\'attente des camions. '.repeat(3)}</div></div>
 <div class="chip bad" style="margin-top:14px;font-size:20px;padding:8px 18px">✘ 3 s plus tard : « euh… »</div>
</div>
<div class="f right" data-s="2" style="position:absolute;left:1010px;top:230px;width:520px">
 <div style="position:relative;height:292px">${SLD({ x: 0, y: 0, w: 520, theme: 'ocean', layout: 'title', title: '1 commande sur 5 arrive en retard', sub: 'depuis janvier 2026' })}</div>
 <div class="chip ok" style="margin-top:14px;font-size:20px;padding:8px 18px">✔ 3 s plus tard : « il y a un problème »</div>
</div>
${TIP('Testez sur un collègue : montrez la diapo 3 secondes, cachez-la, demandez ce qu\'il a retenu.', { s: 3, x: 70, y: 700, w: 1460 })}`,
  n: `<p>Le compte à rebours tourne en boucle : 3 secondes.</p>
  <p><b>Étape 1</b> : un paragraphe projeté. Au bout de 3 secondes, le public n'a rien retenu… et il lit au lieu de vous écouter.</p>
  <p><b>Étape 2</b> : une idée, un titre-message, un chiffre. En 3 secondes, le message est passé ; le public peut revenir vers vous.</p>
  <p><b>Étape 3</b> : le test pratique, à faire avant chaque présentation importante.</p>` },

/* 14 — DEUX LIVRABLES */
{ title: 'Support oral ou document ?', html: `${H('Une diapo n\'est pas un document', 'Deux usages, deux livrables')}
${VS({ l: { t: 'Le « slideument »', c: '#DC2626', ic: '✘', html: `<div style="display:flex;justify-content:center;margin-bottom:16px"><div class="sd" style="position:relative;width:420px;height:236px;background:#fff;color:#0E1726;box-shadow:0 0 0 1px #E3E8EF"><div style="padding:14px 18px;font-size:9px;line-height:1.5">${'Mur de texte destiné à être projeté ET envoyé par mail, avec toutes les phrases complètes, les sources, les hypothèses et les détails de calcul. '.repeat(6)}</div></div></div>
   <ul class="lst sm"><li>Illisible en projection</li><li>Le public lit, n\'écoute plus</li></ul>` },
  r: { t: 'Diapos + notes', c: '#16A34A', ic: '✔', html: `<div style="display:flex;gap:16px;justify-content:center;margin-bottom:16px;align-items:flex-start"><div style="position:relative;width:250px;height:141px">${SLD({ x: 0, y: 0, w: 250, theme: 'ocean', layout: 'title', title: '1 commande sur 5 en retard' })}</div><div style="width:200px;height:236px;background:#fff;border-radius:6px;box-shadow:0 0 0 1px #E3E8EF;padding:10px"><div style="height:80px;background:#0C4A6E;border-radius:4px"></div>${LINES(7)}</div></div>
   <ul class="lst sm"><li>Diapo épurée pour l\'oral</li><li>Le détail dans les <b>notes</b>, exportables</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : la diapo « mur de texte » qui sert à la fois de support oral et de document à envoyer (on l'appelle parfois « slideument »). Elle échoue sur les deux tableaux.</p>
  <p><b>Étape 2 — à faire</b> : des diapos épurées pour l'oral, et le détail (phrases, sources, calculs) dans le volet <b>Notes</b>. On envoie ensuite les pages de notes, ou un vrai document Word.</p>` },

/* 15 — LE DÉTAIL DANS LES NOTES */
{ title: 'Le détail va dans les notes', html: `${H('Le détail va dans les notes', 'Pages de notes et documents', PATH('Affichage > Page de notes'))}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 820, h: 620, title: 'Projet second quai.pptx', tab: 'Affichage', groups: [['Affichages des présentations', ['▭ Normal', '☰ Mode Plan', '▦ Trieuse', '🗒 Page de notes']]], hot: { '🗒 Page de notes': 1 },
  body: `<div style="position:absolute;inset:0;display:grid;place-items:center"><div style="width:330px;height:420px;background:#fff;box-shadow:0 10px 30px -10px rgba(0,0,0,.3);padding:22px">
   <div style="position:relative;width:286px;height:161px">${SLD({ x: 0, y: 0, w: 286, theme: 'ocean', layout: 'title', title: '1 commande sur 5 en retard', sub: 'depuis janvier' })}</div>
   <div class="f" data-s="2" style="margin-top:16px;font-size:11px;line-height:1.5;color:#33445E">Rappeler les chiffres : 312 commandes en retard sur 1 560 entre janvier et mars. Source : WMS, export du 2 avril. Insister sur les pénalités (clause 7 des contrats Leclerc et Système U)…</div></div></div>` })}
<div class="col" style="position:absolute;left:930px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Page de notes</b> : la diapo + vos notes, par page', 1)}
 ${CARD('<b>2 ·</b> Phrases, sources, chiffres détaillés', 2)}
 ${CARD('<b>3 · Imprimer</b> › Pages de notes', 3)}
 ${CARD('<b>4 · Fichier › Exporter › Créer des documents</b> : vers Word', 4)}
 ${CARD('<b>5 · Mode Présentateur</b> : vous seul voyez les notes', 5)}
</div>`,
  n: `<p><b>Étape 1</b> : <i>Affichage › Page de notes</i> montre chaque diapo en haut d'une page A4, les notes dessous.</p>
  <p><b>Étape 2</b> : c'est là que vont les phrases complètes, les sources, les chiffres détaillés.</p>
  <p><b>Étape 3</b> : <i>Fichier › Imprimer › Mise en page de l'impression › Pages de notes</i> (ou export PDF) pour un document à envoyer.</p>
  <p><b>Étape 4</b> : <i>Fichier › Exporter › Créer des documents</i> envoie diapos et notes vers Word, pour un vrai document.</p>
  <p><b>Étape 5</b> : en diaporama avec deux écrans, le <b>mode Présentateur</b> affiche vos notes sur votre écran uniquement.</p>` },

/* 16 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP03, 2), n: `<p>Troisième partie : organiser le fichier en sections, puis soigner l'ouverture et la conclusion.</p>` },

/* 17 — LES SECTIONS */
{ title: 'Organiser avec les sections', html: `${H('Des chapitres pour vos diapos', 'Sections', PATH('Accueil > Section > Ajouter une section'))}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 940, h: 620, title: 'Projet second quai.pptx', tab: 'Accueil', groups: [['Diapositives', ['📄 Nouvelle diapositive', '▦ Disposition', '↺ Rétablir', '§ Section ▾']], ['Police', ['Aptos ▾', '28 ▾', 'G', 'I']]], hot: { '§ Section ▾': 1 },
  body: `<div style="position:absolute;inset:0;display:flex"><div class="p3-pn" style="width:200px;border-radius:0;padding:12px 10px">
   ${[['Ouverture', [['title', 'Projet second quai'], ['content', 'Sommaire']]], ['Le constat', [['section', 'Le constat'], ['big', '1/5']]], ['La solution', [['section', 'La solution'], ['chart', '80 k€']]]].map(([sn, ts], si) => `
    <div class="sh ${si ? 'f' : ''}" ${si ? `data-s="${si === 1 ? 3 : 4}"` : ''} style="${si ? '' : ''}"><span class="ar">▾</span>${sn}<small>${ts.length}</small></div>
    <div class="tbs" style="flex-direction:row;flex-wrap:wrap;padding-left:6px">${ts.map(([l, t], i) => `<div class="tb"><span>${si * 2 + i + 1}</span><div>${MINIP03({ lay: l, t, w: 72 })}</div></div>`).join('')}</div>`).join('')}
  </div><div style="flex:1;position:relative;display:grid;place-items:center">
   <div class="f zoom" data-s="2" style="position:absolute;left:30px;top:10px;width:300px;background:#fff;border-radius:10px;box-shadow:var(--sh);padding:8px 0;font-size:17px">${['Ajouter une section', 'Renommer la section', 'Supprimer la section', 'Réduire tout', 'Développer tout'].map((t, i) => `<div style="padding:8px 18px;${i === 0 ? 'background:#FFF1EC;color:#C43E1C;font-weight:800' : ''}">${t}</div>`).join('')}</div>
   <div class="f zoom" data-s="3" style="position:absolute;left:60px;top:260px;width:380px;background:#fff;border-radius:10px;box-shadow:var(--sh);padding:18px 20px;font-size:17px"><b>Renommer la section</b><div style="margin-top:10px;font-size:14px;color:#6B7A90">Nom de la section :</div><div style="margin-top:4px;padding:8px 10px;border:2px solid #C43E1C;border-radius:6px">Le constat</div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><span class="chip dark">Renommer</span></div></div>
  </div></div>` })}
<div class="col" style="position:absolute;left:1050px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Sélectionnez la 1<sup>re</sup> diapo du chapitre', 1)}
 ${CARD('<b>2 · Section › Ajouter</b> (ou clic droit entre deux miniatures)', 2)}
 ${CARD('<b>3 · Renommer</b> : « Le constat »', 3)}
 ${CARD('<b>4 ·</b> Réduire, déplacer, supprimer d\'un bloc', 4)}
</div>`,
  n: `<p>Les <b>sections</b> regroupent les diapos en chapitres dans le volet des miniatures.</p>
  <p><b>Étape 1</b> : on sélectionne la première diapo du futur chapitre.</p>
  <p><b>Étape 2</b> : <i>Accueil › Diapositives › Section › Ajouter une section</i>, ou clic droit entre deux miniatures.</p>
  <p><b>Étape 3</b> : la boîte <i>Renommer la section</i> s'ouvre : on tape « Le constat ».</p>
  <p><b>Étape 4</b> : clic droit sur un nom de section : Renommer, Supprimer la section, Monter / Descendre la section, Réduire tout. Déplacer une section déplace toutes ses diapos d'un bloc.</p>` },

/* 18 — SECTION OU TITRE DE SECTION */
{ title: 'Section ou diapo de section ?', html: `${H('Les deux se complètent', 'Section ou diapo « Titre de section » ?')}
<div style="position:absolute;left:70px;right:70px;top:185px;display:grid;grid-template-columns:1fr 1fr;gap:40px">
 <div class="card f left" data-s="1" style="padding:26px 30px">
  <div style="display:flex;align-items:center;gap:14px"><span style="font-size:44px">🗂</span><b style="font-size:28px">Section</b><span class="chip" style="margin-left:auto;font-size:17px">pour vous</span></div>
  <div class="p3-pn" style="margin:18px 0"><div class="sh"><span class="ar">▾</span>Le constat<small>3</small></div><div class="tbs" style="flex-direction:row;gap:10px">${[['section', 'Le constat'], ['big', '1/5'], ['chart', '6 k€']].map(([l, t]) => `<div class="tb"><div>${MINIP03({ lay: l, t, w: 120 })}</div></div>`).join('')}</div></div>
  <ul class="lst sm"><li>Organise le <b>fichier</b></li><li><b>Invisible</b> en diaporama 🙈</li></ul>
 </div>
 <div class="card f right" data-s="2" style="padding:26px 30px">
  <div style="display:flex;align-items:center;gap:14px"><span style="font-size:44px">📽</span><b style="font-size:28px">Diapo Titre de section</b><span class="chip ok" style="margin-left:auto;font-size:17px">pour le public</span></div>
  <div style="position:relative;height:190px;width:338px;margin:18px auto">${SLD({ x: 0, y: 0, w: 338, theme: 'ocean', layout: 'section', title: 'Le constat' })}</div>
  <ul class="lst sm"><li>Une <b>disposition</b> projetée</li><li>Annonce la nouvelle partie 👀</li></ul>
 </div>
</div>
${TIP('Le lab demande les deux : sections dans le volet <b>et</b> au moins 2 diapos « Titre de section ».', { s: 3, kind: 'key', x: 70, y: 720, w: 1460 })}`,
  n: `<p>Confusion fréquente.</p>
  <p><b>Étape 1 — la section</b> : un repère d'organisation dans le volet des miniatures et la trieuse. Le public ne la voit jamais.</p>
  <p><b>Étape 2 — la diapo « Titre de section »</b> : une disposition (Accueil › Disposition › Titre de section), projetée, qui annonce au public le changement de partie.</p>
  <p><b>Étape 3</b> : on utilise les deux ensemble. Astuce : la diapo de section peut reprendre le sommaire avec la partie en cours mise en valeur.</p>` },

/* 19 — RÉDUIRE ET DÉPLACER */
{ title: 'Manipuler les sections', html: `${H('40 diapos ? Pensez en chapitres', 'Réduire, déplacer')}
<div class="p3-pn a pop" style="position:absolute;left:70px;top:185px;width:420px;--d:.2s">
 ${[['Ouverture', [['title', 'Projet second quai'], ['content', 'Sommaire']]], ['Le constat', [['section', 'Le constat'], ['big', '1/5'], ['chart', '6 k€']]], ['La solution', [['section', 'La solution'], ['chart', '80 k€'], ['content', 'Travaux']]], ['Conclusion', [['title', 'Décision attendue']]]].map(([sn, ts], si) => `
  <div class="sh"><span class="ar">▾</span>${sn}<small>${ts.length} diapo${ts.length > 1 ? 's' : ''}</small></div>
  <div class="tbs" style="flex-direction:row;flex-wrap:wrap;gap:8px">${ts.map(([l, t]) => `<div class="tb"><div>${MINIP03({ lay: l, t, w: 112 })}</div></div>`).join('')}</div>`).join('')}
</div>
<div class="col" style="position:absolute;left:560px;right:70px;top:190px;gap:14px">
 <div class="card f right" data-s="1" style="padding:16px 22px;font-size:22px"><b>Réduire tout</b> : le deck tient en 4 lignes</div>
 <div class="card f right" data-s="2" style="padding:16px 22px;font-size:22px"><b>Monter / Descendre la section</b> : tout le chapitre bouge</div>
 <div class="card f right" data-s="3" style="padding:16px 22px;font-size:22px"><b>Trieuse de diapositives</b> : sections en intertitres</div>
 <div class="card f right" data-s="4" style="padding:16px 22px;font-size:22px"><b>Diaporama › Diaporama personnalisé</b> : ne projeter qu\'une partie</div>
 ${TIP('Un deck partagé à plusieurs ? Une section par auteur : chacun sait où il travaille.', { s: 5, x: 0, y: 0, w: 900 }).replace('left:0px;top:0px;', 'position:relative;')}
</div>`,
  steps: 5, step(n, el) { el.querySelector('.p3-pn').classList.toggle('col', n === 1 || n === 2); },
  n: `<p><b>Étape 1</b> : clic droit sur une section › <b>Réduire tout</b> : le volet n'affiche plus que les chapitres. Vue d'ensemble immédiate de l'histoire.</p>
  <p><b>Étape 2</b> : clic droit › <b>Monter la section / Descendre la section</b> : on réorganise l'histoire chapitre par chapitre (ou glisser-déposer le nom de la section).</p>
  <p><b>Étape 3</b> : en Trieuse, les sections apparaissent comme intertitres (module 01).</p>
  <p><b>Étape 4</b> : on peut aussi ne projeter qu'une partie via un diaporama personnalisé.</p>
  <p><b>Étape 5</b> : usage collaboratif : une section par contributeur.</p>` },

/* 20 — OUVRIR */
{ title: 'Soigner l\'ouverture', html: `${H('Les 30 premières secondes', 'Ouvrir')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
 ${[['Un chiffre', 'big', '1 sur 5', 'commandes en retard'], ['Une question', 'title', 'Combien coûte un camion qui attend ?', ''], ['Un fait marquant', 'title', '40 minutes d\'attente', 'chaque jour, sur le quai n° 1']].map(([k, l, t, sub], i) => `
 <div class="f zoom" data-s="${i + 1}"><div class="chip dark" style="font-size:19px;margin-bottom:12px">${k}</div><div style="position:relative;height:254px">${SLD({ x: 0, y: 0, w: 452, theme: 'ocean', layout: 'title', title: t, sub })}</div></div>`).join('')}
</div>
<div class="card f" data-s="4" style="position:absolute;left:70px;right:70px;top:560px;padding:18px 26px">
 <div style="font-size:21px;font-weight:800;margin-bottom:12px">Puis le sommaire, en <span class="grad">2<sup>e</sup> position</span> — 3 ou 4 points maximum</div>
 <div class="p3-strip">${[['title', 'Projet'], ['content', 'Sommaire'], ['section', 'Constat'], ['big', '1/5'], ['chart', '6 k€'], ['section', 'Solution'], ['chart', '80 k€'], ['content', 'Travaux'], ['title', 'Décision']].map(([l, t], i) => `<div class="${i === 1 ? 'cur' : ''}">${MINIP03({ lay: l, t, w: 140 })}<b style="color:#fff">${i + 1}</b></div>`).join('')}</div>
</div>`,
  n: `<p>Les 30 premières secondes décident de l'attention.</p>
  <p><b>Étapes 1 à 3</b> : trois façons d'ouvrir : un <b>chiffre</b> (1 sur 5), une <b>question</b> (combien coûte un camion qui attend ?), un <b>fait marquant</b> (40 minutes d'attente).</p>
  <p><b>Étape 4</b> : puis le <b>sommaire en 2e position</b>, 3-4 points maximum. Dans le brouillon de Karim, il était à la fin : c'est la tâche 1 du lab (déplacer la miniature, ou Ctrl+Flèche haut).</p>` },

/* 21 — CONCLURE */
{ title: 'Conclure par un appel à l\'action', html: `${H('Finir sur la décision, pas sur « Merci »', 'Conclure')}
${VS({ l: { t: 'Merci / Questions ?', c: '#DC2626', ic: '✘', html: `<div style="position:relative;height:248px;width:440px;margin:0 auto 14px">${SLD({ x: 0, y: 0, w: 440, theme: 'ocean', layout: 'title', title: 'Merci !', sub: 'Des questions ?' })}</div><ul class="lst sm"><li>Reste affichée 10 minutes… pour rien</li></ul>` },
  r: { t: 'Décision attendue', c: '#16A34A', ic: '✔', html: `<div style="position:relative;height:248px;width:440px;margin:0 auto 14px">${SLD({ x: 0, y: 0, w: 440, theme: 'ocean', title: 'Décision attendue aujourd\'hui', bullets: ['Valider le budget de 80 k€', 'Lancer les travaux en juillet', 'Mise en service : septembre'] })}</div><ul class="lst sm"><li>Rappelle le message et l\'action pendant les questions</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : finir sur « Merci / Questions ? ». C'est la diapo qui reste affichée le plus longtemps (pendant toutes les questions) et elle ne dit rien.</p>
  <p><b>Étape 2 — à faire</b> : la diapo <b>Décision attendue</b> : rappel du message clé et action demandée (« valider 80 k€ pour un démarrage en juillet »). On peut dire « merci » à l'oral.</p>
  <p>Lien lab : tâche 5, le titre de la dernière diapo doit contenir « décision ».</p>` },

/* 22 — SAUTER À UNE DIAPO */
{ title: 'Pendant les questions', html: `${H('Revenir à la bonne diapo en un instant', 'Pendant les questions')}
<div class="card a pop" style="position:absolute;left:70px;right:70px;top:200px;padding:26px 30px;--d:.2s">
 <div class="p3-strip" style="justify-content:space-between">${[['title', 'Projet'], ['content', 'Sommaire'], ['section', 'Constat'], ['big', '1/5'], ['chart', '6 k€'], ['section', 'Solution'], ['chart', '80 k€'], ['content', 'Travaux'], ['title', 'Décision']].map(([l, t], i) => `<div data-i="${i + 1}">${MINIP03({ lay: l, t, w: 150 })}<b style="color:#fff">${i + 1}</b></div>`).join('')}</div>
</div>
<div style="position:absolute;left:70px;right:70px;top:400px;display:flex;gap:30px;align-items:center;justify-content:center">
 <div class="f zoom" data-s="1" style="display:flex;align-items:center;gap:14px">${KEYS('7')}<span style="font-size:24px;font-weight:700">puis</span>${KEYS('Entrée')}<span style="font-size:22px;color:#6B7A90">→ diapo 7</span></div>
 <div class="f zoom" data-s="2" style="display:flex;align-items:center;gap:14px">${KEYS('9')}${KEYS('Entrée')}<span style="font-size:22px;color:#6B7A90">→ retour à la décision</span></div>
</div>
<div style="position:absolute;left:70px;right:70px;top:520px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px">
 <div class="card p3-q f" data-s="3" style="padding:18px 22px">${KEYS('Ctrl+S')}<span style="font-size:20px">Diaporama : liste <b>Toutes les diapositives</b></span></div>
 <div class="card p3-q f" data-s="3" style="padding:18px 22px">${KEYS('Échap')}<span style="font-size:20px">Quitter le diaporama</span></div>
 <div class="card p3-q f" data-s="3" style="padding:18px 22px">${KEYS('Maj+F5')}<span style="font-size:20px">Reprendre depuis la diapo active</span></div>
</div>`,
  steps: 3, step(n, el) { const c = n === 0 ? 5 : n === 1 ? 7 : 9; el.querySelectorAll('.p3-strip>div').forEach(d => d.classList.toggle('cur', +d.dataset.i === c)); },
  n: `<p>Pendant les questions, on veut revenir sur une diapo précise sans faire défiler tout le deck.</p>
  <p><b>Étape 1</b> : en diaporama, tapez le <b>numéro</b> de la diapo puis <b>Entrée</b> : on saute directement à la diapo 7 (le chiffrage).</p>
  <p><b>Étape 2</b> : 9 + Entrée : retour à la diapo de décision, qui reste affichée.</p>
  <p><b>Étape 3</b> : en diaporama, Ctrl+S ouvre la liste de toutes les diapositives (boîte « Toutes les diapositives ») ; Échap pour sortir ; Maj+F5 pour reprendre depuis la diapo active. Astuce : imprimez la liste des titres numérotés (mode Plan) pour l'avoir sous les yeux.</p>` },

/* 23 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Une histoire qui mène à une décision', k: 'Récap animé', hub: 'SCR', hfs: 60, hsub: 'le fil rouge', hk: 'STORYTELLING',
  items: [{ ic: '🎯', t: 'Le message d\'abord', d: 'Qui ? Quoi retenir ? Quoi faire ?' }, { ic: '📈', t: 'Situation › Complication › Résolution', d: 'La tension, puis votre proposition' },
    { ic: '💬', t: 'Titres-messages', d: 'Les titres seuls racontent l\'histoire (mode Plan)' }, { ic: '1️⃣', t: 'Une idée par diapo', d: 'Test des 3 secondes, le détail dans les notes' }, { ic: '✅', t: 'Sections + décision finale', d: 'Sommaire en 2e, appel à l\'action en dernier' }] }),
  n: `<p>Récap. Faites raconter au groupe le deck de Karim uniquement avec ses titres.</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Six raccourcis pour structurer', 'Raccourcis')}
${KEYCARDS([{ k: 'Ctrl+↑', d: 'Monter la diapositive sélectionnée' }, { k: 'Ctrl+↓', d: 'Descendre la diapositive sélectionnée' }, { k: 'Alt+Maj+←', d: 'Remonter le niveau (mode Plan)' }, { k: 'Alt+Maj+→', d: 'Abaisser le niveau (mode Plan)' }, { k: 'Ctrl+Entrée', d: 'Espace réservé suivant / nouvelle diapo' }, { k: 'Maj+Entrée', d: 'Saut de ligne sans nouvelle puce' }], { cols: 3, y: 200 })}
${TIP('En diaporama : <b>numéro + Entrée</b> pour aller directement à une diapo.', { s: 7, kind: 'key', x: 70, y: 600, w: 900 })}`,
  n: `<p>Ctrl+Flèche haut/bas déplace la diapo sélectionnée dans le volet (tâche 1 du lab). Alt+Maj+Flèches gauche/droite : niveaux en mode Plan.</p>` },

/* 25 — LAB */
{ title: 'Lab', html: LAB({ app: 'ppt', mod: 'p03', lab: 0, title: 'Lab — Le second quai de chargement', tasks: ['Déplacer le <b>Sommaire</b> en <b>2e position</b>', 'Ajouter au moins <b>2 diapos Titre de section</b>', 'Aucune zone de plus de <b>5 puces</b>, au moins <b>7 diapos</b>', 'Un <b>titre-message</b> contenant <b>80 k€</b>', 'La <b>dernière</b> diapo : un titre contenant <b>décision</b>'] }),
  n: `<p>Scénario : Karim (TransAlp) doit obtenir 80 k€ du comité de direction ; son brouillon tient en une diapo fourre-tout de 9 puces, sommaire à la fin, pas de conclusion.</p>
  <p>Ordre final attendu : Titre › Sommaire › [Section] Le constat › « 1 commande sur 5 arrive en retard » › « Les retards nous coûtent 6 k€ par mois » › [Section] La solution › « Un second quai pour 80 k€, rentabilisé en 14 mois » › « 6 semaines de travaux cet été, un seul risque » › « Décision attendue aujourd'hui ».</p>
  <p>Technique : dupliquer la diapo de 9 puces puis élaguer chaque copie.</p>` },

/* 26 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quel titre est un titre-message ?', o: ['Résultats', 'Ventes T3', 'Le T3 dépasse l\'objectif de 12 %', 'Point sur les ventes'], a: [2], e: 'Un titre-message énonce la conclusion de la diapo, le public n\'a pas à la deviner.' },
  { q: 'Dans le schéma SCR, que représente le « C » ?', o: ['Conclusion', 'Complication', 'Contexte', 'Chiffres'], a: [1], e: 'Situation › Complication (le problème, la tension) › Résolution (votre proposition).' },
  { q: 'Où créer une section dans PowerPoint 365 ?', o: ['Insertion › Section', 'Accueil › Diapositives › Section › Ajouter une section', 'Création › Section', 'Affichage › Section'], a: [1], e: 'La commande Section se trouve dans le groupe Diapositives de l\'onglet Accueil (ou clic droit entre deux miniatures).' },
  { q: 'Les sections sont-elles visibles par le public en diaporama ?', o: ['Oui, en bandeau', 'Non, ce sont des repères d\'organisation ; il faut une diapo Titre de section pour l\'annoncer', 'Oui, à chaque transition', 'Seulement en mode présentateur'], a: [1], e: 'Les sections organisent le fichier. Pour le public, on ajoute une diapo de disposition Titre de section.' },
  { q: 'Quelle diapo vaut-il mieux laisser affichée pendant les questions ?', o: ['« Merci ! »', 'Le sommaire', 'La diapo de décision / appel à l\'action', 'Une diapo noire'], a: [2], e: 'La diapo finale reste longtemps à l\'écran : elle doit rappeler ce que vous attendez du public.' },
  { q: 'Où mettre les phrases complètes, sources et détails de calcul ?', o: ['Sur la diapo, en 12 pt', 'Dans le volet Notes (exportable en pages de notes)', 'Dans une zone de texte masquée', 'Nulle part'], a: [1], e: 'La diapo reste épurée pour l\'oral ; le détail va dans les notes, imprimables ou exportables vers Word.' },
] ); }, n: `<p>Réponses : 1) c · 2) b · 3) b · 4) b · 5) c · 6) b.</p>` },

/* 27 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P03', html: END(), n: `<p>Fin du module 03. Prochain module : <b>animations et transitions</b> — le mouvement au service du discours.</p>` },
] };
