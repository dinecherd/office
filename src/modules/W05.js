/* ===================== MODULE W05 — Documents longs : sections, notes, légendes, renvois et index ===================== */
const SECSW05 = ['Structurer : sections et numérotation', 'Notes, légendes et renvois', 'Index, signets et liens'];

/* --- helpers locaux W05 --- */
/* boîte de dialogue Word (maquette) */
const DLGW05 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .3}s;`}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:0;overflow:hidden;border-radius:12px;font-family:'Segoe UI',var(--font)">
  <div style="display:flex;align-items:center;height:44px;padding:0 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#94A3B8;font-weight:400">✕</span></div>
  <div style="padding:18px 22px;font-size:18px;color:#1B2A41;display:flex;flex-direction:column;gap:12px">${o.html}</div></div>`;
/* champ de formulaire de boîte de dialogue */
const FLDW05 = (l, v, o = {}) => `<div style="display:flex;align-items:center;gap:12px;position:relative" ${o.s ? `class="f" data-s="${o.s}"` : ''}><span style="min-width:${o.lw ?? 170}px;color:#33445E">${l}</span><span style="flex:1;padding:6px 12px;border:1.5px solid ${o.hot ? '#FA582D' : '#CBD5E1'};border-radius:6px;background:#fff;font-weight:600;${o.hot ? 'box-shadow:0 0 0 4px rgba(250,88,45,.15);' : ''}">${v}</span></div>`;
/* bouton de boîte de dialogue */
const BTNW05 = (t, p) => `<span style="display:inline-block;padding:6px 18px;border-radius:6px;font-size:16px;font-weight:700;${p ? 'background:#185ABD;color:#fff' : 'background:#fff;border:1.5px solid #CBD5E1;color:#1B2A41'}">${t}</span>`;
/* champ Word (fond grisé) */
const FCW05 = t => `<span style="background:#E5E7EB;border-radius:3px;padding:0 4px">${t}</span>`;
/* texte remplacé à l'étape s (superposé) */
const SWAPW05 = (old, nw, s, bg = '#fff', c = '#16A34A') => `<span style="position:relative;display:inline-block">${old}<span class="f" data-s="${s}" style="position:absolute;left:0;top:0;bottom:0;min-width:100%;white-space:nowrap;background:${bg};color:${c};font-weight:700">${nw}</span></span>`;
/* vignette de page pour l'architecture */
const THW05 = o => `<div class="f zoom" data-s="${o.s}" style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px">
  <div style="height:38px;border-radius:12px 12px 0 0;background:${o.c};color:#fff;font:800 17px var(--font);display:flex;align-items:center;justify-content:center;letter-spacing:.08em">${o.sec}</div>
  <div class="card" style="padding:22px 26px;height:${o.h}px;border-radius:0 0 12px 12px;position:relative;overflow:hidden">${o.html}<div style="position:absolute;left:0;right:0;bottom:12px;text-align:center;font:800 22px var(--mono);color:${o.c}">${o.num}</div></div>
  <div style="margin-top:12px;text-align:center;font-size:22px;font-weight:800;color:#1B2A41">${o.lab}</div><div style="text-align:center;font-size:18px;color:#6B7A90">${o.sub}</div></div>`;
/* menu déroulant */
const MENUW05 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:8px 0;border-radius:10px;font-family:'Segoe UI',var(--font)">
  ${o.items.map(it => it.h ? `<div style="padding:8px 18px;font-size:15px;font-weight:800;letter-spacing:.06em;color:#6B7A90;text-transform:uppercase;background:#F6F7F9">${it.h}</div>`
    : `<div ${it.hot ? `class="f" data-s="${it.hot}"` : ''} style="display:flex;gap:14px;align-items:center;padding:9px 18px;${it.hot ? 'background:#FFF1EC;box-shadow:inset 4px 0 0 #FA582D;' : ''}"><span style="font-size:24px;width:32px;text-align:center">${it.i || '▭'}</span><div><div style="font-size:19px;font-weight:700;color:#1B2A41">${it.t}</div>${it.d ? `<div style="font-size:15px;color:#6B7A90">${it.d}</div>` : ''}</div></div>`).join('')}</div>`;

window.MODULE = { code: 'W05', title: 'Documents longs : sections, notes, légendes, renvois et index', short: 'Documents longs', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Documents longs', html: TITLE({ mod: 'WORD · MODULE 05 · AVANCÉ', title: 'Maîtriser les <span class="grad">documents longs</span>', sub: '« Rapports, mémoires, manuels : 100 pages fiables, navigables et faciles à maintenir »', agenda: SECSW05, art: APPART('word') }),
  n: `<p>Bienvenue dans le module 05, premier module du niveau <b>Avancé</b>. Public visé : personnes qui rédigent des rapports, mémoires, manuels, appels d'offres, procédures qualité… bref, des documents de plusieurs dizaines de pages.</p>
  <p>Prérequis : les <b>styles</b> et la <b>table des matières</b> (module 03-04). Sans styles de titre, rien de ce module ne fonctionne correctement : vérifiez-le en début de séance.</p>
  <p>Trois parties : structurer le document en sections, ajouter notes / légendes / renvois, puis index, signets et liens. Durée indicative : 70 minutes, dont deux labs.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Découper un document en <b>sections</b> avec numérotation et en-têtes indépendants', 'Insérer <b>notes de bas de page</b> et <b>notes de fin</b>', 'Légender figures et tableaux, y faire référence par des <b>renvois</b> dynamiques', 'Générer une <b>table des illustrations</b> et un <b>index</b>', 'Insérer <b>liens hypertextes</b> et <b>signets</b>']),
  n: `<p>Cinq objectifs, tous construits sur la même idée : <b>ne jamais rien numéroter à la main</b>. Pages, notes, figures, renvois, index : Word calcule tout grâce à des <b>champs</b>.</p>
  <p>Question au groupe : « Qui a déjà dû renuméroter toutes les figures d'un rapport parce qu'on en a ajouté une au début ? » — c'est exactement ce que ce module supprime.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW05, 0),
  n: `<p>Première partie : l'architecture d'un document long. On découpe en <b>sections</b> pour pouvoir changer la numérotation, l'orientation ou les en-têtes d'une partie à l'autre.</p>` },

