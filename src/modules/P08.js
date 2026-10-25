/* ===================== MODULE P08 — Accessibilité, export, co-édition, Designer et Copilot (Expert) ===================== */
const SECSP08 = ['Accessibilité', 'Exporter et diffuser', 'Co-édition et IA'];

(function () {
  if (document.getElementById('p08css')) return;
  const s = document.createElement('style'); s.id = 'p08css';
  s.textContent = `
  .p8dlg{position:absolute;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.1);font-family:"Segoe UI",var(--font);overflow:hidden;color:#1B2A41}
  .p8dlg>header{display:flex;align-items:center;gap:10px;background:#F3F4F6;padding:10px 18px;font-weight:700;font-size:18px;border-bottom:1px solid #E3E8EF}
  .p8dlg>header::after{content:"✕";margin-left:auto;color:#94A3B8}
  .p8row{position:relative;display:flex;align-items:center;gap:12px;font-size:18px;padding:6px 0}
  .p8box{position:relative;width:22px;height:22px;border:2px solid #64748B;border-radius:4px;flex:none;background:#fff}
  .p8box b{position:absolute;inset:-2px;border-radius:4px;background:#C43E1C;color:#fff;display:grid;place-items:center;font-size:14px}
  .p8btn{position:relative;display:inline-block;padding:8px 18px;border:1px solid #94A3B8;border-radius:6px;font-size:17px;font-weight:600;background:#fff}
  .p8btn.pri{background:#C43E1C;border-color:#C43E1C;color:#fff}
  .p8pane{position:absolute;background:#fff;border-left:1px solid #E3E8EF;font-family:"Segoe UI",var(--font);color:#1B2A41}
  .p8pane h4{font-size:18px;font-weight:800;padding:12px 16px;border-bottom:1px solid #E3E8EF}
  .p8it{position:relative;display:flex;align-items:center;gap:10px;padding:8px 16px;font-size:16px}
  .p8ord{position:absolute;left:12px;right:12px;height:44px;display:flex;align-items:center;gap:10px;padding:0 12px;border-radius:8px;background:#F1F5F9;font-size:17px;font-weight:600;transition:top 1.2s cubic-bezier(.65,0,.35,1),background .8s}
  .p8ord.on{top:var(--t2)!important;background:#ECFDF3}
  .p8bar{position:absolute;left:0;top:0;bottom:0;border-radius:10px;transition:width 1.6s cubic-bezier(.65,0,.35,1)}
  .p8bar.on{width:var(--w2)!important}
  .p8av{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;color:#fff;font:800 14px var(--font);box-shadow:0 0 0 3px #fff}
  .p8x .nb{display:none}.p8x.on .na{display:none}.p8x.on .nb{display:inline}
  .p8sw{display:flex;align-items:center;justify-content:center;height:110px;border-radius:14px;font-size:28px;font-weight:800}
  .p8tok{padding:2px 8px;border-radius:6px;font-weight:700}
  `;
  document.head.appendChild(s);
})();
const P08HOT = s => `<em class="ow-hot f zoom" data-s="${s}"><b>${s}</b></em>`;
const P08CK = (label, s, hot) => `<div class="p8row"><span class="p8box">${s ? `<b class="f zoom" data-s="${s}">✔</b>` : ''}</span><span style="position:relative">${label}${hot ? P08HOT(hot) : ''}</span></div>`;
/* mini diapositive */
const P08SL = (w, t, inner = '', bg = '#fff', fg = '#0E1726') => `<div style="position:relative;width:${w}px;height:${Math.round(w * 9 / 16)}px;background:${bg};border-radius:6px;overflow:hidden;flex:none;box-shadow:0 0 0 1px #CBD5E1,0 10px 24px -14px rgba(14,23,38,.5);font-family:'Segoe UI',var(--font)">
 <div style="position:absolute;left:7%;top:8%;right:7%;color:${fg};font-weight:800;font-size:${Math.round(w * .052)}px">${t}</div>${inner}</div>`;
const P08CHART = (w = 260) => `<svg viewBox="0 0 260 150" style="width:${w}px;height:${w * 150 / 260}px">${[[95, 0], [150, 1], [205, 2]].map(([v, i]) => `<rect x="${30 + i * 75}" y="${135 - v * .5}" width="50" height="${v * .5}" rx="4" fill="${i === 2 ? '#FA582D' : '#CBD5E1'}"/><text x="${55 + i * 75}" y="${128 - v * .5}" text-anchor="middle" font-size="14" font-weight="800" fill="#33445E">${v}</text>`).join('')}<path d="M15 135 H250" stroke="#94A3B8" stroke-width="2"/></svg>`;

window.MODULE = { code: 'P08', title: 'Accessibilité, export, co-édition, Designer et Copilot', short: 'Diffuser et collaborer', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Accessibilité, export, IA', html: TITLE({ mod: 'POWERPOINT · MODULE 08 · EXPERT', title: 'Livrer pour <span class="grad">tous</span>, à plusieurs', sub: '« Accessible, bien exporté, co-écrit… et accéléré par l\'IA »', agenda: SECSP08, art: APPART('ppt') }),
  n: `<p>Dernier module PowerPoint (Expert). Durée indicative : 70 minutes.</p>
<p>On termine la chaîne de production : rendre la présentation <b>accessible</b> à tous, la <b>diffuser</b> dans le bon format, la <b>co-écrire</b> dans Microsoft 365 et <b>accélérer</b> avec Designer et Copilot — en gardant un regard critique.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Rendre un deck <b>accessible</b> : titres, textes de remplacement, ordre de lecture, contraste, sous-titres', 'Exporter en <b>PDF</b>, en <b>vidéo</b>, et <b>inspecter</b> le document avant diffusion', '<b>Co-éditer</b> : commentaires, @mentions, historique des versions', 'Utiliser <b>Designer</b> et <b>Copilot</b> de façon critique']),
  n: `<p>Quatre objectifs. Le fil rouge du Lab 1 : la mairie de <b>Saint-Aubin</b> publie la présentation de son budget participatif, qui doit être accessible (obligation RGAA). Lab 2 : une équipe marketing co-écrit une présentation de lancement avec l'aide de l'IA.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP08, 0), n: `<p>Première partie : l'<b>accessibilité</b>. Quelques règles simples qui changent tout pour les personnes en situation de handicap… et améliorent le deck pour tout le monde.</p>` },

/* 4 — POUR QUI */
{ title: 'Pour qui ?', html: `${H('Une présentation lisible par tous', 'Accessibilité')}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
 ${[['🔊', 'Lecteur d\'écran', 'personnes aveugles', 'Titres · textes de remplacement · ordre de lecture'], ['👓', 'Basse vision', 'zoom, fort contraste', 'Contraste · taille de police'], ['🎨', 'Daltonisme', '8 % des hommes', 'Jamais l\'info par la couleur seule'], ['🦻', 'Surdité', 'malentendants', 'Sous-titres · vidéos sous-titrées']].map(([i, t, d, r], j) => `
 <div class="card f zoom" data-s="${j + 1}" style="text-align:center;padding:26px 20px"><div style="font-size:64px">${i}</div><div style="font-size:25px;font-weight:900;margin-top:8px">${t}</div><div style="font-size:18px;color:#6B7A90">${d}</div><div class="chip blu" style="margin-top:14px;font-size:16px;white-space:normal">${r}</div></div>`).join('')}
</div>
${STAT({ v: 'RGAA', t: 'obligatoire pour les services publics et grandes entreprises en France', x: 70, y: 560, w: 700, s: 5, c: '#7C3AED' })}
${STAT({ v: '+ lisible', t: 'pour tous : titres clairs, contraste, structure', x: 830, y: 560, w: 700, s: 6, c: '#16A34A' })}`,
  n: `<p>Pour qui rend-on une présentation accessible ?</p>
<p><b>Étape 1</b> : les utilisateurs de <b>lecteur d'écran</b> (NVDA, JAWS, Narrateur) : le logiciel lit les titres, les textes de remplacement des images, dans l'ordre de lecture défini.</p>
<p><b>Étape 2</b> : les personnes en <b>basse vision</b> : contraste suffisant, polices assez grandes.</p>
<p><b>Étape 3</b> : le <b>daltonisme</b> (environ 8 % des hommes) : ne jamais porter une information par la couleur seule (« les cases rouges sont en retard »).</p>
<p><b>Étape 4</b> : les personnes <b>sourdes ou malentendantes</b> : sous-titres en direct, vidéos sous-titrées.</p>
<p><b>Étapes 5 et 6</b> : en France, le <b>RGAA</b> s'impose aux organismes publics et à certaines entreprises pour les documents publiés. Et un deck accessible est mieux structuré pour tout le monde.</p>` },

