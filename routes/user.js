const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//Routage
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.put('/edit',auth, userCtrl.changePwd);
router.put('/update', auth, userCtrl.editUserProfil);
router.delete('/delete', auth, userCtrl.deleteProfile)

module.exports = router;