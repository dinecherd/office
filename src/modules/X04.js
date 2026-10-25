/* ===================== MODULE X04 — Trier, filtrer, mettre en évidence : exploiter une liste de données ===================== */
const SECSX04 = ['Trier et filtrer', 'Mise en forme conditionnelle', 'Tableaux et volets figés'];

/* ---- helpers locaux X04 : GRID enrichie (cellules superposées, cadres au-dessus, 2e formule, SVG de recopie) ---- */
function X04G(o) {
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
const X04SB = (html, o = {}) => `<div class="${o.s ? 'f' : 'a fade'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : '--d:.4s;'}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;height:40px;display:flex;align-items:center;justify-content:flex-end;gap:26px;padding:0 18px;background:#F3F4F6;border:1px solid #D9DEE5;border-radius:0 0 10px 10px;font:600 17px 'Segoe UI',var(--font);color:#33445E">${html}</div>`;

/* données du lab « TechDépôt » */
const X04D = [['REF-101', 'Câble HDMI 2 m', 'Connectique', 45, 20, '8,90 €'], ['REF-102', 'Souris sans fil', 'Périphériques', 12, 15, '19,90 €'], ['REF-103', 'Clavier AZERTY', 'Périphériques', 8, 10, '29,90 €'], ['REF-104', 'Écran 24 pouces', 'Écrans', 6, 5, '149,00 €'],
  ['REF-105', 'Hub USB-C', 'Connectique', 31, 15, '24,50 €'], ['REF-106', 'Webcam HD', 'Périphériques', 17, 10, '39,00 €'], ['REF-107', 'Casque audio', 'Audio', 4, 8, '59,00 €'], ['REF-108', 'Rallonge 5 prises', 'Électricité', 52, 25, '12,40 €'],
  ['REF-109', 'Écran 27 pouces', 'Écrans', 3, 4, '219,00 €'], ['REF-110', 'Adaptateur DP-HDMI', 'Connectique', 26, 20, '11,50 €'], ['REF-111', 'Enceinte Bluetooth', 'Audio', 9, 6, '45,00 €'], ['REF-112', 'Station d\'accueil', 'Connectique', 14, 8, '129,00 €']];
const X04H = ['Référence', 'Désignation', 'Catégorie', 'Stock', 'Seuil', 'Prix'];
const X04W = [112, 190, 134, 80, 74, 104];
const X04SORT = [8, 6, 3, 2, 10, 1, 11, 5, 9, 4, 0, 7];
const X04MULTI = [6, 10, 11, 9, 4, 0, 8, 3, 7, 2, 1, 5];
/* remplace une ligne entière par d'autres valeurs (tri animé) */
const X04ROWS = (order, s, extra = {}) => order.flatMap((k, i) => X04D[k].map((v, c) => ({ r: String.fromCharCode(65 + c) + (i + 2), v, s, al: c < 3 ? 'flex-start' : 'flex-end', fw: c === 3 ? 800 : 400, bg: extra.bg ? extra.bg(k, c) : '#fff', c: extra.c ? extra.c(k, c) : '#0E1726', d: i * .05 })));
/* numéros de ligne bleus (lignes filtrées) */
const X04BLUE = (g, nums) => nums.reduce((h, n, i) => h.replace(`<span class="xg-rn">${i + 2}</span>`, `<span class="xg-rn" style="color:#2563EB;font-weight:900">${n}</span>`), g);
const X04ARROW = g => X04H.reduce((h, t) => h.replace(`>${t}</span>`, `>${t}<span style="margin-left:auto;display:inline-grid;place-items:center;width:20px;height:20px;border:1px solid #94A3B8;border-radius:4px;background:#fff;font-size:11px;color:#33445E">▾</span></span>`), g);
const X04DLG = (title, body, o = {}) => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : '--d:.3s;'}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:0;overflow:hidden;font-family:'Segoe UI',var(--font)"><div style="padding:10px 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700">${title}</div><div style="padding:16px 20px;font-size:18px">${body}</div></div>`;

