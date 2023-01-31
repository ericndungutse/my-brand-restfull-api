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
  // // Like created
  // it('should create like', async ()=>{
  // const like = await request(app).post('/api/likes').send({
  // blog:''})
  // expect(like.body.status).toBe('success')
  // })

  // // Blog is missing
  // it('should not create like if blog is missing', async ()=>{
  // const like = await request(app).post('/api/likes').send({})
  // expect(like.body.status).toBe('fail')
  // })

  // Get all likes
  it("should return all likes", async () => {
    const likes = await request(app).get("/api/likes");
    expect(likes.body.status).toBe("success");
  });
});
