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

describe("******** CRUD BLOG TESTS ********", () => {
  // With Authenticated users
  describe("Authintcated blog CRUD operations", () => {
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

    describe("Create Blog", () => {
      let blogId;

      afterAll(async () => {
        const res = await request(app)
          .delete(`/api/blogs/${blogId}`)
          .set("Authorization", "Bearer " + token);
      });

      // Success
      it("should create blog", async () => {
        const res = await request(app)
          .post("/api/blogs")
          .set("Authorization", "Bearer " + token)
          .send({
            title: "CSS Flex",
            text: "CSS flex lays out elements well.",
            photo: "path",
          });

        blogId = res.body.data.blog._id;

        expect(res.body.status).toBe("success");
      });

      // No user
      it("should not create blog if no user signed in", async () => {
        const res = await request(app).post("/api/blogs").send({
          title: "CSS Flex",
          text: "CSS flex lays out elements well.",
          photo: "path",
        });

        expect(res.body.message).toContain("not logged");
      });

      // No title
      it("should not create blog if title is missing", async () => {
        const res = await request(app)
          .post("/api/blogs")
          .set("Authorization", "Bearer " + token)
          .send({
            text: "CSS flex lays out elements well.",
            photo: "path",
          });

        expect(res.body.message).toContain("A blog should have a title");
      });
    });

    describe("Update Blog", () => {
      let blogId;
      beforeAll(async () => {
        const res = await request(app)
          .post("/api/blogs")
          .set("Authorization", "Bearer " + token)
          .send({
            title: "HTML 5",
            text: "New Version of HTML.",
            photo: "path",
          });

        blogId = res.body.data.blog._id;
      });

      afterAll(async () => {
        const res = await request(app)
          .delete(`/api/blogs/${blogId}`)
          .set("Authorization", "Bearer " + token);
      });

      // Valid ID
      it("should update blog", async () => {
        const res = await request(app)
          .patch(`/api/blogs/${blogId}`)
          .set("Authorization", "Bearer " + token)
          .send({
            title: "CSS Flex Tech",
          });

        expect(res.body.data.blog.title).toContain("CSS Flex Tech");
      });

      // Invalid ID
      it("should not update blog if id is invalid", async () => {
        const res = await request(app)
          .patch(`/api/blogs/neojie`)
          .set("Authorization", "Bearer " + token)
          .send({
            title: "CSS Flex Tech",
          });

        expect(res.body.message).toContain("Invalid");
      });
    });

    describe("Delete Blog", () => {
      let blogId;
      beforeAll(async () => {
        const res = await request(app)
          .post("/api/blogs")
          .set("Authorization", "Bearer " + token)
          .send({
            title: "CSS Flex",
            text: "CSS flex lays out elements well.",
            photo: "path",
          });

        blogId = res.body.data.blog._id;
      });

      // Valid Id
      it("should delete blog", async () => {
        const res = await request(app)
          .delete(`/api/blogs/${blogId}`)
          .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(204);
      });

      // Invalid ID
      it("should not delete blog if id is invalid", async () => {
        const res = await request(app)
          .delete(`/api/blogs/45yur`)
          .set("Authorization", "Bearer " + token);

        expect(res.body.message).toContain("Invalid");
      });
    });
  });

  // Getting All Blogs
  test("---- Should return all blogs ----", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.body.status).toBe("success");
  });

  // Getting Comments on blog
  it("---- should return comments of blog with route /blogs/blogId/comments ----", async () => {
    const res = await request(app).get(
      "/api/blogs/63da1d145a3fda140ea0be4b/comments"
    );
    expect(res.body.status).toBe("success");
  });

  // Getting Comments on blog with invalid ID
  it("---- should not return comments of blog with invalid id ----", async () => {
    const res = await request(app).get("/api/blogs/63da1d/comments");
    expect(res.body.status).toBe("fail");
  });

  // Getting likes on blog
  it("---- should return likes of blog with route /blogs/blogId/likes ----", async () => {
    const res = await request(app).get(
      "/api/blogs/63da1d145a3fda140ea0be4b/likes"
    );
    expect(res.body.status).toBe("success");
  });

  // Getting likes on blog with invalid id
  it("---- should not return likes of blog with invalid id ----", async () => {
    const res = await request(app).get("/api/blogs/63da1d1/likes");
    expect(res.body.status).toBe("fail");
  });

  // Getting a single blog
  test("---- Should return single blog ----", async () => {
    const res = await request(app).get("/api/blogs/63da1d145a3fda140ea0be4b");
    expect(res.body.status).toBe("success");
    expect(res.body.data.blog._id).toBe("63da1d145a3fda140ea0be4b");
  });

  // Getting a single blog with umatching id
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
