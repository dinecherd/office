/* ===================== MODULE W04 — Tableaux, colonnes, sauts de page, en-têtes et pieds de page ===================== */
const SECSW04 = ['Créer et mettre en forme un tableau', 'Sauts, sections et colonnes', 'En-têtes, pieds de page et numéros'];

/* ---- helpers locaux W04 ---- */
const DLGW04 = o => `<div class="${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.12);font-family:'Segoe UI',sans-serif;${o.s ? '' : `--d:${o.d ?? .2}s`}">
 <div style="display:flex;align-items:center;padding:10px 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#6B7A90">✕</span></div>
 <div style="padding:18px 22px;font-size:18px;color:#1B2A41">${o.html}</div></div>`;
const MENUW04 = o => `<div class="f zoom" data-s="${o.s}" style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w || 380}px;background:#fff;border-radius:10px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;font-size:19px;padding:6px 0">
 ${o.items.map(([t, on]) => `<div style="padding:9px 18px;${on ? 'background:#EFF6FF;font-weight:800;color:#185ABD' : ''}">${t}</div>`).join('')}</div>`;
/* tableau Word (maquette) : rows = [[…], …], o.head = 1re ligne en-tête, o.cls par cellule via fn */
const TBLW04 = (rows, o = {}) => `<table style="border-collapse:collapse;width:100%;font:${o.fs || 18}px Calibri,sans-serif;${o.style || ''}">${rows.map((r, i) => `<tr ${o.rs && o.rs[i] ? `class="f" data-s="${o.rs[i]}"` : ''}>${r.map((c, j) => {
  const h = i === 0 && o.head !== false, st = o.cell ? o.cell(i, j) : '';
  return `<td style="border:1px solid ${o.bc || '#9CA3AF'};padding:7px 10px;${h ? `background:${o.hb || '#185ABD'};color:#fff;font-weight:700;` : (o.band && i % 2 === 0 ? 'background:#EFF6FF;' : '')}${st}">${c}</td>`; }).join('')}</tr>`).join('')}</table>`;
/* mini-page SVG (pour les schémas de pages) */
const MPW04 = (x, y, w, h, o = {}) => `<g ${o.s ? `class="f" data-s="${o.s}"` : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff" stroke="${o.st || '#CBD5E1'}" stroke-width="${o.sw || 2}"/>
 ${o.hdr ? `<text x="${x + w / 2}" y="${y + 22}" text-anchor="middle" font-size="14" font-weight="700" fill="${o.hc || '#6B7A90'}">${o.hdr}</text><line x1="${x + 14}" y1="${y + 30}" x2="${x + w - 14}" y2="${y + 30}" stroke="#CBD5E1" stroke-dasharray="4 4"/>` : ''}
 ${Array.from({ length: o.n ?? 5 }, (_, i) => `<rect x="${x + 18}" y="${y + 46 + i * 22}" width="${(w - 36) * (i % 3 === 2 ? .6 : .9)}" height="9" rx="4" fill="#E2E8F0"/>`).join('')}
 ${o.ftr ? `<line x1="${x + 14}" y1="${y + h - 30}" x2="${x + w - 14}" y2="${y + h - 30}" stroke="#CBD5E1" stroke-dasharray="4 4"/><text x="${x + w / 2}" y="${y + h - 10}" text-anchor="middle" font-size="14" font-weight="700" fill="${o.fc || '#6B7A90'}">${o.ftr}</text>` : ''}${o.extra || ''}</g>`;

window.MODULE = { code: 'W04', title: 'Tableaux, colonnes, sauts de page, en-têtes et pieds de page', short: 'Tableaux et mise en page', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Tableaux et mise en page', html: TITLE({ mod: 'WORD · MODULE 04 · INTERMÉDIAIRE', title: 'Tableaux et <span class="grad">mise en page</span>', sub: '« Des tableaux propres, des sauts maîtrisés, des en-têtes cohérents »', agenda: SECSW04, art: APPART('word') }),
  n: `<p>Module W04, durée indicative <b>55 minutes</b>. On passe de la mise en forme du texte à la mise en page du document : tableaux, sauts, sections, colonnes, en-têtes et pieds de page.</p>
<p>Lab final : le catalogue de formations 2027 d'<b>Atelier Numérique</b>.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Insérer, remplir et mettre en forme un <b>tableau</b> (en-tête, styles, fusion)', '<b>Répéter la ligne d\'en-tête</b> d\'un tableau sur plusieurs pages', 'Maîtriser les <b>sauts</b> de page, de colonne et de <b>section</b>', 'Disposer du texte en <b>colonnes</b>', 'Créer <b>en-tête</b>, <b>pied de page</b> et <b>numéros de page</b>']),
  n: `<p>Cinq objectifs. Fil rouge : on ne « bricole » plus la mise en page (lignes vides, numéros tapés à la main, en-têtes de tableau recopiés) : on utilise les outils dynamiques de Word.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW04, 0), n: `<p>Première partie : les tableaux, de l'insertion à la mise en forme.</p>` },

/* 4 — INSÉRER UN TABLEAU */
{ title: 'Insérer un tableau', html: `${H('Insérer un tableau en survolant la grille', 'Créer', PATH('Insertion > Tableaux > Tableau'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 900, h: 600, title: 'Catalogue_2027.docx', tab: 'Insertion',
  groups: [['Pages', ['📄 Page de garde', '⤓ Saut de page']], ['Tableaux', ['▦ Tableau']], ['Illustrations', ['🖼 Images', '◆ Formes']], ['En-tête et pied', ['▔ En-tête', '▁ Pied de page', '# N° de page']]],
  hot: { 'tab:Insertion': 1, '▦ Tableau': 1 },
  body: PAGE({ inwin: true, w: 600, html: `<h2 style="margin-top:0">Sessions programmées</h2><div class="f" data-s="4">${TBLW04([['Formation', 'Durée', 'Tarif HT'], ['', '', ''], ['', '', ''], ['', '', '']])}</div>` }) })}
<style>.gcW04{fill:#fff;stroke:#94A3B8;stroke-width:1.5;transition:fill .3s}.gcW04.on{fill:#FFD9C9;stroke:#FA582D}</style>
<div class="f zoom" data-s="2" style="position:absolute;left:1010px;top:180px;width:520px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;padding:16px 18px">
 <div style="font-size:19px;font-weight:700;margin-bottom:10px">Tableau 3 × 4</div>
 <svg viewBox="0 0 480 300" style="width:100%">${Array.from({ length: 8 }, (_, r) => Array.from({ length: 10 }, (_, c) => `<rect class="gcW04" ${r < 4 && c < 3 ? 'data-s="3"' : ''} x="${c * 48 + 2}" y="${r * 36 + 2}" width="42" height="30" rx="3"/>`).join('')).join('')}</svg>
 <div style="font-size:18px;line-height:2;border-top:1px solid #EEF0F3;margin-top:8px">▦ Insérer un tableau…<br>✏ Dessiner un tableau<br>⇄ Convertir le texte en tableau…<br>▦ Feuille de calcul Excel</div></div>`,
  n: `<p><b>Étape 1</b> : curseur à l'endroit voulu (dans le lab, à la place de « Insérez le tableau ici. »), puis Insertion › Tableaux › <b>Tableau</b>.</p>
<p><b>Étape 2</b> : une grille apparaît.</p>
<p><b>Étape 3</b> : on la survole : 3 colonnes × 4 lignes. L'aperçu s'affiche en direct dans le document. Clic pour valider.</p>
<p><b>Étape 4</b> : le tableau est inséré, à pleine largeur. Pour saisir des dimensions précises (et choisir l'ajustement automatique au contenu ou à la fenêtre) : <i>Insérer un tableau…</i>.</p>
<p>Les autres options : dessiner, convertir un texte existant (diapo 8), insérer une feuille Excel pour de vrais calculs.</p>` },

/* 5 — REMPLIR AU CLAVIER */
{ title: 'Remplir au clavier', html: `${H('Tab, Tab, Tab… et la ligne s\'ajoute', 'Remplir')}
<style>.ckW04{transition:box-shadow .3s,background .3s}.ckW04.on{box-shadow:inset 0 0 0 3px #FA582D;background:#FFF7F3}</style>
${PAGE({ x: 70, y: 180, w: 820, html: `<h2 style="margin-top:0;font-size:24px">Sessions programmées</h2>${TBLW04([['Formation', 'Durée', 'Tarif HT'], ['Word expert', '2 jours', '790 €'], ['Excel TCD', '1 jour', '420 €'], ['Réseaux sociaux pro', '2 jours', '<span class="ckW04" data-s="3" style="display:block;margin:-7px -10px;padding:7px 10px">690 €</span>']], { fs: 21, cell: (i, j) => '' })}
 <div class="f" data-s="4">${TBLW04([['<span style="color:#FA582D">|</span>', '', '']], { head: false, fs: 21, style: 'margin-top:-1px' })}</div>` })}
<div class="f zoom" data-s="1" style="position:absolute;left:70px;top:500px;width:820px;text-align:center;font:800 24px var(--font);color:#33445E">Word expert <span style="color:#FA582D">→ Tab →</span> 2 jours <span style="color:#FA582D">→ Tab →</span> 790 €</div>
<div class="col" style="position:absolute;left:940px;right:70px;top:190px;gap:16px">
 ${CARD(`${KEYS('Tab')} cellule suivante`, 1)}${CARD(`${KEYS('Maj+Tab')} cellule précédente`, 2)}${CARD(`${KEYS('Tab')} dans la <b>dernière cellule</b>…`, 3)}${CARD('… = <b>nouvelle ligne</b> ajoutée', 4)}${CARD(`Vraie tabulation dans une cellule : ${KEYS('Ctrl+Tab')}`, 5)}</div>`,
  n: `<p><b>Étape 1</b> : on tape « Word expert », <b>Tab</b> → cellule suivante « 2 jours », Tab → « 790 € ». Pas de souris.</p>
<p><b>Étape 2</b> : <b>Maj+Tab</b> revient à la cellule précédente.</p>
<p><b>Étape 3</b> : arrivé dans la <b>dernière cellule</b> du tableau…</p>
<p><b>Étape 4</b> : … <b>Tab</b> ajoute automatiquement une nouvelle ligne. Question 2 du quiz.</p>
<p><b>Étape 5</b> : comme Tab sert à naviguer, pour insérer une vraie tabulation dans une cellule : Ctrl+Tab.</p>
<p>Astuce : survolez la bordure gauche entre deux lignes : un <b>+</b> apparaît pour insérer une ligne à cet endroit (idem en haut entre deux colonnes).</p>` },

/* 6 — L'ONGLET DISPOSITION */
{ title: 'L\'onglet Disposition', html: `${H('Structurer : l\'onglet contextuel Disposition', 'Structure', PATH('Disposition > Lignes et colonnes'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1460, h: 330, title: 'Catalogue_2027.docx', tab: 'Disposition',
  tabs: ['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Références', 'Révision', 'Affichage', 'Création de tableau', 'Disposition'],
  groups: [['Lignes et colonnes', ['⬆ Au-dessus', '⬇ En dessous', '⬅ À gauche', '➡ À droite', '✖ Supprimer']], ['Fusionner', ['⊞ Fusionner', '⊟ Fractionner']], ['Taille de la cellule', ['↔ Ajustement', '⇔ Distribuer']], ['Alignement', ['▣ Aligner', '⟲ Orientation']], ['Données', ['↕ Trier', '🔁 Répéter en-tête', 'fx Formule']]],
  hot: { '⬇ En dessous': 1, '⊞ Fusionner': 2, '↔ Ajustement': 3, '↕ Trier': 4, '🔁 Répéter en-tête': 5 },
  body: PAGE({ inwin: true, w: 700, html: TBLW04([['Formation', 'Durée', 'Tarif HT'], ['Word expert', '2 jours', '790 €']], { fs: 17 }) }) })}
<div style="position:absolute;left:70px;right:70px;top:540px;display:grid;grid-template-columns:repeat(5,1fr);gap:16px">
 ${[['Insérer', 'lignes et colonnes, ou le + sur la bordure'], ['Fusionner', 'plusieurs cellules en une'], ['Ajuster', 'au contenu, à la fenêtre, distribuer'], ['Trier', 'par colonne, croissant ou décroissant'], ['Répéter l\'en-tête', 'sur chaque page (diapo 11)']].map(([t, d], i) => `<div class="card f zoom" data-s="${i + 1}" style="padding:18px"><span class="num-badge or" style="width:38px;height:38px;font-size:18px">${i + 1}</span><div style="font-size:22px;font-weight:800;margin-top:10px">${t}</div><div style="font-size:18px;color:#6B7A90;margin-top:4px">${d}</div></div>`).join('')}</div>`,
  n: `<p>Clic dans le tableau : deux onglets contextuels apparaissent. <b>Disposition</b> gère la <b>structure</b>.</p>
<p><b>Étape 1</b> : <b>Insérer</b> au-dessus / en dessous / à gauche / à droite, et Supprimer (cellules, lignes, colonnes, tableau).</p>
<p><b>Étape 2</b> : <b>Fusionner</b> / <b>Fractionner</b> les cellules (diapo suivante).</p>
<p><b>Étape 3</b> : <b>Ajustement automatique</b> (au contenu, à la fenêtre, largeur fixe) et <b>Distribuer</b> les lignes / colonnes (tailles égales).</p>
<p><b>Étape 4</b> : <b>Trier</b> : par formation, par tarif… sans couper-coller.</p>
<p><b>Étape 5</b> : <b>Répéter les lignes d'en-tête</b> : essentiel pour les tableaux longs. Le groupe Données propose aussi <b>Formule</b> (=SUM(ABOVE)) pour un total simple ; pour de vrais calculs, préférez Excel.</p>` },

/* 7 — FUSIONNER ET FRACTIONNER */
{ title: 'Fusionner les cellules', html: `${H('Fusionner et fractionner des cellules', 'Fusionner · Fractionner')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:680px;padding:24px"><div style="font-size:16px;color:#6B7A90;font-weight:800;margin-bottom:12px">AVANT</div>
 ${TBLW04([['Programme 2027', '', ''], ['Formation', 'Durée', 'Tarif HT'], ['Word expert', '2 jours', '790 €']], { fs: 21, cell: (i, j) => i === 0 ? 'background:#FFF7F3;color:#0E1726;' + (j < 3 ? 'box-shadow:inset 0 0 0 2px #FA582D' : '') : '' })}</div>
<div class="card f right" data-s="2" style="position:absolute;left:850px;top:190px;width:680px;padding:24px"><div style="font-size:16px;color:#16A34A;font-weight:800;margin-bottom:12px">APRÈS FUSION</div>
 <table style="border-collapse:collapse;width:100%;font:21px Calibri,sans-serif"><tr><td colspan="3" style="border:1px solid #9CA3AF;padding:9px;text-align:center;background:#0E1726;color:#fff;font-weight:700">Programme 2027</td></tr>
 <tr>${['Formation', 'Durée', 'Tarif HT'].map(t => `<td style="border:1px solid #9CA3AF;padding:7px 10px;background:#185ABD;color:#fff;font-weight:700">${t}</td>`).join('')}</tr><tr>${['Word expert', '2 jours', '790 €'].map(t => `<td style="border:1px solid #9CA3AF;padding:7px 10px">${t}</td>`).join('')}</tr></table></div>
<div style="position:absolute;left:70px;top:470px;font-size:60px" class="f zoom" data-s="1">➜</div>
${PROC([{ p: 'Sélectionner les cellules à fusionner', t: 'Ici les 3 cellules de la 1ʳᵉ ligne' }, { p: 'Disposition > Fusionner > Fusionner les cellules', t: 'Ou clic droit › Fusionner les cellules' }, { p: 'Disposition > Fusionner > Fractionner les cellules', t: 'L\'inverse : 1 cellule → n colonnes / lignes' }], { x: 160, y: 470, w: 1000 })}`,
  n: `<p><b>Étape 1</b> : on sélectionne les cellules à réunir (ici la ligne de titre du tableau).</p>
<p><b>Étape 2</b> : Disposition › <b>Fusionner les cellules</b> : une seule cellule sur toute la largeur, qu'on peut centrer.</p>
<p><b>Étape 3</b> : <b>Fractionner les cellules</b> fait l'inverse : on indique le nombre de colonnes et de lignes.</p>
<p>Accessibilité : évitez de multiplier les cellules fusionnées au milieu d'un tableau de données : les lecteurs d'écran s'y perdent. Réservez la fusion aux titres.</p>` },

/* 8 — CONVERTIR UN TEXTE EN TABLEAU */
{ title: 'Convertir un texte en tableau', html: `${H('Convertir un texte en tableau', 'Convertir', PATH('Insertion > Tableau > Convertir le texte en tableau'))}
${PAGE({ x: 70, y: 180, w: 640, html: `<div style="font:600 20px/1.9 var(--mono);color:#33445E">Formation;Durée;Tarif HT<br>Word expert;2 jours;790 €<br>Excel TCD;1 jour;420 €<br>Réseaux sociaux;2 jours;690 €</div>` })}
${DLGW04({ x: 750, y: 180, w: 390, t: 'Convertir le texte en tableau', s: 1, html: `<div style="line-height:2">Nombre de colonnes : <b>3</b><br>Séparer le texte au niveau des :<br>○ Paragraphes · ○ Tabulations<br><span style="position:relative">◉ <b>Autre : ;</b><em class="ow-hot f zoom" data-s="2" style="inset:-2px -8px"><b>2</b></em></span></div>` })}
<div class="card f right" data-s="3" style="position:absolute;left:1160px;right:70px;top:180px;padding:20px">${TBLW04([['Formation', 'Durée', 'Tarif'], ['Word expert', '2 j', '790 €'], ['Excel TCD', '1 j', '420 €'], ['Réseaux soc.', '2 j', '690 €']], { fs: 17 })}</div>
${TIP('Pratique pour du texte <b>exporté d\'un logiciel</b> ou collé depuis un e-mail. Sens inverse : Disposition › Convertir en texte.', { s: 4, x: 70, y: 560, w: 1050 })}`,
  n: `<p>Situation fréquente : des données exportées d'un logiciel, séparées par des points-virgules ou des tabulations.</p>
<p><b>Étape 1</b> : on sélectionne les lignes › Insertion › Tableau › <b>Convertir le texte en tableau…</b></p>
<p><b>Étape 2</b> : Word détecte le séparateur ; sinon on choisit <i>Autre</i> et on tape « ; ». Le nombre de colonnes se calcule seul.</p>
<p><b>Étape 3</b> : le tableau est créé ; il reste à appliquer un style.</p>
<p><b>Étape 4</b> : l'opération inverse existe (Disposition › Données › Convertir en texte).</p>` },

/* 9 — TABLEAU OU COLONNES */
{ title: 'Tableau ou colonnes ?', html: `${H('Un tableau pour des données, pas la page', 'Accessibilité')}
${VS({ l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['Tableau <b>sans bordures</b> pour mettre du texte côte à côte', 'Ligne d\'en-tête <b>recopiée</b> en haut de la page 2', 'Cellules fusionnées dans tous les sens', 'Tableau = image collée'] },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['<b>Colonnes</b> de mise en page pour le texte', '<b>Répéter les lignes d\'en-tête</b>', 'Une ligne d\'en-tête claire, données régulières', 'Vrai tableau Word, modifiable et lisible'] }, mid: '➜' })}
<svg viewBox="0 0 1460 200" class="f" data-s="3" style="position:absolute;left:70px;top:600px;width:1460px;height:200px">
 <rect x="0" y="10" width="700" height="180" rx="14" fill="#FEF2F2" stroke="#DC2626" stroke-width="2" stroke-dasharray="8 6"/>
 <text x="30" y="60" font-size="22" font-weight="800" fill="#7F1D1D">🔊 Lecteur d'écran :</text><text x="30" y="100" font-size="20" fill="#7F1D1D">« Tableau, ligne 1, colonne 1 : Depuis 2012…</text><text x="30" y="135" font-size="20" fill="#7F1D1D">ligne 1, colonne 2 : Nos parcours couvrent… »</text>
 <rect x="760" y="10" width="700" height="180" rx="14" fill="#ECFDF3" stroke="#16A34A" stroke-width="2" stroke-dasharray="8 6"/>
 <text x="790" y="60" font-size="22" font-weight="800" fill="#14532D">🔊 Avec des colonnes :</text><text x="790" y="100" font-size="20" fill="#14532D">lecture naturelle, paragraphe après paragraphe,</text><text x="790" y="135" font-size="20" fill="#14532D">et le texte s'écoule seul d'une colonne à l'autre</text>
</svg>`,
  n: `<p><b>Étape 1</b> : les mauvaises pratiques : un tableau invisible pour placer deux blocs de texte côte à côte ; l'en-tête recopié à la main en page 2 (au moindre ajout de ligne, il se retrouve au milieu du tableau) ; un tableau collé comme image (impossible à modifier, illisible pour un lecteur d'écran).</p>
<p><b>Étape 2</b> : les bonnes : colonnes de mise en page (section 2), répétition dynamique de l'en-tête (diapo 11).</p>
<p><b>Étape 3</b> : ce qu'entend une personne aveugle avec un tableau de mise en page : une lecture cellule par cellule, hachée. Avec des colonnes, la lecture est naturelle.</p>` },

/* 10 — STYLES DE TABLEAU */
{ title: 'Styles de tableau', html: `${H('Un style de tableau en un clic', 'Mettre en forme', PATH('Création de tableau > Styles de tableau'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1460, h: 210, title: 'Catalogue_2027.docx', tab: 'Création de tableau',
  tabs: ['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Références', 'Révision', 'Affichage', 'Création de tableau', 'Disposition'],
  groups: [['Options de style de tableau', ['☑ Ligne d\'en-tête', '☐ Ligne Total', '☑ Lignes à bandes', '☑ Première colonne']], ['Styles de tableau', ['▦', '▦ ', '▦  ', '▦   ', '▾']], ['Bordures', ['🪣 Trame', '▢ Bordures']]],
  hot: { '▦ ': 1, '☑ Ligne d\'en-tête': 2, '☑ Lignes à bandes': 3, '☑ Première colonne': 3 }, body: '' })}
<div class="card a pop" style="--d:.3s;position:absolute;left:70px;top:420px;width:680px;padding:22px"><div style="font-size:16px;color:#6B7A90;font-weight:800;margin-bottom:10px">TABLEAU BRUT</div>
 ${TBLW04([['Formation', 'Durée', 'Tarif HT'], ['Word expert', '2 jours', '790 €'], ['Excel TCD', '1 jour', '420 €'], ['Réseaux sociaux pro', '2 jours', '690 €']], { fs: 20, head: false })}</div>
<div class="card f right" data-s="1" style="position:absolute;left:850px;top:420px;width:680px;padding:22px"><div style="font-size:16px;color:#16A34A;font-weight:800;margin-bottom:10px">STYLE « TABLEAU GRILLE 4 – ACCENTUATION 1 »</div>
 ${TBLW04([['Formation', 'Durée', 'Tarif HT'], ['Word expert', '2 jours', '790 €'], ['Excel TCD', '1 jour', '420 €'], ['Réseaux sociaux pro', '2 jours', '690 €']], { fs: 20, band: true, bc: '#93C5FD', cell: (i, j) => j === 0 && i > 0 ? 'font-weight:700' : '' })}</div>`,
  n: `<p>Clic dans le tableau › onglet contextuel <b>Création de tableau</b>.</p>
<p><b>Étape 1</b> : la galerie <b>Styles de tableau</b> applique bordures, trames et couleurs d'un coup (couleurs du thème du document).</p>
<p><b>Étape 2</b> : les cases <b>Options de style de tableau</b> : <i>Ligne d'en-tête</i> met en valeur la première ligne.</p>
<p><b>Étape 3</b> : <i>Lignes à bandes</i> alterne les couleurs (lisibilité des longues lignes), <i>Première colonne</i> en gras. <i>Ligne Total</i> pour une ligne de total.</p>
<p>Dans le lab : la ligne d'en-tête doit être en gras (Ctrl+G), et dans le vrai Word cochez Ligne d'en-tête.</p>` },

/* 11 — RÉPÉTER LA LIGNE D'EN-TÊTE */
{ title: 'Répéter la ligne d\'en-tête', html: `${H('La ligne d\'en-tête sur chaque page', 'Tableaux longs', PATH('Disposition > Données > Répéter les lignes d\'en-tête'))}
<svg viewBox="0 0 900 620" style="position:absolute;left:50px;top:180px;width:810px;height:558px">
 ${[0, 1].map(p => `<g class="a pop" style="--d:${.1 + p * .15}s"><rect x="${30 + p * 450}" y="10" width="400" height="580" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><text x="${230 + p * 450}" y="580" text-anchor="middle" font-size="16" fill="#94A3B8">page ${p + 1}</text></g>`).join('')}
 <rect x="60" y="60" width="340" height="40" fill="#185ABD"/><text x="80" y="87" font-size="19" font-weight="800" fill="#fff">Formation · Durée · Tarif</text>
 ${Array.from({ length: 11 }, (_, i) => `<rect x="60" y="${100 + i * 40}" width="340" height="40" fill="${i % 2 ? '#fff' : '#EFF6FF'}" stroke="#CBD5E1"/>`).join('')}
 ${Array.from({ length: 7 }, (_, i) => `<rect x="510" y="${100 + i * 40}" width="340" height="40" fill="${i % 2 ? '#EFF6FF' : '#fff'}" stroke="#CBD5E1"/>`).join('')}
 <g class="f" data-s="1"><rect x="510" y="60" width="340" height="40" fill="#FEE2E2" stroke="#DC2626" stroke-width="2" stroke-dasharray="6 5"/><text x="680" y="87" text-anchor="middle" font-size="18" font-weight="800" fill="#DC2626">? quelle colonne ?</text></g>
 <g class="f" data-s="3"><rect x="510" y="60" width="340" height="40" fill="#185ABD"/><text x="530" y="87" font-size="19" font-weight="800" fill="#fff">Formation · Durée · Tarif</text>
  <path d="M400 80 C 440 30, 470 30, 505 75" fill="none" stroke="#16A34A" stroke-width="4" class="draw" pathLength="1"/><text x="455" y="40" text-anchor="middle" font-size="18" font-weight="800" fill="#16A34A">auto</text></g>
</svg>
${PROC([{ p: 'Sélectionner la 1ʳᵉ ligne du tableau', t: 'ou y placer le curseur' }, { p: 'Disposition > Données > Répéter les lignes d\'en-tête', t: 'Bascule activée / désactivée' }], { x: 900, y: 190, w: 630, s0: 2 })}
${TIP('Ne recopiez jamais l\'en-tête à la main : il finira <b>au milieu</b> du tableau.', { s: 4, x: 900, y: 460, w: 630, kind: 'warn' })}
${TIP('Propriétés du tableau › Ligne : décocher <b>Autoriser le fractionnement des lignes</b>.', { s: 5, x: 900, y: 600, w: 630, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : un tableau sur deux pages : en page 2, le lecteur ne sait plus à quoi correspondent les colonnes.</p>
<p><b>Étape 2</b> : on place le curseur dans la première ligne (ou on la sélectionne).</p>
<p><b>Étape 3</b> : Disposition › Données › <b>Répéter les lignes d'en-tête</b> : la ligne réapparaît automatiquement en haut de chaque page. Elle est dynamique : ajout de lignes, changement de police, tout suit. Elle signale aussi aux technologies d'assistance la ligne d'en-têtes. Question 1 du quiz.</p>
<p><b>Étape 4</b> : piège : la recopie manuelle.</p>
<p><b>Étape 5</b> : bonus : Propriétés du tableau › Ligne › décocher <i>Autoriser le fractionnement des lignes sur plusieurs pages</i> : une ligne haute n'est jamais coupée en deux.</p>` },

/* 12 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW04, 1), n: `<p>Deuxième partie : les sauts — de page, de colonne et surtout de section — et les colonnes.</p>` },

/* 13 — LES SAUTS */
{ title: 'Les quatre sauts', html: `${H('Quatre sauts, quatre effets', 'Sauts', PATH('Mise en page > Sauts de page'))}
<svg viewBox="0 0 1460 560" style="position:absolute;left:70px;top:180px;width:1460px;height:560px">
 ${[['Page', 'Ctrl+Entrée', 'nouvelle page', '#185ABD', 1], ['Colonne', 'Ctrl+Maj+Entrée', 'colonne suivante', '#7C3AED', 2], ['Section · page suivante', 'Mise en page › Sauts', 'nouvelle section, nouvelle page', '#FA582D', 3], ['Section · continu', 'Mise en page › Sauts', 'nouvelle section, même page', '#16A34A', 4]].map(([t, k, d, c, s], i) => {
   const x = i * 370;
   const art = i === 0 ? `${MPW04(x + 40, 150, 130, 180, { n: 3 })}${MPW04(x + 190, 150, 130, 180, { n: 5 })}<path d="M${x + 40} 260 h130" stroke="${c}" stroke-width="3" stroke-dasharray="6 5"/>`
     : i === 1 ? `<rect x="${x + 60}" y="150" width="240" height="260" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>${Array.from({ length: 4 }, (_, j) => `<rect x="${x + 80}" y="${170 + j * 22}" width="90" height="9" rx="4" fill="#E2E8F0"/>`).join('')}<path d="M${x + 80} 270 h90" stroke="${c}" stroke-width="3" stroke-dasharray="6 5"/>${Array.from({ length: 8 }, (_, j) => `<rect x="${x + 190}" y="${170 + j * 22}" width="90" height="9" rx="4" fill="#E2E8F0"/>`).join('')}`
     : i === 2 ? `${MPW04(x + 40, 150, 130, 180, { n: 4 })}<rect x="${x + 185}" y="170" width="150" height="115" rx="6" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${x + 260}" y="234" text-anchor="middle" font-size="16" font-weight="800" fill="${c}">paysage</text>`
     : `<rect x="${x + 60}" y="150" width="240" height="260" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>${Array.from({ length: 3 }, (_, j) => `<rect x="${x + 80}" y="${170 + j * 22}" width="200" height="9" rx="4" fill="#E2E8F0"/>`).join('')}<path d="M${x + 70} 250 h220" stroke="${c}" stroke-width="3" stroke-dasharray="6 5"/>${Array.from({ length: 5 }, (_, j) => `<rect x="${x + 80}" y="${270 + j * 22}" width="90" height="9" rx="4" fill="#E2E8F0"/><rect x="${x + 190}" y="${270 + j * 22}" width="90" height="9" rx="4" fill="#E2E8F0"/>`).join('')}`;
   return `<g class="f" data-s="${s}"><rect x="${x}" y="0" width="350" height="540" rx="20" fill="#fff" stroke="${c}" stroke-width="2.5"/><rect x="${x}" y="0" width="350" height="10" rx="5" fill="${c}"/>
   <text x="${x + 175}" y="56" text-anchor="middle" font-size="25" font-weight="900" fill="${c}">${t}</text><text x="${x + 175}" y="92" text-anchor="middle" font-size="19" font-weight="700" fill="#33445E" font-family="var(--mono)">${k}</text>
   ${art}<text x="${x + 175}" y="470" text-anchor="middle" font-size="20" font-weight="700" fill="#0E1726">${d}</text></g>`; }).join('')}
