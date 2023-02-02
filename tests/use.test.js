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

describe("USER", () => {
  describe("Update User Data", () => {
    let token;
    beforeAll(async () => {
      process.env.JWT_SECRET = "secret-for-testing";
      process.env.JWT_EXPIRES_IN = "1d";
      const res = await request(app).post("/api/auth/login").send({
        email: "eric@example.com",
        password: "test12345",
      });

      token = res.body.token;
    });

    afterAll(() => {
      process.env.JWT_SECRET = undefined;
      process.env.JWT_EXPIRES_IN = undefined;
    });

    // Success update
    it("should update user data", async () => {
      const res = await request(app)
        .patch(`/api/users/updateMe`)
        .set("Authorization", "Bearer " + token)
        .send({
          name: "Eric Ndungutse",
        });

      expect(res.body.status).toContain("success");
    });

    // Get All Users
    it("should return all users", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer " + token);

      expect(res.body.status).toBe("success");
    });
  });
});
