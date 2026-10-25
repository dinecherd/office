/* ===================== MODULE W01 — Premiers pas : l'interface, la saisie et l'enregistrement ===================== */
const SECSW01 = ['Se repérer dans Word', 'Saisir et sélectionner proprement', 'Enregistrer, exporter, retrouver'];

/* ---- helpers locaux W01 ---- */
/* boîte de dialogue Word (maquette) */
const DLGW01 = o => `<div class="${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.12);font-family:'Segoe UI',sans-serif;${o.s ? '' : `--d:${o.d ?? .2}s`}">
 <div style="display:flex;align-items:center;padding:10px 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#6B7A90">✕</span></div>
 <div style="padding:18px 22px;font-size:18px;color:#1B2A41">${o.html}</div></div>`;
/* champ de saisie de boîte de dialogue */
const FLDW01 = (l, v, s) => `<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><span style="width:150px;font-size:17px">${l}</span><span style="flex:1;border:1px solid #94A3B8;border-radius:5px;padding:6px 10px;font:600 18px var(--mono);min-height:36px">${s ? `<b class="tw f" data-s="${s}" style="--n:${v.length};border-right-color:#185ABD;color:#185ABD">${v}</b>` : v}</span></div>`;
/* bouton de boîte de dialogue */
const BTW01 = (t, hot) => `<span style="position:relative;display:inline-block;padding:6px 16px;border:1px solid ${hot ? '#185ABD' : '#94A3B8'};border-radius:5px;font-size:16px;font-weight:600;background:${hot ? '#EFF6FF' : '#fff'};margin-right:8px">${t}${hot ? `<em class="ow-hot f zoom" data-s="${hot}"><b>${hot}</b></em>` : ''}</span>`;
/* marques de mise en forme */
const PW01 = '<b style="color:#2563EB;font-weight:400">¶</b>', BRW01 = '<b style="color:#2563EB;font-weight:400">↵</b>', DW01 = '<b style="color:#2563EB">·</b>', IW01 = c => `<b style="color:#2563EB;font-weight:400">${c}</b>`;
/* surlignage de sélection qui apparaît à l'étape s (le texte reste visible) */
const SELW01 = `<style>.selW01{border-radius:3px;transition:background .5s,box-shadow .5s}.selW01.on{background:#BFDBFE;box-shadow:0 0 0 3px #BFDBFE}
.wavW01{text-decoration:underline wavy #DC2626 2px;text-underline-offset:5px}.gramW01{text-decoration:underline double #2563EB 2px;text-underline-offset:5px}</style>`;

