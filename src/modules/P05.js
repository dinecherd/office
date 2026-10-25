/* ===================== MODULE P05 — Masque des diapositives et modèles d'entreprise (Avancé) ===================== */
const SECSP05 = ['Comprendre le masque', 'Dispositions sur mesure', 'Pied de page, logo et modèle .potx'];

/* ---- styles locaux (préfixe p5) ---- */
(function () {
  if (document.getElementById('p05css')) return;
  const s = document.createElement('style'); s.id = 'p05css';
  s.textContent = `
  .p5t{position:relative;background:#fff;border-radius:6px;box-shadow:0 0 0 1px #CBD5E1,0 10px 20px -12px rgba(14,23,38,.45);overflow:hidden;flex:none}
  .p5t>i{position:absolute;display:block;border-radius:3px}
  .p5lg{position:absolute;padding:.12em .45em;border-radius:.3em;background:#0EA5E9;color:#fff;font-weight:900;letter-spacing:.04em;line-height:1.3;transition:background .7s,box-shadow .7s}
  .p5lg.p5chg.on{background:#16A34A;box-shadow:0 0 0 3px rgba(22,163,74,.3)}
  .p5n{position:absolute;right:5%;bottom:4%;color:#64748B;font-weight:800}
  .p5ring{position:absolute;border:3px solid #DC2626;border-radius:8px;box-shadow:0 0 14px rgba(220,38,38,.45)}
  .p5dlg{position:absolute;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.1);font-family:"Segoe UI",var(--font);overflow:hidden;color:#1B2A41}
  .p5dlg>header{display:flex;align-items:center;gap:10px;background:#F3F4F6;padding:10px 18px;font-weight:700;font-size:18px;border-bottom:1px solid #E3E8EF}
  .p5dlg>header::after{content:"✕";margin-left:auto;color:#94A3B8}
  .p5row{display:flex;align-items:center;gap:12px;font-size:19px;padding:6px 0;position:relative}
  .p5box{position:relative;width:24px;height:24px;border:2px solid #64748B;border-radius:5px;display:grid;place-items:center;flex:none;background:#fff}
  .p5box b{color:#fff;background:#C43E1C;position:absolute;inset:-2px;border-radius:5px;display:grid;place-items:center;font-size:15px}
  .p5in{flex:1;border:1px solid #94A3B8;border-radius:5px;padding:5px 10px;font-size:17px;min-height:34px;background:#fff}
  .p5btn{position:relative;display:inline-block;padding:8px 18px;border:1px solid #94A3B8;border-radius:6px;font-size:17px;font-weight:600;background:#fff}
  .p5btn.pri{background:#C43E1C;border-color:#C43E1C;color:#fff}
  .p5ph{position:absolute;border:2px dashed #94A3B8;border-radius:6px;display:grid;place-items:center;color:#64748B;font-size:18px;text-align:center;padding:6px;background:rgba(255,255,255,.6)}
  .p5menu{position:absolute;background:#fff;border-radius:10px;box-shadow:0 24px 50px -20px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;padding:8px 0;font-size:19px}
  .p5menu div{position:relative;display:flex;align-items:center;gap:12px;padding:7px 18px}
  .p5menu div i{font-style:normal;width:28px;text-align:center}
  .p5menu div.on.p5sel{background:#FDECE6;box-shadow:inset 4px 0 0 #C43E1C}
  .p5lbl{position:absolute;font-size:17px;font-weight:800;color:#33445E;text-align:center}
  .p5x{position:absolute;inset:0;display:grid;place-items:center;color:#DC2626;font-size:30px;font-weight:900;background:rgba(255,255,255,.75);opacity:0;transition:opacity .5s}
  .p5x.on{opacity:1}
  .p5ph.p5typ{border-color:#C43E1C;color:#C43E1C}
  `;
  document.head.appendChild(s);
})();

/* miniature de diapositive : k = title | content | section | photo | num | two | quote */
const P05TH = (o = {}) => {
  const w = o.w || 160, h = Math.round(w * 9 / 16), c = o.c || '#0369A1', k = o.k || 'content';
  const L = (x, y, ww, hh, col = '#CBD5E1') => `<i style="left:${x}%;top:${y}%;width:${ww}%;height:${hh}%;background:${col}"></i>`;
  let b = '';
  if (k === 'title') b = L(15, 36, 70, 13, c) + L(28, 56, 44, 7);
  else if (k === 'section') b = `<i style="left:0;top:0;width:100%;height:100%;border-radius:0;background:${c}"></i>` + L(10, 42, 60, 13, '#fff') + L(10, 60, 35, 6, 'rgba(255,255,255,.6)');
  else if (k === 'photo') b = `<i style="left:0;top:0;width:100%;height:100%;border-radius:0;background:linear-gradient(160deg,#7DD3FC,#0369A1 60%,#0C4A6E)"></i>` + `<i style="left:0;bottom:0;width:100%;height:38%;border-radius:0;background:linear-gradient(transparent,rgba(0,0,0,.35))"></i>` + L(8, 72, 50, 10, '#fff');
  else if (k === 'num') b = L(8, 10, 50, 10, c) + `<b style="position:absolute;left:0;right:0;top:34%;text-align:center;font-size:${Math.round(w * .17)}px;color:${c};font-weight:900">+12 %</b>`;
  else if (k === 'two') b = L(8, 10, 60, 10, c) + [32, 44, 56, 68].map(y => L(8, y, 38, 5) + L(54, y, 38, 5)).join('');
  else if (k === 'quote') b = `<i style="left:8%;top:24%;width:24%;height:43%;border-radius:50%;background:#94A3B8"></i>` + L(40, 26, 52, 7) + L(40, 38, 48, 7) + L(40, 58, 30, 6, c);
  else if (k === 'three') b = L(8, 10, 60, 10, c) + [8, 38, 68].map(x => L(x, 34, 24, 20, '#E2E8F0') + L(x, 60, 24, 5) + L(x, 70, 18, 5)).join('');
  else b = L(8, 10, 60, 10, c) + [32, 44, 56, 68].map((y, i) => L(12, y, 70 - i * 8, 5)).join('');
  const logo = o.logo ? `<span class="p5lg ${o.lgc || ''}" ${o.lgs ? `data-s="${o.lgs}"` : ''} style="right:${4 + (o.dx || 0)}%;top:${5 + (o.dy || 0)}%;font-size:${Math.max(7, Math.round(w * .055))}px">RIVAGE</span>` : '';
  const ftr = o.ftr ? `<i style="left:8%;top:90%;width:42%;height:4%;background:#CBD5E1"></i><b class="p5n ${o.fs ? 'f' : ''}" ${o.fs ? `data-s="${o.fs}"` : ''} style="font-size:${Math.max(8, Math.round(w * .05))}px">${o.ftr}</b>` : '';
  return `<div class="p5t ${o.cls || ''}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.pos || ''};width:${w}px;height:${h}px">${b}${logo}${ftr}${o.extra || ''}</div>`;
};
const P05HOT = s => `<em class="ow-hot f zoom" data-s="${s}"><b>${s}</b></em>`;
const P05CK = (label, s, hot) => `<div class="p5row"><span class="p5box">${s ? `<b class="f zoom" data-s="${s}">✔</b>` : ''}</span><span style="position:relative">${label}${hot ? P05HOT(hot) : ''}</span></div>`;

window.MODULE = { code: 'P05', title: 'Masque des diapositives et modèles d\'entreprise', short: 'Masque et modèles', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Masque et modèles', html: TITLE({ mod: 'POWERPOINT · MODULE 05 · AVANCÉ', title: 'Le <span class="grad">masque</span>, chef d\'orchestre de la charte', sub: '« Une règle posée une fois, respectée sur toutes les diapos »', agenda: SECSP05, art: APPART('ppt') }),
  n: `<p>Bienvenue dans le module 5 de PowerPoint, premier module du niveau <b>Avancé</b>. Durée indicative : 65 minutes.</p>
<p>Fil rouge : <b>industrialiser la charte graphique</b>. Au lieu de « bricoler » chaque diapo, on construit un <b>masque</b> propre, des <b>dispositions</b> sur mesure, puis un <b>modèle .potx</b> que toute l'entreprise réutilise.</p>
<p>Question d'accroche à poser au groupe : « Qui a déjà dû changer le logo dans une présentation de 50 diapos ? Combien de temps cela a-t-il pris ? »</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Modifier le <b>masque</b> et les <b>dispositions</b> sans toucher aux diapos', 'Créer une <b>disposition personnalisée</b> avec ses espaces réservés', 'Gérer <b>pied de page, numéro et logo</b> de façon centralisée', 'Enregistrer et diffuser un <b>modèle d\'entreprise .potx</b>']),
  n: `<p>Quatre objectifs, qui suivent le chemin naturel de la construction d'un modèle : comprendre le masque → créer des dispositions → poser les éléments communs (logo, pied de page) → enregistrer en .potx et diffuser.</p>
