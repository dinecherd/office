/* ===================== MODULE W06 — Révision et collaboration : commentaires, suivi des modifications, comparer, protéger ===================== */
const SECSW06 = ['Commenter un document', 'Suivre et comparer les modifications', 'Protéger et préparer la diffusion'];

/* --- helpers locaux W06 --- */
const DLGW06 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="${o.s ? '' : `--d:${o.d ?? .3}s;`}position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:0;overflow:hidden;border-radius:12px;font-family:'Segoe UI',var(--font)">
  <div style="display:flex;align-items:center;height:44px;padding:0 18px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:18px;font-weight:700;color:#1B2A41">${o.t}<span style="margin-left:auto;color:#94A3B8;font-weight:400">✕</span></div>
  <div style="padding:18px 22px;font-size:18px;color:#1B2A41;display:flex;flex-direction:column;gap:12px">${o.html}</div></div>`;
const FLDW06 = (l, v, o = {}) => `<div style="display:flex;align-items:center;gap:12px" ${o.s ? `class="f" data-s="${o.s}"` : ''}><span style="min-width:${o.lw ?? 170}px;color:#33445E">${l}</span><span style="flex:1;padding:6px 12px;border:1.5px solid ${o.hot ? '#FA582D' : '#CBD5E1'};border-radius:6px;background:#fff;font-weight:600;${o.hot ? 'box-shadow:0 0 0 4px rgba(250,88,45,.15);' : ''}">${v}</span></div>`;
const BTNW06 = (t, p) => `<span style="display:inline-block;padding:6px 18px;border-radius:6px;font-size:16px;font-weight:700;${p ? 'background:#185ABD;color:#fff' : 'background:#fff;border:1.5px solid #CBD5E1;color:#1B2A41'}">${t}</span>`;
const MENUW06 = o => `<div class="card ${o.s ? 'f zoom' : 'a pop'}" ${o.s ? `data-s="${o.s}"` : ''} style="position:absolute;left:${o.x}px;top:${o.y}px;width:${o.w}px;padding:8px 0;border-radius:10px;font-family:'Segoe UI',var(--font)">
  ${o.items.map(it => `<div ${it.hot ? `class="f" data-s="${it.hot}"` : ''} style="display:flex;gap:14px;align-items:center;padding:10px 18px;font-size:19px;${it.hot ? 'background:#FFF1EC;box-shadow:inset 4px 0 0 #FA582D;font-weight:700;' : ''}"><span style="width:28px;text-align:center">${it.i || ''}</span>${it.t}</div>`).join('')}</div>`;
/* chaîne d'étapes horizontale (icône ronde + titre + détail), reliée par un trait animé */
const CHAINW06 = (list, o = {}) => { const n = list.length, w = o.w ?? 1460, cw = w / n, s0 = o.s0 ?? 1, R = o.r ?? 56;
  return `<div style="position:absolute;left:${o.x ?? 70}px;top:${o.y ?? 200}px;width:${w}px;height:${o.h ?? 340}px">
  <svg viewBox="0 0 ${w} ${R * 2}" style="position:absolute;left:0;top:0;width:${w}px;height:${R * 2}px;overflow:visible">
   ${list.slice(1).map((_, i) => `<g class="f" data-s="${s0 + i + 1}"><path d="M${cw * i + cw / 2 + R} ${R} H${cw * (i + 1) + cw / 2 - R}" stroke="#FA582D" stroke-width="4" stroke-dasharray="10 8" fill="none"/></g>`).join('')}
   <g class="f" data-s="${s0 + n - 1}"><circle r="8" fill="#FA582D" filter="url(#gl)"><animateMotion dur="${n * 0.9}s" repeatCount="indefinite" path="M${cw / 2} ${R} H${cw * (n - 1) + cw / 2}"/></circle></g>
  </svg>
  ${list.map((it, i) => `<div class="f zoom" data-s="${s0 + i}" style="position:absolute;left:${cw * i}px;top:0;width:${cw}px;text-align:center">
   <div style="width:${R * 2}px;height:${R * 2}px;margin:0 auto;border-radius:50%;background:${it.c ? it.c : '#fff'};box-shadow:0 14px 30px -12px rgba(14,23,38,.35),0 0 0 3px ${it.c ? 'rgba(255,255,255,.6)' : '#FFD9CC'};display:grid;place-items:center;font-size:${R * .8}px;position:relative;z-index:1">${it.i}</div>
   <div style="font-size:22px;font-weight:800;margin-top:14px;padding:0 8px">${it.t}</div>${it.d ? `<div style="font-size:17px;color:#6B7A90;margin-top:4px;padding:0 10px;line-height:1.35">${it.d}</div>` : ''}</div>`).join('')}
  </div>`; };
/* bulle de commentaire */
const CMTW06 = o => `<div ${o.s ? `class="f right" data-s="${o.s}"` : ''} style="background:#fff;border:1.5px solid ${o.on ? '#185ABD' : '#E3E8EF'};border-radius:10px;padding:12px 14px;box-shadow:0 10px 24px -14px rgba(14,23,38,.4);font-family:'Segoe UI',var(--font);${o.style || ''}">
  <div style="display:flex;align-items:center;gap:10px"><span style="width:32px;height:32px;border-radius:50%;background:${o.c};color:#fff;display:grid;place-items:center;font-size:13px;font-weight:800">${o.ini}</span><div><div style="font-size:15px;font-weight:700">${o.name}</div><div style="font-size:12px;color:#6B7A90">${o.time || 'à l\'instant'}</div></div></div>
  <div style="font-size:15px;line-height:1.4;margin-top:8px;color:#1B2A41">${o.text}</div>${o.extra || ''}</div>`;
const DELW06 = t => `<del style="color:#DC2626;text-decoration-thickness:2px">${t}</del>`;
const INSW06 = (t, c = '#2563EB') => `<u style="color:${c};text-decoration-thickness:2px;text-underline-offset:3px">${t}</u>`;

window.MODULE = { code: 'W06', title: 'Révision et collaboration : commentaires, suivi des modifications, comparer, protéger', short: 'Révision et collaboration', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Révision et collaboration', html: TITLE({ mod: 'WORD · MODULE 06 · AVANCÉ', title: 'Relire <span class="grad">à plusieurs</span>, sans rien perdre', sub: '« Commentaires, suivi des modifications, comparaison et protection »', agenda: SECSW06, art: APPART('word') }),
  n: `<p>Module 06 : la relecture collaborative. Public : juristes, RH, assistants, chefs de projet — tous ceux qui font circuler des contrats, des chartes, des rapports entre plusieurs relecteurs.</p>
  <p>Fil rouge : un contrat de prestation que l'on fait relire, que l'on corrige avec le suivi des modifications, que l'on compare avec la version renvoyée par le partenaire, puis que l'on verrouille avant diffusion.</p>
  <p>Durée indicative : 60 minutes, deux labs.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Insérer, <b>répondre</b> et <b>résoudre</b> des commentaires', 'Activer le <b>suivi des modifications</b>, accepter ou refuser chaque changement', '<b>Comparer</b> deux versions d\'un document', '<b>Restreindre</b> la modification et <b>nettoyer</b> un document avant diffusion']),
  n: `<p>Quatre objectifs. La question à poser d'entrée : « Avez-vous déjà reçu un document où l'on voyait encore les commentaires internes de l'expéditeur ? » — presque toujours oui. À la fin du module, ça ne vous arrivera plus.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSW06, 0),
  n: `<p>Première partie : les commentaires — l'outil de discussion dans la marge.</p>` },

