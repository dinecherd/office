/* ===================== MODULE W03 — Styles, titres, navigation et table des matières ===================== */
const SECSW03 = ['Comprendre et appliquer les styles', 'Modifier et créer des styles', 'Naviguer et générer la table des matières'];

/* ---- helpers locaux W03 ---- */
const DLGW03 = o => `<div class="${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.12);font-family:'Segoe UI',sans-serif;${o.s ? '' : `--d:${o.d ?? .2}s`}">
 <div style="display:flex;align-items:center;padding:10px 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#6B7A90">✕</span></div>
 <div style="padding:18px 22px;font-size:18px;color:#1B2A41">${o.html}</div></div>`;
const MENUW03 = o => `<div class="f zoom" data-s="${o.s}" style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w || 380}px;background:#fff;border-radius:10px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;font-size:19px;padding:6px 0">
 ${o.items.map(([t, on]) => `<div style="padding:9px 18px;${on ? 'background:#EFF6FF;font-weight:800;color:#185ABD' : ''}">${t}</div>`).join('')}</div>`;
/* table des matières (maquette) */
const TOCW03 = (rows, o = {}) => `<div class="pg-toc ${o.cls || ''}" ${o.s ? `data-s="${o.s}"` : ''} style="font-size:${o.fs || 17}px;${o.style || ''}">${rows.map(([t, p, l, c]) => `<div style="padding-left:${(l || 0) * 22}px;${c ? `color:${c};font-weight:700` : ''}">${t}<span>${p}</span></div>`).join('')}</div>`;
/* volet de navigation (maquette) */
const NAVW03 = (items, o = {}) => `<div style="position:absolute;left:0;top:0;bottom:0;width:${o.w || 250}px;background:#fff;border-right:1px solid #E3E8EF;padding:14px 12px;font-family:'Segoe UI',sans-serif">
 <div style="font-size:17px;font-weight:700;margin-bottom:6px">Navigation</div><div style="display:flex;gap:14px;font-size:14px;margin-bottom:10px"><b style="color:#185ABD;border-bottom:2px solid #185ABD">Titres</b><span>Pages</span><span>Résultats</span></div>
 ${items.map(([t, l, on]) => `<div style="padding:5px 8px 5px ${8 + (l - 1) * 18}px;font-size:${l === 1 ? 17 : 15}px;${l === 1 ? 'font-weight:700;' : ''}${on ? 'background:#DBEAFE;border-radius:5px;' : ''}">${l === 1 ? '◢ ' : ''}${t}</div>`).join('')}</div>`;

window.MODULE = { code: 'W03', title: 'Styles, titres, navigation et table des matières', short: 'Styles et table des matières', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Styles et table des matières', html: TITLE({ mod: 'WORD · MODULE 03 · INTERMÉDIAIRE', title: 'Le super-pouvoir de Word : <span class="grad">les styles</span>', sub: '« Une structure propre, une navigation instantanée, un sommaire qui se met à jour »', agenda: SECSW03, art: APPART('word') }),
  n: `<p>Module W03, durée indicative <b>55 minutes</b>. C'est le module qui change le plus la façon de travailler : après lui, plus personne ne met un titre en forme « à la main ».</p>
<p>Lab final : le rapport d'activité de l'agence <b>Pixel &amp; Co</b>, à structurer avec les styles et à doter d'une table des matières à jour.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Appliquer et modifier les styles <b>Titre 1</b>, <b>Titre 2</b>, <b>Normal</b> et <b>Citation</b>', 'Créer un style et comprendre l\'<b>héritage</b>', 'Naviguer et réorganiser avec le <b>volet de navigation</b>', 'Insérer et <b>mettre à jour</b> une table des matières automatique', 'Numéroter automatiquement les titres <b>1 · 1.1 · 1.1.1</b>']),
  n: `<p>Cinq objectifs. Les trois derniers reposent entièrement sur le premier : sans styles de titre, pas de volet de navigation utile, pas de table des matières automatique, pas de numérotation des titres.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW03, 0), n: `<p>Première partie : qu'est-ce qu'un style, et comment l'appliquer.</p>` },

/* 4 — QU'EST-CE QU'UN STYLE */
{ title: 'Qu\'est-ce qu\'un style ?', html: `${H('Un style = un ensemble nommé de réglages', 'Définition')}
${FLOW({ x: 70, y: 165, w: 1460, h: 620,
  n: { s: { x: 730, y: 310, pw: 260, ph: 130, fill: '#185ABD', stroke: '#185ABD', html: `<text x="730" y="300" text-anchor="middle" font-size="40" font-weight="900" fill="#fff">Titre 1</text><text x="730" y="338" text-anchor="middle" font-size="18" fill="#fff" opacity=".8">un seul nom</text>`, hot: true },
    a: { x: 200, y: 90, pw: 300, ph: 70, html: `<text x="200" y="98" text-anchor="middle" font-size="22" font-weight="700" fill="#0E1726">Police · Aptos Display</text>`, s: 1 },
    b: { x: 200, y: 310, pw: 300, ph: 70, html: `<text x="200" y="318" text-anchor="middle" font-size="22" font-weight="700" fill="#0E1726">16 pt · bleu</text>`, s: 1 },
    c: { x: 200, y: 530, pw: 300, ph: 70, html: `<text x="200" y="538" text-anchor="middle" font-size="22" font-weight="700" fill="#0E1726">Espace avant 18 pt</text>`, s: 2 },
    d: { x: 1260, y: 90, pw: 300, ph: 70, html: `<text x="1260" y="98" text-anchor="middle" font-size="22" font-weight="700" fill="#0E1726">Paragraphes solidaires</text>`, s: 2 },
    e: { x: 1260, y: 310, pw: 300, ph: 70, html: `<text x="1260" y="318" text-anchor="middle" font-size="22" font-weight="700" fill="#0E1726">Niveau hiérarchique 1</text>`, s: 3 },
    f: { x: 1260, y: 530, pw: 300, ph: 70, html: `<text x="1260" y="538" text-anchor="middle" font-size="22" font-weight="700" fill="#0E1726">Style suivant : Normal</text>`, s: 3 } },
  l: [{ a: 'a', b: 's', r: 'hvh', s: 1 }, { a: 'b', b: 's', s: 1 }, { a: 'c', b: 's', r: 'hvh', s: 2 }, { a: 's', b: 'd', r: 'hvh', s: 2 }, { a: 's', b: 'e', s: 3 }, { a: 's', b: 'f', r: 'hvh', s: 3 }] })}`,
  n: `<p>Un <b>style</b> rassemble sous un nom (« Titre 1 ») tout un ensemble de réglages.</p>
<p><b>Étape 1</b> : réglages de <b>caractères</b> : police, taille, couleur.</p>
<p><b>Étape 2</b> : réglages de <b>paragraphe</b> : espacements, enchaînements (le titre reste solidaire du texte qui suit).</p>
<p><b>Étape 3</b> : et surtout, le <b>sens</b> : un niveau hiérarchique (c'est un titre de niveau 1), et le style du paragraphe suivant (après un titre, on tape du texte Normal).</p>
<p>Au lieu de faire 6 réglages sur chaque titre, on applique un nom. C'est le point clé à faire comprendre.</p>` },