<p>Prérequis : savoir changer de disposition (module 2) et appliquer un thème (module 3). Vérifiez-le rapidement à main levée.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP05, 0), n: `<p>Première partie : <b>comprendre le masque</b>. Pourquoi il existe, comment il est organisé, et où faire chaque modification.</p>` },

/* 4 — POURQUOI UN MASQUE */
{ title: 'Un logo, soixante retouches', html: `${H('Un logo, soixante retouches', 'Pourquoi un masque ?')}
<div class="chip bad a pop" style="position:absolute;left:70px;top:172px;--d:.2s">✘ Sans masque : logo copié-collé</div>
<div style="position:absolute;left:70px;top:222px;width:680px;display:grid;grid-template-columns:repeat(4,150px);gap:22px">
 ${Array.from({ length: 12 }, (_, i) => { const dx = [0, 3, -1, 5, 1, -2, 4, 0, 6, -1, 2, 3][i], dy = [0, 2, 5, -2, 1, 6, 0, 3, -1, 4, 2, 0][i];
   return `<div class="a pop" style="--d:${.25 + i * .04}s;position:relative">${P05TH({ w: 150, k: i % 4 === 0 ? 'section' : i % 3 ? 'content' : 'two', logo: true, dx, dy })}<div class="p5ring f zoom" data-s="1" style="right:${2 + dx * 1.4}px;top:${-1 + dy * .8}px;width:52px;height:20px"></div></div>`; }).join('')}
</div>
<div class="callout f" data-s="1" style="left:70px;top:568px;width:680px;background:#DC2626">Nouveau logo = 60 retouches… et toujours un oubli</div>
<div class="chip ok f" data-s="2" style="position:absolute;left:860px;top:172px">✔ Avec masque : un seul logo</div>
${P05TH({ w: 300, k: 'content', logo: true, lgc: 'p5chg', lgs: 4, s: 2, cls: 'f zoom', pos: 'position:absolute;left:1040px;top:222px' })}
<div class="p5lbl f" data-s="2" style="left:1040px;top:398px;width:300px">MASQUE</div>
<svg class="f" data-s="3" viewBox="0 0 700 120" style="position:absolute;left:840px;top:428px;width:700px;height:120px;overflow:visible">
 ${[60, 230, 400, 570].map((x, i) => `<path d="M350 0 C350 60, ${x + 50} 50, ${x + 50} 110" fill="none" stroke="#16A34A" stroke-width="3" stroke-dasharray="6 6" class="draw" pathLength="1" style="--d:${.1 + i * .1}s"/>`).join('')}
</svg>
<div class="f" data-s="3" style="position:absolute;left:900px;top:550px;display:flex;gap:30px">${['title', 'content', 'section', 'two'].map(k => P05TH({ w: 150, k, logo: true, lgc: 'p5chg', lgs: 4 })).join('')}</div>
<div class="chip f" data-s="4" style="position:absolute;left:1060px;top:660px">↻ Un changement → toutes les diapos suivent</div>
${TIP('Règle d\'or : ce qui concerne <b>toutes</b> les diapos se fait <b>une seule fois</b>, sur le masque.', { s: 5, y: 712, x: 70, w: 1460, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : à gauche, la réalité de beaucoup d'entreprises — le logo a été copié-collé sur chaque diapo. Les cadres rouges montrent qu'il n'est jamais exactement au même endroit. Le jour où le logo change, il faut retoucher les 60 diapos… et on en oublie toujours une.</p>
<p><b>Étape 2</b> : à droite, le <b>masque</b> : le logo est posé une seule fois sur la diapo « mère ».</p>
<p><b>Étape 3</b> : toutes les dispositions et donc toutes les diapos héritent du logo, toujours au pixel près.</p>
<p><b>Étape 4</b> : on change la couleur du logo sur le masque → il change partout instantanément (les logos passent au vert).</p>
<p><b>Étape 5</b> : la règle d'or. Démo possible : ouvrez un deck existant, <i>Affichage › Masque des diapositives</i>, déplacez le logo sur la grande miniature et refermez : toutes les diapos ont bougé.</p>` },

/* 5 — HIÉRARCHIE */
{ title: 'La hiérarchie du masque', html: `${H('Thème → masque → dispositions → diapos', 'Comprendre le masque')}
<svg viewBox="0 0 1460 620" style="position:absolute;left:70px;top:175px;width:1460px;height:620px;overflow:visible">
 <g class="f" data-s="1"><rect x="20" y="170" width="240" height="250" rx="22" fill="#fff" stroke="#E3E8EF" stroke-width="2" filter="url(#sh)"/>
  ${['#0C4A6E', '#0EA5E9', '#5EEAD4', '#F59E0B'].map((c, i) => `<rect x="${50 + i * 46}" y="200" width="36" height="36" rx="8" fill="${c}"/>`).join('')}
  <text x="140" y="300" text-anchor="middle" font-size="54" font-weight="800" fill="#0C4A6E" font-family="Georgia,serif">Aa</text>
  <text x="140" y="340" text-anchor="middle" font-size="16" fill="#6B7A90" font-weight="700">couleurs · polices · effets</text>
  <text x="140" y="470" text-anchor="middle" font-size="26" font-weight="900" fill="#0E1726">THÈME</text></g>
 <g class="f" data-s="2"><path d="M262 295 H380" stroke="#C43E1C" stroke-width="5" class="draw" pathLength="1"/>
  <rect x="385" y="210" width="300" height="169" rx="10" fill="#fff" stroke="#C43E1C" stroke-width="4" filter="url(#sh)"/>
  <rect x="410" y="232" width="180" height="22" rx="4" fill="#0C4A6E"/><rect x="630" y="230" width="42" height="16" rx="4" fill="#0EA5E9"/>
  ${[275, 297, 319].map((y, i) => `<rect x="420" y="${y}" width="${220 - i * 40}" height="10" rx="4" fill="#CBD5E1"/>`).join('')}<rect x="410" y="356" width="120" height="8" rx="3" fill="#CBD5E1"/><text x="672" y="366" text-anchor="end" font-size="11" font-weight="800" fill="#64748B">‹N°›</text>
  <text x="535" y="470" text-anchor="middle" font-size="26" font-weight="900" fill="#C43E1C">MASQUE</text><text x="535" y="500" text-anchor="middle" font-size="17" fill="#6B7A90" font-weight="700">la diapo « mère »</text></g>
 <g class="f" data-s="3">${[40, 170, 300, 430].map((y, i) => `<path d="M688 295 C 740 295, 740 ${y + 45}, 800 ${y + 45}" fill="none" stroke="#94A3B8" stroke-width="4" class="draw" pathLength="1" style="--d:${.1 + i * .1}s"/>
  <rect x="805" y="${y}" width="160" height="90" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="2" filter="url(#sh)"/>
  <rect x="${i === 2 ? 805 : 818}" y="${i === 2 ? y : y + 12}" width="${i === 2 ? 160 : 90}" height="${i === 2 ? 90 : 12}" rx="${i === 2 ? 8 : 3}" fill="#0C4A6E"/><rect x="935" y="${y + 8}" width="24" height="10" rx="3" fill="#0EA5E9"/>
  <text x="885" y="${y + 70}" text-anchor="middle" font-size="15" font-weight="800" fill="${i === 2 ? '#fff' : '#33445E'}">${['Titre', 'Titre et contenu', 'Titre de section', 'Chiffre clé'][i]}</text>`).join('')}
  <text x="885" y="560" text-anchor="middle" font-size="26" font-weight="900" fill="#0E1726">DISPOSITIONS</text><text x="885" y="590" text-anchor="middle" font-size="17" fill="#6B7A90" font-weight="700">un gabarit par type de diapo</text></g>
 <g class="f" data-s="4">${[[40, 0], [170, 1], [170, 2], [300, 3], [170, 4], [430, 5], [170, 6], [300, 7]].map(([y, j], i) => { const X = 1120 + (j % 2) * 150, Y = 40 + Math.floor(j / 2) * 120;
   return `<path d="M968 ${y + 45} C 1040 ${y + 45}, 1040 ${Y + 32}, ${X} ${Y + 32}" fill="none" stroke="#CBD5E1" stroke-width="2.5" class="draw" pathLength="1" style="--d:${.1 + i * .06}s"/>`; }).join('')}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(j => { const X = 1120 + (j % 2) * 150, Y = 40 + Math.floor(j / 2) * 120, i = j;
   return `<rect x="${X}" y="${Y}" width="120" height="68" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><rect x="${X + 8}" y="${Y + 8}" width="64" height="9" rx="3" fill="#0C4A6E"/><rect x="${X + 96}" y="${Y + 6}" width="18" height="8" rx="2" fill="#0EA5E9"/><text x="${X + 60}" y="${Y + 52}" text-anchor="middle" font-size="14" font-weight="800" fill="#94A3B8">${i + 1}</text>`; }).join('')}
  <text x="1255" y="560" text-anchor="middle" font-size="26" font-weight="900" fill="#0E1726">DIAPOSITIVES</text><text x="1255" y="590" text-anchor="middle" font-size="17" fill="#6B7A90" font-weight="700">votre contenu</text></g>
 <g class="f" data-s="5"><circle r="11" fill="#FA582D" filter="url(#gl)"><animateMotion dur="3.4s" repeatCount="indefinite" path="M262 295 H385 M688 295 C 740 295, 740 215, 800 215 M968 215 C 1040 215, 1040 192, 1120 192"/></circle>
  <rect x="300" y="110" width="330" height="40" rx="20" fill="#FA582D"/><text x="465" y="137" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">Police des titres : Montserrat</text></g>
</svg>`,
  n: `<p>La hiérarchie en quatre niveaux, de gauche à droite :</p>
<p><b>Étape 1 — Thème</b> : la palette de couleurs, la paire de polices et les effets. C'est la « matière première ».</p>
<p><b>Étape 2 — Masque</b> : la diapo mère. Elle utilise le thème et fixe les positions communes : titre, zone de texte, logo, zones de pied de page.</p>
<p><b>Étape 3 — Dispositions</b> : chaque disposition hérite du masque et l'adapte à un type de diapo (Titre, Titre et contenu, Titre de section…). On peut en créer de nouvelles, comme « Chiffre clé ».</p>
<p><b>Étape 4 — Diapositives</b> : chaque diapo utilise <b>une</b> disposition. Le contenu est à vous, la forme vient d'au-dessus.</p>
<p><b>Étape 5</b> : la pastille montre la propagation : je change la police des titres sur le masque → elle descend dans toutes les dispositions → toutes les diapos. Question au groupe : « Si je change la police directement sur une diapo, que se passe-t-il ? » (Réponse : seule cette diapo change, et elle ne suivra plus le masque pour cette propriété.)</p>` },

