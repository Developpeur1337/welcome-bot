# Welcome Bot

![License](https://img.shields.io/badge/license-MIT-green)

## Description

**Welcome Bot** est un bot moderne conçu pour accueillir chaleureusement les nouveaux membres de ton serveur. Il gère aussi les ghostping de manière discrète dans des salons configurés.

Dès qu’un nouveau membre rejoint le serveur, le bot :  
- envoie automatiquement un embed de bienvenue dans un ou plusieurs salons configurés,  
- peut réaliser un ghostping instantané dans les salons définis, supprimé après quelques millisecondes.

Son architecture modulaire et sa configuration flexible en font un outil léger, rapide et facile à installer, tout en restant sécurisé pour les serveurs à fort trafic.

Le bot utilise exclusivement des commandes slash (full slash commands) pour une meilleure intégration et ergonomie.

---

## Fonctionnalités principales

- Envoi automatique d’un message de bienvenue en embed dès l’arrivée d’un nouveau membre.  
- Support de plusieurs salons de bienvenue configurables.  
- Ghostping optimisé pour des nouveaux membres dans des salons dédiés.  
- Gestion simple via les commandes **slash** :  
  - `/bienvenue` pour ajouter, retirer ou lister les salons de bienvenue  
  - `/ghostping` pour ajouter, retirer ou lister les salons de ghostping  
- Optimisé pour les gros serveurs et les arrivées massives de membres.

---

## Crédits & Contact

Développé par **Developpeur1337**  
Pour toute question, suggestion ou support, contacte-moi sur Discord : **@developpeur1337**

---

## Installation

1. Clone ce dépôt :

```bash
git clone https://github.com/Developpeur1337/welcome-bot.git
cd welcome-bot
npm install
node index.js
