/* ===================== MODULE P06 — Présenter : mode présentateur, notes, minutage et raccourcis (Avancé) ===================== */
const SECSP06 = ['Des notes qui aident vraiment', 'Le mode présentateur', 'Répéter, minuter, piloter'];

(function () {
  if (document.getElementById('p06css')) return;
  const s = document.createElement('style'); s.id = 'p06css';
  s.textContent = `
  @property --p6s{syntax:'<integer>';initial-value:0;inherits:false}
  @keyframes p6tick{from{--p6s:12}to{--p6s:59}}
  .p6tm{font:800 26px var(--mono);color:#fff;font-variant-numeric:tabular-nums}
  .p6tm::after{counter-reset:p6s var(--p6s);content:counter(p6s,decimal-leading-zero);animation:p6tick 47s steps(47) infinite}
  .p6pv{position:absolute;background:#1F1F1F;border-radius:14px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(14,23,38,.6),0 0 0 1px rgba(0,0,0,.4);font-family:"Segoe UI",var(--font);color:#E5E7EB}
  .p6pv .bar{display:flex;gap:26px;align-items:center;height:42px;padding:0 18px;background:#2B2B2B;font-size:15px;color:#D1D5DB}
  .p6pv .bar b{margin-left:auto;color:#fff;font-weight:600}
  .p6ico{position:relative;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#3A3A3A;font-size:22px}
  .p6dlg{position:absolute;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.1);font-family:"Segoe UI",var(--font);overflow:hidden;color:#1B2A41}
  .p6dlg>header{display:flex;align-items:center;background:#F3F4F6;padding:10px 18px;font-weight:700;font-size:18px;border-bottom:1px solid #E3E8EF}
  .p6dlg>header::after{content:"✕";margin-left:auto;color:#94A3B8}
  .p6fs{border:1px solid #CBD5E1;border-radius:8px;padding:10px 14px 8px;position:relative;margin-top:8px}
  .p6fs>legend{font-size:15px;font-weight:700;color:#64748B;padding:0 6px}
  .p6r{position:relative;display:flex;align-items:center;gap:10px;font-size:18px;padding:4px 0}
  .p6r i{width:18px;height:18px;border-radius:50%;border:2px solid #64748B;flex:none;position:relative}
  .p6r i.on::after,.p6r i.p6sel::after{content:"";position:absolute;inset:3px;border-radius:50%;background:#C43E1C}
  .p6r i.p6sel:not(.on)::after{display:none}
  .p6r i.p6def::after{content:"";position:absolute;inset:3px;border-radius:50%;background:#C43E1C}
  .p6r i.p6def.off::after{display:none}
  @keyframes p6needle{from{transform:rotate(-80deg)}to{transform:rotate(18deg)}}
  .p6r u{text-decoration:none;width:18px;height:18px;border:2px solid #64748B;border-radius:4px;flex:none;display:grid;place-items:center;font-size:12px;color:#fff}
  .p6r u.on{background:#C43E1C;border-color:#C43E1C}
  .p6btn{position:relative;display:inline-block;padding:8px 20px;border:1px solid #94A3B8;border-radius:6px;font-size:17px;font-weight:600;background:#fff}
  .p6btn.pri{background:#C43E1C;border-color:#C43E1C;color:#fff}
  .p6note{font-size:21px;line-height:1.5;color:#1B2A41}
  .p6tag{display:inline-block;padding:2px 10px;border-radius:6px;font-size:15px;font-weight:800;margin-right:8px;color:#fff}
  .p6bar{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);transition:transform 1s cubic-bezier(.2,.8,.2,1)}
  .p6bar.on{transform:scaleY(1)}
  `;
  document.head.appendChild(s);
})();
const P06HOT = s => `<em class="ow-hot f zoom" data-s="${s}"><b>${s}</b></em>`;
/* mini diapositive « VinoSud » (fond nuit) */
const P06SL = (w, t, lines = 3, extra = '') => `<div style="position:relative;width:${w}px;height:${Math.round(w * 9 / 16)}px;background:#0F172A;border-radius:6px;overflow:hidden;flex:none;font-family:'Segoe UI',var(--font)">
 <div style="position:absolute;left:7%;top:9%;right:7%;color:#F8FAFC;font-weight:800;font-size:${Math.round(w * .055)}px;border-bottom:${Math.max(2, Math.round(w / 200))}px solid #38BDF8;padding-bottom:3%">${t}</div>
 ${Array.from({ length: lines }, (_, i) => `<i style="position:absolute;left:9%;top:${36 + i * 14}%;width:${62 - i * 9}%;height:6%;border-radius:4px;background:rgba(248,250,252,.35)"></i>`).join('')}${extra}</div>`;

window.MODULE = { code: 'P06', title: 'Présenter : mode présentateur, notes, minutage et raccourcis', short: 'Présenter', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Présenter', html: TITLE({ mod: 'POWERPOINT · MODULE 06 · AVANCÉ', title: 'Le jour J, <span class="grad">sans filet</span>… ou presque', sub: '« Notes, mode présentateur, minutage et clavier : l\'aisance se prépare »', agenda: SECSP06, art: APPART('ppt') }),
  n: `<p>Module 6 : <b>présenter</b>. Durée indicative : 55 minutes.</p>
<p>Le deck est prêt ; il reste le plus important : être à l'aise devant le public. On prépare un « filet de sécurité » : des notes utiles, le mode présentateur, une répétition minutée, et le pilotage au clavier pour faire face aux imprévus.</p>
<p>Question d'accroche : « Quel est votre pire souvenir de présentation ? » (écrans inversés, télécommande en panne, temps dépassé…). Notez les réponses : chaque section de ce module y répond.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Rédiger des <b>notes du présentateur</b> exploitables', 'Utiliser le <b>mode présentateur</b> et ses outils', 'Répéter et <b>minuter</b> : Vérifier le minutage, Coach', 'Piloter le diaporama <b>au clavier</b>, même face aux imprévus']),
  n: `<p>Quatre objectifs très concrets. À la fin du module, chacun doit être capable de lancer son diaporama en mode présentateur, de lire ses notes, de passer en écran noir et d'aller directement à la diapo 14.</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP06, 0), n: `<p>Première partie : les <b>notes du présentateur</b>. Où les écrire, quoi y mettre, et le piège à éviter.</p>` },

