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

console.log("\n");
describe("******** CRUD BLOG TESTS ********", () => {
  // Getting All Blogs
  test("---- Should return all blogs ----", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.body.status).toBe("success");
  });

  // Getting a single blog
  // test("---- Should return single blog ----", async () => {
  //   const res = await request(app).get("/api/blogs/63d3e1635d04138e68e53c90");
  //   expect(res.body.status).toBe("success");
  //   expect(res.body.data.blog._id).toBe("63d3e1635d04138e68e53c90");
  // });

  // Getting Comments on blog
  it("---- should return comments of blog with route /blogs/blogId/comments ----", async () => {
    const res = await request(app).get(
      "/api/blogs/63d3e1635d04138e68e53c90/comments"
    );
    expect(res.body.status).toBe("success");
  });

  // Getting likes on blog
  it("---- should return comments of blog with route /blogs/blogId/likes ----", async () => {
    const res = await request(app).get(
      "/api/blogs/63d3e1635d04138e68e53c90/likes"
    );
    expect(res.body.status).toBe("success");
  });

  // Getting a single blog
  test("---- Should return no blog if id provided matches no blog ----", async () => {
    const res = await request(app).get("/api/blogs/63d3e1635d04138e68e53c91");
    expect(res.body.message).toContain("Blog not found");
  }, 10000);

  // Invalid blog id
  test("---- Should return error if blog id is invalid ----", async () => {
    const res = await request(app).get("/api/blogs/63d3e105138e68 ");
    expect(res.body.message).toContain("Invalid");
  }, 10000);
});
