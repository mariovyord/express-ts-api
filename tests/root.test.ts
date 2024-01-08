import supertest from "supertest";
import app from "../src/app";
import { initTestDataSource } from "./test-utils";
import { DataSource } from "typeorm";

let db: DataSource;

describe("root", () => {
  beforeAll(async () => {
    db = await initTestDataSource();
  });

  afterAll((done) => {
    db.dropDatabase().then(() => {
      db.destroy();
      done();
    });
  });
  test("should return 404 and a message when url does not exist", async () => {
    const test = await supertest(app).get("/asdasdc1").expect(404);

    expect(test.body.message).toBe("Not found");
  });
});
