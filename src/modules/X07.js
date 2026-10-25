/* ===================== MODULE X07 — Fonctions multi-critères, SOMMEPROD et tableau de bord (Expert) ===================== */
const SECSX07 = ['Agréger sous plusieurs critères : .SI.ENS', 'SOMMEPROD et SI.CONDITIONS', 'Concevoir un tableau de bord'];

/* ---- helpers locaux X07 ---- */
const GX07 = (o, L) => { let h = GRID(o); if (L) { let i = 0; h = h.replace(/(<div class="xg-cols"[^>]*>)([\s\S]*?)(<\/div>)/, (m, a, b, c) => a + b.replace(/>([A-Z])<\/span>/g, () => '>' + L[i++] + '</span>') + c); } return h; };
const CX07 = (o, ref) => { const RH = o.rh || 38, cw = c => (o.colw && o.colw[c]) || o.cw || 120; const m = /^([A-Z])(\d+)$/.exec(ref), c = m[1].charCodeAt(0) - 65, r = +m[2]; let x = 46; for (let i = 0; i < c; i++) x += cw(i); return { x: (o.x ?? 70) + x + cw(c) / 2, y: (o.y ?? 170) + (o.fx ? 42 : 0) + RH * r + RH / 2, w: cw(c), h: RH }; };
const SCANX07 = (o, segs, s, until = 20) => FLOW({ x: 0, y: 0, w: 1600, h: 900, p: [{ s, until, pause: 1.4, r: 12, seg: segs.map(g => ({ d: 'M' + g.p.map(r => { const q = CX07(o, r); return q.x + ' ' + q.y; }).join(' L'), lab: g.lab, t: g.t || 1.6, c: g.c })) }] });
/* données Datacomp (lab x07) */
const DCX07 = [['Lemoine', 'Nord', 'Logiciel', 3, 1200], ['Garcia', 'Sud', 'Matériel', 10, 340], ['Lemoine', 'Nord', 'Formation', 2, 950], ['Roux', 'Est', 'Logiciel', 5, 1200], ['Garcia', 'Sud', 'Logiciel', 2, 1200], ['Fontaine', 'Nord', 'Matériel', 14, 340], ['Roux', 'Est', 'Formation', 4, 950], ['Chevalier', 'Sud', 'Formation', 6, 950], ['Fontaine', 'Nord', 'Logiciel', 4, 1200], ['Chevalier', 'Sud', 'Matériel', 8, 340], ['Roux', 'Est', 'Matériel', 12, 340], ['Lemoine', 'Nord', 'Formation', 1, 950]];
const fX07 = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const CAX07 = DCX07.map(r => r[3] * r[4]);
const NIVX07 = CAX07.map(v => v >= 5000 ? 'A' : v >= 3000 ? 'B' : 'C');
const GDX07 = { x: 70, y: 175, colw: [110, 74, 108, 56, 88, 86, 76], rh: 37, fx: { ref: 'F2', f: '=D2*E2', s: 1 },
  rows: [['Commercial', 'Région', 'Gamme', 'Qté', 'Prix', 'CA', 'Niveau'], ...DCX07.map(r => [r[0], r[1], r[2], r[3], fX07(r[4])])] };
const KPIX07 = { Nord: [16010, 8400, 3, 4800, [8400, 4760, 2850]], Sud: [14220, 2400, 2, 5700, [2400, 6120, 5700]], Est: [13880, 6000, 3, 6000, [6000, 4080, 3800]] };

/* panneau de tableau de bord pour une région (empilés, chaque région recouvre la précédente) */
function DASHX07(reg, s) {
  const [ca, log, n3, mx, g] = KPIX07[reg];
  const tile = (t, v, c) => `<div style="background:#fff;border-radius:14px;padding:14px 16px;border-left:6px solid ${c};box-shadow:0 10px 24px -14px rgba(14,23,38,.35)"><div style="font-size:16px;font-weight:700;color:#6B7A90">${t}</div><div style="font-size:34px;font-weight:900;color:${c};line-height:1.15">${v}</div></div>`;
  return `<div class="${s ? 'f' : 'a pop'}" ${s ? `data-s="${s}"` : ''} style="--d:.2s;position:absolute;left:70px;top:170px;width:1060px;height:540px;background:#F1F5F9;border-radius:20px;box-shadow:var(--sh);padding:22px 24px;font-family:'Segoe UI',sans-serif">
   <div style="display:flex;align-items:center;gap:14px;font-size:22px;font-weight:800">Tableau de bord commercial <span style="margin-left:auto;font-size:18px;color:#6B7A90">Région choisie (J1)</span><span style="padding:6px 14px;border:3px solid #FA582D;border-radius:8px;background:#fff;font-size:22px;min-width:120px">${reg} ▾</span></div>
   <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:18px">${tile('CA total', '44 110 €', '#475569')}${tile('CA ' + reg, fX07(ca) + ' €', '#107C41')}${tile(reg + ' · Logiciel', fX07(log) + ' €', '#2563EB')}${tile('Ventes ≥ 3 000 €', n3, '#7C3AED')}${tile('Meilleure vente', fX07(mx) + ' €', '#FA582D')}</div>
   <div style="margin-top:18px;background:#fff;border-radius:14px;padding:16px 20px;height:330px"><div style="font-size:19px;font-weight:800">CA ${reg} par gamme</div>
    <svg viewBox="0 0 960 260" style="width:100%;height:270px">${['Logiciel', 'Matériel', 'Formation'].map((l, i) => `<text x="120" y="${62 + i * 80}" text-anchor="end" font-size="20" font-weight="700" fill="#33445E">${l}</text><path d="M135 ${55 + i * 80} H${135 + g[i] / 9000 * 680}" stroke="${i ? '#94A3B8' : '#2563EB'}" stroke-width="46" class="draw" pathLength="1" style="--d:${.2 + i * .12}s"/><text x="${150 + g[i] / 9000 * 680}" y="${63 + i * 80}" font-size="22" font-weight="900" fill="#0E1726">${fX07(g[i])} €</text>`).join('')}</svg></div></div>`;
}

window.MODULE = { code: 'X07', title: 'Fonctions multi-critères, SOMMEPROD et tableau de bord', short: 'Multi-critères et tableau de bord', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Multi-critères et tableau de bord', html: TITLE({ mod: 'EXCEL · MODULE 07 · EXPERT', title: 'Un tableau de bord <span class="grad">piloté</span> par une cellule', sub: '« SOMME.SI.ENS, NB.SI.ENS, MAX.SI.ENS, SI.CONDITIONS, SOMMEPROD »', agenda: SECSX07, art: APPART('excel') }),
  n: `<p>Premier module <b>Expert</b>. Objectif final : un tableau de bord où le directeur commercial choisit une région dans une liste et voit tous ses indicateurs se recalculer.</p><p>Pour y arriver : les fonctions <b>.SI.ENS</b> (plusieurs critères), <b>SOMMEPROD</b> (calculs pondérés et conditions souples), <b>SI.CONDITIONS</b> (paliers), puis les règles de conception d'un tableau de bord.</p><p>Fil rouge : Datacomp, éditeur de logiciels qui vend aussi du matériel et des formations.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Agréger selon <b>plusieurs critères</b> avec les fonctions <b>.SI.ENS</b>', 'Utiliser <b>SOMMEPROD</b> sans colonne intermédiaire', 'Classer par <b>paliers</b> avec <b>SI.CONDITIONS</b> ou un barème', 'Concevoir un <b>tableau de bord</b> piloté par une cellule de sélection']),
  n: `<p>Quatre objectifs, un lab en six tâches qui construit le tableau de bord de bout en bout. Durée indicative : 80 minutes.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX07, 0), n: `<p>Vous connaissez SOMME.SI et NB.SI (un seul critère, module X03). Les versions <b>.SI.ENS</b> acceptent jusqu'à 127 critères.</p>` },