window.MODULE = { code: 'W01', title: 'Premiers pas : l\'interface, la saisie et l\'enregistrement', short: 'Premiers pas', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Premiers pas', html: TITLE({ mod: 'WORD · MODULE 01 · DÉBUTANT', title: 'Premiers pas dans <span class="grad">Word</span>', sub: '« Se repérer, saisir proprement, enregistrer au bon endroit »', agenda: SECSW01, art: APPART('word') }),
  n: `<p>Bienvenue dans le premier module Word. Durée indicative : <b>45 minutes</b>, dont un lab de 15 minutes.</p>
<p>Trois parties : l'<b>interface</b> (ruban, onglets, Backstage), la <b>saisie propre</b> et la <b>sélection</b>, puis l'<b>enregistrement</b> (formats, PDF, cloud et versions).</p>
<p>Question d'ouverture au groupe : « Qui a déjà appuyé dix fois sur Entrée pour passer à la page suivante ? » — c'est exactement ce qu'on va apprendre à ne plus faire.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Se repérer dans le <b>ruban</b>, les <b>onglets</b>, les <b>groupes</b> et la barre <b>Accès rapide</b>', 'Saisir <b>sans bricolage</b> : ni espaces ni lignes vides pour aligner', 'Sélectionner vite : <b>mot, ligne, paragraphe, tout</b>', '<b>Rechercher et remplacer</b> dans tout le document', 'Enregistrer en <b>.docx</b>, exporter en <b>PDF</b>, retrouver une <b>version</b>']),
  n: `<p>Cinq objectifs, tous mesurés dans le lab final « La lettre de relance ».</p>
<p>Insistez sur l'objectif 2 : c'est le changement d'habitude le plus rentable. Un document saisi proprement se met en forme en quelques clics ; un document « bricolé » doit être repris ligne par ligne.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW01, 0), n: `<p>Première partie : se repérer. L'objectif est que chacun sache <b>où chercher</b> une commande, même s'il ne la connaît pas encore.</p>` },

/* 4 — ANATOMIE DE LA FENÊTRE */
{ title: 'Anatomie de la fenêtre', html: `${H('La fenêtre Word en un coup d\'œil', 'L\'interface de Word 365')}
${APPWIN({ app: 'word', x: 70, y: 170, w: 960, h: 620, title: 'Relance_Dupont.docx', tab: 'Accueil',
  groups: [['Presse-papiers', ['📋 Coller', '✂', '⧉', '🖌']], ['Police', ['Aptos ▾', '11 ▾', 'G', 'I', 'S']], ['Paragraphe', ['☰', '≡', '¶']], ['Styles', ['Normal', 'Titre 1', 'Titre 2']], ['Modification', ['🔍 Rechercher']]],
  hot: { 'tab:Fichier': 1, 'tab:Accueil': 2, 'Aptos ▾': 3, '🔍 Rechercher': 5 },
  body: `${PAGE({ inwin: true, w: 560, html: `<h1>Relance facture</h1>${LINES(3)}${LINES(4)}` })}
  <div style="position:absolute;left:0;right:0;bottom:0;height:34px;background:#F3F4F6;border-top:1px solid #D9DEE5;display:flex;align-items:center;gap:26px;padding:0 16px;font-size:15px;color:#33445E">
   <span>Page 1 sur 1</span><span>182 mots</span><span>Français (France)</span><span style="margin-left:auto">− ——●—— + 100 %</span>
   <em class="ow-hot f zoom" data-s="4" style="inset:-2px"><b style="right:auto;left:8px;top:-14px">4</b></em></div>` })}
<div class="col" style="position:absolute;left:1070px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 · Fichier</b> — le « Backstage » : ouvrir, enregistrer, imprimer, exporter', 1)}
 ${CARD('<b>2 · Onglets</b> — Accueil, Insertion, Mise en page… découpés en <b>groupes</b>', 2)}
 ${CARD('<b>3 · Commandes</b> — boutons, listes, lanceurs de boîte de dialogue ↘', 3)}
 ${CARD('<b>4 · Barre d\'état</b> — page, nombre de mots, langue, zoom', 4)}
 ${CARD('<b>5 · Rechercher</b> — trouver une commande par son nom', 5)}</div>`,
  n: `<p><b>Étape 1</b> : l'onglet <b>Fichier</b> n'est pas un onglet comme les autres : il ouvre le mode <i>Backstage</i> (plein écran) pour tout ce qui concerne le fichier lui-même.</p>
<p><b>Étape 2</b> : les <b>onglets</b> (Accueil, Insertion, Dessin, Création, Mise en page, Références, Publipostage, Révision, Affichage, Aide) regroupent les commandes par tâche ; chaque onglet est découpé en <b>groupes</b> (Presse-papiers, Police, Paragraphe…).</p>
<p><b>Étape 3</b> : dans chaque groupe, les <b>commandes</b>. La petite flèche ↘ en bas à droite d'un groupe (le <i>lanceur</i>) ouvre la boîte de dialogue complète.</p>
<p><b>Étape 4</b> : la <b>barre d'état</b> en bas : numéro de page, nombre de mots, langue, zoom. Clic droit dessus pour choisir les informations affichées.</p>
<p><b>Étape 5</b> : le champ <b>Rechercher</b> (Alt+Q). Démo : tapez « filigrane » → Word propose directement la commande.</p>` },

/* 5 — LES ONGLETS */
{ title: 'Les onglets du ruban', html: `${H('Un onglet = une famille de tâches', 'Le ruban')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 ${[['Fichier', 'Nouveau · Ouvrir · Enregistrer · Imprimer · Exporter', 1, '#185ABD'], ['Accueil', '80 % du quotidien : Police, Paragraphe, Styles', 1, '#FA582D'], ['Insertion', 'Tableaux, images, en-tête, numéro de page', 1, '#0EA5E9'],
    ['Création', 'Thèmes, couleurs, filigrane, bordures de page', 2, '#7C3AED'], ['Mise en page', 'Marges, orientation, colonnes, sauts', 2, '#16A34A'], ['Références', 'Table des matières, notes, légendes', 2, '#0F766E'],
    ['Publipostage', 'Lettres et étiquettes en série', 3, '#B45309'], ['Révision', 'Éditeur, commentaires, suivi des modifications', 3, '#DC2626'], ['Affichage', 'Règle, volet de navigation, zoom', 3, '#33445E']]
  .map(([t, d, s, c]) => `<div class="card f zoom" data-s="${s}" style="padding:20px 24px;border-top:6px solid ${c}"><div style="font-size:27px;font-weight:900;color:${c}">${t}</div><div style="font-size:19px;color:#33445E;margin-top:6px">${d}</div></div>`).join('')}
</div>
${TIP('Double-clic sur un onglet = replier / déplier le ruban (<b>Ctrl+F1</b>).', { s: 4, y: 720, w: 900, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : les trois onglets les plus utilisés. <b>Accueil</b> couvre l'essentiel des besoins quotidiens : on y passe 80 % du temps.</p>
<p><b>Étape 2</b> : <b>Création</b> (apparence globale : thème, filigrane), <b>Mise en page</b> (la feuille : marges, orientation, colonnes) et <b>Références</b> (documents longs : sommaire, notes de bas de page).</p>
<p><b>Étape 3</b> : <b>Publipostage</b> (vu au niveau Expert), <b>Révision</b> (relecture à plusieurs) et <b>Affichage</b>. L'onglet <b>Dessin</b> et <b>Aide</b> existent aussi selon l'équipement.</p>
<p><b>Étape 4</b> : astuce place à l'écran sur un portable : double-clic sur l'onglet actif ou Ctrl+F1.</p>
<p>Question au groupe : « Où iriez-vous chercher les marges ? » (Mise en page) « Et un numéro de page ? » (Insertion).</p>` },

/* 6 — BACKSTAGE */
{ title: 'Le Backstage Fichier', html: `${H('Fichier : le mode « Backstage »', 'Tout ce qui concerne le fichier', PATH('Fichier'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:175px;width:940px;height:620px;border-radius:14px;overflow:hidden;display:flex;box-shadow:0 30px 70px -25px rgba(14,23,38,.45);font-family:'Segoe UI',sans-serif">
 <div style="width:270px;background:#185ABD;color:#fff;padding:22px 0;display:flex;flex-direction:column;gap:4px;font-size:20px">
  <div style="padding:6px 26px 18px;font-size:22px">⟵</div>
  ${[['Accueil', 0], ['Nouveau', 1], ['Ouvrir', 1], ['Informations', 2], ['Enregistrer', 0], ['Enregistrer sous', 3], ['Imprimer', 4], ['Exporter', 4], ['Fermer', 0], ['Options', 5]].map(([t, s]) => `<div style="position:relative;padding:9px 26px">${t}${s ? `<span class="f" data-s="${s}" style="position:absolute;inset:2px 8px;border:3px solid #FFB37A;border-radius:8px"></span>` : ''}</div>`).join('')}
 </div>
 <div style="flex:1;background:#fff;padding:30px 36px">
  <div style="font-size:34px;font-weight:300;color:#1B2A41;margin-bottom:18px">Informations</div>
  ${[['🔒', 'Protéger le document'], ['🔍', 'Inspecter le document'], ['🕘', 'Historique des versions'], ['🛟', 'Gérer le document']].map(([i, t]) => `<div style="display:flex;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid #EEF0F3;font-size:20px"><span style="font-size:30px">${i}</span>${t}</div>`).join('')}
 </div></div>
<div class="col" style="position:absolute;left:1050px;right:70px;top:190px;gap:14px">
 ${CARD('<b>Nouveau / Ouvrir</b> — modèles, fichiers récents', 1)}${CARD('<b>Informations</b> — protection, versions, récupération', 2)}
 ${CARD('<b>Enregistrer sous</b> — choisir le format et l\'emplacement (<b>F12</b>)', 3)}${CARD('<b>Imprimer · Exporter</b> — papier ou PDF', 4)}${CARD('<b>Options</b> — personnaliser Word', 5)}</div>`,
  n: `<p>Le Backstage occupe tout l'écran : on n'y modifie pas le <i>contenu</i>, mais le <i>fichier</i>. Échap ou la flèche ⟵ pour revenir au document.</p>
<p><b>Étape 1</b> : Nouveau (document vierge ou <b>modèle</b>) et Ouvrir (récents, OneDrive, Parcourir).</p>
<p><b>Étape 2</b> : <b>Informations</b> : c'est là qu'on retrouvera l'historique des versions et la récupération des documents non enregistrés (section 3).</p>
<p><b>Étape 3</b> : Enregistrer sous, ou directement <b>F12</b> qui ouvre la boîte classique.</p>
<p><b>Étape 4</b> : Imprimer (aperçu intégré) et Exporter (PDF).</p>
<p><b>Étape 5</b> : Options — langue de correction, enregistrement automatique, personnalisation du ruban.</p>` },

/* 7 — ACCÈS RAPIDE ET RECHERCHER */
{ title: 'Accès rapide et Rechercher', html: `${H('Vos commandes favorites à portée de clic', 'Barre d\'outils Accès rapide')}
${APPWIN({ app: 'word', x: 70, y: 175, w: 900, h: 420, title: 'Document1', tab: 'Accueil',
  groups: [['Presse-papiers', ['📋 Coller', '🖌']], ['Police', ['Aptos ▾', '11 ▾', 'G', 'I', 'S', 'A▾']], ['Paragraphe', ['☰', '≡', '¶']], ['Modification', ['🔍 Rechercher', '⇄ Remplacer']]],
  hot: { '⇄ Remplacer': 1 }, body: PAGE({ inwin: true, w: 520, html: LINES(4) }) })}
<div class="f zoom" data-s="2" style="position:absolute;left:640px;top:340px;width:430px;background:#fff;border-radius:10px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-size:18px;font-family:'Segoe UI',sans-serif;padding:6px 0">
 <div style="padding:9px 18px;background:#EFF6FF;font-weight:700;color:#185ABD">Ajouter à la barre d'outils Accès rapide</div>
 <div style="padding:9px 18px">Personnaliser la barre d'outils Accès rapide…</div><div style="padding:9px 18px">Réduire le ruban</div></div>
<div class="f" data-s="3" style="position:absolute;left:70px;top:625px;display:flex;align-items:center;gap:10px;padding:10px 18px;background:#F6F7F9;border:1px solid #E3E8EF;border-radius:10px;font-size:22px">
 💾 ↶ ↷ <span style="position:relative;padding:2px 8px;border-radius:6px;background:#EFF6FF;border:2px solid #FA582D">⇄</span><span style="font-size:17px;color:#6B7A90;margin-left:10px">← barre Accès rapide</span></div>
<div class="f zoom" data-s="4" style="position:absolute;left:1010px;top:190px;width:520px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -20px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;overflow:hidden">
 <div style="padding:12px 18px;background:#185ABD;color:#fff;font-size:20px">🔍 <b class="tw f" data-s="4" style="--n:9;border-right-color:#fff">filigrane</b></div>
 <div style="padding:10px 18px;font-size:15px;color:#6B7A90">Actions</div>
 <div style="padding:10px 18px;font-size:20px;background:#EFF6FF">💧 Filigrane <span style="color:#6B7A90;font-size:16px">— Création</span></div>
 <div style="padding:10px 18px;font-size:20px">💧 Filigrane personnalisé…</div></div>
${TIP('Raccourci : <b>Alt+Q</b> place le curseur dans <b>Rechercher</b>.', { s: 5, x: 1010, y: 470, w: 520, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : on veut garder « Remplacer » toujours visible, quel que soit l'onglet actif.</p>
<p><b>Étape 2</b> : <b>clic droit</b> sur le bouton › <i>Ajouter à la barre d'outils Accès rapide</i>. Ça marche avec n'importe quelle commande du ruban.</p>
<p><b>Étape 3</b> : le bouton apparaît dans la barre Accès rapide, à côté d'Enregistrer, Annuler, Rétablir. Dans Microsoft 365, si la barre est masquée : clic droit sur le ruban › <i>Afficher la barre d'outils Accès rapide</i> ; on peut la placer au-dessus ou sous le ruban.</p>
<p><b>Étape 4</b> : le champ <b>Rechercher</b> en haut de la fenêtre : tapez « filigrane », Word propose la commande et l'exécute sans qu'on sache où elle se trouve (onglet Création).</p>
<p><b>Étape 5</b> : Alt+Q pour y aller au clavier. Réflexe à donner à tous les débutants.</p>` },

/* 8 — ONGLETS CONTEXTUELS */
{ title: 'Onglets contextuels', html: `${H('Des onglets qui apparaissent au besoin', 'Onglets contextuels')}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1000, h: 600, title: 'Catalogue.docx', tab: 'Disposition',
  tabs: ['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Références', 'Révision', 'Affichage', 'Création de tableau', 'Disposition'],
  groups: [['Lignes et colonnes', ['⬆ Insérer au-dessus', '⬇ Insérer en dessous']], ['Fusionner', ['⊞ Fusionner', '⊟ Fractionner']], ['Données', ['↕ Trier', '🔁 Répéter en-tête']]],
  hot: { 'tab:Création de tableau': 2, 'tab:Disposition': 2 },
  body: PAGE({ inwin: true, w: 600, html: `<h2 style="margin-top:0">Sessions 2027</h2><div style="position:relative"><table><tr><th>Formation</th><th>Durée</th><th>Tarif</th></tr><tr><td>Word expert</td><td>2 j</td><td>790 €</td></tr><tr><td>Excel TCD</td><td>1 j</td><td>420 €</td></tr></table>
   <span class="f zoom" data-s="1" style="position:absolute;left:120px;top:60px;font-size:34px">🖱️</span></div>` }) })}
<div class="col" style="position:absolute;left:1110px;right:70px;top:200px;gap:16px">
 ${CARD('<b>1 ·</b> Clic <b>dans</b> le tableau', 1)}${CARD('<b>2 ·</b> Deux onglets apparaissent : <b>Création de tableau</b> et <b>Disposition</b>', 2)}
 ${CARD('Même principe : <b>Format de l\'image</b>, <b>En-tête et pied de page</b>…', 3)}</div>
${TIP('Commande introuvable ? <b>Sélectionnez d\'abord l\'objet.</b>', { s: 4, x: 1110, y: 600, w: 420, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : on clique dans un tableau.</p>
<p><b>Étape 2</b> : deux onglets <b>contextuels</b> s'ajoutent à droite du ruban : <b>Création de tableau</b> (styles, trames, bordures) et <b>Disposition</b> (structure : insérer, fusionner, trier). Ils disparaissent dès qu'on clique en dehors.</p>
<p><b>Étape 3</b> : même logique pour une image (<i>Format de l'image</i>), un en-tête (<i>En-tête et pied de page</i>), une forme, un graphique…</p>
<p><b>Étape 4</b> : la question n° 1 des débutants : « Je ne trouve pas l'onglet Disposition ». Réponse : cliquez d'abord <i>dans</i> le tableau. C'est aussi la première question du quiz.</p>` },

/* 9 — RÈGLE ET AFFICHAGE */
{ title: 'Règle et barre d\'état', html: `${H('Règle, barre d\'état et zoom', 'Réglages d\'affichage')}
${PROC([{ p: 'Affichage > Afficher > Règle', t: 'Voir retraits et tabulations du paragraphe courant' }, { p: 'Clic droit sur la barre d\'état', t: 'Cocher : nombre de mots, numéro de ligne, langue' }, { p: 'Affichage > Zoom > Une page', t: 'Ou Ctrl + molette de la souris' }], { w: 760, y: 185 })}
<svg viewBox="0 0 640 300" class="f" data-s="1" style="position:absolute;left:890px;top:190px;width:640px;height:300px">
 <rect x="0" y="40" width="640" height="56" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><rect x="0" y="40" width="70" height="56" fill="#E2E8F0"/><rect x="570" y="40" width="70" height="56" fill="#E2E8F0"/>
 ${Array.from({ length: 50 }, (_, i) => `<line x1="${70 + i * 10}" y1="${i % 5 ? 82 : 72}" x2="${70 + i * 10}" y2="96" stroke="#94A3B8" stroke-width="1.5"/>`).join('')}
 <path d="M100 40 l-12 -16 h24z" fill="#185ABD"/><path d="M70 96 l-12 16 h24z" fill="#185ABD"/><rect x="58" y="112" width="24" height="10" fill="#185ABD"/><path d="M570 96 l-12 16 h24z" fill="#185ABD"/>
 <text x="100" y="16" text-anchor="middle" font-size="17" font-weight="700" fill="#185ABD">1ʳᵉ ligne</text><text x="70" y="150" text-anchor="middle" font-size="17" font-weight="700" fill="#185ABD">Retrait gauche</text><text x="570" y="140" text-anchor="middle" font-size="17" font-weight="700" fill="#185ABD">Retrait droit</text>
 <path d="M300 96 v-14 h10" stroke="#DC2626" stroke-width="3" fill="none"/><text x="305" y="190" text-anchor="middle" font-size="17" font-weight="700" fill="#DC2626">Tabulation</text><path d="M303 172 V108" stroke="#DC2626" stroke-width="2" stroke-dasharray="4 4"/>
</svg>
<div class="f zoom" data-s="2" style="position:absolute;left:890px;top:520px;width:640px;background:#fff;border-radius:10px;box-shadow:0 20px 50px -20px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-size:19px;padding:8px 0;font-family:'Segoe UI',sans-serif">
 ${[['✔', 'Numéro de page', 'Page 2 sur 5'], ['✔', 'Statistiques', '1 248 mots'], ['✔', 'Langue', 'Français (France)'], ['', 'Numéro de ligne', '']].map(([c, t, v]) => `<div style="display:flex;padding:7px 18px;gap:12px"><b style="width:20px;color:#185ABD">${c}</b>${t}<span style="margin-left:auto;color:#6B7A90">${v}</span></div>`).join('')}</div>`,
  n: `<p><b>Étape 1</b> : la <b>règle</b> (Affichage › Afficher › Règle). Elle montre les retraits (triangles) et tabulations du paragraphe où se trouve le curseur. Indispensable pour comprendre une mise en page « qui ne veut pas ». On la reverra en détail au module W02.</p>
<p><b>Étape 2</b> : clic droit sur la <b>barre d'état</b> : on coche ce qu'on veut voir. Le nombre de mots est très utile pour un article ou un résumé limité ; clic dessus = statistiques détaillées.</p>
<p><b>Étape 3</b> : le <b>zoom</b> : curseur en bas à droite, Ctrl + molette, ou Affichage › Zoom › Une page / Plusieurs pages.</p>` },

/* 10 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW01, 1), n: `<p>Deuxième partie : saisir proprement et sélectionner vite. C'est le cœur du module.</p>` },

/* 11 — ENTRÉE = FIN DE PARAGRAPHE */
{ title: 'Entrée = fin de paragraphe', html: `${H('Entrée seulement à la fin d\'un paragraphe', 'Saisir proprement', PATH('Accueil > Paragraphe > Afficher tout (¶)'))}
${PAGE({ x: 70, y: 180, w: 680, html: `<div style="font-size:18px;line-height:1.7">Sauf erreur de notre part, la facture n° 2026-118${DW01}du 15 septembre reste impayée.${PW01}<br>
<span class="f" data-s="1">Word passe <u>tout seul</u> à la ligne : on continue à taper sans appuyer sur Entrée, et le texte s'adapte à la largeur de la page.</span><span class="f" data-s="2">${PW01}</span><br><br>
<span class="f" data-s="3">Claire Martin${BRW01}<br>Responsable comptabilité${PW01}</span></div>` })}
<div class="col" style="position:absolute;left:810px;right:70px;top:190px;gap:16px">
 ${CARD(`${KEYS('Entrée')} <b style="margin-left:10px">¶ fin de paragraphe</b>`, 2)}
 ${CARD(`${KEYS('Maj+Entrée')} <b style="margin-left:10px">↵ saut de ligne</b> — même paragraphe`, 3)}
 ${CARD(`${KEYS('Ctrl+Entrée')} <b style="margin-left:10px">saut de page</b>`, 4)}</div>
${TIP('<b>Afficher tout (¶)</b> — Ctrl+Maj+8 — révèle les caractères invisibles. Allumez-le en permanence au début !', { s: 5, x: 810, y: 560, w: 720, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : Word gère seul le <b>retour à la ligne automatique</b>. On n'appuie pas sur Entrée en fin de ligne, sinon chaque ligne devient un paragraphe et la moindre modification casse tout.</p>
<p><b>Étape 2</b> : on appuie sur Entrée uniquement à la <b>fin d'un paragraphe</b> : le symbole ¶ (pied-de-mouche) apparaît.</p>
<p><b>Étape 3</b> : <b>Maj+Entrée</b> = saut de ligne ↵ : on change de ligne <i>dans le même paragraphe</i>. Parfait pour un nom et une fonction, une adresse : pas d'espacement entre les lignes.</p>
<p><b>Étape 4</b> : <b>Ctrl+Entrée</b> = saut de page, pour commencer un chapitre en haut de page.</p>
<p><b>Étape 5</b> : démo dans Word : bouton ¶ (Accueil › Paragraphe). Montrez une lettre réelle avec les marques. Les marques ne s'impriment jamais.</p>` },

/* 12 — LES MARQUES */
{ title: 'Les caractères invisibles', html: `${H('Lire les caractères invisibles', 'Afficher tout (¶)')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(5,1fr);gap:20px">
 ${[['¶', 'Fin de paragraphe', 'Entrée'], ['↵', 'Saut de ligne', 'Maj+Entrée'], ['·', 'Espace', 'Espace'], ['°', 'Espace insécable', 'Ctrl+Maj+Espace'], ['→', 'Tabulation', 'Tab']].map(([s, t, k], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="text-align:center;padding:26px 14px;display:flex;flex-direction:column;align-items:center;gap:14px">
  <div style="width:120px;height:120px;border-radius:24px;background:#EFF6FF;display:grid;place-items:center;font-size:76px;color:#2563EB;font-family:Georgia,serif">${s}</div>
  <div style="font-size:23px;font-weight:800">${t}</div>${KEYS(k)}</div>`).join('')}
