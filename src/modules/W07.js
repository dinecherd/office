/* ===================== MODULE W07 — Publipostage : lettres, e-mails et étiquettes personnalisés ===================== */
const SECSW07 = ['Le principe et la source de données', 'Champs, règles et formats', 'Filtrer, fusionner, étiquettes'];

/* --- helpers locaux W07 --- */
const DLGW07 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .3}s;`}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:0;overflow:hidden;border-radius:12px;font-family:'Segoe UI',var(--font)">
  <div style="display:flex;align-items:center;height:44px;padding:0 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#94A3B8;font-weight:400">✕</span></div>
  <div style="padding:16px 22px;font-size:18px;color:#1B2A41;display:flex;flex-direction:column;gap:12px">${o.html}</div></div>`;
const FLDW07 = (l, v, o = {}) => `<div style="display:flex;align-items:center;gap:12px" ${o.s ? `class="f" data-s="${o.s}"` : ''}><span style="min-width:${o.lw ?? 170}px;color:#33445E">${l}</span><span style="flex:1;padding:6px 12px;border:1.5px solid ${o.hot ? '#FA582D' : '#CBD5E1'};border-radius:6px;background:#fff;font-weight:600;${o.hot ? 'box-shadow:0 0 0 4px rgba(250,88,45,.15);' : ''}">${v}</span></div>`;
const BTNW07 = (t, p) => `<span style="display:inline-block;padding:6px 18px;border-radius:6px;font-size:16px;font-weight:700;${p ? 'background:#185ABD;color:#fff' : 'background:#fff;border:1.5px solid #CBD5E1;color:#1B2A41'}">${t}</span>`;
const MENUW07 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:8px 0;border-radius:10px;font-family:'Segoe UI',var(--font);z-index:3">
  ${o.items.map(it => `<div ${it.hot ? `class="f" data-s="${it.hot}"` : ''} style="display:flex;gap:14px;align-items:center;padding:10px 18px;font-size:19px;${it.hot ? 'background:#FFF1EC;box-shadow:inset 4px 0 0 #FA582D;font-weight:700;' : ''}"><span style="width:28px;text-align:center">${it.i || ''}</span>${it.t}</div>`).join('')}</div>`;
/* champ de fusion « chevrons » */
const FW07 = t => `<span style="background:#E5E7EB;border-radius:3px;padding:0 3px;white-space:nowrap">«${t}»</span>`;
/* texte remplacé à l'étape s (superposé) */
const SWAPW07 = (old, nw, s, bg = '#fff', c = '#16A34A') => `<span style="position:relative;display:inline-block;white-space:nowrap">${old}<span class="f" data-s="${s}" style="position:absolute;left:0;top:0;bottom:0;min-width:100%;white-space:nowrap;background:${bg};color:${c};font-weight:700">${nw}</span></span>`;
const CHAINW07 = (list, o = {}) => { const n = list.length, w = o.w ?? 1460, cw = w / n, s0 = o.s0 ?? 1, R = o.r ?? 52;
  return `<div style="position:absolute;left:${o.x ?? 70}px;top:${o.y ?? 200}px;width:${w}px;height:${o.h ?? 300}px">
  <svg viewBox="0 0 ${w} ${R * 2}" style="position:absolute;left:0;top:0;width:${w}px;height:${R * 2}px;overflow:visible">
   ${list.slice(1).map((_, i) => `<g class="f" data-s="${s0 + i + 1}"><path d="M${cw * i + cw / 2 + R} ${R} H${cw * (i + 1) + cw / 2 - R}" stroke="#FA582D" stroke-width="4" stroke-dasharray="10 8" fill="none"/></g>`).join('')}
   <g class="f" data-s="${s0 + n - 1}"><circle r="8" fill="#FA582D" filter="url(#gl)"><animateMotion dur="${n * 0.9}s" repeatCount="indefinite" path="M${cw / 2} ${R} H${cw * (n - 1) + cw / 2}"/></circle></g>
  </svg>
  ${list.map((it, i) => `<div class="f zoom" data-s="${s0 + i}" style="position:absolute;left:${cw * i}px;top:0;width:${cw}px;text-align:center">
   <div style="width:${R * 2}px;height:${R * 2}px;margin:0 auto;border-radius:50%;background:#fff;box-shadow:0 14px 30px -12px rgba(14,23,38,.35),0 0 0 3px #FFD9CC;display:grid;place-items:center;font-size:${R * .8}px;position:relative;z-index:1">${it.i}</div>
   <div style="font-size:22px;font-weight:800;margin-top:14px;padding:0 8px">${it.t}</div>${it.d ? `<div style="font-size:17px;color:#6B7A90;margin-top:4px;padding:0 10px;line-height:1.35">${it.d}</div>` : ''}</div>`).join('')}
  </div>`; };
const RIBW07 = [['Créer', ['✉️ Enveloppes', '🏷️ Étiquettes']], ['Démarrer la fusion et le publipostage', ['📨 Démarrer la fusion', '👥 Sélection des destinataires', '📝 Modifier la liste']], ['Champs d\'écriture et d\'insertion', ['🏠 Bloc d\'adresse', '👋 Ligne de salutation', '➕ Insérer un champ', '❓ Règles']], ['Aperçu des résultats', ['🔍 Aperçu des résultats', '◀ 1 ▶']], ['Terminer', ['✅ Terminer & fusionner']]];
const ADHW07 = [['Mme', 'Camille', 'Roux', 'Librairie du Change', '250,00', '15/01/2027'], ['M.', 'Karim', 'Benali', 'Épices & Co', '180,00', '15/01/2027'], ['Mme', 'Inès', 'Moreau', 'Atelier Soie', '250,00', '15/01/2027'], ['M.', 'Thomas', 'Garnier', 'Café des Juges', '320,00', '31/01/2027'], ['Mme', 'Lucie', 'Faure', 'Bijoux Lucie', '180,00', '31/01/2027'], ['M.', 'Hugo', 'Perrin', 'Fromagerie Perrin', '250,00', '15/02/2027'], ['Mme', 'Sarah', 'Lambert', 'Galerie Lambert', '1250,00', '15/02/2027'], ['M.', 'Antoine', 'Chevalier', 'Bouchon Antoine', '320,00', '15/02/2027']];

window.MODULE = { code: 'W07', title: 'Publipostage : lettres, e-mails et étiquettes personnalisés', short: 'Publipostage', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Publipostage', html: TITLE({ mod: 'WORD · MODULE 07 · EXPERT', title: 'Le <span class="grad">publipostage</span>', sub: '« Des centaines de courriers, e-mails ou étiquettes personnalisés en quelques minutes »', agenda: SECSW07, art: APPART('word') }),
  n: `<p>Module 07, premier module du niveau <b>Expert</b>. Le publipostage (« mail merge » en anglais) est l'une des fonctions de Word qui fait gagner le plus de temps : relances, convocations, attestations, certificats, invitations, étiquettes d'envoi…</p>
  <p>Fil rouge : la <b>Fédération des Commerçants du Vieux-Lyon</b> relance huit adhérents qui n'ont pas réglé leur cotisation 2027. Une lettre personnalisée par adhérent, puis les étiquettes des enveloppes.</p>
  <p>Prérequis : savoir lire un tableau Excel simple. Durée : 70 minutes, un lab long dans le vrai Word.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Préparer une <b>source de données</b> propre (Excel, CSV, Outlook)', 'Insérer <b>champs de fusion</b>, bloc d\'adresse et ligne de salutation', 'Utiliser la règle <b>Si…Alors…Sinon</b> et formater nombres et dates', '<b>Filtrer</b> les destinataires et fusionner vers documents, imprimante ou <b>e-mails</b>', 'Produire des <b>étiquettes</b> d\'adresse']),
  n: `<p>Cinq objectifs qui suivent exactement le déroulé d'un publipostage : source → document principal → champs et règles → filtre → fusion.</p>
  <p>Question d'amorce : « Combien de temps vous faut-il pour écrire 200 lettres de relance personnalisées ? » Avec le publipostage : le temps d'en écrire une.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW07, 0),
  n: `<p>Première partie : le principe, et surtout la <b>source de données</b> — 80 % des problèmes de publipostage viennent d'une source mal préparée.</p>` },