/* 4 — LES DONNÉES */
{ title: 'Les données Datacomp', html: `${H('Les données : 12 ventes Datacomp', 'Point de départ du lab')}
${GRID(Object.assign({ val: CAX07.map((v, i) => ({ r: 'F' + (i + 2), v: fX07(v), s: 1 })) }, GDX07))}
<div class="col" style="position:absolute;left:800px;right:70px;top:185px;gap:16px">
 ${CARD('<b>1 ·</b> F2 : <span class="mono">=D2*E2</span>, recopié jusqu\'en F13', 1)}
 ${CARD('<b>2 ·</b> 3 régions · 3 gammes · 6 commerciaux', 2)}
 ${CARD('<b>3 ·</b> Questions du directeur : « CA du Nord ? du Nord en Logiciel ? combien de grosses ventes ? »', 3)}
</div>
${STAT({ v: '44 110 €', t: 'CA total des 12 ventes', x: 800, y: 560, w: 330, s: 4, c: '#107C41' })}
${STAT({ v: '3 × 3', t: 'régions × gammes à croiser', x: 1160, y: 560, w: 370, s: 4, c: '#2563EB' })}`,
  n: `<p>La feuille du lab : une ligne par vente, avec commercial, région, gamme, quantité et prix unitaire.</p><p><b>Étape 1</b> : on calcule le CA de chaque ligne (tâche 1) : 3 600, 3 400, 1 900, 6 000, 2 400, 4 760, 3 800, 5 700, 4 800, 2 720, 4 080, 950.</p><p><b>Étape 2</b> : trois dimensions d'analyse : Région, Gamme, Commercial.</p><p><b>Étape 3</b> : les questions du directeur combinent plusieurs dimensions : SOMME.SI ne suffit plus.</p><p><b>Étape 4</b> : total 44 110 €. Question au groupe : « Comment calculeriez-vous le CA du Nord en Logiciel avec ce que vous savez déjà ? » (filtre + sous-total, TCD… on va faire mieux avec une formule pilotable).</p>` },

/* 5 — ANATOMIE SOMME.SI.ENS */
{ title: 'SOMME.SI.ENS', html: `${H('SOMME.SI.ENS : la plage à additionner d\'abord', 'L\'ordre des arguments')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;right:70px;top:180px;padding:22px 30px"><div style="font-size:18px;font-weight:800;color:#6B7A90">SOMME.SI · 1 critère</div><div class="mono" style="font-size:32px;font-weight:800;margin-top:6px">=SOMME.SI(<span style="color:#2563EB">B2:B13</span>;<span style="color:#7C3AED">"Nord"</span>;<span style="color:#16A34A">F2:F13</span>)</div></div>
<div class="card f" data-s="1" style="position:absolute;left:70px;right:70px;top:340px;padding:22px 30px;border:3px solid #16A34A"><div style="font-size:18px;font-weight:800;color:#6B7A90">SOMME.SI.ENS · 1 à 127 critères</div><div class="mono" style="font-size:32px;font-weight:800;margin-top:6px">=SOMME.SI.ENS(<span style="color:#16A34A">F2:F13</span>;<span style="color:#2563EB">B2:B13</span>;<span style="color:#7C3AED">"Nord"</span><span class="f" data-s="2">;<span style="color:#2563EB">C2:C13</span>;<span style="color:#7C3AED">"Logiciel"</span></span>)</div></div>
<svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:1600px;height:900px;pointer-events:none"><g class="f" data-s="1"><path d="M760 290 C 760 330, 470 310, 470 380" fill="none" stroke="#16A34A" stroke-width="4" stroke-dasharray="8 6"/><path d="M470 380 l-9 -14 h18 z" fill="#16A34A"/><text x="780" y="322" font-size="19" font-weight="800" fill="#16A34A">passe en 1ʳᵉ position</text></g></svg>
<div style="position:absolute;left:70px;right:70px;top:520px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
 <div class="card f zoom" data-s="2" style="border-top:6px solid #16A34A;text-align:center"><div style="font-size:18px;color:#6B7A90;font-weight:700">Nord</div><div style="font-size:44px;font-weight:900;color:#107C41">16 010 €</div></div>
 <div class="card f zoom" data-s="2" style="border-top:6px solid #2563EB;text-align:center"><div style="font-size:18px;color:#6B7A90;font-weight:700">Nord + Logiciel</div><div style="font-size:44px;font-weight:900;color:#2563EB">8 400 €</div></div>
 <div class="card f zoom" data-s="3" style="border-top:6px solid #DC2626;text-align:center"><div style="font-size:18px;color:#6B7A90;font-weight:700">Ordre inversé</div><div style="font-size:44px;font-weight:900;color:#DC2626">#VALEUR!</div></div>
</div>
${TIP('Astuce : utilisez <b>toujours .SI.ENS</b>, même pour un seul critère : un seul ordre à retenir.', { s: 4, kind: 'ok', x: 70, y: 700, w: 1000 })}`,
  n: `<p>Le piège n°1 de ce module, c'est l'<b>ordre des arguments</b>.</p><p>SOMME.SI (en haut) : plage du critère, critère, <b>puis</b> plage à additionner (facultative, à la fin).</p><p><b>Étape 1</b> : SOMME.SI.ENS : la plage à additionner (vert) passe <b>en premier</b>, suivie des couples (plage de critère ; critère). Pourquoi ? Parce que le nombre de couples est variable : la plage de somme doit avoir une place fixe.</p><p><b>Étape 2</b> : on ajoute un second couple : C2:C13 ; "Logiciel". Résultats : Nord = 16 010 € ; Nord + Logiciel = 8 400 € (3 600 + 4 800).</p><p><b>Étape 3</b> : inverser l'ordre provoque #VALEUR! ou un résultat absurde (Excel essaie d'additionner des noms de région).</p><p><b>Étape 4</b> : conseil de pro : n'utilisez plus que les .SI.ENS. Question 1 du quiz.</p>` },

/* 6 — DEUX CRITÈRES EN ACTION */
{ title: 'Deux critères en action', html: `${H('Deux critères : Nord ET Logiciel', 'SOMME.SI.ENS en action')}
${GRID(Object.assign({ val: CAX07.map((v, i) => ({ r: 'F' + (i + 2), v: fX07(v), s: 0 })).filter(() => false),
  rows: GDX07.rows.map((r, i) => i ? [r[0], r[1], r[2], fX07(CAX07[i - 1])] : [r[0], r[1], r[2], 'CA']),
  hl: [{ r: 'B2', s: 2, c: '#2563EB' }, { r: 'B4', s: 2, c: '#2563EB' }, { r: 'B7', s: 2, c: '#2563EB' }, { r: 'B10', s: 2, c: '#2563EB' }, { r: 'B13', s: 2, c: '#2563EB' }, { r: 'C2', s: 3, c: '#7C3AED' }, { r: 'C10', s: 3, c: '#7C3AED' }, { r: 'D2', s: 4, c: '#16A34A' }, { r: 'D10', s: 4, c: '#16A34A' }] }, { x: 70, y: 175, colw: [120, 90, 120, 110], rh: 38 }))}
<div class="col" style="position:absolute;left:640px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 ·</b> J4 : <span class="mono" style="font-size:18px">=SOMME.SI.ENS(F2:F13;B2:B13;<b>J1</b>;C2:C13;"Logiciel")</span> · J1 = <b>Nord</b>', 1)}
 ${CARD('<b>2 ·</b> Critère 1 : Région = Nord → <b style="color:#2563EB">5 lignes</b>', 2)}
 ${CARD('<b>3 ·</b> Critère 2 : Gamme = Logiciel → <b style="color:#7C3AED">2 lignes</b> restent', 3)}
 ${CARD('<b>4 ·</b> On additionne leur CA : 3 600 + 4 800', 4)}
</div>
<div class="card f zoom" data-s="4" style="position:absolute;left:640px;top:560px;width:380px;text-align:center"><div style="font-size:18px;color:#6B7A90;font-weight:700">J4 =</div><div style="font-size:60px;font-weight:900;color:#107C41">8 400 €</div></div>
${TIP('Tous les critères sont combinés en <b>ET</b>.', { s: 5, x: 1060, y: 580, w: 470 })}`,
  n: `<p>On visualise le filtrage successif.</p><p><b>Étape 1</b> : la formule de la tâche 4 du lab. Le critère « Nord » n'est pas écrit en dur : il vient de <b>J1</b>. Changer J1 change le résultat : c'est la base du tableau de bord.</p><p><b>Étape 2</b> : premier couple : 5 lignes ont Région = Nord (lignes 2, 4, 7, 10, 13).</p><p><b>Étape 3</b> : deuxième couple : parmi elles, seules 2 sont en Logiciel (lignes 2 et 10).</p><p><b>Étape 4</b> : on additionne la plage de somme sur ces lignes : 3 600 + 4 800 = <b>8 400 €</b>.</p><p><b>Étape 5</b> : une ligne doit satisfaire <b>tous</b> les critères (ET). Pour un OU, voir deux diapos plus loin.</p>` },