window.MODULE = { code: 'X04', title: 'Trier, filtrer, mettre en évidence : exploiter une liste de données', short: 'Trier et filtrer', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Trier et filtrer', html: TITLE({ mod: 'EXCEL · MODULE 04 · INTERMÉDIAIRE', title: 'Trier, filtrer, <span class="grad">mettre en évidence</span>', sub: '« D\'une liste brute à un outil de pilotage »', agenda: SECSX04, art: APPART('excel') }),
  n: `<p>Module 4 d'Excel, niveau intermédiaire, durée indicative <b>55 minutes</b>.</p><p>Fil rouge : vous êtes responsable logistique chez <b>TechDépôt</b>. Lundi, réunion de réapprovisionnement : la liste du stock (12 articles) doit faire ressortir les articles critiques et rester confortable à consulter.</p><p>Question d'ouverture : « Combien de lignes contiennent vos plus grosses listes Excel ? Comment y retrouvez-vous une information ? » Souvent : Ctrl+F et beaucoup de défilement. Ce module change cela.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['<b>Trier</b> une liste sur une ou plusieurs colonnes', '<b>Filtrer</b> : textes, nombres, couleurs', 'Créer des règles de <b>mise en forme conditionnelle</b>', 'Mettre une plage <b>sous forme de tableau</b>', '<b>Figer les volets</b> pour garder les en-têtes']),
  n: `<p>Cinq outils, une condition commune : une <b>liste propre</b> (une ligne d'en-têtes, pas de ligne vide, une information par cellule), comme vu au module X01.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX04, 0), n: `<p>Première partie : trier et filtrer, pour voir d'abord ce qui compte.</p>` },

/* 4 — TRI SIMPLE */
{ title: 'Trier une colonne', html: `${H('Trier : cliquez dans UNE cellule', 'Tri croissant', PATH('Données > Trier et filtrer > Trier de A à Z'))}
${X04G({ x: 70, y: 180, cols: 6, colw: X04W, rh: 36, rows: [X04H, ...X04D], sel: 'D2', cells: X04ROWS(X04SORT, 2, { bg: (k, c) => c === 3 ? '#ECFDF3' : '#fff' }), hl2: [{ r: 'D2', s: 1, c: '#FA582D' }] })}
<div class="col" style="position:absolute;left:880px;right:70px;top:190px;gap:14px">
 ${CARD('<b>1 ·</b> Cliquez dans <b>une seule cellule</b> de la colonne Stock', 1)}
 ${CARD('<b>2 ·</b> <b>Trier de A à Z</b> (du plus petit au plus grand) : les lignes entières se déplacent', 2)}
 ${CARD('<b>3 ·</b> En tête : Écran 27 pouces (3), Casque audio (4), Écran 24 pouces (6)…', 3)}</div>
${TIP('Excel détecte seul la <b>zone contiguë</b> et la <b>ligne d\'en-têtes</b>.', { s: 4, x: 880, y: 520, w: 650, kind: 'ok' })}
${TIP('Astuce : une colonne <b>N°</b> (1, 2, 3…) permet de retrouver l\'ordre d\'origine.', { s: 5, x: 880, y: 640, w: 650 })}`,
  n: `<p><b>Étape 1</b> : on clique dans <b>une seule</b> cellule de la colonne à trier (D2), pas sur toute la colonne.</p><p><b>Étape 2</b> : Données › Trier et filtrer › <b>Trier de A à Z</b> (pour des nombres : du plus petit au plus grand). Excel détecte la zone de données et la ligne d'en-têtes, et déplace les <b>lignes entières</b> : chaque référence garde son stock, son seuil, son prix.</p><p><b>Étape 3</b> : résultat : Écran 27 pouces (3), Casque audio (4), Écran 24 pouces (6), Clavier (8), Enceinte (9), Souris (12), Station d'accueil (14), Webcam (17), Adaptateur (26), Hub (31), Câble (45), Rallonge (52).</p><p><b>Étapes 4-5</b> : le tri dépend d'une liste propre ; et un tri est définitif : prévoyez une colonne N° pour revenir à l'ordre initial. Les mêmes boutons existent dans Accueil › Édition › Trier et filtrer.</p>` },

/* 5 — LE PIÈGE DU TRI */
{ title: 'Le piège du tri', html: `${H('Ne jamais désolidariser les lignes', 'Erreur fréquente')}
${X04DLG('Avertissement de tri', `<div style="margin-bottom:12px">Microsoft Excel a trouvé des données en regard de votre sélection.</div><div style="padding:8px 12px;border-radius:8px;background:#ECFDF3;color:#107C41;font-weight:800">◉ Étendre la sélection</div><div style="padding:8px 12px;color:#DC2626">○ Continuer avec la sélection en cours</div><div style="text-align:right;margin-top:10px"><span class="chip dark">Trier</span></div>`, { x: 70, y: 190, w: 560, s: 1 })}
${X04G({ x: 700, y: 190, cols: 3, colw: [196, 76, 76], rh: 44, rows: [['Désignation', 'Stock', 'Seuil'], ['Câble HDMI 2 m', 45, 20], ['Souris sans fil', 12, 15], ['Clavier AZERTY', 8, 10], ['Écran 24 pouces', 6, 5]],
  cells: [[6, 'Câble HDMI 2 m'], [8, 'Souris sans fil'], [12, 'Clavier AZERTY'], [45, 'Écran 24 pouces']].map(([v], i) => ({ r: 'B' + (i + 2), v: String(v), s: 2, c: '#DC2626', bg: '#FEF2F2', d: i * .1 })), hl2: [{ r: 'B2:B5', s: 2, c: '#DC2626', t: 'seule la colonne a bougé !' }] })}
${STAT({ v: 'Câble : 6 ?', t: 'le stock du câble est maintenant celui de l\'écran', x: 1180, y: 190, w: 350, s: 3, c: '#DC2626' })}
${VS({ y: 520, l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['Sélectionner la colonne D seule', '« Continuer avec la sélection en cours »'] }, r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['Cliquer dans <b>une</b> cellule, sans sélection', 'Toujours « <b>Étendre la sélection</b> »'] }, s1: 4, s2: 4 })}`,
  n: `<p><b>Étape 1</b> : si l'on a sélectionné toute la colonne Stock avant de trier, Excel affiche l'« Avertissement de tri » : il a vu des données à côté.</p><p><b>Étape 2</b> : choisir « Continuer avec la sélection en cours » ne trie <b>que</b> la colonne Stock : les autres colonnes restent en place. Chaque article se retrouve avec le stock d'un autre.</p><p><b>Étape 3</b> : le câble HDMI affiche maintenant 6 en stock, l'écran 24 pouces 45… Les données sont corrompues, souvent sans qu'on s'en aperçoive. Ctrl+Z immédiatement si cela arrive.</p><p><b>Étape 4</b> : la règle : cliquer dans une seule cellule sans rien sélectionner ; et si la boîte apparaît, toujours « Étendre la sélection ».</p>` },

/* 6 — TRI MULTI-NIVEAUX */
{ title: 'Trier sur plusieurs niveaux', html: `${H('Catégorie, puis stock croissant', 'Tri personnalisé', PATH('Données > Trier et filtrer > Trier'))}
${X04DLG('Trier', `<div style="display:flex;gap:10px;margin-bottom:12px;font-size:15px"><span class="chip blu">+ Ajouter un niveau</span><span class="chip">✕ Supprimer</span><span style="margin-left:auto">☑ Mes données ont des en-têtes</span></div>
 <div style="display:grid;grid-template-columns:110px 1fr 1fr 1fr;gap:8px;font-size:16px;color:#6B7A90"><span>Colonne</span><span></span><span>Trier sur</span><span>Ordre</span></div>
 <div class="f" data-s="1" style="display:grid;grid-template-columns:110px 1fr 1fr 1fr;gap:8px;align-items:center;margin-top:8px"><span>Trier par</span><b style="border:1px solid #CBD5E1;padding:4px 8px;border-radius:5px">Catégorie</b><span>Valeurs</span><span>De A à Z</span></div>
 <div class="f" data-s="2" style="display:grid;grid-template-columns:110px 1fr 1fr 1fr;gap:8px;align-items:center;margin-top:8px"><span>Puis par</span><b style="border:1px solid #CBD5E1;padding:4px 8px;border-radius:5px">Stock</b><span>Valeurs</span><span>Du plus petit au plus grand</span></div>`, { x: 70, y: 190, w: 700 })}
${X04G({ x: 820, y: 180, cols: 3, colw: [196, 140, 76], rh: 36, rows: [['Désignation', 'Catégorie', 'Stock'], ...X04D.map(r => [r[1], r[2], r[3]])],
  cells: X04MULTI.flatMap((k, i) => [[1, 0], [2, 1], [3, 2]].map(([c, cc]) => ({ r: String.fromCharCode(65 + cc) + (i + 2), v: X04D[k][c], s: 3, al: cc < 2 ? 'flex-start' : 'flex-end', fw: cc === 1 ? 800 : 400, bg: ['Audio', 'Écrans', 'Périphériques'].includes(X04D[k][2]) ? '#F0FDF4' : '#fff', d: i * .05 }))) })}
${PROC([{ t: '<b>Trier sur</b> : Valeurs, Couleur de cellule, Couleur de police, Icône' }, { t: '<b>Ordre</b> : Liste personnalisée… (Lun, Mar, Mer…)' }], { x: 70, y: 470, w: 700, s0: 4 })}`,
  n: `<p>Pour trier sur plusieurs critères : Données › Trier et filtrer › <b>Trier</b> (le grand bouton) ouvre la boîte de dialogue.</p><p><b>Étape 1</b> : premier niveau : Catégorie, de A à Z.</p><p><b>Étape 2</b> : « Ajouter un niveau » : puis par Stock, du plus petit au plus grand. À l'intérieur de chaque catégorie, les stocks les plus bas remontent.</p><p><b>Étape 3</b> : résultat : Audio (Casque 4, Enceinte 9), Connectique (14, 26, 31, 45), Écrans (3, 6), Électricité (52), Périphériques (8, 12, 17). Excel ignore les accents : « Écrans » se classe comme « Ecrans ».</p><p><b>Étapes 4-5</b> : on peut aussi trier par couleur de cellule (utile après une mise en forme conditionnelle) ou selon une liste personnalisée (jours, mois, tailles S-M-L).</p>` },

