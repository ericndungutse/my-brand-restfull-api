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
  });

  // Email is missing
  it("should not create message if email is missing", async () => {
    const msg = await request(app).post("/api/messages").send({
      name: "Eric Ndungutse",
      message: "message",
    });
    expect(msg.body.message).toContain("A valid working email is required");
  });

  // Message missing
  it("should not create message if message is missing", async () => {
    const msg = await request(app).post("/api/messages").send({
      email: "eric@example.com",
      name: "Eric Ndungutse",
    });
    expect(msg.body.message).toContain("Message is required");
  });

  // Get all messages
  //   it("should return all messages", async () => {
  //     const msg = await request(app).get("/api/messages");
  //     expect(msg.body.status).toBe("success");
  //   });
});