/* 7 — LA FAMILLE .SI.ENS */
{ title: 'La famille .SI.ENS', html: `${H('Compter, maximum, moyenne… sous critères', 'La famille .SI.ENS · région Nord')}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px">
 ${[['SOMME.SI.ENS', '16 010 €', '#107C41', 'F2:F13;B2:B13;J1'], ['NB.SI.ENS', '3', '#7C3AED', 'B2:B13;J1;F2:F13;">=3000"'], ['MAX.SI.ENS', '4 800 €', '#FA582D', 'F2:F13;B2:B13;J1'], ['MOYENNE.SI.ENS', '3 202 €', '#2563EB', 'F2:F13;B2:B13;J1'], ['MIN.SI.ENS', '950 €', '#475569', 'F2:F13;B2:B13;J1']].map(([f, v, c, a], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="border-top:6px solid ${c};padding:20px 16px;text-align:center"><div style="font-size:20px;font-weight:900;color:${c}">${f}</div><div style="font-size:42px;font-weight:900;margin:14px 0">${v}</div><div class="mono" style="font-size:14px;color:#33445E">(${a.replace(';F2', ';<br>F2')})</div></div>`).join('')}
</div>
<svg viewBox="0 0 1460 230" style="position:absolute;left:70px;top:480px;width:1460px;height:230px" class="f" data-s="6">
 <text x="0" y="30" font-size="20" font-weight="800" fill="#33445E">Les 5 ventes du Nord</text>
 ${[3600, 1900, 4760, 4800, 950].map((v, i) => `<path d="M${40 + i * 280} 210 V${210 - v / 30}" stroke="${v >= 3000 ? '#7C3AED' : '#CBD5E1'}" stroke-width="90" class="draw" pathLength="1" style="--d:${.1 + i * .1}s"/><text x="${40 + i * 280}" y="${200 - v / 30}" text-anchor="middle" font-size="22" font-weight="800" fill="#0E1726">${fX07(v)}</text>`).join('')}
 <path d="M0 ${210 - 100} H1460" stroke="#DC2626" stroke-width="3" stroke-dasharray="10 8"/><text x="1460" y="${210 - 110}" text-anchor="end" font-size="18" font-weight="800" fill="#DC2626">seuil 3 000</text>