</div>
${PAGE({ x: 70, y: 560, w: 1460, s: 6, html: `<div style="font-size:21px;line-height:1.6">Lyon,${DW01}le${DW01}25${DW01}octobre${DW01}2026${PW01}<br>Objet${IW01('°')}:${DW01}relance${DW01}facture${DW01}n°${IW01('°')}2026-118${PW01}<br>Montant${IW01('→')}4${IW01('°')}860,00${IW01('°')}€${PW01}</div>` })}`,
  n: `<p>Les cinq caractères invisibles à reconnaître (affichés quand ¶ est actif, jamais imprimés).</p>
<p><b>Étapes 1 à 5</b> : ¶ fin de paragraphe (Entrée), ↵ saut de ligne (Maj+Entrée), · espace, ° espace <b>insécable</b> (Ctrl+Maj+Espace : deux mots qui ne doivent jamais être séparés en fin de ligne), → tabulation (Tab).</p>
<p><b>Étape 6</b> : exemple réel : on lit le document comme un « radiologue » : une suite de ··· pour aligner = bricolage, un → = tabulation propre.</p>
<p>Exercice oral : demandez au groupe de repérer combien de paragraphes compte l'exemple (3).</p>` },

/* 13 — VS : BRICOLAGE */
{ title: 'Bricolage vs méthode', html: `${H('Ne plus « bricoler » la mise en page', 'À éviter / à faire')}
${VS({ l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['Des <b>espaces</b> ······ pour aligner', 'Des <b>lignes vides</b> ¶¶¶ pour changer de page', 'Entrée à <b>chaque fin de ligne</b>', 'Taper les numéros 1. 2. 3. à la main'] },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['<b>Alignement</b> et <b>tabulations</b> →', '<b>Saut de page</b> : Ctrl+Entrée', 'Entrée à la <b>fin du paragraphe</b> seulement', 'Listes <b>automatiques</b> (module W02)'] }, mid: '➜' })}
<div class="f" data-s="3" style="position:absolute;left:70px;right:70px;top:600px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
 <div style="font:600 21px var(--mono);background:#FEF2F2;border:2px dashed #DC2626;border-radius:14px;padding:16px 20px;color:#7F1D1D">Total${'·'.repeat(22)}4 860 €¶<br>Échéance${'·'.repeat(17)}15/10¶<br><span style="opacity:.6">→ ajout d'un mot = tout se décale</span></div>
 <div style="font:600 21px var(--mono);background:#ECFDF3;border:2px dashed #16A34A;border-radius:14px;padding:16px 20px;color:#14532D">Total<span style="color:#2563EB">⟶⟶⟶⟶⟶</span>4 860 €¶<br>Échéance<span style="color:#2563EB">⟶⟶⟶⟶</span>15/10¶<br><span style="opacity:.6">→ une tabulation : toujours aligné</span></div></div>`,
  n: `<p><b>Étape 1</b> : les gestes de « bricolage » qu'on voit partout. Ils semblent fonctionner… jusqu'à la première modification : on change une police, on ajoute un mot, et tout se décale.</p>
<p><b>Étape 2</b> : les bons outils : l'alignement de paragraphe, les tabulations, le saut de page, et les listes automatiques.</p>
<p><b>Étape 3</b> : comparaison concrète : à gauche des espaces pour aligner un montant — décalé à la moindre modif. À droite, une tabulation → : le montant reste aligné.</p>
<p>Piège : les lignes vides pour « passer à la page suivante ». Ajoutez trois lignes au-dessus et le titre se retrouve en bas de page. Le saut de page (Ctrl+Entrée) est fiable.</p>` },

