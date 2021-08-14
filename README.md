# KevinClement_7_13072021

## Backend : Ce projet est développé avec NodeJS, Express, Sequelize et Mysql

## Frontend : Ce projet est développé avec VueJS

L'installation de NodeJS, Express, Sequelize et Mysql est requise sur votre ordinateur.

### FRONTEND

Clônez le repo sur lequel vous vous trouvez.

À la racine du dossier frontend => `npm install`

Puis `npm run serve`
 
Exemple: App running at:

Local: http://localhost:8080/

Network: http://192.168.1.64:8080/)

Installation de la base de données Entrez: - `npm i sequelize - sequelize init`

Dans le dossier backend modifer le username (ou root) et le mot de passe dans config/config.json

Pour finaliser la base de données, executez dans la racine du dossier backend les commandes : `sequelize db:create` et `sequelize db:migrate`

(Vous pouvez importer sauvegarde.sql)

Puis lancez le serveur avec `npm start`

Installer le logiciel MAMP Dans preférences/ports cliquez sur le ports 80 & 3306 Ensuite cliquez sur START

### BACKEND

Installer mysql dans le backend => `npm i mysql` (par default le User=root et il n'y a pas de mot de passe) Pour modifier le mot de passe faites la commande: `mysqladmin -u -root password VOTRE MOT DE PASSE`

À la racine du dossier backend, faites un `npm install`

Faites un `nodemon server` (node recquis pour cette application)
