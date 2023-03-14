import assert from "node:assert";
import test from "node:test";

import { app } from "../app.js";
import request from "supertest";

test("Special characters should be sanitized", async () => {
    const res = await request(app)
        .post("/api/v1/login")
        .send({ username: "<h1>test</h1>", password: "testing" });
    const actual = res.status;
    const expected = 400;
    assert.strictEqual(
        actual,
        expected,
        "Input including special characters did not result in a 400 status"
    );
});
