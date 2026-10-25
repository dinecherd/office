/* ===================== MODULE X05 — Fonctions de recherche, de texte et de date (Avancé) ===================== */
const SECSX05 = ['Croiser deux tableaux : RECHERCHEV', 'RECHERCHEX et INDEX/EQUIV', 'Nettoyer le texte, calculer les dates'];

/* ---- helpers locaux X05 ---- */
/* GRID avec lettres de colonnes personnalisées (ex. ['I','J','K','L']) */
const GX05 = (o, L) => { let h = GRID(o); if (L) { let i = 0; h = h.replace(/(<div class="xg-cols"[^>]*>)([\s\S]*?)(<\/div>)/, (m, a, b, c) => a + b.replace(/>([A-Z])<\/span>/g, () => '>' + L[i++] + '</span>') + c); } return h; };
/* centre d'une cellule (coordonnées diapo) pour une grille o */
const CX05 = (o, ref) => { const RH = o.rh || 38, cw = c => (o.colw && o.colw[c]) || o.cw || 120; const m = /^([A-Z])(\d+)$/.exec(ref), c = m[1].charCodeAt(0) - 65, r = +m[2]; let x = 46; for (let i = 0; i < c; i++) x += cw(i); return { x: (o.x ?? 70) + x + cw(c) / 2, y: (o.y ?? 170) + (o.fx ? 42 : 0) + RH * r + RH / 2, w: cw(c), h: RH }; };
/* valeur posée par-dessus une cellule à l'étape s (permet de remplacer une valeur) */
const CELLX05 = (o, ref, html, s, st = '') => { const q = CX05(o, ref); return `<div class="f" data-s="${s}" style="position:absolute;left:${q.x - q.w / 2 + 1}px;top:${q.y - q.h / 2 + 1}px;width:${q.w - 2}px;height:${q.h - 2}px;display:flex;align-items:center;justify-content:flex-end;padding:0 10px;font:800 18px 'Segoe UI',sans-serif;background:#ECFDF3;color:#107C41;white-space:nowrap;overflow:hidden;z-index:3;${st}">${html}</div>`; };
/* valeur cherchée qui parcourt la grille : segs = [{p:['I2','I4'], lab:'C003', t:2}, …] */
const SCANX05 = (o, segs, s, until = 20, extra = {}) => FLOW({ x: 0, y: 0, w: 1600, h: 900, p: [{ s, until, pause: extra.pause ?? 1.4, r: 12, seg: segs.map(g => ({ d: 'M' + g.p.map(r => { const q = CX05(o, r); return q.x + ' ' + q.y; }).join(' L'), lab: g.lab, t: g.t || 1.6, c: g.c, block: g.block })) }] });
const REFX05 = [['Code', 'Ville', 'Commercial', 'Remise'], ['C001', 'Lyon', 'Sophie', '5 %'], ['C002', 'Lille', 'Karim', '3 %'], ['C003', 'Nantes', 'Sophie', '8 %'], ['C004', 'Bordeaux', 'Julie', '0 %'], ['C005', 'Marseille', 'Karim', '10 %'], ['C006', 'Strasbourg', 'Julie', '4 %']];
const RX05 = ['I', 'J', 'K', 'L'];
const BIGX05 = (txt, s, st = '') => `<div class="card f zoom" data-s="${s}" style="position:absolute;text-align:center;padding:22px 26px;${st}">${txt}</div>`;

/* grilles réutilisées */
const G6X05 = { x: 70, y: 210, colw: [110, 160, 160, 110], rows: REFX05, fx: { ref: 'D2', f: '=RECHERCHEV(B2;$I$2:$L$7;2;FAUX)', s: 1 } };
const G7X05 = { x: 70, y: 250, colw: [110, 160, 160, 110], rows: REFX05 };
const G8X05 = { x: 70, y: 230, colw: [300, 230], rows: [['Seuil CA', 'Remise'], ['0', '0 %'], ['1 000', '2 %'], ['2 500', '5 %'], ['5 000', '8 %']], fx: { ref: 'C2', f: '=RECHERCHEV(3200;$N$2:$O$5;2;VRAI)', s: 1 }, rh: 46 };
const CMDX05 = [['Commande', 'Client', 'Montant HT', 'Ville'], ['CMD-1001', 'C003', '1 250', ''], ['CMD-1002', 'C001', '840', ''], ['CMD-1003', 'C005', '2 310', ''], ['CMD-1004', 'C002', '460', ''], ['CMD-1005', 'C004', '1 780', ''], ['CMD-1006', 'C001', '395', ''], ['CMD-1007', 'C006', '1 120', ''], ['CMD-1008', 'C099', '650', ''], ['CMD-1009', 'C005', '980', ''], ['CMD-1010', 'C003', '1 515', '']];
const G9X05 = { x: 70, y: 180, colw: [130, 90, 130, 170], rows: CMDX05, rh: 40, fx: { ref: 'D9', f: '=SIERREUR(RECHERCHEV(B9;$I$2:$L$7;2;FAUX);"Client inconnu")', s: 3 } };
const G12X05 = { x: 70, y: 210, colw: [110, 160, 160, 110], rows: REFX05, fx: { ref: 'E2', f: '=RECHERCHEX(B2;$I$2:$I$7;$K$2:$K$7)', s: 1 } };
const G13X05 = { x: 70, y: 210, colw: [110, 160, 160, 110], rows: REFX05, fx: { ref: 'H2', f: '=RECHERCHEX("Lille";$J$2:$J$7;$I$2:$I$7)', s: 1 } };
const G14X05 = { x: 120, y: 220, colw: [130, 170], rows: REFX05.map(r => r.slice(0, 2)), fx: { ref: 'F2', f: '=EQUIV(B2;$I$2:$I$7;0)', s: 1 }, rh: 44 };
const G15X05 = { x: 70, y: 220, colw: [110, 150, 140, 110], rows: REFX05, rh: 44 };
const G17X05 = { x: 70, y: 175, colw: [106, 66, 94, 132, 120, 86, 112], rh: 38, fx: { ref: 'G2', f: '=C2*(1-F2)', s: 4 },
  rows: [['Commande', 'Client', 'Montant', 'Ville', 'Commercial', 'Remise', 'Net HT'], ['CMD-1001', 'C003', '1 250'], ['CMD-1002', 'C001', '840'], ['CMD-1003', 'C005', '2 310'], ['CMD-1004', 'C002', '460'], ['CMD-1005', 'C004', '1 780'], ['CMD-1006', 'C001', '395'], ['CMD-1007', 'C006', '1 120'], ['CMD-1008', 'C099', '650'], ['CMD-1009', 'C005', '980'], ['CMD-1010', 'C003', '1 515']] };
const ENRX05 = [['Nantes', 'Sophie', '8 %', '1 150,00'], ['Lyon', 'Sophie', '5 %', '798,00'], ['Marseille', 'Karim', '10 %', '2 079,00'], ['Lille', 'Karim', '3 %', '446,20'], ['Bordeaux', 'Julie', '0 %', '1 780,00'], ['Lyon', 'Sophie', '5 %', '375,25'], ['Strasbourg', 'Julie', '4 %', '1 075,20'], ['Client inconnu', '#N/A', '#N/A', '#N/A'], ['Marseille', 'Karim', '10 %', '882,00'], ['Nantes', 'Sophie', '8 %', '1 393,80']];
const G21X05 = { x: 70, y: 190, colw: [150, 110, 120, 130, 290], rh: 42, fx: { ref: 'F2', f: '=E2&"@lumen-conseil.fr"', s: 3 },
  rows: [['Nom (export)', 'Prénom', 'Nom', 'Identifiant', 'E-mail'], ['<span style="background:#FECACA">&nbsp;&nbsp;</span>LEROY', 'Camille'], ['MARTIN', 'Hugo'], ['GARNIER<span style="background:#FECACA">&nbsp;</span>', 'Inès'], ['FOURNIER', 'Lucas'], ['<span style="background:#FECACA">&nbsp;</span>MERCIER', 'Chloé'], ['BONNET', 'Théo']] };
const ACCX05 = [['Leroy', 'cleroy'], ['Martin', 'hmartin'], ['Garnier', 'igarnier'], ['Fournier', 'lfournier'], ['Mercier', 'cmercier'], ['Bonnet', 'tbonnet']];
const G22X05 = { x: 70, y: 220, colw: [260, 170, 170], rh: 44, rows: [['Nom complet', 'Prénom', 'NOM'], ['Camille Leroy', 'Camille', 'LEROY'], ['Hugo Martin', 'Hugo', 'MARTIN'], ['Inès Garnier'], ['Lucas Fournier'], ['Chloé Mercier'], ['Théo Bonnet'], ['Emma Lambert']] };
const G23X05 = { x: 70, y: 400, colw: [420, 190], rh: 40, rows: [['Formule (C2 = 15/03/2019)', 'Résultat'], ['=ANNEE(C2)'], ['=MOIS(C2)'], ['=JOUR(C2)'], ['=C2+30'], ['=TEXTE(C2;"mmmm aaaa")'], ['=TEXTE(C2;"jjjj")']] };
const G24X05 = { x: 70, y: 190, colw: [120, 130, 90, 150], rh: 40, fx: { ref: 'D2', f: '=DATEDIF(B2;$H$1;"y")', s: 2 },
  rows: [['Nom', 'Entrée', 'Année', 'Ancienneté'], ['Leroy', '15/03/2019'], ['Martin', '01/09/2021'], ['Garnier', '11/01/2016'], ['Fournier', '19/06/2023'], ['Mercier', '05/11/2018'], ['Bonnet', '24/02/2020'], ['Lambert', '08/04/2024'], ['Faure', '30/10/2017']] };
