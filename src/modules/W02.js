/* ===================== MODULE W02 — Mise en forme des caractères, des paragraphes et des listes ===================== */
const SECSW02 = ['Mettre en forme les caractères', 'Mettre en forme les paragraphes', 'Listes et reproduction de mise en forme'];

/* ---- helpers locaux W02 ---- */
const DLGW02 = o => `<div class="${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.12);font-family:'Segoe UI',sans-serif;${o.s ? '' : `--d:${o.d ?? .2}s`}">
 <div style="display:flex;align-items:center;padding:10px 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#6B7A90">✕</span></div>
 <div style="padding:18px 22px;font-size:18px;color:#1B2A41">${o.html}</div></div>`;
/* menu déroulant / contextuel */
const MENUW02 = o => `<div class="f zoom" data-s="${o.s}" style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w || 380}px;background:#fff;border-radius:10px;box-shadow:0 20px 50px -15px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font-family:'Segoe UI',sans-serif;font-size:19px;padding:6px 0">
 ${o.items.map(([t, on]) => `<div style="padding:9px 18px;${on ? 'background:#EFF6FF;font-weight:800;color:#185ABD' : ''}">${t}</div>`).join('')}</div>`;
const PW02 = '<b style="color:#2563EB;font-weight:400">¶</b>';
/* bloc « mini-page » pour démontrer un alignement / retrait */
const MINIW02 = (t, k, css, s, txt) => `<div class="card f zoom" data-s="${s}" style="padding:18px 20px">
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b style="font-size:23px">${t}</b>${k ? KEYS(k) : ''}</div>
 <div style="background:#fff;border:1px solid #E3E8EF;border-radius:6px;padding:14px 16px;font:17px/1.5 Calibri,sans-serif;color:#33445E;${css}">${txt || 'Les demandes doivent parvenir au service RH avant le 30 novembre 2026, accompagnées du formulaire signé.'}</div></div>`;

window.MODULE = { code: 'W02', title: 'Mise en forme des caractères, des paragraphes et des listes', short: 'Mise en forme', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Mise en forme', html: TITLE({ mod: 'WORD · MODULE 02 · DÉBUTANT', title: 'Une mise en forme <span class="grad">professionnelle</span>', sub: '« Caractères, paragraphes, listes : lisible en 30 secondes »', agenda: SECSW02, art: APPART('word') }),
  n: `<p>Module W02, durée indicative <b>50 minutes</b> avec deux labs : la note de service RH et un défi raccourcis chronométré.</p>
<p>Fil rouge : un même texte brut devient un document professionnel. On distingue ce qui s'applique aux <b>caractères</b> (la sélection) de ce qui s'applique aux <b>paragraphes</b> (le paragraphe entier), puis on termine par les listes et le pinceau.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Distinguer mise en forme des <b>caractères</b> et des <b>paragraphes</b>', 'Régler <b>alignement</b>, <b>interligne</b>, <b>espacements</b> et <b>retraits</b>', 'Créer des listes à <b>puces</b>, <b>numérotées</b> et changer de <b>niveau</b>', 'Reproduire une mise en forme avec le <b>pinceau</b>', 'Utiliser les <b>raccourcis</b> de mise en forme courants']),
  n: `<p>Cinq objectifs. Le premier est la clé de tout le module : quand on comprend la différence entre caractère et paragraphe, on comprend pourquoi « ça ne marche pas » parfois.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW02, 0), n: `<p>Première partie : les caractères — police, taille, attributs, casse.</p>` },

/* 4 — CARACTÈRE VS PARAGRAPHE */
{ title: 'Caractère ou paragraphe ?', html: `${H('Deux niveaux de mise en forme', 'Le principe clé')}
<style>.selW02{border-radius:3px;transition:background .5s}.selW02.on{background:#BFDBFE;box-shadow:0 0 0 3px #BFDBFE;font-weight:800}</style>
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:1fr 1fr;gap:34px">
 <div class="card f left" data-s="1" style="border-top:6px solid #FA582D;padding:24px 28px">
  <div style="font-size:28px;font-weight:900;color:#FA582D">🔤 Caractères</div><div style="font-size:21px;margin:6px 0 16px">s'applique à la <b>sélection</b></div>
  <div style="background:#fff;border:1px solid #E3E8EF;border-radius:8px;padding:18px;font:21px/1.6 Calibri,sans-serif">Les demandes doivent parvenir <span class="selW02" data-s="2">avant le 30 novembre</span> au service RH.</div>
  <div class="f" data-s="2" style="margin-top:16px;font-size:20px">Police · taille · <b>gras</b> · <i>italique</i> · couleur · surbrillance</div></div>
 <div class="card f right" data-s="3" style="border-top:6px solid #185ABD;padding:24px 28px">
  <div style="font-size:28px;font-weight:900;color:#185ABD">¶ Paragraphes</div><div style="font-size:21px;margin:6px 0 16px">s'applique au <b>paragraphe entier</b> où est le curseur</div>
  <div style="background:#fff;border:1px solid #E3E8EF;border-radius:8px;padding:18px;font:21px/1.6 Calibri,sans-serif;transition:text-align .5s" class="alW02" data-s="4">Les demandes doivent parvenir avant le 30 novembre<span style="display:inline-block;width:2px;height:24px;background:#185ABD;vertical-align:middle;animation:twCaret .8s step-end infinite"></span> au service RH.${PW02}</div>
  <div class="f" data-s="4" style="margin-top:16px;font-size:20px">Alignement · interligne · espacement · retraits · listes</div></div></div>
<style>.alW02.on{text-align:center}</style>
${TIP('Pas besoin de sélectionner un paragraphe pour le centrer : <b>un clic dedans suffit</b>.', { s: 5, y: 540, w: 1000, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : la mise en forme des <b>caractères</b> ne touche que le texte sélectionné.</p>
<p><b>Étape 2</b> : exemple : on sélectionne « avant le 30 novembre » et on met en gras : seul ce passage change.</p>
<p><b>Étape 3</b> : la mise en forme de <b>paragraphe</b> concerne tout le bloc qui se termine par ¶.</p>
<p><b>Étape 4</b> : le curseur est simplement posé dans le paragraphe, on appuie sur Ctrl+E : tout le paragraphe est centré.</p>
<p><b>Étape 5</b> : conséquence pratique : inutile de sélectionner pour aligner, espacer ou mettre en liste. Question 1 du quiz.</p>
<p>Astuce : la marque ¶ « contient » la mise en forme du paragraphe. Si on la supprime, le paragraphe fusionne avec le suivant et prend… sa mise en forme.</p>` },