/* 7 — FILTRER */
{ title: 'Filtrer', html: `${H('Filtrer : masquer sans supprimer', 'Filtre automatique', PATH('Données > Trier et filtrer > Filtrer'))}
${X04ARROW(X04G({ x: 70, y: 180, cols: 6, colw: X04W, rh: 36, rows: [X04H, ...X04D] }).replace('class="xg a pop"', 'class="xg a pop" id="x04f"'))}
<div class="card f zoom" data-s="2" style="position:absolute;left:360px;top:250px;width:320px;padding:12px 0;font-size:17px;z-index:3">
 <div style="padding:4px 16px;color:#6B7A90">↑ Trier de A à Z</div><div style="padding:4px 16px;color:#6B7A90;border-bottom:1px solid #E3E8EF;margin-bottom:6px">Filtres textuels ›</div>
 ${['(Sélectionner tout)', 'Audio', 'Connectique', 'Écrans', 'Électricité', 'Périphériques'].map(t => `<div style="padding:3px 16px">${t === 'Connectique' ? '☑' : '☐'} ${t === 'Connectique' ? `<b style="color:#107C41">${t}</b>` : t}</div>`).join('')}
 <div style="text-align:right;padding:8px 16px 0"><span class="chip dark">OK</span></div></div>
${X04BLUE(X04G({ x: 860, y: 180, cols: 3, colw: [196, 140, 76], rh: 36, rows: [['Désignation', 'Catégorie', 'Stock'], ...[0, 4, 9, 11].map(k => [X04D[k][1], X04D[k][2], X04D[k][3]])] }), [2, 6, 11, 13]).replace('class="xg a pop"', 'class="xg f zoom" data-s="3"')}
${X04SB('4 enregistrements trouvés sur 12', { x: 860, y: 397, w: 460, s: 3 })}
${TIP('Numéros de ligne <b>bleus</b>, entonnoir sur la flèche : un filtre est actif. Rien n\'est supprimé.', { s: 4, x: 860, y: 480, w: 670, kind: 'warn' })}
${TIP('<b>Données › Effacer</b> pour tout réafficher.', { s: 5, x: 860, y: 610, w: 670 })}`,
  n: `<p><b>Étape 1</b> : Données › <b>Filtrer</b> (Ctrl+Maj+L) : une flèche déroulante apparaît dans chaque en-tête.</p><p><b>Étape 2</b> : on ouvre la liste de la colonne Catégorie (Alt+Flèche bas) : décocher « (Sélectionner tout) », cocher Connectique, OK.</p><p><b>Étape 3</b> : seules les 4 lignes Connectique restent visibles (lignes 2, 6, 11, 13). Les autres sont <b>masquées</b>, pas supprimées. La barre d'état indique « 4 enregistrements trouvés sur 12 ».</p><p><b>Étape 4</b> : indices d'un filtre actif : numéros de ligne en bleu, entonnoir sur la flèche. Piège classique : un collègue vous envoie un fichier filtré et vous croyez qu'il manque des données.</p><p><b>Étape 5</b> : Données › Effacer réaffiche tout ; cliquer à nouveau sur Filtrer retire les flèches.</p>` },

/* 8 — FILTRES AVANCÉS */
{ title: 'Filtres textuels, numériques, couleur', html: `${H('Au-delà des cases à cocher', 'Types de filtres')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
 ${[['Aa', 'Filtres textuels', ['Contient…', 'Commence par…', 'Se termine par…'], '#2563EB'], ['123', 'Filtres numériques', ['Supérieur à…', '10 premiers…', 'Au-dessus de la moyenne'], '#107C41'], ['📅', 'Filtres chronologiques', ['Ce mois-ci', 'Trimestre précédent', 'Entre…'], '#7C3AED'], ['🎨', 'Filtrer par couleur', ['Couleur de cellule', 'Couleur de police', 'Icône'], '#FA582D']].map(([ic, t, l, c], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:22px 20px;border-top:6px solid ${c}"><div style="font:900 34px var(--mono);color:${c}">${ic}</div><div style="font-size:22px;font-weight:800;margin:8px 0 10px">${t}</div>${l.map(x => `<div style="font-size:18px;padding:4px 0;color:#33445E">› ${x}</div>`).join('')}</div>`).join('')}</div>
<div class="card f left" data-s="5" style="position:absolute;left:70px;right:70px;top:500px;padding:18px 26px;display:flex;gap:30px;align-items:center">
 <span style="font:800 22px var(--mono);color:#107C41;white-space:nowrap">Stock › Au-dessous de la moyenne</span><span style="font-size:20px">moyenne = 227 / 12 ≈ <b>18,9</b> → 8 articles</span></div>
${TIP('Les filtres se <b>cumulent</b> : Catégorie = Connectique <b>et</b> Stock < 20 → la station d\'accueil.', { s: 6, x: 70, y: 620, w: 1460 })}`,
  n: `<p>Le menu d'un filtre propose des sous-menus selon le type de la colonne.</p><p><b>Étape 1 — Filtres textuels</b> : contient, commence par… (ex. Désignation contient « Écran »).</p><p><b>Étape 2 — Filtres numériques</b> : supérieur à, entre, 10 premiers (paramétrable : 3 premiers, 10 %…), au-dessus / au-dessous de la moyenne.</p><p><b>Étape 3 — Filtres chronologiques</b> pour les dates : ce mois-ci, trimestre précédent, année à ce jour…</p><p><b>Étape 4 — Filtrer par couleur</b> : particulièrement utile avec la mise en forme conditionnelle (partie suivante).</p><p><b>Étape 5</b> : exemple : Stock au-dessous de la moyenne (227 / 12 ≈ 18,9) → 8 articles.</p><p><b>Étape 6</b> : les filtres de plusieurs colonnes se combinent (ET) : Connectique ET stock &lt; 20 → seule la station d'accueil (14).</p>` },

/* 9 — SOUS.TOTAL */
{ title: 'Totaliser le visible', html: `${H('SOMME compte aussi les lignes masquées', 'Piège', PATH('=SOUS.TOTAL(109;D2:D13)'))}
${X04BLUE(X04G({ x: 70, y: 190, cols: 4, colw: [196, 140, 90, 90], rh: 44, rows: [['Désignation', 'Catégorie', 'Stock', ''], ...[0, 4, 9, 11].map(k => [X04D[k][1], X04D[k][2], X04D[k][3], '']), ['SOMME', '', '', ''], ['SOUS.TOTAL', '', '', '']],
  cells: [{ r: 'C6', v: '227', s: 1, c: '#DC2626', bg: '#FEF2F2', fw: 900 }, { r: 'D6', v: '✘', s: 1, c: '#DC2626', al: 'center' }, { r: 'C7', v: '116', s: 3, c: '#107C41', bg: '#ECFDF3', fw: 900 }, { r: 'D7', v: '✔', s: 3, c: '#107C41', al: 'center' }] }), [2, 6, 11, 13, 14, 15])}
