const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/eric_ndungutse_test");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("CRUD Blog Test", () => {
  // Creating New Blog
  test("Should create a blog", async () => {
    const res = await request(app).post("/api/blogs").send({
      title: "New Blog",
    });

    expect(res.body.status).toBe("fail");
  }, 50000);

  // Getting All Blogs
  test("Should return all blogs", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.body.status).toBe("success");
  });

  // Getting a single blog
  test("Should return single blogs", async () => {
    const res = await request(app).get("/api/blogs/63d3e1635d04138e68e53c90");
    expect(res.body.status).toBe("success");
    expect(res.body.data.blog._id).toBe("63d3e1635d04138e68e53c90");
  });
});
