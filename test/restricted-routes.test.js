import assert from "node:assert";
import test from "node:test";

import { app } from "../app.js";
import request from "supertest";

test("Restricted routes not accessible", async () => {
    const res = await request(app).post("/");
    const actual = res.status;
    const expected = 401;
    assert.strictEqual(
        actual,
        expected,
        "Restricted route did not return 401 status"
    );
});
