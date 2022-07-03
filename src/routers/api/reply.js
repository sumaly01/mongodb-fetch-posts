const router = new require("express").Router();

const replyController = require("../../controllers/replyController");
const { authentication } = require("../../middleware/auth");

//creating new reply
router.post("/save", authentication, replyController.createReply);

module.exports = router;
