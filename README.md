# Documentation projet web fullstack - Quizzeo

## Présentation de l'équipe

-   [Amaury Tissot ](https://github.com/AmauryTISSOT)
-   [Gabriel Dos Santos](https://github.com/Gabtorinho25)
-   [Saad Alott](https://github.com/booder93160)
-   [Imane Jami](https://github.com/ijami75)
-   [Julian Vannier](https://github.com/djudj-dev)

## Documentation d'installation et d'utilisation du projet

### Procédure d'installation

Le projet fait l'objet d'une conteneurisation à l'aide de Docker.
Pour procéder au déploiement de l'application, effectuer la commande suivante dans votre terminal depuis la racine du projet.

```
docker compose up -d
```

Si vous avez déjà déployé une ancienne version du projet, il faudra procéder à un re-build du container à l'aide de la commande suivante :

```
docker compose up -d --build --no-deps
```

Si vous souhaitez procéder à un déploiement sur une adresse IP distante, il faudra le préciser à l'aide d'une variable d'environnement comme indiqué ci-dessous :

```
API_URL=http://[hostip]/api/ docker compose up -d --build --no-deps
```

### Procédure de lancement du projet en local

Après avoir procédé à l'installation du projet à l'aide de docker, déplacez vous dans le dossier `quizzeo` à l'aide de la commande `cd quizzeo` et effectuez les commandes suivantes :

-   `npm i` : pour procéder à l'installation des dépendances du projet
-   `npx prisma migrate dev --name init` : effectue la migration Prisma vers la base de données PostgreSQL située dans le container.
-   `npm run seed` : procède à l'insertion de données initiales dans la base de données.
-   `npm run dev` : procède au lancement du projet.

### Accès en local

Une fois la procédure de lancement effectuée, vous pouvez accéder au projet à l'aide de l'URL : [http://localhost:3000](http://localhost:3000)
Ce lien vous conduira sur la page de connexion de l'application.

Pour les besoins de la démonstration du projet, les utilisateurs figurant dans le tableau ci-dessous ont préalablement été créé.

| Rôle        | Email                 | mot de passe |
| ----------- | --------------------- | ------------ |
| GlobalAdmin | admin@gmail.com       | admin        |
| QuizAdmin   | quizadmin@gmail.com   | admin        |
| QuizCreator | quizcreator@gmail.com | admin        |
| UserAdmin   | useradmin@gmail.com   | admin        |
| User        | user@gmail.com        | admin        |

Il est ici précisé que le rôle `GlobalAdmin` permettra de tester toutes les fonctionnalités du projet.

### Variable d'environnement

Le projet contient actuellement les variables d’environnement ci-après, il est ici précisé que ces variables d'environnement ne sont pas destinées à la production :

-   `DATABASE_URL`: l'URL utilisé par Prisma pour la connexion à la base de Donnée.
-   `SALT`: le mot de passe utilisé pour la création/vérification des jwt.
-   `PASWORD_SALT`: le mot de passe utilisé pour le chiffrement des mots de passe des utilisateurs.
-   `NEXT_PUBLIC_API_URL`: l'URL permettant de se connecter à l'API côté client.

## Eléments de réflexion et de suivi du projet

### Etablissement de la charte graphique

Compte tenu des éléments visuels imposés, nous avons procéder à la création, à l'aide du logiciel Figma, à la charte graphique suivante :

![Charte graphique quizzeo](quizzeo/public/charte_graphique_quizzeo.png)

### Etablissement des users stories

Afin de rester au plus proche de la demande du client, nous nous sommes basées sur une méthodologie de travail agile à base d'users stories (US), regroupées dans un backlog.

Une user story est une description concise et informelle d'une fonctionnalité d'un système logiciel, rédigée du point de vue de l'utilisateur final. Elle a pour but de capturer rapidement le "qui", le "quoi" et le "pourquoi" d'une exigence produit.
Le format typique d'une user story est : "En tant que "type d'utilisateur", je souhaite "action" afin de "bénéficier".

Nous avons par exemple utilisé les US suivants :

-   En tant que validateur de compte, je souhaite pouvoir accéder à la liste des utilisateurs afin de pouvoir activer et désactiver des comptes utilisateurs.
-   En tant que simple utilisateur, je souhaite pouvoir accéder à mon profil afin de pouvoir modifier mon mot de passe.
-   En tant que créateur de quiz, je souhaite pouvoir accéder à un formulaire afin de pouvoir créer un quiz.

### Répartition du travail à l'aide de GitHub

#### Utilisation d'un backlog

Pour nous répartir le travail à effectuer, nous avons utilisé le système de "Backlog" du site internet hébergeant notre projet : GitHub

![Backlog](quizzeo/public/backlog.png)

#### Versioning Git

Nous avons utilisé Git et GitHub pour procéder au versioning de notre projet.
Chaque phases de développement et d'itération du projet ont été effectuées sur une branche.

![Git branch](quizzeo/public/branch.png)

### Détermination du modèle de base de données

Notre modèle de base de données peut-être représenté selon le schéma UML suivant :

```mermaid
classDiagram
	direction TB
    class Quiz {
        -id: string
        -title: string
        -enabled: boolean
        -creatorId: string
        -date: DateTime
    }


    class Question {
        -id: string
        -title: string
        -quizId: string
        -goodAnswer: Int
    }

    class Results {
        -id: string
        -quizId: string
        -userId: string
        -score: float
        -date: DateTime
    }

	class ApiKey {
		-id: string
		-apiKey: string
		-date: DateTime
		-userId: string
	}

    class User {
        -id: string
        -email: string
        -password: string
        -enabled: boolean
        -date: DateTime
    }

  	class Logs {
		-id: string
		-userId: string
		-ip: string
		-additionnalInfo: string
		-date: DateTime
	}

	class Action {
		-id: int
		-type: string
	}

	class Role {
		-id: int
		-type: string
	}

	User "1..*" -- "1" Role : possède
	User "1" -- "0..*" Quiz: crééer
	User "1" -- "0..*" Results: avoir
	User "1" -- "0..*" ApiKey : posséde

	Quiz "1" -- "1..*" Question : contient
	Quiz "1" -- "1" Results : avoir

	Logs "1..*" -- "1" Action : type
	Logs "1..*" -- "1" User : concerne

```

## Explication des choix techniques

Compte tenu des contraintes du projet et du délai imparti pour le réaliser, nous avons opté pour les choix techniques suivants :

### Next.js

Compte tenu des disparités de niveau en programmation parmi les membres du groupe, nous avons opté pour un projet 100% JavaScript à l'aide du Framework Next.js .

Next.js offre une simplicité de développement à l'aide de son architecture et de son intégration native de fonctionnalités avancées (routages, création d'API, etc.)

### Base de données et ORM avec Prisma

En raison de sa fiabilité, de sa flexibilité et de sa solution gratuite et open source, nous avons opté pour une base de données PostgreSQL.

Nous avons choisi d'ajouter un niveau d'abstraction à cette base de données à l'aide d'un ORM (Object-Relational Mapping).

Il a été judicieux d'opter pour un ORM, car :

-   Il assure une productivité accrue lors du développement en offrant une abstraction de la base de données et une réutilisation de code.
-   Il assure une sécurité améliorer en offrant une protection intégrée contre les attaques par injection SQL.
-   Il permet une optimalisation des requêtes.

Nous avons utilisé la bibliothèque Prisma comme ORM pour plusieurs raisons :

-   La simplification de la création de la base de données à l'aide d'un Schéma.
-   Le type-safe : Prisma est fortement typé, ce qui signifie qu'il offre une sécurité accrue lors de la manipulation des données.
-   Une facilité d'utilisation : Prisma offre une API simple et intuitive pour interagir avec la base de données, ce qui rend le code plus lisible et plus facile à maintenir.

### CSS avec Tailwind

Concernant le CSS, nous avons choisi d'utiliser la bibliothèque Tailwind pour les raisons suivantes :

-   Productivité accrue : Tailwind permet de styliser rapidement une application en utilisant des classes prédéfinies, ce qui réduit le temps nécessaire pour écrire du CSS personnalisé.
-   Flexibilité : Avec Tailwind, il est facile de personnaliser rapidement et facilement le style des éléments en utilisant des classes prédéfinies ou en créant de nouvelles classes personnalisées.
-   Documentation : Tailwind dispose d'une documentation simple et détaillée ainsi que d'une communauté assurant un support constant.

### Gestion des requêtes avec React-Query

Concernant la gestion des requêtes côté client, nous avons opté pour la bibliothèque React-Query.

React-Query permet d'effectuer très rapidement des requêtes HTTP à l'aide d'hooks React.
En outre, cette bibliothèque gère automatiquement la mise en cache des données récupérées.

### Sécurité avec JWT & bcrypt

Afin d'assurer la sécurité de notre projet, nous avons optés pour les technologies suivantes :

#### JWT

Un JSON Web Token (JWT) est un moyen sûr et compact de transmettre des informations entre différentes parties sous forme d'objet JSON. Il est utilisé dans de nombreux scénarios, mais son utilisation la plus courante est pour l'authentification et l'autorisation dans les applications web et les services API.

En l'espèce, JWT sera utilisé via la bibliothèque `jsonwebtoken` pour l'authentification des utilisateurs et la gestion de leurs droits.

#### Bcrypt

La bibliothèque `bcrypt` est utilisée pour hacher les mots de passe des utilisateurs de l'application avant de les stocker dans une base de données. Plutôt que de stocker les mots de passe en texte brut, bcrypt les transforme en une chaîne de caractères hachée.

### Formulaire avec React-Hook-Form

React-Hook-Form est une bibliothèque qui permet de simplifier la gestion des formulaires dans les applications React.
Cette bibliothèque utilise des hooks pour gérer l'état du formulaire, comme les valeurs saisies par l'utilisateur et les validations, sans avoir à écrire de code complexe de gestion d'état.
De plus, React-Hook-Form facilite l'intégration des règles de validation, améliorant ainsi l'expérience utilisateur et la fiabilité des données soumises.

## Schéma Prisma

Ce schéma Prisma définit les modèles de données de notre application :

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

`Result` a aussi un contrainte unique sur la paire `[userId, quizId]` ainsi un user ne peut pas répondre deux fois au même quiz

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

## Documentation de l'API

### Création d'un utilisateur

Création d'un utilisateur.

**Endpoint** : `POST /api/signup`

**Cors de la requête** :

```json
{
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

**Réponse :**

```json
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNzE0OTk3NzU4LCJleHAiOjE3MTUwMDEzNTh9.TCZKjN2bH16QyKA7rz_d9lgpatrhHzhe_CUwcJd6dyg",
    "user": {
        "id": "e545f995-9801-4ae9-9843-bd4a154fe798",
        "email": "john.doe@gmail.com",
        "password": "$2a$10$9i7fo5lh8h3RSWOaryK5MOfb4Qeo.L60S5o5fwK9nXpt6.tCm1bfO",
        "role": "User",
        "enabled": false,
        "date": "2024-05-06T12:15:58.463Z"
    }
}
```

**Codes d'état HTTP :**

-   `200 OK` : La requête a réussi et les données sont renvoyées.
-   `500 Internal Server Error` : Erreur interne du serveur

### Connexion d'un utilisateur

Connexion d'un utilisateur.

**Endpoint** : `POST /api/login`

**Cors de la requête** :

```json
{
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

**Réponse :**

```json
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNzE0OTk3NzU4LCJleHAiOjE3MTUwMDEzNTh9.TCZKjN2bH16QyKA7rz_d9lgpatrhHzhe_CUwcJd6dyg",
    "user": {
        "id": "e545f995-9801-4ae9-9843-bd4a154fe798",
        "email": "john.doe@gmail.com",
        "password": "$2a$10$9i7fo5lh8h3RSWOaryK5MOfb4Qeo.L60S5o5fwK9nXpt6.tCm1bfO",
        "role": "User",
        "enabled": false,
        "date": "2024-05-06T12:15:58.463Z"
    }
}
```

**Codes d'état HTTP :**

-   `200 OK` : La requête a réussi et les données sont renvoyées.
-   `403 Forbidden` : Accès refusé

### Création d'une clé API

Création d'une clé API.

**Endpoint** : `POST /api/public/generate-api-key`

**Cors de la requête** :

```json
{
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

**Réponse :**

```json
{
    "apiKey": "2bac112b30a80b5df2f1556d5763bafef79b225db51e214fc86e4a324a6fac78"
}
```

**Codes d'état HTTP :**

-   `200 OK` : La requête a réussi et les données sont renvoyées.
-   `403 Forbidden` : Accès refusé

### Obtenir un quiz

Création d'une clé API.

**Endpoint** : `GET /api/public/{quizId}`

**Paramètres de chemin** : `quizId` : Identifiant du quiz

**En-têtes de requête** : `api-key` : Clé API de l'utilisateur

**Réponse :**

```json
{
    "questions": [
        {
            "id": "1cfe6965-2962-478e-b86a-d4c29adf3bb6",
            "title": "Quelle est la capitale de la France ?",
            "quizId": "a69f11bc-dd99-4884-a5d1-867bbf12ed51",
            "answers": "[Array]",
            "goodAnswer": "0"
        },
        {
            "id": "9794188a-04ce-4af7-96c9-46febef2d50e",
            "title": "Quelle est la capitale de l'Italie ?",
            "quizId": "a69f11bc-dd99-4884-a5d1-867bbf12ed51",
            "answers": "[Array]",
            "goodAnswer": "1"
        }
    ],
    "title": "Quiz sur les capitales",
    "id": "a69f11bc-dd99-4884-a5d1-867bbf12ed51",
    "creator": {
        "id": "36b64c70-b96b-49fe-b0fb-1081db7755c9",
        "email": "admin@gmail.com",
        "password": "$2a$10$/9MdKgnSjYJox/bZfnm2Nu8CMt4UwuCGa4kvs0oDggBhqu6swtmLq",
        "role": "GlobalAdmin",
        "enabled": "true",
        "date": "2024-05-06T08:51:25.027Z"
    },
    "enabled": "true"
}
```

**Codes d'état HTTP :**

-   `200 OK` : La requête a réussi et les données sont renvoyées.
-   `403 Forbidden` : Accès refusé
