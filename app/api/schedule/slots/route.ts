import { NextResponse } from 'next/server';
import { findAvailableSlots } from '@/lib/google-calendar';
import { doctors, MAX_SLOTS_RETURNED } from '@/lib/doctors';
import { acquireLocks, isLockedByOther } from '@/lib/slot-locks';

const FALLBACK_SLOTS = [
  { value: 'Amanhã, 08:00', isoStart: '', isoEnd: '', doctor: 'Médico Theracorp', crm: '', specialty: 'Clínico Geral', note: 'Teleconsulta via Theracorp' },
  { value: 'Amanhã, 08:30', isoStart: '', isoEnd: '', doctor: 'Médico Theracorp', crm: '', specialty: 'Clínico Geral', note: 'Teleconsulta via Theracorp' },
  { value: 'Amanhã, 09:00', isoStart: '', isoEnd: '', doctor: 'Médico Theracorp', crm: '', specialty: 'Clínico Geral', note: 'Teleconsulta via Theracorp' },
];

export async function GET() {
  const credentialsConfigured =
    !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
    !!process.env.GOOGLE_CALENDAR_MAIN;

  if (!credentialsConfigured) {
    return NextResponse.json({ slots: FALLBACK_SLOTS, source: 'fallback' });
  }

  try {
    const doctor = doctors.find((d) => d.calendarId);
    if (!doctor?.calendarId) {
      return NextResponse.json({ slots: FALLBACK_SLOTS, source: 'fallback' });
    }

    const slots = await findAvailableSlots(doctors);
    if (slots.length === 0) {
      return NextResponse.json({ slots: FALLBACK_SLOTS, source: 'fallback' });
    }

    // Filter out slots already reserved by another active session
    const available = slots
      .filter((s) => s.isoStart && !isLockedByOther(doctor.calendarId, s.isoStart))
      .slice(0, MAX_SLOTS_RETURNED);

    if (available.length === 0) {
      return NextResponse.json({ slots: FALLBACK_SLOTS, source: 'fallback' });
    }

    // Reserve these slots for this session (15-minute TTL)
    const { lockId } = acquireLocks(
      doctor.calendarId,
      available.map((s) => s.isoStart),
    );

    return NextResponse.json({ slots: available, lockId, source: 'google_calendar' });
  } catch (err) {
    console.error('[schedule/slots]', err);
    return NextResponse.json({ slots: FALLBACK_SLOTS, source: 'fallback' });
  }
}
