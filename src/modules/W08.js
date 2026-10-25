/* ===================== MODULE W08 — Modèles, champs, contrôles de contenu, macros VBA et accessibilité ===================== */
const SECSW08 = ['Modèles et champs', 'Formulaires : contrôles de contenu', 'Macros VBA et accessibilité'];

/* --- helpers locaux W08 --- */
const DLGW08 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .3}s;`}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:0;overflow:hidden;border-radius:12px;font-family:'Segoe UI',var(--font)">
  <div style="display:flex;align-items:center;height:44px;padding:0 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#94A3B8;font-weight:400">✕</span></div>
  <div style="padding:16px 22px;font-size:18px;color:#1B2A41;display:flex;flex-direction:column;gap:12px">${o.html}</div></div>`;
const FLDW08 = (l, v, o = {}) => `<div style="display:flex;align-items:center;gap:12px" ${o.s ? `class="f" data-s="${o.s}"` : ''}><span style="min-width:${o.lw ?? 170}px;color:#33445E">${l}</span><span style="flex:1;padding:6px 12px;border:1.5px solid ${o.hot ? '#FA582D' : '#CBD5E1'};border-radius:6px;background:#fff;font-weight:600;${o.hot ? 'box-shadow:0 0 0 4px rgba(250,88,45,.15);' : ''}">${v}</span></div>`;
const BTNW08 = (t, p) => `<span style="display:inline-block;padding:6px 18px;border-radius:6px;font-size:16px;font-weight:700;${p ? 'background:#185ABD;color:#fff' : 'background:#fff;border:1.5px solid #CBD5E1;color:#1B2A41'}">${t}</span>`;
const SWAPW08 = (old, nw, s, bg = '#fff', c = '#16A34A') => `<span style="position:relative;display:inline-block;white-space:nowrap">${old}<span class="f" data-s="${s}" style="position:absolute;left:0;top:0;bottom:0;min-width:100%;white-space:nowrap;background:${bg};color:${c};font-weight:700">${nw}</span></span>`;
/* contrôle de contenu (maquette) */
const CCW08 = (t, o = {}) => `<span style="display:inline-flex;align-items:center;gap:6px;padding:2px 8px;border:1.5px solid #2563EB;border-radius:3px;background:${o.filled ? '#fff' : '#EFF6FF'};color:${o.filled ? '#1F2937' : '#6B7A90'};font-size:${o.fs ?? 16}px;white-space:nowrap">${o.tag ? `<b style="background:#2563EB;color:#fff;font-size:11px;padding:0 5px;border-radius:2px">${o.tag}</b>` : ''}${t}${o.dd ? ' <b style="color:#2563EB">▾</b>' : ''}</span>`;
const TABSW08 = ['Fichier', 'Accueil', 'Insertion', 'Création', 'Mise en page', 'Références', 'Révision', 'Affichage', 'Développeur'];

window.MODULE = { code: 'W08', title: 'Modèles, champs, contrôles de contenu, macros VBA et accessibilité', short: 'Modèles, macros, accessibilité', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Industrialiser ses documents', html: TITLE({ mod: 'WORD · MODULE 08 · EXPERT', title: '<span class="grad">Industrialiser</span> ses documents', sub: '« Modèles, champs, formulaires, macros VBA et documents accessibles à tous »', agenda: SECSW08, art: APPART('word') }),
  n: `<p>Dernier module Word, niveau <b>Expert</b>. Objectif : ne plus « refaire » un document, mais <b>produire</b> des documents à partir d'outils : un modèle d'entreprise, un formulaire à remplir, une macro qui automatise une tâche répétitive — et des documents lisibles par tous, y compris avec un lecteur d'écran.</p>
  <p>Fil rouge : l'entreprise de rénovation <b>BâtiPro 38</b> veut un modèle de devis standardisé, et la mairie de <b>Saint-Clair-sur-Loire</b> veut publier un livret d'accueil accessible.</p>
  <p>Durée : 80 minutes, deux labs. Prérequis : styles, champs (module 05), protection (module 06).</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Créer un <b>modèle .dotx</b> et l\'utiliser comme base de nouveaux documents', 'Insérer des <b>champs</b> (date, nom de fichier, propriétés) et les mettre à jour', 'Concevoir un <b>formulaire</b> avec des contrôles de contenu et le protéger', 'Enregistrer, écrire et exécuter une <b>macro VBA</b> simple', 'Vérifier et corriger l\'<b>accessibilité</b> d\'un document']),
  n: `<p>Cinq objectifs, du plus courant (le modèle, que tout le monde devrait utiliser) au plus technique (la macro VBA).</p>
  <p>Question : « Comment créez-vous un nouveau devis aujourd'hui ? » — souvent en ouvrant l'ancien, en l'enregistrant sous un autre nom… et en oubliant de changer le nom du client. Le modèle règle ce problème.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW08, 0),
  n: `<p>Première partie : les modèles (.dotx), le modèle Normal, et les champs automatiques.</p>` },

/* 4 — LE MODÈLE (FLOW) */
{ title: 'Le principe du modèle', html: `${H('Un modèle, des documents', 'Modèles .dotx')}
${FLOW({ x: 70, y: 170, w: 1460, h: 560,
  z: [{ x: 960, y: 0, w: 500, h: 550, l: 'DOCUMENTS', c: '#185ABD', s: 2 }],
  n: { tpl: { x: 240, y: 270, ic: 'tpl', sz: 120, hot: true, l: 'Devis-BatiPro.dotx', sub: 'logo · styles · marges · contrôles' },
    nw: { x: 640, y: 270, ic: 'word', sz: 90, l: 'Double-clic', sub: 'ou Fichier › Nouveau › Personnel', s: 1 },
    d1: { x: 1210, y: 95, ic: 'docx', l: 'Devis Martin.docx', s: 2 }, d2: { x: 1210, y: 270, ic: 'docx', l: 'Devis Leroy.docx', s: 2 }, d3: { x: 1210, y: 445, ic: 'docx', l: 'Devis Garcia.docx', s: 2 } },
  l: [{ a: 'tpl', b: 'nw', s: 1 }, { a: 'nw', b: 'd1', r: 'hvh', s: 2 }, { a: 'nw', b: 'd2', s: 2 }, { a: 'nw', b: 'd3', r: 'hvh', s: 2 }],
  p: [{ s: 2, seg: [{ via: ['tpl', 'nw'], t: 1.2 }, { via: ['nw', 'd1'], lab: 'Document1', t: 1.4 }] }, { s: 2, begin: 1.3, c: '#7C3AED', seg: [{ via: ['tpl', 'nw'], t: 1.2 }, { via: ['nw', 'd3'], lab: 'Document2', t: 1.4 }] }] })}
${TIP('Le modèle reste <b>intact</b> : on ne le modifie jamais pour un usage ponctuel.', { s: 3, x: 70, y: 690, w: 860, kind: 'ok' })}`,
  n: `<p>Un <b>modèle</b> contient tout ce qui doit être identique d'un document à l'autre : logo dans l'en-tête, styles, marges, textes standard (conditions générales), contrôles de contenu à remplir.</p>
  <p><b>Étape 1</b> : on ne l'ouvre pas pour le modifier : on crée un document <b>à partir</b> de lui (double-clic dans l'Explorateur, ou Fichier › Nouveau › Personnel).</p>
  <p><b>Étape 2</b> : Word crée à chaque fois un nouveau « Document1 » sans nom, qu'on enregistre en .docx. Impossible d'écraser le modèle par erreur.</p>
  <p><b>Étape 3</b> : différence fondamentale avec la pratique « j'ouvre l'ancien devis et j'enregistre sous » — qui finit toujours par un devis envoyé avec le nom de l'ancien client.</p>` },

