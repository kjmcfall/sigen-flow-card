import { test } from "node:test";
import assert from "node:assert/strict";
import { getPeriodRange, stepPeriod } from "../src/data.ts";

test("getPeriodRange: day is midnight to midnight, bucketed hourly", () => {
  const anchor = new Date(2026, 8, 15, 14, 30); // Sep 15 2026, 14:30 local
  const { start, end, bucket } = getPeriodRange("day", anchor, 1);
  assert.equal(start.getHours(), 0);
  assert.equal(start.getDate(), 15);
  assert.equal(end.getDate(), 16);
  assert.equal(bucket, "hour");
});

test("getPeriodRange: week starts on Monday when week_start=1", () => {
  // Sep 15 2026 is a Tuesday.
  const anchor = new Date(2026, 8, 15, 14, 30);
  const { start, end, bucket } = getPeriodRange("week", anchor, 1);
  assert.equal(start.getDay(), 1); // Monday
  assert.equal(start.getDate(), 14);
  assert.equal(end.getDate(), 21);
  assert.equal(bucket, "day");
});

test("getPeriodRange: month covers 1st through end of month, bucketed daily", () => {
  const anchor = new Date(2026, 8, 15);
  const { start, end, bucket } = getPeriodRange("month", anchor, 1);
  assert.equal(start.getDate(), 1);
  assert.equal(start.getMonth(), 8);
  assert.equal(end.getMonth(), 9);
  assert.equal(end.getDate(), 1);
  assert.equal(bucket, "day");
});

test("getPeriodRange: year covers Jan-Dec, bucketed monthly", () => {
  const anchor = new Date(2026, 8, 15);
  const { start, end, bucket } = getPeriodRange("year", anchor, 1);
  assert.equal(start.getMonth(), 0);
  assert.equal(start.getDate(), 1);
  assert.equal(end.getFullYear(), 2027);
  assert.equal(bucket, "month");
});

test("stepPeriod: steps a day forward and back", () => {
  const anchor = new Date(2026, 8, 15);
  const fwd = stepPeriod("day", anchor, 1);
  const back = stepPeriod("day", anchor, -1);
  assert.equal(fwd.getDate(), 16);
  assert.equal(back.getDate(), 14);
});

test("stepPeriod: steps a month forward across a year boundary", () => {
  const anchor = new Date(2026, 11, 15); // Dec 2026
  const fwd = stepPeriod("month", anchor, 1);
  assert.equal(fwd.getFullYear(), 2027);
  assert.equal(fwd.getMonth(), 0);
});
