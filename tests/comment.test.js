const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { db } = require("./test.db.js");

/* Connecting to the database before each test. */
beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(`${db}`);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Comment CRUD", () => {
  describe("Create Comment", () => {
    let token;

    beforeAll(async () => {
      process.env.JWT_SECRET = "secret-for-testing";
      process.env.JWT_EXPIRES_IN = "1d";
      const res = await request(app).post("/api/auth/login").send({
        email: "bwiza@example.com",
        password: "test12345",
      });

      token = res.body.token;
    });

    afterAll(() => {
      process.env.JWT_SECRET = undefined;
      process.env.JWT_EXPIRES_IN = undefined;
    });

    // Comment created
    it("should create comment", async () => {
      const cmt = await request(app)
        .post("/api/comments")
        .set("Authorization", "Bearer " + token)
        .send({
          blog: "63da1d145a3fda140ea0be4b",
          comment: "comment",
        });

      expect(cmt.body.status).toBe("success");
    }, 20000);

    // Blog is missing
    it("should not create comment if blog is missing", async () => {
      const cmt = await request(app)
        .post("/api/comments")
        .set("Authorization", "Bearer " + token)
        .send({
          comment: "comment",
        });
      expect(cmt.body.status).toBe("fail");
    }, 20000);

    // Comment is missing
    it("should not create comment if comment is missing", async () => {
      const cmt = await request(app)
        .post("/api/comments")
        .set("Authorization", "Bearer " + token)
        .send({
          blog: "63da1d145a3fda140ea0be4b",
        });
      expect(cmt.body.status).toBe("fail");
    }, 20000);
  });

  // Get all comments
  it("should return all comments", async () => {
    const cmt = await request(app).get("/api/comments");
    expect(cmt.body.status).toBe("success");
  }, 20000);
});
