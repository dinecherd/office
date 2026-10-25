/* ===================== MODULE P07 — Design avancé : Morphose, Zoom, grilles et data-viz (Expert) ===================== */
const SECSP07 = ['La transition Morphose', 'Zoom : la navigation non linéaire', 'Grilles, hiérarchie et data-viz'];

(function () {
  if (document.getElementById('p07css')) return;
  const s = document.createElement('style'); s.id = 'p07css';
  s.textContent = `
  .p7st{position:absolute;overflow:hidden;border-radius:10px;background:#0F172A;box-shadow:0 30px 60px -25px rgba(14,23,38,.55),0 0 0 1px rgba(14,23,38,.12);font-family:"Segoe UI",var(--font)}
  .p7st.lt{background:#fff}
  .p7o{position:absolute;transition:all 1.3s cubic-bezier(.65,0,.35,1)}
  /* démo Morphose (diapo 5) */
  .p7d5 .c{left:80px;top:290px;width:120px;height:120px;border-radius:50%;background:#FA582D}
  .p7d5 .b{left:80px;top:460px;width:140px;height:34px;border-radius:8px;background:#38BDF8}
  .p7d5 .q{left:300px;top:300px;width:90px;height:90px;border-radius:14px;background:#A78BFA}
  .p7d5 .t{left:60px;top:40px;font-size:40px;font-weight:900;color:#F8FAFC;white-space:nowrap}
  .p7d5.k1 .c{left:640px;top:110px}
  .p7d5.k1 .t{left:300px;top:30px}
  .p7d5.k2 .c{width:230px;height:230px;left:600px;top:70px}
  .p7d5.k2 .b{width:760px}
  .p7d5.k2 .t{font-size:58px}
  .p7d5.k3 .c{background:#A3E635}
  .p7d5.k3 .q{background:#F472B6}
  .p7d5.k3 .b{background:#FBBF24}
  .p7d5.k4 .q{transform:rotate(225deg);left:330px;top:250px;border-radius:50% 14px}
  /* morphose simple (diapo 4) */
  .p7m4{left:70px;top:330px;width:90px;height:60px;border-radius:8px;background:#38BDF8}
  .p7m4.on{left:60px;top:90px;width:560px;height:300px;background:#A3E635}
  .p7m4t{left:40px;top:30px;font-size:30px;font-weight:900;color:#F8FAFC}
  .p7m4t.on{left:650px;top:430px;font-size:46px;color:#A3E635}
  /* caractères */
  .p7ch{position:absolute;top:0;width:90px;text-align:center;font:900 110px/1 var(--font);color:#0E1726;left:calc(var(--a) * 96px);transition:left 1.4s cubic-bezier(.65,0,.35,1),color 1.4s}
  .p7ch.on{left:calc(var(--b) * 96px);color:#C43E1C}
  /* appariement (boucles) */
  @keyframes p7fadeA{0%,30%{opacity:1}45%,85%{opacity:0}100%{opacity:1}}
  @keyframes p7fadeB{0%,30%{opacity:0}45%,85%{opacity:1}100%{opacity:0}}
  @keyframes p7move{0%,25%{left:30px;top:150px;width:70px;height:60px;background:#38BDF8}55%,85%{left:220px;top:30px;width:160px;height:180px;background:#A3E635}100%{left:30px;top:150px;width:70px;height:60px;background:#38BDF8}}
  .p7fa{animation:p7fadeA 4s infinite}.p7fb{animation:p7fadeB 4s infinite}.p7mv{animation:p7move 4s cubic-bezier(.65,0,.35,1) infinite}
  /* zoom de résumé */
  .p7z{position:absolute;top:220px;width:240px;height:135px;border-radius:8px;overflow:hidden;transform-origin:0 0;transition:transform 1.2s cubic-bezier(.65,0,.35,1),box-shadow .6s;box-shadow:0 10px 24px -10px rgba(0,0,0,.6);z-index:1}
  .p7z .zt{position:absolute;left:12px;top:10px;font-size:15px;font-weight:900;color:#fff}
  .p7z .zl{position:absolute;left:12px;height:5px;border-radius:3px;background:rgba(255,255,255,.55)}
  .p7zs.k2:not(.k3) .z1{transform:translate(-60px,-220px) scale(3.75);z-index:3}
  .p7zs.k4:not(.k5) .z3{transform:translate(-600px,-220px) scale(3.75);z-index:3}
  /* grille */
  .p7g{transition:all 1.2s cubic-bezier(.65,0,.35,1)}
  .p7g.on{left:var(--x)!important;top:var(--y)!important;width:var(--w)!important;transform:none!important}
  /* data-viz */
  .p7out{transition:opacity .8s}.p7out.on{opacity:0}
  .p7ser{transition:fill 1s}.p7ser.on{fill:#CBD5E1}
  .p7dlg{position:absolute;background:#fff;border-radius:12px;box-shadow:0 30px 70px -25px rgba(14,23,38,.45),0 0 0 1px rgba(14,23,38,.1);font-family:"Segoe UI",var(--font);overflow:hidden;color:#1B2A41}
  .p7dlg>header{display:flex;align-items:center;background:#F3F4F6;padding:10px 18px;font-weight:700;font-size:18px;border-bottom:1px solid #E3E8EF}
  .p7row{position:relative;display:flex;align-items:center;gap:10px;padding:8px 16px;font-size:18px;border-bottom:1px solid #F1F5F9}
  .p7row i{font-style:normal;color:#94A3B8;margin-left:auto}
  `;
  document.head.appendChild(s);
})();
const P07HOT = s => `<em class="ow-hot f zoom" data-s="${s}"><b>${s}</b></em>`;
/* hook d'étapes : ajoute k1…k8 aux scènes .p7k */
const P07K = (n, el) => el.querySelectorAll('.p7k').forEach(st => { for (let i = 1; i <= 8; i++) st.classList.toggle('k' + i, n >= i); });
/* graphique en barres groupées (données ventes-canal.csv, k€) */
const P07DATA = [['2024', 410, 95, 120], ['2025', 405, 150, 118], ['2026', 398, 205, 121]];
function P07CH(o = {}) {
  const W = o.w || 640, Hh = o.h || 380, x0 = 60, y0 = Hh - 50, k = (y0 - 30) / 450, bw = o.bw || 44, gw = (W - x0 - 20) / 3;
  const col = o.cols || ['#4472C4', '#ED7D31', '#A5A5A5'];
  let g = '';
  if (o.grid !== false) g += `<g class="${o.gs ? 'p7out' : ''}" ${o.gs ? `data-s="${o.gs}"` : ''}>${[0, 100, 200, 300, 400].map(v => `<path d="M${x0} ${y0 - v * k} H${W - 10}" stroke="#E3E8EF" stroke-width="1.5"/>`).join('')}</g>`;
  if (o.axis !== false) g += `<g class="${o.as ? 'p7out' : ''}" ${o.as ? `data-s="${o.as}"` : ''}>${[0, 100, 200, 300, 400].map(v => `<text x="${x0 - 10}" y="${y0 - v * k + 5}" text-anchor="end" font-size="14" fill="#6B7A90">${v}</text>`).join('')}</g>`;
  P07DATA.forEach((r, i) => {
    const cx = x0 + gw * i + gw / 2;
    [1, 2, 3].forEach((j, jj) => {
      const v = r[j], h = v * k, x = cx + (jj - 1) * (bw + 6) - bw / 2;
      const acc = o.acc && j === 2;
      g += `<rect class="grow ${o.ss && !acc ? 'p7ser' : ''}" ${o.ss && !acc ? `data-s="${o.ss}"` : ''} style="--d:${.2 + i * .15 + jj * .05}s" x="${x}" y="${y0 - h}" width="${bw}" height="${h}" rx="4" fill="${acc ? '#FA582D' : col[jj]}"/>`;
      if (o.lab && (!o.labAcc || j === 2)) g += `<text class="f" data-s="${o.lab}" x="${x + bw / 2}" y="${y0 - h - 8}" text-anchor="middle" font-size="${j === 2 ? 17 : 14}" font-weight="800" fill="${j === 2 ? '#C43E1C' : '#6B7A90'}">${v}</text>`;
    });
    g += `<text x="${cx}" y="${y0 + 28}" text-anchor="middle" font-size="17" font-weight="700" fill="#33445E">${r[0]}</text>`;
  });
  g += `<path d="M${x0} ${y0} H${W - 10}" stroke="#94A3B8" stroke-width="2"/>`;
  if (o.legend !== false) g += `<g class="${o.ls ? 'p7out' : ''}" ${o.ls ? `data-s="${o.ls}"` : ''}>${['Magasin', 'E-commerce', 'Grossistes'].map((t, j) => `<rect x="${x0 + 20 + j * 150}" y="${Hh - 14}" width="14" height="14" rx="3" fill="${col[j]}"/><text x="${x0 + 40 + j * 150}" y="${Hh - 2}" font-size="15" fill="#33445E">${t}</text>`).join('')}</g>`;
  return `<svg viewBox="0 0 ${W} ${Hh}" style="width:${W}px;height:${Hh}px;overflow:visible">${g}</svg>`;
}

