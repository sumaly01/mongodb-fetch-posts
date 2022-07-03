const router = new require("express").Router();
const userController = require("../../controllers/userController");
const { authentication } = require("../../middleware/auth");

//route for creating user
router.post("/save", userController.createUsers);

//router for user login
router.post("/login", userController.loginUser);

//route for user logout
router.post("/logout", authentication, userController.logoutUser);

module.exports = router;