/* 5 — VÉRIFICATEUR */
{ title: 'Le vérificateur d\'accessibilité', html: `${H('Vérifier l\'accessibilité', 'Accessibilité', PATH('Révision > Accessibilité > Vérifier l\'accessibilité'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1460, h: 650, title: 'Budget participatif 2026.pptx', tab: 'Révision',
  groups: [['Vérification', ['🔤 Orthographe', '📚 Dictionnaire des synonymes']], ['Accessibilité', ['♿ Vérifier l\'accessibilité']], ['Langue', ['🌐 Traduire']], ['Commentaires', ['💬 Nouveau commentaire', '🗨️ Afficher les commentaires']]],
  hot: { '♿ Vérifier l\'accessibilité': 1 },
  body: `<div style="position:absolute;left:40px;top:30px">${P08SL(760, '', `<div style="position:absolute;left:7%;top:10%;font:800 38px var(--font);color:#0E1726;border:2px dashed #DC2626;padding:4px 10px">Le budget en chiffres</div><div style="position:absolute;left:8%;top:38%">${P08CHART(330)}</div><div style="position:absolute;right:7%;top:42%;width:250px;height:150px;border-radius:8px;background:linear-gradient(160deg,#BBF7D0,#16A34A);box-shadow:0 0 0 3px #DC2626"></div><div style="position:absolute;right:7%;bottom:6%;font-size:14px;color:#BAE6FD">Texte gris clair sur blanc</div>`)}</div>
  <div class="p8pane" style="right:0;top:0;bottom:0;width:560px">
   <h4>Accessibilité</h4>
   <div class="f" data-s="2"><div class="p8it" style="font-weight:800;color:#DC2626">⛔ Erreurs</div>
    <div class="p8it" style="padding-left:40px">Titre de diapositive manquant (2)</div><div class="p8it" style="padding-left:40px">Texte de remplacement manquant (3)</div></div>
   <div class="f" data-s="3"><div class="p8it" style="font-weight:800;color:#D97706">⚠️ Avertissements</div><div class="p8it" style="padding-left:40px">Ordre de lecture à vérifier (4)</div></div>
   <div class="f" data-s="4"><div class="p8it" style="font-weight:800;color:#0369A1">💡 Conseils</div><div class="p8it" style="padding-left:40px">Contraste insuffisant (1)</div></div>
   <div class="f" data-s="5" style="margin:14px 16px;padding:12px 14px;border-radius:10px;background:#F1F5F9;font-size:16px;position:relative"><b>Action recommandée</b> ▾<br>Ajouter une description · Marquer comme décoratif${P08HOT(5)}</div>
  </div>` })}`,
  n: `<p>Démo : <i>Révision › Accessibilité › Vérifier l'accessibilité</i>. Astuce : la barre d'état affiche en permanence « Accessibilité : examen recommandé » ; un clic ouvre le même volet.</p>
<p><b>Étape 1</b> : lancement du vérificateur.</p>
<p><b>Étape 2</b> : les <b>Erreurs</b> : contenu illisible pour un lecteur d'écran. Les deux plus fréquentes : <b>titre de diapositive manquant</b> et <b>texte de remplacement manquant</b>. Ici, le « titre » est une simple zone de texte : il n'est pas reconnu.</p>
<p><b>Étape 3</b> : les <b>Avertissements</b> : contenu difficile à comprendre (ordre de lecture, tableaux complexes).</p>
<p><b>Étape 4</b> : les <b>Conseils</b> : améliorations (contraste de couleur…).</p>
<p><b>Étape 5</b> : cliquer sur un problème sélectionne l'objet sur la diapo ; le menu <i>Action recommandée</i> propose la correction en un clic.</p>` },

/* 6 — TEXTE DE REMPLACEMENT */
{ title: 'Texte de remplacement', html: `${H('Décrire l\'information, pas l\'image', 'Accessibilité', PATH('Clic droit > Afficher le texte de remplacement'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:185px;width:520px;padding:24px;text-align:center">${P08CHART(460)}<div style="font-size:18px;color:#6B7A90;margin-top:8px">Graphique : CA e-commerce (k€)</div></div>
<div class="p8dlg a pop" style="--d:.3s;left:640px;top:185px;width:890px">
 <header>Texte de remplacement</header>
 <div style="padding:16px 22px">
  <div style="font-size:16px;color:#64748B;margin-bottom:8px">Comment décririez-vous cet objet et son contexte à une personne aveugle ?</div>
  <div style="border:2px solid #C43E1C;border-radius:8px;min-height:80px;padding:10px 14px;font-size:20px"><b class="tw f" data-s="1" style="--n:61;font-weight:600;border-color:#C43E1C;white-space:normal">Graphique : le e-commerce passe de 95 à 205 k€ entre 2024 et 2026</b></div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px"><span class="p8btn">✨ Générer une description</span>${P08CK('Marquer comme décoratif', 0)}</div></div></div>
${VS({ y: 470, l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['« image1.png »', '« Graphique » tout court'] }, r: { t: 'À faire', c: '#16A34A', ic: '✔', items: ['La conclusion + les chiffres clés', 'Décoratif → <b>Marquer comme décoratif</b>'] }, s1: 2, s2: 3 }).replace('left:70px;right:70px', 'left:640px;right:70px')}
${TIP('Description générée automatiquement ? <b>Relisez-la</b> toujours.', { s: 4, kind: 'warn', x: 70, y: 520, w: 520 })}`,
  n: `<p>Clic droit sur l'image ou le graphique › <i>Afficher le texte de remplacement</i> (ou <i>Format de l'image › Texte de remplacement</i>).</p>
<p><b>Étape 1</b> : on décrit l'<b>information</b>, pas l'image. Pas « un graphique en barres orange et gris », mais la conclusion et les chiffres : « Graphique : le e-commerce passe de 95 à 205 k€ entre 2024 et 2026 ». Une à deux phrases.</p>
<p><b>Étape 2</b> : à éviter : le nom de fichier, ou un mot vague.</p>
<p><b>Étape 3</b> : une image purement <b>décorative</b> (filet, motif, photo d'ambiance) : cochez <b>Marquer comme décoratif</b>. Le lecteur d'écran l'ignore, sans bruit inutile.</p>
<p><b>Étape 4</b> : PowerPoint peut générer une description automatique : c'est un point de départ, souvent imprécis — à relire systématiquement.</p>` },

