let models = require('../models');
let utils = require('../utils/jwtUtils');

const fs = require('fs');


exports.createPost = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    let content = req.body.content;
    let attachement = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

    if (content == null) {
        return res.status(400).json({
            error: 'Ecrivez un post'
        });
    } else {
        models.User.findOne({
                where: {
                    id: userId
                }
            })
            .then(userFound => {
                if (userFound) {
                    models.Post.create({
                            UserId: userFound.id,
                            content: content,
                            attachement: attachement,
                            likes: 0,
                        })
                        .then((newPost) => {
                            res.status(201).json(newPost)
                        })
                        .catch(err => console.log(err) || res.status(404).json({
                            error: 'Message trop long'
                        }));
                }
            })
            .catch(error => res.status(500).json({
                error: 'impossible de vérifier l\'utilisateur'
            }));
    };
}

exports.getOnePost = (req, res) => {
    models.Post.findOne({
        attributes: [
            "id",
            "userId",
            "content",
            "attachement",
            "likes",
            "createdAt",
            "updatedAt",
        ],
        where: {
            id: req.params.id
        },
        include: {
            attributes: ['id', 'email', 'username', 'isAdmin'],
            model: models.User,
        }

    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong'
        });
        console.log(error);
    });
}


exports.getAllPost = (req, res) => {
    models.Post.findAll({
        order: [
            [
                'createdAt', 'DESC'
            ]
        ],
        attributes: [
            "id",
            "userId",
            "content",
            "attachement",
            "likes",
            "createdAt",
            "updatedAt",
        ],
        include: {
            attributes: ['id', 'email', 'username', 'isAdmin'],
            model: models.User,
        }
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Quelque chose ne va pas'
        });
    })
}

// exports.editPost = (req, res) => {
//     const headerAuth = req.headers['authorization'];
//     const userId = utils.getUserId(headerAuth);
//     let content = req.body.content;
//     let attachement = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
//     console.log(userId);
//     models.Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//         })
//         .then(postFound => {
//             if (userId == postFound.UserId) {
//                 postFound.update({
//                     content: (content ? content : postFound.content),
//                     attachement: (attachement ? attachement : postFound.attachement)
//                 });
//                 return res.status(200).json(postFound);
//             } else {
//                 return res.status(404).json({
//                     error: "Utilisateur non autorisé à éditer ce post"
//                 });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: 'Impossible de mettre à jour le post'
//             });
//             console.log(error);
//         })
// }



//Suppression d'un post
exports.deletePost = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);

    models.Post.findOne({
            where: {
                id: req.params.id,
            },
        }).then((post) => {
            if ((userId == post.UserId && post.attachement) || (isAdmin = true && post.attachement)) {
                const filename = post.attachement.split('/images/')[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, () => {
                    models.Post
                        .destroy({
                            where: {
                                id: post.id
                            }
                        })
                    models.Comment
                        .destroy({
                            where: {
                                postId: post.id
                            }
                        })
                        .then(() => res.end())
                        .catch(err => res.status(500).json(err))
                })
            } else if ((userId == post.UserId) || (isAdmin = true)) {
                models.Comment
                    .destroy({
                        where: {
                            postId: post.id
                        }
                    })
                    .then(() => {
                        post
                            .destroy()
                            .then(() => {
                                res.status(200).json({
                                    message: "Post supprimé !",
                                });
                            })
                            .catch((error) => {
                                res.status(400).json({
                                    error: error,
                                    message: "Le post n'a pas pu être supprimé",
                                });
                            })
                    })
                    .catch(err => res.status(500).json(err))
            } else {
                res.status(403).json('Utilisateur non autorisé à supprimer ce post')
            }
        })
        .catch(error => console.log(error))
}