/* 4 — LA ZONE NOTES */
{ title: 'La zone Notes', html: `${H('Où écrire ses notes ?', 'Des notes qui aident vraiment')}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1060, h: 660, title: 'Séminaire VinoSud.pptx', tab: 'Affichage',
  groups: [['Modes de présentation', ['🖥️ Normal', '🗂️ Trieuse', '📝 Page de notes', '📖 Mode Lecture']], ['Modes masque', ['🏛️ Masque des diapositives']], ['Afficher', ['Règle', 'Quadrillage', '🗒️ Notes']]],
  hot: { '🗒️ Notes': 1, '📝 Page de notes': 3 },
  body: `<div style="position:absolute;left:0;top:0;bottom:0;width:170px;background:#F3F4F6;border-right:1px solid #E3E8EF;padding:14px;display:flex;flex-direction:column;gap:12px">${['2026 : l\'année de l\'export', 'L\'export a porté…', 'Résultats par zone'].map((t, i) => `<div style="display:flex;gap:6px"><b style="font-size:12px;color:#64748B">${i + 1}</b><div style="${i === 1 ? 'box-shadow:0 0 0 3px #C43E1C;border-radius:6px' : ''}">${P06SL(124, t, 2)}</div></div>`).join('')}</div>
  <div style="position:absolute;left:250px;top:16px">${P06SL(620, 'L\'export a porté notre croissance', 1, `<b style="position:absolute;left:9%;top:52%;font-size:44px;color:#38BDF8;font-weight:900">+18 %</b>`)}</div>
  <div style="position:absolute;left:170px;right:0;top:372px;bottom:34px;background:#fff;border-top:3px solid #CBD5E1;padding:12px 20px">
   <div class="p6note"><b class="tw f" data-s="2" style="--n:52;border-color:#C43E1C">Accroche : il y a 3 ans, l'export pesait 20 % du CA.</b></div>
   <div class="p6note f" data-s="2" style="color:#64748B;font-size:17px;margin-top:4px">→ Citer les 3 pays : Suède, Japon, Canada</div></div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:34px;background:#F3F4F6;border-top:1px solid #E3E8EF;display:flex;align-items:center;gap:22px;padding:0 16px;font-size:14px;color:#33445E">Diapositive 2 sur 4<span style="margin-left:auto;position:relative;font-weight:700">🗒️ Notes${P06HOT(1)}</span><span>💬 Commentaires</span><span>▦ ▤ ▣</span><span>— ● + 72 %</span></div>` })}
<div class="col" style="position:absolute;left:1160px;right:70px;top:190px;gap:14px">
 ${CARD('<b>1 · Notes</b><br>barre d\'état ou Affichage', 1)}${CARD('<b>2 · Sous la diapo</b><br>visibles de vous seul', 2)}${CARD('<b>3 · Page de notes</b><br>relire et imprimer', 3)}</div>`,
  n: `<p>Démo dans PowerPoint, mode Normal.</p>
<p><b>Étape 1</b> : si la zone Notes n'est pas visible, cliquez sur <b>Notes</b> dans la barre d'état (en bas) ou <i>Affichage › Afficher › Notes</i>. Faites glisser la séparation pour l'agrandir.</p>
<p><b>Étape 2</b> : on tape directement sous la diapo. Ces notes ne sont visibles que de vous, dans le mode présentateur — jamais par le public sur l'écran projeté.</p>
<p><b>Étape 3</b> : <i>Affichage › Page de notes</i> montre une page par diapo (miniature + notes) : pratique pour relire l'ensemble ou imprimer.</p>
<p>Scénario fil rouge du module : Sophie, directrice commerciale de <b>VinoSud</b>, intervient 15 minutes au séminaire des 120 commerciaux.</p>` },

/* 5 — REPÈRES, PAS DISCOURS */
{ title: 'Des repères, pas un discours', html: `${H('Des repères, pas un discours', 'Des notes qui aident vraiment')}
${VS({ y: 175, l: { t: 'Un discours rédigé', c: '#DC2626', ic: '✘', html: `<div style="font-size:16px;line-height:1.5;color:#94A3B8;text-align:justify">Bonjour à toutes et à tous, je suis très heureuse d'être parmi vous aujourd'hui pour vous présenter les résultats de l'export qui, comme vous le savez sans doute, ont été particulièrement bons cette année puisque nous avons réalisé une croissance de dix-huit pour cent de notre chiffre d'affaires à l'export, ce qui représente désormais quarante-deux pour cent de notre chiffre d'affaires total, grâce notamment à l'ouverture de trois nouveaux pays, à savoir la Suède, le Japon et le Canada, et je voudrais à ce titre remercier…</div><div class="chip bad" style="margin-top:14px">On lit, on perd le public</div>` },
  r: { t: 'Des repères', c: '#16A34A', ic: '✔', html: `<div class="col" style="gap:14px">
   <div class="p6note f left" data-s="3"><span class="p6tag" style="background:#7C3AED">ACCROCHE</span>Il y a 3 ans : 20 % du CA</div>
   <div class="p6note f left" data-s="4"><span class="p6tag" style="background:#0EA5E9">CHIFFRES</span><b>+18 %</b> · <b>42 %</b> · Suède, Japon, Canada</div>
   <div class="p6note f left" data-s="5"><span class="p6tag" style="background:#F59E0B">RÉGIE</span><b>PAUSE</b> 3 s · demander qui couvre la zone</div>
   <div class="p6note f left" data-s="6"><span class="p6tag" style="background:#16A34A">TRANSITION</span>« Et par zone ? »</div></div>` }, mid: '➜' })}
${TIP('Règle des <b>2 secondes</b> : chaque repère se lit d\'un coup d\'œil, debout, à un mètre de l\'écran.', { s: 7, kind: 'ok', y: 560, w: 1460 })}`,
  n: `<p><b>Étape 1</b> : à gauche, l'erreur classique — un discours entièrement rédigé. Devant le public, on le lit, on baisse les yeux, on perd le contact. Et on est perdu si on saute une ligne.</p>
<p><b>Étape 2</b> : à droite, des <b>repères</b> lisibles d'un coup d'œil.</p>
<p><b>Étape 3</b> : la phrase d'<b>accroche</b> (la seule qu'on peut écrire en entier).</p>
<p><b>Étape 4</b> : les 2 ou 3 <b>chiffres</b> à citer exactement : c'est là qu'on a peur de se tromper.</p>
<p><b>Étape 5</b> : les consignes de <b>régie</b> : « PAUSE », « demander qui… », « montrer la démo ». Écrivez-les en majuscules.</p>
<p><b>Étape 6</b> : la <b>transition</b> vers la diapo suivante : c'est ce qui rend la présentation fluide.</p>
<p>Exercice : faites réécrire en repères une note « discours » d'un des participants.</p>` },

/* 6 — PAGE DE NOTES */
{ title: 'Page de notes', html: `${H('Relire et imprimer ses notes', 'Des notes qui aident vraiment')}
<div class="a pop" style="--d:.2s;position:absolute;left:110px;top:175px;width:470px;height:640px;background:#fff;border-radius:6px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.08);padding:40px 46px">
 ${P06SL(378, 'Résultats par zone', 3)}
 <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px;font-size:17px;line-height:1.4;color:#1B2A41">
  <div class="f" data-s="2"><b style="color:#7C3AED">ACCROCHE</b> Europe du Nord : +25 %</div>
  <div class="f" data-s="2"><b style="color:#F59E0B">PAUSE</b> 3 s, demander qui couvre la zone</div>
  <div class="f" data-s="2"><b style="color:#16A34A">TRANSITION</b> « Nos 3 priorités »</div>
  ${LINES(3)}</div>
 <div style="position:absolute;right:30px;bottom:18px;font-size:14px;color:#94A3B8">3</div></div>
${PROC([{ p: 'Affichage > Page de notes', t: 'Une page par diapo : miniature + notes' }, { p: 'Fichier > Imprimer > Pages de notes', t: 'Version papier de secours' }, { p: 'Mode présentateur > A+ / A-', t: 'Notes lisibles à un mètre, debout' }], { x: 680, y: 200, w: 850, s0: 1 })}
${TIP('Imprimez-les en <b>Pages de notes</b> : si l\'ordinateur lâche, vous continuez.', { s: 4, x: 680, y: 640, w: 850, kind: 'ok' })}`,
  n: `<p><b>Étape 1</b> : <i>Affichage › Page de notes</i> affiche chaque diapo en haut d'une page A4, les notes dessous. Idéal pour relire l'ensemble de son discours d'une traite.</p>
<p><b>Étape 2</b> : <i>Fichier › Imprimer</i>, puis dans le deuxième menu déroulant (Diapositives en pleine page) choisissez <b>Pages de notes</b>.</p>
<p><b>Étape 3</b> : dans le mode présentateur, les boutons <b>A+ / A-</b> agrandissent la police des notes. Testez-les avant : lisible à un mètre, debout, avec le stress.</p>
<p><b>Étape 4</b> : la version papier est votre plan B si le PC ou le vidéoprojecteur tombe en panne.</p>` },

