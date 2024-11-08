# bibliotheque_agharmiou
## 📚 Gestion de Bibliothèque - BCA Lovat
### Bienvenue sur le dépôt du projet BCA Lovat ! Ce site est conçu pour gérer efficacement une collection de livres, suivre les prêts, et organiser les livres dans différentes bibliothèques à travers plusieurs emplacements.

## 🚀 Aperçu
#### Le site est actuellement déployé à l'adresse suivante : bca-lovat.vercel.app

## 🎨 Fonctionnalités Principales
#### Gestion des Livres : Ajouter, modifier, et supprimer des livres de la collection.
#### Gestion des Prêts : Suivi des livres empruntés par les utilisateurs avec des dates de retour.
#### Organisation des Bibliothèques : Gestion des rangées et des emplacements des livres dans différentes bibliothèques.
#### Recherche Intelligente : Recherche rapide par titre, auteur ou code unique du livre.
#### Interface Responsive : Optimisé pour les ordinateurs, tablettes, et téléphones.
## 🛠️ Technologies Utilisées
#### Frontend : React, Next.js
#### Backend & Database : Supabase
#### Déploiement : Vercel
#### Styles : CSS Modules avec design personnalisé
## ⚙️ Installation & Lancement en Local
#### Pour exécuter ce projet en local, suivez les étapes suivantes :

#### Prérequis
#### Node.js (v16 ou supérieur)
#### npm ou yarn
#### Un compte Supabase pour connecter votre base de données
### Étapes d'installation
#### Cloner le dépôt :

#### git clone https://github.com/ton-projet/bca-lovat.git

#### cd bca-lovat

#### Installer les dépendances :

#### npm install

#### Configurer l'environnement :

#### Créez un fichier .env.local à la racine du projet avec les variables suivantes :

#### NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
#### NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key

#### Lancer le serveur en développement :

#### npm run dev

#### Accéder au site : Ouvrez votre navigateur à l'adresse suivante : http://localhost:3000


### 📌 Notes Importantes
#### Les codes des livres sont générés automatiquement lors de l'ajout d'un nouveau livre en fonction de son genre (par exemple, man1, poli1, etc.).
#### Les livres retournés sont marqués par une date_retour différente de null.
### 🔧 Problèmes Connus & Améliorations Futures
#### Recherche Améliorée : Ajouter des filtres avancés pour la recherche par date de prêt et de retour.
#### Notifications : Implémenter un système de rappels pour les dates de retour des prêts.
#### Amélioration de l'UI/UX : Ajouter des animations et transitions pour une expérience utilisateur plus fluide.
