const mongoose = require("mongoose");

const comSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "provide comment."],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", comSchema);