/* 14 — TYPOGRAPHIE FRANÇAISE */
{ title: 'Espace insécable', html: `${H('Ponctuation française et espace insécable', 'Typographie')}
${SELW01}
<div style="position:absolute;left:70px;top:190px;width:700px">
 <div class="card f left" data-s="1" style="border-left:6px solid #DC2626;padding:22px 26px"><div style="font-size:19px;color:#DC2626;font-weight:800;margin-bottom:10px">✘ Espace normale : coupure</div>
  <div style="width:520px;font-size:24px;line-height:1.5;border-right:2px dashed #CBD5E1;font-family:Calibri,sans-serif">Pouvez-vous régler la facture de 4 860<br><b style="background:#FEE2E2">€</b> avant le 15 octobre et sous huit jours<br><b style="background:#FEE2E2">?</b> Merci de votre retour.</div></div>
 <div class="card f left" data-s="2" style="border-left:6px solid #16A34A;padding:22px 26px;margin-top:22px"><div style="font-size:19px;color:#16A34A;font-weight:800;margin-bottom:10px">✔ Espace insécable : solidaire</div>
  <div style="width:520px;font-size:24px;line-height:1.5;border-right:2px dashed #CBD5E1;font-family:Calibri,sans-serif">Pouvez-vous régler la facture de<br><b style="background:#DCFCE7">4°860°€</b> avant le 15 octobre ?</div></div>
</div>
<div class="col" style="position:absolute;left:830px;right:70px;top:190px;gap:16px">
 ${CARD('Espace <b>avant</b> : <span class="mono" style="font-size:26px">: ; ! ?</span>', 3)}
 ${CARD('Espaces <b>dans</b> les « guillemets »', 3)}
 ${CARD(`Insécable : ${KEYS('Ctrl+Maj+Espace')}`, 4)}
 ${CARD('Word en ajoute souvent <b>automatiquement</b> (correction automatique)', 5)}</div>`,
  n: `<p><b>Étape 1</b> : avec une espace normale, Word peut couper la ligne entre « 4 860 » et « € », ou laisser un « ? » seul en début de ligne. C'est une faute typographique classique.</p>
<p><b>Étape 2</b> : l'espace <b>insécable</b> (° quand ¶ est affiché) garde les deux éléments ensemble.</p>
<p><b>Étape 3</b> : règle française : espace avant les ponctuations doubles <b>: ; ! ?</b> et à l'intérieur des guillemets « ».</p>
<p><b>Étape 4</b> : raccourci Ctrl+Maj+Espace.</p>
<p><b>Étape 5</b> : en français, la correction automatique de Word insère souvent une insécable avant « : » ou après « ». Vérifiez avec ¶ : vous verrez le petit °.</p>` },

