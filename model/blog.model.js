const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog should have a title"],
    },

    text: {
      type: String,
      required: [true, "A blog should have text content"],
    },

    photo: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