/* 4 — NOUVEAU COMMENTAIRE (APPWIN) */
{ title: 'Nouveau commentaire', html: `${H('Commenter un passage', 'Commentaires', PATH('Révision > Nouveau commentaire'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 1460, h: 620, title: 'Contrat traiteur.docx', tab: 'Révision',
  groups: [['Vérification', ['🔤 Éditeur', '📖 Synonymes']], ['Commentaires', ['💬 Nouveau commentaire', '🗑️ Supprimer', '◀', '▶', '🗨️ Afficher les commentaires']], ['Suivi', ['📝 Suivi des modifications', 'Toutes les marques ▾']], ['Modifications', ['✅ Accepter', '❌ Refuser']], ['Comparer', ['🔀 Comparer']], ['Protéger', ['🔒 Restreindre la modification']]],
  hot: { '💬 Nouveau commentaire': 1 },
  body: `<div style="display:flex;gap:24px;padding:20px 30px;height:100%">
   <div style="flex:1;background:#fff;border-radius:4px;box-shadow:0 10px 30px -18px rgba(14,23,38,.4);padding:30px 44px;font-family:Calibri,'Segoe UI',sans-serif">
    <div style="font-size:22px;color:#2F5496;font-weight:600;margin-bottom:10px">Article 5 — Annulation</div>
    <p style="font-size:18px;line-height:1.6;margin:0">En cas d'annulation par le Client moins de 30 jours avant l'événement, des <span style="background:#FFE7A3;border-bottom:3px solid #F5B301">pénalités</span> égales à 100 % du prix resteront dues au Prestataire.</p>
    <div style="margin-top:16px">${LINES(4)}</div></div>
   <div style="width:400px;display:flex;flex-direction:column;gap:12px;padding-top:10px">
    ${CMTW06({ s: 2, on: 1, c: '#7C3AED', ini: 'CL', name: 'Claire Lemoine', time: 'il y a 2 min', text: 'Ramener les pénalités à <b>50 %</b> du prix ? 100 % est excessif.' })}
    ${CMTW06({ s: 3, c: '#0EA5E9', ini: 'MD', name: 'Marc Dubois', time: 'à l\'instant', text: '<b style="color:#185ABD">@Claire Lemoine</b> D\'accord, je propose 50 % au-delà de 15 jours.', style: 'margin-left:30px' })}
    <div class="f zoom" data-s="4" style="align-self:flex-start;display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;background:#ECFDF3;color:#15803D;font-weight:700;font-size:16px">✔ Résolu</div>
   </div></div>` })}`,
  n: `<p><b>Étape 1</b> : sélectionnez le passage concerné (ici « pénalités »), puis <i>Révision › Nouveau commentaire</i> ou <b>Ctrl+Alt+M</b>. Le passage est surligné et ancré au commentaire.</p>
  <p><b>Étape 2</b> : le commentaire apparaît dans la marge avec votre <b>nom</b> — il vient de <i>Fichier › Options › Général › Nom d'utilisateur</i> (ou de votre compte Microsoft 365). Vérifiez-le sur les postes partagés !</p>
  <p><b>Étape 3</b> : on <b>répond</b> dans le fil plutôt que de créer un nouveau commentaire. Dans un fichier stocké sur OneDrive/SharePoint, taper <b>@Prénom</b> mentionne la personne : elle reçoit un e-mail avec un lien vers le passage.</p>
  <p><b>Étape 4</b> : <b>Résoudre</b> marque le sujet comme traité sans le supprimer ; on peut le rouvrir. Démo : montrez le menu « … » du commentaire (Résoudre le fil, Supprimer le fil, Lien vers le commentaire).</p>` },

/* 5 — BON COMMENTAIRE (VS) */
{ title: 'Un bon commentaire', html: `${H('Un commentaire utile est actionnable', 'Bonnes pratiques')}
${VS({ y: 185, mid: '➜',
  l: { t: 'Inutile', c: '#DC2626', ic: '✘', html: `<div style="display:flex;flex-direction:column;gap:14px">${CMTW06({ c: '#64748B', ini: 'JP', name: 'Jean P.', text: 'bof' })}${CMTW06({ c: '#64748B', ini: 'JP', name: 'Jean P.', text: 'À revoir.' })}${CMTW06({ c: '#64748B', ini: 'JP', name: 'Jean P.', text: 'J\'ai changé 90 en 45 et supprimé la fin.' })}</div>` },
  r: { t: 'Actionnable', c: '#16A34A', ic: '✔', html: `<div style="display:flex;flex-direction:column;gap:14px">${CMTW06({ c: '#7C3AED', ini: 'CL', name: 'Claire L.', text: 'Remplacer <b>30 jours</b> par <b>45 jours</b>, conformément à la loi LME ?' })}${CMTW06({ c: '#7C3AED', ini: 'CL', name: 'Claire L.', text: 'Préciser l\'assurance RC du Prestataire (montant garanti).' })}${CMTW06({ c: '#7C3AED', ini: 'CL', name: 'Claire L.', text: 'Clause supprimée (suivi activé) : exclusivité de 5 ans déséquilibrée.' })}</div>` } })}
${TIP('Un commentaire <b>n\'est pas</b> une modification : on modifie le texte avec le <b>suivi activé</b>, on commente pour <b>expliquer</b>.', { s: 3, x: 70, y: 690, w: 1460, kind: 'warn' })}`,
  n: `<p><b>Étape 1</b> : des commentaires qu'on voit tous les jours. « bof », « à revoir » : le rédacteur ne sait pas quoi faire. Le troisième décrit une modification faite <b>sans suivi</b> : personne ne peut la vérifier ni la refuser proprement.</p>
  <p><b>Étape 2</b> : un bon commentaire propose une action, une justification, et pose éventuellement une question fermée. Il est court.</p>
  <p><b>Étape 3</b> : règle d'or — on <b>modifie</b> avec le suivi des modifications (partie 2), et on réserve le commentaire à l'<b>explication</b> de la modification. Question au groupe : quelles sont vos règles de relecture dans l'équipe ?</p>` },

/* 6 — CYCLE DE VIE D'UN COMMENTAIRE */
{ title: 'Le fil de discussion', html: `${H('La vie d\'un commentaire', 'Fil de discussion')}
${CHAINW06([{ i: '💬', t: 'Créer', d: 'Ctrl+Alt+M sur une sélection' }, { i: '↩️', t: 'Répondre', d: 'Dans le même fil, pas un nouveau' }, { i: '📧', t: '@mention', d: 'E-mail envoyé (OneDrive / SharePoint)' }, { i: '✅', t: 'Résoudre', d: 'Traité, mais conservé' }, { i: '🗑️', t: 'Supprimer', d: 'Avant diffusion externe' }], { y: 210 })}
${TIP('<b>Résoudre ≠ supprimer</b> : un fil résolu reste dans le fichier et sera visible par le destinataire.', { s: 6, x: 70, y: 470, w: 1460, kind: 'warn' })}
<div class="f" data-s="6" style="position:absolute;left:70px;top:580px;width:1460px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
 ${CMTW06({ on: 1, c: '#7C3AED', ini: 'CL', name: 'Claire Lemoine · fil ouvert', text: 'Ramener les pénalités à 50 % du prix ?' })}
 ${CMTW06({ c: '#94A3B8', ini: 'CL', name: 'Claire Lemoine · <span style="color:#15803D">✔ Résolu</span>', text: '<span style="color:#94A3B8">Ramener les pénalités à 50 % du prix ?</span>', style: 'opacity:.75;background:#F8FAFC' })}
</div>`,
  n: `<p>Le cycle de vie d'un commentaire, en cinq temps (une étape par clic).</p>
  <p><b>Étape 1</b> : création sur une sélection précise — pas sur tout le paragraphe.</p>
  <p><b>Étape 2</b> : réponse dans le fil : on garde le contexte, l'historique de la discussion.</p>
  <p><b>Étape 3</b> : la @mention ne fonctionne que pour un fichier stocké dans OneDrive ou SharePoint, avec des personnes de l'organisation. La personne reçoit un e-mail et peut répondre depuis Outlook.</p>
  <p><b>Étape 4</b> : on résout quand le point est traité : le fil se grise.</p>
  <p><b>Étape 5</b> : avant de sortir le document de l'entreprise, on supprime tous les commentaires.</p>
  <p><b>Étape 6</b> : piège — un fil résolu n'est pas supprimé.</p>` },