/* 15 — ORTHOGRAPHE */
{ title: 'Orthographe et Éditeur', html: `${H('Soulignements et volet Éditeur', 'Correction', PATH('Révision > Vérification > Éditeur'))}
${SELW01}
${PAGE({ x: 70, y: 180, w: 760, html: `<div style="font-size:21px;line-height:1.9">Nous vous remercions de bien vouloir procéder à son <span class="wavW01">règlemant</span> dans les meilleurs délais. Si votre paiement <span class="gramW01">ont été effectué</span> entre-temps, merci de ne pas tenir compte de ce courrier.</div>` })}
<div class="f zoom" data-s="3" style="position:absolute;left:420px;top:330px;width:330px;background:#fff;border-radius:10px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;font-size:19px;padding:6px 0">
 <div style="padding:9px 18px;font-weight:800;background:#EFF6FF">règlement</div><div style="padding:9px 18px">Ignorer tout</div><div style="padding:9px 18px">Ajouter au dictionnaire</div></div>
<div class="f right" data-s="4" style="position:absolute;left:880px;top:180px;width:650px;height:560px;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;font-family:'Segoe UI',sans-serif;padding:24px 28px">
 <div style="font-size:26px;font-weight:700;color:#185ABD">Éditeur</div><div style="font-size:54px;font-weight:900;margin:8px 0">92 %</div>
 ${[['Orthographe', '1', '#DC2626'], ['Grammaire', '1', '#2563EB'], ['Clarté', '0', '#16A34A'], ['Concision', '2', '#B45309']].map(([t, v, c]) => `<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #EEF0F3;font-size:21px"><span>${t}</span><b style="color:${c}">${v}</b></div>`).join('')}
</div>
<div class="row" style="position:absolute;left:70px;top:520px;gap:16px;flex-wrap:wrap;width:760px">
 <div class="chip bad f" data-s="1" style="font-size:19px">〰 Rouge = orthographe</div><div class="chip blu f" data-s="2" style="font-size:19px">═ Bleu double = grammaire / style</div></div>
${TIP(`${KEYS('F7')} lance le volet <b>Éditeur</b>`, { s: 4, x: 70, y: 620, w: 760, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : soulignement <b>ondulé rouge</b> = mot inconnu du dictionnaire (faute d'orthographe probable, ou nom propre).</p>
<p><b>Étape 2</b> : <b>double soulignement bleu</b> = grammaire ou style (ici l'accord « ont été » au lieu de « a été »).</p>
<p><b>Étape 3</b> : <b>clic droit</b> sur le mot souligné : Word propose la correction, « Ignorer tout » ou « Ajouter au dictionnaire » (pour les noms de clients, de produits).</p>
<p><b>Étape 4</b> : <b>F7</b> ouvre le volet <b>Éditeur</b> qui parcourt tout le document, avec un score et des suggestions de clarté et de concision.</p>
<p>Piège : un texte en anglais signalé en rouge partout ? Vérifiez la <b>langue</b> (barre d'état, ou Révision › Langue).</p>` },

/* 16 — SÉLECTIONNER À LA SOURIS */
{ title: 'Sélectionner à la souris', html: `${H('Sélectionner vite et bien', 'La sélection')}
${SELW01}
${PAGE({ x: 70, y: 180, w: 820, html: `<div style="font-size:20px;line-height:1.75">
 <p style="font-size:20px">Sauf erreur de notre part, la <span class="selW01" data-s="1">facture</span> reste impayée. <span class="selW01" data-s="2">Nous vous remercions de bien vouloir la régler.</span></p>
 <p style="font-size:20px;position:relative"><span class="selW01" data-s="3">Si votre paiement a été effectué entre-temps, merci de ne pas tenir compte de ce courrier. Nous restons à votre disposition.</span></p>
 <p style="font-size:20px;position:relative"><span class="f zoom" data-s="4" style="position:absolute;left:-52px;top:0;font-size:26px">➚</span><span class="selW01" data-s="4">Veuillez agréer, Madame, Monsieur,</span> nos salutations distinguées.</p></div>` })}
<div style="position:absolute;left:940px;right:70px;top:180px">
 <table class="tbl"><tr><th>Je veux…</th><th>Geste</th></tr>
 ${[['Un mot', 'Double-clic', 1], ['Une phrase', 'Ctrl + clic', 2], ['Un paragraphe', 'Triple-clic', 3], ['Une ligne', 'Clic dans la marge', 4], ['Tout', 'Ctrl+A', 5]].map(([a, b, s]) => `<tr class="f" data-s="${s}"><td>${a}</td><td><b>${b}</b></td></tr>`).join('')}</table></div>
${TIP('Marge gauche : le curseur devient une <b>flèche ➚</b>. Clic = ligne · double-clic = paragraphe · triple-clic = tout.', { s: 5, x: 70, y: 640, w: 820 })}`,
  n: `<p>Principe Word : <b>on sélectionne, puis on agit</b>. Maîtriser la sélection fait gagner un temps énorme.</p>
<p><b>Étape 1</b> : <b>double-clic</b> = un mot.</p>
<p><b>Étape 2</b> : <b>Ctrl + clic</b> dans une phrase = la phrase entière (jusqu'au point).</p>
<p><b>Étape 3</b> : <b>triple-clic</b> = le paragraphe. C'est le geste du lab pour supprimer le paragraphe en double.</p>
<p><b>Étape 4</b> : dans la <b>marge gauche</b>, le pointeur devient une flèche oblique : un clic = la ligne. C'est le geste du lab pour mettre l'objet en gras.</p>
<p><b>Étape 5</b> : Ctrl+A = tout le document (ou triple-clic dans la marge).</p>
<p>Démo : faites tester les cinq gestes au groupe sur un texte quelconque, chronométrez-vous.</p>` },

/* 17 — SÉLECTION AVANCÉE */
{ title: 'Sélection avancée', html: `${H('Étendre, ajouter, sélectionner en bloc', 'Sélection au clavier')}
${KEYCARDS([{ k: 'Maj+clic', d: 'Du curseur jusqu\'au point cliqué' }, { k: 'Ctrl+Maj+→', d: 'Étendre mot par mot' }, { k: 'Maj+Fin', d: 'Jusqu\'à la fin de la ligne' }, { k: 'Ctrl+glisser', d: 'Ajouter un passage non contigu' }, { k: 'Alt+glisser', d: 'Bloc vertical (colonne de texte)' }, { k: 'Ctrl+A', d: 'Tout le document' }], { cols: 3, y: 185 })}
<svg viewBox="0 0 1460 210" class="f" data-s="7" style="position:absolute;left:70px;top:590px;width:1460px;height:210px">
 <rect x="0" y="0" width="700" height="200" rx="16" fill="#fff" stroke="#E3E8EF" stroke-width="2"/>
 ${['Réf.   Produit       Qté', 'A-101  Chaise        12', 'A-102  Table          3', 'A-103  Lampe          8'].map((t, i) => `<text x="30" y="${45 + i * 42}" font-family="Consolas,monospace" font-size="24" fill="#1B2A41" xml:space="preserve">${t}</text>`).join('')}
 <rect x="302" y="62" width="50" height="128" fill="#2563EB" fill-opacity=".25" stroke="#2563EB" stroke-width="2"/>
 <text x="740" y="80" font-size="26" font-weight="800" fill="#2563EB">Alt + glisser</text><text x="740" y="120" font-size="22" fill="#33445E">sélectionne uniquement la colonne « Qté »</text>
 <text x="740" y="160" font-size="22" fill="#33445E">pratique sur du texte collé depuis un logiciel</text>
</svg>`,
  n: `<p>Les sélections « de pro ».</p>
<p><b>Étapes 1 à 3</b> : <b>Maj</b> étend la sélection : Maj+clic (du curseur jusqu'au clic : idéal pour sélectionner 3 pages sans faire défiler à la souris en maintenant le bouton), Ctrl+Maj+flèche (mot par mot), Maj+Fin (jusqu'en fin de ligne).</p>
<p><b>Étape 4</b> : <b>Ctrl</b> maintenu pendant qu'on sélectionne à la souris ajoute des passages non contigus (ex. mettre en gras plusieurs mots éparpillés en une fois).</p>
<p><b>Étape 5</b> : <b>Alt + glisser</b> = sélection rectangulaire, verticale.</p>
<p><b>Étape 6</b> : Ctrl+A.</p>
<p><b>Étape 7</b> : exemple de sélection en bloc sur un texte aligné, collé depuis un logiciel métier.</p>` },

/* 18 — COUPER, COPIER, COLLER */
{ title: 'Déplacer et coller', html: `${H('Déplacer du texte et bien coller', 'Couper · copier · coller')}
${FLOW({ x: 70, y: 170, w: 860, h: 330,
  n: { a: { x: 110, y: 130, html: `<text x="110" y="142" text-anchor="middle" font-size="34" font-weight="800" fill="#185ABD">Abc</text>`, l: 'Sélection', sub: 'texte source' },
    b: { x: 430, y: 130, html: `<text x="430" y="144" text-anchor="middle" font-size="40">📋</text>`, l: 'Presse-papiers', sub: 'Ctrl+X ou Ctrl+C', s: 1 },
    c: { x: 750, y: 130, html: `<text x="750" y="142" text-anchor="middle" font-size="34" font-weight="800" fill="#16A34A">Abc</text>`, l: 'Destination', sub: 'Ctrl+V', s: 2 } },
  l: [{ a: 'a', b: 'b', s: 1, flow: true }, { a: 'b', b: 'c', s: 2, flow: true }],
  p: [{ s: 2, seg: [{ via: ['a', 'b'], lab: 'Ctrl+X', t: 1.5 }, { via: ['b', 'c'], lab: 'Ctrl+V', t: 1.5 }] }] })}
<div class="f zoom" data-s="3" style="position:absolute;left:980px;top:180px;width:550px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;padding:16px 20px">
 <div style="font-size:18px;color:#6B7A90;margin-bottom:12px">📋 (Ctrl) · Options de collage</div>
 ${[['🖌', 'Conserver la mise en forme source', 0], ['🔀', 'Fusionner la mise en forme', 0], ['🅰', 'Conserver uniquement le texte', 4]].map(([i, t, s]) => `<div style="position:relative;display:flex;gap:14px;align-items:center;padding:10px 12px;font-size:20px;border-radius:8px">${i} ${t}${s ? `<em class="ow-hot f zoom" data-s="${s}"><b>✔</b></em>` : ''}</div>`).join('')}</div>
${TIP('Texte copié depuis un site web ? <b>Conserver uniquement le texte</b> : il prend la mise en forme de votre document.', { s: 4, x: 980, y: 470, w: 550, kind: 'ok' })}
${TIP('Glisser-déposer la sélection fonctionne aussi. Erreur ? <b>Ctrl+Z</b> annule, <b>Ctrl+Y</b> rétablit.', { s: 5, x: 70, y: 600, w: 860, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : on sélectionne puis <b>Ctrl+X</b> (couper) ou <b>Ctrl+C</b> (copier) : le texte part dans le Presse-papiers.</p>
<p><b>Étape 2</b> : on place le curseur à destination, <b>Ctrl+V</b>.</p>
<p><b>Étape 3</b> : après chaque collage, une petite balise <b>(Ctrl)</b> apparaît : trois options. <i>Conserver la mise en forme source</i> garde l'aspect d'origine ; <i>Fusionner</i> adopte la mise en forme autour mais garde gras/italique ; <i>Conserver uniquement le texte</i> colle du texte brut.</p>
<p><b>Étape 4</b> : le réflexe pour coller depuis un site web ou un e-mail : texte brut, pour éviter de polluer le document avec des polices et couleurs étrangères.</p>
<p><b>Étape 5</b> : glisser-déposer pour un déplacement court ; Ctrl+Z / Ctrl+Y pour annuler / rétablir.</p>` },

/* 19 — RECHERCHER ET REMPLACER */
{ title: 'Rechercher et remplacer', html: `${H('Corriger tout le document en un clic', 'Rechercher et remplacer', PATH('Accueil > Modification > Remplacer'))}
${DLGW01({ x: 70, y: 185, w: 820, t: 'Rechercher et remplacer', s: 1, html: `
 <div style="display:flex;gap:22px;border-bottom:1px solid #E3E8EF;margin-bottom:16px;font-size:17px"><span>Rechercher</span><span style="color:#185ABD;font-weight:700;border-bottom:3px solid #185ABD;padding-bottom:6px">Remplacer</span><span>Atteindre</span></div>
 ${FLDW01('Rechercher :', 'Sté Dupond', 2)}${FLDW01('Remplacer par :', 'Société Dupont', 3)}
 <div style="margin:18px 0 6px">${BTW01('Plus &gt;&gt;', 0)}${BTW01('Remplacer', 0)}${BTW01('Remplacer tout', 4)}${BTW01('Suivant', 0)}</div>` })}
<div class="f zoom" data-s="5" style="position:absolute;left:250px;top:520px;width:480px;background:#fff;border-radius:12px;box-shadow:0 30px 70px -20px rgba(14,23,38,.55),0 0 0 1px #CBD5E1;padding:22px 26px;font-size:21px;font-family:'Segoe UI',sans-serif">ℹ️ Word a effectué <b>3 remplacements</b>.<div style="text-align:right;margin-top:12px">${BTW01('OK', 0)}</div></div>
<div class="col" style="position:absolute;left:940px;right:70px;top:190px;gap:16px">
 ${CARD(`${KEYS('Ctrl+H')} ouvre Remplacer`, 1)}${CARD('<b>Plus &gt;&gt;</b> : Respecter la casse · Mot entier', 4)}${CARD('<b>Spécial</b> : <span class="mono">^p</span> = marque de paragraphe', 5)}</div>
${TIP('Testez d\'abord avec <b>Suivant</b> si le mot peut apparaître dans d\'autres mots.', { s: 6, x: 940, y: 560, w: 590, kind: 'warn' })}`,
  n: `<p>Le cas du lab : le nom du client est mal écrit partout.</p>
<p><b>Étape 1</b> : <b>Ctrl+H</b> (ou Accueil › Modification › Remplacer). Ctrl+F ouvre seulement la recherche dans le volet de navigation.</p>
<p><b>Étape 2</b> : <i>Rechercher</i> : « Sté Dupond ».</p>
<p><b>Étape 3</b> : <i>Remplacer par</i> : « Société Dupont ».</p>
<p><b>Étape 4</b> : <b>Remplacer tout</b>.</p>
<p><b>Étape 5</b> : Word indique le nombre de remplacements (3 dans le lab). Le bouton <i>Plus &gt;&gt;</i> donne <i>Respecter la casse</i>, <i>Mot entier</i> et les caractères spéciaux : <b>^p</b> = marque de paragraphe (ex. remplacer ^p^p par ^p supprime les lignes vides !).</p>
<p><b>Étape 6</b> : prudence avec <i>Remplacer tout</i> sur des mots courts : remplacer « an » par « année » transforme aussi « plan » en « plannée ». Cochez <i>Mot entier</i> ou avancez avec <i>Suivant</i>.</p>` },

/* 20 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW01, 2), n: `<p>Troisième partie : enregistrer au bon format, au bon endroit, et savoir retrouver une version.</p>` },

/* 21 — LES FORMATS */
{ title: 'Choisir le bon format', html: `${H('Un format pour chaque usage', 'Enregistrer sous', PATH('Fichier > Enregistrer sous > Parcourir'))}
${FLOW({ x: 70, y: 170, w: 1460, h: 620,
  n: { d: { x: 730, y: 290, ic: 'docx', sz: 120, hot: true, l: '.docx', sub: 'le standard Word' },
    m: { x: 200, y: 110, ic: 'macro', l: '.docm', sub: 'avec macros VBA', s: 1 }, t: { x: 200, y: 460, ic: 'tpl', l: '.dotx', sub: 'modèle réutilisable', s: 2 },
    p: { x: 1260, y: 110, ic: 'pdf', l: '.pdf', sub: 'diffusion figée', s: 3 }, o: { x: 1260, y: 460, ic: 'folder', l: '.odt · .rtf', sub: 'autres traitements de texte', s: 4 } },
  l: [{ a: 'd', b: 'm', r: 'hvh', s: 1 }, { a: 'd', b: 't', r: 'hvh', s: 2 }, { a: 'd', b: 'p', r: 'hvh', s: 3, flow: true }, { a: 'd', b: 'o', r: 'hvh', s: 4 }] })}
${TIP('Un <b>.docx</b> ne peut pas contenir de macros : Word les supprime à l\'enregistrement.', { s: 5, x: 470, y: 640, w: 660, kind: 'warn' })}`,
  n: `<p>Au centre, le <b>.docx</b> : le format par défaut, à utiliser 95 % du temps.</p>
<p><b>Étape 1</b> : <b>.docm</b> pour un document qui contient des macros VBA (automatisation).</p>
<p><b>Étape 2</b> : <b>.dotx</b> = modèle : un double-clic sur un modèle crée un <i>nouveau</i> document basé dessus, sans écraser le modèle. Idéal pour le papier à en-tête de l'entreprise.</p>
<p><b>Étape 3</b> : <b>.pdf</b> pour diffuser une version figée (facture, devis, CV), lisible partout et difficilement modifiable.</p>
<p><b>Étape 4</b> : <b>.odt</b> (LibreOffice) ou <b>.rtf</b> pour échanger avec d'autres logiciels.</p>
<p><b>Étape 5</b> : piège classique : enregistrer en .docx un document avec macros → Word prévient puis supprime les macros. Question 4 du quiz.</p>` },

/* 22 — EXPORTER EN PDF */
{ title: 'Exporter en PDF', html: `${H('Exporter un PDF propre', 'Diffuser', PATH('Fichier > Exporter > Créer PDF/XPS'))}
${PROC([{ p: 'Fichier > Exporter > Créer un document PDF/XPS', t: 'Choisir le dossier et le nom' }, { p: 'Options…', t: 'Pages : tout, page actuelle, de… à…' }, { p: 'Options > Créer des signets à partir des titres', t: 'Navigation dans le PDF' }, { p: 'Publier', t: 'Le PDF s\'ouvre pour vérification' }], { w: 760, y: 180 })}
${DLGW01({ x: 900, y: 190, w: 630, t: 'Options', s: 2, html: `
 <div style="font-weight:700;margin-bottom:8px">Étendue de pages</div>
 <div style="line-height:1.9">◉ Tout<br>○ Page en cours<br>○ Page(s) de <span style="border:1px solid #94A3B8;padding:0 14px">1</span> à <span style="border:1px solid #94A3B8;padding:0 14px">2</span></div>
 <div style="font-weight:700;margin:14px 0 8px">Inclure les informations non imprimables</div>
 <div style="position:relative;display:inline-block;padding:4px 8px">☑ Créer des signets à partir de : ◉ Titres<em class="ow-hot f zoom" data-s="3"><b>3</b></em></div>
 <div style="margin-top:8px">☑ Propriétés du document<br>☑ Balises de structure pour l'accessibilité</div>` })}
<div class="f zoom" data-s="4" style="position:absolute;left:900px;top:640px;display:flex;align-items:center;gap:16px"><svg viewBox="0 0 64 64" style="width:80px;height:80px"><use href="#i-pdf"/></svg><span style="font-size:22px;font-weight:700">Relance_Dupont.pdf</span><span class="chip ok" style="font-size:18px">✔ prêt à envoyer</span></div>`,
  n: `<p><b>Étape 1</b> : Fichier › Exporter › <b>Créer un document PDF/XPS</b>. (Fichier › Enregistrer sous › type PDF fonctionne aussi.)</p>
<p><b>Étape 2</b> : bouton <b>Options…</b> : on peut n'exporter que certaines pages (ex. seulement la page 1 d'un devis).</p>
<p><b>Étape 3</b> : <b>Créer des signets à partir des titres</b> : le PDF aura un sommaire cliquable dans le volet de gauche du lecteur PDF, à condition d'avoir utilisé des styles de titre (module W03). Laissez cochées les balises d'accessibilité.</p>
<p><b>Étape 4</b> : <i>Publier</i>. Cochez « Ouvrir le fichier après publication » pour vérifier le rendu avant envoi.</p>` },

/* 23 — CLOUD ET VERSIONS */
{ title: 'Cloud et historique des versions', html: `${H('Enregistrer dans le cloud, remonter le temps', 'OneDrive · SharePoint')}
${FLOW({ x: 70, y: 165, w: 1460, h: 440,
  n: { w: { x: 150, y: 170, ic: 'word', l: 'Word', sub: 'Relance.docx' },
    od: { x: 560, y: 170, ic: 'onedrive', sz: 100, hot: true, l: 'OneDrive / SharePoint', sub: 'enregistrement automatique', s: 1 },
    v: { x: 1000, y: 170, html: `<text x="1000" y="186" text-anchor="middle" font-size="46">🕘</text>`, l: 'Historique des versions', sub: 'Fichier > Informations', s: 2 },
    r: { x: 1330, y: 170, html: `<text x="1330" y="186" text-anchor="middle" font-size="46">↩️</text>`, l: 'Restaurer', sub: 'la version d\'hier', s: 3 } },
  l: [{ a: 'w', b: 'od', s: 1, flow: true }, { a: 'od', b: 'v', s: 2 }, { a: 'v', b: 'r', s: 3 }],
  p: [{ s: 1, seg: [{ via: ['w', 'od'], lab: 'auto', t: 1.6 }] }] })}
<div class="f" data-s="1" style="position:absolute;left:70px;top:600px;display:flex;align-items:center;gap:14px;padding:12px 20px;border-radius:12px;background:#185ABD;color:#fff;font-size:20px;font-family:'Segoe UI',sans-serif">Enregistrement automatique <span style="display:inline-block;width:52px;height:26px;border-radius:13px;background:#fff;position:relative"><i style="position:absolute;right:4px;top:4px;width:18px;height:18px;border-radius:50%;background:#185ABD"></i></span> Activé</div>
<div class="f" data-s="2" style="position:absolute;left:880px;top:590px;width:650px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -20px rgba(14,23,38,.5),0 0 0 1px #E3E8EF;font-size:19px;font-family:'Segoe UI',sans-serif">
 ${[['Aujourd\'hui 10:42', 'Claire Martin', 0], ['Hier 17:15', 'Claire Martin', 3], ['23/10 09:02', 'Paul Roche', 0]].map(([d, u, s]) => `<div style="position:relative;display:flex;justify-content:space-between;padding:11px 18px;border-bottom:1px solid #EEF0F3"><b>${d}</b><span>${u}</span><span style="color:#185ABD">Ouvrir la version</span>${s ? `<em class="ow-hot f zoom" data-s="${s}" style="inset:2px"><b>↩</b></em>` : ''}</div>`).join('')}</div>`,
  n: `<p><b>Étape 1</b> : enregistrez le fichier dans <b>OneDrive</b> (personnel) ou <b>SharePoint / Teams</b> (équipe) : l'interrupteur <b>Enregistrement automatique</b> en haut à gauche s'active. Plus besoin de Ctrl+S toutes les 5 minutes.</p>
<p><b>Étape 2</b> : Fichier › Informations › <b>Historique des versions</b> (ou clic sur le nom du fichier dans la barre de titre) : la liste des versions avec date et auteur.</p>
<p><b>Étape 3</b> : on ouvre la version d'hier et on clique sur <b>Restaurer</b>. Rassurant pour les débutants : on ne « casse » plus rien définitivement.</p>
<p>Attention : l'enregistrement automatique enregistre aussi vos erreurs. Pour faire un essai, utilisez Fichier › Enregistrer une copie d'abord.</p>` },

/* 24 — RÉCUPÉRATION ET NOMMAGE */
{ title: 'Récupérer et nommer', html: `${H('Récupérer un fichier, nommer pour retrouver', 'Bonnes pratiques')}
${PROC([{ p: 'Rouvrir Word', t: 'Volet <b>Récupération de document</b> à gauche' }, { p: 'Fichier > Informations > Gérer le document', t: '<b>Récupérer des documents non enregistrés</b>' }], { w: 700, y: 185 })}
<div class="card f zoom" data-s="3" style="position:absolute;left:830px;top:185px;width:700px;padding:0;overflow:hidden">
 <div style="padding:14px 22px;background:#33445E;color:#fff;font-size:20px;font-weight:700">📁 Relances clients — trié par nom</div>
 ${['2026-09-12_Relance_Arnaud_v1.docx', '2026-10-02_Relance_Lambert_v1.docx', '2026-10-25_Relance_Dupont_v1.docx', '2026-10-25_Relance_Dupont_v2.docx'].map((f, i) => `<div style="display:flex;gap:14px;align-items:center;padding:12px 22px;border-top:1px solid #EEF0F3;font:600 20px var(--mono);${i === 3 ? 'background:#EFF6FF' : ''}"><span style="color:#185ABD">W</span>${f}</div>`).join('')}</div>
${VS({ y: 520, s1: 4, s2: 5, l: { t: 'Illisible', c: '#DC2626', ic: '✘', items: ['<span class="mono">lettre final DEF (2).docx</span>'] }, r: { t: 'Triable', c: '#16A34A', ic: '✔', items: ['<span class="mono">AAAA-MM-JJ_Objet_Client_v2.docx</span>'] } })}`,
  n: `<p>Pour un fichier <b>local</b> (pas dans le cloud) et Word qui se ferme brutalement :</p>
<p><b>Étape 1</b> : rouvrez Word : le volet <b>Récupération de document</b> propose les fichiers récupérés automatiquement. Ouvrez-les et enregistrez-les tout de suite.</p>
<p><b>Étape 2</b> : sinon : Fichier › Informations › Gérer le document › <b>Récupérer des documents non enregistrés</b>.</p>
<p><b>Étape 3</b> : nommer pour retrouver : la date au format <b>AAAA-MM-JJ</b> en tête classe automatiquement les fichiers par ordre chronologique.</p>
<p><b>Étapes 4-5</b> : « final DEF (2) » ne dit ni la date ni le contenu. Convention : date, objet, client, version.</p>` },

/* 25 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Les réflexes du module', k: 'Récap', hub: 'W01', hsub: 'Premiers pas', hk: 'À RETENIR',
  items: [{ ic: '🧭', t: 'Ruban', d: 'Onglets → groupes → commandes · Rechercher (Alt+Q)' }, { ic: '¶', t: 'Saisie propre', d: 'Entrée = fin de paragraphe · Maj+Entrée · Ctrl+Entrée' },
    { ic: '🖱️', t: 'Sélection', d: 'Double-clic mot · triple-clic paragraphe · marge = ligne' }, { ic: '🔁', t: 'Remplacer', d: 'Ctrl+H › Remplacer tout' }, { ic: '☁️', t: 'Enregistrer', d: '.docx · PDF · OneDrive et historique des versions' }] }),
  n: `<p>Récapitulez en interrogeant le groupe : pour chaque carte, demandez un raccourci ou un geste avant de cliquer.</p>
<p>1) Où trouver une commande inconnue ? 2) Quelle touche pour un saut de ligne ? 3) Comment sélectionner un paragraphe ? 4) Remplacer partout ? 5) Comment revenir à la version d'hier ?</p>` },

/* 26 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Huit raccourcis à adopter', 'Raccourcis W01')}
${KEYCARDS([{ k: 'Ctrl+S', d: 'Enregistrer' }, { k: 'F12', d: 'Enregistrer sous' }, { k: 'Ctrl+Z', d: 'Annuler' }, { k: 'Ctrl+Y', d: 'Rétablir / répéter' }, { k: 'Ctrl+A', d: 'Tout sélectionner' }, { k: 'Ctrl+H', d: 'Rechercher et remplacer' }, { k: 'Maj+Entrée', d: 'Saut de ligne' }, { k: 'F7', d: 'Orthographe (Éditeur)' }], { cols: 4, y: 190 })}
${TIP('Bonus : <b>Ctrl+Entrée</b> saut de page · <b>Alt+Q</b> Rechercher · <b>Ctrl+Maj+8</b> afficher ¶', { s: 9, kind: 'key', y: 620, w: 980 })}`,
  n: `<p>Les huit raccourcis du module. Faites-les essayer en direct : chacun tape Ctrl+Z, Ctrl+Y, F12 sur son poste.</p>
<p>Ctrl+Y a un double rôle : il rétablit ce qui a été annulé, ou <b>répète</b> la dernière action (ex. appliquer encore le même gras).</p>` },

/* 27 — LAB */
{ title: 'Lab', html: LAB({ app: 'word', mod: 'w01', lab: 0, title: 'Lab — La lettre de relance', tasks: ['Remplacez <b>toutes</b> les « Sté Dupond » par « Société Dupont »', 'Mettez la ligne d\'<b>objet</b> en <b>gras</b>', 'Supprimez le paragraphe <b>[À SUPPRIMER]</b>', 'Ajoutez une formule de politesse avec « <b>salutations distinguées</b> »', 'Mettez « Claire Martin » en <i>italique</i>'] }),
  n: `<p>Scénario : vous êtes assistant(e) comptable chez <b>Mobilier Martin SARL</b> ; la lettre de relance a été tapée à la hâte.</p>
<p>Solution : 1) Ctrl+H › Sté Dupond › Société Dupont › Remplacer tout (3 remplacements). 2) Clic dans la marge devant « Objet » › Ctrl+G. 3) Triple-clic dans le paragraphe « [À SUPPRIMER] » › Suppr. 4) Fin du dernier paragraphe › Entrée › « Veuillez agréer, Madame, Monsieur, nos salutations distinguées. » 5) Sélectionnez « Claire Martin » › Ctrl+I.</p>
<p>Durée : 10 à 15 minutes. Les tâches se cochent automatiquement.</p>` },

/* 28 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Vous ne trouvez pas l\'onglet « Disposition » des tableaux. Pourquoi ?', o: ['Il faut l\'activer dans les Options', 'C\'est un onglet contextuel : il faut cliquer dans un tableau', 'Il n\'existe que dans Word pour Mac', 'Il est dans l\'onglet Fichier'], a: [1], e: 'Les onglets contextuels (Création de tableau, Disposition) n\'apparaissent que lorsque le curseur est dans un tableau.' },
  { q: 'Quel est le bon moyen de commencer un chapitre en haut d\'une nouvelle page ?', o: ['Appuyer sur Entrée jusqu\'à changer de page', 'Insérer des espaces', 'Insérer un saut de page (Ctrl+Entrée)', 'Réduire la taille de police'], a: [2], e: 'Le saut de page force la page suivante quel que soit le contenu au-dessus.' },
  { q: 'Comment sélectionner tout un paragraphe en un geste ?', o: ['Triple-clic dans le paragraphe', 'Double-clic dans le paragraphe', 'Ctrl+clic dans le paragraphe', 'Clic droit › Sélectionner'], a: [0], e: 'Double-clic = mot, Ctrl+clic = phrase, triple-clic = paragraphe.' },
  { q: 'Quel format choisir pour un document contenant des macros VBA ?', o: ['.docx', '.dotx', '.pdf', '.docm'], a: [3], e: 'Le .docx ne peut pas contenir de macros : il faut un .docm (ou .dotm pour un modèle).' },
  { q: 'Que fait Maj+Entrée ?', o: ['Un saut de page', 'Un saut de ligne sans créer de nouveau paragraphe', 'Un saut de section', 'Valide la correction orthographique'], a: [1], e: 'Le saut de ligne (↵) reste dans le même paragraphe : pratique pour une adresse.' },
  { q: 'Quelles affirmations sur l\'enregistrement dans OneDrive sont vraies ?', o: ['L\'enregistrement automatique s\'active', 'On peut restaurer une version précédente', 'Le fichier devient un PDF', 'Les macros sont supprimées'], a: [0, 1], e: 'Dans OneDrive/SharePoint : enregistrement automatique + Fichier › Informations › Historique des versions.' },
] ); }, n: `<p>Réponses : 1) b · 2) c · 3) a · 4) d · 5) b · 6) a et b.</p><p>Pour chaque erreur fréquente, renvoyez à la diapo correspondante (touche O pour la vue d'ensemble).</p>` },

/* 29 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W01', html: END(), n: `<p>Fin du module W01. Prochain module : <b>W02 — Mise en forme des caractères, des paragraphes et des listes</b>.</p><p>Conseil pour la suite : gardez l'affichage ¶ activé pendant une semaine.</p>` },
] };
