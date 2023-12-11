import supertest, { SuperTest, Test } from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import { testConnectionString } from "../test-utils";
import bcrypt from "bcrypt";

const url = "/api/v1/articles";

describe(`${url}`, () => {
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    require("dotenv").config();

    await mongoose.connect(testConnectionString);

    agent = await supertest(app);

    await agent
      .post("/api/v1/user/signup")
      .set("Content-Type", "application/json")
      .send({
        username: "user",
        firstName: "User",
        lastName: "Useroff",
        password: "123123",
      });
  });

  afterAll((done) => {
    mongoose.connection.dropDatabase().then(() => {
      mongoose.connection.close();
      done();
    });
  });

  test("should fetch articles as empty array when there are none", async () => {
    const test = await agent.get(url).expect(200);

    expect(test.body.message).toBe("Articles");
    expect(test.body.data).toStrictEqual([]);
    expect(test.body.code).toBe(200);
  });

  test("should create article when data is valid", async () => {
    const req = await agent
      .post("/api/v1/user/signin")
      .set("Content-Type", "application/json")
      .send({ username: "user", password: "123123" });

    const cookies = req.headers["set-cookie"];
    await agent
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        title: "Test title",
        content: "Test content",
      })
      .set("Cookie", cookies)
      .expect(201);

    const test = await supertest(app).get(url).expect(200);

    expect(test.body.message).toBe("Articles");
    expect(test.body.data).toHaveLength(1);
    expect(test.body.code).toBe(200);
  });
});