window.MODULE = { code: 'P07', title: 'Design avancé : Morphose, Zoom, grilles et data-viz', short: 'Design avancé', slides: [

/* 1 — TITRE */
{ t: 's-title', cls: 'dark', title: 'Design avancé', html: TITLE({ mod: 'POWERPOINT · MODULE 07 · EXPERT', title: 'Le <span class="grad">mouvement</span> qui fait comprendre', sub: '« Morphose, Zoom, grilles et graphiques qui délivrent un message »', agenda: SECSP07,
  art: `<svg viewBox="0 0 760 900" style="width:100%;height:100%">
   <defs><linearGradient id="p7g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8F6B"/><stop offset="1" stop-color="#C43E1C"/></linearGradient></defs>
   <rect x="150" y="300" width="120" height="120" rx="60" fill="url(#p7g1)" filter="url(#gl)"><animate attributeName="x" values="150;420;420;150;150" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines=".65 0 .35 1;0 0 1 1;.65 0 .35 1;0 0 1 1" keyTimes="0;.3;.5;.8;1"/><animate attributeName="width" values="120;220;220;120;120" dur="6s" repeatCount="indefinite" keyTimes="0;.3;.5;.8;1"/><animate attributeName="height" values="120;220;220;120;120" dur="6s" repeatCount="indefinite" keyTimes="0;.3;.5;.8;1"/><animate attributeName="rx" values="60;40;40;60;60" dur="6s" repeatCount="indefinite" keyTimes="0;.3;.5;.8;1"/></rect>
   ${[0, 1, 2].map(i => `<rect x="${170 + i * 130}" y="${620 - [80, 140, 230][i]}" width="90" height="${[80, 140, 230][i]}" rx="10" fill="${i === 2 ? '#FA582D' : 'rgba(255,255,255,.18)'}" class="grow" style="--d:${.5 + i * .2}s"/>`).join('')}
   <path d="M150 650 H600" stroke="rgba(255,255,255,.35)" stroke-width="3"/>
  </svg>` }),
  n: `<p>Module 7, premier module du niveau <b>Expert</b>. Durée indicative : 70 minutes.</p>
<p>On passe des « diapos correctes » aux diapos de designer : le <b>mouvement</b> fluide avec Morphose, la <b>navigation non linéaire</b> avec Zoom, la <b>mise en page sur grille</b> et des <b>graphiques qui délivrent un message</b>.</p>
<p>Le visuel de titre est lui-même une Morphose : un objet qui change de position, de taille et de forme entre deux états.</p>` },

/* 2 — OBJECTIFS */
{ title: 'Objectifs', html: OBJ(['Créer une animation fluide avec la transition <b>Morphose</b>', 'Construire une navigation par <b>Zoom</b> de résumé, de section ou de diapositive', 'Structurer une diapo sur une <b>grille</b> avec une hiérarchie claire', 'Transformer un graphique par défaut en graphique qui <b>délivre un message</b>']),
  n: `<p>Quatre objectifs, quatre techniques de designer de présentation. Prérequis : transitions et animations (module 4), masque et repères (module 5).</p>` },

/* 3 — SECTION 1 */
{ t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSP07, 0), n: `<p>Première partie : la transition <b>Morphose</b>, la plus spectaculaire et pourtant la plus simple à utiliser.</p>` },

/* 4 — LE PRINCIPE */
{ title: 'Le principe de Morphose', html: `${H('Deux diapos, un mouvement', 'La transition Morphose', PATH('Transitions > Accès à cette diapositive > Morphose'))}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:190px;text-align:center">
 <div style="position:relative;width:340px;height:191px;border-radius:8px;background:#0F172A;overflow:hidden;box-shadow:0 20px 40px -20px rgba(0,0,0,.6)"><div style="position:absolute;left:20px;top:14px;font:900 20px var(--font);color:#F8FAFC">Ventes</div><div style="position:absolute;left:24px;top:116px;width:52px;height:36px;border-radius:5px;background:#38BDF8"></div></div>
 <div style="font-size:20px;font-weight:800;margin-top:10px">Diapo A</div></div>
<div class="a pop" style="--d:.4s;position:absolute;left:70px;top:470px;text-align:center">
 <div style="position:relative;width:340px;height:191px;border-radius:8px;background:#0F172A;overflow:hidden;box-shadow:0 0 0 4px #FA582D,0 20px 40px -20px rgba(0,0,0,.6)"><div style="position:absolute;left:236px;top:150px;font:900 16px var(--font);color:#A3E635">Ventes</div><div style="position:absolute;left:22px;top:52px;width:212px;height:114px;border-radius:5px;background:#A3E635"></div></div>
 <div style="font-size:20px;font-weight:800;margin-top:10px">Diapo B · <span style="color:#C43E1C">Morphose ★</span></div></div>
<svg viewBox="0 0 120 600" style="position:absolute;left:420px;top:200px;width:120px;height:600px"><path d="M10 100 C 90 100, 90 380, 10 380" fill="none" stroke="#FA582D" stroke-width="4" stroke-dasharray="8 8" class="flow"/><path d="M22 370 L8 380 L24 392" fill="none" stroke="#FA582D" stroke-width="4"/></svg>
<div class="p7st" style="left:560px;top:190px;width:970px;height:545px">
 <div class="p7o p7m4t" data-s="2">Ventes</div><div class="p7o p7m4" data-s="2"></div>
 <div class="f" data-s="1" style="position:absolute;right:20px;bottom:16px;font:700 16px var(--font);color:#94A3B8">Diaporama : clic pour lancer la Morphose</div></div>
<div class="col" style="position:absolute;left:560px;top:750px;flex-direction:row;gap:14px">${['Position', 'Taille', 'Couleur', 'Rotation', 'Texte'].map((t, i) => `<span class="chip f" data-s="3" style="font-size:18px">${t}</span>`).join('')}</div>`,
  n: `<p><b>Morphose</b> anime automatiquement les différences entre deux diapos consécutives. Un objet présent sur les deux diapos, qui a changé de position, de taille, de couleur ou de rotation, « glisse » de son état A à son état B.</p>
<p><b>Étape 1</b> : à gauche, la diapo A (petite barre, titre « Ventes 2024 ») et la diapo B (grande barre verte, titre déplacé). La transition Morphose est posée sur B.</p>
<p><b>Étape 2</b> : en diaporama, PowerPoint calcule l'animation : la barre grandit et change de couleur, le titre se déplace. Aucune animation à paramétrer !</p>
<p><b>Étape 3</b> : tout ce qui peut changer : position, taille, couleur, rotation, et même le texte (lettres qui se réorganisent).</p>
<p>Disponible dans PowerPoint pour Microsoft 365, 2019 et versions ultérieures, ainsi que sur le web.</p>` },

/* 5 — DÉMO MORPHOSE */
{ title: 'Démo : quatre changements', steps: 4, step: P07K, html: `${H('Ce que Morphose sait animer', 'La transition Morphose')}
<div class="p7st p7d5 p7k" style="left:70px;top:180px;width:960px;height:540px">
 <div class="p7o t">Ventes</div><div class="p7o c"></div><div class="p7o b"></div><div class="p7o q"></div></div>
<div class="col" style="position:absolute;left:1070px;right:70px;top:190px;gap:16px">
 ${[['📍', 'Position', 'le cercle et le titre glissent'], ['📏', 'Taille', 'la barre s\'étire, le titre grossit'], ['🎨', 'Couleur', 'remplissages recolorés en fondu'], ['🔄', 'Rotation et forme', 'le carré tourne et s\'arrondit']].map(([i, t, d], j) => `<div class="card f right" data-s="${j + 1}" style="padding:16px 20px"><div style="font-size:24px;font-weight:900">${i} ${t}</div><div style="font-size:18px;color:#33445E;margin-top:4px">${d}</div></div>`).join('')}</div>
${TIP('Chaque étape = une <b>diapo dupliquée</b> puis modifiée, avec Morphose.', { s: 4, x: 1070, y: 650, w: 460, kind: 'key' })}`,
  n: `<p>Démo animée en direct : chaque clic correspond au passage à une nouvelle diapo avec Morphose.</p>
<p><b>Étape 1 — Position</b> : le cercle et le titre ont été déplacés sur la diapo suivante : ils glissent.</p>
<p><b>Étape 2 — Taille</b> : la barre est étirée, le cercle et le titre agrandis.</p>
<p><b>Étape 3 — Couleur</b> : les remplissages changent en fondu.</p>
<p><b>Étape 4 — Rotation et forme</b> : le carré tourne. Morphose sait aussi passer d'une forme à une autre (rectangle → ellipse) si l'on utilise <i>Format de forme › Modifier la forme</i> sur le même objet.</p>
<p>Dans le vrai PowerPoint, montrez la même chose : 5 diapos identiques au départ (Ctrl+D), modifiées une par une.</p>` },

/* 6 — RECETTE */
{ title: 'La recette en 4 temps', html: `${H('La recette en 4 temps', 'La transition Morphose')}
${PROC([{ p: 'Construire la diapo A', t: 'Tous les objets, à leur état de départ' }, { p: 'Ctrl+D sur la miniature', t: 'Dupliquer : les objets sont « les mêmes »' }, { p: 'Sur la copie B', t: 'Déplacer, agrandir, recolorer, faire pivoter' }, { p: 'Transitions > Morphose', t: 'Sur la diapo B : la transition s\'applique à l\'arrivée' }], { w: 760, gap: 16 })}
<div style="position:absolute;left:900px;top:190px;width:630px;display:flex;flex-direction:column;gap:22px">
 ${[['A', 1, 0], ['A (copie)', 2, 0], ['B modifiée', 3, 1], ['B ★ Morphose', 4, 1]].map(([t, s, m]) => `<div class="f left" data-s="${s}" style="display:flex;align-items:center;gap:20px">
  <div style="position:relative;width:200px;height:112px;border-radius:6px;background:#0F172A;overflow:hidden;box-shadow:${s === 4 ? '0 0 0 4px #FA582D,' : ''}0 10px 24px -12px rgba(0,0,0,.6)"><div style="position:absolute;left:${m ? 110 : 14}px;top:${m ? 14 : 70}px;width:${m ? 70 : 36}px;height:${m ? 84 : 26}px;border-radius:4px;background:${m ? '#A3E635' : '#38BDF8'};transition:all .6s"></div>${s === 4 ? '<b style="position:absolute;left:6px;top:4px;color:#FBBF24;font-size:18px">★</b>' : ''}</div>
  <b style="font-size:22px">${t}</b></div>`).join('')}</div>`,
  n: `<p>La recette à connaître par cœur.</p>
<p><b>Étape 1</b> : construisez la diapo A avec tous les objets à leur état de départ.</p>
<p><b>Étape 2</b> : <b>dupliquez</b> la diapo (Ctrl+D sur la miniature, ou clic droit › Dupliquer la diapositive). C'est la duplication qui garantit que PowerPoint reconnaît les objets comme « les mêmes ».</p>
<p><b>Étape 3</b> : sur la copie, modifiez : déplacer, agrandir, recolorer, faire pivoter. On peut aussi ajouter des objets (ils apparaîtront en fondu) ou en supprimer.</p>
<p><b>Étape 4</b> : appliquez <i>Transitions › Morphose</i> sur la diapo <b>B</b>, celle d'arrivée. Erreur classique : la mettre sur A. Testez avec <b>Maj+F5</b> depuis A.</p>
<p>Réglez la <b>durée</b> (groupe Minutage) : 1,5 à 2 secondes donne un mouvement élégant.</p>` },

/* 7 — OPTIONS D'EFFET */
{ title: 'Options d\'effet', html: `${H('Objets, Mots ou Caractères', 'La transition Morphose', PATH('Transitions > Options d\'effet'))}
<div class="p7dlg a pop" style="--d:.2s;left:70px;top:190px;width:360px">
 <header>Options d'effet</header>
 ${[['⬛', 'Objets', 'par défaut'], ['🔤', 'Mots', ''], ['🔡', 'Caractères', '']].map(([i, t, d], j) => `<div class="p7row" style="${j === 2 ? 'background:#FDECE6;font-weight:800' : ''}">${i} ${t}<i>${d}</i></div>`).join('')}</div>
<div class="a pop" style="--d:.3s;position:absolute;left:500px;top:200px;width:1030px;height:330px;background:#fff;border-radius:16px;box-shadow:0 30px 60px -25px rgba(14,23,38,.4),0 0 0 1px #E3E8EF">
 <div style="position:absolute;left:225px;top:100px;width:576px;height:120px">${[['S', 0, 2], ['I', 1, 1], ['L', 2, 0], ['E', 3, 4], ['N', 4, 5], ['T', 5, 3]].map(([c, a, b]) => `<span class="p7ch" data-s="2" style="--a:${a};--b:${b}">${c}</span>`).join('')}</div>
 <div class="f" data-s="2" style="position:absolute;left:0;right:0;bottom:30px;text-align:center;font-size:20px;color:#6B7A90">SILENT → LISTEN : les mêmes lettres se réorganisent</div></div>
<div style="position:absolute;left:500px;top:570px;width:1030px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
 ${CARD('<b>Objets</b><br>formes, images, zones entières', 3)}${CARD('<b>Mots</b><br>les mots glissent à leur place', 3)}${CARD('<b>Caractères</b><br>titres et anagrammes', 3)}</div>`,
  n: `<p><i>Transitions › Options d'effet</i> propose trois modes pour Morphose.</p>
<p><b>Étape 1</b> : <b>Caractères</b> — PowerPoint apparie les lettres identiques d'un texte à l'autre.</p>
<p><b>Étape 2</b> : démonstration : la diapo A contient « SILENT », la diapo B « LISTEN » dans la même zone de texte (dupliquée). Chaque lettre rejoint sa nouvelle place. Effet très efficace pour un titre qui se transforme (« Problème » → « Solution » si les lettres le permettent, ou un sigle qui se déploie).</p>
<p><b>Étape 3</b> : <b>Objets</b> (défaut) anime les objets entiers ; <b>Mots</b> fait glisser les mots d'une phrase qui se réorganise.</p>` },

/* 8 — APPARIEMENT !! */
{ title: 'Forcer l\'appariement', html: `${H('Fondu au lieu de mouvement ? Le préfixe !!', 'La transition Morphose', PATH('Accueil > Sélectionner > Volet Sélection'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:700px;padding:20px 24px">
 <div class="vs-h" style="--vc:#DC2626;color:#DC2626;display:flex;gap:10px;font-size:24px;font-weight:900">✘ Noms différents → fondu</div>
 <div style="display:flex;gap:16px;margin:12px 0;font:600 17px var(--mono)"><span class="chip bad">A : Rectangle 3</span><span class="chip bad">B : Rectangle 7</span></div>
 <div class="p7st" style="position:relative;width:650px;height:240px"><div class="p7o p7fa" style="left:30px;top:150px;width:70px;height:60px;border-radius:6px;background:#38BDF8"></div><div class="p7o p7fb" style="left:220px;top:30px;width:160px;height:180px;border-radius:6px;background:#A3E635"></div></div></div>
<div class="card f zoom" data-s="2" style="position:absolute;left:830px;top:190px;width:700px;padding:20px 24px">
 <div style="display:flex;gap:10px;font-size:24px;font-weight:900;color:#16A34A">✔ Même nom « !! » → mouvement</div>
 <div style="display:flex;gap:16px;margin:12px 0;font:600 17px var(--mono)"><span class="chip ok">A : !!Barre</span><span class="chip ok">B : !!Barre</span></div>
 <div class="p7st" style="position:relative;width:650px;height:240px"><div class="p7o p7mv" style="border-radius:6px"></div></div></div>
${PROC([{ p: 'Alt+F10 : volet Sélection', t: 'Double-clic sur le nom de l\'objet' }, { p: 'Renommer « !!Barre » sur A et sur B', t: 'PowerPoint apparie les objets de même nom' }], { x: 70, y: 590, w: 1460, s0: 1, gap: 12 }).replace('flex-direction:column', 'flex-direction:row')}`,
  n: `<p>Le dépannage le plus utile de Morphose.</p>
<p>À gauche : si les deux objets n'ont pas été obtenus par duplication (copiés depuis un autre fichier, recréés…), PowerPoint ne les reconnaît pas : l'ancien disparaît en fondu et le nouveau apparaît en fondu. Pas de mouvement.</p>
<p><b>Étape 1</b> : ouvrez le <b>volet Sélection</b> (Alt+F10, ou <i>Accueil › Sélectionner › Volet Sélection</i>). On y voit les noms automatiques : « Rectangle 3 » sur A, « Rectangle 7 » sur B.</p>
<p><b>Étape 2</b> : renommez les deux objets à l'identique avec le préfixe <b>!!</b> (deux points d'exclamation) : « !!Barre ». PowerPoint force alors l'appariement : l'objet se déplace et se transforme.</p>
<p>Le préfixe !! permet même d'apparier deux objets de types différents (une forme et une image), pour des effets créatifs.</p>` },

/* 9 — SECTION 2 */
{ t: 's-sec', cls: 'dark', title: 'Section 2', html: SEC(SECSP07, 1), n: `<p>Deuxième partie : <b>Zoom</b>, pour sortir de la présentation linéaire « diapo 1, diapo 2, diapo 3… ».</p>` },

/* 10 — TROIS ZOOMS */
{ title: 'Trois types de Zoom', html: `${H('Trois types de Zoom', 'Zoom', PATH('Insertion > Liens > Zoom'))}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
 ${[['Zoom de résumé', 'Un sommaire cliquable, créé automatiquement', 'une vignette par section', `<rect x="20" y="20" width="260" height="146" rx="8" fill="#0F172A"/><text x="40" y="52" font-size="16" font-weight="900" fill="#fff">Sommaire</text>${[0, 1, 2].map(i => `<rect x="${36 + i * 80}" y="80" width="68" height="40" rx="4" fill="${['#0EA5E9', '#A3E635', '#F472B6'][i]}" class="pulse" style="animation-delay:${i * .4}s"/>`).join('')}`],
   ['Zoom de section', 'Vignette vers une section existante', 'à placer où vous voulez', `<rect x="20" y="20" width="260" height="146" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>${[40, 64, 88].map((y, i) => `<rect x="40" y="${y}" width="${120 - i * 20}" height="10" rx="4" fill="#CBD5E1"/>`).join('')}<rect x="180" y="70" width="80" height="48" rx="5" fill="#A3E635" class="pulse"/><text x="220" y="140" text-anchor="middle" font-size="13" font-weight="800" fill="#33445E">Section 2</text>`],
   ['Zoom de diapositive', 'Lien vers une diapo précise', 'annexe, démo, détail', `<rect x="20" y="20" width="260" height="146" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><text x="40" y="60" font-size="34" font-weight="900" fill="#0E1726">+42 %</text><rect x="190" y="96" width="70" height="44" rx="5" fill="#F472B6" class="pulse"/><text x="225" y="88" text-anchor="middle" font-size="12" font-weight="800" fill="#33445E">Annexe 3</text>`]].map(([t, d, d2, svg], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:22px 24px;text-align:center"><svg viewBox="0 0 300 186" style="width:100%;height:auto">${svg}</svg>
  <div style="font-size:26px;font-weight:900;margin-top:10px">${t}</div><div style="font-size:19px;color:#33445E;margin-top:6px">${d}</div><div class="chip" style="margin-top:12px">${d2}</div></div>`).join('')}