/* 7 — ORDRE DE LECTURE */
{ title: 'L\'ordre de lecture', html: `${H('L\'ordre de lecture', 'Accessibilité', PATH('Révision > Vérifier l\'accessibilité > Volet Ordre de lecture'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:190px">${P08SL(820, '', `
 <div style="position:absolute;left:6%;top:9%;font:800 36px var(--font)">Le budget en chiffres</div>
 <div style="position:absolute;left:6%;top:36%">${P08CHART(330)}</div>
 <div style="position:absolute;right:6%;top:40%;width:300px;font-size:19px;line-height:1.5">• 1,2 M€ votés<br>• 48 projets<br>• 3 200 votants</div>
 <div style="position:absolute;right:6%;bottom:6%;font-size:14px;color:#64748B">Mairie de Saint-Aubin</div>
 ${[['2', '1', '6%', '9%'], ['1', '2', '6%', '36%'], ['3', '3', '58%', '40%'], ['4', '4', '78%', '89%']].map(([a, b, x, y]) => `<span class="num-badge or p8x" data-s="2" style="position:absolute;left:${x};top:${y};width:34px;height:34px;font-size:17px;transform:translate(-40px,0)"><span class="na">${a}</span><span class="nb">${b}</span></span>`).join('')}`)}</div>
<div class="p8dlg a pop" style="--d:.35s;left:960px;top:190px;width:570px;height:330px">
 <header>Ordre de lecture</header>
 <div style="position:relative;height:270px">
  ${[['🖼️ Graphique 2', 16, 72], ['🔠 Titre 1', 72, 16], ['📝 ZoneTexte 3', 128, 128], ['🏷️ Pied de page 4', 184, 184]].map(([t, a, b], i) => `<div class="p8ord p8x" data-s="2" style="top:${a}px;--t2:${b}px"><b style="color:#94A3B8;width:20px"><span class="na">${i + 1}</span><span class="nb">${Math.round(b / 56 + 5 / 7)}</span></b>${t}</div>`).join('')}
 </div></div>
<div class="chip bad f" data-s="1" style="position:absolute;left:960px;top:540px;font-size:19px">Le lecteur d'écran lit le graphique avant le titre</div>
<div class="chip ok f" data-s="2" style="position:absolute;left:960px;top:590px;font-size:19px">Glisser-déposer : titre en premier</div>
${TIP('Le volet Sélection (<b>Alt+F10</b>) liste les objets dans l\'ordre <b>inverse</b> : le haut de la liste est lu en dernier.', { s: 3, kind: 'key', x: 960, y: 650, w: 570 })}`,
  n: `<p>Le lecteur d'écran lit les objets d'une diapo dans l'<b>ordre de lecture</b>, qui correspond à l'ordre de création — pas à la position visuelle.</p>
<p><b>Étape 1</b> : ici, le graphique a été inséré avant le titre : la personne aveugle entend le graphique avant de savoir de quoi parle la diapo.</p>
<p><b>Étape 2</b> : <i>Révision › Vérifier l'accessibilité › Volet Ordre de lecture</i> (PowerPoint 365) : faites glisser les éléments pour remettre l'ordre logique — titre d'abord, puis contenu, pied de page en dernier. Des numéros s'affichent aussi sur la diapo.</p>
<p><b>Étape 3</b> : sans ce volet, utilisez le volet Sélection (Alt+F10) : attention, l'ordre y est inversé (le haut de la liste = premier plan = lu en dernier).</p>
<p>Le plus simple reste d'utiliser les <b>espaces réservés</b> des dispositions : leur ordre est déjà correct.</p>` },

/* 8 — CONTRASTE ET VRAIS TITRES */
{ title: 'Contraste et vrais titres', html: `${H('Contraste et vrais titres', 'Accessibilité')}
<div style="position:absolute;left:70px;top:190px;width:900px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 ${[['#FFFFFF', '#BAE6FD', '1,4 : 1', 0], ['#FFFFFF', '#F59E0B', '2,1 : 1', 0], ['#FFFFFF', '#0E1726', '17,9 : 1', 1], ['#0C4A6E', '#F0F9FF', '9,6 : 1', 1], ['#FA582D', '#FFFFFF', '3,1 : 1', 0], ['#C43E1C', '#FFFFFF', '5,2 : 1', 1]].map(([bg, fg, r, ok], i) => `<div class="f zoom" data-s="${i < 3 ? 1 : 2}"><div class="p8sw" style="background:${bg};color:${fg};box-shadow:0 0 0 1px #CBD5E1">Budget 2026</div><div style="display:flex;justify-content:space-between;margin-top:6px;font-size:18px;font-weight:800"><span>${r}</span><span class="chip ${ok ? 'ok' : 'bad'}">${ok ? '✔ OK' : '✘ trop faible'}</span></div></div>`).join('')}
</div>
${STAT({ v: '4,5 : 1', t: 'contraste minimum pour le texte courant (WCAG AA)', x: 70, y: 590, w: 900, s: 3, c: '#0EA5E9' })}
${VS({ y: 190, l: { t: 'Zone de texte', c: '#DC2626', ic: '✘', items: ['Pas un titre pour le lecteur d\'écran', 'Erreur « titre manquant »'] }, r: { t: 'Espace réservé Titre', c: '#16A34A', ic: '✔', items: ['Reconnu, listé, navigable', 'Masquable hors diapo si besoin'] }, s1: 4, s2: 5 }).replace('left:70px;right:70px;top:190px;display:grid;grid-template-columns:1fr 1fr', 'left:1010px;right:70px;top:190px;display:grid;grid-template-columns:1fr')}`,
  n: `<p>Deux règles souvent ignorées.</p>
<p><b>Étapes 1 et 2</b> : le <b>contraste</b> entre texte et fond. Le gris clair sur blanc, l'orange sur blanc ou le texte blanc sur un orange vif sont trop faibles ; le texte foncé sur fond clair (ou l'inverse) passe largement.</p>
<p><b>Étape 3</b> : le repère : un rapport d'au moins <b>4,5 : 1</b> pour le texte courant (3 : 1 pour les très grands titres). Le vérificateur signale les contrastes insuffisants ; des outils gratuits (Colour Contrast Analyser) calculent le rapport exact.</p>
<p><b>Étapes 4 et 5</b> : piège : un « titre » tapé dans une simple <b>zone de texte</b> n'est pas un titre pour le lecteur d'écran. Utilisez l'<b>espace réservé de titre</b> de la disposition. Si le design ne veut pas de titre visible, on peut le placer hors de la diapo ou le masquer dans le volet Sélection : il reste lu.</p>` },

/* 9 — SOUS-TITRES */
{ title: 'Sous-titres en direct', html: `${H('Des sous-titres en direct', 'Accessibilité', PATH('Diaporama > Paramètres des sous-titres'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:960px;height:540px;border-radius:10px;overflow:hidden;background:#0C4A6E;box-shadow:0 30px 60px -25px rgba(14,23,38,.55)">
 <div style="position:absolute;left:60px;top:50px;font:900 52px var(--font);color:#F0F9FF">48 projets votés</div><div style="position:absolute;left:60px;top:130px;width:140px;height:6px;background:#5EEAD4"></div>
 <div style="position:absolute;left:60px;top:180px;font:600 26px/1.6 var(--font);color:#BAE6FD">Parcs · Pistes cyclables · Écoles</div>
 <div class="f" data-s="1" style="position:absolute;left:80px;right:80px;bottom:40px;padding:12px 20px;background:rgba(0,0,0,.75);border-radius:8px;font:600 26px var(--font);color:#fff;text-align:center"><span class="tw f" data-s="1" style="--n:58;border-color:#fff">Cette année, les habitants ont voté pour 48 projets…</span></div>
 <div class="f" data-s="3" style="position:absolute;left:80px;right:80px;bottom:110px;padding:8px 20px;background:rgba(0,0,0,.6);border-radius:8px;font:600 22px var(--font);color:#FDE68A;text-align:center">This year, residents voted for 48 projects…</div></div>
<div class="col" style="position:absolute;left:1070px;right:70px;top:190px;gap:16px">
 ${CARD('<b>1 · Langue parlée</b><br>Français', 1)}${CARD('<b>2 · Position</b><br>bas de l\'écran, superposés', 2)}${CARD('<b>3 · Langue des sous-titres</b><br>traduction en direct', 3)}${CARD(`<b>Raccourci</b><br>${KEYS('J')} active / désactive en diaporama`, 4)}</div>`,
  n: `<p>PowerPoint 365 transcrit votre voix en direct pendant le diaporama : <i>Diaporama › Paramètres des sous-titres</i>, puis <i>Toujours utiliser les sous-titres</i> ou le bouton sous-titres du mode présentateur.</p>
<p><b>Étape 1</b> : choisir la <b>langue parlée</b> (Français).</p>
<p><b>Étape 2</b> : la <b>position</b> : en bas, superposés ou sous la diapo.</p>
<p><b>Étape 3</b> : la <b>langue des sous-titres</b> : une langue différente = traduction en direct. Idéal pour un public international.</p>
<p><b>Étape 4</b> : en diaporama, la touche <b>J</b> active ou désactive les sous-titres. Il faut un micro et une connexion Internet. Testez avant : la qualité dépend fortement du micro.</p>` },