/* 7 — AFFICHER ET SUPPRIMER */
{ title: 'Afficher et supprimer', html: `${H('Afficher, parcourir, tout supprimer', 'Gérer les commentaires')}
${PROC([{ p: 'Révision > Afficher les commentaires > Liste', t: 'Volet <b>Commentaires</b> : tous les fils, filtrables' }, { p: 'Révision > Commentaires > Précédent / Suivant', t: 'Parcourir les commentaires un par un' }, { p: 'Fichier > Options > Général', t: '<b>Nom d\'utilisateur</b> et initiales affichés' }], { x: 70, y: 185, w: 760 })}
<div class="a pop" style="--d:.3s;position:absolute;left:900px;top:185px;display:flex;gap:6px;align-items:center;padding:10px 18px;background:#fff;border-radius:10px;box-shadow:var(--sh);font-size:20px;font-weight:700"><span style="font-size:26px">🗑️</span>Supprimer ▾</div>
${MENUW06({ s: 4, x: 900, y: 255, w: 630, items: [{ i: '🗑️', t: 'Supprimer' }, { i: '👁️', t: 'Supprimer tous les commentaires affichés' }, { i: '🧹', t: 'Supprimer tous les commentaires du document', hot: 5 }] })}
${TIP('Avant une diffusion <b>externe</b> : supprimer <b>tous</b> les commentaires du document.', { s: 5, x: 900, y: 480, w: 630, kind: 'warn' })}
<div class="f" data-s="1" style="position:absolute;left:70px;top:520px;width:760px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 ${[['Contextuelle', `<div style="display:flex;gap:8px;height:150px"><div style="flex:1;background:#fff;border-radius:4px;padding:12px">${LINES(5)}</div><div style="width:70px;display:flex;flex-direction:column;gap:8px"><i style="height:34px;border-radius:6px;background:#EDE9FE;border:1.5px solid #7C3AED"></i><i style="height:34px;border-radius:6px;background:#E0F2FE;border:1.5px solid #0EA5E9"></i></div></div>`], ['Liste', `<div style="display:flex;gap:8px;height:150px"><div style="flex:1;background:#fff;border-radius:4px;padding:12px">${LINES(5)}</div><div style="width:110px;background:#fff;border-radius:4px;padding:8px;display:flex;flex-direction:column;gap:6px"><b style="font-size:12px">Commentaires</b>${'<i style="height:20px;border-radius:4px;background:#F1F5F9"></i>'.repeat(4)}</div></div>`]].map(([t, h]) => `<div class="card" style="padding:14px 16px;background:#E9EBEF"><div style="font-size:19px;font-weight:800;margin-bottom:8px">${t}</div>${h}</div>`).join('')}
</div>`,
  n: `<p><b>Étape 1</b> : <i>Afficher les commentaires</i> propose deux vues : <b>Contextuelle</b> (bulles dans la marge, à côté du texte) et <b>Liste</b> (volet Commentaires à droite, pratique pour un long document).</p>
  <p><b>Étape 2</b> : Précédent / Suivant pour enchaîner les commentaires sans scroller.</p>
  <p><b>Étape 3</b> : vérifiez le nom d'utilisateur. Sur un poste partagé ou un PC fraîchement installé, les commentaires peuvent être signés « Utilisateur » ou du nom d'un collègue. Cochez <i>Toujours utiliser ces valeurs, quel que soit l'état de connexion à Office</i> si besoin.</p>
  <p><b>Étapes 4-5</b> : le menu déroulant du bouton <b>Supprimer</b>. « Supprimer tous les commentaires affichés » respecte un filtre par personne (pratique pour retirer seulement les commentaires internes). « Supprimer tous les commentaires du document » fait place nette.</p>` },

/* 8 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSW06, 1),
  n: `<p>Deuxième partie : le suivi des modifications — la mémoire de chaque changement — puis la comparaison de versions.</p>` },

/* 9 — SUIVI DES MODIFICATIONS */
{ title: 'Le suivi des modifications', html: `${H('Le suivi des modifications', 'Suivi', PATH('Révision > Suivi des modifications'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:185px;width:520px;padding:26px 30px;display:flex;flex-direction:column;gap:18px;align-items:flex-start">
 <div style="font-size:24px;font-weight:800">Activer / désactiver</div>${KEYS('Ctrl+Maj+E')}
 <div class="f" data-s="1" style="display:flex;align-items:center;gap:14px;font-size:20px;font-weight:700"><span style="width:70px;height:36px;border-radius:18px;background:#185ABD;position:relative;display:inline-block"><span style="position:absolute;right:4px;top:4px;width:28px;height:28px;border-radius:50%;background:#fff"></span></span>Suivi : <span style="color:#185ABD">Activé</span></div>
</div>
<div class="f" data-s="5" style="position:absolute;left:70px;top:440px;width:520px;display:flex;flex-direction:column;gap:12px">
 ${[['#7C3AED', 'Claire Lemoine'], ['#0EA5E9', 'Marc Dubois'], ['#16A34A', 'Sophie Martin']].map(([c, n]) => `<div class="card" style="display:flex;align-items:center;gap:14px;padding:12px 18px;font-size:19px;font-weight:700"><span style="width:22px;height:22px;border-radius:6px;background:${c}"></span>${n}</div>`).join('')}
</div>
${TIP('Clic droit sur la <b>barre d\'état</b> › cocher « Suivi des modifications » : on voit en permanence s\'il est actif.', { s: 5, x: 630, y: 640, w: 900, kind: 'key' })}
${PAGE({ x: 630, y: 185, w: 900, h: 420, html: `<h2 style="margin-top:0">Article 3 — Prix et paiement</h2>
 <div style="position:relative;font-size:21px;line-height:1.8">
  <span class="f" data-s="4" style="position:absolute;left:-30px;top:4px;bottom:4px;width:4px;background:#6B7A90;border-radius:2px"></span>
  Le prix forfaitaire est fixé à 18 500 € HT pour 250 couverts. Les factures sont payables à <span class="f" data-s="2" style="display:inline">${DELW06('90')}</span><span class="f" data-s="3" style="display:inline"> ${INSW06('45', '#7C3AED')}</span> jours fin de mois à compter de leur émission.</div>
 <div style="margin-top:20px">${LINES(4)}</div>
 <div style="display:flex;gap:24px;margin-top:14px;font-size:18px"><span class="f" data-s="2">${DELW06('barré')} = suppression</span><span class="f" data-s="3">${INSW06('souligné', '#7C3AED')} = insertion</span><span class="f" data-s="4"><b style="color:#6B7A90">│</b> = ligne modifiée</span></div>` })}`,
  n: `<p>Le suivi des modifications enregistre <b>qui</b> a changé <b>quoi</b> et <b>quand</b>.</p>
  <p><b>Étape 1</b> : <b>Ctrl+Maj+E</b> ou <i>Révision › Suivi des modifications</i>. Le bouton reste enfoncé. Astuce : clic droit sur la barre d'état › cocher <i>Suivi des modifications</i> pour voir en permanence s'il est actif.</p>
  <p><b>Étape 2</b> : une suppression n'efface plus le texte : il apparaît <b>barré</b>.</p>
  <p><b>Étape 3</b> : une insertion apparaît <b>soulignée</b>, dans la couleur du relecteur.</p>
  <p><b>Étape 4</b> : un trait vertical dans la marge signale chaque ligne modifiée.</p>
  <p><b>Étape 5</b> : chaque relecteur a sa couleur (attribuée automatiquement par auteur). Les changements de mise en forme sont aussi suivis (bulle « Mis en forme : Gras » dans la marge).</p>` },

/* 10 — LES 4 AFFICHAGES */
{ title: 'Les quatre affichages', html: `${H('Quatre façons d\'afficher les révisions', 'Afficher pour révision', PATH('Révision > Suivi > Afficher pour révision'))}
<div style="position:absolute;left:70px;top:180px;width:1460px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
 ${[['Marques simples', 'Lire le texte modifié', `<span style="position:absolute;left:10px;top:28px;bottom:28px;width:4px;background:#DC2626;border-radius:2px"></span>payables à 45 jours fin de mois`],
    ['Toutes les marques', 'Voir chaque changement', `payables à ${DELW06('90')} ${INSW06('45', '#7C3AED')} jours fin de mois`],
    ['Aucune marque', 'Voir le résultat final', `payables à 45 jours fin de mois`],
    ['Original', 'Voir le texte d\'avant', `payables à 90 jours fin de mois`]].map(([t, d, ex], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:0;overflow:hidden"><div style="padding:16px 20px;background:${i === 2 ? '#FEF2F2' : '#F6F7F9'};border-bottom:1px solid #E3E8EF"><div style="font-size:22px;font-weight:800">${t}</div><div style="font-size:17px;color:#6B7A90">${d}</div></div>
  <div style="position:relative;padding:28px 26px 28px 30px;font:20px/1.6 Calibri,'Segoe UI',sans-serif;min-height:150px">${ex}</div></div>`).join('')}