</div>
${TIP('En diaporama : clic sur la vignette → on <b>zoome</b> dans le contenu, puis on <b>revient</b> au point de départ.', { s: 4, y: 650, w: 1460 })}`,
  n: `<p><i>Insertion › Liens › Zoom</i> propose trois commandes.</p>
<p><b>Étape 1 — Zoom de résumé</b> : PowerPoint crée une nouvelle diapo sommaire avec une vignette par section choisie (et crée les sections si besoin). C'est la plus puissante.</p>
<p><b>Étape 2 — Zoom de section</b> : une vignette vers une section existante, placée sur la diapo de votre choix.</p>
<p><b>Étape 3 — Zoom de diapositive</b> : une vignette vers une diapo précise. Astuce : glissez une miniature depuis le volet de gauche sur une diapo, PowerPoint crée un Zoom de diapositive.</p>
<p><b>Étape 4</b> : en diaporama, un clic sur la vignette fait un zoom avant dans le contenu, puis (option <i>Revenir au zoom</i>) un zoom arrière vers la diapo de départ.</p>` },

/* 11 — DÉMO ZOOM DE RÉSUMÉ */
{ title: 'Démo : Zoom de résumé', steps: 5, step: P07K, html: `${H('Démo : la présentation à la carte', 'Zoom')}
<div class="p7st p7zs p7k" style="left:70px;top:180px;width:900px;height:506px">
 <div style="position:absolute;left:60px;top:50px;font:900 44px var(--font);color:#F8FAFC">Notre offre en 3 temps</div>
 <div style="position:absolute;left:60px;top:120px;width:120px;height:5px;background:#38BDF8"></div>
 ${[['Offre', '#0EA5E9', 60], ['Références', '#16A34A', 330], ['Tarifs', '#C026D3', 600]].map(([t, c, x], i) => `<div class="p7z z${i + 1}" style="left:${x}px;background:${c}"><div class="zt">${t}</div>${[48, 66, 84].map((y, j) => `<i class="zl" style="top:${y}px;width:${130 - j * 26}px"></i>`).join('')}${i === 0 ? '<b class="f zoom" data-s="3" style="position:absolute;right:8px;bottom:6px;font-size:16px;color:#fff">✔</b>' : ''}</div>`).join('')}
 <div style="position:absolute;left:60px;top:400px;font:600 18px var(--font);color:#94A3B8">Cliquez sur une section</div></div>