/* 10 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP08, 1), n: `<p>Deuxième partie : <b>exporter et diffuser</b> dans le bon format, sans laisser fuiter ce qui doit rester interne.</p>` },

/* 11 — QUEL FORMAT */
{ title: 'Quel format pour quel besoin ?', html: `${H('Quel format pour quel besoin ?', 'Exporter et diffuser', PATH('Fichier > Exporter'))}
<div style="position:absolute;left:70px;top:185px;width:1460px"><table class="tbl">
 <tr><th>Besoin</th><th>Format</th><th>Commande</th></tr>
 ${[['📄 Envoyer un support à lire', 'PDF', 'Exporter › Créer un document PDF/XPS'], ['🎬 Diffuser sans présentateur', 'MP4', 'Exporter › Créer une vidéo'], ['🖨️ Support à annoter', 'Word', 'Exporter › Créer des documents'], ['▶️ Ouverture directe en diaporama', '.ppsx', 'Enregistrer sous › Diaporama PowerPoint'], ['🏛️ Réutiliser la charte', '.potx', 'Enregistrer sous › Modèle PowerPoint']].map(([a, b, c], i) => `<tr class="f" data-s="${i + 1}"><td>${a}</td><td><span class="chip dark">${b}</span></td><td style="font-family:var(--mono);font-size:18px">${c}</td></tr>`).join('')}
</table></div>`,
  n: `<p>Le bon format dépend de l'usage.</p>
<p><b>1 — PDF</b> : pour un support à lire (sans animations ni notes). Il s'ouvre partout et ne se modifie pas facilement.</p>
<p><b>2 — Vidéo MP4</b> : pour une diffusion sans présentateur (site web, écran d'accueil, réseau social interne), avec minutage et narrations.</p>
<p><b>3 — Documents Word</b> : <i>Créer des documents</i> envoie les diapos et notes dans Word, pour un support à annoter.</p>
<p><b>4 — .ppsx</b> : le fichier s'ouvre directement en diaporama (pratique pour un envoi à un client qui ne connaît pas PowerPoint).</p>
<p><b>5 — .potx</b> : rappel du module 5, le modèle d'entreprise.</p>` },

/* 12 — EXPORT PDF */
{ title: 'Exporter en PDF', html: `${H('Un PDF balisé et accessible', 'Exporter et diffuser', PATH('Fichier > Exporter > Créer un document PDF/XPS'))}
<div class="p8dlg a pop" style="--d:.2s;left:70px;top:185px;width:820px">
 <header>Options</header>
 <div style="padding:14px 24px 20px">
  <div style="font-size:16px;font-weight:700;color:#64748B">Étendue</div>
  <div class="p8row">◉ Toutes &nbsp; ◯ Diapositive en cours &nbsp; ◯ Sélection</div>
  <div style="font-size:16px;font-weight:700;color:#64748B;margin-top:8px">Options de publication</div>
  <div class="p8row" style="position:relative">Publier : <span class="p8btn" style="position:relative">Diapositives ▾${P08HOT(1)}</span><span style="font-size:16px;color:#64748B">· Documents · Pages de notes</span></div>
  ${P08CK('Encadrer les diapositives', 0)}${P08CK('Inclure les diapositives masquées', 0)}${P08CK('Inclure les commentaires', 0)}
  <div style="font-size:16px;font-weight:700;color:#64748B;margin-top:8px">Inclure les informations non imprimables</div>
  ${P08CK('Propriétés du document', 2)}${P08CK('<b>Balises de structure du document pour l\'accessibilité</b>', 3, 3)}
  <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:10px"><span class="p8btn pri">OK</span><span class="p8btn">Annuler</span></div></div></div>
<div class="col" style="position:absolute;left:940px;right:70px;top:195px;gap:16px">
 ${CARD('<b>1 · Publier</b><br>diapos, documents (2, 3, 6 par page) ou pages de notes', 1)}${CARD('<b>2 · Propriétés</b><br>titre du document lu par les lecteurs d\'écran', 2)}${CARD('<b>3 · Balises de structure</b><br>titres et textes de remplacement conservés', 3)}</div>
${TIP('Diapos masquées et commentaires : <b>décochés</b> par défaut. Vérifiez avant un envoi externe.', { s: 4, kind: 'warn', x: 940, y: 640, w: 590 })}`,
  n: `<p><i>Fichier › Exporter › Créer un document PDF/XPS</i>, puis bouton <b>Options</b> dans la fenêtre d'enregistrement.</p>
<p><b>Étape 1</b> : <b>Publier</b> : Diapositives (par défaut), Documents (plusieurs diapos par page, avec lignes de notes pour 3 par page) ou Pages de notes (attention à ce qui est écrit dedans !).</p>
<p><b>Étape 2</b> : <b>Propriétés du document</b> : le titre défini dans <i>Fichier › Informations</i> sera annoncé par le lecteur d'écran.</p>
<p><b>Étape 3</b> : <b>Balises de structure du document pour l'accessibilité</b> : coché par défaut, à vérifier. C'est ce qui transmet au PDF les titres, l'ordre de lecture et les textes de remplacement : un PDF non balisé est inaccessible.</p>
<p><b>Étape 4</b> : les diapos masquées et les commentaires ne sont pas inclus par défaut.</p>` },

/* 13 — VIDÉO */
{ title: 'Exporter en vidéo', html: `${H('Une vidéo qui tourne toute seule', 'Exporter et diffuser', PATH('Fichier > Exporter > Créer une vidéo'))}
<div class="p8dlg a pop" style="--d:.2s;left:70px;top:185px;width:760px">
 <header>Créer une vidéo</header>
 <div style="padding:16px 24px 22px;display:flex;flex-direction:column;gap:12px;font-size:19px">
  <div style="position:relative" class="p8btn">🖥️ Full HD (1080p) ▾${P08HOT(1)}</div>
  <div style="position:relative" class="p8btn">⏱️ Utiliser les minutages et narrations enregistrés ▾${P08HOT(2)}</div>
  <div style="display:flex;align-items:center;gap:12px;position:relative">Secondes passées sur chaque diapositive : <span class="p8btn" style="font-family:var(--mono)">05,00</span>${P08HOT(3)}</div>
  <span class="p8btn pri" style="align-self:flex-start">Créer une vidéo</span>
  <div class="f" data-s="4" style="position:relative;height:30px;border-radius:10px;background:#E3E8EF;overflow:hidden;margin-top:6px"><div class="p8bar" data-s="4" style="width:0;--w2:100%;background:linear-gradient(90deg,#C43E1C,#FF8F6B)"></div></div>
  <div class="f" data-s="4" style="font-size:16px;color:#64748B">Création de Budget participatif 2026.mp4…</div></div></div>
<div class="card f zoom" data-s="5" style="position:absolute;left:880px;top:185px;width:650px;padding:22px 26px">
 <div style="font-size:24px;font-weight:900">🎙️ Une vidéo narrée</div>${PATH('Enregistrer > Enregistrer > Depuis le début')}
 <div style="display:flex;gap:16px;margin-top:16px">${['📷 Caméra', '🎤 Micro', '✏️ Annotations'].map(t => `<span class="chip blu" style="font-size:18px">${t}</span>`).join('')}</div>
 <div style="margin-top:16px;display:flex;align-items:center;gap:14px"><span style="width:22px;height:22px;border-radius:50%;background:#DC2626" class="pulse"></span><b style="font-family:var(--mono);font-size:22px">REC 00:02:14</b></div></div>
${TIP('Ajoutez des <b>sous-titres</b> à la vidéo (fichier .vtt) : <b>Lecture › Insérer des sous-titres</b>.', { s: 6, kind: 'ok', x: 880, y: 520, w: 650 })}`,
  n: `<p><i>Fichier › Exporter › Créer une vidéo</i>.</p>
<p><b>Étape 1</b> : la <b>qualité</b> : Ultra HD (4K), Full HD (1080p), HD (720p) ou Standard (480p). Full HD est un bon compromis taille/qualité.</p>
<p><b>Étape 2</b> : <b>Utiliser les minutages et narrations enregistrés</b> (s'il y en a) ou <b>Ne pas utiliser</b>…</p>
<p><b>Étape 3</b> : … auquel cas chaque diapo dure le nombre de secondes indiqué (5 s par défaut). Les animations et transitions sont conservées.</p>
<p><b>Étape 4</b> : l'export peut prendre plusieurs minutes : la barre de progression apparaît dans la barre d'état. Ne fermez pas PowerPoint.</p>
<p><b>Étape 5</b> : pour une vidéo narrée : <i>Enregistrer › Enregistrer › Depuis le début</i> (onglet Enregistrer ou Diaporama selon la version) : caméra, micro et annotations sont enregistrés diapo par diapo, puis exportés.</p>
<p><b>Étape 6</b> : pour l'accessibilité d'une vidéo insérée, ajoutez un fichier de sous-titres WebVTT via <i>Lecture › Insérer des sous-titres</i>.</p>` },

