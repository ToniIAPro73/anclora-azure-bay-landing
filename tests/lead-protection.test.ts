import { beforeEach, describe, expect, it } from "vitest";
import {
  __resetLeadSubmissionCacheForTests,
  checkAndRecordLeadSubmission,
  createLeadFingerprint,
  isHoneypotTriggered,
} from "../lib/lead-protection";

describe("lead protection", () => {
  beforeEach(() => {
    __resetLeadSubmissionCacheForTests();
  });

  it("detects honeypot values", () => {
    expect(isHoneypotTriggered("https://spam.example")).toBe(true);
    expect(isHoneypotTriggered("   ")).toBe(false);
    expect(isHoneypotTriggered(undefined)).toBe(false);
  });

  it("creates stable fingerprints", () => {
    const first = createLeadFingerprint({
      email: "Lead@Example.com",
      firstName: " Ana ",
      lastName: " MARTIN",
      ipAddress: "203.0.113.10",
      userAgent: "Agent/1.0",
    });

    const second = createLeadFingerprint({
      email: "lead@example.com",
      firstName: "ana",
      lastName: "martin",
      ipAddress: "203.0.113.10",
      userAgent: "agent/1.0",
    });

    expect(first).toBe(second);
  });

  it("rejects duplicate submissions within window", () => {
    const fingerprint = createLeadFingerprint({
      email: "lead@example.com",
      firstName: "Ana",
      lastName: "Martin",
      ipAddress: "203.0.113.10",
      userAgent: "Agent/1.0",
    });

    const now = Date.now();
    expect(checkAndRecordLeadSubmission(fingerprint, now, 30_000)).toBe(false);
    expect(checkAndRecordLeadSubmission(fingerprint, now + 10_000, 30_000)).toBe(
      true,
    );
    expect(checkAndRecordLeadSubmission(fingerprint, now + 31_000, 30_000)).toBe(
      false,
    );
  });
});