/* 5 — LE GROUPE POLICE */
{ title: 'Le groupe Police', html: `${H('Le groupe Police', 'Caractères', PATH('Accueil > Police'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1000, h: 330, title: 'Note_RH.docx', tab: 'Accueil',
  groups: [['Police', ['Aptos ▾', '11 ▾', 'A⁺', 'A⁻', 'Aa ▾', 'G', 'I', 'S', 'ab', 'x₂', 'x²', '🖍▾', 'A▾']], ['Paragraphe', ['☰', '≡', '¶']]],
  hot: { 'Aptos ▾': 1, 'G': 2, 'x²': 3, '🖍▾': 4, 'Aa ▾': 5 }, body: PAGE({ inwin: true, w: 700, html: `<p style="font-size:19px">Note de service : <b>nouvelle charte</b> du <i>télétravail</i> — <span style="background:#FFF59D">30 novembre</span> — 25 m<sup>2</sup></p>` }) })}
<div style="position:absolute;left:70px;right:70px;top:540px;display:grid;grid-template-columns:repeat(5,1fr);gap:16px">
 ${[['1', 'Police · taille', 'Aptos 11 par défaut'], ['2', 'Gras · Italique · Souligné', 'Ctrl+G · Ctrl+I · Ctrl+U'], ['3', 'Exposant · indice', 'Ctrl+Maj++ · Ctrl+='], ['4', 'Surbrillance · couleur', 'le surligneur jaune'], ['5', 'Modifier la casse', 'Maj+F3']].map(([n, t, d]) => `<div class="card f zoom" data-s="${n}" style="padding:18px"><span class="num-badge or" style="width:38px;height:38px;font-size:18px">${n}</span><div style="font-size:21px;font-weight:800;margin-top:10px">${t}</div><div style="font-size:18px;color:#6B7A90;margin-top:4px">${d}</div></div>`).join('')}</div>
${TIP('Le <b>lanceur ↘</b> du groupe ouvre la boîte <b>Police</b> (Ctrl+D)', { s: 6, x: 1100, y: 190, w: 430, kind: 'key' })}`,
  n: `<p>Démonstration dans Word sur la note RH : sélectionnez « 30 novembre ».</p>
<p><b>Étape 1</b> : <b>police et taille</b>. Aptos est la police par défaut de Microsoft 365 (Calibri sur les versions antérieures). A⁺ / A⁻ augmentent / réduisent d'un cran.</p>
<p><b>Étape 2</b> : <b>G, I, S</b> : en français Ctrl+G gras, Ctrl+I italique, Ctrl+U souligné. Le bouton « ab » barré.</p>
<p><b>Étape 3</b> : <b>exposant</b> (m², 1ᵉʳ) Ctrl+Maj++ et <b>indice</b> (H₂O) Ctrl+=.</p>
<p><b>Étape 4</b> : <b>surbrillance</b> (surligneur) et <b>couleur de police</b>. Le lab demande de surligner la date limite.</p>
<p><b>Étape 5</b> : <b>Modifier la casse</b> (Aa) — diapo suivante.</p>
<p><b>Étape 6</b> : tout le reste (petites majuscules, espacement entre caractères) est dans la boîte Police.</p>` },

/* 6 — AVANT / APRÈS */
{ title: 'Avant / après', html: `${H('Les attributs au service du sens', 'Avant / après')}
${PAGE({ x: 70, y: 180, w: 690, html: `<div style="font-size:15px;color:#6B7A90;font-weight:700;margin-bottom:10px">AVANT</div><p style="font-size:20px">Note de service : nouvelle charte du télétravail</p><p style="font-size:19px">À compter du 1er décembre 2026, les collaborateurs peuvent demander jusqu'à trois jours de télétravail, sous réserve d'au moins deux jours sur site. Date limite : 30 novembre 2026.</p>` })}
${PAGE({ x: 840, y: 180, w: 690, s: 1, html: `<div style="font-size:15px;color:#16A34A;font-weight:700;margin-bottom:10px">APRÈS</div><p style="font-size:22px;text-align:center"><b class="f" data-s="2">Note de service : nouvelle charte du télétravail</b></p><p style="font-size:19px">À compter du 1<sup class="f" data-s="3">er</sup> décembre 2026, les collaborateurs peuvent demander jusqu'à <b class="f" data-s="2">trois jours</b> de télétravail, sous réserve d'<u class="f" data-s="4">au moins deux jours sur site</u>. Date limite : <span class="f" data-s="5" style="background:#FFF59D">30 novembre 2026</span>.</p>` })}
<div class="row" style="position:absolute;left:840px;top:560px;gap:12px;flex-wrap:wrap;width:690px">
 <span class="chip dark f" data-s="2" style="font-size:19px">Ctrl+G titre et mot-clé</span><span class="chip dark f" data-s="3" style="font-size:19px">Ctrl+Maj++ exposant</span><span class="chip dark f" data-s="4" style="font-size:19px">Ctrl+U contrainte</span><span class="chip dark f" data-s="5" style="font-size:19px">🖍 surbrillance date</span></div>
${TIP('Gras = repère visuel. <b>Pas plus de 2 ou 3</b> passages en gras par paragraphe.', { s: 6, x: 70, y: 600, w: 690 })}`,
  n: `<p>À gauche, le texte brut ; à droite, le même texte avec quatre gestes.</p>
<p><b>Étape 1-2</b> : le titre et le mot-clé en <b>gras</b>.</p>
<p><b>Étape 3</b> : « 1<sup>er</sup> » en exposant (la correction automatique le fait souvent seule).</p>
<p><b>Étape 4</b> : la contrainte importante soulignée.</p>
<p><b>Étape 5</b> : la date limite en surbrillance jaune.</p>
<p><b>Étape 6</b> : piège : trop de gras tue le gras. Si tout est mis en valeur, rien ne ressort.</p>` },

/* 7 — MODIFIER LA CASSE */
{ title: 'Modifier la casse', html: `${H('Ne retapez jamais un titre en majuscules', 'Modifier la casse', KEYS('Maj+F3'))}
${FLOW({ x: 70, y: 170, w: 1460, h: 380,
  n: { a: { x: 230, y: 160, pw: 380, ph: 110, html: `<text x="230" y="172" text-anchor="middle" font-size="30" font-weight="700" fill="#0E1726">rapport annuel</text>`, l: 'minuscules' },
    b: { x: 730, y: 160, pw: 380, ph: 110, html: `<text x="730" y="172" text-anchor="middle" font-size="30" font-weight="700" fill="#185ABD">RAPPORT ANNUEL</text>`, l: 'MAJUSCULES', s: 1 },
    c: { x: 1230, y: 160, pw: 380, ph: 110, html: `<text x="1230" y="172" text-anchor="middle" font-size="30" font-weight="700" fill="#16A34A">Rapport Annuel</text>`, l: 'Majuscule En Début De Mot', s: 2 } },
  l: [{ a: 'a', b: 'b', s: 1, lab: 'Maj+F3', lx: 480, ly: 120 }, { a: 'b', b: 'c', s: 2, lab: 'Maj+F3', lx: 980, ly: 120 }],
  svg: `<g class="f" data-s="3"><path d="M1230 290 C 1230 370, 230 370, 230 290" fill="none" stroke="#FA582D" stroke-width="4" stroke-dasharray="10 8" class="draw" pathLength="1"/><text x="730" y="372" text-anchor="middle" font-size="22" font-weight="800" fill="#FA582D">Maj+F3 : et on recommence</text></g>` })}
${MENUW02({ s: 4, x: 70, y: 590, w: 520, items: [['Majuscule en début de phrase.'], ['minuscules'], ['MAJUSCULES', 1], ['Majuscule En Début De Mot'], ['iNVERSER lA cASSE']] })}
${TIP('Le bouton <b>Aa</b> propose aussi « Majuscule en début de phrase » et « Inverser la casse ».', { s: 4, x: 640, y: 620, w: 760, kind: 'tip' })}`,
  n: `<p>Situation courante : un titre a été tapé tout en majuscules, ou Verr. Maj. est resté enfoncé.</p>
<p><b>Étapes 1 à 3</b> : on sélectionne le texte et on appuie sur <b>Maj+F3</b> : Word alterne entre MAJUSCULES, Majuscule En Début De Mot et minuscules. On s'arrête sur la bonne.</p>
<p><b>Étape 4</b> : le bouton <b>Aa</b> (Accueil › Police › Modifier la casse) offre les 5 options, dont « iNVERSER lA cASSE » (Verr. Maj. oublié).</p>
<p>Bonne pratique : pour des titres en capitales, préférez l'attribut <i>Majuscules</i> ou <i>Petites majuscules</i> de la boîte Police : le texte reste écrit normalement et redevient normal si on décoche.</p>` },

