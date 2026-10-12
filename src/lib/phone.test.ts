import { describe, expect, it } from "vitest";
import { normalizeSpanishPhone } from "./phone";

describe("normalizeSpanishPhone", () => {
  it.each([
    ["612 345 678", "612345678"],
    ["612.345.678", "612345678"],
    ["+34 612-345-678", "612345678"],
    ["34612345678", "612345678"],
    ["900123456", "900123456"],
  ])("acepta %s", (input, expected) => {
    expect(normalizeSpanishPhone(input)).toBe(expected);
  });

  it.each(["12345678", "512345678", "6123456789", "612 345 67a", "", "+44 612345678"])("rechaza %j", (input) => {
    expect(normalizeSpanishPhone(input)).toBeNull();
  });
});