/* 4 — LE PRINCIPE (FLOW) */
{ title: 'Le principe', html: `${H('Deux ingrédients, une fusion', 'Le principe')}
${FLOW({ x: 70, y: 165, w: 1460, h: 580,
  z: [{ x: 0, y: 0, w: 400, h: 570, l: 'ENTRÉES', c: '#185ABD' }, { x: 1060, y: 0, w: 400, h: 570, l: 'SORTIES', c: '#16A34A', s: 3 }],
  n: { src: { x: 200, y: 145, ic: 'xlsx', sz: 96, l: 'Source de données', sub: '1 ligne = 1 destinataire' }, doc: { x: 200, y: 400, ic: 'docx', sz: 96, l: 'Document principal', sub: 'texte commun + «champs»', s: 1 },
    mrg: { x: 730, y: 270, ic: 'word', sz: 110, hot: true, l: 'Fusion', sub: 'onglet Publipostage', s: 2 },
    o1: { x: 1260, y: 95, ic: 'docx', l: 'Lettres', sub: '8 lettres', s: 3 }, o2: { x: 1260, y: 265, ic: 'mail', l: 'E-mails', sub: 'via Outlook', s: 3 }, o3: { x: 1260, y: 435, ic: 'print', l: 'Étiquettes', sub: 'ou impression directe', s: 3 } },
  l: [{ a: 'src', b: 'mrg', r: 'hvh', s: 2 }, { a: 'doc', b: 'mrg', r: 'hvh', s: 2 }, { a: 'mrg', b: 'o1', r: 'hvh', s: 3 }, { a: 'mrg', b: 'o2', r: 'hvh', s: 3 }, { a: 'mrg', b: 'o3', r: 'hvh', s: 3 }],
  p: [{ s: 3, c: '#FA582D', seg: [{ via: ['src', 'mrg'], lab: 'Camille Roux', t: 1.6 }, { via: ['mrg', 'o1'], lab: 'Lettre 1', t: 1.4 }] }, { s: 3, c: '#7C3AED', begin: 1.5, seg: [{ via: ['src', 'mrg'], lab: 'Karim Benali', t: 1.6 }, { via: ['mrg', 'o2'], lab: 'E-mail 2', t: 1.4 }] }] })}`,
  n: `<p>Un publipostage combine deux éléments :</p>
  <p><b>Étape 0</b> (à l'écran d'entrée) : la <b>source de données</b> — un tableau, une ligne par destinataire, une colonne par information (civilité, prénom, nom, adresse, montant…).</p>
  <p><b>Étape 1</b> : le <b>document principal</b> — le texte identique pour tous, dans lequel on place des <b>champs de fusion</b> (« trous » à remplir) : «Prenom», «Montant»…</p>
  <p><b>Étape 2</b> : la fusion, pilotée depuis l'onglet <b>Publipostage</b>.</p>
  <p><b>Étape 3</b> : Word produit autant de documents que de lignes : des lettres (dans un nouveau document à relire), des e-mails envoyés par Outlook, des étiquettes, ou une impression directe. Montrez les « paquets » : chaque ligne de la source devient une lettre.</p>` },

/* 5 — ANATOMIE (GRID + PAGE) */
{ title: 'Source et document principal', html: `${H('La source et le document principal', 'Anatomie')}
${GRID({ x: 70, y: 190, cols: 6, colw: [100, 110, 110, 190, 110, 130], rows: [['Civilite', 'Prenom', 'Nom', 'Societe', 'Montant', 'Echeance'], ...ADHW07.slice(0, 5)],
  hl: [{ r: 'A1:F1', s: 1, c: '#2563EB', t: '1 ligne d\'en-têtes' }, { r: 'A3:F3', s: 2, c: '#FA582D', t: '1 ligne = 1 destinataire' }, { r: 'E2:E6', s: 3, c: '#16A34A', t: '1 colonne = 1 info' }] })}
${PAGE({ x: 900, y: 175, w: 630, h: 520, s: 4, html: `<p style="text-align:right;font-size:15px">Lyon, le 25 octobre 2026</p><p style="font-size:16px">${FW07('Prenom')} ${FW07('Nom')}<br>${FW07('Societe')}</p><p style="font-size:17px;margin-top:20px">${FW07('Civilite')} ${FW07('Nom')},</p><p style="font-size:17px">Votre cotisation de ${FW07('Montant')} € est à régler avant le ${FW07('Echeance')}.</p>${LINES(3)}<p style="font-size:16px;text-align:right">La présidente</p>` })}
<div class="chip dark f" data-s="5" style="position:absolute;left:900px;top:720px;font-size:18px;padding:10px 18px">Les noms de colonnes deviennent les noms de champs</div>`,
  n: `<p><b>Étape 1</b> : la source a <b>une seule ligne d'en-têtes</b>, en ligne 1. Ces en-têtes deviennent les noms des champs dans Word.</p>
  <p><b>Étape 2</b> : chaque ligne suivante est un destinataire. Pas de ligne vide, pas de ligne de total, pas de sous-titre au milieu.</p>
  <p><b>Étape 3</b> : une colonne par information. Prénom et nom séparés : on pourra écrire « Chère Madame Roux » comme « Bonjour Camille ».</p>
  <p><b>Étape 4</b> : le document principal : du texte normal et des champs entre chevrons «…». Les chevrons ne se tapent <b>jamais</b> au clavier : ce sont des champs insérés par Word.</p>
  <p><b>Étape 5</b> : d'où l'intérêt de noms de colonnes courts et explicites, sans espaces ni caractères spéciaux.</p>` },

/* 6 — SOURCE PROPRE (VS) */
{ title: 'Une source propre', html: `${H('Préparer une source propre', 'Source de données', PATH('Publipostage > Sélection des destinataires > Utiliser une liste existante'))}
${VS({ y: 185, mid: '➜', l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['Un titre « Liste 2027 » au-dessus du tableau', 'Cellules fusionnées, lignes vides, totaux', 'Une colonne « Nom complet »', 'En-têtes « Code postal (France) »'] },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['En-têtes en <b>ligne 1</b>, données dès la ligne 2', 'Un tableau <b>continu</b>, sans fusion', '<b>Prenom</b> et <b>Nom</b> séparés', 'Noms courts : <b>CP</b>, <b>Montant</b>, <b>Email</b>'] } })}
<div class="row f" data-s="3" style="position:absolute;left:70px;top:620px;gap:16px;flex-wrap:wrap">${['📗 Excel .xlsx', '📄 Texte / CSV', '👥 Contacts Outlook', '🗄️ Access', '📝 Tableau Word', '✍️ Taper une nouvelle liste'].map(t => `<span class="chip blu" style="font-size:19px;padding:10px 18px">${t}</span>`).join('')}</div>`,
  n: `<p><b>Étape 1</b> : les erreurs classiques. Un titre au-dessus du tableau : Word prend « Liste 2027 » pour un nom de champ. Des cellules fusionnées ou des lignes vides : des lettres vides ou décalées. Une colonne « Nom complet » : impossible d'écrire « Madame Roux ». Des en-têtes avec espaces, parenthèses, accents : Word les renomme (Code_postal_France)…</p>
  <p><b>Étape 2</b> : la source idéale. Astuce : dans Excel, mettre la plage sous forme de <b>Tableau</b> (Ctrl+L) — Word propose alors directement le tableau nommé dans la liste des feuilles.</p>
  <p><b>Étape 3</b> : les sources acceptées. Le plus courant : Excel. <i>Taper une nouvelle liste</i> crée une petite base Access (.mdb) — pratique pour 10 destinataires ponctuels.</p>
  <p>Conseil : fermez le classeur Excel avant de le connecter, et ne renommez/déplacez plus le fichier ensuite (le lien serait cassé).</p>` },

