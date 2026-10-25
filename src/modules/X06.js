/* ===================== MODULE X06 — Graphiques et tableaux croisés dynamiques (Avancé) ===================== */
const SECSX06 = ['Choisir le bon graphique', 'Créer et soigner un graphique', 'Les tableaux croisés dynamiques'];

/* ---- données et helpers locaux X06 ---- */
const MX06 = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const CAX06 = [42500, 38900, 45200, 47800, 51300, 49700, 36400, 29800, 46100, 52600, 58900, 63400];
const OBX06 = [40000, 40000, 42000, 42000, 45000, 45000, 40000, 35000, 45000, 48000, 50000, 55000];
const fmtX06 = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
/* repère de graphique : renvoie {x(i), y(v), svg (grille + axes)} */
function FRAMEX06(o) {
  const W = o.w, Hh = o.h, L = o.l ?? 80, R = 20, T = o.t ?? 30, B = 44, n = o.n || 12, max = o.max || 70000, stp = o.step || 10000;
  const x = i => L + (i + .5) * (W - L - R) / n, y = v => T + (1 - v / max) * (Hh - T - B), bw = (W - L - R) / n;
  let g = '';
  for (let v = 0; v <= max; v += stp) g += `<path d="M${L} ${y(v)} H${W - R}" stroke="#E3E8EF" stroke-width="1.5"/><text x="${L - 10}" y="${y(v) + 6}" text-anchor="end" font-size="16" fill="#6B7A90">${o.yf ? o.yf(v) : fmtX06(v / 1000) + ' k'}</text>`;
  g += (o.labels || MX06).map((m, i) => `<text x="${x(i)}" y="${Hh - B + 28}" text-anchor="middle" font-size="17" font-weight="700" fill="#33445E">${m}</text>`).join('');
  return { x, y, bw, L, R, T, B, W, Hh, svg: g };
}
/* courbe dessinée */
function LINEX06(o) {
  const F = FRAMEX06(o), pts = o.data.map((v, i) => [F.x(i), F.y(v)]);
  const d = 'M' + pts.map(p => p.map(n => n.toFixed(1)).join(' ')).join(' L');
  return `<svg viewBox="0 0 ${o.w} ${o.h}" style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;overflow:visible" ${o.s ? `class="f" data-s="${o.s}"` : 'class="a fade" style="--d:.2s"'}>${F.svg}
   <path d="${d}" fill="none" stroke="${o.c || '#107C41'}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" class="draw" pathLength="1" style="--d:.3s;animation-duration:2.2s"/>
   ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#fff" stroke="${o.c || '#107C41'}" stroke-width="4" class="a pop" style="--d:${.4 + i * .15}s"/>`).join('')}${o.extra ? o.extra(F) : ''}</svg>`;
}
/* histogramme groupé : séries = [{data, c, s}], barres qui « poussent » (trait .draw) */
function BARSX06(o) {
  const F = FRAMEX06(o), k = o.series.length, bw = F.bw * .78 / k;
  const bars = o.series.map((S, j) => `<g ${S.s ? `class="f" data-s="${S.s}"` : ''}>${S.data.map((v, i) => { const cx = F.x(i) - F.bw * .39 + bw * (j + .5); const c = typeof S.c === 'function' ? S.c(v, i) : S.c;
    return `<path d="M${cx.toFixed(1)} ${F.y(0)} V${F.y(v).toFixed(1)}" stroke="${c}" stroke-width="${(bw - 3).toFixed(1)}" class="draw" pathLength="1" style="--d:${(.1 + i * .06).toFixed(2)}s"/>`; }).join('')}</g>`).join('');
  return `<svg viewBox="0 0 ${o.w} ${o.h}" style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;overflow:visible" class="a fade" style="--d:.1s">${F.svg}${bars}${o.extra ? o.extra(F) : ''}</svg>`;
}
/* cadre « graphique Excel » (fond blanc, titre) */
const CHX06 = (x, y, w, h, title, inner, s, tc = '#0E1726') => `<div class="card ${s ? 'f zoom' : 'a pop'}" ${s ? `data-s="${s}"` : ''} style="--d:.15s;position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;padding:0;overflow:visible"><div style="position:absolute;left:0;right:0;top:16px;text-align:center;font-size:22px;font-weight:800;color:${tc}">${title}</div>${inner}</div>`;
/* mini TCD (tableau HTML style Excel) */
const PVX06 = (o) => `<div class="${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;background:#fff;border-radius:12px;box-shadow:var(--sh);overflow:hidden;font-family:'Segoe UI',sans-serif">
 <table style="width:100%;border-collapse:collapse;font-size:${o.fs || 19}px">${o.head ? `<tr>${o.head.map((h, i) => `<th style="background:#DDEBF7;color:#1F3864;text-align:${i ? 'right' : 'left'};padding:8px 12px;border-bottom:2px solid #9BC2E6">${h}</th>`).join('')}</tr>` : ''}
 ${o.rows.map((r, k) => `<tr ${o.rs ? `class="f" data-s="${o.rs + k}"` : ''}>${r.map((c, i) => `<td style="padding:7px 12px;text-align:${i ? 'right' : 'left'};border-bottom:1px solid #EEF0F3;${o.heat && i && typeof o.heat(c) === 'string' ? 'background:' + o.heat(c) : ''}">${c}</td>`).join('')}</tr>`).join('')}
 ${o.tot ? `<tr>${o.tot.map((c, i) => `<td style="padding:8px 12px;text-align:${i ? 'right' : 'left'};font-weight:800;background:#DDEBF7;border-top:2px solid #9BC2E6">${c}</td>`).join('')}</tr>` : ''}</table></div>`;
const VENX06 = [['Alice', 'Ouest', 'Kayak', '1 250'], ['Bruno', 'Est', 'Paddle', '890'], ['Alice', 'Ouest', 'Paddle', '640'], ['Chloé', 'Sud', 'Kayak', '1 480'], ['David', 'Est', 'Kayak', '1 320'], ['Bruno', 'Est', 'Gilet', '210'], ['Chloé', 'Sud', 'Paddle', '760'], ['Alice', 'Ouest', 'Gilet', '185'], ['Emma', 'Sud', 'Kayak', '1 390'], ['David', 'Est', 'Paddle', '920'], ['Emma', 'Sud', 'Gilet', '240'], ['Alice', 'Ouest', 'Kayak', '1 170'], ['Chloé', 'Sud', 'Gilet', '160'], ['Bruno', 'Est', 'Kayak', '1 410']];

window.MODULE = { code: 'X06', title: 'Graphiques et tableaux croisés dynamiques', short: 'Graphiques et TCD', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Graphiques et TCD', html: TITLE({ mod: 'EXCEL · MODULE 06 · AVANCÉ', title: 'Faire <span class="grad">parler</span> les chiffres', sub: '« Le bon graphique, et des milliers de lignes résumées en trois clics »', agenda: SECSX06, art: APPART('excel') }),
  n: `<p>Ce module transforme des données en <b>messages</b>. Deux outils : le <b>graphique</b>, pour faire voir une tendance ou une comparaison en une seconde, et le <b>tableau croisé dynamique</b> (TCD), pour résumer une longue liste sans écrire une seule formule.</p><p>Fil rouge : le reporting annuel d'Écoverde (mobilier de jardin) puis l'analyse des ventes de Rivière &amp; Glisse (kayaks et paddles).</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Choisir le <b>type de graphique</b> adapté au message', 'Créer et <b>soigner</b> un graphique : titre, axes, étiquettes', 'Construire un <b>TCD</b> : Lignes, Colonnes, Valeurs, Filtres', 'Changer la <b>synthèse</b> (somme, nombre, moyenne) et <b>actualiser</b>']),
  n: `<p>Quatre objectifs, deux labs : <b>Lab 1</b> (reporting mensuel : total, meilleur mois, deux graphiques) et <b>Lab 2</b> (trois TCD et un contrôle par SOMME.SI).</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX06, 0), n: `<p>Avant de cliquer sur Insertion, une question : <b>quel est mon message ?</b> Le type de graphique en découle.</p>` },

