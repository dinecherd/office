# 🎓 Office Academy — formation animée Word · Excel · PowerPoint

🌐 **En ligne : https://dinecherd.github.io/office/**
⬇ **Hors ligne :** [Office-Formation-Complete.html](https://dinecherd.github.io/office/Office-Formation-Complete.html) — un seul fichier, à ouvrir dans le navigateur, sans installation ni réseau.

Formation Microsoft Office du **débutant à l'expert**, au format « formation animée » : un hub de modules, et pour chaque module un diaporama 1600 × 900 animé, piloté au clic.

- **25 modules** : introduction + 8 modules Word, 8 Excel, 8 PowerPoint (4 niveaux : Débutant, Intermédiaire, Avancé, Expert).
- **Diapos animées** sans aucune image : maquettes du ruban avec boutons numérotés, formules Excel tapées en direct, pages Word et diapos avant/après, schémas de flux animés, récaps.
- **Outils formateur** : pointeur laser (`L`), stylo (`P`), surligneur (`H`), flèches (`A`), couleurs (`1`…`8`), atelier de schémas (`W`), notes formateur (`N`), vue d'ensemble (`G`), masquer une diapo (`D`), aide (`?`).
- **Quiz interactifs** en fin de module, et une diapo **Lab** par module qui ouvre le lab interactif correspondant (tâches vérifiées en direct) sur [la plateforme de labs](https://dinecherd.github.io/panw/pages/office.html).

## Développement

```
src/engine/   viewer.css · viewer.js   moteur de présentation (dérivé du viewer EDU-210)
              kit-base.js              helpers de mise en page (TITLE, SEC, OBJ, FLOW, RECAP, QUIZ…)
              kit-office.js/.css       kit Office (APPWIN, GRID, PAGE, SLD, KEYCARDS, PROC, VS, TIP, LAB…)
src/modules/  M00.js, W01…W08.js, X01…X08.js, P01…P08.js
src/modules.json                       catalogue du hub
python3 build.py --check               → index.html + Office-Formation-Complete.html (fichier unique)
python3 tools/test.py --all            → parcours de toutes les diapos/étapes en Chrome headless
```
Contrat d'écriture d'un module : `SLIDES-SPEC.md`.

Microsoft, Word, Excel, PowerPoint et Microsoft 365 sont des marques de Microsoft Corporation. Formation indépendante. Conçu par Dinèche RADJOU.
