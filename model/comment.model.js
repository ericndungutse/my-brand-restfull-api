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

comSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo -_id",
    options: { _recursed: true },
  });
  next();
});

module.exports = mongoose.model("Comment", comSchema);
