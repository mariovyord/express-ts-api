import supertest from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import { testConnectionString } from "../test-utils";

const url = "/api/v1/articles";

describe(`${url}`, () => {
  beforeAll(async () => {
    await mongoose.connect(testConnectionString);
  });

  afterAll((done) => {
    mongoose.connection.dropDatabase().then(() => {
      mongoose.connection.close();
      done();
    });
  });

  test("should fetch articles as empty array when there are none", async () => {
    const test = await supertest(app).get(url).expect(200);

    expect(test.body.message).toBe("Articles");
    expect(test.body.data).toStrictEqual([]);
    expect(test.body.code).toBe(200);
  });
});
