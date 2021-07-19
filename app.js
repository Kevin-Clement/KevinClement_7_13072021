const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const path = require('path');
const rateLimit = require("express-rate-limit");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


//création application Express
const app = express();


//Résolution erreur CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100 // limite chaque IP à 100 requêtes par windowMs
});

app.use(limiter);

//Parser les corps des requête + forcer parse d'objets inclus dans d'autres objets
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(helmet());

//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;