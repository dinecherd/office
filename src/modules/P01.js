/* ===================== MODULE P01 — Premiers pas : interface, diapositives et dispositions ===================== */
const SECSP01 = ['L\'interface de PowerPoint', 'Construire avec les dispositions', 'Saisir, afficher, projeter'];

/* ---- styles locaux du module (préfixe p1-) ---- */
(function () {
  if (document.getElementById('cssP01')) return;
  const s = document.createElement('style'); s.id = 'cssP01';
  s.textContent = `
.p1-ed{position:absolute;inset:0;display:flex;flex-direction:column}
.p1-row{flex:1;display:flex;min-height:0}
.p1-th{position:relative;width:150px;flex:none;background:#F3F4F6;border-right:1px solid #E3E8EF;padding:12px 8px;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.p1-tb{display:flex;gap:6px;align-items:flex-start;font:700 11px var(--font);color:#6B7A90}
.p1-tb>div{border-radius:4px;box-shadow:0 0 0 1px #CBD5E1;overflow:hidden;line-height:0}
.p1-tb.sel>div{box-shadow:0 0 0 3px #C43E1C}
.p1-sec{font:800 11px var(--font);color:#C43E1C;letter-spacing:.04em;margin:2px 0 -4px}
.p1-main{position:relative;flex:1;display:flex;align-items:center;justify-content:center;min-width:0}
.p1-notes{position:relative;flex:none;height:46px;border-top:1px solid #E3E8EF;background:#fff;padding:8px 16px;font-size:13px;color:#6B7A90}
.p1-sb{position:relative;flex:none;height:28px;background:#F3F4F6;border-top:1px solid #E3E8EF;display:flex;align-items:center;gap:14px;padding:0 14px;font-size:12px;color:#33445E}
.p1-sb .sp{flex:1}
.p1-sb span.v{position:relative;padding:1px 6px;border-radius:4px}
.p1-zn{position:absolute;inset:3px;border:3px solid #FA582D;border-radius:8px;background:rgba(250,88,45,.08);pointer-events:none;z-index:3}
.p1-zn b{position:absolute;left:8px;top:6px;width:30px;height:30px;border-radius:50%;background:#FA582D;color:#fff;font:800 16px/30px var(--font);text-align:center}
.p1-rel{position:relative;display:inline-block}
.p1-k{display:flex;align-items:center;gap:16px;padding:14px 20px}
.p1-k .kk kbd{font-size:18px;padding:6px 12px}
.p1-k span.d{font-size:21px;font-weight:700}
.p1-k small{display:block;font-size:17px;color:#6B7A90;font-weight:600}
.p1-ro{position:relative;width:300px;height:560px}
.p1-ro .t{position:absolute;left:24px;transition:top .9s cubic-bezier(.6,0,.2,1),box-shadow .4s,scale .4s}
.p1-ro .t b{position:absolute;left:-26px;top:4px;font:800 16px var(--font);color:#6B7A90}
.p1-ro .t>div{border-radius:6px;overflow:hidden;line-height:0;box-shadow:0 0 0 1px #CBD5E1,0 10px 20px -12px rgba(0,0,0,.4)}
.p1-ro[data-st="1"] .mv>div,.p1-ro[data-st="2"] .mv>div{box-shadow:0 0 0 4px #FA582D,0 24px 40px -16px rgba(250,88,45,.7)}
.p1-ro[data-st="1"] .mv{scale:1.06}
.p1-bl{position:relative;width:820px;height:461px;background:#fff;border-radius:12px;box-shadow:0 30px 60px -25px rgba(14,23,38,.5),0 0 0 1px rgba(14,23,38,.1);font-family:"Segoe UI",var(--font)}
.p1-li{position:absolute;left:60px;font-size:26px;color:#1B2A41;transition:left .7s cubic-bezier(.6,0,.2,1),font-size .7s,opacity .5s;padding-left:28px}
.p1-li::before{content:"";position:absolute;left:0;top:12px;width:12px;height:12px;border-radius:3px;background:#C43E1C}
.p1-li.l2{left:120px;font-size:22px;color:#33445E}
.p1-li.l2::before{border-radius:50%;background:#FF8F6B}
.p1-bl .hid{opacity:0}
.p1-shr{animation:p1shr 3.2s ease-in-out infinite alternate}
@keyframes p1shr{0%,20%{font-size:20px}100%{font-size:11px}}
.p1-mv{animation:p1mv 4s cubic-bezier(.6,0,.2,1) infinite}
@keyframes p1mv{0%,15%,90%,100%{translate:0 0;scale:1;filter:none}35%,70%{translate:0 -10px;scale:1.08;filter:drop-shadow(0 0 10px rgba(250,88,45,.8))}}
.p1-mon{animation:p1mon 3.6s cubic-bezier(.6,0,.2,1) infinite}
@keyframes p1mon{0%,20%{transform:scale(.42)}45%,85%{transform:scale(1)}100%{transform:scale(.42)}}
.p1-srch{display:flex;align-items:center;gap:14px;height:72px;padding:0 26px;border-radius:40px;background:#fff;box-shadow:0 0 0 3px #C43E1C,0 30px 60px -25px rgba(196,62,28,.6);font-size:30px;color:#0E1726}
.p1-res{display:flex;align-items:center;gap:14px;padding:14px 22px;font-size:22px;border-bottom:1px solid #E3E8EF}
.p1-res:last-child{border-bottom:0}
.p1-res i{font-style:normal;font-size:24px}
.p1-res small{margin-left:auto;font-size:16px;color:#6B7A90}
.p1-tab{display:flex;gap:4px;padding:8px;border-radius:14px;background:#fff;box-shadow:var(--sh)}
.p1-tab span{position:relative;padding:9px 13px;border-radius:9px;font-size:18px;font-weight:700;color:#33445E;white-space:nowrap;transition:background .4s,color .4s}
.p1-tab span.on{background:#C43E1C;color:#fff}
.p1-vw{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:20px 16px}
.p1-vw b{font-size:23px}.p1-vw small{font-size:18px;color:#6B7A90}
`;
  document.head.appendChild(s);
})();