<div class="col" style="position:absolute;left:1010px;right:70px;top:190px;gap:14px">
 ${[['1', 'Le sommaire : 3 vignettes'], ['2', 'Clic sur « Offre » : zoom avant'], ['3', 'Fin de section : retour au sommaire'], ['4', 'Le client veut les tarifs : clic'], ['5', 'Retour : on garde la main']].map(([n, t], i) => CARD(`<b>${n} ·</b> ${t}`, i + 1)).join('')}</div>`,
  n: `<p>Démonstration du comportement en diaporama.</p>
<p><b>Étape 1</b> : la diapo de résumé affiche une vignette par section.</p>
<p><b>Étape 2</b> : clic sur « Offre » : PowerPoint zoome dans la vignette, qui devient la première diapo de la section. On présente les diapos de la section normalement.</p>
<p><b>Étape 3</b> : à la fin de la section, retour automatique au sommaire (option <b>Revenir au zoom</b>). La vignette visitée peut être marquée.</p>
<p><b>Étape 4</b> : le client dit « Parlez-moi plutôt des tarifs » : on clique directement sur « Tarifs », sans faire défiler « Références ».</p>
<p><b>Étape 5</b> : retour au sommaire. Vous pilotez l'ordre selon la discussion : c'est la présentation « à la carte ».</p>` },

/* 12 — FORMAT DU ZOOM */
{ title: 'Format du zoom', html: `${H('Régler le zoom', 'Zoom', PATH('Format du zoom > Options du zoom'))}
${APPWIN({ app: 'ppt', x: 70, y: 170, w: 1080, h: 600, title: 'Offre GreenBox.pptx', tab: 'Format du zoom', tabs: ['Fichier', 'Accueil', 'Insertion', 'Création', 'Transitions', 'Diaporama', 'Format du zoom'],
  groups: [['Options du zoom', ['☑ Revenir au zoom', '☑ Transition de zoom', '⏱ 01,00']], ['Styles de zoom', ['🖼️ Changer l\'image', '🎨 Arrière-plan du zoom']], ['Organiser', ['Avancer', 'Reculer']]],
  hot: { '☑ Revenir au zoom': 1, '☑ Transition de zoom': 2, '🖼️ Changer l\'image': 3, '🎨 Arrière-plan du zoom': 4 },
  body: `<div style="position:absolute;left:50%;top:24px;transform:translateX(-50%);width:720px;height:405px;background:#0F172A;border-radius:6px;box-shadow:0 10px 30px -14px rgba(0,0,0,.5)">
   <div style="position:absolute;left:40px;top:34px;font:900 34px var(--font);color:#fff">Notre offre en 3 temps</div>
   ${[['Offre', '#0EA5E9'], ['Références', '#16A34A'], ['Tarifs', '#C026D3']].map(([t, c], i) => `<div style="position:absolute;left:${40 + i * 220}px;top:170px;width:200px;height:112px;border-radius:6px;background:${c};${i === 0 ? 'outline:3px dashed #FBBF24;outline-offset:4px' : ''}"><b style="position:absolute;left:10px;top:8px;color:#fff;font-size:15px">${t}</b></div>`).join('')}</div>` })}