/* 5 — MANUEL VS STYLE */
{ title: 'Mise en forme manuelle vs style', html: `${H('Changer 40 titres en un seul geste', 'Pourquoi les styles changent tout')}
<style>.tiW03{transition:color .7s,font-family .7s}.tiW03.on{color:#C43E1C!important;font-family:Georgia,serif}</style>
${PAGE({ x: 70, y: 180, w: 440, html: `<div style="font-size:14px;color:#DC2626;font-weight:700;margin-bottom:8px">GRAS À LA MAIN</div>${['Synthèse', 'Résultats', 'Perspectives'].map(t => `<p style="font-size:20px;font-weight:700;color:#185ABD;margin-top:12px">${t}</p>${LINES(2)}`).join('')}` })}
${PAGE({ x: 560, y: 180, w: 440, s: 1, html: `<div style="font-size:14px;color:#16A34A;font-weight:700;margin-bottom:8px">STYLE TITRE 1</div>${['Synthèse', 'Résultats', 'Perspectives'].map(t => `<h2 class="tiW03" data-s="3" style="font-size:22px;margin-top:12px">${t}</h2>${LINES(2)}`).join('')}` })}
<div class="col" style="position:absolute;left:1050px;right:70px;top:190px;gap:16px">
 ${CARD('<b>Cohérence</b> — tous les titres d\'un niveau identiques', 2)}${CARD('<b>Modification globale</b> — on change le style, tout suit', 3)}
 ${CARD('<b>Structure</b> — navigation, sommaire, signets PDF, accessibilité', 4)}</div>
${TIP('Modifier le style <b>Titre 1</b> → les 3 titres changent <b>ensemble</b>.', { s: 3, x: 560, y: 650, w: 440, kind: 'ok' })}`,
  n: `<p>À gauche, des titres mis en forme à la main (gras bleu 14). À droite, les mêmes avec le style Titre 1.</p>
<p><b>Étape 1</b> : visuellement identiques… pour l'instant.</p>
<p><b>Étape 2</b> : <b>cohérence</b> : impossible d'avoir un titre en 14 et un autre en 15 par erreur.</p>
<p><b>Étape 3</b> : la charte change (police Georgia, couleur rouge) : on modifie le style une seule fois, tous les titres suivent. À gauche, il faudrait reprendre chaque titre.</p>
<p><b>Étape 4</b> : surtout, Word <b>sait</b> que ce sont des titres : volet de navigation, table des matières, signets dans le PDF, lecteurs d'écran pour l'accessibilité.</p>` },

/* 6 — APPLIQUER */
{ title: 'Appliquer un style', html: `${H('Un clic dedans, un clic sur le style', 'Appliquer', PATH('Accueil > Styles > Titre 1'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1020, h: 600, title: 'Rapport_2026.docx', tab: 'Accueil',
  groups: [['Police', ['Aptos ▾', '11 ▾', 'G', 'I']], ['Paragraphe', ['☰', '¶']], ['Styles', ['Normal', 'Sans interligne', 'Titre 1', 'Titre 2', 'Citation', '▾']]],
  hot: { 'Titre 1': 2, 'Titre 2': 3, 'Citation': 4, '▾': 5 },
  body: PAGE({ inwin: true, w: 640, html: `<div style="position:relative"><p class="f" data-s="1" style="position:absolute;left:-30px;top:4px;font-size:22px;color:#FA582D">▸</p><h1 style="font-size:26px">Synthèse</h1></div>${LINES(2)}<h2 class="f" data-s="3" style="font-size:20px">Chiffre d'affaires</h2>${LINES(2)}<p class="f" data-s="4" style="font-style:italic;color:#475569;text-align:center;font-size:17px">« Nous livrons dans les délais. » — Sophie</p>` }) })}
<div class="col" style="position:absolute;left:1130px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Clic <b>dans</b> la ligne (pas besoin de sélectionner)', 1)}${CARD('<b>2 · Titre 1</b> : grandes parties', 2)}${CARD('<b>3 · Titre 2</b> : sous-parties', 3)}${CARD('<b>4 · Citation</b> : verbatim, témoignage', 4)}${CARD('<b>5 · ▾</b> : toute la galerie', 5)}</div>`,
  n: `<p><b>Étape 1</b> : un style de paragraphe s'applique au paragraphe entier où se trouve le curseur : un clic dans la ligne suffit.</p>
<p><b>Étape 2</b> : galerie Styles › <b>Titre 1</b> pour les grandes parties (Synthèse, Résultats, Perspectives dans le lab).</p>
<p><b>Étape 3</b> : <b>Titre 2</b> pour les sous-parties (Chiffre d'affaires, Ressources humaines). Astuce : Titre 2 n'apparaît dans la galerie qu'une fois Titre 1 utilisé ; Titre 3 de même.</p>
<p><b>Étape 4</b> : <b>Citation</b> pour un témoignage.</p>
<p><b>Étape 5</b> : la flèche ▾ déroule toute la galerie (et donne accès à « Créer un style », « Effacer la mise en forme », « Appliquer des styles »).</p>` },

/* 7 — RACCOURCIS DE STYLES */
{ title: 'Les styles essentiels', html: `${H('Cinq styles et leurs raccourcis', 'Au clavier')}
<div style="position:absolute;left:70px;top:185px;width:820px">
 <table class="tbl"><tr><th>Style</th><th>Raccourci</th><th>Usage</th></tr>
 ${[['Normal', 'Ctrl+Maj+N', 'Corps de texte'], ['Titre 1', 'Ctrl+Alt+1', 'Grandes parties'], ['Titre 2', 'Ctrl+Alt+2', 'Sous-parties'], ['Titre 3', 'Ctrl+Alt+3', 'Sous-sous-parties'], ['Citation', '—', 'Verbatim, témoignage']].map(([a, b, c], i) => `<tr class="f" data-s="${i + 1}"><td>${a}</td><td>${b === '—' ? b : KEYS(b)}</td><td>${c}</td></tr>`).join('')}</table></div>
<svg viewBox="0 0 560 560" style="position:absolute;left:960px;top:185px;width:560px;height:560px">
 <rect x="0" y="0" width="560" height="560" rx="10" fill="#fff" stroke="#E3E8EF" stroke-width="2"/>
 ${[[1, 'Synthèse', 40], [0, '', 80], [1, 'Résultats', 150], [2, 'Chiffre d\'affaires', 195], [0, '', 235], [3, 'Par secteur', 300], [0, '', 340], [2, 'Ressources humaines', 405], [0, '', 445], [1, 'Perspectives', 510]].map(([l, t, y]) => l ?
    `<g class="f" data-s="${l + 1}"><rect x="${20 + (l - 1) * 40}" y="${y - 24}" width="56" height="30" rx="6" fill="${['', '#185ABD', '#2F5496', '#7C3AED'][l]}"/><text x="${48 + (l - 1) * 40}" y="${y - 3}" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">T${l}</text><text x="${90 + (l - 1) * 40}" y="${y - 2}" font-size="${28 - l * 3}" font-weight="700" fill="${['', '#185ABD', '#2F5496', '#7C3AED'][l]}">${t}</text></g>` :
    `<g class="f" data-s="1"><rect x="90" y="${y - 20}" width="400" height="10" rx="5" fill="#E2E8F0"/><rect x="90" y="${y - 2}" width="300" height="10" rx="5" fill="#E2E8F0"/></g>`).join('')}
</svg>`,
  n: `<p>Les raccourcis à retenir. Dans un long document, on tape le titre, Ctrl+Alt+1, Entrée, et on enchaîne avec le texte : le style suivant est automatiquement Normal.</p>
