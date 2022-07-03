const router = require("express").Router();

//userRoutes
const userRoutes = require("./api/user");
router.use("/user", userRoutes);

//postRoutes
const postRoutes = require("./api/post");
router.use("/post", postRoutes);

//commentRoutes
const commentRoutes = require("./api/comment");
router.use("/comment", commentRoutes);

//replyRoutes
const replyRoutes = require("./api/reply");
router.use("/reply", replyRoutes);

module.exports = router;