/* 5 — ENREGISTRER UN MODÈLE */
{ title: 'Créer un modèle', html: `${H('Enregistrer et retrouver un modèle', 'Modèles .dotx', PATH('Fichier > Enregistrer sous > Modèle Word (*.dotx)'))}
${DLGW08({ x: 70, y: 180, w: 720, t: 'Enregistrer sous', html: `${FLDW08('Dossier :', '📁 Documents › Modèles Office personnalisés', { lw: 120, hot: 1 })}${FLDW08('Nom :', 'Devis-BatiPro', { lw: 120 })}${FLDW08('Type :', 'Modèle Word (*.dotx) ▾', { lw: 120, hot: 1 })}<div style="text-align:right">${BTNW08('Enregistrer', 1)} ${BTNW08('Annuler')}</div>` })}
<div class="card f zoom" data-s="1" style="position:absolute;left:840px;top:180px;width:690px;padding:20px 24px">
 <div style="font-size:16px;font-weight:800;letter-spacing:.1em;color:#6B7A90">FICHIER › NOUVEAU › <span style="color:#FA582D">PERSONNEL</span></div>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:14px">${[['Devis-BatiPro', '#185ABD'], ['Courrier', '#7C3AED'], ['Compte rendu', '#16A34A']].map(([t, c], i) => `<div style="text-align:center"><div style="height:150px;border-radius:6px;background:#fff;box-shadow:0 0 0 1.5px ${i ? '#E3E8EF' : '#FA582D'},0 10px 24px -14px rgba(14,23,38,.4);padding:14px"><div style="height:14px;width:50%;background:${c};border-radius:3px;margin-bottom:10px"></div>${LINES(4)}</div><div style="font-size:17px;font-weight:700;margin-top:8px">${t}</div></div>`).join('')}</div></div>
<div style="position:absolute;left:70px;top:470px;width:1460px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 <div class="card f left" data-s="2" style="display:flex;gap:18px;align-items:center;padding:22px 26px"><span style="font-size:46px">🖱️</span><div><div style="font-size:23px;font-weight:800">Double-clic sur le .dotx</div><div style="font-size:19px;color:#33445E">→ crée un <b>nouveau document</b> basé sur le modèle</div></div></div>
 <div class="card f right" data-s="3" style="display:flex;gap:18px;align-items:center;padding:22px 26px"><span style="font-size:46px">✏️</span><div><div style="font-size:23px;font-weight:800">Clic droit › Ouvrir</div><div style="font-size:19px;color:#33445E">→ ouvre le <b>modèle lui-même</b> pour le modifier</div></div></div>
</div>
${TIP('En entreprise : dossier partagé déclaré dans <b>Options › Enregistrement › Emplacement des modèles personnels par défaut</b>.', { s: 4, x: 70, y: 660, w: 1460, kind: 'key' })}`,
  n: `<p><b>Étape 0</b> : préparez le document (logo, styles, textes fixes), puis <i>Fichier › Enregistrer sous</i> et choisissez le type <b>Modèle Word (*.dotx)</b>. Word bascule automatiquement vers le dossier <code>Documents\\Modèles Office personnalisés</code>.</p>
  <p><b>Étape 1</b> : dans ce dossier, le modèle apparaît dans <i>Fichier › Nouveau</i>, onglet <b>Personnel</b>.</p>
  <p><b>Étape 2</b> : double-clic dans l'Explorateur = nouveau document basé sur le modèle.</p>
  <p><b>Étape 3</b> : pour modifier le modèle lui-même : clic droit › <b>Ouvrir</b> (ou Fichier › Ouvrir depuis Word).</p>
  <p><b>Étape 4</b> : pour partager les modèles officiels, déposez-les dans un dossier réseau ou SharePoint et déclarez ce dossier dans les options (ou demandez à l'IT de déployer des modèles organisationnels).</p>` },

/* 6 — NORMAL.DOTM */
{ title: 'Normal.dotm', html: `${H('Normal.dotm, le modèle de tout document vierge', 'Le modèle Normal')}
<div class="a pop float" style="--d:.2s;position:absolute;left:110px;top:220px;width:300px;text-align:center"><svg viewBox="0 0 64 64" style="width:220px;height:220px"><use href="#i-tpl"/></svg><div style="font:800 30px var(--mono);color:#7C3AED">Normal.dotm</div><div style="font-size:18px;color:#6B7A90;margin-top:6px">%appdata%\\Microsoft\\Templates</div></div>
<div style="position:absolute;left:520px;top:190px;width:1010px;display:flex;flex-direction:column;gap:18px">
 ${CARD('📄 <b>Ctrl+N</b> ou « Document vierge » = un document basé sur <b>Normal.dotm</b> (police, marges, styles par défaut)', 1, 'font-size:22px')}
 ${CARD('⚠️ Le bouton <b>Définir par défaut</b> (boîtes Police, Paragraphe) <b>modifie Normal.dotm</b> : tous vos futurs documents changent', 2, 'font-size:22px')}
 ${CARD('💾 Il peut aussi stocker des <b>macros</b> et des <b>QuickPart</b> disponibles dans tous les documents', 3, 'font-size:22px')}
 ${CARD('🛠️ Word instable, styles bizarres ? Fermez Word, <b>renommez</b> Normal.dotm : Word le recrée au démarrage', 4, 'font-size:22px')}
</div>`,
  n: `<p><b>Normal.dotm</b> est le modèle de base de Word (le « m » final indique qu'il peut contenir des macros).</p>
  <p><b>Étape 1</b> : chaque document vierge en hérite : police Aptos 11, marges, styles Normal/Titre 1…</p>
  <p><b>Étape 2</b> : <i>Définir par défaut</i> dans la boîte Police ou Paragraphe propose « Ce document uniquement » ou « Tous les documents basés sur le modèle Normal.dotm ». Faites-le en connaissance de cause : c'est la bonne méthode pour changer la police par défaut… et la mauvaise si on voulait juste ce document.</p>
  <p><b>Étape 3</b> : les macros enregistrées « dans Tous les documents (Normal.dotm) » y sont stockées : elles suivent l'utilisateur sur ce poste.</p>
  <p><b>Étape 4</b> : dépannage classique : si Normal.dotm est corrompu (styles qui changent tout seuls, plantages), on le renomme (Normal.old) dans le dossier <code>%appdata%\\Microsoft\\Templates</code> ; Word en recrée un propre. Montrez le chemin en tapant %appdata% dans l'Explorateur.</p>` },

/* 7 — LES CHAMPS (TABLE) */
{ title: 'Les champs utiles', html: `${H('Les champs utiles au quotidien', 'Champs', PATH('Insertion > QuickPart > Champ…'))}
<div style="position:absolute;left:70px;top:180px;width:1000px"><table class="tbl"><tr><th>Code du champ</th><th>Affiche</th></tr>
 ${[['{ DATE \\@ "d MMMM yyyy" }', 'La date du jour — change à chaque ouverture !'], ['{ CREATEDATE \\@ "dd/MM/yyyy" }', 'La date de création — stable'], ['{ PAGE } / { NUMPAGES }', 'Page 3 sur 12'], ['{ FILENAME \\p }', 'Chemin complet du fichier'], ['{ STYLEREF "Titre 1" }', 'Le titre du chapitre en cours']].map(([c, d], i) => `<tr class="f" data-s="${i + 1}"><td style="font:700 18px var(--mono);white-space:nowrap">${c}</td><td>${d}</td></tr>`).join('')}
</table></div>
<div style="position:absolute;left:1110px;top:180px;width:420px;display:flex;flex-direction:column;gap:14px">
 ${[['Alt+F9', 'Codes / résultats'], ['F9', 'Mettre à jour'], ['Ctrl+F9', 'Accolades { } vides'], ['Ctrl+Maj+F9', 'Figer en texte']].map(([k, d]) => `<div class="card kc f zoom" data-s="6" style="padding:14px 18px">${KEYS(k)}<span>${d}</span></div>`).join('')}
</div>`,
  n: `<p><i>Insertion › Texte › QuickPart › Champ…</i> liste tous les champs de Word, avec leurs options.</p>
  <p><b>Étape 1</b> : <b>DATE</b> affiche la date du jour… à chaque mise à jour. Dans un courrier, c'est un piège (diapo suivante).</p>
  <p><b>Étape 2</b> : <b>CREATEDATE</b> : la date de création du document — stable, idéale pour un courrier ou un devis créé depuis un modèle. Variante : SAVEDATE (dernier enregistrement).</p>
  <p><b>Étape 3</b> : PAGE et NUMPAGES : « Page X sur Y » dans le pied de page.</p>
  <p><b>Étape 4</b> : FILENAME avec \\p : le chemin complet — pratique en pied de page pour retrouver un fichier imprimé.</p>
  <p><b>Étape 5</b> : STYLEREF, vu au module 05.</p>
  <p><b>Étape 6</b> : les quatre raccourcis des champs. On ne tape jamais les accolades au clavier : Ctrl+F9 les insère, on tape le code à l'intérieur, puis F9.</p>` },

