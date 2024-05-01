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

Voici la documentation au format .md pour le schéma Prisma :

## Modèle User

```
model User {
  id String @id @default(uuid())
  email String @unique
  password String
  role Role
  enabled Boolean @default(false)
  quiz Quiz[]
  results Result[]
  logs Logs[]
  date DateTime @default(now())
}
```

Le modèle `User` représente un utilisateur du système. Il contient les champs suivants :

-   `id` : l'identifiant unique de l'utilisateur (UUID généré automatiquement)
-   `email` : l'adresse email de l'utilisateur (doit être unique)
-   `password` : le mot de passe de l'utilisateur
-   `role` : le rôle de l'utilisateur (enum `Role`)
-   `enabled` : indique si le compte de l'utilisateur est activé ou non (par défaut `false`)
-   `quiz` : une relation one-to-many avec le modèle `Quiz` (un utilisateur peut créer plusieurs quiz)
-   `results` : une relation one-to-many avec le modèle `Result` (un utilisateur peut avoir plusieurs résultats de quiz)
-   `logs` : une relation one-to-many avec le modèle `Logs` (un utilisateur peut avoir plusieurs logs d'actions)
-   `date` : la date de création de l'utilisateur (par défaut la date actuelle)

## Modèle Quiz

```
model Quiz {
  id String @id @default(uuid())
  title String
  enabled Boolean
  creator User @relation(fields: [creatorId], references: [id])
  creatorId String
  questions Question[]
  results Result[]
  date DateTime @default(now())
}
```

Le modèle `Quiz` représente un quiz. Il contient les champs suivants :

-   `id` : l'identifiant unique du quiz (UUID généré automatiquement)
-   `title` : le titre du quiz
-   `enabled` : indique si le quiz est activé ou non
-   `creator` : une relation many-to-one avec le modèle `User` (un quiz est créé par un utilisateur)
-   `creatorId` : l'identifiant de l'utilisateur qui a créé le quiz
-   `questions` : une relation one-to-many avec le modèle `Question` (un quiz contient plusieurs questions)
-   `results` : une relation one-to-many avec le modèle `Result` (un quiz peut avoir plusieurs résultats)
-   `date` : la date de création du quiz (par défaut la date actuelle)

## Modèle Question

```
model Question {
  id String @id @default(uuid())
  title String
  quiz Quiz @relation(fields: [quizId], references: [id])
  quizId String
  answers String[]
  goodAnswer Int
}
```

Le modèle `Question` représente une question d'un quiz. Il contient les champs suivants :

-   `id` : l'identifiant unique de la question (UUID généré automatiquement)
-   `title` : le titre de la question
-   `quiz` : une relation many-to-one avec le modèle `Quiz` (une question appartient à un quiz)
-   `quizId` : l'identifiant du quiz auquel appartient la question
-   `answers` : un tableau de chaînes de caractères représentant les réponses possibles à la question
-   `goodAnswer` : l'index de la bonne réponse dans le tableau `answers`

## Modèle Result

```
model Result {
  id String @id @default(uuid())
  quiz Quiz @relation(fields: [quizId], references: [id])
  quizId String
  user User @relation(fields: [userId], references: [id])
  userId String
  score Float
  date DateTime @default(now())
}
```

Le modèle `Result` représente le résultat d'un utilisateur pour un quiz donné. Il contient les champs suivants :

-   `id` : l'identifiant unique du résultat (UUID généré automatiquement)
-   `quiz` : une relation many-to-one avec le modèle `Quiz` (un résultat est lié à un quiz)
-   `quizId` : l'identifiant du quiz auquel le résultat est lié
-   `user` : une relation many-to-one avec le modèle `User` (un résultat est lié à un utilisateur)
-   `userId` : l'identifiant de l'utilisateur auquel le résultat est lié
-   `score` : le score obtenu par l'utilisateur pour ce quiz
-   `date` : la date du résultat (par défaut la date actuelle)

## Modèle ApiKey

```
model ApiKey {
  id String @id @default(uuid())
  apiKey String
  date DateTime @default(now())
}
```

Le modèle `ApiKey` représente une clé API. Il contient les champs suivants :

-   `id` : l'identifiant unique de la clé API (UUID généré automatiquement)
-   `apiKey` : la valeur de la clé API
-   `date` : la date de création de la clé API (par défaut la date actuelle)

## Modèle Logs

```
model Logs {
  id String @id @default(uuid())
  user User @relation(fields: [userId], references: [id])
  userId String
  action Action
  ip String
  additionalInformation String?
  date DateTime @default(now())
}
```

Le modèle `Logs` représente un log d'action effectuée par un utilisateur. Il contient les champs suivants :

-   `id` : l'identifiant unique du log (UUID généré automatiquement)
-   `user` : une relation many-to-one avec le modèle `User` (un log est lié à un utilisateur)
-   `userId` : l'identifiant de l'utilisateur auquel le log est lié
-   `action` : le type d'action effectuée (enum `Action`)
-   `ip` : l'adresse IP depuis laquelle l'action a été effectuée
-   `additionalInformation` : des informations supplémentaires sur l'action (optionnel)
-   `date` : la date du log (par défaut la date actuelle)

## Enum Action

```
enum Action {
  loggin
  startQuiz
  FinishQuiz
  signIn
}
```

L'enum `Action` définit les différents types d'actions pouvant être enregistrées dans les logs.

## Enum Role

```
enum Role {
  GlobalAdmin
  AccountValidator
  QuizAdmin
  QuizCreator
  User
}
```

L'enum `Role` définit les différents rôles qu'un utilisateur peut avoir dans le système.
