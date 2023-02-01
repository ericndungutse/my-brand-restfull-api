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

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    photo: String,
  },
  {
    timestamps: true,
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo -_id",
    options: { _recursed: true },
  });
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
