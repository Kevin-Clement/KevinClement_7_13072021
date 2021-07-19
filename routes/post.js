const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/create", auth, multer, postCtrl.createPost);
// router.delete("/delete", postCtrl.deletePost)
// router.put("/editPost", auth, multer, postCtrl.editPost)
// router.get("/", auth, postCtrl.listMsg);

module.exports = router; 