/* ===================== MODULE X03 — Fonctions logiques et statistiques conditionnelles ===================== */
const SECSX03 = ['Faire décider Excel : SI', 'Combiner : ET, OU, NON', 'Compter, totaliser, fiabiliser'];

/* ---- helpers locaux X03 : GRID enrichie (cellules superposées, cadres au-dessus, 2e formule, SVG de recopie) ---- */
function X03G(o) {
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

/* données du lab « Hydra Équipements » */
const X03D = [['Martin', 'Nord', '182 000', '195 000', '190 000'], ['Bernard', 'Sud', '154 000', '149 000', '160 000'], ['Petit', 'Est', '0', '88 000', '80 000'], ['Robert', 'Nord', '210 000', '232 000', '220 000'], ['Richard', 'Ouest', '98 000', '121 000', '110 000'],
  ['Dubois', 'Sud', '175 000', '168 000', '170 000'], ['Moreau', 'Est', '133 000', '141 000', '140 000'], ['Laurent', 'Ouest', '0', '64 000', '70 000'], ['Simon', 'Nord', '119 000', '117 000', '125 000'], ['Michel', 'Sud', '142 000', '158 000', '150 000']];
const X03ATT = ['Oui', 'Non', 'Oui', 'Oui', 'Oui', 'Non', 'Oui', 'Non', 'Non', 'Oui'];
const X03EVO = ['7,14 %', '-3,25 %', 'Nouveau', '10,48 %', '23,47 %', '-4,00 %', '6,02 %', 'Nouveau', '-1,68 %', '11,27 %'];
const X03PRI = ['5 850', '0', '0', '6 960', '3 630', '0', '4 230', '0', '0', '4 740'];
const X03HEAD = ['Commercial', 'Région', 'CA 2025', 'CA 2026', 'Objectif', 'Atteint', 'Évolution', 'Prime'];
const X03W = [118, 82, 100, 100, 100, 82, 104, 84];
const X03R = (n, extra = {}) => [X03HEAD.slice(0, n), ...X03D.map((r, i) => [...r, extra.F ? X03ATT[i] : '', extra.G ? X03EVO[i] : '', ''].slice(0, n))];
/* Oui / Non colorés en cascade */
const X03ON = (col, arr, s, d0 = 0) => arr.map((v, i) => ({ r: col + (i + 2), v, s, al: 'center', fw: 800, c: v === 'Oui' || v === 'Zone 1' || v === 'A' ? '#107C41' : v === 'Non' || v === 'C' ? '#DC2626' : v === 'B' ? '#0369A1' : '#0E1726', bg: v === 'Oui' || v === 'Zone 1' || v === 'A' ? '#ECFDF3' : v === 'Non' || v === 'C' ? '#FEF2F2' : v === 'B' ? '#E0F2FE' : '#F8FAFC', d: s ? d0 + i * .08 : undefined }));
const X03NUM = (col, arr, s, c = '#107C41', bg = '#ECFDF3') => arr.map((v, i) => ({ r: col + (i + 2), v, s, c, bg, d: s ? i * .08 : undefined }));

window.MODULE = { code: 'X03', title: 'Fonctions logiques et statistiques conditionnelles', short: 'Fonctions logiques', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Fonctions logiques', html: TITLE({ mod: 'EXCEL · MODULE 03 · INTERMÉDIAIRE', title: 'Faire <span class="grad">décider</span> Excel', sub: '« SI, ET, OU, NB.SI, SOMME.SI : les règles métier en formules »', agenda: SECSX03, art: APPART('excel') }),
  n: `<p>Module 3 d'Excel, niveau intermédiaire, durée indicative <b>60 minutes</b>.</p><p>Fil rouge : vous êtes contrôleur de gestion chez <b>Hydra Équipements</b>. La DRH attend le calcul des primes annuelles de dix commerciaux. Règle : une prime de 3 % du CA 2026 si l'objectif est atteint <b>et</b> si le commercial était déjà présent en 2025.</p><p>Question d'ouverture : « Quelles règles de votre métier s'écrivent sous la forme <i>si… alors… sinon</i> ? » (remises, alertes de stock, primes, relances…). Notez-les : on les traduira en formules.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Écrire un test avec <b>SI</b> et les opérateurs de comparaison', 'Combiner des conditions avec <b>ET</b>, <b>OU</b>, <b>NON</b>', 'Gérer plusieurs issues : SI imbriqués, <b>SI.CONDITIONS</b>', 'Compter et totaliser sous condition : <b>NB.SI</b>, <b>SOMME.SI</b>, <b>MOYENNE.SI</b>', 'Intercepter une erreur prévue avec <b>SIERREUR</b>']),
  n: `<p>Cinq objectifs, une même idée : traduire une <b>règle métier</b> en formule. Prérequis : références relatives et absolues (module X02) — on figera des plages de critères avec F4.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX03, 0), n: `<p>Première partie : la fonction SI, la brique de base de toute logique dans Excel.</p>` },