/* 6 — LE MODE MASQUE (APPWIN) */
{ title: 'Le mode Masque', html: `${H('Le mode Masque des diapositives', 'Comprendre le masque', PATH('Affichage > Modes masque > Masque des diapositives'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1060, h: 660, title: 'Charte Rivage.pptx', tab: 'Masque des diapositives', tabs: ['Fichier', 'Masque des diapositives', 'Accueil', 'Insertion', 'Transitions', 'Animations', 'Révision', 'Affichage'],
  groups: [['Modifier le masque', ['📑 Insérer un masque', '📄 Insérer une disposition']], ['Mise en page du masque', ['🔲 Insérer un espace réservé', 'Pieds de page']], ['Arrière-plan', ['🎨 Couleurs', '🔤 Polices']], ['Fermer', ['❌ Fermer le mode Masque']]],
  hot: { '❌ Fermer le mode Masque': 4 },
  body: `<div style="position:absolute;left:0;top:0;bottom:0;width:250px;background:#F3F4F6;border-right:1px solid #E3E8EF;padding:12px 0 0 14px">
   <div style="position:relative;display:flex;gap:8px;align-items:flex-start"><b style="font-size:13px;color:#64748B;width:14px">1</b><div style="position:relative">${P05TH({ w: 200, logo: true, cls: 'p5mst' })}${P05HOT(1)}</div></div>
   <div style="position:absolute;left:30px;top:130px;width:2px;height:280px;background:#CBD5E1"></div>
   <div style="display:flex;flex-direction:column;gap:9px;margin:10px 0 0 40px;position:relative">${['title', 'content', 'section'].map((k, i) => `<div style="position:relative">${P05TH({ w: 150, k, logo: k !== 'section' })}${i === 1 ? P05HOT(2) : ''}</div>`).join('')}</div></div>
  <div class="f" data-s="3" style="position:absolute;left:200px;top:444px;width:420px;padding:10px 14px;background:#1B2A41;color:#fff;border-radius:8px;font-size:15px;line-height:1.35;box-shadow:0 10px 30px -10px rgba(0,0,0,.5);z-index:3"><b>Titre et contenu</b> : utilisée par les diapositives 2 à 9, 12</div>
  <div style="position:absolute;left:290px;top:24px;width:720px;height:405px;background:#fff;box-shadow:0 10px 30px -14px rgba(14,23,38,.4)">
   <div class="p5ph" style="left:40px;top:30px;width:520px;height:70px;font-size:22px;color:#0C4A6E;font-weight:700">Cliquez pour modifier le style du titre</div>
   <span class="p5lg" style="right:28px;top:30px;font-size:20px">RIVAGE</span>
   <div class="p5ph" style="left:40px;top:120px;width:640px;height:210px;place-items:start;text-align:left;padding:16px 20px;font-size:18px;line-height:1.7">• Modifier les styles du texte du masque<br>&nbsp;&nbsp;– Deuxième niveau<br>&nbsp;&nbsp;&nbsp;&nbsp;» Troisième niveau</div>
   ${['Date', 'Pied de page', '‹N°›'].map((t, i) => `<div class="p5ph" style="left:${[40, 240, 560][i]}px;top:350px;width:${[160, 280, 120][i]}px;height:36px;font-size:14px">${t}</div>`).join('')}</div>` })}
<div class="col" style="position:absolute;left:1160px;right:70px;top:190px;gap:14px">
 ${CARD('<b>1 · Grande miniature</b><br>le <b>masque</b> : règles communes', 1)}${CARD('<b>2 · Petites miniatures</b><br>les <b>dispositions</b>', 2)}
 ${CARD('<b>3 · Survol</b><br>quelles diapos utilisent la disposition', 3)}${CARD('<b>4 · Fermer le mode Masque</b><br>retour au mode Normal', 4)}</div>`,
  n: `<p>Démo dans le vrai PowerPoint : <i>Affichage › Modes masque › Masque des diapositives</i>. Un nouvel onglet <b>Masque des diapositives</b> apparaît en tête du ruban.</p>
<p><b>Étape 1</b> : la <b>grande miniature</b> en haut du volet = le masque. Ce que vous y modifiez s'applique à toutes les dispositions rattachées (polices, couleurs, logo, positions).</p>
<p><b>Étape 2</b> : les <b>petites miniatures</b> en dessous, légèrement en retrait = les dispositions. Une modification ici ne concerne que les diapos qui utilisent cette disposition.</p>
<p><b>Étape 3</b> : astuce peu connue — survolez une disposition : l'info-bulle indique quelles diapositives l'utilisent. Très utile pour faire le ménage ensuite.</p>
<p><b>Étape 4</b> : <i>Fermer le mode Masque</i> pour revenir au mode Normal. Piège : beaucoup de stagiaires continuent à « travailler » en mode masque en croyant modifier une diapo. Repère : le texte affiché est « Cliquez pour modifier le style du titre ».</p>` },