</svg>`,
  n: `<p>Mise en page › <b>Sauts de page</b> liste tous les sauts.</p>
<p><b>Étape 1</b> : <b>saut de page</b> (Ctrl+Entrée) : le texte suivant commence sur une nouvelle page. Dans le lab : avant « Conditions générales ».</p>
<p><b>Étape 2</b> : <b>saut de colonne</b> (Ctrl+Maj+Entrée) : dans un texte en colonnes, passe en haut de la colonne suivante. Question 5 du quiz.</p>
<p><b>Étape 3</b> : <b>saut de section – page suivante</b> : nouvelle section sur une nouvelle page. Une section peut avoir sa propre orientation, ses marges, ses en-têtes. Exemple : une page en paysage pour un grand tableau.</p>
<p><b>Étape 4</b> : <b>saut de section – continu</b> : nouvelle section sur la même page, typiquement pour passer d'une à deux colonnes au milieu d'une page.</p>` },

/* 14 — SAUT DE PAGE VS LIGNES VIDES */
{ title: 'Voir et supprimer un saut', html: `${H('Voir et supprimer un saut de page', 'Saut de page')}
${PAGE({ x: 70, y: 180, w: 700, html: `<h2 style="margin-top:0;font-size:22px">Sessions programmées</h2>${TBLW04([['Formation', 'Durée', 'Tarif HT'], ['Word expert', '2 jours', '790 €']], { fs: 17 })}
 <div class="f" data-s="1" style="margin:22px 0;display:flex;align-items:center;gap:8px;color:#2563EB;font:16px Calibri,sans-serif"><span style="flex:1;border-top:2px dotted #2563EB"></span>Saut de page<span style="flex:1;border-top:2px dotted #2563EB"></span></div>
 <h2 style="font-size:22px">Conditions générales</h2>${LINES(2)}` })}
