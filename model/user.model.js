const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide your full name."],
    },

    email: {
      type: String,
      required: [true, "A valid working email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (password) {
          return password.length >= 8;
        },
        message: "Password must be 8 or more characters.",
      },
    },

    // confirmPassword: {
    //   type: String,
    //   required: [true, "Confirm password is required"],
    //   minlength: 6,
    //   validate: {
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: "Password do not match",
    //   },
    // },

    photo: String,

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
