/* ===================== MODULE X01 — Premiers pas : l'interface, la saisie et les premières formules ===================== */
const SECSX01 = ['L\'interface d\'Excel', 'Saisir et formater', 'Premières formules'];

/* ---- helpers locaux X01 : GRID enrichie (cellules superposées, cadres au-dessus, 2e formule, SVG de recopie) ---- */
function X01G(o) {
  const cw = c => (o.colw && o.colw[c]) || o.cw || 120, RH = o.rh || 38;
  const X = c => 46 + Array.from({ length: c }, (_, i) => cw(i)).reduce((a, b) => a + b, 0);
  const P = r => { const m = /^([A-Z])(\d+)$/.exec(r); return { c: m[1].charCodeAt(0) - 65, r: +m[2] }; };
  const B = rg => { const [a, b] = rg.split(':'), p = P(a), q = P(b || a); return { x: X(Math.min(p.c, q.c)), y: RH * Math.min(p.r, q.r), w: X(Math.max(p.c, q.c) + 1) - X(Math.min(p.c, q.c)), h: RH * (Math.abs(q.r - p.r) + 1) }; };
  const at = (s, d, cls = '') => s ? [`f ${cls}`, `data-s="${s}"`, ''] : [`a fade ${cls}`, '', `--d:${d ?? .4}s;`];
  const cells = (o.cells || []).map(q => { const b = B(q.r), [c, a, s0] = at(q.s, q.d0);
    return `<div class="${c}" ${a} style="${s0}position:absolute;left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;display:flex;align-items:center;justify-content:${q.al || 'flex-end'};padding:0 10px;font-size:${q.fs || 18}px;font-weight:${q.fw || 700};background:${q.bg || '#fff'};color:${q.c || '#0E1726'};border-left:1px solid #EEF0F3;white-space:nowrap;overflow:hidden;${q.d ? `transition-delay:${q.d}s;` : ''}${q.st || ''}">${q.v ?? ''}</div>`; }).join('');
  const hl2 = (o.hl2 || []).map(q => { const b = B(q.r); return `<div class="xg-hl f zoom" data-s="${q.s}" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;--hc:${q.c || '#2563EB'}">${q.t ? `<i>${q.t}</i>` : ''}</div>`; }).join('');
  const fill = o.fill ? (() => { const b = B(o.fill.r); return `<g class="f" data-s="${o.fill.s}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="#107C41" fill-opacity=".08" stroke="#107C41" stroke-width="2" stroke-dasharray="7 5"/><path d="M${b.x + b.w} ${b.y + RH} V${b.y + b.h}" stroke="#107C41" stroke-width="5" class="draw" pathLength="1" style="--d:.1s"/><g transform="translate(${b.x + b.w} ${b.y + b.h})"><path d="M-12 0H12M0 -12V12" stroke="#0E1726" stroke-width="4"/></g></g>`; })() : '';
  const svg = (o.svg || fill) ? `<svg style="position:absolute;left:0;top:0;width:${X(o.cols || 6) + 2}px;height:${RH * ((o.nrows || (o.rows || []).length + 1))}px;overflow:visible;pointer-events:none">${fill}${o.svg ? o.svg({ B, X, RH }) : ''}</svg>` : '';
  let g = GRID(o).replace(/<\/div><\/div>$/, cells + hl2 + svg + '</div></div>');
  if (o.fx2) g = g.replace('<div class="xg-fx">', '<div class="xg-fx" style="position:relative">').replace('</span></div><div class="xg-grid"', `</span>${o.fx2.map(q => `<span class="f" data-s="${q.s}" style="position:absolute;inset:0;background:#fff;display:flex;align-items:center;gap:10px;padding:0 10px;translate:0 0;filter:none"><span class="xg-nm">${q.ref}</span><em>fx</em><span class="xg-f"><b class="tw f" data-s="${q.s}" style="--n:${q.f.length}">${q.f}</b></span></span>`).join('')}</div><div class="xg-grid"`);
  return g;
}
/* barre d'état Excel */
const X01SB = (html, o = {}) => `<div class="${o.s ? 'f' : 'a fade'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : '--d:.4s;'}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;height:40px;display:flex;align-items:center;justify-content:flex-end;gap:26px;padding:0 18px;background:#F3F4F6;border:1px solid #D9DEE5;border-radius:0 0 10px 10px;font:600 17px 'Segoe UI',var(--font);color:#33445E">${html}</div>`;
/* données du lab « séminaire » */
const X01ROWS = [['Poste', 'Quantité', 'Prix unitaire', 'Total'], ['Location salle', 1, '1 200,00 €', ''], ['Traiteur déjeuner', 45, '28,00 €', ''], ['Pause café', 90, '4,50 €', ''], ['Vidéoprojecteur', 2, '85,00 €', ''], ['Hébergement', 20, '96,00 €', ''], ['Navette autocar', 3, '350,00 €', ''], ['Badges imprimés', 50, '1,20 €', ''], ['Animateur', 1, '900,00 €', '']];
const X01TOT = ['1 200', '1 260', '405', '170', '1 920', '1 050', '60', '900'];

