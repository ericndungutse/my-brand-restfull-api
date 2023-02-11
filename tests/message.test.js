const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../model/user.model");
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

describe("Messege CRUD", () => {
  // Nessage created
  it("should create message", async () => {
    const msg = await request(app).post("/api/messages").send({
      name: "Eric Ndungutse",
      email: "eric@example.com",
      message: "message",
    });
    expect(msg.body.status).toBe("success");
  });

  // Name is missing
  it("should not create message if name is missing", async () => {
    const msg = await request(app).post("/api/messages").send({
      email: "eric@example.com",
      message: "message",
    });
    expect(msg.body.message).toContain("Provide your full name.");
  }, 20000);

  // Email is missing
  it("should not create message if email is missing", async () => {
    const msg = await request(app).post("/api/messages").send({
      name: "Eric Ndungutse",
      message: "message",
    });
    expect(msg.body.message).toContain("A valid working email is required");
  }, 20000);

  // Message missing
  it("should not create message if message is missing", async () => {
    const msg = await request(app).post("/api/messages").send({
      email: "eric@example.com",
      name: "Eric Ndungutse",
    });
    expect(msg.body.message).toContain("Message is required");
  }, 20000);

  // Get messages
  describe("Message CRUD: Get All Messages", () => {
    let token;

    // With admin role
    describe("Get with Admin role", () => {
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

      // Get all messages
      it("should return all messages with admin role", async () => {
        const msg = await request(app)
          .get("/api/messages")
          .set("Authorization", "Bearer " + token);

        expect(msg.body.status).toBe("success");
      }, 20000);

      // With modified token
      it("should return all messages with admin role", async () => {
        const msg = await request(app)
          .get("/api/messages")
          .set("Authorization", "Bearer " + token + "tw6");

        expect(msg.body.message).toContain("Invalid login session");
      }, 20000);

      // Get message by ID with Admin role
      it("should return message by id with admin role", async () => {
        const msg = await request(app)
          .get("/api/messages/63dc208c37dedf2e543866a6")
          .set("Authorization", "Bearer " + token);

        expect(msg.body.status).toContain("success");
      }, 20000);
    });

    describe("Get Messages with user nolonger existing", () => {
      let token;

      beforeAll(async () => {
        process.env.JWT_SECRET = "secret-for-testing";
        process.env.JWT_EXPIRES_IN = "1d";
        const res = await request(app).post("/api/auth/signup").send({
          name: "Jado",
          email: "jado@example.com",
          password: "test12345",
          confirmPassword: "test12345",
          role: "admin",
        });

        token = res.body.token;
      });

      afterAll(() => {
        process.env.JWT_SECRET = undefined;
        process.env.JWT_EXPIRES_IN = undefined;
      });

      // With user no longer existing in db
      it("should not return all messages if user no longer exists", async () => {
        await User.deleteOne({ email: "jado@example.com" });
        const res = await request(app)
          .get("/api/messages")
          .set("Authorization", "Bearer " + token);

        expect(res.body.message).toContain("User no longer exist!");
      });
    });

    // With user role
    describe("Get with user role", () => {
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

      // Get all message with user role
      it("should not return all messages with user role", async () => {
        const msg = await request(app)
          .get("/api/messages")
          .set("Authorization", "Bearer " + token);

        expect(msg.body.message).toContain(
          "You do not have permission to perform this action"
        );
      }, 20000);

      // Get message by ID with user role
      it("should not return message with user role", async () => {
        const msg = await request(app)
          .get("/api/messages/63d96863194b1c076e9de06c")
          .set("Authorization", "Bearer " + token);

        expect(msg.body.message).toContain(
          "You do not have permission to perform this action"
        );
      }, 20000);
    });
  });
});