<div class="col" style="position:absolute;left:1180px;right:70px;top:180px;gap:14px">
 ${CARD('<b>1 · Revenir au zoom</b><br>retour au sommaire', 1)}${CARD('<b>2 · Transition de zoom</b><br>effet et durée', 2)}${CARD('<b>3 · Changer l\'image</b><br>vignette personnalisée', 3)}${CARD('<b>4 · Arrière-plan</b><br>vignette fondue dans le fond', 4)}</div>`,
  n: `<p>Quand une vignette de zoom est sélectionnée, l'onglet contextuel <b>Format du zoom</b> apparaît.</p>
<p><b>Étape 1</b> : <b>Revenir au zoom</b> : après la dernière diapo de la section, retour automatique à la diapo de résumé. À décocher si l'on veut enchaîner sur la suite linéaire.</p>
<p><b>Étape 2</b> : <b>Transition de zoom</b> et sa durée (01,00 s par défaut) : le zoom avant/arrière animé. Décoché, on passe directement.</p>
<p><b>Étape 3</b> : <b>Changer l'image</b> : remplacer la miniature par une photo ou une icône — beaucoup plus lisible qu'une diapo réduite.</p>
<p><b>Étape 4</b> : <b>Arrière-plan du zoom</b> rend l'arrière-plan de la vignette transparent pour qu'elle se fonde dans la diapo de résumé.</p>` },

/* 13 — À LA CARTE + ANNEXES */
{ title: 'Annexes à portée de clic', html: `${H('Les annexes, à un clic', 'Zoom')}
${FLOW({ x: 70, y: 175, w: 1460, h: 470,
  z: [{ x: 1060, y: 20, w: 390, h: 430, l: 'SECTION MASQUÉE', c: '#7C3AED' }],
  n: { r: { x: 150, y: 230, ic: 'ppt', sz: 100, l: 'Résumé', sub: 'Zoom de résumé', hot: true },
       o: { x: 560, y: 70, ic: 'pptx', sz: 70, l: 'Offre', s: 1 }, f: { x: 560, y: 230, ic: 'pptx', sz: 70, l: 'Références', s: 1 }, t: { x: 560, y: 390, ic: 'pptx', sz: 70, l: 'Tarifs', s: 1 },
       a: { x: 1250, y: 130, ic: 'chart', sz: 70, l: 'Détail des prix', s: 2 }, b: { x: 1250, y: 330, ic: 'tablei', sz: 70, l: 'Conditions', s: 2 } },
  l: [{ a: 'r', b: 'o', r: 'hvh', s: 1 }, { a: 'r', b: 'f', s: 1 }, { a: 'r', b: 't', r: 'hvh', s: 1 }, { a: 't', b: 'a', r: 'hvh', s: 3, dash: true, c: '#7C3AED' }, { a: 't', b: 'b', r: 'hvh', s: 3, dash: true, c: '#7C3AED' }],
  p: [{ s: 3, keep: true, c: '#7C3AED', seg: [{ via: ['r', 't'], t: 1.4 }, { via: ['t', 'a'], lab: 'question ?', t: 1.6 }] }] })}
${TIP('Annexes dans une section de <b>diapos masquées</b> + <b>Zoom de diapositive</b> : invisibles dans le fil, disponibles si on vous les demande.', { s: 4, y: 680, w: 1460, kind: 'ok' })}`,
  n: `<p>Le cas d'usage idéal : une présentation client « à la carte ».</p>
<p><b>Étape 1</b> : le Zoom de résumé ouvre sur les trois sections principales.</p>
<p><b>Étape 2</b> : les annexes (détail des prix, conditions générales) sont dans une section en fin de fichier, dont toutes les diapos sont <b>masquées</b> (clic droit › Masquer la diapositive). En diaporama linéaire, elles sont sautées.</p>
<p><b>Étape 3</b> : sur la diapo Tarifs, de petits <b>Zoom de diapositive</b> pointent vers les annexes. Si le client pose la question, un clic et on y est ; sinon personne ne les voit.</p>
<p><b>Étape 4</b> : avantage : on ne fait jamais défiler 30 diapos pour retrouver un chiffre, et le deck principal reste court.</p>` },

/* 14 — SECTION 3 */
{ t: 's-sec', cls: 'dark', title: 'Section 3', html: SEC(SECSP07, 2), n: `<p>Troisième partie : <b>grilles</b>, <b>hiérarchie visuelle</b> et <b>data-viz</b> — les fondamentaux du design de présentation.</p>` },

/* 15 — LA GRILLE */
{ title: 'Tout sur une grille', html: `${H('Tout aligné sur une grille', 'Grilles et hiérarchie', `${KEYS('Alt+F9')} ${KEYS('Maj+F9')}`)}
<div class="p7st lt a pop" style="--d:.2s;left:70px;top:180px;width:960px;height:540px">
 <svg class="f" data-s="1" viewBox="0 0 960 540" style="position:absolute;inset:0;width:100%;height:100%">
  ${[60, 900].map(x => `<path d="M${x} 0 V540" stroke="#FA582D" stroke-width="2" stroke-dasharray="8 6"/>`).join('')}${[50, 490].map(y => `<path d="M0 ${y} H960" stroke="#FA582D" stroke-width="2" stroke-dasharray="8 6"/>`).join('')}</svg>
 <div class="f" data-s="2" style="position:absolute;inset:0">${[60, 350, 640].map(x => `<div style="position:absolute;left:${x}px;top:50px;width:260px;height:440px;background:rgba(14,165,233,.08);border-left:1px solid rgba(14,165,233,.4);border-right:1px solid rgba(14,165,233,.4)"></div>`).join('')}</div>
 <div class="p7g" data-s="3" style="position:absolute;left:84px;top:66px;width:620px;transform:rotate(-1.5deg);--x:60px;--y:50px;--w:840px;font:900 40px var(--font);color:#0E1726">Trois engagements clients</div>
 ${[['🚚', 'Livraison 48 h', 92, 170, 230, 2], ['🛟', 'SAV 7j/7', 365, 205, 240, -2], ['♻️', 'Emballages recyclés', 690, 160, 220, 1]].map(([i, t, x, y, w, r], j) => `<div class="p7g" data-s="3" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;transform:rotate(${r}deg);--x:${60 + j * 290}px;--y:170px;--w:260px;height:250px;border-radius:14px;background:#F1F5F9;padding:22px;text-align:center"><div style="font-size:60px">${i}</div><div style="font-size:24px;font-weight:800;margin-top:12px">${t}</div></div>`).join('')}
