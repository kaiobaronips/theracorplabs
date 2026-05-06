import { randomUUID } from 'crypto';

interface Lock {
  lockId: string;
  lockedUntil: number;
}

// In-process store — sufficient for single-server / local dev.
// For multi-instance deployments, replace with Redis or similar.
const store = new Map<string, Lock>();

const TTL_MS = 15 * 60 * 1000; // 15 minutes

function key(calendarId: string, isoStart: string) {
  return `${calendarId}::${isoStart}`;
}

function pruneExpired() {
  const now = Date.now();
  for (const [k, v] of store.entries()) {
    if (v.lockedUntil < now) store.delete(k);
  }
}

/**
 * Try to lock all given slot starts under a single lockId.
 * Skips slots already locked by another lockId.
 * Returns the lockId and which starts were actually locked.
 */
export function acquireLocks(
  calendarId: string,
  isoStarts: string[],
): { lockId: string; locked: string[] } {
  pruneExpired();
  const lockId = randomUUID();
  const lockedUntil = Date.now() + TTL_MS;
  const locked: string[] = [];

  for (const isoStart of isoStarts) {
    const k = key(calendarId, isoStart);
    const existing = store.get(k);
    if (!existing || existing.lockedUntil < Date.now()) {
      store.set(k, { lockId, lockedUntil });
      locked.push(isoStart);
    }
  }

  return { lockId, locked };
}

/** Returns true if the slot is locked by a DIFFERENT session. */
export function isLockedByOther(
  calendarId: string,
  isoStart: string,
  ownLockId?: string,
): boolean {
  pruneExpired();
  const lock = store.get(key(calendarId, isoStart));
  if (!lock || lock.lockedUntil < Date.now()) return false;
  return lock.lockId !== ownLockId;
}

/**
 * Confirm that lockId owns the slot, then release ALL locks for that lockId.
 * Returns { valid, otherSlots } where otherSlots are the isoStarts that were
 * locked under the same lockId but NOT the chosen one — used for cleanup.
 */
export function confirmAndRelease(
  calendarId: string,
  isoStart: string,
  lockId: string,
): { valid: boolean; otherSlots: string[] } {
  pruneExpired();
  const lock = store.get(key(calendarId, isoStart));
  const valid = !!lock && lock.lockId === lockId && lock.lockedUntil >= Date.now();

  const prefix = `${calendarId}::`;
  const otherSlots: string[] = [];
  for (const [k, v] of store.entries()) {
    if (v.lockId === lockId) {
      const slotIso = k.startsWith(prefix) ? k.slice(prefix.length) : '';
      if (slotIso && slotIso !== isoStart) otherSlots.push(slotIso);
      store.delete(k);
    }
  }

  return { valid, otherSlots };
}
