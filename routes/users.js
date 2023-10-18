const express = require("express");
const router = express.Router();
const userController = require("../controllers/users")

router.get("/", userController.get);
router.get("/:id", userController.getById);

// router.post('/', [auth.authToken, auth.isAdmin], userController.post)
router.post('/', userController.post)

router.post('/login', userController.login)



module.exports = router