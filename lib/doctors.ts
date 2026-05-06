export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  calendarId: string;
  consultNote: string;
}

export const doctors: Doctor[] = [
  {
    id: 'theracorp-test',
    name: process.env.DOCTOR_NAME        ?? 'Médico Theracorp',
    specialty: process.env.DOCTOR_SPECIALTY  ?? 'Clínico Geral',
    crm: process.env.DOCTOR_CRM          ?? '',
    calendarId: process.env.GOOGLE_CALENDAR_MAIN ?? '',
    consultNote: 'Teleconsulta via Theracorp',
  },
];

export const SLOT_DURATION_MINUTES = 30;
export const WORKING_HOURS_START   = 8;   // 08:00 BRT
export const WORKING_HOURS_END     = 18;  // 18:00 BRT
export const SEARCH_DAYS_AHEAD     = 5;
export const MAX_SLOTS_RETURNED    = 3;
