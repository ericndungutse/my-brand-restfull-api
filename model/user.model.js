const crypto = require("crypto");
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

    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});

// Create password changed at before changing the password
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Methods to verify password
userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create Password Reset Code
userSchema.methods.createPasswordResetToken = function () {
  const resetCode = crypto.randomInt(999999).toString();

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetCode;
};

// Check if user changed password recently
userSchema.methods.checkPasswordChanged = function (jwtIat) {
  // jwtIat is in seconds while passwordChangedAt getTime returns milleseconds
  return this.passwordChangedAt?.getTime() / 1000 > jwtIat;
};

module.exports = mongoose.model("User", userSchema);