/* 4 — ANATOMIE DE SI */
{ title: 'La fonction SI', html: `${H('SI : une question, deux réponses', 'Syntaxe', PATH('Formules > Logique > SI'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;right:70px;top:180px;padding:22px;background:#0E1726;border-radius:20px;text-align:center;font:700 34px var(--mono);color:#fff">=SI(<span style="color:#FBBF24">test_logique</span> ; <span style="color:#4ADE80">valeur_si_vrai</span> ; <span style="color:#F87171">valeur_si_faux</span>)</div>
<svg viewBox="0 0 1460 470" style="position:absolute;left:70px;top:300px;width:1460px;height:470px;font-family:var(--font)">
 <g class="f zoom" data-s="1"><path d="M730 20 L900 110 L730 200 L560 110 Z" fill="#FFFBEB" stroke="#F59E0B" stroke-width="4"/><text x="730" y="104" text-anchor="middle" font-size="26" font-weight="900" fill="#0E1726" font-family="Consolas,monospace">D2 &gt;= E2 ?</text><text x="730" y="138" text-anchor="middle" font-size="18" fill="#92400E">CA 2026 ≥ objectif</text></g>
 <g class="f" data-s="2"><path d="M560 110 H 330 V 260" fill="none" stroke="#16A34A" stroke-width="5" class="draw" pathLength="1"/><rect x="380" y="74" width="100" height="34" rx="17" fill="#16A34A"/><text x="430" y="97" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">VRAI</text>
  <rect x="210" y="270" width="240" height="90" rx="18" fill="#ECFDF3" stroke="#16A34A" stroke-width="4"/><text x="330" y="326" text-anchor="middle" font-size="34" font-weight="900" fill="#107C41">"Oui"</text></g>
 <g class="f" data-s="3"><path d="M900 110 H 1130 V 260" fill="none" stroke="#DC2626" stroke-width="5" class="draw" pathLength="1"/><rect x="980" y="74" width="100" height="34" rx="17" fill="#DC2626"/><text x="1030" y="97" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">FAUX</text>
  <rect x="1010" y="270" width="240" height="90" rx="18" fill="#FEF2F2" stroke="#DC2626" stroke-width="4"/><text x="1130" y="326" text-anchor="middle" font-size="34" font-weight="900" fill="#DC2626">"Non"</text></g>
 <g class="f" data-s="4"><text x="730" y="420" text-anchor="middle" font-size="30" font-weight="800" fill="#0E1726" font-family="Consolas,monospace">=SI(D2&gt;=E2;"Oui";"Non")</text></g>
</svg>`,
  n: `<p>SI renvoie une valeur si une condition est vraie, une autre sinon. Trois arguments séparés par des points-virgules.</p><p><b>Étape 1 — test_logique</b> : une question à laquelle Excel répond VRAI ou FAUX. Ici : le CA 2026 (D2) atteint-il l'objectif (E2) ?</p><p><b>Étape 2 — valeur_si_vrai</b> : ce que la cellule affiche si la réponse est VRAI : le texte "Oui". Un texte s'écrit entre guillemets droits.</p><p><b>Étape 3 — valeur_si_faux</b> : sinon, "Non".</p><p><b>Étape 4</b> : la formule complète. Les valeurs renvoyées peuvent être des textes, des nombres, ou même des calculs : =SI(C2>1000;C2*5%;0).</p><p>Démo : Formules › Bibliothèque de fonctions › Logique › SI ouvre l'assistant avec un champ par argument : rassurant pour les débutants.</p>` },

/* 5 — SI DANS LA GRILLE */
{ title: 'SI recopié sur l\'équipe', html: `${H('Objectif atteint ? Une formule, dix réponses', 'SI en action')}
${X03G({ x: 70, y: 180, cols: 6, colw: X03W, rh: 38, rows: X03R(6), sel: 'F2', fx: { ref: 'F2', f: '=SI(D2>=E2;"Oui";"Non")', s: 1 },
  hl: [{ r: 'D2', s: 1, c: '#2563EB' }, { r: 'E2', s: 1, c: '#DC2626' }], cells: [...X03ON('F', X03ATT.slice(0, 1), 2), ...X03ON('F', X03ATT, 3).slice(1)], hl2: [{ r: 'D7:E7', s: 4, c: '#7C3AED' }] })}
${STAT({ v: '6 / 10', t: 'commerciaux ont atteint leur objectif', x: 760, y: 200, w: 770, s: 3, c: '#107C41' })}
${TIP('Dubois : 168 000 contre 170 000 → <b>Non</b>. À 2 000 € près, la règle est la règle.', { s: 4, x: 760, y: 380, w: 770, kind: 'warn' })}
${TIP('<b>>=</b> et non <b>></b> : un CA <b>égal</b> à l\'objectif l\'atteint.', { s: 5, x: 760, y: 500, w: 770 })}`,
  n: `<p><b>Étape 1</b> : en F2 : =SI(D2>=E2;"Oui";"Non"). D2 et E2 restent relatives : chaque ligne compare son propre CA à son propre objectif.</p><p><b>Étape 2</b> : Martin : 195 000 ≥ 190 000 → <b>Oui</b>.</p><p><b>Étape 3</b> : recopie jusqu'en F11 : 6 « Oui » (Martin, Petit, Robert, Richard, Moreau, Michel) et 4 « Non ».</p><p><b>Étape 4</b> : Dubois : 168 000 contre 170 000 → Non. Bon moment pour vérifier la formule à la main sur une ligne.</p><p><b>Étape 5</b> : attention au choix de l'opérateur : avec > au lieu de >=, un commercial pile à l'objectif serait exclu. Faites préciser la règle métier avant d'écrire la formule.</p>` },

/* 6 — OPÉRATEURS */
{ title: 'Les opérateurs de comparaison', html: `${H('Six opérateurs pour poser la question', 'Comparer')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(6,1fr);gap:16px">
 ${[['=', 'égal à', 'B2="Nord"'], ['<>', 'différent de', 'B2<>"Sud"'], ['>', 'supérieur à', 'D2>150000'], ['<', 'inférieur à', 'C2<1'], ['>=', 'supérieur ou égal', 'D2>=E2'], ['<=', 'inférieur ou égal', 'D2<=E2']].map(([o, t, e], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="text-align:center;padding:22px 10px"><div style="font:900 56px var(--mono);color:${['#2563EB', '#7C3AED', '#107C41', '#DC2626', '#0EA5E9', '#FA582D'][i]}">${o.replace('<', '&lt;').replace('>', '&gt;')}</div><div style="font-size:19px;font-weight:700;margin:6px 0 10px">${t}</div><div style="font:600 16px var(--mono);color:#33445E">${e.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></div>`).join('')}</div>