/* mini diapo vectorielle (miniatures) : lay = title | content | section | two | chart | pic | big | blank */
function MINIP01(o = {}) {
  const [bg, fg, ac] = SLDTHEMES[o.th || 'blanc'] || SLDTHEMES.blanc, w = o.w || 112, lay = o.lay || 'content';
  const T = (x, y, s, t, anc = 'start') => `<text x="${x}" y="${y}" font-size="${s}" font-weight="800" fill="${fg}" text-anchor="${anc}" font-family="Segoe UI,Arial">${t}</text>`;
  const L = (x, y, ww, op = .4) => `<rect x="${x}" y="${y}" width="${ww}" height="4" rx="2" fill="${fg}" opacity="${op}"/>`;
  const ttl = (o.t ? T(12, 19, 11, o.t) : `<rect x="12" y="10" width="86" height="9" rx="2" fill="${fg}" opacity=".85"/>`) + `<rect x="12" y="24" width="136" height="1.5" fill="${ac}"/>`;
  const bul = (x, y, n, ww) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 11}" width="4" height="4" fill="${ac}"/>${L(x + 8, y + i * 11, ww - (i % 3) * 12)}`).join('');
  let g = '';
  if (lay === 'title') g = (o.t ? T(80, 47, 13, o.t, 'middle') : `<rect x="28" y="36" width="104" height="11" rx="2" fill="${fg}" opacity=".9"/>`) + `<rect x="50" y="55" width="60" height="5" rx="2" fill="${fg}" opacity=".4"/><rect x="66" y="27" width="28" height="2.5" fill="${ac}"/>`;
  else if (lay === 'section') g = `<rect x="0" y="0" width="8" height="90" fill="${ac}"/>` + (o.t ? T(20, 50, 13, o.t) : `<rect x="20" y="40" width="96" height="11" rx="2" fill="${fg}" opacity=".9"/>`) + `<rect x="20" y="58" width="50" height="4" rx="2" fill="${fg}" opacity=".4"/>`;
  else if (lay === 'two') g = ttl + bul(12, 36, 4, 56) + bul(86, 36, 4, 56);
  else if (lay === 'chart') g = ttl + [26, 40, 34, 52].map((h, i) => `<rect x="${30 + i * 28}" y="${82 - h}" width="16" height="${h}" rx="2" fill="${i === 3 ? ac : fg}" opacity="${i === 3 ? 1 : .35}"/>`).join('');
  else if (lay === 'pic') g = ttl + `<rect x="12" y="32" width="136" height="50" rx="3" fill="${ac}" opacity=".25"/><path d="M20 78l26-26 18 18 12-12 22 20z" fill="${ac}"/><circle cx="118" cy="44" r="6" fill="${ac}"/>`;
  else if (lay === 'big') g = T(80, 54, 26, o.t || '98 %', 'middle') + `<rect x="50" y="64" width="60" height="4" rx="2" fill="${ac}"/>`;
  else if (lay === 'blank') g = '';
  else g = ttl + bul(12, 36, o.n || 4, 100);
  return `<svg viewBox="0 0 160 90" style="width:${w}px;height:${Math.round(w * 9 / 16)}px;display:block;background:${bg};border-radius:${o.r ?? 4}px">${g}</svg>`;
}
/* disposition « fil de fer » : espaces réservés en pointillés */
function WIREP01(kind, w = 200) {
  const R = (x, y, ww, h, t = '', fs = 9) => `<rect x="${x}" y="${y}" width="${ww}" height="${h}" rx="2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="3 2"/>${t ? `<text x="${x + ww / 2}" y="${y + h / 2 + 3}" font-size="${fs}" fill="#6B7A90" text-anchor="middle" font-family="Segoe UI,Arial">${t}</text>` : ''}`;
  const lays = {
    title: R(20, 26, 120, 22, 'Titre', 10) + R(36, 54, 88, 14, 'Sous-titre'),
    content: R(10, 8, 140, 16, 'Titre') + R(10, 28, 140, 54, 'Contenu'),
    section: R(14, 34, 132, 20, 'Titre de section', 9) + R(14, 58, 100, 12, 'Texte'),
    two: R(10, 8, 140, 16, 'Titre') + R(10, 28, 68, 54, 'Contenu') + R(82, 28, 68, 54, 'Contenu'),
    comp: R(10, 8, 140, 16, 'Titre') + R(10, 28, 68, 10, 'Texte', 7) + R(82, 28, 68, 10, 'Texte', 7) + R(10, 41, 68, 41, 'Contenu') + R(82, 41, 68, 41, 'Contenu'),
    titleonly: R(10, 8, 140, 16, 'Titre'),
    blank: '',
    caption: R(10, 10, 52, 16, 'Titre', 8) + R(68, 10, 82, 72, 'Contenu') + R(10, 30, 52, 52, 'Texte', 8),
    picture: R(10, 10, 52, 16, 'Titre', 8) + R(68, 10, 82, 72, '🖼 Image') + R(10, 30, 52, 52, 'Texte', 8),
  };
  return `<svg viewBox="0 0 160 90" style="width:${w}px;height:${Math.round(w * 9 / 16)}px;display:block;background:#fff;border-radius:6px;box-shadow:0 0 0 1px #CBD5E1">${lays[kind] || ''}</svg>`;
}
/* vue Normal de PowerPoint pour APPWIN.body */
function EDP01(o = {}) {
  const th = (o.thumbs || []).map((t, i) => t.sec ? `<div class="p1-sec ${t.s ? 'f' : ''}" ${t.s ? `data-s="${t.s}"` : ''}>▾ ${t.sec}</div>` :
    `<div class="p1-tb ${t.sel ? 'sel' : ''} ${t.s ? 'f left' : ''}" ${t.s ? `data-s="${t.s}"` : ''}><span>${t.n ?? i + 1}</span><div>${MINIP01({ w: 104, ...t })}</div></div>`).join('');
  return `<div class="p1-ed"><div class="p1-row"><div class="p1-th">${th}${o.zth ? `<div class="p1-zn f" data-s="${o.zth}"><b>${o.zth}</b></div>` : ''}</div>
   <div class="p1-main">${o.slide || ''}${o.zsl ? `<div class="p1-zn f" data-s="${o.zsl}" style="inset:12px"><b>${o.zsl}</b></div>` : ''}</div></div>
   ${o.notes === false ? '' : `<div class="p1-notes">${o.notes || 'Cliquez pour ajouter des notes'}${o.zno ? `<div class="p1-zn f" data-s="${o.zno}" style="inset:2px"><b style="left:auto;right:8px;top:6px">${o.zno}</b></div>` : ''}</div>`}
   <div class="p1-sb">Diapositive ${o.cur || 1} sur ${o.tot || (o.thumbs || []).filter(t => !t.sec).length || 1}<span>Français (France)</span><span class="sp"></span><span class="v">≡ Notes</span><span class="v">▭</span><span class="v">▦</span><span class="v">▤</span><span class="v">▶</span><span>─────●── 62 %</span>${o.zsb ? `<div class="p1-zn f" data-s="${o.zsb}" style="inset:0"><b style="left:300px;top:-2px;width:28px;height:28px;line-height:28px">${o.zsb}</b></div>` : ''}</div></div>`;
}
const HOTP01 = n => `<em class="ow-hot f zoom" data-s="${n}"><b>${n}</b></em>`;
const PPTGP01 = [['Presse-papiers', ['📋 Coller', '✂', '⧉']], ['Diapositives', ['📄 Nouvelle diapositive', '▦ Disposition', '↺ Rétablir', '§ Section']], ['Police', ['Aptos ▾', '28 ▾', 'G', 'I', 'S']], ['Paragraphe', ['☰', '≡', '⇥']], ['Dessin', ['⬠ Formes', '⊞ Organiser']]];

window.MODULE = { code: 'P01', title: 'Premiers pas : interface, diapositives et dispositions', short: 'Premiers pas', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Premiers pas', html: TITLE({ mod: 'POWERPOINT · MODULE 01 · DÉBUTANT', title: 'Premiers pas dans <span class="grad">PowerPoint</span>', sub: '« La structure d\'abord, la décoration ensuite »', agenda: SECSP01, art: APPART('ppt') }),
  n: `<p>Bienvenue dans le premier module PowerPoint (environ 50 minutes). Objectif : prendre ses repères dans <b>PowerPoint 365</b> et construire un premier deck propre, diapositive par diapositive.</p>
  <p>Trois parties : l'interface, les <b>dispositions</b> (le cœur du module), puis la saisie, les modes d'affichage et le diaporama.</p>
  <p>Fil rouge : le bilan annuel de la <b>Boulangerie Martin</b>, que vous reprendrez en lab.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Se repérer : <b>ruban</b>, <b>miniatures</b>, zone de diapo, <b>notes</b>', 'Ajouter, dupliquer, déplacer, supprimer des <b>diapositives</b>', 'Choisir la bonne <b>disposition</b> plutôt qu\'empiler des zones de texte', 'Gérer les <b>niveaux de puces</b> et le texte qui déborde', 'Changer de <b>mode d\'affichage</b> et lancer le <b>diaporama</b>']),
  n: `<p>Cinq objectifs. Insistez sur le n° 3 : c'est la différence entre un deck « bricolé » et un deck professionnel. Une bonne disposition, c'est un deck qui suit le thème, qui se navigue au clavier et qui est accessible.</p>
  <p>Question au groupe : « Qui part d'une diapo vide et ajoute des zones de texte ? » — en général, beaucoup de mains se lèvent.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP01, 0), n: `<p>Première partie : l'écran d'accueil, les quatre zones de la fenêtre, le ruban et la zone Rechercher.</p>` },

/* 4 — ÉCRAN D'ACCUEIL */
{ title: 'L\'écran d\'accueil', html: `${H('L\'écran d\'accueil', 'Au lancement de PowerPoint', PATH('Fichier > Accueil'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1000, h: 600, title: 'PowerPoint', noribbon: true, body: `
 <div style="position:absolute;inset:0;display:flex">
  <div style="width:170px;background:#9E2F14;color:#fff;padding:20px 0;display:flex;flex-direction:column;gap:4px;font-size:16px">
   ${['⌂ Accueil', '＋ Nouveau', '📂 Ouvrir', '', 'Comptes', 'Options'].map((x, i) => `<div style="padding:10px 20px;${i === 0 ? 'background:rgba(255,255,255,.18);font-weight:800' : ''};${x ? '' : 'flex:1'}">${x}</div>`).join('')}
  </div>
  <div style="flex:1;padding:26px 30px;background:#fff;position:relative">
   <div style="font-size:26px;font-weight:800;color:#0E1726">Bonjour</div>
   <div style="display:flex;gap:18px;margin-top:18px">
    <div style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600"><span class="p1-rel">${MINIP01({ lay: 'blank', w: 150 })}${HOTP01(1)}</span>Nouvelle présentation</div>
    ${[['nuit', 'Thème sombre'], ['ocean', 'Thème océan'], ['sunset', 'Thème couchant'], ['foret', 'Thème forêt']].map(([t, l], i) => `<div style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600"><span class="p1-rel">${MINIP01({ lay: 'title', th: t, w: 150 })}${i === 0 ? HOTP01(2) : ''}</span>${l}</div>`).join('')}
   </div>
   <div style="text-align:right;font-size:14px;color:#C43E1C;font-weight:700;margin-top:8px">Autres thèmes →</div>
   <div style="font-size:18px;font-weight:800;margin:14px 0 8px"><span class="p1-rel" style="padding:2px 6px">Récents${HOTP01(3)}</span></div>
   ${['Bilan 2025.pptx', 'Réunion équipe.pptx', 'Formation accueil.pptx'].map((f, i) => `<div style="display:flex;gap:12px;align-items:center;padding:9px 0;border-bottom:1px solid #EEF0F3;font-size:15px"><span class="ow-lg" style="background:#C43E1C;color:#fff;width:22px;height:22px;font-size:13px">P</span><b>${f}</b><span style="margin-left:auto;color:#6B7A90">OneDrive · ${['hier', 'lundi', '12 sept.'][i]}</span></div>`).join('')}
  </div></div>` })}
<div class="col" style="position:absolute;left:1110px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Nouvelle présentation</b><br>une page blanche, thème « Office »', 1)}
 ${CARD('<b>2 · Modèles et thèmes</b><br>un point de départ déjà mis en forme', 2)}
 ${CARD('<b>3 · Récents</b><br>vos fichiers, locaux ou OneDrive', 3)}
 ${CARD('⌨️ <b>Ctrl+N</b> : nouvelle présentation, à tout moment', 4)}
</div>`,
  n: `<p><b>Étape 1</b> : à l'ouverture, PowerPoint affiche l'écran <b>Accueil</b>. « Nouvelle présentation » crée un fichier vierge avec le thème Office par défaut.</p>
  <p><b>Étape 2</b> : les vignettes de thèmes et modèles donnent un point de départ déjà cohérent (couleurs, polices). On reviendra aux thèmes au module 02.</p>
  <p><b>Étape 3</b> : la liste <b>Récents</b> reprend vos derniers fichiers, y compris ceux stockés sur OneDrive ou SharePoint.</p>
  <p><b>Étape 4</b> : <b>Ctrl+N</b> crée une nouvelle présentation (à ne pas confondre avec <b>Ctrl+M</b>, nouvelle diapositive). Démo : lancez PowerPoint en direct et montrez les trois zones.</p>` },

