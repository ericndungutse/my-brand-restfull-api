const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

    tel: {
      type: Number,
    },

    country: {
      type: String,
    },

    socialNet: [String],

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

    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});

// Methods to verify password
userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
