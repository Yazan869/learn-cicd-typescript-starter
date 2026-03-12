import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns the API key when a valid Authorization header is present", () => {
    const headers = {
      authorization: "ApiKey my-secret-key-123",
    };
    expect(getAPIKey(headers)).toBe("my-secret-key-123");
  });

  test("returns null when no Authorization header is present", () => {
    const headers = {};
    const result = getAPIKey(headers);
    // Since the function returns null, we must expect null
    expect(result).toBeNull();
  });

  test("returns null when the header is malformed (missing ApiKey prefix)", () => {
    const headers = {
      authorization: "Bearer some-token",
    };
    const result = getAPIKey(headers);
    // Since the function returns null, we must expect null
    expect(result).toBeNull();
  });
});
