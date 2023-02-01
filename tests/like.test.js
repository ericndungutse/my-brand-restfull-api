const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

/* Connecting to the database before each test. */
beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://localhost:27017/eric_ndungutse_test");
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Like CRUD", () => {
  describe("CREATE", () => {
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

    // Like created
    it("should create like", async () => {
      const like = await request(app)
        .post("/api/likes")
        .set("Authorization", "Bearer " + token)
        .send({
          blog: "63da1d145a3fda140ea0be4b",
        });
      expect(like.body.status).toBe("success");
    });

    // Blog is missing
    it("should not create like if blog is missing", async () => {
      const like = await request(app)
        .post("/api/likes")
        .set("Authorization", "Bearer " + token)
        .send({});
      expect(like.body.status).toBe("fail");
    });
  });

  // Get all likes
  it("should return all likes", async () => {
    const likes = await request(app).get("/api/likes");
    console.log(likes);
    expect(likes.body.status).toBe("success");
  });
});
