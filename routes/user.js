const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/', auth, userCtrl.userProfile);
router.put('/edit-pwd',auth, userCtrl.editPwd);
router.put('/', auth, multer, userCtrl.editUserProfile);
router.delete('/', auth, userCtrl.deleteProfile);

module.exports = router;