/* 7 — OÙ FAIRE LA MODIFICATION */
{ title: 'Masque ou disposition ?', html: `${H('Masque ou disposition ?', 'Comprendre le masque')}
<div style="position:absolute;left:70px;top:180px;width:1000px"><table class="tbl">
 <tr><th>Modification souhaitée</th><th>Où la faire ?</th></tr>
 ${[['Police des titres de tout le deck', '🏛️ Masque · Polices'], ['Logo de l\'entreprise', '🏛️ Masque'], ['Couleurs de la charte', '🏛️ Masque · Couleurs'], ['Photo plein écran de la couverture', '📄 Disposition « Titre »'], ['Bandeau coloré des intertitres', '📄 Disposition « Titre de section »'], ['Un graphique sur la diapo 12', '🖊️ La diapo elle-même']].map(([a, b], i) => `<tr class="f" data-s="${i + 1}"><td>${a}</td><td><b>${b}</b></td></tr>`).join('')}
</table></div>
<svg viewBox="0 0 380 560" style="position:absolute;left:1130px;top:190px;width:380px;height:560px">
 <g class="a pop" style="--d:.3s"><rect x="90" y="10" width="200" height="112" rx="10" fill="#fff" stroke="#C43E1C" stroke-width="4"/><text x="190" y="75" text-anchor="middle" font-size="22" font-weight="900" fill="#C43E1C">MASQUE</text></g>
 <path d="M190 124 V200" stroke="#94A3B8" stroke-width="4" class="draw" pathLength="1" style="--d:.6s"/>
 <g class="a pop" style="--d:.8s"><rect x="110" y="200" width="160" height="90" rx="8" fill="#fff" stroke="#94A3B8" stroke-width="3"/><text x="190" y="252" text-anchor="middle" font-size="19" font-weight="800" fill="#33445E">Disposition</text></g>
 <path d="M190 292 V370" stroke="#CBD5E1" stroke-width="4" class="draw" pathLength="1" style="--d:1s"/>
 <g class="a pop" style="--d:1.2s"><rect x="130" y="370" width="120" height="68" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="3"/><text x="190" y="410" text-anchor="middle" font-size="17" font-weight="800" fill="#6B7A90">Diapo</text></g>
 <text x="190" y="490" text-anchor="middle" font-size="18" font-weight="700" fill="#33445E">Plus c'est haut,</text><text x="190" y="516" text-anchor="middle" font-size="18" font-weight="700" fill="#33445E">plus ça se propage</text>
</svg>`,
  n: `<p>Exercice oral : avant chaque clic, demandez au groupe « Où feriez-vous cette modification ? », puis révélez la réponse.</p>
<p><b>1 à 3</b> : tout ce qui concerne <b>l'ensemble</b> du deck (police des titres, logo, couleurs) se fait sur le <b>masque</b>. Les menus <i>Couleurs</i> et <i>Polices</i> sont dans le groupe <i>Arrière-plan</i> de l'onglet Masque des diapositives.</p>
<p><b>4 et 5</b> : ce qui est propre à un <b>type</b> de diapo (photo de couverture, bandeau des intertitres) se fait sur la <b>disposition</b> correspondante.</p>
<p><b>6</b> : le contenu propre à une diapo reste sur la diapo. Le masque n'est pas fait pour le contenu.</p>
<p>Le schéma de droite résume : plus la modification est haute dans la hiérarchie, plus elle se propage.</p>` },

/* 8 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP05, 1), n: `<p>Deuxième partie : <b>créer des dispositions sur mesure</b> — c'est ce qui transforme un thème en vrai modèle d'entreprise.</p>` },

/* 9 — CRÉER UNE DISPOSITION */
{ title: 'Créer une disposition', html: `${H('Créer une disposition sur mesure', 'Dispositions')}
${PROC([{ p: 'Modifier le masque > Insérer une disposition', t: 'Une disposition vierge s\'ajoute' }, { p: 'Insérer un espace réservé > Texte', t: 'Tracez la zone du chiffre, en 72 pt' }, { p: 'Clic droit > Renommer la disposition', t: 'Un nom parlant : « Chiffre clé »' }, { p: 'Texte d\'invite', t: '« Saisir le chiffre clé, ex. +12 % »' }], { w: 640, gap: 16 })}
<div class="a pop" style="--d:.3s;position:absolute;left:760px;top:200px;width:770px;height:433px;background:#fff;border-radius:10px;box-shadow:0 30px 60px -25px rgba(14,23,38,.5),0 0 0 1px rgba(14,23,38,.1)">
 <div class="p5ph" style="left:40px;top:28px;width:540px;height:64px;font-size:21px;color:#0C4A6E;font-weight:700">Cliquez pour modifier le style du titre</div>
 <span class="p5lg" style="right:28px;top:30px;font-size:20px">RIVAGE</span>
 <div class="p5ph p5typ f zoom" data-s="2" style="left:135px;top:130px;width:500px;height:190px;font-size:76px;font-weight:900"><span class="f" data-s="4" style="font-size:24px;font-weight:600;color:#64748B">Saisir le chiffre clé, ex. +12 %</span></div>
 ${['Date', 'Pied de page', '‹N°›'].map((t, i) => `<div class="p5ph" style="left:${[40, 250, 610][i]}px;top:376px;width:${[170, 300, 120][i]}px;height:36px;font-size:14px">${t}</div>`).join('')}
</div>
<div class="chip dark f" data-s="1" style="position:absolute;left:760px;top:654px">📄 Nouvelle disposition</div>
<div class="chip f" data-s="3" style="position:absolute;left:1010px;top:654px;font-size:20px">Disposition : « Chiffre clé »</div>
${TIP('Le <b>texte d\'invite</b> guide les collègues : ils savent quoi saisir.', { s: 4, x: 760, y: 712, w: 770 })}`,
  n: `<p>Démo en direct, en mode masque.</p>
<p><b>Étape 1</b> : <i>Insérer une disposition</i> (groupe Modifier le masque). PowerPoint ajoute une disposition avec un titre et les zones de pied de page héritées du masque — le logo est déjà là.</p>
<p><b>Étape 2</b> : <i>Insérer un espace réservé › Texte</i>, puis tracez la zone. Mettez le texte en 72 pt gras, centré : c'est la zone qui accueillera le chiffre.</p>
<p><b>Étape 3</b> : clic droit sur la miniature › <i>Renommer la disposition</i> : « Chiffre clé ». Ce nom apparaîtra dans <i>Accueil › Disposition</i> pour tous les utilisateurs du modèle.</p>
<p><b>Étape 4</b> : remplacez le texte de l'espace réservé par une invite explicite : « Saisir le chiffre clé, ex. +12 % ». Ce texte n'apparaît jamais en diaporama tant qu'il n'est pas remplacé.</p>
<p>C'est exactement la tâche 3 du Lab 2.</p>` },

/* 10 — TYPES D'ESPACES RÉSERVÉS */
{ title: 'Les espaces réservés', html: `${H('Dix types d\'espaces réservés', 'Dispositions', PATH('Mise en page du masque > Insérer un espace réservé'))}
<div class="p5menu a pop" style="--d:.2s;left:70px;top:180px;width:340px">
 ${[['▦', 'Contenu'], ['▥', 'Contenu (vertical)'], ['A', 'Texte'], ['Ａ', 'Texte (vertical)'], ['🖼️', 'Image'], ['📊', 'Graphique'], ['▦', 'Tableau'], ['🔷', 'SmartArt'], ['🎬', 'Média'], ['🌐', 'Images en ligne']].map(([i, t]) => { const s = { Image: 1, Texte: 2, Contenu: 3 }[t]; return `<div class="${s ? 'p5sel' : ''}" ${s ? `data-s="${s}"` : ''}><i>${i}</i>${t}${s ? P05HOT(s) : ''}</div>`; }).join('')}
</div>
<div class="a pop" style="--d:.35s;position:absolute;left:480px;top:180px;width:780px;height:439px;background:#fff;border-radius:10px;box-shadow:0 30px 60px -25px rgba(14,23,38,.5),0 0 0 1px rgba(14,23,38,.1)">
 <div class="p5ph" style="left:40px;top:26px;width:540px;height:60px;font-size:21px;color:#0C4A6E;font-weight:700">Titre : « Ils nous font confiance »</div>
 <div class="p5ph p5typ f zoom" data-s="1" style="left:50px;top:120px;width:220px;height:220px;border-radius:50%;font-size:46px">🖼️<small style="display:block;font-size:15px">Image</small></div>
 <div class="p5ph p5typ f zoom" data-s="2" style="left:310px;top:120px;width:420px;height:140px;font-size:22px;font-style:italic">« Saisir la citation du client »</div>
 <div class="p5ph p5typ f zoom" data-s="3" style="left:310px;top:280px;width:420px;height:60px;font-size:18px">Nom, fonction, entreprise</div>
</div>
<div class="chip f" data-s="3" style="position:absolute;left:480px;top:640px;font-size:20px">Disposition : « Témoignage »</div>
<div class="col" style="position:absolute;left:1290px;right:70px;top:190px;gap:14px">${CARD('<b>Image</b><br>photo recadrée', 1)}${CARD('<b>Texte</b><br>citation', 2)}${CARD('<b>Contenu</b><br>texte, tableau, graphique…', 3)}</div>`,
  n: `<p>Le menu <i>Insérer un espace réservé</i> propose dix types. Le plus polyvalent est <b>Contenu</b> (il accepte texte, tableau, graphique, SmartArt, image, vidéo via ses six petites icônes).</p>
<p><b>Étape 1</b> : un espace réservé <b>Image</b> — ici rond (on peut le dessiner puis changer la forme avec <i>Format de forme › Modifier la forme</i>).</p>
<p><b>Étape 2</b> : un espace réservé <b>Texte</b> pour la citation, en italique, avec son invite.</p>
<p><b>Étape 3</b> : un second Texte (ou Contenu) pour la signature. On renomme la disposition « Témoignage ».</p>
<p>Exemple métier : une disposition Témoignage garantit que les 15 témoignages clients du deck commercial ont exactement la même mise en page, quel que soit l'auteur de la diapo.</p>` },

