const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/:id', auth, userCtrl.userProfile);
router.get('/', auth, userCtrl.allProfiles);
router.put('/:id',auth, userCtrl.editPwd);
router.put('/', auth, multer, userCtrl.editUserProfile);
router.delete('/:id', auth, userCtrl.deleteProfile);
// router.delete('/users/', auth, userCtrl.deleteUserAccount)

module.exports = router;