const request = require("supertest");
const app = require("../app");

describe("Uhandled Routes", () => {
  it("should not return an resource", async () => {
    const res = await request(app).get("/api/auth/bkjbs");

    expect(res.body.message).toContain("on this server");
  });
});