${VS({ y: 470, l: { t: 'Texte', c: '#2563EB', ic: '"', html: '<div style="font:700 26px var(--mono)">B2=<span style="color:#2563EB">"Nord"</span></div><div style="font-size:19px;margin-top:8px">entre <b>guillemets droits</b> · casse ignorée</div>' }, r: { t: 'Nombre', c: '#107C41', ic: '#', html: '<div style="font:700 26px var(--mono)">D2&gt;<span style="color:#107C41">150000</span></div><div style="font-size:19px;margin-top:8px"><b>sans</b> guillemets · sans espace ni €</div>' }, s1: 7, s2: 7 })}`,
  n: `<p>Les six opérateurs de comparaison. Chacun renvoie VRAI ou FAUX.</p><p><b>Étapes 1 à 6</b> : =, &lt;&gt; (différent — attention, pas de ≠ dans Excel), &gt;, &lt;, &gt;=, &lt;=. On écrit toujours le &lt; ou le &gt; <b>avant</b> le =.</p><p><b>Étape 7</b> : un texte se compare entre guillemets droits ("Nord") ; Excel ignore la casse ("nord" = "Nord"). Un nombre s'écrit sans guillemets, sans espace de milliers et sans symbole € : 150000.</p><p>Astuce démo : tapez =D2>=E2 seul dans une cellule : Excel affiche VRAI ou FAUX. C'est exactement ce que SI reçoit comme premier argument.</p>` },

/* 7 — PIÈGES DE SI */
{ title: 'Les pièges de SI', html: `${H('Trois pièges classiques', 'SI sans surprise')}
${X03G({ x: 70, y: 190, cols: 3, colw: [150, 330, 200], rh: 56, rows: [['Montant', 'Formule', 'Résultat'], [1200, '', ''], [1200, '', ''], ['', '', ''], [800, '', '']],
  cells: [{ r: 'B2', v: '=SI(A2>"1000";"Prime";"")', al: 'flex-start', st: 'font-family:var(--mono);font-size:16px;color:#DC2626' }, { r: 'C2', v: '(vide) ✘', s: 1, c: '#DC2626', bg: '#FEF2F2' },
    { r: 'B3', v: '=SI(A3>1000;"Prime";"")', al: 'flex-start', s: 2, st: 'font-family:var(--mono);font-size:16px;color:#107C41' }, { r: 'C3', v: 'Prime ✔', s: 2, c: '#107C41', bg: '#ECFDF3' },
    { r: 'B4', v: '=A4*2', al: 'flex-start', s: 3, st: 'font-family:var(--mono);font-size:16px;color:#33445E' }, { r: 'C4', v: '0', s: 3, c: '#DC2626', bg: '#FEF2F2' },
    { r: 'B5', v: '=SI(A5="";"";A5*2)', al: 'flex-start', s: 4, st: 'font-family:var(--mono);font-size:16px;color:#107C41' }, { r: 'C5', v: '1600', s: 4, c: '#107C41', bg: '#ECFDF3' }] })}
<div class="col" style="position:absolute;left:850px;right:70px;top:200px;gap:16px">
 ${CARD('<b style="color:#DC2626">1 · "1000" entre guillemets</b> : c\'est un <b>texte</b>, la comparaison est fausse, sans message', 1, 'border-left:6px solid #DC2626')}
 ${CARD('<b style="color:#107C41">Correct</b> : <span class="mono">A3&gt;1000</span>, jamais de guillemets autour d\'un nombre', 2, 'border-left:6px solid #16A34A')}
 ${CARD('<b>2 · Cellule vide</b> : un calcul affiche 0. Résultat vide : <span class="mono">""</span>', 3)}
 ${CARD('<b>3 · Guillemets “courbes”</b> copiés de Word : <b>#NOM?</b> — retapez-les dans Excel', 4)}</div>`,
  n: `<p><b>Étape 1</b> : =SI(A2>"1000";…) compare un nombre au <b>texte</b> "1000". Pour Excel, un texte est toujours « plus grand » qu'un nombre : le test est FAUX, la prime n'apparaît pas, et aucun message d'erreur ne prévient.</p><p><b>Étape 2</b> : la bonne écriture : A3>1000, sans guillemets.</p><p><b>Étape 3</b> : une cellule vide vaut 0 dans un calcul : la ligne 4 affiche 0 au lieu de rien.</p><p><b>Étape 4</b> : on teste d'abord si la cellule est vide : =SI(A5="";"";A5*2). Deux guillemets accolés = texte vide. Autre piège : les guillemets typographiques « “ ” » copiés depuis Word ou un e-mail provoquent #NOM? : retapez-les au clavier dans Excel.</p>` },

/* 8 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX03, 1), n: `<p>Deuxième partie : une règle métier contient rarement une seule condition. On combine avec ET, OU, NON, et on gère plusieurs issues.</p>` },

/* 9 — ET, OU, NON */
{ title: 'ET, OU, NON', html: `${H('ET exige tout, OU se contente d\'un', 'Combiner les conditions')}
${[['ET', '#2563EB', ['VRAI', 'VRAI', 'FAUX', 'FAUX'], 1, 'VRAI si <b>toutes</b> les conditions sont vraies'], ['OU', '#7C3AED', ['VRAI', 'VRAI', 'VRAI', 'FAUX'], 2, 'VRAI si <b>au moins une</b> condition est vraie']].map(([fn, c, res, s, sub], k) => `
<div class="card f ${k ? 'right' : 'left'}" data-s="${s}" style="position:absolute;left:${70 + k * 500}px;top:190px;width:470px;padding:22px 24px;border-top:6px solid ${c}">
 <div style="font:900 34px var(--mono);color:${c}">${fn}(a ; b)</div><div style="font-size:19px;color:#33445E;margin-bottom:12px">${sub}</div>
 <table style="width:100%;border-collapse:collapse;font:700 19px var(--mono);text-align:center">
  <tr style="color:#6B7A90;font-size:16px"><td>a</td><td>b</td><td>${fn}</td></tr>
  ${[['VRAI', 'VRAI'], ['VRAI', 'FAUX'], ['FAUX', 'VRAI'], ['FAUX', 'FAUX']].map(([a, b], i) => `<tr style="border-top:1px solid #E3E8EF"><td style="padding:8px">${a}</td><td>${b}</td><td style="color:${(fn === 'ET' ? [1, 0, 0, 0] : [1, 1, 1, 0])[i] ? '#107C41' : '#DC2626'};background:${(fn === 'ET' ? [1, 0, 0, 0] : [1, 1, 1, 0])[i] ? '#ECFDF3' : '#FEF2F2'}">${(fn === 'ET' ? [1, 0, 0, 0] : [1, 1, 1, 0])[i] ? 'VRAI' : 'FAUX'}</td></tr>`).join('')}
 </table></div>`).join('')}
<div class="card f zoom" data-s="3" style="position:absolute;left:1070px;top:190px;width:460px;padding:22px 24px;border-top:6px solid #FA582D">
 <div style="font:900 34px var(--mono);color:#FA582D">NON(a)</div><div style="font-size:19px;color:#33445E;margin:6px 0 16px">inverse le résultat</div>
 <div style="font:700 22px var(--mono)">NON(VRAI) → <span style="color:#DC2626">FAUX</span><br>NON(FAUX) → <span style="color:#107C41">VRAI</span></div></div>
<div class="f" data-s="4" style="position:absolute;left:70px;right:70px;top:610px;padding:20px 26px;background:#0E1726;border-radius:18px;color:#fff;font:700 28px var(--mono);text-align:center">=SI(<span style="color:#60A5FA">ET(</span>D2&gt;=E2<span style="color:#60A5FA">;</span>C2&gt;0<span style="color:#60A5FA">)</span>;D2*3%;0)</div>`,
  n: `<p>ET, OU et NON ne renvoient que VRAI ou FAUX : on les place donc <b>dans</b> le test logique de SI.</p><p><b>Étape 1 — ET</b> : VRAI uniquement si <b>toutes</b> les conditions sont vraies. Une seule fausse suffit à rendre le tout faux.</p><p><b>Étape 2 — OU</b> : VRAI si <b>au moins une</b> condition est vraie. FAUX seulement si toutes sont fausses.</p><p><b>Étape 3 — NON</b> : inverse le résultat. Utile pour « tout sauf » : NON(B2="Sud").</p><p><b>Étape 4</b> : la règle de prime d'Hydra : objectif atteint <b>ET</b> déjà présent l'an dernier (CA 2025 > 0). ET(…) devient le premier argument de SI.</p><p>Question au groupe : « Avec OU au lieu de ET, que se passerait-il pour Petit ? » → il toucherait une prime alors qu'il est nouveau.</p>` },

