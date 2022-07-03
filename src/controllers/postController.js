const postSchema = require("../models/postSchema");

const postController = {};

postController.createPosts = async (req, res) => {
  try {
    const { title, content, location } = req.body;
    const postSave = new postSchema({
      title,
      content,
      postedBy: req.user._id,
      location,
    });
    const post = await postSave.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get top 10 posts with top 3 comments with one reply
postController.getPosts = async (req, res) => {
  try {
    const findPost = await postSchema.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "Owner_of_post",
        },
      },
      {
        $lookup: {
          from: "comments",
          // localField: "_id",
          // foreignField: "postId",
          as: "comments",
          let: { postSch_id: "$_id" }, //local
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$postId", "$$postSch_id"] }],
                },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 3 },
            {
              $lookup: {
                from: "replies",
                // localField: "comments._id",
                // foreignField: "commentId",
                as: "replies",
                let: { commentSch_id: "$_id" }, //local
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ["$commentId", "$$commentSch_id"] }],
                      },
                    },
                  },
                  {
                    $sort: { createdAt: -1 },
                  },
                  {
                    $limit: 1,
                  },
                ],
              },
            },
          ],
        },
      },

      {
        $project: {
          _id: 0,
          title: 1,
          content: 1,
          postedBy: 1,
          location: 1,
          "Owner_of_post.name": 1,
          "Owner_of_post.email": 1,
          "comments.comment": 1,
          "comments.commentedBy": 1,
          "comments.createdAt": 1,
          "comments.replies.reply": 1,
          "comments.replies.repliedBy": 1,
        },
      },
    ]);
    res.send(findPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Get posts within 100km from my location
postController.getPostsByDistance = async (req, res) => {
  try {
    const nearPosts = await postSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              Number(req.user.location.coordinates[0]),
              Number(req.user.location.coordinates[1]),
            ],
          },
          distanceField: "distance",
          maxDistance: 100 * 1000,
          spherical: true,
        },
      },
      { $sort: { distance: -1 } },
      {
        $project: {
          _id: 0,
          title: 1,
          content: 1,
          location: 1,
          distance: 1,
        },
      },
    ]);
    res.send(nearPosts);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = postController;