const DATX05 = [['2019', '7'], ['2021', '5'], ['2016', '10'], ['2023', '3'], ['2018', '8'], ['2020', '6'], ['2024', '2'], ['2017', '9']];

window.MODULE = { code: 'X05', title: 'Fonctions de recherche, de texte et de date', short: 'Recherche, texte, dates', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Recherche, texte et dates', html: TITLE({ mod: 'EXCEL · MODULE 05 · AVANCÉ', title: 'Faire <span class="grad">parler</span> vos tableaux entre eux', sub: '« RECHERCHEV, RECHERCHEX, INDEX/EQUIV, texte et dates »', agenda: SECSX05, art: APPART('excel') }),
  n: `<p>Bienvenue dans le premier module de niveau <b>Avancé</b>. Jusqu'ici, chaque formule travaillait dans un seul tableau. Aujourd'hui, on apprend à <b>croiser deux tableaux</b> : aller chercher une information (ville, commercial, remise…) dans un référentiel à partir d'un code.</p><p>Trois temps : RECHERCHEV (la fonction historique, encore partout), puis RECHERCHEX et INDEX/EQUIV (les solutions modernes et robustes), enfin les fonctions de <b>texte</b> et de <b>date</b> qui servent à nettoyer les données avant de les croiser.</p><p>Question d'accroche : « Qui a déjà recopié à la main des informations d'un fichier à l'autre ? » — c'est exactement ce qu'on va automatiser.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Aller chercher une information dans une table avec <b>RECHERCHEV</b>', 'Utiliser <b>RECHERCHEX</b> et le duo <b>INDEX/EQUIV</b>', 'Nettoyer et assembler du texte : <b>SUPPRESPACE</b>, <b>NOMPROPRE</b>, <b>GAUCHE</b>, <b>&amp;</b>', 'Extraire et calculer avec les dates : <b>ANNEE</b>, <b>MOIS</b>, <b>TEXTE</b>, <b>DATEDIF</b>']),
  n: `<p>Quatre objectifs, qui correspondent aux deux labs : le <b>Lab 1</b> enrichit un carnet de commandes (RECHERCHEV, RECHERCHEX, INDEX/EQUIV, SIERREUR) ; le <b>Lab 2</b> crée des comptes de messagerie à partir d'un export RH mal formaté (texte et dates).</p><p>Durée indicative : 70 minutes, dont la moitié en pratique.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX05, 0), n: `<p>Première partie : RECHERCHEV. C'est la fonction de recherche la plus répandue dans les classeurs d'entreprise : même si vous utilisez RECHERCHEX demain, vous en croiserez partout et devez savoir la lire et la dépanner.</p>` },

/* 4 — LE PROBLÈME (FLOW) */
{ title: 'Le besoin', html: `${H('Le besoin : croiser deux tableaux', 'Atelier Mobilier Pro · carnet de commandes')}
${FLOW({ x: 70, y: 170, w: 1460, h: 560,
  z: [{ x: 0, y: 40, w: 440, h: 420, l: 'EXPORT COMMANDES', c: '#0EA5E9' }, { x: 520, y: 40, w: 420, h: 420, l: 'RÉFÉRENTIEL CLIENTS', c: '#7C3AED', s: 1 }, { x: 1020, y: 40, w: 440, h: 420, l: 'CARNET ENRICHI', c: '#107C41', s: 3 }],
  n: { c: { x: 220, y: 250, ic: 'xlsx', sz: 110, l: 'CMD-1001 · C003', sub: 'code client seulement' },
    r: { x: 730, y: 250, ic: 'tablei', sz: 110, hot: true, l: 'C003 → Nantes', sub: 'Ville · Commercial · Remise', s: 1 },
    e: { x: 1240, y: 250, ic: 'formula', sz: 110, l: 'Nantes · Sophie · 8 %', sub: 'complété par formule', s: 3 } },
  l: [{ a: 'c', b: 'r', s: 2 }, { a: 'r', b: 'e', s: 3 }],
  p: [{ s: 2, keep: true, c: '#FA582D', seg: [{ via: ['c', 'r'], lab: 'C003', t: 1.6 }, { via: ['r', 'e'], lab: 'Nantes', t: 1.6 }] }] })}
<div class="chip dark f" data-s="4" style="position:absolute;left:70px;top:760px;font-size:20px">🔑 La clé commune : le <b style="color:#FFB37A">&nbsp;code client</b></div>
<div class="chip f" data-s="4" style="position:absolute;left:520px;top:760px;font-size:20px">10 commandes · 6 clients · 0 copier-coller</div>`,
  n: `<p><b>Situation</b> : l'export des commandes ne contient que le <b>code client</b>. L'assistante commerciale doit compléter chaque ligne avec la ville, le commercial et la remise contractuelle.</p><p><b>Étape 1</b> : ces informations existent déjà dans un <b>référentiel clients</b> (une ligne par client).</p><p><b>Étape 2</b> : la formule prend le code (C003), le cherche dans le référentiel…</p><p><b>Étape 3</b> : … et rapporte la valeur voulue (Nantes) dans le carnet.</p><p><b>Étape 4</b> : tout repose sur une <b>clé commune</b> unique : code client, référence produit, matricule. Demandez au groupe : quelles clés utilisez-vous au quotidien ? (n° de SIRET, code article, n° de dossier…)</p>` },

/* 5 — ANATOMIE RECHERCHEV */
{ title: 'Anatomie de RECHERCHEV', html: `${H('Anatomie de RECHERCHEV', 'Quatre arguments')}
<div class="a pop mono" style="--d:.2s;position:absolute;left:70px;right:70px;top:190px;text-align:center;font-size:40px;font-weight:800;color:#0E1726">=RECHERCHEV(<span style="color:#2563EB">B2</span>;<span style="color:#7C3AED">$I$2:$L$7</span>;<span style="color:#FA582D">2</span>;<span style="color:#16A34A">FAUX</span>)</div>
<div style="position:absolute;left:70px;right:70px;top:300px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
 ${[['#2563EB', 'B2', 'Valeur cherchée', 'Le code client de la ligne'], ['#7C3AED', '$I$2:$L$7', 'Table', 'Clé dans la <b>1<sup>re</sup> colonne</b> · figée avec F4'], ['#FA582D', '2', 'N° de colonne', 'Compté <b>dans la table</b> : J = 2'], ['#16A34A', 'FAUX', 'Correspondance', '<b>Exacte</b> (ou 0)']].map(([c, k, t, d], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="border-top:6px solid ${c};padding:22px"><div class="mono" style="font-size:28px;font-weight:900;color:${c}">${k}</div><div style="font-size:24px;font-weight:800;margin:8px 0">${t}</div><div style="font-size:19px;color:#33445E">${d}</div></div>`).join('')}
</div>
${TIP('<b>Oublier le 4<sup>e</sup> argument</b> = VRAI par défaut : résultat <b>faux mais plausible</b>, sans erreur.', { s: 5, kind: 'warn', x: 70, y: 600, w: 900 })}
${STAT({ v: '#1', t: 'cause de résultats erronés dans les recherches', x: 1050, y: 590, w: 480, s: 5, c: '#DC2626' })}`,
  n: `<p><b>Étape 1 — valeur cherchée</b> : ici B2, le code client de la commande. On la laisse en <b>relatif</b> pour qu'elle suive la recopie (B3, B4…).</p><p><b>Étape 2 — table</b> : la plage du référentiel, <b>en absolu</b> ($I$2:$L$7) avec <kbd>F4</kbd> pour qu'elle ne glisse pas quand on recopie. Contrainte forte : la clé doit être dans la <b>première colonne</b> de la table.</p><p><b>Étape 3 — n° de colonne</b> : se compte à partir du début de la <b>table</b>, pas de la feuille. I = 1, J = 2, K = 3, L = 4.</p><p><b>Étape 4 — FAUX</b> : correspondance exacte. On peut écrire 0.</p><p><b>Étape 5</b> : le piège n°1. Sans 4<sup>e</sup> argument, Excel utilise VRAI (approchée). Sur une liste de codes non triée, il renvoie la valeur d'une autre ligne… sans aucun message d'erreur. Montrez-le en démo : supprimez « ;FAUX » et observez le résultat changer.</p>` },

/* 6 — LA RECHERCHE EN ACTION (GRID + FLOW) */
{ title: 'RECHERCHEV en action', html: `${H('La valeur cherchée parcourt la 1<sup>re</sup> colonne', 'RECHERCHEV en action')}
${GX05(Object.assign({ hl: [{ r: 'A2:D7', s: 1, c: '#7C3AED', t: 'table $I$2:$L$7' }, { r: 'A4:D4', s: 3, c: '#16A34A' }, { r: 'B4', s: 3, c: '#FA582D', t: 'col. 2' }] }, G6X05), RX05)}
${SCANX05(G6X05, [{ p: ['A2', 'A4'], lab: 'C003 ?', t: 2.2 }, { p: ['A4', 'B4'], lab: 'trouvé → col. 2', t: 1.4, c: '#16A34A' }], 2)}
<div class="col" style="position:absolute;left:760px;right:70px;top:210px;gap:16px">
 ${CARD('<b>1 ·</b> Excel lit la valeur cherchée : <b class="mono">C003</b>', 1)}
 ${CARD('<b>2 ·</b> Il descend la <b>1<sup>re</sup> colonne</b>, ligne par ligne : C001 ✘ · C002 ✘ · <b>C003 ✔</b>', 2)}
 ${CARD('<b>3 ·</b> Sur la ligne trouvée, il se décale à la <b>colonne 2</b> de la table', 3)}
