const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage
router.post("/:id/comment/", auth, commentCtrl.createComment);
router.get("/:id/comments/", auth, commentCtrl.getAllComments)
router.delete("/:idpost/comment/:id", auth, commentCtrl.deleteComment)


module.exports = router;