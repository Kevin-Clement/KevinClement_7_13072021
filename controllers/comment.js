let models = require('../models');
let utils = require('../utils/jwtUtils');

exports.createComment = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    let comment = req.body.comment;
    if (comment == null) {
        return res.status(400).json({
            error: 'Ecrivez un commentaire'
        });
    } else {
        models.User.findOne({
                where: {
                    id: userId
                }
            })
            .then(userFound => {
                if (userFound) {
                    models.Comment.create({
                            userId: userId,
                            postId: req.params.id,
                            comment: comment,
                        })
                        .then(() => res.status(200).json({
                            message: "Commentaire enregistré !"
                        }))
                        .catch((error) => res.status(500).json(error));
                }
            })
            .catch((error) => res.status(500).json(error));
    }
}

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
            attributes: [
                "id",
                "userId",
                "postId",
                "comment",
                "createdAt",
                "updatedAt",
            ],
            where: {
                postId: req.params.id,
            },
            order: [
                ["updatedAt", "DESC"]
            ],
            include: [{
                model: models.User,
                attributes: ["username"],
            }, ],
        })
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};


exports.deleteComment = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);

    models.Comment.findOne({
            where: {
                postId: req.params.idpost,
                id: req.params.id,
            },
        }).then((comment) => {
            if (comment.userId === userId) {
                comment
                    .destroy()
                    .then(() => {
                        res.status(200).json({
                            message: "Commentaire supprimé !",
                        });
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: error,
                            message: "Le commentaire n'a pas pu être supprimé",
                        });
                    });
            }
        })
        .catch(error => console.log(error))
};