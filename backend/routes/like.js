const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');


router.post("/:id/like", auth, likeCtrl.likePost);
router.post("/:id/unlike", auth, likeCtrl.unlikePost);

module.exports = router; 