/* 8 — BOÎTE POLICE */
{ title: 'La boîte de dialogue Police', html: `${H('Tout régler d\'un coup : la boîte Police', 'Lanceur ↘', KEYS('Ctrl+D'))}
${DLGW02({ x: 70, y: 180, w: 820, t: 'Police', html: `
 <div style="display:flex;gap:24px;border-bottom:1px solid #E3E8EF;margin-bottom:16px"><span style="color:#185ABD;font-weight:700;border-bottom:3px solid #185ABD;padding-bottom:6px">Police</span><span>Paramètres avancés</span></div>
 <div style="display:grid;grid-template-columns:2fr 1.2fr 1fr;gap:16px;margin-bottom:16px">${[['Police :', 'Aptos'], ['Style :', 'Gras'], ['Taille :', '14']].map(([l, v]) => `<div><div style="font-size:16px">${l}</div><div style="border:1px solid #94A3B8;border-radius:4px;padding:5px 10px">${v}</div></div>`).join('')}</div>
 <div style="font-weight:700;margin-bottom:8px">Attributs</div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 20px;font-size:18px">
  <span>☐ Barré</span><span style="position:relative">☑ Petites majuscules<em class="ow-hot f zoom" data-s="1" style="inset:-4px -6px"><b>1</b></em></span><span>☐ Exposant</span><span>☐ Majuscules</span><span>☐ Indice</span><span style="position:relative">☐ Masqué<em class="ow-hot f zoom" data-s="2" style="inset:-4px -6px"><b>2</b></em></span></div>
 <div style="margin-top:16px;border:1px solid #E3E8EF;border-radius:6px;padding:14px;text-align:center;font:700 26px Calibri,sans-serif;font-variant:small-caps;color:#185ABD">Note de service</div>
 <div style="margin-top:14px;display:flex;justify-content:space-between"><span style="position:relative;padding:5px 12px;border:1px solid #94A3B8;border-radius:5px">Définir par défaut<em class="ow-hot f zoom" data-s="4"><b>4</b></em></span><span><span style="padding:5px 16px;border:1px solid #185ABD;border-radius:5px;margin-right:8px">OK</span><span style="padding:5px 12px;border:1px solid #94A3B8;border-radius:5px">Annuler</span></span></div>` })}
<div class="col" style="position:absolute;left:940px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Petites majuscules</b> — élégant pour un titre ou une signature', 1)}
 ${CARD('<b>2 · Masqué</b> — texte non imprimé (notes internes)', 2)}
 ${CARD('<b>3 · Paramètres avancés</b> — espacement entre caractères', 3)}
 ${CARD('<b>4 · Définir par défaut</b> — police de tous les nouveaux documents', 4)}</div>`,
  n: `<p>Ouvrez la boîte avec le petit lanceur ↘ du groupe Police, ou <b>Ctrl+D</b>.</p>
<p><b>Étape 1</b> : <b>Petites majuscules</b> : capitales de la hauteur des minuscules.</p>
<p><b>Étape 2</b> : <b>Masqué</b> : texte visible seulement quand ¶ est affiché, jamais imprimé.</p>
<p><b>Étape 3</b> : onglet <b>Paramètres avancés</b> : espacement « Étendu » / « Condensé » pour resserrer un titre trop long.</p>
<p><b>Étape 4</b> : <b>Définir par défaut</b> → « Tous les documents basés sur le modèle Normal » : change la police par défaut de tous les futurs documents. À faire avec précaution.</p>` },

/* 9 — BONNES PRATIQUES */
{ title: 'Bonnes pratiques', html: `${H('Polices et couleurs : sobres et accessibles', 'Bonnes pratiques')}
${VS({ l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['4 polices différentes dans une page', 'La <b>couleur seule</b> pour signaler une obligation', 'Des titres en MAJUSCULES tapées', 'Souligner pour mettre en valeur (confusion avec un lien)'] },
  r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['<b>2 polices max</b> : titres + texte', 'Couleur <b>doublée</b> d\'un mot ou d\'un gras', 'Modifier la casse ou petites majuscules', 'Gras avec parcimonie'] }, mid: '➜' })}
<div class="f" data-s="3" style="position:absolute;left:70px;right:70px;top:560px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
 <div class="card" style="font-size:22px;border-left:6px solid #DC2626"><span style="color:#DC2626">Pièce d'identité</span> · Justificatif de domicile · <span style="color:#DC2626">RIB</span><div style="font-size:17px;color:#6B7A90;margin-top:6px">en noir et blanc : impossible de savoir ce qui est obligatoire</div></div>
 <div class="card" style="font-size:22px;border-left:6px solid #16A34A"><b style="color:#DC2626">Obligatoire :</b> pièce d'identité, RIB<br>Facultatif : justificatif de domicile</div></div>`,
  n: `<p><b>Étape 1</b> : erreurs fréquentes : multiplier les polices (effet « lettre de rançon »), signaler une information uniquement par la couleur, souligner pour souligner (le lecteur croit à un lien hypertexte).</p>
<p><b>Étape 2</b> : règles simples : deux polices au maximum, couleur toujours doublée d'un mot ou d'un gras.</p>
<p><b>Étape 3</b> : exemple : une liste de pièces dont les obligatoires sont en rouge. Une personne daltonienne (8 % des hommes) ou une impression noir et blanc perd l'information. Version accessible à droite.</p>` },

/* 10 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW02, 1), n: `<p>Deuxième partie : le paragraphe — alignement, espacements, interligne, retraits, enchaînements.</p>` },

/* 11 — ALIGNEMENTS */
{ title: 'Les quatre alignements', html: `${H('Quatre alignements, quatre raccourcis', 'Paragraphe', PATH('Accueil > Paragraphe'))}
<div style="position:absolute;left:70px;right:70px;top:180px;display:grid;grid-template-columns:1fr 1fr;gap:22px">
 ${MINIW02('À gauche', 'Ctrl+Maj+G', 'text-align:left', 1)}${MINIW02('Centré', 'Ctrl+E', 'text-align:center', 2)}
 ${MINIW02('À droite', 'Ctrl+Maj+D', 'text-align:right', 3)}${MINIW02('Justifié', 'Ctrl+J', 'text-align:justify', 4)}</div>
<div class="row" style="position:absolute;left:70px;top:640px;gap:14px;flex-wrap:wrap">
 <span class="chip f" data-s="5" style="font-size:19px">Gauche : par défaut, le plus lisible</span><span class="chip f" data-s="5" style="font-size:19px">Centré : titres, page de garde</span><span class="chip f" data-s="5" style="font-size:19px">Droite : lieu et date d'un courrier</span><span class="chip f" data-s="5" style="font-size:19px">Justifié : textes longs + coupure de mots</span></div>`,
  n: `<p>Rappel : l'alignement est une mise en forme de <b>paragraphe</b> : un clic dans le paragraphe suffit.</p>
<p><b>Étape 1</b> : <b>à gauche</b> (Ctrl+Maj+G) : le réglage par défaut, le plus lisible pour un texte courant.</p>
<p><b>Étape 2</b> : <b>centré</b> (Ctrl+E) : titres, page de garde, invitation.</p>
<p><b>Étape 3</b> : <b>à droite</b> (Ctrl+Maj+D) : « Lyon, le 25 octobre 2026 » dans un courrier.</p>
<p><b>Étape 4</b> : <b>justifié</b> (Ctrl+J) : bords nets à gauche et à droite, pour les textes longs. Activez la coupure de mots (Mise en page › Coupure de mots › Automatique) pour éviter les « rivières » blanches.</p>
<p><b>Étape 5</b> : quand utiliser lequel. Lab : titre centré, introduction justifiée.</p>` },