/* 4 — ARCHITECTURE */
{ title: 'Architecture d\'un document long', html: `${H('Un document long = plusieurs sections', 'Architecture', PATH('Mise en page > Sauts de page > Page suivante'))}
${THW05({ s: 1, x: 70, y: 180, w: 290, h: 330, c: '#64748B', sec: 'SECTION 1', num: '—', lab: 'Page de garde', sub: 'Première page différente',
  html: `<div style="height:18px;width:60%;margin:30px auto 18px;border-radius:5px;background:#185ABD"></div><div style="height:10px;width:80%;margin:0 auto 10px;border-radius:5px;background:#CBD5E1"></div><div style="width:70px;height:70px;border-radius:50%;margin:40px auto 0;background:linear-gradient(135deg,#41A5EE,#185ABD)"></div>` })}
${THW05({ s: 2, x: 400, y: 180, w: 290, h: 330, c: '#7C3AED', sec: 'SECTION 2', num: 'i · ii', lab: 'Sommaire', sub: 'Chiffres romains',
  html: `<div style="font:800 18px var(--font);color:#7C3AED;margin-bottom:12px">Sommaire</div><div class="pg-toc" style="font-size:13px"><div>1. Contexte<span>1</span></div><div>2. Analyse<span>5</span></div><div>3. Plan d'action<span>9</span></div><div>Annexes<span>A-1</span></div></div>` })}
${THW05({ s: 3, x: 730, y: 180, w: 290, h: 330, c: '#185ABD', sec: 'SECTION 3', num: '1 · 2 · 3…', lab: 'Corps du document', sub: 'Chiffres arabes à partir de 1',
  html: `<div style="height:16px;width:65%;border-radius:5px;background:#185ABD;margin-bottom:14px"></div>${LINES(4)}<div style="height:12px;width:45%;border-radius:5px;background:#2F5496;margin:6px 0 14px"></div>${LINES(3)}` })}
${THW05({ s: 4, x: 1060, y: 290, w: 470, h: 220, c: '#16A34A', sec: 'SECTION 4 · PAYSAGE', num: 'A-1 · A-2', lab: 'Annexes', sub: 'Orientation paysage, numéros A-1…',
  html: `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">${Array.from({ length: 15 }, (_, i) => `<i style="height:22px;border-radius:3px;background:${i < 5 ? '#16A34A' : '#E2E8F0'}"></i>`).join('')}</div>` })}
${TIP('<b>3 sauts de section</b> = 4 sections, chacune avec ses marges, son orientation, ses en-têtes et sa numérotation.', { s: 5, x: 70, y: 690, w: 1460 })}
`,
  n: `<p>Le document type se découpe en <b>quatre sections</b> :</p>
  <p><b>Étape 1</b> : la page de garde (<i>Insertion › Pages › Page de garde</i>) — pas de numéro affiché. On coche <i>Première page différente</i> dans l'onglet En-tête et pied de page.</p>
  <p><b>Étape 2</b> : sommaire, remerciements, avant-propos — numérotés en chiffres romains (i, ii, iii).</p>
  <p><b>Étape 3</b> : le corps du document, numéroté en chiffres arabes <b>à partir de 1</b>.</p>
  <p><b>Étape 4</b> : les annexes, souvent en <b>paysage</b> (grands tableaux), numérotées A-1, A-2… L'orientation est une propriété de la section : c'est la seule façon d'avoir une page paysage au milieu de pages portrait.</p>
  <p><b>Étape 5</b> : tout repose sur les <b>sauts de section</b>. Démo : affichez les marques (¶) pour montrer les sauts « ::::Saut de section (page suivante):::: ».</p>` },

/* 5 — SAUTS DE SECTION (APPWIN + MENU) */
{ title: 'Insérer un saut de section', html: `${H('Saut de page ou saut de section ?', 'Mise en page', PATH('Mise en page > Sauts de page'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 860, h: 610, title: 'Mémoire RGPD.docx', tab: 'Mise en page',
  groups: [['Mise en page', ['📄 Marges', '🔄 Orientation', '📏 Taille', '📰 Colonnes', '📑 Sauts de page']], ['Paragraphe', ['Retrait ▾', 'Espacement ▾']], ['Organiser', ['Position', 'Aligner']]],
  hot: { 'tab:Mise en page': 1, '📑 Sauts de page': 1 },
  body: PAGE({ inwin: true, w: 620, html: `<h2 style="margin-top:0">Remerciements</h2>${LINES(3)}<div class="f" data-s="3" style="margin:14px 0;padding:4px 0;border-top:2px dotted #2563EB;border-bottom:2px dotted #2563EB;text-align:center;font:600 14px var(--mono);color:#2563EB">Saut de section (page suivante) ¶</div><h1>1. Contexte</h1>${LINES(3)}` }) })}
${MENUW05({ s: 2, x: 965, y: 175, w: 565, items: [{ h: 'Sauts de page' }, { i: '📄', t: 'Page', d: 'Nouvelle page, même section (Ctrl+Entrée)' }, { i: '▥', t: 'Colonne', d: 'Passe à la colonne suivante' }, { h: 'Sauts de section' }, { i: '⏭', t: 'Page suivante', d: 'Nouvelle section sur une nouvelle page', hot: 2 }, { i: '↧', t: 'Continu', d: 'Nouvelle section sur la même page' }, { i: '②', t: 'Page paire / Page impaire', d: 'Démarre sur la page paire / impaire suivante' }] })}
${TIP('Affichez les marques <b>¶</b> (Accueil › Paragraphe) pour voir et supprimer les sauts.', { s: 4, x: 965, y: 655, w: 565, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : onglet <b>Mise en page</b>, bouton <b>Sauts de page</b> (groupe Mise en page).</p>
  <p><b>Étape 2</b> : le menu a deux parties. En haut les <b>sauts de page</b> (on reste dans la même section), en bas les <b>sauts de section</b>. Pour un document long, on utilise presque toujours <b>Page suivante</b>. <i>Continu</i> sert à changer le nombre de colonnes au milieu d'une page ; <i>Page impaire</i> sert aux documents imprimés recto-verso où chaque chapitre commence à droite.</p>
  <p><b>Étape 3</b> : avec les marques affichées, le saut apparaît en pointillés. Pour le supprimer : sélectionnez-le et Suppr. <b>Attention</b> : la mise en page de la section (marges, orientation, en-têtes) est stockée dans le saut qui la <b>termine</b> ; supprimer un saut fait adopter à la section du dessus la mise en page de celle du dessous.</p>
  <p><b>Étape 4</b> : réflexe ¶. Piège classique : des dizaines de « Entrée » pour passer à la page suivante — tout bouge dès qu'on ajoute une ligne.</p>` },

/* 6 — LIER AU PRÉCÉDENT */
{ title: 'Numérotation par section', html: `${H('Rompre le lien, changer de numérotation', 'En-têtes et pieds de page')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:185px;width:700px">
 ${[['Section 2', 'ii', '#7C3AED', false], ['Section 3', '1', '#185ABD', true]].map(([s, n, c, k], i) => `
 <div style="position:relative;height:240px;margin-bottom:${i ? 0 : 40}px;background:#fff;border-radius:6px;box-shadow:0 20px 50px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.08)">
  <div style="position:absolute;left:50px;right:50px;top:30px">${LINES(4)}</div>
  <div style="position:absolute;left:0;right:0;bottom:62px;border-top:2px dashed #2563EB"></div>
  <span style="position:absolute;left:16px;bottom:34px;padding:2px 10px;background:#DBEAFE;color:#1D4ED8;font-size:15px;font-weight:700;border-radius:0 0 5px 5px">Pied de page -${s}-</span>
  ${k ? `<span class="fo" data-off="2" style="position:absolute;right:16px;bottom:34px;padding:2px 10px;background:#DBEAFE;color:#1D4ED8;font-size:15px;font-weight:700;border-radius:0 0 5px 5px">Identique au précédent</span>
  <span style="position:absolute;left:0;right:0;bottom:14px;text-align:center;font:800 26px var(--mono);color:${c}">${SWAPW05('<span style="color:#94A3B8">iii</span>', '&nbsp;1&nbsp;', 3, '#fff', c)}</span>`
  : `<span style="position:absolute;left:0;right:0;bottom:14px;text-align:center;font:800 26px var(--mono);color:${c}">${n}</span>`}
 </div>`).join('')}
 <div class="f zoom" data-s="2" style="position:absolute;right:-40px;top:238px;width:84px;height:84px;border-radius:50%;background:#FEF2F2;border:3px solid #DC2626;display:grid;place-items:center;font-size:38px;box-shadow:0 10px 30px -10px rgba(220,38,38,.5)">✂️</div>
</div>
${PROC([{ p: 'Double-clic dans le pied de page', t: 'de la <b>section 3</b> (corps du document)' }, { p: 'En-tête et pied de page > Lier au précédent', t: 'Désactiver : le lien avec la section 2 est rompu' }, { p: 'Numéro de page > Format des numéros de page', t: '<b>À partir de : 1</b> · format 1, 2, 3…' }, { p: 'Section 2 : même boîte', t: 'Format <b>i, ii, iii</b>' }], { x: 840, y: 185, w: 690 })}`,
  n: `<p>Chaque section a ses propres en-têtes et pieds de page, mais par défaut ils sont <b>liés à la section précédente</b> (étiquette « Identique au précédent »).</p>
  <p><b>Étape 1</b> : double-clic dans le pied de page de la section 3 : l'onglet contextuel <b>En-tête et pied de page</b> apparaît.</p>
  <p><b>Étape 2</b> : désactivez <b>Lier au précédent</b> (groupe Navigation). L'étiquette disparaît : modifier ce pied de page n'affecte plus la section 2. À faire <b>séparément</b> pour l'en-tête et pour le pied de page !</p>
  <p><b>Étape 3</b> : <i>Numéro de page › Format des numéros de page</i> › <b>À partir de : 1</b>. Le corps commence à 1 au lieu de continuer après le sommaire.</p>
  <p><b>Étape 4</b> : dans la section 2, même boîte, format i, ii, iii.</p>
  <p>Piège : on rompt le lien dans la section 3 mais on modifie ensuite la section 2… qui reste liée à la section 1 (page de garde). Toujours vérifier l'étiquette dans chaque section.</p>` },

/* 7 — STYLEREF */
{ title: 'Le titre du chapitre en en-tête', html: `${H('Le titre du chapitre en en-tête', 'Champ STYLEREF', PATH('Insertion > QuickPart > Champ'))}
${PAGE({ x: 70, y: 180, w: 680, h: 600, header: `<span style="display:flex;justify-content:space-between;font-size:15px"><span>Mémoire RGPD</span><span>${SWAPW05(`<span style="font-family:var(--mono);background:#E5E7EB;padding:0 6px;color:#1B2A41">{ STYLEREF "Titre 1" }</span>`, '&nbsp;2. Analyse des écarts', 2, '#fff', '#185ABD')}</span></span>`,
  html: `<h1 style="margin-top:8px">2. Analyse des écarts</h1>${LINES(4)}<h2>2.1 Durées de conservation</h2>${LINES(5)}<h2>2.2 Consentements</h2>${LINES(3)}` })}
<svg viewBox="0 0 200 200" class="f" data-s="2" style="position:absolute;left:600px;top:150px;width:200px;height:200px;overflow:visible"><path d="M40 160 C 90 150, 120 100, 110 40" fill="none" stroke="#FA582D" stroke-width="4" stroke-dasharray="8 8" class="draw" pathLength="1"/><path d="M98 52 l12 -14 l10 16" fill="none" stroke="#FA582D" stroke-width="4"/></svg>
${DLGW05({ s: 1, x: 830, y: 180, w: 700, t: 'Champ', html: `${FLDW05('Catégories :', 'Liens et références ▾', { lw: 200 })}${FLDW05('Nom de champ :', 'StyleRef', { lw: 200, hot: true })}${FLDW05('Nom du style :', 'Titre 1', { lw: 200, hot: true })}<div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('OK', 1)}${BTNW05('Annuler')}</div>` })}
${TIP('Comme dans un livre : chaque page affiche <b>automatiquement</b> le chapitre en cours.', { s: 3, x: 830, y: 520, w: 700, kind: 'ok' })}
${TIP('Les codes de champ se voient avec <b>Alt+F9</b>.', { s: 4, x: 830, y: 650, w: 700, kind: 'key' })}`,
  n: `<p>Un classique des manuels et des livres : l'en-tête rappelle le chapitre en cours.</p>
  <p><b>Étape 1</b> : dans l'en-tête, <i>Insertion › QuickPart › Champ…</i> (ou depuis l'onglet En-tête et pied de page › Insérer › QuickPart). Catégorie <i>Liens et références</i>, champ <b>StyleRef</b>, nom du style <b>Titre 1</b>.</p>
  <p><b>Étape 2</b> : le champ affiche le texte du dernier Titre 1 rencontré sur la page (ou avant). Sur chaque page, le résultat change tout seul.</p>
  <p><b>Étape 3</b> : à combiner avec les sections si la page de garde ne doit rien afficher.</p>
  <p><b>Étape 4</b> : Alt+F9 montre le code <code>{ STYLEREF "Titre 1" }</code>. On y reviendra en partie 2 : tout ce module repose sur des champs.</p>
  <p>Variante : l'option <i>Insérer le numéro de paragraphe</i> affiche « 2 » au lieu du texte.</p>` },

/* 8 — VS BONNES PRATIQUES */
{ title: 'Les réflexes du document long', html: `${H('Les réflexes du document long', 'À faire / à éviter')}
${VS({ y: 185, l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['Taper « Entrée » jusqu\'à la page suivante', 'Mettre les titres en gras « à la main »', 'Taper « Figure 3 » ou « page 12 » au clavier', 'Un fichier par chapitre, recollés à la fin'] },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['<b>Sauts de page / de section</b>', '<b>Styles</b> Titre 1, 2, 3 + <b>volet de navigation</b>', '<b>Légendes</b> et <b>renvois</b> (champs)', 'Un seul document structuré, mis à jour par <b>F9</b>'] }, mid: '➜' })}
${TIP('Activez le <b>volet de navigation</b> (Affichage › Volet de navigation) : c\'est la colonne vertébrale du document.', { s: 3, x: 70, y: 640, w: 1460, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : les mauvaises habitudes qui rendent un long document impossible à maintenir. Demandez au groupe lesquelles ils pratiquent… souvent toutes !</p>
  <p><b>Étape 2</b> : leurs remplaçants. Chaque ligne de droite correspond à un outil de ce module ou du module précédent.</p>
  <p><b>Étape 3</b> : le volet de navigation (<i>Affichage › Afficher › Volet de navigation</i>, ou Ctrl+F puis onglet Titres) affiche le plan ; on peut glisser-déposer un titre pour déplacer tout le chapitre avec son contenu. Démo en direct : déplacez un chapitre entier en 2 secondes.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW05, 1),
  n: `<p>Deuxième partie : les éléments numérotés automatiquement — notes, légendes — et les renvois qui pointent vers eux.</p>` },

/* 10 — NOTES DE BAS DE PAGE */
{ title: 'Notes de bas de page', html: `${H('Notes de bas de page et notes de fin', 'Références', PATH('Références > Notes de bas de page'))}
${PAGE({ x: 70, y: 175, w: 720, h: 610, html: `<h2 style="margin-top:0">Contexte</h2><p style="font-size:19px">La clinique traite chaque jour des données personnelles<sup class="f zoom" data-s="1" style="color:#FA582D;font-weight:800;font-size:15px;display:inline-block">1</sup> de propriétaires d'animaux. Le RGPD impose de tenir un registre des traitements<sup class="f zoom" data-s="3" style="color:#FA582D;font-weight:800;font-size:15px;display:inline-block">2</sup>.</p>${LINES(6)}
  <div class="f" data-s="2" style="position:absolute;left:64px;right:64px;bottom:40px"><div style="width:160px;border-top:1.5px solid #6B7A90;margin-bottom:8px"></div><div style="font-size:15px"><sup>1</sup> Article 4 du RGPD.</div><div class="f" data-s="3" style="font-size:15px"><sup>2</sup> Article 30 du RGPD.</div></div>` })}
<svg viewBox="0 0 720 610" class="f" data-s="4" style="position:absolute;left:70px;top:175px;width:720px;height:610px;overflow:visible"><path d="M78 525 C 330 520, 560 330, 538 122" fill="none" stroke="#FA582D" stroke-width="4" stroke-dasharray="8 8"/><path d="M526 140 l12 -20 l12 22" fill="none" stroke="#FA582D" stroke-width="4"/><rect x="380" y="380" width="150" height="40" rx="20" fill="#FA582D"/><text x="455" y="407" text-anchor="middle" font-size="19" font-weight="800" fill="#fff">double-clic</text></svg>
<div class="card kc f zoom" data-s="1" style="position:absolute;left:960px;top:190px;width:570px">${KEYS('Ctrl+Alt+F')}<span>Note de <b>bas de page</b> — en bas de la page concernée</span></div>
<div class="card kc f zoom" data-s="5" style="position:absolute;left:960px;top:360px;width:570px">${KEYS('Ctrl+Alt+D')}<span>Note de <b>fin</b> — regroupées en fin de document ou de section</span></div>
${TIP('Les numéros se <b>recalculent</b> si vous insérez une note avant.', { s: 3, x: 960, y: 560, w: 570, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : curseur après « données personnelles », <b>Ctrl+Alt+F</b> (ou <i>Références › Insérer une note de bas de page</i>). Word place un <b>appel de note</b> numéroté en exposant…</p>
  <p><b>Étape 2</b> : … et ouvre la zone de note en bas de la même page, sous un trait séparateur. On tape « Article 4 du RGPD. ».</p>
  <p><b>Étape 3</b> : deuxième note. Si on en insère une plus haut dans le texte, toutes les suivantes se renumérotent seules. Et si le paragraphe glisse à la page suivante, la note le suit.</p>
  <p><b>Étape 4</b> : un double-clic sur le numéro de la note ramène à l'appel dans le texte (et inversement). Le survol de l'appel affiche le texte de la note en info-bulle.</p>
  <p><b>Étape 5</b> : la note de fin (Ctrl+Alt+D) regroupe les références à la fin du document — usage académique, bibliographies.</p>` },

/* 11 — OPTIONS DES NOTES (DIALOG) */
{ title: 'Options des notes', html: `${H('Format, numérotation, conversion', 'Lanceur du groupe Notes de bas de page')}
${DLGW05({ x: 70, y: 175, w: 760, t: 'Note de bas de page et de fin', html: `
 <div style="font-weight:800;color:#185ABD">Emplacement</div>
 ${FLDW05('◉ Notes de bas de page', 'Bas de page ▾', { lw: 270 })}${FLDW05('○ Notes de fin', 'Fin du document ▾', { lw: 270 })}
 <div class="f" data-s="3" style="text-align:right">${BTNW05('Convertir…')}</div>
 <div style="font-weight:800;color:#185ABD">Format</div>
 ${FLDW05('Format de nombre :', '1, 2, 3… ▾', { lw: 270, hot: 1 })}${FLDW05('À partir de :', '1', { lw: 270 })}${FLDW05('Numérotation :', 'Continue ▾', { lw: 270, hot: 1 })}
 <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:6px">${BTNW05('Insérer', 1)}${BTNW05('Annuler')}${BTNW05('Appliquer')}</div>` })}
<div style="position:absolute;left:880px;top:180px;width:650px;display:flex;flex-direction:column;gap:18px">
 ${CARD('<b style="color:#185ABD">Format</b> — 1, 2, 3 · a, b, c · i, ii · symboles * † ‡', 1)}
 ${CARD('<b style="color:#185ABD">Numérotation</b> — Continue · Recommencer à chaque <b>section</b> · à chaque <b>page</b>', 2)}
 ${CARD('<b style="color:#185ABD">Convertir…</b> — toutes les notes de bas de page ⇄ notes de fin', 3)}
</div>
${TIP('Recommencer à chaque section : idéal pour un mémoire où chaque chapitre a ses propres notes.', { s: 4, x: 880, y: 440, w: 650 })}`,
  n: `<p>Le petit <b>lanceur</b> (flèche en bas à droite du groupe Notes de bas de page) ouvre cette boîte.</p>
  <p><b>Étape 1</b> : <b>format de nombre</b> — chiffres, lettres, chiffres romains ou symboles. Astuce : notes de bas de page en chiffres et notes de fin en romains pour les distinguer dans un même document.</p>
  <p><b>Étape 2</b> : <b>numérotation</b> continue sur tout le document, ou recommençant à chaque section ou à chaque page (usage juridique).</p>
  <p><b>Étape 3</b> : le bouton <b>Convertir…</b> transforme toutes les notes de bas de page en notes de fin (ou l'inverse), quand l'éditeur change de consignes.</p>
  <p><b>Étape 4</b> : choisissez bien « Appliquer les modifications à » : tout le document ou seulement la section en cours.</p>` },

/* 12 — SUPPRIMER UNE NOTE */
{ title: 'Supprimer une note', html: `${H('Supprimer une note : visez l\'appel', 'Piège fréquent')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:185px;width:1460px;padding:34px 40px;font-size:30px;line-height:1.6;font-family:Calibri,'Segoe UI',sans-serif">
 Les données personnelles<sup style="color:#FA582D;font-weight:800">1</sup> sont inscrites au registre<span style="position:relative;display:inline-block"><sup class="fo" data-off="2" style="color:#FA582D;font-weight:800">2</sup><span class="f zoom" data-s="1" style="position:absolute;inset:-6px -8px;border:3px solid #FA582D;border-radius:8px"></span></span> et la CNIL${SWAPW05('<sup style="color:#FA582D;font-weight:800">3</sup>', '<sup>2</sup>', 3, '#fff', '#16A34A')} peut contrôler.
 <div style="margin-top:22px;padding-top:14px;border-top:1.5px solid #CBD5E1;font-size:21px;line-height:1.7;color:#33445E">
  <div>¹ Article 4 du RGPD.</div><div class="fo" data-off="2">² Article 30 du RGPD.</div><div>${SWAPW05('³', '²', 3, '#fff', '#16A34A')} www.cnil.fr</div></div>
</div>
${TIP('<b>Bonne méthode</b> : sélectionnez l\'<b>appel</b> dans le texte puis Suppr → la note disparaît et les suivantes se renumérotent.', { s: 2, x: 70, y: 490, w: 720, kind: 'ok' })}
${TIP('<b>Jamais</b> de « ¹ » tapé en exposant avec un texte en bas de page : au premier ajout de paragraphe, tout se décale.', { s: 4, x: 810, y: 490, w: 720, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : on veut supprimer la note 2. Erreur classique : effacer le texte « Article 30 du RGPD » en bas de page. Résultat : le numéro reste orphelin dans le texte et en bas de page.</p>
  <p><b>Étape 2</b> : la bonne méthode — sélectionner l'<b>appel de note</b> (le petit chiffre dans le texte) et appuyer sur Suppr. La note entière disparaît.</p>
  <p><b>Étape 3</b> : la note 3 devient automatiquement la note 2. Aucun travail manuel.</p>
  <p><b>Étape 4</b> : ne jamais « simuler » une note avec un exposant et du texte tapé dans le pied de page. Ça a l'air identique à l'écran, mais rien ne suit quand le texte bouge. Question au groupe : comment repérer une fausse note ? Réponse : le double-clic ne fait rien, et l'info-bulle n'apparaît pas au survol.</p>` },

/* 13 — LÉGENDES (APPWIN + DLG) */
{ title: 'Insérer une légende', html: `${H('Légender figures et tableaux', 'Légendes', PATH('Références > Insérer une légende'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 900, h: 620, title: 'Manuel entrepôt.docx', tab: 'Références',
  groups: [['Table des matières', ['📑 Table des matières']], ['Notes de bas de page', ['📝 Insérer une note']], ['Légendes', ['🏷️ Insérer une légende', '🖼️ Table des illustrations', '🔗 Renvoi']], ['Index', ['🔖 Entrée']]],
  hot: { '🏷️ Insérer une légende': 1 },
  body: PAGE({ inwin: true, w: 640, html: `<h2 style="margin-top:0">Plan de l'entrepôt</h2><p>L'entrepôt est divisé en quatre zones.</p>
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:80%;margin:10px auto 0;outline:2px solid #2563EB;outline-offset:4px">${['Réception', 'Stockage', 'Préparation', 'Expédition'].map((z, i) => `<div style="height:80px;border-radius:6px;display:grid;place-items:center;font-size:13px;font-weight:700;color:#fff;background:${['#0EA5E9', '#185ABD', '#7C3AED', '#16A34A'][i]}">${z}</div>`).join('')}</div>
   <p class="f" data-s="3" style="text-align:center;font-style:italic;color:#2F5496;margin-top:12px;font-size:15px">Figure 1 — Plan des zones</p>` }) })}
${DLGW05({ s: 2, x: 1000, y: 175, w: 530, t: 'Légende', html: `${FLDW05('Légende :', 'Figure 1 — Plan des zones', { lw: 110 })}${FLDW05('Étiquette :', 'Figure ▾', { lw: 110, hot: 1 })}${FLDW05('Position :', 'Au-dessous ▾', { lw: 110, hot: 1 })}
  <div style="display:flex;gap:8px;flex-wrap:wrap">${BTNW05('Nouvelle étiquette…')}${BTNW05('Numérotation…')}</div><div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('OK', 1)}${BTNW05('Annuler')}</div>` })}
<div class="card f" data-s="4" style="position:absolute;left:1000px;top:560px;width:530px;padding:18px 22px;font-size:19px;line-height:1.5"><b>Convention</b><br>📊 Tableau → légende <b>au-dessus</b><br>🖼️ Figure → légende <b>au-dessous</b></div>`,
  n: `<p><b>Étape 1</b> : sélectionnez l'objet (image, forme, graphique, tableau) puis <i>Références › Légendes › Insérer une légende</i>. Astuce : clic droit sur une image › <i>Insérer une légende</i>.</p>
  <p><b>Étape 2</b> : choisissez l'<b>étiquette</b> (Figure, Tableau, Équation ou <i>Nouvelle étiquette…</i> pour « Photo », « Carte »…) et la <b>position</b>. Complétez après le numéro : « — Plan des zones ». Le bouton <i>Numérotation…</i> permet d'inclure le numéro de chapitre (Figure 2-1).</p>
  <p><b>Étape 3</b> : Word insère « Figure 1 » avec le style <b>Légende</b>. Le numéro est un champ <code>SEQ</code> : il se recalcule si on insère une figure avant.</p>
  <p><b>Étape 4</b> : convention typographique — légende au-dessus des tableaux, au-dessous des figures. Restez cohérent sur tout le document.</p>` },

/* 14 — RENVOIS DYNAMIQUES */
{ title: 'Renvois dynamiques', html: `${H('Des renvois qui se mettent à jour', 'Renvoi', PATH('Références > Renvoi'))}
${PAGE({ x: 70, y: 175, w: 780, h: 610, html: `<p style="font-size:19px">Les quatre zones sont présentées ci-contre (voir ${SWAPW05(FCW05('Figure 1'), FCW05('Figure 2'), 4, '#fff', '#16A34A')}).</p>
  <div class="f" data-s="2" style="margin:14px 0;padding:14px;border:2px dashed #7C3AED;border-radius:8px"><div style="height:70px;border-radius:6px;background:linear-gradient(90deg,#EDE9FE,#C4B5FD)"></div><p style="text-align:center;font-style:italic;color:#7C3AED;margin:8px 0 0;font-size:15px">Figure 1 — Vue aérienne <b>(nouvelle)</b></p></div>
  <div style="margin:14px 0;padding:14px;border:1px solid #E2E8F0;border-radius:8px"><div style="height:70px;border-radius:6px;background:linear-gradient(90deg,#DBEAFE,#60A5FA)"></div><p style="text-align:center;font-style:italic;color:#2F5496;margin:8px 0 0;font-size:15px">${SWAPW05('Figure 1&nbsp;', 'Figure 2', 4, '#fff', '#16A34A')} — Plan des zones</p></div>
  <div class="f" data-s="3" style="display:flex;gap:10px;align-items:center;justify-content:center;margin-top:10px">${KEYS('Ctrl+A')}<b style="color:#6B7A90">puis</b>${KEYS('F9')}</div>` })}
${DLGW05({ s: 1, x: 890, y: 175, w: 640, t: 'Renvoi', html: `${FLDW05('Catégorie :', 'Figure ▾', { lw: 220 })}${FLDW05('Insérer un renvoi à :', 'Étiquette et numéro uniquement ▾', { lw: 220, hot: 1 })}
  <div style="font-size:16px;color:#33445E">☑ Insérer en tant que lien hypertexte</div>
  <div style="border:1.5px solid #CBD5E1;border-radius:6px;padding:6px"><div style="padding:4px 8px;background:#DBEAFE;border-radius:4px;font-weight:600">Figure 1 — Plan des zones</div><div style="padding:4px 8px;color:#6B7A90">Figure 2 — Quais d'expédition</div></div>
  <div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('Insérer', 1)}${BTNW05('Fermer')}</div>` })}
<div class="f" data-s="2" style="position:absolute;left:890px;top:575px;width:640px">${TIP('On insère une figure <b>avant</b> : l\'ancienne doit devenir « Figure 2 »…', { x: 0, y: 0, w: 640, kind: 'warn' })}</div>
<div class="f" data-s="4" style="position:absolute;left:890px;top:690px;width:640px">${TIP('… <b>F9</b> : légende <b>et</b> renvoi suivent. Zéro renumérotation manuelle.', { x: 0, y: 0, w: 640, kind: 'ok' })}</div>`,
  n: `<p>Un <b>renvoi</b> remplace le « voir Figure 3, page 12 » tapé à la main par un champ qui suit sa cible.</p>
  <p><b>Étape 1</b> : <i>Références › Renvoi</i>. Catégorie : Figure (ou Titre, Signet, Note de bas de page, Tableau…). « Insérer un renvoi à » : <i>Étiquette et numéro uniquement</i> (« Figure 1 »), <i>Numéro de page</i> (« 12 »), <i>Au-dessus/Au-dessous</i>… On peut insérer deux renvois à la suite : « Figure 1, page 12 ».</p>
  <p><b>Étape 2</b> : on insère une nouvelle figure avant l'ancienne et on la légende : elle prend le n° 1. L'ancienne affiche encore « Figure 1 »… le document est momentanément incohérent.</p>
  <p><b>Étape 3</b> : <b>Ctrl+A</b> (tout sélectionner) puis <b>F9</b> (mettre à jour les champs).</p>
  <p><b>Étape 4</b> : l'ancienne figure devient « Figure 2 » et le renvoi dans le texte aussi. Les champs se mettent aussi à jour à l'impression (option par défaut). Démo très parlante à faire en direct.</p>` },

/* 15 — CHAMPS : CODES ET ERREUR */
{ title: 'Sous le capot : les champs', html: `${H('Sous le capot : des champs', 'Codes de champ')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:560px;padding:26px 30px;font-size:24px;font-family:Calibri,'Segoe UI',sans-serif"><div style="font-size:15px;font-weight:800;letter-spacing:.12em;color:#6B7A90;margin-bottom:12px">AFFICHAGE NORMAL</div>
 <p style="margin:0 0 10px">${FCW05('Figure 2')} — Plan des zones</p><p style="margin:0">… (voir ${FCW05('Figure 2')}, page ${FCW05('12')})</p></div>
<div class="f zoom" data-s="1" style="position:absolute;left:650px;top:245px;display:flex;flex-direction:column;align-items:center;gap:8px">${KEYS('Alt+F9')}<span style="font-size:34px;color:#FA582D">⇄</span></div>
<div class="term f right" data-s="1" style="position:absolute;left:840px;top:190px;width:690px;font-size:20px">
 <div><span class="c">{ SEQ Figure \\* ARABIC }</span> — Plan des zones</div>
 <div>… (voir <span class="c">{ REF _Ref1520 \\h }</span>,</div><div>page <span class="c">{ PAGEREF _Ref1520 \\h }</span>)</div></div>
<div class="row" style="position:absolute;left:70px;top:440px;gap:18px">
 ${[['F9', 'Mettre à jour', 2], ['Ctrl+A', 'Tout sélectionner d\'abord', 2], ['Ctrl+Maj+F9', 'Figer en texte', 3]].map(([k, d, s]) => `<div class="card kc f zoom" data-s="${s}" style="width:300px">${KEYS(k)}<span>${d}</span></div>`).join('')}
</div>
<div class="card f" data-s="4" style="position:absolute;left:1060px;top:440px;width:470px;padding:20px 24px;border-left:6px solid #DC2626"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:#DC2626">MESSAGE D'ERREUR</div><div style="margin-top:10px;font-size:21px;font-weight:700">${FCW05('Erreur ! Source du renvoi introuvable.')}</div><div style="margin-top:10px;font-size:18px;color:#33445E">La cible (légende, titre, signet) a été supprimée → recréez le renvoi.</div></div>
${TIP('Avant de diffuser : <b>Ctrl+A</b> puis <b>F9</b>, et relisez les renvois.', { s: 5, x: 70, y: 680, w: 960, kind: 'warn' })}`,
  n: `<p>Les numéros de légende, renvois, numéros de page, table des matières sont tous des <b>champs</b> : du code qui calcule un résultat.</p>
  <p><b>Étape 1</b> : <b>Alt+F9</b> bascule entre l'affichage des résultats et des codes. On voit <code>SEQ</code> (séquence numérotée des légendes), <code>REF</code> (renvoi vers un signet caché _Ref… posé sur la légende) et <code>PAGEREF</code> (numéro de page de ce signet). Le commutateur <code>\\h</code> en fait un lien cliquable.</p>
  <p><b>Étape 2</b> : les champs ne se mettent <b>pas</b> à jour en temps réel. F9 met à jour la sélection : d'où le réflexe Ctrl+A puis F9. (Les champs des en-têtes/pieds de page et des zones de texte se mettent à jour séparément ou à l'impression.)</p>
  <p><b>Étape 3</b> : Ctrl+Maj+F9 « délie » un champ : il devient du texte figé. Utile avant d'envoyer une version définitive, mais irréversible.</p>
  <p><b>Étape 4</b> : « Erreur ! Source du renvoi introuvable » : quelqu'un a supprimé la légende ou le titre ciblé. Le signet caché a disparu. Il faut refaire le renvoi vers la bonne cible.</p>
  <p><b>Étape 5</b> : astuce de relecture : Ctrl+F « Erreur ! » pour débusquer les renvois cassés avant diffusion.</p>` },

/* 16 — TABLE DES ILLUSTRATIONS */
{ title: 'Table des illustrations', html: `${H('Table des illustrations', 'Légendes', PATH('Références > Insérer une table des illustrations'))}
${PAGE({ x: 70, y: 175, w: 720, h: 600, html: `<h1>Table des figures</h1><div class="pg-toc" style="font-size:18px;line-height:2;border:0;padding:0">
  ${[['Figure 1 — Vue aérienne', '3'], ['Figure 2 — Plan des zones', '4'], ['Figure 3 — Quais d\'expédition', '7'], ['Figure 4 — Circulation des chariots', '9'], ['Figure 5 — Issues de secours', '12']].map(([t, p], i) => `<div class="f left" data-s="2" style="transition-delay:${i * .12}s">${t}<span>${p}</span></div>`).join('')}</div>
  <h1 class="f" data-s="4" style="margin-top:24px">Liste des tableaux</h1><div class="pg-toc f" data-s="4" style="font-size:18px;line-height:2;border:0;padding:0"><div>Tableau 1 — Horaires<span>5</span></div><div>Tableau 2 — Équipements<span>8</span></div></div>` })}
${DLGW05({ s: 1, x: 840, y: 175, w: 690, t: 'Table des illustrations', html: `${FLDW05('Étiquette de légende :', 'Figure ▾', { lw: 240, hot: 1 })}<div style="font-size:17px;color:#33445E;line-height:1.7">☑ Afficher les numéros de page<br>☑ Aligner les numéros de page à droite<br>☑ Inclure l'étiquette et le numéro</div>${FLDW05('Caractères de suite :', '. . . . . . ▾', { lw: 240 })}${FLDW05('Formats :', 'Depuis le modèle ▾', { lw: 240 })}<div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('OK', 1)}${BTNW05('Annuler')}</div>` })}
${TIP('Clic droit sur la table › <b>Mettre à jour les champs</b> › Mettre à jour toute la table.', { s: 3, x: 840, y: 595, w: 690, kind: 'key' })}`,
  n: `<p>Elle fonctionne exactement comme une table des matières, mais à partir des <b>légendes</b> d'une étiquette donnée.</p>
  <p><b>Étape 1</b> : curseur à l'endroit voulu (après la table des matières), <i>Références › Insérer une table des illustrations</i>. Choisissez l'étiquette : Figure.</p>
  <p><b>Étape 2</b> : Word liste toutes les légendes « Figure » avec leur page. Chaque ligne est un lien cliquable (Ctrl+clic).</p>
  <p><b>Étape 3</b> : après ajout de figures, clic droit › Mettre à jour les champs (ou F9) › <i>Mettre à jour toute la table</i> pour prendre en compte les nouvelles légendes.</p>
  <p><b>Étape 4</b> : on recommence avec l'étiquette « Tableau » pour obtenir une liste des tableaux séparée. Prérequis : des légendes insérées avec <i>Insérer une légende</i>, pas tapées à la main.</p>` },

/* 17 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW05, 2),
  n: `<p>Troisième partie : naviguer dans le document — signets, index, liens hypertextes, Atteindre (F5).</p>` },

/* 18 — SIGNETS */
{ title: 'Signets', html: `${H('Nommer un endroit : le signet', 'Signets', PATH('Insertion > Liens > Signet'))}
${DLGW05({ x: 70, y: 180, w: 600, t: 'Signet', html: `${FLDW05('Nom du signet :', 'Tarifs2027', { lw: 160, hot: 1 })}
  <div style="border:1.5px solid #CBD5E1;border-radius:6px;padding:6px;font-size:17px"><div style="padding:4px 8px">Annexe_A</div><div style="padding:4px 8px">Contacts</div><div style="padding:4px 8px;background:#DBEAFE;border-radius:4px;font-weight:700">Tarifs2027</div></div>
  <div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('Ajouter', 1)}${BTNW05('Supprimer')}${BTNW05('Atteindre')}</div>` })}
<div class="chip bad a" style="--d:.6s;position:absolute;left:70px;top:475px;font-size:19px">Nom : pas d'espace · commence par une lettre</div>
${TIP('<b>Fichier › Options › Options avancées › Afficher les signets</b> : crochets gris dans le texte.', { s: 5, x: 70, y: 560, w: 600, kind: 'key' })}
${[60, 203, 345].map((y, i) => `<svg viewBox="0 0 230 400" class="f" data-s="${i + 2}" style="position:absolute;left:680px;top:200px;width:230px;height:400px;overflow:visible"><path d="M0 120 C 115 120, 115 ${y}, 230 ${y}" fill="none" stroke="#FA582D" stroke-width="4" class="draw" pathLength="1"/><circle cx="230" cy="${y}" r="7" fill="#FA582D"/><circle r="6" fill="#FFB37A" filter="url(#gl)"><animateMotion dur="2s" repeatCount="indefinite" path="M0 120 C 115 120, 115 ${y}, 230 ${y}"/></circle></svg>`).join('')}
<div style="position:absolute;left:920px;top:200px;width:610px;display:flex;flex-direction:column;gap:22px">
 ${[['🔗', 'Renvoi', 'Références › Renvoi › Catégorie <b>Signet</b> → « page 14 »'], ['🌐', 'Lien hypertexte', 'Ctrl+K › <b>Emplacement dans ce document</b>'], ['🎯', 'Atteindre', '<b>F5</b> › Atteindre : Signet › Tarifs2027']].map(([i, t, d], j) => `
 <div class="card f right" data-s="${j + 2}" style="display:flex;gap:18px;align-items:center;padding:20px 24px;min-height:120px"><span style="font-size:44px">${i}</span><div><div style="font-size:24px;font-weight:800">${t}</div><div style="font-size:19px;color:#33445E">${d}</div></div></div>`).join('')}
</div>`,
  n: `<p>Un <b>signet</b> donne un nom à un emplacement ou à une sélection : un paragraphe, un tableau, un mot.</p>
  <p><b>Étape 1</b> : sélectionnez le passage (ex. le tableau des tarifs), <i>Insertion › Liens › Signet</i>, tapez le nom <b>Tarifs2027</b>, Ajouter. Règles : pas d'espace (utiliser _), commence par une lettre.</p>
  <p><b>Étape 2</b> : un renvoi de catégorie <b>Signet</b> peut afficher le texte du signet ou son numéro de page : « voir les tarifs page 14 ».</p>
  <p><b>Étape 3</b> : un lien hypertexte interne (Ctrl+K › Emplacement dans ce document) emmène directement au signet — idéal dans un PDF exporté.</p>
  <p><b>Étape 4</b> : <b>F5</b> ouvre <i>Rechercher et remplacer › Atteindre</i> : page, section, ligne, signet, note, tableau… Pratique pour aller à « la section 4 » dans un document de 200 pages.</p>
  <p>Astuce : <i>Fichier › Options › Options avancées › Afficher les signets</i> les matérialise par des crochets gris.</p>` },

/* 19 — INDEX : MARQUER LES ENTRÉES */
{ title: 'Marquer les entrées d\'index', html: `${H('Construire un index', 'Index', PATH('Références > Index > Entrée'))}
<div style="position:absolute;left:70px;top:185px;width:1460px;display:grid;grid-template-columns:repeat(4,1fr);gap:40px">
 ${[['1', 'Sélectionner', '« CACES »'], ['2', 'Marquer', KEYS('Alt+Maj+X')], ['3', 'Marquer tout', 'toutes les occurrences'], ['4', 'Insérer l\'index', 'Références › Index']].map(([n, t, d], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="position:relative;text-align:center;padding:20px 16px;min-height:150px"><span class="num-badge or" style="margin:0 auto">${n}</span><div style="font-size:23px;font-weight:800;margin-top:8px">${t}</div><div style="font-size:18px;color:#33445E;margin-top:6px">${d}</div>${i < 3 ? '<span style="position:absolute;right:-34px;top:62px;font-size:28px;color:#FA582D">➜</span>' : ''}</div>`).join('')}
</div>
${DLGW05({ s: 2, x: 70, y: 400, w: 700, t: 'Marquer les entrées d\'index', html: `${FLDW05('Entrée :', 'CACES', { lw: 150, hot: 1 })}${FLDW05('Sous-entrée :', '', { lw: 150 })}<div style="font-size:17px;color:#33445E">◉ Page en cours &nbsp; ○ Renvoi : Voir… &nbsp; ○ Étendue de pages</div><div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('Marquer')}${BTNW05('Marquer tout', 1)}${BTNW05('Fermer')}</div>` })}
<div class="card f" data-s="3" style="position:absolute;left:820px;top:400px;width:710px;padding:22px 26px;font-size:21px;line-height:1.7;font-family:Calibri,'Segoe UI',sans-serif">Le chariot élévateur est réservé aux caristes titulaires du CACES<span style="font-family:var(--mono);font-size:17px;color:#6B7A90;background:#F1F5F9;white-space:nowrap">{ XE "CACES" }</span>.<span style="color:#94A3B8">¶</span></div>
${TIP('Champs <b>XE</b> visibles avec ¶ : <b>masquez les marques</b> avant d\'insérer l\'index (sinon pagination faussée).', { s: 4, x: 820, y: 600, w: 710, kind: 'warn' })}`,
  n: `<p>L'index alphabétique en fin de document se construit en deux temps : marquer les entrées, puis générer l'index.</p>
  <p><b>Étape 1</b> : sélectionnez un terme dans le texte.</p>
  <p><b>Étape 2</b> : <b>Alt+Maj+X</b> (ou <i>Références › Index › Entrée</i>). La boîte reste ouverte : on peut enchaîner les termes. Sous-entrée : « chariot élévateur » sous « Équipements ». Renvoi : « Cariste, <i>voir</i> CACES ».</p>
  <p><b>Étape 3</b> : <b>Marquer tout</b> repère toutes les occurrences identiques du document (respect de la casse). Word insère un champ <code>{ XE "CACES" }</code> en texte masqué, et active l'affichage des marques ¶.</p>
  <p><b>Étape 4</b> : ces champs XE occupent de la place quand ¶ est affiché : la pagination change. Masquez les marques avant d'insérer l'index ou de le mettre à jour.</p>
  <p>Astuce expert : un <i>fichier de concordance</i> (tableau à 2 colonnes : terme / entrée) permet de marquer automatiquement des centaines de termes (bouton Marquage auto dans la boîte Index).</p>` },

/* 20 — INDEX GÉNÉRÉ */
{ title: 'Insérer et mettre à jour l\'index', html: `${H('L\'index généré', 'Index', PATH('Références > Index > Insérer l\'index'))}
${PAGE({ x: 70, y: 175, w: 760, h: 610, html: `<h1>Index</h1><div style="display:grid;grid-template-columns:1fr 1fr;gap:0 36px;font-size:17px;line-height:1.75">
  ${[['C', [['CACES', '3, 8'], ['Chariot élévateur', '3'], ['Chaussures de sécurité', '2']]], ['E', [['Expédition', '1, 6'], ['Extincteur', '9']]], ['H', [['Horaires', '4']]], ['P', [['Préparation', '1, 5'], ['Premiers secours', '9']]], ['R', [['Réception', '1']]], ['S', [['Stockage', '1, 4']]]].map(([l, es], i) => `
  <div class="f" data-s="${i < 3 ? 1 : 2}" style="break-inside:avoid"><div style="font-weight:800;color:#185ABD;font-size:20px;margin-top:6px">${l}</div>${es.map(([t, p]) => `<div style="display:flex"><span>${t}</span><span style="flex:1;border-bottom:2px dotted #CBD5E1;margin:0 6px 7px"></span><span>${p}</span></div>`).join('')}</div>`).join('')}</div>` })}
${PROC([{ p: 'Références > Index > Insérer l\'index', t: 'Colonnes : <b>2</b> · numéros alignés à droite' }, { p: 'Références > Index > Mettre à jour l\'index', t: 'Après de nouvelles entrées (ou <b>F9</b> dans l\'index)' }, { p: 'Index > Entrée', t: 'Corriger une entrée : modifier le champ <b>XE</b>, pas l\'index' }], { x: 880, y: 185, w: 650, s0: 3 })}
${TIP('Word crée une <b>section continue à 2 colonnes</b> pour l\'index : le reste du document n\'est pas affecté.', { s: 6, x: 880, y: 530, w: 650 })}`,
  n: `<p><b>Étapes 1-2</b> : <i>Références › Index › Insérer l'index</i> en fin de document. On choisit le nombre de colonnes (2 est la norme), l'alignement des numéros à droite, les caractères de suite, la langue (pour le tri alphabétique). Word crée une section continue à 2 colonnes et regroupe les entrées par lettre.</p>
  <p><b>Étape 3</b> : après avoir marqué de nouveaux termes : <i>Mettre à jour l'index</i>.</p>
  <p><b>Étape 4</b> : idem, F9 dans l'index.</p>
  <p><b>Étape 5</b> : ne corrigez jamais l'index directement — la correction sera écrasée à la prochaine mise à jour. Corrigez le champ XE dans le texte (affichez ¶ pour le voir), ou supprimez-le.</p>` },

/* 21 — LIENS HYPERTEXTES */
{ title: 'Liens hypertextes', html: `${H('Liens hypertextes', 'Liens', PATH('Insertion > Liens > Lien'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:175px;width:900px;padding:0;overflow:hidden;border-radius:12px;font-family:'Segoe UI',var(--font)">
 <div style="display:flex;align-items:center;height:44px;padding:0 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700">Insérer un lien hypertexte<span style="margin-left:auto">${KEYS('Ctrl+K')}</span></div>
 <div style="display:flex">
  <div style="width:230px;background:#F8FAFC;border-right:1px solid #E3E8EF;padding:12px 0;font-size:17px">${[['🌐', 'Fichier ou page Web existant(e)', 1], ['📍', 'Emplacement dans ce document', 2], ['📄', 'Créer un document', 0], ['✉️', 'Adresse e-mail', 0]].map(([i, t, s]) => `<div ${s ? `class="f" data-s="${s}"` : ''} style="display:flex;gap:8px;padding:12px 14px;${s ? 'background:#FFF1EC;box-shadow:inset 4px 0 0 #FA582D;' : ''}"><span>${i}</span><span>${t}</span></div>`).join('')}</div>
  <div style="flex:1;padding:18px 22px;display:flex;flex-direction:column;gap:14px;font-size:18px">
   ${FLDW05('Texte à afficher :', 'Consulter le guide RGPD de la CNIL', { lw: 160, hot: 1 })}${FLDW05('Adresse :', 'https://www.cnil.fr', { lw: 160 })}
   <div class="f" data-s="2" style="border:1.5px solid #CBD5E1;border-radius:6px;padding:8px 12px;font-size:16px;line-height:1.7">▸ Haut du document<br>▸ Titres : 1. Contexte · 2. Analyse<br>▸ Signets : Tarifs2027</div>
   <div style="display:flex;gap:10px;justify-content:flex-end">${BTNW05('OK', 1)}${BTNW05('Annuler')}</div></div></div></div>
<div class="card f right" data-s="3" style="position:absolute;left:1010px;top:180px;width:520px;padding:18px 22px;border-left:6px solid #DC2626;font-size:20px">✘ Pour le guide, <u style="color:#2563EB">cliquez ici</u></div>
<div class="card f right" data-s="3" style="position:absolute;left:1010px;top:290px;width:520px;padding:18px 22px;border-left:6px solid #16A34A;font-size:20px">✔ <u style="color:#2563EB">Consulter le guide RGPD de la CNIL</u></div>
${TIP('<b>Ctrl+clic</b> suit un lien dans Word (réglable dans Options › Options avancées).', { s: 4, x: 1010, y: 410, w: 520, kind: 'key' })}
<div style="position:absolute;left:70px;top:580px;width:1460px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
 ${[['✏️', 'Modifier le lien', 'Clic droit › Modifier le lien'], ['🧹', 'Supprimer le lien', 'Clic droit › Supprimer le lien hypertexte (le texte reste)'], ['⚡', 'Lien automatique', 'Adresse tapée + Espace = lien créé tout seul']].map(([i, t, d], j) => `<div class="card f zoom" data-s="5" style="display:flex;gap:16px;align-items:center;padding:18px 22px;transition-delay:${j * .12}s"><span style="font-size:40px">${i}</span><div><div style="font-size:22px;font-weight:800">${t}</div><div style="font-size:18px;color:#33445E">${d}</div></div></div>`).join('')}
</div>`,
  n: `<p><b>Étape 1</b> : sélectionnez le texte, <b>Ctrl+K</b> (<i>Insertion › Liens › Lien</i>). Lien vers une page web : collez l'adresse. Word crée aussi automatiquement un lien quand on tape une adresse suivie d'un espace.</p>
  <p><b>Étape 2</b> : <b>Emplacement dans ce document</b> liste les titres (avec styles !) et les signets : parfait pour un sommaire interactif ou des renvois cliquables dans le PDF.</p>
  <p><b>Étape 3</b> : rédigez un <b>texte de lien explicite</b>. « Cliquez ici » ne dit rien hors contexte — les lecteurs d'écran listent les liens seuls — et c'est une erreur d'accessibilité (module 08).</p>
  <p><b>Étape 4</b> : Ctrl+clic pour suivre le lien. Pour modifier : clic droit › Modifier le lien. Pour supprimer le lien sans supprimer le texte : clic droit › Supprimer le lien hypertexte.</p>
  <p><b>Étape 5</b> : les trois gestes du quotidien. La création automatique d'un lien quand on tape une adresse se règle dans <i>Fichier › Options › Vérification › Options de correction automatique › Mise en forme automatique au cours de la frappe</i>.</p>` },

/* 22 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Documents longs : l\'essentiel', k: 'Récap animé', hub: 'F9', hsub: 'met tout à jour', hk: 'CHAMPS',
  items: [{ ic: '📑', t: 'Sections', d: 'Page suivante · Lier au précédent · numérotation i / 1 / A-1' }, { ic: '📝', t: 'Notes', d: 'Ctrl+Alt+F (bas de page) · Ctrl+Alt+D (fin) · supprimer l\'appel' },
    { ic: '🏷️', t: 'Légendes & renvois', d: 'Champs SEQ et REF · Ctrl+A puis F9 avant diffusion' }, { ic: '🔖', t: 'Index & signets', d: 'Alt+Maj+X · Marquer tout · F5 Atteindre' }, { ic: '🔗', t: 'Liens', d: 'Ctrl+K · texte explicite · emplacement dans ce document' }] }),
  n: `<p>Récapitulez en interrogeant le groupe à chaque carte avant de la révéler :</p>
  <p>1. Comment avoir une page en paysage au milieu ? (sauts de section). 2. Comment supprimer une note ? (l'appel). 3. Quel réflexe avant diffusion ? (Ctrl+A, F9). 4. Raccourci pour marquer une entrée d'index ? (Alt+Maj+X). 5. Qu'est-ce qu'un bon texte de lien ?</p>
  <p>Le hub central : <b>F9</b>. Tout ce module repose sur des champs qui se mettent à jour sur demande.</p>` },

/* 23 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Ctrl+Alt+F', d: 'Insérer une note de bas de page' }, { k: 'Ctrl+Alt+D', d: 'Insérer une note de fin' }, { k: 'Alt+Maj+X', d: 'Marquer une entrée d\'index' }, { k: 'Ctrl+K', d: 'Insérer un lien hypertexte' }, { k: 'F9', d: 'Mettre à jour les champs sélectionnés' }, { k: 'Ctrl+Maj+F9', d: 'Convertir un champ en texte figé' }, { k: 'F5', d: 'Atteindre (page, section, signet…)' }, { k: 'Alt+F9', d: 'Afficher / masquer les codes de champ' }], { cols: 4, y: 190 })}
${TIP('Combo à retenir : <b>Ctrl+A</b> puis <b>F9</b> = tous les champs du document à jour.', { s: 9, kind: 'key', x: 70, y: 620, w: 900 })}`,
  n: `<p>Huit raccourcis. Faites-les pratiquer pendant le lab : Ctrl+Alt+F et Alt+Maj+X sont les plus rentables.</p>
  <p>Note : sur certains claviers portables, F5 et F9 nécessitent la touche Fn.</p>` },

/* 24 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'word', mod: 'w05', lab: 0, title: 'Lab 1 — Le mémoire de conformité RGPD', tasks: ['Insérer une <b>table des matières</b> sous le titre', '<b>Sauts de page</b> avant « Contexte » et « Analyse des écarts »', '<b>2 notes de bas de page</b> : Article 4 et Article 30 du RGPD', '<b>Lien hypertexte</b> vers https://www.cnil.fr', 'En-tête « Mémoire RGPD » · pied « Diffusion restreinte »', 'Titre 1 « Annexes » puis <b>mettre à jour</b> la table'] }),
  n: `<p>Scénario : mémoire RGPD de la <b>Clinique vétérinaire des Tilleuls</b>. Le lab se vérifie en direct dans le simulateur.</p>
  <p>Points d'attention : la table des matières doit être insérée <b>après</b> la première ligne ; les notes se placent juste après les mots indiqués (Ctrl+Alt+F) ; la dernière tâche n'est validée que si la table est <b>mise à jour</b> après l'ajout du titre « Annexes ».</p>
  <p>Pour les plus rapides : dans le vrai Word, remplacez les sauts de page par l'option <i>Saut de page avant</i> du style Titre 1 (Paragraphe › Enchaînements).</p>` },

/* 25 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'word', mod: 'w05', lab: 1, title: 'Lab 2 — Légendes, renvois et index', tasks: ['Titres en <b>Titre 1</b> · convertir le texte « ; » en <b>tableau</b>', '<b>Légendes</b> : Figure 1 (dessous) · Tableau 1 (dessus)', 'Remplacer « ci-dessous » par des <b>renvois</b>', '<b>Index</b> : CACES, chariot élévateur, chaussures de sécurité', 'Nouvelle figure avant · <b>Ctrl+A, F9</b> → « Figure 2 »'] }),
  n: `<p>Ce lab se fait dans le <b>vrai Word</b> : les champs (légendes, renvois, index) ne sont pas simulables fidèlement. Fichier de départ : <code>manuel-entrepot.txt</code>, à coller dans un nouveau document.</p>
  <p>Étape 1 : sélectionner exactement les 4 lignes Équipe…Nuit avant <i>Insertion › Tableau › Convertir le texte en tableau</i>, séparateur Autre « ; ».</p>
  <p>Étape 5 : c'est le moment « waouh » du module — faites-le constater à chacun.</p>` },

/* 26 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Pour numéroter le corps du document à partir de 1 après un sommaire en chiffres romains, il faut :', o: ['Un saut de page et un numéro tapé à la main', 'Un saut de section, désactiver « Lier au précédent », Format des numéros › À partir de 1', 'Deux documents séparés', 'Supprimer le sommaire'], a: [1], e: 'Le format et le point de départ de la numérotation sont propres à chaque section.' },
  { q: 'Vous déplacez un tableau : sa légende devient « Tableau 2 » mais le texte dit encore « voir Tableau 3 ». Que faire ?', o: ['Corriger le texte à la main', 'Ctrl+A puis F9 pour mettre à jour les champs', 'Supprimer la légende', 'Enregistrer en PDF'], a: [1], e: 'Les renvois sont des champs : ils se recalculent à la mise à jour (F9) ou à l\'impression.' },
  { q: 'Quelle est la bonne méthode pour supprimer une note de bas de page ?', o: ['Effacer le texte de la note en bas de page', 'Supprimer l\'appel de note dans le texte', 'Passer la note en blanc', 'Supprimer le pied de page'], a: [1], e: 'Supprimer l\'appel (le chiffre dans le texte) supprime la note et renumérote les suivantes.' },
  { q: 'Que signifie le message « Erreur ! Source du renvoi introuvable » ?', o: ['Le document est corrompu', 'La cible du renvoi (légende, titre, signet) a été supprimée', 'L\'imprimante est déconnectée', 'Le renvoi n\'a pas encore été enregistré'], a: [1], e: 'Le champ REF pointe vers un signet qui n\'existe plus : recréez le renvoi vers la bonne cible.' },
  { q: 'Quel raccourci ouvre la boîte « Marquer les entrées d\'index » ?', o: ['Ctrl+Alt+F', 'Alt+Maj+X', 'Ctrl+K', 'Alt+F9'], a: [1], e: 'Alt+Maj+X marque une entrée d\'index ; Ctrl+Alt+F insère une note de bas de page.' },
  { q: 'Quels éléments sont des champs mis à jour par F9 ? (2 réponses)', o: ['Le numéro « Figure 3 » d\'une légende', 'Un titre en style Titre 1', 'Un renvoi « voir page 12 »', 'Une image insérée'], a: [0, 2], e: 'Légendes (SEQ) et renvois (REF, PAGEREF) sont des champs ; un style ou une image ne le sont pas.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b · 5) b · 6) a et c.</p><p>Revenez sur la diapo « Sous le capot : des champs » si la question 6 pose problème.</p>` },

/* 27 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W05', html: END(),
  n: `<p>Fin du module 05. Prochain module : <b>révision et collaboration</b> — commentaires, suivi des modifications, comparaison de versions et protection du document.</p>` },
] };