/* 14 — INSPECTEUR */
{ title: 'Inspecter le document', html: `${H('Inspecter avant d\'envoyer', 'Exporter et diffuser', PATH('Fichier > Informations > Vérifier la présence de problèmes > Inspecter le document'))}
<div class="p8dlg a pop" style="--d:.2s;left:70px;top:185px;width:900px">
 <header>Inspecteur de document</header>
 <div style="padding:6px 22px 16px">
  ${[['💬 Commentaires', '3 commentaires trouvés'], ['🏷️ Propriétés et informations personnelles', 'Auteur, chemin du fichier'], ['🧩 Contenu hors diapositive', '1 objet hors de la diapo'], ['🗒️ Notes de présentation', 'Notes trouvées sur 12 diapos']].map(([t, d], i) => `<div class="p8row" style="border-bottom:1px solid #F1F5F9;padding:12px 0"><span class="f zoom" data-s="1" style="font-size:22px;color:#DC2626">!</span><div style="flex:1"><b>${t}</b><div class="f" data-s="1" style="font-size:16px;color:#64748B">${d}</div></div><span class="p8btn f" data-s="1" style="position:relative">Supprimer tout${i === 3 ? P08HOT(2) : ''}</span><b class="f zoom" data-s="2" style="color:#16A34A;font-size:22px">✔</b></div>`).join('')}
 </div></div>
<div class="callout f" data-s="3" style="left:1010px;top:200px;width:520px;background:#DC2626;font-size:22px">⚠️ Suppression <b>définitive</b> : Ctrl+Z ne rattrape rien</div>
${PROC([{ p: 'Fichier > Enregistrer une copie', t: '« Budget 2026 - diffusion.pptx »' }, { p: 'Inspecter la copie', t: 'L\'original garde notes et commentaires' }], { x: 1010, y: 330, w: 520, s0: 4 })}`,
  n: `<p>Avant d'envoyer un .pptx à l'extérieur : <i>Fichier › Informations › Vérifier la présence de problèmes › Inspecter le document</i>.</p>
<p><b>Étape 1</b> : l'inspecteur recherche les commentaires, les propriétés et informations personnelles (auteur, chemins), le contenu hors diapositive (objets posés à côté de la diapo, invisibles en diaporama mais présents), les notes de présentation, les données XML personnalisées…</p>
<p><b>Étape 2</b> : <b>Supprimer tout</b> pour chaque catégorie à nettoyer — ici les notes (souvenez-vous du « lot 3 » du module 6).</p>
<p><b>Étape 3</b> : attention : la suppression est <b>définitive</b>, l'annulation ne fonctionne pas.</p>
<p><b>Étapes 4 et 5</b> : la bonne pratique : <i>Enregistrer une copie</i> pour la diffusion, et inspecter la copie. L'original de travail garde ses notes.</p>` },

/* 15 — COMPRESSER */
{ title: 'Alléger le fichier', html: `${H('Diviser la taille par trois', 'Exporter et diffuser')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:200px;width:1460px">
 <div style="display:flex;justify-content:space-between;font-size:22px;font-weight:800;margin-bottom:10px"><span>Budget participatif 2026.pptx</span><span><span class="f" data-s="1" style="color:#16A34A">15 Mo</span> <s style="color:#94A3B8">48 Mo</s></span></div>
 <div style="position:relative;height:60px;border-radius:12px;background:#E3E8EF"><div class="p8bar" data-s="1" style="width:100%;--w2:31%;background:linear-gradient(90deg,#16A34A,#4ADE80)"></div><div style="position:absolute;right:20px;top:14px;font-size:22px;font-weight:800;color:#33445E">limite e-mail : 20 Mo ↓</div></div></div>
<div style="position:absolute;left:70px;top:360px;width:1460px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 ${CARD(`<div style="font-size:24px;font-weight:900">🖼️ Compresser les images</div>${PATH('Format de l\'image > Ajuster > Compresser les images')}<div style="margin-top:10px">Décocher « Appliquer uniquement à cette image » · résolution <b>Web (150 ppp)</b> · supprimer les zones rognées</div>`, 2, 'font-size:19px;padding:22px 24px')}
 ${CARD(`<div style="font-size:24px;font-weight:900">🎬 Compresser les médias</div>${PATH('Fichier > Informations > Compresser les médias')}<div style="margin-top:10px">Vidéos et sons insérés : qualité <b>Full HD (1080p)</b> ou <b>HD (720p)</b></div>`, 3, 'font-size:19px;padding:22px 24px')}</div>
${TIP('Pour un envoi interne : partagez un <b>lien</b> OneDrive plutôt qu\'une pièce jointe.', { s: 4, kind: 'ok', y: 680, w: 1460 })}`,
  n: `<p>Un deck avec des photos de smartphone et une vidéo dépasse vite 40 Mo — trop pour un e-mail.</p>
<p><b>Étape 1</b> : le résultat typique après compression : environ trois fois plus léger.</p>
<p><b>Étape 2</b> : sélectionnez une image › <i>Format de l'image › Compresser les images</i> ; décochez « Appliquer uniquement à cette image » pour traiter tout le fichier, choisissez Web (150 ppp) et cochez « Supprimer les zones de rognage des images ».</p>
<p><b>Étape 3</b> : <i>Fichier › Informations › Compresser les médias</i> pour les vidéos et sons insérés.</p>
<p><b>Étape 4</b> : en interne, la meilleure « compression » est de ne rien envoyer : on partage un <b>lien</b> vers le fichier dans OneDrive ou SharePoint.</p>` },

