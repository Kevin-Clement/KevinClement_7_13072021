const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, multer, postCtrl.getOnePost);
router.get("/", auth, multer, postCtrl.getAllPost);
router.put("/:id", auth, multer, postCtrl.editPost);
router.delete("/:id",auth, postCtrl.deletePost)


module.exports = router; 