/* 4 — UN MESSAGE, UN GRAPHIQUE */
{ title: 'Un message, un graphique', html: `${H('Un message = un type de graphique', 'Choisir avant de cliquer')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px">
 ${[['Évolution dans le temps', 'Courbes', `<path d="M10 80 L50 60 L90 66 L130 34 L170 20" fill="none" stroke="#107C41" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="draw" pathLength="1"/>`],
    ['Comparer des catégories', 'Barres triées', `${[150, 120, 90, 60].map((w, i) => `<path d="M10 ${18 + i * 22} H${w}" stroke="#2563EB" stroke-width="15" class="draw" pathLength="1" style="--d:${i * .1}s"/>`).join('')}`],
    ['Part d\'un tout (≤ 5 parts)', 'Secteurs / anneau', `<circle cx="90" cy="50" r="38" fill="none" stroke="#E2E8F0" stroke-width="22"/><circle cx="90" cy="50" r="38" fill="none" stroke="#FA582D" stroke-width="22" pathLength="100" stroke-dasharray="40 60" transform="rotate(-90 90 50)"/><circle cx="90" cy="50" r="38" fill="none" stroke="#F59E0B" stroke-width="22" pathLength="100" stroke-dasharray="25 75" stroke-dashoffset="-40" transform="rotate(-90 90 50)"/>`],
    ['Réel vs objectif', 'Histogramme groupé', `${[0, 1, 2, 3].map(i => `<path d="M${22 + i * 40} 92 V${40 + (i % 2) * 12}" stroke="#107C41" stroke-width="14" class="draw" pathLength="1"/><path d="M${38 + i * 40} 92 V${48 - i * 4}" stroke="#94A3B8" stroke-width="14" class="draw" pathLength="1"/>`).join('')}`],
    ['Contribution à une variation', 'Cascade', `<rect x="10" y="40" width="26" height="52" fill="#2563EB"/><rect x="46" y="22" width="26" height="18" fill="#16A34A"/><rect x="82" y="22" width="26" height="28" fill="#DC2626"/><rect x="118" y="10" width="26" height="40" fill="#16A34A"/><rect x="154" y="10" width="26" height="82" fill="#2563EB"/>`],
    ['Relation entre 2 mesures', 'Nuage de points', `${[[20, 80], [40, 70], [60, 64], [75, 50], [95, 52], [110, 38], [130, 30], [150, 26], [165, 14]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="6" fill="#7C3AED" class="a pop" style="--d:${.2 + i * .05}s"/>`).join('')}`]].map(([m, t, svg], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="display:flex;gap:18px;align-items:center;padding:18px 20px"><svg viewBox="0 0 180 100" style="width:180px;height:100px;flex:none;overflow:visible">${svg}</svg><div><div style="font-size:18px;color:#6B7A90;font-weight:700">${m}</div><div style="font-size:26px;font-weight:900">${t}</div></div></div>`).join('')}
</div>
${TIP(`${PATH('Insertion > Graphiques > Graphiques recommandés')} : Excel propose, <b>vous</b> choisissez selon le message.`, { s: 7, x: 70, y: 540, w: 1100 })}`,
  n: `<p>La grille de choix, une carte par clic :</p><ul><li><b>Évolution</b> dans le temps → courbe (ou histogramme s'il y a peu de périodes).</li><li><b>Comparaison</b> entre catégories → barres, <b>triées</b> du plus grand au plus petit.</li><li><b>Part d'un tout</b> → secteurs ou anneau, seulement avec 5 parts maximum.</li><li><b>Écart réel / objectif</b> → histogramme groupé ou graphique combiné (barres + courbe).</li><li><b>Contribution</b> à une variation → cascade (du résultat N-1 au résultat N).</li><li><b>Relation</b> entre deux mesures → nuage de points (prix et quantité, surface et loyer).</li></ul><p><b>Étape 7</b> : « Graphiques recommandés » est un bon point de départ, mais c'est le message qui décide. Question au groupe : « Pour montrer la saisonnalité des ventes, que choisissez-vous ? »</p>` },

/* 5 — LA COURBE */
{ title: 'Évolution : la courbe', html: `${H('Évolution : la courbe', 'Écoverde · CA mensuel 2026')}
${CHX06(70, 175, 1000, 560, 'Le CA chute l\'été et s\'envole en fin d\'année', LINEX06({ x: 10, y: 50, w: 980, h: 500, data: CAX06, extra: F => `
  <g class="f" data-s="1"><rect x="${F.x(6) - 34}" y="${F.T}" width="${F.x(7) - F.x(6) + 68}" height="${F.y(0) - F.T}" rx="12" fill="#DC2626" fill-opacity=".08" stroke="#DC2626" stroke-dasharray="8 6" stroke-width="2"/><text x="${(F.x(6) + F.x(7)) / 2}" y="${F.y(0) - 14}" text-anchor="middle" font-size="18" font-weight="800" fill="#DC2626">creux d'été</text></g>
  <g class="f zoom" data-s="2"><circle cx="${F.x(11)}" cy="${F.y(63400)}" r="16" fill="none" stroke="#FA582D" stroke-width="4" class="pulse"/><text x="${F.x(11) - 22}" y="${F.y(63400) - 20}" text-anchor="end" font-size="20" font-weight="900" fill="#FA582D">63 400 € en décembre</text></g>` }))}
<div class="col" style="position:absolute;left:1110px;right:70px;top:190px;gap:18px">
 ${STAT({ v: '562 600 €', t: 'CA annuel · =SOMME(B2:B13)', x: 0, y: 0, w: 420, s: 3, c: '#107C41' }).replace('position:absolute;left:0px;top:0px;', '')}
 ${STAT({ v: 'Décembre', t: '=INDEX(A2:A13;EQUIV(B15;B2:B13;0))', x: 0, y: 0, w: 420, s: 4, c: '#FA582D' }).replace('position:absolute;left:0px;top:0px;', '')}
</div>
${TIP('La pente se lit <b>immédiatement</b> : c\'est le graphique de l\'évolution.', { s: 5, x: 1110, y: 560, w: 420 })}`,
  n: `<p>Les données du Lab 1 : le CA mensuel d'Écoverde en 2026 (A1:B13). La courbe se dessine de janvier à décembre.</p><p><b>Étape 1</b> : la saisonnalité saute aux yeux : creux de juillet (36 400 €) et d'août (29 800 €).</p><p><b>Étape 2</b> : pic de décembre à 63 400 € (=MAX(B2:B13)).</p><p><b>Étape 3</b> : le total annuel : 562 600 € (tâche 1 du lab).</p><p><b>Étape 4</b> : le nom du meilleur mois avec INDEX/EQUIV, révision du module X05 : <code>=INDEX(A2:A13;EQUIV(B15;B2:B13;0))</code> → Décembre.</p><p><b>Étape 5</b> : remarquez le titre du graphique : il énonce la <b>conclusion</b>, pas seulement « CA 2026 ». Nous y reviendrons.</p>` },

/* 6 — BARRES CA VS OBJECTIF */
{ title: 'Comparer : réel vs objectif', html: `${H('Comparer : CA et objectif', 'Histogramme groupé')}
${CHX06(70, 175, 1060, 580, 'CA au-dessus de l\'objectif 9 mois sur 12', BARSX06({ x: 10, y: 50, w: 1040, h: 520, series: [{ data: CAX06, c: (v, i) => v < OBX06[i] ? '#DC2626' : '#107C41' }, { data: OBX06, c: '#94A3B8', s: 1 }],
  extra: F => [1, 6, 7].map(i => `<g class="f zoom" data-s="2"><circle cx="${F.x(i)}" cy="${F.y(OBX06[i]) - 26}" r="15" fill="#DC2626"/><text x="${F.x(i)}" y="${F.y(OBX06[i]) - 20}" text-anchor="middle" font-size="18" font-weight="900" fill="#fff">!</text></g>`).join('') }))}
<div style="position:absolute;left:1160px;right:70px;top:200px;display:flex;flex-direction:column;gap:16px">
 <div class="card a pop" style="--d:.4s;display:flex;align-items:center;gap:12px;padding:14px 18px;font-size:20px"><i style="width:22px;height:22px;border-radius:5px;background:#107C41"></i>CA ≥ objectif</div>
 <div class="card f" data-s="1" style="display:flex;align-items:center;gap:12px;padding:14px 18px;font-size:20px"><i style="width:22px;height:22px;border-radius:5px;background:#94A3B8"></i>Objectif</div>
 <div class="card f" data-s="2" style="display:flex;align-items:center;gap:12px;padding:14px 18px;font-size:20px"><i style="width:22px;height:22px;border-radius:5px;background:#DC2626"></i>Février · Juillet · Août</div>
</div>
${TIP('Sélection <b>A1:C13</b> (avec les en-têtes) › Insertion › Histogramme groupé', { s: 3, kind: 'key', x: 1160, y: 520, w: 370 })}`,
  n: `<p>Deuxième graphique du Lab 1 : CA et objectif côte à côte (sélection A1:C13). Le CA apparaît en vert ou rouge selon qu'il atteint l'objectif.</p><p><b>Étape 1</b> : la série Objectif (gris) vient se placer à côté de chaque mois.</p><p><b>Étape 2</b> : trois mois sous l'objectif : <b>février</b> (38 900 € pour 40 000 €), <b>juillet</b> (36 400 € pour 40 000 €), <b>août</b> (29 800 € pour 35 000 €). Les 9 autres sont au-dessus.</p><p><b>Étape 3</b> : rappel de la manipulation. Dans le lab, le type s'appelle « Barres ». Variante plus élégante : graphique <b>combiné</b> avec le CA en histogramme et l'objectif en courbe (Création de graphique › Modifier le type de graphique › Graphique combiné).</p><p>Dans le vrai Excel, la couleur conditionnelle des barres demande une astuce (deux séries) : ici, elle illustre le message.</p>` },

/* 7 — À ÉVITER */
{ title: 'À éviter', html: `${H('Ce qui trompe l\'œil', 'À éviter')}
${VS({ y: 180, l: { t: 'À éviter', c: '#DC2626', ic: '✘', html: `<svg viewBox="0 0 560 260" style="width:100%;height:260px">
  <g transform="translate(140 130)">${Array.from({ length: 12 }, (_, i) => `<circle r="80" fill="none" stroke="hsl(${i * 30} 70% 55%)" stroke-width="100" pathLength="120" stroke-dasharray="${[12, 9, 11, 10, 8, 11, 9, 10, 10, 11, 9, 10][i]} 120" stroke-dashoffset="${-[0, 12, 21, 32, 42, 50, 61, 70, 80, 90, 101, 110][i]}" transform="rotate(-90)"/>`).join('')}</g>
  <g transform="translate(320 40)">${[90, 140, 110, 170].map((h, i) => `<path d="M${i * 55} 190 l20 -12 v-${h} l-20 12 z" fill="#1E40AF"/><rect x="${i * 55 - 30}" y="${202 - h}" width="30" height="${h - 12}" fill="#3B82F6"/><path d="M${i * 55 - 30} ${190 - h} l20 -12 h30 l-20 12 z" fill="#93C5FD"/>`).join('')}</g>
  <text x="140" y="255" text-anchor="middle" font-size="18" font-weight="700" fill="#DC2626">12 parts</text><text x="400" y="255" text-anchor="middle" font-size="18" font-weight="700" fill="#DC2626">3D, perspective</text></svg>
  <ul class="lst sm"><li>Angles proches impossibles à comparer</li><li>La 3D déforme les hauteurs</li></ul>` },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', html: `<svg viewBox="0 0 560 260" style="width:100%;height:260px">${[['Kayak', 380], ['Paddle', 250], ['Gilet', 140], ['Pagaie', 95], ['Housse', 60]].map(([l, w], i) => `<text x="100" y="${40 + i * 46}" text-anchor="end" font-size="19" font-weight="700" fill="#33445E">${l}</text><path d="M115 ${33 + i * 46} H${115 + w}" stroke="${i ? '#94A3B8' : '#16A34A'}" stroke-width="28" class="draw" pathLength="1" style="--d:${.2 + i * .1}s"/>`).join('')}</svg>
  <ul class="lst sm"><li>2D, barres <b>triées</b>, une couleur d'accent</li><li>Une idée par graphique</li></ul>` }, mid: '➜' })}`,
  n: `<p><b>Étape 1 — à éviter</b> : un secteur à 12 parts : l'œil compare très mal les angles, surtout quand ils sont proches. Et la 3D : la perspective rend les barres du fond plus petites, les étiquettes illisibles.</p><p><b>Étape 2 — à faire</b> : des barres horizontales triées, en 2D, une seule couleur d'accent pour la donnée importante, le reste en gris. Au-delà de 4-5 parts, un histogramme trié est toujours plus lisible qu'un secteur.</p><p>Règles de sobriété : pas de quadrillage chargé, pas d'ombres, pas de dégradés, légende seulement si plusieurs séries. C'est la question 5 du quiz.</p>` },

/* 8 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX06, 1), n: `<p>Créer un graphique prend deux secondes ; le rendre lisible demande quelques réglages. On voit l'insertion, les éléments du graphique et le titre qui conclut.</p>` },

/* 9 — INSÉRER */
{ title: 'Insérer un graphique', html: `${H('Insérer un graphique', 'Sélection avec en-têtes', PATH('Insertion > Graphiques'))}
${APPWIN({ app: 'excel', x: 70, y: 170, w: 960, h: 500, title: 'Reporting_2026.xlsx', tab: 'Insertion',
  groups: [['Tableaux', ['📊 Tableau croisé dynamique', '▦ Tableau']], ['Graphiques', ['✨ Graphiques recommandés', '📶', '📈', '◔', '▤']], ['Sparkline', ['📈 Courbe', '📊 Histogramme']]],
  hot: { '✨ Graphiques recommandés': 2, '📈': 3, '📈 Courbe': 5 },
  body: GRID({ inwin: true, m: 16, colw: [140, 120, 120], rh: 34, rows: [['Mois', 'CA', 'Objectif'], ['Janvier', '42 500', '40 000'], ['Février', '38 900', '40 000'], ['Mars', '45 200', '42 000'], ['Avril', '47 800', '42 000'], ['Mai', '51 300', '45 000'], ['Juin', '49 700', '45 000']], hl: [{ r: 'A1:B7', s: 1, c: '#FA582D', t: 'A1:B13' }] }) })}
<div class="col" style="position:absolute;left:1070px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 ·</b> Sélectionnez les données <b>avec les en-têtes</b>', 1)}
 ${CARD('<b>2 ·</b> Graphiques recommandés : aperçus prêts', 2)}
 ${CARD('<b>3 ·</b> Ou choisissez le type : courbes, histogramme…', 3)}
 ${CARD(`<b>4 ·</b> ${KEYS('Alt+F1')} graphique par défaut · ${KEYS('F11')} nouvelle feuille`, 4)}
 ${CARD('<b>5 ·</b> Sparkline : un mini-graphique <b>dans une cellule</b>', 5)}
</div>`,
  n: `<p><b>Étape 1</b> : on sélectionne A1:B13, <b>en-têtes compris</b> : Excel utilise « CA » comme nom de série et les mois comme étiquettes d'axe. Sans en-têtes, la série s'appelle « Série1 ».</p><p><b>Étape 2</b> : Insertion › Graphiques › <b>Graphiques recommandés</b> : Excel propose des types adaptés aux données, avec aperçu.</p><p><b>Étape 3</b> : ou bien choisir directement un type (Courbes, Histogramme, Secteurs, Barres…).</p><p><b>Étape 4</b> : <kbd>Alt</kbd>+<kbd>F1</kbd> crée instantanément un graphique du type par défaut sur la feuille ; <kbd>F11</kbd> le crée sur une nouvelle feuille graphique.</p><p><b>Étape 5</b> : les <b>sparklines</b> (Insertion › Graphiques sparkline) dessinent une tendance dans une seule cellule : idéal en bout de ligne d'un tableau de bord.</p><p>Astuce : si les données sont un <b>tableau structuré</b> (Ctrl+L), le graphique intègre automatiquement chaque nouveau mois ajouté.</p>` },

/* 10 — ÉLÉMENTS DU GRAPHIQUE */
{ title: 'Les éléments du graphique', html: `${H('Soigner : les éléments du graphique', 'Le bouton +', PATH('Création de graphique > Ajouter un élément graphique'))}
<div class="card a pop" style="--d:.15s;position:absolute;left:70px;top:180px;width:960px;height:590px;padding:0">
 <div class="f" data-s="1" style="position:absolute;left:0;right:0;top:18px;text-align:center;font-size:26px;font-weight:900">CA mensuel 2026 (€)</div>
 ${BARSX06({ x: 60, y: 70, w: 860, h: 440, max: 70000, series: [{ data: CAX06, c: '#107C41' }], extra: F => `<g class="f" data-s="3">${CAX06.map((v, i) => `<text x="${F.x(i)}" y="${F.y(v) - 8}" text-anchor="middle" font-size="14" font-weight="700" fill="#0E1726">${(v / 1000).toFixed(1).replace('.', ',')}</text>`).join('')}</g>` })}
 <div class="f" data-s="2" style="position:absolute;left:16px;top:300px;transform:rotate(-90deg);transform-origin:left top;font-size:18px;font-weight:700;color:#6B7A90;white-space:nowrap;translate:0 0">milliers d'€</div>
 <div class="f" data-s="2" style="position:absolute;left:0;right:0;bottom:16px;text-align:center;font-size:18px;font-weight:700;color:#6B7A90">Mois</div>
 <div class="f zoom" data-s="4" style="position:absolute;right:-24px;top:40px;display:flex;flex-direction:column;gap:8px">${['+', '🖌', '⏷'].map((b, i) => `<span style="width:44px;height:44px;border-radius:8px;background:#fff;box-shadow:var(--sh);display:grid;place-items:center;font-size:24px;font-weight:900;${i ? '' : 'outline:3px solid #FA582D'}">${b}</span>`).join('')}</div>
</div>
<div class="col" style="position:absolute;left:1080px;right:70px;top:190px;gap:14px">
 ${CARD('<b>Titre du graphique</b>', 1)}${CARD('<b>Titres des axes</b> : unité !', 2)}${CARD('<b>Étiquettes de données</b>', 3)}${CARD('<b>Bouton +</b> : cocher / décocher', 4)}
 ${CARD('<b>Intervertir les lignes/colonnes</b> · <b>Modifier le type</b>', 5)}
</div>`,
  n: `<p>Un graphique brut est rarement présentable. Les réglages se font dans l'onglet contextuel <b>Création de graphique</b> (visible quand le graphique est sélectionné) ou avec les boutons flottants à droite du graphique.</p><p><b>Étape 1</b> : le titre (clic dans le titre pour le modifier, ou le lier à une cellule en tapant =B1 dans la barre de formule).</p><p><b>Étape 2</b> : les titres d'axes, surtout pour indiquer l'<b>unité</b> (milliers d'€).</p><p><b>Étape 3</b> : les étiquettes de données : utiles si peu de points ; sinon elles surchargent.</p><p><b>Étape 4</b> : le bouton <b>+</b> (éléments), le pinceau (styles et couleurs) et l'entonnoir (filtrer les séries).</p><p><b>Étape 5</b> : <b>Intervertir les lignes/colonnes</b> quand Excel a mis les mois en légende au lieu de l'axe ; <b>Modifier le type de graphique</b> pour passer en courbe ou en combiné sans tout refaire.</p>` },

/* 11 — UN TITRE QUI CONCLUT */
{ title: 'Un titre qui conclut', html: `${H('Un titre qui dit la conclusion', 'Storytelling')}
${CHX06(70, 190, 700, 440, 'CA 2026', BARSX06({ x: 10, y: 60, w: 680, h: 370, series: [{ data: CAX06, c: '#94A3B8' }] }), 1, '#6B7A90')}
${CHX06(830, 190, 700, 440, 'Le CA dépasse l\'objectif 9 mois sur 12', BARSX06({ x: 10, y: 60, w: 680, h: 370, series: [{ data: CAX06, c: (v, i) => v < OBX06[i] ? '#DC2626' : '#107C41' }], extra: F => `<path d="M${F.L} ${F.y(0)} ${OBX06.map((v, i) => `L${F.x(i)} ${F.y(v)}`).join(' ')}" fill="none" stroke="#0E1726" stroke-width="3" stroke-dasharray="6 6"/>`.replace(`M${F.L} ${F.y(0)} L`, 'M') }), 2, '#107C41')}
<div class="chip bad f" data-s="1" style="position:absolute;left:70px;top:660px;font-size:20px">✘ Décrit le contenu : « et alors ? »</div>
<div class="chip ok f" data-s="2" style="position:absolute;left:830px;top:660px;font-size:20px">✔ Énonce le message · couleur au service du sens</div>`,
  n: `<p><b>Étape 1</b> : un titre descriptif (« CA 2026 ») laisse le lecteur chercher le message seul. Tout est gris, rien ne ressort.</p><p><b>Étape 2</b> : le même graphique avec un <b>titre-conclusion</b> : « Le CA dépasse l'objectif 9 mois sur 12 », l'objectif en pointillés, les mois en retard en rouge. Le lecteur comprend en 3 secondes.</p><p>Démo dans Excel : cliquez dans le titre, tapez le message ; ou liez le titre à une cellule qui calcule le message (<code>="Le CA dépasse l'objectif "&amp;NB.SI.ENS(…)&amp;" mois sur 12"</code>) : le titre se met à jour avec les données.</p><p>Question au groupe : « Quel serait le titre-conclusion de votre dernier graphique ? »</p>` },

/* 12 — SPARKLINES + TABLEAU STRUCTURÉ */
{ title: 'Sparklines', html: `${H('Sparklines et tableau structuré', 'Des tendances dans les cellules', PATH('Insertion > Graphiques sparkline > Courbe'))}
${GRID({ x: 70, y: 200, colw: [150, 110, 110, 110, 110, 220], rh: 56, rows: [['Région', 'T1', 'T2', 'T3', 'T4', 'Tendance'], ['Nord', '126 600', '148 800', '112 300', '170 900'], ['Sud', '98 200', '121 500', '140 800', '131 000'], ['Est', '87 400', '84 100', '79 600', '72 300'], ['Ouest', '110 000', '118 200', '125 900', '139 400']], hl: [{ r: 'B2:E5', s: 1, c: '#2563EB', t: 'plage de données' }, { r: 'F2:F5', s: 1, c: '#FA582D', t: 'emplacement' }] })}
<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:1600px;height:900px;pointer-events:none">
 ${[[126600, 148800, 112300, 170900], [98200, 121500, 140800, 131000], [87400, 84100, 79600, 72300], [110000, 118200, 125900, 139400]].map((r, k) => { const x0 = 70 + 46 + 590 + 20, y0 = 200 + 56 * (k + 2) + 46, mn = Math.min(...r), mx = Math.max(...r); const P = r.map((v, i) => [x0 + i * 60, y0 - (v - mn) / (mx - mn) * 36]); return `<g class="f" data-s="2"><path d="M${P.map(p => p.join(' ')).join(' L')}" fill="none" stroke="${k === 2 ? '#DC2626' : '#107C41'}" stroke-width="3.5" class="draw" pathLength="1"/><circle cx="${P[3][0]}" cy="${P[3][1]}" r="5" fill="${k === 2 ? '#DC2626' : '#107C41'}" class="f" data-s="3"/></g>`; }).join('')}
</svg>
<div class="col" style="position:absolute;left:1000px;right:70px;top:200px;gap:16px">
 ${CARD('<b>1 ·</b> Plage de données B2:E5 → emplacement F2:F5', 1)}
 ${CARD('<b>2 ·</b> Une mini-courbe par ligne : l\'Est <b style="color:#DC2626">décroche</b>', 2)}
 ${CARD('<b>3 ·</b> Création de sparkline › Marqueurs : <b>point haut, dernier point</b>', 3)}
 ${CARD(`<b>4 ·</b> ${KEYS('Ctrl+L')} tableau structuré : graphiques et sparklines <b>suivent</b> les nouvelles lignes`, 4)}
</div>`,
  n: `<p>Les sparklines sont des graphiques miniatures logés dans une cellule. Parfaites pour un tableau de bord compact.</p><p><b>Étape 1</b> : Insertion › Graphiques sparkline › Courbe. Plage de données : B2:E5 (les quatre trimestres), plage d'emplacement : F2:F5.</p><p><b>Étape 2</b> : une tendance par région. L'Est est la seule en baisse continue (87 400 → 72 300).</p><p><b>Étape 3</b> : onglet <b>Sparkline</b> : afficher le point haut, le point bas, le dernier point ; changer la couleur.</p><p><b>Étape 4</b> : mettre la source sous forme de <b>tableau structuré</b> (Ctrl+L ou Accueil › Mettre sous forme de tableau) : graphiques, sparklines et TCD intègrent automatiquement les nouvelles lignes. C'est le bon réflexe avant toute analyse.</p><p>Données de cette diapo : illustratives (elles ne sont pas dans les labs).</p>` },

/* 13 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX06, 2), n: `<p>Troisième partie : le <b>tableau croisé dynamique</b>, l'outil d'analyse le plus puissant d'Excel… et le plus simple une fois compris. Aucune formule.</p>` },

/* 14 — DU DÉTAIL À LA SYNTHÈSE (FLOW) */
{ title: 'Du détail à la synthèse', html: `${H('Du détail à la synthèse', 'Le principe du TCD')}
${FLOW({ x: 70, y: 170, w: 1460, h: 540,
  z: [{ x: 0, y: 10, w: 400, h: 520, l: 'LISTE · 14 ventes', c: '#0EA5E9' }, { x: 530, y: 10, w: 400, h: 520, l: 'VOLET CHAMPS', c: '#7C3AED', s: 1 }, { x: 1060, y: 10, w: 400, h: 520, l: 'TCD · 3 lignes', c: '#107C41', s: 3 }],
  n: { l: { x: 200, y: 270, plate: false, html: `<g>${VENX06.slice(0, 10).map((r, i) => `<rect x="40" y="${90 + i * 36}" width="320" height="30" rx="6" fill="#fff" stroke="#E3E8EF"/><text x="54" y="${111 + i * 36}" font-size="16" fill="#33445E">${r[0]} · ${r[1]} · ${r[2]}</text><text x="348" y="${111 + i * 36}" text-anchor="end" font-size="16" font-weight="700" fill="#0E1726">${r[3]}</text>`).join('')}<text x="200" y="470" text-anchor="middle" font-size="18" fill="#6B7A90">… 4 lignes de plus</text></g>` },
    c: { x: 730, y: 270, plate: false, s: 1, html: `<g>${[['Région', 'Lignes', '#2563EB'], ['CA', 'Valeurs Σ', '#FA582D'], ['Produit', 'Colonnes', '#94A3B8'], ['Vendeur', 'Filtres', '#94A3B8']].map(([f, z, c], i) => `<rect x="570" y="${110 + i * 80}" width="320" height="60" rx="14" fill="#fff" stroke="${c}" stroke-width="3"/><text x="590" y="${148 + i * 80}" font-size="21" font-weight="800" fill="#0E1726">${f}</text><text x="872" y="${148 + i * 80}" text-anchor="end" font-size="18" font-weight="700" fill="${c}">→ ${z}</text>`).join('')}</g>` },
    t: { x: 1260, y: 270, plate: false, s: 3, html: `<g>${[['Étiquettes de lignes', 'Somme de CA', 1], ['Est', '4 750'], ['Ouest', '3 245'], ['Sud', '4 030'], ['Total général', '12 025', 1]].map(([a, b, h], i) => `<rect x="1090" y="${150 + i * 50}" width="340" height="46" fill="${h ? '#DDEBF7' : '#fff'}" stroke="#E3E8EF"/><text x="1104" y="${180 + i * 50}" font-size="18" font-weight="${h ? 800 : 500}" fill="#0E1726">${a}</text><text x="1416" y="${180 + i * 50}" text-anchor="end" font-size="18" font-weight="${h ? 800 : 700}" fill="#0E1726">${b}</text>`).join('')}</g>` } },
  p: [{ s: 2, keep: true, seg: [{ d: 'M370 270 L560 270', lab: '14 lignes', t: 1.3 }, { d: 'M900 270 L1080 270', lab: 'Σ par région', t: 1.3, c: '#107C41' }] }] })}
<div class="chip dark f" data-s="4" style="position:absolute;left:70px;top:740px;font-size:20px">0 formule · glisser-déposer · recalcul en 1 clic</div>`,
  n: `<p>Le principe en une image, avec les données du Lab 2 (Rivière &amp; Glisse) :</p><p><b>À gauche</b> : une <b>liste</b>, une ligne par vente (vendeur, région, produit, CA). 14 lignes ici ; souvent des milliers.</p><p><b>Étape 1</b> : le volet <b>Champs de tableau croisé dynamique</b> liste les en-têtes de colonnes. On décide du rôle de chacun : Région en Lignes, CA en Valeurs.</p><p><b>Étape 2</b> : Excel regroupe et additionne…</p><p><b>Étape 3</b> : … et produit un tableau de synthèse : Est 4 750 €, Ouest 3 245 €, Sud 4 030 €, total 12 025 €.</p><p><b>Étape 4</b> : aucune formule, et on réorganise l'analyse en déplaçant un champ (c'est le côté « dynamique »).</p>` },

/* 15 — UNE SOURCE PROPRE */
{ title: 'Une source propre', html: `${H('Avant le TCD : une source propre', 'Les 4 règles')}
${GRID({ x: 70, y: 190, colw: [110, 100, 110, 100], rh: 44, rows: [['Vendeur', 'Région', 'Produit', 'CA'], ['Alice', 'Ouest', 'Kayak', '1 250'], ['Bruno', 'Est', 'Paddle', '890'], ['Alice', 'Ouest', 'Paddle', '640'], ['Chloé', 'Sud', 'Kayak', '1 480'], ['David', 'Est', 'Kayak', '1 320']], hl: [{ r: 'A1:D1', s: 1, c: '#2563EB', t: 'en-têtes uniques' }, { r: 'A2:D6', s: 2, c: '#16A34A' }] })}
${VS({ y: 190, s1: 1, s2: 3, l: { t: 'Oui', c: '#16A34A', ic: '✔', items: ['<b>Une</b> ligne d\'en-têtes, noms uniques', 'Une ligne = un enregistrement', 'Mise sous forme de <b>tableau</b> (Ctrl+L)'] }, r: { t: 'Non', c: '#DC2626', ic: '✘', items: ['Lignes ou colonnes <b>vides</b>', '<b>Sous-totaux</b> dans les données', 'Cellules fusionnées, en-têtes sur 2 lignes'] } }).replace('left:70px;right:70px', 'left:620px;right:70px')}
${TIP(PATH('Insertion > Tableaux > Tableau croisé dynamique > À partir d\'un tableau ou d\'une plage'), { s: 4, kind: 'key', x: 70, y: 680, w: 1100 })}`,
  n: `<p>80 % des TCD « qui ne marchent pas » viennent de la source. Les règles :</p><p><b>Étape 1</b> : une seule ligne d'en-têtes, chaque colonne a un nom unique et non vide (sinon : « Le nom du champ de tableau croisé dynamique n'est pas valide »).</p><p><b>Étape 2</b> : une ligne par transaction, pas de ligne vide ni de colonne vide (Excel arrêterait la plage).</p><p><b>Étape 3</b> : à proscrire : sous-totaux insérés dans la liste (ils seraient comptés deux fois), cellules fusionnées, en-têtes sur deux lignes. Le TCD calcule lui-même les totaux.</p><p><b>Étape 4</b> : la commande. Si la source est un <b>tableau structuré</b>, le TCD suivra les nouvelles lignes après actualisation, sans redéfinir la plage.</p>` },

/* 16 — LES 4 ZONES */
{ title: 'Les 4 zones', html: `${H('Construire : glisser les champs dans les zones', 'Volet Champs de tableau croisé dynamique')}
<div class="card a pop" style="--d:.15s;position:absolute;left:70px;top:175px;width:560px;height:480px;padding:20px 22px">
 <div style="font-size:20px;font-weight:800;margin-bottom:10px">Champs de tableau croisé dynamique</div>
 ${['Vendeur', 'Région', 'Produit', 'CA'].map((f, i) => `<div style="display:flex;align-items:center;gap:10px;font-size:20px;padding:5px 0"><span class="${[0, 1, 2, 3].includes(i) ? '' : ''}" style="width:22px;height:22px;border:2px solid #94A3B8;border-radius:4px;display:grid;place-items:center;font-size:16px;color:#fff;background:#107C41">✓</span>${f}</div>`).join('')}
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px">
  ${[['▼ Filtres', [['Vendeur', 4]]], ['▥ Colonnes', [['Produit', 3]]], ['☰ Lignes', [['Région', 1]]], ['Σ Valeurs', [['Somme de CA', 2]]]].map(([z, ch]) => `<div style="border:2px dashed #CBD5E1;border-radius:12px;height:120px;padding:10px"><div style="font-size:17px;font-weight:700;color:#6B7A90">${z}</div>${ch.map(([c, s]) => `<div class="chip f zoom" data-s="${s}" style="margin-top:10px;font-size:18px;background:#E8F5EC;color:#0B5C31">${c}</div>`).join('')}</div>`).join('')}
 </div>
</div>
${PVX06({ x: 680, y: 190, w: 380, s: 2, head: ['Région', 'Somme de CA'], rows: [['Est', '4 750'], ['Ouest', '3 245'], ['Sud', '4 030']], tot: ['Total général', '12 025'] })}
${PVX06({ x: 680, y: 440, w: 850, s: 3, fs: 18, head: ['Somme de CA', 'Gilet', 'Kayak', 'Paddle', 'Total'], rows: [['Est', '210', '2 730', '1 810', '4 750'], ['Ouest', '185', '2 420', '640', '3 245'], ['Sud', '400', '2 870', '760', '4 030']], tot: ['Total général', '795', '8 020', '3 210', '12 025'] })}
<div class="chip dark f" data-s="4" style="position:absolute;left:1090px;top:200px;font-size:19px">Vendeur : (Tous) ▾</div>
${TIP('Étiquettes triées A→Z · total général automatique', { s: 2, x: 1090, y: 260, w: 440 })}`,
  n: `<p>Le volet Champs se compose de la <b>liste des champs</b> (en haut) et de <b>4 zones</b> (en bas).</p><p><b>Étape 1 — Lignes</b> : on glisse <b>Région</b> : une ligne par valeur distincte (Est, Ouest, Sud, triées par ordre alphabétique).</p><p><b>Étape 2 — Valeurs</b> : on glisse <b>CA</b> : Excel l'additionne automatiquement (« Somme de CA »). Résultat : Est 4 750 €, Ouest 3 245 €, Sud 4 030 €. Total 12 025 €. C'est la tâche 1 du Lab 2.</p><p><b>Étape 3 — Colonnes</b> : on ajoute <b>Produit</b> : on obtient un tableau à double entrée. Kayak = 8 020 € au total, soit les 2/3 du CA.</p><p><b>Étape 4 — Filtres</b> : <b>Vendeur</b> en filtre de rapport : une liste déroulante au-dessus du TCD pour n'afficher qu'un vendeur.</p><p>Démo : cochez un champ texte, il part en Lignes ; un champ numérique, il part en Valeurs. Puis déplacez Produit de Colonnes vers Lignes pour montrer l'imbrication.</p>` },

/* 17 — CHANGER LA SYNTHÈSE */
{ title: 'Changer la synthèse', html: `${H('Somme, nombre, moyenne', 'Synthétiser les valeurs par', PATH('Clic droit > Synthétiser les valeurs par'))}
${PVX06({ x: 70, y: 200, w: 450, s: 1, head: ['Région', 'Somme de CA'], rows: [['Est', '4 750'], ['Ouest', '3 245'], ['Sud', '4 030']], tot: ['Total général', '12 025'] })}
${PVX06({ x: 575, y: 200, w: 450, s: 2, head: ['Produit', 'Nombre de CA'], rows: [['Gilet', '4'], ['Kayak', '6'], ['Paddle', '4']], tot: ['Total général', '14'] })}
${PVX06({ x: 1080, y: 200, w: 450, s: 3, head: ['Vendeur', 'Moyenne de CA'], rows: [['Alice', '811,25'], ['Bruno', '836,67'], ['Chloé', '800,00'], ['David', '1 120,00'], ['Emma', '815,00']], tot: ['Total général', '858,93'] })}
<div style="position:absolute;left:70px;right:70px;top:500px;display:grid;grid-template-columns:repeat(3,1fr);gap:55px">
 ${[['Σ Somme', 'Quelle région rapporte le plus ?', '#2563EB'], ['# Nombre', 'Quel produit se vend le plus souvent ?', '#FA582D'], ['x̄ Moyenne', 'Quel est le panier moyen par vendeur ?', '#7C3AED']].map(([a, b, c], i) => `<div class="card f" data-s="${i + 1}" style="border-left:6px solid ${c};padding:14px 18px"><b style="font-size:24px;color:${c}">${a}</b><div style="font-size:19px">${b}</div></div>`).join('')}
</div>
${TIP('Le <b>Nombre</b> compte les lignes : Kayak = 6 ventes, mais le Kayak pèse 8 020 € en somme.', { s: 4, x: 70, y: 650, w: 1000 })}`,
  n: `<p>Un même champ CA peut être résumé de plusieurs façons : clic droit sur une valeur du TCD › <b>Synthétiser les valeurs par</b> › Somme, Nombre, Moyenne, Max, Min… (ou Paramètres des champs de valeurs).</p><p><b>Étape 1 — Somme</b> par région (tâche 1) : Est 4 750 €.</p><p><b>Étape 2 — Nombre</b> par produit (tâche 2) : Kayak 6 ventes, Paddle 4, Gilet 4 ; total 14.</p><p><b>Étape 3 — Moyenne</b> par vendeur (tâche 3, le panier moyen) : David 1 120 € (2 ventes), Bruno 836,67 €, Emma 815 €, Alice 811,25 €, Chloé 800 €. Moyenne générale : 12 025 / 14 = 858,93 €.</p><p><b>Étape 4</b> : nuance à faire verbaliser : le produit le plus <i>fréquent</i> n'est pas forcément celui qui rapporte le plus. Pensez aussi à <b>Format de nombre</b> dans les paramètres du champ pour afficher les €.</p>` },

/* 18 — % DU TOTAL ET GRAPHIQUE CROISÉ */
{ title: '% du total', html: `${H('Afficher les valeurs en % du total', 'Et graphique croisé dynamique', PATH('Clic droit > Afficher les valeurs > % du total général'))}
${PVX06({ x: 70, y: 200, w: 520, s: 1, head: ['Région', 'Somme de CA'], rows: [['Est', '39,50 %'], ['Ouest', '26,99 %'], ['Sud', '33,51 %']], tot: ['Total général', '100,00 %'] })}
<svg viewBox="0 0 860 420" style="position:absolute;left:670px;top:190px;width:860px;height:420px;overflow:visible" class="f" data-s="2">
 <rect x="0" y="0" width="860" height="420" rx="20" fill="#fff" filter="url(#sh)"/>
 <text x="430" y="44" text-anchor="middle" font-size="22" font-weight="800" fill="#0E1726">L'Est pèse près de 40 % du CA</text>
 ${[['Est', 39.5, '#107C41'], ['Sud', 33.51, '#94A3B8'], ['Ouest', 26.99, '#94A3B8']].map(([r, p, c], i) => `<text x="110" y="${125 + i * 100}" text-anchor="end" font-size="22" font-weight="700" fill="#33445E">${r}</text><path d="M130 ${117 + i * 100} H${130 + p * 15}" stroke="${c}" stroke-width="54" class="draw" pathLength="1" style="--d:${.2 + i * .15}s"/><text x="${145 + p * 15}" y="${125 + i * 100}" font-size="22" font-weight="900" fill="${c === '#94A3B8' ? '#475569' : c}">${String(p.toFixed(2)).replace('.', ',')} %</text>`).join('')}
</svg>
<div class="col" style="position:absolute;left:70px;top:480px;width:520px;gap:14px">
 ${CARD('<b>% du total général</b> · % du total de la colonne · différence par rapport à…', 1)}
 ${CARD(PATH('Analyse du tableau croisé dynamique > Graphique croisé dynamique'), 2)}
 ${CARD('Le graphique suit le TCD : filtrer l\'un filtre l\'autre', 3)}
</div>`,
  n: `<p><b>Étape 1</b> : clic droit sur une valeur › <b>Afficher les valeurs</b> › <b>% du total général</b>. Est = 4 750 / 12 025 = <b>39,50 %</b> ; Sud = 33,51 % ; Ouest = 26,99 %. Autres options utiles : % du total de la ligne/colonne, Différence par rapport (au mois précédent), Rang du plus petit au plus grand.</p><p><b>Étape 2</b> : un <b>graphique croisé dynamique</b> se crée depuis l'onglet Analyse du tableau croisé dynamique. Ici trié, avec une couleur d'accent et un titre-conclusion.</p><p><b>Étape 3</b> : le graphique est lié au TCD : déplacer un champ ou filtrer met à jour les deux.</p><p>Astuce : vous pouvez glisser deux fois le champ CA dans Valeurs : l'un en somme, l'autre en % du total.</p>` },

/* 19 — ACTUALISER, DÉTAILLER, SEGMENTS */
{ title: 'Actualiser et explorer', html: `${H('Actualiser, détailler, filtrer', 'Faire vivre le TCD')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
 <div class="card f zoom" data-s="1" style="padding:22px;border-top:6px solid #DC2626"><div style="font-size:26px;font-weight:900">🔄 Actualiser</div><div style="font-size:19px;margin:10px 0 14px">Le TCD ne se met <b>pas</b> à jour seul</div>${KEYS('Alt+F5')}<div style="margin-top:12px">${KEYS('Ctrl+Alt+F5')}</div><div style="font-size:17px;color:#6B7A90;margin-top:8px">Actualiser tout</div></div>
 <div class="card f zoom" data-s="2" style="padding:22px;border-top:6px solid #2563EB"><div style="font-size:26px;font-weight:900">🔍 Double-clic</div><div style="font-size:19px;margin:10px 0 12px">sur <b>Est · 4 750</b> → nouvelle feuille de détail</div>
  <table style="width:100%;border-collapse:collapse;font-size:17px">${[['Bruno', 'Paddle', '890'], ['David', 'Kayak', '1 320'], ['Bruno', 'Gilet', '210'], ['David', 'Paddle', '920'], ['Bruno', 'Kayak', '1 410']].map(r => `<tr>${r.map((c, i) => `<td style="padding:4px 6px;border-bottom:1px solid #EEF0F3;text-align:${i === 2 ? 'right' : 'left'}">${c}</td>`).join('')}</tr>`).join('')}<tr><td colspan="2" style="padding:4px 6px;font-weight:800">5 lignes</td><td style="text-align:right;font-weight:800;padding:4px 6px">4 750</td></tr></table></div>
 <div class="card f zoom" data-s="3" style="padding:22px;border-top:6px solid #7C3AED"><div style="font-size:26px;font-weight:900">🎛 Segments</div><div style="font-size:19px;margin:10px 0 14px">Filtres visuels cliquables</div>
  <div style="display:flex;flex-direction:column;gap:8px">${['Est', 'Ouest', 'Sud'].map((r, i) => `<span style="padding:9px 14px;border-radius:8px;font-size:19px;font-weight:700;background:${i ? '#F1F5F9' : '#7C3AED'};color:${i ? '#33445E' : '#fff'}">${r}</span>`).join('')}</div><div style="font-size:17px;color:#6B7A90;margin-top:10px">+ Chronologie pour les dates</div></div>
</div>
${TIP(`${PATH('Analyse du tableau croisé dynamique > Données > Actualiser')} — et clic droit sur des dates › <b>Grouper</b> (mois, trimestres)`, { s: 4, kind: 'warn', x: 70, y: 540, w: 1300 })}`,
  n: `<p>Trois gestes qui font la différence en réunion :</p><p><b>Étape 1 — Actualiser</b> : le TCD travaille sur une copie en mémoire (le cache). Modifier la source ne change <b>rien</b> tant qu'on n'actualise pas : <kbd>Alt</kbd>+<kbd>F5</kbd> (ce TCD) ou <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F5</kbd> (tout le classeur). Question 2 du quiz.</p><p><b>Étape 2 — Extraire le détail</b> : double-clic sur un total : Excel crée une nouvelle feuille avec les lignes qui le composent. Pour l'Est : 5 ventes, 4 750 €. Idéal pour justifier un chiffre.</p><p><b>Étape 3 — Segments</b> : Analyse du tableau croisé dynamique › Insérer un segment : des boutons de filtre visibles, qui peuvent piloter plusieurs TCD à la fois (Connexions de rapport). La <b>chronologie</b> fait la même chose pour les dates.</p><p><b>Étape 4</b> : le chemin du ruban et le regroupement des dates par mois, trimestres, années.</p><p>Contrôle du Lab 2 : <code>=SOMME.SI(B2:B15;"Est";D2:D15)</code> → 4 750 €, identique au TCD.</p>` },

/* 20 — RÉCAP */
{ title: 'Récap', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: 'TCD', hsub: '+ graphiques', hk: 'MODULE 06',
  items: [{ ic: '🎯', t: 'Message d\'abord', d: 'Courbe = évolution, barres = comparaison, secteurs ≤ 5 parts' }, { ic: '✍️', t: 'Titre qui conclut', d: '2D, sobre, une couleur d\'accent, unité sur l\'axe' }, { ic: '🧱', t: 'Source propre', d: 'Une ligne d\'en-têtes, pas de vide, pas de sous-total' }, { ic: '🧲', t: 'Lignes · Colonnes · Valeurs · Filtres', d: 'Glisser les champs ; Somme, Nombre, Moyenne, % du total' }, { ic: '🔄', t: 'Actualiser', d: 'Alt+F5 : le TCD ne suit pas seul la source' }] }),
  n: `<p>Cinq idées à retenir. Faites reformuler par le groupe : « Je dois montrer l'évolution du CA : quel graphique ? », « J'ai modifié la source : que faire ? »</p>` },

