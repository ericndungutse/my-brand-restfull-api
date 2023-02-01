const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "A like shoud have user who creates it."],
    },

    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: [true, "A like shoud have a blog associated with it."],
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo -_id",
    options: { _recursed: true },
  });
  next();
});

module.exports = mongoose.model("Like", likeSchema);