/* 5 — LES ZONES DE LA FENÊTRE */
{ title: 'Les zones de la fenêtre', html: `${H('Quatre zones à connaître', 'L\'interface en mode Normal')}
${APPWIN({ app: 'ppt', x: 70, y: 165, w: 1010, h: 640, title: 'Bilan 2025.pptx', tab: 'Accueil', groups: PPTGP01.slice(0, 4), hot: { 'tab:Accueil': 1 },
  body: EDP01({ cur: 2, zth: 2, zsl: 3, zno: 4, zsb: 5, notes: 'Rappeler les 3 boutiques et la date de création (1998).',
    thumbs: [{ lay: 'title', t: 'Bilan 2025' }, { t: 'Qui sommes-nous', sel: 1 }, { lay: 'two' }, { lay: 'chart' }, { lay: 'title', th: 'nuit', t: 'Merci' }],
    slide: SLD({ inwin: true, w: 600, title: 'Qui sommes-nous', bullets: ['3 boutiques à Lyon', '18 salariés', 'Fondée en 1998'] }) }) })}
<div class="col" style="position:absolute;left:1110px;right:70px;top:170px;gap:12px">
 ${CARD('<b>1 · Ruban</b> — onglets › groupes › commandes', 1)}
 ${CARD('<b>2 · Miniatures</b> — ajouter, réorganiser, supprimer', 2)}
 ${CARD('<b>3 · Diapositive</b> — l\'espace de travail', 3)}
 ${CARD('<b>4 · Notes</b> — votre texte oral, invisible du public', 4)}
 ${CARD('<b>5 · Barre d\'état</b> — n° de diapo, modes, zoom', 5)}
</div>`,
  n: `<p><b>Étape 1 — le ruban</b> : onglets (Accueil, Insertion, Création…), chaque onglet regroupe des commandes par groupes (ex. <i>Accueil › Police</i>).</p>
  <p><b>Étape 2 — le volet des miniatures</b> : la liste des diapositives. C'est ici qu'on ajoute, réorganise et supprime.</p>
  <p><b>Étape 3 — la zone de diapositive</b> : l'espace de travail, au centre.</p>
  <p><b>Étape 4 — le volet Notes</b> : ce que vous direz à l'oral. Invisible pour le public, visible en mode Présentateur. Il s'affiche avec le bouton <b>Notes</b> de la barre d'état.</p>
  <p><b>Étape 5 — la barre d'état</b> : numéro de diapo, boutons des modes d'affichage, curseur de zoom. Piège fréquent : un stagiaire a « perdu » ses notes, il a simplement replié le volet.</p>` },

/* 6 — LES ONGLETS DU RUBAN */
{ title: 'Les onglets du ruban', html: `${H('Un onglet par grande tâche', 'Le ruban de PowerPoint 365')}
<div class="p1-tab a pop" style="position:absolute;left:70px;top:178px;--d:.2s">${['Fichier', 'Accueil', 'Insertion', 'Dessin', 'Création', 'Transitions', 'Animations', 'Diaporama', 'Enregistrer', 'Révision', 'Affichage'].map(t => `<span class="p1-t${t}">${t}</span>`).join('')}</div>
<div style="position:absolute;left:70px;right:70px;top:268px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
 ${[['Accueil', '📄', 'Diapositives, police, paragraphe, dessin'], ['Insertion', '🖼', 'Images, formes, icônes, tableaux, vidéo'], ['Création', '🎨', 'Thèmes, variantes, taille des diapos'], ['Transitions', '↔', 'L\'effet entre deux diapositives'],
    ['Animations', '✨', 'Faire apparaître les éléments'], ['Diaporama', '▶', 'Lancer, répéter, mode Présentateur'], ['Révision', '💬', 'Orthographe, commentaires, accessibilité'], ['Affichage', '👁', 'Modes, masque, règle, grille']].map(([t, ic, d], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:18px 20px"><div style="display:flex;align-items:center;gap:12px"><span style="font-size:32px">${ic}</span><b style="font-size:24px;color:#C43E1C">${t}</b></div><div style="font-size:19px;margin-top:8px;color:#33445E">${d}</div></div>`).join('')}
