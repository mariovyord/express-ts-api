import supertest, { SuperTest, Test } from "supertest";
import { DataSource } from "typeorm";
import app from "../src/app";
import { AppDataSource, getDbConfig } from "../src/config/db";
import { createDatabase } from "typeorm-extension";

const url = "/api/v1/user/signup";
let db: DataSource;

describe(`${url}`, () => {
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    await createDatabase({ options: getDbConfig(), ifNotExist: true });
    db = await AppDataSource.initialize();
    agent = supertest(app);
  });

  afterAll((done) => {
    db.dropDatabase().then(() => {
      db.destroy();
      done();
    });
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
});
