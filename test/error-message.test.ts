import { test } from "node:test";
import assert from "node:assert/strict";
import { extractErrorMessage } from "../src/data.ts";

test("extractErrorMessage: real Error instances use .message", () => {
  assert.equal(extractErrorMessage(new Error("boom")), "boom");
});

test("extractErrorMessage: HA's hass.callWS() rejection shape ({code, message}) -- the actual bug", () => {
  // This is what hass.callWS() actually rejects with on a backend error --
  // NOT an Error instance. `String(err)` on this produces "[object Object]",
  // which is the bug a real user hit.
  const haWsError = { code: "invalid_format", message: "Invalid statistic_id" };
  assert.equal(extractErrorMessage(haWsError), "Invalid statistic_id (invalid_format)");
});

test("extractErrorMessage: object with only a code", () => {
  assert.equal(extractErrorMessage({ code: "not_found" }), "Error: not_found");
});

test("extractErrorMessage: falls back to JSON for an unrecognized object shape", () => {
  assert.equal(extractErrorMessage({ foo: "bar" }), '{"foo":"bar"}');
});

test("extractErrorMessage: plain strings and other primitives", () => {
  assert.equal(extractErrorMessage("plain string"), "plain string");
  assert.equal(extractErrorMessage(42), "42");
});