/* 10 — LA PRIME AVEC ET */
{ title: 'La prime avec SI et ET', html: `${H('La règle de prime en une formule', 'SI + ET')}
${X03G({ x: 70, y: 180, cols: 8, colw: X03W, rh: 38, rows: X03R(8, { F: 1 }), sel: 'H2', fx: { ref: 'H2', f: '=SI(ET(D2>=E2;C2>0);D2*3%;0)', s: 1 },
  hl: [{ r: 'D2:E2', s: 1, c: '#2563EB' }, { r: 'C2', s: 1, c: '#7C3AED' }], cells: [...X03NUM('H', X03PRI.slice(0, 1), 2), ...X03NUM('H', X03PRI, 3).slice(1).map(q => q.v === '0' ? { ...q, c: '#94A3B8', bg: '#F8FAFC' } : q)],
  hl2: [{ r: 'A4:H4', s: 4, c: '#FA582D', t: 'Oui… mais CA 2025 = 0 → pas de prime' }] })}
${STAT({ v: '25 410 €', t: 'total des primes : <span class="mono">=SOMME(H2:H11)</span>', x: 920, y: 200, w: 610, s: 5, c: '#107C41' })}
${STAT({ v: '5', t: 'primés : Martin, Robert, Richard, Moreau, Michel', x: 920, y: 380, w: 610, s: 5, c: '#2563EB' })}`,
  n: `<p><b>Étape 1</b> : H2 : =SI(ET(D2>=E2;C2>0);D2*3%;0). Deux conditions dans ET : objectif atteint (D2>=E2) et présence en 2025 (C2>0).</p><p><b>Étape 2</b> : Martin : 195 000 ≥ 190 000 et 182 000 > 0 → 195 000 × 3 % = <b>5 850</b>.</p><p><b>Étape 3</b> : recopie : 5 850 · 0 · 0 · 6 960 · 3 630 · 0 · 4 230 · 0 · 0 · 4 740.</p><p><b>Étape 4</b> : le cas qui justifie le ET : Petit a atteint son objectif (88 000 ≥ 80 000) mais son CA 2025 vaut 0 : nouvel arrivant, il relève d'un autre dispositif → 0.</p><p><b>Étape 5</b> : total des primes : =SOMME(H2:H11) → <b>25 410 €</b>, pour 5 commerciaux primés.</p><p>Bonne pratique à évoquer : le taux de 3 % gagnerait à être dans une cellule paramètre ($K$1), comme au module X02.</p>` },

/* 11 — OU : LES ZONES */
{ title: 'OU : regrouper des régions', html: `${H('OU : Nord ou Est, c\'est la zone 1', 'SI + OU')}
${X03G({ x: 70, y: 180, cols: 3, colw: [150, 120, 160], rh: 40, rows: [['Commercial', 'Région', 'Zone'], ...X03D.map(r => [r[0], r[1], ''])], sel: 'C2', fx: { ref: 'C2', f: '=SI(OU(B2="Nord";B2="Est");"Zone 1";"Zone 2")', s: 1 },
  cells: X03ON('C', X03D.map(r => r[1] === 'Nord' || r[1] === 'Est' ? 'Zone 1' : 'Zone 2'), 2), hl2: [{ r: 'B2', s: 1, c: '#2563EB' }] })}
<svg viewBox="0 0 860 470" style="position:absolute;left:640px;top:190px;width:860px;height:470px;font-family:var(--font)">
 <g class="f zoom" data-s="3"><circle cx="300" cy="200" r="150" fill="#2563EB" fill-opacity=".12" stroke="#2563EB" stroke-width="4"/><text x="230" y="205" text-anchor="middle" font-size="30" font-weight="900" fill="#2563EB">Nord</text>
  <circle cx="480" cy="200" r="150" fill="#7C3AED" fill-opacity=".12" stroke="#7C3AED" stroke-width="4"/><text x="550" y="205" text-anchor="middle" font-size="30" font-weight="900" fill="#7C3AED">Est</text>
  <text x="390" y="390" text-anchor="middle" font-size="26" font-weight="900" fill="#107C41">OU = l'un ou l'autre → Zone 1</text></g>
 <g class="f" data-s="4"><text x="390" y="440" text-anchor="middle" font-size="21" fill="#33445E">5 commerciaux en zone 1 · 5 en zone 2</text></g>
</svg>
${TIP('Une cellule ne peut pas valoir « Nord » <b>ET</b> « Est » : avec ET, tout le monde serait en zone 2 !', { s: 5, x: 640, y: 690, w: 890, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : on veut regrouper deux régions dans une même zone commerciale : =SI(OU(B2="Nord";B2="Est");"Zone 1";"Zone 2").</p><p><b>Étape 2</b> : recopie : Martin, Petit, Robert, Moreau, Simon → Zone 1 ; les autres → Zone 2.</p><p><b>Étapes 3-4</b> : OU = union des deux ensembles.</p><p><b>Étape 5</b> : erreur de logique classique : écrire ET(B2="Nord";B2="Est"). Une même cellule ne peut pas contenir deux valeurs : la condition est toujours fausse. Dans le langage courant on dit « les commerciaux du Nord <i>et</i> de l'Est », mais en logique c'est un OU.</p>` },