/* 12 — ESPACEMENT AVANT / APRÈS */
{ title: 'Espacement avant / après', html: `${H('Séparer les paragraphes sans ligne vide', 'Espacement', PATH('Mise en page > Paragraphe > Espacement'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:640px;height:470px;background:#fff;border-radius:4px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45);padding:40px 48px;font:19px/1.5 Calibri,sans-serif;color:#33445E">
 <div style="font-size:15px;color:#DC2626;font-weight:700;margin-bottom:10px">✘ LIGNES VIDES</div>
 Conditions à remplir.${PW02}<br>${PW02}<br>Ordinateur portable fourni.${PW02}<br>${PW02}<br>${PW02}<br>Connexion stable.${PW02}<br>${PW02}<br>Espace de travail calme.${PW02}
 <div class="f" data-s="1" style="margin-top:22px;font-size:18px;color:#DC2626;font-weight:700">→ espaces irréguliers, paragraphes vides en haut de page</div></div>
<div class="f right" data-s="2" style="position:absolute;left:770px;top:180px;width:760px;height:470px;background:#fff;border-radius:4px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45);padding:40px 48px;font:19px/1.5 Calibri,sans-serif;color:#33445E">
 <div style="font-size:15px;color:#16A34A;font-weight:700;margin-bottom:10px">✔ ESPACEMENT APRÈS : 8 PT</div>
 ${['Conditions à remplir.', 'Ordinateur portable fourni.', 'Connexion stable.', 'Espace de travail calme.'].map((t, i) => `<div style="position:relative;margin-bottom:22px">${t}${PW02}${i < 3 ? `<span class="f" data-s="3" style="position:absolute;left:-30px;top:30px;height:18px;width:16px;border:2px solid #16A34A;border-left:0;border-radius:0 4px 4px 0"></span><span class="f" data-s="3" style="position:absolute;left:370px;top:26px;font:700 16px var(--font);color:#16A34A">8 pt</span>` : ''}</div>`).join('')}
 <div class="f" data-s="4" style="display:flex;gap:22px;margin-top:10px;font:18px 'Segoe UI',sans-serif">${['Avant : 0 pt', 'Après : 8 pt'].map(t => `<span style="border:1px solid #94A3B8;border-radius:5px;padding:6px 14px">${t} ▴▾</span>`).join('')}</div></div>`,
  n: `<p><b>Étape 1</b> : la méthode « lignes vides » : des paragraphes vides (¶ seuls) pour aérer. Espaces irréguliers, et après un changement de pagination, une ligne vide se retrouve en haut de page.</p>
<p><b>Étape 2</b> : la méthode pro : l'<b>espacement après</b> paragraphe, en points.</p>
<p><b>Étape 3</b> : chaque paragraphe a automatiquement 8 pt d'espace après lui. Régulier, et aucune ligne vide parasite.</p>
<p><b>Étape 4</b> : où le régler : Mise en page › Paragraphe › Espacement <b>Avant / Après</b>, ou Accueil › Paragraphe › Interligne › Options d'interligne. Exemple standard : 0 pt avant, 8 pt après.</p>
<p>Question 2 du quiz. Astuce démo : Ctrl+H, remplacer <b>^p^p</b> par <b>^p</b> supprime les lignes vides d'un document hérité.</p>` },

