import supertest, { SuperTest, Test } from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { initTestDataSource } from "../test-utils";

const url = "/api/v1/user/signin";
let db: DataSource;

describe(`${url}`, () => {
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    db = await initTestDataSource();
    agent = supertest(app);

    // signup a user
    return await agent.post("/api/v1/user/signup").set("Content-Type", "application/json").send({
      username: "user",
      firstName: "User",
      lastName: "Useroff",
      password: "123123",
    });
  });

  afterAll((done) => {
    db.dropDatabase().then(() => {
      db.destroy();
      done();
    });
  });

  test("should return 4xx code when request body is empty", async () => {
    const test = await agent.post(url).expect(400);

    expect(test.body.message).toBe('"username" is required');
    expect(test.body.data).toBe(null);
    expect(test.body.code).toBe(400);
  });

  test("should signin with existing user when request body is valid", async () => {
    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({ username: "user", password: "123123" })
      .expect(200);

    expect(test.body.message).toBe("Sign in successful");
    expect(test.body.data).toBeTruthy();
    expect(test.body.code).toBe(200);
  });

  test("should fail to sign in when password do not match", async () => {
    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({ username: "user", password: "12c3123" })
      .expect(401);

    expect(test.body.message).toBe("Sign in failed");
    expect(test.body.data).toBe(null);
    expect(test.body.code).toBe(401);
  });

  test("should fail to sign in when username do not match", async () => {
    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({ username: "user1", password: "1c23123" })
      .expect(401);

    expect(test.body.message).toBe("Sign in failed");
    expect(test.body.data).toBe(null);
    expect(test.body.code).toBe(401);
  });
});