<div class="col" style="position:absolute;left:720px;right:70px;top:190px;gap:16px">
 ${CARD('<b class="mono" style="color:#DC2626">=SOMME(D2:D13)</b> → <b>227</b> : tout le stock, lignes masquées comprises', 1, 'border-left:6px solid #DC2626')}
 ${CARD('Visible : 45 + 31 + 26 + 14 = <b>116</b>', 2)}
 ${CARD('<b class="mono" style="color:#107C41">=SOUS.TOTAL(109;D2:D13)</b> → <b>116</b> : seulement le visible', 3, 'border-left:6px solid #16A34A')}
 ${CARD('Alternative : <b class="mono">=AGREGAT(9;5;D2:D13)</b>', 4)}</div>
${TIP('Le bouton <b>Σ Somme automatique</b> sur une liste filtrée écrit <b>SOUS.TOTAL</b> tout seul.', { s: 5, x: 720, y: 600, w: 810, kind: 'ok' })}`,
  n: `<p>Liste filtrée sur Connectique : 4 lignes visibles sur 12.</p><p><b>Étape 1</b> : =SOMME(D2:D13) renvoie <b>227</b> : SOMME additionne aussi les lignes masquées par le filtre. Le chiffre est faux pour le lecteur qui ne voit que la Connectique.</p><p><b>Étape 2</b> : le total visible attendu : 45 + 31 + 26 + 14 = 116.</p><p><b>Étape 3</b> : =SOUS.TOTAL(109;D2:D13) → <b>116</b>. Le premier argument choisit l'opération : 9 ou 109 = somme (109 ignore aussi les lignes masquées manuellement), 1/101 = moyenne, 3/103 = NBVAL…</p><p><b>Étape 4</b> : AGREGAT(9;5;…) : somme en ignorant les lignes masquées, et peut aussi ignorer les erreurs.</p><p><b>Étape 5</b> : astuce : sur une liste filtrée, Alt+= ou Σ insère directement un SOUS.TOTAL.</p>` },

/* 10 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX04, 1), n: `<p>Deuxième partie : la mise en forme conditionnelle. L'œil voit l'alerte avant de lire le chiffre.</p>` },

/* 11 — MFC INFÉRIEUR À */
{ title: 'Mise en forme conditionnelle', html: `${H('Colorer les stocks inférieurs à 20', 'Règle de surbrillance', PATH('Accueil > Styles > Mise en forme conditionnelle'))}
${X04G({ x: 70, y: 180, cols: 4, colw: X04W.slice(0, 4), rh: 36, rows: [X04H.slice(0, 4), ...X04D.map(r => r.slice(0, 4))], hl: [{ r: 'D2:D13', s: 1, c: '#2563EB' }],
  cells: X04D.map((r, i) => r[3] < 20 ? { r: 'D' + (i + 2), v: String(r[3]), s: 3, bg: '#FFC7CE', c: '#9C0006', d: i * .06 } : null).filter(Boolean) })}
${X04DLG('Inférieur à', `<div style="margin-bottom:10px">Appliquer une mise en forme aux cellules qui sont INFÉRIEURES À :</div><div style="display:flex;gap:12px;align-items:center"><b style="border:2px solid #107C41;padding:4px 18px;border-radius:5px;font-size:22px">20</b><span>avec</span><span style="border:1px solid #CBD5E1;padding:4px 10px;border-radius:5px;background:#FFC7CE;color:#9C0006;font-size:16px">Remplissage rouge clair avec texte rouge foncé ▾</span></div>`, { x: 730, y: 190, w: 800, s: 2 })}
${STAT({ v: '8 / 12', t: 'articles sous 20 unités : 3, 4, 6, 8, 9, 12, 14, 17', x: 730, y: 400, w: 800, s: 3, c: '#DC2626' })}
${PROC([{ t: 'MFC › <b>Règles de mise en surbrillance des cellules</b> › <b>Inférieur à…</b>' }], { x: 730, y: 570, w: 800, s0: 4 })}`,
  n: `<p><b>Étape 1</b> : on sélectionne la plage à surveiller : D2:D13.</p><p><b>Étape 2</b> : Accueil › Styles › Mise en forme conditionnelle › Règles de mise en surbrillance des cellules › <b>Inférieur à…</b> : on tape 20, on garde « Remplissage rouge clair avec texte rouge foncé ».</p><p><b>Étape 3</b> : 8 cellules se colorent instantanément : 3, 4, 6, 8, 9, 12, 14, 17. Et la règle est <b>vivante</b> : si le stock du câble descend à 15, il se colore tout seul.</p><p><b>Étape 4</b> : le chemin complet. Les autres règles de surbrillance : supérieur à, entre, égal à, texte qui contient, une date se produisant, valeurs en double.</p><p>Bonus : on peut ensuite <b>trier ou filtrer par couleur</b> pour regrouper les articles en alerte.</p>` },

/* 12 — BARRES, NUANCES, ICÔNES */
{ title: 'Barres, nuances et icônes', html: `${H('Des mini-graphiques dans les cellules', 'Visualiser')}
${X04G({ x: 70, y: 180, cols: 4, colw: [196, 200, 200, 120], rh: 38, rows: [['Désignation', 'Barres de données', 'Nuances', 'Icônes'], ...X04D.map(r => [r[1], '', '', ''])],
  cells: [...X04D.map((r, i) => { const t = (r[3] - 3) / 49; return { r: 'C' + (i + 2), v: String(r[3]), s: 2, bg: `rgb(${Math.round(248 - t * 149)},${Math.round(105 + t * 85)},${Math.round(107 + t * 16)})`, c: '#0E1726', d: i * .04 }; }),
    ...X04D.map((r, i) => ({ r: 'D' + (i + 2), v: `<span style="color:${r[3] >= 35.83 ? '#16A34A' : r[3] >= 19.17 ? '#F59E0B' : '#DC2626'};font-size:20px;margin-right:auto">${r[3] >= 35.83 ? '▲' : r[3] >= 19.17 ? '◆' : '▼'}</span>${r[3]}`, s: 3, d: i * .04, fw: 600 }))],
  svg: ({ B }) => X04D.map((r, i) => { const b = B('B' + (i + 2)); return `<g class="f" data-s="1"><defs><linearGradient id="x04b${i}"><stop offset="0" stop-color="#638EC6"/><stop offset="1" stop-color="#638EC6" stop-opacity=".15"/></linearGradient></defs><rect x="${b.x + 4}" y="${b.y + 5}" width="${(r[3] / 52 * (b.w - 50)).toFixed(1)}" height="${b.h - 10}" fill="url(#x04b${i})" stroke="#638EC6"/><text x="${b.x + b.w - 10}" y="${b.y + 25}" text-anchor="end" font-size="17" fill="#0E1726">${r[3]}</text></g>`; }).join('') })}
<div class="col" style="position:absolute;left:880px;right:70px;top:200px;gap:16px">
 ${CARD('<b>1 · Barres de données</b> : la longueur suit la valeur', 1)}${CARD('<b>2 · Nuances de couleurs</b> : du rouge (bas) au vert (haut)', 2)}${CARD('<b>3 · Jeux d\'icônes</b> : 3 tiers de l\'écart min–max', 3)}</div>
${TIP('Idéal pour un tableau de bord. Pour une <b>alerte</b>, préférez une règle simple et une seule couleur.', { s: 4, x: 880, y: 470, w: 650 })}`,
  n: `<p>Mise en forme conditionnelle › trois familles graphiques.</p><p><b>Étape 1 — Barres de données</b> : une barre proportionnelle à la valeur (la rallonge, 52, a la barre la plus longue).</p><p><b>Étape 2 — Nuances de couleurs</b> : un dégradé du minimum (rouge) au maximum (vert).</p><p><b>Étape 3 — Jeux d'icônes</b> : par défaut, Excel découpe l'écart min–max (3 à 52) en trois tiers de 33 % : ≥ 35,8 flèche verte, ≥ 19,2 orange, sinon rouge. Ces seuils se règlent dans Gérer les règles › Modifier.</p><p><b>Étape 4</b> : ces visuels sont parfaits pour comparer d'un coup d'œil ; pour une décision (commander ou non), une règle binaire est plus claire. Raccourci : sélection + <b>Ctrl+Q</b> (Analyse rapide) propose ces formats en aperçu.</p>` },

