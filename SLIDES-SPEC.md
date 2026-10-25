# Office Academy — formation animée (style EDU-210) : contrat pour écrire un module

Projet : `/private/tmp/claude-501/-Users-dradjou/731545fc-0043-47fd-ab63-832aad3cbe5b/scratchpad/office`
Chaque module = UN fichier `src/modules/<CODE>.js` (CODE = W01…W08, X01…X08, P01…P08) qui définit `window.MODULE`.
Le moteur (copie du viewer de la formation EDU-210 de l'utilisateur) affiche des diapos **1600 × 900 px**, animées,
avec étapes au clic, laser, dessin, notes formateur (touche N), vue d'ensemble, quiz.

**Lis d'abord le module de référence `src/modules/M00.js`** : il utilise tous les helpers. Puis regarde les helpers
dans `src/engine/kit-base.js` (H, PATH, TITLE, SEC, OBJ, QUIZ, END, UL, CARD, FLOW, RECAP, labTasks…) et
`src/engine/kit-office.js` (APPWIN, GRID, PAGE, LINES, SLD, KEYS, KEYCARDS, PROC, VS, TIP, LAB, STAT, APPART).
Classes CSS utiles (viewer.css) : `.card .callout(.or) .chip(.dark/.blu/.ok/.bad) .num-badge(.or) .lst(.sm) .grid2/.grid3
.col .row .big .grad .mono .term .tbl .ico` ; animations `.a` (+ `fade|pop|l|r`, délai `style="--d:.4s"`), étapes `.f` (+ `zoom|left|right`)
avec `data-s="n"` ; `.draw` (tracé SVG avec `pathLength="1"`), `.flow`, `.pulse`, `.float`, `.spin`.

## Format
```js
/* ===================== MODULE X03 — Fonctions logiques (…) ===================== */
const SECSX03 = ['Faire décider Excel : SI', 'Combiner : ET, OU', 'Compter et totaliser sous condition'];
window.MODULE = { code: 'X03', title: 'Fonctions logiques et statistiques conditionnelles', short: 'Fonctions logiques', slides: [
 { t: 's-title', cls: 'dark', title: 'Fonctions logiques', html: TITLE({ mod: 'EXCEL · MODULE 03 · INTERMÉDIAIRE', title: 'Faire <span class="grad">décider</span> Excel', sub: '« … »', agenda: SECSX03, art: APPART('excel') }), n: `<p>…</p>` },
 { title: 'Objectifs', html: OBJ(['…', '…']), n: `…` },
 { t: 's-sec', cls: 'dark', title: 'Section 1', html: SEC(SECSX03, 0), n: `…` },
 { title: '…', html: `${H('Titre affiché', 'Sur-titre')} …`, n: `<p>Explications détaillées pour le formateur…</p>` },
 …
 { title: 'Lab', html: LAB({ app: 'excel', mod: 'x03', lab: 0, title: 'Lab — Les primes de l\'équipe', tasks: ['…', '…'] }), n: `…` },
 { title: 'Quiz', html: QUIZ(), enter(el) { initQuiz(el, [ { q: '…', o: ['a', 'b', 'c', 'd'], a: [1], e: 'explication' }, … ]); }, n: `<p>Réponses : …</p>` },
 { t: 's-end', cls: 'dark', title: 'Fin du module X03', html: END(), n: `…` },
] };
```
- `n` (notes formateur, HTML) : **obligatoire sur chaque diapo**. Style « refonte » d'EDU-210 : **mots-clés à l'écran,
  explications dans les notes**. Les notes décrivent ce qui se passe à chaque étape (« Étape 1 : … ») et ce que le
  formateur montre en démo dans la vraie application, les pièges, les questions à poser au groupe.
- `cls: 'dark'` pour titre / sections / fin / récap (RECAP est conçu pour fond sombre), sinon fond clair par défaut.
- Quiz : `a` = tableau d'index des bonnes réponses (plusieurs possibles → la question affiche « (2 réponses) »). 5 à 6 questions.
- Optionnel : `steps: n` force un nombre d'étapes ; `enter(el, api)` / `step(n, el, api)` pour une logique sur mesure.
- Les apostrophes dans les chaînes '…' doivent être échappées (`\'`) ou utilise des gabarits `…`.

## Structure attendue d'un module (20 à 30 diapos)
1. Titre (`TITLE` + `APPART('word'|'excel'|'ppt')`, `mod: 'WORD · MODULE 03 · INTERMÉDIAIRE'`), 2. Objectifs (`OBJ`),
3. 3 sections (`SEC`) contenant chacune 4 à 7 diapos de contenu, 4. un **récap animé** (`RECAP`, cls dark),
5. **Raccourcis** (`KEYCARDS`), 6. **Lab** (`LAB`, un par lab du module), 7. **Quiz**, 8. **Fin** (`END`).

Diapos de contenu : varier les visuels — **jamais deux diapos de suite qui ne sont que du texte**. Chaque notion doit
être *montrée* : maquette `APPWIN` avec boutons du ruban numérotés (`hot`), `GRID` avec formule tapée (`fx`) et
valeurs qui apparaissent (`val`) et plages encadrées (`hl`), `PAGE` Word avant/après, `SLD` diapos avant/après, `PROC`
(procédure avec chemin du ruban), `VS` (à faire / à éviter), `FLOW` (processus, schéma de flux), `STAT`, `TIP`,
SVG animés maison (`.draw`, `animateMotion`, `.pulse`). Progressivité au clic : chaque diapo révèle ses éléments en
2 à 6 étapes (`data-s`). Les diapos sont pour **projection** : texte court, gros (≥ 18 px), pas de paragraphes.

## Règles de mise en page (strictes)
- Tout reste dans le cadre 1600 × 900 : marges 70 px, contenu entre y = 160 et y = 830 (le pied de page est à 860+).
- `H(titre, surtitre, droite)` occupe le haut (y < 140). Titres de diapo ≤ 45 caractères.
- Aucune image externe, aucune URL d'image : tout est HTML/SVG. Pas de `<script>` dans le html.
- Contenu **vrai pour Microsoft 365 / Office 2021 en français** : noms exacts des onglets, groupes, commandes,
  fonctions Excel FR (séparateur `;`), raccourcis FR (Ctrl+G = gras, Ctrl+I italique, Ctrl+U souligné…).
- `LAB({ app, mod, lab, … })` : `mod` = id minuscule (w03, x05, p02…), `lab` = index du lab dans ce module, et les
  tâches reprennent celles du lab correspondant (source ci-dessous).

## Source pédagogique (à réutiliser, ne pas contredire)
Le contenu des leçons, raccourcis, labs et quiz existe déjà pour chaque module dans la plateforme de labs :
`/private/tmp/claude-501/-Users-dradjou/731545fc-0043-47fd-ab63-832aad3cbe5b/scratchpad/panw/assets/js/office/{word,excel,powerpoint}.js`
(modules w01…, x01…, p01… — même numérotation). Transforme ces leçons en diapos animées (mots-clés à l'écran,
explications en notes), enrichis avec démonstrations visuelles, exemples métier et pièges.

## Vérification (obligatoire avant de rendre)
```
cd /private/tmp/claude-501/-Users-dradjou/731545fc-0043-47fd-ab63-832aad3cbe5b/scratchpad/office
node --check src/modules/X03.js
python3 tools/test.py X03                 # parcourt toutes les diapos/étapes : 0 erreur JS, 0 bloc hors cadre
python3 tools/test.py X03 --shot 4,7,12   # captures (étape finale) → tools/out/X03-4.png … à regarder avec Read
```
Regarde au moins 5 captures par module (diapos les plus chargées) et corrige chevauchements, débordements, textes
trop petits ou trop longs. Ne modifie QUE tes fichiers `src/modules/<CODE>.js` (pas le moteur, pas le kit, pas les
autres modules, pas de git). Si un helper du kit te manque vraiment, écris ton helper local en tête de ton module
(préfixé par le code, ex. `const BOXX03 = …`, comme le font les modules EDU-210).