</div>
<div class="col" style="position:absolute;left:1070px;right:70px;top:190px;gap:14px">
 ${CARD('<b>1 · Marges</b><br>identiques partout (ex. 1,27 cm)', 1)}${CARD('<b>2 · Colonnes</b><br>régulières, gouttières égales', 2)}${CARD('<b>3 · Alignement</b><br>chaque objet s\'accroche', 3)}
 ${CARD(`<b>Repères sur le masque</b><br>verrouillés pour toutes les diapos`, 4)}</div>`,
  n: `<p>Les designers placent tout sur une <b>grille</b>.</p>
<p><b>Étape 1</b> : les <b>marges</b> : des repères à distance égale des bords (ex. 1,27 cm). <b>Alt+F9</b> affiche les repères ; clic droit sur un repère › <i>Ajouter un repère vertical / horizontal</i>. Maintenez Ctrl en faisant glisser un repère pour le dupliquer.</p>
<p><b>Étape 2</b> : les <b>colonnes</b> : 2, 3 ou 4 colonnes régulières séparées par des gouttières égales.</p>
<p><b>Étape 3</b> : chaque objet <b>s'accroche</b> à la grille : la diapo passe de « bricolée » à « professionnelle » sans rien changer au contenu. Outils : <i>Accueil › Organiser › Aligner</i>, <i>Répartir horizontalement</i>, et la taille exacte dans <i>Format de forme › Taille</i>.</p>
<p><b>Étape 4</b> : placés en mode masque, les repères sont verrouillés et partagés par toutes les diapos (lien avec le module 5). <b>Maj+F9</b> affiche la grille de quadrillage.</p>` },

/* 16 — HIÉRARCHIE */
{ title: 'La hiérarchie visuelle', html: `${H('Où le regard va-t-il en premier ?', 'Grilles et hiérarchie')}
<div class="a pop" style="--d:.2s;position:absolute;left:70px;top:190px;width:700px;height:394px;background:#fff;border-radius:10px;box-shadow:0 0 0 4px #DC2626,0 30px 60px -25px rgba(14,23,38,.4);padding:26px;font-family:var(--font)">
 <div style="font-size:30px;font-weight:900;color:#7C3AED;text-decoration:underline">RÉSULTATS DU TRIMESTRE !!!</div>
 <div style="font-size:26px;font-weight:900;color:#DC2626;margin-top:14px">Croissance : +42 %</div>
 <div style="font-size:26px;font-weight:900;color:#0EA5E9;margin-top:10px">Clients : 3 200</div>
 <div style="font-size:26px;font-weight:900;color:#16A34A;margin-top:10px">Panier : 38 €</div>
 <div style="font-size:26px;font-weight:900;color:#F59E0B;margin-top:10px">Churn : 2,1 %</div>
 <span class="chip bad" style="position:absolute;right:20px;bottom:20px;font-size:18px">Tout est important = rien ne l'est</span></div>
<div class="f zoom" data-s="1" style="position:absolute;left:830px;top:190px;width:700px;height:394px;background:#fff;border-radius:10px;box-shadow:0 0 0 4px #16A34A,0 30px 60px -25px rgba(14,23,38,.4);padding:26px 34px;font-family:var(--font)">
 <div style="font-size:24px;font-weight:700;color:#33445E">Une croissance soutenue au T3</div>
 <div style="font-size:150px;font-weight:900;color:#FA582D;line-height:1.05;letter-spacing:-.04em;margin-top:6px">+42 %</div>
 <div style="font-size:19px;color:#94A3B8;display:flex;gap:30px;margin-top:10px"><span>3 200 clients</span><span>38 € de panier</span><span>2,1 % de churn</span></div></div>
<div style="position:absolute;left:70px;right:70px;top:620px;display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
 ${[['📏', 'Taille', 'le chiffre clé 3× plus gros'], ['🎯', 'Contraste', 'une seule couleur d\'accent'], ['↖️', 'Position', 'en haut à gauche, lu en premier'], ['⬜', 'Espace blanc', 'il isole ce qui compte']].map(([i, t, d], j) => `<div class="card f zoom" data-s="${j + 2}" style="padding:16px 18px"><div style="font-size:22px;font-weight:900">${i} ${t}</div><div style="font-size:18px;color:#33445E;margin-top:4px">${d}</div></div>`).join('')}</div>`,
  n: `<p>Question au groupe avant de cliquer : « Sur la diapo de gauche, que retenez-vous en 3 secondes ? » Réponse habituelle : rien, ou le titre en violet.</p>
<p><b>Étape 1</b> : la même information, hiérarchisée. Le regard va immédiatement sur « +42 % », puis sur le titre-message, puis sur le contexte en gris.</p>
<p><b>Étapes 2 à 5</b> : les quatre leviers de la hiérarchie :</p>
<p>— <b>Taille</b> : l'élément principal est nettement plus gros (3× est un bon repère).</p>
<p>— <b>Contraste</b> : une seule couleur d'accent ; le reste en gris ou en noir.</p>
<p>— <b>Position</b> : en Occident, on lit en Z, en commençant en haut à gauche.</p>
<p>— <b>Espace blanc</b> : le vide autour d'un élément le met en valeur. Ne cherchez pas à remplir la diapo.</p>` },

/* 17 — AVANT / APRÈS GRAPHIQUE */
{ title: 'Un graphique qui parle', html: `${H('Montrer une conclusion, pas des données', 'Data-viz')}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:710px;padding:20px 26px;border-top:6px solid #DC2626">
 <div style="font-size:22px;font-weight:800;color:#33445E;margin-bottom:8px">CA par canal (k€)</div>${P07CH({ w: 650, h: 400 })}
 <div class="chip bad" style="margin-top:12px">Par défaut : à vous de trouver le message</div></div>
<div class="card f zoom" data-s="1" style="position:absolute;left:820px;top:180px;width:710px;padding:20px 26px;border-top:6px solid #16A34A">
 <div style="font-size:26px;font-weight:900;color:#0E1726;margin-bottom:4px">Le e-commerce <span style="color:#FA582D">double</span> en 2 ans</div>${P07CH({ w: 650, h: 404, acc: true, cols: ['#CBD5E1', '#FA582D', '#E2E8F0'], grid: false, axis: false, lab: 2, labAcc: true, legend: false })}
 <div class="chip ok f" data-s="3" style="margin-top:12px">Le message se lit en 3 secondes</div></div>`,
  n: `<p>Un graphique par défaut montre des <b>données</b> ; un bon graphique montre une <b>conclusion</b>. Données du Lab 2 : CA par canal 2024-2026.</p>
<p>À gauche, le graphique par défaut : titre descriptif (« CA par canal »), trois couleurs vives, quadrillage, axe, légende. Le public doit chercher le message.</p>
<p><b>Étape 1</b> : à droite, la même donnée retravaillée : un <b>titre-message</b> (« Le e-commerce double en 2 ans »), une seule couleur d'accent sur la série qui porte le message, le reste en gris.</p>
<p><b>Étape 2</b> : des <b>étiquettes de données</b> sur la série clé remplacent l'axe vertical et le quadrillage.</p>
<p><b>Étape 3</b> : résultat : le message se lit en 3 secondes. On va voir comment y arriver pas à pas.</p>` },

