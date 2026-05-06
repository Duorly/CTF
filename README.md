# CTF M2 — Application de Sondages en Ligne

## Description

Ce projet consiste à développer une application web permettant de créer et partager des **sondages en ligne simples et rapides**.

L’objectif est de proposer un outil accessible à tous pour :

- poser une question à un groupe  
- organiser un vote  
- prendre une décision collective rapidement  

L’application est utilisable directement depuis un navigateur, sans installation complexe.

---

## Equipe 

- Nebel  : Lead 
- Lucas  : Reviewer
- Anas   : DevOps
- Youcef : Dev 
- Ye     : Dev 
- Astrid : Dev

## MVP

- Création de sondages  
- Génération d’un lien de partage  
- Participation au vote  
- Consultation des résultats  

---

## Stack technique

- **Frontend** : Vite.js
- **Backend** : Spring
- **Base de données** : MySQL
- **DevOps** : Docker 

## Bonus 

Des features pourront être ajoutées en plus du MVP pour augmenter le nombres de points rapportés par le projet

---

## Installation et Lancement du Backend

### 1. Configuration des variables d'environnement
L'application utilise un fichier `.env` à la racine pour gérer la connexion à la base de données.
1. Copiez le fichier `.env.example` et renommez-le en `.env`.
2. Modifiez les valeurs dans `.env` selon votre configuration locale (MySQL).

### 2. Lancement avec MySQL (Profil par défaut)
Assurez-vous que votre serveur MySQL est démarré.
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Lancement avec H2 (Profil de test rapide)
Si vous ne voulez pas configurer MySQL, vous pouvez lancer l'application avec une base de données en mémoire (H2) :
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=h2
```
La console H2 sera accessible sur : `http://localhost:8080/h2-console`

### Remarques techniques
- **Configuration** : Le fichier `application.yml` du backend importe automatiquement le fichier `.env` situé à la racine du projet.