/* 7 — PIÈGES CSV */
{ title: 'Pièges du CSV', html: `${H('Deux pièges : séparateur et zéros', 'CSV et codes postaux')}
<div class="term a pop" style="--d:.2s;position:absolute;left:70px;top:185px;width:820px;font-size:19px;line-height:1.6">
 <div><span class="p">adherents-relance.csv</span></div>
 <div>Civilite<span class="g">;</span>Prenom<span class="g">;</span>Nom<span class="g">;</span>…<span class="g">;</span>CP<span class="g">;</span>Ville</div>
 <div>Mme<span class="g">;</span>Camille<span class="g">;</span>Roux<span class="g">;</span>…<span class="g">;</span>69005<span class="g">;</span>Lyon</div>
 <div>M.<span class="g">;</span>Paul<span class="g">;</span>Vidal<span class="g">;</span>…<span class="g">;</span><span class="c">01000</span><span class="g">;</span>Bourg-en-Bresse</div></div>
<div class="card f" data-s="1" style="position:absolute;left:70px;top:430px;width:820px;padding:18px 24px;font-size:20px;border-left:6px solid #0EA5E9"><b>Séparateur</b> : en France, le <b>« ; »</b> (paramètres régionaux). Tout dans une seule colonne ? Le séparateur n'est pas reconnu → ouvrir dans Excel et enregistrer en <b>.xlsx</b>.</div>
${GRID({ x: 950, y: 190, cols: 3, colw: [140, 120, 190], rows: [['Nom', 'CP', 'Ville'], ['Roux', 69005, 'Lyon'], ['Vidal', 1000, 'Bourg-en-Bresse'], ['Blanc', 7000, 'Privas']],
  hl: [{ r: 'B3:B4', s: 2, c: '#DC2626', t: 'zéro perdu !' }], val: [{ r: 'B3', v: '01000', s: 3 }, { r: 'B4', v: '07000', s: 3 }] })}
${TIP('Colonne <b>CP</b> au format <b>Texte</b> dans Excel (avant la saisie) : <b>01000</b> reste 01000.', { s: 3, x: 950, y: 430, w: 580, kind: 'ok' })}
${TIP('Contrôlez toujours dans <b>Modifier la liste de destinataires</b> avant de fusionner.', { s: 4, x: 70, y: 620, w: 1460, kind: 'key' })}`,
  n: `<p>Un CSV est un simple fichier texte où les colonnes sont séparées par un caractère.</p>
  <p><b>Étape 1</b> : Word utilise le <b>séparateur de liste</b> de Windows : le point-virgule en France. Un CSV « américain » séparé par des virgules ne sera pas découpé. Solution la plus simple : ouvrir le CSV dans Excel (Données › À partir d'un fichier texte/CSV), vérifier, enregistrer en .xlsx.</p>
  <p><b>Étape 2</b> : les codes postaux commençant par 0 (Ain 01, Ardèche 07…) : si Excel les a considérés comme des nombres, le zéro initial disparaît : « 1000 Bourg-en-Bresse ». La Poste n'appréciera pas.</p>
  <p><b>Étape 3</b> : passez la colonne au format <b>Texte</b> (ou importez-la en Texte avec Power Query). Même chose pour les numéros de téléphone et les numéros d'adhérent.</p>
  <p><b>Étape 4</b> : le réflexe : toujours vérifier les données dans <i>Modifier la liste de destinataires</i>, puis avec l'Aperçu des résultats.</p>` },

/* 8 — DÉMARRER LA FUSION (APPWIN) */
{ title: 'Démarrer la fusion', html: `${H('Démarrer et choisir les destinataires', 'Onglet Publipostage', PATH('Publipostage > Démarrer la fusion et le publipostage'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1460, h: 620, title: 'Relance cotisations.docx', tab: 'Publipostage', groups: RIBW07,
  hot: { 'tab:Publipostage': 1, '📨 Démarrer la fusion': 1, '👥 Sélection des destinataires': 3 },
  body: `<div style="padding:24px 0 0 820px"></div>` })}
${MENUW07({ s: 2, x: 230, y: 335, w: 400, items: [{ i: '✉️', t: 'Lettres', hot: 2 }, { i: '📧', t: 'Messages électroniques' }, { i: '✉', t: 'Enveloppes…' }, { i: '🏷️', t: 'Étiquettes…' }, { i: '📃', t: 'Répertoire' }, { i: '🧭', t: 'Assistant Fusion et publipostage pas à pas…' }] })}
${MENUW07({ s: 3, x: 660, y: 335, w: 440, items: [{ i: '✍️', t: 'Taper une nouvelle liste…' }, { i: '📗', t: 'Utiliser une liste existante…', hot: 3 }, { i: '👥', t: 'Choisir dans les contacts Outlook…' }] })}
${DLGW07({ s: 4, x: 1130, y: 335, w: 380, t: 'Sélectionner le tableau', html: `<div style="border:1.5px solid #CBD5E1;border-radius:6px;font-size:17px"><div style="padding:6px 10px;background:#DBEAFE;font-weight:700">Feuil1$</div><div style="padding:6px 10px">Feuil2$</div></div><div style="font-size:16px">☑ La première ligne de données contient les en-têtes de colonnes</div><div style="text-align:right">${BTNW07('OK', 1)}</div>` })}
${TIP('Débutant ? <b>Assistant Fusion et publipostage pas à pas</b> : 6 étapes guidées dans un volet.', { s: 5, x: 230, y: 690, w: 870, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : onglet <b>Publipostage</b> › <i>Démarrer la fusion et le publipostage</i>.</p>
  <p><b>Étape 2</b> : on choisit le type de document : <b>Lettres</b> (le plus courant, aussi pour des attestations, des convocations), Messages électroniques, Enveloppes, Étiquettes, Répertoire (une liste continue, ex. un annuaire).</p>
  <p><b>Étape 3</b> : <i>Sélection des destinataires › Utiliser une liste existante…</i> et on choisit le classeur. <i>Choisir dans les contacts Outlook</i> utilise un carnet d'adresses Outlook.</p>
  <p><b>Étape 4</b> : pour un classeur, Word demande quelle feuille ou quel tableau utiliser. Vérifiez la case « La première ligne de données contient les en-têtes de colonnes ».</p>
  <p><b>Étape 5</b> : l'Assistant pas à pas (volet à droite) reprend les mêmes étapes avec des explications : utile pour une première fois ou pour un utilisateur occasionnel.</p>
  <p>Les boutons du ruban s'activent au fur et à mesure : Insérer un champ de fusion reste grisé tant qu'aucune source n'est connectée.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW07, 1),
  n: `<p>Deuxième partie : construire le document principal — champs, aperçu, formats, règles.</p>` },

/* 10 — INSÉRER LES CHAMPS */
{ title: 'Insérer les champs', html: `${H('Insérer les champs de fusion', 'Champs d\'écriture et d\'insertion')}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1060, h: 620, title: 'Relance cotisations.docx', tab: 'Publipostage', groups: RIBW07.slice(2, 4),
  hot: { '🏠 Bloc d\'adresse': 1, '👋 Ligne de salutation': 2, '➕ Insérer un champ': 3 },
  body: PAGE({ inwin: true, w: 760, html: `<p style="text-align:right;font-size:15px;margin:0 0 12px">Lyon, le 25 octobre 2026</p>
   <p class="f" data-s="1" style="font-size:16px">${FW07('AddressBlock')}</p>
   <p class="f" data-s="2" style="font-size:17px">${FW07('GreetingLine')}</p>
   <p style="font-size:17px">Votre cotisation de <span class="f" data-s="3" style="display:inline">${FW07('Montant')}</span> € est à régler avant le <span class="f" data-s="3" style="display:inline">${FW07('Echeance')}</span>.</p>${LINES(2)}` }) })}