</svg>`,
  n: `<p>Même logique pour toute la famille, toujours sur la région choisie (Nord) :</p><p><b>Étape 1 — SOMME.SI.ENS</b> : 16 010 €.</p><p><b>Étape 2 — NB.SI.ENS</b> : nombre de ventes du Nord d'au moins 3 000 €. Attention, <b>pas de plage de somme</b> : on commence directement par les couples. Le comparateur s'écrit entre guillemets : <code>"&gt;=3000"</code>. Résultat : 3 (3 600, 4 760, 4 800).</p><p><b>Étape 3 — MAX.SI.ENS</b> : meilleure vente du Nord : 4 800 € (tâche 5).</p><p><b>Étape 4 — MOYENNE.SI.ENS</b> : 16 010 / 5 = 3 202 €.</p><p><b>Étape 5 — MIN.SI.ENS</b> : 950 €.</p><p><b>Étape 6</b> : le graphique des 5 ventes du Nord avec le seuil : on « voit » le NB.SI.ENS = 3 barres violettes au-dessus de la ligne.</p><p>Critère lié à une cellule : <code>"&gt;="&amp;K1</code> (l'opérateur entre guillemets, la cellule concaténée).</p>` },

/* 8 — ET / OU */
{ title: 'ET ou OU ?', html: `${H('ET dans une formule, OU en additionnant', 'Combiner les critères')}
<svg viewBox="0 0 700 420" style="position:absolute;left:70px;top:180px;width:700px;height:420px">
 <circle cx="260" cy="210" r="160" fill="#2563EB" fill-opacity=".14" stroke="#2563EB" stroke-width="4" class="a pop" style="--d:.2s"/><circle cx="440" cy="210" r="160" fill="#7C3AED" fill-opacity=".14" stroke="#7C3AED" stroke-width="4" class="a pop" style="--d:.35s"/>
 <text x="170" y="120" font-size="24" font-weight="900" fill="#2563EB">Nord</text><text x="470" y="120" font-size="24" font-weight="900" fill="#7C3AED">Logiciel</text>
 <g class="f zoom" data-s="1"><path d="M350 77 A160 160 0 0 1 350 343 A160 160 0 0 1 350 77" fill="#16A34A" fill-opacity=".35"/><text x="350" y="205" text-anchor="middle" font-size="22" font-weight="900" fill="#107C41">ET</text><text x="350" y="235" text-anchor="middle" font-size="22" font-weight="900" fill="#107C41">8 400</text></g>
</svg>
<div class="col" style="position:absolute;left:820px;right:70px;top:190px;gap:16px">
 ${CARD('<b style="color:#107C41">ET</b> · une seule formule, plusieurs couples<br><span class="mono" style="font-size:18px">=SOMME.SI.ENS(F2:F13;B2:B13;"Nord";C2:C13;"Logiciel")</span>', 1)}
 ${CARD('<b style="color:#DC2626">Piège</b> · <span class="mono" style="font-size:18px">…;B2:B13;"Nord";B2:B13;"Est")</span> → <b>0</b>', 2)}
 ${CARD('<b style="color:#2563EB">OU</b> · additionner deux formules<br><span class="mono" style="font-size:18px">=SOMME.SI.ENS(F2:F13;B2:B13;"Nord")<br>+SOMME.SI.ENS(F2:F13;B2:B13;"Est")</span>', 3)}
</div>
${STAT({ v: '29 890 €', t: 'Nord (16 010) + Est (13 880)', x: 820, y: 600, w: 420, s: 4, c: '#2563EB' })}
${TIP('Dates entre deux bornes : <span class="mono">"&gt;="&amp;J2</span> et <span class="mono">"&lt;="&amp;J3</span>', { s: 5, kind: 'key', x: 70, y: 640, w: 700 })}`,
  n: `<p><b>Étape 1 — ET</b> : l'intersection des deux ensembles. Une ligne doit être Nord <i>et</i> Logiciel : 8 400 €.</p><p><b>Étape 2 — le piège</b> : écrire deux critères sur la même colonne (Nord ; Est) dans une seule SOMME.SI.ENS revient à demander les lignes qui sont à la fois Nord ET Est : aucune → <b>0</b>.</p><p><b>Étape 3 — OU</b> : on additionne deux formules, une par valeur. (Variante avancée : <code>=SOMME(SOMME.SI.ENS(F2:F13;B2:B13;{"Nord";"Est"}))</code>, ou SOMMEPROD, section suivante.)</p><p><b>Étape 4</b> : Nord + Est = 16 010 + 13 880 = <b>29 890 €</b>. Question 4 du quiz.</p><p><b>Étape 5</b> : pour une période, deux couples sur la même colonne de dates, avec des comparateurs concaténés : <code>=SOMME.SI.ENS(F:F;A:A;"&gt;="&amp;J2;A:A;"&lt;="&amp;J3)</code> — ici c'est bien un ET (après le début ET avant la fin).</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSX07, 1), n: `<p>Deuxième partie : <b>SOMMEPROD</b>, le couteau suisse, puis le classement par paliers avec <b>SI.CONDITIONS</b> ou une table de barème.</p>` },

/* 10 — SOMMEPROD */
{ title: 'SOMMEPROD', html: `${H('SOMMEPROD : multiplier, puis additionner', 'Sans colonne intermédiaire')}
${GX07({ x: 70, y: 175, colw: [100, 120, 190], rh: 38, fx: { ref: 'J2', f: '=SOMMEPROD(D2:D13;E2:E13)', s: 1 },
  rows: [['Qté', 'Prix', 'D × E (virtuel)'], ...DCX07.map(r => [r[3], fX07(r[4])])], val: CAX07.map((v, i) => ({ r: 'C' + (i + 2), v: fX07(v), s: 2, c: '#7C3AED' })), hl: [{ r: 'C2:C13', s: 2, c: '#7C3AED', t: 'calculé en mémoire' }] }, ['D', 'E', '·'])}
<div class="col" style="position:absolute;left:600px;right:70px;top:190px;gap:16px">
 ${CARD('<span class="mono" style="font-size:22px">D2*E2 + D3*E3 + … + D13*E13</span>', 1)}
 ${CARD('<b>2 ·</b> Les produits sont calculés <b>en mémoire</b>, ligne à ligne', 2)}
 ${CARD('<b>3 ·</b> Puis additionnés : le CA total, <b>sans colonne F</b>', 3)}
</div>
<div class="card f zoom" data-s="3" style="position:absolute;left:600px;top:450px;width:400px;text-align:center"><div style="font-size:18px;color:#6B7A90;font-weight:700">J2 =</div><div style="font-size:60px;font-weight:900;color:#107C41">44 110 €</div></div>
${TIP('Mini-test : D = 2, 3, 1 et E = 10, 20, 5 → 2×10 + 3×20 + 1×5 = <b>85</b>', { s: 4, kind: 'key', x: 1030, y: 450, w: 500 })}
${TIP('Plages de <b>même taille</b>, sinon #VALEUR! · pas de colonnes entières (A:A)', { s: 5, kind: 'warn', x: 600, y: 650, w: 930 })}`,
  n: `<p>SOMMEPROD multiplie les plages <b>terme à terme</b> puis additionne les produits.</p><p><b>Étape 1</b> : la formule de la tâche 3 du lab : <code>=SOMMEPROD(D2:D13;E2:E13)</code>. La consigne interdit d'utiliser la colonne F : c'est tout l'intérêt.</p><p><b>Étape 2</b> : Excel calcule en mémoire la colonne « quantité × prix » (en violet, elle n'existe pas dans la feuille).</p><p><b>Étape 3</b> : la somme : <b>44 110 €</b>, identique à SOMME(F2:F13).</p><p><b>Étape 4</b> : le petit calcul de la question 2 du quiz : 85.</p><p><b>Étape 5</b> : deux pièges : plages de tailles différentes → #VALEUR! ; colonnes entières → Excel calcule un million de lignes, le classeur rame. Usage métier typique : prix moyen pondéré = SOMMEPROD(Qté;Prix)/SOMME(Qté).</p>` },

/* 11 — CONDITIONS DANS SOMMEPROD */
{ title: 'Conditions dans SOMMEPROD', html: `${H('Des tests logiques qui valent 1 ou 0', 'SOMMEPROD conditionnelle')}
${GX07({ x: 70, y: 175, colw: [84, 104, 118, 118, 90, 104], rh: 36,
  rows: [['Région', 'Gamme', '="Nord"', '="Logiciel"', 'CA', 'Produit'], ...DCX07.map((r, i) => [r[1], r[2], '', '', fX07(CAX07[i]), ''])],
  val: DCX07.flatMap((r, i) => { const a = r[1] === 'Nord' ? 1 : 0, b = r[2] === 'Logiciel' ? 1 : 0, p = a * b * CAX07[i]; return [{ r: 'C' + (i + 2), v: a, s: 1, c: a ? '#2563EB' : '#94A3B8' }, { r: 'D' + (i + 2), v: b, s: 2, c: b ? '#7C3AED' : '#94A3B8' }, { r: 'F' + (i + 2), v: fX07(p), s: 3, c: p ? '#107C41' : '#94A3B8' }]; }) }, ['B', 'C', '(1)', '(2)', 'F', '×'])}
<div class="col" style="position:absolute;left:770px;right:70px;top:180px;gap:14px">
 <div class="card a pop" style="--d:.3s;padding:16px 20px"><span class="mono" style="font-size:19px;font-weight:700">=SOMMEPROD(<span style="color:#2563EB">(B2:B13="Nord")</span>*<span style="color:#7C3AED">(C2:C13="Logiciel")</span>*D2:D13*E2:E13)</span></div>
 ${CARD('<b>1 ·</b> VRAI/FAUX × nombre → <b>1 / 0</b>', 1)}
 ${CARD('<b>2 ·</b> 1 × 1 = garde la ligne · un 0 l\'élimine', 2)}
 ${CARD('<b>3 ·</b> Somme : 3 600 + 4 800 = <b style="color:#107C41;font-size:26px">8 400 €</b>', 3)}
 ${CARD('<b>OU</b> : <span class="mono" style="font-size:17px">((B2:B13="Nord")+(B2:B13="Est")&gt;0)*F2:F13</span> → 29 890', 4)}
 ${CARD('<b>Mois</b> : <span class="mono" style="font-size:17px">(MOIS(A2:A13)=3)*F2:F13</span> · des fonctions dans les critères', 5)}
</div>`,
  n: `<p>La vraie puissance de SOMMEPROD : les <b>tests logiques</b>.</p><p><b>Étape 1</b> : (B2:B13="Nord") produit 12 valeurs VRAI/FAUX ; dès qu'on les multiplie, Excel les convertit en <b>1/0</b>. Colonne (1) : 1 pour les 5 lignes du Nord.</p><p><b>Étape 2</b> : même chose pour Logiciel (colonne 2). Le produit 1×1 ne vaut 1 que si les deux conditions sont remplies : c'est un ET.</p><p><b>Étape 3</b> : on multiplie par la quantité et le prix : seules les lignes 2 et 10 gardent leur CA → 8 400 €, comme SOMME.SI.ENS, mais sans colonne F.</p><p><b>Étape 4</b> : le OU s'écrit avec une <b>addition</b> de tests (le « &gt;0 » évite de compter deux fois une ligne qui remplirait les deux).</p><p><b>Étape 5</b> : on peut appliquer une fonction à la plage dans le critère (MOIS, ANNEE, GAUCHE…), ce que SOMME.SI.ENS ne sait pas faire.</p>` },

/* 12 — SI.CONDITIONS */
{ title: 'SI.CONDITIONS', html: `${H('Classer par paliers : SI.CONDITIONS', 'Niveau A · B · C')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;right:70px;top:170px;padding:16px 24px;text-align:center"><span class="mono" style="font-size:28px;font-weight:800">=SI.CONDITIONS(<span style="color:#16A34A">F2&gt;=5000;"A"</span>;<span style="color:#2563EB">F2&gt;=3000;"B"</span>;<span style="color:#94A3B8">VRAI;"C"</span>)</span></div>
${FLOW({ x: 70, y: 270, w: 1460, h: 440,
  n: { v: { x: 110, y: 210, plate: false, html: `<rect x="40" y="170" width="140" height="80" rx="16" fill="#0E1726"/><text x="110" y="220" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">CA</text>` },
    t1: { x: 440, y: 210, plate: false, html: `<path d="M440 140 L560 210 L440 280 L320 210 Z" fill="#ECFDF3" stroke="#16A34A" stroke-width="3"/><text x="440" y="218" text-anchor="middle" font-size="21" font-weight="800" fill="#107C41">≥ 5 000 ?</text>` },
    t2: { x: 840, y: 210, plate: false, html: `<path d="M840 140 L960 210 L840 280 L720 210 Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="3"/><text x="840" y="218" text-anchor="middle" font-size="21" font-weight="800" fill="#2563EB">≥ 3 000 ?</text>` },
    a: { x: 440, y: 50, plate: false, html: `<circle cx="440" cy="50" r="40" fill="#16A34A"/><text x="440" y="63" text-anchor="middle" font-size="36" font-weight="900" fill="#fff">A</text>` },
    b: { x: 840, y: 50, plate: false, html: `<circle cx="840" cy="50" r="40" fill="#2563EB"/><text x="840" y="63" text-anchor="middle" font-size="36" font-weight="900" fill="#fff">B</text>` },
    c: { x: 1240, y: 210, plate: false, html: `<circle cx="1240" cy="210" r="40" fill="#94A3B8"/><text x="1240" y="223" text-anchor="middle" font-size="36" font-weight="900" fill="#fff">C</text><text x="1240" y="290" text-anchor="middle" font-size="19" font-weight="700" fill="#6B7A90">VRAI = « sinon »</text>` } },
  l: [{ a: 'v', b: 't1' }, { a: 't1', b: 't2', lab: 'non', lx: 640, ly: 210 }, { a: 't2', b: 'c', lab: 'non', lx: 1060, ly: 210 }, { a: 't1', b: 'a', lab: 'oui', lx: 470, ly: 115, lw: 60 }, { a: 't2', b: 'b', lab: 'oui', lx: 870, ly: 115, lw: 60 }],
  p: [{ s: 1, until: 1, c: '#16A34A', seg: [{ d: 'M180 210 L320 210', lab: '6 000', t: 1 }, { d: 'M440 140 L440 90', lab: '6 000 → A', t: .8 }] },
    { s: 2, until: 2, c: '#2563EB', seg: [{ d: 'M180 210 L320 210', lab: '3 600', t: 1 }, { d: 'M560 210 L720 210', lab: '3 600', t: 1 }, { d: 'M840 140 L840 90', lab: '3 600 → B', t: .8 }] },
    { s: 3, until: 9, c: '#475569', seg: [{ d: 'M180 210 L320 210', lab: '950', t: 1 }, { d: 'M560 210 L720 210', lab: '950', t: 1 }, { d: 'M960 210 L1200 210', lab: '950 → C', t: 1.2 }] }] })}