/* 13 — MFC PAR FORMULE */
{ title: 'Règle avec une formule', html: `${H('Colorer toute la ligne : =$D2<$E2', 'Règle par formule', PATH('MFC > Nouvelle règle > Utiliser une formule…'))}
${X04G({ x: 70, y: 180, cols: 5, colw: X04W.slice(0, 5), rh: 36, rows: [X04H.slice(0, 5), ...X04D.map(r => r.slice(0, 5))], hl: [{ r: 'A2:E13', s: 1, c: '#2563EB' }],
  cells: [3, 4, 8, 10].flatMap((r, j) => X04D[r - 2].slice(0, 5).map((v, c) => ({ r: String.fromCharCode(65 + c) + r, v: String(v), s: 3, al: c < 3 ? 'flex-start' : 'flex-end', bg: '#FFC7CE', c: '#9C0006', fw: c === 3 ? 800 : 500, d: j * .12 }))) })}
${X04DLG('Nouvelle règle de mise en forme', `<div style="color:#6B7A90;font-size:16px">► Utiliser une formule pour déterminer pour quelles cellules le format sera appliqué</div><div style="margin-top:10px">Appliquer une mise en forme aux valeurs pour lesquelles cette formule est vraie :</div><div style="margin-top:8px;border:2px solid #107C41;border-radius:6px;padding:8px 12px;font:800 26px var(--mono);color:#107C41">=<span style="color:#DC2626">$</span>D2&lt;<span style="color:#DC2626">$</span>E2</div>`, { x: 730, y: 190, w: 800, s: 2 })}
<div class="col" style="position:absolute;left:730px;right:70px;top:450px;gap:14px">
 ${CARD('<b>$D</b>, <b>$E</b> : colonnes figées, <b>chaque cellule</b> de la ligne teste le stock et le seuil', 4)}
 ${CARD('<b>2</b> sans $ : la ligne suit → ligne 3 teste D3 &lt; E3…', 4)}
 ${CARD('4 lignes sous leur seuil : Souris, Clavier, Casque, Écran 27', 3, 'border-left:6px solid #DC2626')}</div>`,
  n: `<p>Le seuil de 20 était arbitraire : chaque article a son propre seuil (colonne E). On veut colorer <b>la ligne entière</b> quand Stock &lt; Seuil.</p><p><b>Étape 1</b> : sélectionner toute la zone A2:E13 (la cellule active est A2).</p><p><b>Étape 2</b> : MFC › Nouvelle règle › « Utiliser une formule pour déterminer pour quelles cellules le format sera appliqué » : <b>=$D2&lt;$E2</b>, puis Format… › Remplissage.</p><p><b>Étape 3</b> : 4 lignes se colorent : Souris (12 &lt; 15), Clavier (8 &lt; 10), Casque (4 &lt; 8), Écran 27 pouces (3 &lt; 4). L'Écran 24 pouces (6 ≥ 5) n'est pas en alerte malgré un stock faible.</p><p><b>Étape 4</b> : le cœur du raisonnement (module X02) : la formule est écrite pour la cellule active A2, puis « recopiée » sur toute la plage. $D et $E figent les colonnes pour que B2, C2… testent aussi D et E ; le 2 sans $ laisse la ligne s'adapter. Écrire =D2&lt;E2 ne colorerait que des cellules décalées.</p>` },

/* 14 — GÉRER LES RÈGLES */
{ title: 'Gérer les règles', html: `${H('Gérer les règles, garder un sens clair', 'Bonne pratique', PATH('MFC > Gérer les règles'))}
${X04DLG('Gestionnaire des règles de mise en forme conditionnelle', `<div style="display:flex;gap:8px;margin-bottom:12px;font-size:15px"><span class="chip blu">+ Nouvelle règle</span><span class="chip">✎ Modifier la règle</span><span class="chip bad">✕ Supprimer</span><span class="chip">▲ ▼</span></div>
 <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr 90px;gap:8px;font-size:15px;color:#6B7A90;padding:0 8px"><span>Règle</span><span>Format</span><span>S'applique à</span><span>Interrompre</span></div>
 ${[['Formule : =$D2<$E2', '=$A$2:$E$13', 1], ['Valeur de cellule < 20', '=$D$2:$D$13', 2]].map(([r, a, s]) => `<div class="f" data-s="${s}" style="display:grid;grid-template-columns:1.4fr 1fr 1fr 90px;gap:8px;align-items:center;padding:8px;border-top:1px solid #E3E8EF;font-size:17px"><span class="mono">${r.replace('<', '&lt;')}</span><span style="background:#FFC7CE;color:#9C0006;padding:2px 8px;border-radius:4px">AaBbCc</span><span class="mono">${a}</span><span>☐</span></div>`).join('')}`, { x: 70, y: 190, w: 900 })}
${VS({ y: 470, l: { t: 'Arc-en-ciel', c: '#DC2626', ic: '✘', items: ['5 règles, 6 couleurs', 'Plus rien ne ressort'] }, r: { t: 'Un sens clair', c: '#16A34A', ic: '✔', items: ['1 à 2 couleurs maximum', '<b>Rouge = action requise</b>'] }, s1: 3, s2: 4 }).replace('left:70px;right:70px', 'left:70px;right:630px')}
${STAT({ v: '1 règle', t: 'qui déclenche une action vaut mieux que 5 qui décorent', x: 1010, y: 200, w: 520, s: 4, c: '#16A34A' })}
${TIP('Supprimer : <b>MFC › Effacer les règles</b> de la sélection ou de toute la feuille.', { s: 5, x: 1010, y: 400, w: 520, kind: 'key' })}`,
  n: `<p><b>Étapes 1-2</b> : Accueil › Mise en forme conditionnelle › <b>Gérer les règles</b> affiche toutes les règles de la sélection (ou de la feuille, via la liste « Afficher les règles de mise en forme pour »). On y modifie la formule, le format, la plage « S'applique à », l'ordre de priorité (flèches), et l'option « Interrompre si Vrai ».</p><p>Piège fréquent : à force de copier-coller, une même règle est dupliquée en dizaines d'exemplaires sur des plages morcelées. Le gestionnaire permet de nettoyer.</p><p><b>Étapes 3-4</b> : bonne pratique : une ou deux couleurs maximum, avec un sens partagé (rouge = action requise). Un tableau arc-en-ciel n'alerte plus personne.</p><p><b>Étape 5</b> : MFC › Effacer les règles › de la sélection ou de toute la feuille.</p>` },