</div>
${TIP('<b>Aucune marque</b> est un simple <b>affichage</b> : les révisions sont toujours dans le fichier ! Pour les faire disparaître : <b>accepter ou refuser</b>.', { s: 5, x: 70, y: 470, w: 1460, kind: 'warn' })}
${TIP('En <b>Marques simples</b>, cliquez sur le trait rouge de la marge pour basculer en Toutes les marques.', { s: 6, x: 70, y: 590, w: 1460, kind: 'tip' })}`,
  n: `<p>La liste déroulante du groupe Suivi (souvent affichée « Toutes les marques » ou « Marques simples ») change seulement l'<b>affichage</b>.</p>
  <p><b>Étape 1</b> : <b>Marques simples</b> — on lit le texte final, un trait rouge dans la marge signale les zones changées. Cliquer sur le trait bascule en Toutes les marques.</p>
  <p><b>Étape 2</b> : <b>Toutes les marques</b> — chaque insertion et suppression visible. C'est l'affichage de travail du relecteur.</p>
  <p><b>Étape 3</b> : <b>Aucune marque</b> — l'aperçu du texte si on acceptait tout.</p>
  <p><b>Étape 4</b> : <b>Original</b> — le texte comme si on refusait tout.</p>
  <p><b>Étape 5</b> : l'erreur classique (et dangereuse) : passer en « Aucune marque » puis envoyer le document. Le destinataire l'ouvre… et voit toutes les modifications et les commentaires. Anecdote possible : les contrats ou CV envoyés avec l'historique des négociations visible.</p>
  <p><b>Étape 6</b> : astuce de lecture — en Marques simples, le trait rouge de la marge est cliquable et bascule en Toutes les marques (il devient gris).</p>` },

/* 11 — ACCEPTER / REFUSER */
{ title: 'Accepter ou refuser', html: `${H('Accepter ou refuser chaque modification', 'Modifications', PATH('Révision > Modifications > Accepter'))}
${APPWIN({ app: 'word', x: 70, y: 175, w: 860, h: 610, title: 'Contrat traiteur.docx', tab: 'Révision',
  groups: [['Suivi', ['📝 Suivi des modifications', '📋 Volet Révisions']], ['Modifications', ['✅ Accepter', '❌ Refuser', '⬆️ Précédente', '⬇️ Suivante']]],
  hot: { '⬇️ Suivante': 1, '✅ Accepter': 2 },
  body: PAGE({ inwin: true, w: 640, html: `<h2 style="margin-top:0">Article 3 — Prix</h2><p style="font-size:18px">Payables à <span style="outline:3px solid #FA582D;outline-offset:3px;border-radius:2px">${DELW06('90')} ${INSW06('45', '#7C3AED')}</span> jours fin de mois.</p><h2>Article 7 — Exclusivité</h2><p style="font-size:18px">Le Client s'engage pour cinq ans. ${DELW06('Cette clause ne peut être résiliée par le Client.')}</p>` }) })}
