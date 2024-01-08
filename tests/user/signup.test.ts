import supertest, { SuperTest, Test } from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { initTestDataSource } from "../test-utils";
import { User } from "../../src/features/user/user-entity";
import * as config from "../../src/config/get-config";

const url = "/api/v1/user/signup";
let db: DataSource;

describe(`${url}`, () => {
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    db = await initTestDataSource();
    agent = supertest(app);
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

  test("should sign up successfully when user data is valid", async () => {
    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        username: `john1`,
        firstName: "John",
        lastName: "Johnson",
        password: "123123",
      })
      .expect(201);

    expect(test.body.message).toBe("Sign up successful");
    expect(test.body.data).toBeTruthy();
    expect(test.body.code).toBe(201);
  });

  test("should fail to sign up when password is invalid", async () => {
    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        username: `john`,
        firstName: "John",
        lastName: "Johnson",
        password: "123%  123",
      })
      .expect(400);

    expect(test.body.message).toBe("Sign up failed");
    expect(test.body.data).toBe(null);
    expect(test.body.code).toBe(400);
  });

  test("should fail to sign up when username is invalid", async () => {
    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        username: "john asda s a",
        firstName: "John",
        lastName: "Johnson",
        password: "123123",
      })
      .expect(400);

    expect(test.body.message).toBe('"username" must only contain alpha-numeric characters');
    expect(test.body.data).toBe(null);
    expect(test.body.code).toBe(400);
  });

  test("should fail to sign up when username is not unique", async () => {
    await agent.post(url).set("Content-Type", "application/json").send({
      username: "bob",
      firstName: "John",
      lastName: "Johnson",
      password: "123123",
    });

    const test = await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        username: "bob",
        firstName: "John",
        lastName: "Johnson",
        password: "123123",
      })
      .expect(400);

    expect(test.body.message).toBe("Sign up failed");
    expect(test.body.data).toBe(null);
    expect(test.body.code).toBe(400);
  });
});
