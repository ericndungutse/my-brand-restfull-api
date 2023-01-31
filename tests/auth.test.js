const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../model/user.model");

/* Connecting to the database before each test. */
beforeAll(async () => {
  process.env.JWT_SECRET = "secret-for-testing";
  process.env.JWT_EXPIRES_IN = "1d";
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://localhost:27017/eric_ndungutse_test");
});

/* Closing database connection after each test. */
afterAll(async () => {
  process.env.JWT_SECRET = undefined;
  process.env.JWT_EXPIRES_IN = undefined;
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("*********** AUTHENTICATION ***********", () => {
  describe("*********** User Signup ***********", () => {
    beforeAll(async () => {
      await User.findOneAndDelete({ name: "Deborah Bwiza" });
    });

    // User signed up
    it("should signup a new user", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Deborah Bwiza",
        email: "bwiza@example.com",
        password: "test12345",
        confirmPassword: "test12345",
      });

      expect(res.body.status).toBe("success");
      expect(res.body.data.user.name).toContain("Deborah Bwiza");
    });

    // User signed up with existing email
    it("should not signup a new user if email already exist", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Eric Ndungutse",
        email: "eric@example.com",
        password: "test12345",
        confirmPassword: "test12345",
      });

      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("is taken");
    });

    // User signed up without name
    it("should not signup a new user if name is missing", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        email: "bwiza@example.com",
        password: "test12345",
        confirmPassword: "twst12345",
      });
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("Provide your full name.");
    });

    // User signed up without email
    it("should not signup a new user if email is missing", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Bwiza Deborah",
        password: "test12345",
        confirmPassword: "twst12345",
      });
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("A valid working email is required");
    });

    // User signed up without password
    it("should not signup a new user if password is missing", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Bwiza Deborah",
        email: "bwiza@example.com",
        confirmPassword: "twst12345",
      });
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("Password is required");
    });

    // User signed up without password confirmPassword
    it("should not signup a new user if confirm password is missing", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Bwiza Deborah",
        email: "bwiza@example.com",
        password: "twst12345",
      });
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("Confirm password is required");
    });

    // User signed up with invalid password
    it("should not signup a new user if password is invalid", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Bwiza Deborah",
        email: "bwiza@example.com",
        password: "twst1",
        confirmPassword: "twst1",
      });

      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain(
        "Password must be 8 or more characters."
      );
    });

    // User signed up with unmatching password
    it("should signup a new user", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Bwiza Deborah",
        email: "bwiza@example.com",
        password: "test12345",
        confirmPassword: "twst1234577",
      });

      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("Passwords do not match");
    });
  });

  describe("*********** User Login ***********", () => {
    // User sign in successfully
    it("should sigin a new user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "eric@example.com",
        password: "test12345",
      });
      expect(res.body.status).toBe("success");
      expect(res.body.data.user.name).toContain("Eric Ndungutse");
    });

    // User sign in with wrong password
    it("should not sigin a user with wrong password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "eric@example.com",
        password: "test12345rtf",
      });
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("Email or password is incorrect");
    });

    // User sign in with unregistered email
    it("should not sigin a user with unregistered user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "eeeee@example.com",
        password: "test12345",
      });
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toContain("Email or password is incorrect");
    });
  });
});