${TIP('Sans <b>VRAI;"C"</b> final : 950 € → <b>#N/A</b>. Les tests sont lus <b>dans l\'ordre</b> : du plus haut au plus bas.', { s: 4, kind: 'warn', x: 70, y: 730, w: 1100 })}`,
  n: `<p>SI.CONDITIONS remplace les SI imbriqués : on écrit des couples (condition ; résultat), testés <b>dans l'ordre</b>, et la première condition vraie l'emporte.</p><p><b>Étape 1</b> : une vente à 6 000 € : la première condition (≥ 5 000) est vraie → <b>A</b>.</p><p><b>Étape 2</b> : 3 600 € : la première est fausse, la deuxième (≥ 3 000) vraie → <b>B</b>.</p><p><b>Étape 3</b> : 950 € : aucune des deux → on arrive au dernier couple <code>VRAI;"C"</code>, toujours vrai, qui joue le rôle de « sinon ».</p><p><b>Étape 4</b> : sans ce dernier couple, Excel renvoie <b>#N/A</b> (question 3 du quiz). Et l'ordre compte : si l'on testait d'abord ≥ 3 000, une vente de 6 000 € serait classée B.</p><p>Résultat sur les 12 ventes : 2 « A » (6 000 et 5 700), 6 « B », 4 « C ». Tâche 2 du lab ; si le simulateur n'accepte pas VRAI, terminer par <code>F2&gt;=0;"C"</code>.</p>` },

/* 13 — BARÈME EN TABLE */
{ title: 'Barème en table', html: `${H('Mieux : le barème dans une table', 'Recherche approchée')}
${GX07({ x: 70, y: 220, colw: [300, 270], rh: 50, fx: { ref: 'G7', f: '=RECHERCHEX(F7;$M$2:$M$4;$N$2:$N$4;;-1)', s: 1 }, rows: [['Seuil', 'Niveau'], ['0', 'C'], ['3 000', 'B'], ['5 000', 'A']], hl: [{ r: 'A3:B3', s: 3, c: '#2563EB' }] }, ['M', 'N'])}
${SCANX07({ x: 70, y: 220, colw: [300, 270], rh: 50, fx: true }, [{ p: ['A2', 'A4'], lab: '4 760 ?', t: 1.8 }, { p: ['A4', 'A3'], lab: '5 000 > 4 760', t: 1, c: '#DC2626' }, { p: ['A3', 'B3'], lab: 'B', t: .9, c: '#2563EB' }], 2)}
<div class="col" style="position:absolute;left:720px;right:70px;top:190px;gap:16px">
 ${CARD('<b>-1</b> (5<sup>e</sup> argument) = valeur exacte <b>ou immédiatement inférieure</b>', 1)}
 ${CARD('4 760 € → palier 3 000 → niveau <b style="color:#2563EB">B</b>', 3)}
 ${CARD('Équivalent : <span class="mono">=RECHERCHEV(F7;$M$2:$N$4;2;VRAI)</span>', 4)}
</div>
<div style="position:absolute;left:720px;right:70px;top:500px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 ${[['A', '2 ventes', '#16A34A'], ['B', '6 ventes', '#2563EB'], ['C', '4 ventes', '#94A3B8']].map(([n, t, c]) => `<div class="card f zoom" data-s="5" style="text-align:center;border-top:6px solid ${c}"><div style="font-size:48px;font-weight:900;color:${c}">${n}</div><div style="font-size:20px;font-weight:700">${t}</div></div>`).join('')}
</div>
${TIP('Le métier change le seuil dans <b>M3</b> : aucune formule à modifier.', { s: 6, kind: 'ok', x: 70, y: 600, w: 580 })}`,
  n: `<p>Quand les seuils changent souvent (chaque année, chaque campagne), on les sort des formules : c'est une <b>règle métier</b>, elle doit vivre dans des cellules.</p><p><b>Étape 1</b> : RECHERCHEX avec le 5<sup>e</sup> argument <b>-1</b> : correspondance exacte ou valeur immédiatement inférieure. Le 4<sup>e</sup> (si non trouvé) est laissé vide : d'où les deux points-virgules.</p><p><b>Étape 2</b> : 4 760 € (ligne 7, Fontaine) parcourt les seuils : 0, 3 000, puis 5 000 est trop grand → on garde 3 000.</p><p><b>Étape 3</b> : niveau <b>B</b>.</p><p><b>Étape 4</b> : l'équivalent historique : RECHERCHEV en correspondance approchée (VRAI), table triée par ordre croissant (module X05).</p><p><b>Étape 5</b> : la répartition sur les 12 ventes : 2 A, 6 B, 4 C.</p><p><b>Étape 6</b> : si la direction relève le seuil B à 3 500 €, on modifie M3 et tout se recalcule.</p>` },