/* 21 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Clavier')}
${KEYCARDS([{ k: 'Alt+F1', d: 'Graphique par défaut sur la feuille' }, { k: 'F11', d: 'Graphique sur une nouvelle feuille' }, { k: 'Alt+F5', d: 'Actualiser le TCD' }, { k: 'Ctrl+Alt+F5', d: 'Actualiser toutes les connexions et TCD' }, { k: 'Ctrl+Maj+L', d: 'Filtre sur la source avant analyse' }, { k: 'Ctrl+A', d: 'Sélectionner la source du graphique' }], { cols: 3, y: 200 })}
${TIP('Réflexe : <b>Ctrl+A</b> dans la source, puis <b>Alt+F1</b> : un graphique en deux touches.', { s: 7, kind: 'key', x: 70, y: 620, w: 900 })}`,
  n: `<p>Montrez l'enchaînement : clic dans les données, <kbd>Ctrl</kbd>+<kbd>A</kbd> (sélectionne la zone de données), <kbd>Alt</kbd>+<kbd>F1</kbd> : graphique créé. Puis modifiez une valeur source d'un TCD et faites constater qu'il faut <kbd>Alt</kbd>+<kbd>F5</kbd>.</p>` },

/* 22 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'excel', mod: 'x06', lab: 0, title: 'Lab 1 — Le reporting mensuel des ventes', tasks: ['B14 : le CA annuel avec <b>SOMME</b>', 'B15 : le meilleur CA avec <b>MAX</b>', 'B16 : le meilleur mois avec <b>INDEX</b>/<b>EQUIV</b>', 'A1:B13 → graphique en <b>courbes</b>', 'A1:C13 → graphique en <b>barres</b> CA vs objectif'] }),
  n: `<p>Résultats attendus : B14 = 562 600 € ; B15 = 63 400 € ; B16 = Décembre. Graphiques : la courbe montre le creux de juillet-août ; les barres montrent 9 mois sur 12 au-dessus de l'objectif (sauf février, juillet, août).</p>` },

/* 23 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'excel', mod: 'x06', lab: 1, title: 'Lab 2 — Analyser les ventes avec un TCD', tasks: ['TCD : <b>Région</b> en Lignes, <b>Somme de CA</b>', 'TCD : <b>Nombre</b> de ventes par <b>Produit</b>', 'TCD : <b>Moyenne</b> du CA par <b>Vendeur</b>', 'G1 : contrôle Est avec <b>SOMME.SI</b> → 4 750 €'] }),
  n: `<p>Résultats : Est 4 750 €, Sud 4 030 €, Ouest 3 245 € (total 12 025 €) ; Kayak 6, Paddle 4, Gilet 4 ; moyennes : David 1 120 €, Bruno 836,67 €, Emma 815 €, Alice 811,25 €, Chloé 800 €. G1 : <code>=SOMME.SI(B2:B15;"Est";D2:D15)</code> = 4 750 €.</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quel graphique choisir pour montrer l\'évolution du CA sur 12 mois ?', o: ['Secteurs', 'Courbes', 'Nuage de points', 'Anneau'], a: [1], e: 'La courbe est le graphique de l\'évolution dans le temps : la pente se lit immédiatement.' },
  { q: 'Vous avez modifié des montants dans la source d\'un TCD. Que faut-il faire ?', o: ['Rien, il se met à jour seul', 'Actualiser le TCD', 'Recréer le TCD', 'Appuyer sur F2'], a: [1], e: 'Un TCD travaille sur un cache : il faut l\'actualiser (Analyse du tableau croisé dynamique › Actualiser ou Alt+F5).' },
  { q: 'Dans quelle zone du TCD placer le champ CA pour obtenir des totaux ?', o: ['Lignes', 'Colonnes', 'Valeurs', 'Filtres'], a: [2], e: 'Les champs numériques à agréger vont dans Valeurs ; Lignes et Colonnes servent aux axes d\'analyse.' },
  { q: 'Que se passe-t-il si vous double-cliquez sur un total dans un TCD ?', o: ['Le TCD est supprimé', 'Une feuille avec le détail des lignes concernées est créée', 'La cellule passe en mode modification', 'Le graphique se met à jour'], a: [1], e: 'Excel génère une nouvelle feuille contenant les enregistrements source de ce total.' },
  { q: 'Pourquoi éviter un graphique en secteurs à 12 parts ?', o: ['Excel ne le permet pas', 'Les angles proches sont impossibles à comparer à l\'œil', 'Il ne s\'imprime pas en couleur', 'Il ne gère pas les nombres décimaux'], a: [1], e: 'L\'œil compare mal les angles : au-delà de 4-5 parts, un histogramme trié est bien plus lisible.' },
  { q: 'Qu\'est-ce qui empêche un TCD fiable ? (2 réponses)', o: ['Des sous-totaux insérés dans la liste source', 'Une source mise sous forme de tableau', 'Une colonne sans en-tête', 'Des montants en euros'], a: [0, 2], e: 'Les sous-totaux seraient comptés deux fois ; une colonne sans en-tête bloque la création. Le tableau structuré est au contraire recommandé.' },
] ); }, n: `<p>Réponses : 1) Courbes · 2) Actualiser · 3) Valeurs · 4) feuille de détail · 5) angles · 6) sous-totaux + colonne sans en-tête.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X06', html: END(), n: `<p>Fin du module 06. Prochain module (X07, Expert) : les fonctions multi-critères (SOMME.SI.ENS, SOMMEPROD) et la construction d'un <b>tableau de bord</b> piloté par un sélecteur.</p>` },
] };
