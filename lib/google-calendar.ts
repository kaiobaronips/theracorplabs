import { google } from 'googleapis';
import {
  Doctor,
  SLOT_DURATION_MINUTES,
  WORKING_HOURS_START,
  WORKING_HOURS_END,
  SEARCH_DAYS_AHEAD,
  MAX_SLOTS_RETURNED,
} from './doctors';

export interface AvailableSlot {
  value: string;       // "Hoje, 18:30"
  isoStart: string;    // ISO 8601
  isoEnd: string;
  doctor: string;
  crm: string;
  specialty: string;
  note: string;
}

export interface BookingResult {
  eventId: string;
  htmlLink: string;
  summary: string;
}

function getCalendarClient(readonly = true) {
  const email  = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) throw new Error('Google Calendar credentials not configured.');

  const auth = new google.auth.JWT({
    email,
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: [
      readonly
        ? 'https://www.googleapis.com/auth/calendar.readonly'
        : 'https://www.googleapis.com/auth/calendar',
    ],
  });
  return google.calendar({ version: 'v3', auth });
}

async function getBusyPeriods(
  calendarId: string,
  timeMin: Date,
  timeMax: Date,
): Promise<{ start: Date; end: Date }[]> {
  const cal = getCalendarClient(true);
  const { data } = await cal.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: 'America/Sao_Paulo',
      items: [{ id: calendarId }],
    },
  });

  return (data.calendars?.[calendarId]?.busy ?? [])
    .filter((p) => p.start && p.end)
    .map((p) => ({ start: new Date(p.start!), end: new Date(p.end!) }));
}

function overlaps(start: Date, end: Date, busy: { start: Date; end: Date }[]): boolean {
  return busy.some((b) => start < b.end && end > b.start);
}

function inWorkingHours(date: Date): boolean {
  const brtHour = ((date.getUTCHours() - 3) + 24) % 24;
  return brtHour >= WORKING_HOURS_START && brtHour < WORKING_HOURS_END;
}

function formatLabel(date: Date, now: Date): string {
  const brtHour = ((date.getUTCHours() - 3) + 24) % 24;
  const brtMin  = date.getUTCMinutes();
  const pad = (n: number) => String(n).padStart(2, '0');
  const time = `${pad(brtHour)}:${pad(brtMin)}`;

  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

  const dateBRT = new Date(date.getTime() - 3 * 60 * 60 * 1000);
  const dateMidnight = new Date(dateBRT); dateMidnight.setUTCHours(0, 0, 0, 0);

  const dateNum = `${pad(dateBRT.getUTCDate())}/${pad(dateBRT.getUTCMonth() + 1)}/${dateBRT.getUTCFullYear()}`;

  if (dateMidnight.getTime() === today.getTime())    return `Hoje, ${time} · ${dateNum}`;
  if (dateMidnight.getTime() === tomorrow.getTime()) return `Amanhã, ${time} · ${dateNum}`;

  const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  return `${days[dateBRT.getUTCDay()]}, ${time} · ${dateNum}`;
}

async function getCalendarDisplayName(calendarId: string): Promise<string> {
  try {
    const cal = getCalendarClient(true);
    const { data } = await cal.calendars.get({ calendarId });
    return data.summary ?? calendarId;
  } catch {
    return calendarId;
  }
}

export async function findAvailableSlots(doctors: Doctor[]): Promise<AvailableSlot[]> {
  const doctor = doctors.find((d) => d.calendarId);
  if (!doctor) return [];

  const [calendarName, busy] = await Promise.all([
    getCalendarDisplayName(doctor.calendarId),
    (async () => {
      const now = new Date();
      const timeMin = new Date(now);
      timeMin.setMinutes(Math.ceil(timeMin.getMinutes() / 30) * 30, 0, 0);
      const timeMax = new Date(now);
      timeMax.setDate(timeMax.getDate() + SEARCH_DAYS_AHEAD);
      timeMax.setHours(WORKING_HOURS_END + 3, 0, 0, 0);
      return getBusyPeriods(doctor.calendarId, timeMin, timeMax);
    })(),
  ]);

  const now = new Date();
  const timeMin = new Date(now);
  timeMin.setMinutes(Math.ceil(timeMin.getMinutes() / 30) * 30, 0, 0);
  const timeMax = new Date(now);
  timeMax.setDate(timeMax.getDate() + SEARCH_DAYS_AHEAD);
  timeMax.setHours(WORKING_HOURS_END + 3, 0, 0, 0);

  const slotMs = SLOT_DURATION_MINUTES * 60 * 1000;
  const slots: AvailableSlot[] = [];
  let cursor = new Date(timeMin);

  while (cursor < timeMax && slots.length < MAX_SLOTS_RETURNED) {
    if (!inWorkingHours(cursor)) {
      cursor = new Date(cursor.getTime() + 60 * 60 * 1000);
      cursor.setMinutes(0, 0, 0);
      continue;
    }

    const slotEnd = new Date(cursor.getTime() + slotMs);

    if (inWorkingHours(slotEnd) && !overlaps(cursor, slotEnd, busy)) {
      slots.push({
        value:     formatLabel(cursor, now),
        isoStart:  cursor.toISOString(),
        isoEnd:    slotEnd.toISOString(),
        doctor:    calendarName,
        crm:       doctor.crm,
        specialty: doctor.specialty,
        note:      doctor.consultNote,
      });
    }

    cursor = new Date(cursor.getTime() + slotMs);
  }

  return slots;
}

export async function isSlotStillFree(
  calendarId: string,
  isoStart: string,
  isoEnd: string,
): Promise<boolean> {
  const busy = await getBusyPeriods(calendarId, new Date(isoStart), new Date(isoEnd));
  return !overlaps(new Date(isoStart), new Date(isoEnd), busy);
}

export async function deleteTestEventsAtSlots(
  calendarId: string,
  isoStarts: string[],
): Promise<void> {
  if (isoStarts.length === 0) return;
  const cal = getCalendarClient(false);
  await Promise.all(
    isoStarts.map(async (isoStart) => {
      const slotEnd = new Date(new Date(isoStart).getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      const { data } = await cal.events.list({
        calendarId,
        timeMin: isoStart,
        timeMax: slotEnd.toISOString(),
        singleEvents: true,
      });
      for (const event of data.items ?? []) {
        if (event.id && event.summary?.startsWith('Consulta Theracorp')) {
          await cal.events.delete({ calendarId, eventId: event.id }).catch(() => {});
        }
      }
    }),
  );
}

export async function createBooking(
  calendarId: string,
  isoStart: string,
  isoEnd: string,
  patientName: string,
  patientEmail: string,
  patientPhone: string,
): Promise<BookingResult> {
  const cal = getCalendarClient(false);

  const { data } = await cal.events.insert({
    calendarId,
    requestBody: {
      summary: `Consulta Theracorp — ${patientName}`,
      description: [
        `Consulta agendada via plataforma Theracorp`,
        `Paciente: ${patientName}`,
        `Email: ${patientEmail}`,
        `Telefone: ${patientPhone}`,
      ].join('\n'),
      start: { dateTime: isoStart, timeZone: 'America/Sao_Paulo' },
      end:   { dateTime: isoEnd,   timeZone: 'America/Sao_Paulo' },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    },
  });

  return {
    eventId:  data.id    ?? '',
    htmlLink: data.htmlLink ?? '',
    summary:  data.summary  ?? '',
  };
}