/* 12 — SI IMBRIQUÉS / SI.CONDITIONS */
{ title: 'Plus de deux issues', html: `${H('Trois classes : SI imbriqués ou SI.CONDITIONS', 'Plusieurs issues')}
${X03G({ x: 70, y: 180, cols: 3, colw: [150, 120, 100], rh: 40, rows: [['Commercial', 'CA 2026', 'Classe'], ...X03D.map(r => [r[0], r[3], ''])],
  cells: X03ON('C', X03D.map(r => { const v = +r[3].replace(/\s/g, ''); return v >= 200000 ? 'A' : v >= 150000 ? 'B' : 'C'; }), 4) })}
<svg viewBox="0 0 520 330" style="position:absolute;left:510px;top:190px;width:520px;height:330px;font-family:var(--font)">
 ${[['B2 ≥ 200 000 ?', 'A', 1, '#107C41'], ['B2 ≥ 150 000 ?', 'B', 2, '#0EA5E9'], ['sinon', 'C', 3, '#DC2626']].map(([q, r, s, c], i) => `<g class="f left" data-s="${s}"><rect x="${10 + i * 40}" y="${10 + i * 105}" width="270" height="70" rx="14" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><text x="${145 + i * 40}" y="${53 + i * 105}" text-anchor="middle" font-size="21" font-weight="800" fill="#0E1726">${q}</text><path d="M${280 + i * 40} ${45 + i * 105} H ${400}" stroke="${c}" stroke-width="4" class="draw" pathLength="1"/><circle cx="440" cy="${45 + i * 105}" r="32" fill="${c}"/><text x="440" y="${56 + i * 105}" text-anchor="middle" font-size="30" font-weight="900" fill="#fff">${r}</text>${i < 2 ? `<path d="M${60 + i * 40} ${80 + i * 105} V ${115 + i * 105}" stroke="#94A3B8" stroke-width="3" stroke-dasharray="5 5"/><text x="${72 + i * 40}" y="${104 + i * 105}" font-size="15" fill="#6B7A90">non</text>` : ''}</g>`).join('')}
</svg>
<div class="col" style="position:absolute;left:1050px;right:70px;top:190px;gap:14px">
 ${CARD('<b>SI imbriqués</b><br><span class="mono" style="font-size:16px">=SI(B2>=200000;"A";<br>&nbsp;SI(B2>=150000;"B";"C"))</span>', 4)}
 ${CARD('<b>SI.CONDITIONS</b> (365)<br><span class="mono" style="font-size:16px">=SI.CONDITIONS(B2>=200000;"A";<br>&nbsp;B2>=150000;"B";VRAI;"C")</span>', 5, 'border-left:6px solid #16A34A')}</div>
${TIP('Testez les seuils <b>du plus grand au plus petit</b> : le premier test VRAI l\'emporte.', { s: 6, x: 510, y: 560, w: 1020, kind: 'ok' })}`,
  n: `<p>Classer les commerciaux : A à partir de 200 000 €, B à partir de 150 000 €, C en dessous.</p><p><b>Étapes 1 à 3</b> : la logique est une cascade : on teste d'abord le seuil le plus haut ; si c'est non, on teste le suivant ; sinon, la dernière classe.</p><p><b>Étape 4</b> : en SI imbriqués : le 3<sup>e</sup> argument du premier SI est… un autre SI. Résultat : Robert (232 000) en A ; Martin, Dubois, Michel en B ; les six autres en C.</p><p><b>Étape 5</b> : en Excel 365 / 2021, SI.CONDITIONS est plus lisible : des paires condition ; valeur, et VRAI pour le « sinon ».</p><p><b>Étape 6</b> : piège : tester d'abord >=150000 classerait Robert en B, car le premier test vrai l'emporte. Au-delà de 3 ou 4 niveaux, préférez une table de correspondance et RECHERCHEX (module X05).</p>` },

/* 13 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX03, 2), n: `<p>Troisième partie : compter et totaliser selon un critère, puis rendre les tableaux propres face aux erreurs.</p>` },

/* 14 — NB.SI */
{ title: 'Compter sous condition', html: `${H('NB.SI : combien de « Oui » ?', 'Compter')}
${X03G({ x: 70, y: 180, cols: 6, colw: X03W, rh: 38, rows: X03R(6, { F: 1 }), hl: [{ r: 'F2:F11', s: 1, c: '#2563EB', t: 'plage F2:F11' }],
  hl2: X03ATT.map((v, i) => v === 'Oui' ? { r: 'F' + (i + 2), s: 2, c: '#16A34A' } : null).filter(Boolean) })}
<div class="a pop" style="--d:.3s;position:absolute;left:780px;right:70px;top:190px;padding:20px;background:#0E1726;border-radius:18px;color:#fff;font:700 30px var(--mono);text-align:center">=NB.SI(<span style="color:#60A5FA">F2:F11</span>;<span style="color:#4ADE80">"Oui"</span>)</div>
${STAT({ v: '6', t: 'objectifs atteints', x: 780, y: 300, w: 360, s: 3, c: '#16A34A' })}
<div class="col" style="position:absolute;left:1170px;right:70px;top:300px;gap:12px">${CARD('<b class="mono">NB</b> : compte les <b>nombres</b>', 4)}${CARD('<b class="mono">NBVAL</b> : les cellules <b>non vides</b>', 4)}</div>
${CARD('<b class="mono">=NB.SI(F2:F11;"Non")</b> → 4 · <b class="mono">=NBVAL(A2:A11)</b> → 10 commerciaux', 5, 'position:absolute;left:780px;right:70px;top:480px')}`,
  n: `<p><b>Étape 1</b> : NB.SI prend deux arguments : la <b>plage</b> où chercher (F2:F11) et le <b>critère</b> ("Oui").</p><p><b>Étape 2</b> : Excel parcourt la plage et repère les cellules qui correspondent.</p><p><b>Étape 3</b> : =NB.SI(F2:F11;"Oui") → <b>6</b>.</p><p><b>Étape 4</b> : ses cousins : NB compte les cellules contenant des <b>nombres</b> ; NBVAL compte les cellules <b>non vides</b> (textes compris). NB(A2:A11) donnerait 0 : ce sont des noms.</p><p><b>Étape 5</b> : contrôle de cohérence : 6 Oui + 4 Non = 10 commerciaux (NBVAL). Ce genre de vérification croisée rassure un lecteur de tableau de bord.</p>` },

