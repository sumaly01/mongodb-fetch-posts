require("dotenv").config();
const express = require("express");
require("./src/db/mongoose");
const routes = require("./src/routers/index");

const app = express();
const port = process.env.PORT || 3000;

//parse json object to js object
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log("| Server is up on port  " + port);
  console.log("----------------------");
  console.log(`| http://localhost:${port}`);
  console.log("----------------------");
});
