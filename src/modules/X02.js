/* ===================== MODULE X02 — Recopie, références relatives et absolues, mise en forme ===================== */
const SECSX02 = ['Recopier une formule', 'Relatives, absolues, mixtes', 'Mettre en forme un tableau'];

/* ---- helpers locaux X02 : GRID enrichie (cellules superposées, cadres au-dessus, 2e formule, SVG de recopie) ---- */
function X02G(o) {
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

/* données du lab « BureauPlus » */
const X02ART = ['Ramette papier A4', 'Stylos bille (x50)', 'Agrafeuse', 'Classeur à levier', 'Notes repos. (x12)', 'Calculatrice', 'Lampe LED', 'Corbeille à papier', 'Tapis de souris'];
const X02HT = ['4,90', '12,50', '18,00', '3,20', '9,80', '24,90', '39,00', '7,50', '6,00'];
const X02TTC = ['5,88', '15,00', '21,60', '3,84', '11,76', '29,88', '46,80', '9,00', '7,20'];
const X02REM = ['5,59', '14,25', '20,52', '3,65', '11,17', '28,39', '44,46', '8,55', '6,84'];
const X02PART = ['3,90 %', '9,94 %', '14,31 %', '2,54 %', '7,79 %', '19,79 %', '31,00 %', '5,96 %', '4,77 %'];
const X02TTC55 = ['5,17', '13,19', '18,99', '3,38', '10,34', '26,27', '41,15', '7,91', '6,33'];
const X02M = 'font-family:var(--mono);font-size:16px;font-weight:600;';
const X02CASC = (col, arr, s, c = '#107C41', from = 2) => arr.map((v, i) => ({ r: col + (i + from), v, s, c: `${c};transition-delay:${(i * .1).toFixed(1)}s` }));

window.MODULE = { code: 'X02', title: 'Recopie, références relatives et absolues, mise en forme', short: 'Références et recopie', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Références et recopie', html: TITLE({ mod: 'EXCEL · MODULE 02 · DÉBUTANT', title: 'Recopier et <span class="grad">figer</span> avec le $', sub: '« Le secret des tableaux qui se calculent tout seuls »', agenda: SECSX02, art: APPART('excel') }),
  n: `<p>Module 2 d'Excel, durée indicative <b>55 minutes</b>. C'est LE module charnière : la différence entre une référence relative et une référence absolue est la notion qui sépare un utilisateur débutant d'un utilisateur autonome.</p><p>Fil rouge : la <b>grille tarifaire de BureauPlus</b>, distributeur de fournitures. Les prix HT sont saisis ; la TVA et la remise fidélité sont des paramètres qui changeront l'an prochain.</p><p>Question d'ouverture : « Avez-vous déjà recopié une formule et obtenu des résultats absurdes ou des #DIV/0! ? » Presque tout le monde lève la main : ce module explique pourquoi.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Recopier une formule : <b>poignée</b>, <b>Ctrl+D</b>, <b>Ctrl+R</b>', 'Comprendre la <b>référence relative</b>', 'Figer une cellule avec le <b>$</b> et la touche <b>F4</b>', 'Utiliser les <b>références mixtes</b>', 'Mettre en forme un tableau <b>lisible</b>']),
  n: `<p>Cinq objectifs. Le cœur du module est le 3<sup>e</sup> : le symbole <b>$</b> et la touche <b>F4</b>.</p><p>À la fin, chaque participant doit être capable de construire un tableau où un seul paramètre (la TVA) pilote des dizaines de formules.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX02, 0), n: `<p>Première partie : recopier. On ne tape jamais deux fois la même formule.</p>` },

/* 4 — LA POIGNÉE DE RECOPIE */
{ title: 'La poignée de recopie', html: `${H('Une formule, neuf lignes : la recopie', 'Recopier', PATH('Accueil > Édition > Remplissage > En bas'))}
${X02G({ x: 70, y: 180, cols: 3, colw: [230, 110, 120], rh: 40, rows: [['Article', 'Prix HT', 'Prix TTC'], ...X02ART.map((a, i) => [a, X02HT[i], ''])], sel: 'C2', fx: { ref: 'C2', f: '=B2*1,2', s: 1 },
  val: [{ r: 'C2', v: '5,88', s: 1 }], cells: X02CASC('C', X02TTC.slice(1), 3, '#107C41', 3).map(q => ({ ...q, bg: '#ECFDF3' })), fill: { r: 'C2:C10', s: 3 },
  svg: ({ B }) => { const b = B('C2'); return `<g class="f" data-s="2"><circle cx="${b.x + b.w}" cy="${b.y + b.h}" r="22" fill="none" stroke="#FA582D" stroke-width="4" class="pulse"/></g>`; } })}
<div style="position:absolute;left:600px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 <div class="card f zoom" data-s="2" style="text-align:center;padding:22px 16px"><svg viewBox="0 0 120 90" style="width:130px;height:96px"><rect x="20" y="16" width="70" height="34" fill="#fff" stroke="#107C41" stroke-width="4"/><rect x="83" y="43" width="14" height="14" fill="#107C41" stroke="#fff" stroke-width="2"/><path d="M90 50v30M80 70l10 12 10-12" fill="none" stroke="#FA582D" stroke-width="4"/></svg><div style="font-size:22px;font-weight:800">Glisser</div><div style="font-size:18px;color:#6B7A90">la poignée ■</div></div>
 <div class="card f zoom" data-s="3" style="text-align:center;padding:22px 16px"><svg viewBox="0 0 120 90" style="width:130px;height:96px"><rect x="20" y="16" width="70" height="34" fill="#fff" stroke="#107C41" stroke-width="4"/><rect x="83" y="43" width="14" height="14" fill="#107C41" stroke="#fff" stroke-width="2"/><text x="90" y="86" text-anchor="middle" font-size="18" font-weight="900" fill="#FA582D">2×</text></svg><div style="font-size:22px;font-weight:800">Double-clic</div><div style="font-size:18px;color:#6B7A90">jusqu'au bas des données</div></div>
 <div class="card f zoom" data-s="4" style="text-align:center;padding:22px 16px;display:flex;flex-direction:column;align-items:center;gap:12px">${KEYS('Ctrl+D')}<div style="font-size:19px">recopie <b>vers le bas</b></div>${KEYS('Ctrl+R')}<div style="font-size:19px">recopie <b>vers la droite</b></div></div></div>
${TIP('Double-clic : Excel s\'arrête à la dernière ligne de la colonne <b>voisine</b>. Une ligne vide l\'arrête aussi !', { s: 5, x: 600, y: 520, w: 930, kind: 'warn' })}
${TIP('Ici <b>*1,2</b> est écrit en dur : on corrigera cela avec une cellule TVA.', { s: 6, x: 600, y: 650, w: 930 })}`,
  n: `<p><b>Étape 1</b> : la formule =B2*1,2 est écrite une fois, en C2 : 5,88.</p><p><b>Étape 2</b> : la <b>poignée de recopie</b> est le petit carré vert en bas à droite de la cellule active. Le pointeur devient une croix noire fine : on la fait glisser.</p><p><b>Étape 3</b> : le <b>double-clic</b> sur la poignée recopie automatiquement jusqu'à la dernière ligne remplie de la colonne voisine : la méthode la plus rapide, quelle que soit la longueur du tableau.</p><p><b>Étape 4</b> : au clavier : sélectionner C2:C10 puis <b>Ctrl+D</b> (« Down », vers le bas) ; <b>Ctrl+R</b> (« Right ») vers la droite. Équivalent ruban : Accueil › Édition › Remplissage › En bas.</p><p><b>Étape 5</b> : piège du double-clic : il s'arrête au premier trou de la colonne voisine. Vérifiez la dernière ligne.</p><p><b>Étape 6</b> : annoncez la suite : le taux 1,2 écrit en dur dans 9 formules est une mauvaise pratique ; on le remplacera par une cellule paramètre.</p>` },

