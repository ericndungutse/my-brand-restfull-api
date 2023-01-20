const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  text: String,
  photo: String,
});

module.exports = mongoose.model("Blog", blogSchema);
