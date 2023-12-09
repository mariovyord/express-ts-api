const supertest = require("supertest");
const app = require("../src/app");

describe("Test the root path", () => {
  test("Wrong url returns 404 and a message", async () => {
    const test = await supertest(app).get("/asdasdc1").expect(404);

    expect(test.body.message).toBe("Path not found");
  });
});