/* 15 — SOMME.SI */
{ title: 'Totaliser sous condition', html: `${H('SOMME.SI : le CA de la région Nord', 'Additionner')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;right:70px;top:176px;padding:16px;background:#0E1726;border-radius:18px;color:#fff;font:700 32px var(--mono);text-align:center">=SOMME.SI(<span style="color:#60A5FA">B2:B11</span> ; <span style="color:#FBBF24">"Nord"</span> ; <span style="color:#4ADE80">D2:D11</span>)</div>
${X03G({ x: 70, y: 270, cols: 4, colw: X03W, rh: 37, rows: X03R(4), hl: [{ r: 'B2:B11', s: 1, c: '#2563EB' }, { r: 'D2:D11', s: 3, c: '#16A34A' }],
  hl2: [2, 5, 10].flatMap(r => [{ r: 'B' + r, s: 2, c: '#F59E0B' }, { r: 'D' + r, s: 4, c: '#16A34A' }]) })}
<div class="col" style="position:absolute;left:600px;top:290px;width:440px;gap:12px">
 ${CARD('<b style="color:#2563EB">1 · plage_critère</b> : où chercher', 1)}${CARD('<b style="color:#D97706">2 · critère</b> : quoi chercher', 2)}${CARD('<b style="color:#16A34A">3 · plage_somme</b> : quoi additionner', 3)}</div>
${STAT({ v: '544 000', t: '195 000 + 232 000 + 117 000', x: 1070, y: 290, w: 460, s: 4, c: '#16A34A' })}
${TIP('Ordre piège : le <b>critère</b> d\'abord, la <b>somme</b> à la fin. Les deux plages ont la <b>même taille</b>.', { s: 5, x: 600, y: 560, w: 930, kind: 'warn' })}`,
  n: `<p>SOMME.SI additionne les valeurs d'une plage pour les lignes qui répondent à un critère.</p><p><b>Étape 1 — plage_critère</b> : B2:B11, la colonne des régions.</p><p><b>Étape 2 — critère</b> : "Nord" : Excel repère Martin, Robert et Simon (lignes 2, 5, 10).</p><p><b>Étape 3 — plage_somme</b> : D2:D11, le CA 2026.</p><p><b>Étape 4</b> : il additionne les CA des lignes repérées : 195 000 + 232 000 + 117 000 = <b>544 000</b>.</p><p><b>Étape 5</b> : piège de l'ordre des arguments : la plage à additionner est en <b>dernier</b>. Inverser donne 0. Les deux plages doivent avoir la même taille. Pour plusieurs critères : SOMME.SI.ENS (plage_somme en premier, cette fois !).</p>` },

/* 16 — CRITÈRES AVANCÉS */
{ title: 'Les critères avancés', html: `${H('Comparaisons, jokers et cellules critères', 'Critères')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:flex;flex-direction:column;gap:14px">
 ${[['=NB.SI(D2:D11;">150000")', '4', 'CA supérieurs à 150 000', 1], ['=NB.SI(B2:B11;"<>Sud")', '7', 'tous sauf le Sud', 2], ['=NB.SI(A2:A11;"M*")', '3', 'noms commençant par M (Martin, Moreau, Michel)', 3], ['=NB.SI(D2:D11;">"&J1)', '4', 'seuil lu dans la cellule J1 (150 000)', 4], ['=MOYENNE.SI(B2:B11;"Sud";D2:D11)', '158 333,33', 'CA moyen du Sud', 5]].map(([f, r, d, s]) => `
 <div class="card f left" data-s="${s}" style="display:grid;grid-template-columns:640px 200px 1fr;align-items:center;gap:20px;padding:14px 24px">
  <span style="font:700 23px var(--mono);color:#107C41">${f.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span><b style="font-size:30px;color:#0E1726;text-align:right">${r}</b><span style="font-size:19px;color:#33445E">${d}</span></div>`).join('')}</div>
${TIP('<b>">J1"</b> chercherait le texte « J1 » : il faut <b>concaténer</b> l\'opérateur et la cellule avec <b>&</b>.', { s: 6, x: 70, y: 700, w: 1460, kind: 'warn' })}`,
  n: `<p>Le critère n'est pas forcément une égalité.</p><p><b>Étape 1</b> : une comparaison s'écrit <b>entre guillemets</b> : ">150000" → 4 (Martin, Robert, Dubois, Michel).</p><p><b>Étape 2</b> : "&lt;&gt;Sud" = différent de Sud → 7.</p><p><b>Étape 3</b> : les <b>jokers</b> : * remplace n'importe quelle suite de caractères, ? un seul caractère. "M*" → 3.</p><p><b>Étape 4</b> : pour un seuil modifiable, on le place dans une cellule (J1 = 150 000) et on concatène : ">"&J1. Avantage : on change le seuil sans toucher la formule.</p><p><b>Étape 5</b> : MOYENNE.SI a la même syntaxe que SOMME.SI : (149 000 + 168 000 + 158 000) / 3 = 158 333,33.</p><p><b>Étape 6</b> : le piège ">J1" : entre guillemets, J1 n'est plus une référence mais un texte.</p>` },

/* 17 — LES ERREURS */
{ title: 'Les messages d\'erreur', html: `${H('Lire un message d\'erreur', 'Diagnostiquer')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(5,1fr);gap:16px">
 ${[['#DIV/0!', 'Division par zéro', 'ou par une cellule vide', '=D4/C4 avec C4 = 0'], ['#N/A', 'Valeur introuvable', 'recherche sans résultat', 'RECHERCHEX(…)'], ['#NOM?', 'Nom inconnu', 'faute de frappe, guillemets oubliés', '=SOMEM(A1:A5)'], ['#VALEUR!', 'Mauvais type', 'calcul sur du texte', '="abc"*2'], ['#REF!', 'Référence perdue', 'cellule supprimée', '=B2/#REF!']].map(([e, t, d, x], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:22px 16px;text-align:center;border-top:6px solid #DC2626"><div style="font:900 30px var(--mono);color:#DC2626">${e}</div><div style="font-size:21px;font-weight:800;margin:12px 0 6px">${t}</div><div style="font-size:17px;color:#33445E;min-height:48px">${d}</div><div style="font:600 15px var(--mono);color:#6B7A90;margin-top:10px">${x}</div></div>`).join('')}</div>
