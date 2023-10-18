const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const authMiddleware = require("../middlewares/auth");

router.post("/", postController.createPost);
router.get("/:id", postController.getPostById);
router.put("/:id", [authMiddleware.authToken, postController.updatePost]);

module.exports = router;
