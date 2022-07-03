const router = new require("express").Router();

const commentController = require("../../controllers/commentController");
const { authentication } = require("../../middleware/auth");

//creating new comments
router.post("/save", authentication, commentController.createComments);

module.exports = router;