${PROC([{ p: 'Formules > Vérification des formules > Évaluation de formule', t: 'Rejoue le calcul pas à pas et montre où il casse' }], { x: 70, y: 520, w: 1460, s0: 6 })}
${TIP('Sélectionnez une partie de formule dans la barre puis <b>F9</b> : Excel affiche sa valeur. <b>Échap</b> pour ne rien modifier !', { s: 7, x: 70, y: 660, w: 1460, kind: 'key' })}`,
  n: `<p>Avant d'intercepter une erreur, il faut savoir la lire.</p><p><b>Étape 1 — #DIV/0!</b> : division par zéro ou par une cellule vide (nos nouveaux arrivants ont un CA 2025 = 0).</p><p><b>Étape 2 — #N/A</b> : valeur non disponible, typiquement une recherche sans résultat (module X05).</p><p><b>Étape 3 — #NOM?</b> : Excel ne connaît pas un nom : fonction mal orthographiée (SOMEM), fonction anglaise (SUM) dans un Excel français, texte sans guillemets.</p><p><b>Étape 4 — #VALEUR!</b> : opération impossible sur un type, comme multiplier un texte.</p><p><b>Étape 5 — #REF!</b> : la formule pointait vers une cellule, une ligne ou une feuille supprimée.</p><p><b>Étapes 6-7</b> : outils : Évaluation de formule, et F9 sur une portion de formule sélectionnée (puis Échap, sinon le résultat remplace la formule !).</p>` },

/* 18 — SIERREUR */
{ title: 'SIERREUR', html: `${H('SIERREUR : remplacer une erreur prévue', 'Des tableaux propres')}
${X03G({ x: 70, y: 180, cols: 7, colw: X03W, rh: 38, rows: X03R(7), sel: 'G2', fx: { ref: 'G2', f: '=D2/C2-1', s: 1 }, fx2: [{ ref: 'G2', f: '=SIERREUR(D2/C2-1;"Nouveau")', s: 3 }],
  cells: [...X03EVO.map((v, i) => ({ r: 'G' + (i + 2), v: v === 'Nouveau' ? '#DIV/0!' : v, s: 1, c: v === 'Nouveau' ? '#DC2626' : '#0E1726', bg: v === 'Nouveau' ? '#FEF2F2' : '#fff', d: i * .06 })),
    { r: 'G4', v: 'Nouveau', s: 4, c: '#7C3AED', bg: '#F5F3FF', al: 'center' }, { r: 'G9', v: 'Nouveau', s: 4, c: '#7C3AED', bg: '#F5F3FF', al: 'center' }],
  hl2: [{ r: 'C4', s: 2, c: '#DC2626' }, { r: 'C9', s: 2, c: '#DC2626' }] })}
<div class="a pop" style="--d:.3s;position:absolute;left:880px;right:70px;top:190px;padding:18px;background:#0E1726;border-radius:18px;color:#fff;font:700 24px var(--mono);text-align:center">=SIERREUR(<span style="color:#4ADE80">valeur</span> ; <span style="color:#C4B5FD">valeur_si_erreur</span>)</div>
<div class="col" style="position:absolute;left:880px;right:70px;top:290px;gap:14px">
 ${CARD('<b>1 ·</b> =D2/C2-1 → <b>7,14 %</b> pour Martin', 1)}${CARD('<b>2 ·</b> Petit et Laurent : C = 0 → <b style="color:#DC2626">#DIV/0!</b>', 2)}
 ${CARD('<b>3 ·</b> On enveloppe le calcul dans <b>SIERREUR</b>', 3)}${CARD('<b>4 ·</b> L\'erreur est remplacée par <b style="color:#7C3AED">« Nouveau »</b>', 4)}</div>`,
  n: `<p>Évolution du CA : =D2/C2-1 (format pourcentage).</p><p><b>Étape 1</b> : Martin : 195 000 / 182 000 − 1 = <b>7,14 %</b>. Les autres : −3,25 % · 10,48 % · 23,47 % · −4,00 % · 6,02 % · −1,68 % · 11,27 %.</p><p><b>Étape 2</b> : Petit et Laurent ont un CA 2025 à 0 → division par zéro → <b>#DIV/0!</b>. L'erreur est <i>attendue</i> : ce sont des nouveaux arrivants.</p><p><b>Étape 3</b> : =SIERREUR(D2/C2-1;"Nouveau") : SIERREUR renvoie le calcul s'il fonctionne, sinon la valeur de remplacement.</p><p><b>Étape 4</b> : le tableau est propre et parlant. Bonus : une erreur dans une colonne empêche toute SOMME ou MOYENNE de cette colonne ; après SIERREUR, les fonctions ignorent le texte « Nouveau ».</p>` },

/* 19 — SIERREUR : BON USAGE */
{ title: 'SIERREUR : avec modération', html: `${H('SIERREUR : avec modération', 'Bonne pratique')}
${VS({ y: 190, l: { t: 'À éviter', c: '#DC2626', ic: '✘', html: '<div style="font:700 22px var(--mono);color:#DC2626">=SIERREUR(SOMEM(D2:D11);0)</div><ul class="lst sm" style="margin-top:14px"><li>SIERREUR « par principe » partout</li><li>Masque <b>#NOM?</b>, <b>#REF!</b> : de vrais bugs</li><li>Affiche 0 : un faux résultat <b>crédible</b></li></ul>' },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', html: '<div style="font:700 22px var(--mono);color:#107C41">=SIERREUR(D2/C2-1;"Nouveau")</div><ul class="lst sm" style="margin-top:14px"><li>Seulement pour un cas <b>prévu et compris</b></li><li>Une valeur de remplacement <b>parlante</b></li><li>Division par zéro connue, recherche sans résultat</li></ul>' }, mid: '⚖' })}
${STAT({ v: '#NOM?', t: 'masqué en 0 = un total faux que personne ne verra', x: 70, y: 600, w: 700, s: 3, c: '#DC2626' })}
${TIP('Variante ciblée : <b>SI.NON.DISP</b> n\'intercepte que <b>#N/A</b> (recherches).', { s: 4, x: 830, y: 620, w: 700 })}`,
  n: `<p><b>Étape 1</b> : la tentation : envelopper toutes les formules dans SIERREUR « pour être tranquille ». Ici, une faute de frappe (SOMEM) produit #NOM?… que SIERREUR transforme en 0. Le tableau est faux et personne ne le voit.</p><p><b>Étape 2</b> : la bonne pratique : n'intercepter qu'une erreur <b>prévue et comprise</b>, avec une valeur de remplacement qui a du sens (« Nouveau », « Introuvable », une cellule vide).</p><p><b>Étape 3</b> : une erreur visible est une alerte utile ; une erreur masquée est un risque.</p><p><b>Étape 4</b> : SI.NON.DISP (IFNA) ne capture que #N/A : idéal autour d'une recherche, car il laisse passer les autres erreurs.</p>` },

