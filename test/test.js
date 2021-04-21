import request from "supertest";
import server from "../app";

describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(server)
      .get("/search")
      .then((res) => {
        console.log(res)
        expect(res.statusCode).toBe(200);
        done();
      })
  });
});