</div>
${BIGX05(`<div style="font-size:18px;color:#6B7A90;font-weight:700">D2 =</div><div style="font-size:54px;font-weight:900;color:#107C41">Nantes</div>`, 4, 'left:760px;top:600px;width:330px')}
${BIGX05(`<div style="font-size:18px;color:#6B7A90;font-weight:700">Recopie D2:D11</div><div style="font-size:28px;font-weight:900;margin-top:6px">10 villes en 1 geste</div>`, 4, 'left:1120px;top:600px;width:410px')}`,
  n: `<p>Démonstration du mécanisme interne, à faire aussi dans le vrai Excel avec l'<b>Évaluation de formule</b> (Formules › Audit de formules › Évaluer la formule).</p><p><b>Étape 1</b> : la formule est tapée en D2 ; la table (violet) est encadrée.</p><p><b>Étape 2</b> : la valeur <b>C003</b> parcourt la première colonne de haut en bas. RECHERCHEV s'arrête à la <b>première</b> occurrence trouvée : si un code est en double dans le référentiel, seule la première ligne compte.</p><p><b>Étape 3</b> : sur la ligne trouvée (C003), Excel se décale vers la droite jusqu'à la colonne n° 2 de la table → J4.</p><p><b>Étape 4</b> : résultat <b>Nantes</b>. On recopie D2 jusqu'en D11 (double-clic sur la poignée) : Nantes, Lyon, Marseille, Lille, Bordeaux, Lyon, Strasbourg, #N/A, Marseille, Nantes.</p>` },

/* 7 — N° DE COLONNE */
{ title: 'Le n° de colonne', html: `${H('Le n° de colonne se compte dans la table', 'Pas dans la feuille !')}
${GX05(Object.assign({ hl: [{ r: 'B4', s: 1, c: '#2563EB' }, { r: 'C4', s: 2, c: '#7C3AED' }, { r: 'D4', s: 3, c: '#FA582D' }, { r: 'A4', d: .6, c: '#94A3B8' }] }, G7X05), RX05)}
${[0, 1, 2, 3].map(c => { const q = CX05(G7X05, String.fromCharCode(65 + c) + '1'); return `<span class="num-badge or a pop" style="--d:${.5 + c * .12}s;position:absolute;left:${q.x - 23}px;top:${q.y - 100}px">${c + 1}</span>`; }).join('')}
<div class="col" style="position:absolute;left:760px;right:70px;top:220px;gap:18px">
 ${[['#2563EB', '=RECHERCHEV(B2;$I$2:$L$7;<b>2</b>;FAUX)', 'Nantes'], ['#7C3AED', '=RECHERCHEV(B2;$I$2:$L$7;<b>3</b>;FAUX)', 'Sophie'], ['#FA582D', '=RECHERCHEV(B2;$I$2:$L$7;<b>4</b>;FAUX)', '8 %']].map(([c, f, r], i) => `
 <div class="card f right" data-s="${i + 1}" style="border-left:6px solid ${c};padding:16px 20px;display:flex;align-items:center;gap:16px"><span class="mono" style="font-size:19px;flex:1">${f}</span><b style="font-size:28px;color:${c}">${r}</b></div>`).join('')}
</div>
${TIP('Insérer une colonne dans la table <b>décale</b> les n° : la formule renvoie alors une autre information.', { s: 4, kind: 'warn', x: 760, y: 580, w: 770 })}`,
  n: `<p>Les numéros orange au-dessus des colonnes rappellent la règle : <b>I = 1, J = 2, K = 3, L = 4</b>. C'est la colonne relative dans la table, quelle que soit sa position dans la feuille.</p><p><b>Étapes 1 à 3</b> : avec le même code C003, changer uniquement le 3<sup>e</sup> argument rapporte la ville (2), le commercial (3) ou la remise (4).</p><p><b>Étape 4</b> : la limite structurelle de RECHERCHEV. Le n° de colonne est <b>figé en dur</b> : si quelqu'un insère une colonne « Région » entre Ville et Commercial, la formule « ;3; » renverra la région au lieu du commercial, sans erreur. C'est l'un des arguments pour RECHERCHEX et INDEX/EQUIV (section 2).</p><p>Astuce de pro : <code>EQUIV("Commercial";$I$1:$L$1;0)</code> à la place du 3 rend la colonne dynamique.</p>` },

/* 8 — VRAI : RECHERCHE APPROCHÉE */
{ title: 'Correspondance approchée', html: `${H('VRAI : la recherche approchée (barèmes)', 'Remise par palier')}
${GX05(Object.assign({ hl: [{ r: 'A2:A5', s: 1, c: '#7C3AED', t: 'trié ↑ obligatoire' }, { r: 'A4:B4', s: 3, c: '#16A34A' }] }, G8X05), ['N', 'O'])}
${SCANX05(G8X05, [{ p: ['A2', 'A5'], lab: '3 200 ?', t: 2.2 }, { p: ['A5', 'A4'], lab: '5 000 > 3 200 : on remonte', t: 1.3, c: '#DC2626' }, { p: ['A4', 'B4'], lab: '5 %', t: 1.1, c: '#16A34A' }], 2)}
<div class="col" style="position:absolute;left:690px;right:70px;top:220px;gap:16px">
 ${CARD('<b>VRAI</b> = « la plus grande valeur <b>≤</b> à la valeur cherchée »', 1)}
 ${CARD('3 200 € tombe dans la tranche <b>2 500 – 4 999</b> → remise <b>5 %</b>', 3)}
</div>
${VS({ y: 470, s1: 4, s2: 5, l: { t: 'FAUX · exacte', c: '#16A34A', ic: '✔', items: ['Codes, références, matricules', 'Absent → <b>#N/A</b> (visible)'] }, r: { t: 'VRAI · approchée', c: '#F59E0B', ic: '≈', items: ['Barèmes triés : remises, tranches, notes', 'Sur des codes : résultat <b>faux</b> sans erreur'] } }).replace('left:70px;right:70px', 'left:690px;right:70px')}`,
  n: `<p>La correspondance approchée n'est pas un défaut : c'est l'outil idéal pour les <b>barèmes</b> (remises par palier, tranches d'imposition, grilles de notes, frais de port).</p><p><b>Étape 1</b> : la table de seuils doit être <b>triée par ordre croissant</b>. VRAI cherche la plus grande valeur inférieure ou égale.</p><p><b>Étape 2</b> : 3 200 parcourt la colonne : 0 ≤ 3 200, 1 000 ≤ 3 200, 2 500 ≤ 3 200, 5 000 &gt; 3 200 → on s'arrête et on garde le palier précédent.</p><p><b>Étape 3</b> : résultat 5 %.</p><p><b>Étapes 4-5</b> : la règle à retenir. FAUX pour tout ce qui est un <b>identifiant</b> ; VRAI uniquement pour un <b>barème trié</b>. Une recherche approchée sur des codes clients non triés renvoie un client voisin : c'est l'erreur la plus dangereuse car elle ne se voit pas.</p>` },

/* 9 — #N/A ET SIERREUR */
{ title: '#N/A et SIERREUR', html: `${H('Client absent : #N/A puis SIERREUR', 'Gérer l\'introuvable')}
${GX05(Object.assign({ val: [{ r: 'D2', v: 'Nantes', s: 1 }, { r: 'D3', v: 'Lyon', s: 1 }, { r: 'D4', v: 'Marseille', s: 1 }, { r: 'D5', v: 'Lille', s: 1 }, { r: 'D6', v: 'Bordeaux', s: 1 }, { r: 'D7', v: 'Lyon', s: 1 }, { r: 'D8', v: 'Strasbourg', s: 1 }, { r: 'D9', v: '#N/A', s: 1, c: '#DC2626' }, { r: 'D10', v: 'Marseille', s: 1 }, { r: 'D11', v: 'Nantes', s: 1 }], hl: [{ r: 'B9', s: 2, c: '#DC2626', t: 'C099 absent du référentiel' }] }, G9X05))}
${CELLX05(G9X05, 'D9', 'Client inconnu', 4, 'background:#FFF7ED;color:#C2410C')}
<div class="col" style="position:absolute;left:720px;right:70px;top:200px;gap:16px">
 ${CARD('<b>#N/A</b> = « Non disponible » : la valeur cherchée n\'existe pas dans la table', 2)}
 ${CARD('<span class="mono" style="font-size:20px">=SIERREUR(<span style="color:#2563EB">formule</span>;<span style="color:#C2410C">"Client inconnu"</span>)</span>', 3)}
 ${CARD('Résultat lisible, et les totaux ne sont plus bloqués par l\'erreur', 4)}
</div>
${TIP('Ne masquez pas tout : un #N/A est souvent une <b>vraie anomalie</b> à corriger (client à créer, code mal saisi).', { s: 5, kind: 'warn', x: 720, y: 620, w: 810 })}`,
  n: `<p><b>Étape 1</b> : la formule recopiée sur les 10 commandes. CMD-1008 affiche <b>#N/A</b>.</p><p><b>Étape 2</b> : la cause : le client <b>C099</b> n'existe pas dans le référentiel. #N/A veut dire « Not Available », non disponible.</p><p><b>Étape 3</b> : on encapsule la recherche dans <b>SIERREUR</b>(valeur ; valeur_si_erreur). La formule complète : <code>=SIERREUR(RECHERCHEV(B9;$I$2:$L$7;2;FAUX);"Client inconnu")</code>.</p><p><b>Étape 4</b> : le texte remplace l'erreur. C'est la tâche 2 du Lab 1.</p><p><b>Étape 5</b> : nuance professionnelle. SIERREUR masque <i>toutes</i> les erreurs, y compris une faute de frappe dans la formule. Variante plus ciblée : <code>SI.NON.DISP</code> qui ne traite que #N/A. Et avec RECHERCHEX, l'argument « si non trouvé » est intégré (section 2).</p>` },