/* 5 — SÉRIES AUTOMATIQUES */
{ title: 'Les séries automatiques', html: `${H('La poignée prolonge aussi les séries', 'Recopie incrémentée')}
${X02G({ x: 70, y: 190, cols: 5, colw: [160, 120, 100, 170, 110], rh: 48, rows: [['Mois', 'Jour', 'Trim.', 'Date', 'Pas de 5'], ['Janvier', 'Lun', 'T1', '', 5], ['', '', '', '', 10], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']],
  cells: [{ r: 'D2', v: '15/03/2026', fw: 400 },
    ...['Février', 'Mars', 'Avril', 'Mai'].map((v, i) => ({ r: 'A' + (i + 3), v, s: 1, al: 'flex-start', c: '#107C41', bg: '#ECFDF3', d: i * .12 })),
    ...['Mar', 'Mer', 'Jeu', 'Ven'].map((v, i) => ({ r: 'B' + (i + 3), v, s: 2, al: 'flex-start', c: '#107C41', bg: '#ECFDF3', d: i * .12 })),
    ...['T2', 'T3', 'T4', 'T1'].map((v, i) => ({ r: 'C' + (i + 3), v, s: 2, al: 'flex-start', c: '#107C41', bg: '#ECFDF3', d: i * .12 })),
    ...['16/03/2026', '17/03/2026', '18/03/2026', '19/03/2026'].map((v, i) => ({ r: 'D' + (i + 3), v, s: 3, c: '#107C41', bg: '#ECFDF3', d: i * .12 })),
    ...['15', '20', '25'].map((v, i) => ({ r: 'E' + (i + 4), v, s: 4, c: '#107C41', bg: '#ECFDF3', d: i * .12 }))],
  hl2: [{ r: 'A2', s: 1, c: '#FA582D' }, { r: 'E2:E3', s: 4, c: '#7C3AED', t: '2 valeurs' }] })}
<div class="col" style="position:absolute;left:870px;right:70px;top:200px;gap:16px">
 ${CARD('<b>Mois et jours</b> : Janvier, Lun, lundi… Excel connaît les listes', 1)}${CARD('<b>Libellés numérotés</b> : T1 → T4, puis reboucle', 2)}
 ${CARD('<b>Dates</b> : +1 jour à chaque cellule', 3)}${CARD('<b>Un pas</b> : sélectionnez <b>2 valeurs</b> (5 et 10) puis tirez', 4)}</div>
${TIP('Pour <b>copier</b> sans incrémenter : maintenez <b>Ctrl</b> en tirant la poignée.', { s: 5, x: 870, y: 640, w: 660, kind: 'key' })}`,
  n: `<p>La poignée ne recopie pas que des formules : elle <b>prolonge des séries</b>.</p><p><b>Étape 1</b> : « Janvier » tiré vers le bas donne Février, Mars, Avril, Mai.</p><p><b>Étape 2</b> : « Lun » donne Mar, Mer… ; « T1 » donne T2, T3, T4 puis reboucle sur T1. Excel reconnaît les listes personnalisées (Fichier › Options › Options avancées › Modifier les listes personnalisées).</p><p><b>Étape 3</b> : une date avance d'un jour par cellule. Clic droit en tirant → choix « Incrémenter les jours ouvrés / les mois / les années ».</p><p><b>Étape 4</b> : pour un pas personnalisé, sélectionnez deux valeurs (5 et 10) : Excel déduit le pas de 5 → 15, 20, 25.</p><p><b>Étape 5</b> : pour recopier « Janvier » à l'identique, maintenez Ctrl pendant le glisser.</p>` },

/* 6 — OPTIONS DE RECOPIE */
{ title: 'Les options de recopie', html: `${H('Recopier sans casser la mise en forme', 'Options de recopie')}
${X02G({ x: 70, y: 200, cols: 3, colw: [230, 110, 120], rh: 44, rows: [['Article', 'Prix HT', 'Prix TTC'], ...X02ART.slice(0, 5).map((a, i) => [a, X02HT[i], X02TTC[i]]), ['Total', '58,40', '70,08']],
  cells: [{ r: 'A7:C7', v: '', bg: 'transparent', st: 'border-top:3px double #0E1726;' }, { r: 'C7', v: '70,08', fw: 900, st: 'border-top:3px double #0E1726;' }],
  hl2: [{ r: 'C2:C6', s: 1, c: '#107C41' }] })}
<div class="f zoom" data-s="2" style="position:absolute;left:584px;top:474px;width:44px;height:32px;border:1px solid #94A3B8;border-radius:5px;background:#fff;display:grid;place-items:center;font-size:18px;box-shadow:0 6px 14px -6px rgba(0,0,0,.4)">⊞▾</div>
<div class="card f left" data-s="3" style="position:absolute;left:584px;top:516px;width:450px;padding:10px 0;font-size:19px">
 ${['Copier les cellules', 'Recopier les mises en forme uniquement', 'Recopier les valeurs sans la mise en forme', 'Remplissage instantané'].map((t, i) => `<div style="padding:8px 20px;${i === 2 ? 'background:#ECFDF3;color:#107C41;font-weight:800;box-shadow:inset 4px 0 0 #107C41' : ''}">${i === 2 ? '◉' : '○'} ${t}</div>`).join('')}</div>
${VS({ y: 200, l: { t: 'Problème', c: '#DC2626', ic: '✘', items: ['La recopie emporte aussi le <b>format</b>', 'Bordure double du total écrasée'] }, r: { t: 'Solution', c: '#16A34A', ic: '✔', items: ['Bouton <b>Options de recopie</b>', '« Recopier les valeurs <b>sans la mise en forme</b> »'] }, s1: 2, s2: 4 }).replace('left:70px;right:70px', 'left:1060px;right:70px').replace('grid-template-columns:1fr 1fr', 'grid-template-columns:1fr')}`,
  n: `<p><b>Étape 1</b> : on recopie la formule de C2 jusqu'en C6.</p><p><b>Étape 2</b> : problème : la recopie emporte aussi la <b>mise en forme</b> de la cellule source (bordures, remplissage). Si l'on recopie jusqu'à la ligne Total, la bordure double disparaît. Juste après une recopie, un petit bouton <b>Options de recopie</b> apparaît en bas à droite de la plage.</p><p><b>Étape 3</b> : ses choix : Copier les cellules, Recopier les mises en forme uniquement, <b>Recopier les valeurs sans la mise en forme</b>, Remplissage instantané.</p><p><b>Étape 4</b> : « sans la mise en forme » recopie la formule mais conserve les bordures existantes. Réflexe à prendre sur tous les tableaux déjà mis en forme.</p>` },

