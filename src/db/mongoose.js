const mongoose = require("mongoose");

const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/posts-api";

mongoose.connect(url, {
  useNewUrlParser: true,
});

console.log("----------------------");
console.log("| DB connected");
console.log("----------------------");
console.log("| Mongo URL", url);
console.log("----------------------");
