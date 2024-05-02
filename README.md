# Readme du projet web de l'IPPSI

## L'Equipe

-   Amaury Tissot
-   Gabriel Dos Santos
-   Image Jami
-   @djudj-dev

## Launch Projet :

```
docker compose up -d
cd quizzeo
npm run dev
```

## Seed database :

Ne pas oublier de cd dans /quizzeo avant d'effectuer la commande ci-dessous :

```
npm run seed
```

# Documentation de l'ORM - Schéma Prisma

Voici la documentation au format .md pour le schéma Prisma fourni :

## Schéma Prisma

Ce schéma Prisma définit les modèles de données pour une application de quiz en ligne.

### Modèles

#### `User`

-   `id`: Identifiant unique de l'utilisateur (généré automatiquement avec `uuid()`).
-   `email`: Adresse e-mail de l'utilisateur (unique).
-   `password`: Mot de passe de l'utilisateur.
-   `role`: Rôle de l'utilisateur (voir l'énumération `Role`).
-   `enabled`: Indique si le compte de l'utilisateur est activé.
-   `quiz`: Liste des quiz créés par l'utilisateur.
-   `results`: Liste des résultats des quiz de l'utilisateur.
-   `logs`: Liste des logs d'activité de l'utilisateur.
-   `date`: Date de création du compte de l'utilisateur.
-   `apiKeys`: Liste des clés API associées à l'utilisateur.

#### `Quiz`

-   `id`: Identifiant unique du quiz (généré automatiquement avec `uuid()`).
-   `title`: Titre du quiz.
-   `enabled`: Indique si le quiz est activé.
-   `creator`: Utilisateur qui a créé le quiz.
-   `creatorId`: Identifiant de l'utilisateur qui a créé le quiz.
-   `questions`: Liste des questions du quiz.
-   `results`: Liste des résultats du quiz.
-   `date`: Date de création du quiz.

#### `Question`

-   `id`: Identifiant unique de la question (généré automatiquement avec `uuid()`).
-   `title`: Titre de la question.
-   `quiz`: Quiz auquel la question appartient.
-   `quizId`: Identifiant du quiz auquel la question appartient.
-   `answers`: Liste des réponses possibles.
-   `goodAnswer`: Index de la bonne réponse dans la liste des réponses.

#### `Result`

-   `id`: Identifiant unique du résultat (généré automatiquement avec `uuid()`).
-   `quiz`: Quiz auquel le résultat est lié.
-   `quizId`: Identifiant du quiz auquel le résultat est lié.
-   `user`: Utilisateur qui a obtenu ce résultat.
-   `userId`: Identifiant de l'utilisateur qui a obtenu ce résultat.
-   `score`: Score obtenu par l'utilisateur.
-   `date`: Date d'obtention du résultat.

#### `ApiKey`

-   `id`: Identifiant unique de la clé API (généré automatiquement avec `uuid()`).
-   `apiKey`: Clé API.
-   `date`: Date de création de la clé API.
-   `user`: Utilisateur associé à la clé API.
-   `userId`: Identifiant de l'utilisateur associé à la clé API.

#### `Logs`

-   `id`: Identifiant unique du log (généré automatiquement avec `uuid()`).
-   `user`: Utilisateur associé au log.
-   `userId`: Identifiant de l'utilisateur associé au log.
-   `action`: Action effectuée par l'utilisateur (voir l'énumération `Action`).
-   `ip`: Adresse IP de l'utilisateur.
-   `additionalInformation`: Informations supplémentaires sur l'action.
-   `date`: Date de l'action.

### Énumérations

#### `Role`

-   `GlobalAdmin`: Administrateur global.
-   `QuizAdmin`: Administrateur de quiz.
-   `QuizCreator`: Créateur de quiz.
-   `User`: Utilisateur standard.
-   `UserAdmin`: Administrateur d'utilisateurs.

#### `Action`

-   `loggin`: Connexion.
-   `startQuiz`: Démarrage d'un quiz.
-   `FinishQuiz`: Fin d'un quiz.
-   `signIn`: Inscription.

### Configuration

-   `generator client`: Utilise le fournisseur `prisma-client-js` pour générer le client Prisma.
-   `datasource db`: Utilise le fournisseur `postgresql` pour la base de données, avec l'URL définie par la variable d'environnement `DATABASE_URL`.
