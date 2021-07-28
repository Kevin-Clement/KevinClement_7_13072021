let models = require('../models');
let utils = require('../utils/jwtUtils');

exports.likePost = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    const postId = req.params.id
    models.Post.findOne({
            where: {
                id: postId
            },
        })
        .then(postFound => {
            if (postFound) {
                models.User.findOne({
                        where: {
                            id: userId
                        },
                    })
                    .then(userFound => {
                        if (userFound) {
                            models.Like.findOne({
                                    where: {
                                        userId: userId,
                                        postId: postId,
                                    }
                                })
                                .then(userLike => {
                                    if (!userLike) {
                                        postFound.update({
                                                likes: postFound.likes + 1,
                                            })
                                            .then(() => res.status(200).json({
                                                message: "Like ajouté !"
                                            }))
                                            .catch((error) => console.log(error));
                                    }
                                })
                        }
                    })
                    .catch((error) => console.log(error));
            }
        })
        .catch((error) => console.log(error));
}

exports.unlikePost = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    const postId = req.params.id
    models.Post.findOne({
            where: {
                id: postId
            },
        })
        .then(postFound => {
            if (postFound) {
                models.User.findOne({
                        where: {
                            id: userId
                        },
                    })
                    .then(userFound => {
                        if (userFound) {
                            models.Like.findOne({
                                    where: {
                                        userId: userId,
                                        postId: postId,
                                    }
                                })
                                .then(userUnlike => {
                                    if (!userUnlike) {
                                        postFound.update({
                                                likes: postFound.likes - 1,
                                            })
                                            .then(() => res.status(200).json({
                                                message: "Like enlevé !"
                                            }))
                                            .catch((error) => console.log(error));
                                    }
                                })
                        }
                    })
                    .catch((error) => console.log(error));
            }
        })
        .catch((error) => console.log(error));
}