${MENUW06({ s: 3, x: 960, y: 175, w: 570, items: [{ i: '✅', t: 'Accepter et passer à la suivante', hot: 3 }, { i: '✔', t: 'Accepter cette modification' }, { i: '👁️', t: 'Accepter toutes les modifications affichées' }, { i: '☑️', t: 'Accepter toutes les modifications' }, { i: '⏹', t: 'Accepter toutes les modifications et arrêter le suivi' }] })}
${TIP('Refuser une suppression = le texte <b>revient</b>. Refuser une insertion = le texte <b>disparaît</b>.', { s: 4, x: 960, y: 455, w: 570, kind: 'tip' })}
${TIP('<b>Afficher les marques › Personnes</b> : traiter un relecteur à la fois.', { s: 5, x: 960, y: 600, w: 570, kind: 'key' })}`,
  n: `<p>Le propriétaire du document tranche : chaque modification est acceptée (elle devient du texte normal) ou refusée (on revient à l'original).</p>
  <p><b>Étape 1</b> : <b>Suivante</b> sélectionne la prochaine modification (ou le prochain commentaire).</p>
  <p><b>Étape 2</b> : <b>Accepter</b> — le bouton du haut accepte et passe à la suivante.</p>
  <p><b>Étape 3</b> : la flèche ▾ sous Accepter offre les variantes, dont « Accepter toutes les modifications » — à n'utiliser qu'après avoir tout relu. « … et arrêter le suivi » désactive le suivi en même temps.</p>
  <p><b>Étape 4</b> : <b>Refuser</b> : attention au sens — refuser la suppression de la clause d'exclusivité la fait revenir.</p>
  <p><b>Étape 5</b> : <i>Afficher les marques › Personnes</i> permet de ne voir (et de n'accepter en bloc) que les modifications d'un relecteur. Clic droit sur une modification : Accepter / Refuser directement.</p>` },

/* 12 — VOLET RÉVISIONS */
{ title: 'Le volet Révisions', html: `${H('Le volet Révisions : la liste complète', 'Volet Révisions')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:620px;padding:0;overflow:hidden;font-family:'Segoe UI',var(--font)">
 <div style="padding:14px 20px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:19px;font-weight:800">Révisions <span style="font-weight:400;color:#6B7A90">· 6 révisions</span></div>
 <div style="padding:10px 20px;font-size:16px;color:#33445E;border-bottom:1px solid #E3E8EF">4 insertions · 1 suppression · 1 commentaire</div>
 ${[['#7C3AED', 'Claire Lemoine', 'Supprimé', DELW06('90')], ['#7C3AED', 'Claire Lemoine', 'Inséré', INSW06('45', '#7C3AED')], ['#0EA5E9', 'Marc Dubois', 'Supprimé', DELW06('Cette clause ne peut…')], ['#0EA5E9', 'Marc Dubois', 'Commentaire', 'Préciser l\'assurance RC'], ['#16A34A', 'Sophie Martin', 'Inséré', INSW06('Article 10 — Assurance', '#16A34A')]].map(([c, n, a, t], i) => `
 <div class="f left" data-s="${i < 2 ? 1 : i < 4 ? 2 : 3}" style="display:flex;gap:14px;padding:12px 20px;border-bottom:1px solid #EEF0F3;border-left:5px solid ${c}"><div><div style="font-size:16px;font-weight:700">${n} <span style="font-weight:400;color:#6B7A90">${a}</span></div><div style="font-size:18px;margin-top:2px">${t}</div></div></div>`).join('')}
</div>
${DLGW06({ s: 4, x: 740, y: 180, w: 520, t: 'Afficher les marques › Personnes', html: `<div style="line-height:2;font-size:19px">☑ Tous les relecteurs<br>☑ <span style="color:#7C3AED;font-weight:700">Claire Lemoine</span><br>☐ <span style="color:#0EA5E9;font-weight:700">Marc Dubois</span><br>☐ <span style="color:#16A34A;font-weight:700">Sophie Martin</span></div>` })}
${STAT({ v: '6', t: 'révisions restantes : le compteur doit tomber à 0 avant diffusion', x: 740, y: 520, w: 520, s: 5, c: '#DC2626' })}
<div class="f zoom" data-s="5" style="position:absolute;left:1300px;top:540px;font-size:80px">➜</div><div class="f zoom" data-s="5" style="position:absolute;left:1400px;top:540px;font:900 80px var(--font);color:#16A34A">0</div>`,
  n: `<p><i>Révision › Suivi › Volet Révisions</i> (vertical ou horizontal) liste toutes les révisions du document, y compris celles des en-têtes, notes et zones de texte, avec un résumé chiffré.</p>
  <p><b>Étapes 1 à 3</b> : chaque relecteur a sa couleur ; cliquer sur une ligne du volet amène à la modification dans le texte.</p>
  <p><b>Étape 4</b> : <i>Afficher les marques › Personnes</i> filtre par relecteur. Combiné avec « Accepter toutes les modifications affichées », on peut accepter en bloc les corrections orthographiques de l'assistante et traiter une à une celles du juriste.</p>
  <p><b>Étape 5</b> : le compteur en haut du volet est le meilleur contrôle avant envoi : il doit afficher <b>0 révision</b>.</p>` },

/* 13 — VERROUILLER LE SUIVI */
{ title: 'Verrouiller le suivi', html: `${H('Empêcher de désactiver le suivi', 'Verrouiller le suivi', PATH('Révision > Suivi des modifications > Verrouiller le suivi'))}
${DLGW06({ x: 70, y: 185, w: 640, t: 'Verrouiller le suivi', html: `<div style="font-size:17px;color:#33445E">Empêcher les autres auteurs de désactiver le suivi des modifications.</div>${FLDW06('Entrer le mot de passe :', '••••••••', { lw: 250 })}${FLDW06('Confirmer :', '••••••••', { lw: 250 })}<div style="display:flex;gap:10px;justify-content:flex-end">${BTNW06('OK', 1)}${BTNW06('Annuler')}</div>` })}
<svg viewBox="0 0 300 300" class="a pop float" style="--d:.5s;position:absolute;left:240px;top:470px;width:300px;height:300px"><rect x="70" y="130" width="160" height="130" rx="22" fill="url(#gO)"/><path d="M100 130 V95 a50 50 0 0 1 100 0 V130" fill="none" stroke="#33445E" stroke-width="18" stroke-linecap="round"/><circle cx="150" cy="190" r="16" fill="#fff"/><rect x="143" y="195" width="14" height="36" rx="6" fill="#fff"/></svg>
<div style="position:absolute;left:770px;top:185px;width:760px;display:flex;flex-direction:column;gap:18px">
 ${CARD('<b>Option 1 · Verrouiller le suivi</b><br>Le relecteur ne peut plus cliquer sur « Suivi des modifications ».', 1, 'font-size:21px')}
 ${CARD('<b>Option 2 · Restreindre la modification</b><br>Type : <b>Modifications suivies</b> — toute modification est enregistrée.', 2, 'font-size:21px')}
 ${CARD('<b>Pour quoi faire ?</b><br>Contrats, procédures qualité, chartes : <b>aucun changement invisible</b>.', 3, 'font-size:21px')}
</div>
${TIP('Le mot de passe est facultatif… mais sans lui, n\'importe qui peut déverrouiller.', { s: 4, x: 770, y: 640, w: 760, kind: 'tip' })}`,
  n: `<p>Problème : un relecteur désactive le suivi « pour aller plus vite », modifie, puis le réactive. Ces changements sont invisibles.</p>
  <p><b>Étape 1</b> : la flèche du bouton Suivi des modifications › <b>Verrouiller le suivi</b>, avec un mot de passe. Le bouton est grisé pour tous ceux qui ne l'ont pas.</p>
  <p><b>Étape 2</b> : alternative plus complète, vue en partie 3 : <i>Restreindre la modification › Modifications suivies</i>.</p>
  <p><b>Étape 3</b> : les cas d'usage. Pour un document envoyé à l'extérieur (un contrat au partenaire), verrouiller le suivi garantit que vous verrez tout ce qu'il change… à condition qu'il utilise Word. Sinon : comparer (diapo suivante).</p>
  <p><b>Étape 4</b> : ce mot de passe n'est pas un chiffrement : il protège contre l'oubli, pas contre un utilisateur déterminé.</p>` },

/* 14 — COMPARER (FLOW) */
{ title: 'Comparer deux versions', html: `${H('Un document revient sans suivi ? Comparez.', 'Comparer', PATH('Révision > Comparer > Comparer…'))}
${FLOW({ x: 70, y: 170, w: 1460, h: 520,
  z: [{ x: 0, y: 10, w: 380, h: 500, l: 'VERSIONS', c: '#185ABD' }, { x: 1080, y: 10, w: 380, h: 500, l: 'RÉSULTAT', c: '#16A34A', s: 3 }],
  n: { v1: { x: 190, y: 150, ic: 'docx', sz: 100, l: 'charte-v1.docx', sub: 'Document original' }, v2: { x: 190, y: 380, ic: 'docx', sz: 100, l: 'charte-v2.docx', sub: 'Document révisé', s: 1 },
    cmp: { x: 730, y: 265, ic: 'word', sz: 110, hot: true, l: 'Comparer…', sub: 'Révision › Comparer', s: 2 }, res: { x: 1270, y: 265, ic: 'docx', sz: 110, l: 'Document comparé', sub: 'écarts = modifications suivies', s: 3 } },
  l: [{ a: 'v1', b: 'cmp', r: 'hvh', s: 2 }, { a: 'v2', b: 'cmp', r: 'hvh', s: 2 }, { a: 'cmp', b: 'res', s: 3 }],
  p: [{ s: 3, c: '#FA582D', seg: [{ via: ['v2', 'cmp'], lab: 'v2', t: 1.6 }, { via: ['cmp', 'res'], lab: 'écarts', t: 1.6 }] }] })}
${TIP('Le partenaire n\'a pas activé le suivi ? <b>Comparer</b> fait réapparaître <b>toutes</b> ses modifications, même cachées.', { s: 4, x: 70, y: 700, w: 1460, kind: 'ok' })}`,
  n: `<p>Situation classique : vous envoyez la v1 d'un contrat, le partenaire renvoie une v2 « avec quelques retouches »… sans suivi des modifications.</p>
  <p><b>Étape 1</b> : on dispose de deux fichiers : l'original (le vôtre) et le révisé (le sien).</p>
  <p><b>Étape 2</b> : <i>Révision › Comparer › Comparer…</i>. On désigne le document original et le document révisé.</p>
  <p><b>Étape 3</b> : Word produit un <b>troisième document</b> (aucun des deux fichiers n'est modifié) où toutes les différences apparaissent comme des modifications suivies, attribuées au nom choisi.</p>
  <p><b>Étape 4</b> : même une virgule modifiée « en douce » apparaît. C'est l'outil le plus rentable du module pour les juristes et acheteurs. On peut ensuite accepter / refuser comme d'habitude.</p>` },

/* 15 — COMPARER : BOÎTE ET RÉSULTAT */
{ title: 'Options et résultat', html: `${H('La boîte Comparer et son résultat', 'Comparer')}
${DLGW06({ x: 70, y: 180, w: 640, t: 'Comparer des documents', html: `${FLDW06('Document original :', 'charte-v1.docx ▾', { lw: 220 })}${FLDW06('Document révisé :', 'charte-v2.docx ▾', { lw: 220 })}${FLDW06('Attribuer les écarts à :', 'Partenaire', { lw: 220, hot: 1 })}
 <div class="f" data-s="1" style="border-top:1px solid #E3E8EF;padding-top:10px;font-size:16px;line-height:1.8;columns:2"><b>Plus &gt;&gt;</b><br>☑ Insertions et suppressions<br>☑ Déplacements<br>☑ Commentaires<br>☐ Mise en forme<br>☑ Casse<br>☐ Espaces<br>☑ Tableaux<br>☐ En-têtes et pieds</div>
 <div style="display:flex;gap:10px;justify-content:flex-end">${BTNW06('OK', 1)}${BTNW06('Annuler')}</div>` })}
<div class="f zoom" data-s="2" style="position:absolute;left:750px;top:180px;width:780px;height:470px;background:#E9EBEF;border-radius:12px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45);display:grid;grid-template-columns:170px 1fr 180px;gap:10px;padding:10px">
 <div style="background:#fff;border-radius:6px;padding:10px;font-size:13px"><b style="font-size:14px">Révisions</b><div style="margin-top:8px;line-height:1.9">${DELW06('8 caractères')}<br>${INSW06('12 caractères')}<br>${DELW06('changé chaque an')}<br>${INSW06('5. Télétravail')}<br>${INSW06('raisonnable,')}</div></div>
 <div style="background:#fff;border-radius:6px;padding:16px;font:15px/1.6 Calibri,sans-serif"><b style="color:#2F5496">Document comparé</b><p style="margin:8px 0">Le mot de passe doit comporter au moins ${DELW06('8')} ${INSW06('12')} caractères ${DELW06('et être changé tous les ans')}.</p><p style="margin:0">L'usage personnel est toléré s'il reste ${INSW06('strictement')} raisonnable.</p></div>
 <div style="display:grid;grid-template-rows:1fr 1fr;gap:10px"><div style="background:#fff;border-radius:6px;padding:10px;font-size:13px"><b>Original</b>${LINES(4)}</div><div style="background:#fff;border-radius:6px;padding:10px;font-size:13px"><b>Révisé</b>${LINES(4)}</div></div>
</div>
${TIP('<b>Combiner</b> : même boîte, mais pour fusionner les révisions de <b>plusieurs relecteurs</b> dans un seul fichier.', { s: 3, x: 750, y: 680, w: 780, kind: 'tip' })}`,
  n: `<p><b>Étape 1</b> : le bouton <b>Plus &gt;&gt;</b> choisit ce qu'on compare. Décocher <i>Mise en forme</i> et <i>Espaces</i> évite d'être noyé sous des centaines d'écarts sans importance quand le document a été retouché dans un autre logiciel. « Afficher les modifications dans : Nouveau document » est le choix par défaut (recommandé).</p>
  <p><b>Étape 2</b> : l'écran de résultat : volet Révisions à gauche, document comparé au centre, les deux originaux à droite. Le défilement est synchronisé. Si l'écran est trop chargé : <i>Comparer › Afficher les documents sources › Masquer les documents sources</i>.</p>
  <p><b>Étape 3</b> : <b>Combiner</b> sert quand trois relecteurs ont chacun travaillé sur leur copie : on combine les copies deux à deux pour obtenir un seul document avec toutes les révisions, chacune attribuée à son auteur.</p>` },

/* 16 — CO-ÉDITION VS VERSIONS */
{ title: 'Co-rédiger en temps réel', html: `${H('Encore mieux : un seul fichier partagé', 'Co-rédaction')}
${VS({ y: 185, mid: '➜',
  l: { t: 'Copies par e-mail', c: '#DC2626', ic: '✘', html: `<svg viewBox="0 0 560 220" style="width:100%;height:220px">${[0, 1, 2].map(i => `<g class="a pop" style="--d:${.3 + i * .15}s">${I('docx', 30 + i * 180, 20, 90)}<text x="${75 + i * 180}" y="135" text-anchor="middle" font-size="18" font-weight="700" fill="#33445E">v${i + 2}-${['Marc', 'Claire', 'final(2)'][i]}</text></g>`).join('')}<text x="280" y="190" text-anchor="middle" font-size="20" font-weight="800" fill="#DC2626">Laquelle est la bonne ?</text></svg><ul class="lst sm"><li>Comparer, combiner…</li><li>Versions divergentes</li></ul>` },
  r: { t: 'Lien OneDrive / SharePoint', c: '#16A34A', ic: '✔', html: `<svg viewBox="0 0 560 220" style="width:100%;height:220px">${I('onedrive', 230, 0, 100)}${[['#7C3AED', 'CL', 60], ['#0EA5E9', 'MD', 280], ['#16A34A', 'SM', 500]].map(([c, t, x], i) => `<g class="a pop" style="--d:${.4 + i * .15}s"><path d="M280 90 L${x} 160" stroke="${c}" stroke-width="3" stroke-dasharray="6 6" class="flow"/><circle cx="${x}" cy="175" r="26" fill="${c}"/><text x="${x}" y="182" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">${t}</text></g>`).join('')}</svg><ul class="lst sm"><li>Bouton <b>Partager</b> · curseurs en direct</li><li>Historique des versions intégré</li></ul>` } })}
${TIP('Fichier › Informations › <b>Historique des versions</b> : revenir à n\'importe quelle version enregistrée dans le cloud.', { s: 3, x: 70, y: 700, w: 1460, kind: 'key' })}`,
  n: `<p><b>Étape 1</b> : le modèle « pièces jointes » : chacun travaille sur sa copie, et on passe du temps à comparer et combiner. Risque de travailler sur une version périmée.</p>
  <p><b>Étape 2</b> : le modèle cloud : le fichier est enregistré dans OneDrive ou SharePoint (ou un canal Teams), on clique sur <b>Partager</b> en haut à droite et on envoie un <b>lien</b>. Chacun voit en direct le curseur et les drapeaux des autres auteurs ; l'enregistrement est automatique.</p>
  <p>Le suivi des modifications et les commentaires fonctionnent aussi en co-rédaction : on combine les deux approches pour les documents sensibles.</p>
  <p><b>Étape 3</b> : l'historique des versions permet d'ouvrir ou de restaurer une version antérieure ; on peut aussi la <b>comparer</b> à la version actuelle.</p>` },

/* 17 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSW06, 2),
  n: `<p>Troisième partie : protéger le document et le nettoyer avant de l'envoyer.</p>` },

/* 18 — RESTREINDRE LA MODIFICATION */
{ title: 'Restreindre la modification', html: `${H('Restreindre la modification', 'Protéger', PATH('Révision > Protéger > Restreindre la modification'))}
<div class="card a pop" style="--d:.2s;position:absolute;right:70px;top:175px;width:560px;padding:0;overflow:hidden;font-family:'Segoe UI',var(--font)">
 <div style="padding:14px 20px;background:#F3F4F6;border-bottom:1px solid #E3E8EF;font-size:19px;font-weight:800">Restreindre la modification</div>
 ${[['1. Restrictions de mise en forme', '☐ Limiter la mise en forme à une sélection de styles', 1], ['2. Restrictions de modifications', '☑ Autoriser uniquement ce type de modifications :', 2], ['3. Activation', '', 4]].map(([t, d, s]) => `<div class="f" data-s="${s}" style="padding:14px 20px;border-bottom:1px solid #EEF0F3"><div style="font-size:18px;font-weight:800;color:#185ABD">${t}</div>${d ? `<div style="font-size:17px;margin-top:6px">${d}</div>` : ''}
 ${s === 2 ? `<div style="margin-top:8px;padding:6px 12px;border:2px solid #FA582D;border-radius:6px;font-weight:700;font-size:17px">Commentaires ▾</div>` : ''}${s === 4 ? `<div style="margin-top:10px">${BTNW06('Oui, activer la protection', 1)}</div>` : ''}</div>`).join('')}
</div>
<div style="position:absolute;left:70px;top:185px;width:800px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
 ${[['📝', 'Modifications suivies', 'Tout changement est suivi'], ['💬', 'Commentaires', 'Lire et commenter uniquement'], ['📋', 'Remplissage de formulaires', 'Saisie dans les champs seulement'], ['🔒', 'Aucune modification', 'Lecture seule']].map(([i, t, d]) => `<div class="card f zoom" data-s="3" style="padding:20px 22px"><div style="font-size:40px">${i}</div><div style="font-size:22px;font-weight:800;margin-top:6px">${t}</div><div style="font-size:18px;color:#6B7A90">${d}</div></div>`).join('')}
</div>
${TIP('<b>Exceptions</b> : en lecture seule, autorisez certaines zones à certains utilisateurs.', { s: 5, x: 70, y: 640, w: 800, kind: 'tip' })}`,
  n: `<p>Le volet <b>Restreindre la modification</b> s'ouvre à droite et comporte trois blocs.</p>
  <p><b>Étape 1</b> : restrictions de mise en forme — limiter aux styles autorisés (utile pour les modèles d'entreprise : personne ne met du Comic Sans).</p>
  <p><b>Étape 2</b> : restrictions de modifications — cocher « Autoriser uniquement ce type de modifications » et choisir le type.</p>
  <p><b>Étape 3</b> : les 4 types. <b>Modifications suivies</b> (toute modification est suivie), <b>Commentaires</b> (on ne peut que commenter), <b>Remplissage de formulaires</b> (seuls les champs et contrôles de contenu sont modifiables — module 08), <b>Aucune modification</b>.</p>
  <p><b>Étape 4</b> : <i>Oui, activer la protection</i> — mot de passe facultatif. Pour retirer : bouton <i>Désactiver la protection</i> en bas du même volet.</p>
  <p><b>Étape 5</b> : en mode Commentaires ou Lecture seule, on peut sélectionner des parties du document et cocher « Tout le monde » (ou un utilisateur) dans <i>Exceptions</i> : ces zones restent modifiables (surlignées en jaune).</p>` },

/* 19 — NIVEAUX DE PROTECTION */
{ title: 'Quelle protection choisir ?', html: `${H('Quelle protection pour quel besoin ?', 'Fichier › Informations › Protéger le document')}
<svg viewBox="0 0 1460 520" style="position:absolute;left:70px;top:190px;width:1460px;height:520px">
 ${[['Marquer comme final', 'Simple avertissement', '#94A3B8', 200], ['Toujours ouvrir en lecture seule', 'Suggestion à l\'ouverture', '#0EA5E9', 270], ['Restreindre la modification', 'Évite les erreurs', '#F59E0B', 340], ['Chiffrer avec mot de passe', 'Impossible à ouvrir sans lui', '#16A34A', 420]].map(([t, d, c, h], i) => `
 <g class="f" data-s="${i + 1}"><rect x="${i * 365 + 10}" y="${470 - h}" width="335" height="${h}" rx="18" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="3"/>
  <text x="${i * 365 + 177}" y="${470 - h + 60}" text-anchor="middle" font-size="46">${['🏷️', '👓', '✋', '🔐'][i]}</text>
  <foreignObject x="${i * 365 + 20}" y="${470 - h + 80}" width="315" height="110"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-family:var(--font)"><div style="font-size:22px;font-weight:800;color:#0E1726;line-height:1.15">${t}</div><div style="font-size:18px;color:#33445E;margin-top:6px">${d}</div></div></foreignObject></g>`).join('')}
 <path d="M20 500 H1440" stroke="#CBD5E1" stroke-width="3"/><text x="20" y="20" font-size="18" font-weight="800" fill="#6B7A90" letter-spacing=".1em">NIVEAU DE PROTECTION ↑</text>
</svg>
${TIP('Mot de passe de chiffrement <b>perdu = document perdu</b> : Microsoft ne peut pas le récupérer.', { s: 5, x: 70, y: 730, w: 1000, kind: 'warn' })}`,
  n: `<p>Quatre protections souvent confondues, de la plus faible à la plus forte (<i>Fichier › Informations › Protéger le document</i>) :</p>
  <p><b>Étape 1</b> : <b>Marquer comme final</b> — un bandeau jaune indique que le document est terminé, la saisie est désactivée… mais un bouton « Modifier quand même » suffit. C'est une information, pas une sécurité.</p>
  <p><b>Étape 2</b> : <b>Toujours ouvrir en lecture seule</b> — Word propose la lecture seule à l'ouverture ; l'utilisateur peut refuser.</p>
  <p><b>Étape 3</b> : <b>Restreindre la modification</b> — efficace contre les erreurs et les modifications involontaires, pas contre un utilisateur déterminé (le contenu reste lisible, et le fichier n'est pas chiffré).</p>
  <p><b>Étape 4</b> : <b>Chiffrer avec mot de passe</b> — le seul vrai verrou : sans le mot de passe, impossible d'ouvrir le fichier. À réserver aux données confidentielles.</p>
  <p><b>Étape 5</b> : conservez le mot de passe dans un gestionnaire de mots de passe. En entreprise, les <b>étiquettes de confidentialité</b> (Microsoft Purview, bouton Confidentialité) sont souvent la solution officielle.</p>` },

/* 20 — INSPECTEUR DE DOCUMENT */
{ title: 'Inspecter le document', html: `${H('Nettoyer avant d\'envoyer', 'Inspecteur de document', PATH('Fichier > Informations > Vérifier l\'absence de problèmes > Inspecter le document'))}
${DLGW06({ x: 70, y: 185, w: 900, t: 'Inspecteur de document', html: `<div style="font-size:16px;color:#33445E">Vérifiez les résultats de l'inspection.</div>
 ${[['!', 'Commentaires, révisions et versions', '12 commentaires et 6 révisions trouvés', 2], ['!', 'Propriétés du document et informations personnelles', 'Auteur : C. Lemoine · Dernier enregistrement par…', 3], ['✓', 'En-têtes, pieds de page et filigranes', 'Aucun élément trouvé', 0], ['!', 'Texte masqué', '1 bloc de texte masqué trouvé', 4]].map(([k, t, d, s]) => `
 <div style="display:flex;align-items:center;gap:14px;padding:10px 0;border-top:1px solid #EEF0F3"><span style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:900;color:#fff;background:${k === '!' ? '#DC2626' : '#16A34A'}">${k}</span><div style="flex:1"><div style="font-weight:700">${t}</div><div style="font-size:16px;color:#6B7A90">${d}</div></div>${s ? `<span class="f zoom" data-s="${s}" style="padding:6px 14px;border-radius:6px;border:2px solid #FA582D;font-size:16px;font-weight:700">Supprimer tout</span>` : ''}</div>`).join('')}` })}
<div style="position:absolute;left:1010px;top:185px;width:520px;display:flex;flex-direction:column;gap:16px">
 ${CARD('🔎 <b>Inspecter</b> : liste ce qui traîne dans le fichier', 1)}
 ${CARD('💬 Commentaires et révisions <b>oubliés</b>', 2)}
 ${CARD('👤 Nom de l\'auteur, société, chemin du fichier', 3)}
 ${CARD('🙈 Texte masqué, contenu invisible, XML personnalisé', 4)}
</div>
${TIP('Travaillez sur une <b>copie</b> : certaines suppressions sont irréversibles.', { s: 5, x: 1010, y: 560, w: 520, kind: 'warn' })}`,
  n: `<p>L'<b>Inspecteur de document</b> recherche tout ce qu'on n'a pas envie d'envoyer à l'extérieur.</p>
  <p><b>Étape 1</b> : <i>Fichier › Informations › Vérifier l'absence de problèmes › Inspecter le document</i>. Word propose d'enregistrer d'abord : acceptez. Cochez les catégories et cliquez sur <i>Inspecter</i>.</p>
  <p><b>Étape 2</b> : les commentaires et révisions — si l'inspecteur en trouve, c'est que l'étape « accepter/refuser » a été oubliée. Revenez plutôt les traiter que de « Supprimer tout » en aveugle : supprimer les révisions ici revient à les accepter toutes.</p>
  <p><b>Étape 3</b> : les propriétés et informations personnelles : auteur, responsable, société, dernier auteur…</p>
  <p><b>Étape 4</b> : texte masqué (police › Masqué), objets invisibles, données XML personnalisées.</p>
  <p><b>Étape 5</b> : faites-le sur une copie destinée à la diffusion ; gardez l'original de travail avec ses commentaires.</p>
  <p>Note : dans un même menu, <i>Vérifier l'accessibilité</i> (module 08) et <i>Vérifier la compatibilité</i>.</p>` },

/* 21 — CHECKLIST AVANT DIFFUSION */
{ title: 'Checklist avant diffusion', html: `${H('La checklist avant diffusion', 'Méthode')}
${CHAINW06([{ i: '✅', t: 'Traiter les révisions', d: 'Accepter / refuser · compteur à 0' }, { i: '🗑️', t: 'Supprimer les commentaires', d: 'Tous ceux du document' }, { i: '🔎', t: 'Inspecter', d: 'Propriétés, texte masqué' }, { i: '🔒', t: 'Protéger', d: 'Restreindre ou chiffrer' }, { i: '📤', t: 'Diffuser', d: 'PDF ou lien de partage' }], { y: 200 })}
${STAT({ v: '5 min', t: 'pour éviter de diffuser vos négociations internes', x: 70, y: 560, w: 560, s: 6, c: '#16A34A' })}
${TIP('Diffusion en <b>PDF</b> : Fichier › Exporter › Créer PDF/XPS › Options : publier « Document » et non « Document affichant les marques ».', { s: 6, x: 680, y: 570, w: 850, kind: 'key' })}`,
  n: `<p>La routine à appliquer avant chaque envoi externe, une étape par clic :</p>
  <p><b>1</b> : traiter toutes les révisions (volet Révisions à 0). <b>2</b> : supprimer tous les commentaires du document. <b>3</b> : lancer l'Inspecteur. <b>4</b> : protéger selon le besoin. <b>5</b> : diffuser, de préférence en PDF pour un document final, ou par lien de partage en lecture seule.</p>
  <p><b>Étape 6</b> : à l'export PDF, le bouton <i>Options…</i> propose « Publier : Document » ou « Document affichant les marques ». À l'impression, même piège : <i>Imprimer › Imprimer toutes les pages › Imprimer les marques</i> est coché par défaut si des révisions existent.</p>
  <p>Proposez au groupe de coller cette checklist dans leur procédure d'équipe.</p>` },

/* 22 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Révision et collaboration : l\'essentiel', k: 'Récap animé', hub: '0', hsub: 'révision avant envoi', hk: 'OBJECTIF',
  items: [{ ic: '💬', t: 'Commentaires', d: 'Ctrl+Alt+M · répondre · @mention · résoudre' }, { ic: '📝', t: 'Suivi des modifications', d: 'Ctrl+Maj+E · « Aucune marque » n\'efface rien' },
    { ic: '✅', t: 'Accepter / refuser', d: 'Une par une, volet Révisions, filtre par personne' }, { ic: '🔀', t: 'Comparer', d: 'Original + révisé → document des écarts' }, { ic: '🔒', t: 'Protéger & inspecter', d: 'Restreindre · chiffrer · Inspecteur de document' }] }),
  n: `<p>Faites reformuler chaque carte par un participant avant de la révéler.</p>
  <p>Le hub : <b>0 révision</b> et 0 commentaire dans le fichier envoyé. Questions éclair : « Aucune marque, ça supprime les révisions ? » (non) — « Quelle protection empêche d'ouvrir le fichier ? » (le chiffrement).</p>` },

/* 23 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du module', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Ctrl+Alt+M', d: 'Nouveau commentaire' }, { k: 'Ctrl+Maj+E', d: 'Activer / désactiver le suivi des modifications' }, { k: 'F7', d: 'Orthographe et grammaire (Éditeur)' }, { k: 'Maj+F7', d: 'Dictionnaire des synonymes' }, { k: 'Ctrl+Alt+F', d: 'Note de bas de page (référence de relecture)' }, { k: 'Alt+Q', d: 'Rechercher une commande (ex. « Comparer »)' }], { cols: 3, y: 190 })}
${TIP('Relecteur efficace : <b>F7</b> pour l\'orthographe d\'abord, puis <b>Ctrl+Maj+E</b> avant de toucher au fond.', { s: 7, kind: 'key', x: 70, y: 560, w: 1000 })}`,
  n: `<p>Les deux indispensables : <b>Ctrl+Alt+M</b> et <b>Ctrl+Maj+E</b>.</p>
  <p>F7 ouvre l'<b>Éditeur</b> (orthographe, grammaire, suggestions de clarté). Maj+F7 propose des synonymes du mot sélectionné. Alt+Q place le curseur dans la zone Rechercher du ruban.</p>` },

/* 24 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'word', mod: 'w06', lab: 0, title: 'Lab 1 — Relecture du contrat de prestation', tasks: ['<b>Commentaire</b> sur « pénalités » : ramener à 50 %', 'Un <b>second commentaire</b> sur un autre passage', 'Remplacer « 90 jours » par « <b>45 jours</b> »', '<s>Barrer</s> la phrase d\'exclusivité non résiliable', '« Version relue le 25/10/2026 » en <i>italique</i>'] }),
  n: `<p>Scénario : juriste chez <b>Événements Horizon</b>, relecture d'un contrat avec un traiteur. Dans le simulateur, le texte barré représente une suppression suivie.</p>
  <p>Faites rédiger des commentaires <b>actionnables</b> (diapo 5). Pour la tâche 3, Rechercher/Remplacer (Ctrl+H) est une bonne option.</p>` },

/* 25 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'word', mod: 'w06', lab: 1, title: 'Lab 2 — Suivi, comparaison et protection', tasks: ['Enregistrer <b>charte-v1.docx</b> puis une copie <b>charte-v2.docx</b>', 'v2 : <b>suivi activé</b>, 12 caractères, article « 5. Télétravail »', 'Suivi désactivé, modif « en douce », puis <b>Comparer</b> v1/v2', '<b>Accepter</b> tout sauf la suppression du changement annuel', '<b>Restreindre</b> (Commentaires) puis <b>Inspecter</b> le document'] }),
  n: `<p>Ce lab se fait dans le <b>vrai Word</b> avec le fichier <code>charte-informatique.txt</code>.</p>
  <p>Moment clé : l'étape 3, quand la modification faite « en douce » réapparaît dans le document comparé. Faites constater que la protection « Commentaires » empêche toute saisie dans le texte.</p>` },

/* 26 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Vous passez l\'affichage en « Aucune marque » puis envoyez le document. Que voit le destinataire ?', o: ['Le texte final, sans aucune trace', 'Potentiellement toutes les modifications suivies et les commentaires', 'Un document vide', 'Une version PDF'], a: [1], e: '« Aucune marque » est un simple affichage : les révisions restent dans le fichier tant qu\'elles ne sont pas acceptées ou refusées.' },
  { q: 'Un client vous renvoie un contrat modifié sans suivi des modifications. Comment repérer les changements ?', o: ['Relire mot à mot', 'Révision › Comparer › Comparer…', 'Révision › Combiner', 'Fichier › Historique des versions'], a: [1], e: 'Comparer produit un document où tous les écarts apparaissent comme des modifications suivies.' },
  { q: 'Quelle protection empêche réellement d\'ouvrir un document sans autorisation ?', o: ['Marquer comme final', 'Restreindre la modification', 'Chiffrer avec mot de passe', 'Toujours ouvrir en lecture seule'], a: [2], e: 'Seul le chiffrement empêche l\'ouverture ; les autres options limitent les modifications ou avertissent.' },
  { q: 'Comment empêcher un relecteur de désactiver le suivi des modifications ?', o: ['Lui demander gentiment', 'Verrouiller le suivi (ou Restreindre la modification › Modifications suivies)', 'Enregistrer en PDF', 'Désactiver la correction automatique'], a: [1], e: '« Verrouiller le suivi » ou la restriction « Modifications suivies » imposent le suivi pour toute modification.' },
  { q: 'Que faire avant d\'envoyer un document à l\'extérieur pour retirer commentaires et métadonnées ?', o: ['Fichier › Informations › Vérifier l\'absence de problèmes › Inspecter le document', 'Ctrl+A puis Suppr', 'Changer le nom du fichier', 'Masquer la règle'], a: [0], e: 'L\'Inspecteur de document recherche et supprime commentaires, révisions, propriétés et texte masqué.' },
  { q: 'Quelles affirmations sur les commentaires sont vraies ? (2 réponses)', o: ['Un fil « résolu » est supprimé du fichier', 'Une @mention envoie un e-mail si le fichier est sur OneDrive/SharePoint', 'On répond dans le fil plutôt que de créer un nouveau commentaire', 'Ctrl+Maj+E insère un commentaire'], a: [1, 2], e: 'Résoudre conserve le fil ; Ctrl+Maj+E active le suivi. La @mention notifie par e-mail et on répond dans le fil.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) c · 4) b · 5) a · 6) b et c.</p>` },

/* 27 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module W06', html: END(),
  n: `<p>Fin du module 06 et du niveau Avancé. Prochain module (Expert) : le <b>publipostage</b> — lettres, e-mails et étiquettes personnalisés à partir d'un fichier de données.</p>` },
] };