/* 20 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: 'SI', hfs: 96, hsub: 'vrai · faux', hk: 'EXCEL 03',
  items: [{ ic: '❓', t: 'SI', d: '=SI(test ; si_vrai ; si_faux) · textes entre guillemets, nombres sans' }, { ic: '🔗', t: 'ET · OU · NON', d: 'ET : tout est vrai · OU : au moins un · dans le test de SI' },
    { ic: '🪜', t: 'Plusieurs issues', d: 'SI imbriqués ou SI.CONDITIONS · seuils du plus grand au plus petit' }, { ic: '🧮', t: 'NB.SI · SOMME.SI', d: 'Critère, puis plage à additionner en dernier · ">"&J1' }, { ic: '🛡️', t: 'SIERREUR', d: 'Seulement pour une erreur prévue et comprise' }] }),
  n: `<p>Faites traduire oralement une règle métier du groupe (notée en début de module) en formule SI/ET/OU, puis en NB.SI ou SOMME.SI pour la synthèse.</p>` },

/* 21 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Raccourcis pour écrire des fonctions', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Maj+F3', d: 'Insérer une fonction (assistant)' }, { k: 'Ctrl+A', d: 'Après =SI : ouvrir les arguments' }, { k: 'F9', d: 'Évaluer la partie sélectionnée' }, { k: 'Ctrl+Maj+U', d: 'Agrandir la barre de formule' }, { k: 'F4', d: 'Figer une plage de critères' }, { k: 'Alt+Entrée', d: 'Aérer une longue formule' }], { cols: 3, y: 200 })}
${TIP('Pour une formule longue : <b>Ctrl+Maj+U</b> agrandit la barre, <b>Alt+Entrée</b> y insère des retours à la ligne.', { s: 7, kind: 'key', y: 560, w: 1100 })}`,
  n: `<p><b>Maj+F3</b> ouvre l'assistant « Insérer une fonction ». Tapez =SI puis <b>Ctrl+A</b> : la boîte des arguments s'ouvre directement.</p><p><b>F9</b> sur une portion sélectionnée de formule l'évalue (Échap ensuite !). <b>Ctrl+Maj+U</b> déplie la barre de formule, et <b>Alt+Entrée</b> dans la barre permet d'écrire un SI imbriqué sur plusieurs lignes, beaucoup plus lisible.</p>` },

/* 22 — LAB */
{ title: 'Lab', html: LAB({ app: 'excel', mod: 'x03', lab: 0, title: 'Lab — Les primes de l\'équipe', tasks: ['<b>F2</b> : <code>=SI(D2>=E2;"Oui";"Non")</code> → F11', '<b>G2</b> : évolution avec <b>SIERREUR</b> → « Nouveau »', '<b>H2</b> : prime <code>=SI(ET(D2>=E2;C2>0);D2*3%;0)</code>', '<b>K2</b> : <b>NB.SI</b> des objectifs atteints (6)', '<b>K3</b> : <b>SOMME.SI</b> du CA Nord (544 000)', '<b>K4</b> : total des primes (25 410)'] }),
  n: `<p>Scénario : contrôleur de gestion chez Hydra Équipements, calcul des primes annuelles.</p><p>Solution : F2 =SI(D2>=E2;"Oui";"Non") → 6 Oui ; G2 =SIERREUR(D2/C2-1;"Nouveau") → 7,14 % pour Martin, « Nouveau » pour Petit et Laurent ; H2 =SI(ET(D2>=E2;C2>0);D2*3%;0) → 5 850, 6 960, 3 630, 4 230, 4 740 ; K2 =NB.SI(F2:F11;"Oui") → 6 ; K3 =SOMME.SI(B2:B11;"Nord";D2:D11) → 544 000 ; K4 =SOMME(H2:H11) → 25 410.</p><p>Erreurs fréquentes : guillemets courbes, ordre des arguments de SOMME.SI, OU à la place de ET.</p>` },

/* 23 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Que renvoie =SI(ET(5>3;2>4);"A";"B") ?', o: ['A', 'B', 'VRAI', '#VALEUR!'], a: [1], e: 'ET exige que toutes les conditions soient vraies ; 2>4 est faux, donc SI renvoie « B ».' },
  { q: 'Quelle formule additionne D2:D11 pour la région « Sud » (colonne B) ?', o: ['=SOMME.SI(D2:D11;"Sud";B2:B11)', '=SOMME.SI(B2:B11;"Sud";D2:D11)', '=NB.SI(B2:B11;"Sud")', '=SOMME(SI(B2:B11=Sud))'], a: [1], e: 'SOMME.SI(plage_critère ; critère ; plage_somme).' },
  { q: 'Comment compter les CA supérieurs à la valeur de J1 ?', o: ['=NB.SI(D2:D11;">J1")', '=NB.SI(D2:D11;">"&J1)', '=NB.SI(D2:D11;>J1)', '=NB(D2:D11>J1)'], a: [1], e: 'On concatène l\'opérateur (texte) et la cellule : ">"&J1.' },
  { q: 'Une formule affiche #NOM?. Causes possibles ?', o: ['Une division par zéro', 'Un nom de fonction mal orthographié', 'Des guillemets oubliés autour d\'un texte', 'Une colonne trop étroite'], a: [1, 2], e: '#NOM? signale un nom inconnu : faute de frappe, fonction anglaise, ou texte sans guillemets.' },
  { q: 'Pourquoi ne pas mettre SIERREUR sur toutes les formules ?', o: ['Elle ralentit fortement Excel', 'Elle masque aussi les erreurs imprévues', 'Elle ne marche qu\'avec RECHERCHEV', 'Elle convertit les nombres en texte'], a: [1], e: 'Réservez SIERREUR aux erreurs attendues ; #REF! ou #NOM? signalent de vrais problèmes.' },
  { q: '=SI(OU(B2="Nord";B2="Est");"Z1";"Z2") avec B2 = "Est" renvoie :', o: ['Z1', 'Z2', 'FAUX', '#VALEUR!'], a: [0], e: 'OU est vrai dès qu\'une condition est vraie : B2="Est" suffit.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b et c · 5) b · 6) a.</p>` },

/* 24 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X03', html: END(), n: `<p>Fin du module X03. Prochain module : <b>X04 — Trier, filtrer, mettre en évidence</b> : exploiter une liste de données avec le tri, les filtres, la mise en forme conditionnelle et les tableaux structurés.</p>` },
] };
