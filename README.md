# Readme du projet web de l'IPPSI

## L'Equipe


- Amaury Tissot
- Gabriel Dos Santos
- Image Jami
- @djudj-dev

## Launch Projet :

```
docker compose up -d

```

### Variable d'environnement

le projets prend actuellement 3 variables d’environnement :

- `DATABASE_URL`: est utiliser par prisma pour la connexion a la DB
- `SALT`: est utiliser pour la création/vérification des jwt
- `PASWORD_SALT`: est utiliser pour la création/vérification des password

### Accès en local :

En tapant [http://localhost:3000](http://localhost:3000) vous allez tomber sur une page de connexion, il existe un global admin déjà créer si vous avez run la seed.
- username: admin@example.com
- password: admin

a partir de ce compte vous pourrez tous faire créer d'autre compte etc...
# Documentation des choix technique

Pour ce projet nous avons du faire plusieurs choix technique je vais les detailler et les justifier ci dessous :
#### Techno / Framework web :

Le projet est en full javascript nous avons choisit d'utiliser NextJs pour plusieurs raison, d'abord la facilitée de déploiement, ensuite c'est un Framework 100% javascript mais en plus 100% React.
C'est particularité on fait que nous avons pu créer assez facilement des rendu a la fois réutilisable et personnalisable grasse au composant React, de-plus il prend parfaitement en charge la création d'api, pour les requettes effectuer du cotés client, et permet de créer a la fois des composant rendu cotés client mais aussi des composant créer cotés serveur, il répondait très bien a nos attentes 

### Base de donnée et ORM

Pour la base de donnée nous avons choisit pgsql car elle est robuste, elle est largement utilisé dans le monde du web et de plus elle est compatible avec l'ORM que nous avons choisit d'utiliser.

Prisma est un Orm qui permet très simplment en JS de créer un shcema de base de donnée et de pouvoir utiliser un tas de méthode pour les CRUD de façon typesafe.

Notre choix c'est porter sur prisma pour ça simplicité d'utilisation et d’installation ainsi qu'une très bonne doc et communauté pour le support 

### Autre librairie 

#### Tailwind

Tailwind à été choisit pour sa simplicité d'utilisation et d'intégration à React, il nous a permit de facilement styliser nos composants sans ecrire une seul ligne de css

### React-Query

React querry a permis a nos composant client de faire simplement des requêtes vers l'api avec de la mise en cache ou une gestion simplifier des mutation de donnée, en revanche pour ce qui est de requettes nous avons choisit de rester sur l'api de base `fetch` qui fait très bien sont travail
 
### jsonwebtoken & bcrypt

pour ajouter un peu de securité nous avons intsaller deux librairie 

`bcrypt` 
celle ci permet de hasher les mot de passe pour que ceux ci ne soit pas stocker en clair 

`jsonwebtoken`
les token sont utilisé pour l'authentification des utilisateurs, sur des route api protégé, on y stocke id utilisateur pour permettre une gestion des droits 

### React-Hook-Form

React-hook-form à permis une meilleur gestion des formulaire qui sont omnipresent dans le projets il est parfaitement adapter a React et nos cas d'usages  
 

# Documentation des models de données

## Schéma Prisma
Ce schéma Prisma définit les modèles de données pour une application de quiz en ligne.

### Modèles

#### `User`

- `id`: Identifiant unique de l'utilisateur (généré automatiquement avec `uuid()`).
- `email`: Adresse e-mail de l'utilisateur (unique).
- `password`: Mot de passe de l'utilisateur.
- `role`: Rôle de l'utilisateur (voir l'énumération `Role`).
- `enabled`: Indique si le compte de l'utilisateur est activé.
- `quiz`: Liste des quiz créés par l'utilisateur.
- `results`: Liste des résultats des quiz de l'utilisateur.
- `logs`: Liste des logs d'activité de l'utilisateur.
- `date`: Date de création du compte de l'utilisateur.
- `apiKeys`: Liste des clés API associées à l'utilisateur.

#### `Quiz`

- `id`: Identifiant unique du quiz (généré automatiquement avec `uuid()`).
- `title`: Titre du quiz.
- `enabled`: Indique si le quiz est activé.
- `creator`: Utilisateur qui a créé le quiz.
- `creatorId`: Identifiant de l'utilisateur qui a créé le quiz.
- `questions`: Liste des questions du quiz.
- `results`: Liste des résultats du quiz.
- `date`: Date de création du quiz.

#### `Question`

- `id`: Identifiant unique de la question (généré automatiquement avec `uuid()`).
- `title`: Titre de la question.
- `quiz`: Quiz auquel la question appartient.
- `quizId`: Identifiant du quiz auquel la question appartient.
- `answers`: Liste des réponses possibles.
- `goodAnswer`: Index de la bonne réponse dans la liste des réponses.

#### `Result`

- `id`: Identifiant unique du résultat (généré automatiquement avec `uuid()`).
- `quiz`: Quiz auquel le résultat est lié.
- `quizId`: Identifiant du quiz auquel le résultat est lié.
- `user`: Utilisateur qui a obtenu ce résultat.
- `userId`: Identifiant de l'utilisateur qui a obtenu ce résultat.
- `score`: Score obtenu par l'utilisateur.
- `date`: Date d'obtention du résultat.

`Result` a aussi un contrainte unique sur la paire `[userId, quizId]` ainsi un user ne peut pas répondre deux fois au même quiz

#### `ApiKey`

- `id`: Identifiant unique de la clé API (généré automatiquement avec `uuid()`).
- `apiKey`: Clé API.
- `date`: Date de création de la clé API.
- `user`: Utilisateur associé à la clé API.
- `userId`: Identifiant de l'utilisateur associé à la clé API.

#### `Logs`

- `id`: Identifiant unique du log (généré automatiquement avec `uuid()`).
- `user`: Utilisateur associé au log.
- `userId`: Identifiant de l'utilisateur associé au log.
- `action`: Action effectuée par l'utilisateur (voir l'énumération `Action`).
- `ip`: Adresse IP de l'utilisateur.
- `additionalInformation`: Informations supplémentaires sur l'action.
- `date`: Date de l'action.

### Énumérations

#### `Role`

- `GlobalAdmin`: Administrateur global.
- `QuizAdmin`: Administrateur de quiz.
- `QuizCreator`: Créateur de quiz.
- `User`: Utilisateur standard.
- `UserAdmin`: Administrateur d'utilisateurs.

#### `Action`

- `loggin`: Connexion.
- `startQuiz`: Démarrage d'un quiz.
- `FinishQuiz`: Fin d'un quiz.
- `signIn`: Inscription.