/* 13 — INTERLIGNE */
{ title: 'L\'interligne', html: `${H('L\'interligne : l\'air entre les lignes', 'Interligne et espacement')}
${APPWIN({ app: 'word', x: 70, y: 175, w: 820, h: 560, title: 'Note_RH.docx', tab: 'Accueil',
  groups: [['Police', ['Aptos ▾', '11 ▾', 'G', 'I']], ['Paragraphe', ['•≡', '1≡', '☰', '≡', '↕▾', '¶']]],
  hot: { '↕▾': 1 }, body: `<div style="margin:18px 0 0 20px;width:400px;background:#fff;padding:30px 34px;box-shadow:0 10px 30px -15px rgba(14,23,38,.4)"><p style="font:18px/1.2 Calibri,sans-serif;margin:0" class="ilW02" data-s="2">À compter du 1er décembre 2026, tous les collaborateurs dont le poste est compatible peuvent demander jusqu'à trois jours de télétravail par semaine.</p></div>` })}
<style>.ilW02{transition:line-height .8s}.ilW02.on{line-height:2.1!important}</style>
${MENUW02({ s: 1, x: 530, y: 290, w: 340, items: [['1,0'], ['1,08'], ['1,15'], ['1,5', 0], ['2,0', 1], ['Options d\'interligne…'], ['Ajouter un espace avant le paragraphe']] })}
<div class="col" style="position:absolute;left:940px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1,0 – 1,15</b> : texte courant compact', 3)}${CARD('<b>1,5 – 2,0</b> : relecture, document annoté', 3)}
 ${CARD('<b>Multiple</b> ou <b>Exactement</b> : dans Options d\'interligne…', 4)}</div>
${TIP('Interligne = <b>entre les lignes</b> d\'un paragraphe · Espacement = <b>entre les paragraphes</b>', { s: 5, x: 940, y: 520, w: 590 })}`,
  n: `<p><b>Étape 1</b> : bouton <b>Interligne et espacement de paragraphe</b> (Accueil › Paragraphe) : valeurs rapides.</p>
<p><b>Étape 2</b> : on passe à 2,0 : l'espace entre les lignes du paragraphe double.</p>
<p><b>Étape 3</b> : 1,08 à 1,15 : le standard actuel ; 1,5 ou 2,0 pour un document à relire et annoter à la main.</p>
<p><b>Étape 4</b> : <i>Options d'interligne…</i> ouvre la boîte Paragraphe : « Multiple », « Au moins », « Exactement » (en pt).</p>
<p><b>Étape 5</b> : ne pas confondre <b>interligne</b> (à l'intérieur d'un paragraphe) et <b>espacement</b> (entre paragraphes).</p>
<p>Raccourcis bonus : Ctrl+1, Ctrl+5 et Ctrl+2 = interligne simple, 1,5 et double.</p>` },

/* 14 — RETRAITS */
{ title: 'Les retraits', html: `${H('Les quatre retraits', 'Règle et boîte Paragraphe')}
<svg viewBox="0 0 1460 120" class="a fade" style="--d:.2s;position:absolute;left:70px;top:170px;width:1460px;height:120px">
 <rect x="0" y="34" width="1460" height="50" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><rect x="0" y="34" width="120" height="50" fill="#E2E8F0"/><rect x="1340" y="34" width="120" height="50" fill="#E2E8F0"/>
 ${Array.from({ length: 61 }, (_, i) => `<line x1="${120 + i * 20}" y1="${i % 5 ? 70 : 58}" x2="${120 + i * 20}" y2="84" stroke="#94A3B8" stroke-width="1.5"/>`).join('')}
 <g class="f" data-s="1"><path d="M220 84 l-14 18 h28z" fill="#FA582D"/><rect x="206" y="102" width="28" height="12" fill="#FA582D"/></g>
 <g class="f" data-s="2"><path d="M1240 84 l-14 18 h28z" fill="#185ABD"/></g>
 <g class="f" data-s="3"><path d="M280 34 l-14 -18 h28z" fill="#16A34A"/></g>
 <g class="f" data-s="4"><path d="M160 34 l-14 -18 h28z" fill="#7C3AED"/></g>
</svg>
<div style="position:absolute;left:70px;right:70px;top:320px;display:grid;grid-template-columns:1fr 1fr;gap:22px">
 ${MINIW02('<span style="color:#FA582D">▲</span> Retrait gauche', '', 'margin-left:60px', 1, 'Citation ou bloc mis en retrait de la marge gauche.')}
 ${MINIW02('<span style="color:#185ABD">▲</span> Retrait droit', '', 'margin-right:60px', 2, 'Le texte s\'arrête avant la marge droite.')}
 ${MINIW02('<span style="color:#16A34A">▼</span> Première ligne (alinéa)', '', 'text-indent:50px', 3, 'Seule la première ligne est décalée, comme dans un roman ou un courrier traditionnel.')}
 ${MINIW02('<span style="color:#7C3AED">▼</span> Suspendu', '', 'padding-left:60px;text-indent:-50px', 4, 'Dupont, A. (2025). La première ligne dépasse : idéal pour une bibliographie.')}</div>`,
  n: `<p>Les retraits décalent un paragraphe par rapport aux <b>marges</b> (qui, elles, concernent toute la page).</p>
<p><b>Étape 1</b> : <b>retrait gauche</b> (le carré sous le triangle du bas, sur la règle) : déplace tout le paragraphe. Boutons Accueil › Paragraphe › Augmenter / Diminuer le retrait.</p>
<p><b>Étape 2</b> : <b>retrait droit</b> (triangle à droite).</p>
<p><b>Étape 3</b> : <b>retrait de première ligne</b> (triangle du haut) : un alinéa. À ne jamais faire avec des espaces ou une tabulation en début de paragraphe.</p>
<p><b>Étape 4</b> : <b>retrait suspendu</b> : la première ligne dépasse vers la gauche, les suivantes sont décalées. Bibliographies, glossaires.</p>
<p>Réglage précis : boîte <i>Paragraphe</i> (lanceur ↘) › Retrait › Spécial : De 1<sup>re</sup> ligne / Suspendu, valeur en cm.</p>` },

/* 15 — ENCHAÎNEMENTS */
{ title: 'Enchaînements', html: `${H('Pas de titre orphelin en bas de page', 'Paragraphe > Enchaînements')}
<svg viewBox="0 0 900 600" style="position:absolute;left:70px;top:170px;width:900px;height:600px">
 ${[0, 1].map(p => `<rect x="${40 + p * 440}" y="20" width="380" height="540" rx="6" fill="#fff" stroke="#CBD5E1" stroke-width="2" class="a pop" style="--d:${.1 + p * .15}s"/>`).join('')}
 ${Array.from({ length: 12 }, (_, i) => `<rect x="80" y="${60 + i * 34}" width="${i % 4 === 3 ? 200 : 300}" height="12" rx="6" fill="#E2E8F0"/>`).join('')}
 <g class="f" data-s="1"><rect x="80" y="480" width="200" height="22" rx="4" fill="#185ABD"/><text x="292" y="498" font-size="20" font-weight="800" fill="#DC2626">← seul !</text></g>
 <g class="f" data-s="1">${Array.from({ length: 6 }, (_, i) => `<rect x="520" y="${60 + i * 34}" width="${i === 5 ? 180 : 300}" height="12" rx="6" fill="#E2E8F0"/>`).join('')}</g>
 <g class="f" data-s="3"><rect x="80" y="480" width="200" height="22" rx="4" fill="#fff"/><rect x="74" y="470" width="340" height="40" fill="#fff"/>
  <rect x="520" y="60" width="200" height="22" rx="4" fill="#185ABD"/>${Array.from({ length: 6 }, (_, i) => `<rect x="520" y="${100 + i * 34}" width="${i === 5 ? 180 : 300}" height="12" rx="6" fill="#16A34A" fill-opacity=".35"/>`).join('')}
  <path d="M290 490 C 420 490, 420 70, 510 70" fill="none" stroke="#16A34A" stroke-width="4" stroke-dasharray="8 8" class="draw" pathLength="1"/><text x="600" y="420" font-size="20" font-weight="800" fill="#16A34A">✔ solidaire</text></g>
</svg>
${DLGW02({ x: 1000, y: 180, w: 530, t: 'Paragraphe', s: 2, html: `
 <div style="display:flex;gap:20px;border-bottom:1px solid #E3E8EF;margin-bottom:14px;font-size:17px"><span>Retrait et espacement</span><span style="color:#185ABD;font-weight:700;border-bottom:3px solid #185ABD;padding-bottom:6px">Enchaînements</span></div>
 <div style="line-height:2.1">☑ Éviter veuves et orphelines<br><span style="position:relative">☑ <b>Paragraphes solidaires</b><em class="ow-hot f zoom" data-s="3" style="inset:-2px -8px"><b>✔</b></em></span><br>☐ Lignes solidaires<br>☐ Saut de page avant</div>` })}
${TIP('Les styles <b>Titre 1, 2, 3</b> sont déjà « solidaires » : encore une raison de les utiliser (W03).', { s: 4, x: 1000, y: 520, w: 530, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : le problème : un titre tombe seul en bas de page, son texte commence page suivante. Réflexe à éviter : ajouter des lignes vides au-dessus.</p>
<p><b>Étape 2</b> : boîte <b>Paragraphe</b> (lanceur ↘ du groupe Paragraphe) › onglet <b>Enchaînements</b>.</p>
<p><b>Étape 3</b> : <b>Paragraphes solidaires</b> : le titre reste toujours sur la même page que le paragraphe suivant. Le titre passe automatiquement à la page 2.</p>
<p><b>Étape 4</b> : <b>Éviter veuves et orphelines</b> (coché par défaut) : pas de ligne isolée en haut ou en bas de page. <b>Saut de page avant</b> : le paragraphe commence toujours en haut de page (utile pour un style de chapitre).</p>` },

/* 16 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW02, 2), n: `<p>Troisième partie : les listes, puis la reproduction et l'effacement de mise en forme.</p>` },

/* 17 — TROIS TYPES DE LISTES */
{ title: 'Trois types de listes', html: `${H('Puces, numéros ou plusieurs niveaux ?', 'Listes', PATH('Accueil > Paragraphe > Puces'))}
<div style="position:absolute;left:70px;right:70px;top:185px;display:grid;grid-template-columns:repeat(3,1fr);gap:26px">
 ${[['•≡ Puces', 'Éléments <b>sans ordre</b>', '<ul style="font-size:20px;line-height:1.8;margin-left:24px"><li>Ordinateur portable</li><li>Connexion stable</li><li>Espace calme</li></ul>', '#FA582D'],
    ['1≡ Numérotation', 'Étapes, <b>procédure</b>, classement', '<ol style="font-size:20px;line-height:1.8;margin-left:28px"><li>Remplir le formulaire</li><li>Faire valider</li><li>Signer l\'avenant</li></ol>', '#185ABD'],
    ['⁞≡ Plusieurs niveaux', '<b>Plan</b> hiérarchisé', '<div style="font-size:20px;line-height:1.8">1. Contexte<br><span style="margin-left:30px">1.1 Enjeux</span><br><span style="margin-left:30px">1.2 Périmètre</span><br>2. Mise en œuvre</div>', '#7C3AED']].map(([t, d, h, c], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="border-top:6px solid ${c};padding:24px">
  <div style="font-size:27px;font-weight:900;color:${c}">${t}</div><div style="font-size:20px;color:#33445E;margin:6px 0 16px">${d}</div>
  <div style="background:#fff;border:1px solid #E3E8EF;border-radius:8px;padding:16px 18px;font-family:Calibri,sans-serif;min-height:170px">${h}</div></div>`).join('')}</div>
${TIP('Sélectionnez les lignes, puis <b>un clic</b> sur Puces ou Numérotation. Un second clic retire la liste.', { s: 4, y: 640, w: 1000 })}`,
  n: `<p><b>Étape 1</b> : <b>puces</b> pour une énumération sans ordre : les conditions du télétravail dans le lab.</p>
<p><b>Étape 2</b> : <b>numérotation</b> quand l'ordre compte : les étapes de la demande. La numérotation se met à jour toute seule si on insère une étape.</p>
<p><b>Étape 3</b> : <b>liste à plusieurs niveaux</b> pour un plan 1. / 1.1 / 1.1.1. Au module W03, on la reliera aux styles de titre.</p>
<p><b>Étape 4</b> : méthode : sélectionner les paragraphes concernés puis cliquer sur le bouton. Chaque paragraphe devient un élément de liste.</p>` },

/* 18 — NIVEAUX ET SORTIE */
{ title: 'Changer de niveau', html: `${H('Tab pour descendre, Maj+Tab pour remonter', 'Listes au clavier')}
<style>.lvW02{transition:margin-left .6s}.lvW02.on{margin-left:56px!important}.lvW02.on .bu{color:#7C3AED}</style>
${PAGE({ x: 70, y: 180, w: 760, h: 520, html: `<div style="font:22px/2 Calibri,sans-serif">
 <div><span class="bu" style="color:#FA582D">●</span> Matériel fourni</div>
 <div class="lvW02" data-s="1" style="margin-left:0"><span class="bu" style="color:#FA582D">●</span> Ordinateur portable</div>
 <div class="lvW02" data-s="1" style="margin-left:0"><span class="bu" style="color:#FA582D">●</span> Casque audio</div>
 <div><span class="bu" style="color:#FA582D">●</span> Organisation</div>
 <div class="f" data-s="3"><span style="color:#FA582D">●</span> <span style="color:#94A3B8">|</span></div>
 <div class="f" data-s="4" style="color:#33445E">Texte normal après la liste.${PW02}</div></div>` })}
<div class="col" style="position:absolute;left:880px;right:70px;top:190px;gap:16px">
 ${CARD(`${KEYS('Tab')} &nbsp;descendre d'un niveau`, 1)}${CARD(`${KEYS('Maj+Tab')} &nbsp;remonter d'un niveau`, 2)}
 ${CARD(`${KEYS('Entrée')} sur une puce vide…`, 3)}${CARD(`…${KEYS('Entrée')} une 2ᵉ fois : <b>sortie de la liste</b>`, 4)}</div>`,
  n: `<p><b>Étape 1</b> : curseur au début de « Ordinateur portable », touche <b>Tab</b> : l'élément descend d'un niveau (puce différente, décalage). Ça marche aussi sur plusieurs éléments sélectionnés.</p>
<p><b>Étape 2</b> : <b>Maj+Tab</b> remonte d'un niveau.</p>
<p><b>Étape 3</b> : en fin de liste, Entrée crée une nouvelle puce vide.</p>
<p><b>Étape 4</b> : un second <b>Entrée</b> sur la puce vide fait sortir de la liste : on revient au texte normal. Ne pas effacer la puce à la main avec Retour arrière en boucle.</p>
<p>Question 5 du quiz.</p>` },

/* 19 — RECOMMENCER À 1 */
{ title: 'Recommencer à 1', html: `${H('La numérotation reprend à 4 ? Recommencez à 1', 'Numérotation')}
${PAGE({ x: 70, y: 180, w: 700, html: `<div style="font:21px/1.9 Calibri,sans-serif"><b>Demande de télétravail</b><br>1. Remplir le formulaire<br>2. Faire valider<br>3. Signer l'avenant<br><br><b>Demande de matériel</b><br>
 <span style="position:relative"><span class="f" data-s="3" style="position:absolute;left:0;top:0;background:#fff;color:#16A34A;font-weight:800">1.</span><span style="background:#FEE2E2">4.</span></span> Remplir le bon de commande<br>
 <span style="position:relative"><span class="f" data-s="3" style="position:absolute;left:0;top:0;background:#fff;color:#16A34A;font-weight:800">2.</span>5.</span> Joindre le devis</div>` })}
${MENUW02({ s: 2, x: 420, y: 440, w: 400, items: [['✂ Couper'], ['📋 Options de collage'], ['Ajuster les retraits de liste…'], ['Recommencer à 1', 1], ['Continuer la numérotation'], ['Définir la valeur de numérotation…']] })}
<div class="col" style="position:absolute;left:880px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 ·</b> Clic droit <b>sur le numéro</b> qui pose problème', 1)}${CARD('<b>2 · Recommencer à 1</b> : démarre une nouvelle liste', 2)}
 ${CARD('<b>Continuer la numérotation</b> : relie deux listes séparées', 4)}</div>
${TIP('Ne tapez jamais « 1. » à la main : les numéros ne se mettraient plus à jour.', { s: 5, x: 880, y: 560, w: 650, kind: 'warn' })}`,
  n: `<p>Cas typique : deux listes numérotées dans le même document, la deuxième continue à 4, 5…</p>
<p><b>Étape 1</b> : clic droit directement sur le numéro « 4 ».</p>
<p><b>Étape 2</b> : <b>Recommencer à 1</b>.</p>
<p><b>Étape 3</b> : la liste repart à 1.</p>
<p><b>Étape 4</b> : l'inverse : <b>Continuer la numérotation</b> relie une liste à la précédente quand un paragraphe intermédiaire l'a coupée. « Définir la valeur de numérotation » pour démarrer à 10 par exemple.</p>
<p><b>Étape 5</b> : taper les numéros soi-même : ils ne se renumérotent pas quand on insère une étape. Si la correction automatique transforme « 1. » en liste, c'est une bonne chose.</p>` },

/* 20 — PUCE PERSONNALISÉE */
{ title: 'Puce personnalisée', html: `${H('Une puce à votre image', 'Définir une puce')}
${PROC([{ p: 'Accueil > Paragraphe > Puces ▾', t: 'Ouvrir la bibliothèque de puces' }, { p: 'Définir une puce… > Symbole', t: 'Police Segoe UI Symbol ou Wingdings' }, { p: 'Image…', t: 'Ou un petit logo' }], { w: 720, y: 185 })}
<div style="position:absolute;left:860px;right:70px;top:185px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
 ${[['✔', 'Avantages', '#16A34A', 2], ['➜', 'Étapes clés', '#FA582D', 2], ['☐', 'Check-list', '#185ABD', 3], ['★', 'Points forts', '#B45309', 3]].map(([b, t, c, s]) => `<div class="card f zoom" data-s="${s}" style="padding:20px 22px"><div style="font-size:22px;font-weight:800;margin-bottom:10px">${t}</div>${['Premier élément', 'Deuxième élément'].map(x => `<div style="font:20px/1.8 Calibri,sans-serif"><b style="color:${c};margin-right:10px">${b}</b>${x}</div>`).join('')}</div>`).join('')}</div>
${TIP('Restez cohérent : <b>un seul type de puce</b> par niveau dans tout le document.', { s: 4, y: 640, x: 70, w: 720 })}`,
  n: `<p><b>Étape 1</b> : la flèche ▾ à droite du bouton Puces ouvre la bibliothèque (puces récentes et du document).</p>
<p><b>Étape 2</b> : <b>Définir une puce…</b> › <b>Symbole</b> : coche ✔, flèche ➜, case ☐… Choisissez la police Segoe UI Symbol ou Wingdings.</p>
<p><b>Étape 3</b> : <b>Image…</b> pour un mini-logo (avec modération).</p>
<p><b>Étape 4</b> : cohérence : un type de puce par niveau. Au module suivant, on intégrera la liste dans un style pour garantir cette cohérence.</p>` },

/* 21 — LE PINCEAU */
{ title: 'Le pinceau', html: `${H('Reproduire la mise en forme', 'Le pinceau', PATH('Accueil > Presse-papiers > Reproduire la mise en forme'))}
${FLOW({ x: 70, y: 175, w: 1460, h: 360,
  n: { m: { x: 170, y: 150, pw: 260, ph: 100, html: `<text x="170" y="160" text-anchor="middle" font-size="26" font-weight="800" fill="#185ABD">Conditions :</text>`, l: '1 · Clic dans le modèle' },
    p: { x: 560, y: 150, html: `<text x="560" y="168" text-anchor="middle" font-size="52">🖌️</text>`, l: '2 · Clic sur le pinceau', sub: 'double-clic = verrouillé', s: 1, hot: true },
    a: { x: 1000, y: 60, pw: 280, ph: 70, html: `<text x="1000" y="70" text-anchor="middle" font-size="24" font-weight="800" fill="#185ABD">Démarches :</text>`, s: 2 },
    b: { x: 1000, y: 170, pw: 280, ph: 70, html: `<text x="1000" y="180" text-anchor="middle" font-size="24" font-weight="800" fill="#185ABD">Calendrier :</text>`, s: 3 },
    c: { x: 1000, y: 280, pw: 280, ph: 70, html: `<text x="1000" y="290" text-anchor="middle" font-size="24" font-weight="800" fill="#185ABD">Contacts :</text>`, s: 3 } },
  l: [{ a: 'm', b: 'p', s: 1 }, { a: 'p', b: 'a', r: 'hvh', s: 2, flow: true }, { a: 'p', b: 'b', r: 'hvh', s: 3, flow: true }, { a: 'p', b: 'c', r: 'hvh', s: 3, flow: true }],
  t: [{ x: 1180, y: 75, t: '3 · peindre', a: 'start', c: '#FA582D', fw: 800, s: 2, fs: 22 }, { x: 1180, y: 295, t: 'Échap pour arrêter', a: 'start', c: '#FA582D', fw: 800, s: 4, fs: 22 }] })}
<div style="position:absolute;left:70px;right:70px;top:600px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
 ${CARD('<b>Simple clic</b> 🖌 : une seule application', 2, '', 'zoom')}${CARD('<b>Double-clic</b> 🖌 : plusieurs cibles, puis <b>Échap</b>', 3, '', 'zoom')}${CARD(`Clavier : ${KEYS('Ctrl+Maj+C')} → ${KEYS('Ctrl+Maj+V')}`, 4, '', 'zoom')}</div>`,
  n: `<p>Le <b>pinceau</b> copie une mise en forme (pas le texte) pour l'appliquer ailleurs.</p>
<p><b>Étape 1</b> : clic dans le texte modèle (« Conditions : » en bleu gras), puis clic sur le pinceau. Le pointeur prend la forme d'un pinceau.</p>
<p><b>Étape 2</b> : on « peint » (on sélectionne en glissant) le texte cible : il prend la mise en forme. Avec un simple clic, le pinceau se désactive aussitôt.</p>
<p><b>Étape 3</b> : <b>double-clic</b> sur le pinceau : il reste actif pour peindre plusieurs cibles.</p>
<p><b>Étape 4</b> : <b>Échap</b> pour le désactiver. Au clavier : Ctrl+Maj+C copie la mise en forme, Ctrl+Maj+V la colle.</p>
<p>Si on clique dans un paragraphe (sans sélection), le pinceau copie aussi la mise en forme de paragraphe.</p>` },

/* 22 — EFFACER ET RÉVÉLER */
{ title: 'Effacer et révéler', html: `${H('Repartir de zéro et comprendre', 'Effacer · Révéler la mise en forme')}
${APPWIN({ app: 'word', x: 70, y: 175, w: 820, h: 560, title: 'Note_RH.docx', tab: 'Accueil',
  groups: [['Presse-papiers', ['📋 Coller', '🖌']], ['Police', ['Aptos ▾', '11 ▾', 'A⌫', 'G', 'I', 'S']], ['Paragraphe', ['☰', '¶']]],
  hot: { 'A⌫': 1 }, body: PAGE({ inwin: true, w: 560, html: `<p style="font-size:20px;position:relative"><span style="font-family:Georgia;color:#DC2626;font-size:24px;font-style:italic;text-decoration:underline">Texte collé depuis un site</span><span class="f" data-s="2" style="position:absolute;left:0;top:0;background:#fff;font-family:Calibri,sans-serif;font-size:20px;color:#1F2937;padding-right:300px">Texte collé depuis un site</span></p>${LINES(3)}` }) })}
<div class="f right" data-s="3" style="position:absolute;left:930px;top:180px;width:600px;height:555px;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;font-family:'Segoe UI',sans-serif;padding:22px 26px">
 <div style="font-size:24px;font-weight:700;color:#185ABD;margin-bottom:14px">Révéler la mise en forme</div>
 ${[['Police', 'Aptos 11 pt · Gras'], ['Langue', 'Français (France)'], ['Paragraphe', 'Alignement : Justifié'], ['Espacement', 'Avant 0 pt · Après 8 pt'], ['Style', 'Normal + Gras']].map(([t, v]) => `<div style="padding:11px 0;border-bottom:1px solid #EEF0F3"><div style="font-size:16px;color:#6B7A90;font-weight:700">${t.toUpperCase()}</div><div style="font-size:20px">${v}</div></div>`).join('')}</div>
<div class="row" style="position:absolute;left:70px;top:760px;gap:14px">${CARD(`${KEYS('Ctrl+Espace')} caractères seulement`, 2, 'font-size:18px;padding:8px 14px', 'zoom')}${CARD(`${KEYS('Maj+F1')} volet Révéler`, 3, 'font-size:18px;padding:8px 14px', 'zoom')}</div>`,
  n: `<p><b>Étape 1</b> : <b>Effacer toute la mise en forme</b> (le A avec une gomme, Accueil › Police) remet le texte sélectionné au style Normal. Idéal après un collage depuis le web.</p>
<p><b>Étape 2</b> : le texte revient en Aptos noir. Au clavier : <b>Ctrl+Espace</b> efface seulement la mise en forme des <i>caractères</i> (Ctrl+Q celle du paragraphe).</p>
<p><b>Étape 3</b> : <b>Maj+F1</b> ouvre le volet <b>Révéler la mise en forme</b> : police, paragraphe, style appliqués à la sélection. L'outil de diagnostic quand un texte « ne veut pas » changer.</p>` },

/* 23 — VERS LES STYLES */
{ title: 'Vers les styles', html: `${H('Plus de deux fois ? Il vous faut un style', 'Bonne pratique')}
${STAT({ v: '× 40', t: 'titres mis en forme à la main… à refaire si la charte change', x: 70, y: 190, w: 640, s: 1, c: '#DC2626' })}
${STAT({ v: '1 clic', t: 'pour modifier les 40 titres avec un style', x: 70, y: 380, w: 640, s: 2, c: '#16A34A' })}
<svg viewBox="0 0 760 520" style="position:absolute;left:770px;top:180px;width:760px;height:520px">
 ${[0, 1, 2, 3].map(i => `<g class="f" data-s="1"><rect x="${20 + i * 40}" y="${20 + i * 30}" width="420" height="300" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><rect x="${50 + i * 40}" y="${50 + i * 30}" width="200" height="20" rx="4" fill="#94A3B8"/></g>`).join('')}
 <g class="f" data-s="2">${[0, 1, 2, 3].map(i => `<rect x="${50 + i * 40}" y="${50 + i * 30}" width="200" height="20" rx="4" fill="#185ABD"/>`).join('')}
  <rect x="520" y="380" width="220" height="90" rx="16" fill="#185ABD"/><text x="630" y="435" text-anchor="middle" font-size="30" font-weight="900" fill="#fff">Titre 1</text>
  <path d="M520 420 C 400 420, 360 300, 300 200" fill="none" stroke="#FA582D" stroke-width="4" stroke-dasharray="8 8" class="draw" pathLength="1"/></g>
</svg>
${TIP('Prochain module : <b>W03 — Styles, navigation et table des matières</b>.', { s: 3, x: 70, y: 600, w: 640, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : la limite de la mise en forme manuelle : un rapport de 40 titres mis en forme « bleu 14 pt gras » un par un. Si la charte graphique change, il faut tout refaire.</p>
<p><b>Étape 2</b> : avec un <b>style</b>, on modifie une seule fois la définition, les 40 titres changent.</p>
<p><b>Étape 3</b> : règle pratique : si vous appliquez la même mise en forme manuelle plus de deux fois, créez ou utilisez un style. Transition vers W03.</p>` },

/* 24 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Les réflexes de mise en forme', k: 'Récap', hub: 'W02', hsub: 'Mise en forme', hk: 'À RETENIR',
  items: [{ ic: '🔤', t: 'Caractères = sélection', d: 'Ctrl+G · Ctrl+I · Ctrl+U · Maj+F3' }, { ic: '¶', t: 'Paragraphe = curseur', d: 'Ctrl+E · Ctrl+J · alignements' }, { ic: '↕', t: 'Espacement, pas de ligne vide', d: '0 pt avant · 8 pt après · solidaires' },
    { ic: '•', t: 'Listes automatiques', d: 'Tab / Maj+Tab · Recommencer à 1' }, { ic: '🖌️', t: 'Pinceau', d: 'Double-clic = plusieurs cibles · Échap' }] }),
  n: `<p>Interrogez le groupe avant chaque carte : « Que faut-il sélectionner pour centrer ? », « Comment séparer deux paragraphes ? », « Comment descendre d'un niveau dans une liste ? », « Comment appliquer le pinceau à 5 titres ? ».</p>` },

/* 25 — RACCOURCIS */
{ title: 'Raccourcis du module', html: `${H('Huit raccourcis de mise en forme', 'Raccourcis W02')}
${KEYCARDS([{ k: 'Ctrl+G', d: 'Gras' }, { k: 'Ctrl+I', d: 'Italique' }, { k: 'Ctrl+U', d: 'Souligné' }, { k: 'Ctrl+E', d: 'Centrer' }, { k: 'Ctrl+J', d: 'Justifier' }, { k: 'Maj+F3', d: 'Modifier la casse' }, { k: 'Ctrl+Maj+C', d: 'Copier la mise en forme' }, { k: 'Ctrl+Espace', d: 'Effacer la mise en forme des caractères' }], { cols: 4, y: 190 })}
${TIP('Bonus : <b>Ctrl+Maj+G</b> gauche · <b>Ctrl+Maj+D</b> droite · <b>Ctrl+D</b> boîte Police · <b>Maj+F1</b> Révéler', { s: 9, kind: 'key', y: 620, w: 1100 })}`,
  n: `<p>Ces raccourcis sont au programme du lab 2 « Défi raccourcis ». Faites-les répéter à voix haute : G pour Gras, I pour Italique, U pour Underline (souligné), E pour cEntrer, J pour Justifier.</p>
<p>Sur Mac : ⌘+B, ⌘+I, ⌘+U, ⌘+E, ⌘+J.</p>` },

/* 26 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'word', mod: 'w02', lab: 0, title: 'Lab 1 — La note de service RH', tasks: ['Titre en <b>gras</b> et <b>centré</b>', '<b>Justifiez</b> l\'introduction', 'Les 4 conditions en <b>liste à puces</b>', 'Les 3 étapes en <b>liste numérotée</b>', '<b>Surbrillance</b> sur « 30 novembre 2026 »', '<u>Soulignez</u> « au moins deux jours sur site »'] }),
  n: `<p>Scénario : le service RH de <b>Logistique Rhône-Alpes</b> diffuse demain la charte du télétravail ; le texte est validé mais brut.</p>
<p>Solution : 1) Sélection de la 1<sup>re</sup> ligne › Ctrl+G › Ctrl+E. 2) Clic dans « À compter du… » › Ctrl+J. 3) Sélection de « Ordinateur portable… » à « Plages de joignabilité… » › Puces. 4) « Remplir… » à « Signer… » › Numérotation. 5) « 30 novembre 2026 » › Couleur de surbrillance du texte. 6) « au moins deux jours sur site » › Ctrl+U.</p>` },

/* 27 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'word', mod: 'w02', lab: 1, title: 'Lab 2 — Défi raccourcis', tasks: [`${KEYS('Ctrl+G')} ${KEYS('Ctrl+I')} ${KEYS('Ctrl+U')} ${KEYS('Ctrl+E')}`, `${KEYS('Ctrl+Alt+1')} style Titre 1`, `${KEYS('Ctrl+Z')} ${KEYS('Ctrl+Y')} annuler · rétablir`, `${KEYS('Maj+Entrée')} ${KEYS('Ctrl+Entrée')} sauts`, `${KEYS('Ctrl+A')} tout sélectionner — chrono !`] }),
  n: `<p>Défi chronométré : 10 raccourcis à enchaîner le plus vite possible dans le simulateur. Organisez un petit classement dans le groupe.</p>
<p>Séquence : Ctrl+G, Ctrl+I, Ctrl+U, Ctrl+E, Ctrl+Alt+1 (Titre 1, vu au module suivant), Ctrl+Z, Ctrl+Y, Maj+Entrée, Ctrl+Entrée, Ctrl+A.</p>` },

/* 28 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Pour centrer un paragraphe, que faut-il sélectionner ?', o: ['Tout le paragraphe obligatoirement', 'Rien : il suffit que le curseur soit dans le paragraphe', 'Tout le document', 'Le premier mot uniquement'], a: [1], e: 'L\'alignement est une mise en forme de paragraphe : elle s\'applique au paragraphe où se trouve le curseur.' },
  { q: 'Comment séparer proprement deux paragraphes ?', o: ['Avec une ligne vide', 'Avec plusieurs espaces', 'Avec un saut de page', 'Avec l\'espacement après paragraphe'], a: [3], e: 'L\'espacement avant/après se règle une fois et ne crée pas de paragraphes vides parasites.' },
  { q: 'Une liste numérotée reprend à 5 alors que vous voulez 1. Que faites-vous ?', o: ['Clic droit sur le numéro › Recommencer à 1', 'Supprimer la liste et taper 1. à la main', 'Ctrl+Z', 'Changer de police'], a: [0], e: '« Recommencer à 1 » démarre une nouvelle liste ; « Continuer la numérotation » fait l\'inverse.' },
  { q: 'Comment appliquer la mise en forme d\'un titre à 5 autres titres d\'un coup ?', o: ['Copier-coller les titres', 'Simple clic sur le pinceau, puis les 5 titres', 'Double-clic sur le pinceau, peindre les 5 titres, puis Échap', 'Ctrl+A puis Gras'], a: [2], e: 'Le double-clic verrouille le pinceau. (Mieux encore : un style !)' },
  { q: 'Dans une liste à puces, quelle touche fait descendre un élément d\'un niveau ?', o: ['Entrée', 'Tab', 'Maj+Tab', 'Espace'], a: [1], e: 'Tab descend d\'un niveau, Maj+Tab remonte.' },
  { q: 'Lesquelles sont des mises en forme de caractères ?', o: ['Surbrillance', 'Interligne', 'Exposant', 'Retrait de première ligne'], a: [0, 2], e: 'Surbrillance et exposant s\'appliquent à la sélection ; interligne et retrait concernent le paragraphe.' },
] ); }, n: `<p>Réponses : 1) b · 2) d · 3) a · 4) c · 5) b · 6) a et c.</p>` },

/* 29 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W02', html: END(), n: `<p>Fin du module W02. Prochain module : <b>W03 — Styles, titres, navigation et table des matières</b>, le « super-pouvoir » de Word.</p>` },
] };