/* 14 — PIÈGES */
{ title: 'Pièges et bonnes pratiques', html: `${H('Pièges et bonnes pratiques', 'Avant de passer au tableau de bord')}
${VS({ l: { t: 'Pièges', c: '#DC2626', ic: '✘', items: ['SOMME.SI.ENS : plage de somme <b>pas en premier</b>', 'SOMMEPROD : plages de <b>tailles différentes</b> → #VALEUR!', 'SI.CONDITIONS sans <b>VRAI</b> final → #N/A', 'Seuils et taux <b>en dur</b> dans 200 formules'] },
  r: { t: 'Bonnes pratiques', c: '#16A34A', ic: '✔', items: ['Toujours <b>.SI.ENS</b>, même pour 1 critère', 'Plages bornées (F2:F13) ou <b>tableau structuré</b>', 'Critères dans des <b>cellules</b> : J1, K1…', 'Paramètres dans une feuille dédiée'] }, mid: '➜' })}
${TIP(`${KEYS('F9')} sur une portion de formule sélectionnée affiche sa valeur (Échap pour annuler)`, { s: 3, kind: 'key', x: 70, y: 640, w: 1000 })}`,
  n: `<p><b>Étape 1 — les pièges</b> vus dans cette section, à faire relire au groupe.</p><p><b>Étape 2 — les bonnes pratiques</b> : critères et paramètres dans des cellules, plages bornées ou tableaux structurés (Ventes[CA]) qui s'agrandissent tout seuls.</p><p><b>Étape 3</b> : l'outil de débogage : dans la barre de formule, sélectionnez une partie, par exemple <code>(B2:B13="Nord")</code>, et appuyez sur <kbd>F9</kbd> : Excel affiche {VRAI;FAUX;VRAI…}. <b>Échap</b> pour ne pas remplacer la formule. Montrez-le en démo : c'est l'outil qui fait comprendre SOMMEPROD.</p>` },

/* 15 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSX07, 2), n: `<p>Troisième partie : assembler ces formules en un <b>tableau de bord</b> fiable, interactif et protégé.</p>` },

/* 16 — ARCHITECTURE (FLOW) */
{ title: 'Architecture', html: `${H('Trois feuilles, un sélecteur', 'Architecture d\'un tableau de bord')}
${FLOW({ x: 70, y: 170, w: 1460, h: 560,
  z: [{ x: 0, y: 30, w: 400, h: 400, l: '1 · DONNÉES', c: '#0EA5E9' }, { x: 530, y: 30, w: 400, h: 400, l: '2 · CALCULS', c: '#7C3AED', s: 2 }, { x: 1060, y: 30, w: 400, h: 400, l: '3 · TABLEAU DE BORD', c: '#107C41', s: 3 }],
  n: { d: { x: 200, y: 230, ic: 'tablei', sz: 110, l: 'Tableau structuré', sub: 'Ventes · on remplace chaque mois' },
    c: { x: 730, y: 230, ic: 'formula', sz: 110, l: '.SI.ENS · SOMMEPROD', sub: 'que des formules', s: 2 },
    t: { x: 1260, y: 230, ic: 'chart', sz: 110, l: 'KPI · graphiques · MFC', sub: 'lecture seule', s: 3 },
    sel: { x: 1260, y: 500, plate: false, s: 1, html: `<rect x="1150" y="470" width="220" height="60" rx="12" fill="#fff" stroke="#FA582D" stroke-width="4"/><text x="1260" y="510" text-anchor="middle" font-size="24" font-weight="900" fill="#0E1726">Nord ▾</text>`, l: '' } },
  l: [{ a: 'd', b: 'c', s: 2 }, { a: 'c', b: 't', s: 3 }, { a: 'sel', b: 'c', r: 'hv', s: 1, c: '#FA582D', dash: true }],
  p: [{ s: 4, keep: true, seg: [{ via: ['d', 'c'], lab: 'données', t: 1.4 }, { via: ['c', 't'], lab: 'KPI', t: 1.4, c: '#107C41' }] }] })}
<div class="chip f" data-s="1" style="position:absolute;left:1440px;top:655px;font-size:18px">sélecteur J1</div>`,
  n: `<p>Un tableau de bord robuste sépare trois rôles, idéalement sur trois feuilles :</p><p><b>Étape 1 — le sélecteur</b> : une cellule (J1) avec une liste déroulante. C'est la seule cellule que l'utilisateur modifie.</p><p><b>Étape 2 — les calculs</b> : des formules .SI.ENS / SOMMEPROD qui lisent les données et le sélecteur.</p><p><b>Étape 3 — l'affichage</b> : indicateurs, graphiques, mises en forme conditionnelles, sparklines. En lecture seule.</p><p><b>Étape 4</b> : chaque mois, on remplace les données (ou on actualise Power Query, module X08) : tout se recalcule. C'est la question 5 du quiz : un tableau de bord ne contient <b>que des formules</b>, jamais de chiffres collés.</p>` },

/* 17 — LE SÉLECTEUR */
{ title: 'Le sélecteur', html: `${H('Le sélecteur : une liste déroulante', 'Validation des données', PATH('Données > Outils de données > Validation des données'))}
${APPWIN({ app: 'excel', x: 70, y: 170, w: 900, h: 175, title: 'Datacomp_TDB.xlsx', tab: 'Données',
  groups: [['Récupérer et transformer', ['📥 Obtenir des données']], ['Trier et filtrer', ['⇅ Trier', '▼ Filtrer']], ['Outils de données', ['⫴ Convertir', '🗑 Doublons', '✅ Validation des données']]],
  hot: { '✅ Validation des données': 1 } })}
<div class="card f zoom" data-s="2" style="position:absolute;left:70px;top:390px;width:560px;padding:20px 24px">
 <div style="font-size:20px;font-weight:900;margin-bottom:12px">Validation des données</div>
 <div style="display:grid;grid-template-columns:120px 1fr;gap:12px;align-items:center;font-size:19px"><span>Autoriser :</span><span style="border:2px solid #CBD5E1;border-radius:6px;padding:6px 10px;font-weight:700">Liste ▾</span><span>Source :</span><span class="mono" style="border:2px solid #FA582D;border-radius:6px;padding:6px 10px;font-weight:700">Nord;Sud;Est</span></div>
</div>
<div class="f" data-s="3" style="position:absolute;left:700px;top:400px;width:270px;font-family:'Segoe UI',sans-serif">
 <div style="display:flex;border:3px solid #107C41;background:#fff;font-size:22px;font-weight:800"><span style="padding:8px 12px;flex:1">Nord</span><span style="width:36px;display:grid;place-items:center;background:#F3F4F6;border-left:1px solid #CBD5E1">▾</span></div>
 <div style="background:#fff;box-shadow:var(--sh);font-size:21px">${['Nord', 'Sud', 'Est'].map((r, i) => `<div style="padding:8px 12px;${i === 1 ? 'background:#E8F5EC' : ''}">${r}</div>`).join('')}</div>
</div>
<div class="col" style="position:absolute;left:1010px;right:70px;top:180px;gap:16px">
 ${CARD('<b>1 ·</b> Sélectionnez <b>J1</b> › Validation des données', 1)}
 ${CARD('<b>2 ·</b> Autoriser : <b>Liste</b> · Source : Nord;Sud;Est (ou une plage)', 2)}
 ${CARD(`<b>3 ·</b> ${KEYS('Alt+Flèche bas')} ouvre la liste`, 3)}
 ${CARD('<b>4 ·</b> Source dynamique : <span class="mono">=$H$2#</span> (UNIQUE, module X08)', 4)}
</div>`,
  n: `<p>Le sélecteur garantit que l'utilisateur ne tape que des valeurs valides (une faute de frappe « Nrod » donnerait 0 partout).</p><p><b>Étape 1</b> : sélectionner J1, puis Données › Outils de données › <b>Validation des données</b>.</p><p><b>Étape 2</b> : Autoriser : <b>Liste</b>. Source : les valeurs séparées par des points-virgules, ou mieux une plage de cellules (une liste de régions sur la feuille Paramètres).</p><p><b>Étape 3</b> : une flèche apparaît à côté de la cellule ; au clavier, <kbd>Alt</kbd>+<kbd>Flèche bas</kbd> ouvre la liste.</p><p><b>Étape 4</b> : avec Microsoft 365, la source peut être une plage dynamique (=UNIQUE(…) puis =$H$2#) : la liste s'enrichit seule quand une région apparaît.</p><p>Onglets Message de saisie / Alerte d'erreur : pour guider et bloquer les saisies hors liste.</p>` },