/* 7 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX02, 1), n: `<p>Deuxième partie, le cœur du module : comment Excel « lit » une référence, et comment l'empêcher de bouger.</p>` },

/* 8 — RÉFÉRENCE RELATIVE */
{ title: 'La référence relative', html: `${H('Une référence relative est un déplacement', 'Le comportement par défaut')}
${X02G({ x: 70, y: 190, cols: 4, colw: [110, 110, 200, 200], rh: 50, rows: [['', 'Valeur', 'Formule', 'Recopie →'], ['', 10, '', ''], ['', 20, '', ''], ['', 30, '', ''], ['', 40, '', ''], ['', 50, '', '']],
  cells: [{ r: 'C2', v: '=B2*2', al: 'flex-start', st: X02M + 'color:#107C41' }, { r: 'C3', v: '=B3*2', s: 2, al: 'flex-start', st: X02M + 'color:#2563EB' }, { r: 'C4', v: '=B4*2', s: 2, al: 'flex-start', st: X02M + 'color:#2563EB', d: .1 }, { r: 'C5', v: '=B5*2', s: 2, al: 'flex-start', st: X02M + 'color:#2563EB', d: .2 }, { r: 'C6', v: '=B6*2', s: 2, al: 'flex-start', st: X02M + 'color:#2563EB', d: .3 },
    { r: 'D2', v: '=C2*2', s: 3, al: 'flex-start', st: X02M + 'color:#7C3AED' }],
  hl2: [{ r: 'B2', s: 1, c: '#FA582D', t: '1 case à gauche' }] }).replace('<span class="xg-c hd" style="left:46px;width:110px"></span>', '<span class="xg-c hd" style="left:46px;width:110px"></span>')}
<div class="col" style="position:absolute;left:830px;right:70px;top:200px;gap:16px">
 ${CARD('En C2, <b>=B2*2</b> veut dire : « <b>la cellule 1 case à gauche</b> × 2 »', 1)}
 ${CARD('Recopiée vers le bas : <b style="color:#2563EB">=B3*2, =B4*2…</b> la ligne suit', 2)}
 ${CARD('Recopiée à droite en D2 : <b style="color:#7C3AED">=C2*2</b> la colonne suit', 3)}</div>
${TIP('Parfait pour un calcul <b>ligne par ligne</b>. C\'est le comportement par défaut.', { s: 4, x: 830, y: 560, w: 700, kind: 'ok' })}`,
  n: `<p>Pour comprendre le $, il faut d'abord comprendre comment Excel mémorise une référence. Les cellules affichent ici les <b>formules</b> (Formules › Afficher les formules).</p><p><b>Étape 1</b> : en C2, =B2*2 n'est pas mémorisé comme « B2 » mais comme « <b>la cellule située 1 colonne à gauche, même ligne</b> ». C'est une référence <b>relative</b>.</p><p><b>Étape 2</b> : recopiée vers le bas, le déplacement reste le même : en C3, la cellule 1 case à gauche est B3 → =B3*2.</p><p><b>Étape 3</b> : recopiée vers la droite en D2 : la cellule à gauche de D2 est C2 → =C2*2.</p><p><b>Étape 4</b> : c'est exactement ce que l'on veut pour calculer chaque ligne d'une liste. Mais que se passe-t-il quand toutes les lignes doivent pointer vers <i>la même</i> cellule ? Diapo suivante.</p>` },

/* 9 — LE PIÈGE #DIV/0! */
{ title: 'Le piège : la référence qui glisse', html: `${H('Quand la référence glisse : #DIV/0!', 'Erreur fréquente')}
${X02G({ x: 70, y: 180, cols: 3, colw: [230, 110, 130], rh: 36, rows: [['Article', 'Prix HT', 'Part'], ...X02ART.map((a, i) => [a, X02HT[i], '']), ['Total', '125,80', ''], ['', '', '']], sel: 'C2', fx: { ref: 'C2', f: '=B2/B11', s: 1 },
  fx2: [{ ref: 'C3', f: '=B3/B12', s: 3 }], val: [{ r: 'C2', v: '3,90 %', s: 1 }], cells: X02CASC('C', Array(8).fill('#DIV/0!'), 2, '#DC2626', 3).map(q => ({ ...q, bg: '#FEF2F2' })),
  hl: [{ r: 'B11', s: 1, c: '#2563EB' }], hl2: [{ r: 'B3', s: 3, c: '#2563EB' }, { r: 'B12', s: 3, c: '#DC2626', t: 'vide = 0 !' }],
  svg: ({ B }) => { const a = B('B11'), b = B('B12'); return `<g class="f" data-s="3"><path d="M${a.x - 14} ${a.y + 18} C ${a.x - 40} ${a.y + 24}, ${a.x - 40} ${b.y + 12}, ${b.x - 8} ${b.y + 18}" fill="none" stroke="#DC2626" stroke-width="4" class="draw" pathLength="1"/></g>`; } })}
<div class="col" style="position:absolute;left:640px;right:70px;top:190px;gap:16px">
 ${CARD('En C2 : <b>=B2/B11</b> → 3,90 % ✔', 1)}${CARD('<span style="color:#DC2626">Recopiée : <b>#DIV/0!</b> partout ✘</span>', 2)}
 ${CARD('En C3 : <b>=B3/<span style="color:#DC2626">B12</span></b> : le total a <b>glissé</b> d\'une ligne, vers une cellule vide', 3)}
 ${CARD('Il faut <b>figer B11</b> : <b class="mono" style="color:#107C41">=B2/$B$11</b>', 4, 'border-left:6px solid #16A34A')}</div>`,
  n: `<p>Objectif : calculer la part de chaque article dans le total HT (B11 = 125,80).</p><p><b>Étape 1</b> : en C2, =B2/B11 donne 4,90 / 125,80 = <b>3,90 %</b>. Juste.</p><p><b>Étape 2</b> : on recopie… et toutes les autres lignes affichent <b>#DIV/0!</b>.</p><p><b>Étape 3</b> : on clique sur C3 : la formule est devenue <b>=B3/B12</b>. B3 a glissé, c'est voulu ; mais B11 a glissé aussi, vers B12, qui est vide. Une cellule vide vaut 0 → division par zéro. En C4 ce sera B13, etc.</p><p><b>Étape 4</b> : la solution : dire à Excel que B11 ne doit <b>pas bouger</b>. C'est le rôle du symbole $.</p><p>Faites remarquer que l'erreur est ici visible (#DIV/0!), mais qu'avec une cellule non vide, le résultat serait faux <i>sans message</i>.</p>` },

/* 10 — LES 4 TYPES DE RÉFÉRENCES */
{ title: 'Le $ verrouille', html: `${H('Le $ verrouille ce qui le suit', 'Relative · absolue · mixte')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
 ${[['B2', 'Relative', 'colonne et ligne bougent', '#2563EB', 0, 0], ['$B$2', 'Absolue', 'rien ne bouge', '#DC2626', 1, 1], ['B$2', 'Mixte', 'la <b>ligne 2</b> reste fixe', '#7C3AED', 0, 1], ['$B2', 'Mixte', 'la <b>colonne B</b> reste fixe', '#FA582D', 1, 0]].map(([r, t, d, c, lc, lr], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="text-align:center;padding:26px 18px;border-top:6px solid ${c}">
  <div style="font:900 54px var(--mono);color:${c}">${r}</div>
  <svg viewBox="0 0 200 70" style="width:200px;height:70px;margin:10px auto"><g font-size="15" font-weight="800" text-anchor="middle"><rect x="10" y="10" width="80" height="50" rx="10" fill="${lc ? c : '#E2E8F0'}"/><text x="50" y="${lc ? 32 : 40}" fill="${lc ? '#fff' : '#33445E'}">colonne</text>${lc ? '<text x="50" y="52" fill="#fff" font-size="16">🔒</text>' : ''}<rect x="110" y="10" width="80" height="50" rx="10" fill="${lr ? c : '#E2E8F0'}"/><text x="150" y="${lr ? 32 : 40}" fill="${lr ? '#fff' : '#33445E'}">ligne</text>${lr ? '<text x="150" y="52" fill="#fff" font-size="16">🔒</text>' : ''}</g></svg>
  <div style="font-size:24px;font-weight:900">${t}</div><div style="font-size:19px;color:#33445E;margin-top:6px">${d}</div></div>`).join('')}</div>
