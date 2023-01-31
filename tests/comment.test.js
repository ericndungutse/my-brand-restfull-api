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

describe("Comment CRUD", () => {
  //   // Comment created
  //   it("should create comment", async () => {
  //     const cmt = await request(app).post("/api/comments").send({
  //       blog: "",
  //       comment: "comment",
  //     });
  //     expect(cmt.body.status).toBe("success");
  //   });

  //   // Blog is missing
  //   it("should not create comment if blog is missing", async () => {
  //     const cmt = await request(app).post("/api/comments").send({
  //       comment: "comment",
  //     });
  //     expect(cmt.body.status).toBe("fail");
  //   });

  //   // Comment is missing
  //   it("should not create comment if comment is missing", async () => {
  //     const cmt = await request(app).post("/api/comments").send({
  //       blog: "",
  //     });
  //     expect(cmt.body.status).toBe("fail");
  //   });

  // Get all comments
  it("should return all comments", async () => {
    const cmt = await request(app).get("/api/comments");
    expect(cmt.body.status).toBe("success");
  });
});