/* 10 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX05, 1), n: `<p>Deuxième partie : les deux alternatives modernes et robustes. <b>RECHERCHEX</b> (Microsoft 365 et Excel 2021) et le duo <b>INDEX/EQUIV</b>, compatible avec toutes les versions.</p>` },

/* 11 — RECHERCHEX */
{ title: 'RECHERCHEX', html: `${H('RECHERCHEX : deux plages, c\'est tout', 'Microsoft 365 · Excel 2021')}
${GX05(Object.assign({ hl: [{ r: 'A2:A7', s: 1, c: '#2563EB', t: 'plage de recherche' }, { r: 'C2:C7', s: 2, c: '#16A34A', t: 'plage de renvoi' }] }, G12X05), RX05)}
${SCANX05(G12X05, [{ p: ['A2', 'A4'], lab: 'C003 ?', t: 2 }, { p: ['A4', 'C4'], lab: 'Sophie', t: 1.6, c: '#16A34A' }], 3)}
<div class="a pop mono" style="--d:.3s;position:absolute;left:720px;right:70px;top:210px;font-size:25px;font-weight:800;line-height:1.5">=RECHERCHEX(<span style="color:#FA582D">B2</span>;<span style="color:#2563EB">$I$2:$I$7</span>;<span style="color:#16A34A">$K$2:$K$7</span>)</div>
<div style="position:absolute;left:720px;right:70px;top:300px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
 ${[['🎯', 'Exacte par défaut', 'plus de FAUX oublié'], ['↔', 'Cherche à gauche', 'plages indépendantes'], ['🧱', 'Résiste aux insertions', 'pas de n° de colonne'], ['💬', 'Si non trouvé intégré', '4<sup>e</sup> argument']].map(([i, t, d], k) => `
 <div class="card f zoom" data-s="${k + 4}" style="padding:16px 18px"><div style="font-size:30px">${i}</div><div style="font-size:21px;font-weight:800">${t}</div><div style="font-size:18px;color:#6B7A90">${d}</div></div>`).join('')}
</div>
${BIGX05('<span style="font-size:18px;color:#6B7A90;font-weight:700">E2 = </span><b style="font-size:40px;color:#107C41">Sophie</b>', 3, 'left:70px;top:590px;width:300px')}`,
  n: `<p>RECHERCHEX simplifie tout : au lieu d'une table + un numéro de colonne, on donne <b>deux plages de même taille</b>.</p><p><b>Étape 1</b> : la plage de recherche (bleu) : la colonne des codes $I$2:$I$7.</p><p><b>Étape 2</b> : la plage de renvoi (vert) : la colonne des commerciaux $K$2:$K$7.</p><p><b>Étape 3</b> : C003 est trouvé en 3<sup>e</sup> position → on prend la 3<sup>e</sup> valeur de la plage de renvoi : <b>Sophie</b>. Recopiée jusqu'en E11 : Sophie, Sophie, Karim, Karim, Julie, Sophie, Julie, #N/A, Karim, Sophie.</p><p><b>Étapes 4 à 7</b> : les quatre avantages. Elle est exacte par défaut ; elle cherche dans n'importe quel sens ; insérer une colonne ne la casse pas ; le 4<sup>e</sup> argument remplace SIERREUR. Bonus : elle peut renvoyer plusieurs colonnes d'un coup (<code>$J$2:$L$7</code>) et chercher depuis la fin (dernière occurrence, 6<sup>e</sup> argument = -1).</p>` },

/* 12 — CHERCHER À GAUCHE / SI NON TROUVÉ */
{ title: 'À gauche et si non trouvé', html: `${H('Chercher à gauche, prévoir l\'absent', 'RECHERCHEX · deux super-pouvoirs')}
${GX05(Object.assign({ hl: [{ r: 'B2:B7', s: 1, c: '#2563EB', t: 'recherche : Ville' }, { r: 'A2:A7', s: 1, c: '#16A34A' }] }, G13X05), RX05)}
${SCANX05(G13X05, [{ p: ['B2', 'B3'], lab: 'Lille ?', t: 1.4 }, { p: ['B3', 'A3'], lab: '← C002', t: 1.4, c: '#16A34A' }], 2, 2)}
${SCANX05(G13X05, [{ p: ['A2', 'A7'], lab: 'C099 ?', t: 2.6, c: '#DC2626', block: true }], 4, 9)}
<div class="col" style="position:absolute;left:720px;right:70px;top:210px;gap:16px">
 ${CARD('<b>1 · Vers la gauche</b> : on cherche la ville, on renvoie le code → <b class="mono" style="color:#107C41">C002</b>', 2)}
 ${CARD('RECHERCHEV en est <b>incapable</b> : la clé doit être à gauche', 3)}
 ${CARD('<b>2 · Si non trouvé</b> :<br><span class="mono" style="font-size:19px">=RECHERCHEX(B9;$I$2:$I$7;$J$2:$J$7;<b style="color:#C2410C">"Inconnu"</b>)</span>', 4)}
</div>
${BIGX05('<b style="font-size:34px;color:#C2410C">Inconnu</b><div style="font-size:18px;color:#6B7A90">sans SIERREUR</div>', 5, 'left:720px;top:600px;width:300px')}
${TIP('<b>Excel 2016/2019</b> : RECHERCHEX affiche <b>#NOM?</b>', { s: 5, kind: 'warn', x: 1050, y: 610, w: 480 })}`,
  n: `<p><b>Étape 1</b> : on veut retrouver le <b>code</b> à partir de la <b>ville</b>. La colonne de recherche (Ville, J) est à droite de la colonne de renvoi (Code, I).</p><p><b>Étape 2</b> : « Lille » est trouvée en 2<sup>e</sup> position → renvoi C002. La valeur part vers la <b>gauche</b>.</p><p><b>Étape 3</b> : avec RECHERCHEV, impossible : il faudrait déplacer les colonnes ou ajouter une colonne intermédiaire.</p><p><b>Étape 4</b> : le code C099 parcourt toute la colonne sans être trouvé (croix rouge) : normalement #N/A…</p><p><b>Étape 5</b> : … mais le 4<sup>e</sup> argument affiche « Inconnu ». Attention à la compatibilité : un partenaire sous Excel 2016 ou 2019 verra <b>#NOM?</b>. Dans ce cas, préférez INDEX/EQUIV.</p>` },

/* 13 — EQUIV */
{ title: 'EQUIV : la position', html: `${H('EQUIV : « à quelle position ? »', 'Le duo INDEX/EQUIV · 1/2')}
${GX05(Object.assign({ hl: [{ r: 'A2:A7', s: 1, c: '#2563EB', t: 'liste $I$2:$I$7' }, { r: 'A4', s: 3, c: '#16A34A' }] }, G14X05), RX05)}
${SCANX05(G14X05, [{ p: ['A2', 'A4'], lab: 'C003 ?', t: 2.2 }], 2)}
${[1, 2, 3, 4, 5, 6].map(i => { const q = CX05(G14X05, 'A' + (i + 1)); return `<span class="num-badge ${i === 3 ? 'or' : ''} f zoom" data-s="2" style="position:absolute;left:${q.x - 125}px;top:${q.y - 21}px;width:42px;height:42px;font-size:19px">${i}</span>`; }).join('')}
<div class="col" style="position:absolute;left:640px;right:70px;top:220px;gap:18px">
 ${CARD('<span class="mono" style="font-size:24px">=EQUIV(<span style="color:#FA582D">B2</span>;<span style="color:#2563EB">$I$2:$I$7</span>;<b>0</b>)</span>', 1)}
 ${CARD('Elle ne renvoie <b>pas</b> la valeur, mais son <b>rang</b> dans la liste', 2)}
 ${CARD('<b>0</b> = correspondance exacte (comme FAUX)', 2)}
</div>
${BIGX05('<span style="font-size:18px;color:#6B7A90;font-weight:700">EQUIV("C003";…;0) =</span><div style="font-size:72px;font-weight:900;color:#FA582D;line-height:1">3</div>', 3, 'left:640px;top:560px;width:380px')}`,
  n: `<p>INDEX/EQUIV se comprend en deux temps. D'abord <b>EQUIV</b> : elle répond à la question « à quelle position se trouve cette valeur dans cette liste ? ».</p><p><b>Étape 1</b> : la syntaxe <code>=EQUIV(valeur ; liste ; 0)</code>. Le 0 final impose la correspondance exacte ; c'est l'équivalent du FAUX de RECHERCHEV, et il ne faut pas l'oublier (par défaut : 1 = approchée).</p><p><b>Étape 2</b> : la valeur descend la liste : rang 1, 2, 3…</p><p><b>Étape 3</b> : C003 est au rang <b>3</b>. C'est la question 4 du quiz : EQUIV renvoie 3, pas « C003 » ni « Nantes ».</p><p>Utilisation seule : savoir si un élément existe (ESTNUM(EQUIV(…))), trouver la position d'un mois, d'un en-tête de colonne.</p>` },