<p><b>Étape 1</b> : <b>Normal</b> (Ctrl+Maj+N) : le corps du texte. C'est aussi le style de base dont héritent presque tous les autres.</p>
<p><b>Étapes 2 à 4</b> : <b>Titre 1, 2, 3</b> (Ctrl+Alt+1/2/3). À droite, la hiérarchie se construit : T1 › T2 › T3. Ne sautez pas de niveau (pas de Titre 3 directement sous un Titre 1).</p>
<p><b>Étape 5</b> : <b>Citation</b> : pas de raccourci, galerie des styles.</p>
<p>Attention sur certains claviers : Ctrl+Alt = AltGr, ça fonctionne aussi.</p>` },

/* 8 — LE STYLE DÉCRIT LA FONCTION */
{ title: 'Le style décrit la fonction', html: `${H('Un style décrit la fonction, pas l\'apparence', 'Erreur fréquente')}
${PAGE({ x: 70, y: 180, w: 700, html: `<h1 style="font-size:24px">Résultats</h1><h2 style="font-size:19px">Chiffre d'affaires</h2>${LINES(2)}<h2 style="font-size:18px;background:#FEE2E2;padding:4px 6px;border-radius:4px">Ce paragraphe a été mis en Titre 2 par erreur alors qu'il s'agit de texte courant…</h2>${LINES(2)}<h2 style="font-size:19px">Ressources humaines</h2>` })}
<div class="f right" data-s="1" style="position:absolute;left:830px;top:180px;width:700px">
 <div style="font-size:20px;font-weight:800;margin-bottom:10px">Table des matières générée :</div>
 <div class="card" style="padding:20px 24px">${TOCW03([['Résultats', 2], ['Chiffre d\'affaires', 2, 1], ['Ce paragraphe a été mis en Titre 2 par erreur…', 2, 1, '#DC2626'], ['Ressources humaines', 3, 1]], { fs: 20, style: 'border:0;margin:0' })}</div></div>
${PROC([{ p: 'Clic dans le paragraphe > Styles > Normal', t: 'ou Ctrl+Maj+N' }, { p: 'Références > Mettre à jour la table', t: 'L\'entrée parasite disparaît' }], { x: 830, y: 470, w: 700, s0: 2 })}`,
  n: `<p>L'erreur classique : quelqu'un a appliqué Titre 2 à un paragraphe de texte « parce que c'était joli ».</p>
<p><b>Étape 1</b> : conséquence : ce paragraphe apparaît dans la table des matières, dans le volet de navigation et dans les signets du PDF.</p>
<p><b>Étape 2</b> : correction : clic dans le paragraphe › style <b>Normal</b> (Ctrl+Maj+N).</p>
<p><b>Étape 3</b> : on met à jour la table des matières. C'est la tâche 3 du lab.</p>
<p>Règle d'or : le style dit <i>ce qu'est</i> le texte (un titre, une citation, une légende), pas à quoi il ressemble. Pour un texte simplement mis en valeur : gras, ou un style de caractère « Accentuation ».</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW03, 1), n: `<p>Deuxième partie : adapter les styles à sa charte, en créer, comprendre l'héritage et les thèmes.</p>` },

/* 10 — MODIFIER PAR L'EXEMPLE */
{ title: 'Modifier par l\'exemple', html: `${H('Modifier un style « par l\'exemple »', 'Méthode 1')}
${PROC([{ p: 'Mettre en forme un titre à la main', t: 'Ex. : Georgia 18 pt, rouge brique' }, { p: 'Clic droit sur Titre 1 dans la galerie', t: 'Le titre modifié restant sélectionné' }, { p: 'Mettre à jour Titre 1 pour correspondre à la sélection', t: 'Tous les Titre 1 du document suivent' }], { w: 760, y: 185 })}
<div class="a pop" style="--d:.2s;position:absolute;left:880px;top:185px;width:650px;display:flex;gap:10px;padding:14px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -20px rgba(14,23,38,.5),0 0 0 1px #E3E8EF;font-family:'Segoe UI',sans-serif">
 ${['Normal', 'Titre 1', 'Titre 2', 'Citation'].map(t => `<span style="position:relative;flex:1;text-align:center;padding:16px 6px;border:1px solid #E3E8EF;border-radius:6px;font-size:18px;${t === 'Titre 1' ? 'color:#185ABD;font-weight:700' : ''}">${t}${t === 'Titre 1' ? '<em class="ow-hot f zoom" data-s="2"><b>2</b></em>' : ''}</span>`).join('')}</div>
${MENUW03({ s: 2, x: 980, y: 290, w: 550, items: [['Mettre à jour Titre 1 pour correspondre à la sélection', 1], ['Modifier…'], ['Sélectionner toutes les occurrences : 5'], ['Renommer…'], ['Supprimer de la galerie de styles']] })}
<div class="f zoom" data-s="3" style="position:absolute;left:880px;top:600px;width:650px;display:flex;gap:14px;flex-wrap:wrap">
 ${['Synthèse', 'Résultats', 'Perspectives'].map(t => `<span style="padding:10px 18px;background:#fff;border-radius:8px;box-shadow:0 0 0 1px #E3E8EF;font:700 24px Georgia,serif;color:#C43E1C">${t}</span>`).join('')}<span class="chip ok" style="font-size:19px">✔ tous à jour</span></div>`,
  n: `<p>Méthode la plus intuitive pour les débutants.</p>
<p><b>Étape 1</b> : on met en forme un titre (déjà en Titre 1) exactement comme souhaité, avec les outils du module W02.</p>
<p><b>Étape 2</b> : en gardant ce titre sélectionné, <b>clic droit</b> sur « Titre 1 » dans la galerie › <b>Mettre à jour Titre 1 pour correspondre à la sélection</b>.</p>
<p><b>Étape 3</b> : tous les paragraphes en Titre 1 du document prennent la nouvelle apparence.</p>
<p>Le même menu propose « Sélectionner toutes les occurrences » : pratique pour vérifier combien de paragraphes utilisent un style.</p>` },

/* 11 — MODIFIER PAR LA BOÎTE */
{ title: 'La boîte Modifier le style', html: `${H('Modifier le style : la boîte complète', 'Méthode 2', PATH('Clic droit sur le style > Modifier…'))}
${DLGW03({ x: 70, y: 180, w: 860, t: 'Modifier le style', html: `
 <div style="display:grid;grid-template-columns:170px 1fr;gap:10px 14px;align-items:center;font-size:17px">
  <span>Nom :</span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px">Titre 1</span>
  <span>Style basé sur :</span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px">¶ Normal</span>
  <span>Paragraphe suivant :</span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px">¶ Normal</span></div>
 <div style="margin:14px 0;border:1px solid #E3E8EF;border-radius:6px;padding:14px;font:700 24px Georgia,serif;color:#C43E1C">Synthèse</div>
 <div style="display:flex;justify-content:space-between;align-items:center">
  <span style="position:relative;font-size:17px">☐ Mettre à jour automatiquement<em class="ow-hot f zoom" data-s="3" style="inset:-4px -8px;border-color:#DC2626"><b style="background:#DC2626">!</b></em></span>
  <span style="position:relative;padding:5px 14px;border:1px solid #94A3B8;border-radius:5px">Format ▾<em class="ow-hot f zoom" data-s="1"><b>1</b></em></span></div>` })}
${MENUW03({ s: 1, x: 690, y: 470, w: 250, items: [['Police…'], ['Paragraphe…', 1], ['Tabulations…'], ['Bordure…'], ['Langue…'], ['Numérotation…']] })}
<div class="col" style="position:absolute;left:990px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Format</b> : police, paragraphe, bordure, numérotation…', 1)}${CARD('<b>2 ·</b> Ex. <b>Paragraphe › Enchaînements › Saut de page avant</b> : chaque chapitre en haut de page', 2)}</div>
${TIP('<b>Mettre à jour automatiquement</b> : toujours <b>décoché</b>. Sinon un simple gras sur un titre modifie tous les titres.', { s: 3, x: 990, y: 480, w: 540, kind: 'warn' })}`,
  n: `<p>Clic droit sur le style dans la galerie › <b>Modifier…</b> : tous les réglages en un seul endroit.</p>
<p><b>Étape 1</b> : le bouton <b>Format</b> en bas à gauche donne accès aux boîtes Police, Paragraphe, Tabulations, Bordure, Langue, Numérotation.</p>
<p><b>Étape 2</b> : exemple utile : Format › Paragraphe › Enchaînements › <b>Saut de page avant</b> sur Titre 1 : chaque grande partie commence en haut de page, sans saut manuel.</p>
<p><b>Étape 3</b> : piège : l'option <b>Mettre à jour automatiquement</b> doit rester décochée. Sinon, la moindre mise en forme manuelle sur un titre est propagée à tous les titres du même style. Question 4 du quiz.</p>
<p>Option en bas de la boîte : « Uniquement dans ce document » / « Nouveaux documents basés sur ce modèle ».</p>` },

