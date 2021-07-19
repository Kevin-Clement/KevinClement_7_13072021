let models = require('../models');
let utils = require('../utils/jwtUtils');

// const fs = require('fs');


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
                            userId: userFound.id,
                            content: content,
                            attachement: attachement,
                            likes: 0,
                        })
                        .then((newPost) => {
                            res.status(201).json(newPost)
                        })
                        .catch(err => res.status(404).json({
                            error: 'Utilisateur non trouvé'
                        }));
                }
                console.log(userFound);
            })
            .catch(error => res.status(500).json({
                error: 'impossible de vérifier l\'utilisateur'
            }));
    };
}

// //Suppression d'un post
// exports.deletePost = (req, res) => {
//     const headerAuth = req.headers['authorization'];
//     const userId = utils.getUserId(headerAuth);
//     if (userId != null) {
//         models.User.findOne({
//                 attributes: ['id', 'email', 'username', 'isAdmin'],
//                 where: {
//                     id: userId
//                 }
//             })
//             .then(userFound => {
//                 if (userFound || userFound.isAdmin == true){
//                     models.Post
//                         .findOne({
//                             where: {
//                                 userId: req.body.postId
//                             }
//                         })
//                         .then((postFind) => {
//                             if (postFind.attachement) {
//                                 const filename = postFind.attachement.split('/images/')[1];
//                                 fs.unlink(`images/${filename}`, () => {
//                                     models.Post
//                                         .destroy({
//                                             where: {
//                                                 id: postFind.id
//                                             }
//                                         })
//                                         .then(() => res.end())
//                                         .catch(err => res.status(500).json(err))
//                                 })
//                             } else {
//                                 models.Post
//                                     .destroy({
//                                         where: {
//                                             id: postFind.id
//                                         }
//                                     })
//                                     .then(() => res.end())
//                                     .catch(err => res.status(500).json(err))
//                             }
//                         })
//                         .catch(err => res.status(500).json(err))
//                 } else {
//                     res.status(403).json('Utilisateur non autorisé à supprimer ce post')
//                 }
//             })
//             .catch(error => res.status(500).json(error));
//     }
// }