/* 14 — INDEX + EQUIV */
{ title: 'INDEX + EQUIV', html: `${H('INDEX : « quelle valeur à cette position ? »', 'Le duo INDEX/EQUIV · 2/2')}
${GX05(Object.assign({ hl: [{ r: 'A4', s: 1, c: '#2563EB', t: 'rang 3' }, { r: 'D2:D7', s: 2, c: '#7C3AED' }, { r: 'D4', s: 3, c: '#16A34A', t: '3e valeur' }] }, G15X05), RX05)}
${FLOW({ x: 700, y: 200, w: 830, h: 380,
  svg: `<g class="f" data-s="1"><rect x="0" y="40" width="300" height="100" rx="18" fill="#EFF6FF" stroke="#2563EB" stroke-width="3"/><text x="150" y="86" text-anchor="middle" font-size="19" font-weight="800" fill="#2563EB" style="font-family:var(--mono)">EQUIV(B2;$I$2:$I$7;0)</text><text x="150" y="120" text-anchor="middle" font-size="18" fill="#33445E">→ position</text></g>
  <g class="f zoom" data-s="1"><circle cx="415" cy="90" r="46" fill="#FA582D"/><text x="415" y="106" text-anchor="middle" font-size="46" font-weight="900" fill="#fff">3</text></g>
  <g class="f" data-s="2"><path d="M300 90 H 365 M465 90 H 530" stroke="#94A3B8" stroke-width="5" class="draw" pathLength="1"/><rect x="530" y="40" width="300" height="100" rx="18" fill="#F5F3FF" stroke="#7C3AED" stroke-width="3"/><text x="680" y="86" text-anchor="middle" font-size="19" font-weight="800" fill="#7C3AED" style="font-family:var(--mono)">INDEX($L$2:$L$7;3)</text><text x="680" y="120" text-anchor="middle" font-size="18" fill="#33445E">→ valeur</text></g>
  <g class="f zoom" data-s="3"><path d="M680 140 V 220" stroke="#16A34A" stroke-width="5" class="draw" pathLength="1"/><rect x="560" y="220" width="240" height="110" rx="20" fill="#ECFDF3" stroke="#16A34A" stroke-width="3"/><text x="680" y="295" text-anchor="middle" font-size="54" font-weight="900" fill="#107C41">8 %</text></g>` })}
<div class="card f" data-s="4" style="position:absolute;left:70px;right:70px;top:640px;padding:20px 26px;text-align:center"><span class="mono" style="font-size:30px;font-weight:800">=<span style="color:#7C3AED">INDEX($L$2:$L$7;</span><span style="color:#2563EB">EQUIV(B2;$I$2:$I$7;0)</span><span style="color:#7C3AED">)</span></span></div>`,
  n: `<p>On assemble les deux pièces.</p><p><b>Étape 1</b> : EQUIV trouve la <b>position</b> de C003 : 3.</p><p><b>Étape 2</b> : INDEX(plage ; n) renvoie la n-ième valeur d'une plage. On lui donne la colonne des remises $L$2:$L$7.</p><p><b>Étape 3</b> : la 3<sup>e</sup> remise = <b>8 %</b>.</p><p><b>Étape 4</b> : la formule complète, celle de la tâche 4 du Lab 1 : <code>=INDEX($L$2:$L$7;EQUIV(B2;$I$2:$I$7;0))</code>. Résultats recopiés : 8 %, 5 %, 10 %, 3 %, 0 %, 5 %, 4 %…</p><p>Lisez-la à voix haute : « donne-moi la remise à la position où se trouve mon code ». Comme RECHERCHEX : deux plages indépendantes, recherche à gauche possible, résiste aux insertions — et fonctionne dans <b>toutes</b> les versions d'Excel.</p>` },

/* 15 — COMPARATIF */
{ title: 'Comparatif', html: `${H('Quelle fonction choisir ?', 'Comparatif')}
<div style="position:absolute;left:70px;top:180px;width:1010px"><table class="tbl"><thead><tr><th></th><th>RECHERCHEV</th><th>RECHERCHEX</th><th>INDEX/EQUIV</th></tr></thead><tbody>
 ${[['Recherche à gauche', '✘', '✔', '✔'], ['Exacte par défaut', '✘', '✔', 'avec 0'], ['Résiste aux insertions', '✘', '✔', '✔'], ['« Si non trouvé » intégré', '✘', '✔', '✘'], ['Excel 2016 / 2019', '✔', '✘ #NOM?', '✔']].map((r, i) => `<tr class="f" data-s="${i + 1}">${r.map((c, j) => `<td style="${j ? 'text-align:center;font-weight:700;color:' + (c.startsWith('✔') ? '#16A34A' : c.startsWith('✘') ? '#DC2626' : '#B45309') : ''}">${c}</td>`).join('')}</tr>`).join('')}
</tbody></table></div>
<div class="col" style="position:absolute;left:1120px;right:70px;top:180px;gap:18px">
 <div class="card f zoom" data-s="6" style="border-top:6px solid #16A34A"><div style="font-size:19px;color:#6B7A90;font-weight:700">Microsoft 365 partout</div><div style="font-size:30px;font-weight:900;color:#16A34A">RECHERCHEX</div></div>
 <div class="card f zoom" data-s="7" style="border-top:6px solid #7C3AED"><div style="font-size:19px;color:#6B7A90;font-weight:700">Fichier partagé, versions anciennes</div><div style="font-size:30px;font-weight:900;color:#7C3AED">INDEX/EQUIV</div></div>
 <div class="card f zoom" data-s="8" style="border-top:6px solid #94A3B8"><div style="font-size:19px;color:#6B7A90;font-weight:700">Classeurs existants</div><div style="font-size:30px;font-weight:900;color:#475569">Savoir lire RECHERCHEV</div></div>
</div>`,
  n: `<p>Le tableau récapitulatif, ligne par ligne (étapes 1 à 5). Insistez sur la dernière : la <b>compatibilité</b>. RECHERCHEX n'existe qu'à partir d'Excel 2021 / Microsoft 365.</p><p><b>Étapes 6 à 8</b> — la règle de décision :</p><ul><li>Toute l'organisation est sur Microsoft 365 → <b>RECHERCHEX</b>, la plus simple et la plus sûre.</li><li>Le fichier circule chez des partenaires ou clients équipés d'anciennes versions → <b>INDEX/EQUIV</b>.</li><li>RECHERCHEV reste dans des milliers de classeurs : il faut savoir la lire et la corriger (4<sup>e</sup> argument !).</li></ul><p>Question au groupe : « Quelle version d'Excel ont vos destinataires ? »</p>` },

/* 16 — CARNET ENRICHI */
{ title: 'Le carnet enrichi', html: `${H('Le carnet de commandes enrichi', 'Lab 1 · le résultat attendu')}
${GRID(Object.assign({ val: ENRX05.flatMap((r, i) => r.map((v, j) => ({ r: String.fromCharCode(68 + j) + (i + 2), v, s: j + 1, c: v === '#N/A' ? '#DC2626' : v === 'Client inconnu' ? '#C2410C' : '' }))) }, G17X05))}
<div class="col" style="position:absolute;left:862px;right:70px;top:175px;gap:12px">
 ${CARD('<b style="color:#2563EB">D</b> · <span class="mono" style="font-size:17px">=SIERREUR(RECHERCHEV(B2;$I$2:$L$7;2;FAUX);"Client inconnu")</span>', 1)}
 ${CARD('<b style="color:#2563EB">E</b> · <span class="mono" style="font-size:17px">=RECHERCHEX(B2;$I$2:$I$7;$K$2:$K$7)</span>', 2)}
 ${CARD('<b style="color:#2563EB">F</b> · <span class="mono" style="font-size:17px">=INDEX($L$2:$L$7;EQUIV(B2;$I$2:$I$7;0))</span>', 3)}
 ${CARD('<b style="color:#2563EB">G</b> · <span class="mono" style="font-size:17px">=C2*(1-F2)</span> → 1 150 · 2 079 · 1 393,80', 4)}
</div>
${TIP(`${KEYS('F4')}&nbsp; fige la table : <b>$I$2:$L$7</b> → I$2:L$7 → $I2:$L7 → I2:L7`, { s: 5, kind: 'key', x: 862, y: 600, w: 668 })}`,
  n: `<p>Le résultat complet du Lab 1, colonne par colonne.</p><p><b>Étape 1 — Ville</b> avec RECHERCHEV + SIERREUR : CMD-1008 affiche « Client inconnu ».</p><p><b>Étape 2 — Commercial</b> avec RECHERCHEX. Ici on n'a pas mis de 4<sup>e</sup> argument : #N/A pour C099, c'est voulu pour montrer la différence.</p><p><b>Étape 3 — Remise</b> avec INDEX/EQUIV.</p><p><b>Étape 4 — Net HT</b> = Montant × (1 − remise) : 1 250 × 0,92 = <b>1 150</b> ; 2 310 × 0,90 = <b>2 079</b> ; 1 515 × 0,92 = <b>1 393,80</b>. La ligne 8 reste en erreur tant que le client n'est pas créé : c'est normal et même souhaitable.</p><p><b>Étape 5</b> : rappel F4. Appuyer plusieurs fois fait tourner les 4 modes de référence. Pour une table de recherche : toujours $I$2:$L$7. Oublier le $ est l'erreur n°2 : la table « glisse » vers le bas à la recopie et les derniers codes ne sont plus trouvés.</p>` },

