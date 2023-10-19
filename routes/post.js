const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const authMiddleware = require("../middlewares/auth");

router.post("/new_post/", postController.createPost);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