/* 7 — PIÈGE : LES NOTES PARTENT AVEC LE FICHIER */
{ title: 'Les notes partent avec le fichier', html: `${H('Attention : les notes voyagent avec le .pptx', 'Des notes qui aident vraiment')}
${FLOW({ x: 70, y: 175, w: 1460, h: 330,
  n: { f: { x: 140, y: 140, ic: 'pptx', l: 'Offre client.pptx', sub: 'avec notes' }, m: { x: 560, y: 140, ic: 'mail', l: 'Envoi par e-mail', s: 1 }, c: { x: 980, y: 140, ic: 'user', l: 'Le client', sub: 'ouvre le fichier', s: 2 } },
  l: [{ a: 'f', b: 'm', s: 1 }, { a: 'm', b: 'c', s: 2 }],
  p: [{ s: 1, keep: true, seg: [{ via: ['f', 'm'], lab: '.pptx', t: 1.4 }, { via: ['m', 'c'], t: 1.4 }] }] })}
<div class="callout f" data-s="3" style="left:1180px;top:230px;width:350px;background:#DC2626;font-size:21px">🗒️ « Ne pas évoquer le retard du lot 3 »</div>
<div style="position:absolute;left:70px;top:540px;width:1460px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 ${CARD(`<b>✔ Relire ou inspecter</b><div style="margin-top:8px">${PATH('Fichier > Informations > Vérifier la présence de problèmes > Inspecter le document')}</div>`, 4, 'font-size:20px')}
 ${CARD(`<b>✔ Envoyer un PDF</b><div style="margin-top:8px">${PATH('Fichier > Exporter > Créer un document PDF/XPS')}</div><div style="margin-top:6px">Diapositives seules : pas de notes</div>`, 5, 'font-size:20px')}</div>`,
  n: `<p>Le piège majeur des notes : elles sont <b>enregistrées dans le fichier</b>.</p>
<p><b>Étapes 1 et 2</b> : Sophie envoie son .pptx au client après la réunion, par e-mail.</p>
<p><b>Étape 3</b> : le client ouvre le fichier en mode Normal… et lit la note « Ne pas évoquer le retard du lot 3 ». Effet garanti.</p>
<p><b>Étape 4</b> : avant tout envoi externe, relisez les notes ou utilisez l'<b>Inspecteur de document</b> (<i>Fichier › Informations › Vérifier la présence de problèmes › Inspecter le document</i>), qui peut supprimer toutes les notes — sur une copie, car c'est définitif. On le verra en détail au module 8.</p>
<p><b>Étape 5</b> : plus simple : envoyez un <b>PDF</b> des diapositives (sans pages de notes).</p>` },