/* 17 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX05, 2), n: `<p>Troisième partie : le texte et les dates. Les données importées (exports RH, logiciels de caisse, CRM) sont rarement propres : espaces parasites, majuscules, dates en texte. Les nettoyer est la condition pour que les recherches fonctionnent.</p>` },

/* 18 — NETTOYER (FLOW) */
{ title: 'Nettoyer le texte', html: `${H('Nettoyer : SUPPRESPACE et NOMPROPRE', 'Données importées')}
${FLOW({ x: 70, y: 180, w: 1460, h: 330,
  n: { a: { x: 170, y: 140, plate: false, html: `<rect x="40" y="100" width="260" height="80" rx="16" fill="#fff" stroke="#DC2626" stroke-width="3"/><text x="170" y="152" text-anchor="middle" font-size="30" font-weight="800" fill="#0E1726" style="font-family:var(--mono);white-space:pre">␣␣LEROY␣</text>`, l: 'Export brut' },
    b: { x: 730, y: 140, plate: false, s: 1, html: `<rect x="600" y="100" width="260" height="80" rx="16" fill="#fff" stroke="#F59E0B" stroke-width="3"/><text x="730" y="152" text-anchor="middle" font-size="30" font-weight="800" fill="#0E1726" style="font-family:var(--mono)">LEROY</text>`, l: 'SUPPRESPACE' },
    c: { x: 1290, y: 140, plate: false, s: 2, html: `<rect x="1160" y="100" width="260" height="80" rx="16" fill="#ECFDF3" stroke="#16A34A" stroke-width="3"/><text x="1290" y="152" text-anchor="middle" font-size="30" font-weight="800" fill="#107C41" style="font-family:var(--mono)">Leroy</text>`, l: 'NOMPROPRE' } },
  l: [{ a: 'a', b: 'b', s: 1, c: '#F59E0B' }, { a: 'b', b: 'c', s: 2, c: '#16A34A' }],
  p: [{ s: 3, keep: true, seg: [{ d: 'M310 140 L590 140', lab: 'espaces retirés', t: 1.6 }, { d: 'M870 140 L1150 140', lab: 'casse corrigée', t: 1.6 }] }] })}
<div class="card f" data-s="3" style="position:absolute;left:70px;right:70px;top:540px;text-align:center;padding:20px"><span class="mono" style="font-size:34px;font-weight:800">=NOMPROPRE(SUPPRESPACE(A2))</span></div>
<div style="position:absolute;left:70px;right:70px;top:660px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 ${[['MAJUSCULE("Leroy")', 'LEROY'], ['MINUSCULE("LEROY")', 'leroy'], ['"Lyon␣" = "Lyon"', 'FAUX !']].map(([f, r], i) => `<div class="card f zoom" data-s="${i + 4}" style="padding:14px 18px;display:flex;justify-content:space-between;align-items:center"><span class="mono" style="font-size:19px">${f}</span><b style="font-size:22px;color:${i === 2 ? '#DC2626' : '#107C41'}">${r}</b></div>`).join('')}
</div>`,
  n: `<p>Le nettoyage en chaîne. Le symbole ␣ représente un espace invisible.</p><p><b>Étape 1 — SUPPRESPACE</b> retire les espaces en début et en fin de texte, et réduit les espaces multiples entre les mots à un seul.</p><p><b>Étape 2 — NOMPROPRE</b> met une majuscule à chaque mot (Leroy, Jean-Pierre → Jean-Pierre). Ses cousines : MAJUSCULE et MINUSCULE.</p><p><b>Étape 3</b> : on imbrique : la fonction intérieure s'exécute d'abord. C'est la tâche 1 du Lab 2 : <code>=NOMPROPRE(SUPPRESPACE(A2))</code>.</p><p><b>Étapes 4-6</b> : le piège qui cause la moitié des « bugs » de recherche : « Lyon » suivi d'un espace n'est pas égal à « Lyon ». RECHERCHEV renvoie #N/A alors que la valeur « semble » présente. Réflexe : SUPPRESPACE sur la valeur cherchée ou nettoyage de la source. Pour tester : <code>=NBCAR(A2)</code> révèle les caractères en trop.</p>` },

/* 19 — EXTRAIRE (caractères) */
{ title: 'Extraire du texte', html: `${H('Extraire : GAUCHE, STXT, DROITE, NBCAR', 'Découper un code')}
<div style="position:absolute;left:220px;top:200px;display:flex;gap:12px">
 ${'FR-75-0042'.split('').map((ch, i) => `<div class="a pop" style="--d:${.2 + i * .06}s;width:104px;text-align:center"><div style="height:104px;border-radius:16px;background:#fff;box-shadow:var(--sh);display:grid;place-items:center;font:900 54px var(--mono);color:#0E1726">${ch}</div><div style="font:700 18px var(--mono);color:#6B7A90;margin-top:6px">${i + 1}</div></div>`).join('')}
</div>
${[[0, 2, '#2563EB', 1], [3, 2, '#FA582D', 2], [6, 4, '#16A34A', 3]].map(([a, n, c, s]) => `<div class="f zoom" data-s="${s}" style="position:absolute;left:${214 + a * 116}px;top:194px;width:${n * 116 - 4}px;height:116px;border:5px solid ${c};border-radius:20px;background:${c}14"></div>`).join('')}
<div style="position:absolute;left:70px;right:70px;top:400px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
 ${[['#2563EB', '=GAUCHE(A2;2)', 'FR', '2 premiers caractères'], ['#FA582D', '=STXT(A2;4;2)', '75', '2 car. à partir du 4<sup>e</sup>'], ['#16A34A', '=DROITE(A2;4)', '0042', '4 derniers caractères'], ['#7C3AED', '=NBCAR(A2)', '10', 'longueur totale']].map(([c, f, r, d], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="border-top:6px solid ${c};text-align:center;padding:20px"><div class="mono" style="font-size:22px;font-weight:800">${f}</div><div style="font-size:52px;font-weight:900;color:${c};margin:8px 0">${r}</div><div style="font-size:18px;color:#6B7A90">${d}</div></div>`).join('')}
</div>
${TIP('Le résultat est du <b>texte</b> : « 75 » s\'aligne à gauche. Pour calculer : <span class="mono">=CNUM(STXT(A2;4;2))</span>', { s: 5, x: 70, y: 690, w: 1000 })}`,
  n: `<p>Le code <b>FR-75-0042</b> est en A2 : pays, département, numéro. Les petits chiffres sous les cases sont les positions des caractères.</p><p><b>Étape 1 — GAUCHE(texte ; n)</b> : les n premiers caractères → FR.</p><p><b>Étape 2 — STXT(texte ; départ ; n)</b> : n caractères à partir de la position de départ → 75. (STXT = « sous-texte », MID en anglais.)</p><p><b>Étape 3 — DROITE(texte ; n)</b> : les n derniers → 0042.</p><p><b>Étape 4 — NBCAR</b> : le nombre de caractères → 10, espaces compris (d'où son utilité pour détecter les espaces parasites).</p><p><b>Étape 5</b> : les fonctions de texte renvoient du texte, même s'il ressemble à un nombre. Pour calculer avec, CNUM ou multiplier par 1. Pour les longueurs variables, combinez avec <b>CHERCHE</b>/<b>TROUVE</b> (position du tiret) — ou, sous Microsoft 365, <b>TEXTE.AVANT</b> / <b>TEXTE.APRES</b>.</p>` },

/* 20 — ASSEMBLER */
{ title: 'Assembler avec &', html: `${H('Assembler : identifiants et e-mails', 'Lab 2 · Lumen Conseil')}
${GX05(Object.assign({ val: ACCX05.flatMap(([n, id], i) => [{ r: 'C' + (i + 2), v: n, s: 1 }, { r: 'D' + (i + 2), v: id, s: 2 }, { r: 'E' + (i + 2), v: id + '@lumen-conseil.fr', s: 3 }]) }, G21X05), ['A', 'B', 'D', 'E', 'F'])}
<div class="col" style="position:absolute;left:1030px;right:70px;top:190px;gap:14px">
 ${CARD('<b>Nom</b><br><span class="mono" style="font-size:18px">=NOMPROPRE(SUPPRESPACE(A2))</span>', 1)}
 ${CARD('<b>Identifiant</b><br><span class="mono" style="font-size:18px">=MINUSCULE(GAUCHE(B2;1)<b style="color:#FA582D">&amp;</b>SUPPRESPACE(A2))</span>', 2)}
 ${CARD('<b>E-mail</b><br><span class="mono" style="font-size:18px">=E2<b style="color:#FA582D">&amp;</b>"@lumen-conseil.fr"</span>', 3)}
</div>
${TIP('<b>&amp;</b> colle des morceaux · <span class="mono">=B2&amp;" "&amp;D2</span> → Camille Leroy · aussi : <b>CONCAT</b>, <b>JOINDRE.TEXTE</b>', { s: 4, x: 70, y: 660, w: 920 })}`,
  n: `<p>Le Lab 2 en trois colonnes. L'opérateur <b>&amp;</b> (« et commercial ») colle des textes bout à bout.</p><p><b>Étape 1 — Nom</b> : NOMPROPRE(SUPPRESPACE(A2)) → Leroy, Martin, Garnier… (les cases rouges dans la colonne A matérialisent les espaces parasites de l'export).</p><p><b>Étape 2 — Identifiant</b> : initiale du prénom (GAUCHE(B2;1) → C) collée au nom nettoyé (LEROY), le tout en minuscules → <b>cleroy</b>. Attention : on applique SUPPRESPACE sur A2, sinon l'identifiant contiendrait des espaces.</p><p><b>Étape 3 — E-mail</b> : on colle le texte fixe entre guillemets : <code>=E2&amp;"@lumen-conseil.fr"</code> → cleroy@lumen-conseil.fr ; ligne 7 : tbonnet@lumen-conseil.fr.</p><p><b>Étape 4</b> : pour insérer un espace, on le met entre guillemets : " ". CONCAT et JOINDRE.TEXTE (avec séparateur) font la même chose sur des plages. Question : que faire des accents (Inès → ines) ? Réponse : SUBSTITUE, ou mieux Power Query (module X08).</p>` },