/* 18 — LE BON TYPE */
{ title: 'Le bon type de graphique', html: `${H('Le bon type pour le bon message', 'Data-viz', PATH('Insertion > Illustrations > Graphique'))}
<div style="position:absolute;left:70px;right:70px;top:190px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
 ${[['Comparer', 'Histogramme / barres', `${[90, 150, 60, 120].map((h, i) => `<rect class="grow" style="--d:${.3 + i * .1}s" x="${40 + i * 60}" y="${170 - h}" width="40" height="${h}" rx="4" fill="${i === 1 ? '#FA582D' : '#CBD5E1'}"/>`).join('')}<path d="M25 170 H275" stroke="#94A3B8" stroke-width="2"/>`],
   ['Évolution', 'Courbes', `<path d="M30 150 L80 130 L130 138 L180 90 L230 70 L270 40" fill="none" stroke="#FA582D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="draw" pathLength="1"/><path d="M30 140 L80 142 L130 128 L180 132 L230 126 L270 130" fill="none" stroke="#CBD5E1" stroke-width="4"/><path d="M25 170 H275" stroke="#94A3B8" stroke-width="2"/>`],
   ['Part d\'un tout', 'Secteurs (2 à 3 parts)', `<circle cx="150" cy="100" r="70" fill="#CBD5E1"/><path d="M150 100 L150 30 A70 70 0 0 1 216 124 Z" fill="#FA582D" class="a pop" style="--d:.5s"/><text x="190" y="80" font-size="18" font-weight="900" fill="#fff">42 %</text>`]].map(([t, ty, svg], i) => `
 <div class="card f zoom" data-s="${i + 1}" style="padding:22px 24px;text-align:center"><svg viewBox="0 0 300 190" style="width:100%;height:auto">${svg}</svg>
  <div style="font-size:26px;font-weight:900;margin-top:6px">${t}</div><div class="chip blu" style="margin-top:8px;font-size:17px">${ty}</div></div>`).join('')}
</div>
${VS({ y: 560, l: { t: 'À éviter', c: '#DC2626', ic: '✘', items: ['3D, ombres, dégradés', 'Secteurs à 8 parts'] }, r: { t: 'À préférer', c: '#16A34A', ic: '✔', items: ['À plat, épuré', 'Barres triées par valeur'] }, s1: 4, s2: 4 })}`,
  n: `<p>Choisir le type selon le <b>message</b>, pas selon l'esthétique.</p>
<p><b>Étape 1 — Comparer</b> des catégories (ventes par région, par produit) : histogramme ou barres horizontales (quand les libellés sont longs). Triez par valeur.</p>
<p><b>Étape 2 — Évolution</b> dans le temps (CA sur 12 mois) : courbes. Une série en couleur, les autres en gris.</p>
<p><b>Étape 3 — Part d'un tout</b> : secteurs ou anneau, <b>seulement</b> pour 2 ou 3 parts. Au-delà, l'œil ne compare plus les angles : passez en barres.</p>
<p><b>Étape 4</b> : à éviter : la 3D (elle déforme les proportions), les effets, les secteurs à 8 parts.</p>` },

/* 19 — DÉSENCOMBRER */
{ title: 'Désencombrer pas à pas', html: `${H('Désencombrer en 5 clics', 'Data-viz', PATH('Création de graphique > Ajouter un élément de graphique'))}
<div class="card a pop" style="--d:.2s;position:absolute;left:70px;top:180px;width:760px;height:620px;padding:22px 30px">
 <div style="position:relative;height:44px"><div class="p7out" data-s="5" style="position:absolute;font-size:24px;font-weight:800;color:#33445E">CA par canal (k€)</div><div class="f" data-s="5" style="position:absolute;font-size:28px;font-weight:900">Le e-commerce <span style="color:#FA582D">double</span> en 2 ans</div></div>
 <div style="margin-top:20px">${P07CH({ w: 700, h: 470, gs: 1, ls: 2, as: 3, lab: 3, labAcc: true, ss: 4, acc: true, cols: ['#4472C4', '#FA582D', '#A5A5A5'] })}</div></div>
<div class="col" style="position:absolute;left:880px;right:70px;top:190px;gap:12px">
 ${[['1', 'Supprimer le quadrillage'], ['2', 'Supprimer la légende'], ['3', 'Axe vertical → étiquettes de données'], ['4', 'Une couleur d\'accent, le reste en gris'], ['5', 'Un titre-message']].map(([n, t], i) => `<div class="card f left" data-s="${i + 1}" style="display:flex;align-items:center;gap:16px;padding:14px 18px"><span class="num-badge or">${n}</span><span style="font-size:21px;font-weight:600">${t}</span></div>`).join('')}
 <div class="otip tip f zoom" data-s="6" style="position:relative"><span>💡</span><div>Puis : clic droit › <b>Enregistrer en tant que modèle</b> (.crtx) pour réutiliser ce style.</div></div></div>`,
  n: `<p>La méthode, appliquée en direct sur le graphique de gauche (chaque clic retire ou ajoute un élément) :</p>
<p><b>Étape 1</b> : supprimer le <b>quadrillage</b> : clic sur une ligne › Suppr, ou <i>Création de graphique › Ajouter un élément de graphique › Quadrillage</i>.</p>
<p><b>Étape 2</b> : supprimer la <b>légende</b> : la couleur d'accent et le titre suffisent ; sinon, étiquetez directement les séries.</p>
<p><b>Étape 3</b> : remplacer l'<b>axe vertical</b> par des <b>étiquettes de données</b> sur la série clé (<i>Ajouter un élément de graphique › Étiquettes de données</i>).</p>
<p><b>Étape 4</b> : clic sur une série › <i>Mise en forme › Remplissage</i> : gris clair pour le contexte, couleur d'accent pour le message.</p>
<p><b>Étape 5</b> : un <b>titre-message</b> qui énonce la conclusion.</p>
<p><b>Étape 6</b> : clic droit sur le graphique › <i>Enregistrer en tant que modèle</i> : le style est réutilisable via <i>Modifier le type de graphique › Modèles</i>.</p>` },

/* 20 — GRAPHIQUE LIÉ À EXCEL */
{ title: 'Graphique lié à Excel', html: `${H('Un graphique lié à Excel', 'Data-viz')}
${FLOW({ x: 70, y: 170, w: 1460, h: 380,
  n: { x: { x: 160, y: 170, ic: 'excel', sz: 100, l: 'ventes-canal.xlsx', sub: 'la source' }, p: { x: 760, y: 170, ic: 'ppt', sz: 100, l: 'Deck commercial', sub: 'graphique lié', s: 1, hot: true }, u: { x: 1300, y: 170, ic: 'chart', sz: 90, l: 'Actualiser les données', sub: 'Création de graphique', s: 3 } },
  l: [{ a: 'x', b: 'p', s: 1, lab: 'Coller avec liaison', lx: 460, ly: 170, lw: 220 }, { a: 'p', b: 'u', s: 3, dash: true }],
  p: [{ s: 2, keep: true, seg: [{ via: ['x', 'p'], lab: 'E-commerce : 205 → 230', t: 2 }] }] })}
<div style="position:absolute;left:70px;top:590px;width:1460px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
 ${CARD(`${KEYS('Ctrl+V')} puis <b>Options de collage</b><br>« Utiliser le thème de destination et lier les données »`, 1, 'font-size:18px')}
 ${CARD('<b>⚠️ Chemin du classeur</b><br>déplacer le fichier Excel casse la liaison', 4, 'font-size:18px')}
 ${CARD('<b>🎬 Animer par série</b><br>Animations › Options d\'effet › Par série', 5, 'font-size:18px')}</div>`,
  n: `<p>Pour un graphique qui doit rester à jour (reporting mensuel), on le crée dans Excel et on le colle <b>lié</b> dans PowerPoint.</p>