<div class="f" data-s="5" style="position:absolute;left:70px;right:70px;top:560px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px;font:700 20px var(--mono);text-align:center">
 ${[['=B2 → =C3', '#2563EB'], ['=$B$2 → =$B$2', '#DC2626'], ['=B$2 → =C$2', '#7C3AED'], ['=$B2 → =$B3', '#FA582D']].map(([f, c]) => `<div class="card" style="padding:14px;color:${c}">${f}</div>`).join('')}</div>
<div class="f" data-s="5" style="position:absolute;left:70px;top:650px;font-size:19px;color:#6B7A90">Formule recopiée <b>une case en bas et une case à droite</b> :</div>
${TIP('Moyen mnémotechnique : le <b>$</b> est un <b>cadenas</b> posé devant ce qu\'il bloque.', { s: 6, x: 70, y: 700, w: 1460 })}`,
  n: `<p>Le symbole <b>$</b> se place devant la lettre de colonne et/ou devant le numéro de ligne. Il verrouille ce qui le suit immédiatement.</p><p><b>Étape 1 — B2, relative</b> : tout bouge à la recopie.</p><p><b>Étape 2 — $B$2, absolue</b> : rien ne bouge, la formule pointe toujours vers B2. C'est le cas du total, du taux de TVA, d'un paramètre.</p><p><b>Étape 3 — B$2, mixte</b> : la ligne 2 est bloquée, la colonne peut changer.</p><p><b>Étape 4 — $B2, mixte</b> : la colonne B est bloquée, la ligne peut changer.</p><p><b>Étape 5</b> : l'effet d'une recopie d'une case vers le bas et une case vers la droite sur chacune des quatre écritures.</p><p><b>Étape 6</b> : astuce : lisez le $ comme un cadenas posé devant ce qu'il bloque.</p>` },

/* 11 — LA TOUCHE F4 */
{ title: 'La touche F4', html: `${H('F4 : poser le $ sans le taper', 'Un raccourci indispensable')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:200px;width:820px;height:150px;display:flex;align-items:center;padding:0 40px;background:#fff;border-radius:22px;box-shadow:var(--sh);font:800 66px var(--mono)">
 <span style="color:#107C41">=B2/</span><span style="position:relative;display:inline-block;width:300px;height:80px">
 ${[['B11', 0, '#2563EB'], ['$B$11', 1, '#DC2626'], ['B$11', 2, '#7C3AED'], ['$B11', 3, '#FA582D'], ['B11', 4, '#2563EB']].map(([r, s, c]) => `<span class="${s ? 'f' : ''}" ${s ? `data-s="${s}"` : ''} style="position:absolute;left:0;top:0;width:100%;height:100%;display:block;background:#fff;color:${c}">${r}</span>`).join('')}</span><span style="width:4px;height:70px;background:#107C41;animation:twCaret .8s step-end infinite"></span></div>
<svg viewBox="0 0 700 420" style="position:absolute;left:860px;top:180px;width:680px;height:420px">
 <circle cx="350" cy="210" r="150" fill="none" stroke="#E2E8F0" stroke-width="16"/>
 ${[['$B$11', 350, 60, 1, '#DC2626'], ['B$11', 500, 210, 2, '#7C3AED'], ['$B11', 350, 360, 3, '#FA582D'], ['B11', 200, 210, 4, '#2563EB']].map(([t, x, y, s, c]) => `<g class="f zoom" data-s="${s}"><rect x="${x - 78}" y="${y - 30}" width="156" height="60" rx="30" fill="${c}"/><text x="${x}" y="${y + 10}" text-anchor="middle" font-size="28" font-weight="800" fill="#fff" font-family="Consolas,monospace">${t}</text></g>`).join('')}
 <g class="a pop" style="--d:.4s"><circle cx="350" cy="210" r="56" fill="#0E1726"/><text x="350" y="224" text-anchor="middle" font-size="38" font-weight="900" fill="#fff">F4</text></g>
</svg>
${PROC([{ t: 'Placez le curseur <b>sur</b> la référence dans la formule' }, { k: 'F4', t: 'Chaque appui passe au type suivant' }], { x: 70, y: 400, w: 820, s0: 1 })}
${TIP('Sur Mac : <b>⌘+T</b> (ou Fn+F4). Sur portable PC : parfois <b>Fn+F4</b>.', { s: 5, x: 70, y: 680, w: 820, kind: 'key' })}`,
  n: `<p>Taper les $ à la main est lent et source d'erreurs. La touche <b>F4</b> les pose pour vous.</p><p>Pendant la saisie (ou en mode Modification avec F2), placez le curseur sur la référence ou juste après, puis appuyez sur F4.</p><p><b>Étape 1</b> : 1<sup>er</sup> appui → <b>$B$11</b> (absolue).</p><p><b>Étape 2</b> : 2<sup>e</sup> appui → <b>B$11</b> (ligne figée).</p><p><b>Étape 3</b> : 3<sup>e</sup> appui → <b>$B11</b> (colonne figée).</p><p><b>Étape 4</b> : 4<sup>e</sup> appui → retour à <b>B11</b>.</p><p><b>Étape 5</b> : sur Mac, le raccourci est <b>⌘+T</b> ; sur de nombreux portables PC, il faut maintenir la touche <b>Fn</b>.</p><p>Démo : tapez =B2/B11, puis F4 → =B2/$B$11, Entrée, recopie : les pourcentages sont justes.</p>` },

/* 12 — CELLULE PARAMÈTRE : TVA */
{ title: 'La cellule paramètre', html: `${H('Un taux, une cellule, référencée en absolu', 'Bonne pratique')}
${X02G({ x: 70, y: 180, cols: 5, colw: [230, 100, 110, 50, 120], rh: 40, rows: [['Article', 'Prix HT', 'Prix TTC', '', 'Paramètres'], ...X02ART.map((a, i) => [a, X02HT[i], '', '', ['TVA', '20 %', '', 'Remise', '5 %'][i] || ''])], sel: 'C2', fx: { ref: 'C2', f: '=B2*(1+$H$1)', s: 1 },
  hl: [{ r: 'B2', s: 1, c: '#2563EB' }, { r: 'E3', s: 1, c: '#DC2626' }], val: [{ r: 'C2', v: '5,88', s: 2 }], cells: X02CASC('C', X02TTC.slice(1), 3, '#107C41', 3).map(q => ({ ...q, bg: '#ECFDF3' })), fill: { r: 'C2:C10', s: 3 } }).replace(/>Paramètres</, '>H · Paramètres<')}
<div class="col" style="position:absolute;left:770px;right:70px;top:190px;gap:16px">
 ${CARD('<b>TVA en H1</b> : une seule cellule « paramètre »', 1)}
 ${CARD('<b class="mono">=B2*(1+<span style="color:#DC2626">$H$1</span>)</b> → 5,88', 2)}
 ${CARD('Recopie : <b style="color:#2563EB">B2</b> glisse, <b style="color:#DC2626">$H$1</b> reste', 3)}
 <div class="card f right" data-s="4" style="padding:14px 18px;font-size:19px;font-family:var(--mono)">C3 : =B3*(1+$H$1)<br>C10 : =B10*(1+$H$1)</div></div>
${TIP('Jamais de taux écrit en dur (<b>*1,2</b>) dans des dizaines de formules : un seul changement doit tout mettre à jour.', { s: 5, x: 770, y: 610, w: 760, kind: 'ok' })}`,
  n: `<p>On reprend la grille tarifaire avec une <b>zone de paramètres</b> : TVA en H1 (20 %), remise en H2 (5 %). Sur la maquette, la colonne H est rapprochée pour tenir à l'écran.</p><p><b>Étape 1</b> : en C2, on tape =B2*(1+H1 puis <b>F4</b> → $H$1.</p><p><b>Étape 2</b> : 4,90 × 1,20 = <b>5,88</b>.</p><p><b>Étape 3</b> : on recopie jusqu'en C10 : 15,00 · 21,60 · 3,84 · 11,76 · 29,88 · 46,80 · 9,00 · 7,20.</p><p><b>Étape 4</b> : vérification en mode formules : B2 est devenu B3, B10… ; $H$1 n'a pas bougé.</p><p><b>Étape 5</b> : la règle d'or : tout taux, seuil ou coefficient susceptible de changer va dans une cellule paramètre, référencée en absolu. On pourra même la <b>nommer</b> (Formules › Définir un nom) : =B2*(1+TVA).</p>` },

/* 13 — REMISE : RELATIF + ABSOLU */
{ title: 'Relatif et absolu ensemble', html: `${H('Relatif et absolu dans la même formule', 'Prix TTC remisé')}
${X02G({ x: 70, y: 180, cols: 3, colw: [210, 260, 120], rh: 40, rows: [['Article', 'Formule en D', 'TTC remisé'], ...X02ART.map((a, i) => [a, '', ''])],
  cells: [...X02ART.map((a, i) => ({ r: 'B' + (i + 2), v: `=<span style="color:#2563EB">C${i + 2}</span>*(1-<span style="color:#DC2626">$H$2</span>)`, s: i ? 2 : 1, al: 'flex-start', st: X02M, d: i ? i * .08 : 0 })),
    ...X02CASC('C', X02REM, 3).map(q => ({ ...q, bg: '#ECFDF3' }))],
  hl2: [{ r: 'B2:B10', s: 4, c: '#7C3AED' }] })}
<svg viewBox="0 0 680 520" style="position:absolute;left:850px;top:190px;width:680px;height:520px;font-family:var(--font)">
 <g class="f" data-s="2"><rect x="20" y="20" width="300" height="110" rx="18" fill="#EFF6FF" stroke="#2563EB" stroke-width="3"/><text x="170" y="65" text-anchor="middle" font-size="26" font-weight="900" fill="#2563EB">C2 → C3 → C10</text><text x="170" y="102" text-anchor="middle" font-size="19" fill="#33445E">relatif : suit la ligne</text></g>
 <g class="f" data-s="2"><rect x="360" y="20" width="300" height="110" rx="18" fill="#FEF2F2" stroke="#DC2626" stroke-width="3"/><text x="510" y="65" text-anchor="middle" font-size="26" font-weight="900" fill="#DC2626">$H$2 🔒</text><text x="510" y="102" text-anchor="middle" font-size="19" fill="#33445E">absolu : la remise</text></g>
 <g class="f zoom" data-s="3"><rect x="120" y="190" width="440" height="120" rx="22" fill="#0E1726"/><text x="340" y="240" text-anchor="middle" font-size="22" fill="#94A3B8">exemple, ligne 2</text><text x="340" y="285" text-anchor="middle" font-size="30" font-weight="800" fill="#fff" font-family="Consolas,monospace">5,88 × 0,95 = 5,59</text></g>
 <g class="f" data-s="4"><text x="340" y="380" text-anchor="middle" font-size="22" font-weight="800" fill="#7C3AED">Question à se poser :</text><text x="340" y="420" text-anchor="middle" font-size="22" fill="#0E1726">« Cette cellule doit-elle bouger</text><text x="340" y="452" text-anchor="middle" font-size="22" fill="#0E1726">quand je recopie ? »</text></g>
</svg>`,
  n: `<p>Le prix TTC remisé combine les deux types de référence : <b>=C2*(1-$H$2)</b>.</p><p><b>Étape 1</b> : la formule en D2 (affichée ici en colonne B pour la lecture).</p><p><b>Étape 2</b> : à la recopie, <b>C2</b> (relatif) devient C3, C4… ; <b>$H$2</b> (absolu) reste la remise de 5 %.</p><p><b>Étape 3</b> : résultats : 5,59 · 14,25 · 20,52 · 3,65 · 11,17 · 28,39 · 44,46 · 8,55 · 6,84 (5,88 × 0,95 = 5,586 affiché 5,59).</p><p><b>Étape 4</b> : la méthode pour ne jamais se tromper : pour chaque référence de la formule, se demander « doit-elle bouger quand je recopie ? ». Oui → relative. Non → F4.</p>` },

/* 14 — PART DU TOTAL */
{ title: 'La part de chaque article', html: `${H('La part du total, enfin juste', '=B2/$B$11')}
${X02G({ x: 70, y: 180, cols: 3, colw: [230, 110, 130], rh: 38, rows: [['Article', 'Prix HT', 'Part du HT'], ...X02ART.map((a, i) => [a, X02HT[i], '']), ['Total', '', '']], sel: 'C2', fx: { ref: 'B11', f: '=SOMME(B2:B10)', s: 1 },
  fx2: [{ ref: 'C2', f: '=B2/$B$11', s: 2 }], val: [{ r: 'B11', v: '125,80', s: 1 }], cells: X02CASC('C', X02PART, 3).map(q => ({ ...q, bg: '#ECFDF3' })), hl2: [{ r: 'B11', s: 2, c: '#DC2626', t: '$B$11' }],
  svg: ({ B }) => X02PART.map((p, i) => { const b = B('C' + (i + 2)), w = parseFloat(p.replace(',', '.')) * 3.2; return `<g class="f" data-s="4"><rect x="${b.x + b.w + 14}" y="${b.y + 9}" width="${w.toFixed(1)}" height="${b.h - 18}" rx="4" fill="${i === 6 ? '#FA582D' : '#33C481'}"/></g>`; }).join('') })}
${STAT({ v: '31,00 %', t: 'la <strong>lampe LED</strong> pèse près d\'un tiers du total HT', x: 820, y: 200, w: 710, s: 5, c: '#FA582D' })}
${PROC([{ p: 'Accueil > Nombre > Style de pourcentage', t: 'puis <b>Ajouter une décimale</b> (×2)' }, { k: 'Ctrl+Maj+%', t: 'Format pourcentage au clavier' }], { x: 820, y: 380, w: 710, s0: 3 })}`,
  n: `<p><b>Étape 1</b> : d'abord le total : B11 = =SOMME(B2:B10) → <b>125,80</b>.</p><p><b>Étape 2</b> : en C2 : =B2/ puis clic sur B11, <b>F4</b> → =B2/$B$11.</p><p><b>Étape 3</b> : recopie et format pourcentage : 3,90 % · 9,94 % · 14,31 % · 2,54 % · 7,79 % · 19,79 % · 31,00 % · 5,96 % · 4,77 %. La somme fait bien 100 %. Format : Accueil › Nombre › Style de pourcentage (%), puis Ajouter une décimale deux fois.</p><p><b>Étapes 4-5</b> : lecture métier : la lampe LED représente 31 % du total HT. Remarque : le format pourcentage multiplie l'<i>affichage</i> par 100 ; la cellule contient 0,0390.</p>` },

/* 15 — CHANGER UN PARAMÈTRE */
{ title: 'Un paramètre change, tout suit', html: `${H('La TVA passe à 5,5 % : on ne touche qu\'à H1', 'La preuve par l\'exemple')}
${X02G({ x: 70, y: 180, cols: 4, colw: [230, 100, 120, 160], rh: 40, rows: [['Article', 'Prix HT', 'Prix TTC', 'H · Paramètres'], ...X02ART.map((a, i) => [a, X02HT[i], X02TTC[i], ['TVA', '', '', 'Remise', '5 %'][i] || ''])],
  cells: [{ r: 'D3', v: '20 %', fw: 800 }, { r: 'D3', v: '5,5 %', s: 1, bg: '#FFF7ED', c: '#C2410C', fw: 900 }, ...X02CASC('C', X02TTC55, 2, '#C2410C').map(q => ({ ...q, bg: '#FFF7ED' }))],
  hl2: [{ r: 'D3', s: 1, c: '#FA582D', t: '1 seule saisie' }, { r: 'C2:C10', s: 2, c: '#FA582D' }] })}
${STAT({ v: '1 → 9', t: 'une cellule modifiée, neuf prix recalculés', x: 750, y: 200, w: 380, s: 2, c: '#FA582D' })}
${STAT({ v: '5,17 €', t: 'la ramette : 4,90 × 1,055', x: 1150, y: 200, w: 380, s: 3, c: '#107C41' })}
${VS({ y: 400, l: { t: 'Taux en dur', c: '#DC2626', ic: '✘', items: ['=B2*1,2 dans 9 formules', '9 corrections, 1 oubli…'] }, r: { t: 'Taux en $H$1', c: '#16A34A', ic: '✔', items: ['=B2*(1+$H$1)', '1 correction, 0 oubli'] }, s1: 4, s2: 4 }).replace('left:70px;right:70px', 'left:750px;right:70px')}`,
  n: `<p>C'est la démonstration qui convainc. La TVA de ces articles passe à 5,5 % (tâche 5 du lab).</p><p><b>Étape 1</b> : on modifie <b>uniquement H1</b> : on tape 5,5 % (ou 0,055).</p><p><b>Étape 2</b> : les neuf prix TTC se recalculent instantanément : 5,17 · 13,19 · 18,99 · 3,38 · 10,34 · 26,27 · 41,15 · 7,91 · 6,33. Les prix remisés et tout ce qui en dépend suivent aussi.</p><p><b>Étape 3</b> : vérification : 4,90 × 1,055 = 5,1695, affiché 5,17.</p><p><b>Étape 4</b> : comparez avec un fichier où *1,2 est écrit dans chaque formule : il faudrait corriger chaque formule, avec un risque d'oubli invisible.</p>` },

/* 16 — RÉFÉRENCE MIXTE */
{ title: 'La référence mixte', html: `${H('La référence mixte : la table de multiplication', '=$A2*B$1')}
${X02G({ x: 70, y: 180, cols: 6, colw: [80, 90, 90, 90, 90, 90], rh: 56, rows: [['×', 1, 2, 3, 4, 5], [1, '', '', '', '', ''], [2, '', '', '', '', ''], [3, '', '', '', '', ''], [4, '', '', '', '', ''], [5, '', '', '', '', '']], sel: 'B2', fx: { ref: 'B2', f: '=$A2*B$1', s: 1 },
  fx2: [{ ref: 'F6', f: '=$A6*F$1', s: 4 }],
  hl: [{ r: 'A2:A6', s: 2, c: '#7C3AED', t: '$A : colonne figée' }, { r: 'B1:F1', s: 2, c: '#FA582D' }],
  val: [1, 2, 3, 4, 5].flatMap(r => [1, 2, 3, 4, 5].map(c => ({ r: String.fromCharCode(65 + c) + (r + 1), v: String(r * c), s: r === 1 && c === 1 ? 1 : 3, c: `#107C41;transition-delay:${((r + c - 2) * .09).toFixed(2)}s` }))),
  hl2: [{ r: 'F6', s: 4, c: '#107C41' }] })}
