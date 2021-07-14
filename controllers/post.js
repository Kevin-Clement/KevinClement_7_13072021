let models = require('../models');
let utils = require('../utils/jwtUtils');
const fs = require('fs');


//Création d'un message
exports.create = (req, res) => {
    //Declaration de l'url de l'image
    let attachmentURL
    //identifier qui créé le message
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //Récupération du corps du post
                let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                else {
                    attachmentURL == null
                };
                if ((content == 'null' && attachmentURL == null)) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    models.Post.create({
                        content: content,
                        attachement: attachmentURL,
                        UserId: user.id
                    })
                        .then((newPost) => {
                            res.status(201).json(newPost)
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
}

//Afficher les posts sur le mur
exports.listMsg = (req, res) => {
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

//Suppression d'un post
exports.delete = (req, res) => {
    //req => userId, postId, user.isAdmin
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Suppression du post id :', req.body.postId);
                models.Post
                    .findOne({
                        where: { id: req.body.postId }
                    })
                    .then((postFind) => {

                        if (postFind.attachement) {
                            const filename = postFind.attachement.split('/images/')[1];
                            console.log("teseeeest", filename);
                            fs.unlink(`images/${filename}`, () => {
                                models.Post
                                    .destroy({
                                        where: { id: postFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        }
                        else {
                            models.Post
                                .destroy({
                                    where: { id: postFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
        })
        .catch(error => res.status(500).json(error));
};

//Modification d'un post
exports.update = (req, res) => {
    //récupération de l'id du demandeur pour vérification
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Modif ok pour le post :', req.body.postId);
                models.Post
                    .update(
                        {
                            content: req.body.newText,
                            attachement: req.body.newImg
                        },
                        { where: { id: req.body.postId } }
                    )
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
            }
        }
        )
        .catch(error => res.status(500).json(error));
}

exports.like = (req, res) => {
    //Récupérer l'id du message 'liké'
    let postId = req.body.postId;
    //identifier id de l'user qui like le message
    let userId = utils.getUserId(req.headers.authorization);
    console.log('Etape 1 : user a l\'id:', userId)
    //Recherche du message liké dans la BD
    models.Post.findOne(
        {
            where: { id: postId }
        }
    )
        .then(postFound => {
            if (postFound) {
                console.log('Etape 2 : le message liké est:', postFound);
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        if (userFound) {
                            console.log('user trouvé', userFound);
                            //recherche si l'user à déjà liké le post
                            models.Like.findOne({
                                where: {
                                    userId: userFound.id,
                                    postId: postFound.id
                                }})
                                    .then(userAlreadyLike => {
                                        if (!userAlreadyLike) {
                                            postFound.addUser(userFound)
                                                .then(() => {
                                                    postFound.update({
                                                        likes: postFound.likes++
                                                    })
                                                        .then(()=>res.end(postFound))
                                                        .catch(err => res.status(500).json({err}))
                                                })
                                                .catch(err => res.status(500).json(err))
                                        } else {
                                            res.status(409).json({ error: 'Post déjà liké' })
                                        }
                                    })
                                    .catch(err => {
                                        console.log('erreur dans la fonction');
                                        res.status(500).json({ error: err })
                                    })
                                
                        } else {
                            res.status(404).json({ error: 'utilisateur non trouvé' })
                        }
                    })
                    .catch(err => { console.log(err); res.end() })
            } else {
                res.status(404).json({ error: 'Post n\'existe pas' });
            };
        })
        .catch(err => res.status(500).json(err));
};

exports.disLike = (req, res) => {
    //identifier qui dislike le message
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => res.end())
        .catch(() => res.end())
};