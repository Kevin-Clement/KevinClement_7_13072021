const express = require('express');
const helmet = require("helmet");
const path = require('path');
const rateLimit = require("express-rate-limit");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

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
    windowMs: 5 * 60 * 1000, // 5 minutes 
    max: 300, // limite chaque IP à 300 requêtes par windowMs
    message: " Trop de tentatives échouées, réessayez dans 5 minutes",
});

app.use(limiter);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(helmet());

//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use("/api/post/", commentRoutes);
app.use("/api/post/", likeRoutes);


module.exports = app;