/* 15 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX04, 2), n: `<p>Troisième partie : le tableau structuré, un objet intelligent qui s'étend tout seul, et les volets figés pour naviguer confortablement.</p>` },

/* 16 — METTRE SOUS FORME DE TABLEAU */
{ title: 'Mettre sous forme de tableau', html: `${H('Une plage devient un objet intelligent', 'Tableau structuré', PATH('Accueil > Styles > Mettre sous forme de tableau'))}
${X04DLG('Créer un tableau', `<div>Où se trouvent les données de votre tableau ?</div><div style="margin:8px 0;border:1px solid #CBD5E1;border-radius:5px;padding:5px 10px;font:700 20px var(--mono)">=$A$1:$F$13</div><div>☑ Mon tableau comporte des en-têtes</div><div style="text-align:right;margin-top:8px"><span class="chip dark">OK</span></div>`, { x: 70, y: 190, w: 470, s: 1 })}
${(X04G({ x: 556, y: 180, cols: 4, colw: X04W.slice(0, 4), rh: 36, rows: [X04H.slice(0, 4), ...X04D.map(r => r.slice(0, 4))], d: .3,
  cells: [...X04H.slice(0, 4).map((t, c) => ({ r: String.fromCharCode(65 + c) + 1, v: t + ' <span style="margin-left:auto;font-size:11px;border:1px solid #fff;border-radius:3px;padding:0 4px">▾</span>', s: 2, bg: '#107C41', c: '#fff', al: 'flex-start', fw: 800, st: 'gap:6px' })),
    ...X04D.flatMap((r, i) => i % 2 ? [] : r.slice(0, 4).map((v, c) => ({ r: String.fromCharCode(65 + c) + (i + 2), v: String(v), s: 2, bg: '#E8F5EC', al: c < 3 ? 'flex-start' : 'flex-end', fw: 400 })))] }))}
<div class="col" style="position:absolute;left:1150px;right:70px;top:190px;gap:14px">
 ${CARD('<b>Lignes à bandes</b> + filtre automatique', 2)}${CARD('S\'<b>étend tout seul</b> avec les nouvelles lignes', 3)}${CARD('En-têtes visibles en défilant', 3)}${CARD('Onglet <b>Création de tableau</b> : nom, ligne Total, segments', 4)}</div>
${KEYCARDS([{ k: 'Ctrl+L', d: 'ou Ctrl+T' }], { x: 70, r: 1060, y: 420, cols: 1, s0: 1 })}
${TIP('Renommez-le : <b>tblStock</b> se lit mieux que Tableau3.', { s: 5, x: 70, y: 600, w: 470 })}`,
  n: `<p><b>Étape 1</b> : cliquez dans la liste, puis Accueil › Styles › <b>Mettre sous forme de tableau</b> (ou Insertion › Tableau, ou <b>Ctrl+L</b> / Ctrl+T). Excel propose la plage =$A$1:$F$13 ; vérifiez la case « Mon tableau comporte des en-têtes ».</p><p><b>Étape 2</b> : la plage devient un <b>tableau structuré</b> : style à bandes, flèches de filtre automatiques.</p><p><b>Étape 3</b> : surtout, il <b>s'étend tout seul</b> : une ligne tapée juste en dessous est intégrée ; formules, graphiques et TCD qui s'y réfèrent suivent sans retouche. En défilant, les en-têtes du tableau remplacent les lettres de colonnes.</p><p><b>Étape 4</b> : l'onglet contextuel <b>Création de tableau</b> apparaît : Propriétés › Nom du tableau, Options de style › Ligne Total, Insérer un segment (filtres visuels).</p><p><b>Étape 5</b> : nommez vos tableaux (tblStock) : les formules deviennent lisibles.</p>` },

/* 17 — RÉFÉRENCES STRUCTURÉES */
{ title: 'Les références structurées', html: `${H('Des formules qui parlent : [@Stock]*[@Prix]', 'Références structurées')}
${X04G({ x: 70, y: 180, cols: 4, colw: [196, 76, 104, 130], rh: 36, rows: [['Désignation', 'Stock', 'Prix', 'Valeur'], ...X04D.map(r => [r[1], r[3], r[5], '']), ['Total', '', '', '']], sel: 'D2', fx: { ref: 'D2', f: '=[@Stock]*[@Prix]', s: 1 }, fx2: [{ ref: 'D14', f: '=SOUS.TOTAL(109;[Valeur])', s: 4 }],
  cells: [...['400,50', '238,80', '239,20', '894,00', '759,50', '663,00', '236,00', '644,80', '657,00', '299,00', '405,00', '1 806,00'].map((v, i) => ({ r: 'D' + (i + 2), v: v + ' €', s: i ? 3 : 2, c: '#107C41', bg: '#ECFDF3', d: i * .06 })),
    { r: 'A14:D14', v: '', s: 4, bg: '#E8F5EC', st: 'border-top:3px double #107C41' }, { r: 'A14', v: 'Total', s: 4, bg: 'transparent', al: 'flex-start', fw: 900 }, { r: 'D14', v: '7 242,80 €', s: 5, c: '#107C41', fw: 900, bg: 'transparent' }],
  hl: [{ r: 'B2', s: 1, c: '#2563EB' }, { r: 'C2', s: 1, c: '#DC2626' }] })}
<div class="col" style="position:absolute;left:670px;right:70px;top:190px;gap:14px">
 ${CARD('<b class="mono">[@Stock]</b> = « le stock <b>de cette ligne</b> »', 1)}${CARD('Entrée → <b>400,50 €</b> (45 × 8,90)', 2)}
 ${CARD('La formule se <b>propage seule</b> à toute la colonne', 3)}${CARD('<b>Ligne Total</b> : <span class="mono">=SOUS.TOTAL(109;[Valeur])</span>', 4)}
 ${CARD('Ailleurs : <b class="mono">=SOMME(tblStock[Valeur])</b> → 7 242,80 €', 5)}</div>`,
  n: `<p>On ajoute une colonne Valeur au tableau (ici rapprochée pour la lecture).</p><p><b>Étape 1</b> : on tape = puis on clique sur la cellule Stock de la même ligne : Excel écrit <b>[@Stock]</b> au lieu de D2. Le @ signifie « cette ligne ». Puis * et clic sur Prix → [@Prix].</p><p><b>Étape 2</b> : 45 × 8,90 = 400,50 €.</p><p><b>Étape 3</b> : sans recopie : la formule se propage automatiquement à toute la colonne (colonne calculée). 238,80 · 239,20 · 894 · 759,50 · 663 · 236 · 644,80 · 657 · 299 · 405 · 1 806.</p><p><b>Étape 4</b> : Création de tableau › Ligne Total : Excel ajoute une ligne avec une liste déroulante (Somme, Moyenne, Nombre…) qui écrit SOUS.TOTAL(109;[Valeur]) : le total suit les filtres !</p><p><b>Étape 5</b> : en dehors du tableau : =SOMME(tblStock[Valeur]) → 7 242,80 €. Cette formule restera juste quand le tableau grandira.</p>` },