<p><b>Étape 1</b> : dans Excel, copiez le graphique ; dans PowerPoint, Ctrl+V puis l'icône <i>Options de collage</i> › <b>Utiliser le thème de destination et lier les données</b> (le graphique prend la charte du deck et reste lié au classeur).</p>
<p><b>Étape 2</b> : une valeur change dans Excel (le e-commerce 2026 passe à 230 k€)…</p>
<p><b>Étape 3</b> : … dans PowerPoint, sélectionnez le graphique › <i>Création de graphique › Actualiser les données</i>. Le graphique se met à jour, mise en forme conservée.</p>
<p><b>Étape 4</b> : piège : si le classeur est déplacé ou renommé, la liaison est rompue (<i>Modifier les données</i> renvoie une erreur). Gardez les deux fichiers dans le même dossier SharePoint.</p>
<p><b>Étape 5</b> : astuce de présentation : animez l'histogramme <i>Par série</i> ou <i>Par catégorie</i> (Options d'effet de l'animation) pour révéler la comparaison au moment où vous en parlez.</p>` },

/* 21 — RÉCAP */
{ title: 'À retenir', cls: 'dark', html: RECAP({ t: 'Le design qui fait comprendre', k: 'Récap animé', hub: '4', hsub: 'techniques de designer', hk: 'EXPERT',
  items: [{ ic: '✨', t: 'Morphose', d: 'Dupliquer (Ctrl+D), modifier, transition sur la 2e diapo, !! si besoin' },
    { ic: '🔍', t: 'Zoom', d: 'Résumé, section, diapositive · Revenir au zoom' },
    { ic: '📐', t: 'Grille', d: 'Repères sur le masque, colonnes, alignement strict' },
    { ic: '🎯', t: 'Hiérarchie', d: 'Taille, contraste, position, espace blanc' },
    { ic: '📊', t: 'Data-viz', d: 'Titre-message, bon type, une couleur d\'accent' }] }),
  n: `<p>Récapitulatif. Faites citer par le groupe la recette Morphose en 4 temps et les 5 étapes du désencombrement de graphique.</p>` },

/* 22 — RACCOURCIS */
{ title: 'Raccourcis', html: `${H('Les raccourcis du designer', 'Raccourcis clavier')}
${KEYCARDS([{ k: 'Ctrl+D', d: 'Dupliquer diapo ou objet — base de la Morphose' }, { k: 'Alt+F10', d: 'Volet Sélection (renommer « !! »)' }, { k: 'Maj+F9', d: 'Grille' }, { k: 'Alt+F9', d: 'Repères' }, { k: 'Ctrl+Maj+C', d: 'Copier la mise en forme' }, { k: 'Ctrl+Maj+V', d: 'Coller la mise en forme' }, { k: 'Maj+F5', d: 'Tester la transition sur la diapo active' }], { cols: 4, y: 190 })}
${TIP('Testez une Morphose avec <b>Maj+F5</b> depuis la diapo <b>A</b> : la transition joue en arrivant sur B.', { s: 8, kind: 'key', y: 620, w: 1000 })}`,
  n: `<p>Les sept raccourcis du designer. <b>Ctrl+D</b> est le plus important du module : il duplique une diapo dans le volet des miniatures, ou un objet sur la diapo.</p>
<p><b>Ctrl+Maj+C / Ctrl+Maj+V</b> : copier-coller la mise en forme d'un objet à l'autre — indispensable pour harmoniser les couleurs d'accent.</p>` },

/* 23 — LAB 1 */
{ title: 'Lab 1', html: LAB({ app: 'ppt', mod: 'p07', lab: 0, title: 'Lab 1 — Le chiffre qui grandit', tasks: ['Diapo vide : une <b>forme</b>, puis <b>dupliquez</b> la diapo', 'Copie : <b>agrandissez</b> la forme + <b>Morphose</b>', 'Diapo « +42 % » : zone <b>+42 %</b> la plus grande', 'Zone ≥ <b>60 %</b> de large, <b>centrée</b>, puis diaporama'] }),
  n: `<p>Scénario : la start-up <b>GreenBox</b> lève des fonds ; l'investisseur doit <b>voir</b> la croissance.</p>
<p>Solution : 1) diapo 2 : rectangle étroit en bas à gauche (barre 2024), puis Dupliquer. 2) Sur la copie : étirer le rectangle en hauteur (barre 2026), changer sa couleur, <i>Transitions › Morphose</i> sur cette copie. 3) Diapo « +42 % » : zone de texte « +42 % » en 96 pt, couleur d'accent. 4) Élargir la zone à au moins 60 % de la largeur, <i>Accueil › Organiser › Aligner › Centrer horizontalement</i>, puis lancer le diaporama.</p>` },

/* 24 — LAB 2 */
{ title: 'Lab 2', html: LAB({ app: 'ppt', mod: 'p07', lab: 1, title: 'Lab 2 — Sommaire Zoom et graphique lié', tasks: ['3 <b>sections</b> : Offre, Références, Tarifs', '<b>Zoom de résumé</b> + Revenir au zoom', 'CSV → histogramme, collé <b>avec liaison</b>', 'Désencombrez : <b>E-commerce</b> en accent, titre-message', 'Modifiez Excel puis <b>Actualiser les données</b>'] }),
  n: `<p>Lab dans le <b>vrai PowerPoint</b> avec le fichier <i>ventes-canal.csv</i> fourni par la plateforme.</p>
<p>Points de vigilance : créer les sections avant le Zoom de résumé (ou le laisser les créer) ; coller avec l'option « lier les données » ; garder le classeur au même emplacement pour l'actualisation.</p>
<p>Validation : en diaporama, un clic sur une vignette ouvre la section et revient au sommaire ; le graphique a un titre-message et une seule couleur d'accent.</p>` },

/* 25 — QUIZ */
{ title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [
  { q: 'Sur quelle diapo applique-t-on la transition Morphose ?', o: ['La diapo de départ', 'La diapo d\'arrivée (la seconde)', 'Les deux', 'La diapo de titre'], a: [1], e: 'Une transition décrit l\'arrivée sur une diapo : Morphose se met sur la seconde diapo de la paire.' },
  { q: 'Pourquoi dupliquer la diapo avant de modifier pour Morphose ?', o: ['Pour gagner du temps uniquement', 'Pour que PowerPoint reconnaisse les mêmes objets sur les deux diapos', 'C\'est imposé par le masque', 'Pour garder une sauvegarde'], a: [1], e: 'Les objets dupliqués sont appariés automatiquement ; sinon on peut forcer avec le préfixe !! dans le volet Sélection.' },
  { q: 'Quel outil crée un sommaire cliquable avec retour automatique ?', o: ['Lien hypertexte', 'Bouton d\'action', 'Zoom de résumé', 'SmartArt'], a: [2], e: 'Insertion › Zoom › Zoom de résumé crée la diapo sommaire et les retours (option Revenir au zoom).' },
  { q: 'Quel type de graphique pour montrer l\'évolution du CA sur 12 mois ?', o: ['Secteurs', 'Courbes', 'Anneau', 'Radar'], a: [1], e: 'Les courbes montrent une tendance dans le temps ; les secteurs sont réservés à quelques parts d\'un tout.' },
  { q: 'Quel principe améliore le plus la lisibilité d\'un graphique dans une présentation ?', o: ['Ajouter un effet 3D', 'Une couleur d\'accent sur la série qui porte le message, le reste en gris', 'Afficher toutes les légendes et quadrillages', 'Utiliser une couleur par barre'], a: [1], e: 'Le contraste guide le regard vers la conclusion ; le reste devient contexte.' },
  { q: 'Morphose fait un fondu au lieu de déplacer l\'objet. Que faire ?', o: ['Allonger la durée', 'Nommer les deux objets à l\'identique avec le préfixe !! dans le volet Sélection', 'Passer en Options d\'effet Caractères', 'Grouper les objets'], a: [1], e: 'Le préfixe !! force l\'appariement des objets portant le même nom.' },
] ); }, n: `<p>Réponses : 1) b · 2) b · 3) c · 4) b · 5) b · 6) b.</p>` },

/* 26 — FIN */
{ t: 's-end', cls: 'dark', title: 'Fin du module P07', html: END(), n: `<p>Fin du module 7. Vos présentations ont désormais du mouvement, une navigation à la carte et des graphiques qui parlent.</p><p>Dernier module : <b>Accessibilité, export, co-édition, Designer et Copilot</b>.</p>` },
] };
