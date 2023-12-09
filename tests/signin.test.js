const supertest = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { testConnectionString } = require("./test.constants");

const url = "/api/user/signin";

describe("Test /signin", () => {
  beforeAll(async () => {
    return mongoose
      .connect(testConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        // signup a user
        return await supertest(app)
          .post("/api/user/signup")
          .set("Content-Type", "application/json")
          .send({
            username: "user",
            firstName: "User",
            lastName: "Useroff",
            password: "123123",
          });
      });
  });
  afterAll((done) => {
    mongoose.connection.dropDatabase().then(() => {
      mongoose.connection.close();
      done();
    });
  });

  test("/signin returns 4xx code and errors if body is empty", async () => {
    const test = await supertest(app).post(url).expect(401);

    expect(test.body.message).toBe("Sign in failed");
    expect(test.body).not.toHaveProperty("data");
    expect(test.body).toHaveProperty("errors");
  });

  test("successful signin with existing user", async () => {
    const test = await supertest(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send({ username: "user", password: "123123" })
      .expect(200);

    expect(test.body.message).toBe("Sign in successful");
    expect(test.body).toHaveProperty("data");
    expect(test.body).not.toHaveProperty("errors");
  });

  test("wrong password for existing user", async () => {
    const test = await supertest(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send({ username: "user", password: "12c3123" })
      .expect(401);

    expect(test.body.message).toBe("Sign in failed");
    expect(test.body).not.toHaveProperty("data");
    expect(test.body).toHaveProperty("errors");
  });

  test("wrong username", async () => {
    const test = await supertest(app)
      .post(url)
      .set("Content-Type", "application/json")
      .send({ username: "user1", password: "1c23123" })
      .expect(401);

    expect(test.body.message).toBe("Sign in failed");
    expect(test.body).not.toHaveProperty("data");
    expect(test.body).toHaveProperty("errors");
  });
});