/* 21 — REMPLISSAGE INSTANTANÉ */
{ title: 'Remplissage instantané', html: `${H('Remplissage instantané : Ctrl+E', 'Excel devine le motif', PATH('Données > Outils de données > Remplissage instantané'))}
${GRID(Object.assign({ val: [['Inès', 'GARNIER'], ['Lucas', 'FOURNIER'], ['Chloé', 'MERCIER'], ['Théo', 'BONNET'], ['Emma', 'LAMBERT']].flatMap(([p, n], i) => [{ r: 'B' + (i + 4), v: p, s: 2 }, { r: 'C' + (i + 4), v: n, s: 3 }]), hl: [{ r: 'B2:B3', s: 1, c: '#FA582D', t: '2 exemples tapés' }] }, G22X05))}
<div class="col" style="position:absolute;left:770px;right:70px;top:220px;gap:18px">
 ${CARD('<b>1 ·</b> Tapez 1 ou 2 exemples du résultat voulu', 1)}
 ${CARD(`<b>2 ·</b> ${KEYS('Ctrl+E')} : Excel complète toute la colonne`, 2)}
 ${CARD('<b>3 ·</b> Fonctionne aussi pour majuscules, initiales, découpages…', 3)}
</div>
${TIP('Ce n\'est <b>pas une formule</b> : si la source change, le résultat ne se met pas à jour.', { s: 4, kind: 'warn', x: 770, y: 560, w: 760 })}`,
  n: `<p>Le <b>Remplissage instantané</b> (Flash Fill) est apparu avec Excel 2013 : il reconnaît un motif à partir d'exemples.</p><p><b>Étape 1</b> : à côté de « Camille Leroy », on tape « Camille » ; à côté de « Hugo Martin », « Hugo ».</p><p><b>Étape 2</b> : on se place sous les exemples et on appuie sur <kbd>Ctrl</kbd>+<kbd>E</kbd> (ou Données › Outils de données › Remplissage instantané). Excel propose tous les prénoms.</p><p><b>Étape 3</b> : même chose pour les noms en majuscules, des initiales, un numéro extrait d'un code…</p><p><b>Étape 4</b> : limite importante : le résultat est <b>figé</b> (des valeurs, pas des formules). Parfait pour un nettoyage ponctuel ; pour un fichier qui revient chaque mois, préférez les formules ou Power Query. Vérifiez toujours quelques lignes : Excel peut mal deviner sur les noms composés.</p>` },

/* 22 — UNE DATE EST UN NOMBRE */
{ title: 'Une date est un nombre', html: `${H('Une date est un nombre', 'Jours depuis le 1<sup>er</sup> janvier 1900')}
<svg viewBox="0 0 1460 170" style="position:absolute;left:70px;top:190px;width:1460px;height:170px;overflow:visible">
 <path d="M20 90 H1440" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round"/>
 <path d="M20 90 H1440" stroke="url(#gO)" stroke-width="6" stroke-linecap="round" class="draw" pathLength="1" style="--d:.3s"/>
 ${[[20, '1', '01/01/1900', 0], [1080, '43 539', '15/03/2019', 1], [1440, '46 387', '31/12/2026', 2]].map(([x, n, d, s]) => `<g ${s ? `class="f zoom" data-s="${s}"` : ''}><circle cx="${x}" cy="90" r="14" fill="#FA582D"/><text x="${x}" y="50" text-anchor="${x > 1300 ? 'end' : x < 50 ? 'start' : 'middle'}" font-size="30" font-weight="900" fill="#0E1726">${n}</text><text x="${x}" y="140" text-anchor="${x > 1300 ? 'end' : x < 50 ? 'start' : 'middle'}" font-size="22" font-weight="700" fill="#6B7A90">${d}</text></g>`).join('')}
</svg>
${GRID(Object.assign({ val: [['2019', 3], ['3', 3], ['15', 3], ['14/04/2019', 4], ['mars 2019', 5], ['vendredi', 5]].map(([v, s], i) => ({ r: 'B' + (i + 2), v, s })) }, G23X05))}
<div class="col" style="position:absolute;left:840px;right:70px;top:410px;gap:16px">
 ${CARD('On peut <b>additionner</b> (échéance), <b>soustraire</b> (jours écoulés), <b>comparer</b>', 4)}
 ${CARD('<b>TEXTE</b> affiche une date en toutes lettres : « mmmm aaaa », « jjjj »', 5)}
 ${CARD(`${KEYS('Ctrl+;')} insère la date du jour (valeur figée)`, 6)}
</div>`,
  n: `<p>Pour Excel, une date est un <b>numéro de série</b> : le nombre de jours écoulés depuis le 1<sup>er</sup> janvier 1900 (jour 1). L'affichage « 15/03/2019 » n'est qu'un format.</p><p><b>Étape 1</b> : le 15/03/2019 vaut <b>43 539</b>. Démo : tapez une date, puis appliquez le format Standard : le nombre apparaît.</p><p><b>Étape 2</b> : le 31/12/2026 vaut 46 387.</p><p><b>Étape 3</b> : ANNEE, MOIS, JOUR extraient les composantes : 2019, 3, 15.</p><p><b>Étape 4</b> : C2+30 = 43 569 = <b>14/04/2019</b> (échéance à 30 jours). AUJOURDHUI()−C2 donne le nombre de jours écoulés.</p><p><b>Étape 5</b> : TEXTE(C2;"mmmm aaaa") → « mars 2019 » ; "jjjj" → « vendredi ». Attention, le résultat est du texte : on ne peut plus calculer avec.</p><p><b>Étape 6</b> : <kbd>Ctrl</kbd>+<kbd>;</kbd> insère la date du jour en dur ; =AUJOURDHUI() se recalcule à chaque ouverture.</p>` },

/* 23 — ANCIENNETÉ ET PIÈGES */
{ title: 'Ancienneté et pièges', html: `${H('Ancienneté, comptage et pièges', 'Lab 2 · dates d\'entrée')}
${GRID(Object.assign({ val: DATX05.flatMap(([a, n], i) => [{ r: 'C' + (i + 2), v: a, s: 1 }, { r: 'D' + (i + 2), v: n + ' ans', s: 2 }]), hl: [{ r: 'C2', s: 3, c: '#16A34A' }, { r: 'C4', s: 3, c: '#16A34A' }, { r: 'C6', s: 3, c: '#16A34A' }, { r: 'C9', s: 3, c: '#16A34A' }] }, G24X05))}
<div class="col" style="position:absolute;left:640px;right:70px;top:190px;gap:14px">
 ${CARD('<b>Année</b> : <span class="mono">=ANNEE(B2)</span> → 2019, 2021, 2016…', 1)}
 ${CARD('<b>Ancienneté</b> au 31/12/2026 (date de référence en <b>H1</b>) : <span class="mono">=DATEDIF(B2;$H$1;"y")</span>', 2)}
 ${CARD('<b>Entrés avant 2020</b> : <span class="mono">=NB.SI(C2:C9;"&lt;2020")</span> → <b style="color:#16A34A;font-size:26px">4</b>', 3)}
</div>
${VS({ y: 560, s1: 4, s2: 5, l: { t: 'Date en texte', c: '#DC2626', ic: '✘', items: ['<span class="mono">2019.03.15</span> alignée à gauche', 'ANNEE → <b>#VALEUR!</b>'] }, r: { t: 'Vraie date', c: '#16A34A', ic: '✔', items: ['<span class="mono">15/03/2019</span> alignée à droite', 'Données › Convertir pour réparer'] } }).replace('left:70px;right:70px', 'left:640px;right:70px')}`,
  n: `<p>Suite du Lab 2 (dans le lab, les dates sont en colonne C et l'année en G ; ici la grille est simplifiée).</p><p><b>Étape 1</b> : ANNEE(date) → 2019, 2021, 2016, 2023, 2018, 2020, 2024, 2017.</p><p><b>Étape 2</b> : <b>DATEDIF</b>(début ; fin ; "y") donne les années révolues. Fonction « cachée » (absente de l'assistant) mais bien présente. La date de référence est dans une <b>cellule</b> ($H$1 = 31/12/2026) plutôt qu'AUJOURDHUI() : le rapport reste reproductible. Leroy : 7 ans, Garnier : 10 ans, Lambert : 2 ans.</p><p><b>Étape 3</b> : NB.SI sur la colonne des années : 2019, 2016, 2018, 2017 → <b>4</b> (tâche 5 du Lab 2).</p><p><b>Étapes 4-5</b> : le piège des dates importées en texte (2019.03.15, ou 15/03/2019 venant d'un CSV mal lu). Indice visuel : alignement à gauche. Réparation : Données › Convertir (colonne au format Date JMA), ou DATE(GAUCHE…;STXT…;DROITE…), ou Power Query.</p>` },