/* 8 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP06, 1), n: `<p>Deuxième partie : le <b>mode présentateur</b>, votre tableau de bord pendant le diaporama.</p>` },

/* 9 — DEUX ÉCRANS */
{ title: 'Deux écrans, deux vues', html: `${H('Deux écrans, deux vues', 'Le mode présentateur', PATH('Diaporama > Moniteurs > Utiliser le mode Présentateur'))}
<svg viewBox="0 0 1460 540" style="position:absolute;left:70px;top:175px;width:1460px;height:540px;overflow:visible">
 <g class="a pop" style="--d:.2s"><rect x="220" y="120" width="520" height="320" rx="16" fill="#1F2937"/><rect x="238" y="136" width="484" height="286" rx="6" fill="#1F1F1F"/>
  <rect x="180" y="440" width="600" height="22" rx="11" fill="#9CA3AF"/>
  <rect x="254" y="160" width="270" height="152" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/><rect x="270" y="176" width="170" height="14" rx="3" fill="#F8FAFC"/>
  <rect x="542" y="160" width="160" height="90" rx="4" fill="#0F172A" opacity=".7"/>
  ${[265, 282, 299, 316].map((y, i) => `<rect x="542" y="${y}" width="${150 - i * 18}" height="8" rx="3" fill="#9CA3AF"/>`).join('')}
  <text x="260" y="350" font-size="22" font-weight="800" fill="#fff" font-family="var(--mono)">0:04:12</text>
  ${[0, 1, 2, 3, 4].map(i => `<circle cx="${272 + i * 40}" cy="392" r="14" fill="#3A3A3A"/>`).join('')}
  <text x="400" y="510" text-anchor="middle" font-size="24" font-weight="900" fill="#0E1726">VOTRE ÉCRAN</text></g>
 <g class="f" data-s="1"><rect x="900" y="40" width="540" height="305" rx="8" fill="#0F172A" stroke="#E3E8EF" stroke-width="10"/>
  <text x="955" y="120" font-size="34" font-weight="800" fill="#F8FAFC">L'export a porté</text><text x="955" y="162" font-size="34" font-weight="800" fill="#F8FAFC">notre croissance</text><rect x="955" y="180" width="420" height="5" fill="#38BDF8"/>
  <text x="955" y="270" font-size="64" font-weight="900" fill="#38BDF8">+18 %</text>
  <path d="M1170 350 V410 M1110 410 H1230" stroke="#94A3B8" stroke-width="8" stroke-linecap="round"/>
  <text x="1170" y="460" text-anchor="middle" font-size="24" font-weight="900" fill="#0E1726">LE PUBLIC</text>
  <path d="M740 280 C 820 280, 830 200, 890 200" fill="none" stroke="#FA582D" stroke-width="4" stroke-dasharray="10 8" class="flow"/></g>
 ${[['Diapo en cours', 389, 60, 'M389 78 V158'], ['Diapo suivante', 622, 60, 'M622 78 V158'], ['Chronomètre', 90, 345, 'M170 340 H255'], ['Notes', 622, 510, 'M622 492 V325']].map(([t, x, y, d], i) => `<g class="f" data-s="${i + 2}"><path d="${d}" stroke="#FA582D" stroke-width="3"/><rect x="${x - 80}" y="${y - 17}" width="160" height="34" rx="17" fill="#FA582D"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">${t}</text></g>`).join('')}
</svg>
${TIP('Écrans inversés ? <b>Paramètres d\'affichage › Permuter le mode présentateur et le diaporama</b>.', { s: 6, kind: 'warn', x: 70, y: 735, w: 1460 })}`,
  n: `<p>Le principe : avec deux écrans (portable + vidéoprojecteur), PowerPoint affiche le <b>diaporama</b> au public et le <b>mode présentateur</b> sur votre écran. Réglage : <i>Diaporama › Moniteurs › Utiliser le mode Présentateur</i> (coché par défaut).</p>
<p><b>Étape 1</b> : le public ne voit que la diapo, en plein écran.</p>
<p><b>Étapes 2 à 5</b> : vous voyez la diapo en cours, la <b>suivante</b> (fini les « ah, ensuite il y a… »), vos <b>notes</b> et le <b>chronomètre</b>.</p>
<p><b>Étape 6</b> : si le mode présentateur s'affiche sur le vidéoprojecteur (cela arrive souvent avec un écran secondaire mal configuré), ne paniquez pas : en haut du mode présentateur, <i>Paramètres d'affichage › Permuter le mode présentateur et le diaporama</i>. On peut aussi choisir le moniteur dans <i>Diaporama › Moniteurs</i>.</p>` },

/* 10 — MAQUETTE DU MODE PRÉSENTATEUR */
{ title: 'Le mode présentateur', html: `${H('Votre tableau de bord', 'Le mode présentateur')}
<div class="p6pv a pop" style="--d:.2s;left:70px;top:170px;width:1080px;height:660px">
 <div class="bar"><span>Afficher la barre des tâches</span><span style="position:relative">Paramètres d'affichage ▾${P06HOT(6)}</span><b>Terminer le diaporama</b></div>
 <div style="position:absolute;left:22px;top:58px;display:flex;align-items:center;gap:16px"><span style="font-size:22px">⏸</span><span class="p6tm" style="position:relative">0:04:${P06HOT(1)}</span><span style="font-size:22px">↻</span></div>
 <div style="position:absolute;left:520px;top:62px;font:700 22px var(--font);color:#fff">14:32</div>
 <div style="position:absolute;left:22px;top:108px;box-shadow:0 0 0 2px #38BDF8">${P06SL(620, 'L\'export a porté notre croissance', 1, `<b style="position:absolute;left:9%;top:52%;font-size:44px;color:#38BDF8;font-weight:900">+18 %</b>`)}</div>
 <div style="position:absolute;left:30px;top:478px;display:flex;gap:14px">
  ${[['✏️', 2], ['▦', 3], ['🔍', 4], ['⬛', 5], ['💬', 0], ['⋯', 0]].map(([i, h]) => `<span class="p6ico">${i}${h ? P06HOT(h) : ''}</span>`).join('')}</div>
 <div style="position:absolute;left:30px;top:560px;display:flex;align-items:center;gap:16px;font-size:18px;color:#D1D5DB"><span class="p6ico">◀</span>Diapositive 2 sur 5<span class="p6ico">▶</span></div>
 <div style="position:absolute;left:670px;top:62px;font-size:16px;color:#9CA3AF">Diapositive suivante</div>
 <div style="position:absolute;left:670px;top:92px;opacity:.9">${P06SL(380, 'Résultats par zone', 3)}</div>
 <div style="position:absolute;left:670px;top:320px;right:20px;bottom:20px;background:#2B2B2B;border-radius:8px;padding:14px 16px;color:#F3F4F6;font-size:20px;line-height:1.45">
  <b style="color:#C4B5FD">ACCROCHE</b> il y a 3 ans : 20 % du CA<br><b style="color:#7DD3FC">CITER</b> Suède, Japon, Canada<br><b style="color:#FCD34D">PAUSE</b> après +18 %
  <div style="position:absolute;left:16px;bottom:10px;display:flex;gap:10px"><span class="p6ico" style="width:40px;height:40px;font-size:16px">A+</span><span class="p6ico" style="width:40px;height:40px;font-size:16px">A-</span></div></div>
</div>
<div class="col" style="position:absolute;left:1180px;right:70px;top:180px;gap:10px">
 ${CARD('<b>1</b> · Chrono : pause, remise à zéro', 1, 'font-size:18px')}${CARD('<b>2</b> · Stylo et surligneur', 2, 'font-size:18px')}${CARD('<b>3</b> · Voir toutes les diapos', 3, 'font-size:18px')}${CARD('<b>4</b> · Zoom sur une zone', 4, 'font-size:18px')}${CARD('<b>5</b> · Écran noir', 5, 'font-size:18px')}${CARD('<b>6</b> · Permuter les écrans', 6, 'font-size:18px')}</div>`,
  n: `<p>Maquette fidèle du mode présentateur de PowerPoint 365. Démo recommandée : <b>Alt+F5</b> sur votre poste, puis montrez chaque zone.</p>
<p><b>Étape 1</b> : le <b>chronomètre</b> démarre avec le diaporama (ici il tourne réellement). Bouton pause pendant une question, flèche circulaire pour le remettre à zéro. L'heure est affichée à côté.</p>
<p><b>Étape 2</b> : le <b>stylo</b> : stylo laser, stylo, surligneur, gomme. Les annotations peuvent être conservées à la fin (PowerPoint le propose) — en général, on les ignore.</p>
<p><b>Étape 3</b> : <b>voir toutes les diapositives</b> : une grille pour sauter n'importe où, sans que le public voie la navigation.</p>
<p><b>Étape 4</b> : <b>zoom</b> : on clique sur une zone de la diapo (un chiffre dans un tableau) pour l'agrandir. Clic droit pour revenir.</p>
<p><b>Étape 5</b> : <b>écran noir</b> (équivalent de la touche B).</p>
<p><b>Étape 6</b> : <b>Paramètres d'affichage</b> › Permuter le mode présentateur et le diaporama, ou Dupliquer le diaporama.</p>
<p>Le bouton 💬 active les <b>sous-titres</b> en direct ; A+ / A- règlent la taille des notes.</p>` },

/* 11 — OUTILS */
{ title: 'Les outils en séance', html: `${H('Six outils pour la séance', 'Le mode présentateur')}
<div style="position:absolute;left:70px;right:70px;top:185px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px">
 ${[['✏️', 'Stylo, surligneur', 'Entourer, souligner en direct', 'Ctrl+P'], ['▦', 'Toutes les diapositives', 'Sauter à la bonne diapo', 'Ctrl+S'], ['🔍', 'Zoom', 'Agrandir un détail', '+'], ['⬛', 'Écran noir', 'Ramener l\'attention sur vous', 'B'], ['💬', 'Sous-titres', 'Transcription en direct, voire traduite', ''], ['🖐️', 'Pointeur laser', 'Montrer sans annoter', 'Ctrl+L']].map(([i, t, d, k], j) => `
 <div class="card f zoom" data-s="${j + 1}" style="padding:22px 24px;display:flex;flex-direction:column;gap:8px">
  <div style="display:flex;align-items:center;gap:16px"><span style="display:grid;place-items:center;width:64px;height:64px;border-radius:18px;background:#1F1F1F;font-size:30px">${i}</span><b style="font-size:24px">${t}</b></div>
  <div style="font-size:19px;color:#33445E">${d}</div>${k ? `<div>${KEYS(k)}</div>` : '<div class="chip blu" style="align-self:flex-start">Diaporama › Paramètres des sous-titres</div>'}</div>`).join('')}
</div>`,
  n: `<p>Les six outils les plus utiles en séance, avec leur raccourci quand il existe.</p>
<p><b>1. Stylo</b> (Ctrl+P) : pour entourer un chiffre pendant une question. <b>E</b> efface tout. <b>Ctrl+A</b> revient à la flèche.</p>
<p><b>2. Toutes les diapositives</b> (Ctrl+S en diaporama) : la grille de navigation, invisible pour le public en mode présentateur.</p>
<p><b>3. Zoom</b> (touche +, ou la loupe) : agrandit une zone ; touche - ou clic droit pour revenir.</p>
<p><b>4. Écran noir</b> (B) : ramène l'attention sur l'orateur pendant un échange.</p>
<p><b>5. Sous-titres</b> : <i>Diaporama › Paramètres des sous-titres</i> pour choisir la langue parlée et la langue des sous-titres (traduction possible). Grand atout d'accessibilité.</p>
<p><b>6. Pointeur laser</b> (Ctrl+L) : un point rouge qui suit la souris, sans laisser de trace.</p>` },

/* 12 — RÉPÉTER AVEC UN SEUL ÉCRAN */
{ title: 'Répéter avec un seul écran', html: `${H('Répéter avec un seul écran', 'Le mode présentateur')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:200px;width:620px;text-align:center">
 <div style="transform:scale(1.8);transform-origin:50% 0;display:inline-block">${KEYS('Alt+F5')}</div>
 <div style="font-size:24px;font-weight:700;margin-top:80px;color:#33445E">Mode présentateur <b>immédiat</b></div>
 <div style="font-size:20px;color:#6B7A90;margin-top:6px">même sans second écran</div></div>
<div style="position:absolute;left:70px;top:450px;width:620px;display:flex;flex-direction:column;gap:14px">
 ${[['F5', 'Diaporama depuis le début'], ['Maj+F5', 'Depuis la diapo active'], ['Alt+F5', 'Mode présentateur']].map(([k, d], i) => `<div class="card f left" data-s="${i + 1}" style="display:flex;align-items:center;gap:18px;padding:14px 20px">${KEYS(k)}<span style="font-size:21px;font-weight:600">${d}</span></div>`).join('')}</div>
<div class="p6pv f zoom" data-s="4" style="left:760px;top:190px;width:770px;height:440px">
 <div class="bar"><span>Afficher la barre des tâches</span><span style="position:relative">Paramètres d'affichage ▾</span><b>Terminer le diaporama</b></div>
 <div style="position:absolute;left:18px;top:60px">${P06SL(430, 'Résultats par zone', 3)}</div>
 <div style="position:absolute;left:470px;top:60px">${P06SL(270, 'Nos 3 priorités', 2)}</div>
 <div style="position:absolute;left:470px;top:225px;right:16px;bottom:16px;background:#2B2B2B;border-radius:8px;padding:10px 12px;font-size:16px;color:#F3F4F6;line-height:1.4"><b style="color:#FCD34D">PAUSE</b> après Europe du Nord</div>
 <div class="p6dlg f" data-s="5" style="left:180px;top:44px;width:380px;z-index:3"><div style="padding:8px 0;font-size:17px">
  <div style="padding:8px 16px;background:#FDECE6;font-weight:700;position:relative">Permuter le mode présentateur et le diaporama${P06HOT(5)}</div><div style="padding:8px 16px">Dupliquer le diaporama</div></div></div>
</div>
${TIP('Répétez <b>debout</b>, à voix haute, avec le chrono du mode présentateur.', { s: 6, x: 760, y: 670, w: 770, kind: 'ok' })}`,
  n: `<p><b>Étapes 1 à 3</b> : les trois façons de lancer le diaporama. <b>F5</b> depuis le début, <b>Maj+F5</b> depuis la diapo affichée (pratique pour tester une animation), <b>Alt+F5</b> directement en mode présentateur.</p>
<p><b>Étape 4</b> : avec <b>Alt+F5</b>, le mode présentateur s'ouvre même sur un portable seul : c'est l'outil idéal pour répéter dans le train ou à son bureau, avec ses notes et le chronomètre.</p>
<p><b>Étape 5</b> : le jour J, si les vues sont inversées : <i>Paramètres d'affichage › Permuter le mode présentateur et le diaporama</i>. « Dupliquer le diaporama » affiche la même chose sur les deux écrans (sans notes).</p>
<p><b>Étape 6</b> : conseil de coach : répétez debout et à voix haute. Une répétition silencieuse sous-estime la durée réelle d'environ 30 %.</p>` },

/* 13 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP06, 2), n: `<p>Troisième partie : <b>répéter, minuter</b> et <b>piloter</b> le diaporama au clavier.</p>` },

/* 14 — VÉRIFIER LE MINUTAGE */
{ title: 'Vérifier le minutage', html: `${H('Vérifier le minutage', 'Répéter et minuter', PATH('Diaporama > Configuration > Vérifier le minutage'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:185px;display:flex;align-items:center;gap:18px;padding:12px 20px;background:#fff;border-radius:12px;box-shadow:0 18px 40px -20px rgba(14,23,38,.5),0 0 0 1px #CBD5E1;font:600 20px var(--font)">
 <b>Enregistrement</b><span>➡</span><span>⏸</span><span style="font-family:var(--mono);color:#C43E1C">0:01:32</span><span>↻</span><span style="font-family:var(--mono);color:#64748B">0:06:45</span></div>
<svg viewBox="0 0 860 420" style="position:absolute;left:70px;top:280px;width:860px;height:420px">
 <path d="M60 360 H840" stroke="#CBD5E1" stroke-width="3"/>
 ${[[1, 45], [2, 92], [3, 128], [4, 70], [5, 150], [6, 60], [7, 105], [8, 40]].map(([n, v], i) => `<g><rect class="p6bar" data-s="${i < 4 ? 1 : 2}" x="${90 + i * 95}" y="${360 - v * 2}" width="60" height="${v * 2}" rx="8" fill="${v > 120 ? '#DC2626' : '#0EA5E9'}"/>
  <text x="${120 + i * 95}" y="392" text-anchor="middle" font-size="18" font-weight="700" fill="#6B7A90">D${n}</text>
  <text class="f" data-s="${i < 4 ? 1 : 2}" x="${120 + i * 95}" y="${350 - v * 2}" text-anchor="middle" font-size="17" font-weight="800" fill="#33445E">${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}</text></g>`).join('')}
 <text class="f" data-s="2" x="565" y="40" font-size="18" font-weight="800" fill="#DC2626">trop long ?</text>
</svg>
<div class="p6dlg f zoom" data-s="3" style="left:970px;top:200px;width:560px">
 <header>Microsoft PowerPoint</header>
 <div style="padding:20px 22px;font-size:20px;line-height:1.45">Durée totale du diaporama : <b>0:11:30</b>.<br>Voulez-vous conserver les nouveaux minutages ?
  <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:18px"><span class="p6btn pri">Oui</span><span class="p6btn" style="position:relative">Non${P06HOT(4)}</span></div></div></div>
${TIP('Minutages conservés ? Les diapos <b>avancent seules</b>. Décochez <b>Diaporama › Utiliser le minutage</b>.', { s: 4, kind: 'warn', x: 970, y: 470, w: 560 })}`,
  n: `<p><b>Vérifier le minutage</b> lance le diaporama avec une barre <b>Enregistrement</b> : un chronomètre par diapo (0:01:32) et un chronomètre total (0:06:45).</p>
<p><b>Étapes 1 et 2</b> : à la fin, on obtient la durée passée sur chaque diapo. Lecture utile : la diapo 3 et la diapo 5 dépassent 2 minutes — trop denses ? à scinder ? à raccourcir ?</p>
<p><b>Étape 3</b> : PowerPoint propose de <b>conserver les nouveaux minutages</b>. Oui = chaque diapo avancera automatiquement après sa durée (visible dans le mode Trieuse sous chaque miniature).</p>
<p><b>Étape 4</b> : le piège : en réunion, les diapos défilent toutes seules ! Pour une présentation orale, répondez <b>Non</b>, ou décochez ensuite <i>Diaporama › Utiliser le minutage</i>. Conserver les minutages est utile pour une borne ou une vidéo.</p>` },

/* 15 — RÉPÉTER AVEC COACH */
{ title: 'Répéter avec Coach', html: `${H('Répéter avec Coach', 'Répéter et minuter', PATH('Diaporama > Répéter avec Coach'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:880px;height:620px;background:#fff;border-radius:16px;box-shadow:0 30px 60px -25px rgba(14,23,38,.45),0 0 0 1px #E3E8EF;padding:24px 30px">
 <div style="font-size:24px;font-weight:900">Rapport de répétition</div><div style="font-size:16px;color:#6B7A90">Durée : 11 min 30 s · 5 diapositives</div>
 <svg viewBox="0 0 300 180" style="position:absolute;left:30px;top:100px;width:330px;height:200px">
  <path d="M30 160 A120 120 0 0 1 270 160" fill="none" stroke="#E3E8EF" stroke-width="26"/>
  <path d="M30 160 A120 120 0 0 1 90 56" fill="none" stroke="#FDE68A" stroke-width="26"/><path d="M90 56 A120 120 0 0 1 210 56" fill="none" stroke="#86EFAC" stroke-width="26"/><path d="M210 56 A120 120 0 0 1 270 160" fill="none" stroke="#FCA5A5" stroke-width="26"/>
  <g class="f" data-s="1"><line x1="150" y1="160" x2="150" y2="60" stroke="#0E1726" stroke-width="6" stroke-linecap="round" style="transform-origin:150px 160px;animation:p6needle 2s ease-out both"/><circle cx="150" cy="160" r="12" fill="#0E1726"/></g>
 </svg>
 <div class="f" data-s="1" style="position:absolute;left:380px;top:120px"><div style="font-size:52px;font-weight:900;color:#16A34A">142</div><div style="font-size:19px;color:#33445E">mots / minute · <b>bon rythme</b></div></div>
 <div style="position:absolute;left:30px;right:30px;top:330px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
  <div class="card f" data-s="2" style="padding:16px 18px"><b style="font-size:20px">Mots de remplissage</b><div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><span class="chip bad">« euh » ×7</span><span class="chip bad">« en fait » ×4</span><span class="chip bad">« du coup » ×3</span></div></div>
  <div class="card f" data-s="3" style="padding:16px 18px"><b style="font-size:20px">Lecture des diapos</b><div style="font-size:18px;color:#33445E;margin-top:8px">Diapo 3 : texte lu mot à mot</div></div>
  <div class="card f" data-s="4" style="padding:16px 18px"><b style="font-size:20px">Ton et hauteur</b><div style="font-size:18px;color:#33445E;margin-top:8px">Voix monotone à la diapo 4</div></div>
  <div class="card f" data-s="4" style="padding:16px 18px"><b style="font-size:20px">Langage inclusif</b><div style="font-size:18px;color:#33445E;margin-top:8px">Suggestions de formulation</div></div></div>
</div>
${STAT({ v: '🎙️', t: 'Coach écoute votre voix : micro indispensable', x: 990, y: 200, w: 540, s: 1, c: '#7C3AED' })}
${STAT({ v: '0', t: 'personne d\'autre ne voit le rapport : répétez sans gêne', x: 990, y: 400, w: 540, s: 5, c: '#16A34A' })}`,
  n: `<p><b>Répéter avec Coach</b> (anciennement « Coach du présentateur ») : <i>Diaporama › Répéter avec Coach</i>. PowerPoint écoute votre voix pendant la répétition et produit un <b>rapport</b>.</p>
<p><b>Étape 1</b> : le <b>débit</b> : entre 100 et 165 mots par minute, c'est confortable pour le public. Trop rapide = stress.</p>
<p><b>Étape 2</b> : les <b>mots de remplissage</b> (« euh », « en fait », « du coup ») comptés précisément.</p>
<p><b>Étape 3</b> : la <b>lecture des diapos</b> : Coach détecte quand vous lisez le texte affiché mot à mot.</p>
<p><b>Étape 4</b> : le ton (voix monotone), le langage inclusif ou culturellement sensible.</p>
<p><b>Étape 5</b> : le rapport est privé : idéal pour progresser seul. Disponible dans PowerPoint pour Microsoft 365 et PowerPoint sur le web, avec un micro.</p>` },

/* 16 — CONFIGURER LE DIAPORAMA */
{ title: 'Configurer le diaporama', html: `${H('Configurer le diaporama', 'Répéter et minuter', PATH('Diaporama > Configuration > Configurer le diaporama'))}
<div class="p6dlg a pop" style="--d:.2s;left:70px;top:180px;width:900px">
 <header>Paramètres du diaporama</header>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;padding:14px 22px 20px">
  <fieldset class="p6fs"><legend>Type de diaporama</legend>
   <div class="p6r"><i class="p6def" data-off="1"></i><span>Présenté par un orateur (plein écran)</span></div>
   <div class="p6r"><i></i>Visionné par une personne (fenêtre)</div>
   <div class="p6r"><i class="p6sel" data-s="1"></i><span style="position:relative">Visionné sur une borne (plein écran)${P06HOT(1)}</span></div></fieldset>
  <fieldset class="p6fs"><legend>Diapositives</legend>
   <div class="p6r"><i class="p6def" data-off="2"></i>Toutes</div><div class="p6r"><i class="p6sel" data-s="2"></i><span style="position:relative">De : <b>1</b> à : <b>8</b>${P06HOT(2)}</span></div></fieldset>
  <fieldset class="p6fs"><legend>Options du diaporama</legend>
   <div class="p6r"><u data-s="1">✔</u>Exécuter en continu jusqu'à Échap</div><div class="p6r"><u></u>Diaporama sans narration</div><div class="p6r"><u></u>Diaporama sans animation</div></fieldset>
  <fieldset class="p6fs"><legend>Défilement des diapositives</legend>
   <div class="p6r"><i class="p6sel" data-s="3"></i><span style="position:relative">Manuellement${P06HOT(3)}</span></div><div class="p6r"><i class="p6def" data-off="3"></i>Utiliser le minutage, s'il existe</div></fieldset>
 </div></div>
<div class="col" style="position:absolute;left:1010px;right:70px;top:190px;gap:16px">
 ${CARD('<b>🔁 Borne</b><br>boucle automatique : salon, accueil', 1)}${CARD('<b>✂️ Plage</b><br>projeter seulement une partie', 2)}${CARD('<b>🖐️ Manuellement</b><br>ignore les minutages enregistrés', 3)}</div>
${TIP('Le mode borne impose des <b>minutages</b> : sans eux, le diaporama reste bloqué sur la 1<sup>re</sup> diapo.', { s: 4, kind: 'warn', x: 70, y: 580, w: 1460 })}`,
  n: `<p>La boîte <i>Configurer le diaporama</i> règle le comportement du diaporama.</p>
<p><b>Étape 1</b> : <b>Visionné sur une borne</b> : plein écran, en boucle, les clics sont ignorés (seuls les liens et boutons d'action fonctionnent). Idéal pour un stand de salon ou l'écran d'accueil. « Exécuter en continu jusqu'à Échap » se coche automatiquement.</p>
<p><b>Étape 2</b> : <b>Diapositives De… à…</b> : projeter seulement une partie, par exemple pour une version courte (ou utiliser un diaporama personnalisé).</p>
<p><b>Étape 3</b> : <b>Défilement manuel</b> : ignore les minutages enregistrés — la solution définitive au piège de la diapo précédente.</p>
<p><b>Étape 4</b> : piège inverse : en mode borne sans minutages, le diaporama ne bouge pas. Utilisez <i>Vérifier le minutage</i> ou <i>Transitions › Après : 00:05,00</i> sur toutes les diapos.</p>
<p>« Visionné par une personne » ouvre le diaporama dans une fenêtre redimensionnable : pratique en visio pour garder l'accès aux autres applications.</p>` },

/* 17 — COMBIEN DE DIAPOS */
{ title: 'Combien de diapos ?', html: `${H('Combien de diapos pour 20 minutes ?', 'Répéter et minuter')}
<svg viewBox="0 0 1460 260" style="position:absolute;left:70px;top:190px;width:1460px;height:260px">
 <rect x="0" y="90" width="1460" height="70" rx="35" fill="#E3E8EF"/>
 <rect x="0" y="90" width="1460" height="70" rx="35" fill="url(#gO)" class="growX" style="--d:.3s"/>
 ${Array.from({ length: 13 }, (_, i) => `<rect class="a pop" style="--d:${.5 + i * .1}s" x="${12 + i * 88}" y="100" width="76" height="50" rx="10" fill="#fff" fill-opacity=".9"/><text class="a fade" style="--d:${.6 + i * .1}s" x="${50 + i * 88}" y="133" text-anchor="middle" font-size="18" font-weight="800" fill="#C43E1C">${i + 1}</text>`).join('')}
 <g class="f" data-s="1"><rect x="1158" y="96" width="294" height="58" rx="29" fill="#0E1726"/><text x="1305" y="133" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">Questions · 5 min</text></g>
 ${[0, 5, 10, 15, 20].map(m => `<text x="${m * 73}" y="60" text-anchor="${m ? m === 20 ? 'end' : 'middle' : 'start'}" font-size="18" font-weight="700" fill="#6B7A90">${m} min</text>`).join('')}
</svg>
${STAT({ v: '1 à 2 min', t: 'par diapo « idée »', x: 70, y: 480, w: 440, s: 2, c: '#0EA5E9' })}
${STAT({ v: '10 à 15', t: 'diapos pour un créneau de 20 min', x: 580, y: 480, w: 440, s: 3, c: '#FA582D' })}
${STAT({ v: '-25 %', t: 'de temps prévu pour les questions', x: 1090, y: 480, w: 440, s: 4, c: '#16A34A' })}
${TIP('Trop de diapos ? Passez les annexes en <b>diapos masquées</b> (clic droit › Masquer la diapositive).', { s: 5, x: 70, y: 690, w: 1460 })}`,
  n: `<p>Repère de calibrage, à adapter au style de chacun.</p>
<p><b>Étape 1</b> : pour un créneau de 20 minutes, gardez environ un quart du temps pour les <b>questions</b>.</p>
<p><b>Étape 2</b> : comptez <b>1 à 2 minutes</b> par diapo d'idée (une diapo titre ou de section se passe en quelques secondes).</p>
<p><b>Étape 3</b> : soit <b>10 à 15 diapos</b> pour 20 minutes. Sophie (VinoSud) a 15 minutes : 5 à 8 diapos suffisent.</p>
<p><b>Étape 4</b> : prévoir les questions dans le temps, c'est respecter le public et l'organisateur.</p>
<p><b>Étape 5</b> : les diapos de détail passent en <b>diapos masquées</b> (clic droit sur la miniature › Masquer la diapositive) : sautées en diaporama, mais accessibles en tapant leur numéro + Entrée si on vous pose la question.</p>` },

/* 18 — PILOTER AU CLAVIER */
{ title: 'Piloter au clavier', html: `${H('Piloter le diaporama au clavier', 'Piloter')}
<div style="position:absolute;left:70px;top:180px;width:1000px"><table class="tbl">
 <tr><th>Touche</th><th>Effet en diaporama</th></tr>
 ${[['N · Espace · Entrée · →', 'Étape ou diapo suivante'], ['P · ← · Retour arrière', 'Étape ou diapo précédente'], ['14 puis Entrée', 'Aller à la diapo 14'], ['B ou .', 'Écran noir (et retour)'], ['W ou ,', 'Écran blanc (et retour)'], ['Ctrl+P · E', 'Stylo · effacer les annotations'], ['Ctrl+S', 'Liste de toutes les diapositives'], ['Échap', 'Quitter le diaporama']].map(([k, d], i) => `<tr class="f" data-s="${i + 1}"><td style="font-family:var(--mono);white-space:nowrap">${k}</td><td>${d}</td></tr>`).join('')}
</table></div>
<div class="a pop" style="--d:.4s;position:absolute;left:1120px;top:190px;width:410px;text-align:center">
 <svg viewBox="0 0 400 300" style="width:400px;height:300px"><rect x="20" y="20" width="360" height="200" rx="14" fill="#0B1220"/><rect x="36" y="36" width="328" height="168" rx="6" fill="#000" class="glow"/>
  <text x="200" y="130" text-anchor="middle" font-size="22" font-weight="800" fill="#475569">écran noir</text><path d="M160 220 V260 M120 260 H280" stroke="#94A3B8" stroke-width="10" stroke-linecap="round"/></svg>
 <div style="margin-top:10px">${KEYS('B')}</div></div>
${TIP('<b>F1</b> en diaporama : la liste complète des commandes.', { s: 9, kind: 'key', x: 1120, y: 600, w: 410 })}`,
  n: `<p>Le tableau de survie, à connaître par cœur. Faites-le pratiquer en direct : lancez un diaporama, et demandez au groupe d'annoncer la touche avant que vous ne l'utilisiez.</p>
<p><b>N</b> (next), Espace, Entrée, flèche droite : avancer. <b>P</b> (previous), flèche gauche, Retour arrière : reculer.</p>
<p><b>Numéro + Entrée</b> : saut direct. Imbattable quand on vous dit « vous pouvez revenir sur le tableau ? ».</p>
<p><b>B</b> (black) ou le point : écran noir. <b>W</b> (white) ou la virgule : écran blanc. Re-appuyer pour reprendre exactement au même endroit.</p>
<p><b>Ctrl+P</b> : stylo, <b>E</b> : effacer. <b>Ctrl+S</b> : liste des diapositives (« All slides »). <b>Échap</b> : quitter.</p>
<p><b>F1</b> pendant le diaporama affiche l'aide complète des raccourcis.</p>` },

/* 19 — FACE AUX IMPRÉVUS */
{ title: 'Face aux imprévus', html: `${H('Face aux imprévus', 'Piloter')}
<div style="position:absolute;left:70px;right:70px;top:185px;display:flex;flex-direction:column;gap:16px">
 ${[['🙋', '« Vous pouvez revenir sur le tableau ? »', '7+Entrée', 'Saut direct, sans défiler'], ['🗣️', 'Le débat s\'anime', 'B', 'Écran noir : l\'attention revient sur vous'], ['🎯', '« Quel chiffre exactement ? »', 'Ctrl+P', 'Entourer le chiffre en direct'], ['🔌', 'La télécommande ne répond plus', 'N', 'Le clavier prend le relais'], ['🧭', 'Vous êtes perdu', 'Ctrl+S', 'Toutes les diapos, choisir la bonne']].map(([i, q, k, d], j) => `
 <div class="card f left" data-s="${j + 1}" style="display:grid;grid-template-columns:60px 560px 240px 1fr;align-items:center;gap:20px;padding:14px 24px">
  <span style="font-size:38px">${i}</span><b style="font-size:22px">${q}</b><div>${KEYS(k)}</div><span style="font-size:19px;color:#33445E">${d}</span></div>`).join('')}
</div>`,
  n: `<p>Cinq situations réelles, une réponse clavier pour chacune. Jouez-les : un participant joue le public, un autre présente.</p>
<p><b>1</b> : « Vous pouvez revenir sur le tableau ? » → tapez le numéro (d'où l'intérêt des numéros de diapo, module 5) puis Entrée.</p>
<p><b>2</b> : un débat s'engage → <b>B</b>, l'écran noir ramène les regards vers les personnes. B à nouveau pour reprendre.</p>
<p><b>3</b> : on vous demande un chiffre précis → <b>Ctrl+P</b> et entourez-le ; <b>E</b> efface, <b>Ctrl+A</b> rend la flèche.</p>
<p><b>4</b> : la télécommande lâche → le clavier : N / P ou les flèches.</p>
<p><b>5</b> : vous ne savez plus où vous en êtes → <b>Ctrl+S</b> affiche toutes les diapos.</p>` },

/* 20 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Présenter en confiance', k: 'Récap animé', hub: 'Alt+F5', hfs: 54, hsub: 'mode présentateur', hk: 'LE RÉFLEXE',
  items: [{ ic: '🗒️', t: 'Notes = repères', d: 'Accroche, chiffres, régie, transition' }, { ic: '🖥️', t: 'Mode présentateur', d: 'Diapo suivante, notes, chrono, outils' },
    { ic: '⏱️', t: 'Vérifier le minutage', d: 'Puis décocher Utiliser le minutage' }, { ic: '🎙️', t: 'Répéter avec Coach', d: 'Débit, « euh », lecture des diapos' },
    { ic: '⌨️', t: 'Clavier', d: 'N, P, B, W, n° + Entrée, Échap' }] }),
  n: `<p>Récapitulatif. Faites restituer par le groupe le réflexe de chaque carte avant de la révéler. Insistez sur le piège du minutage et sur les notes qui partent avec le fichier.</p>` },

/* 21 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du présentateur', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'F5', d: 'Diaporama depuis le début' }, { k: 'Maj+F5', d: 'Depuis la diapo active' }, { k: 'Alt+F5', d: 'Mode présentateur' }, { k: 'B', d: 'Écran noir / retour' }, { k: 'W', d: 'Écran blanc / retour' }, { k: 'Ctrl+P', d: 'Stylo (en diaporama)' }, { k: 'E', d: 'Effacer les annotations' }, { k: 'Échap', d: 'Quitter le diaporama' }], { cols: 4, y: 190 })}
${TIP('Sur Mac : <b>⌘+Maj+Entrée</b> lance le diaporama, <b>Option+⌘+Entrée</b> le mode présentateur.', { s: 9, kind: 'key', y: 600, w: 1000 })}`,
  n: `<p>Les huit raccourcis du Lab 2. Faites un mini-concours : le formateur annonce une action, le premier qui donne la touche marque un point.</p>` },

/* 22 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'ppt', mod: 'p06', lab: 0, title: 'Lab 1 — L\'intervention du séminaire', tasks: ['Des <b>notes</b> sur <b>chaque</b> diapo (15 caractères min.)', 'Notes de « Résultats par zone » : le mot <b>pause</b>', 'Une <b>dernière</b> diapo contenant <b>questions</b>', 'Répétez : lancez le <b>diaporama</b> au moins une fois'] }),
  n: `<p>Scénario : Sophie, directrice commerciale de <b>VinoSud</b>, intervient 15 minutes devant 120 commerciaux. Ses notes sont vides et rien n'est prévu pour les questions.</p>
<p>Solution : notes diapo 1 « Accroche : il y a 3 ans, l'export pesait 20 % de notre CA. » ; diapo 2 « Citer les 3 pays : Suède, Japon, Canada. » ; « Résultats par zone » : « PAUSE après Europe du Nord, demander qui couvre la zone. » ; nouvelle diapo finale « Vos questions — et vos premiers contacts export ? ». Puis lancer le diaporama (B pour l'écran noir pendant les échanges).</p>` },

/* 23 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'ppt', mod: 'p06', lab: 1, title: 'Lab 2 — Pilote de diaporama', tasks: ['<b>F5</b> · <b>N</b> · <b>P</b> : lancer, avancer, reculer', '<b>B</b> puis <b>W</b> : écran noir, écran blanc', '<b>Ctrl+P</b> puis <b>E</b> : stylo, effacer', '<b>Échap</b> · <b>Alt+F5</b> · <b>Maj+F5</b>'] }),
  n: `<p>Lab au clavier : le simulateur demande une séquence de 10 raccourcis (F5, N, P, B, W, Ctrl+P, E, Échap, Alt+F5, Maj+F5) et valide chaque touche.</p>
<p>Scénario : le vidéoprojecteur est loin et la télécommande a rendu l'âme. Proposez aux plus rapides de refaire la séquence les yeux fermés !</p>` },

/* 24 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Quel raccourci lance directement le mode présentateur ?', o: ['F5', 'Maj+F5', 'Alt+F5', 'Ctrl+F5'], a: [2], e: 'Alt+F5 ouvre le mode présentateur, même avec un seul écran : idéal pour répéter.' },
  { q: 'En diaporama, quelle touche affiche un écran noir ?', o: ['N', 'B', 'W', 'Échap'], a: [1], e: 'B (ou le point) bascule sur un écran noir ; W (ou la virgule) sur un écran blanc.' },
  { q: 'Comment aller directement à la diapo 14 pendant le diaporama ?', o: ['Ctrl+14', 'Taper 14 puis Entrée', 'F14', 'Alt+Flèche droite 14 fois'], a: [1], e: 'Saisir le numéro puis Entrée saute directement à la diapositive.' },
  { q: 'Après « Vérifier le minutage », les diapos défilent seules en réunion. Pourquoi ?', o: ['Un bug', 'Le minutage enregistré est utilisé ; il faut décocher Utiliser le minutage', 'Le thème est animé', 'Le mode Lecture est actif'], a: [1], e: 'Les durées conservées font avancer les diapos. Décochez Diaporama › Utiliser le minutage pour garder la main.' },
  { q: 'Quel risque présentent les notes du présentateur quand on envoie le .pptx ?', o: ['Aucun, elles sont supprimées', 'Elles sont lisibles par le destinataire', 'Elles alourdissent le fichier de 50 %', 'Elles cassent les animations'], a: [1], e: 'Les notes restent dans le fichier : relisez-les ou inspectez le document avant envoi, ou envoyez un PDF sans notes.' },
  { q: 'Que contient une bonne note du présentateur ? (2 réponses)', o: ['Le discours complet, mot à mot', 'Les chiffres clés à citer exactement', 'Des consignes de régie (PAUSE, question au public)', 'Une copie du texte de la diapo'], a: [1, 2], e: 'Des repères : accroche, chiffres, régie, transition. Pas un discours à lire.' },
] ); }, n: `<p>Réponses : 1) c · 2) b · 3) b · 4) b · 5) b · 6) b et c.</p>` },

/* 25 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P06', html: END(), n: `<p>Fin du module 6 et du niveau Avancé. Vous savez préparer et piloter une présentation en confiance.</p><p>Prochain module (Expert) : <b>Design avancé</b> — Morphose, Zoom, grilles et data-viz.</p>` },
] };