/* 12 — VOLET STYLES ET NOUVEAU STYLE */
{ title: 'Volet Styles et nouveau style', html: `${H('Le volet Styles et la création d\'un style', 'Créer', KEYS('Ctrl+Alt+Maj+S'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:380px;height:600px;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;font-family:'Segoe UI',sans-serif;padding:18px 20px">
 <div style="font-size:21px;font-weight:700;margin-bottom:12px">Styles</div>
 ${[['Effacer tout', ''], ['Normal', '¶'], ['Sans interligne', '¶'], ['Titre 1', '¶a'], ['Titre 2', '¶a'], ['Titre 3', '¶a'], ['Titre', '¶a'], ['Citation', '¶a'], ['Accentuation', 'a'], ['Légende', '¶']].map(([t, k]) => `<div style="display:flex;justify-content:space-between;padding:7px 8px;font-size:18px;${t === 'Titre 1' ? 'background:#DBEAFE;border-radius:5px' : ''}">${t}<span style="color:#6B7A90">${k}</span></div>`).join('')}
 <div style="display:flex;gap:14px;margin-top:14px;font-size:24px"><span style="position:relative;padding:2px 8px">A⁺<em class="ow-hot f zoom" data-s="1"><b>1</b></em></span><span>A🔍</span><span>A✓</span></div></div>
${DLGW03({ x: 500, y: 180, w: 640, t: 'Créer un style à partir de la mise en forme', s: 1, html: `
 <div style="display:grid;grid-template-columns:220px 1fr;gap:12px 14px;align-items:center;font-size:18px">
  <span>Nom :</span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px"><b class="tw f" data-s="2" style="--n:13;border-right-color:#185ABD">Encadré info</b></span>
  <span>Type de style :</span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px">Paragraphe</span>
  <span style="position:relative">Style basé sur :<em class="ow-hot f zoom" data-s="3" style="inset:-4px"><b>3</b></em></span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px">¶ Normal</span>
  <span style="position:relative">Paragraphe suivant :<em class="ow-hot f zoom" data-s="4" style="inset:-4px"><b>4</b></em></span><span style="border:1px solid #94A3B8;padding:4px 10px;border-radius:4px">¶ Normal</span></div>
 <div style="margin-top:16px;border-left:5px solid #0EA5E9;background:#F0F9FF;padding:12px 16px;font:18px Calibri,sans-serif">ℹ Les demandes doivent parvenir avant le 30 novembre.</div>` })}
<div class="col" style="position:absolute;left:1180px;right:70px;top:190px;gap:16px">
 ${CARD('<b>¶</b> style de paragraphe · <b>a</b> style de caractère', 1)}${CARD('<b>Nom</b> explicite : sa fonction', 2)}${CARD('<b>Basé sur</b> : héritage', 3)}${CARD('<b>Suivant</b> : style après Entrée', 4)}</div>`,
  n: `<p>Le volet <b>Styles</b> s'ouvre avec le lanceur ↘ du groupe Styles ou <b>Ctrl+Alt+Maj+S</b>. Le symbole ¶ = style de paragraphe, a = style de caractère, ¶a = lié (les deux).</p>
<p><b>Étape 1</b> : bouton <b>Nouveau style</b> (A⁺) en bas du volet.</p>
<p><b>Étape 2</b> : nom explicite qui décrit la fonction (« Encadré info », « Légende tableau »), pas l'apparence (« Bleu 12 »).</p>
<p><b>Étape 3</b> : <b>Style basé sur</b> : le nouveau style hérite de tout ce qu'on ne modifie pas (diapo suivante).</p>
<p><b>Étape 4</b> : <b>Style du paragraphe suivant</b> : après un Titre 1, Entrée → Normal. Pour un style de liste, le suivant est lui-même.</p>` },

/* 13 — HÉRITAGE */
{ title: 'L\'héritage des styles', html: `${H('Changer Normal, c\'est changer presque tout', 'Héritage « basé sur »')}
${FLOW({ x: 70, y: 165, w: 1460, h: 520,
  n: { n: { x: 200, y: 260, pw: 240, ph: 110, fill: '#0E1726', stroke: '#0E1726', html: `<text x="200" y="256" text-anchor="middle" font-size="30" font-weight="900" fill="#fff">Normal</text><text x="200" y="290" text-anchor="middle" font-size="18" fill="#FFB37A">Aptos 11</text>`, hot: true },
    t1: { x: 700, y: 80, pw: 260, ph: 80, html: `<text x="700" y="90" text-anchor="middle" font-size="24" font-weight="800" fill="#185ABD">Titre 1</text>`, s: 1 },
    ci: { x: 700, y: 260, pw: 260, ph: 80, html: `<text x="700" y="270" text-anchor="middle" font-size="24" font-weight="800" fill="#475569" font-style="italic">Citation</text>`, s: 1 },
    en: { x: 700, y: 440, pw: 260, ph: 80, html: `<text x="700" y="450" text-anchor="middle" font-size="24" font-weight="800" fill="#0EA5E9">Encadré info</text>`, s: 1 },
    t2: { x: 1220, y: 80, pw: 260, ph: 80, html: `<text x="1220" y="90" text-anchor="middle" font-size="24" font-weight="800" fill="#2F5496">Titre 2</text>`, s: 2 } },
  l: [{ a: 'n', b: 't1', r: 'hvh', s: 1 }, { a: 'n', b: 'ci', s: 1 }, { a: 'n', b: 'en', r: 'hvh', s: 1 }, { a: 't1', b: 't2', s: 2, lab: 'basé sur', lx: 960, ly: 80 }],
  p: [{ s: 3, seg: [{ via: ['n', 't1'], lab: 'police', t: 1.4 }, { via: ['t1', 't2'], lab: 'police', t: 1.4 }] }] })}
${TIP('Changez la police de <b>Normal</b> : tous les styles basés sur Normal l\'adoptent, <b>sauf</b> s\'ils la redéfinissent.', { s: 3, x: 70, y: 690, w: 900, kind: 'tip' })}
${TIP('Réglez la police du document dans <b>Création › Polices</b> (thème).', { s: 4, x: 1010, y: 690, w: 520, kind: 'ok' })}`,
  n: `<p>Les styles forment un arbre d'héritage.</p>
<p><b>Étape 1</b> : la plupart des styles sont <b>basés sur Normal</b>.</p>
<p><b>Étape 2</b> : on peut chaîner : un style basé sur un style basé sur Normal.</p>
<p><b>Étape 3</b> : si on modifie la police de Normal, elle « descend » dans tous les styles qui n'ont pas redéfini leur propre police. C'est puissant… et parfois surprenant : un formateur change Normal et les légendes changent aussi.</p>
<p><b>Étape 4</b> : pour la police globale, le plus propre est de passer par le <b>thème</b> (Création › Polices) : diapo suivante.</p>` },

