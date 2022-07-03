const router = new require("express").Router();
const { authentication } = require("../../middleware/auth");

const postController = require("../../controllers/postController");

//creating new posts
router.post("/save", authentication, postController.createPosts);

//get posts along with comments and replies
router.get("/getPosts", authentication, postController.getPosts);

//get posts within 100km from my location
router.get(
  "/getPostsByDistance",
  authentication,
  postController.getPostsByDistance
);

module.exports = router;