${MENUW07({ s: 3, x: 1160, y: 175, w: 370, items: ['Civilite', 'Prenom', 'Nom', 'Societe', 'Adresse', 'CP', 'Ville', ['Montant', 3], 'Echeance', 'Email'].map(f => Array.isArray(f) ? { i: '«»', t: f[0], hot: f[1] } : { i: '«»', t: f }) })}
${TIP(`Espaces et ponctuation <b>hors</b> des champs : ${FW07('Prenom')} ${FW07('Nom')}`, { s: 4, x: 1160, y: 680, w: 370, kind: 'key' })}`,
  n: `<p>Le groupe <b>Champs d'écriture et d'insertion</b> :</p>
  <p><b>Étape 1</b> : <b>Bloc d'adresse</b> assemble automatiquement civilité, nom, société, adresse, CP, ville, avec un aperçu. Si vos colonnes ont des noms inhabituels, le bouton <i>Faire correspondre les champs</i> dit à Word que « CP » est le code postal.</p>
  <p><b>Étape 2</b> : <b>Ligne de salutation</b> : « Cher Monsieur Dupont, » avec une formule de repli (« Madame, Monsieur, ») quand les données sont incomplètes.</p>
  <p><b>Étape 3</b> : <b>Insérer un champ de fusion</b> : la liste des colonnes de la source. On place le curseur, on clique sur le champ. C'est la méthode la plus souple : beaucoup de formateurs préfèrent composer l'adresse champ par champ.</p>
  <p><b>Étape 4</b> : on tape les espaces et la ponctuation entre les champs, pas dedans. Astuce : <i>Champs de fusion en surbrillance</i> grise tous les champs pour les repérer.</p>` },

/* 11 — APERÇU DES RÉSULTATS */
{ title: 'Aperçu des résultats', html: `${H('Aperçu des résultats', 'Vérifier avant de fusionner', PATH('Publipostage > Aperçu des résultats'))}
${PAGE({ x: 70, y: 180, w: 640, h: 450, html: `<p style="font-size:17px">${FW07('Prenom')} ${FW07('Nom')}<br>${FW07('Societe')}</p><p style="font-size:18px;margin-top:20px">Votre cotisation de ${FW07('Montant')} € est à régler avant le ${FW07('Echeance')}.</p>${LINES(3)}` })}
<div class="f zoom" data-s="1" style="position:absolute;left:730px;top:340px;font-size:60px;color:#FA582D">➜</div>
${PAGE({ x: 830, y: 180, w: 700, h: 450, s: 1, html: `<p style="font-size:17px">${SWAPW07('Camille Roux', 'Sarah Lambert', 2, '#fff', '#1F2937')}<br>${SWAPW07('Librairie du Change', 'Galerie Lambert', 2, '#fff', '#1F2937')}</p><p style="font-size:18px;margin-top:20px">Votre cotisation de ${SWAPW07('<span style="display:inline-block;min-width:66px">250</span>', '<span style="color:#DC2626;background:#FEF2F2">1250,5</span>', 2, '#fff', '#DC2626')} € est à régler avant le ${SWAPW07('15/01/2027', '<span style="color:#DC2626;background:#FEF2F2">2/15/2027</span>', 2, '#fff', '#DC2626')}.</p>${LINES(3)}` })}
<div class="a pop" style="--d:.4s;position:absolute;left:830px;top:660px;display:flex;align-items:center;gap:14px;padding:10px 20px;background:#fff;border-radius:12px;box-shadow:var(--sh);font-size:22px;font-weight:800">⏮ ◀ <span style="padding:2px 16px;border:2px solid #CBD5E1;border-radius:6px">${SWAPW07('1', '7', 2, '#fff', '#185ABD')}</span> ▶ ⏭</div>
${TIP('Montant et date <b>mal formatés</b> → commutateurs de champ (diapo suivante).', { s: 3, x: 70, y: 660, w: 700, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : <i>Aperçu des résultats</i> (Alt+Maj+K) remplace les chevrons par les données réelles du destinataire n° 1.</p>
  <p><b>Étape 2</b> : on fait défiler avec les flèches (ou <i>Rechercher un destinataire</i>). Arrivé à Sarah Lambert (n° 7), deux problèmes : le montant s'affiche « 1250,5 » au lieu de « 1 250,00 € » et la date est au format américain. Word récupère la valeur brute stockée par Excel, pas son format d'affichage.</p>
  <p><b>Étape 3</b> : la solution : les commutateurs de champ. Autre bouton utile : <i>Rechercher les erreurs</i> simule la fusion et signale les champs manquants.</p>
  <p>Conseil : faites toujours défiler au moins le premier, le dernier et un enregistrement « à risque » (montant élevé, adresse longue, champ vide).</p>` },

/* 12 — COMMUTATEURS DE CHAMP */
{ title: 'Formater nombres et dates', html: `${H('Formater nombres et dates', 'Commutateurs de champ')}
<div class="row a pop" style="--d:.2s;position:absolute;left:70px;top:190px;gap:16px;align-items:center">${KEYS('Alt+F9')}<span style="font-size:22px;font-weight:700;color:#33445E">affiche les codes de champ</span></div>
<div class="term f right" data-s="1" style="position:absolute;left:70px;top:280px;width:900px;font-size:23px;line-height:1.9">
 <div>{ MERGEFIELD Montant <span class="g f" data-s="2">\\# "# ##0,00 €"</span> }</div>
 <div>{ MERGEFIELD Echeance <span class="g f" data-s="3">\\@ "dd/MM/yyyy"</span> }</div></div>
<div style="position:absolute;left:1010px;top:280px;width:520px;display:flex;flex-direction:column;gap:20px">
 <div class="card f zoom" data-s="2" style="display:flex;align-items:center;gap:16px;padding:18px 22px;font-size:26px"><span style="color:#DC2626;text-decoration:line-through">1250,5</span><span style="color:#FA582D">➜</span><b style="color:#16A34A">1 250,00 €</b></div>
 <div class="card f zoom" data-s="3" style="display:flex;align-items:center;gap:16px;padding:18px 22px;font-size:26px"><span style="color:#DC2626;text-decoration:line-through">2/15/2027</span><span style="color:#FA582D">➜</span><b style="color:#16A34A">15/02/2027</b></div>
</div>
<div class="row f" data-s="4" style="position:absolute;left:70px;top:520px;gap:18px;align-items:center">${KEYS('Alt+F9')}<span style="font-size:20px;color:#33445E">pour revenir</span>${KEYS('F9')}<span style="font-size:20px;color:#33445E">pour mettre à jour le champ</span></div>
${TIP('<b>\\#</b> = format numérique · <b>\\@</b> = format de date · ex. <b>\\@ "d MMMM yyyy"</b> → 15 février 2027', { s: 5, x: 70, y: 620, w: 1460, kind: 'key' })}`,
  n: `<p>Un <b>commutateur</b> est une option ajoutée dans le code du champ.</p>
  <p><b>Étape 1</b> : <b>Alt+F9</b> affiche les codes : «Montant» devient <code>{ MERGEFIELD Montant }</code>.</p>
  <p><b>Étape 2</b> : on clique juste avant l'accolade fermante et on tape <code>\\# "# ##0,00 €"</code>. Le # affiche un chiffre s'il existe, le 0 force un chiffre, l'espace sépare les milliers, la virgule les décimales.</p>
  <p><b>Étape 3</b> : pour une date : <code>\\@ "dd/MM/yyyy"</code>. Attention à la casse : <b>MM</b> = mois, <b>mm</b> = minutes. « d MMMM yyyy » donne « 15 février 2027 ».</p>
  <p><b>Étape 4</b> : Alt+F9 à nouveau pour revenir à l'affichage normal, puis F9 sur le champ (ou réactiver l'aperçu) pour voir le résultat.</p>
  <p><b>Étape 5</b> : récapitulatif des deux commutateurs les plus utiles. Bon à savoir : on ne tape jamais les accolades au clavier — Ctrl+F9 insère des accolades de champ vides.</p>` },

/* 13 — RÈGLE SI ALORS SINON */
{ title: 'Règle Si…Alors…Sinon', html: `${H('Cher ou Chère ? La règle Si…Alors…Sinon', 'Règles', PATH('Publipostage > Règles > Si…Alors…Sinon…'))}
${DLGW07({ x: 70, y: 180, w: 760, t: 'Insérer un champ Word : IF', html: `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;font-size:16px;color:#33445E"><span>Nom du champ :</span><span>Comparaison :</span><span>Comparer à :</span>
  <span style="padding:6px 10px;border:1.5px solid #FA582D;border-radius:6px;font-weight:700;color:#1B2A41">Civilite ▾</span><span style="padding:6px 10px;border:1.5px solid #CBD5E1;border-radius:6px;font-weight:700;color:#1B2A41">Égal à ▾</span><span style="padding:6px 10px;border:1.5px solid #FA582D;border-radius:6px;font-weight:700;color:#1B2A41">Mme</span></div>
  <div class="f" data-s="1">${FLDW07('Insérer ce texte :', 'Chère', { lw: 250, hot: 1 })}</div><div class="f" data-s="1">${FLDW07('Sinon insérer ce texte :', 'Cher', { lw: 250, hot: 1 })}</div>
  <div style="text-align:right">${BTNW07('OK', 1)} ${BTNW07('Annuler')}</div>` })}
<div class="term f right" data-s="2" style="position:absolute;left:70px;top:520px;width:760px;font-size:19px">{ IF { MERGEFIELD Civilite } = "Mme" "Chère" "Cher" } «Civilite» «Nom»,</div>
<div style="position:absolute;left:880px;top:190px;width:650px;display:flex;flex-direction:column;gap:20px">
 ${[['Mme', 'Roux', 'Chère'], ['M.', 'Benali', 'Cher'], ['Mme', 'Lambert', 'Chère']].map(([c, n, s], i) => `<div class="card f right" data-s="3" style="display:flex;align-items:center;gap:18px;padding:18px 24px;transition-delay:${i * .12}s"><span class="chip ${c === 'Mme' ? 'blu' : 'ok'}" style="font-size:18px">Civilite = ${c}</span><span style="font-size:26px;font-family:Calibri,'Segoe UI',sans-serif"><b style="color:#FA582D">${s}</b> ${c} ${n},</span></div>`).join('')}
</div>
${TIP('Les espaces et le reste de la formule se tapent <b>après</b> le champ IF.', { s: 4, x: 880, y: 560, w: 650, kind: 'tip' })}`,
  n: `<p>Les <b>règles</b> ajoutent de la logique au document principal.</p>
  <p><b>Étape 0</b> : <i>Règles › Si…Alors…Sinon…</i> ; on compare un champ (Civilite) à une valeur (Mme) — opérateurs : Égal à, Différent de, Inférieur à, Supérieur à, Est vide, N'est pas vide.</p>
  <p><b>Étape 1</b> : le texte à insérer si la condition est vraie (« Chère »), sinon (« Cher »).</p>
  <p><b>Étape 2</b> : Alt+F9 montre le champ généré : un IF qui contient un MERGEFIELD. On peut le modifier directement dans le code, par exemple pour tester une autre colonne.</p>
  <p><b>Étape 3</b> : résultat à l'aperçu : chaque lettre s'adapte. Attention à la casse et aux espaces dans la source : « Mme » ≠ « mme » ≠ « Mme ».</p>
  <p><b>Étape 4</b> : on termine la ligne après le champ : espace, «Civilite», espace, «Nom», virgule.</p>
  <p>Autres usages : « votre cotisation est en retard » seulement si Echeance est dépassée, un paragraphe spécial pour les membres du bureau…</p>` },

/* 14 — AUTRES RÈGLES */
{ title: 'Les autres règles', html: `${H('Les autres règles utiles', 'Règles')}
<div style="position:absolute;left:70px;top:185px;width:1460px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 ${[['🚫', 'Ignorer l\'enregistrement si…', 'Exclure à la fusion, ex. Montant = 0', 'SKIPIF'], ['❔', 'Demander', 'Saisie au moment de la fusion, ex. date de l\'AG', 'ASK / FILLIN'], ['#️⃣', 'Numéro d\'enregistrement', 'N° de ligne dans la fusion : « Courrier n° 7 »', 'MERGEREC'], ['⏭️', 'Enregistrement suivant', 'Passer au destinataire suivant sur la même page (étiquettes)', 'NEXT']].map(([i, t, d, c], j) => `
 <div class="card f zoom" data-s="${j + 1}" style="display:flex;gap:20px;align-items:center;padding:22px 26px"><span style="font-size:52px">${i}</span><div style="flex:1"><div style="font-size:24px;font-weight:800">${t}</div><div style="font-size:19px;color:#33445E;margin-top:4px">${d}</div></div><span class="chip dark mono" style="font-size:16px">${c}</span></div>`).join('')}
</div>
${TIP('Préférez <b>filtrer la liste</b> (section 3) à « Ignorer l\'enregistrement » : c\'est plus lisible et réversible.', { s: 5, x: 70, y: 560, w: 1460, kind: 'tip' })}`,
  n: `<p>Le menu Règles propose d'autres champs Word, à connaître sans les sur-utiliser :</p>
  <p><b>Étape 1</b> : <b>Ignorer l'enregistrement si…</b> (SKIPIF) : la lettre n'est pas produite si la condition est vraie.</p>
  <p><b>Étape 2</b> : <b>Demander</b> (ASK) et <b>Remplir</b> (FILLIN) : Word pose une question à la fusion (« Date de l'assemblée générale ? ») et insère la réponse dans toutes les lettres.</p>
  <p><b>Étape 3</b> : <b>Numéro d'enregistrement</b> : utile pour numéroter des courriers recommandés, des attestations.</p>
  <p><b>Étape 4</b> : <b>Enregistrement suivant</b> (NEXT) : c'est ce que Word place automatiquement dans les étiquettes pour passer d'un destinataire à l'autre sur une même planche.</p>
  <p><b>Étape 5</b> : pour exclure des destinataires, le filtre de la liste est plus simple à relire et à modifier qu'un champ caché.</p>` },

/* 15 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW07, 2),
  n: `<p>Troisième partie : choisir les destinataires, terminer la fusion (documents, imprimante, e-mails) et produire les étiquettes.</p>` },

/* 16 — FILTRER LA LISTE */
{ title: 'Filtrer les destinataires', html: `${H('Filtrer et trier les destinataires', 'Liste de destinataires', PATH('Publipostage > Modifier la liste de destinataires'))}
${DLGW07({ x: 70, y: 175, w: 900, t: 'Destinataires de la fusion et du publipostage', html: `<div style="border:1.5px solid #CBD5E1;border-radius:6px;overflow:hidden;font-size:16px">
  <div style="display:grid;grid-template-columns:40px 1fr 1fr 120px 140px;background:#F3F4F6;font-weight:800;padding:6px 10px"><span>✓</span><span>Nom</span><span>Prenom</span><span>Montant</span><span>Echeance</span></div>
  ${ADHW07.map((r, i) => `<div class="${r[5] === '15/01/2027' ? '' : 'fo'}" ${r[5] === '15/01/2027' ? '' : 'data-off="2"'} style="display:grid;grid-template-columns:40px 1fr 1fr 120px 140px;padding:4px 10px;border-top:1px solid #EEF0F3;${r[5] === '15/01/2027' ? 'background:#FFF7F3;' : ''}"><span>☑</span><span>${r[2]}</span><span>${r[1]}</span><span>${r[4]}</span><span>${r[5]}</span></div>`).join('')}</div>
  <div style="display:flex;gap:18px;font-size:16px;color:#185ABD;font-weight:700;flex-wrap:wrap"><span>Trier…</span><span style="outline:2px solid #FA582D;outline-offset:3px;border-radius:3px">Filtrer…</span><span>Rechercher les doublons…</span><span>Rechercher un destinataire…</span></div>` })}
${DLGW07({ s: 1, x: 1010, y: 175, w: 520, t: 'Filtrer et trier', html: `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:15px;color:#33445E"><span>Champ</span><span>Comparaison</span><span>Comparer à</span><span style="padding:5px 8px;border:1.5px solid #FA582D;border-radius:6px;font-weight:700;color:#1B2A41">Echeance</span><span style="padding:5px 8px;border:1.5px solid #CBD5E1;border-radius:6px;font-weight:700;color:#1B2A41">Égal à</span><span style="padding:5px 8px;border:1.5px solid #FA582D;border-radius:6px;font-weight:700;color:#1B2A41">15/01/2027</span></div><div style="text-align:right">${BTNW07('OK', 1)}</div>` })}
${STAT({ v: '3', t: 'destinataires : Roux, Benali, Moreau', x: 1010, y: 410, w: 520, s: 2, c: '#FA582D' })}
${TIP('Filtre = comparaison de <b>texte</b> : « 900 » &gt; « 1000 » si la colonne n\'est pas numérique !', { s: 3, x: 1010, y: 590, w: 520, kind: 'warn' })}`,
  n: `<p><i>Modifier la liste de destinataires</i> ouvre la liste complète : on peut décocher des lignes à la main, ou mieux, utiliser <b>Affiner la liste</b>.</p>
  <p><b>Étape 1</b> : <b>Filtrer…</b> : champ Echeance, comparaison Égal à, valeur 15/01/2027. On peut combiner jusqu'à 6 conditions (Et / Ou) : Ville égal à Lyon ET Montant supérieur à 1000.</p>
  <p><b>Étape 2</b> : seules les 3 lignes correspondantes restent dans la fusion. L'aperçu et la fusion ne concernent plus qu'elles. Pour retirer le filtre : <i>Filtrer… › Effacer tout</i>.</p>
  <p><b>Étape 3</b> : piège — Word compare souvent les valeurs comme du texte. Pour un filtre sur des montants, vérifiez que la colonne source est bien numérique (sinon « 900 » est « supérieur » à « 1000 », comme dans un dictionnaire).</p>
  <p>Aussi : <b>Trier…</b> par code postal pour un affranchissement en nombre ; <b>Rechercher les doublons</b> pour ne pas envoyer deux fois la même lettre.</p>` },

/* 17 — TERMINER & FUSIONNER */
{ title: 'Terminer & fusionner', html: `${H('Terminer & fusionner', 'Terminer', PATH('Publipostage > Terminer & fusionner'))}
${MENUW07({ x: 70, y: 185, w: 620, items: [{ i: '📄', t: 'Modifier des documents individuels…', hot: 1 }, { i: '🖨️', t: 'Imprimer des documents…', hot: 3 }, { i: '📧', t: 'Envoyer des messages électroniques…', hot: 4 }] })}
${DLGW07({ s: 2, x: 70, y: 400, w: 620, t: 'Fusionner avec un nouveau document', html: `<div style="line-height:2">◉ <b>Tous</b><br>○ Enregistrement en cours<br>○ De : <span style="padding:2px 18px;border:1.5px solid #CBD5E1;border-radius:4px">1</span> À : <span style="padding:2px 18px;border:1.5px solid #CBD5E1;border-radius:4px">3</span></div><div style="text-align:right">${BTNW07('OK', 1)}</div>` })}
<div class="f zoom" data-s="2" style="position:absolute;left:740px;top:185px;width:790px;height:380px">
 ${[0, 1, 2].map(i => `<div class="pg" style="left:${i * 50}px;top:${i * 40}px;width:520px;height:300px;padding:30px 40px;z-index:${3 - i};${i ? 'opacity:.9' : ''}"><div class="pg-in"><p style="font-size:15px"><b>${['Camille Roux', 'Karim Benali', 'Inès Moreau'][i]}</b><br>${['Librairie du Change', 'Épices & Co', 'Atelier Soie'][i]}</p><p style="font-size:16px">${['Chère Mme Roux,', 'Cher M. Benali,', 'Chère Mme Moreau,'][i]}</p>${LINES(3)}</div></div>`).join('')}
 <span class="chip dark" style="position:absolute;left:620px;top:20px;font-size:18px">Lettres1.docx</span>
 <span class="chip" style="position:absolute;left:620px;top:70px;font-size:16px">1 lettre = 1 section</span>
</div>
${TIP('<b>Modifier des documents individuels</b> : relisez avant d\'imprimer !', { s: 2, x: 740, y: 600, w: 790, kind: 'ok' })}`,
  n: `<p>Trois sorties possibles depuis <i>Terminer &amp; fusionner</i> :</p>
  <p><b>Étape 1</b> : <b>Modifier des documents individuels…</b> (Alt+Maj+N) : la sortie recommandée.</p>
  <p><b>Étape 2</b> : on choisit Tous / Enregistrement en cours / une plage. Word crée un nouveau document « Lettres1 » qui contient toutes les lettres, séparées par des <b>sauts de section</b> (page suivante). On peut relire, corriger une lettre particulière, enregistrer en PDF, imprimer. Ce document n'est plus lié à la source : c'est du texte figé.</p>
  <p><b>Étape 3</b> : <b>Imprimer des documents…</b> envoie directement à l'imprimante : rapide, mais sans relecture possible.</p>
  <p><b>Étape 4</b> : <b>Envoyer des messages électroniques…</b> : diapo suivante.</p>
  <p>Ne pas enregistrer « Lettres1 » à la place du document principal : on garde les deux (le principal pour les prochaines campagnes).</p>` },

/* 18 — FUSION VERS E-MAILS */
{ title: 'Fusionner vers des e-mails', html: `${H('Un e-mail personnalisé par destinataire', 'Messages électroniques')}
${DLGW07({ x: 70, y: 180, w: 640, t: 'Fusionner avec un message électronique', html: `<div style="font-weight:800;color:#185ABD">Options du message</div>${FLDW07('À :', 'Email ▾', { lw: 140, hot: 1 })}${FLDW07('Ligne Objet :', 'Relance cotisation 2027', { lw: 140, hot: 1 })}${FLDW07('Format :', 'HTML ▾', { lw: 140 })}<div style="font-weight:800;color:#185ABD">Envoyer les enregistrements</div><div>◉ Tous &nbsp; ○ Enregistrement en cours</div><div style="text-align:right">${BTNW07('OK', 1)} ${BTNW07('Annuler')}</div>` })}
${FLOW({ x: 760, y: 170, w: 770, h: 420,
  n: { w: { x: 90, y: 200, ic: 'word', l: 'Word', sub: 'document principal', s: 2 }, o: { x: 370, y: 200, ic: 'outlook', l: 'Outlook', sub: 'boîte d\'envoi', s: 2 }, m1: { x: 670, y: 60, ic: 'mail', sz: 64, l: 'C. Roux', s: 3 }, m2: { x: 670, y: 200, ic: 'mail', sz: 64, l: 'K. Benali', s: 3 }, m3: { x: 670, y: 340, ic: 'mail', sz: 64, l: '…', s: 3 } },
  l: [{ a: 'w', b: 'o', s: 2 }, { a: 'o', b: 'm1', r: 'hvh', s: 3 }, { a: 'o', b: 'm2', s: 3 }, { a: 'o', b: 'm3', r: 'hvh', s: 3 }],
  p: [{ s: 3, seg: [{ via: ['w', 'o'], t: 1 }, { via: ['o', 'm1'], t: 1.2 }] }, { s: 3, begin: .8, c: '#7C3AED', seg: [{ via: ['w', 'o'], t: 1 }, { via: ['o', 'm3'], t: 1.2 }] }] })}
${TIP('Nécessite <b>Outlook classique</b> (pour bureau) comme messagerie par défaut. <b>Pas</b> de pièce jointe différente par destinataire.', { s: 4, x: 70, y: 640, w: 1460, kind: 'warn' })}`,
  n: `<p>Pour un e-mail, démarrez la fusion en <b>Messages électroniques</b> (le document s'affiche en mode Web), ou partez de lettres déjà prêtes.</p>
  <p><b>Étape 1</b> : <i>Terminer &amp; fusionner › Envoyer des messages électroniques…</i> : le champ <b>À</b> est la colonne Email de la source ; on tape la <b>ligne Objet</b> (identique pour tous) ; format HTML pour conserver la mise en forme.</p>
  <p><b>Étape 2</b> : Word confie les messages à Outlook, un par destinataire. Ils partent de votre boîte d'envoi, apparaissent dans les Éléments envoyés : chaque destinataire ne voit que son adresse (pas de liste en copie).</p>
  <p><b>Étape 3</b> : faites un test : filtrez sur votre propre adresse avant d'envoyer 500 messages !</p>
  <p><b>Étape 4</b> : limites. Il faut l'<b>Outlook classique</b> installé et configuré comme client par défaut (le « nouvel Outlook » ne prend pas en charge le publipostage Word à ce jour) ; impossible de joindre un fichier différent à chaque destinataire ; attention aux quotas d'envoi de votre messagerie.</p>` },

/* 19 — ÉTIQUETTES */
{ title: 'Étiquettes d\'adresse', html: `${H('Des étiquettes pour les enveloppes', 'Étiquettes', PATH('Publipostage > Démarrer la fusion > Étiquettes…'))}
${PROC([{ p: 'Démarrer la fusion > Étiquettes…', t: 'Avery A4/A5 · <b>L7160</b> (21 par planche)' }, { p: 'Sélection des destinataires', t: 'La <b>même</b> liste que les lettres' }, { p: 'Bloc d\'adresse', t: 'Dans la <b>1ʳᵉ</b> étiquette seulement' }, { p: 'Mettre à jour les étiquettes', t: 'Recopie sur <b>toute</b> la planche' }, { p: 'Terminer & fusionner', t: 'Modifier des documents individuels' }], { x: 70, y: 175, w: 720, gap: 12 })}
<div class="a pop" style="--d:.3s;position:absolute;left:840px;top:175px;width:690px;height:610px;background:#fff;border-radius:6px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.08);padding:16px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(7,1fr);gap:8px">
 ${Array.from({ length: 21 }, (_, i) => { const r = ADHW07[i]; return `<div style="position:relative;border:1.5px dashed #CBD5E1;border-radius:8px;padding:6px 8px;font-size:12px;line-height:1.3;color:#33445E;overflow:hidden">
  ${i === 0 ? `<span class="f" data-s="3">${FW07('AddressBlock')}</span>` : `<span class="f" data-s="2">${FW07('Next Record')}</span><br><span class="f" data-s="4">${FW07('AddressBlock')}</span>`}
  ${r ? `<div class="f" data-s="5" style="position:absolute;inset:0;background:#FFF7F3;padding:6px 10px;font-size:13px;line-height:1.35;color:#1B2A41;transition-delay:${i * .05}s"><b>${r[1]} ${r[2]}</b><br>${r[3]}<br>69005 Lyon</div>` : ''}</div>`; }).join('')}
</div>`,
  n: `<p>Les étiquettes sont un publipostage dont le document principal est une planche.</p>
  <p><b>Étape 1</b> : dans un <b>nouveau document</b>, <i>Démarrer la fusion › Étiquettes…</i> : fournisseur (Avery A4/A5) et référence (L7160 : 3 colonnes × 7 lignes). Word dessine un tableau aux dimensions exactes — affichez le quadrillage (Disposition › Afficher le quadrillage).</p>
  <p><b>Étape 2</b> : on sélectionne la même liste. Word place automatiquement le champ <b>«Enregistrement suivant»</b> (Next Record) dans toutes les étiquettes sauf la première.</p>
  <p><b>Étape 3</b> : on compose l'adresse dans la <b>première</b> étiquette uniquement (Bloc d'adresse ou champs).</p>
  <p><b>Étape 4</b> : <b>Mettre à jour les étiquettes</b> recopie la première étiquette sur toute la planche. Oubli classique : sans ce bouton, seule la première étiquette de chaque planche est remplie !</p>
  <p><b>Étape 5</b> : aperçu puis Terminer &amp; fusionner. Faites un test d'impression sur papier ordinaire superposé à une planche avant d'imprimer sur les vraies étiquettes.</p>` },

/* 20 — RÉUTILISER */
{ title: 'Réutiliser le document principal', html: `${H('La prochaine campagne en 2 minutes', 'Réutiliser')}
${DLGW07({ x: 70, y: 180, w: 760, t: 'Microsoft Word', html: `<div style="display:flex;gap:16px"><span style="font-size:40px">⚠️</span><div style="font-size:18px;line-height:1.5">L'ouverture de ce document entraîne l'exécution de la commande SQL suivante :<div style="font:600 16px var(--mono);background:#F1F5F9;padding:8px 12px;border-radius:6px;margin:8px 0">SELECT * FROM \`Feuil1$\`</div>Les données de votre base de données vont être placées dans le document. Voulez-vous continuer ?</div></div><div style="text-align:right">${BTNW07('Oui', 1)} ${BTNW07('Non')}</div>` })}
${CHAINW07([{ i: '📂', t: 'Ouvrir', d: 'le document principal' }, { i: '✅', t: 'Oui', d: 'se reconnecter à la source' }, { i: '🔄', t: 'Données à jour', d: 'la liste du jour' }, { i: '📨', t: 'Fusionner', d: 'nouvelle campagne' }], { x: 880, y: 190, w: 650, r: 46 })}
${TIP('<b>Non</b> = le document perd sa source : il faudra la reconnecter (Sélection des destinataires).', { s: 5, x: 70, y: 560, w: 760, kind: 'warn' })}
${TIP('Gardez source et document principal dans le <b>même dossier</b> et ne les renommez plus.', { s: 6, x: 880, y: 560, w: 650, kind: 'key' })}`,
  n: `<p>Le document principal est réutilisable : c'est le vrai gain de temps sur la durée.</p>
  <p><b>Étapes 1-2</b> : à l'ouverture, Word affiche ce message (commande SQL) : c'est normal, il demande la permission de relire la source. Répondez <b>Oui</b>.</p>
  <p><b>Étape 3</b> : la source a été mise à jour dans Excel (nouveaux retardataires) : le publipostage utilise la liste du jour.</p>
  <p><b>Étape 4</b> : on vérifie les filtres (ils sont conservés !), l'aperçu, et on fusionne.</p>
  <p><b>Étape 5</b> : répondre Non ouvre le document sans données : il faudra refaire <i>Sélection des destinataires</i>.</p>
  <p><b>Étape 6</b> : si le classeur a été déplacé ou renommé, Word le signale et propose de le rechercher. Pour arrêter définitivement le lien : <i>Démarrer la fusion › Document Word normal</i>.</p>` },

/* 21 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Publipostage : l\'essentiel', k: 'Récap animé', hub: '1 → 500', hfs: 54, hsub: 'une lettre, 500 envois', hk: 'FUSION',
  items: [{ ic: '📗', t: 'Source propre', d: 'En-têtes en ligne 1 · 1 ligne = 1 destinataire · CP en texte' }, { ic: '«»', t: 'Champs de fusion', d: 'Bloc d\'adresse · salutation · Insérer un champ · Aperçu' },
    { ic: '⚙️', t: 'Formats et règles', d: 'Alt+F9 · \\# "# ##0,00 €" · \\@ "dd/MM/yyyy" · Si…Alors…Sinon' }, { ic: '🔎', t: 'Filtrer', d: 'Modifier la liste › Filtrer… · Trier · doublons' }, { ic: '📨', t: 'Terminer', d: 'Documents individuels · e-mails (Outlook) · étiquettes à jour' }] }),
  n: `<p>Récap en cinq cartes. Demandez au groupe : quel est le piège n° 1 ? (la source mal préparée) — et l'oubli n° 1 des étiquettes ? (Mettre à jour les étiquettes).</p>` },

/* 22 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Alt+F9', d: 'Afficher / masquer les codes de champ' }, { k: 'F9', d: 'Mettre à jour le champ sélectionné' }, { k: 'Ctrl+F9', d: 'Insérer des accolades de champ vides' }, { k: 'Alt+Maj+N', d: 'Fusionner vers un nouveau document' }, { k: 'Alt+Maj+K', d: 'Aperçu de la fusion' }, { k: 'Alt+Maj+E', d: 'Modifier la source de données' }], { cols: 3, y: 190 })}
${TIP('Ne tapez <b>jamais</b> les chevrons « » ni les accolades { } au clavier : ce sont des champs.', { s: 7, kind: 'warn', x: 70, y: 560, w: 1000 })}`,
  n: `<p>Six raccourcis : les trois premiers concernent tous les champs Word (vus aussi au module 05), les trois suivants sont propres au publipostage.</p>` },

/* 23 — LAB */
{ title: 'Lab', html: LAB({ app: 'word', mod: 'w07', lab: 0, title: 'Lab — Relance des cotisations', tasks: ['Lettres › <b>Utiliser une liste existante</b> : adherents-relance.csv', 'Adresse + règle <b>Si…Alors…Sinon</b> : Chère / Cher «Civilite» «Nom»,', '«Montant» avec <b>\\# "# ##0,00 €"</b> · aperçu : 1 250,00 €', '<b>Filtrer</b> l\'échéance 15/01/2027 → 3 lettres', '<b>Étiquettes</b> L7160 · Mettre à jour les étiquettes'] }),
  n: `<p>Lab dans le <b>vrai Word</b> avec le fichier <code>adherents-relance.csv</code> (8 adhérents, séparateur « ; »).</p>
  <p>Points de contrôle : 8 lignes et 10 colonnes reconnues ; « Chère Mme Roux, » / « Cher M. Benali, » ; Sarah Lambert affiche « 1 250,00 € » ; 3 lettres pour l'échéance du 15/01/2027 (Roux, Benali, Moreau) ; toutes les étiquettes remplies.</p>
  <p>Si le CSV arrive en une seule colonne : l'ouvrir dans Excel et l'enregistrer en .xlsx.</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quels sont les deux éléments d\'un publipostage ?', o: ['Un modèle .dotx et une macro', 'Un document principal et une source de données', 'Un PDF et un fichier Excel', 'Une table des matières et un index'], a: [1], e: 'Le document principal contient le texte commun et les champs ; la source de données fournit une ligne par destinataire.' },
  { q: 'Le montant fusionné s\'affiche « 1250,5 ». Comment obtenir « 1 250,50 € » ?', o: ['Le modifier à la main dans chaque lettre', 'Ajouter le commutateur \\# "# ##0,00 €" au champ MERGEFIELD', 'Mettre le champ en gras', 'Changer la police'], a: [1], e: 'Le commutateur numérique \\# formate la valeur fusionnée ; on l\'ajoute après Alt+F9.' },
  { q: 'Vous voulez « Chère Madame » ou « Cher Monsieur » selon le destinataire. Quel outil ?', o: ['Règles › Si…Alors…Sinon…', 'Rechercher/Remplacer après fusion', 'Deux documents principaux', 'Ligne de salutation uniquement'], a: [0], e: 'La règle Si…Alors…Sinon insère un texte différent selon la valeur d\'un champ (ex. Civilite).' },
  { q: 'Pour les étiquettes, seule la première étiquette de chaque planche est remplie. Qu\'avez-vous oublié ?', o: ['Aperçu des résultats', 'Mettre à jour les étiquettes', 'Rechercher les erreurs', 'Le bloc d\'adresse'], a: [1], e: '« Mettre à jour les étiquettes » recopie la mise en page et le champ «Enregistrement suivant» dans toutes les étiquettes.' },
  { q: 'Quelle option permet de relire toutes les lettres avant de les imprimer ?', o: ['Imprimer des documents', 'Envoyer des messages électroniques', 'Modifier des documents individuels', 'Aperçu avant impression'], a: [2], e: '« Modifier des documents individuels » crée un nouveau document contenant toutes les lettres, modifiables et vérifiables.' },
  { q: 'Quelles règles rendent une source de données « propre » ? (2 réponses)', o: ['Un titre fusionné au-dessus du tableau', 'Une seule ligne d\'en-têtes, en ligne 1', 'Prénom et Nom dans des colonnes séparées', 'Une ligne de total en bas'], a: [1, 2], e: 'En-têtes en ligne 1, une colonne par information, pas de titre, de cellules fusionnées ni de totaux.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) a · 4) b · 5) c · 6) b et c.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W07', html: END(),
  n: `<p>Fin du module 07. Prochain et dernier module Word : <b>modèles, champs, contrôles de contenu, macros VBA et accessibilité</b> — industrialiser ses documents.</p>` },
] };