/* 14 — THÈMES ET JEUX DE STYLES */
{ title: 'Thèmes et jeux de styles', html: `${H('Relooker tout le document en un clic', 'Création > Mise en forme du document')}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1460, h: 190, title: 'Rapport_2026.docx', tab: 'Création',
  groups: [['Thèmes', ['🎨 Thèmes']], ['Mise en forme du document', ['Titre ▤', 'Titre ▤ ', 'Titre ▤  ', 'Titre ▤   ']], ['', ['🎨 Couleurs', 'Aa Polices', '↕ Espacement']], ['Arrière-plan', ['💧 Filigrane', '▢ Bordures']]],
  hot: { '🎨 Thèmes': 1, 'Titre ▤ ': 2, '🎨 Couleurs': 3, 'Aa Polices': 3 }, body: '' })}
<div style="position:absolute;left:70px;right:70px;top:400px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
 ${[['Office', '#185ABD', 'Aptos', 1], ['Rétrospective', '#C43E1C', 'Georgia', 2], ['Ion', '#0F766E', 'Century Gothic', 3]].map(([n, c, f, s]) => `<div class="card f zoom" data-s="${s}" style="padding:22px 26px"><div style="font-size:15px;color:#6B7A90;font-weight:700;margin-bottom:8px">THÈME ${n.toUpperCase()}</div>
  <div style="font:700 26px ${f},sans-serif;color:${c}">Synthèse</div><div style="height:9px;width:90%;background:#E2E8F0;border-radius:5px;margin:10px 0"></div><div style="height:9px;width:70%;background:#E2E8F0;border-radius:5px"></div>
  <div style="font:700 21px ${f},sans-serif;color:${c};margin-top:14px;opacity:.8">Résultats</div></div>`).join('')}</div>
${TIP('Ne fonctionne que si le document <b>utilise des styles</b>.', { s: 4, x: 70, y: 700, w: 700, kind: 'warn' })}`,
  n: `<p>L'onglet <b>Création</b> agit sur l'ensemble du document.</p>
<p><b>Étape 1</b> : <b>Thèmes</b> : un ensemble cohérent de couleurs, polices et effets (le même que dans Excel et PowerPoint : pratique pour harmoniser).</p>
<p><b>Étape 2</b> : <b>Mise en forme du document</b> : des jeux de styles complets (apparence des titres, espacements).</p>
<p><b>Étape 3</b> : <b>Couleurs</b> et <b>Polices</b> séparément : par exemple, adopter les couleurs de l'entreprise.</p>
<p><b>Étape 4</b> : tout cela ne s'applique qu'au texte qui utilise des styles et les couleurs du thème. Un titre « gras bleu à la main » ne bougera pas : encore un argument pour les styles.</p>` },

/* 15 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW03, 2), n: `<p>Troisième partie : ce que les styles rendent possible : le volet de navigation, la table des matières et la numérotation des titres.</p>` },

/* 16 — VOLET DE NAVIGATION */
{ title: 'Le volet de navigation', html: `${H('Le plan du document, toujours visible', 'Volet de navigation', PATH('Affichage > Afficher > Volet de navigation'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1060, h: 610, title: 'Rapport_2026.docx', tab: 'Affichage',
  groups: [['Affichages', ['📄 Page', '☰ Plan']], ['Afficher', ['☐ Règle', '☑ Volet de navigation']], ['Zoom', ['🔍 Zoom', '100 %']]],
  hot: { '☑ Volet de navigation': 1, '☰ Plan': 4 },
  body: `${NAVW03([['Synthèse', 1], ['Résultats', 1, 1], ['Chiffre d\'affaires', 2], ['Ressources humaines', 2], ['Perspectives', 1]])}
  <div style="position:absolute;left:250px;right:0;top:0;bottom:0">${PAGE({ inwin: true, w: 560, html: `<h1 style="font-size:24px">Résultats</h1>${LINES(3)}<h2 style="font-size:19px">Chiffre d'affaires</h2>${LINES(3)}` })}</div>
  <div class="f zoom" data-s="2" style="position:absolute;left:150px;top:118px;font-size:30px">👆</div>` })}
<div class="col" style="position:absolute;left:1170px;right:70px;top:190px;gap:16px">
 ${CARD(`<b>1 ·</b> Ouvrir : ${KEYS('Ctrl+F')}`, 1)}${CARD('<b>2 ·</b> Clic sur un titre = <b>saut immédiat</b>', 2)}${CARD('<b>3 ·</b> Onglets <b>Titres · Pages · Résultats</b>', 3)}${CARD('<b>4 · Mode Plan</b> : restructurer par niveau', 4)}</div>
${TIP('Un titre manque ? Il est en <b>gras manuel</b>, pas en style.', { s: 5, x: 1170, y: 640, w: 360, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : Affichage › Afficher › <b>Volet de navigation</b>, ou <b>Ctrl+F</b> (qui ouvre le volet sur l'onglet Résultats de recherche).</p>
<p><b>Étape 2</b> : un clic sur un titre amène directement à cette partie. Dans un rapport de 80 pages, c'est un gain énorme.</p>
<p><b>Étape 3</b> : trois onglets : <b>Titres</b> (le plan), <b>Pages</b> (miniatures), <b>Résultats</b> (recherche).</p>
<p><b>Étape 4</b> : le <b>mode Plan</b> (Affichage › Plan) offre la même puissance avec affichage par niveau.</p>
<p><b>Étape 5</b> : le volet n'affiche que les paragraphes avec un style de titre. C'est le meilleur outil de contrôle : un titre absent du volet = un titre mal stylé.</p>` },

/* 17 — RÉORGANISER */
{ title: 'Réorganiser par glisser-déposer', html: `${H('Déplacer un chapitre entier d\'un geste', 'Réorganiser')}
<style>.mvW03{transition:transform .9s cubic-bezier(.6,.1,.2,1)}.mvA.on{transform:translateY(160px)}.mvB.on{transform:translateY(-180px)}.mvC.on{transform:translateY(-170px)}</style>
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:520px;height:440px;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;font-family:'Segoe UI',sans-serif;padding:20px">
 <div style="font-size:19px;font-weight:700;margin-bottom:14px">Navigation · Titres</div>
 <div style="position:relative;height:360px">
  <div class="mvW03 mvA" data-s="2" style="position:absolute;left:0;right:0;top:0;height:170px"><div style="padding:10px 14px;font-size:22px;font-weight:800;background:#FFEDD5;border:2px dashed #FA582D;border-radius:8px">◢ Synthèse</div><div style="padding:8px 14px 8px 44px;font-size:19px">Contexte</div><div style="padding:8px 14px 8px 44px;font-size:19px">Faits marquants</div></div>
  <div class="mvW03 mvB" data-s="2" style="position:absolute;left:0;right:0;top:180px;height:80px"><div style="padding:10px 14px;font-size:22px;font-weight:800">◢ Résultats</div><div style="padding:6px 14px 6px 44px;font-size:19px">Chiffre d'affaires</div></div>
  <div class="mvW03 mvC" data-s="2" style="position:absolute;left:0;right:0;top:270px;height:80px"><div style="padding:10px 14px;font-size:22px;font-weight:800">◢ Perspectives</div></div>
 </div></div>
<div class="f zoom" data-s="1" style="position:absolute;left:520px;top:250px;font-size:44px">✋</div>
<div class="col" style="position:absolute;left:660px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Saisir le <b>titre</b> dans le volet', 1)}${CARD('<b>2 ·</b> Le glisser à sa nouvelle place : <b>titre + sous-titres + texte</b> suivent', 2)}
 ${CARD('<b>3 ·</b> La numérotation et la table des matières suivent aussi (après mise à jour)', 3)}</div>
${STAT({ v: '1 geste', t: 'au lieu de couper / coller 6 pages', x: 660, y: 560, w: 520, s: 3, c: '#16A34A' })}`,
  n: `<p>La fonction la plus spectaculaire du volet.</p>
<p><b>Étape 1</b> : dans le volet de navigation, on attrape le titre « Synthèse ».</p>
<p><b>Étape 2</b> : on le glisse sous « Perspectives » : toute la section suit — titre, sous-titres, paragraphes, tableaux, images.</p>
<p><b>Étape 3</b> : si les titres sont numérotés automatiquement, ils se renumérotent ; la table des matières se met à jour au prochain F9. Question 3 du quiz.</p>
<p>Démo réelle conseillée : réorganisez un document de 10 pages devant le groupe.</p>` },

