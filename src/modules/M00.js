/* ===================== MODULE 00 — Bienvenue dans Microsoft 365 (module de référence : utilise tous les helpers du kit) ===================== */
const SECS00 = ['Votre formation', 'Microsoft 365 en un coup d\'œil', 'Méthode de travail'];

window.MODULE = { code: 'M00', title: 'Bienvenue dans Microsoft 365', short: 'Introduction', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Introduction', html: TITLE({ mod: 'MODULE 00', title: 'Bienvenue dans <span class="grad">Microsoft 365</span>', sub: '« Word, Excel, PowerPoint : du premier clic à l\'expertise »', agenda: SECS00,
  art: `<svg viewBox="0 0 760 900" style="width:100%;height:100%">
   ${[['#185ABD', '#41A5EE', 'W', 170, 250], ['#107C41', '#33C481', 'X', 400, 360], ['#C43E1C', '#FF8F6B', 'P', 230, 560]].map(([a, b, L, x, y], i) => `
   <defs><linearGradient id="t0${L}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient></defs>
   <g class="a pop" style="--d:${.3 + i * .2}s"><g class="float" style="animation-delay:${-i * 1.3}s"><rect x="${x}" y="${y}" width="190" height="190" rx="44" fill="url(#t0${L})" filter="url(#gl)"/>
   <text x="${x + 95}" y="${y + 132}" font-size="120" font-weight="900" fill="#fff" text-anchor="middle" font-family="Georgia,serif">${L}</text></g></g>`).join('')}
   <path d="M265 440 C 330 470, 380 470, 420 455 M495 550 C 470 620, 420 650, 420 650" stroke="#FA582D" stroke-width="3" fill="none" stroke-dasharray="6 8" class="draw" pathLength="1" style="--d:1s"/>
  </svg>` }),
  n: `<p>Bienvenue ! Cette formation couvre <b>Word, Excel et PowerPoint</b> du niveau débutant au niveau expert.</p><p>Trois parties pour ce module d'introduction : la formation elle-même, l'écosystème Microsoft 365, puis la méthode de travail (cours, démo, lab, quiz).</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Connaître le <b>parcours</b> et ses 4 niveaux', 'Situer Word, Excel et PowerPoint dans <b>Microsoft 365</b>', 'Reconnaître l\'<b>interface commune</b> : ruban, onglets, barre d\'accès rapide', 'Utiliser les <b>raccourcis universels</b>', 'Savoir lancer un <b>lab interactif</b>']),
  n: `<p>Cinq objectifs simples pour démarrer. Insistez sur le dernier : chaque module se termine par un <b>lab vérifié en direct</b>.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECS00, 0), n: `<p>Commençons par la formation : qui êtes-vous, et comment est organisé le parcours.</p>` },

/* 4 — TOUR DE TABLE */
{ title: 'Tour de table', html: `${H('Faisons connaissance', 'Tour de table · 2 minutes chacun')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
 ${[['user', 'Votre prénom', 'et votre métier'], ['laptop', 'Votre usage', 'd\'Office aujourd\'hui'], ['chart', 'Votre niveau', 'Word · Excel · PowerPoint'], ['ai', 'Vos attentes', 'pour cette formation']].map(([ic, t, d], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="text-align:center;padding:30px 20px"><svg viewBox="0 0 64 64" style="width:96px;height:96px"><use href="#i-${ic}"/></svg><div style="font-size:26px;font-weight:900;margin-top:12px">${t}</div><div style="font-size:19px;color:#6B7A90">${d}</div></div>`).join('')}