/* 8 — DATE VS CREATEDATE */
{ title: 'DATE ou CREATEDATE ?', html: `${H('DATE ou CREATEDATE ?', 'Piège des courriers')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:1460px;display:flex;justify-content:center;gap:20px;align-items:center;font-size:24px;font-weight:700">📅 Courrier créé le <span class="chip dark" style="font-size:22px">25/10/2026</span> · rouvert le ${SWAPW08('<span class="chip" style="font-size:22px">25/10/2026</span>', '<span class="chip bad" style="font-size:22px;background:#FEE2E2">12/03/2027</span>', 2, '#F6F7F9', '#B91C1C')}</div>
${[['DATE', '{ DATE \\@ "d MMMM yyyy" }', SWAPW08('25 octobre 2026', '12 mars 2027', 2, '#fff', '#DC2626'), '#DC2626', '✘ La date du courrier change à chaque ouverture'], ['CREATEDATE', '{ CREATEDATE \\@ "d MMMM yyyy" }', '25 octobre 2026', '#16A34A', '✔ La date reste celle de la création']].map(([t, c, v, col, d], i) => `
<div class="card f ${i ? 'right' : 'left'}" data-s="1" style="position:absolute;left:${70 + i * 750}px;top:290px;width:710px;padding:0;overflow:hidden;border-top:6px solid ${col}">
 <div style="padding:18px 26px;font:800 26px var(--mono);color:${col}">${t}</div>
 <div style="padding:0 26px 10px;font:600 17px var(--mono);color:#6B7A90">${c}</div>
 <div style="margin:10px 26px;padding:24px 30px;background:#fff;border:1px solid #E3E8EF;border-radius:6px;font:24px Calibri,'Segoe UI',sans-serif;text-align:right">Grenoble, le ${v}</div>
 <div class="f" data-s="3" style="padding:16px 26px 22px;font-size:21px;font-weight:700;color:${col}">${d}</div></div>`).join('')}
${TIP('Dans un <b>modèle de courrier</b>, utilisez CREATEDATE : chaque document garde sa propre date de création.', { s: 4, x: 70, y: 700, w: 1460, kind: 'ok' })}`,
  n: `<p>Démonstration du piège le plus fréquent avec les champs de date.</p>
  <p><b>Étape 1</b> : deux courriers créés le 25 octobre 2026, l'un avec DATE, l'autre avec CREATEDATE. Les deux affichent la même date.</p>
  <p><b>Étape 2</b> : on rouvre les fichiers en mars 2027 (ou on imprime) : le champ DATE se met à jour et affiche la date du jour. Le courrier archivé semble daté de mars !</p>
  <p><b>Étape 3</b> : CREATEDATE garde la date de création. Dans un modèle, cette date est celle de la création du <b>document</b> issu du modèle : parfait.</p>
  <p><b>Étape 4</b> : alternative pour une date figée : <i>Insertion › Date et heure</i> en décochant « Mettre à jour automatiquement ».</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW08, 1),
  n: `<p>Deuxième partie : les formulaires. Des zones à remplir guidées, et tout le reste verrouillé.</p>` },

/* 10 — ONGLET DÉVELOPPEUR */
{ title: 'L\'onglet Développeur', html: `${H('Afficher l\'onglet Développeur', 'Développeur', PATH('Fichier > Options > Personnaliser le ruban'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1460, h: 230, title: 'Devis-BatiPro.dotx', tab: 'Développeur', tabs: TABSW08,
  groups: [['Code', ['🧩 Visual Basic', '📜 Macros', '⏺️ Enregistrer une macro']], ['Compléments', ['🔌 Compléments']], ['Contrôles', ['Aa', 'Aa ', '🖼', '☑', '▾', '📅', '📐 Mode Création', '⚙️ Propriétés']], ['Protéger', ['🔒 Restreindre la modification']], ['Modèles', ['📄 Modèle de document']]],
  hot: { 'tab:Développeur': 1, 'Aa': 2, '📐 Mode Création': 3, '⚙️ Propriétés': 4, '🧩 Visual Basic': 5 }, body: '' })}
<div style="position:absolute;left:70px;top:460px;width:1460px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px">
 ${[['1', 'Cocher Développeur', 'Options › Personnaliser le ruban'], ['2', 'Contrôles', 'Insérer des zones à remplir'], ['3', 'Mode Création', 'Modifier les textes d\'invite'], ['4', 'Propriétés', 'Titre, balise, verrouillage'], ['5', 'Code', 'Visual Basic et macros']].map(([n, t, d]) => `<div class="card f zoom" data-s="${n}" style="padding:18px 20px"><span class="num-badge or">${n}</span><div style="font-size:21px;font-weight:800;margin-top:8px">${t}</div><div style="font-size:17px;color:#6B7A90">${d}</div></div>`).join('')}
</div>`,
  n: `<p>L'onglet <b>Développeur</b> est masqué par défaut.</p>
  <p><b>Étape 1</b> : <i>Fichier › Options › Personnaliser le ruban</i>, cochez <b>Développeur</b> dans la liste de droite. Une fois pour toutes sur le poste.</p>
  <p><b>Étape 2</b> : le groupe <b>Contrôles</b> : texte enrichi (Aa en gras), texte brut (Aa), image, case à cocher, zone de liste déroulante / liste déroulante, sélecteur de date. (Les « Outils hérités » contiennent les anciens champs de formulaire : à éviter.)</p>
  <p><b>Étape 3</b> : <b>Mode Création</b> : affiche les balises des contrôles et permet de modifier le texte d'invite.</p>
  <p><b>Étape 4</b> : <b>Propriétés</b> du contrôle sélectionné.</p>
  <p><b>Étape 5</b> : le groupe <b>Code</b> : l'éditeur Visual Basic (Alt+F11), la liste des macros (Alt+F8), l'enregistreur. On y revient en partie 3.</p>` },

/* 11 — TYPES DE CONTRÔLES */
{ title: 'Les contrôles de contenu', html: `${H('Sept contrôles de contenu', 'Développeur › Contrôles')}
<div style="position:absolute;left:70px;top:180px;width:1460px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
 ${[['Texte enrichi', 'Texte mis en forme, plusieurs paragraphes', CCW08('<b>Rénovation</b> <i>complète</i>', { filled: 1 })], ['Texte brut', 'Une ligne, sans mise en forme', CCW08('Cliquez pour saisir le client')], ['Image', 'Logo, photo, signature', `<span style="display:inline-grid;place-items:center;width:110px;height:56px;border:1.5px solid #2563EB;background:#EFF6FF;font-size:28px">🖼️</span>`], ['Liste déroulante', 'Choix imposé dans une liste', CCW08('Choisissez un élément', { dd: 1 })],
    ['Zone de liste déroulante', 'Liste + saisie libre', CCW08('Peinture', { dd: 1, filled: 1 })], ['Sélecteur de date', 'Calendrier, format choisi', CCW08('25/10/2026 📅', { filled: 1 })], ['Case à cocher', 'Oui / non', `<span style="font-size:28px;color:#2563EB">☒</span> <span style="font-size:18px">Acompte versé</span>`]].map(([t, d, m], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:20px 22px;min-height:190px;display:flex;flex-direction:column;gap:12px"><div style="font-size:22px;font-weight:800">${t}</div><div style="font-size:17px;color:#6B7A90">${d}</div><div style="margin-top:auto">${m}</div></div>`).join('')}
 <div class="card f zoom" data-s="8" style="padding:20px 22px;min-height:190px;background:#0E1726;color:#fff;display:flex;flex-direction:column;justify-content:center"><div style="font-size:22px;font-weight:800;color:#FF8A3D">Le bon contrôle</div><div style="font-size:19px;margin-top:8px">= des données <b>propres</b> et <b>homogènes</b></div></div>
</div>`,
  n: `<p>Les sept contrôles de contenu, un par clic :</p>
  <p><b>1. Texte enrichi</b> : on peut mettre en forme, plusieurs paragraphes (description des travaux). <b>2. Texte brut</b> : une seule ligne, sans mise en forme (nom du client, n° de devis). <b>3. Image</b> : un emplacement pour une photo ou une signature. <b>4. Liste déroulante</b> : un choix imposé (type de travaux). <b>5. Zone de liste déroulante</b> : une liste + saisie libre possible. <b>6. Sélecteur de date</b> : calendrier, format jj/MM/aaaa réglable. <b>7. Case à cocher</b> : oui/non.</p>
  <p><b>Étape 8</b> : choisir le bon contrôle évite les « Peinture », « peinture », « peintures » : les données restent homogènes (et exploitables si on extrait les données des formulaires).</p>
  <p>Il existe aussi la « Section répétée » (pour des lignes de tableau à ajouter) et le « Bloc de construction ».</p>` },

/* 12 — LE FORMULAIRE DEVIS */
{ title: 'Le formulaire de devis', html: `${H('Le formulaire de devis BâtiPro 38', 'Formulaire')}
${PAGE({ x: 70, y: 175, w: 860, h: 610, header: '<span style="display:flex;justify-content:space-between"><b style="color:#185ABD">BâtiPro 38</b><span>Rénovation · Grenoble</span></span>', footer: '<span style="display:flex;justify-content:space-between"><span>Devis-BatiPro.docx</span><span>Page 1 sur 1</span></span>',
  html: `<h1>Devis</h1><div style="display:grid;grid-template-columns:200px 1fr;gap:18px 10px;align-items:center;font-size:19px">
   <span>Devis n° :</span><span class="f" data-s="1">${CCW08('Cliquez ici pour saisir le n° de devis', { fs: 17 })}</span>
   <span>Client :</span><span class="f" data-s="1">${CCW08('Cliquez ici pour saisir le nom du client', { fs: 17 })}</span>
   <span>Date :</span><span class="f" data-s="2">${CCW08('25/10/2026 📅', { fs: 17, filled: 1 })}</span>
   <span>Type de travaux :</span><span class="f" data-s="3" style="position:relative">${CCW08('Plomberie', { fs: 17, dd: 1, filled: 1 })}</span>
   <span>Acompte versé :</span><span class="f" data-s="4"><span style="font-size:26px;color:#2563EB">☐</span></span></div>${LINES(3)}` })}
<div class="card f zoom" data-s="3" style="position:absolute;left:960px;top:420px;width:300px;padding:6px 0;border-radius:6px;border:1.5px solid #2563EB;font-size:19px">${['Peinture', 'Plomberie', 'Électricité', 'Menuiserie'].map((t, i) => `<div style="padding:8px 16px;${i === 1 ? 'background:#DBEAFE;font-weight:700' : ''}">${t}</div>`).join('')}</div>
${STAT({ v: '0', t: 'faute de frappe dans le type de travaux', x: 1290, y: 420, w: 240, s: 5, c: '#16A34A' })}
<div style="position:absolute;left:960px;top:190px;width:570px;display:flex;flex-direction:column;gap:14px">
 ${CARD('<b>Texte brut</b> : n° de devis, client', 1)}${CARD('<b>Sélecteur de date</b> : format <b>dd/MM/yyyy</b>', 2)}
</div>`,
  n: `<p>Le formulaire du lab 2, contrôle par contrôle.</p>
  <p><b>Étape 1</b> : deux contrôles <b>texte brut</b> après « Devis n° » et « Client : », avec un texte d'invite explicite (modifié en Mode Création).</p>
  <p><b>Étape 2</b> : un <b>sélecteur de date</b> ; dans ses Propriétés, « Afficher la date ainsi » : dd/MM/yyyy.</p>
  <p><b>Étape 3</b> : une <b>liste déroulante</b> : Propriétés › Ajouter… pour chaque type de travaux (Peinture, Plomberie, Électricité, Menuiserie).</p>
  <p><b>Étape 4</b> : une <b>case à cocher</b> pour l'acompte.</p>
  <p><b>Étape 5</b> : bénéfice : des devis homogènes, sans faute ni oubli. Le pied de page utilise les champs FILENAME et PAGE / NUMPAGES.</p>` },

/* 13 — PROPRIÉTÉS */
{ title: 'Propriétés du contrôle', html: `${H('Titre, balise, verrouillage', 'Propriétés du contrôle', PATH('Développeur > Contrôles > Propriétés'))}
${DLGW08({ x: 70, y: 175, w: 720, t: 'Propriétés du contrôle du contenu', html: `${FLDW08('Titre :', 'Type de travaux', { lw: 140, hot: 1 })}${FLDW08('Balise :', 'type_travaux', { lw: 140 })}
 <div class="f" data-s="2" style="border-top:1px solid #E3E8EF;padding-top:10px"><b style="color:#185ABD">Verrouillage</b><div style="font-size:17px;line-height:1.8">☑ Le contrôle de contenu ne peut pas être supprimé<br>☐ Le contenu ne peut pas être modifié</div></div>
 <div class="f" data-s="3" style="border-top:1px solid #E3E8EF;padding-top:10px"><b style="color:#185ABD">Propriétés de la liste déroulante</b><div style="display:flex;gap:14px;margin-top:6px"><div style="flex:1;border:1.5px solid #CBD5E1;border-radius:6px;font-size:16px;line-height:1.8;padding:4px 10px">Choisissez un élément.<br>Peinture<br>Plomberie<br>Électricité<br>Menuiserie</div><div style="display:flex;flex-direction:column;gap:6px">${BTNW08('Ajouter…', 1)}${BTNW08('Modifier…')}${BTNW08('Supprimer')}</div></div></div>` })}
<div style="position:absolute;left:840px;top:190px;width:690px;display:flex;flex-direction:column;gap:18px">
 <div class="card f right" data-s="1" style="padding:20px 24px;font-size:20px"><b>Titre</b> : affiché sur la poignée du contrôle<div style="margin-top:12px">${CCW08('Choisissez un élément.', { tag: 'Type de travaux', dd: 1, fs: 18 })}</div></div>
 <div class="card f right" data-s="2" style="padding:20px 24px;font-size:20px"><b>Verrouillage</b> : l'utilisateur remplit, mais ne peut pas <b>supprimer</b> la zone</div>
 <div class="card f right" data-s="3" style="padding:20px 24px;font-size:20px"><b>Ajouter…</b> : un élément par type de travaux</div>
 <div class="card f right" data-s="4" style="padding:20px 24px;font-size:20px;display:flex;align-items:center;gap:14px"><span style="font-size:34px">📐</span><span><b>Mode Création</b> : retaper le texte d'invite</span></div>
</div>`,
  n: `<p>Sélectionnez le contrôle, puis <i>Développeur › Propriétés</i>.</p>
  <p><b>Étape 1</b> : <b>Titre</b> (visible par l'utilisateur sur la poignée du contrôle et lu par les lecteurs d'écran) et <b>Balise</b> (nom technique, utile pour une macro ou une extraction de données).</p>
  <p><b>Étape 2</b> : <b>Verrouillage</b> : « ne peut pas être supprimé » protège la zone tout en permettant de la remplir. « Le contenu ne peut pas être modifié » sert pour un texte imposé.</p>
  <p><b>Étape 3</b> : pour une liste déroulante, <i>Ajouter…</i> chaque élément (nom affiché + valeur).</p>
  <p><b>Étape 4</b> : <b>Mode Création</b> : on clique dans le contrôle et on remplace « Cliquez ou appuyez ici pour entrer du texte » par une invite utile : « Saisissez le nom du client ». On quitte le Mode Création avant de tester.</p>` },

/* 14 — PROTÉGER LE FORMULAIRE */
{ title: 'Protéger le formulaire', html: `${H('Verrouiller tout, sauf les zones à remplir', 'Protection', PATH('Révision > Restreindre la modification'))}
${PAGE({ x: 70, y: 175, w: 820, h: 600, html: `<h1>Devis</h1>
 <div style="position:relative"><div class="f" data-s="2" style="position:absolute;inset:-10px -16px;background:repeating-linear-gradient(135deg,rgba(148,163,184,.14) 0 10px,transparent 10px 20px);border-radius:6px"></div>
 <div style="position:relative;display:grid;grid-template-columns:200px 1fr;gap:18px 10px;align-items:center;font-size:19px"><span>Client :</span><span style="position:relative">${CCW08('Saisissez le nom du client', { fs: 17 })}<span class="f zoom" data-s="3" style="position:absolute;right:-4px;top:-14px;font-size:22px">✍️</span></span><span>Type de travaux :</span><span>${CCW08('Choisissez un élément.', { dd: 1, fs: 17 })}</span><span>Date :</span><span>${CCW08('Sélectionnez une date', { fs: 17 })}</span></div>
 <p style="font-size:16px;margin-top:24px;position:relative">Conditions générales : le présent devis est valable 3 mois…<span class="f zoom" data-s="2" style="margin-left:8px">🔒</span></p>${LINES(3)}</div>` })}
${PROC([{ p: 'Restrictions de modifications', t: '☑ Autoriser uniquement : <b>Remplissage de formulaires</b>' }, { p: 'Oui, activer la protection', t: 'Mot de passe facultatif' }, { p: 'Test', t: 'Tab passe d\'un contrôle à l\'autre, le reste est verrouillé' }], { x: 930, y: 185, w: 600 })}
${TIP('Pour modifier le modèle : <b>Désactiver la protection</b>, modifier, réactiver.', { s: 4, x: 930, y: 580, w: 600, kind: 'key' })}`,
  n: `<p>On combine contrôles de contenu et protection (module 06).</p>
  <p><b>Étape 1</b> : <i>Révision › Restreindre la modification</i> (ou Développeur › Restreindre la modification) › cocher « Autoriser uniquement ce type de modifications » › <b>Remplissage de formulaires</b>.</p>
  <p><b>Étape 2</b> : <i>Oui, activer la protection</i>. Tout le texte hors contrôles est verrouillé : les conditions générales ne peuvent plus être modifiées par un commercial.</p>
  <p><b>Étape 3</b> : testez : seuls les contrôles sont accessibles, la touche Tab passe de l'un à l'autre.</p>
  <p><b>Étape 4</b> : on protège le <b>modèle</b> avant de l'enregistrer : chaque devis créé est protégé. Pour faire évoluer le modèle : ouvrir le .dotx, désactiver la protection, modifier, réactiver, enregistrer.</p>` },

/* 15 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW08, 2),
  n: `<p>Troisième partie : automatiser avec une macro VBA, puis rendre le document accessible.</p>` },

/* 16 — ENREGISTRER UNE MACRO */
{ title: 'Enregistrer une macro', html: `${H('Enregistrer une macro', 'Macros', PATH('Affichage > Macros > Enregistrer une macro'))}
${DLGW08({ x: 70, y: 175, w: 700, t: 'Enregistrer une macro', html: `${FLDW08('Nom de la macro :', 'TitreRouge', { lw: 230, hot: 1 })}<div style="font-size:15px;color:#DC2626;margin-top:-6px;padding-left:242px">sans espace</div>
 <div style="display:flex;gap:16px;align-items:center"><span style="min-width:230px;color:#33445E">Affecter la macro à :</span><span class="f zoom" data-s="3" style="display:flex;gap:10px">${BTNW08('🔘 Bouton')}${BTNW08('⌨️ Clavier')}</span></div>
 ${FLDW08('Enregistrer la macro dans :', 'Tous les documents (Normal.dotm) ▾', { lw: 230, hot: 1, s: 2 })}${FLDW08('Description :', 'Met le paragraphe en rouge et gras', { lw: 230 })}<div style="text-align:right">${BTNW08('OK', 1)} ${BTNW08('Annuler')}</div>` })}
<div class="f zoom" data-s="4" style="position:absolute;left:70px;top:560px;width:700px;display:flex;align-items:center;gap:16px;padding:16px 22px;border-radius:12px;background:#0E1726;color:#fff;font-size:20px;font-weight:700"><span class="pulse" style="width:18px;height:18px;border-radius:50%;background:#DC2626;display:inline-block"></span>Enregistrement… <span style="margin-left:auto;font-size:18px;opacity:.8">Barre d'état : ⏹ Arrêter</span></div>
<div style="position:absolute;left:820px;top:185px;width:710px;display:flex;flex-direction:column;gap:16px">
 ${CARD('1 · <b>Nommer</b> : lettres, chiffres, _ — pas d\'espace', 1, 'font-size:21px')}
 ${CARD('2 · <b>Stocker</b> : Normal.dotm (partout) ou le document', 2, 'font-size:21px')}
 ${CARD('3 · <b>Affecter</b> un bouton (barre d\'accès rapide) ou un raccourci', 3, 'font-size:21px')}
 ${CARD('4 · <b>Agir au clavier</b> puis <b>Arrêter l\'enregistrement</b>', 4, 'font-size:21px')}
</div>
${TIP('L\'enregistreur ne capte pas les <b>clics de souris dans le texte</b> : déplacez-vous avec les flèches, Ctrl+Fin…', { s: 5, x: 820, y: 640, w: 710, kind: 'warn' })}`,
  n: `<p>Une <b>macro</b> est une suite d'instructions VBA (Visual Basic for Applications) qui rejoue des actions. L'enregistreur écrit le code pour vous.</p>
  <p><b>Étape 1</b> : <i>Affichage › Macros › Enregistrer une macro…</i> (ou Développeur › Enregistrer une macro). Nom sans espace : TitreRouge, NettoyerEspaces.</p>
  <p><b>Étape 2</b> : où la stocker ? Dans <b>Normal.dotm</b> : disponible dans tous vos documents, sur ce poste. Dans le document ou le modèle : elle voyage avec le fichier (qui devra être en .docm/.dotm).</p>
  <p><b>Étape 3</b> : on peut l'affecter à un bouton de la barre d'outils Accès rapide ou à un raccourci clavier (attention à ne pas écraser un raccourci existant).</p>
  <p><b>Étape 4</b> : on réalise les actions, puis on clique sur <i>Arrêter l'enregistrement</i> (Affichage › Macros, ou le carré dans la barre d'état).</p>
  <p><b>Étape 5</b> : limite : les sélections à la souris dans le texte ne sont pas enregistrées ; utilisez le clavier (Maj+flèches, Ctrl+Maj+Fin…).</p>` },

/* 17 — LE CODE VBA */
{ title: 'Lire et écrire du VBA', html: `${H('Lire et écrire du code VBA', 'Éditeur Visual Basic')}
<pre class="term mono a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:900px;margin:0;font-size:19px;line-height:1.55;white-space:pre"><span class="c">Sub</span> NettoyerEspaces()
    <span class="g">' Remplace les espaces multiples par une seule espace</span>
    <span class="c">With</span> ActiveDocument.Content.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .Text = <span class="p">"( ){2,}"</span>
        .Replacement.Text = <span class="p">" "</span>
        .MatchWildcards = <span class="c">True</span>
        .Execute Replace:=wdReplaceAll
    <span class="c">End With</span>
    MsgBox <span class="p">"Espaces nettoyées !"</span>, vbInformation
<span class="c">End Sub</span></pre>
<div style="position:absolute;left:1010px;top:180px;width:520px;display:flex;flex-direction:column;gap:14px">
 ${CARD('<b>Sub … End Sub</b> : début et fin de la macro', 1)}
 ${CARD('<b>With … Find</b> : la boîte Rechercher / Remplacer, en code', 2)}
 ${CARD('<b>"( ){2,}"</b> : caractère générique = 2 espaces ou plus', 3)}
 ${CARD('<b>wdReplaceAll</b> : « Remplacer tout » · <b>MsgBox</b> : message final', 4)}
</div>
<div class="row f" data-s="5" style="position:absolute;left:70px;top:700px;gap:16px;align-items:center">${KEYS('Alt+F11')}<span style="font-size:20px;font-weight:700">Éditeur VBA</span><span style="width:30px"></span>${KEYS('Alt+F8')}<span style="font-size:20px;font-weight:700">Exécuter une macro</span></div>`,
  n: `<p><b>Alt+F11</b> ouvre l'éditeur Visual Basic. Dans l'explorateur de projets : <i>Normal</i> (Normal.dotm) et <i>Project (nom du document)</i>. Pour écrire une macro : clic droit sur le projet › Insertion › <b>Module</b>, puis on colle le code.</p>
  <p><b>Étape 1</b> : <code>Sub NomDeLaMacro()</code> … <code>End Sub</code>. Les lignes commençant par une apostrophe sont des commentaires (en vert).</p>
  <p><b>Étape 2</b> : <code>With ActiveDocument.Content.Find</code> : on travaille sur l'objet « Rechercher » de tout le document ; chaque ligne qui commence par un point règle une option (texte cherché, remplacement…).</p>
  <p><b>Étape 3</b> : les caractères génériques (MatchWildcards = True) : <code>( ){2,}</code> = une espace répétée au moins deux fois.</p>
  <p><b>Étape 4</b> : <code>.Execute Replace:=wdReplaceAll</code> lance le remplacement ; <code>MsgBox</code> affiche une confirmation.</p>
  <p><b>Étape 5</b> : on exécute avec <b>Alt+F8</b> › NettoyerEspaces › Exécuter. Astuce pédagogique : enregistrez une macro, puis lisez le code généré dans l'éditeur — c'est la meilleure façon d'apprendre le VBA.</p>` },

/* 18 — FORMATS ET SÉCURITÉ */
{ title: 'Macros : formats et sécurité', html: `${H('Formats de fichiers et sécurité des macros', 'Sécurité')}
<div style="position:absolute;left:70px;top:180px;width:820px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
 ${[['.docx', 'Document', 'sans macro', '#185ABD', 0], ['.docm', 'Document', 'avec macros', '#7C3AED', 1], ['.dotx', 'Modèle', 'sans macro', '#185ABD', 0], ['.dotm', 'Modèle', 'avec macros', '#7C3AED', 1]].map(([e, t, d, c, m], i) => `<div class="card f zoom" data-s="${i < 2 ? 1 : 2}" style="padding:20px 24px;border-left:6px solid ${c}"><div style="font:900 36px var(--mono);color:${c}">${e}</div><div style="font-size:20px;font-weight:700">${t} <span style="color:${m ? '#7C3AED' : '#6B7A90'}">${d}</span></div></div>`).join('')}
</div>
${TIP('Macro dans un <b>.docx</b> ? Word avertit : le code VBA sera <b>supprimé</b> à l\'enregistrement.', { s: 3, x: 70, y: 470, w: 820, kind: 'warn' })}
<div class="f right" data-s="4" style="position:absolute;left:940px;top:180px;width:590px">
 <div style="display:flex;gap:14px;align-items:flex-start;padding:18px 22px;border-radius:10px;background:#FDE7E9;border:1.5px solid #DC2626;font-size:18px;line-height:1.45"><span style="font-size:26px">⛔</span><div><b>RISQUE DE SÉCURITÉ</b> Microsoft a bloqué l'exécution des macros, car la source de ce fichier n'est pas fiable.</div></div>
 <div style="font-size:16px;color:#6B7A90;margin-top:8px">Fichier reçu par e-mail ou téléchargé depuis Internet</div></div>
<div class="card f right" data-s="5" style="position:absolute;left:940px;top:400px;width:590px;padding:20px 24px;font-size:20px;line-height:1.5">✔ N'activez que les macros dont vous <b>connaissez l'origine</b><br>✔ Emplacements approuvés gérés par l'IT<br>✘ Jamais une macro d'une pièce jointe inattendue</div>`,
  n: `<p><b>Étapes 1-2</b> : le « m » final signale un fichier qui peut contenir des macros : .docm (document) et .dotm (modèle). Le .docx et le .dotx ne peuvent pas en contenir.</p>
  <p><b>Étape 3</b> : si vous enregistrez en .docx un document contenant une macro, Word prévient que le projet VBA sera perdu. Pour le lab 2 : modèle <b>.dotm</b> obligatoire.</p>
  <p><b>Étape 4</b> : les macros sont aussi un vecteur de virus historique. Depuis 2022, Microsoft 365 bloque par défaut les macros des fichiers venant d'Internet (marque « Mark of the Web ») : bandeau rouge « Risque de sécurité ».</p>
  <p><b>Étape 5</b> : règles de prudence. Les paramètres se trouvent dans <i>Fichier › Options › Centre de gestion de la confidentialité</i> — en entreprise, ils sont souvent imposés par l'IT : ne pas les contourner.</p>` },

/* 19 — VÉRIFIER L'ACCESSIBILITÉ */
{ title: 'Vérifier l\'accessibilité', html: `${H('Le vérificateur d\'accessibilité', 'Accessibilité', PATH('Révision > Vérifier l\'accessibilité'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 880, h: 610, title: 'Livret d\'accueil.docx', tab: 'Révision',
  groups: [['Vérification', ['🔤 Éditeur', '📊 Statistiques']], ['Accessibilité', ['♿ Vérifier l\'accessibilité']], ['Langue', ['🌐 Langue']]],
  hot: { '♿ Vérifier l\'accessibilité': 1 },
  body: PAGE({ inwin: true, w: 600, html: `<h1 style="margin:0 0 10px">Bienvenue à Saint-Clair</h1><div style="display:flex;gap:14px;align-items:center"><div style="width:120px;height:80px;border-radius:6px;background:linear-gradient(135deg,#86EFAC,#0EA5E9);outline:3px solid #DC2626;outline-offset:3px;flex:none"></div><div style="flex:1">${LINES(3)}</div></div><h3 style="outline:3px solid #F59E0B;outline-offset:3px">Démarches administratives</h3><p style="font-size:15px">Pour la liste complète, <u style="color:#2563EB;outline:3px solid #F59E0B;outline-offset:2px">cliquez ici</u>.</p>` }) })}
<div class="card f right" data-s="2" style="position:absolute;left:980px;top:175px;width:550px;padding:0;overflow:hidden;font-family:'Segoe UI',var(--font)">
 <div style="padding:14px 20px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:19px;font-weight:800">Accessibilité</div>
 <div style="padding:12px 20px;font-size:17px;line-height:1.6"><b style="color:#DC2626">⛔ Erreurs</b><div style="padding-left:16px">Texte de remplacement manquant (Image 1)</div>
 <div class="f" data-s="3"><b style="color:#B45309">⚠️ Avertissements</b><div style="padding-left:16px">Texte de lien hypertexte peu explicite<br>Ordre des titres ignoré</div></div>
 <div class="f" data-s="4"><b style="color:#0369A1">💡 Conseils</b><div style="padding-left:16px">Couleur de police difficile à lire</div></div></div>
 <div class="f" data-s="5" style="margin:0 20px 16px;padding:10px 14px;border-radius:8px;background:#EFF6FF;font-size:16px"><b>Actions recommandées</b> ▾ Ajouter une description · Marquer comme décoratif</div>
</div>
${TIP('<b>Options › Accessibilité</b> : laisser le vérificateur s\'exécuter pendant que je travaille.', { s: 6, x: 980, y: 640, w: 550, kind: 'key' })}`,
  n: `<p>Un document accessible est lisible par tous : personnes aveugles (lecteur d'écran), malvoyantes (zoom, contraste), dyslexiques, et… les moteurs de recherche et les exports PDF. Pour un service public, c'est une obligation légale (RGAA).</p>
  <p><b>Étape 1</b> : <i>Révision › Vérifier l'accessibilité</i> ouvre le volet.</p>
  <p><b>Étape 2</b> : les <b>Erreurs</b> : contenu illisible pour un lecteur d'écran (image sans texte de remplacement).</p>
  <p><b>Étape 3</b> : les <b>Avertissements</b> : contenu difficile à comprendre (lien « cliquez ici », niveau de titre sauté).</p>
  <p><b>Étape 4</b> : les <b>Conseils</b> : améliorations (contraste, ordre de lecture).</p>
  <p><b>Étape 5</b> : chaque problème propose une action recommandée en un clic, et cliquer dessus sélectionne l'élément dans le document.</p>
  <p><b>Étape 6</b> : activer la vérification continue : un indicateur « Accessibilité : vérifiez les recommandations » apparaît dans la barre d'état.</p>` },

/* 20 — LES RÈGLES ESSENTIELLES */
{ title: 'Les règles essentielles', html: `${H('Six règles pour un document accessible', 'Accessibilité')}
<div style="position:absolute;left:70px;top:180px;width:1460px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px">
 ${[['🏗️', 'Structure par styles', 'Titre 1 › Titre 2… sans sauter de niveau'], ['🖼️', 'Texte de remplacement', 'Sur chaque image · ou « Élément décoratif »'], ['📊', 'Tableaux simples', 'Ligne d\'en-tête cochée et répétée · pas de fusion'], ['🔗', 'Liens explicites', '« Télécharger le règlement (PDF) », pas « cliquez ici »'], ['🎨', 'Contraste suffisant', 'L\'information ne passe jamais par la seule couleur'], ['🌐', 'Langue et texte réel', 'Révision › Langue · pas de texte en image · pas de soulignement hors liens']].map(([i, t, d], j) => `
 <div class="card f zoom" data-s="${j + 1}" style="padding:24px 26px;min-height:200px"><div style="font-size:48px">${i}</div><div style="font-size:24px;font-weight:800;margin-top:8px">${t}</div><div style="font-size:19px;color:#33445E;margin-top:6px;line-height:1.4">${d}</div></div>`).join('')}
</div>`,
  n: `<p>Les six règles, une par clic :</p>
  <p><b>1. Structure</b> : les lecteurs d'écran naviguent de titre en titre ; un Titre 3 sous un Titre 1 casse le plan. <b>2. Texte de remplacement</b> : clic droit sur l'image › Afficher le texte de remplacement ; décrire ce que l'image apporte (« Plan de la mairie, entrée rue de la Loire ») ; cocher « Élément décoratif » pour une image purement esthétique. <b>3. Tableaux</b> : Création de tableau › Ligne d'en-tête, Disposition › Répéter les lignes d'en-tête ; pas de cellules fusionnées ni de tableau utilisé pour la mise en page.</p>
  <p><b>4. Liens</b> : le texte du lien doit avoir du sens seul. <b>5. Contraste</b> : gris clair sur blanc illisible ; « les cases en rouge sont obligatoires » ne marche pas pour un daltonien. <b>6. Langue</b> correcte (prononciation du lecteur d'écran), pas de texte dans une image, pas de soulignement hors liens (on croirait un lien).</p>` },

/* 21 — HIÉRARCHIE DES TITRES (VS) */
{ title: 'Corriger la hiérarchie', html: `${H('Corriger la hiérarchie des titres', 'Exemple du lab 1')}
${VS({ y: 185, mid: '➜',
  l: { t: 'Avant', c: '#DC2626', ic: '✘', html: `<div style="font-size:21px;line-height:2.1;font-family:Calibri,'Segoe UI',sans-serif">${[['Titre 1', 'Bienvenue à Saint-Clair-sur-Loire', 0], ['Titre 3', 'Démarches administratives', 2], ['Titre 3', 'Horaires de la mairie', 2], ['Titre 2', 'Collecte des déchets', 1]].map(([s, t, l]) => `<div style="padding-left:${l * 34}px"><span class="chip ${s === 'Titre 3' ? 'bad' : 'dark'}" style="font-size:14px">${s}</span> ${t}</div>`).join('')}</div>` },
  r: { t: 'Après', c: '#16A34A', ic: '✔', html: `<div style="font-size:21px;line-height:2.1;font-family:Calibri,'Segoe UI',sans-serif">${[['Titre 1', 'Bienvenue à Saint-Clair-sur-Loire', 0], ['Titre 2', 'Démarches administratives', 1], ['Titre 2', 'Horaires de la mairie', 1], ['Titre 2', 'Collecte des déchets', 1]].map(([s, t, l]) => `<div style="padding-left:${l * 34}px"><span class="chip ${s === 'Titre 1' ? 'dark' : 'ok'}" style="font-size:14px">${s}</span> ${t}</div>`).join('')}</div>` } })}
<div class="row f" data-s="3" style="position:absolute;left:70px;top:560px;gap:16px;align-items:center">${KEYS('Ctrl+Alt+1')}${KEYS('Ctrl+Alt+2')}${KEYS('Ctrl+Alt+3')}<span style="font-size:20px;font-weight:700;color:#33445E">appliquer Titre 1, 2, 3</span></div>
${TIP('Vérifiez le plan dans le <b>volet de navigation</b> : il doit se lire comme une table des matières.', { s: 4, x: 70, y: 650, w: 1460, kind: 'ok' })}`,
  n: `<p>L'erreur n° 1 du lab 1 : des titres choisis pour leur apparence (« le Titre 3 est plus petit, c'est plus joli ») et non pour leur niveau.</p>
  <p><b>Étape 1</b> : avant : un Titre 3 directement sous le Titre 1. Le lecteur d'écran annonce un niveau 3 sans niveau 2 : l'utilisateur pense avoir manqué une partie.</p>
  <p><b>Étape 2</b> : après : 1, 2, 2, 2. Si l'apparence du Titre 2 ne plaît pas, on modifie le <b>style</b> Titre 2 (module 03), on ne change pas de niveau.</p>
  <p><b>Étape 3</b> : raccourcis Ctrl+Alt+1 / 2 / 3.</p>
  <p><b>Étape 4</b> : le volet de navigation est le meilleur contrôle visuel de la structure.</p>` },

/* 22 — PDF ACCESSIBLE */
{ title: 'Exporter un PDF accessible', html: `${H('Exporter un PDF accessible', 'Diffusion', PATH('Fichier > Exporter > Créer PDF/XPS > Options…'))}
${DLGW08({ x: 70, y: 180, w: 760, t: 'Options', html: `<div style="font-weight:800;color:#185ABD">Inclure les informations non imprimables</div>
 <div style="font-size:18px;line-height:2"><span class="f" data-s="1" style="display:inline-block;padding:0 8px;border-radius:4px;background:#FFF1EC;box-shadow:inset 3px 0 0 #FA582D">☑ Créer des signets à l'aide de : ◉ Titres</span><br>☑ Propriétés du document<br><span class="f" data-s="2" style="display:inline-block;padding:0 8px;border-radius:4px;background:#FFF1EC;box-shadow:inset 3px 0 0 #FA582D">☑ Balises de structure de document pour l'accessibilité</span></div>
 <div style="font-weight:800;color:#185ABD">Options PDF</div><div style="font-size:18px">☐ Compatible ISO 19005-1 (PDF/A)</div><div style="text-align:right">${BTNW08('OK', 1)} ${BTNW08('Annuler')}</div>` })}
<svg viewBox="0 0 640 520" class="f zoom" data-s="3" style="position:absolute;left:880px;top:180px;width:650px;height:520px">
 <rect x="20" y="20" width="600" height="480" rx="14" fill="#fff" stroke="#E3E8EF" stroke-width="2"/><rect x="20" y="20" width="600" height="44" rx="14" fill="#DC2626"/><text x="44" y="50" font-size="20" font-weight="800" fill="#fff">Livret-accueil.pdf</text>
 <rect x="20" y="64" width="200" height="436" fill="#F8FAFC"/><text x="36" y="96" font-size="16" font-weight="800" fill="#33445E">Signets</text>
 ${['Bienvenue', '  Démarches', '  Horaires', '  Déchets'].map((t, i) => `<text x="${t.startsWith(' ') ? 56 : 36}" y="${130 + i * 34}" font-size="17" fill="#1B2A41">▸ ${t.trim()}</text>`).join('')}
 <text x="250" y="110" font-size="24" font-weight="800" fill="#185ABD">Bienvenue à Saint-Clair</text>
 ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="250" y="${135 + i * 26}" width="${330 - (i % 3) * 40}" height="10" rx="5" fill="#E2E8F0"/>`).join('')}
 <g transform="translate(470 330)"><circle r="70" fill="#EFF6FF" stroke="#2563EB" stroke-width="3"/><text y="22" text-anchor="middle" font-size="64">♿</text></g>
</svg>
${TIP('Signets = <b>navigation</b> dans le PDF · Balises = <b>lecture</b> par les lecteurs d\'écran.', { s: 4, x: 70, y: 600, w: 760, kind: 'ok' })}`,
  n: `<p>La plupart des documents accessibles sont diffusés en PDF : il faut que l'export conserve la structure.</p>
  <p><b>Étape 1</b> : dans <i>Fichier › Exporter › Créer PDF/XPS › Options…</i>, cochez <b>Créer des signets à l'aide de : Titres</b> : le panneau Signets du lecteur PDF reprend le plan (d'où l'importance des styles).</p>
  <p><b>Étape 2</b> : <b>Balises de structure de document pour l'accessibilité</b> (cochée par défaut, à vérifier) : les titres, listes, tableaux et textes de remplacement sont transmis au PDF.</p>
  <p><b>Étape 3</b> : résultat : un PDF navigable et lisible par un lecteur d'écran.</p>
  <p><b>Étape 4</b> : « Enregistrer sous › PDF » utilise les mêmes options. N'imprimez jamais vers une « imprimante PDF » : la structure est perdue.</p>` },

/* 23 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Industrialiser ses documents : l\'essentiel', k: 'Récap animé', hub: '.dotm', hfs: 58, hsub: 'modèle + macros', hk: 'EXPERT',
  items: [{ ic: '📄', t: 'Modèles', d: '.dotx · double-clic = nouveau document · Normal.dotm' }, { ic: '🧮', t: 'Champs', d: 'CREATEDATE plutôt que DATE · Alt+F9 · F9 · Ctrl+F9' },
    { ic: '📋', t: 'Formulaires', d: 'Développeur › Contrôles · Propriétés · Remplissage de formulaires' }, { ic: '🧩', t: 'Macros VBA', d: 'Enregistrer · Alt+F11 · Alt+F8 · .docm / .dotm · prudence' }, { ic: '♿', t: 'Accessibilité', d: 'Vérifier · titres sans saut · texte de remplacement · liens explicites' }] }),
  n: `<p>Récap des cinq briques. Le hub « .dotm » résume le lab 2 : un modèle qui contient un formulaire protégé et une macro.</p>
  <p>Questions éclair : double-clic sur un .dotx ? (nouveau document) — quel champ pour la date d'un courrier ? (CREATEDATE) — format pour garder une macro ? (.docm/.dotm) — erreur d'accessibilité la plus courante ? (image sans texte de remplacement).</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Alt+F8', d: 'Liste des macros (exécuter)' }, { k: 'Alt+F11', d: 'Éditeur Visual Basic' }, { k: 'Alt+F9', d: 'Afficher / masquer les codes de champ' }, { k: 'Ctrl+F9', d: 'Insérer un champ vide { }' }, { k: 'Ctrl+Maj+F9', d: 'Figer un champ en texte' }, { k: 'F9', d: 'Mettre à jour les champs' }], { cols: 3, y: 190 })}
${TIP('Formulaire protégé : <b>Tab</b> passe au contrôle suivant, <b>Maj+Tab</b> au précédent.', { s: 7, kind: 'key', x: 70, y: 560, w: 1000 })}`,
  n: `<p>Six raccourcis : deux pour les macros, quatre pour les champs. Alt+F11 / Alt+F8 sont identiques dans Excel et PowerPoint.</p>` },

/* 25 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'word', mod: 'w08', lab: 0, title: 'Lab 1 — Rendre accessible le livret d\'accueil', tasks: ['Corriger la <b>hiérarchie des titres</b> (aucun niveau sauté)', 'Remplacer « cliquez ici » par un <b>lien explicite</b>', '<b>Ligne d\'en-tête</b> du tableau des horaires en gras', 'Retirer le <b>soulignement</b> trompeur, mettre en gras'] }),
  n: `<p>Scénario : livret d'accueil de la mairie de <b>Saint-Clair-sur-Loire</b>, vérifié dans le simulateur.</p>
  <p>Tâche 1 : les deux Titre 3 deviennent Titre 2 (Ctrl+Alt+2). Tâche 2 : clic dans le lien › Ctrl+K › Texte à afficher (sélectionner tout le lien et retaper par-dessus supprime le lien !). Tâche 3 : dans le vrai Word, on cocherait Ligne d'en-tête. Tâche 4 : Ctrl+U retire, Ctrl+G met en gras.</p>` },

/* 26 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'word', mod: 'w08', lab: 1, title: 'Lab 2 — Modèle de devis, formulaire et macro', tasks: ['Afficher l\'onglet <b>Développeur</b> · saisir les libellés', '<b>Contrôles</b> : texte brut, date, liste, case à cocher', 'Pied : <b>FILENAME</b>, Page <b>PAGE</b> sur <b>NUMPAGES</b> · protéger', 'Alt+F11 › Module : macro <b>NettoyerEspaces</b> · Alt+F8', 'Enregistrer en <b>Devis-BatiPro.dotm</b> · nouveau devis', '<b>Vérifier l\'accessibilité</b> et corriger'] }),
  n: `<p>Lab dans le <b>vrai Word</b> (onglet Développeur requis). Comptez 30 minutes.</p>
  <p>Points d'attention : ôter la protection avant d'ajouter la macro ; placer le module dans « Project (Document1) » et non dans Normal pour qu'il voyage avec le modèle ; enregistrer en <b>.dotm</b> (en .dotx, la macro est perdue) ; tester en créant un devis via Fichier › Nouveau › Personnel.</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Vous double-cliquez sur un fichier .dotx dans l\'Explorateur. Que se passe-t-il ?', o: ['Le modèle s\'ouvre pour modification', 'Un nouveau document basé sur le modèle est créé', 'Word affiche une erreur', 'Le modèle est converti en PDF'], a: [1], e: 'Double-clic = nouveau document basé sur le modèle ; pour modifier le modèle lui-même : clic droit › Ouvrir.' },
  { q: 'Pour une date de courrier qui ne doit pas changer à chaque ouverture, quel champ choisir ?', o: ['DATE', 'CREATEDATE', 'NUMPAGES', 'FILENAME'], a: [1], e: 'DATE affiche la date du jour à chaque mise à jour ; CREATEDATE conserve la date de création du document.' },
  { q: 'Vous enregistrez un document contenant une macro au format .docx. Que se passe-t-il ?', o: ['La macro est conservée', 'Word avertit que le code VBA sera supprimé', 'La macro est convertie en champ', 'Le fichier devient un modèle'], a: [1], e: 'Le .docx ne peut pas contenir de macros : il faut enregistrer en .docm (ou .dotm).' },
  { q: 'Quelle protection permet de n\'autoriser la saisie que dans les contrôles de contenu ?', o: ['Marquer comme final', 'Chiffrer avec mot de passe', 'Restreindre la modification › Remplissage de formulaires', 'Suivi des modifications'], a: [2], e: 'Le mode « Remplissage de formulaires » verrouille tout le document sauf les champs et contrôles.' },
  { q: 'Lequel de ces éléments est une erreur d\'accessibilité ?', o: ['Un lien intitulé « Télécharger le règlement (PDF) »', 'Un Titre 3 placé directement sous un Titre 1', 'Une image décorative marquée « Élément décoratif »', 'Un tableau avec ligne d\'en-tête répétée'], a: [1], e: 'Sauter un niveau de titre casse la structure pour les lecteurs d\'écran et la navigation.' },
  { q: 'Quels raccourcis concernent les macros ? (2 réponses)', o: ['Alt+F8', 'Alt+F9', 'Alt+F11', 'Ctrl+F9'], a: [0, 2], e: 'Alt+F8 liste et exécute les macros, Alt+F11 ouvre l\'éditeur VBA ; Alt+F9 et Ctrl+F9 concernent les champs.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) c · 5) b · 6) a et c.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W08', html: END(),
  n: `<p>Fin du module 08 et du parcours Word. Les participants savent désormais produire des documents longs, collaboratifs, fusionnés, standardisés et accessibles. Revenez sur les attentes notées en début de formation.</p>` },
] };