window.MODULE = { code: 'X01', title: 'Premiers pas : l\'interface, la saisie et les premières formules', short: 'Premiers pas Excel', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Premiers pas', html: TITLE({ mod: 'EXCEL · MODULE 01 · DÉBUTANT', title: 'Premiers pas dans <span class="grad">Excel</span>', sub: '« Se repérer, saisir proprement, écrire ses premières formules »', agenda: SECSX01, art: APPART('excel') }),
  n: `<p>Bienvenue dans le premier module Excel. Durée indicative : <b>50 minutes</b>, dont la moitié en pratique.</p><p>Fil rouge du module : le <b>budget du séminaire commercial de Novalis</b>, une PME de 40 salariés. Les devis sont saisis, il faut calculer les totaux et vérifier que l'enveloppe de 7 500 € est respectée. On retrouvera exactement ce tableau dans le lab.</p><p>Question d'ouverture au groupe : « Qui utilise déjà Excel ? Pour quoi faire ? Qui calcule encore à la calculatrice avant de taper le résultat dans Excel ? »</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Se repérer dans l\'<b>interface</b> : ruban, zone Nom, barre de formule, feuilles', 'Saisir et corriger des <b>textes, nombres et dates</b>', 'Appliquer un <b>format de nombre</b> : monétaire, pourcentage, date', 'Écrire une formule avec <b>+ − * /</b>', 'Utiliser <b>SOMME</b> et <b>MOYENNE</b>']),
  n: `<p>Cinq objectifs concrets. À la fin du module, les participants doivent être capables de construire seuls un petit budget qui se recalcule tout seul.</p><p>Insistez sur l'idée maîtresse du module : <b>Excel calcule avec des références, pas avec des valeurs recopiées</b>. Tout le reste de la formation repose là-dessus.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX01, 0), n: `<p>Première partie : se repérer. Avant de calculer, il faut savoir <b>où</b> l'on est et <b>ce que</b> l'on regarde.</p>` },

/* 4 — CLASSEUR, FEUILLES, CELLULES */
{ title: 'Classeur, feuilles, cellules', html: `${H('Classeur, feuilles et cellules', 'Le vocabulaire de base')}
${X01G({ x: 70, y: 180, cols: 5, colw: [120, 120, 120, 120, 120], rh: 44, rows: [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']], head: false,
  hl2: [{ r: 'B1:B6', s: 2, c: '#2563EB' }, { r: 'A3:E3', s: 3, c: '#7C3AED' }, { r: 'B3', s: 4, c: '#FA582D' }],
  cells: [{ r: 'B3', v: 'B3', s: 4, bg: '#FFF1EB', c: '#C2410C', al: 'center', fs: 22, fw: 900 }] })}
<div class="a fade" style="--d:.4s;position:absolute;left:70px;top:494px;width:648px;height:44px;display:flex;align-items:flex-end;gap:2px;padding-left:10px;background:#F3F4F6;border:1px solid #D9DEE5;border-radius:0 0 10px 10px;font:600 16px 'Segoe UI',var(--font)">
 ${['Budget', 'Planning', 'Contacts'].map((t, i) => `<span style="padding:8px 16px;border-radius:0 0 8px 8px;${i === 0 ? 'background:#fff;color:#107C41;font-weight:800;box-shadow:inset 0 3px 0 #107C41' : 'color:#33445E'}">${t}</span>`).join('')}<span style="padding:8px 12px;color:#6B7A90">⊕</span></div>
<div class="f" data-s="1" style="position:absolute;left:70px;top:560px;width:648px">${PATH('Séminaire.xlsx > Budget > B3')}</div>
${STAT({ v: '1 classeur', t: '= un fichier .xlsx, avec plusieurs <strong>feuilles</strong> (onglets en bas)', x: 790, y: 180, w: 740, s: 1, c: '#107C41' })}
${STAT({ v: '16 384', t: 'colonnes, de <strong>A</strong> à <strong>XFD</strong>', x: 790, y: 330, w: 360, s: 2, c: '#2563EB' })}
${STAT({ v: '1 048 576', t: 'lignes, numérotées de 1 à 1 048 576', x: 1170, y: 330, w: 360, s: 3, c: '#7C3AED' })}
${STAT({ v: 'B3', t: 'cellule = colonne <strong>B</strong> + ligne <strong>3</strong> : c\'est sa <strong>référence</strong>', x: 790, y: 480, w: 740, s: 4, c: '#FA582D' })}
${TIP('La référence d\'une cellule, c\'est son <b>adresse</b> : on calcule avec des adresses, pas avec des valeurs.', { s: 5, x: 790, y: 650, w: 740 })}`,
  n: `<p><b>Étape 1</b> : un fichier Excel est un <b>classeur</b> (.xlsx). Il contient des <b>feuilles</b>, les onglets en bas de l'écran : Budget, Planning, Contacts. Montrez en démo : clic droit sur un onglet → Renommer, Couleur d'onglet, Insérer.</p><p><b>Étape 2</b> : les <b>colonnes</b> sont désignées par des lettres, de A à XFD, soit 16 384 colonnes.</p><p><b>Étape 3</b> : les <b>lignes</b> sont numérotées de 1 à 1 048 576.</p><p><b>Étape 4</b> : l'intersection est une <b>cellule</b>, repérée par sa référence : <b>B3</b> = colonne B, ligne 3. Toujours la lettre d'abord, le chiffre ensuite.</p><p><b>Étape 5</b> : message clé du module, à répéter souvent : on calcule avec des <b>adresses</b> de cellules.</p><p>Question au groupe : « Quelle est la référence de la cellule située 2 colonnes à droite de B3 ? » (D3).</p>` },

/* 5 — L'INTERFACE */
{ title: 'L\'interface d\'Excel 365', html: `${H('L\'interface d\'Excel 365', 'Se repérer')}
${APPWIN({ app: 'excel', x: 70, y: 170, w: 960, h: 640, title: 'Séminaire.xlsx', tab: 'Accueil',
  groups: [['Presse-papiers', ['📋 Coller', '✂', '⧉']], ['Police', ['Aptos ▾', '11 ▾', 'G', 'I', 'S']], ['Alignement', ['≡', '☰', '⇥']], ['Nombre', ['Standard ▾', '€', '%']], ['Édition', ['Σ Somme ▾']]],
  hot: { 'tab:Accueil': 1 },
  body: X01G({ inwin: true, cols: 4, colw: [230, 110, 150, 120], rh: 36, rows: X01ROWS.slice(0, 8), sel: 'D2', fx: { ref: 'D2', f: '=B2*C2', s: 3 } })
    .replace('<span class="xg-nm">D2</span>', '<span class="xg-nm" style="position:relative">D2<em class="ow-hot f zoom" data-s="2"><b>2</b></em></span>')
    .replace('<span class="xg-f">', '<span class="xg-f" style="position:relative;overflow:visible">') +
   `<div style="position:absolute;left:0;right:0;bottom:36px;height:38px;display:flex;align-items:flex-end;gap:2px;padding-left:12px;background:#F3F4F6;border-top:1px solid #D9DEE5;font:600 15px 'Segoe UI',sans-serif"><span style="position:relative;padding:7px 16px;background:#fff;color:#107C41;font-weight:800;box-shadow:inset 0 3px 0 #107C41">Budget<em class="ow-hot f zoom" data-s="4"><b>4</b></em></span><span style="padding:7px 16px;color:#33445E">Planning</span><span style="padding:7px 12px;color:#6B7A90">⊕</span></div>
   <div style="position:absolute;left:0;right:0;bottom:0;height:36px;display:flex;align-items:center;justify-content:flex-end;gap:22px;padding:0 16px;background:#107C41;color:#fff;font:600 14px 'Segoe UI',sans-serif"><span style="position:relative;padding:2px 8px">Moyenne : 31,6     Nombre : 5     Somme : 158<em class="ow-hot f zoom" data-s="5"><b>5</b></em></span><span>▦ ▤ ─●── 100 %</span></div>` })}
<div class="f" data-s="3" style="position:absolute;left:330px;top:338px;padding:4px 12px;border-radius:8px;background:#FA582D;color:#fff;font:800 15px var(--font)">3 · barre de formule</div>
<div class="col" style="position:absolute;left:1060px;right:70px;top:180px;gap:12px">
 ${CARD('<b>1 · Ruban</b> — onglets Accueil, Insertion, Formules, Données…', 1)}${CARD('<b>2 · Zone Nom</b> — la cellule active ; tapez <b>D25</b> pour y aller', 2)}
 ${CARD('<b>3 · Barre de formule</b> — le <b>contenu réel</b> de la cellule', 3)}${CARD('<b>4 · Onglets de feuilles</b> — une feuille par thème', 4)}${CARD('<b>5 · Barre d\'état</b> — somme, moyenne, nombre de la sélection', 5)}</div>`,
  n: `<p><b>Étape 1 — le ruban</b> : Accueil, Insertion, Mise en page, Formules, Données, Révision, Affichage. Chaque onglet regroupe des commandes par tâche. Double-clic sur un onglet (ou <b>Ctrl+F1</b>) pour masquer/afficher le ruban.</p><p><b>Étape 2 — la zone Nom</b> : à gauche de la barre de formule, elle affiche la référence de la cellule active. On peut y taper <b>D25</b> puis Entrée pour s'y rendre directement.</p><p><b>Étape 3 — la barre de formule</b> : elle montre ce que contient réellement la cellule (ici la formule <b>=B2*C2</b>), alors que la cellule montre le <i>résultat</i>.</p><p><b>Étape 4 — les onglets de feuilles</b> : le ⊕ ajoute une feuille.</p><p><b>Étape 5 — la barre d'état</b> : elle calcule sans formule la moyenne, le nombre et la somme de la sélection.</p><p>Démo : ouvrez un classeur vierge et faites trouver chacune des 5 zones aux participants.</p>` },

/* 6 — RÉSULTAT vs FORMULE */
{ title: 'La cellule et la barre de formule', html: `${H('La cellule montre le résultat, la barre la formule', 'Contenu ≠ affichage')}
${X01G({ x: 70, y: 180, cols: 4, colw: [230, 110, 150, 130], rows: [...X01ROWS.map((r, i) => i ? [r[0], r[1], r[2], X01TOT[i - 1]] : r), ['Total', '', '', '']], sel: 'D10', fx: { ref: 'D10', f: '=SOMME(D2:D9)', s: 1 },
  val: [{ r: 'D10', v: '6 965', s: 2 }], hl: [{ r: 'D2:D9', s: 1, c: '#2563EB' }] })}
<div class="callout or f left" data-s="3" style="left:780px;top:186px;width:420px">◀ <b>Barre de formule</b> : =SOMME(D2:D9)<br><span style="font-size:17px;opacity:.9">ce que la cellule <b>contient</b></span></div>
<div class="callout f left" data-s="4" style="left:780px;top:600px;width:420px">◀ <b>Cellule D10</b> : 6 965<br><span style="font-size:17px;opacity:.85">ce que la cellule <b>affiche</b></span></div>
${TIP('Pour lire toutes les formules d\'une feuille : <b>Formules › Afficher les formules</b> (Ctrl+").', { s: 5, x: 1000, y: 380, w: 530, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : on sélectionne D10 : la barre de formule affiche <b>=SOMME(D2:D9)</b>, la plage D2:D9 est entourée en couleur.</p><p><b>Étape 2</b> : la cellule, elle, affiche le résultat : <b>6 965</b>.</p><p><b>Étapes 3 et 4</b> : la distinction fondamentale. La barre de formule montre le <b>contenu</b> ; la cellule montre l'<b>affichage</b>. Quand un résultat semble faux, on regarde toujours la barre de formule d'abord.</p><p><b>Étape 5</b> : Formules › Vérification des formules › <b>Afficher les formules</b> bascule toute la feuille en mode « formules ». Très utile pour relire un classeur reçu.</p><p>Question au groupe : « Si je tape 6965 à la main dans D10, la cellule affiche la même chose. Quelle différence ? » → la valeur tapée ne se mettra jamais à jour.</p>` },

/* 7 — BARRE D'ÉTAT */
{ title: 'La barre d\'état', html: `${H('La barre d\'état calcule pour vous', 'Sans aucune formule')}
${X01G({ x: 70, y: 190, cols: 4, colw: [230, 110, 150, 130], rows: X01ROWS.map((r, i) => i ? [r[0], r[1], r[2], X01TOT[i - 1]] : r), hl2: [{ r: 'D2:D5', s: 1, c: '#107C41' }] })}
${X01SB('<span class="f" data-s="2">Moyenne : <b>758,75</b></span><span class="f" data-s="2">Nombre : <b>4</b></span><span class="f" data-s="2">Somme : <b>3 035</b></span><span class="f" data-s="4">Min : <b>170</b></span><span class="f" data-s="4">Max : <b>1 260</b></span>', { x: 70, y: 571, w: 658 })}
<div class="col" style="position:absolute;left:800px;right:70px;top:200px;gap:16px">
 ${CARD('<b>1 ·</b> Sélectionnez des nombres (ici <b>D2:D5</b>)', 1)}${CARD('<b>2 ·</b> Lisez en bas à droite : <b>Moyenne · Nombre · Somme</b>', 2)}
 ${CARD('<b>3 ·</b> <b>Clic droit</b> sur la barre d\'état pour choisir les indicateurs', 3)}${CARD('<b>4 ·</b> Ajoutez <b>Min</b> et <b>Max</b> : 170 et 1 260', 4)}</div>
${TIP('Contrôle express : vérifiez un total « à l\'œil » avant de l\'envoyer.', { s: 5, x: 800, y: 650, w: 730, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : on sélectionne D2:D5 (les 4 premiers postes).</p><p><b>Étape 2</b> : la barre d'état affiche immédiatement <b>Moyenne 758,75</b>, <b>Nombre 4</b>, <b>Somme 3 035</b> (1 200 + 1 260 + 405 + 170). Aucune formule n'a été écrite.</p><p><b>Étapes 3 et 4</b> : clic droit sur la barre d'état → cocher <b>Minimum</b> et <b>Maximum</b> : 170 et 1 260 apparaissent.</p><p><b>Étape 5</b> : usage métier : vérifier rapidement un total avant d'envoyer un fichier, sans polluer la feuille de calculs intermédiaires.</p><p>Faites essayer tout de suite sur n'importe quelle colonne de nombres.</p>` },

/* 8 — NAVIGUER VITE */
{ title: 'Naviguer vite', html: `${H('Naviguer vite dans une feuille', 'Clavier et zone Nom')}
${X01G({ x: 70, y: 190, cols: 2, colw: [230, 130], rh: 36, rows: [['Poste', 'Total'], ...X01ROWS.slice(1).map((r, i) => [r[0], X01TOT[i]]), ['…', ''], ['Total', '6 965']],
  hl2: [{ r: 'B2', s: 1, c: '#107C41', t: 'départ' }, { r: 'B9', s: 2, c: '#FA582D', t: 'Ctrl+↓' }, { r: 'A1', s: 3, c: '#7C3AED' }],
  svg: ({ B }) => { const a = B('B2'), b = B('B9'); return `<g class="f" data-s="2"><path d="M${a.x + a.w + 26} ${a.y + 18} C ${a.x + a.w + 70} ${a.y + 60}, ${b.x + b.w + 70} ${b.y - 40}, ${b.x + b.w + 18} ${b.y + 18}" fill="none" stroke="#FA582D" stroke-width="4" class="draw" pathLength="1"/><path d="M${b.x + b.w + 18} ${b.y + 18} l14 -4 M${b.x + b.w + 18} ${b.y + 18} l8 12" stroke="#FA582D" stroke-width="4" stroke-linecap="round"/></g>`; } })}
${PROC([{ k: 'Ctrl+Flèche bas', t: 'Saute à la <b>dernière cellule remplie</b> de la colonne' }, { k: 'Ctrl+Début', t: 'Revient en <b>A1</b>' }, { k: 'Ctrl+Page suivante', t: 'Passe à la <b>feuille suivante</b>' }, { p: 'Zone Nom > D25 > Entrée', t: 'Va directement à une <b>référence</b>' }], { x: 560, y: 180, w: 970, s0: 2 })}`,
  n: `<p><b>Étape 1</b> : la cellule active est B2.</p><p><b>Étape 2</b> : <b>Ctrl+Flèche bas</b> saute d'un coup jusqu'à la dernière cellule remplie avant un vide (B9). Sur 5 000 lignes, c'est une seconde au lieu d'une minute de défilement. Avec <b>Ctrl+Maj+Flèche bas</b>, on <i>sélectionne</i> jusqu'en bas.</p><p><b>Étape 3</b> : <b>Ctrl+Début</b> revient en A1 (ou en haut à gauche des volets figés).</p><p><b>Étape 4</b> : <b>Ctrl+Page suivante / Page précédente</b> pour changer de feuille.</p><p><b>Étape 5</b> : la zone Nom : on tape une référence (D25, ou même une plage A1:D10) puis Entrée.</p><p>Piège : une ligne vide au milieu des données arrête Ctrl+Flèche — encore une raison de ne pas laisser de lignes vides.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX01, 1), n: `<p>Deuxième partie : saisir proprement et formater. Une saisie correcte, c'est 80 % des formules qui marchent du premier coup.</p>` },

/* 10 — TEXTE, NOMBRE, DATE */
{ title: 'Texte, nombre, date', html: `${H('Texte, nombre, date : trois types de données', 'Saisir')}
${X01G({ x: 70, y: 190, cols: 3, colw: [170, 200, 330], rh: 46, rows: [['Donnée', 'Saisie', 'Type'], ['Client', 'Novalis', ''], ['Participants', 45, ''], ['Prix café', '4,5', ''], ['Début', '', ''], ['Fin', '', ''], ['Durée (jours)', '', '']],
  sel: 'B7', fx: { ref: 'B7', f: '=B6-B5', s: 4 }, val: [{ r: 'B7', v: '46', s: 5 }],
  cells: [{ r: 'B5', v: '15/03/2026', fw: 400 }, { r: 'B6', v: '30/04/2026', fw: 400 },
    { r: 'C2', v: '◀ Texte : aligné à gauche', s: 1, al: 'flex-start', c: '#2563EB' }, { r: 'C3', v: 'Nombre : aligné à droite ▶', s: 2, al: 'flex-start', c: '#107C41' }, { r: 'C4', v: 'virgule décimale : 4,5', s: 2, al: 'flex-start', c: '#107C41', fw: 600 },
    { r: 'C5', v: 'Date = n° de série 46096', s: 3, al: 'flex-start', c: '#7C3AED' }, { r: 'C6', v: 'Date = n° de série 46142', s: 3, al: 'flex-start', c: '#7C3AED' }, { r: 'C7', v: 'on calcule sur des dates !', s: 5, al: 'flex-start', c: '#FA582D' }],
  hl2: [{ r: 'B2', s: 1, c: '#2563EB' }, { r: 'B3:B4', s: 2, c: '#107C41' }, { r: 'B5:B6', s: 3, c: '#7C3AED' }] })}
${TIP('Un <b>nombre aligné à gauche</b> est presque toujours un <b>texte</b> déguisé.', { s: 6, x: 860, y: 230, w: 670, kind: 'warn' })}
${TIP('Tapez la date avec des <b>/</b> : <b>15/03/2026</b>. Ctrl+; insère la date du jour.', { s: 6, x: 860, y: 380, w: 670, kind: 'key' })}
${STAT({ v: '46 jours', t: 'entre le 15/03 et le 30/04 : une date se calcule comme un nombre', x: 860, y: 530, w: 670, s: 5, c: '#FA582D' })}`,
  n: `<p><b>Étape 1</b> : un <b>texte</b> s'aligne à gauche par défaut.</p><p><b>Étape 2</b> : un <b>nombre</b> s'aligne à droite. En français, la virgule est le séparateur décimal : on tape <b>4,5</b> (et non 4.5, qui deviendrait un texte ou une date selon les paramètres).</p><p><b>Étape 3</b> : une <b>date</b> est stockée comme un <b>numéro de série</b> : le nombre de jours depuis le 1er janvier 1900. Le 15/03/2026 vaut 46096, le 30/04/2026 vaut 46142. Démo : tapez une date puis passez la cellule au format Standard.</p><p><b>Étapes 4 et 5</b> : parce qu'une date est un nombre, on peut soustraire : <b>=B6-B5</b> donne <b>46</b> jours.</p><p><b>Étape 6</b> : réflexe de contrôle : un nombre aligné à gauche doit alerter. Raccourci <b>Ctrl+;</b> pour la date du jour (figée, contrairement à la fonction AUJOURDHUI()).</p>` },

/* 11 — VALIDER ET CORRIGER */
{ title: 'Valider et corriger', html: `${H('Valider, annuler, corriger une saisie', 'Le clavier d\'abord')}
<svg viewBox="0 0 640 560" style="position:absolute;left:70px;top:190px;width:640px;height:560px;font-family:var(--font)">
 <g class="a pop" style="--d:.2s"><rect x="200" y="200" width="200" height="70" rx="6" fill="#fff" stroke="#107C41" stroke-width="5"/><text x="300" y="246" font-size="26" font-weight="700" text-anchor="middle" fill="#0E1726">Traiteur</text></g>
 <g class="f" data-s="1"><path d="M300 280 V 420" stroke="#2563EB" stroke-width="6" class="draw" pathLength="1"/><path d="M286 404 L300 424 L314 404" fill="none" stroke="#2563EB" stroke-width="6"/><rect x="230" y="436" width="140" height="44" rx="10" fill="#2563EB"/><text x="300" y="466" font-size="21" font-weight="800" fill="#fff" text-anchor="middle">Entrée ↓</text></g>
 <g class="f" data-s="2"><path d="M410 235 H 540" stroke="#107C41" stroke-width="6" class="draw" pathLength="1"/><path d="M524 221 L544 235 L524 249" fill="none" stroke="#107C41" stroke-width="6"/><rect x="470" y="140" width="120" height="44" rx="10" fill="#107C41"/><text x="530" y="170" font-size="21" font-weight="800" fill="#fff" text-anchor="middle">Tab →</text></g>
 <g class="f" data-s="3"><circle cx="110" cy="235" r="44" fill="#FEE2E2" stroke="#DC2626" stroke-width="4"/><path d="M92 217 L128 253 M128 217 L92 253" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/><text x="110" y="316" font-size="21" font-weight="800" fill="#DC2626" text-anchor="middle">Échap</text></g>
 <g class="f" data-s="4"><rect x="230" y="60" width="140" height="44" rx="10" fill="#FA582D"/><text x="300" y="90" font-size="21" font-weight="800" fill="#fff" text-anchor="middle">F2 ✎</text><path d="M300 110 V 190" stroke="#FA582D" stroke-width="5" stroke-dasharray="6 6"/></g>
</svg>
${KEYCARDS([{ k: 'Entrée', d: 'Valide et descend' }, { k: 'Tab', d: 'Valide et va à droite' }, { k: 'Échap', d: 'Annule la saisie en cours' }, { k: 'F2', d: 'Modifie sans tout retaper' }, { k: 'Alt+Entrée', d: 'Retour à la ligne dans la cellule' }, { k: 'Ctrl+Entrée', d: 'Remplit toute la sélection' }], { x: 760, r: 70, y: 190, cols: 2 })}`,
  n: `<p><b>Étape 1</b> : <b>Entrée</b> valide et descend d'une cellule : idéal pour saisir une colonne.</p><p><b>Étape 2</b> : <b>Tab</b> valide et passe à droite : idéal pour saisir une ligne. Astuce : après une série de Tab, Entrée revient sous la première cellule de la ligne.</p><p><b>Étape 3</b> : <b>Échap</b> annule la saisie en cours et restaure l'ancien contenu.</p><p><b>Étape 4</b> : <b>F2</b> (ou double-clic) passe en mode Modification : on corrige un caractère sans tout retaper. Erreur fréquente des débutants : retaper toute la cellule.</p><p><b>Étape 5</b> : <b>Alt+Entrée</b> insère un retour à la ligne <i>dans</i> la cellule (pour un en-tête long).</p><p><b>Étape 6</b> : <b>Ctrl+Entrée</b> : sélectionnez plusieurs cellules, tapez une valeur, Ctrl+Entrée → la valeur est écrite partout.</p>` },

/* 12 — PIÈGE : NOMBRE EN TEXTE */
{ title: 'Piège : le nombre stocké en texte', html: `${H('Piège : le nombre stocké en texte', 'Erreur silencieuse')}
${X01G({ x: 70, y: 190, cols: 2, colw: [260, 180], rh: 46, rows: [['Poste', 'Total'], ['Location salle', '1 200'], ['Traiteur déjeuner', ''], ['Pause café', '405'], ['Total', '']],
  sel: 'B5', fx: { ref: 'B5', f: '=SOMME(B2:B4)', s: 2 }, val: [{ r: 'B5', v: '1 605', s: 2, c: '#DC2626' }],
  cells: [{ r: 'B3', v: '1260', al: 'flex-start', fw: 400, st: 'background:#fff' }, { r: 'B3', v: '1 260', s: 4, c: '#107C41', bg: '#ECFDF3' }, { r: 'B5', v: '2 865', s: 4, c: '#107C41', bg: '#ECFDF3', fw: 800 }],
  svg: ({ B }) => { const b = B('B3'); return `<path d="M${b.x + 1} ${b.y + 1} h12 l-12 12z" fill="#16A34A"/>`; },
  hl2: [{ r: 'B3', s: 1, c: '#DC2626', t: 'texte !' }] })}
<div class="callout f left" data-s="3" style="left:620px;top:420px;width:460px;background:#DC2626">1 605 ≠ 2 865 attendu<br><span style="font-size:17px;font-weight:500">SOMME <b>ignore</b> le texte, sans message</span></div>
${PROC([{ t: '<b>Indice</b> : aligné à gauche + triangle vert' }, { p: '⚠ > Convertir en nombre', t: 'Le losange jaune à côté de la cellule' }, { t: '<b>Causes</b> : import CSV, espace parasite, point au lieu de virgule' }], { x: 1110, y: 190, w: 420, s0: 1 })}`,
  n: `<p><b>Étape 1</b> : en B3, « 1260 » est aligné à gauche et porte un petit <b>triangle vert</b> dans l'angle : c'est un <b>texte</b> qui ressemble à un nombre.</p><p><b>Étape 2</b> : on écrit =SOMME(B2:B4) : résultat <b>1 605</b>. SOMME a ignoré la cellule texte, <b>sans afficher d'erreur</b>. C'est le piège le plus dangereux : le résultat a l'air plausible.</p><p><b>Étape 3</b> : le total attendu était 1 200 + 1 260 + 405 = <b>2 865</b>.</p><p><b>Étape 4</b> : correction : sélectionner la cellule, cliquer sur le losange d'avertissement → <b>Convertir en nombre</b>. Le total passe à 2 865.</p><p>Causes typiques : export d'un logiciel métier, copier-coller depuis un site web, espace avant le nombre, point décimal (4.5) au lieu de la virgule. Dans le module Données, on verra Données › Convertir pour traiter une colonne entière.</p>` },

/* 13 — BONNES PRATIQUES DE STRUCTURE */
{ title: 'Structurer ses données', html: `${H('Une liste propre, des outils qui marchent', 'Bonnes pratiques')}
${VS({ l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['« 45 pers. » : texte et nombre mélangés', 'Lignes vides pour « aérer »', 'Cellules fusionnées dans les données', 'Deux lignes d\'en-têtes', 'Totaux intercalés au milieu'] },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['<b>Une information par cellule</b> (45 | personnes)', '<b>Une seule ligne d\'en-têtes</b>, en haut', 'Pas de ligne ni colonne vide dans la liste', 'Une colonne = un seul type de donnée', 'Les totaux <b>en dessous</b>, séparés'] }, mid: '➜', y: 190 })}
${TIP('Tri, filtre, tableau croisé dynamique : <b>tous</b> dépendent de cette structure.', { s: 3, x: 70, y: 690, w: 1460, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : les erreurs classiques : mélanger texte et nombre (« 45 pers. » ne se calcule pas), insérer des lignes vides pour aérer, fusionner des cellules, empiler deux lignes d'en-têtes.</p><p><b>Étape 2</b> : les règles d'une liste propre : une information par cellule, une ligne d'en-têtes, pas de vide, un type par colonne, totaux en dessous.</p><p><b>Étape 3</b> : ces règles ne sont pas de l'esthétique : le tri, le filtre, les tableaux et les TCD (modules suivants) détectent la zone de données grâce à elles. Une ligne vide coupe la liste en deux.</p><p>Question au groupe : « Montrez-moi un fichier de votre service qui ne respecte pas ces règles. » Il y en a toujours un.</p>` },

/* 14 — FORMATS DE NOMBRE */
{ title: 'Formats de nombre', html: `${H('Le format change l\'affichage, pas la valeur', 'Formats de nombre', PATH('Accueil > Nombre > Format de nombre'))}
${X01G({ x: 70, y: 190, cols: 3, colw: [250, 200, 220], rh: 50, rows: [['Format', 'Valeur stockée', 'Affichage'], ['Standard', '1234,5', ''], ['Nombre (2 déc.)', '1234,5', ''], ['Monétaire', '1234,5', ''], ['Pourcentage', '0,125', ''], ['Date courte', '46096', '']],
  val: [{ r: 'C2', v: '1234,5', s: 1 }, { r: 'C3', v: '1 234,50', s: 2 }, { r: 'C4', v: '1 234,50 €', s: 3 }, { r: 'C5', v: '12,50 %', s: 4 }, { r: 'C6', v: '15/03/2026', s: 5 }] })}
<div class="card f zoom" data-s="6" style="position:absolute;left:840px;top:200px;width:690px;padding:26px 30px">
 <div style="font-size:22px;font-weight:800;margin-bottom:14px">Même valeur, trois affichages</div>
 <div style="display:flex;gap:16px;align-items:center;font:700 30px var(--mono)"><span class="chip dark" style="font-size:26px">0,2</span>→<span class="chip ok" style="font-size:26px">20 %</span>→<span class="chip blu" style="font-size:26px">0,20 €</span></div>
 <div style="font-size:19px;color:#33445E;margin-top:14px">Dans les calculs, la cellule vaut <b>toujours 0,2</b>.</div></div>
${KEYCARDS([{ k: 'Ctrl+Maj+$', d: 'Monétaire' }, { k: 'Ctrl+Maj+%', d: 'Pourcentage' }], { x: 840, r: 70, y: 470, cols: 2, s0: 7 })}`,
  n: `<p>Le format de nombre ne modifie <b>jamais</b> la valeur : seulement la façon dont elle est montrée. Chemin : Accueil › groupe Nombre › liste déroulante (Standard, Nombre, Monétaire, Comptabilité, Date courte, Pourcentage…).</p><p><b>Étapes 1 à 5</b> : la même valeur 1234,5 en Standard, puis en Nombre (séparateur de milliers, 2 décimales), puis Monétaire (1 234,50 €). 0,125 en Pourcentage donne 12,50 %. Le numéro de série 46096 au format Date courte donne 15/03/2026.</p><p><b>Étape 6</b> : piège classique : taper <b>20</b> puis appliquer Pourcentage donne 2000 % ! Il faut taper 0,2 ou directement 20 %.</p><p><b>Étapes 7-8</b> : raccourcis Ctrl+Maj+$ (Monétaire) et Ctrl+Maj+% (Pourcentage). Les boutons € et % du groupe Nombre font la même chose.</p><p>Différence Monétaire / Comptabilité : la Comptabilité aligne le symbole € à droite de la cellule et affiche un tiret pour zéro.</p>` },

/* 15 — CTRL+1 ET ######## */
{ title: 'Format de cellule (Ctrl+1)', html: `${H('Ctrl+1 : tous les réglages d\'une cellule', 'Format de cellule')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:760px;height:560px;padding:0;overflow:hidden;font-family:'Segoe UI',var(--font)">
 <div style="padding:12px 20px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:19px;font-weight:700">Format de cellule</div>
 <div style="display:flex;gap:4px;padding:10px 16px 0;border-bottom:1px solid #E3E8EF;font-size:16px">${['Nombre', 'Alignement', 'Police', 'Bordure', 'Remplissage', 'Protection'].map((t, i) => `<span style="padding:7px 12px;${i === 0 ? 'color:#107C41;font-weight:800;box-shadow:inset 0 -3px 0 #107C41' : 'color:#33445E'}">${t}</span>`).join('')}</div>
 <div style="display:flex;gap:22px;padding:18px 20px">
  <div style="width:230px;border:1px solid #CBD5E1;border-radius:6px;font-size:16px;line-height:1.75;padding:6px 0">${['Standard', 'Nombre', 'Monétaire', 'Comptabilité', 'Date', 'Heure', 'Pourcentage', 'Fraction', 'Scientifique', 'Texte', 'Spécial', 'Personnalisée'].map(t => `<div style="padding:0 12px;${t === 'Monétaire' ? 'background:#107C41;color:#fff;font-weight:700' : ''}">${t}</div>`).join('')}</div>
  <div style="flex:1;display:flex;flex-direction:column;gap:16px;font-size:18px">
   <div class="f" data-s="1"><small style="color:#6B7A90">Exemple</small><div style="font:700 26px var(--mono);border:1px solid #CBD5E1;border-radius:6px;padding:8px 12px">1 234,50 €</div></div>
   <div class="f" data-s="2">Nombre de décimales : <b style="border:1px solid #CBD5E1;padding:2px 12px;border-radius:5px">2</b></div>
   <div class="f" data-s="2">Symbole : <b style="border:1px solid #CBD5E1;padding:2px 12px;border-radius:5px">€ Euro (€ 123) ▾</b></div>
   <div class="f" data-s="2">Nombres négatifs : <b style="color:#DC2626">-1 234,10 €</b></div>
  </div></div></div>
${X01G({ x: 900, y: 200, cols: 1, colw: [110], rh: 48, rows: [['Date'], ['########']], head: true })}
${X01G({ x: 1200, y: 200, cols: 1, colw: [170], rh: 48, rows: [['Date'], ['15/03/2026']], d: .5 }).replace('a pop', 'f zoom').replace('class="xg f zoom"', 'class="xg f zoom" data-s="4"')}
<div class="f" data-s="4" style="position:absolute;left:1080px;top:290px;font-size:40px;color:#FA582D">➜</div>
${TIP('<b>########</b> n\'est pas une erreur : la colonne est trop étroite. <b>Double-clic</b> sur la bordure droite de l\'en-tête de colonne.', { s: 3, x: 900, y: 420, w: 630, kind: 'warn' })}`,
  n: `<p><b>Ctrl+1</b> ouvre la boîte <b>Format de cellule</b> : six onglets, Nombre, Alignement, Police, Bordure, Remplissage, Protection. C'est le « panneau de contrôle » complet d'une cellule.</p><p><b>Étape 1</b> : catégorie Monétaire : l'aperçu montre 1 234,50 €.</p><p><b>Étape 2</b> : on règle le nombre de décimales, le symbole, l'affichage des négatifs.</p><p><b>Étape 3</b> : piège : une colonne trop étroite affiche <b>########</b>. Ce n'est pas une erreur de calcul : la valeur (ici une date) ne tient pas.</p><p><b>Étape 4</b> : double-clic sur la bordure droite de l'en-tête de colonne → ajustement automatique de la largeur. Pour plusieurs colonnes : sélectionnez-les puis double-cliquez sur une bordure.</p>` },

/* 16 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX01, 2), n: `<p>Troisième partie : les formules. C'est ici qu'Excel devient une calculatrice qui ne se trompe jamais… si on lui donne les bonnes références.</p>` },

/* 17 — ANATOMIE D'UNE FORMULE */
{ title: 'Anatomie d\'une formule', html: `${H('Anatomie d\'une formule', 'Toujours commencer par =')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;right:70px;top:200px;height:170px;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border-radius:24px;box-shadow:var(--sh);font:800 84px var(--mono)">
 <span style="color:#FA582D">=</span><span style="color:#6B7A90">(</span><span style="color:#2563EB">B2</span><span style="color:#0E1726">+</span><span style="color:#DC2626">B3</span><span style="color:#6B7A90">)</span><span style="color:#0E1726">/</span><span style="color:#107C41">2</span></div>
<div style="position:absolute;left:70px;right:70px;top:400px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
 ${CARD('<b style="color:#FA582D;font-size:26px">=</b><br>indique une <b>formule</b>', 1, 'text-align:center')}${CARD('<b style="color:#2563EB;font-size:26px">B2 · B3</b><br><b>références</b> : cliquez dessus', 2, 'text-align:center')}
 ${CARD('<b style="font-size:26px">+ − * / ^</b><br><b>opérateurs</b>', 3, 'text-align:center')}${CARD('<b style="color:#6B7A90;font-size:26px">( )</b><br>calculées <b>en premier</b>', 4, 'text-align:center')}</div>
<div class="f" data-s="5" style="position:absolute;left:70px;right:70px;top:600px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;font:700 24px var(--mono);text-align:center">
 ${[['=B2*C2', 'multiplier'], ['=F2-D10', 'soustraire'], ['=B2^2', 'puissance'], ['=2+3*4', '= 14, pas 20']].map(([f, d]) => `<div class="card" style="padding:16px"><span style="color:#107C41">${f}</span><div style="font:600 18px var(--font);color:#6B7A90;margin-top:4px">${d}</div></div>`).join('')}</div>`,
  n: `<p><b>Étape 1</b> : une formule commence <b>toujours</b> par le signe <b>=</b>. Sans lui, Excel écrit simplement le texte « B2+B3 ».</p><p><b>Étape 2</b> : les <b>références</b> désignent des cellules. Pendant la saisie, cliquez sur la cellule plutôt que de taper son adresse : moins d'erreurs, et Excel colore chaque référence.</p><p><b>Étape 3</b> : les opérateurs : + − * (multiplier) / (diviser) ^ (puissance).</p><p><b>Étape 4</b> : les priorités sont celles des mathématiques : ^ puis * et /, puis + et −. Les parenthèses passent en premier.</p><p><b>Étape 5</b> : exemples. Question piège au groupe : « Combien vaut =2+3*4 ? » → <b>14</b> (la multiplication d'abord), et non 20. Pour obtenir 20 : =(2+3)*4.</p>` },

/* 18 — POINTER ET RECOPIER */
{ title: 'Pointer les cellules, puis recopier', html: `${H('Pointer les cellules, puis recopier', 'Votre première formule')}
${X01G({ x: 70, y: 180, cols: 4, colw: [200, 100, 140, 120], rows: X01ROWS, sel: 'D2', fx: { ref: 'D2', f: '=B2*C2', s: 1 },
  hl: [{ r: 'B2', s: 2, c: '#2563EB' }, { r: 'C2', s: 2, c: '#DC2626' }],
  val: X01TOT.map((v, i) => ({ r: 'D' + (i + 2), v, s: i ? 4 : 3, c: `#107C41;transition-delay:${i ? (i * .12).toFixed(2) : 0}s` })), fill: { r: 'D2:D9', s: 4 } })}
${PROC([{ t: 'Tapez <b>=</b> dans D2' }, { t: 'Cliquez sur <b style="color:#2563EB">B2</b>, tapez <b>*</b>, cliquez sur <b style="color:#DC2626">C2</b>' }, { t: '<b>Entrée</b> → 1 200' }, { t: '<b>Recopiez</b> : double-clic sur la poignée, ou D2:D9 puis', k: 'Ctrl+D' }], { x: 760, y: 180, w: 770, s0: 1 })}
${TIP('La formule s\'adapte à chaque ligne : <b>=B3*C3</b>, <b>=B4*C4</b>… (module suivant).', { s: 5, x: 760, y: 690, w: 770, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : en D2, on tape <b>=</b>.</p><p><b>Étape 2</b> : on clique sur B2 (encadré bleu), on tape *, on clique sur C2 (encadré rouge). Les couleurs des références dans la formule correspondent aux cadres dans la feuille : c'est un excellent outil de relecture.</p><p><b>Étape 3</b> : Entrée → <b>1 200</b> (1 × 1 200 €).</p><p><b>Étape 4</b> : on recopie : double-clic sur la <b>poignée de recopie</b> (le petit carré en bas à droite de la cellule active), ou sélection D2:D9 puis <b>Ctrl+D</b>. Résultats : 1 200 · 1 260 · 405 · 170 · 1 920 · 1 050 · 60 · 900.</p><p><b>Étape 5</b> : Excel a adapté la formule à chaque ligne : c'est la référence relative, sujet du module X02.</p><p>Démo à faire en direct, puis faites refaire à chacun.</p>` },

/* 19 — RÉFÉRENCES vs VALEURS */
{ title: 'Références ou valeurs ?', html: `${H('Pourquoi calculer avec des références', 'Le recalcul automatique')}
<div class="chip ok a pop" style="--d:.2s;position:absolute;left:70px;top:178px;font-size:19px">✔ Avec références : =B2*C2</div>
<div class="chip bad a pop" style="--d:.3s;position:absolute;left:840px;top:178px;font-size:19px">✘ Avec valeurs : =1*1200</div>
${X01G({ x: 70, y: 230, cols: 3, colw: [200, 160, 260], rh: 50, rows: [['Poste', 'Prix unitaire', 'Total'], ['Location salle', '1 200,00 €', '1 200']], fx: { ref: 'C2', f: '=B2*C2', s: 0 },
  cells: [{ r: 'B2', v: '1 350,00 €', s: 1, bg: '#FFF7ED', c: '#C2410C' }, { r: 'C2', v: '1 350 ✔', s: 2, bg: '#ECFDF3', c: '#107C41', fw: 900 }] })}
${X01G({ x: 840, y: 230, cols: 3, colw: [200, 160, 260], rh: 50, rows: [['Poste', 'Prix unitaire', 'Total'], ['Location salle', '1 200,00 €', '1 200']], fx: { ref: 'C2', f: '=1*1200', s: 0 },
  cells: [{ r: 'B2', v: '1 350,00 €', s: 1, bg: '#FFF7ED', c: '#C2410C' }, { r: 'C2', v: '1 200 ✘ figé', s: 2, bg: '#FEF2F2', c: '#DC2626', fw: 900 }] })}
<div class="callout f" data-s="1" style="left:70px;top:440px;width:700px">Le devis de la salle passe à <b>1 350 €</b></div>
${VS({ y: 540, l: { t: 'Erreur fréquente', c: '#DC2626', ic: '✘', html: '<div style="font:700 26px var(--mono);color:#DC2626">=SOMME(1200+1260+405)</div><div style="font-size:19px;margin-top:8px">valeurs recopiées : ne se met jamais à jour</div>' }, r: { t: 'Bonne pratique', c: '#16A34A', ic: '✔', html: '<div style="font:700 26px var(--mono);color:#107C41">=SOMME(D2:D4)</div><div style="font-size:19px;margin-top:8px">références : suit chaque modification</div>' }, s1: 3, s2: 4 })}`,
  n: `<p>Deux tableaux identiques. À gauche, la formule utilise des références (=B2*C2). À droite, quelqu'un a tapé les valeurs (=1*1200).</p><p><b>Étape 1</b> : le devis de la salle passe de 1 200 € à <b>1 350 €</b>.</p><p><b>Étape 2</b> : à gauche, le total se recalcule instantanément : 1 350. À droite, il reste à <b>1 200</b> : la formule est figée, et l'erreur est invisible.</p><p><b>Étapes 3 et 4</b> : l'erreur fréquente <b>=SOMME(1200+1260+405)</b> : la fonction ne sert à rien, et rien ne se mettra à jour. La bonne pratique : =SOMME(D2:D4).</p><p>Message à marteler : <b>jamais de valeur tapée dans une formule</b> si cette valeur existe dans une cellule. Les seules constantes acceptables sont universelles (12 mois, 100 %…). Les taux (TVA, remise) iront dans des cellules paramètres (module X02).</p>` },

/* 20 — SOMME */
{ title: 'La fonction SOMME', html: `${H('SOMME : additionner une plage', 'Fonction', PATH('Accueil > Édition > Somme automatique'))}
${X01G({ x: 70, y: 180, cols: 4, colw: [200, 100, 140, 120], rows: [...X01ROWS.map((r, i) => i ? [r[0], r[1], r[2], X01TOT[i - 1]] : r), ['Total', '', '', '']], sel: 'D10', fx: { ref: 'D10', f: '=SOMME(D2:D9)', s: 2 },
  hl: [{ r: 'D2:D9', s: 2, c: '#2563EB', t: 'D2:D9' }], val: [{ r: 'D10', v: '6 965', s: 3 }] })}
<div class="a pop" style="--d:.3s;position:absolute;left:760px;top:190px;width:770px;padding:24px 28px;background:#0E1726;border-radius:20px;color:#fff;font:700 40px var(--mono);text-align:center">=SOMME(<span style="color:#60A5FA">D2</span><span style="color:#FA582D">:</span><span style="color:#60A5FA">D9</span>)</div>
<div class="col" style="position:absolute;left:760px;top:330px;width:770px;gap:14px">
 ${CARD('<b style="color:#FA582D">:</b> se lit « <b>jusqu\'à</b> » : de D2 jusqu\'à D9', 1)}${CARD('Sélectionnez la plage à la souris pendant la saisie', 2)}${CARD('Résultat : <b>6 965 €</b> pour les 8 postes', 3)}
 <div class="card f right" data-s="4" style="padding:14px 18px;display:flex;align-items:center;gap:18px;font-size:19px">${KEYS('Alt+=')}<span>écrit <b>=SOMME(…)</b> avec la plage au-dessus déjà proposée</span></div></div>`,
  n: `<p><b>Étape 1</b> : la syntaxe : <b>=SOMME(D2:D9)</b>. Le deux-points se lit « jusqu'à ». La plage D2:D9 contient 8 cellules.</p><p><b>Étape 2</b> : pendant la saisie, après la parenthèse ouvrante, sélectionnez la plage à la souris : Excel écrit D2:D9 et l'encadre en couleur.</p><p><b>Étape 3</b> : résultat <b>6 965</b> (1 200 + 1 260 + 405 + 170 + 1 920 + 1 050 + 60 + 900).</p><p><b>Étape 4</b> : le plus rapide : se placer en D10 et appuyer sur <b>Alt+=</b> (ou Accueil › Édition › Somme automatique Σ). Excel propose la plage au-dessus ; vérifiez-la avant de valider avec Entrée.</p><p>Piège : la Somme automatique s'arrête à la première cellule vide : vérifiez toujours la plage proposée.</p>` },

/* 21 — MOYENNE ET ÉCART */
{ title: 'MOYENNE et écart au budget', html: `${H('MOYENNE, puis l\'écart au budget', 'Fonction et soustraction')}
${X01G({ x: 70, y: 180, cols: 6, colw: [190, 70, 120, 110, 140, 100], rh: 36, rows: [['Poste', 'Qté', 'Prix unit.', 'Total', '', ''], ...X01ROWS.slice(1).map((r, i) => [r[0], r[1], r[2].replace(',00', ''), X01TOT[i], i ? '' : 'Budget alloué', i ? '' : '7 500 €']), ['Total', '', '', '6 965', '', ''], ['Moyenne', '', '', '', '', ''], ['Écart', '', '', '', '', '']],
  sel: 'D11', fx: { ref: 'D11', f: '=MOYENNE(D2:D9)', s: 1 }, fx2: [{ ref: 'D12', f: '=F2-D10', s: 4 }],
  hl: [{ r: 'D2:D9', s: 1, c: '#2563EB' }], val: [{ r: 'D11', v: '870,63', s: 2 }, { r: 'D12', v: '535', s: 5 }],
  hl2: [{ r: 'D2:D10', s: 3, c: '#DC2626' }, { r: 'F2', s: 4, c: '#7C3AED' }, { r: 'D10', s: 4, c: '#2563EB' }] })}
<div class="col" style="position:absolute;left:880px;right:70px;top:190px;gap:14px">
 ${CARD('<b>=MOYENNE(D2:D9)</b> → <b>870,63 €</b> par poste', 2)}
 ${CARD('<span style="color:#DC2626">✘ <b>=MOYENNE(D2:D10)</b> → 1 547,78</span><br><span style="font-size:17px">le total D10 est compté comme un 9<sup>e</sup> poste !</span>', 3, 'border-left:6px solid #DC2626')}
 ${CARD('<b>=F2-D10</b> → <b>535 €</b> de marge', 5, 'border-left:6px solid #16A34A')}</div>
${TIP('Positif = sous l\'enveloppe. Négatif = dépassement.', { s: 5, x: 880, y: 440, w: 650, kind: 'ok' })}`,
  n: `<p><b>Étapes 1-2</b> : <b>=MOYENNE(D2:D9)</b> calcule la moyenne arithmétique : 6 965 / 8 = <b>870,625</b>, affiché 870,63 avec deux décimales.</p><p><b>Étape 3</b> : piège : sélectionner jusqu'à D10 inclut la ligne Total dans la moyenne : (6 965 + 6 965) / 9 = 1 547,78. Résultat faux mais plausible. Relisez toujours la plage encadrée.</p><p><b>Étapes 4-5</b> : l'écart au budget : <b>=F2-D10</b> = 7 500 − 6 965 = <b>535 €</b>. Ordre des termes : budget moins dépense, pour qu'un résultat positif signifie « on reste sous l'enveloppe ».</p><p>Question au groupe : « Que se passe-t-il si la navette passe à 4 cars ? » → D7 = 1 400, total 7 315, écart 185 : tout se met à jour.</p>` },

/* 22 — SÉPARATEURS : ET ; */
{ title: 'Deux-points et point-virgule', html: `${H('« : » jusqu\'à, « ; » et puis', 'La syntaxe française')}
${X01G({ x: 70, y: 190, cols: 6, colw: [110, 110, 110, 110, 30, 150], rh: 44, rows: [['Mois', 'Salle A', 'Notes', 'Salle B', '', 'Total A+B'], ['Janvier', 120, 'RAS', 80, '', ''], ['Février', 95, 'travaux', 60, '', ''], ['Mars', 140, 'RAS', 75, '', ''], ['Avril', 110, 'RAS', 90, '', '']],
  sel: 'F2', fx: { ref: 'F2', f: '=SOMME(B2:B5;D2:D5)', s: 1 }, hl: [{ r: 'B2:B5', s: 2, c: '#2563EB', t: 'B2:B5' }, { r: 'D2:D5', s: 3, c: '#DC2626', t: 'D2:D5' }], val: [{ r: 'F2', v: '770', s: 4 }] })}
<div style="position:absolute;left:820px;right:70px;top:190px;display:flex;flex-direction:column;gap:18px">
 <div class="card f right" data-s="2" style="display:flex;align-items:center;gap:22px;padding:18px 24px"><b style="font:900 60px var(--mono);color:#2563EB;width:60px;text-align:center">:</b><span style="font-size:22px"><b>jusqu\'à</b> : une plage<br><span class="mono" style="font-size:19px">B2:B5 = B2, B3, B4, B5</span></span></div>
 <div class="card f right" data-s="3" style="display:flex;align-items:center;gap:22px;padding:18px 24px"><b style="font:900 60px var(--mono);color:#DC2626;width:60px;text-align:center">;</b><span style="font-size:22px"><b>et puis</b> : sépare les arguments<br><span class="mono" style="font-size:19px">465 + 305 = 770</span></span></div>
 <div class="card f right" data-s="5" style="display:flex;align-items:center;gap:22px;padding:18px 24px"><b style="font:900 60px var(--mono);color:#107C41;width:60px;text-align:center">,</b><span style="font-size:22px">la <b>virgule</b> = décimales<br><span class="mono" style="font-size:19px">12,5 (et non 12.5)</span></span></div></div>
${TIP('Maintenez <b>Ctrl</b> pour sélectionner la 2<sup>e</sup> plage : Excel ajoute le <b>;</b> tout seul.', { s: 4, x: 70, y: 600, w: 668, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : on veut additionner deux colonnes non contiguës (Salle A et Salle B), en sautant la colonne Notes : <b>=SOMME(B2:B5;D2:D5)</b>.</p><p><b>Étape 2</b> : le <b>deux-points</b> définit une plage : de B2 jusqu'à B5 (120 + 95 + 140 + 110 = 465).</p><p><b>Étape 3</b> : le <b>point-virgule</b> sépare les arguments de la fonction : ici une deuxième plage D2:D5 (80 + 60 + 75 + 90 = 305). Astuce : pendant la saisie, maintenez <b>Ctrl</b> pour sélectionner la deuxième plage, Excel ajoute le point-virgule.</p><p><b>Étape 4</b> : résultat 770.</p><p><b>Étape 5</b> : en version française, la virgule est réservée aux décimales — c'est pour cela que les arguments sont séparés par des points-virgules. Les tutoriels anglais écrivent =SUM(B2:B5,D2:D5) : à traduire.</p>` },

/* 23 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: '=', hfs: 110, hsub: 'tout commence ici', hk: 'EXCEL 01',
  items: [{ ic: '🧭', t: 'Se repérer', d: 'Zone Nom, barre de formule (le contenu), barre d\'état (calcul express)' }, { ic: '⌨️', t: 'Saisir proprement', d: 'Texte à gauche, nombre à droite, date = n° de série, F2 pour corriger' },
    { ic: '🎨', t: 'Formater', d: 'Le format change l\'affichage, jamais la valeur · Ctrl+1' }, { ic: 'ƒ', t: 'Formules', d: 'Toujours =, des références cliquées, jamais de valeurs recopiées' }, { ic: 'Σ', t: 'SOMME · MOYENNE', d: '« : » jusqu\'à · « ; » sépare · Alt+= pour la somme auto' }] }),
  n: `<p>Récapitulez en interrogeant le groupe avant chaque clic : « Que montre la barre de formule ? », « Comment repérer un nombre stocké en texte ? », « Que signifie le ; dans une formule ? ».</p><p>Point clé à faire reformuler : <b>une formule doit pointer vers des cellules</b>, pour se recalculer toute seule.</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Huit raccourcis pour bien démarrer', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'F2', d: 'Modifier la cellule active' }, { k: 'Alt+Entrée', d: 'Retour à la ligne dans la cellule' }, { k: 'Ctrl+Entrée', d: 'Valider dans toute la sélection' }, { k: 'Ctrl+;', d: 'Insérer la date du jour' }, { k: 'Ctrl+1', d: 'Format de cellule' }, { k: 'Ctrl+Flèche bas', d: 'Dernière cellule remplie' }, { k: 'Alt+=', d: 'Somme automatique' }, { k: 'Ctrl+Z', d: 'Annuler (Ctrl+Y : rétablir)' }], { cols: 4, y: 200 })}
${TIP('Sur Mac : <b>⌘</b> remplace Ctrl, et <b>Ctrl+U</b> remplace F2 pour modifier une cellule.', { s: 9, kind: 'key', y: 640, w: 900 })}`,
  n: `<p>Les huit raccourcis du lab « Défi clavier ». Faites-les pratiquer immédiatement : un raccourci non utilisé dans les 24 heures est oublié.</p><p>Les plus rentables : <b>F2</b> (corriger), <b>Ctrl+Entrée</b> (remplir une sélection), <b>Alt+=</b> (somme auto), <b>Ctrl+Flèche</b> (naviguer).</p><p>Sur Mac, F2 est souvent capté par le système : Ctrl+U modifie la cellule active.</p>` },

/* 25 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'excel', mod: 'x01', lab: 0, title: 'Lab 1 — Le budget du séminaire', tasks: ['<b>D2</b> : <code>=B2*C2</code>, recopiée jusqu\'en <b>D9</b>', '<b>D10</b> : total avec <b>SOMME</b> (6 965)', '<b>D11</b> : coût moyen avec <b>MOYENNE</b> (870,63)', '<b>D12</b> : écart au budget <code>=F2-D10</code> (535)', 'En-têtes <b>A1:D1</b> en gras · <b>D2:D12</b> au format €'] }),
  n: `<p>Scénario : assistant(e) de direction chez Novalis, budget du séminaire commercial, enveloppe de 7 500 €.</p><p>Solution : D2 =B2*C2 recopiée (1 200 · 1 260 · 405 · 170 · 1 920 · 1 050 · 60 · 900) ; D10 =SOMME(D2:D9) → 6 965 € ; D11 =MOYENNE(D2:D9) → 870,63 € ; D12 =F2-D10 → 535 € ; A1:D1 en gras, D2:D12 en Monétaire.</p><p>Erreurs à surveiller pendant le lab : MOYENNE qui inclut D10, écart calculé dans le mauvais sens (−535), valeurs tapées au lieu de références.</p>` },

/* 26 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'excel', mod: 'x01', lab: 1, title: 'Lab 2 — Défi clavier sans souris', tasks: [`${KEYS('F2')} modifier · ${KEYS('Échap')} annuler`, `${KEYS('Alt+Entrée')} retour à la ligne · ${KEYS('Ctrl+Entrée')} remplir`, `${KEYS('Ctrl+;')} date du jour · ${KEYS('Ctrl+Flèche bas')} descendre`, `${KEYS('Alt+=')} somme · ${KEYS('Maj+Espace')} ligne entière`, `${KEYS('Ctrl+Z')} annuler · ${KEYS('Ctrl+Y')} rétablir`] }),
  n: `<p>Défi chronométré : enchaîner les 10 raccourcis le plus vite possible. Faites une petite compétition dans la salle : affichez les meilleurs temps.</p><p>Rappel : <b>Maj+Espace</b> sélectionne la ligne entière ; <b>Ctrl+Espace</b> la colonne (souvent capté par le système sur Mac).</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Que montre la barre de formule lorsque D10 contient =SOMME(D2:D9) ?', o: ['Le résultat 6965', 'La formule =SOMME(D2:D9)', 'Le format de la cellule', 'Rien tant qu\'on n\'appuie pas sur F2'], a: [1], e: 'La cellule affiche le résultat, la barre de formule affiche le contenu réel : la formule.' },
  { q: 'Quel est le séparateur d\'arguments dans une fonction Excel en français ?', o: ['La virgule ,', 'Le deux-points :', 'Le point-virgule ;', 'L\'espace'], a: [2], e: 'La virgule sert aux décimales ; les arguments sont séparés par « ; ». Le « : » définit une plage.' },
  { q: 'Une cellule affiche ########. Que faut-il faire ?', o: ['Corriger la formule', 'Élargir la colonne', 'Supprimer le format', 'Redémarrer Excel'], a: [1], e: 'La valeur ne tient pas dans la largeur de colonne : double-clic sur la bordure de l\'en-tête.' },
  { q: 'Vous tapez 0,2 puis appliquez le format Pourcentage. Quelle valeur est utilisée dans les calculs ?', o: ['20', '0,2', '20 % sous forme de texte', '2'], a: [1], e: 'Le format ne change que l\'affichage (20 %). La valeur stockée reste 0,2.' },
  { q: 'Pourquoi écrire =B2*C2 plutôt que =1*1200 ?', o: ['C\'est plus court', 'Le résultat se met à jour si B2 ou C2 change', 'Excel refuse les nombres dans les formules', 'Pour que la cellule soit en gras'], a: [1], e: 'Avec des références, la formule se recalcule à chaque modification des données.' },
  { q: 'Un nombre est aligné à gauche avec un triangle vert. Quelles affirmations sont vraies ?', o: ['Il est probablement stocké en texte', 'SOMME l\'additionne normalement', 'SOMME l\'ignore sans message d\'erreur', 'C\'est un format Comptabilité'], a: [0, 2], e: 'Un nombre stocké en texte est ignoré par SOMME, silencieusement. Losange d\'avertissement › Convertir en nombre.' },
] ); }, n: `<p>Réponses : 1) b · 2) c · 3) b · 4) b · 5) b · 6) a et c.</p><p>Revenez sur la question 6 si elle pose problème : c'est l'erreur la plus coûteuse en entreprise.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X01', html: END(), n: `<p>Fin du module X01. Prochain module : <b>X02 — Recopie, références relatives et absolues</b>. On y verra pourquoi la formule =B2*C2 est devenue =B3*C3 en se recopiant, et comment figer une cellule avec le <b>$</b>.</p>` },
] };