/* 24 — RÉCAP */
{ title: 'Récap', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: '5', hsub: 'réflexes recherche & texte', hk: 'MODULE 05',
  items: [{ ic: '🔎', t: 'RECHERCHEV(…;FAUX)', d: 'Clé à gauche, table en $, n° de colonne dans la table' }, { ic: '🎯', t: 'RECHERCHEX', d: 'Deux plages, exacte, à gauche, « si non trouvé »' }, { ic: '🧩', t: 'INDEX/EQUIV', d: 'Universel : EQUIV donne la position, INDEX la valeur' }, { ic: '🧹', t: 'SUPPRESPACE · NOMPROPRE · &', d: 'Nettoyer avant de croiser, assembler des identifiants' }, { ic: '📅', t: 'Date = nombre', d: 'ANNEE, TEXTE, DATEDIF ; date de référence en cellule' }] }),
  n: `<p>Les cinq réflexes du module, à faire répéter :</p><ol><li>RECHERCHEV toujours avec <b>FAUX</b>, table en absolu.</li><li>RECHERCHEX quand tout le monde est sous Microsoft 365.</li><li>INDEX/EQUIV pour la compatibilité et la robustesse.</li><li>Nettoyer le texte (SUPPRESPACE) <b>avant</b> de chercher : la moitié des #N/A viennent d'espaces.</li><li>Une date est un nombre : on calcule avec, et on fige la date de référence dans une cellule.</li></ol>` },

/* 25 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Clavier')}
${KEYCARDS([{ k: 'F4', d: 'Figer la table de recherche ($)' }, { k: 'Ctrl+E', d: 'Remplissage instantané' }, { k: 'Ctrl+;', d: 'Insérer la date du jour' }, { k: 'Ctrl+Maj+:', d: 'Insérer l\'heure actuelle' }, { k: 'Ctrl+[', d: 'Sélectionner les antécédents de la formule' }, { k: 'F5', d: 'Atteindre une cellule ou une plage nommée' }], { cols: 3, y: 200 })}
${TIP('Astuce : <b>Ctrl+[</b> sur une formule RECHERCHEV sélectionne directement la table de recherche.', { s: 7, kind: 'key', x: 70, y: 620, w: 900 })}`,
  n: `<p>Six raccourcis. Les plus utiles en pratique : <kbd>F4</kbd> pendant la saisie de la table (le curseur doit être sur la référence), et <kbd>Ctrl</kbd>+<kbd>E</kbd>.</p><p><kbd>Ctrl</kbd>+<kbd>[</kbd> sélectionne les cellules utilisées par la formule active : très pratique pour vérifier qu'une RECHERCHEV pointe bien vers toute la table. <kbd>F5</kbd> (Atteindre) permet de sauter à une plage nommée, par exemple « Clients ».</p>` },

/* 26 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'excel', mod: 'x05', lab: 0, title: 'Lab 1 — Enrichir le carnet de commandes', tasks: ['D2 : la ville avec <b>RECHERCHEV</b> ($I$2:$L$7, FAUX), recopie jusqu\'en D11', 'D9 : <b>SIERREUR</b> → « Client inconnu » pour C099', 'E2 : le commercial avec <b>RECHERCHEX</b>, recopie', 'F2 : la remise avec <b>INDEX</b> + <b>EQUIV</b>, recopie', 'G2 : le net <span class="mono">=C2*(1-F2)</span>, recopie jusqu\'en G11'] }),
  n: `<p>Lab 1 : Atelier Mobilier Pro. Résultats attendus : D2 Nantes, D7 Lyon, D8 Strasbourg ; E2 Sophie, E4 Karim, E6 Julie ; F2 8 %, F4 10 %, F8 4 % ; G2 = 1 150, G4 = 2 079, G11 = 1 393,80.</p><p>Erreurs fréquentes à surveiller pendant le lab : table non figée (les derniers codes renvoient #N/A), n° de colonne compté depuis A, oubli du 0 dans EQUIV.</p>` },

/* 27 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'excel', mod: 'x05', lab: 1, title: 'Lab 2 — Créer les comptes des collaborateurs', tasks: ['D2 : <b>NOMPROPRE</b>(<b>SUPPRESPACE</b>(A2)) → Leroy, recopie', 'E2 : l\'identifiant <span class="mono">cleroy</span> (MINUSCULE, GAUCHE, &amp;)', 'F2 : l\'e-mail <span class="mono">…@lumen-conseil.fr</span> avec <b>&amp;</b>', 'G2 : l\'année d\'entrée avec <b>ANNEE</b>', 'K2 : <b>NB.SI</b> des entrées avant 2020 → 4'] }),
  n: `<p>Lab 2 : Lumen Conseil. Résultats : D2 Leroy, D4 Garnier, D6 Mercier ; E2 cleroy, E4 igarnier, E9 nfaure ; F2 cleroy@lumen-conseil.fr, F7 tbonnet@lumen-conseil.fr ; G2 2019, G4 2016, G9 2017 ; K2 = 4.</p><p>Piège : sans SUPPRESPACE dans l'identifiant, « LEROY » précédé d'espaces donne « c  leroy ».</p>` },

/* 28 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Dans =RECHERCHEV(B2;$I$2:$L$7;3;FAUX), quelle colonne de la feuille est renvoyée ?', o: ['C', 'I', 'K', 'L'], a: [2], e: 'Le n° de colonne se compte à partir du début de la table : I = 1, J = 2, K = 3.' },
  { q: 'Que se passe-t-il si l\'on omet le 4e argument de RECHERCHEV sur une liste de codes non triée ?', o: ['Excel affiche #NOM?', 'La recherche est approchée et peut renvoyer un résultat faux sans erreur', 'Excel demande confirmation', 'La recherche est exacte par défaut'], a: [1], e: 'Par défaut, RECHERCHEV utilise la correspondance approchée (VRAI) : sur une liste non triée, le résultat est plausible mais faux.' },
  { q: 'Quels sont les avantages de RECHERCHEX sur RECHERCHEV ?', o: ['Elle fonctionne sous Excel 2010', 'Elle peut chercher une colonne à gauche de la clé', 'Elle est exacte par défaut', 'Elle trie la table automatiquement'], a: [1, 2], e: 'Deux plages indépendantes (recherche à gauche possible) et correspondance exacte par défaut. Elle n\'existe pas avant Excel 2021.' },
  { q: 'Que renvoie =EQUIV("C003";I2:I7;0) si I2:I7 contient C001…C006 ?', o: ['C003', '3', '4', 'Nantes'], a: [1], e: 'EQUIV renvoie la position dans la plage : C003 est la 3e valeur.' },
  { q: 'RECHERCHEV renvoie #N/A alors que « Lyon » semble bien présent dans la table. Cause probable ?', o: ['La table n\'est pas triée', 'Un espace invisible en fin de texte (« Lyon  »)', 'La colonne est trop étroite', 'Il faut écrire LYON en majuscules'], a: [1], e: 'Les espaces parasites des imports sont la cause n°1. SUPPRESPACE nettoie la valeur ; la recherche n\'est pas sensible à la casse.' },
  { q: 'Que renvoie =ANNEE("2019.03.15") si la cellule contient ce texte ?', o: ['2019', '#VALEUR!', '15', '#N/A'], a: [1], e: 'Ce texte n\'est pas reconnu comme une date : ANNEE renvoie #VALEUR!. Il faut le convertir en vraie date.' },
] ); }, n: `<p>Réponses : 1) K · 2) résultat faux sans erreur · 3) à gauche + exacte par défaut (2 réponses) · 4) 3 · 5) espace invisible · 6) #VALEUR!.</p>` },

/* 29 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X05', html: END(), n: `<p>Fin du module 05. Vous savez croiser des tableaux et préparer des données propres. Prochain module (X06) : faire parler ces données avec des <b>graphiques</b> et des <b>tableaux croisés dynamiques</b>.</p>` },
] };