</div>
${TIP('Double-cliquez sur un onglet (ou <b>Ctrl+F1</b>) pour réduire le ruban et gagner de la place.', { s: 9, kind: 'key', x: 70, y: 640, w: 860 })}`,
  steps: 9, step(n, el) { const map = ['Accueil', 'Insertion', 'Création', 'Transitions', 'Animations', 'Diaporama', 'Révision', 'Affichage']; el.querySelectorAll('.p1-tab span').forEach(s => s.classList.toggle('on', n >= 1 && n <= 8 && s.textContent === map[n - 1])); },
  n: `<p>Chaque clic allume un onglet et révèle son rôle. <b>Étapes 1 à 8</b> : Accueil (le quotidien), Insertion (tout ce qui s'ajoute), Création (thèmes), Transitions, Animations, Diaporama, Révision, Affichage.</p>
  <p>Les onglets <b>Dessin</b> et <b>Enregistrer</b> existent aussi dans Microsoft 365 (stylet, enregistrement vidéo de la présentation) ; on les verra plus tard.</p>
  <p><b>Étape 9</b> : double-clic sur un onglet ou <b>Ctrl+F1</b> pour replier le ruban. Montrez aussi les <b>onglets contextuels</b> (Format de forme, Format de l'image) qui n'apparaissent que lorsqu'un objet est sélectionné.</p>` },

/* 7 — RECHERCHER */
{ title: 'La zone Rechercher', html: `${H('Ne cherchez plus : tapez !', 'La zone Rechercher', KEYS('Alt+Q'))}
<div style="position:absolute;left:220px;width:1160px;top:200px">
 <div class="p1-srch a pop" style="--d:.2s"><span>🔍</span><b class="tw f" data-s="1" style="--n:10;border-color:#C43E1C;font-weight:600">transition</b></div>
 <div class="card f" data-s="2" style="margin-top:18px;padding:6px 0">
  <div style="padding:10px 22px;font-size:16px;font-weight:800;color:#6B7A90;letter-spacing:.06em">ACTIONS</div>
  <div class="p1-res"><i>↔</i><b>Transitions</b> › Fondu<small>applique l\'effet</small></div>
  <div class="p1-res"><i>⇉</i>Appliquer partout<small>onglet Transitions</small></div>
  <div class="p1-res f" data-s="3"><i>❓</i>Aide : Ajouter des transitions entre les diapositives<small>Aide</small></div>
 </div>
</div>
${TIP('Vous ne savez pas dans quel onglet se trouve une commande ? Tapez son nom : « masque », « section », « notes »…', { s: 4, x: 220, y: 640, w: 1160 })}`,
  n: `<p><b>Étape 1</b> : on clique dans la zone <b>Rechercher</b> (loupe en haut de la fenêtre) ou on fait <b>Alt+Q</b>, puis on tape le nom de ce qu'on veut faire, ici « transition ».</p>
  <p><b>Étape 2</b> : PowerPoint propose directement les <b>commandes</b> : on peut appliquer un effet sans savoir où il se trouve dans le ruban.</p>
  <p><b>Étape 3</b> : en bas, des liens d'aide si on veut comprendre.</p>
  <p><b>Étape 4</b> : réflexe à donner aux débutants. Démo : tapez « masque » puis « section » en direct.</p>` },

/* 8 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP01, 1), n: `<p>Deuxième partie : gérer les diapositives puis choisir la bonne <b>disposition</b>. C'est le cœur du module.</p>` },

/* 9 — AJOUTER DES DIAPOSITIVES */
{ title: 'Ajouter des diapositives', html: `${H('Ajouter, dupliquer, supprimer', 'Gérer les diapositives', PATH('Accueil > Diapositives > Nouvelle diapositive'))}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 800, h: 620, title: 'Bilan 2025.pptx', tab: 'Accueil', groups: PPTGP01.slice(0, 3), hot: { '📄 Nouvelle diapositive': 1 },
  body: EDP01({ cur: 4, tot: 5, notes: false,
    thumbs: [{ lay: 'title', t: 'Bilan 2025' }, { t: 'Qui sommes-nous' }, { lay: 'two', t: 'Avant / Après' }, { t: 'Chiffres clés', sel: 1, s: 1 }, { t: 'Chiffres clés', n: 5, s: 2 }],
    slide: SLD({ inwin: true, w: 520, title: 'Chiffres clés', bullets: ['CA : 1,2 M€', '+8 % vs 2024', '410 000 baguettes'] }) }) })}
<div class="col" style="position:absolute;left:910px;right:70px;top:180px;gap:12px">
 ${[['Ctrl+M', 'Nouvelle diapositive', 'flèche du bouton = choisir la disposition'], ['Ctrl+D', 'Dupliquer', 'ou clic droit › Dupliquer la diapositive'], ['Suppr', 'Supprimer', 'la miniature sélectionnée'], ['Clic droit', 'Masquer', 'reste dans le fichier, non projetée']].map(([k, d, sm], i) => `
 <div class="card p1-k f right" data-s="${i + 1}">${KEYS(k)}<div><span class="d">${d}</span><small>${sm}</small></div></div>`).join('')}
 ${TIP('<b>Suppr</b> efface ce qui est <b>sélectionné</b> : curseur dans le texte = du texte disparaît. Cliquez d\'abord la miniature.', { s: 5, kind: 'warn', x: 0, y: 0, w: 620 }).replace('position:absolute', '').replace('left:0px;top:0px;', 'position:relative;')}
</div>`,
  n: `<p><b>Étape 1</b> : <b>Ctrl+M</b> ou <i>Accueil › Nouvelle diapositive</i>. La nouvelle diapo s'insère <b>après</b> la diapo sélectionnée. La petite flèche sous le bouton permet de choisir directement la disposition.</p>
  <p><b>Étape 2</b> : dupliquer (<b>Ctrl+D</b> sur la miniature, ou clic droit › <i>Dupliquer la diapositive</i>) : idéal pour décliner une diapo réussie.</p>
  <p><b>Étape 3</b> : <b>Suppr</b> sur la miniature sélectionnée.</p>
  <p><b>Étape 4</b> : <i>Masquer la diapositive</i> : elle reste dans le fichier (numéro barré) mais n'est pas projetée — pratique pour une diapo de secours.</p>
  <p><b>Étape 5 — piège</b> : si le curseur clignote dans une zone de texte, Suppr efface du texte, pas la diapo. Toujours cliquer d'abord sur la miniature.</p>` },

/* 10 — RÉORGANISER */
{ title: 'Réorganiser les diapositives', html: `${H('Changer l\'ordre en un geste', 'Réorganiser')}
<div class="card a pop" style="position:absolute;left:70px;top:175px;width:380px;height:630px;padding:24px 20px;--d:.2s;background:#F3F4F6">
 <div class="p1-ro" data-st="0">
  ${[['title', 'Bilan 2025'], ['content', 'Qui sommes-nous'], ['two', 'Avant / Après'], ['content', 'Projets 2026'], ['content', 'Chiffres clés']].map(([l, t], i) => `<div class="t ${i === 4 ? 'mv' : i === 3 ? 'dn' : ''}" style="top:${i * 112}px"><b>${i + 1}</b><div>${MINIP01({ lay: l, t, w: 168, th: i === 4 ? 'blanc' : 'blanc' })}</div></div>`).join('')}
 </div>
</div>
<svg viewBox="0 0 120 400" class="f" data-s="1" style="position:absolute;left:345px;top:540px;width:70px;height:190px"><path d="M20 360 C 90 300, 90 120, 20 60" fill="none" stroke="#FA582D" stroke-width="5" stroke-dasharray="10 8" class="draw" pathLength="1"/><path d="M8 72 L20 56 L36 66" fill="none" stroke="#FA582D" stroke-width="5" stroke-linecap="round"/></svg>
<div class="col" style="position:absolute;left:640px;right:70px;top:190px;gap:16px">
 <div class="card p1-k f right" data-s="1"><span style="font-size:36px">✋</span><div><span class="d">Glisser-déposer la miniature</span><small>un trait indique la position d\'arrivée</small></div></div>
 <div class="card p1-k f right" data-s="2">${KEYS('Ctrl+↑')}<div><span class="d">Monter la diapositive</span><small>Ctrl+Flèche haut, une place à la fois</small></div></div>
 <div class="card p1-k f right" data-s="3">${KEYS('Ctrl+↓')}<div><span class="d">Descendre la diapositive</span><small>Ctrl+Flèche bas</small></div></div>
 <div class="card p1-k f right" data-s="4"><span style="font-size:36px">▦</span><div><span class="d">40 diapos ? Trieuse de diapositives</span><small>Affichage › Trieuse : toutes les miniatures en grille</small></div></div>
</div>`,
  steps: 4, step(n, el) { const r = el.querySelector('.p1-ro'); r.dataset.st = n; const mv = r.querySelector('.mv'), dn = r.querySelector('.dn'); mv.style.top = (n >= 1 ? 336 : 448) + 'px'; dn.style.top = (n >= 1 ? 448 : 336) + 'px'; mv.querySelector('b').textContent = n >= 1 ? 4 : 5; dn.querySelector('b').textContent = n >= 1 ? 5 : 4; },
  n: `<p>Démo animée : la diapo « Chiffres clés » doit passer <b>avant</b> « Projets 2026 » (c'est la tâche 4 du lab).</p>
  <p><b>Étape 1</b> : on glisse la miniature dans le volet ; un trait horizontal indique où elle va atterrir.</p>
  <p><b>Étapes 2-3</b> : au clavier, <b>Ctrl+Flèche haut / bas</b> déplace la diapo sélectionnée d'un cran : précis et rapide.</p>
  <p><b>Étape 4</b> : au-delà d'une vingtaine de diapos, passez en <b>Trieuse de diapositives</b> (on la verra en section 3).</p>` },

/* 11 — LES ESPACES RÉSERVÉS */
{ title: 'Les espaces réservés', html: `${H('Une disposition = des espaces réservés', 'La structure de la diapo')}
<div class="p1-bl a pop" style="position:absolute;left:70px;top:190px;--d:.2s">
 <div class="p1-rel" style="position:absolute;left:50px;top:36px;width:720px;height:86px;border:2px dashed #94A3B8;border-radius:6px;display:grid;place-items:center;font-size:30px;color:#6B7A90">Cliquez pour ajouter un titre${HOTP01(1)}</div>
 <div style="position:absolute;left:50px;top:146px;width:720px;height:280px;border:2px dashed #94A3B8;border-radius:6px">
  <div style="position:absolute;left:24px;top:18px;font-size:22px;color:#6B7A90">• Cliquez pour ajouter du texte</div>
  <div style="position:absolute;inset:0;display:grid;place-items:center"><div class="p1-rel" style="display:grid;grid-template-columns:repeat(3,64px);gap:14px;font-size:34px;text-align:center;color:#94A3B8">${['▦', '📊', '⧉', '🖼', '🎬', '★'].map(x => `<span>${x}</span>`).join('')}${HOTP01(3)}</div></div>
  <span class="p1-rel" style="position:absolute;inset:0">${HOTP01(2)}</span>
 </div>
</div>
<div class="col" style="position:absolute;left:940px;right:70px;top:200px;gap:16px">
 ${CARD('<b>1 · Titre</b> — reconnu comme titre : mode Plan, navigation, accessibilité', 1)}
 ${CARD('<b>2 · Contenu</b> — puces au clavier, mise en forme du thème', 2)}
 ${CARD('<b>3 · Icônes</b> — tableau, graphique, SmartArt, image, vidéo, icône', 3)}
 ${CARD('<b>Changer de thème ?</b> Tout suit automatiquement.', 4, 'background:#0E1726;color:#fff')}
</div>`,
  n: `<p>Une <b>disposition</b> est un gabarit qui contient des <b>espaces réservés</b> (« Cliquez pour ajouter un titre »).</p>
  <p><b>Étape 1</b> : l'espace réservé de <b>titre</b> est reconnu comme titre par PowerPoint : il alimente le mode Plan, les zooms, la navigation et le <b>vérificateur d'accessibilité</b> (les lecteurs d'écran annoncent ce titre).</p>
  <p><b>Étape 2</b> : l'espace réservé de <b>contenu</b> accueille des puces avec la mise en forme du thème.</p>
  <p><b>Étape 3</b> : les six icônes au centre insèrent directement un tableau, un graphique, un SmartArt, une image, une vidéo ou une icône — qui se placent proprement dans la zone.</p>
  <p><b>Étape 4</b> : si on change de thème, tout ce qui est dans les espaces réservés suit. Une zone de texte « à la main », non.</p>` },

/* 12 — LA GALERIE DES DISPOSITIONS */
{ title: 'La galerie des dispositions', html: `${H('Les dispositions du thème Office', 'Galerie', PATH('Accueil > Diapositives > Disposition'))}
<div class="card a pop" style="position:absolute;left:70px;right:70px;top:175px;padding:24px 30px;--d:.15s">
 <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:22px 26px">
 ${[['title', 'Diapositive de titre', 1], ['content', 'Titre et contenu', 2], ['section', 'Titre de section', 3], ['two', 'Deux contenus', 4], ['comp', 'Comparaison', 4], ['titleonly', 'Titre seul', 5], ['blank', 'Vide', 5], ['caption', 'Contenu avec légende', 0], ['picture', 'Image avec légende', 0]].map(([k, l, s]) => `
  <div style="display:flex;flex-direction:column;gap:8px;align-items:center;position:relative">
   <div style="position:relative">${WIREP01(k, 240)}${s ? `<em class="ow-hot f zoom" data-s="${s}" style="inset:-6px"><b>${s}</b></em>` : ''}</div><b style="font-size:19px;text-align:center">${l}</b></div>`).join('')}
 </div>
</div>
${TIP('Astuce : la <b>flèche</b> sous « Nouvelle diapositive » propose la même galerie : on crée la diapo directement avec la bonne disposition.', { s: 6, x: 70, y: 720, w: 1000 })}`,
  n: `<p>Les dispositions principales, dans l'ordre d'usage :</p>
  <p><b>Étape 1 — Diapositive de titre</b> : titre + sous-titre, pour l'ouverture.</p>
  <p><b>Étape 2 — Titre et contenu</b> : la plus courante (liste à puces, tableau, graphique…).</p>
  <p><b>Étape 3 — Titre de section</b> : annonce un changement de partie (module 03).</p>
  <p><b>Étape 4 — Deux contenus / Comparaison</b> : avant/après, pour/contre. Comparaison ajoute un petit en-tête au-dessus de chaque colonne.</p>
  <p><b>Étape 5 — Titre seul / Vide</b> : pour les visuels pleine page. Attention, « Vide » n'a même pas de titre.</p>
  <p><b>Étape 6</b> : montrez la flèche sous Nouvelle diapositive. Pour une diapo existante : <i>Accueil › Disposition</i>, le contenu est redistribué dans les nouveaux espaces.</p>` },

/* 13 — QUELLE DISPOSITION POUR QUEL BESOIN */
{ title: 'Quelle disposition choisir ?', html: `${H('Le besoin d\'abord, la disposition ensuite', 'Choisir')}
<div class="col" style="position:absolute;left:70px;right:70px;top:180px;gap:14px">
 ${[['🎬', 'Ouvrir la présentation', 'title', 'Diapositive de titre'], ['📋', 'Lister, montrer un tableau ou un graphique', 'content', 'Titre et contenu'], ['🚪', 'Changer de partie', 'section', 'Titre de section'], ['⚖️', 'Avant / après, pour / contre', 'two', 'Deux contenus · Comparaison'], ['🖼', 'Une image ou un visuel pleine page', 'titleonly', 'Titre seul']].map(([ic, b, k, l], i) => `
 <div class="card f left" data-s="${i + 1}" style="display:grid;grid-template-columns:60px 1fr 60px 150px 330px;align-items:center;gap:18px;padding:12px 24px">
  <span style="font-size:36px">${ic}</span><b style="font-size:24px">${b}</b><span style="font-size:34px;color:#FA582D;font-weight:900">➜</span>${WIREP01(k, 150)}<span class="chip" style="font-size:19px;justify-content:center">${l}</span></div>`).join('')}
</div>`,
  n: `<p>On choisit la disposition à partir de ce qu'on veut <b>dire</b>, pas de ce qu'on veut dessiner.</p>
  <p><b>Étapes 1 à 5</b> : ouverture → Diapositive de titre ; liste ou graphique → Titre et contenu ; nouvelle partie → Titre de section ; comparaison → Deux contenus ou Comparaison ; visuel → Titre seul (on garde un titre, utile pour la navigation et l'accessibilité).</p>
  <p>Exemple du lab : la diapo « Avant / Après » de la boulangerie mélange tout dans une seule puce. La bonne réponse : disposition <b>Deux contenus</b>, « Avant » à gauche, « Après » à droite.</p>` },

/* 14 — À FAIRE / À ÉVITER */
{ title: 'Espaces réservés vs zones de texte', html: `${H('Ne partez pas de la diapo Vide', 'À faire / à éviter')}
${VS({ l: { t: 'Vide + zones de texte', c: '#DC2626', ic: '✘', html: `<div style="position:relative;height:190px;margin-bottom:14px;background:#fff;border-radius:10px;box-shadow:0 0 0 1px #E3E8EF">
    <div style="position:absolute;left:30px;top:20px;font:700 30px Georgia,serif;color:#7C3AED;rotate:-2deg">Bilan 2025 !!</div><div style="position:absolute;left:60px;top:80px;font:16px 'Comic Sans MS',cursive;color:#16A34A">3 boutiques</div><div style="position:absolute;left:220px;top:110px;font:italic 22px Arial;color:#0EA5E9">18 salariés</div><div style="position:absolute;left:40px;top:146px;font:12px Courier;color:#DC2626">Fondée en 1998</div></div>
    <ul class="lst sm"><li>Polices et tailles incohérentes</li><li>Rien ne suit quand on change de thème</li><li>Pas de titre : Plan, navigation, accessibilité KO</li></ul>` },
  r: { t: 'Disposition + espaces réservés', c: '#16A34A', ic: '✔', html: `<div style="height:190px;margin-bottom:14px;display:flex;justify-content:center">${MINIP01({ t: 'Qui sommes-nous', w: 338, r: 10 })}</div>
    <ul class="lst sm"><li>Mise en forme homogène, celle du thème</li><li>Change de thème en un clic</li><li>Titre reconnu par le mode Plan et les lecteurs d'écran</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : partir de la disposition <i>Vide</i> et tout dessiner avec des zones de texte. Résultat : polices et tailles différentes, alignements approximatifs, et surtout, aucune zone n'est un <b>titre</b>.</p>
  <p><b>Étape 2 — à faire</b> : une disposition adaptée, du texte dans les espaces réservés. La mise en forme vient du thème, le titre est reconnu.</p>
  <p>Démo : faites <i>Révision › Vérifier l'accessibilité</i> sur une diapo « Vide + zones de texte » : PowerPoint signale « Titre de diapositive manquant ».</p>` },

/* 15 — RÉTABLIR */
{ title: 'Réparer avec Rétablir', html: `${H('Réparer une diapo « bricolée »', 'Rétablir', PATH('Accueil > Diapositives > Rétablir'))}
<div class="sd a pop" style="left:70px;top:230px;width:540px;height:304px;background:#fff;color:#0E1726;--d:.2s">
 <div style="position:absolute;left:60px;top:14px;font:800 30px Georgia,serif;color:#7C3AED;rotate:-3deg">Chiffres clés</div>
 <div style="position:absolute;left:150px;top:90px;font-size:15px;line-height:1.7;width:300px;border:1px dashed #DC2626;padding:6px">• CA : 1,2 M€<br>• +8 % vs 2024<br>• 410 000 baguettes</div>
 <div style="position:absolute;right:16px;bottom:12px" class="chip bad">placé à la main</div>
</div>
<div class="f zoom" data-s="1" style="position:absolute;left:670px;top:300px;width:260px;text-align:center">
 <div class="p1-rel" style="display:inline-flex;flex-direction:column;align-items:center;padding:16px 26px;background:#fff;border-radius:14px;box-shadow:var(--sh);font-size:22px;font-weight:700"><span style="font-size:44px">↺</span>Rétablir${HOTP01(1)}</div>
 <svg viewBox="0 0 260 40" style="width:260px;height:40px;margin-top:20px"><path d="M10 20 H240" stroke="#FA582D" stroke-width="5" class="draw" pathLength="1"/><path d="M226 8 L244 20 L226 32" fill="none" stroke="#FA582D" stroke-width="5"/></svg>
</div>
${SLD({ x: 990, y: 230, w: 540, s: 2, title: 'Chiffres clés', bullets: ['CA : 1,2 M€', '+8 % vs 2024', '410 000 baguettes'] })}
<div class="chip ok f" data-s="2" style="position:absolute;left:990px;top:556px;font-size:18px">positions et polices de la disposition</div>
${TIP('Rétablir conserve votre <b>texte</b> : seules la position, la taille et la mise en forme des espaces réservés reviennent à l\'origine.', { s: 3, kind: 'ok', x: 70, y: 640, w: 1000 })}`,
  n: `<p><b>Avant</b> : une diapo dont les espaces réservés ont été déplacés, redimensionnés, recolorés « à la main ».</p>
  <p><b>Étape 1</b> : on sélectionne la diapo (ou plusieurs miniatures) puis <i>Accueil › Diapositives › Rétablir</i>.</p>
  <p><b>Étape 2</b> : les espaces réservés reprennent leur position et la mise en forme de la disposition.</p>
  <p><b>Étape 3</b> : le texte est conservé. Astuce : sélectionnez toutes les miniatures (Ctrl+A dans le volet) puis Rétablir pour remettre d'aplomb tout un deck hérité d'un collègue.</p>` },

/* 16 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP01, 2), n: `<p>Troisième partie : saisir le texte au clavier, gérer le débordement, changer de mode d'affichage et lancer le diaporama.</p>` },

/* 17 — NIVEAUX DE PUCES */
{ title: 'Saisir et gérer les puces', html: `${H('Les puces au clavier', 'Saisir du texte')}
<div class="p1-bl a pop" style="position:absolute;left:70px;top:190px;--d:.2s" data-st="0">
 <div style="position:absolute;left:60px;right:60px;top:36px;font-size:36px;font-weight:800;border-bottom:4px solid #C43E1C;padding-bottom:8px">Chiffres clés 2025</div>
 <div class="p1-li" style="top:130px">Chiffre d'affaires : 1,2 M€</div>
 <div class="p1-li li2 hid" style="top:180px">+8 % par rapport à 2024</div>
 <div class="p1-li li3 hid" style="top:230px">410 000 baguettes</div>
 <div class="p1-li li4 hid" style="top:280px">Projets 2026</div>
 <div class="li5 hid" style="position:absolute;left:88px;top:318px;font-size:26px;color:#1B2A41;transition:opacity .5s">4<sup>e</sup> boutique à Villeurbanne</div>
 <div class="li6 hid" style="position:absolute;right:20px;bottom:16px;transition:opacity .5s"><span class="chip dark">↳ espace réservé suivant</span></div>
</div>
<div class="col" style="position:absolute;left:940px;right:70px;top:180px;gap:12px">
 ${[['Entrée', 'Nouvelle puce'], ['Tab', 'Descendre d\'un niveau'], ['Maj+Tab', 'Remonter d\'un niveau'], ['Maj+Entrée', 'À la ligne, sans puce'], ['Ctrl+Entrée', 'Espace réservé suivant']].map(([k, d], i) => `
 <div class="card p1-k f right" data-s="${i + 1}">${KEYS(k)}<span class="d">${d}</span></div>`).join('')}
</div>`,
  steps: 5, step(n, el) { const q = c => el.querySelector(c); q('.li2').classList.toggle('hid', n < 1); q('.li2').classList.toggle('l2', n >= 2); q('.li3').classList.toggle('hid', n < 2); q('.li3').classList.toggle('l2', n >= 2); q('.li4').classList.toggle('hid', n < 3); q('.li5').classList.toggle('hid', n < 4); q('.li6').classList.toggle('hid', n < 5); },
  n: `<p>Démo animée sur la diapo « Chiffres clés ».</p>
  <p><b>Étape 1 — Entrée</b> : crée une nouvelle puce au même niveau.</p>
  <p><b>Étape 2 — Tab</b> en début de puce : la puce descend d'un niveau (sous-puce, plus petite, retrait). Attention : Tab au milieu du texte insère une tabulation.</p>
  <p><b>Étape 3 — Maj+Tab</b> : la puce remonte au niveau 1.</p>
  <p><b>Étape 4 — Maj+Entrée</b> : saut de ligne <b>sans</b> nouvelle puce (la 2e ligne appartient au même paragraphe).</p>
  <p><b>Étape 5 — Ctrl+Entrée</b> : passe à l'espace réservé suivant ; sur le dernier, crée une nouvelle diapo. On peut construire tout un deck sans toucher la souris.</p>` },

/* 18 — LE TEXTE DÉBORDE */
{ title: 'Quand le texte déborde', html: `${H('Le texte déborde ? Signal d\'alarme', 'Ajustement automatique')}
<div class="sd a pop" style="left:70px;top:190px;width:560px;height:315px;background:#fff;color:#0E1726;--d:.2s">
 <div class="sd-tt" style="font-size:24px;--sac:#C43E1C;border-color:#C43E1C">Tout sur la boulangerie</div>
 <ul class="sd-ul p1-shr" style="--sac:#C43E1C;top:24%;gap:.25em">${['3 boutiques à Lyon, Croix-Rousse, Part-Dieu et Confluence', '18 salariés dont 4 apprentis', 'Fondée en 1998 par Paul Martin', 'CA 1,2 M€ en hausse de 8 %', '410 000 baguettes vendues', 'Rénovation terminée en mars', '340 clients par jour', 'Projets : 4e boutique, vente en ligne'].map(t => `<li>${t}</li>`).join('')}</ul>
 <span class="f zoom" data-s="1" style="position:absolute;left:8px;bottom:8px;width:34px;height:34px;border-radius:6px;background:#fff;box-shadow:0 0 0 2px #FA582D;display:grid;place-items:center;font-size:20px">÷</span>
</div>
<div class="callout or f zoom" data-s="1" style="left:250px;top:520px">⚠ La police rétrécit toute seule</div>
<div class="card f" data-s="2" style="position:absolute;left:70px;top:600px;width:560px;padding:12px 0;font-size:18px">
 ${['Ajuster automatiquement le texte à l\'espace réservé', 'Arrêter l\'ajustement du texte à cet espace réservé', 'Fractionner le texte entre deux diapositives', 'Continuer sur une nouvelle diapositive'].map((t, i) => `<div style="padding:8px 20px;${i === 2 ? 'background:#FFF1EC;font-weight:800;color:#C43E1C' : ''}">${i === 0 ? '◉' : '○'} ${t}</div>`).join('')}
</div>
<svg viewBox="0 0 160 300" class="f" data-s="3" style="position:absolute;left:640px;top:440px;width:110px;height:270px;overflow:visible"><path d="M-10 270 H0" stroke="#FA582D" stroke-width="5"/><path d="M0 270 C 90 260, 120 160, 120 20" fill="none" stroke="#FA582D" stroke-width="5" stroke-dasharray="10 8"/><path d="M104 36 L120 14 L136 36" fill="none" stroke="#FA582D" stroke-width="5" stroke-linecap="round"/></svg>
${SLD({ x: 720, y: 200, w: 400, s: 3, title: 'Qui sommes-nous', bullets: ['3 boutiques à Lyon', '18 salariés', 'Fondée en 1998'] })}
${SLD({ x: 1130, y: 200, w: 400, s: 3, title: 'Une année record', bullets: ['CA : 1,2 M€ (+8 %)', '410 000 baguettes', '340 clients / jour'] })}
${TIP('Visez <b>5-6 puces de 6-8 mots</b>. Les phrases complètes vont dans les <b>notes</b>.', { s: 4, kind: 'ok', x: 800, y: 500, w: 730 })}`,
  n: `<p><b>Avant</b> : 8 puces dans une seule diapo. PowerPoint réduit automatiquement la police (« Ajustement automatique ») : regardez le texte rétrécir.</p>
  <p><b>Étape 1</b> : le petit bouton d'options d'ajustement (÷) apparaît en bas à gauche de l'espace réservé. C'est un <b>signal d'alarme</b>, pas une solution : 12 pt projetés, personne ne lit.</p>
  <p><b>Étape 2</b> : le menu propose <i>Fractionner le texte entre deux diapositives</i>.</p>
  <p><b>Étape 3</b> : deux diapos lisibles, chacune avec un titre clair.</p>
  <p><b>Étape 4</b> : règle de base : 5-6 puces de 6-8 mots maximum. Si vous écrivez des phrases, elles vont dans le volet <b>Notes</b>.</p>` },

/* 19 — MODE PLAN */
{ title: 'Le mode Plan', html: `${H('Le fond d\'abord : le mode Plan', 'Écrire toute la présentation', PATH('Affichage > Mode Plan'))}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 1000, h: 610, title: 'Bilan 2025.pptx', tab: 'Affichage', groups: [['Affichages des présentations', ['▭ Normal', '☰ Mode Plan', '▦ Trieuse de diapositives', '🗒 Page de notes', '📖 Lecture']], ['Afficher', ['☐ Règle', '☐ Quadrillage', '☐ Repères']]], hot: { '☰ Mode Plan': 1 },
  body: `<div style="position:absolute;inset:0;display:flex"><div style="width:520px;background:#fff;border-right:1px solid #E3E8EF;padding:18px 22px;font-size:17px;line-height:1.5;color:#1B2A41">
   ${[['Bilan 2025', ['Boulangerie Martin — Rendez-vous banque']], ['Qui sommes-nous', ['3 boutiques à Lyon', '18 salariés']], ['Avant / Après la rénovation', []], ['Chiffres clés', ['CA : 1,2 M€', '+8 % vs 2024']], ['Projets 2026', ['4e boutique', 'Vente en ligne']]].map(([t, b], i) => `
   <div class="f left" data-s="2" style="margin-bottom:6px"><b><span style="display:inline-block;width:22px;color:#6B7A90">${i + 1}</span>▭ ${t}</b>${b.map(x => `<div style="padding-left:56px;color:#33445E">• ${x}</div>`).join('')}</div>`).join('')}
  </div><div style="flex:1;display:grid;place-items:center">${SLD({ inwin: true, w: 380, title: 'Chiffres clés', bullets: ['CA : 1,2 M€', '+8 % vs 2024'] })}</div></div>` })}
<div class="col" style="position:absolute;left:1110px;right:70px;top:190px;gap:16px">
 ${CARD('<b>Tous les titres</b> et toutes les puces sur une page', 2)}
 ${CARD('<b>Entrée</b> en fin de titre = nouvelle diapo', 3)}
 ${CARD('<b>Tab</b> sur une ligne de titre = elle devient puce', 4)}
 ${CARD('Les zones de texte « à la main » <b>n\'apparaissent pas</b> ici', 5, 'background:#FEF2F2')}
</div>`,
  n: `<p><b>Étape 1</b> : <i>Affichage › Mode Plan</i>. Le volet de gauche affiche le texte de toutes les diapos.</p>
  <p><b>Étape 2</b> : chaque diapo = un titre en gras, ses puces en dessous. Idéal pour écrire le fond d'abord et la forme ensuite.</p>
  <p><b>Étapes 3-4</b> : Entrée après un titre crée une nouvelle diapo ; Tab transforme ce titre en puce de la diapo précédente (et Maj+Tab fait l'inverse).</p>
  <p><b>Étape 5</b> : seuls les <b>espaces réservés</b> apparaissent dans le Plan. Une zone de texte dessinée à la main est invisible ici — encore une raison d'utiliser les dispositions.</p>` },

/* 20 — LES MODES D'AFFICHAGE */
{ title: 'Les modes d\'affichage', html: `${H('Six façons de voir votre présentation', 'Modes d\'affichage', PATH('Affichage > Affichages des présentations'))}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 ${[['▭', 'Normal', 'Éditer diapo par diapo', 'blanc'], ['☰', 'Mode Plan', 'Écrire et relire le texte', 'ocean'], ['▦', 'Trieuse', 'Vue d\'ensemble, réorganiser', 'foret'], ['🗒', 'Page de notes', 'Relire et imprimer les notes', 'violet'], ['📖', 'Lecture', 'Diaporama dans la fenêtre', 'sunset'], ['▶', 'Diaporama', 'Plein écran, devant le public', 'nuit']].map(([ic, t, d, th], i) => `
 <div class="card p1-vw f zoom" data-s="${i + 1}"><div style="display:flex;align-items:center;gap:14px"><span class="ico" style="width:58px;height:58px;font-size:28px;background:linear-gradient(135deg,#C43E1C,#FF8F6B)">${ic}</span><b>${t}</b></div><small>${d}</small></div>`).join('')}
</div>
<div class="card a fade" style="position:absolute;left:300px;right:300px;top:540px;padding:12px 24px;display:flex;align-items:center;gap:22px;font-size:19px;--d:.6s">
 <span style="color:#6B7A90">Barre d\'état :</span>${['≡ Notes', '▭', '▦', '📖', '▶'].map((x, i) => `<span class="p1-rel" style="padding:4px 10px;border-radius:6px;background:#F3F4F6">${x}${i ? `<em class="ow-hot f zoom" data-s="7"><b>${i}</b></em>` : ''}</span>`).join('')}<span style="margin-left:auto;color:#6B7A90">─────●── 62 %</span>
</div>`,
  n: `<p><b>Étapes 1 à 6</b> : <b>Normal</b> (par défaut, édition), <b>Mode Plan</b> (le texte), <b>Trieuse de diapositives</b> (toutes les miniatures en grille), <b>Page de notes</b> (relire / imprimer les notes du présentateur), <b>Lecture</b> (le diaporama dans la fenêtre, pratique pour se relire avec d'autres fenêtres ouvertes), <b>Diaporama</b> (plein écran).</p>
  <p><b>Étape 7</b> : les quatre boutons de la barre d'état donnent un accès direct à Normal, Trieuse, Lecture et Diaporama. Le mode Plan et la Page de notes ne sont que dans l'onglet Affichage.</p>` },

/* 21 — LA TRIEUSE */
{ title: 'La trieuse de diapositives', html: `${H('La trieuse : toute l\'histoire d\'un coup d\'œil', 'Vue d\'ensemble')}
${APPWIN({ app: 'ppt', x: 70, y: 175, w: 1060, h: 600, title: 'Bilan 2025.pptx', tab: 'Affichage', noribbon: false, groups: [['Affichages des présentations', ['▭ Normal', '☰ Mode Plan', '▦ Trieuse de diapositives', '🗒 Page de notes']]], hot: { '▦ Trieuse de diapositives': 1 },
  body: `<div style="position:absolute;inset:0;padding:20px 30px;background:#fff">
  ${[['Introduction', [['title', 'Bilan 2025'], ['content', 'Qui sommes-nous'], ['pic', 'La boutique']]], ['Résultats', [['two', 'Avant / Après'], ['chart', 'Ventes'], ['big', '+8 %']]], ['Projets', [['content', 'Projets 2026'], ['title', 'Merci']]]].map(([sec, ts], si) => `
   <div class="f" data-s="2" style="font:800 15px var(--font);color:#C43E1C;margin:${si ? 22 : 0}px 0 8px">▾ ${sec} <span style="color:#6B7A90;font-weight:600">(${ts.length} diapos)</span></div>
   <div style="display:flex;gap:22px">${ts.map(([l, t], i) => `<div style="display:flex;gap:6px;font:700 13px var(--font);color:#6B7A90" class="${si === 2 && i === 0 ? 'p1-mv' : ''}"><span>${si * 3 + i + 1}</span><div style="border-radius:5px;overflow:hidden;line-height:0;box-shadow:0 0 0 1px #CBD5E1">${MINIP01({ lay: l, t, w: 140, th: si === 2 && i === 1 ? 'nuit' : 'blanc' })}</div></div>`).join('')}</div>`).join('')}
 </div>` })}
<div class="col" style="position:absolute;left:1170px;right:70px;top:190px;gap:16px">
 ${CARD('<b>Grille</b> de miniatures', 1)}
 ${CARD('<b>Sections</b> en intertitres', 2)}
 ${CARD('<b>Glisser-déposer</b> pour réorganiser', 3)}
 ${CARD('Double-clic = retour en <b>Normal</b>', 4)}
</div>`,
  n: `<p><b>Étape 1</b> : <i>Affichage › Trieuse de diapositives</i> (ou le bouton grille de la barre d'état).</p>
  <p><b>Étape 2</b> : les sections apparaissent comme des intertitres (on les crée au module 03).</p>
  <p><b>Étape 3</b> : on glisse-dépose les miniatures — l'animation montre « Projets 2026 » qui remonte. Idéal pour 40 diapos.</p>
  <p><b>Étape 4</b> : un double-clic sur une miniature revient en mode Normal sur cette diapo. Astuce : réduisez le zoom (barre d'état) pour voir plus de miniatures.</p>` },

/* 22 — LANCER LE DIAPORAMA */
{ title: 'Lancer le diaporama', html: `${H('Projeter : F5, Maj+F5, Échap', 'Le diaporama')}
<svg viewBox="0 0 640 520" class="a pop" style="position:absolute;left:70px;top:180px;width:640px;height:520px;--d:.2s">
 <rect x="20" y="20" width="600" height="360" rx="18" fill="#0E1726"/><rect x="40" y="40" width="560" height="320" rx="6" fill="#1B2A41"/>
 <g class="p1-mon" style="transform-origin:320px 200px"><rect x="40" y="40" width="560" height="320" fill="#fff"/><text x="320" y="190" font-size="44" font-weight="900" text-anchor="middle" fill="#0E1726" font-family="Segoe UI,Arial">Bilan 2025</text><rect x="250" y="210" width="140" height="6" fill="#C43E1C"/><text x="320" y="250" font-size="20" text-anchor="middle" fill="#6B7A90" font-family="Segoe UI,Arial">Boulangerie Martin</text></g>
 <path d="M280 380 L260 450 H380 L360 380 Z" fill="#33445E"/><rect x="200" y="450" width="240" height="14" rx="7" fill="#1B2A41"/>
</svg>
<div class="col" style="position:absolute;left:770px;right:70px;top:185px;gap:16px">
 ${[['F5', 'Depuis le début', 'pour la vraie présentation'], ['Maj+F5', 'Depuis la diapo active', 'pour tester la diapo en cours'], ['Échap', 'Quitter le diaporama', 'retour à l\'édition'], ['N / P', 'Suivante / précédente', 'ou Espace, flèches, clic']].map(([k, d, sm], i) => `
 <div class="card p1-k f right" data-s="${i + 1}">${KEYS(k)}<div><span class="d">${d}</span><small>${sm}</small></div></div>`).join('')}
</div>
${TIP('Relisez <b>toujours</b> en diaporama avant d\'envoyer : fautes, débordements et animations ratées sautent aux yeux en plein écran.', { s: 5, kind: 'ok', x: 70, y: 700, w: 1460 })}`,
  n: `<p><b>Étape 1 — F5</b> : diaporama depuis la première diapo.</p>
  <p><b>Étape 2 — Maj+F5</b> : depuis la diapo active ; c'est le raccourci du concepteur pour vérifier une diapo qu'il vient de modifier.</p>
  <p><b>Étape 3 — Échap</b> : on sort et on revient à l'édition sur la diapo où l'on était.</p>
  <p><b>Étape 4</b> : pour avancer : clic, Espace, flèche droite ou N ; pour reculer : flèche gauche ou P.</p>
  <p><b>Étape 5</b> : bonne pratique de fin de module — relecture complète en diaporama. Sur Mac : ⌘+Maj+Entrée / ⌘+Entrée.</p>` },

/* 23 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Les cinq réflexes du débutant', k: 'Récap animé', hub: '5', hsub: 'réflexes', hk: 'PREMIERS PAS',
  items: [{ ic: '🧭', t: 'Repérer les 4 zones', d: 'Ruban, miniatures, diapositive, notes (+ barre d\'état)' }, { ic: '➕', t: 'Ctrl+M, Ctrl+D, Ctrl+↑↓', d: 'Ajouter, dupliquer, réorganiser les diapos' },
    { ic: '▦', t: 'Disposition d\'abord', d: 'Espaces réservés, jamais « Vide + zones de texte »' }, { ic: '⇥', t: 'Puces au clavier', d: 'Entrée, Tab, Maj+Tab — et 6 puces max' }, { ic: '▶', t: 'F5 / Maj+F5', d: 'Relire en diaporama avant d\'envoyer' }] }),
  n: `<p>Récap en cinq réflexes. Faites-les reformuler par le groupe avant de cliquer : « Quel raccourci pour une nouvelle diapo ? Que fait Rétablir ? Que faire si le texte déborde ? »</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Huit raccourcis à connaître', 'Raccourcis')}
${KEYCARDS([{ k: 'Ctrl+M', d: 'Nouvelle diapositive' }, { k: 'Ctrl+D', d: 'Dupliquer l\'objet ou la diapositive' }, { k: 'Ctrl+Entrée', d: 'Espace réservé suivant' }, { k: 'Tab', d: 'Abaisser le niveau de puce' }, { k: 'Maj+Tab', d: 'Remonter le niveau de puce' }, { k: 'F5', d: 'Diaporama depuis le début' }, { k: 'Maj+F5', d: 'Diaporama depuis la diapo active' }, { k: 'Ctrl+F1', d: 'Réduire / afficher le ruban' }], { cols: 4, y: 200 })}
${TIP('Ne confondez pas <b>Ctrl+N</b> (nouvelle <b>présentation</b>) et <b>Ctrl+M</b> (nouvelle <b>diapositive</b>).', { s: 9, kind: 'key', x: 70, y: 600, w: 900 })}`,
  n: `<p>Les huit raccourcis du module ; ils sont travaillés dans le <b>Lab 2</b>. Le piège classique : Ctrl+N au lieu de Ctrl+M ouvre une nouvelle fenêtre.</p><p>Sur Mac, Ctrl devient ⌘ (⌘+Maj+N pour une nouvelle diapo).</p>` },

/* 25 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'ppt', mod: 'p01', lab: 0, title: 'Lab 1 — Le bilan de la boulangerie Martin', tasks: ['Diapo 1 : un vrai titre contenant <b>Bilan 2025</b> + un sous-titre', 'Nouvelle diapo <b>Titre et contenu</b> « Chiffres clés », 3 puces minimum', '« Avant / Après » en disposition <b>Deux contenus</b>', '« Projets 2026 » juste après « Chiffres clés », conclusion : <b>5 diapos</b> min.', 'Relire en lançant le <b>diaporama</b> (F5)'] }),
  n: `<p>Scénario : Claire, gérante de la Boulangerie Martin (3 boutiques), présente son bilan à sa banque. Le brouillon de son stagiaire est à reprendre.</p>
  <p>Solution : titre « Bilan 2025 », sous-titre « Boulangerie Martin — Rendez-vous banque » ; Ctrl+M, « Chiffres clés » : CA 1,2 M€ / +8 % / 410 000 baguettes ; Disposition › Deux contenus pour Avant/Après ; réordonner puis ajouter « Merci — questions ? » ; F5 puis Échap.</p>
  <p>Point de vigilance : la tâche 3 — beaucoup copient tout dans la colonne de gauche. Il faut répartir « Avant » à gauche, « Après » à droite.</p>` },

/* 26 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'ppt', mod: 'p01', lab: 1, title: 'Lab 2 — Réflexes clavier du débutant', tasks: ['Nouvelle diapositive : <b>Ctrl+M</b>', 'Espace réservé suivant : <b>Ctrl+Entrée</b>', 'Abaisser puis remonter la puce : <b>Tab</b> · <b>Maj+Tab</b>', 'Annuler puis rétablir : <b>Ctrl+Z</b> · <b>Ctrl+Y</b>', 'Diaporama : <b>F5</b> puis <b>Maj+F5</b>'] }),
  n: `<p>Lab chronométré : enchaîner les 8 raccourcis le plus vite possible (Ctrl+M, Ctrl+Entrée, Tab, Maj+Tab, Ctrl+Z, Ctrl+Y, F5, Maj+F5).</p><p>Faites-le refaire deux fois : le deuxième passage est en général deux fois plus rapide.</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quel raccourci insère une nouvelle diapositive ?', o: ['Ctrl+N', 'Ctrl+M', 'Ctrl+Maj+D', 'Alt+N'], a: [1], e: 'Ctrl+M crée une nouvelle diapositive. Ctrl+N crée une nouvelle présentation.' },
  { q: 'Pourquoi préférer l\'espace réservé de titre à une simple zone de texte ?', o: ['Il est plus grand', 'Il est reconnu comme titre (mode Plan, navigation, accessibilité, thème)', 'Il ne peut pas être déplacé', 'Il s\'imprime en couleur'], a: [1], e: 'Le titre structure la présentation : il alimente le mode Plan, les zooms, les lecteurs d\'écran et suit le thème.' },
  { q: 'Dans une liste à puces, comment créer une sous-puce ?', o: ['Maj+Entrée', 'Ctrl+Entrée', 'Tab en début de puce', 'Alt+Flèche bas'], a: [2], e: 'Tab abaisse le niveau, Maj+Tab le remonte. Maj+Entrée passe à la ligne sans nouvelle puce.' },
  { q: 'Quel mode d\'affichage est le plus adapté pour réorganiser 40 diapositives ?', o: ['Page de notes', 'Lecture', 'Mode Plan', 'Trieuse de diapositives'], a: [3], e: 'La Trieuse affiche toutes les miniatures en grille : on glisse-dépose facilement et on voit les sections.' },
  { q: 'Le texte déborde et PowerPoint réduit la police tout seul. Que faire ?', o: ['Rien, c\'est prévu pour', 'Réduire encore la police à 10 pt', 'Couper le texte ou le répartir sur deux diapositives', 'Passer en disposition Vide'], a: [2], e: 'L\'ajustement automatique est un signal : trop de texte. On synthétise, on déplace le détail dans les notes ou on scinde.' },
  { q: 'Quels raccourcis lancent le diaporama ?', o: ['F5 depuis le début', 'Maj+F5 depuis la diapo active', 'Ctrl+F1', 'Échap'], a: [0, 1], e: 'F5 depuis le début, Maj+F5 depuis la diapo en cours. Échap quitte le diaporama, Ctrl+F1 réduit le ruban.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) c · 4) d · 5) c · 6) a et b.</p><p>Sur la question 2, insistez à nouveau sur l'accessibilité : un lecteur d'écran annonce le titre de chaque diapo.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P01', html: END(), n: `<p>Fin du module 01. Prochain module : <b>mettre en forme</b> avec les thèmes, le texte, les formes et l'alignement.</p>` },
] };
