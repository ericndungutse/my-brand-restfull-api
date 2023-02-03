const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });

const app = require("./app");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.mongoDb).then((con) => {
  console.log("Database Connected Successfully!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at ${port}...`));