<div class="f" data-s="2" style="position:absolute;left:290px;top:618px;padding:3px 10px;border-radius:6px;background:#FA582D;color:#fff;font:800 14px var(--font)">ligne 1 figée : B$1</div>
<div class="col" style="position:absolute;left:720px;right:70px;top:190px;gap:16px">
 ${CARD('<b class="mono" style="font-size:24px"><span style="color:#7C3AED">$A</span>2 * B<span style="color:#FA582D">$1</span></b> : une seule formule pour 25 cellules', 1)}
 ${CARD('<b style="color:#7C3AED">$A2</b> : toujours la colonne A, la ligne suit · <b style="color:#FA582D">B$1</b> : toujours la ligne 1, la colonne suit', 2)}
 ${CARD('Recopiée à droite <b>et</b> en bas : <b>Ctrl+R</b> puis <b>Ctrl+D</b>', 3)}
 ${CARD('En F6 : <b class="mono">=$A6*F$1</b> → 5 × 5 = <b>25</b>', 4)}</div>
${TIP('Cas réels : grille prix × quantité, taux × montant, commission par vendeur et par mois.', { s: 5, x: 720, y: 640, w: 810 })}`,
  n: `<p>La référence mixte sert quand on recopie dans <b>deux directions</b> : un tableau à double entrée.</p><p><b>Étape 1</b> : en B2 : <b>=$A2*B$1</b> → 1 × 1 = 1.</p><p><b>Étape 2</b> : $A2 : la colonne A est figée (on lit toujours le multiplicateur en colonne A), la ligne suit. B$1 : la ligne 1 est figée (on lit toujours l'en-tête), la colonne suit.</p><p><b>Étape 3</b> : on sélectionne B2:F6, Ctrl+R puis Ctrl+D (ou on tire la poignée à droite puis en bas) : les 25 résultats apparaissent.</p><p><b>Étape 4</b> : contrôle en F6 : la formule est devenue =$A6*F$1 → 5 × 5 = 25.</p><p><b>Étape 5</b> : exercice à proposer : qu'obtient-on avec =$A$2*B1 recopié ? Avec =A2*B1 ? Faites-les prédire avant de tester.</p>` },

/* 17 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX02, 2), n: `<p>Troisième partie : la mise en forme. Un tableau juste mais illisible ne sera pas lu.</p>` },

/* 18 — AVANT / APRÈS MISE EN FORME */
{ title: 'Un tableau lisible', html: `${H('Un tableau se lit en un coup d\'œil', 'Avant / après')}
${X02G({ x: 70, y: 200, cols: 3, colw: [220, 110, 110], rh: 44, head: false, rows: [['Article', 'Prix HT', 'Prix TTC'], ...X02ART.slice(0, 6).map((a, i) => [a, X02HT[i].replace(',00', ''), X02TTC[i]]), ['Total', '73,3', '87,96']] })}
<div class="chip bad a pop" style="--d:.3s;position:absolute;left:70px;top:160px">Avant</div>
${X02G({ x: 640, y: 200, cols: 3, colw: [220, 110, 110], rh: 44, head: false, d: .4, rows: [['Article', 'Prix HT', 'Prix TTC'], ...X02ART.slice(0, 6).map((a, i) => [a, X02HT[i] + ' €', X02TTC[i] + ' €']), ['Total', '73,30 €', '87,96 €']],
  cells: [{ r: 'A1', v: 'Article', s: 1, bg: '#107C41', c: '#fff', al: 'flex-start', fw: 800 }, { r: 'B1', v: 'Prix HT', s: 1, bg: '#107C41', c: '#fff', al: 'center', fw: 800 }, { r: 'C1', v: 'Prix TTC', s: 1, bg: '#107C41', c: '#fff', al: 'center', fw: 800 },
    ...[2, 4, 6].flatMap(r => [{ r: 'A' + (r + 1), v: X02ART[r - 1], s: 3, bg: '#F0FDF4', al: 'flex-start', fw: 400 }, { r: 'B' + (r + 1), v: X02HT[r - 1] + ' €', s: 3, bg: '#F0FDF4', fw: 400 }, { r: 'C' + (r + 1), v: X02TTC[r - 1] + ' €', s: 3, bg: '#F0FDF4', fw: 400 }]),
    { r: 'A8', v: 'Total', s: 4, fw: 900, al: 'flex-start', st: 'border-top:3px double #0E1726' }, { r: 'B8', v: '73,30 €', s: 4, fw: 900, st: 'border-top:3px double #0E1726' }, { r: 'C8', v: '87,96 €', s: 4, fw: 900, st: 'border-top:3px double #0E1726' }],
  hl2: [{ r: 'B2:C7', s: 2, c: '#2563EB' }] })}
<div class="chip ok f" data-s="1" style="position:absolute;left:640px;top:160px">Après</div>
<div class="col" style="position:absolute;left:1150px;right:70px;top:200px;gap:14px">
 ${CARD('<b>1 ·</b> En-têtes : <b>gras</b> + remplissage, centrés', 1)}${CARD('<b>2 ·</b> Nombres : format €, <b>à droite</b>', 2)}${CARD('<b>3 ·</b> Lignes à bandes, couleur discrète', 3)}${CARD('<b>4 ·</b> Total séparé : <b>bordure double</b>', 4)}</div>`,
  n: `<p>Même tableau, deux lectures. Les valeurs sont identiques (total HT des 6 premiers articles : 73,30 € ; TTC : 87,96 €).</p><p><b>Étape 1</b> : la ligne d'en-têtes se distingue : gras (<b>Ctrl+G</b>), couleur de remplissage, texte blanc, centré.</p><p><b>Étape 2</b> : les montants au format Monétaire, alignés à droite pour comparer les ordres de grandeur.</p><p><b>Étape 3</b> : une ligne sur deux légèrement teintée guide l'œil sur les longues lignes.</p><p><b>Étape 4</b> : la ligne de total est séparée par une bordure double (style de cellule « Total »).</p><p>Règle : 2 couleurs maximum, cohérentes avec la charte. Un tableau arc-en-ciel ne se lit pas mieux.</p>` },

/* 19 — LES OUTILS DU RUBAN */
{ title: 'Les outils de mise en forme', html: `${H('Les outils de l\'onglet Accueil', 'Mettre en forme', PATH('Accueil > Police > Bordures > Toutes les bordures'))}
${APPWIN({ app: 'excel', x: 70, y: 180, w: 1000, h: 240, title: 'Tarifs.xlsx', tab: 'Accueil',
  groups: [['Presse-papiers', ['📋 Coller', '🖌']], ['Police', ['Aptos ▾', 'G', 'I', 'S', '⊞ Bordures ▾', '', '🪣 Remplissage', 'A ▾']], ['Alignement', ['≡', '☰', '↵', '⇔ ▾']], ['Nombre', ['€', '%']], ['Styles', ['🎨 Styles de cellules']]],
  hot: { 'G': 1, '⊞ Bordures ▾': 2, '🪣 Remplissage': 3, '↵': 4, '🎨 Styles de cellules': 5, '🖌': 6 },
  body: '<div style="padding:24px 30px;font:600 20px var(--font);color:#6B7A90">Sélectionnez les cellules, puis cliquez sur la commande.</div>' })}
<div style="position:absolute;left:70px;right:70px;top:450px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
 ${CARD('<b>1 · Gras</b> — Ctrl+G', 1)}${CARD('<b>2 · Bordures</b> — Toutes les bordures', 2)}${CARD('<b>3 · Remplissage</b> — couleur de fond', 3)}
 ${CARD('<b>4 · Renvoyer à la ligne</b> — en-têtes longs', 4)}${CARD('<b>5 · Styles de cellules</b> — Titre, Total, Entrée…', 5)}${CARD('<b>6 · Reproduire la mise en forme</b> 🖌', 6)}</div>
${TIP('Double-clic sur le pinceau 🖌 : il reste actif pour plusieurs plages. <b>Échap</b> pour l\'arrêter.', { s: 7, x: 70, y: 640, w: 1000, kind: 'key' })}`,
  n: `<p>Tous les outils sont dans l'onglet <b>Accueil</b>.</p><p><b>Étape 1</b> : Gras (Ctrl+G en français, Ctrl+B en anglais).</p><p><b>Étape 2</b> : Bordures (groupe Police) : « Toutes les bordures » pour un quadrillage imprimable, « Bordure double en bas » pour un total.</p><p><b>Étape 3</b> : Couleur de remplissage (le pot de peinture).</p><p><b>Étape 4</b> : groupe Alignement : <b>Renvoyer à la ligne automatiquement</b> pour un en-tête long ; alignement horizontal et vertical.</p><p><b>Étape 5</b> : Styles › <b>Styles de cellules</b> : des styles prêts à l'emploi (Titre 1, Total, Entrée, Calcul, Satisfaisant / Insatisfaisant) cohérents avec le thème du classeur.</p><p><b>Étape 6</b> : le pinceau <b>Reproduire la mise en forme</b> copie le format d'une cellule ; double-clic sur le pinceau pour l'appliquer plusieurs fois, Échap pour arrêter.</p>` },

/* 20 — FUSIONNER vs CENTRER */
{ title: 'Fusionner ou centrer ?', html: `${H('« Fusionner et centrer » : à éviter', 'Piège', PATH('Ctrl+1 > Alignement > Centré sur plusieurs colonnes'))}
${X02G({ x: 70, y: 210, cols: 3, colw: [200, 140, 140], rh: 50, head: false, rows: [['', '', ''], ['Article', 'Prix HT', 'Prix TTC'], ['Agrafeuse', '18,00', '21,60']],
  cells: [{ r: 'A1:C1', v: 'Grille 2026 (fusionnée)', al: 'center', fw: 800, bg: '#FEF2F2', c: '#DC2626', st: 'border:2px solid #DC2626' }] })}
<div class="callout f" data-s="1" style="left:70px;top:430px;width:530px;background:#DC2626">✘ Tri, filtre, sélection de colonne : <b>bloqués</b><br><span style="font-size:17px;font-weight:500">« Cette opération nécessite des cellules fusionnées de taille identique »</span></div>
${X02G({ x: 860, y: 210, cols: 3, colw: [200, 140, 140], rh: 50, head: false, d: .4, rows: [['', '', ''], ['Article', 'Prix HT', 'Prix TTC'], ['Agrafeuse', '18,00', '21,60']],
  cells: [{ r: 'A1:C1', v: 'Grille 2026 (centrée)', al: 'center', fw: 800, bg: '#F0FDF4', c: '#107C41', s: 2, st: 'border-left:0' }],
  svg: ({ RH }) => `<g class="f" data-s="2"><path d="M246 ${RH} v${RH}M386 ${RH} v${RH}" stroke="#94A3B8" stroke-dasharray="4 4"/></g>` })}
<div class="callout f" data-s="3" style="left:860px;top:430px;width:530px;background:#16A34A">✔ Même rendu, cellules <b>indépendantes</b><br><span style="font-size:17px;font-weight:500">tri, filtre et sélection fonctionnent</span></div>
${TIP('Fusionner reste acceptable pour un <b>titre</b> hors des données, jamais <b>dans</b> une liste.', { s: 4, x: 70, y: 620, w: 1460 })}`,
  n: `<p><b>Étape 1</b> : « Fusionner et centrer » (Accueil › Alignement) donne un beau titre… mais transforme 3 cellules en une seule. Conséquences : impossible de trier (message « Cette opération nécessite des cellules fusionnées de taille identique »), sélection de colonne qui déborde, copier-coller qui échoue.</p><p><b>Étapes 2 et 3</b> : l'alternative : sélectionner A1:C1, <b>Ctrl+1</b> › onglet Alignement › Horizontal : <b>Centré sur plusieurs colonnes</b>. Le rendu est identique et chaque cellule reste indépendante.</p><p><b>Étape 4</b> : la fusion est tolérable pour un titre de rapport, hors de la zone de données. Jamais à l'intérieur d'une liste qu'on veut trier ou filtrer.</p>` },

/* 21 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: '$', hfs: 110, hsub: 'le cadenas d\'Excel', hk: 'EXCEL 02',
  items: [{ ic: '↧', t: 'Recopier', d: 'Poignée (double-clic), Ctrl+D, Ctrl+R · Options de recopie' }, { ic: '↔', t: 'Relative (B2)', d: 'Un déplacement : suit la recopie, idéal ligne par ligne' },
    { ic: '🔒', t: 'Absolue ($B$2)', d: 'Total, taux, paramètre : ne bouge jamais · touche F4' }, { ic: '⊞', t: 'Mixte ($A2, B$1)', d: 'Tableaux à double entrée' }, { ic: '🎨', t: 'Mise en forme', d: 'En-têtes distincts, nombres à droite, pas de fusion dans les données' }] }),
  n: `<p>Faites reformuler : « Quand faut-il un $ ? » → quand la référence ne doit pas bouger à la recopie : un total, un taux, une cellule paramètre.</p><p>Exercice éclair : afficher =B5*$C$1 et demander ce qu'elle devient recopiée deux lignes plus bas (=B7*$C$1).</p>` },

/* 22 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Sept raccourcis du module', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'F4', d: 'Basculer relative / absolue / mixte' }, { k: 'Ctrl+D', d: 'Recopier vers le bas' }, { k: 'Ctrl+R', d: 'Recopier vers la droite' }, { k: 'Ctrl+G', d: 'Gras' }, { k: 'Ctrl+Maj+%', d: 'Format Pourcentage' }, { k: 'Ctrl+Maj+$', d: 'Format Monétaire' }, { k: 'Ctrl+1', d: 'Format de cellule' }, { k: 'Ctrl+"', d: 'Afficher les formules' }], { cols: 4, y: 200 })}
${TIP('<b>F4</b> hors saisie a un autre rôle : il <b>répète la dernière action</b> (ex. une couleur de remplissage).', { s: 9, kind: 'key', y: 640, w: 980 })}`,
  n: `<p>F4 a deux vies : pendant la saisie d'une formule, il bascule les $ ; en dehors, il <b>répète la dernière action</b> (appliquer la même couleur, insérer une ligne…).</p><p>Ctrl+" (Ctrl+guillemet, touche 3 du clavier AZERTY) bascule l'affichage des formules : idéal pour vérifier les $ après une recopie.</p>` },

/* 23 — LAB */
{ title: 'Lab', html: LAB({ app: 'excel', mod: 'x02', lab: 0, title: 'Lab — La grille tarifaire', tasks: ['<b>C2</b> : <code>=B2*(1+$H$1)</code> recopiée jusqu\'en C10', '<b>D2</b> : <code>=C2*(1-$H$2)</code> recopiée jusqu\'en D10', '<b>B11</b> : total HT avec <b>SOMME</b> (125,80)', '<b>E2</b> : <code>=B2/$B$11</code> recopiée, format <b>%</b>', 'TVA à <b>5,5 %</b> : ne modifiez que <b>H1</b>', 'En-têtes <b>A1:E1</b> : gras + remplissage'] }),
  n: `<p>Scénario : BureauPlus prépare sa grille tarifaire client ; TVA (H1) et remise (H2) sont des paramètres.</p><p>Solution : C2 =B2*(1+$H$1) → 5,88 € ; D2 =C2*(1-$H$2) → 5,59 € ; B11 =SOMME(B2:B10) → 125,80 € ; E2 =B2/$B$11 → 3,90 % (E10 : 4,77 %) ; H1 = 0,055 → C2 passe à 5,17 € ; A1:E1 gras + remplissage.</p><p>Erreurs à surveiller : $ oublié (#DIV/0! en colonne E), $ posé sur B2 (tous les prix identiques), TVA saisie « 5,5 » au lieu de 5,5 % (prix multipliés par 6,5 !).</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'La formule =B2*$H$1 en C2 est recopiée en C7. Que devient-elle ?', o: ['=B7*$H$6', '=B7*$H$1', '=B2*$H$1', '=C7*$H$1'], a: [1], e: 'B2 est relative et devient B7 ; $H$1 est absolue et ne bouge pas.' },
  { q: 'Quelle touche fait défiler $A$1, A$1, $A1, A1 pendant la saisie ?', o: ['F2', 'F4', 'F9', 'Ctrl+$'], a: [1], e: 'F4 bascule entre les quatre types de référence (⌘+T sur Mac).' },
  { q: 'Dans la référence mixte B$2, qu\'est-ce qui reste fixe à la recopie ?', o: ['La colonne B', 'La ligne 2', 'Les deux', 'Aucun'], a: [1], e: 'Le $ verrouille ce qui le suit immédiatement : ici la ligne 2.' },
  { q: 'Vous recopiez =B2/B11 vers le bas et obtenez #DIV/0! dès la 2e ligne. Pourquoi ?', o: ['B11 est au format texte', 'La référence au total a glissé vers B12, vide', 'Il faut utiliser SOMME', 'La colonne est trop étroite'], a: [1], e: 'Sans $, B11 devient B12, B13… cellules vides (= 0). Il faut écrire $B$11.' },
  { q: 'Pourquoi éviter « Fusionner et centrer » dans un tableau de données ?', o: ['Cela efface les formules', 'Cela gêne le tri, le filtre et la sélection', 'Ce n\'est pas disponible en français', 'Cela alourdit le fichier'], a: [1], e: 'Préférez « Centré sur plusieurs colonnes » (Ctrl+1 › Alignement).' },
  { q: 'Quelles méthodes recopient une formule vers le bas ?', o: ['Double-clic sur la poignée de recopie', 'Ctrl+D sur la plage sélectionnée', 'Ctrl+R', 'F4'], a: [0, 1], e: 'Double-clic sur la poignée ou Ctrl+D. Ctrl+R recopie vers la droite ; F4 gère les $.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b · 5) b · 6) a et b.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X02', html: END(), n: `<p>Fin du module X02. Prochain module : <b>X03 — Fonctions logiques</b> : faire décider Excel avec SI, ET, OU, compter et totaliser sous condition avec NB.SI et SOMME.SI. Le $ resservira pour figer les plages de critères.</p>` },
] };
