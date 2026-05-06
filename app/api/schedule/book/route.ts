import { NextRequest, NextResponse } from 'next/server';
import { createBooking, isSlotStillFree, deleteTestEventsAtSlots } from '@/lib/google-calendar';
import { doctors } from '@/lib/doctors';
import { confirmAndRelease } from '@/lib/slot-locks';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.isoStart || !body?.isoEnd || !body?.name || !body?.email) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  }

  const { isoStart, isoEnd, name, email, phone = '', lockId = '' } = body as {
    isoStart: string;
    isoEnd: string;
    name: string;
    email: string;
    phone?: string;
    lockId?: string;
  };

  const doctor = doctors.find((d) => d.calendarId);
  if (!doctor?.calendarId) {
    return NextResponse.json({ error: 'calendar_not_configured' }, { status: 503 });
  }

  // Verify the session still owns this slot (lock may have expired after 15 min)
  let otherLockedSlots: string[] = [];
  if (lockId) {
    const { valid, otherSlots } = confirmAndRelease(doctor.calendarId, isoStart, lockId);
    if (!valid) {
      return NextResponse.json({ error: 'slot_lock_expired' }, { status: 409 });
    }
    otherLockedSlots = otherSlots;
  }

  // Final freebusy check — prevents race conditions even without lockId
  try {
    const free = await isSlotStillFree(doctor.calendarId, isoStart, isoEnd);
    if (!free) {
      return NextResponse.json({ error: 'slot_unavailable' }, { status: 409 });
    }
  } catch {
    // If freebusy check fails, proceed anyway to not block the user
  }

  try {
    const result = await createBooking(
      doctor.calendarId,
      isoStart,
      isoEnd,
      name,
      email,
      phone,
    );

    // Fire-and-forget: delete any test/duplicate Theracorp events at the
    // other slots that were locked but not chosen by this session.
    if (otherLockedSlots.length > 0) {
      deleteTestEventsAtSlots(doctor.calendarId, otherLockedSlots).catch((err) => {
        console.error('[schedule/book] cleanup error', err);
      });
    }

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[schedule/book]', err);
    return NextResponse.json({ error: 'booking_failed' }, { status: 500 });
  }
}