/* 16 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP08, 2), n: `<p>Troisième partie : <b>co-éditer</b> dans Microsoft 365, puis se faire aider par <b>Designer</b> et <b>Copilot</b>.</p>` },

/* 17 — CO-ÉDITION */
{ title: 'Co-édition en temps réel', html: `${H('À plusieurs, dans le même fichier', 'Co-édition', PATH('Partager > Partager > Copier le lien'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:900px;padding:20px;background:#F3F4F6;border-radius:14px;box-shadow:0 0 0 1px #E3E8EF">
 <div style="display:flex;align-items:center;gap:10px;font-size:18px;font-weight:800;margin-bottom:14px">☁️ Lancement GreenBox Mini.pptx <span class="chip ok">Enregistré sur OneDrive</span><span style="margin-left:auto;display:flex;gap:-6px">${[['VD', '#7C3AED'], ['LM', '#0EA5E9'], ['KA', '#16A34A']].map(([n, c], i) => `<span class="p8av f zoom" data-s="${i + 1}" style="background:${c};margin-left:-6px">${n}</span>`).join('')}</span></div>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
  ${[['Section : Vous', 'Contexte', 'VD', '#7C3AED', 1], ['Section : Lina', 'Le produit', 'LM', '#0EA5E9', 2], ['Section : Karim', 'Budget', 'KA', '#16A34A', 3]].map(([sec, t, n, c, s]) => `<div><div style="font-size:15px;font-weight:800;color:#64748B;margin-bottom:6px">▾ ${sec}</div><div style="position:relative">${P08SL(270, t, `<i style="position:absolute;left:8%;top:40%;width:70%;height:7%;background:#CBD5E1;border-radius:4px"></i><i style="position:absolute;left:8%;top:56%;width:55%;height:7%;background:#CBD5E1;border-radius:4px"></i>`)}<span class="f zoom" data-s="${s}" style="position:absolute;inset:-4px;border:3px solid ${c};border-radius:8px"></span><span class="p8av f zoom" data-s="${s}" style="position:absolute;right:-10px;top:-12px;background:${c}">${n}</span></div></div>`).join('')}
 </div>
 <div class="f" data-s="4" style="margin-top:16px;position:relative">${P08SL(270, 'Travail en cours', '', '#E2E8F0', '#64748B')}<span class="chip" style="position:absolute;left:290px;top:50px">🙈 Diapo masquée : brouillons</span></div></div>
<div class="col" style="position:absolute;left:1010px;right:70px;top:200px;gap:16px">
 ${CARD('<b>☁️ OneDrive ou SharePoint</b><br>condition de la co-édition', 1)}${CARD('<b>👥 Avatars</b><br>qui modifie quelle diapo', 2)}${CARD('<b>📑 Une section par contributeur</b><br>chacun son périmètre', 3)}${CARD('<b>🙈 Diapo masquée</b><br>« Travail en cours »', 4)}</div>`,
  n: `<p>La co-édition en temps réel exige que le fichier soit enregistré sur <b>OneDrive</b> ou <b>SharePoint</b> (ou Teams, qui stocke dans SharePoint).</p>
<p><b>Étape 1</b> : <i>Partager › Partager</i> ou <i>Copier le lien</i>, avec droits de modification. L'enregistrement automatique est actif.</p>
<p><b>Étape 2</b> : les <b>avatars</b> des co-auteurs apparaissent en haut à droite et sur les miniatures des diapos qu'ils modifient. Les modifications des autres s'affichent en quelques secondes.</p>
<p><b>Étape 3</b> : organisez le travail par <b>sections</b> (<i>Accueil › Section › Ajouter une section</i>) : une par contributeur. On évite de modifier la même diapo en même temps.</p>
<p><b>Étape 4</b> : une <b>diapo masquée</b> « Travail en cours » sert de brouillon partagé, invisible en diaporama.</p>` },

/* 18 — COMMENTAIRES ET @MENTIONS */
{ title: 'Commentaires et @mentions', html: `${H('Commenter, mentionner, attribuer', 'Co-édition', `${PATH('Révision > Nouveau commentaire')} ${KEYS('Ctrl+Alt+M')}`)}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:200px">${P08SL(760, 'Prix de lancement : 49 €', `<div style="position:absolute;left:8%;top:40%;font:900 80px var(--font);color:#FA582D">49 €</div><span class="f zoom" data-s="1" style="position:absolute;left:36%;top:44%;font-size:34px">💬</span>`)}</div>
<div class="p8dlg a pop" style="--d:.35s;left:880px;top:190px;width:650px">
 <header>Commentaires</header>
 <div style="padding:16px 18px;display:flex;flex-direction:column;gap:14px">
  <div class="f" data-s="1" style="display:flex;gap:12px"><span class="p8av" style="background:#7C3AED">VD</span><div style="flex:1;border:1px solid #CBD5E1;border-radius:10px;padding:10px 14px;font-size:19px"><span class="p8tok" style="background:#E0F2FE;color:#0369A1">@Lina Martin</span> <span class="tw f" data-s="2" style="--n:30;border-color:#0369A1">peux-tu vérifier le prix ?</span>
   <div class="f" data-s="3" style="margin-top:10px;font-size:16px;position:relative">${P08CK('Attribuer à Lina Martin', 3)}</div></div></div>
  <div class="f" data-s="4" style="display:flex;gap:12px;margin-left:40px"><span class="p8av" style="background:#0EA5E9">LM</span><div style="flex:1;background:#F1F5F9;border-radius:10px;padding:10px 14px;font-size:18px">Vérifié : 49 € TTC ✔ <span style="color:#64748B">· Résoudre le fil</span></div></div>
 </div></div>
${FLOW({ x: 880, y: 560, w: 650, h: 200, n: { c: { x: 90, y: 80, ic: 'ppt', sz: 64, l: 'Commentaire' }, m: { x: 330, y: 80, ic: 'outlook', sz: 64, l: 'E-mail à Lina', s: 2 }, t: { x: 560, y: 80, ic: 'teams', sz: 64, l: 'Notification', s: 2 } }, l: [{ a: 'c', b: 'm', s: 2 }, { a: 'm', b: 't', s: 2 }] })}`,
  n: `<p>Les commentaires modernes de PowerPoint 365 (<i>Révision › Nouveau commentaire</i> ou <b>Ctrl+Alt+M</b>) sont des fils de discussion.</p>
<p><b>Étape 1</b> : on sélectionne l'objet concerné et on ajoute un commentaire : une bulle apparaît sur la diapo.</p>
<p><b>Étape 2</b> : tapez <b>@</b> puis le nom d'un collègue : il reçoit une notification par e-mail (et dans Teams), avec un lien direct vers le commentaire.</p>
<p><b>Étape 3</b> : cochez <b>Attribuer à…</b> : le commentaire devient une tâche, visible dans ses tâches Microsoft 365.</p>
<p><b>Étape 4</b> : Lina répond dans le fil, puis le fil est <b>résolu</b> (il reste consultable mais n'encombre plus le volet).</p>` },

/* 19 — HISTORIQUE DES VERSIONS */
{ title: 'Historique des versions', html: `${H('Un seul fichier, toutes les versions', 'Co-édition', PATH('Fichier > Informations > Historique des versions'))}
<svg viewBox="0 0 1460 230" style="position:absolute;left:70px;top:190px;width:1460px;height:230px;overflow:visible">
 <path d="M40 110 H1420" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round"/>
 <path d="M40 110 H1420" stroke="url(#gO)" stroke-width="6" stroke-linecap="round" class="draw" pathLength="1"/>
 ${[['Lun 9:12', 'Vous', 'Création'], ['Lun 15:40', 'Lina', 'Le produit'], ['Mar 10:05', 'Karim', 'Budget'], ['Mar 11:30', 'Copilot', 'Génération IA'], ['Mar 14:02', 'Vous', 'Relecture']].map(([d, w, t], i) => `<g class="f zoom" data-s="${i < 4 ? 1 : 2}"><circle cx="${110 + i * 300}" cy="110" r="${i === 2 ? 20 : 14}" fill="${i === 2 ? '#16A34A' : '#FA582D'}" stroke="#fff" stroke-width="4"/>
  <text x="${110 + i * 300}" y="60" text-anchor="middle" font-size="18" font-weight="800" fill="#33445E">${d}</text><text x="${110 + i * 300}" y="160" text-anchor="middle" font-size="19" font-weight="800" fill="#0E1726">${w}</text><text x="${110 + i * 300}" y="186" text-anchor="middle" font-size="16" fill="#6B7A90">${t}</text></g>`).join('')}
 <g class="f" data-s="3"><rect x="590" y="196" width="240" height="34" rx="17" fill="#16A34A"/><text x="710" y="219" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">Ouvrir · Restaurer</text></g>
</svg>
${VS({ y: 460, l: { t: 'Versions par e-mail', c: '#DC2626', ic: '✘', items: ['deck_v3_final.pptx', 'deck_v3_final_VRAIMENT-final.pptx', 'Qui a la bonne version ?'] }, r: { t: 'Un seul fichier partagé', c: '#16A34A', ic: '✔', items: ['Un lien, une version à jour', 'Historique automatique', 'Restauration en un clic'] }, s1: 4, s2: 5, mid: '➜' })}`,
  n: `<p>Avec un fichier dans OneDrive / SharePoint, chaque enregistrement automatique crée une version.</p>
<p><b>Étapes 1 et 2</b> : <i>Fichier › Informations › Historique des versions</i> affiche la liste des versions avec la date et l'auteur.</p>
<p><b>Étape 3</b> : un clic sur une version l'<b>ouvre</b> en lecture seule pour comparer ; le bouton <b>Restaurer</b> la remet en version courante (la version actuelle reste dans l'historique : rien n'est perdu). Exemple du Lab 2 : retrouver la version d'avant la génération par Copilot.</p>
<p><b>Étapes 4 et 5</b> : fini les « deck_v3_final_VRAIMENT-final.pptx » échangés par e-mail : un seul fichier, l'historique fait le reste.</p>` },