/* 18 — NOMS DÉFINIS */
{ title: 'Noms définis', html: `${H('Des noms pour des formules lisibles', 'Gestionnaire de noms', PATH('Formules > Noms définis > Gestionnaire de noms'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:760px;padding:20px 24px">
 <div style="font-size:20px;font-weight:900;margin-bottom:12px">Gestionnaire de noms</div>
 <table style="width:100%;border-collapse:collapse;font-size:19px"><tr style="background:#F1F5F9"><th style="text-align:left;padding:8px">Nom</th><th style="text-align:left;padding:8px">Fait référence à</th></tr>
 ${[['RegionChoisie', '=\'Tableau de bord\'!$J$1', 1], ['Ventes', 'Tableau structuré A1:G13', 2], ['SeuilB', '=Paramètres!$M$3', 3]].map(([n, r, s]) => `<tr class="f" data-s="${s}"><td style="padding:8px;font-weight:800;color:#107C41;border-top:1px solid #E3E8EF">${n}</td><td class="mono" style="padding:8px;font-size:17px;border-top:1px solid #E3E8EF">${r}</td></tr>`).join('')}</table>
</div>
<div class="col" style="position:absolute;left:870px;right:70px;top:190px;gap:14px">
 ${CARD(`${KEYS('Ctrl+F3')} Gestionnaire de noms`, 1)}${CARD(`${KEYS('Ctrl+Maj+F3')} Créer depuis la sélection`, 2)}${CARD(`${KEYS('F3')} Coller un nom dans la formule`, 3)}
</div>
<div class="card f zoom" data-s="4" style="position:absolute;left:70px;right:70px;top:500px;padding:18px 24px"><div style="font-size:18px;color:#DC2626;font-weight:800">Avant</div><div class="mono" style="font-size:24px;font-weight:700;color:#6B7A90">=SOMME.SI.ENS($F$2:$F$13;$B$2:$B$13;$J$1)</div></div>
<div class="card f zoom" data-s="5" style="position:absolute;left:70px;right:70px;top:640px;padding:18px 24px;border:3px solid #16A34A"><div style="font-size:18px;color:#16A34A;font-weight:800">Après : se lit comme une phrase</div><div class="mono" style="font-size:26px;font-weight:800">=SOMME.SI.ENS(<span style="color:#107C41">Ventes[CA]</span>;<span style="color:#107C41">Ventes[Région]</span>;<span style="color:#FA582D">RegionChoisie</span>)</div></div>`,
  n: `<p>Les noms rendent un tableau de bord <b>maintenable</b> par quelqu'un d'autre que son auteur.</p><p><b>Étape 1</b> : on nomme la cellule J1 « RegionChoisie » : sélectionner J1, taper le nom dans la <b>zone Nom</b> (à gauche de la barre de formule), Entrée. <kbd>Ctrl</kbd>+<kbd>F3</kbd> ouvre le Gestionnaire de noms.</p><p><b>Étape 2</b> : un tableau structuré a déjà un nom (Création de tableau › Nom du tableau) ; ses colonnes s'appellent Ventes[CA], Ventes[Région]. <kbd>Ctrl</kbd>+<kbd>Maj</kbd>+<kbd>F3</kbd> crée des noms à partir des en-têtes d'une sélection.</p><p><b>Étape 3</b> : les paramètres (seuils) ont aussi un nom. <kbd>F3</kbd> pendant la saisie d'une formule colle un nom.</p><p><b>Étapes 4-5</b> : la même formule, illisible avec des $ puis lisible avec des noms : « somme du CA des ventes dont la région est la région choisie ». Pas besoin de F4 : un nom est toujours absolu.</p>` },

/* 19 — TABLEAU DE BORD EN ACTION */
{ title: 'Le tableau de bord en action', html: `${H('Changez J1 : tout se recalcule', 'Le tableau de bord en action')}
${DASHX07('Nord')}
<div class="pkc" data-cur="1-1" style="position:absolute;left:940px;top:232px;width:150px;background:#fff;box-shadow:var(--sh);border-radius:8px;font-size:21px;z-index:5;font-family:'Segoe UI',sans-serif">${['Nord', 'Sud', 'Est'].map((r, i) => `<div style="padding:8px 14px;${i === 1 ? 'background:#E8F5EC;font-weight:800' : ''}">${r}</div>`).join('')}</div>
${DASHX07('Sud', 2)}${DASHX07('Est', 3)}
<div class="col" style="position:absolute;left:1160px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 ·</b> Ouvrir la liste en J1', 1)}
 ${CARD('<b>2 ·</b> Sud : 14 220 € · 2 ventes ≥ 3 000 € · 5 700 €', 2)}
 ${CARD('<b>3 ·</b> Est : 13 880 € · Logiciel 6 000 €', 3)}
 ${CARD('<b>4 ·</b> CA total inchangé : <b>44 110 €</b> (ne dépend pas de J1)', 4)}
</div>
${TIP('Aucune valeur saisie : <b>uniquement des formules</b> qui pointent vers J1.', { s: 5, kind: 'ok', x: 1160, y: 560, w: 370 })}`,
  n: `<p>Le résultat du lab, en action. Le panneau est entièrement calculé à partir de J1.</p><p><b>Départ — Nord</b> : CA 16 010 €, Logiciel 8 400 €, 3 ventes ≥ 3 000 €, meilleure vente 4 800 €. Par gamme : Logiciel 8 400, Matériel 4 760, Formation 2 850.</p><p><b>Étape 1</b> : on ouvre la liste déroulante.</p><p><b>Étape 2 — Sud</b> : CA 14 220 €, Logiciel 2 400 €, 2 ventes ≥ 3 000 € (3 400 et 5 700), meilleure vente 5 700 €. C'est la vérification de la tâche 6 du lab.</p><p><b>Étape 3 — Est</b> : 13 880 €, Logiciel 6 000 €, 3 ventes ≥ 3 000 €, meilleure vente 6 000 €.</p><p><b>Étape 4</b> : le CA total (SOMMEPROD) ne dépend pas du sélecteur : 44 110 €. Contrôle : 16 010 + 14 220 + 13 880 = 44 110.</p><p><b>Étape 5</b> : c'est la définition d'un tableau de bord : on change une cellule ou les données, jamais les chiffres.</p>` },

