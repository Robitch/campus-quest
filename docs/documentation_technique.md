## Répertoire racine
Le répertoire racine contient les fichiers de configuration du projet tels que `package.json`, `next.config.js`, `postcss.config.js`, `tailwind.config.js`, et `jsconfig.json`. Il contient également un fichier `.gitignore` pour le contrôle de version Git.

## Répertoire app
C'est le répertoire principal où se trouve le code source de l'application. Il contient les sous-répertoires et fichiers suivants :

### Répertoire api
Ce répertoire contient les routes pour les points de terminaison d'API. Chaque sous-répertoire correspond à un point de terminaison spécifique :

- `add-quest/route.js`: Ce fichier contient la fonction GET pour ajouter une nouvelle quête.
- `create-quests-table/route.js`: Ce fichier contient la fonction GET pour créer une nouvelle table de quêtes.
- `get-quests/route.js`: Ce fichier contient la fonction GET pour obtenir la liste des quêtes.
- `valid-quest/route.js`: Ce fichier contient la fonction GET pour valider une quête.

### Répertoire components
Ce répertoire contient les composants React de l'application :

- `CodeReader.js`: Ce fichier contient le composant `CodeReader` qui est utilisé pour lire les codes QR.
- `Geolocation.js`: Ce fichier contient le composant `Geolocation` qui est utilisé pour obtenir la géolocalisation de l'utilisateur.
- `Header.js`: Ce fichier contient le composant `Header` qui est utilisé pour afficher l'en-tête de l'application.
- `PhotoCapture.js`: Ce fichier contient le composant `PhotoCapture` qui est utilisé pour capturer des photos.
- `QuestList.js`: Ce fichier contient le composant `QuestList` qui est utilisé pour afficher la liste des quêtes.

### Répertoire pages
Ce répertoire contient les pages de l'application. Chaque fichier correspond à une route spécifique dans l'application :

- `index.js`: Ce fichier est la page d'accueil de l'application.
- `about.js`: Ce fichier est la page "À propos" de l'application.
- `contact.js`: Ce fichier est la page "Contact" de l'application.

## Répertoire docs
Ce répertoire contient la documentation du projet. Il contient deux fichiers : `documentation_technique.md` et `documentation_utilisateur.md`.

## Répertoire public
Ce répertoire contient les fichiers statiques de l'application, comme les images, les fichiers CSS et JavaScript qui ne sont pas générés par le code source.

## Répertoire styles
Ce répertoire contient les fichiers de style de l'application. Il peut contenir des fichiers CSS, SCSS, Less, ou tout autre type de fichiers de style utilisés.

## Répertoire tests
Ce répertoire contient les tests unitaires et d'intégration de l'application. Il peut contenir des fichiers `.test.js` ou `.spec.js` qui contiennent les tests.

## Répertoire utils
Ce répertoire contient les fichiers utilitaires de l'application. Ces fichiers contiennent des fonctions utilisées à plusieurs endroits dans le code.

## Répertoire node_modules
Ce répertoire contient les dépendances du projet. Il est généré automatiquement lors de l'exécution de `npm install` ou `yarn install`.

## Fichier .env
Ce fichier contient les variables d'environnement de l'application. Ces variables sont utilisées pour configurer le comportement de l'application en fonction de l'environnement dans lequel elle s'exécute.

## Fichier .gitignore
Ce fichier indique à Git quels fichiers ou répertoires ignorer lors de la création d'un commit.

## Fichier package.json
Ce fichier contient les métadonnées du projet et ses dépendances. Il est utilisé par npm ou yarn pour savoir quelles dépendances installer pour le projet.