/* 20 — DESIGNER */
{ title: 'Designer', html: `${H('Designer : des mises en page en un clic', 'L\'IA comme assistant', PATH('Accueil > Designer'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:200px">${P08SL(760, 'Nos 3 engagements', `<div style="position:absolute;left:8%;top:34%;font-size:24px;line-height:1.8;color:#33445E">• Livraison 48 h<br>• SAV 7j/7<br>• Emballages recyclés</div>`)}</div>
<div class="chip a pop" style="--d:.4s;position:absolute;left:70px;top:650px;font-size:19px">Diapo simple : titre + 3 puces</div>
<div class="p8pane a pop" style="--d:.3s;left:900px;top:180px;width:630px;height:480px;border-radius:12px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;overflow:hidden">
 <h4>✨ Designer</h4>
 <div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px">
  ${[['#0C4A6E', '#F0F9FF', 'icons'], ['#FFFFFF', '#0E1726', 'cols'], ['#14532D', '#F0FDF4', 'timeline'], ['#FA582D', '#FFFFFF', 'big']].map(([bg, fg, k], i) => `<div class="f zoom" data-s="${i + 1}" style="position:relative">${P08SL(285, 'Nos 3 engagements', k === 'icons' ? `<div style="position:absolute;left:8%;right:8%;top:40%;display:flex;justify-content:space-between;font-size:30px">🚚<span>🛟</span><span>♻️</span></div>` : k === 'cols' ? [0, 1, 2].map(j => `<i style="position:absolute;left:${8 + j * 30}%;top:38%;width:24%;height:44%;border-radius:6px;background:#F1F5F9"></i>`).join('') : k === 'timeline' ? `<i style="position:absolute;left:8%;right:8%;top:60%;height:4px;background:#A3E635"></i>${[0, 1, 2].map(j => `<i style="position:absolute;left:${14 + j * 33}%;top:55%;width:14px;height:14px;border-radius:50%;background:#A3E635"></i>`).join('')}` : `<b style="position:absolute;left:8%;top:36%;font-size:50px;color:#fff">3</b>`, bg, fg)}${i === 1 ? '<span class="ow-hot f zoom" data-s="5" style="inset:-5px"><b>✔</b></span>' : ''}</div>`).join('')}
 </div>
 <div class="f" data-s="5" style="margin:6px 16px;font-size:17px;color:#33445E">Respecte le <b>thème</b> · fonctionne mieux sur des diapos <b>simples</b></div></div>`,
  n: `<p><b>Designer</b> (<i>Accueil › Designer</i>, ou automatiquement à l'insertion d'une image) propose des mises en page à partir du contenu de la diapo.</p>
<p><b>Étapes 1 à 4</b> : pour une liste de trois engagements, Designer propose des icônes, des colonnes, une chronologie, un chiffre géant… Il transforme les puces en visuels.</p>
<p><b>Étape 5</b> : on choisit la proposition cohérente avec le reste du deck. Designer respecte le thème (couleurs, polices) et fonctionne mieux sur des diapos simples : un titre + une image, ou 3 à 6 puces.</p>
<p>Point de vigilance : les icônes et images ajoutées par Designer ont un texte de remplacement à vérifier (ou à marquer comme décoratives).</p>` },

/* 21 — COPILOT */
{ title: 'Copilot', html: `${H('Copilot : un premier jet en une invite', 'L\'IA comme assistant', PATH('Accueil > Copilot'))}
<div class="p8pane a pop" style="--d:.2s;left:70px;top:180px;width:760px;height:360px;border-radius:12px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF">
 <h4>${'<svg viewBox="0 0 64 64" style="width:24px;height:24px;vertical-align:-5px"><use href="#i-copilot"/></svg>'} Copilot</h4>
 <div style="padding:16px 18px;font-size:20px;line-height:1.7">
  <div style="border:2px solid #7C3AED;border-radius:12px;padding:12px 16px;background:#FAF5FF">
   <span class="p8tok f" data-s="1" style="background:#DBEAFE;color:#1D4ED8">Pour le comité de direction,</span>
   <span class="p8tok f" data-s="2" style="background:#FCE7F3;color:#BE185D">crée 6 diapos</span>
   <span class="p8tok f" data-s="3" style="background:#FEF3C7;color:#B45309">au ton factuel</span>
   <span class="p8tok f" data-s="4" style="background:#DCFCE7;color:#15803D">à partir de /brief-lancement</span> ;
   <span class="p8tok f" data-s="5" style="background:#FFEDD5;color:#C2410C">termine par la décision attendue : valider 180 k€.</span></div>
  <div style="display:grid;grid-template-columns:repeat(2,auto);gap:6px 18px;margin-top:16px;font-size:17px;font-weight:700">
   ${[['#1D4ED8', 'Public'], ['#BE185D', 'Nombre de diapos'], ['#B45309', 'Ton'], ['#15803D', 'Source'], ['#C2410C', 'Objectif / décision']].map(([c, t], i) => `<span class="f" data-s="${i + 1}" style="color:${c}">● ${t}</span>`).join('')}</div>
 </div></div>
<div style="position:absolute;left:880px;top:190px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
 ${['GreenBox Mini', 'Le compost en ville', 'Cible : 25-40 ans', 'Prix : 49 €', 'Lancement sept. 2026', 'Décision : 180 k€'].map((t, i) => `<div class="f zoom" data-s="6" style="transition-delay:${i * .12}s">${P08SL(315, t, `<i style="position:absolute;left:8%;top:44%;width:60%;height:8%;background:#CBD5E1;border-radius:4px"></i>`, i === 0 ? '#14532D' : '#fff', i === 0 ? '#F0FDF4' : '#0E1726')}</div>`).join('')}</div>
${TIP('Partir d\'un fichier basé sur le <b>modèle .potx</b> : Copilot utilise la charte.', { s: 7, kind: 'key', x: 70, y: 580, w: 760 })}`,
  n: `<p><b>Copilot</b> (<i>Accueil › Copilot</i>, licence Microsoft 365 Copilot) peut créer une présentation à partir d'une invite ou d'un fichier Word / PDF, ajouter une diapo, résumer le deck, organiser en sections, proposer des notes du présentateur.</p>
<p><b>Étapes 1 à 5</b> : l'anatomie d'une bonne invite : le <b>public</b> (comité de direction), le <b>nombre de diapos</b>, le <b>ton</b>, la <b>source</b> (on tape / pour référencer un fichier OneDrive), et l'<b>objectif</b> (la décision attendue).</p>
<p><b>Étape 6</b> : Copilot génère un premier jet de 6 diapos, avec titres, contenu, images et notes.</p>
<p><b>Étape 7</b> : si l'on part d'une présentation basée sur le modèle d'entreprise, Copilot utilise ses dispositions et sa charte.</p>
<p>Sans licence Copilot, faites l'exercice du Lab 2 à la main, avec la même structure d'invite comme plan.</p>` },