/* 20 — PROTÉGER ET VISUALISER */
{ title: 'Protéger et finaliser', html: `${H('Protéger et finaliser', 'Seul le sélecteur reste modifiable')}
${PROC([{ p: 'Clic droit sur J1 > Format de cellule > Protection', t: 'Décocher <b>Verrouillée</b> pour le sélecteur' }, { p: 'Révision > Protéger > Protéger la feuille', t: 'Mot de passe facultatif · formules intouchables' }, { p: 'Accueil > Mise en forme conditionnelle', t: 'Barres de données, icônes sur les KPI' }, { p: 'Affichage > Afficher > Quadrillage', t: 'Décocher : un écran propre, comme une appli' }], { w: 820 })}
${VS({ y: 180, s1: 5, s2: 6, l: { t: 'Copier-coller', c: '#DC2626', ic: '✘', items: ['Chiffres collés chaque mois', 'Erreurs de recopie'] }, r: { t: 'Formules', c: '#16A34A', ic: '✔', items: ['On remplace les données', 'Tout se recalcule'] } }).replace('left:70px;right:70px', 'left:930px;right:70px').replace('grid-template-columns:1fr 1fr', 'grid-template-columns:1fr').replace('gap:30px', 'gap:18px')}`,
  n: `<p>Dernière étape avant diffusion : empêcher les modifications accidentelles.</p><p><b>Étape 1</b> : par défaut toutes les cellules sont « verrouillées », mais ce verrou n'a d'effet qu'une fois la feuille protégée. On <b>déverrouille</b> d'abord la cellule du sélecteur (Format de cellule › Protection).</p><p><b>Étape 2</b> : Révision › <b>Protéger la feuille</b> : les formules ne peuvent plus être effacées. Le mot de passe est facultatif (et il ne s'agit pas d'une sécurité forte).</p><p><b>Étape 3</b> : la visualisation : MFC (barres de données, jeux d'icônes), sparklines, graphiques qui lisent les cellules de calcul.</p><p><b>Étape 4</b> : masquer le quadrillage et les en-têtes donne un rendu d'application.</p><p><b>Étapes 5-6</b> : rappel de la règle d'or : jamais de chiffres collés à la main dans un tableau de bord.</p>` },

/* 21 — RÉCAP */
{ title: 'Récap', cls: 'dark', html: RECAP({ t: 'Ce qu\'il faut retenir', k: 'Récap animé', hub: 'J1', hsub: 'pilote tout', hk: 'MODULE 07',
  items: [{ ic: '🎯', t: '.SI.ENS', d: 'Plage de calcul d\'abord, puis couples (plage ; critère) en ET' }, { ic: '➕', t: 'OU = additionner', d: 'Deux SOMME.SI.ENS, ou des tests additionnés dans SOMMEPROD' }, { ic: '✖️', t: 'SOMMEPROD', d: 'Multiplie terme à terme ; tests VRAI/FAUX → 1/0' }, { ic: '🪜', t: 'Paliers', d: 'SI.CONDITIONS avec VRAI final, ou barème + RECHERCHEX -1' }, { ic: '🎛️', t: 'Tableau de bord', d: 'Données · calculs · affichage ; sélecteur, noms, protection' }] }),
  n: `<p>Cinq points. Faites reformuler : « Pourquoi la plage de somme est-elle en premier ? », « Comment faire un OU ? », « Que se passe-t-il si une région est ajoutée aux données ? » (si le tableau est structuré et la liste dynamique : rien à faire).</p>` },

/* 22 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Clavier')}
${KEYCARDS([{ k: 'Ctrl+F3', d: 'Gestionnaire de noms' }, { k: 'Ctrl+Maj+F3', d: 'Créer des noms depuis la sélection' }, { k: 'F3', d: 'Coller un nom dans la formule' }, { k: 'Alt+Flèche bas', d: 'Ouvrir une liste déroulante' }, { k: 'Ctrl+Maj+U', d: 'Agrandir la barre de formule' }, { k: 'Ctrl+`', d: 'Afficher les formules' }, { k: 'F9', d: 'Évaluer une portion de formule' }], { cols: 4, y: 200 })}
${TIP('<b>Ctrl+`</b> (accent grave) : vérifiez d\'un coup d\'œil qu\'aucun chiffre n\'est saisi en dur dans le tableau de bord.', { s: 8, kind: 'key', x: 70, y: 600, w: 1000 })}`,
  n: `<p>Sept raccourcis. <kbd>Ctrl</kbd>+<kbd>\`</kbd> bascule l'affichage des formules : idéal pour auditer un tableau de bord (toute cellule KPI qui affiche un nombre au lieu d'une formule est suspecte). <kbd>Ctrl</kbd>+<kbd>Maj</kbd>+<kbd>U</kbd> agrandit la barre de formule pour lire une longue SOMMEPROD.</p>` },

/* 23 — LAB */
{ title: 'Lab', html: LAB({ app: 'excel', mod: 'x07', lab: 0, title: 'Lab — Le tableau de bord par région', tasks: ['F2 : <span class="mono">=D2*E2</span>, recopie jusqu\'en F13', 'G2 : <b>SI.CONDITIONS</b> A / B / C, recopie', 'J2 : CA total avec <b>SOMMEPROD</b> (sans la colonne F)', 'J3-J4 : <b>SOMME.SI.ENS</b> région · région + Logiciel', 'J5-J6 : <b>NB.SI.ENS</b> ≥ 3 000 € · <b>MAX.SI.ENS</b>', 'Test : J1 = <b>Sud</b> → tout s\'actualise'] }),
  n: `<p>Résultats attendus : F2 3 600, F7 4 760, F13 950 ; G2 B, G4 C, G5 A ; J2 44 110 € ; Nord : J3 16 010 €, J4 8 400 €, J5 3, J6 4 800 € ; Sud : 14 220 €, 2 400 €, 2, 5 700 €. Dans le vrai Excel, ajouter la liste déroulante en J1.</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quel est l\'ordre des arguments de SOMME.SI.ENS ?', o: ['plage_critère ; critère ; plage_somme', 'plage_somme ; plage_critère1 ; critère1 ; …', 'critère ; plage_somme ; plage_critère', 'plage_somme ; critère1 ; plage_critère1'], a: [1], e: 'Avec .SI.ENS, la plage à additionner vient en premier, suivie des couples (plage ; critère).' },
  { q: 'Que calcule =SOMMEPROD(D2:D4;E2:E4) si D = 2, 3, 1 et E = 10, 20, 5 ?', o: ['41', '85', '6', '35'], a: [1], e: '2×10 + 3×20 + 1×5 = 20 + 60 + 5 = 85.' },
  { q: 'Dans =SI.CONDITIONS(F2>=5000;"A";F2>=3000;"B"), que renvoie Excel si F2 = 1 000 ?', o: ['"B"', '0', '#N/A', 'Une cellule vide'], a: [2], e: 'Aucune condition n\'est vraie et il n\'y a pas de cas par défaut : #N/A. On ajoute VRAI;"C" en dernier couple.' },
  { q: 'Comment additionner le CA des régions Nord OU Est ?', o: ['=SOMME.SI.ENS(F:F;B:B;"Nord";B:B;"Est")', 'Additionner deux SOMME.SI.ENS, une par région', 'Une SOMMEPROD avec des tests additionnés', 'C\'est impossible'], a: [1, 2], e: 'Les critères d\'une même SOMME.SI.ENS sont combinés en ET. Pour un OU : deux formules additionnées, ou SOMMEPROD(((B="Nord")+(B="Est")>0)*F).' },
  { q: 'Quelle est la meilleure pratique pour un tableau de bord mensuel ?', o: ['Coller les chiffres en valeurs chaque mois', 'Des KPI en formules pointant vers les données et un sélecteur', 'Un onglet par mois copié de l\'onglet précédent', 'Saisir les totaux à la main'], a: [1], e: 'Un tableau de bord ne contient que des formules : on met à jour la source, tout se recalcule.' },
] ); }, n: `<p>Réponses : 1) plage_somme d'abord · 2) 85 · 3) #N/A · 4) deux SOMME.SI.ENS ou SOMMEPROD (2 réponses) · 5) formules + sélecteur.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module X07', html: END(), n: `<p>Fin du module 07. Dernier module Excel (X08) : automatiser l'alimentation de ce tableau de bord avec <b>Power Query</b>, les <b>matrices dynamiques</b> et une première <b>macro VBA</b>.</p>` },
] };