/* 11 — ESPACE RÉSERVÉ IMAGE */
{ title: 'L\'espace réservé Image', html: `${H('Fini les photos déformées', 'Dispositions')}
${VS({ y: 175, l: { t: 'Image insérée librement', c: '#DC2626', ic: '✘', html: `<div style="position:relative;height:330px">
   ${[[10, 40, 160, 150, 'étirée', '1.45,.75'], [250, 70, 110, 140, 'trop petite', ''], [390, 10, 180, 220, 'décalée', '']].map(([x, y, w, h, t, sc]) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:6px;overflow:hidden;background:linear-gradient(160deg,#FDE68A,#F59E0B 55%,#B45309);${sc ? `transform:scale(${sc});transform-origin:0 0` : ''}"><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="50" cy="38" r="17" fill="#7C2D12" opacity=".75"/><path d="M15 100 C 20 66, 80 66, 85 100Z" fill="#7C2D12" opacity=".75"/></svg></div><span class="chip bad" style="position:absolute;left:${x}px;top:${y + h * (sc ? .75 : 1) + 12}px">${t}</span>`).join('')}</div>` },
  r: { t: 'Espace réservé Image', c: '#16A34A', ic: '✔', html: `<div style="position:relative;height:330px;display:flex;gap:24px;padding-top:30px">
   ${[0, 1, 2].map(i => `<div style="position:relative;width:180px;height:180px;border-radius:50%;overflow:hidden;background:linear-gradient(160deg,#FDE68A,#F59E0B 55%,#B45309);box-shadow:0 0 0 4px #fff,0 0 0 6px #16A34A"><svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="50" cy="40" r="17" fill="#7C2D12" opacity=".75"/><path d="M15 100 C 20 66, 80 66, 85 100Z" fill="#7C2D12" opacity=".75"/></svg></div>`).join('')}
   <span class="chip ok" style="position:absolute;left:0;top:240px;font-size:18px">Recadrée automatiquement · même taille · même position</span></div>` }, mid: '➜' })}
${TIP('Pour ajuster le cadrage : <b>Format de l\'image › Rogner</b>, puis faites glisser la photo dans le cadre.', { s: 3, y: 690, w: 1460 })}`,
  n: `<p><b>Étape 1</b> : à gauche, ce qui arrive quand chacun insère ses photos « à la main » : une image étirée (déformée en tirant une poignée latérale), une trop petite, une décalée. Sur un trombinoscope de 12 personnes, le résultat est vite amateur.</p>
<p><b>Étape 2</b> : à droite, avec un <b>espace réservé Image</b> dans la disposition : on clique sur l'icône de l'espace réservé, on choisit la photo, et elle <b>remplit le cadre</b>, recadrée automatiquement, à la taille et à la position prévues. Toutes les photos sont homogènes.</p>
<p><b>Étape 3</b> : si le visage est mal centré, <i>Format de l'image › Rogner</i> permet de faire glisser la photo dans le cadre sans la déformer.</p>
<p>Question au groupe : « Dans vos présentations, quelles diapos reviennent avec des photos ? » (équipe, références, produits…) → candidates idéales pour une disposition avec espace réservé Image.</p>` },

/* 12 — GALERIE DES DISPOSITIONS */
{ title: 'Des dispositions bien nommées', html: `${H('Des dispositions bien nommées', 'Dispositions', PATH('Accueil > Diapositives > Disposition'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:1000px;background:#fff;border-radius:14px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45),0 0 0 1px #CBD5E1;padding:16px 20px">
 <div style="font-size:16px;font-weight:800;color:#64748B;margin-bottom:12px">Charte Rivage</div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px 16px">
 ${[['title', 'Diapositive de titre'], ['content', 'Titre et contenu'], ['section', 'Titre de section'], ['two', 'Deux contenus'], ['num', 'Chiffre clé', 1], ['quote', 'Témoignage', 2], ['three', '3 colonnes', 3], ['photo', 'Photo plein écran', 4]].map(([k, t, s]) => `<div style="text-align:center;position:relative" ${s ? `class="f zoom" data-s="${s}"` : ''}>${P05TH({ w: 220, k, logo: k !== 'section' && k !== 'photo' })}<div style="font-size:17px;font-weight:${s ? 800 : 600};margin-top:6px;color:${s ? '#C43E1C' : '#33445E'}">${t}</div></div>`).join('')}
 </div></div>
<div class="col" style="position:absolute;left:1110px;right:70px;top:190px;gap:16px">
 ${CARD('🏷️ Un <b>nom métier</b>, pas « Disposition personnalisée 3 »', 1)}${CARD('💬 Une <b>invite</b> dans chaque espace réservé', 2)}${CARD('📐 Des positions <b>alignées sur la grille</b> (Maj+F9)', 3)}${CARD('🖼️ Une variante <b>sans logo</b> pour les photos plein écran', 4)}</div>`,
  n: `<p>Voici ce que voient les utilisateurs du modèle dans <i>Accueil › Disposition</i> : la galerie des dispositions du masque.</p>
<p><b>Étapes 1 à 3</b> : nos dispositions personnalisées apparaissent avec un <b>nom métier</b> (« Chiffre clé », « Témoignage », « 3 colonnes »). Sans renommage, elles s'appelleraient « Disposition personnalisée », « 1_Disposition personnalisée »… illisible.</p>
<p><b>Étape 4</b> : une disposition « Photo plein écran » sans logo — on verra plus loin comment masquer les graphiques d'arrière-plan.</p>
<p>Pour placer précisément les espaces réservés, affichez la grille (<b>Maj+F9</b>) et les repères (<b>Alt+F9</b>) en mode masque.</p>` },

/* 13 — FAIRE LE MÉNAGE */
{ title: 'Faire le ménage', html: `${H('Un masque lisible : faites le ménage', 'Dispositions')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:700px;padding:18px;background:#F3F4F6;border-radius:14px;box-shadow:0 0 0 1px #E3E8EF">
 <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">
 ${Array.from({ length: 25 }, (_, i) => { const keep = [0, 1, 2, 3, 6, 11, 17].includes(i); const k = ['title', 'content', 'section', 'two', 'content', 'two', 'num', 'content', 'title', 'two', 'content', 'quote', 'content', 'title', 'section', 'content', 'two', 'three', 'content', 'two', 'title', 'content', 'section', 'two', 'content'][i];
   return `<div style="position:relative">${P05TH({ w: 120, k, logo: k !== 'section' })}${keep ? '' : `<div class="p5x" data-s="2">✕</div>`}</div>`; }).join('')}
 </div></div>
<div class="chip bad a pop" style="position:absolute;left:800px;top:190px;--d:.4s;font-size:20px">25 dispositions : personne ne s'y retrouve</div>
${PROC([{ p: 'Survol de la disposition', t: 'Info-bulle : « utilisée par : aucune diapositive »' }, { p: 'Clic droit > Supprimer la disposition', t: 'On garde 7 dispositions utiles' }], { x: 800, y: 250, w: 730, s0: 1 })}
${TIP('Une disposition <b>utilisée</b> par une diapo ne peut pas être supprimée : changez d\'abord la disposition de la diapo.', { s: 3, kind: 'warn', x: 800, y: 560, w: 730 })}`,
  n: `<p>Un masque hérité de plusieurs générations de decks accumule souvent des dizaines de dispositions : la galerie <i>Disposition</i> devient illisible et les collègues choisissent au hasard.</p>
<p><b>Étape 1</b> : survolez chaque disposition en mode masque. L'info-bulle indique « utilisée par : aucune diapositive » ou la liste des diapos concernées.</p>
<p><b>Étape 2</b> : clic droit › <i>Supprimer la disposition</i> sur toutes celles qui sont inutiles. On garde une petite dizaine de dispositions vraiment utiles.</p>
<p><b>Étape 3</b> : piège — l'option Supprimer est grisée si la disposition est utilisée. Il faut d'abord affecter une autre disposition aux diapos concernées (<i>Accueil › Disposition</i>), puis revenir au masque.</p>
<p>Faites ce ménage <b>avant</b> de diffuser le modèle : c'est la tâche 4 du Lab 2.</p>` },

/* 14 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP05, 2), n: `<p>Troisième partie : les éléments communs (pied de page, numéros, logo) et l'enregistrement du <b>modèle .potx</b> pour toute l'entreprise.</p>` },

/* 15 — EN-TÊTE / PIED DE PAGE */
{ title: 'Pied de page et numéros', html: `${H('Activer pied de page et numéros', 'Pied de page, numéros et logo', PATH('Insertion > Texte > En-tête/Pied de page'))}
<div class="p5dlg a pop" style="--d:.2s;left:70px;top:180px;width:760px">
 <header>En-tête et pied de page</header>
 <div style="display:flex;gap:4px;padding:10px 18px 0;font-size:16px;border-bottom:1px solid #E3E8EF"><span style="padding:6px 14px;border-bottom:3px solid #C43E1C;font-weight:700">Diapositive</span><span style="padding:6px 14px;color:#64748B">Commentaires et documents</span></div>
 <div style="padding:14px 26px 20px">
  <div style="font-size:16px;font-weight:700;color:#64748B;margin-bottom:4px">Inclure sur la diapositive</div>
  ${P05CK('Date et heure', 0)}
  <div style="margin-left:36px;font-size:16px;color:#94A3B8">◯ Mise à jour automatique &nbsp; ◯ Fixe</div>
  ${P05CK('Numéro de diapositive', 1)}
  <div class="p5row">${`<span class="p5box"><b class="f zoom" data-s="2">✔</b></span>`}Pied de page<div class="p5in" style="margin-left:6px"><b class="tw f" data-s="2" style="--n:34;font-weight:600;border-color:#C43E1C">Confidentiel — Assurances Rivage</b></div></div>
  ${P05CK('<b>Ne pas afficher sur la diapositive titre</b>', 3, 3)}
  <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:16px"><span class="p5btn">Appliquer</span><span class="p5btn pri">Appliquer partout${P05HOT(4)}</span><span class="p5btn">Annuler</span></div>
 </div></div>
<div class="p5lbl a fade" style="--d:.5s;left:880px;top:182px;width:650px;text-align:left">Aperçu</div>
${P05TH({ w: 300, k: 'title', logo: true, pos: 'position:absolute;left:880px;top:220px' })}
${P05TH({ w: 300, k: 'content', logo: true, pos: 'position:absolute;left:1220px;top:220px', extra: `<b class="f" data-s="2" style="position:absolute;left:8%;top:88%;font-size:11px;color:#64748B">Confidentiel — Assurances Rivage</b><b class="f" data-s="1" style="position:absolute;right:5%;top:87%;font-size:13px;color:#C43E1C;font-weight:900">14</b>` })}
<div class="chip ok f" data-s="3" style="position:absolute;left:880px;top:400px">Couverture : rien</div><div class="chip f" data-s="2" style="position:absolute;left:1220px;top:400px">Autres diapos : pied + n°</div>
${TIP('« Revenons à la <b>14</b> » vaut mieux que « la diapo bleue avec le camembert ».', { s: 5, x: 880, y: 480, w: 650 })}`,
  n: `<p>Les zones Date, Pied de page et Numéro existent déjà sur le masque, mais elles sont <b>désactivées</b>. On les active ici : <i>Insertion › Texte › En-tête/Pied de page</i>.</p>
<p><b>Étape 1</b> : cochez <b>Numéro de diapositive</b> → le « 14 » apparaît en bas à droite.</p>
<p><b>Étape 2</b> : cochez <b>Pied de page</b> et saisissez « Confidentiel — Assurances Rivage ».</p>
<p><b>Étape 3</b> : l'option qu'on oublie toujours : <b>Ne pas afficher sur la diapositive titre</b>. Sans elle, la couverture affiche « 1 » et le pied de page.</p>
<p><b>Étape 4</b> : <b>Appliquer partout</b> (et non Appliquer, qui ne concerne que la diapo sélectionnée).</p>
<p><b>Étape 5</b> : l'argument pour convaincre : en réunion ou en visio, le numéro de diapo permet de se repérer. Pour changer la police ou la position du numéro, c'est sur le masque qu'il faut aller (zone ‹N°›).</p>` },

/* 16 — LOGO ET ARRIÈRE-PLAN */
{ title: 'Le logo sur le masque', html: `${H('Le logo : sur le masque, pas sur les diapos', 'Pied de page, numéros et logo')}
${P05TH({ w: 360, k: 'content', logo: true, s: 1, cls: 'f zoom', pos: 'position:absolute;left:70px;top:230px' })}
<div class="p5lbl f" data-s="1" style="left:70px;top:440px;width:360px">MASQUE · logo en haut à droite</div>
<svg class="f" data-s="2" viewBox="0 0 160 300" style="position:absolute;left:440px;top:200px;width:160px;height:300px;overflow:visible">
 ${[40, 150, 260].map((y, i) => `<path d="M0 130 C 80 130, 80 ${y}, 150 ${y}" fill="none" stroke="#94A3B8" stroke-width="4" class="draw" pathLength="1" style="--d:${i * .12}s"/>`).join('')}</svg>
<div class="f" data-s="2" style="position:absolute;left:610px;top:180px;display:flex;flex-direction:column;gap:18px">
 ${P05TH({ w: 170, k: 'title', logo: true })}${P05TH({ w: 170, k: 'two', logo: true })}
 ${P05TH({ w: 170, k: 'photo', logo: true })}</div>
<div class="p5dlg f" data-s="3" style="left:860px;top:200px;width:670px">
 <header>Mettre en forme l'arrière-plan</header>
 <div style="padding:14px 22px 18px">
  <div class="p5row"><span>◉ Remplissage avec image ou texture</span></div>
  ${P05CK('<b>Masquer les graphiques d\'arrière-plan</b>', 4, 4)}
  <div style="font-size:16px;color:#64748B;margin-top:6px">Disposition « Photo plein écran » : la photo n'est pas gâchée par le logo</div></div></div>
<div class="f" data-s="4" style="position:absolute;left:860px;top:430px;display:flex;align-items:center;gap:24px">${P05TH({ w: 300, k: 'photo' })}<span class="chip ok" style="font-size:18px">✔ Sans logo</span></div>
${TIP('Logo à <b>taille raisonnable</b> : il signe la diapo, il ne la domine pas.', { s: 5, x: 860, y: 650, w: 670 })}`,
  n: `<p><b>Étape 1</b> : le logo se colle <b>une fois</b>, sur la grande miniature (le masque), en haut ou en bas, à taille raisonnable. Erreur fréquente : le coller sur une disposition seulement — il manque alors sur les autres.</p>
<p><b>Étape 2</b> : toutes les dispositions en héritent automatiquement.</p>
<p><b>Étape 3</b> : mais sur une diapo « Photo plein écran », le logo gêne. Sur cette disposition : clic droit sur l'arrière-plan › <i>Mettre en forme l'arrière-plan</i>…</p>
<p><b>Étape 4</b> : … et cochez <b>Masquer les graphiques d'arrière-plan</b>. Les éléments graphiques du masque (logo, bandeaux) disparaissent de cette disposition uniquement. La case existe aussi directement dans l'onglet Masque des diapositives, groupe Arrière-plan.</p>
<p><b>Étape 5</b> : conseil de design — le logo signe, il ne domine pas. En général, 5 à 8 % de la largeur de la diapo suffit.</p>` },

/* 17 — ENREGISTRER EN .POTX */
{ title: 'Enregistrer un modèle .potx', html: `${H('Enregistrer le modèle .potx', 'Le modèle d\'entreprise', PATH('Fichier > Enregistrer sous > Modèle PowerPoint (*.potx)'))}
<div class="p5dlg a pop" style="--d:.2s;left:70px;top:190px;width:700px">
 <header>Enregistrer sous</header>
 <div style="padding:16px 22px 20px;display:flex;flex-direction:column;gap:12px;font-size:18px">
  <div style="color:#64748B;font-size:16px">📁 Documents › <b style="color:#1B2A41">Modèles Office personnalisés</b></div>
  <div class="p5row" style="gap:10px"><span style="width:90px;color:#64748B">Nom :</span><div class="p5in">Charte Rivage 2026</div></div>
  <div class="p5row" style="gap:10px"><span style="width:90px;color:#64748B">Type :</span><div class="p5in" style="position:relative;font-weight:700">Modèle PowerPoint (*.potx) ▾${P05HOT(1)}</div></div>
  <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:6px"><span class="p5btn pri">Enregistrer</span><span class="p5btn">Annuler</span></div></div></div>
${FLOW({ x: 830, y: 170, w: 700, h: 600,
  n: { t: { x: 150, y: 290, ic: 'tpl', sz: 96, l: 'Charte Rivage 2026.potx', sub: 'le modèle reste intact', s: 2, hot: true },
       a: { x: 540, y: 110, ic: 'pptx', sz: 84, l: 'Présentation1', sub: 'nouvelle, sans titre', s: 3 },
       b: { x: 540, y: 430, ic: 'pptx', sz: 84, l: 'Présentation2', sub: 'nouvelle, sans titre', s: 4 } },
  l: [{ a: 't', b: 'a', r: 'hvh', s: 3, lab: 'Ouvrir', lx: 410, ly: 110 }, { a: 't', b: 'b', r: 'hvh', s: 4, lab: 'Ouvrir', lx: 410, ly: 430 }] })}
${TIP('Pour <b>modifier</b> le modèle lui-même : clic droit sur le .potx › <b>Ouvrir</b> (et non double-clic).', { s: 5, x: 70, y: 520, w: 700, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : <i>Fichier › Enregistrer sous</i>, type <b>Modèle PowerPoint (*.potx)</b>. PowerPoint bascule automatiquement vers le dossier <i>Documents › Modèles Office personnalisés</i>.</p>
<p><b>Étape 2</b> : le fichier .potx est le « moule ».</p>
<p><b>Étapes 3 et 4</b> : chaque double-clic sur le .potx crée une <b>nouvelle présentation sans titre</b> (Présentation1, Présentation2…) basée sur le modèle. Impossible d'écraser le modèle par erreur : c'est tout l'intérêt par rapport à un .pptx « à dupliquer ».</p>
<p><b>Étape 5</b> : pour retoucher le modèle lui-même, clic droit sur le fichier dans l'Explorateur › <i>Ouvrir</i>. Le titre de la fenêtre affiche alors le nom du .potx.</p>
<p>Démo : enregistrez votre masque en .potx, fermez, double-cliquez sur le .potx et montrez la barre de titre « Présentation1 ».</p>` },

/* 18 — DIFFUSER LE MODÈLE */
{ title: 'Diffuser le modèle', html: `${H('Diffuser le modèle à toute l\'équipe', 'Le modèle d\'entreprise')}
${FLOW({ x: 70, y: 170, w: 1460, h: 420,
  z: [{ x: 0, y: 0, w: 1000, h: 420, l: 'ORGANISATION · Microsoft 365', c: '#0369A1' }, { x: 1040, y: 0, w: 420, h: 420, l: 'PERSONNEL', c: '#7C3AED' }],
  n: { t: { x: 130, y: 200, ic: 'tpl', l: 'Modèle .potx', sub: 'validé par la com' },
       sp: { x: 470, y: 200, ic: 'sharepoint', sz: 96, l: 'Bibliothèque SharePoint', sub: 'modèles d\'organisation', s: 1, hot: true },
       u1: { x: 830, y: 100, ic: 'ppt', sz: 70, l: 'Fichier › Nouveau', s: 2 }, u2: { x: 830, y: 290, ic: 'ppt', sz: 70, l: 'onglet de l\'entreprise', s: 2 },
       p: { x: 1250, y: 200, ic: 'folder', sz: 90, l: 'Modèles personnels', sub: 'dossier par défaut', s: 3 } },
  l: [{ a: 't', b: 'sp', s: 1 }, { a: 'sp', b: 'u1', r: 'hvh', s: 2 }, { a: 'sp', b: 'u2', r: 'hvh', s: 2 }],
  p: [{ s: 2, keep: true, seg: [{ via: ['t', 'sp'], lab: '.potx', t: 1.6 }, { via: ['sp', 'u1'], t: 1.4 }] }] })}
<div style="position:absolute;left:70px;top:620px;width:1460px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
 ${CARD(`${PATH('Fichier > Options > Enregistrement > Dossier par défaut des modèles personnels')}<div style="margin-top:8px">Vos .potx apparaissent dans <b>Fichier › Nouveau › Personnel</b></div>`, 3, 'font-size:18px')}
 ${CARD(`${PATH('Création > Thèmes > Autres > Rechercher des thèmes')}<div style="margin-top:8px">Appliquer le .potx à un <b>deck existant</b></div>`, 4, 'font-size:18px')}</div>`,
  n: `<p>Un modèle n'a de valeur que s'il est <b>utilisé</b>. Deux modes de diffusion :</p>
<p><b>Étape 1 — Organisation</b> : dans Microsoft 365, l'administrateur publie les modèles dans une <b>bibliothèque SharePoint</b> déclarée comme « bibliothèque de ressources d'organisation ».</p>
<p><b>Étape 2</b> : les modèles apparaissent alors chez tout le monde dans <i>Fichier › Nouveau</i>, sous un onglet au nom de l'entreprise. Une mise à jour du modèle dans SharePoint est vue par tous.</p>
<p><b>Étape 3 — Personnel</b> : <i>Fichier › Options › Enregistrement › Dossier par défaut des modèles personnels</i> ; les .potx placés là apparaissent dans <i>Fichier › Nouveau › Personnel</i>.</p>
<p><b>Étape 4</b> : pour remettre un deck existant aux couleurs du modèle : <i>Création › Thèmes › Autres › Rechercher des thèmes</i>, choisir le .potx. Le masque est remplacé ; les diapos dont la disposition porte le même nom suivent. D'où l'importance de noms cohérents.</p>` },

/* 19 — PIÈGE DU DOUBLE MASQUE */
{ title: 'Le piège du double masque', html: `${H('Le piège du double masque', 'Le modèle d\'entreprise')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:290px;height:620px;background:#F3F4F6;border-radius:14px;box-shadow:0 0 0 1px #E3E8EF;padding:14px">
 <div style="font-size:15px;font-weight:800;color:#64748B;margin-bottom:10px">Volet du mode masque</div>
 ${P05TH({ w: 220, logo: true })}
 <div style="display:flex;flex-direction:column;gap:8px;margin:8px 0 0 30px">${P05TH({ w: 140, k: 'title', logo: true })}${P05TH({ w: 140, k: 'section' })}</div>
 <div class="f" data-s="1" style="margin-top:14px;position:relative">${P05TH({ w: 220, c: '#EA580C', extra: '<b style="position:absolute;right:6px;top:6px;font-size:11px;color:#EA580C;font-weight:900">ANCIEN</b>' })}<div class="p5ring" style="inset:-5px"></div>
  <div style="display:flex;flex-direction:column;gap:8px;margin:8px 0 0 30px">${P05TH({ w: 140, k: 'title', c: '#EA580C' })}</div></div></div>
<div class="callout f" data-s="1" style="left:390px;top:440px;width:330px;background:#DC2626">Collage brut : un <b>2<sup>e</sup> masque</b> importé</div>
<div class="p5dlg f zoom" data-s="2" style="left:760px;top:190px;width:770px">
 <header>Options de collage (Ctrl)</header>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:18px">
  ${[['🎨', 'Utiliser le thème de destination', 'ok', 3], ['🖌️', 'Conserver la mise en forme source', 'bad', 0], ['🖼️', 'Image', '', 0]].map(([i, t, c, h]) => `<div style="position:relative;text-align:center;padding:16px 10px;border-radius:10px;border:2px solid ${c === 'ok' ? '#16A34A' : '#E3E8EF'};background:${c === 'ok' ? '#ECFDF3' : '#fff'}"><div style="font-size:40px">${i}</div><div style="font-size:17px;font-weight:700;margin-top:6px">${t}</div>${h ? P05HOT(h) : ''}</div>`).join('')}
 </div></div>
${VS({ y: 470, l: { t: 'Conserver la source', c: '#DC2626', ic: '✘', items: ['2 masques, 2 chartes', 'Le deck « dérive »'] }, r: { t: 'Thème de destination', c: '#16A34A', ic: '✔', items: ['La diapo prend la charte', 'Un seul masque'] }, s1: 3, s2: 3 }).replace('left:70px;right:70px', 'left:760px;right:70px')}`,
  n: `<p>Le piège le plus courant avec les modèles : récupérer des diapos d'un ancien deck par copier-coller.</p>
<p><b>Étape 1</b> : selon l'option de collage, PowerPoint importe le <b>masque d'origine</b> avec les diapos. Dans le volet du mode masque, on voit alors deux masques (ici, l'ancien orange). Le deck mélange deux chartes, et chaque nouvelle diapo peut partir sur la mauvaise.</p>
<p><b>Étape 2</b> : après <b>Ctrl+V</b>, cliquez sur la petite icône <i>Options de collage</i> (ou appuyez sur Ctrl) : trois choix.</p>
<p><b>Étape 3</b> : choisissez <b>Utiliser le thème de destination</b> : la diapo collée adopte le masque et la charte du deck courant. « Conserver la mise en forme source » importe le second masque.</p>
<p>Réparation : en mode masque, supprimez le masque en trop après avoir réaffecté ses diapos à une disposition du bon masque. Vérifiez régulièrement le volet du mode masque.</p>` },

/* 20 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Le masque en 5 réflexes', k: 'Récap animé', hub: '1', hsub: 'masque pour tout le deck', hk: 'MASQUE',
  items: [{ ic: '🏛️', t: 'Masque = règles communes', d: 'Polices, couleurs, logo : une seule fois, sur la grande miniature' },
    { ic: '📄', t: 'Dispositions sur mesure', d: 'Espaces réservés, nom métier, texte d\'invite' },
    { ic: '🔢', t: 'Pied de page et numéros', d: 'Appliquer partout, sauf sur la diapositive titre' },
    { ic: '📦', t: 'Modèle .potx', d: 'S\'ouvre en présentation sans titre, diffusé via SharePoint' },
    { ic: '🎨', t: 'Thème de destination', d: 'Au collage, pour éviter un second masque' }] }),
  n: `<p>Récapitulatif en cinq réflexes. Faites-les réciter au groupe avant de révéler chaque carte : « Où met-on le logo ? », « Quelle option oublie-t-on dans le pied de page ? »…</p>` },

/* 21 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du concepteur de modèle', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Maj+F9', d: 'Afficher la grille' }, { k: 'Alt+F9', d: 'Afficher les repères' }, { k: 'Alt+F10', d: 'Volet Sélection' }, { k: 'Ctrl+Maj+C', d: 'Copier la mise en forme' }, { k: 'Ctrl+Maj+V', d: 'Coller la mise en forme' }, { k: 'Ctrl+Y', d: 'Répéter la dernière action' }], { cols: 3, y: 190 })}
${TIP('En mode masque, les repères ajoutés sont <b>verrouillés</b> pour tous les utilisateurs du modèle.', { s: 7, kind: 'key', y: 600, w: 900 })}`,
  n: `<p><b>Maj+F9</b> et <b>Alt+F9</b> affichent grille et repères : indispensables pour aligner les espaces réservés des dispositions.</p>
<p><b>Alt+F10</b> ouvre le volet Sélection : on y voit et renomme les espaces réservés (utile pour l'accessibilité et la Morphose, module 7).</p>
<p><b>Ctrl+Maj+C / Ctrl+Maj+V</b> copient-collent une mise en forme d'un espace réservé à l'autre. <b>Ctrl+Y</b> répète la dernière action (par exemple « insérer une disposition »).</p>
<p>Astuce : des repères ajoutés en mode masque apparaissent sur toutes les diapos mais ne peuvent pas être déplacés en mode Normal — parfait pour imposer des marges.</p>` },

/* 22 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'ppt', mod: 'p05', lab: 0, title: 'Lab 1 — Remettre un deck dans la charte', tasks: ['Appliquez le thème de la charte : <b>ocean</b>', '« Partie 2 — Déploiement » → disposition <b>Titre de section</b>', 'Comparatif → <b>Deux contenus</b> : Essentielle / Confort', 'Sous-titre de la diapo 1 : ajoutez l\'année <b>2026</b>'] }),
  n: `<p>Scénario : chez <b>Assurances Rivage</b>, un commercial a présenté son deck « à sa façon ». On le remet aux normes <b>en utilisant les dispositions</b>, pas en redessinant.</p>
<p>Solution : 1) <i>Création › Thèmes › ocean</i>. 2) Diapo 2 : <i>Disposition › Titre de section</i>. 3) Diapo 3 : <i>Disposition › Deux contenus</i>, « Essentielle — 18 €/mois : dégâts des eaux, incendie » à gauche, « Confort — 29 €/mois : + vol, + bris de glace » à droite. 4) Sous-titre : « Réunion commerciale — mai 2026 ».</p>
<p>Point d'attention : la tâche 3 vérifie que chaque colonne ne contient qu'une formule.</p>` },

/* 23 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'ppt', mod: 'p05', lab: 1, title: 'Lab 2 — Le modèle .potx de l\'entreprise', tasks: ['Masque : <b>polices</b> et palette bleue (<b>Couleurs</b>)', 'Logo « RIVAGE » sur le <b>masque</b> (grande miniature)', 'Disposition <b>Chiffre clé</b> : texte 72 pt + invite', 'Supprimez <b>3 dispositions</b> inutiles, fermez le masque', 'Pied de page + n°, <b>sauf diapo titre</b>, Appliquer partout', 'Enregistrez en <b>.potx</b> et rouvrez-le'] }),
  n: `<p>Ce lab se fait dans le <b>vrai PowerPoint</b> : la plateforme sert de check-list (les tâches se cochent à la main).</p>
<p>Points de vigilance : le logo doit être sur la <b>grande</b> miniature ; la disposition « Chiffre clé » doit être <b>renommée</b> (clic droit › Renommer la disposition) ; une disposition utilisée ne peut pas être supprimée.</p>
<p>Validation : en rouvrant le .potx par double-clic, la barre de titre doit afficher « Présentation1 ». Faites vérifier par le voisin : <i>Accueil › Disposition</i> doit montrer « Chiffre clé ».</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Où modifier la police des titres pour toutes les diapositives d\'un coup ?', o: ['Sur chaque diapo', 'Sur la grande miniature du masque des diapositives', 'Dans Fichier › Options', 'Dans le volet Notes'], a: [1], e: 'La grande miniature est le masque : ses réglages se propagent à toutes les dispositions et diapositives.' },
  { q: 'Quel est l\'intérêt d\'un espace réservé Image dans une disposition ?', o: ['Il compresse l\'image', 'Il recadre automatiquement l\'image à la bonne taille et position', 'Il ajoute un texte de remplacement', 'Il anime l\'image'], a: [1], e: 'L\'image insérée remplit l\'espace réservé, recadrée : toutes les photos sont homogènes.' },
  { q: 'Quelle option oublie-t-on souvent dans En-tête/Pied de page ?', o: ['Appliquer', 'Ne pas afficher sur la diapositive titre', 'Date fixe', 'Aperçu'], a: [1], e: 'Sans elle, le numéro « 1 » et le pied de page s\'affichent sur la couverture.' },
  { q: 'Que se passe-t-il quand on double-clique sur un fichier .potx ?', o: ['On modifie le modèle', 'Une nouvelle présentation sans titre basée sur le modèle est créée', 'Il s\'ouvre en lecture seule', 'Il lance le diaporama'], a: [1], e: 'C\'est le comportement d\'un modèle : le fichier d\'origine reste intact.' },
  { q: 'Vous collez des diapos d\'un ancien deck et le volet masque montre deux masques. Comment l\'éviter ?', o: ['Coller avec Conserver la mise en forme source', 'Coller avec Utiliser le thème de destination', 'Coller en image', 'Renommer le fichier'], a: [1], e: 'Utiliser le thème de destination adapte les diapos au masque courant au lieu d\'importer le masque d\'origine.' },
  { q: 'Sur une disposition « Photo plein écran », comment retirer le logo hérité du masque ?', o: ['Supprimer le logo du masque', 'Cocher Masquer les graphiques d\'arrière-plan sur cette disposition', 'Mettre la photo au premier plan', 'Rogner le logo'], a: [1], e: 'L\'option masque les éléments graphiques du masque sur cette seule disposition.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b · 5) b · 6) b.</p><p>Si la question 4 pose problème, refaites la démo du double-clic sur un .potx.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P05', html: END(), n: `<p>Fin du module 5. Votre charte est maintenant industrialisée : masque, dispositions, modèle .potx.</p><p>Prochain module : <b>Présenter</b> — mode présentateur, notes, minutage et pilotage au clavier.</p>` },
] };
