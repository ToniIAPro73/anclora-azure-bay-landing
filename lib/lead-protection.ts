type LeadIdentity = {
  email: string;
  firstName: string;
  lastName: string;
  ipAddress?: string;
  userAgent?: string;
};

const recentLeadSubmissions = new Map<string, number>();
const DEFAULT_DEDUP_WINDOW_MS = 45_000;

const normalizeText = (value: string) => value.trim().toLowerCase();

const pruneExpiredEntries = (now: number, windowMs: number) => {
  for (const [key, timestamp] of recentLeadSubmissions.entries()) {
    if (now - timestamp > windowMs) {
      recentLeadSubmissions.delete(key);
    }
  }
};

export const isHoneypotTriggered = (value: string | null | undefined) =>
  Boolean(value && value.trim().length > 0);

export const createLeadFingerprint = ({
  email,
  firstName,
  lastName,
  ipAddress,
  userAgent,
}: LeadIdentity) => {
  const sanitizedIp = normalizeText(ipAddress ?? "unknown");
  const sanitizedUserAgent = normalizeText(userAgent ?? "unknown");

  return [
    normalizeText(email),
    normalizeText(firstName),
    normalizeText(lastName),
    sanitizedIp,
    sanitizedUserAgent,
  ].join("|");
};

export const checkAndRecordLeadSubmission = (
  fingerprint: string,
  now = Date.now(),
  windowMs = DEFAULT_DEDUP_WINDOW_MS,
) => {
  pruneExpiredEntries(now, windowMs);

  const lastSeen = recentLeadSubmissions.get(fingerprint);
  if (typeof lastSeen === "number" && now - lastSeen < windowMs) {
    return true;
  }

  recentLeadSubmissions.set(fingerprint, now);
  return false;
};

export const __resetLeadSubmissionCacheForTests = () => {
  recentLeadSubmissions.clear();
};
