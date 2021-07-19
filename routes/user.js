const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/account', auth, userCtrl.userProfile);
router.put('/editPwd',auth, userCtrl.editPwd);
router.put('/editProfile', auth, multer, userCtrl.editUserProfile);
router.delete('/delete', auth, userCtrl.deleteProfile)

module.exports = router;