/* ===================== MODULE X08 — Automatiser : Power Query, matrices dynamiques et macros VBA (Expert) ===================== */
const SECSX08 = ['Power Query : importer et nettoyer', 'Matrices dynamiques : FILTRE, UNIQUE, LET', 'Macros VBA : enregistrer, lire, modifier'];

/* ---- helpers locaux X08 ---- */
const GX08 = (o, L) => { let h = GRID(o); if (L) { let i = 0; h = h.replace(/(<div class="xg-cols"[^>]*>)([\s\S]*?)(<\/div>)/, (m, a, b, c) => a + b.replace(/>([A-Z#·×]+)<\/span>/g, () => '>' + L[i++] + '</span>') + c); } return h; };
const CX08 = (o, ref) => { const RH = o.rh || 38, cw = c => (o.colw && o.colw[c]) || o.cw || 120; const m = /^([A-Z])(\d+)$/.exec(ref), c = m[1].charCodeAt(0) - 65, r = +m[2]; let x = 46; for (let i = 0; i < c; i++) x += cw(i); return { x: (o.x ?? 70) + x, y: (o.y ?? 170) + (o.fx ? 42 : 0) + RH * r, w: cw(c), h: RH }; };
/* bloc de code (terminal) dont les lignes apparaissent aux étapes indiquées */
const CODEX08 = (o) => `<div class="term ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="--d:.2s;position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;font-size:${o.fs || 20}px;line-height:1.5;padding:18px 24px">${o.lines.map(([t, s]) => `<div ${s ? `class="f left" data-s="${s}"` : ''} style="white-space:pre">${t || ' '}</div>`).join('')}</div>`;
const K08 = t => `<span style="color:#7DD3FC">${t}</span>`, S08 = t => `<span style="color:#FDBA74">${t}</span>`, C08 = t => `<span style="color:#86EFAC">${t}</span>`, N08 = t => `<span style="color:#F0ABFC">${t}</span>`;
/* données nettoyées Maison Fournil (11 lignes) */
const FNX08 = [['Lyon Centre', 'Baguette Tradition', 320, '1,20', '384,00'], ['Villeurbanne', 'Croissant', 180, '1,10', '198,00'], ['Lyon Centre', 'Pain Au Chocolat', 210, '1,25', '262,50'], ['Caluire', 'Baguette Tradition', 150, '1,20', '180,00'], ['Bron', 'Tarte Aux Pommes', 12, '18,50', '222,00'], ['Écully', 'Pain De Campagne', 45, '3,90', '175,50']];

window.MODULE = { code: 'X08', title: 'Automatiser : Power Query, matrices dynamiques et macros VBA', short: 'Automatiser', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Automatiser', html: TITLE({ mod: 'EXCEL · MODULE 08 · EXPERT', title: 'Ne plus jamais <span class="grad">refaire</span> à la main', sub: '« Power Query, FILTRE, UNIQUE, LET et une première macro VBA »', agenda: SECSX08, art: APPART('excel') }),
  n: `<p>Dernier module Excel. Trois outils d'automatisation, du plus simple au plus technique :</p><ul><li><b>Power Query</b> : importer et nettoyer un fichier une fois pour toutes, puis tout rejouer d'un clic chaque mois.</li><li>Les <b>matrices dynamiques</b> (Microsoft 365) : une formule qui renvoie toute une liste (FILTRE, UNIQUE, TRIER) et LET pour des formules lisibles.</li><li>Les <b>macros VBA</b> : enregistrer une routine, lire et retoucher le code.</li></ul><p>Fil rouge : Maison Fournil (5 boulangeries) et Transports Delmas.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Importer et nettoyer un CSV avec <b>Power Query</b>, puis l\'<b>actualiser</b>', 'Utiliser <b>FILTRE</b>, <b>UNIQUE</b>, <b>TRIER</b> et <b>LET</b>', 'Enregistrer, lire et modifier une <b>macro VBA</b> simple', 'Enregistrer en <b>.xlsm</b> et appliquer les règles de <b>sécurité</b>']),
  n: `<p>Deux labs à réaliser dans le <b>vrai Excel</b> (Microsoft 365) : Lab 1 Power Query + matrices dynamiques ; Lab 2 première macro. Durée indicative : 90 minutes.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX08, 0), n: `<p>Power Query est intégré à Excel depuis 2016 (onglet Données, groupe Récupérer et transformer des données). C'est l'outil le plus rentable de ce module.</p>` },

/* 4 — LE CSV SALE */
{ title: 'Le CSV « sale »', html: `${H('Le problème : un export « sale »', 'ventes_fournil.csv · chaque mois')}
${CODEX08({ x: 70, y: 175, w: 900, fs: 19, lines: [[C08('Date;Boutique;Produit;Quantité;Prix unitaire')], ['02/09/2026;<span style="background:#7F1D1D">␣␣</span>Lyon Centre;baguette tradition;320;1,20'], ['02/09/2026;Villeurbanne;<span style="background:#78350F">CROISSANT</span>;180;1,10'], ['02/09/2026;Lyon Centre;pain au chocolat;210;1,25'], ['03/09/2026;Caluire<span style="background:#7F1D1D">␣</span>;Baguette Tradition;150;1,20'], ['03/09/2026;Bron;tarte aux pommes;12;18,50'], ['<span style="background:#1E3A8A">02/09/2026;Villeurbanne;CROISSANT;180;1,10</span>'], ['<span style="background:#4C1D95">;;;;</span>'], ['04/09/2026;Écully;pain de campagne;45;3,90'], ['04/09/2026;Lyon Centre;tarte aux pommes;9;18,50'], ['04/09/2026;<span style="background:#78350F">bron</span>;croissant;140;1,10'], ['05/09/2026;Caluire;pain au chocolat;95;1,25'], ['…  2 lignes de plus']] })}
<div class="col" style="position:absolute;left:1010px;right:70px;top:180px;gap:14px">
 ${CARD('<b style="color:#DC2626">1 · Espaces</b> parasites : « ␣␣Lyon Centre »', 1)}
 ${CARD('<b style="color:#B45309">2 · Casse</b> irrégulière : CROISSANT, bron', 2)}
 ${CARD('<b style="color:#2563EB">3 · Doublon</b> : la même ligne deux fois', 3)}
 ${CARD('<b style="color:#7C3AED">4 · Ligne vide</b> : « ;;;; »', 4)}
 ${CARD('<b>5 ·</b> Décimales avec <b>virgule</b> : paramètres régionaux', 5)}
</div>
${TIP('Chaque mois : 15 min de nettoyage manuel… <b>ou 1 clic</b>.', { s: 6, kind: 'warn', x: 1010, y: 650, w: 520 })}`,
  n: `<p>Le logiciel de caisse de Maison Fournil exporte chaque mois ce CSV (séparateur point-virgule). Faites repérer les problèmes au groupe avant de cliquer.</p><p><b>Étape 1</b> : espaces parasites (« ␣␣Lyon Centre », « Caluire␣ ») : un TCD verrait deux boutiques différentes.</p><p><b>Étape 2</b> : casse irrégulière (CROISSANT / croissant, bron / Bron).</p><p><b>Étape 3</b> : une ligne en double (02/09, Villeurbanne, 180 croissants) : le CA serait surévalué de 198 €.</p><p><b>Étape 4</b> : une ligne vide.</p><p><b>Étape 5</b> : les décimales « 1,20 » doivent être lues en paramètres régionaux français, sinon 1,20 devient 120 ou du texte.</p><p><b>Étape 6</b> : faire ce nettoyage à la main chaque mois, c'est 15 minutes et des erreurs. Power Query l'enregistre une fois.</p>` },

/* 5 — ETL (FLOW) */
{ title: 'Extraire, transformer, charger', html: `${H('Power Query : l\'ETL d\'Excel', 'Extraire · Transformer · Charger')}
${FLOW({ x: 70, y: 170, w: 1460, h: 560,
  z: [{ x: 0, y: 40, w: 380, h: 400, l: 'EXTRAIRE', c: '#0EA5E9' }, { x: 540, y: 40, w: 380, h: 400, l: 'TRANSFORMER', c: '#7C3AED', s: 1 }, { x: 1080, y: 40, w: 380, h: 400, l: 'CHARGER', c: '#107C41', s: 2 }],
  n: { s: { x: 190, y: 240, ic: 'csv', sz: 110, l: 'CSV · dossier · base · web', sub: 'la source ne change pas' },
    q: { x: 730, y: 240, ic: 'filteri', sz: 110, hot: true, l: 'Éditeur Power Query', sub: 'étapes enregistrées', s: 1 },
    t: { x: 1270, y: 240, ic: 'tablei', sz: 110, l: 'Tableau tblVentes', sub: 'propre, prêt à analyser', s: 2 } },
  l: [{ a: 's', b: 'q', s: 1 }, { a: 'q', b: 't', s: 2 }, { a: 't', b: 's', r: [[1270, 520], [190, 520]], s: 3, c: '#FA582D', dash: true, lab: 'Actualiser tout', lx: 730, ly: 520, lw: 180 }],
  p: [{ s: 3, keep: true, seg: [{ via: ['s', 'q'], lab: '13 lignes', t: 1.4 }, { via: ['q', 't'], lab: '11 lignes', t: 1.4, c: '#107C41' }] }] })}`,
  n: `<p>ETL = <b>E</b>xtract, <b>T</b>ransform, <b>L</b>oad : le métier des outils de données, intégré à Excel.</p><p><b>Départ — Extraire</b> : Power Query se connecte à une source : fichier texte/CSV, classeur, <b>dossier entier</b> (tous les fichiers d'un mois), base de données, page web, SharePoint.</p><p><b>Étape 1 — Transformer</b> : dans l'éditeur, chaque clic (supprimer les espaces, changer le type…) est <b>mémorisé</b> comme une étape. La source n'est jamais modifiée.</p><p><b>Étape 2 — Charger</b> : le résultat est chargé dans un tableau structuré (tblVentes), un TCD ou le modèle de données.</p><p><b>Étape 3</b> : le mois suivant, on remplace le fichier et on clique <b>Actualiser tout</b> : les 13 lignes brutes redeviennent 11 lignes propres en une seconde.</p>` },

/* 6 — IMPORTER */
{ title: 'Importer le CSV', html: `${H('Importer : À partir d\'un fichier texte/CSV', 'Données', PATH('Données > Récupérer et transformer des données > À partir d\'un fichier texte/CSV'))}
${APPWIN({ app: 'excel', x: 70, y: 175, w: 940, h: 560, title: 'Ventes_Fournil.xlsx', tab: 'Données',
  groups: [['Récupérer et transformer des données', ['📥 Obtenir des données', '📄 À partir d\'un fichier texte/CSV', '🌐 À partir du web']], ['Requêtes et connexions', ['🔄 Actualiser tout']]],
  hot: { '📄 À partir d\'un fichier texte/CSV': 1, '🔄 Actualiser tout': 4 },
  body: `<div class="f zoom" data-s="2" style="position:absolute;left:30px;top:20px;right:30px;background:#fff;border-radius:10px;box-shadow:var(--sh);padding:16px 20px;font-family:'Segoe UI',sans-serif">
   <div style="font-size:19px;font-weight:800">ventes_fournil.csv</div>
   <div style="display:flex;gap:16px;font-size:16px;margin:10px 0;color:#33445E"><span>Origine : <b>65001 : Unicode (UTF-8)</b></span><span>Délimiteur : <b>Point-virgule</b></span></div>
   <table style="width:100%;border-collapse:collapse;font-size:15px">${[['Date', 'Boutique', 'Produit', 'Quantité', 'Prix unitaire'], ['02/09/2026', '  Lyon Centre', 'baguette tradition', '320', '1,20'], ['02/09/2026', 'Villeurbanne', 'CROISSANT', '180', '1,10'], ['03/09/2026', 'Caluire ', 'Baguette Tradition', '150', '1,20']].map((r, i) => `<tr>${r.map(c => `<td style="padding:5px 8px;border-bottom:1px solid #E3E8EF;${i ? '' : 'font-weight:800;background:#F1F5F9'}">${c}</td>`).join('')}</tr>`).join('')}</table>
   <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px"><span style="padding:8px 14px;border:1px solid #CBD5E1;border-radius:6px;font-size:16px">Charger ▾</span><span style="position:relative;padding:8px 14px;border-radius:6px;font-size:16px;background:#107C41;color:#fff;font-weight:700">Transformer les données<em class="ow-hot f zoom" data-s="3"><b>3</b></em></span></div></div>` })}
<div class="col" style="position:absolute;left:1050px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Données › À partir d\'un fichier texte/CSV', 1)}
 ${CARD('<b>2 ·</b> Aperçu : séparateur <b>« ; »</b> détecté', 2)}
 ${CARD('<b>3 ·</b> <b>Transformer les données</b> (et non Charger)', 3)}
 ${CARD(`<b>4 ·</b> Plus tard : ${KEYS('Ctrl+Alt+F5')} Actualiser tout`, 4)}
</div>`,
  n: `<p><b>Étape 1</b> : Données › Récupérer et transformer des données › <b>À partir d'un fichier texte/CSV</b>, puis choisir ventes_fournil.csv.</p><p><b>Étape 2</b> : la fenêtre d'aperçu détecte l'origine (encodage UTF-8) et le délimiteur (point-virgule). Les problèmes sont déjà visibles.</p><p><b>Étape 3</b> : ne cliquez pas sur « Charger » (on chargerait les données sales) mais sur <b>Transformer les données</b> : l'éditeur Power Query s'ouvre.</p><p><b>Étape 4</b> : une fois la requête créée, le bouton <b>Actualiser tout</b> (Ctrl+Alt+F5) la rejoue.</p>` },

/* 7 — L'ÉDITEUR POWER QUERY */
{ title: 'L\'éditeur Power Query', html: `${H('L\'éditeur : chaque clic devient une étape', 'Étapes appliquées')}
${APPWIN({ app: 'excel', x: 70, y: 170, w: 1460, h: 610, title: 'ventes_fournil — Éditeur Power Query', tabs: ['Fichier', 'Accueil', 'Transformer', 'Ajouter une colonne', 'Affichage'], tab: 'Transformer',
  groups: [['Colonne de texte', ['✂ Format ▾', 'Supprimer les espaces', 'Majuscule à chaque mot']], ['N\'importe quelle colonne', ['Type de données ▾', 'Remplacer les valeurs']], ['Accueil', ['Supprimer les lignes ▾', 'Fermer et charger']]],
  hot: { 'Supprimer les espaces': 1, 'Majuscule à chaque mot': 2, 'Supprimer les lignes ▾': 3, 'Fermer et charger': 5 },
  body: `<div style="position:absolute;left:16px;top:14px;width:1040px;background:#fff;border-radius:8px;overflow:hidden;font-family:'Segoe UI',sans-serif">
   <table style="width:100%;border-collapse:collapse;font-size:16px"><tr>${['📅 Date', 'ᴬᴮᶜ Boutique', 'ᴬᴮᶜ Produit', '1²³ Quantité', '1.2 Prix unitaire', '1.2 CA'].map((h, i) => `<th style="text-align:left;padding:7px 10px;background:#F1F5F9;border-bottom:2px solid #CBD5E1;${i === 5 ? 'color:#107C41' : ''}" ${i === 5 ? 'class="f" data-s="4"' : ''}>${h}</th>`).join('')}</tr>
   ${FNX08.map(r => `<tr><td style="padding:6px 10px;border-bottom:1px solid #EEF0F3">0${r === FNX08[3] || r === FNX08[4] ? 3 : r === FNX08[5] ? 4 : 2}/09/2026</td><td style="padding:6px 10px;border-bottom:1px solid #EEF0F3">${r[0]}</td><td style="padding:6px 10px;border-bottom:1px solid #EEF0F3">${r[1]}</td><td style="padding:6px 10px;border-bottom:1px solid #EEF0F3;text-align:right">${r[2]}</td><td style="padding:6px 10px;border-bottom:1px solid #EEF0F3;text-align:right">${r[3]}</td><td class="f" data-s="4" style="padding:6px 10px;border-bottom:1px solid #EEF0F3;text-align:right;color:#107C41;font-weight:700">${r[4]}</td></tr>`).join('')}</table></div>
   <div style="position:absolute;right:16px;top:14px;width:350px;bottom:14px;background:#fff;border-radius:8px;padding:14px 16px;font-family:'Segoe UI',sans-serif">
    <div style="font-size:17px;font-weight:800;color:#6B7A90">PARAMÈTRES D'UNE REQUÊTE</div><div style="font-size:18px;font-weight:800;margin:10px 0 8px">Étapes appliquées</div>
    ${[['Source', 0], ['En-têtes promus', 0], ['Type modifié', 0], ['Texte découpé', 1], ['Chaque mot mis en majuscule', 2], ['Lignes vides supprimées', 3], ['Doublons supprimés', 3], ['Personnalisée ajoutée', 4]].map(([t, s]) => `<div ${s ? `class="f left" data-s="${s}"` : ''} style="font-size:17px;padding:6px 8px;border-radius:6px;${s === 4 ? 'background:#E8F5EC;font-weight:700' : ''}">⚙ ${t}</div>`).join('')}</div>` })}`,
  n: `<p>L'éditeur Power Query : un aperçu des données au centre, et à droite le volet <b>Paramètres d'une requête</b> avec la liste des <b>Étapes appliquées</b>. Les trois premières (Source, En-têtes promus, Type modifié) sont créées automatiquement.</p><p><b>Étape 1</b> : on sélectionne Boutique et Produit (Ctrl+clic sur les en-têtes) › Transformer › Format › <b>Supprimer les espaces</b> → étape « Texte découpé ».</p><p><b>Étape 2</b> : Format › <b>Majuscule à chaque mot</b> → « Croissant », « Lyon Centre ».</p><p><b>Étape 3</b> : Accueil › Supprimer les lignes › <b>Supprimer les lignes vides</b>, puis sélectionner toutes les colonnes › <b>Supprimer les doublons</b>.</p><p><b>Étape 4</b> : Ajouter une colonne › <b>Colonne personnalisée</b> : nom CA, formule <code>[Quantité] * [Prix unitaire]</code>, puis type Nombre décimal. Vérifiez les types : si les décimales sont mal lues, Type de données › <b>Utilisation des paramètres régionaux…</b> › Décimal / Français (France).</p><p><b>Étape 5</b> : Accueil › <b>Fermer et charger</b>. Chaque étape peut être renommée, modifiée (roue dentée) ou supprimée (croix).</p>` },

/* 8 — FLOW DES ÉTAPES */
{ title: 'Les étapes rejouées', html: `${H('13 lignes brutes → 11 lignes propres', 'Les étapes appliquées, rejouées dans l\'ordre')}
${FLOW({ x: 70, y: 180, w: 1460, h: 470,
  n: { a: { x: 90, y: 200, ic: 'csv', sz: 90, l: 'Source', sub: '13 lignes' },
    b: { x: 360, y: 200, ic: 'formula', sz: 90, l: 'Texte nettoyé', sub: 'espaces · casse', s: 1 },
    c: { x: 630, y: 200, ic: 'filteri', sz: 90, l: 'Lignes vides', sub: '12 lignes', s: 2 },
    d: { x: 900, y: 200, ic: 'filteri', sz: 90, l: 'Doublons', sub: '11 lignes', s: 3 },
    e: { x: 1170, y: 200, ic: 'formula', sz: 90, l: 'CA ajouté', sub: '[Qté] × [Prix]', s: 4 },
    f: { x: 1390, y: 200, ic: 'tablei', sz: 90, hot: true, l: 'tblVentes', sub: '11 lignes', s: 5 } },
  l: [{ a: 'a', b: 'b', s: 1 }, { a: 'b', b: 'c', s: 2 }, { a: 'c', b: 'd', s: 3 }, { a: 'd', b: 'e', s: 4 }, { a: 'e', b: 'f', s: 5 }],
  p: [{ s: 5, keep: true, seg: [{ via: ['a', 'b'], lab: '13', t: .9 }, { via: ['b', 'c'], lab: '13', t: .9 }, { via: ['c', 'd'], lab: '12', t: .9 }, { via: ['d', 'e'], lab: '11', t: .9 }, { via: ['e', 'f'], lab: '11', t: .9, c: '#107C41' }] }] })}
<div style="position:absolute;left:70px;right:70px;top:640px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
 ${[['5', 'boutiques propres', '#107C41'], ['11', 'lignes après nettoyage', '#2563EB'], ['2 219,45 €', 'CA de la semaine', '#FA582D']].map(([v, t, c], i) => `<div class="card f zoom" data-s="6" style="border-left:6px solid ${c};padding:14px 20px"><b style="font-size:36px;color:${c}">${v}</b> <span style="font-size:19px">${t}</span></div>`).join('')}
</div>`,
  n: `<p>La requête est une <b>recette</b> : les étapes sont rejouées dans l'ordre, à chaque actualisation.</p><p><b>Étape 1</b> : nettoyage du texte : « ␣␣Lyon Centre » → « Lyon Centre », « bron » → « Bron », « CROISSANT » → « Croissant ».</p><p><b>Étape 2</b> : suppression de la ligne vide « ;;;; » : 12 lignes.</p><p><b>Étape 3</b> : suppression du doublon (2<sup>e</sup> ligne « 02/09 · Villeurbanne · Croissant · 180 ») : 11 lignes. Attention, l'ordre compte : sans nettoyage préalable, « bron » et « Bron » ne seraient pas reconnus comme identiques.</p><p><b>Étape 4</b> : colonne CA = Quantité × Prix unitaire.</p><p><b>Étape 5</b> : chargement dans le tableau <b>tblVentes</b> (Création de tableau › Nom du tableau).</p><p><b>Étape 6</b> : résultat : 5 boutiques (Bron, Caluire, Écully, Lyon Centre, Villeurbanne), 11 lignes, 2 219,45 € de CA.</p>` },

/* 9 — ACTUALISER */
{ title: 'Le mois suivant', html: `${H('Le mois suivant : Actualiser tout', 'Zéro nettoyage manuel', PATH('Données > Requêtes et connexions > Actualiser tout'))}
${VS({ y: 180, l: { t: 'Sans Power Query', c: '#DC2626', ic: '✘', items: ['Ouvrir le CSV, copier, coller', 'Rechercher/remplacer, supprimer les doublons…', '15 minutes · risque d\'oubli', 'Recommencer le mois suivant'] },
  r: { t: 'Avec Power Query', c: '#16A34A', ic: '✔', html: `<ul class="lst sm"><li>Remplacer le fichier (même nom, même structure)</li><li>${KEYS('Ctrl+Alt+F5')}</li><li>Requête, tableau, TCD, formules : <b>à jour</b></li></ul>` }, mid: '➜' })}
${STAT({ v: '1 s', t: 'pour rejouer toutes les étapes', x: 70, y: 620, w: 420, s: 3, c: '#16A34A' })}
${TIP('Le volet <b>Requêtes et connexions</b> liste les requêtes ; clic droit › Modifier pour rouvrir l\'éditeur.', { s: 4, x: 540, y: 630, w: 990 })}`,
  n: `<p><b>Étape 1</b> : la routine manuelle de chaque mois, source d'erreurs et de temps perdu.</p><p><b>Étape 2</b> : avec Power Query : on remplace le fichier source par celui du mois (même nom, même emplacement, mêmes colonnes) et on clique <b>Actualiser tout</b>. Question 1 du quiz.</p><p><b>Étape 3</b> : toute la chaîne se met à jour : la requête, le tableau tblVentes, et tout ce qui en dépend (TCD après actualisation, formules dynamiques automatiquement).</p><p><b>Étape 4</b> : Données › Requêtes et connexions affiche le volet ; clic droit sur la requête › Modifier. Pour un dossier de fichiers mensuels : Obtenir des données › À partir d'un fichier › <b>À partir d'un dossier</b> : Power Query les combine tous.</p>` },

/* 10 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX08, 1), n: `<p>Deuxième partie : les <b>matrices dynamiques</b>, disponibles dans Microsoft 365 et Excel 2021. Une seule formule renvoie plusieurs valeurs qui « débordent » dans les cellules voisines.</p>` },

/* 11 — UNIQUE + DÉBORDEMENT */
{ title: 'UNIQUE et le débordement', html: `${H('Une formule, plusieurs résultats', 'UNIQUE · TRIER · débordement (#)')}
${GX08({ x: 70, y: 190, colw: [320, 200], rh: 46, fx: { ref: 'H2', f: '=TRIER(UNIQUE(tblVentes[Boutique]))', s: 1 },
  rows: [['Boutique', 'CA'], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
  val: [['Bron', '376,00'], ['Caluire', '298,75'], ['Écully', '385,50'], ['Lyon Centre', '813,00'], ['Villeurbanne', '346,20']].flatMap(([b, c], i) => [{ r: 'A' + (i + 2), v: b, s: 2, c: '#0E1726' }, { r: 'B' + (i + 2), v: c, s: 4 }]),
  hl: [{ r: 'A2:A6', s: 2, c: '#2563EB', t: 'H2# · zone de débordement' }, { r: 'B5', s: 5, c: '#FA582D' }] }, ['H', 'I'])}
<div class="col" style="position:absolute;left:660px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Une seule formule en <b>H2</b>', 1)}
 ${CARD('<b>2 ·</b> 5 boutiques <b>débordent</b> vers le bas, sans doublon, triées A→Z', 2)}
 ${CARD('<b>3 ·</b> <span class="mono" style="font-size:20px">H2#</span> désigne <b>tout</b> le résultat, quelle que soit sa taille', 3)}
 ${CARD('<b>4 ·</b> I2 : <span class="mono" style="font-size:18px">=SOMME.SI.ENS(tblVentes[CA];tblVentes[Boutique];H2#)</span>', 4)}
 ${CARD('<b>5 ·</b> Lyon Centre : 384 + 262,50 + 166,50 = <b style="color:#FA582D">813 €</b>', 5)}
</div>`,
  n: `<p><b>Étape 1</b> : on tape une seule formule en H2 : <code>=TRIER(UNIQUE(tblVentes[Boutique]))</code> (tâche 5 du Lab 1).</p><p><b>Étape 2</b> : le résultat <b>déborde</b> (spill) sur 5 cellules : Bron, Caluire, Écully, Lyon Centre, Villeurbanne. Les cellules H3:H6 sont grisées dans la barre de formule : seule H2 contient la formule. Si une nouvelle boutique apparaît après actualisation, la liste s'allonge seule.</p><p><b>Étape 3</b> : la notation <b>H2#</b> (dièse) désigne toute la plage débordante.</p><p><b>Étape 4</b> : en I2, une SOMME.SI.ENS dont le critère est H2# : elle déborde aussi, une somme par boutique.</p><p><b>Étape 5</b> : Lyon Centre = 384 + 262,50 + 166,50 = 813 €. Les autres : Bron 376 €, Caluire 298,75 €, Écully 385,50 €, Villeurbanne 346,20 €. Autre usage : <code>=NB(UNIQUE(…))</code> compte les valeurs distinctes. Astuce : une liste déroulante dont la source est =$H$2# s'enrichit automatiquement.</p>` },

/* 12 — FILTRE */
{ title: 'FILTRE', html: `${H('FILTRE : extraire les lignes utiles', 'Ventes de plus de 150 €, triées')}
${GX08({ x: 70, y: 190, colw: [170, 210, 120], rh: 40, fx: { ref: 'K2', f: '=TRIER(FILTRE(…);6;-1)', s: 1 },
  rows: [['Boutique', 'Produit', 'CA']], nrows: 11,
  val: [['Lyon Centre', 'Baguette Tradition', '384,00'], ['Lyon Centre', 'Pain Au Chocolat', '262,50'], ['Bron', 'Tarte Aux Pommes', '222,00'], ['Écully', 'Baguette Tradition', '210,00'], ['Villeurbanne', 'Croissant', '198,00'], ['Caluire', 'Baguette Tradition', '180,00'], ['Écully', 'Pain De Campagne', '175,50'], ['Lyon Centre', 'Tarte Aux Pommes', '166,50'], ['Bron', 'Croissant', '154,00']].flatMap((r, i) => r.map((v, j) => ({ r: 'ABC'[j] + (i + 2), v, s: 2, c: j < 2 ? '#0E1726' : '' }))) }, ['K', 'L', 'M'])}
<div class="col" style="position:absolute;left:700px;right:70px;top:190px;gap:14px">
 ${CARD('<span class="mono" style="font-size:18px">=TRIER(FILTRE(tblVentes;tblVentes[CA]&gt;150);6;-1)</span><br><span style="font-size:17px;color:#6B7A90">syntaxe : FILTRE(tableau;condition;"si vide")</span>', 1)}
 ${CARD('<b>2 ·</b> 9 ventes sur 11 dépassent 150 € · <b>TRIER(…;6;-1)</b> : colonne 6 (CA), décroissant', 2)}
 ${CARD('<b>ET</b> : <span class="mono" style="font-size:18px">(tblVentes[Boutique]="Bron")*(tblVentes[CA]&gt;150)</span>', 3)}
 ${CARD('<b>OU</b> : <span class="mono" style="font-size:18px">(…="Bron")+(…="Caluire")</span>', 4)}
</div>
${TIP('Aucune ligne trouvée et pas de 3<sup>e</sup> argument → <b>#CALC!</b>', { s: 5, kind: 'warn', x: 700, y: 560, w: 830 })}`,
  n: `<p>FILTRE renvoie toutes les lignes d'un tableau qui respectent une condition, et se met à jour avec les données. C'est un filtre automatique… en formule.</p><p><b>Étape 1</b> : syntaxe : tableau ; condition ; valeur si aucun résultat.</p><p><b>Étape 2</b> : sur les 11 ventes nettoyées, 9 dépassent 150 € (Caluire Pain au chocolat 118,75 € et Villeurbanne Pain de campagne 148,20 € sont exclues). TRIER(…;6;-1) trie sur la 6<sup>e</sup> colonne de tblVentes (CA) en ordre décroissant. Pour lisibilité, la grille n'affiche que 3 des 6 colonnes.</p><p><b>Étape 3</b> : plusieurs conditions en ET : on <b>multiplie</b> les tests (comme dans SOMMEPROD, module X07).</p><p><b>Étape 4</b> : en OU : on les <b>additionne</b>.</p><p><b>Étape 5</b> : si rien ne correspond et qu'on n'a pas prévu le 3<sup>e</sup> argument, l'erreur est #CALC!. Écrivez toujours "Aucun résultat".</p>` },

/* 13 — #PROPAGATION! */
{ title: '#PROPAGATION!', html: `${H('#PROPAGATION! : la zone n\'est pas libre', 'Le piège du débordement')}
${GX08({ x: 70, y: 200, colw: [400], rh: 48, fx: { ref: 'H2', f: '=UNIQUE(tblVentes[Boutique])', s: 0 }, rows: [['Boutique'], [''], [''], ['note'], [''], ['']],
  val: [{ r: 'A2', v: '#PROPAGATION!', s: 1, c: '#DC2626' }], hl: [{ r: 'A2:A6', s: 1, c: '#DC2626', t: 'zone requise' }, { r: 'A4', s: 2, c: '#F59E0B', t: 'la cellule qui bloque' }] }, ['H'])}
${GX08({ x: 560, y: 200, colw: [400], rh: 48, fx: { ref: 'H2', f: '=UNIQUE(tblVentes[Boutique])', s: 0 }, rows: [['Boutique'], [''], [''], [''], [''], ['']],
  val: ['Lyon Centre', 'Villeurbanne', 'Caluire', 'Bron', 'Écully'].map((v, i) => ({ r: 'A' + (i + 2), v, s: 3, c: '#0E1726' })), hl: [{ r: 'A2:A6', s: 3, c: '#16A34A', t: 'zone libérée' }] }, ['H'])}
<div class="col" style="position:absolute;left:1050px;right:70px;top:200px;gap:16px">
 ${CARD('<b>1 ·</b> La formule a besoin de <b>5 cellules libres</b>', 1)}
 ${CARD('<b>2 ·</b> Une valeur (« note ») est sur le chemin', 2)}
 ${CARD('<b>3 ·</b> On la déplace : le résultat se déverse', 3)}
</div>
${TIP('Sans TRIER, UNIQUE garde l\'<b>ordre d\'apparition</b>.', { s: 4, x: 1050, y: 560, w: 480 })}`,
  n: `<p>L'erreur la plus fréquente des matrices dynamiques (question 2 du quiz).</p><p><b>Étape 1</b> : la formule UNIQUE en H2 a besoin de 5 cellules vers le bas. Excel affiche <b>#PROPAGATION!</b> (#SPILL! en anglais) et encadre en pointillés la zone requise.</p><p><b>Étape 2</b> : la cause : une cellule non vide (ici « note » en H4) — même un espace ou une cellule fusionnée bloque. Cliquer sur le losange d'avertissement › « Sélectionner les cellules obstructives ».</p><p><b>Étape 3</b> : on libère la zone : le résultat apparaît. Autre cause possible : une matrice dynamique dans un tableau structuré (non autorisé).</p><p><b>Étape 4</b> : sans TRIER, UNIQUE renvoie les valeurs dans l'ordre où elles apparaissent dans la source.</p>` },

/* 14 — LET */
{ title: 'LET', html: `${H('LET : nommer les étapes d\'une formule', 'Lisible · calculé une seule fois', PATH('Ctrl+Maj+U pour agrandir la barre de formule'))}
${CODEX08({ x: 70, y: 180, w: 760, fs: 24, lines: [['=LET('], ['  ' + N08('ca') + ';    D2:D13*E2:E13;', 1], ['  ' + N08('seuil') + '; 3000;', 2], ['  SOMME(FILTRE(' + N08('ca') + '; ' + N08('ca') + '&gt;=' + N08('seuil') + '; 0))', 3], [')']] })}
${FLOW({ x: 880, y: 180, w: 650, h: 420,
  n: { a: { x: 120, y: 70, plate: false, s: 1, html: `<rect x="10" y="30" width="220" height="80" rx="16" fill="#FAF5FF" stroke="#C026D3" stroke-width="3"/><text x="120" y="68" text-anchor="middle" font-size="22" font-weight="900" fill="#A21CAF">ca</text><text x="120" y="96" text-anchor="middle" font-size="16" fill="#33445E">12 CA en mémoire</text>` },
    b: { x: 120, y: 220, plate: false, s: 2, html: `<rect x="10" y="180" width="220" height="80" rx="16" fill="#FAF5FF" stroke="#C026D3" stroke-width="3"/><text x="120" y="218" text-anchor="middle" font-size="22" font-weight="900" fill="#A21CAF">seuil</text><text x="120" y="246" text-anchor="middle" font-size="16" fill="#33445E">3 000</text>` },
    r: { x: 500, y: 145, plate: false, s: 3, html: `<rect x="360" y="85" width="280" height="120" rx="20" fill="#ECFDF3" stroke="#16A34A" stroke-width="3"/><text x="500" y="132" text-anchor="middle" font-size="18" font-weight="700" fill="#33445E">CA des ventes ≥ seuil</text><text x="500" y="180" text-anchor="middle" font-size="40" font-weight="900" fill="#107C41">36 140</text>` } },
  l: [{ a: 'a', b: 'r', r: 'hvh', s: 3, c: '#C026D3' }, { a: 'b', b: 'r', r: 'hvh', s: 3, c: '#C026D3' }] })}
<div style="position:absolute;left:70px;right:70px;top:560px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
 ${[['📖', 'Lisible', 'des noms au lieu de plages répétées'], ['⚡', 'Rapide', '« ca » calculé une seule fois'], ['🔧', 'Maintenable', 'le seuil se change à un endroit']].map(([i, t, d], k) => `<div class="card f zoom" data-s="${k + 4}" style="display:flex;gap:14px;align-items:center;padding:16px 20px"><span style="font-size:34px">${i}</span><div><b style="font-size:22px">${t}</b><div style="font-size:18px;color:#6B7A90">${d}</div></div></div>`).join('')}
</div>`,
  n: `<p>LET déclare des <b>variables locales</b> à la formule : couples nom ; valeur, puis le calcul final en dernier argument.</p><p><b>Étape 1</b> : <code>ca</code> = la matrice des 12 CA (quantité × prix), données Datacomp du module X07.</p><p><b>Étape 2</b> : <code>seuil</code> = 3 000.</p><p><b>Étape 3</b> : le calcul final : somme des CA ≥ seuil : 3 600 + 3 400 + 6 000 + 4 760 + 3 800 + 5 700 + 4 800 + 4 080 = <b>36 140</b>. (Le 0 de FILTRE évite #CALC! si aucune vente ne dépasse le seuil.)</p><p><b>Étapes 4 à 6</b> : les trois bénéfices (question 3 du quiz). Saisie : <kbd>Alt</kbd>+<kbd>Entrée</kbd> pour aller à la ligne dans la barre de formule, <kbd>Ctrl</kbd>+<kbd>Maj</kbd>+<kbd>U</kbd> pour l'agrandir.</p><p>Version Lab 1 : <code>=LET(t;tblVentes;ca;tblVentes[CA];TRIER(FILTRE(t;ca&gt;150;"Aucune");6;-1))</code>.</p>` },

/* 15 — LAMBDA */
{ title: 'LAMBDA', html: `${H('LAMBDA : créer sa propre fonction', 'Gestionnaire de noms', PATH('Formules > Noms définis > Définir un nom'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:700px;padding:22px 26px">
 <div style="font-size:21px;font-weight:900;margin-bottom:14px">Nouveau nom</div>
 <div style="display:grid;grid-template-columns:170px 1fr;gap:14px;align-items:center;font-size:20px"><span>Nom :</span><span class="mono f" data-s="1" style="border:2px solid #CBD5E1;border-radius:6px;padding:6px 10px;font-weight:800;color:#107C41">TTC</span><span>Fait référence à :</span><span class="mono f" data-s="2" style="border:2px solid #FA582D;border-radius:6px;padding:6px 10px;font-weight:700;font-size:18px">=LAMBDA(ht;taux; ht*(1+taux))</span></div>
</div>
${GRID({ x: 70, y: 430, colw: [170, 120, 170], rh: 44, fx: { ref: 'C2', f: '=TTC(B2;$H$1)', s: 3 }, rows: [['Article', 'Prix HT', 'Prix TTC'], ['Pain spécial', 100], ['Coffret', 250], ['Panier garni', '89,90']], val: [{ r: 'C2', v: '120,00', s: 4 }, { r: 'C3', v: '300,00', s: 4 }, { r: 'C4', v: '107,88', s: 4 }] })}
<div class="col" style="position:absolute;left:820px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Un nom parlant : <b>TTC</b>', 1)}
 ${CARD('<b>2 ·</b> Paramètres <b>ht</b>, <b>taux</b> puis le calcul', 2)}
 ${CARD('<b>3 ·</b> Utilisable partout dans le classeur (H1 = 20 %)', 3)}
</div>
${TIP('<b>FILTRE, UNIQUE, LET, LAMBDA</b> n\'existent pas dans Excel 2019 et antérieur → <b>#NOM?</b> chez vos destinataires.', { s: 5, kind: 'warn', x: 820, y: 520, w: 710 })}`,
  n: `<p>LAMBDA permet de créer une fonction personnalisée <b>sans VBA</b>, enregistrée dans le Gestionnaire de noms.</p><p><b>Étape 1</b> : Formules › Noms définis › Définir un nom. Nom : TTC.</p><p><b>Étape 2</b> : Fait référence à : <code>=LAMBDA(ht;taux; ht*(1+taux))</code> : les premiers arguments sont les paramètres, le dernier le calcul.</p><p><b>Étapes 3-4</b> : on l'utilise comme n'importe quelle fonction : <code>=TTC(B2;$H$1)</code> avec H1 = 20 % → 120 ; 250 → 300 ; 89,90 → 107,88.</p><p><b>Étape 5</b> : compatibilité : ces fonctions demandent Microsoft 365 (LAMBDA) ou Excel 2021 (FILTRE, UNIQUE, LET). Vérifiez la version de vos lecteurs avant diffusion : ils verraient #NOM?.</p>` },

/* 16 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX08, 2), n: `<p>Troisième partie : les <b>macros VBA</b> (Visual Basic pour Applications). Quand une tâche répétitive ne relève ni de Power Query ni des formules (mise en forme, impression, export), on l'enregistre.</p>` },

/* 17 — ONGLET DÉVELOPPEUR */
{ title: 'L\'onglet Développeur', html: `${H('Afficher l\'onglet Développeur', 'Masqué par défaut', PATH('Fichier > Options > Personnaliser le ruban > Développeur'))}
${APPWIN({ app: 'excel', x: 70, y: 175, w: 1000, h: 180, title: 'tournees_semaine.xlsx', tabs: ['Fichier', 'Accueil', 'Insertion', 'Formules', 'Données', 'Révision', 'Affichage', 'Développeur'], tab: 'Développeur',
  groups: [['Code', ['🧩 Visual Basic', '▶ Macros', '⏺ Enregistrer une macro', '⧉ Références relatives', '⚠ Sécurité des macros']], ['Compléments', ['🔌 Compléments']]],
  hot: { 'tab:Développeur': 1, '⏺ Enregistrer une macro': 2, '▶ Macros': 3, '🧩 Visual Basic': 4, '⚠ Sécurité des macros': 5 } })}
<div class="col" style="position:absolute;left:1110px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 ·</b> Cocher <b>Développeur</b> dans les options', 1)}
 ${CARD('<b>2 ·</b> Enregistrer une macro', 2)}
 ${CARD(`<b>3 ·</b> Macros ${KEYS('Alt+F8')}`, 3)}
 ${CARD(`<b>4 ·</b> Visual Basic ${KEYS('Alt+F11')}`, 4)}
 ${CARD('<b>5 ·</b> Sécurité des macros', 5)}
</div>
${FLOW({ x: 70, y: 420, w: 1000, h: 230,
  n: { r: { x: 120, y: 100, ic: 'user', sz: 70, l: 'Enregistrer', s: 2 }, c: { x: 500, y: 100, ic: 'macro', sz: 70, l: 'Code VBA (Module1)', s: 4 }, x: { x: 880, y: 100, ic: 'xlsx', sz: 70, l: 'Exécuter', s: 3 } },
  l: [{ a: 'r', b: 'c', s: 4 }, { a: 'c', b: 'x', s: 4 }],
  p: [{ s: 4, keep: true, seg: [{ via: ['r', 'c'], lab: 'actions → code', t: 1.4 }, { via: ['c', 'x'], lab: 'rejouer', t: 1.2 }] }] })}`,
  n: `<p><b>Étape 1</b> : l'onglet Développeur est masqué par défaut : Fichier › Options › Personnaliser le ruban › cocher <b>Développeur</b> (sur Mac : Excel › Préférences › Ruban et barre d'outils).</p><p><b>Étape 2</b> : <b>Enregistrer une macro</b> : Excel traduit chacune de vos actions en code VBA. (Aussi accessible par Affichage › Macros, ou le petit bouton dans la barre d'état.)</p><p><b>Étape 3</b> : <b>Macros</b> (<kbd>Alt</kbd>+<kbd>F8</kbd>) : liste, exécuter, modifier, supprimer.</p><p><b>Étape 4</b> : <b>Visual Basic</b> (<kbd>Alt</kbd>+<kbd>F11</kbd>) : l'éditeur où l'on lit et modifie le code.</p><p><b>Étape 5</b> : <b>Sécurité des macros</b> : le Centre de gestion de la confidentialité (voir la diapo sécurité).</p><p>Le schéma en bas : on enregistre une fois, le code est stocké dans un module, on le rejoue autant de fois que nécessaire.</p>` },

/* 18 — ENREGISTRER */
{ title: 'Enregistrer une macro', html: `${H('Enregistrer : Excel écrit le code pour vous', 'Développeur › Code › Enregistrer une macro')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:640px;padding:22px 26px">
 <div style="font-size:21px;font-weight:900;margin-bottom:14px">Enregistrer une macro</div>
 <div style="display:flex;flex-direction:column;gap:12px;font-size:19px">
  <div>Nom de la macro :<div class="mono f" data-s="1" style="border:2px solid #FA582D;border-radius:6px;padding:6px 10px;font-weight:800;margin-top:4px">MiseEnFormeTournees</div></div>
  <div>Touche de raccourci : <span class="mono" style="border:2px solid #CBD5E1;border-radius:6px;padding:4px 10px">Ctrl+ ␣</span></div>
  <div>Enregistrer la macro dans :<div class="f" data-s="2" style="border:2px solid #CBD5E1;border-radius:6px;padding:6px 10px;font-weight:700;margin-top:4px">Ce classeur ▾</div></div>
  <div>Description :<div style="border:2px solid #CBD5E1;border-radius:6px;padding:6px 10px;margin-top:4px;color:#6B7A90">Met en forme l'extraction du lundi</div></div>
 </div>
</div>
${PROC([{ p: 'Développeur > Enregistrer une macro', t: 'Nom <b>sans espace</b> ni accent, commençant par une lettre' }, { t: 'Effectuez les actions : en-tête gras sur fond bleu, ajuster les colonnes, format 1 décimale' }, { p: 'Développeur > Arrêter l\'enregistrement', t: 'Sinon tout ce que vous faites continue d\'être enregistré !' }], { x: 760, y: 180, w: 770, s0: 3 })}
${TIP('<b>Références relatives</b> : activez-les avant d\'enregistrer si la macro doit agir à partir de la cellule active.', { s: 6, x: 70, y: 640, w: 1460 })}`,
  n: `<p>Lab 2 : Transports Delmas, l'extraction des tournées du lundi.</p><p><b>Étape 1</b> : le nom : MiseEnFormeTournees (pas d'espace, pas de tiret ; le tiret bas est accepté). Évitez les raccourcis Ctrl+lettre déjà utilisés (Ctrl+C…).</p><p><b>Étape 2</b> : stocker dans « Ce classeur » (ou le Classeur de macros personnelles pour l'avoir dans tous les fichiers).</p><p><b>Étapes 3-4</b> : OK puis on réalise les actions, calmement : chaque clic est enregistré, y compris les erreurs.</p><p><b>Étape 5</b> : <b>Arrêter l'enregistrement</b>, indispensable.</p><p><b>Étape 6</b> : par défaut, l'enregistreur note des adresses absolues (A1:F1). Avec « Utiliser les références relatives », il note des déplacements relatifs à la cellule active.</p>` },

/* 19 — LIRE LE CODE */
{ title: 'Lire le code', html: `${H('Lire le code généré', 'Alt+F11 › Modules › Module1')}
${CODEX08({ x: 70, y: 175, w: 940, fs: 20, lines: [[K08('Sub') + ' MiseEnFormeRapport()'], [C08("    ' Met en forme l'en-tête et ajuste les colonnes"), 1], ['    ' + K08('With') + ' Range(' + S08('"A1:F1"') + ')', 2], ['        .Font.Bold = ' + K08('True'), 2], ['        .Interior.Color = RGB(31, 78, 121)', 2], ['        .Font.Color = vbWhite', 2], ['    ' + K08('End With'), 2], ['    Columns(' + S08('"A:F"') + ').AutoFit', 3], ['    Range(' + S08('"F2:F"') + ' &amp; Cells(Rows.Count, ' + S08('"A"') + ').End(xlUp).Row) _', 4], ['        .NumberFormat = ' + S08('"#,##0.00 €"'), 4], ['    MsgBox ' + S08('"Rapport mis en forme."'), 5], [K08('End Sub')]] })}
<div class="col" style="position:absolute;left:1050px;right:70px;top:180px;gap:14px">
 ${CARD('<b>Sub … End Sub</b> : une macro = une procédure', 0)}
 ${CARD('<b>1 ·</b> <span style="color:#16A34A">\'</span> commentaire (non exécuté)', 1)}
 ${CARD('<b>2 ·</b> <b>With</b> : plusieurs propriétés d\'un même objet', 2)}
 ${CARD('<b>3 ·</b> Objet<b>.</b>Méthode : AutoFit', 3)}
 ${CARD('<b>4 ·</b> Dernière ligne remplie : <span class="mono" style="font-size:16px">End(xlUp).Row</span>', 4)}
 ${CARD('<b>5 ·</b> MsgBox : un message à l\'utilisateur', 5)}
</div>`,
  n: `<p>On ouvre l'éditeur (<kbd>Alt</kbd>+<kbd>F11</kbd>) : explorateur de projets à gauche, le code est dans <b>Modules › Module1</b>.</p><p>La grammaire VBA se résume à : <b>Objet.Propriété = valeur</b> et <b>Objet.Méthode</b>.</p><p><b>Étape 1</b> : l'apostrophe introduit un commentaire (en vert).</p><p><b>Étape 2</b> : With … End With évite de répéter Range("A1:F1") : gras, couleur de fond RGB, police blanche.</p><p><b>Étape 3</b> : Columns("A:F").AutoFit ajuste la largeur.</p><p><b>Étape 4</b> : la formule magique pour trouver la dernière ligne remplie : partir de la dernière ligne de la feuille et « remonter » (Ctrl+Flèche haut) : la macro s'adapte au nombre de lignes. Le « _ » permet de couper une ligne trop longue. Le format s'écrit à l'anglaise : # ##0,00 € s'écrit "#,##0.00 €".</p><p><b>Étape 5</b> : MsgBox affiche un message.</p><p>Démo : <kbd>F8</kbd> exécute pas à pas (ligne jaune) en gardant Excel visible à côté : le meilleur moyen de comprendre.</p>` },

/* 20 — NETTOYER LE CODE */
{ title: 'Nettoyer le code', html: `${H('Supprimer les .Select inutiles', 'Code enregistré → code propre')}
${CODEX08({ x: 70, y: 180, w: 700, fs: 20, lines: [[C08("' Enregistré")], ['Range(' + S08('"A1:F1"') + ').<span style="background:#7F1D1D">Select</span>'], ['<span style="background:#7F1D1D">Selection</span>.Font.Bold = ' + K08('True')], ['Columns(' + S08('"A:F"') + ').<span style="background:#7F1D1D">Select</span>'], ['<span style="background:#7F1D1D">Selection</span>.Columns.AutoFit'], ['Range(' + S08('"A1"') + ').<span style="background:#7F1D1D">Select</span>']] })}
<div class="f" data-s="1" style="position:absolute;left:795px;top:300px;font-size:54px;font-weight:900;color:#FA582D">➜</div>
${CODEX08({ x: 870, y: 180, w: 660, fs: 20, s: 1, lines: [[C08("' Nettoyé")], ['Range(' + S08('"A1:F1"') + ').Font.Bold = ' + K08('True')], ['Columns(' + S08('"A:F"') + ').AutoFit']] })}
<div style="position:absolute;left:870px;top:420px;right:70px;display:flex;flex-direction:column;gap:14px">
 ${CARD('<b>Plus court</b> : 5 lignes → 2', 2)}${CARD('<b>Plus rapide</b> : pas de déplacement à l\'écran', 2)}${CARD('<b>Plus robuste</b> : ne dépend pas de la sélection', 3)}
</div>
${TIP('Testez toujours sur une <b>copie</b> : Ctrl+Z ne peut pas annuler une macro.', { s: 4, kind: 'warn', x: 70, y: 520, w: 700 })}`,
  n: `<p>L'enregistreur imite la souris : il sélectionne puis agit. Le code est verbeux.</p><p><b>Étape 1</b> : on fusionne « Sélectionner » + « Selection.action » en une seule instruction sur l'objet : <code>Range("A1:F1").Font.Bold = True</code>. C'est la tâche 3 du Lab 2.</p><p><b>Étapes 2-3</b> : bénéfices : code plus court, plus rapide (l'écran ne bouge pas), plus fiable (le résultat ne dépend pas de ce qui était sélectionné au lancement).</p><p><b>Étape 4</b> : règle de sécurité : l'exécution d'une macro <b>vide la pile d'annulation</b> : Ctrl+Z ne revient pas en arrière (question 5 du quiz). Toujours tester sur une copie du fichier.</p>` },

/* 21 — BOUCLE FOR + MSGBOX */
{ title: 'Boucle For et MsgBox', html: `${H('Ajouter une boucle : L/100 km', 'Lab 2 · Transports Delmas')}
${CODEX08({ x: 70, y: 175, w: 780, fs: 18, lines: [[K08('Dim') + ' derniere ' + K08('As Long') + ', i ' + K08('As Long') + ', totalKm ' + K08('As Double')], ['derniere = Cells(Rows.Count, ' + S08('"A"') + ').End(xlUp).Row'], ['Range(' + S08('"G1"') + ').Value = ' + S08('"L/100 km"'), 1], [K08('For') + ' i = 2 ' + K08('To') + ' derniere', 2], ['    Cells(i, ' + S08('"G"') + ').Value = Cells(i, ' + S08('"F"') + ').Value _', 2], ['        / Cells(i, ' + S08('"D"') + ').Value * 100', 2], ['    totalKm = totalKm + Cells(i, ' + S08('"D"') + ').Value', 3], [K08('Next') + ' i', 2], ['Range(' + S08('"F2:G"') + ' &amp; derniere).NumberFormat = ' + S08('"0.0"'), 4], ['MsgBox ' + S08('"Total de la semaine : "') + ' &amp; totalKm &amp; ' + S08('" km"'), 5]] })}
${GRID({ x: 900, y: 175, colw: [70, 70, 90, 110], rh: 37, rows: [['Tour.', 'Km', 'L', 'L/100 km'], ['T01', 182, '21,4'], ['T02', 145, '17,9'], ['T03', 210, '25,8'], ['T04', 168, '19,6'], ['T05', 96, '11,8'], ['T06', 233, '27,9'], ['T07', 158, '18,7'], ['T08', 121, '14,2'], ['T09', 187, '22,5'], ['T10', 204, '24,1']],
  val: ['11,8', '12,3', '12,3', '11,7', '12,3', '12,0', '11,8', '11,7', '12,0', '11,8'].map((v, i) => ({ r: 'D' + (i + 2), v, s: 4 })) }).replace(/>([A-D])<\/span>/g, (m, L) => '>' + { A: 'A', B: 'D', C: 'F', D: 'G' }[L] + '</span>')}
<div class="f zoom" data-s="5" style="position:absolute;left:250px;top:620px;width:440px;background:#fff;border-radius:10px;box-shadow:0 30px 60px -20px rgba(14,23,38,.5);font-family:'Segoe UI',sans-serif;overflow:hidden"><div style="padding:8px 14px;background:#F1F5F9;font-size:16px;font-weight:700">Microsoft Excel</div><div style="padding:18px;font-size:22px">Total de la semaine : <b>1704 km</b></div><div style="padding:0 14px 12px;text-align:right"><span style="padding:6px 24px;border:2px solid #2563EB;border-radius:6px;font-size:17px">OK</span></div></div>`,
  n: `<p>On enrichit la macro à la main (tâche 4 du Lab 2).</p><p><b>Départ</b> : on déclare les variables (Dim) et on calcule la dernière ligne remplie.</p><p><b>Étape 1</b> : un en-tête en G1.</p><p><b>Étape 2</b> : la boucle <b>For i = 2 To derniere … Next i</b> parcourt chaque ligne de données : consommation = litres / km × 100. Cells(ligne, colonne) désigne une cellule par ses coordonnées.</p><p><b>Étape 3</b> : on cumule les km dans totalKm.</p><p><b>Étape 4</b> : format nombre à une décimale. En VBA il s'écrit à l'anglaise <code>"0.0"</code>, Excel l'affiche avec une virgule. T01 : 21,4 / 182 × 100 = 11,76 → <b>11,8</b> L/100 km.</p><p><b>Étape 5</b> : le MsgBox : <b>1 704 km</b> au total (182 + 145 + 210 + 168 + 96 + 233 + 158 + 121 + 187 + 204). Les vraies colonnes D, F, G sont rappelées dans les en-têtes de la grille.</p>` },

/* 22 — SÉCURITÉ ET .XLSM */
{ title: 'Sécurité et .xlsm', html: `${H('Enregistrer en .xlsm, ouvrir avec prudence', 'Sécurité des macros')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px">
 <div class="card f zoom" data-s="1" style="border-top:6px solid #DC2626;text-align:center"><svg viewBox="0 0 64 64" style="width:84px;height:84px"><use href="#i-xlsx"/></svg><div style="font-size:30px;font-weight:900">.xlsx</div><div style="font-size:19px;color:#DC2626;font-weight:700">le code VBA est <b>supprimé</b></div></div>
 <div class="card f zoom" data-s="2" style="border-top:6px solid #16A34A;text-align:center"><svg viewBox="0 0 64 64" style="width:84px;height:84px"><use href="#i-macro"/></svg><div style="font-size:30px;font-weight:900">.xlsm</div><div style="font-size:19px;color:#16A34A;font-weight:700">Classeur Excel (prenant en charge les macros)</div></div>
 <div class="card f zoom" data-s="3" style="border-top:6px solid #F59E0B;text-align:center"><svg viewBox="0 0 64 64" style="width:84px;height:84px"><use href="#i-mail"/></svg><div style="font-size:30px;font-weight:900">Pièce jointe ?</div><div style="font-size:19px;color:#B45309;font-weight:700">macros bloquées par défaut</div></div>
</div>
<div class="f" data-s="4" style="position:absolute;left:70px;right:70px;top:500px;display:flex;align-items:center;gap:16px;padding:14px 20px;border-radius:10px;background:#FDE7E9;border:1px solid #F1B0B7;font-family:'Segoe UI',sans-serif;font-size:19px"><b style="color:#A4262C">RISQUE DE SÉCURITÉ</b> Microsoft a bloqué l'exécution des macros, car la source de ce fichier n'est pas fiable. <span style="margin-left:auto;padding:6px 14px;border:1px solid #A4262C;border-radius:6px;white-space:nowrap">En savoir plus</span></div>
${TIP('N\'activez <b>jamais</b> les macros d\'un fichier reçu dont vous n\'êtes pas sûr : premier vecteur de logiciels malveillants dans Office.', { s: 5, kind: 'warn', x: 70, y: 610, w: 1460 })}`,
  n: `<p><b>Étape 1</b> : enregistrer une macro dans un .xlsx : Excel prévient que le projet VB ne peut pas être enregistré ; si l'on confirme, le code est <b>perdu</b>.</p><p><b>Étape 2</b> : Fichier › Enregistrer sous › Type : <b>Classeur Excel (prenant en charge les macros) (*.xlsm)</b>. Question 4 du quiz.</p><p><b>Étape 3</b> : les fichiers venant d'Internet ou reçus par e-mail sont marqués : leurs macros sont bloquées.</p><p><b>Étape 4</b> : le bandeau rouge « RISQUE DE SÉCURITÉ » de Microsoft 365. Pour un fichier interne de confiance : le placer dans un <b>emplacement approuvé</b> (Centre de gestion de la confidentialité) ou faire signer les macros par l'informatique.</p><p><b>Étape 5</b> : la règle absolue : jamais d'activation de macros sur un fichier inattendu, même d'un expéditeur connu (sa boîte peut être compromise).</p>` },

/* 23 — RÉCAP */
{ title: 'Récap', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: '1 clic', hsub: 'au lieu de 15 min', hk: 'MODULE 08',
  items: [{ ic: '🧹', t: 'Power Query', d: 'Importer, nettoyer en étapes appliquées, Fermer et charger' }, { ic: '🔄', t: 'Actualiser tout', d: 'Nouveau fichier, même structure : tout est rejoué' }, { ic: '🌊', t: 'FILTRE · UNIQUE · TRIER', d: 'Une formule déborde ; H2# ; #PROPAGATION! = zone occupée' }, { ic: '🏷️', t: 'LET · LAMBDA', d: 'Nommer les calculs, créer ses fonctions (Microsoft 365)' }, { ic: '🤖', t: 'Macro VBA', d: 'Enregistrer, nettoyer les .Select, tester sur copie, .xlsm' }] }),
  n: `<p>Cinq points. Question de synthèse au groupe : « Pour une tâche répétitive, que choisir ? » Données à importer/nettoyer → Power Query ; calcul ou liste qui doit suivre les données → matrices dynamiques ; actions sur la mise en forme, l'impression, des fichiers → macro.</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Clavier')}
${KEYCARDS([{ k: 'Alt+F11', d: 'Ouvrir l\'éditeur Visual Basic' }, { k: 'Alt+F8', d: 'Afficher la liste des macros' }, { k: 'F5', d: 'Exécuter la macro (éditeur VBA)' }, { k: 'F8', d: 'Exécuter pas à pas (éditeur VBA)' }, { k: 'Ctrl+Alt+F5', d: 'Actualiser toutes les requêtes' }, { k: 'Ctrl+Maj+U', d: 'Agrandir la barre de formule (LET)' }], { cols: 3, y: 200 })}
${TIP('Dans l\'éditeur : <b>F8</b> ligne par ligne avec Excel visible à côté = la meilleure façon de comprendre une macro.', { s: 7, kind: 'key', x: 70, y: 620, w: 1000 })}`,
  n: `<p>Attention : <kbd>F5</kbd> et <kbd>F8</kbd> n'ont ce sens que <b>dans l'éditeur VBA</b> (dans Excel, F5 = Atteindre, F8 = étendre la sélection).</p>` },

/* 25 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'excel', mod: 'x08', lab: 0, title: 'Lab 1 — Power Query et matrices dynamiques', tasks: ['Importer <b>ventes_fournil.csv</b> › Transformer les données', 'Supprimer les espaces · Majuscule à chaque mot', 'Supprimer lignes vides et doublons · vérifier les types', 'Colonne CA · Fermer et charger dans <b>tblVentes</b>', '<span class="mono">TRIER(UNIQUE(…))</span> + <b>SOMME.SI.ENS</b> sur H2#', '<b>LET</b> + <b>FILTRE</b> &gt; 150 € · Actualiser tout'] }),
  n: `<p>À réaliser dans Excel 365. Résultats : 11 lignes après nettoyage ; boutiques Bron, Caluire, Écully, Lyon Centre, Villeurbanne ; Lyon Centre = 813 € ; FILTRE &gt; 150 € → 9 lignes, la première à 384 €. Puis modifier une ligne du CSV, enregistrer, Actualiser tout.</p>` },

/* 26 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'excel', mod: 'x08', lab: 1, title: 'Lab 2 — Le rapport en un clic (macro VBA)', tasks: ['Ouvrir <b>tournees_semaine.csv</b> · afficher <b>Développeur</b>', 'Enregistrer <b>MiseEnFormeTournees</b> puis Arrêter', 'Alt+F11 : lire Module1, supprimer les <b>.Select</b>', 'Boucle <b>For</b> : L/100 km en G · <b>MsgBox</b> total km', 'Tester (Alt+F8) puis enregistrer en <b>.xlsm</b>'] }),
  n: `<p>Résultat attendu : MsgBox « Total de la semaine : 1704 km » ; T01 = 11,8 L/100 km. Code de solution dans la plateforme de labs. Rappeler de tester sur un fichier fraîchement ouvert.</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Le mois suivant, le CSV source a été remplacé par un nouveau (même structure). Que faire ?', o: ['Refaire toutes les étapes Power Query', 'Données › Actualiser tout', 'Copier-coller le nouveau CSV dans la feuille', 'Recréer le tableau structuré'], a: [1], e: 'Les étapes appliquées sont mémorisées : Actualiser tout les rejoue sur la nouvelle source.' },
  { q: 'Une formule =UNIQUE(B2:B50) affiche #PROPAGATION!. Pourquoi ?', o: ['La plage contient des doublons', 'Des cellules non vides bloquent la zone de débordement', 'UNIQUE n\'existe pas en français', 'La plage n\'est pas triée'], a: [1], e: 'Le résultat a besoin de cellules libres pour se déverser ; une valeur présente dans la zone provoque #PROPAGATION!.' },
  { q: 'Quel est l\'intérêt principal de LET ?', o: ['Créer une macro sans VBA', 'Nommer des calculs intermédiaires pour une formule plus lisible et calculée une seule fois', 'Protéger une cellule', 'Rendre une formule compatible avec Excel 2010'], a: [1], e: 'LET déclare des variables locales à la formule : lisibilité accrue et pas de calcul répété.' },
  { q: 'Dans quel format enregistrer un classeur contenant une macro ?', o: ['.xlsx', '.xlsm', '.csv', '.xltx'], a: [1], e: 'Le format .xlsm conserve le code VBA ; un .xlsx le supprime.' },
  { q: 'Vous lancez une macro qui efface une colonne par erreur. Ctrl+Z…', o: ['Annule la macro entière', 'Annule uniquement la dernière ligne de code', 'Ne fonctionne pas : les actions d\'une macro ne s\'annulent pas', 'Supprime la macro'], a: [2], e: 'L\'exécution d\'une macro vide la pile d\'annulation : toujours tester sur une copie.' },
  { q: 'Que désigne H2# ?', o: ['La cellule H2 en absolu', 'Toute la plage débordante qui part de H2', 'Le numéro de ligne de H2', 'Une erreur'], a: [1], e: 'L\'opérateur # référence tout le résultat d\'une matrice dynamique, quelle que soit sa taille.' },
] ); }, n: `<p>Réponses : 1) Actualiser tout · 2) zone de débordement occupée · 3) nommer les calculs · 4) .xlsm · 5) ne s'annule pas · 6) toute la plage débordante.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X08', html: END(), n: `<p>Fin du parcours Excel ! Vous savez désormais croiser, analyser, piloter et automatiser vos données. Proposez au groupe de choisir une tâche répétitive de leur quotidien et de l'automatiser avec l'un des trois outils vus aujourd'hui.</p>` },
] };