/* 18 — LE TABLEAU S'ÉTEND */
{ title: 'Le tableau s\'étend tout seul', html: `${H('Une ligne de plus, rien à refaire', 'Extension automatique')}
${X04G({ x: 70, y: 190, cols: 4, colw: [196, 140, 76, 130], rh: 42, rows: [['Désignation', 'Catégorie', 'Stock', 'Valeur'], ...[9, 10, 11].map(k => [X04D[k][1], X04D[k][2], X04D[k][3], ['299,00 €', '405,00 €', '1 806,00 €'][k - 9]]), ['', '', '', ''], ['Total', '', '', '7 242,80 €']],
  cells: [{ r: 'A5', v: 'Souris ergonomique', s: 1, al: 'flex-start', fw: 400, bg: '#FFF7ED' }, { r: 'B5', v: 'Périphériques', s: 2, al: 'flex-start', fw: 400, bg: '#E8F5EC' }, { r: 'C5', v: '5', s: 2, fw: 400, bg: '#E8F5EC' }, { r: 'D5', v: '174,50 €', s: 3, c: '#107C41', bg: '#ECFDF3' }, { r: 'D6', v: '7 417,30 €', s: 4, c: '#107C41', bg: '#ECFDF3', fw: 900 }],
  hl2: [{ r: 'A1:D5', s: 2, c: '#107C41' }] })}
<div class="col" style="position:absolute;left:720px;right:70px;top:200px;gap:14px">
 ${CARD('<b>1 ·</b> On tape un nouvel article sous le tableau', 1)}${CARD('<b>2 ·</b> Le tableau l\'<b>absorbe</b> : style, filtre, plage', 2)}
 ${CARD('<b>3 ·</b> La colonne calculée se remplit : 5 × 34,90 = <b>174,50 €</b>', 3)}${CARD('<b>4 ·</b> Total, graphiques, TCD : <b>à jour</b> → 7 417,30 €', 4)}</div>
${TIP('Avec une plage classique, chaque formule <span class="mono">SOMME(D2:D13)</span> serait à corriger à la main.', { s: 5, x: 720, y: 560, w: 810, kind: 'warn' })}`,
  n: `<p>La démonstration qui convainc d'utiliser les tableaux.</p><p><b>Étape 1</b> : on tape « Souris ergonomique » juste sous la dernière ligne.</p><p><b>Étape 2</b> : à la validation, le tableau s'étend : la ligne prend le style, entre dans le filtre ; la poignée bleue en bas à droite du tableau descend d'une ligne.</p><p><b>Étape 3</b> : la colonne calculée Valeur se remplit sans recopie : 5 × 34,90 € = 174,50 €.</p><p><b>Étape 4</b> : la ligne Total, les formules =SOMME(tblStock[Valeur]), les graphiques et tableaux croisés dynamiques basés sur le tableau suivent : 7 242,80 + 174,50 = 7 417,30 €.</p><p><b>Étape 5</b> : avec une plage ordinaire, SOMME(D2:D13) ignorerait la nouvelle ligne 14 — une source d'erreur très fréquente dans les fichiers mensuels.</p>` },

/* 19 — FIGER LES VOLETS */
{ title: 'Figer les volets', html: `${H('Garder les en-têtes à l\'écran', 'Figer les volets', PATH('Affichage > Fenêtre > Figer les volets'))}
${X04BLUE(X04G({ x: 70, y: 180, cols: 4, colw: X04W.slice(0, 4), rh: 38, rows: [X04H.slice(0, 4), ...Array.from({ length: 8 }, (_, i) => { const r = X04D[(i + 4) % 12]; return [r[0].replace(/\d+$/, n => String(+n + 380)), r[1], r[2], r[3]]; })],
  svg: ({ B }) => { const b = B('A1:D1'); return `<g class="f" data-s="2"><path d="M0 ${b.y + b.h} H ${b.x + b.w}" stroke="#0E1726" stroke-width="3"/></g><g class="f" data-s="4"><path d="M${b.x + 112} 0 V ${38 * 10}" stroke="#0E1726" stroke-width="3"/></g>`; } }), [482, 483, 484, 485, 486, 487, 488, 489]).replace('<span class="xg-rn">1</span>', '<span class="xg-rn" style="font-weight:900">1</span>')}
<div class="f" data-s="2" style="position:absolute;left:70px;top:572px;padding:3px 10px;border-radius:6px;background:#0E1726;color:#fff;font:800 14px var(--font)">ligne 1 figée</div>
<div class="col" style="position:absolute;left:720px;right:70px;top:190px;gap:14px">
 ${CARD('<b>1 ·</b> Ligne 482 : sans figer, plus aucun en-tête…', 1)}${CARD('<b>2 · Figer la ligne supérieure</b> : la ligne 1 reste visible', 2)}
 ${CARD('<b>3 · Figer la première colonne</b> : la colonne A reste visible', 3)}${CARD('<b>4 · Figer les volets</b> : tout ce qui est <b>au-dessus et à gauche</b> de la cellule active → cliquez en <b>B2</b>', 4, 'border-left:6px solid #107C41')}</div>
${TIP('Figer = <b>écran</b> uniquement. À l\'impression : <b>Mise en page › Imprimer les titres › Lignes à répéter en haut</b>.', { s: 5, x: 720, y: 600, w: 810, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : sur une liste de 500 lignes, dès qu'on descend, les en-têtes disparaissent : à la ligne 482, quelle colonne est le stock, laquelle le seuil ?</p><p><b>Étape 2</b> : Affichage › Fenêtre › Figer les volets › <b>Figer la ligne supérieure</b> : un trait marque la limite, la ligne 1 reste affichée quel que soit le défilement.</p><p><b>Étape 3</b> : <b>Figer la première colonne</b> : utile pour une liste très large (la référence reste visible).</p><p><b>Étape 4</b> : <b>Figer les volets</b> fige tout ce qui est au-dessus et à gauche de la cellule active. Pour figer la ligne 1 <i>et</i> la colonne A : cliquez en B2 avant. Pour annuler : Libérer les volets.</p><p><b>Étape 5</b> : figer n'agit que sur l'écran. Pour répéter les en-têtes sur chaque page imprimée : Mise en page › Imprimer les titres › Lignes à répéter en haut : $1:$1.</p>` },