/* 22 — ESPRIT CRITIQUE */
{ title: 'Un premier jet à vérifier', html: `${H('L\'IA écrit le premier jet, vous signez', 'L\'IA comme assistant')}
${PROC([{ p: 'Vérifier chaque chiffre', t: 'Brief : 49 € · 15 000 unités · 180 k€' }, { p: 'Titres-messages', t: '« Introduction » → « Un marché urbain de 2 M de foyers »' }, { p: 'Supprimer le générique', t: 'Diapos « Merci », « Questions ? » sans valeur' }, { p: 'Relancer le vérificateur d\'accessibilité', t: 'Textes de remplacement générés à contrôler' }], { w: 820, gap: 16 })}
<div class="a pop" style="--d:.3s;position:absolute;left:960px;top:190px;width:570px">
 <div style="position:relative">${P08SL(570, 'Introduction', `<div style="position:absolute;left:8%;top:38%;font-size:22px;line-height:1.7;color:#33445E">• Prix : <span style="position:relative">39 €<span class="f zoom" data-s="1" style="position:absolute;left:-6px;right:-6px;top:50%;height:4px;background:#DC2626"></span></span> <b class="f" data-s="1" style="color:#16A34A">49 €</b><br>• 15 000 unités / an</div>`)}
  <div class="f" data-s="2" style="position:absolute;left:20px;top:8px;right:20px;height:56px;padding:12px 10px 0;background:#fff;font:800 24px var(--font);color:#0E1726">Un marché urbain de 2 M de foyers</div></div></div>
${STAT({ v: '100 %', t: 'de la responsabilité reste à l\'auteur', x: 960, y: 560, w: 570, s: 5, c: '#7C3AED' })}`,
  n: `<p>La posture à adopter face à un contenu généré : c'est un <b>premier jet</b>.</p>
<p><b>Étape 1</b> : vérifiez <b>chaque chiffre</b> contre la source. Ici, Copilot a écrit 39 € au lieu de 49 € : erreur typique (« hallucination »).</p>
<p><b>Étape 2</b> : transformez les titres génériques (« Introduction », « Contexte ») en <b>titres-messages</b>.</p>
<p><b>Étape 3</b> : supprimez les diapos génériques sans valeur.</p>
<p><b>Étape 4</b> : relancez le <b>vérificateur d'accessibilité</b> : les images ajoutées ont des textes de remplacement automatiques à contrôler.</p>
<p><b>Étape 5</b> : la responsabilité du contenu reste à l'auteur. L'historique des versions permet de revenir à l'état d'avant la génération.</p>` },

/* 23 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Livrer pour tous, à plusieurs', k: 'Récap animé', hub: '0', hsub: 'erreur d\'accessibilité', hk: 'OBJECTIF',
  items: [{ ic: '♿', t: 'Accessibilité', d: 'Vrais titres, textes de remplacement, ordre de lecture, contraste' },
    { ic: '📄', t: 'Exporter', d: 'PDF balisé, vidéo 1080p, .ppsx · inspecter une copie' },
    { ic: '👥', t: 'Co-éditer', d: 'OneDrive, sections, @mentions, historique des versions' },
    { ic: '✨', t: 'Designer', d: 'Des mises en page pour les diapos simples' },
    { ic: '🤖', t: 'Copilot', d: 'Invite précise, premier jet, vérification humaine' }] }),
  n: `<p>Récapitulatif du module et de tout le parcours PowerPoint : une présentation professionnelle est structurée (masque), claire (design), maîtrisée à l'oral (présentateur), accessible et bien diffusée.</p>` },

/* 24 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis de la diffusion', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Alt+F10', d: 'Volet Sélection (noms et ordre des objets)' }, { k: 'F7', d: 'Vérifier l\'orthographe' }, { k: 'Ctrl+K', d: 'Insérer un lien hypertexte' }, { k: 'Ctrl+Alt+M', d: 'Nouveau commentaire' }, { k: 'Ctrl+S', d: 'Enregistrer (automatique sur OneDrive)' }, { k: 'Alt+F5', d: 'Mode présentateur (sous-titres, outils)' }], { cols: 3, y: 190 })}
${TIP('Un lien hypertexte accessible a un <b>texte parlant</b> (« Règlement du budget »), jamais « cliquez ici ».', { s: 7, kind: 'key', y: 600, w: 1000 })}`,
  n: `<p>Les six raccourcis du module. <b>Ctrl+K</b> : insérez des liens avec un texte explicite — un lecteur d'écran peut lister tous les liens d'un document, « cliquez ici » répété dix fois n'a aucun sens.</p>` },

/* 25 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'ppt', mod: 'p08', lab: 0, title: 'Lab 1 — Deck accessible et prêt à diffuser', tasks: ['<b>Vérifier l\'accessibilité</b> : 0 erreur', 'Textes de remplacement <b>informatifs</b>, décoratifs marqués', '<b>Ordre de lecture</b> : titre puis contenu', '<b>Inspecteur</b> sur une copie', 'PDF avec <b>balises de structure</b>', 'Vidéo <b>Full HD</b>, 5 s par diapo'] }),
  n: `<p>Scénario : la mairie de <b>Saint-Aubin</b> publie la présentation du budget participatif sur son site (obligation RGAA). Travail dans le <b>vrai PowerPoint</b>, sur un deck de 5-6 diapos (le vôtre ou un deck généré par Designer).</p>
<p>Validation : vérificateur à 0 erreur, chaque diapo avec un titre unique dans l'espace réservé de titre, copie inspectée, PDF balisé et MP4 1080p exportés.</p>` },

/* 26 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'ppt', mod: 'p08', lab: 1, title: 'Lab 2 — Co-écrire avec l\'équipe et l\'IA', tasks: ['OneDrive, <b>Copier le lien</b>, une <b>section</b> par personne', 'Un commentaire avec <b>@mention</b> attribuée', '<b>Copilot</b> : 6 diapos depuis le brief', 'Corrigez un chiffre, <b>titres-messages</b>', '<b>Designer</b> sur au moins 2 diapos', '<b>Historique des versions</b> : avant l\'IA'] }),
  n: `<p>Scénario : l'équipe marketing prépare le lancement de <b>GreenBox Mini</b> pour le comité de direction. Fichier fourni : <i>brief-lancement.txt</i> (prix 49 €, 15 000 unités, budget 180 k€, lancement septembre 2026).</p>
<p>Invite type : « Pour le comité de direction, crée 6 diapos au ton factuel à partir de brief-lancement.txt ; termine par la décision attendue : valider 180 k€ et un lancement en septembre 2026. » Sans licence Copilot, rédigez les 6 diapos à la main en suivant cette invite comme plan.</p>` },

/* 27 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quelle erreur d\'accessibilité est la plus fréquente dans PowerPoint ?', o: ['Police trop grande', 'Titre de diapositive manquant ou texte de remplacement absent', 'Trop de diapositives', 'Thème sombre'], a: [1], e: 'Le lecteur d\'écran s\'appuie sur les titres et les textes de remplacement : ce sont les premières erreurs signalées.' },
  { q: 'Que faire d\'une image purement décorative ?', o: ['La supprimer', 'La marquer comme décorative', 'Lui donner le texte « image »', 'La mettre en arrière-plan'], a: [1], e: 'Marquer comme décoratif indique au lecteur d\'écran de l\'ignorer, sans bruit inutile.' },
  { q: 'Pourquoi lancer l\'Inspecteur de document sur une copie ?', o: ['Il ne fonctionne pas sur l\'original', 'Les suppressions (notes, commentaires) sont définitives', 'Il change le thème', 'Il compresse les images'], a: [1], e: 'Les éléments retirés ne peuvent pas être récupérés par Annuler : gardez l\'original intact.' },
  { q: 'Comment notifier un collègue dans un commentaire PowerPoint 365 ?', o: ['L\'écrire en majuscules', 'Taper @ suivi de son nom', 'Le mettre en gras', 'Envoyer le fichier par e-mail'], a: [1], e: 'La @mention envoie une notification et peut attribuer le commentaire comme tâche.' },
  { q: 'Quelle est la bonne posture face à une présentation générée par Copilot ?', o: ['La projeter telle quelle', 'La considérer comme un premier jet à vérifier et retravailler', 'La supprimer systématiquement', 'La convertir en PDF immédiatement'], a: [1], e: 'L\'IA accélère le premier jet ; la vérification des faits, les titres-messages et l\'accessibilité restent votre responsabilité.' },
  { q: 'Quelle option du PDF transmet titres et textes de remplacement ? ', o: ['Encadrer les diapositives', 'Balises de structure du document pour l\'accessibilité', 'Inclure les diapositives masquées', 'Optimiser pour la taille minimale'], a: [1], e: 'Sans balises de structure, le PDF est illisible pour un lecteur d\'écran.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) b · 4) b · 5) b · 6) b.</p>` },

/* 28 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P08', html: END(), n: `<p>Fin du module 8 et du parcours PowerPoint. Félicitations !</p><p>Bilan : revenez sur les attentes notées au tableau lors du tour de table et vérifiez qu'elles sont couvertes.</p>` },
] };