</div>${TIP('Notez au tableau les attentes : vous y reviendrez en fin de formation pour vérifier qu\'elles sont couvertes.', { s: 5, y: 600, x: 70, w: 900 })}`,
  n: `<p>Faites un tour de table rapide. Notez les <b>attentes</b> au tableau (touche <b>W</b> pour l'atelier, ou au paperboard).</p><p>Repérez les niveaux hétérogènes : proposez aux plus avancés les modules Expert en autonomie pendant les labs.</p>` },

/* 5 — LE PARCOURS (RECAP) */
{ title: 'Le parcours', cls: 'dark', html: RECAP({ t: 'Quatre paliers', k: 'Le parcours', hub: '24', hsub: 'modules · 3 applis', hk: 'PARCOURS',
  items: [{ ic: '🌱', t: 'Débutant', d: 'Interface, saisie, mise en forme, premières formules' }, { ic: '🚀', t: 'Intermédiaire', d: 'Styles, tableaux, fonctions logiques, storytelling, animations' },
    { ic: '⚡', t: 'Avancé', d: 'Documents longs, recherches, TCD, masques et présentation' }, { ic: '👑', t: 'Expert', d: 'Publipostage, tableaux de bord, automatisation, design avancé' }] }),
  n: `<p>Le parcours est découpé en <b>4 paliers</b> par application, 2 modules par palier. Chaque module dure 45 à 75 minutes.</p>` },

/* 6 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECS00, 1), n: `<p>Microsoft 365 : les applications et le cloud qui les relie.</p>` },

/* 7 — ÉCOSYSTÈME (FLOW) */
{ title: 'Microsoft 365', html: `${H('Un écosystème connecté', 'Microsoft 365')}
${FLOW({ x: 70, y: 160, w: 1460, h: 640,
  z: [{ x: 0, y: 20, w: 520, h: 600, l: 'PRODUIRE', c: '#185ABD' }, { x: 940, y: 20, w: 520, h: 600, l: 'COLLABORER', c: '#7C3AED' }],
  n: { w: { x: 180, y: 140, ic: 'word', l: 'Word', sub: 'Documents' }, x: { x: 180, y: 320, ic: 'excel', l: 'Excel', sub: 'Données' }, p: { x: 180, y: 500, ic: 'ppt', l: 'PowerPoint', sub: 'Présentations' },
    od: { x: 730, y: 320, ic: 'onedrive', sz: 110, hot: true, l: 'OneDrive / SharePoint', sub: 'Stockage cloud', s: 1 },
    t: { x: 1200, y: 140, ic: 'teams', l: 'Teams', sub: 'Réunions, canaux', s: 2 }, o: { x: 1200, y: 320, ic: 'outlook', l: 'Outlook', sub: 'Messagerie', s: 2 }, c: { x: 1200, y: 500, ic: 'copilot', l: 'Copilot', sub: 'Assistant IA', s: 3 } },
  l: [{ a: 'w', b: 'od', r: 'hvh', s: 1 }, { a: 'x', b: 'od', s: 1 }, { a: 'p', b: 'od', r: 'hvh', s: 1 }, { a: 'od', b: 't', r: 'hvh', s: 2 }, { a: 'od', b: 'o', s: 2 }, { a: 'od', b: 'c', r: 'hvh', s: 3 }],
  p: [{ s: 1, c: '#FA582D', seg: [{ via: ['x', 'od'], lab: 'Ventes.xlsx', t: 1.8 }, { via: ['od', 't'], lab: 'partagé', t: 1.8 }] }] })}`,
  n: `<p><b>Étape 1</b> : Word, Excel et PowerPoint enregistrent dans <b>OneDrive</b> (personnel) ou <b>SharePoint</b> (équipe). L'enregistrement automatique s'active dès que le fichier est dans le cloud.</p><p><b>Étape 2</b> : le fichier se partage dans <b>Teams</b> ou <b>Outlook</b> par un lien (pas une pièce jointe) : tout le monde travaille sur la même version.</p><p><b>Étape 3</b> : <b>Copilot</b> s'appuie sur ces fichiers pour rédiger, résumer, analyser.</p>` },

/* 8 — INTERFACE COMMUNE (APPWIN) */
{ title: 'L\'interface commune', html: `${H('Une interface commune aux trois applications', 'Le ruban', PATH('Fichier > Options > Personnaliser le ruban'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 940, h: 560, title: 'Rapport annuel.docx', tab: 'Accueil',
  groups: [['Presse-papiers', ['📋 Coller', '✂', '⧉']], ['Police', ['Aptos ▾', '11 ▾', 'G', 'I', 'S']], ['Paragraphe', ['☰', '≡', '⇥']], ['Styles', ['Normal', 'Titre 1', 'Titre 2']], ['Édition', ['🔍 Rechercher']]],
  hot: { 'tab:Insertion': 1, 'Titre 1': 2, 'G': 3, '🔍 Rechercher': 4 },
  body: PAGE({ inwin: true, w: 600, html: `<h1>Rapport annuel 2026</h1>${LINES(3)}<h2>1. Activité</h2>${LINES(4)}` }) })}
<div class="col" style="position:absolute;left:1050px;right:60px;top:190px;gap:14px">
 ${CARD('<b>1 · Onglets</b> — regroupent les commandes par tâche (Insertion, Mise en page…)', 1)}${CARD('<b>2 · Groupes</b> — Styles, Police, Paragraphe… sous chaque onglet', 2)}
 ${CARD('<b>3 · Commandes</b> — survolez pour voir l\'info-bulle et le raccourci', 3)}${CARD('<b>4 · Rechercher</b> — tapez ce que vous voulez faire (<b>Alt+Q</b>)', 4)}</div>`,
  n: `<p>Le <b>ruban</b> est identique dans les trois applis : onglets → groupes → commandes. Double-cliquez sur un onglet pour masquer/afficher le ruban (<b>Ctrl+F1</b>).</p><p>La zone <b>Rechercher</b> (Alt+Q) trouve n'importe quelle commande : réflexe à donner aux débutants.</p>` },

/* 9 — RACCOURCIS UNIVERSELS (KEYCARDS) */
{ title: 'Raccourcis universels', html: `${H('Huit raccourcis valables partout', 'Gagner du temps dès aujourd\'hui')}
${KEYCARDS([{ k: 'Ctrl+C', d: 'Copier' }, { k: 'Ctrl+V', d: 'Coller' }, { k: 'Ctrl+Z', d: 'Annuler' }, { k: 'Ctrl+Y', d: 'Rétablir' }, { k: 'Ctrl+S', d: 'Enregistrer' }, { k: 'Ctrl+F', d: 'Rechercher' }, { k: 'Ctrl+G', d: 'Gras (FR)' }, { k: 'Alt', d: 'Afficher les touches du ruban' }], { cols: 4, y: 190 })}
${TIP('Sur Mac, <b>Ctrl</b> devient <b>⌘ Cmd</b> — et le gras est <b>⌘+B</b>.', { s: 9, kind: 'key', y: 620, w: 760 })}`,
  n: `<p>Montrez la touche <b>Alt</b> en direct : des lettres apparaissent sur le ruban, on navigue sans souris.</p><p>Attention : en français, le gras est <b>Ctrl+G</b> (et non Ctrl+B comme en anglais).</p>` },

/* 10 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECS00, 2), n: `<p>La méthode : comment se déroule chaque module.</p>` },

/* 11 — DÉROULÉ D'UN MODULE (PROC) */
{ title: 'Déroulé d\'un module', html: `${H('Chaque module, quatre temps', 'Méthode')}
${PROC([{ p: 'Cours', t: 'Diapos animées, une idée par écran, notes formateur (N)' }, { p: 'Démo', t: 'Le formateur montre dans la vraie application' }, { p: 'Lab', t: 'Vous pratiquez : chaque tâche se valide en direct' }, { p: 'Quiz', t: '5 questions pour ancrer les notions clés' }], { w: 760 })}
${STAT({ v: '70 %', t: 'du temps passé à pratiquer', x: 960, y: 200, w: 520, s: 5, c: '#16A34A' })}
${STAT({ v: '5 min', t: 'de quiz pour valider chaque module', x: 960, y: 400, w: 520, s: 6, c: '#0EA5E9' })}`,
  n: `<p>Le rythme : <b>cours court</b>, démo, puis <b>lab</b> — c'est là que se fait l'apprentissage. Le quiz clôt le module.</p>` },

/* 12 — APERÇU DES TROIS APPLIS */
{ title: 'Ce que vous saurez faire', html: `${H('Ce que vous saurez faire', 'Un aperçu')}
${GRID({ x: 70, y: 200, cols: 3, colw: [150, 110, 120], rows: [['Produit', 'Prix HT', 'Prix TTC'], ['Stylo', 1.5, ''], ['Cahier', 3.2, ''], ['Classeur', 4.9, '']], fx: { ref: 'C2', f: '=B2*1,2', s: 1 }, sel: 'C2', val: [{ r: 'C2', v: '1,80', s: 2 }, { r: 'C3', v: '3,84', s: 3 }, { r: 'C4', v: '5,88', s: 3 }], hl: [{ r: 'B2', s: 1, c: '#2563EB', t: 'B2' }] })}
${PAGE({ x: 560, y: 190, w: 440, html: `<div class="pg-toc f" data-s="4"><div>1. Activité<span>2</span></div><div>2. Résultats<span>4</span></div><div>3. Perspectives<span>7</span></div></div><h1>Rapport 2026</h1>${LINES(5)}`, d: .3 })}
${SLD({ x: 1040, y: 230, w: 490, theme: 'nuit', title: 'Lancement produit', bullets: ['Contexte', 'Objectifs', 'Planning'], bs: 5, d: .4 })}
<div class="chip f" data-s="2" style="position:absolute;left:70px;top:430px">Excel · formules et recopie</div><div class="chip f" data-s="4" style="position:absolute;left:560px;top:700px">Word · table des matières auto</div><div class="chip f" data-s="7" style="position:absolute;left:1040px;top:540px">PowerPoint · animations</div>`,
  n: `<p>Trois aperçus : une formule recopiée dans Excel, une table des matières automatique dans Word, une diapo animée dans PowerPoint.</p>` },

/* 13 — AVANT / APRÈS (VS) */
{ title: 'Avant / après', html: `${H('Ce qui va changer', 'Avant / après la formation')}
${VS({ l: { t: 'Avant', c: '#DC2626', ic: '✘', items: ['Mise en forme « à la main », titre par titre', 'Calculs refaits à la calculatrice', 'Diapos surchargées de texte', 'Une version par e-mail…'] },
  r: { t: 'Après', c: '#16A34A', ic: '✔', items: ['Styles et table des matières automatiques', 'Formules fiables, tableaux croisés dynamiques', 'Une idée par diapo, animations maîtrisées', 'Un seul fichier partagé dans le cloud'] }, mid: '➜' })}`,
  n: `<p>Projetez-vous : chaque ligne de droite correspond à un module du parcours.</p>` },

/* 14 — LAB */
{ title: 'Lab', html: LAB({ app: 'excel', mod: 'x01', title: 'Premier lab : prise en main', tasks: ['Ouvrez le lab Excel « Premiers pas »', 'Saisissez les données du budget', 'Calculez un total avec <b>SOMME</b>', 'Regardez la tâche se cocher toute seule ✔'] }),
  n: `<p>Faites ouvrir le lien sur chaque poste. Les labs fonctionnent dans le navigateur : rien à installer. La progression est sauvegardée localement.</p>` },

/* 15 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Où sont enregistrés automatiquement les fichiers Microsoft 365 partagés ?', o: ['Sur le bureau', 'Dans OneDrive ou SharePoint', 'Dans la Corbeille', 'Dans Outlook'], a: [1], e: 'L\'enregistrement automatique fonctionne pour les fichiers stockés dans OneDrive ou SharePoint.' },
  { q: 'Quel raccourci met en gras dans Office en français ?', o: ['Ctrl+B', 'Ctrl+G', 'Ctrl+M', 'Ctrl+E'], a: [1], e: 'En français, Ctrl+G = Gras (Ctrl+B est le raccourci anglais).' },
  { q: 'Quelle touche affiche les lettres de navigation au clavier sur le ruban ?', o: ['Maj', 'Alt', 'Tab', 'F1'], a: [1], e: 'Alt (ou F10) affiche les « KeyTips » du ruban.' },
  { q: 'Dans quel ordre se déroule un module ?', o: ['Quiz → Lab → Cours', 'Cours → Démo → Lab → Quiz', 'Lab → Cours', 'Démo seulement'], a: [1], e: 'Cours court, démonstration, pratique en lab, puis quiz.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b.</p>` },

/* 16 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module 00', html: END(), n: `<p>Fin de l'introduction. Prochain module : Word, Excel ou PowerPoint selon votre programme.</p>` },
] };
