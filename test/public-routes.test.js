import assert from "node:assert";
import test from "node:test";

import { app } from "../app.js";
import request from "supertest";

test("Public routes accessible", async () => {
    const res = await request(app).get("/");
    const actual = res.status;
    const expected = 200;
    assert.strictEqual(
        actual,
        expected,
        "The homepage route was not accessible"
    );
});
