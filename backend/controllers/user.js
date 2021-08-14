let bcrypt = require('bcrypt');
let models = require('../models');
let utils = require('../utils/jwtUtils');
let verifInput = require('../utils/verifInputUtils');
const fs = require('fs');

//Création d'un user
exports.signup = (req, res) => {
    // Valider les paramètres de la requète
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (email == null || username == null || password == null) {
        res.status(400).json({
            error: 'Il manque un paramètre'
        })
    }

    //TO DO => Vérification des saisies user
    let emailValid = verifInput.validEmail(email);
    let mdpValid = verifInput.validPassword(password);
    let usernameValid = verifInput.validUsername(username);
    if (emailValid == true && mdpValid == true && usernameValid == true) {
        //Vérification si user n'existe pas déjà
        models.User.findOne({
                attributes: ['email'],
                where: {
                    email: email
                }
            })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, bcryptPassword) {
                        // Création de l'user
                        const newUser = models.User.create({
                                email: email,
                                username: username,
                                password: bcryptPassword,
                                isAdmin: false
                            })
                            .then(newUser => {
                                res.status(201).json({
                                    'id': newUser.id
                                })
                                console.log(newUser);
                            })
                            .catch(err => {
                                res.status(500).json({
                                    err
                                })
                            })
                    })
                } else {
                    res.status(409).json({
                        error: 'Cette utilisateur existe déjà '
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    err
                })
            })
    } else {
        res.status(403).json({
            error: 'Identifiant non valide'
        });
    }
};

//Login d'un user
exports.login = (req, res) => {
    //Récupération et validation des paramètres
    let email = req.body.email;
    let password = req.body.password;
    if ((email == null) || (password == null)) {
        res.status(400).json({
            error: 'Il manque un paramètre'
        })
    }
    //Vérification si user existe
    models.User.findOne({
            where: {
                email: email
            }
        })
        .then(userFound => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: userFound.id,
                            token: utils.generateToken(userFound),
                            isAdmin: userFound.isAdmin
                        })
                    } else {
                        res.status(403).json({
                            error: 'Mot de passe incorrect'
                        });
                    };
                })
            } else {
                res.status(404).json({
                    'erreur': 'Cet utilisateur n\'existe pas'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        });
};



//Profil d'un user
exports.userProfile = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio', 'imageProfil', 'isAdmin'],
            where: {
                id: userId
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

exports.allProfiles = (req, res) => {
    models.User.findAll({
            order: [
                [
                    'createdAt', 'DESC'
                ]
            ],

            attributes: ['id', 'email', 'username', 'isAdmin'],

        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

//modification d'un profil
exports.editPwd = (req, res) => {
    //TO DO:
    //Récupère l'id de l'user et le nouveau password
    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    const newPassword = req.body.newPassword;

    if (verifInput.validPassword(newPassword)) {
        models.User.findOne({
                where: {
                    id: userId
                }
            })
            .then(user => {
                bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                    //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                    if (resComparePassword) {
                        res.status(406).json({
                            error: 'Vous avez entré le même mot de passe'
                        })
                    } else {
                        bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                            models.User.update({
                                    password: bcryptNewPassword
                                }, {
                                    where: {
                                        id: user.id
                                    }
                                })
                                .then(() => res.status(201).json({
                                    confirmation: 'Mot de passe modifié avec succès'
                                }))
                                .catch(err => res.status(500).json(err))
                        })
                    }
                })
            })
            .catch(err => json(err))
    } else {
        res.status(406).json({
            error: 'Mot de passe non valide'
        })
    }
};

// exports.editUserProfile = (req, res) => {
//     const headerAuth = req.headers['authorization'];
//     const userId = utils.getUserId(headerAuth);
//     if (userId != null) {
//         models.User.findOne({
//                 attributes: ['id', 'imageProfil'],
//                 where: {
//                     id: userId
//                 }
//             })
//             .then(userFound => {
//                 if (req.file) {
//                     if (userFound.imageProfil !== null) {
//                         const fileName = userFound.imageProfil.split(`/images/`)[1];
//                         fs.unlink(`images/${fileName}`, (err) => {
//                             if (err) console.log(err);
//                             else {
//                                 console.log(`Image supprimée: ` + fileName);
//                             }
//                         });
//                     }
//                     req.body.imageProfil = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
//                 }
//             })
//             .catch(error => res.status(500).json({
//                 error: 'Impossible de mettre à jour le profil utilisateur'
//             }));
//     }
// }

//Suppression d'un compte
exports.deleteProfile = (req, res) => {

    const headerAuth = req.headers['authorization'];
    const userId = utils.getUserId(headerAuth);
    if (userId != null) {
        models.User.findOne({
                where: {
                    id: userId
                }
            })
            .then(userFound => {
                if (userFound != null) {
                    //Delete de tous les posts de l'user même s'il y en a pas
                    models.Post
                        .destroy({
                            where: {
                                userId: userFound.id
                            }
                        })
                        .then(() => {
                            console.log('Tous les posts de cet utilisateur ont été supprimé');
                            //Suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: {
                                        id: userFound.id
                                    }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(401).json({
                        error: 'Cet utilisateur n\'existe pas'
                    })
                }
            })
    } else {
        res.status(500).json({
            error: 'Impossible de supprimer ce compte, contactez un administrateur'
        })
    }

}
