const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });

const app = require("./app");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.LOCAL_DATABASE).then((con) => {
  console.log("********************************");
  console.log("Database Connected Successfully!");
  console.log("********************************");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at ${port}...`));