<div class="col" style="position:absolute;left:830px;right:70px;top:190px;gap:16px">
 ${CARD(`<b>Insérer</b> : curseur avant le titre, ${KEYS('Ctrl+Entrée')}`, 1)}${CARD('<b>Voir</b> : Afficher tout (¶) — le saut apparaît en pointillés', 2)}${CARD('<b>Supprimer</b> : clic juste avant le saut, <b>Suppr</b>', 3)}</div>
${TIP('Mieux encore pour des chapitres : style Titre 1 › Format › Paragraphe › Enchaînements › <b>Saut de page avant</b>.', { s: 4, x: 830, y: 520, w: 700, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : le saut de page dans le lab : curseur au début de « Conditions générales », Ctrl+Entrée. Il ne bougera jamais, contrairement à une série de lignes vides.</p>
<p><b>Étape 2</b> : comme toutes les marques, le saut n'est visible qu'avec ¶ : « ……Saut de page…… ».</p>
<p><b>Étape 3</b> : pour le supprimer, on le sélectionne (ou on clique juste avant) et on appuie sur Suppr. Même méthode pour un saut de section.</p>
<p><b>Étape 4</b> : pour un rapport, intégrez le saut dans le style Titre 1 (vu en W03) : aucun saut manuel à gérer.</p>` },

/* 15 — LES SECTIONS */
{ title: 'Les sections', html: `${H('Une section = sa propre mise en page', 'Sauts de section')}
<svg viewBox="0 0 1460 420" style="position:absolute;left:70px;top:175px;width:1460px;height:420px">
 ${MPW04(20, 60, 220, 300, { hdr: 'Rapport 2026', n: 9 })}${MPW04(280, 60, 220, 300, { hdr: 'Rapport 2026', n: 9 })}
 <g class="f" data-s="1"><line x1="520" y1="40" x2="520" y2="380" stroke="#FA582D" stroke-width="4" stroke-dasharray="8 6"/><text x="520" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#FA582D">saut de section</text></g>
 ${MPW04(540, 110, 400, 250, { hdr: 'Annexe A — Tableau des tarifs', n: 7, st: '#FA582D', sw: 3, hc: '#FA582D', s: 2 })}
 <g class="f" data-s="1"><line x1="960" y1="40" x2="960" y2="380" stroke="#FA582D" stroke-width="4" stroke-dasharray="8 6"/><text x="960" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#FA582D">saut de section</text></g>
 ${MPW04(980, 60, 220, 300, { hdr: 'Rapport 2026', n: 9, s: 3 })}${MPW04(1230, 60, 220, 300, { hdr: 'Rapport 2026', n: 9, s: 3 })}
 <g class="f" data-s="4">${[['Section 1', 260, '#185ABD'], ['Section 2', 740, '#FA582D'], ['Section 3', 1215, '#185ABD']].map(([t, x, c]) => `<rect x="${x - 70}" y="380" width="140" height="34" rx="17" fill="${c}"/><text x="${x}" y="403" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">${t}</text>`).join('')}</g>
</svg>
<div style="position:absolute;left:70px;right:70px;top:630px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
 ${['Orientation', 'Marges', 'Colonnes', 'En-têtes / pieds'].map((t, i) => `<div class="card f zoom" data-s="${i + 2}" style="padding:16px 20px;font-size:22px;font-weight:800;text-align:center">${['🔄', '📏', '▥', '▔'][i]} ${t}</div>`).join('')}</div>`,
  n: `<p>Le cas d'école : un rapport en portrait avec une annexe en <b>paysage</b> pour un grand tableau.</p>
<p><b>Étape 1</b> : on insère un saut de section <b>page suivante</b> avant et après l'annexe (Mise en page › Sauts de page › Page suivante).</p>
<p><b>Étape 2</b> : curseur dans l'annexe › Mise en page › Orientation › <b>Paysage</b> : seule cette section change.</p>
<p><b>Étape 3</b> : les sections avant et après restent en portrait. Question 3 du quiz : un simple saut de page ne suffit pas.</p>
<p><b>Étape 4</b> : chaque section possède ses propres réglages : orientation, marges, colonnes, en-têtes et pieds de page, numérotation. On y reviendra avec « Lier au précédent ».</p>` },

/* 16 — COLONNES */
{ title: 'Les colonnes', html: `${H('Du texte sur deux colonnes', 'Colonnes', PATH('Mise en page > Colonnes > Deux'))}
${PAGE({ x: 70, y: 180, w: 560, html: `<h2 style="margin-top:0;font-size:22px">Catalogue 2027</h2><p style="font-size:15px;text-align:justify">Depuis 2012, Atelier Numérique accompagne les PME de la région dans la montée en compétences de leurs équipes. Nos formations courtes, en présentiel ou à distance, sont animées par des formateurs certifiés et finançables par votre OPCO.</p>` })}
<div class="f right" data-s="1" style="position:absolute;left:680px;top:180px;width:560px;background:#fff;border-radius:4px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45);padding:56px 64px;font-family:Calibri,sans-serif;color:#1F2937">
 <h2 style="font-size:22px;color:#2F5496;font-weight:600;margin:0 0 10px">Catalogue 2027</h2>
 <div style="column-count:2;column-gap:30px;column-rule:2px solid #CBD5E1;font-size:15px;line-height:1.55;text-align:justify" class="crW04">Depuis 2012, Atelier Numérique accompagne les PME de la région dans la montée en compétences de leurs équipes. Nos formations courtes, en présentiel ou à distance, sont animées par des formateurs certifiés et finançables par votre OPCO.</div></div>
${DLGW04({ x: 1280, y: 180, w: 250, t: 'Colonnes', s: 2, html: `<div style="font-size:17px;line-height:2">▥ Deux<br>Espacement : 1,25 cm<br><span style="position:relative">☑ Ligne séparatrice<em class="ow-hot f zoom" data-s="3" style="inset:-3px -6px"><b>3</b></em></span><br>Appliquer à : <b>Texte sélectionné</b></div>` })}
${TIP('Texte sélectionné d\'abord ? Word insère seul des <b>sauts de section continus</b> autour.', { s: 4, x: 70, y: 600, w: 1170, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : Mise en page › <b>Colonnes</b> › Deux : le texte s'écoule automatiquement d'une colonne à l'autre (justifié, c'est plus net). Dans le lab, tout le texte passe sur 2 colonnes.</p>
<p><b>Étape 2</b> : <b>Autres colonnes…</b> : nombre, largeur, espacement…</p>
<p><b>Étape 3</b> : … et la <b>ligne séparatrice</b> verticale.</p>
<p><b>Étape 4</b> : si on sélectionne d'abord un passage, Word l'isole dans une section avec des sauts de section <b>continus</b> : le titre reste sur une colonne, le texte passe sur deux. Pour équilibrer la fin d'une colonne : saut de colonne (Ctrl+Maj+Entrée) ou saut de section continu en fin de texte.</p>` },

/* 17 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW04, 2), n: `<p>Troisième partie : en-têtes, pieds de page et numéros de page.</p>` },

/* 18 — EN-TÊTE ET PIED DE PAGE */
{ title: 'En-tête et pied de page', html: `${H('Double-clic dans la marge du haut', 'En-tête et pied de page', PATH('Insertion > En-tête > Modifier l\'en-tête'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1000, h: 620, title: 'Catalogue_2027.docx', tab: 'En-tête et pied de page',
  tabs: ['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Références', 'Révision', 'Affichage', 'En-tête et pied de page'],
  groups: [['En-tête et pied', ['▔ En-tête', '▁ Pied de page', '# N° de page']], ['Insérer', ['📅 Date', '🖼 Images']], ['Navigation', ['↧ Atteindre le pied', '🔗 Lier au précédent']], ['Options', ['☐ 1ʳᵉ page différente']], ['Fermer', ['✖ Fermer']]],
  hot: { 'tab:En-tête et pied de page': 2, '↧ Atteindre le pied': 4, '✖ Fermer': 5 },
  body: `<div style="position:relative;width:640px;margin:18px auto;background:#fff;box-shadow:0 10px 30px -15px rgba(14,23,38,.4);padding:20px 50px 30px;font-family:Calibri,sans-serif">
   <div style="position:relative;border-bottom:2px dashed #185ABD;padding:8px 0 10px;font-size:17px;color:#185ABD;min-height:40px"><span style="position:absolute;left:-46px;top:-14px;background:#185ABD;color:#fff;font:700 12px var(--font);padding:2px 8px;border-radius:4px">En-tête</span><span class="f zoom" data-s="1" style="position:absolute;right:20px;top:-8px;font-size:30px">🖱️</span><b class="tw f" data-s="3" style="--n:34;border-right-color:#185ABD">Atelier Numérique — Catalogue 2027</b></div>
   <div style="opacity:.45;padding:20px 0">${LINES(5)}</div>
   <div style="position:relative;border-top:2px dashed #185ABD;padding:10px 0 4px;font-size:17px;color:#185ABD;min-height:40px"><span style="position:absolute;left:-46px;top:-14px;background:#185ABD;color:#fff;font:700 12px var(--font);padding:2px 8px;border-radius:4px">Pied</span><b class="tw f" data-s="4" style="--n:28;border-right-color:#185ABD">contact@atelier-numerique.fr</b></div></div>` })}
<div class="col" style="position:absolute;left:1110px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Double-clic</b> dans la marge haute (ou basse)', 1)}${CARD('<b>2 ·</b> Onglet contextuel <b>En-tête et pied de page</b>', 2)}${CARD('<b>3 ·</b> Saisir l\'en-tête : il se répète sur toutes les pages', 3)}${CARD('<b>4 ·</b> Atteindre le pied de page', 4)}${CARD('<b>5 ·</b> Fermer : <b>double-clic dans le texte</b>', 5)}</div>`,
  n: `<p><b>Étape 1</b> : le plus rapide : <b>double-clic</b> dans la marge du haut de n'importe quelle page. (Ou Insertion › En-tête › Modifier l'en-tête, ou choisir un modèle de la galerie.)</p>
<p><b>Étape 2</b> : l'onglet contextuel <b>En-tête et pied de page</b> apparaît ; le corps du texte est grisé.</p>
<p><b>Étape 3</b> : on tape « Atelier Numérique — Catalogue 2027 » : il s'affiche sur toutes les pages (de la section).</p>
<p><b>Étape 4</b> : <b>Atteindre le pied de page</b> (ou double-clic dans la marge basse) : l'e-mail de contact du lab.</p>
<p><b>Étape 5</b> : pour revenir : double-clic dans le corps du texte, ou <b>Fermer l'en-tête et le pied de page</b>.</p>` },

/* 19 — NUMÉRO DE PAGE */
{ title: 'Numéros de page', html: `${H('Insérer des numéros de page', 'Numérotation', PATH('En-tête et pied de page > Numéro de page > Bas de page'))}
${MENUW04({ s: 1, x: 70, y: 185, w: 420, items: [['Haut de page ›'], ['Bas de page ›', 1], ['Marges de la page ›'], ['Position actuelle ›'], ['Format des numéros de page…'], ['Supprimer les numéros de page']] })}
<div class="f zoom" data-s="2" style="position:absolute;left:520px;top:185px;width:420px;background:#fff;border-radius:12px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;padding:14px">
 ${[['Numéro normal 1', 'left'], ['Numéro normal 2', 'center'], ['Numéro normal 3', 'right'], ['Page X sur Y', 'center']].map(([t, a], i) => `<div style="padding:10px 14px;border-radius:8px;margin-bottom:8px;${i === 1 ? 'box-shadow:0 0 0 3px #FA582D;background:#FFF7F3' : 'box-shadow:0 0 0 1px #E3E8EF'}"><div style="font-size:17px;font-weight:700">${t}</div><div style="text-align:${a};font-size:16px;color:#185ABD;border-top:1px dashed #CBD5E1;margin-top:6px;padding-top:4px">${i === 3 ? 'Page 1 sur 5' : '1'}</div></div>`).join('')}</div>
<svg viewBox="0 0 560 360" class="f" data-s="3" style="position:absolute;left:970px;top:185px;width:560px;height:360px">
 ${[0, 1, 2].map(i => MPW04(10 + i * 185, 20, 170, 300, { n: 7, ftr: `Page ${i + 1} sur 3`, fc: '#185ABD' })).join('')}
</svg>
<div class="f" data-s="4" style="position:absolute;left:970px;top:580px;width:560px;display:flex;gap:12px;flex-wrap:wrap"><span class="chip dark" style="font-size:19px">{ PAGE }</span><span class="chip dark" style="font-size:19px">{ NUMPAGES }</span><span style="font-size:20px">des <b>champs</b> recalculés sur chaque page</span></div>`,
  n: `<p><b>Étape 1</b> : dans l'onglet En-tête et pied de page (ou Insertion) › <b>Numéro de page</b> › <b>Bas de page</b>.</p>
<p><b>Étape 2</b> : choisir un modèle : <i>Numéro normal 2</i> (centré) est le plus courant ; <i>Page X sur Y</i> affiche « Page 2 sur 5 ».</p>
<p><b>Étape 3</b> : chaque page affiche son propre numéro.</p>
<p><b>Étape 4</b> : ce sont des <b>champs</b> (PAGE et NUMPAGES) : Word les recalcule. Alt+F9 montre les codes de champ, à titre de curiosité.</p>` },

/* 20 — OPTIONS DE NUMÉROTATION */
{ title: 'Options d\'en-tête et de numérotation', html: `${H('Page de garde, recto verso, chiffres romains', 'Options')}
<svg viewBox="0 0 760 360" style="position:absolute;left:70px;top:180px;width:760px;height:360px">
 ${MPW04(10, 20, 170, 300, { n: 0, s: 1, st: '#FA582D', sw: 3, extra: `<text x="95" y="150" text-anchor="middle" font-size="22" font-weight="900" fill="#185ABD">Catalogue</text><text x="95" y="180" text-anchor="middle" font-size="22" font-weight="900" fill="#185ABD">2027</text><text x="95" y="300" text-anchor="middle" font-size="14" fill="#DC2626">aucun en-tête</text>` })}
 ${MPW04(200, 20, 170, 300, { hdr: 'Catalogue 2027', n: 9, ftr: 'i', s: 3 })}${MPW04(390, 20, 170, 300, { hdr: 'Catalogue 2027', n: 9, ftr: '1', s: 4, fc: '#16A34A' })}${MPW04(580, 20, 170, 300, { hdr: 'Catalogue 2027', n: 9, ftr: '2', s: 4, fc: '#16A34A' })}
 <g class="f" data-s="3"><text x="285" y="350" text-anchor="middle" font-size="16" font-weight="700" fill="#7C3AED">sommaire : i, ii</text></g><g class="f" data-s="4"><text x="570" y="350" text-anchor="middle" font-size="16" font-weight="700" fill="#16A34A">corps : à partir de 1</text></g>
</svg>
<div class="col" style="position:absolute;left:880px;right:70px;top:190px;gap:16px">
 ${CARD('<b>☑ Première page différente</b> — rien sur la page de garde', 1)}${CARD('<b>☑ Pages paires et impaires différentes</b> — numéros à l\'extérieur en recto verso', 2)}
 ${CARD('<b>Format des numéros</b> — i, ii, iii pour le sommaire', 3)}${CARD('<b>À partir de : 1</b> — le corps du texte recommence à 1 (nouvelle section)', 4)}</div>`,
  n: `<p>Dans l'onglet En-tête et pied de page, groupe <b>Options</b>.</p>
<p><b>Étape 1</b> : <b>Première page différente</b> : la page de garde n'a ni en-tête ni numéro.</p>
<p><b>Étape 2</b> : <b>Pages paires et impaires différentes</b> : pour un document imprimé en recto verso et relié, numéro à droite sur les pages impaires, à gauche sur les paires.</p>
<p><b>Étape 3</b> : Numéro de page › <b>Format des numéros de page…</b> : chiffres romains pour les pages liminaires (sommaire).</p>
<p><b>Étape 4</b> : <b>À partir de</b> 1 : le corps du rapport recommence à 1. Cela suppose un saut de section entre le sommaire et le corps (diapo suivante).</p>` },

/* 21 — LIER AU PRÉCÉDENT */
{ title: 'Lier au précédent', html: `${H('Un en-tête différent par chapitre', 'Lier au précédent')}
${FLOW({ x: 70, y: 165, w: 860, h: 480,
  n: { a: { x: 170, y: 220, pw: 220, ph: 300, html: `<text x="170" y="110" text-anchor="middle" font-size="18" font-weight="800" fill="#185ABD">Chapitre 1</text><line x1="75" y1="122" x2="265" y2="122" stroke="#CBD5E1" stroke-dasharray="4 4"/>${Array.from({ length: 7 }, (_, i) => `<rect x="80" y="${150 + i * 26}" width="${i % 3 === 2 ? 110 : 180}" height="10" rx="5" fill="#E2E8F0"/>`).join('')}`, l: 'Section 1' },
    b: { x: 690, y: 220, pw: 220, ph: 300, html: `<text x="690" y="110" text-anchor="middle" font-size="18" font-weight="800" fill="#185ABD" class="h1W04">Chapitre 1</text><text x="690" y="110" text-anchor="middle" font-size="18" font-weight="800" fill="#16A34A" class="f" data-s="4" style="paint-order:stroke;stroke:#fff;stroke-width:14px">Chapitre 2</text><line x1="595" y1="122" x2="785" y2="122" stroke="#CBD5E1" stroke-dasharray="4 4"/>${Array.from({ length: 7 }, (_, i) => `<rect x="600" y="${150 + i * 26}" width="${i % 3 === 2 ? 110 : 180}" height="10" rx="5" fill="#E2E8F0"/>`).join('')}`, l: 'Section 2', s: 1 } },
  l: [{ a: 'a', b: 'b', s: 1, lab: 'saut de section', lx: 430, ly: 270, dash: true }],
  svg: `<g class="f" data-s="2"><path d="M290 110 C 400 30, 460 30, 570 110" fill="none" stroke="#DC2626" stroke-width="4" class="draw" pathLength="1"/><text x="430" y="12" text-anchor="middle" font-size="22" font-weight="800" fill="#DC2626">🔗 Lier au précédent : actif</text></g>
   <g class="f" data-s="3"><circle cx="430" cy="62" r="26" fill="#fff" stroke="#16A34A" stroke-width="4"/><path d="M416 48 l28 28 M444 48 l-28 28" stroke="#16A34A" stroke-width="5" stroke-linecap="round"/></g>` })}
${PROC([{ p: 'Mise en page > Sauts > Page suivante', t: 'Créer la section 2' }, { p: 'Double-clic dans l\'en-tête', t: 'Section 2 : « Identique au précédent »' }, { p: 'Navigation > Lier au précédent', t: 'Le désactiver <b>avant</b> de taper' }, { p: 'Saisir « Chapitre 2 »', t: 'Le chapitre 1 reste intact' }], { x: 960, y: 180, w: 570 })}`,
  n: `<p>Le piège n° 1 des en-têtes. Objectif : « Chapitre 1 » en haut des pages du chapitre 1, « Chapitre 2 » pour le chapitre 2.</p>
<p><b>Étape 1</b> : on insère un <b>saut de section – page suivante</b> entre les chapitres.</p>
<p><b>Étape 2</b> : par défaut, l'en-tête de la section 2 est <b>lié au précédent</b> (étiquette « Identique au précédent ») : si on le modifie, le chapitre 1 change aussi ! Question 4 du quiz.</p>
<p><b>Étape 3</b> : dans l'en-tête de la section 2, on désactive <b>Lier au précédent</b> (groupe Navigation) <i>avant</i> de modifier le texte.</p>
<p><b>Étape 4</b> : on tape « Chapitre 2 » : le chapitre 1 reste intact. À refaire séparément pour le pied de page si besoin (en-tête et pied ont chacun leur lien).</p>` },

/* 22 — NUMÉRO TAPÉ À LA MAIN */
{ title: 'Le numéro tapé à la main', html: `${H('Jamais de numéro de page tapé à la main', 'Erreur fréquente')}
<svg viewBox="0 0 1460 330" style="position:absolute;left:70px;top:175px;width:1460px;height:330px">
 <g class="f" data-s="1"><text x="20" y="24" font-size="20" font-weight="800" fill="#DC2626">✘ « 1 » tapé dans le pied de page</text>${[0, 1, 2].map(i => MPW04(20 + i * 220, 40, 190, 270, { n: 7, ftr: '1', fc: '#DC2626' })).join('')}</g>
 <g class="f" data-s="2"><text x="780" y="24" font-size="20" font-weight="800" fill="#16A34A">✔ Numéro de page (champ)</text>${[0, 1, 2].map(i => MPW04(780 + i * 220, 40, 190, 270, { n: 7, ftr: `${i + 1}`, fc: '#16A34A' })).join('')}</g>
</svg>
${VS({ y: 540, s1: 3, s2: 4, l: { t: 'Le bricolage', c: '#DC2626', ic: '✘', items: ['Numéro tapé · en-tête de tableau recopié', 'Lignes vides pour changer de page'] }, r: { t: 'Les outils dynamiques', c: '#16A34A', ic: '✔', items: ['Numéro de page · Répéter l\'en-tête', 'Saut de page · saut de section'] } })}`,
  n: `<p><b>Étape 1</b> : on tape « 1 » dans le pied de page : comme le pied de page se répète, toutes les pages affichent « 1 ».</p>
<p><b>Étape 2</b> : avec la commande Numéro de page, Word insère un champ qui affiche le bon numéro sur chaque page.</p>
<p><b>Étapes 3-4</b> : synthèse du module : toujours préférer l'outil dynamique au bricolage manuel. C'est le même message depuis W01.</p>` },

/* 23 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'La mise en page maîtrisée', k: 'Récap', hub: 'W04', hsub: 'Tableaux · pages', hk: 'À RETENIR',
  items: [{ ic: '▦', t: 'Tableaux', d: 'Insertion › Tableau · Tab ajoute une ligne · Disposition / Création' }, { ic: '🔁', t: 'En-tête répété', d: 'Disposition › Données › Répéter les lignes d\'en-tête' }, { ic: '⤓', t: 'Sauts', d: 'Ctrl+Entrée page · Ctrl+Maj+Entrée colonne · sections' },
    { ic: '▥', t: 'Colonnes', d: 'Mise en page › Colonnes · ligne séparatrice' }, { ic: '#', t: 'En-têtes et numéros', d: 'Double-clic · Numéro de page · Lier au précédent' }] }),
  n: `<p>Questions éclair : « Comment ajouter une ligne en fin de tableau ? » (Tab), « Une page paysage au milieu ? » (sections), « Pourquoi le chapitre 1 change quand je modifie l'en-tête du chapitre 2 ? » (Lier au précédent).</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Six raccourcis de mise en page', 'Raccourcis W04')}
${KEYCARDS([{ k: 'Ctrl+Entrée', d: 'Saut de page' }, { k: 'Ctrl+Maj+Entrée', d: 'Saut de colonne' }, { k: 'Tab', d: 'Cellule suivante (ajoute une ligne en fin de tableau)' }, { k: 'Maj+Tab', d: 'Cellule précédente' }, { k: 'Alt+Maj+↑', d: 'Monter la ligne / le paragraphe' }, { k: 'Alt+Maj+↓', d: 'Descendre la ligne / le paragraphe' }], { cols: 3, y: 190 })}
${TIP('Alt+Maj+↑/↓ dans un tableau : réordonner les lignes sans couper-coller.', { s: 7, kind: 'key', y: 600, w: 900 })}`,
  n: `<p>Les six raccourcis du module. Démo de Alt+Maj+flèche : curseur dans une ligne du tableau, la ligne entière monte ou descend. Ça fonctionne aussi avec un paragraphe de texte ou un élément de liste.</p>` },

/* 25 — LAB */
{ title: 'Lab', html: LAB({ app: 'word', mod: 'w04', lab: 0, title: 'Lab — Le catalogue de formations', tasks: ['Tableau <b>3 colonnes × 4 lignes</b> : Formation · Durée · Tarif HT', 'Ligne d\'<b>en-tête en gras</b>', '<b>Saut de page</b> avant « Conditions générales »', '<b>En-tête</b> : « Atelier Numérique — Catalogue 2027 »', '<b>Pied de page</b> : contact@atelier-numerique.fr', 'Texte sur <b>2 colonnes</b>'] }),
  n: `<p>Scénario : l'organisme <b>Atelier Numérique</b> prépare son catalogue 2027.</p>
<p>Solution : 1) Supprimer « Insérez le tableau ici. » › Insertion › Tableau 3 × 4 › Formation | Durée | Tarif HT, puis Word expert | 2 jours | 790 € ; Excel tableaux croisés | 1 jour | 420 € ; Réseaux sociaux pro | 2 jours | 690 €. 2) Sélection de la 1<sup>re</sup> ligne › Ctrl+G (dans le vrai Word : cocher aussi Ligne d'en-tête et Répéter les lignes d'en-tête). 3) Curseur au début de « Conditions générales » › Ctrl+Entrée. 4) Double-clic dans l'en-tête › texte. 5) Double-clic dans le pied de page › e-mail. 6) Mise en page › Colonnes › Deux.</p>` },

/* 26 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Votre tableau tient sur 3 pages. Comment afficher la ligne de titres en haut de chaque page ?', o: ['La copier à la main en haut de chaque page', 'Disposition › Données › Répéter les lignes d\'en-tête', 'Insérer un en-tête de page', 'Fusionner les cellules'], a: [1], e: '« Répéter les lignes d\'en-tête » est dynamique et indique aussi la ligne d\'en-tête aux lecteurs d\'écran.' },
  { q: 'Que se passe-t-il quand on appuie sur Tab dans la dernière cellule d\'un tableau ?', o: ['Rien', 'Une tabulation est insérée', 'Une nouvelle ligne est ajoutée', 'On sort du tableau'], a: [2], e: 'Tab dans la dernière cellule crée une nouvelle ligne.' },
  { q: 'Une page en paysage au milieu d\'un document portrait : que faut-il ?', o: ['Un saut de page', 'Un saut de colonne', 'Des sauts de section (page suivante) avant et après', 'Un tableau'], a: [2], e: 'L\'orientation est une propriété de section : il faut isoler la page dans sa propre section.' },
  { q: 'En modifiant l\'en-tête du chapitre 2, celui du chapitre 1 change aussi. Pourquoi ?', o: ['L\'en-tête est verrouillé', '« Lier au précédent » est toujours activé dans la section 2', 'Il faut un saut de page', 'Le document est protégé'], a: [1], e: 'Après le saut de section, désactivez « Lier au précédent » avant de modifier l\'en-tête.' },
  { q: 'Quel raccourci insère un saut de colonne ?', o: ['Ctrl+Entrée', 'Maj+Entrée', 'Ctrl+Maj+Entrée', 'Alt+Entrée'], a: [2], e: 'Ctrl+Entrée = page, Maj+Entrée = ligne, Ctrl+Maj+Entrée = colonne.' },
  { q: 'Quels réglages peuvent différer d\'une section à l\'autre ?', o: ['L\'orientation des pages', 'Les en-têtes et pieds de page', 'La langue de l\'interface de Word', 'Le format de fichier'], a: [0, 1], e: 'Orientation, marges, colonnes, en-têtes/pieds et numérotation sont des propriétés de section.' },
] ); }, n: `<p>Réponses : 1) b · 2) c · 3) c · 4) b · 5) c · 6) a et b.</p>` },

/* 27 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W04', html: END(), n: `<p>Fin du module W04 et du niveau Intermédiaire de Word. Prochain module : <b>W05 — Documents longs</b> (niveau Avancé).</p>` },
] };