/* 20 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: '12', hfs: 96, hsub: 'articles, 0 oubli', hk: 'EXCEL 04',
  items: [{ ic: '↕️', t: 'Trier', d: 'Une seule cellule cliquée · toujours « Étendre la sélection » · plusieurs niveaux' }, { ic: 'filteri', t: 'Filtrer', d: 'Masque sans supprimer · Ctrl+Maj+L · SOUS.TOTAL(109;…) pour le visible' },
    { ic: '🚦', t: 'Mise en forme conditionnelle', d: 'Surbrillance, barres, icônes · =$D2<$E2 pour la ligne entière' }, { ic: 'tablei', t: 'Tableau structuré', d: 'Ctrl+L · s\'étend seul · [@Stock]*[@Prix] · ligne Total' }, { ic: '📌', t: 'Figer les volets', d: 'Ligne 1 et colonne A : cellule active en B2' }] }),
  n: `<p>Faites rejouer mentalement la préparation de la réunion de lundi : tri par stock, MFC sur les seuils, filtre, volets figés, tableau. C'est exactement l'enchaînement du lab.</p>` },

/* 21 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Sept raccourcis pour exploiter une liste', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Ctrl+Maj+L', d: 'Activer / désactiver le filtre' }, { k: 'Alt+Flèche bas', d: 'Ouvrir la liste du filtre' }, { k: 'Ctrl+L', d: 'Mettre sous forme de tableau (ou Ctrl+T)' }, { k: 'Ctrl+Maj+Flèche bas', d: 'Étendre la sélection en bas' }, { k: 'Ctrl+A', d: 'Sélectionner la zone de données' }, { k: 'Alt+F1', d: 'Créer un graphique sur la feuille' }, { k: 'Ctrl+Q', d: 'Analyse rapide (MFC, graphiques…)' }], { cols: 4, y: 200 })}
${TIP('Le plus rentable : <b>Ctrl+Maj+L</b>, un filtre en une seconde.', { s: 8, kind: 'key', y: 640, w: 800 })}`,
  n: `<p>Le duo <b>Ctrl+Maj+L</b> puis <b>Alt+Flèche bas</b> permet de filtrer sans souris. <b>Ctrl+A</b> dans une liste sélectionne la zone de données (un second appui : toute la feuille). <b>Alt+F1</b> crée instantanément un graphique de la sélection ; <b>Ctrl+Q</b> ouvre l'Analyse rapide.</p>` },

/* 22 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'excel', mod: 'x04', lab: 0, title: 'Lab 1 — L\'inventaire de l\'entrepôt', tasks: ['Trier par <b>Stock croissant</b>', 'MFC sur <b>D2:D13</b> : stock <b>inférieur à 20</b>', 'Activer le <b>filtre</b> sur les en-têtes', '<b>Figer la ligne 1</b>', '<b>Mettre sous forme de tableau</b>'] }),
  n: `<p>Scénario : responsable logistique chez TechDépôt, réunion de réapprovisionnement lundi.</p><p>Solution : clic en D2 › Trier de A à Z (Écran 27 pouces en tête) ; D2:D13 › MFC Inférieur à 20 → 8 articles ; Données › Filtrer ; Affichage › Figer la ligne supérieure ; Accueil › Mettre sous forme de tableau.</p><p>Pour aller plus loin dans le vrai Excel : règle par formule =$D2&lt;$E2 sur A2:F13 (Souris, Clavier, Casque, Écran 27 pouces).</p>` },

/* 23 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'excel', mod: 'x04', lab: 1, title: 'Lab 2 — Défi : l\'analyste pressé', tasks: [`${KEYS('Ctrl+Maj+L')} filtre · ${KEYS('Alt+Flèche bas')} liste`, `${KEYS('Ctrl+A')} zone · ${KEYS('Ctrl+Maj+Flèche bas')} étendre`, `${KEYS('Ctrl+Maj+%')} pourcentage · ${KEYS('Alt+F1')} graphique`, `${KEYS('F4')} répéter · ${KEYS('F9')} recalculer`] }),
  n: `<p>30 secondes pour filtrer, sélectionner et visualiser une liste : enchaînez les 8 raccourcis. Ctrl+Maj+L est le plus rentable du module ; Alt+F1 crée un graphique instantané à partir de la sélection.</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Que fait un filtre sur les lignes qui ne correspondent pas au critère ?', o: ['Il les supprime', 'Il les masque temporairement', 'Il les déplace en bas', 'Il les colore en gris'], a: [1], e: 'Le filtre masque ; Données › Effacer réaffiche tout.' },
  { q: 'Une liste est filtrée. Quelle fonction totalise uniquement les lignes visibles ?', o: ['SOMME', 'SOMME.SI', 'SOUS.TOTAL(109;…)', 'NBVAL'], a: [2], e: 'SOUS.TOTAL 109 (ou 9) ignore les lignes masquées par un filtre ; SOMME les inclut.' },
  { q: 'Quel avantage principal apporte « Mettre sous forme de tableau » ?', o: ['Le fichier est protégé', 'La plage s\'étend automatiquement avec les nouvelles lignes', 'Les formules deviennent des valeurs', 'Les cellules sont fusionnées'], a: [1], e: 'Formules, graphiques et TCD qui s\'y réfèrent suivent sans retouche.' },
  { q: 'Pour figer la ligne 1 et la colonne A, où placer la cellule active ?', o: ['A1', 'A2', 'B1', 'B2'], a: [3], e: 'Figer les volets fige ce qui est au-dessus et à gauche de la cellule active.' },
  { q: 'Quelle règle de MFC colore toute la ligne quand le stock (D) est sous le seuil (E) ?', o: ['=D2<E2', '=$D2<$E2', '=$D$2<$E$2', '=D$2<E$2'], a: [1], e: 'Colonnes figées ($D, $E), ligne relative pour s\'adapter à chaque ligne.' },
  { q: 'Avant un tri, vous sélectionnez la colonne D seule. Que faut-il choisir ?', o: ['Continuer avec la sélection en cours', 'Étendre la sélection', 'Annuler et fusionner', 'Peu importe'], a: [1], e: 'Sinon seule la colonne D est triée et les lignes sont désolidarisées.' },
] ); }, n: `<p>Réponses : 1) b · 2) c · 3) b · 4) d · 5) b · 6) b.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X04', html: END(), n: `<p>Fin du module X04 et du niveau intermédiaire. Prochain module : <b>X05 — Les fonctions de recherche</b> (RECHERCHEX, INDEX/EQUIV) pour croiser des listes, en s'appuyant sur les tableaux structurés vus ici.</p>` },
] };