/* 18 — MENU CONTEXTUEL DU VOLET */
{ title: 'Restructurer depuis le volet', html: `${H('Hausser, abaisser, supprimer une section', 'Clic droit dans le volet')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:420px;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;font-family:'Segoe UI',sans-serif;padding:20px">
 <div style="font-size:19px;font-weight:700;margin-bottom:12px">Navigation · Titres</div>
 ${[['Synthèse', 1], ['Résultats', 1], ['Chiffre d\'affaires', 2, 1], ['Ressources humaines', 2], ['Perspectives', 1]].map(([t, l, on]) => `<div style="padding:8px ${10}px 8px ${10 + (l - 1) * 26}px;font-size:${l === 1 ? 21 : 19}px;${l === 1 ? 'font-weight:800;' : ''}${on ? 'background:#DBEAFE;border-radius:6px' : ''}">${l === 1 ? '◢ ' : ''}${t}</div>`).join('')}</div>
${MENUW03({ s: 1, x: 360, y: 330, w: 400, items: [['Hausser', 1], ['Abaisser'], ['Nouveau titre avant'], ['Nouveau titre après'], ['Nouveau sous-titre'], ['Supprimer'], ['Réduire tout']] })}
<div class="col" style="position:absolute;left:830px;right:70px;top:190px;gap:16px">
 ${CARD('<b>Hausser / Abaisser</b> : Titre 2 ↔ Titre 1', 2)}${CARD('<b>Nouveau titre avant / après</b> : insérer une partie au bon niveau', 2)}
 ${CARD('<b>Supprimer</b> : toute la section disparaît (Ctrl+Z si erreur)', 3)}${CARD('<b>Réduire tout</b> : ne voir que les Titre 1', 3)}</div>
${TIP(`${KEYS('Maj+F5')} ramène à l'endroit de la <b>dernière modification</b>, même après réouverture.`, { s: 4, x: 830, y: 600, w: 700, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : clic droit sur un titre du volet.</p>
<p><b>Étape 2</b> : <b>Hausser</b> / <b>Abaisser</b> change le niveau (Titre 2 → Titre 1) ; les sous-titres suivent. <b>Nouveau titre avant / après</b> crée un titre au même niveau.</p>
<p><b>Étape 3</b> : <b>Supprimer</b> efface la section complète (titre et contenu) : à manier avec précaution. <b>Réduire tout</b> / <b>Développer tout</b> pour une vue d'ensemble.</p>
<p><b>Étape 4</b> : astuce de grand document : Maj+F5 revient à la dernière modification.</p>` },

/* 19 — INSÉRER LA TABLE DES MATIÈRES */
{ title: 'Insérer la table des matières', html: `${H('Une table des matières en 2 clics', 'Références', PATH('Références > Table des matières'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 820, h: 600, title: 'Rapport_2026.docx', tab: 'Références',
  groups: [['Table des matières', ['📑 Table des matières', '＋ Ajouter', '⟳ Mettre à jour']], ['Notes', ['AB¹ Note de bas de page']]],
  hot: { '📑 Table des matières': 2, 'tab:Références': 1 },
  body: PAGE({ inwin: true, w: 560, html: `<p style="font-size:22px;font-weight:700">Rapport d'activité 2026</p><div style="position:relative"><span class="f" data-s="1" style="position:absolute;left:-26px;top:-4px;font-size:22px;color:#FA582D">▸</span></div>
   ${TOCW03([['Synthèse', 2], ['Résultats', 3], ['Chiffre d\'affaires', 3, 1], ['Ressources humaines', 4, 1], ['Perspectives', 5]], { cls: 'f', s: 4, fs: 17 })}${LINES(3)}` }) })}
<div class="f zoom" data-s="3" style="position:absolute;left:930px;top:180px;width:600px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;padding:14px">
 <div style="font-size:16px;color:#6B7A90;font-weight:700;margin-bottom:8px">Intégré</div>
 ${['Table automatique 1', 'Table automatique 2'].map((t, i) => `<div style="padding:12px 14px;border-radius:8px;margin-bottom:8px;${i === 0 ? 'background:#EFF6FF;box-shadow:0 0 0 3px #FA582D' : 'box-shadow:0 0 0 1px #E3E8EF'}"><b style="font-size:19px">${t}</b><div style="font-size:15px;color:#6B7A90;margin-top:6px">${i ? 'Table des matières' : 'Sommaire'} ……… 1</div></div>`).join('')}
 <div style="padding:10px 14px;font-size:18px">Table manuelle</div><div style="padding:10px 14px;font-size:18px;border-top:1px solid #EEF0F3">Table des matières personnalisée…</div></div>
${TIP('Insérez-la <b>après la page de garde</b>, curseur sur une ligne vide.', { s: 4, x: 930, y: 620, w: 600, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : placez le curseur à l'endroit voulu : sous le titre du rapport (lab), ou après la page de garde.</p>
<p><b>Étape 2</b> : Références › <b>Table des matières</b>.</p>
<p><b>Étape 3</b> : choisissez <b>Table automatique 1</b> (titre « Sommaire ») ou 2 (« Table des matières »). Évitez la <i>table manuelle</i> : elle ne se met jamais à jour.</p>
<p><b>Étape 4</b> : la table est construite à partir des styles Titre 1 à Titre 3, avec les numéros de page et des liens cliquables (Ctrl+clic).</p>` },

/* 20 — METTRE À JOUR */
{ title: 'Mettre à jour la table', html: `${H('La table ne se met pas à jour toute seule', 'Mise à jour', KEYS('F9'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:185px;width:520px;padding:22px 26px"><div style="font-size:16px;color:#DC2626;font-weight:800;margin-bottom:8px">TABLE PÉRIMÉE</div>
 ${TOCW03([['Synthèse', 2], ['Résultats', 3], ['Perspectives', 4]], { fs: 20, style: 'border:0;margin:0' })}</div>
${DLGW03({ x: 640, y: 185, w: 520, t: 'Mettre à jour la table des matières', s: 1, html: `<div style="line-height:2.2;font-size:19px">○ Mettre à jour les numéros de page uniquement<br><span style="position:relative">◉ <b>Mettre à jour toute la table</b><em class="ow-hot f zoom" data-s="2" style="inset:-4px -8px"><b>2</b></em></span></div><div style="text-align:right;margin-top:8px"><span style="padding:5px 18px;border:1px solid #185ABD;border-radius:5px">OK</span></div>` })}
<div class="card f right" data-s="3" style="position:absolute;left:1210px;right:70px;top:185px;padding:22px 26px"><div style="font-size:16px;color:#16A34A;font-weight:800;margin-bottom:8px">À JOUR</div>
 ${TOCW03([['Synthèse', 2], ['Résultats', 3], ['Chiffre d\'aff.', 3, 1, '#16A34A'], ['RH', 4, 1, '#16A34A'], ['Perspectives', 5, 0, '#16A34A']], { fs: 19, style: 'border:0;margin:0' })}</div>
${PROC([{ p: 'Références > Mettre à jour la table', t: 'ou clic dans la table puis F9' }, { p: 'Mettre à jour toute la table', t: 'récupère les nouveaux titres' }], { x: 70, y: 520, w: 1090, s0: 1 })}
${TIP('<b>Numéros de page uniquement</b> ne récupère pas les nouveaux titres !', { s: 4, x: 1210, y: 560, w: 320, kind: 'warn' })}`,
  n: `<p>La table des matières est un <b>champ</b> : un instantané calculé au moment de l'insertion.</p>
<p><b>Étape 1</b> : après avoir ajouté des titres ou changé la pagination : Références › <b>Mettre à jour la table</b>, ou clic dans la table puis <b>F9</b>.</p>
<p><b>Étape 2</b> : choisissez <b>Mettre à jour toute la table</b>.</p>
<p><b>Étape 3</b> : les nouveaux titres apparaissent, les numéros de page sont recalculés.</p>
<p><b>Étape 4</b> : piège : « numéros de page uniquement » ne fait que recalculer les pages des entrées existantes. Question 2 du quiz. Réflexe : mettre à jour la table juste avant d'imprimer ou d'exporter en PDF (Word peut aussi le proposer à l'impression).</p>` },

/* 21 — TABLE PERSONNALISÉE */
{ title: 'Table des matières personnalisée', html: `${H('Personnaliser niveaux et points de suite', 'Table personnalisée', PATH('Références > Table des matières > Table personnalisée…'))}
${DLGW03({ x: 70, y: 180, w: 820, t: 'Table des matières', html: `
 <div style="border:1px solid #E3E8EF;border-radius:6px;padding:14px 18px;margin-bottom:16px">${TOCW03([['Titre 1', 1], ['Titre 2', 3, 1]], { fs: 18, style: 'border:0;margin:0;padding:0' })}</div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 24px;font-size:18px">
  <span>☑ Afficher les numéros de page</span><span>☑ Aligner les numéros à droite</span>
  <span style="position:relative">Caractères de suite : <b>……</b><em class="ow-hot f zoom" data-s="2" style="inset:-4px"><b>2</b></em></span>
  <span style="position:relative">Afficher les niveaux : <b style="border:1px solid #94A3B8;padding:0 10px">2 ▴▾</b><em class="ow-hot f zoom" data-s="1" style="inset:-4px"><b>1</b></em></span></div>
 <div style="margin-top:20px;text-align:right"><span style="position:relative;padding:5px 14px;border:1px solid #94A3B8;border-radius:5px;margin-right:8px">Options…<em class="ow-hot f zoom" data-s="3"><b>3</b></em></span><span style="padding:5px 14px;border:1px solid #94A3B8;border-radius:5px">Modifier…</span></div>` })}
<div class="col" style="position:absolute;left:940px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Niveaux</b> : 2 pour un sommaire court, 3 par défaut', 1)}${CARD('<b>2 · Points de suite</b> : ……, - - -, ou aucun', 2)}
 ${CARD('<b>3 · Options</b> : intégrer vos propres styles (ex. « Annexe » au niveau 1)', 3)}${CARD('<b>Modifier…</b> : l\'apparence via les styles <b>TM 1, TM 2…</b>', 4)}</div>`,
  n: `<p>Références › Table des matières › <b>Table des matières personnalisée…</b></p>
<p><b>Étape 1</b> : <b>Afficher les niveaux</b> : 3 par défaut ; 2 pour un sommaire plus lisible d'un long rapport.</p>
<p><b>Étape 2</b> : <b>caractères de suite</b> (points, tirets, soulignement).</p>
<p><b>Étape 3</b> : <b>Options…</b> : on peut ajouter un style personnalisé (par exemple « Titre annexe » au niveau 1) ou retirer un style.</p>
<p><b>Étape 4</b> : l'apparence de la table elle-même est pilotée par les styles <b>TM 1, TM 2, TM 3</b> (Table des Matières) : bouton Modifier…</p>` },

/* 22 — NUMÉROTATION DES TITRES */
{ title: 'Numéroter les titres', html: `${H('Des titres numérotés automatiquement', 'Liste à plusieurs niveaux', PATH('Accueil > Paragraphe > Liste à plusieurs niveaux'))}
<div class="f zoom" data-s="1" style="position:absolute;left:70px;top:185px;width:520px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;padding:16px">
 <div style="font-size:16px;color:#6B7A90;font-weight:700;margin-bottom:10px">Bibliothèque de listes</div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${[['1)', 'a)', 'i)'], ['1 Titre 1', '1.1 Titre 2', '1.1.1 Titre 3'], ['•', '○', '▪'], ['Article I.', 'Section 1.01', '(a)']].map((r, i) => `<div style="padding:12px;border-radius:8px;font-size:17px;line-height:1.6;${i === 1 ? 'box-shadow:0 0 0 3px #FA582D;background:#FFF7F3' : 'box-shadow:0 0 0 1px #E3E8EF'}">${r.map((x, j) => `<div style="padding-left:${j * 16}px">${x}</div>`).join('')}</div>`).join('')}</div></div>
<style>.inW03{height:0;overflow:hidden;transition:height .6s}.inW03.on{height:40px}.rnW03 .o{transition:opacity .4s}.rnW03.on .o{opacity:0}.rnW03 .n{opacity:0;transition:opacity .6s .3s}.rnW03.on .n{opacity:1}</style>
${PAGE({ x: 640, y: 185, w: 460, s: 2, html: `<div class="rnW03" data-s="4" style="font:20px/2 Calibri,sans-serif;color:#185ABD">
 <div style="font-size:24px;font-weight:700">1 Synthèse</div><div style="font-size:24px;font-weight:700">2 Résultats</div><div style="padding-left:20px">2.1 Chiffre d'affaires</div><div class="inW03" data-s="3" style="padding-left:20px;color:#16A34A;font-weight:700">2.2 Marges</div>
 <div style="padding-left:20px;position:relative"><span class="o">2.2</span><span class="n" style="position:absolute;left:20px;color:#16A34A;font-weight:800">2.3</span> Ressources humaines</div>
 <div style="font-size:24px;font-weight:700">3 Perspectives</div></div>` })}
<div class="f" data-s="3" style="position:absolute;left:640px;top:610px;width:460px;font-size:20px;background:#DCFCE7;border-radius:10px;padding:12px 16px">+ insertion de « 2.2 Marges » → <b>RH devient 2.3</b> tout seul</div>
<div class="col" style="position:absolute;left:1150px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Choisir la liste « <b>1 Titre 1 / 1.1 Titre 2</b> »', 1)}${CARD('<b>2 ·</b> Tous les titres se numérotent', 2)}${CARD('<b>3 ·</b> Insertion, déplacement : <b>renumérotation auto</b>', 3)}</div>
${TIP('Ne tapez jamais « 2.3 » à la main dans un titre.', { s: 5, x: 1150, y: 560, w: 380, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : curseur dans un Titre 1 › Accueil › Paragraphe › <b>Liste à plusieurs niveaux</b> › dans la bibliothèque, la liste qui affiche « 1 Titre 1, 1.1 Titre 2, 1.1.1 Titre 3 ». Elle est <b>liée aux styles</b>.</p>
<p><b>Étape 2</b> : tous les titres du document se numérotent selon leur niveau.</p>
<p><b>Étapes 3-4</b> : on insère une sous-partie « Marges » : « Ressources humaines » passe de 2.2 à 2.3 automatiquement. Même chose si on déplace une section dans le volet de navigation. La table des matières reprend les numéros après mise à jour.</p>
<p><b>Étape 5</b> : un numéro tapé à la main devient faux au premier déplacement. Question 5 du quiz.</p>` },

/* 23 — UN GESTE, QUATRE BÉNÉFICES */
{ title: 'Un geste, quatre bénéfices', html: `${H('Styles de titre : un geste, quatre bénéfices', 'Synthèse')}
${FLOW({ x: 70, y: 165, w: 1460, h: 620,
  n: { s: { x: 300, y: 300, pw: 300, ph: 150, fill: '#185ABD', stroke: '#185ABD', html: `<text x="300" y="290" text-anchor="middle" font-size="34" font-weight="900" fill="#fff">Styles de titre</text><text x="300" y="330" text-anchor="middle" font-size="20" fill="#fff" opacity=".85">Titre 1 · 2 · 3</text>`, hot: true },
    a: { x: 1050, y: 70, ic: 'docx', sz: 64, l: 'Volet de navigation', sub: 'saut et réorganisation', s: 1 },
    b: { x: 1050, y: 230, ic: 'tablei', sz: 64, l: 'Table des matières', sub: 'automatique, F9', s: 2 },
    c: { x: 1050, y: 390, ic: 'pdf', sz: 64, l: 'Signets PDF', sub: 'Exporter > Options', s: 3 },
    d: { x: 1050, y: 550, pw: 94, ph: 94, html: `<text x="1050" y="566" text-anchor="middle" font-size="46">♿</text>`, l: 'Accessibilité', sub: 'lecteurs d\'écran', s: 4 } },
  l: [{ a: 's', b: 'a', r: 'hvh', s: 1, flow: true }, { a: 's', b: 'b', r: 'hvh', s: 2, flow: true }, { a: 's', b: 'c', r: 'hvh', s: 3, flow: true }, { a: 's', b: 'd', r: 'hvh', s: 4, flow: true }] })}`,
  n: `<p>Synthèse avant le récap : un seul geste (appliquer des styles de titre) débloque quatre fonctions.</p>
<p><b>Étape 1</b> : le volet de navigation (aller et réorganiser).</p>
<p><b>Étape 2</b> : la table des matières automatique.</p>
<p><b>Étape 3</b> : les signets du PDF (Fichier › Exporter › Options › Créer des signets à partir des titres, vu en W01).</p>
<p><b>Étape 4</b> : l'accessibilité : un lecteur d'écran permet de naviguer de titre en titre. Le Vérificateur d'accessibilité (Révision) signale d'ailleurs les documents sans titres.</p>` },

/* 24 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Les styles en cinq réflexes', k: 'Récap', hub: 'W03', hsub: 'Styles · TDM', hk: 'À RETENIR',
  items: [{ ic: '🏷️', t: 'Appliquer', d: 'Ctrl+Alt+1/2/3 · Ctrl+Maj+N · Citation' }, { ic: '✏️', t: 'Modifier', d: 'Clic droit › Mettre à jour pour correspondre · Modifier…' }, { ic: '🧭', t: 'Naviguer', d: 'Ctrl+F · glisser un titre = déplacer la section' },
    { ic: '📑', t: 'Table des matières', d: 'Références › Table auto · Mettre à jour toute la table' }, { ic: '🔢', t: 'Numéroter', d: 'Liste à plusieurs niveaux liée aux titres' }] }),
  n: `<p>Faites reformuler par le groupe : « Pourquoi un titre n'apparaît-il pas dans la table ? » (pas de style de titre), « Que choisir à la mise à jour ? » (toute la table), « Quelle option laisser décochée ? » (Mettre à jour automatiquement).</p>` },

/* 25 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Huit raccourcis pour les styles', 'Raccourcis W03')}
${KEYCARDS([{ k: 'Ctrl+Alt+1', d: 'Style Titre 1' }, { k: 'Ctrl+Alt+2', d: 'Style Titre 2' }, { k: 'Ctrl+Alt+3', d: 'Style Titre 3' }, { k: 'Ctrl+Maj+N', d: 'Style Normal' }, { k: 'Ctrl+Alt+Maj+S', d: 'Volet Styles' }, { k: 'Ctrl+F', d: 'Volet de navigation' }, { k: 'F9', d: 'Mettre à jour le champ / la table' }, { k: 'Maj+F5', d: 'Dernière modification' }], { cols: 4, y: 190 })}
${TIP('Ctrl+clic sur une entrée de la table des matières = aller au titre.', { s: 9, kind: 'key', y: 620, w: 900 })}`,
  n: `<p>Les huit raccourcis du module. Les trois premiers sont ceux qui font gagner le plus de temps : on structure un document sans quitter le clavier.</p>` },

/* 26 — LAB */
{ title: 'Lab', html: LAB({ app: 'word', mod: 'w03', lab: 0, title: 'Lab — Le rapport d\'activité structuré', tasks: ['<b>Titre 1</b> : Synthèse, Résultats, Perspectives', '<b>Titre 2</b> : Chiffre d\'affaires, Ressources humaines', 'Remettre en <b>Normal</b> le faux Titre 2', 'Style <b>Citation</b> pour le témoignage de Sophie', 'Insérer une <b>table des matières</b> sous le titre', 'Table <b>à jour</b> avec les 5 titres'] }),
  n: `<p>Scénario : le directeur de <b>Pixel &amp; Co</b> a rédigé son rapport annuel : titres en gras manuel, un paragraphe en Titre 2 par erreur, pas de sommaire.</p>
<p>Solution : 1) Clic dans « Synthèse » › Ctrl+Alt+1, idem Résultats et Perspectives. 2) « Chiffre d'affaires » et « Ressources humaines » › Ctrl+Alt+2. 3) Clic dans le paragraphe « Ce paragraphe a été mis en Titre 2… » › Normal. 4) Témoignage › Citation. 5) Fin de la 1<sup>re</sup> ligne › Entrée › Références › Table des matières. 6) Mettre à jour la table : Synthèse, Résultats (Chiffre d'affaires, Ressources humaines), Perspectives.</p>
<p>Astuce : faites appliquer tous les styles <i>avant</i> d'insérer la table ; sinon, insistez sur la mise à jour.</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'D\'où Word tire-t-il les entrées d\'une table des matières automatique ?', o: ['Des paragraphes en gras', 'Des paragraphes ayant un style de titre (Titre 1, 2, 3…)', 'Des lignes en majuscules', 'Des signets'], a: [1], e: 'La table automatique repose sur les styles de titre. Un titre mis en gras à la main n\'y apparaît pas.' },
  { q: 'Un chapitre ajouté n\'apparaît pas dans la table des matières. Que faire ?', o: ['Recréer la table', 'Références › Mettre à jour la table › Mettre à jour toute la table', 'Mettre à jour les numéros de page uniquement', 'Enregistrer le document'], a: [1], e: '« Numéros de page uniquement » ne récupère pas les nouveaux titres.' },
  { q: 'Comment déplacer tout un chapitre (titre, sous-titres et texte) en un geste ?', o: ['Couper/coller page par page', 'Glisser son titre dans le volet de navigation', 'Changer son style', 'Insérer un saut de section'], a: [1], e: 'Dans le volet de navigation, glisser un titre déplace toute la section qu\'il contient.' },
  { q: 'Pourquoi laisser décochée l\'option « Mettre à jour automatiquement » d\'un style ?', o: ['Elle ralentit Word', 'Elle empêche l\'impression', 'Toute mise en forme manuelle modifierait le style partout', 'Elle supprime la table des matières'], a: [2], e: 'Avec cette option, un simple gras sur un titre se propage à tous les titres du même style.' },
  { q: 'Quelle est la bonne façon d\'obtenir des titres numérotés 1, 1.1, 1.2, 2… ?', o: ['Taper les numéros à la main', 'Liste à plusieurs niveaux liée aux styles Titre 1 / Titre 2', 'Liste à puces', 'Tabulations'], a: [1], e: 'La liste à plusieurs niveaux associée aux styles de titre renumérote automatiquement.' },
  { q: 'Quels avantages apportent les styles de titre ?', o: ['Volet de navigation utilisable', 'Signets dans le PDF exporté', 'Correction orthographique', 'Compression des images'], a: [0, 1], e: 'Styles de titre = navigation, table des matières, signets PDF et accessibilité.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) c · 5) b · 6) a et b.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W03', html: END(), n: `<p>Fin du module W03. Prochain module : <b>W04 — Tableaux, colonnes, sauts de page, en-têtes et pieds de page</b>.</p><p>Défi pour la semaine : reprendre un document existant et le structurer avec les styles de titre.</p>` },
] };
