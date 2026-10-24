import { contact } from '@/config/artist';
import { bookingSettings } from '@/config/content';

export type BookingData = {
  fullName: string;
  mobile: string;
  email: string;
  serviceId: string;
  serviceLabel: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  peopleCount: string;
  makeupStyle: string;
  additional: string;
  budget: string;
  weddingTime: string;
  needsTravel: boolean;
  contactPreference: 'WhatsApp' | 'Phone Call';
};

export const emptyBooking: BookingData = {
  fullName: '',
  mobile: '',
  email: '',
  serviceId: '',
  serviceLabel: '',
  eventType: '',
  eventDate: '',
  eventTime: '',
  venue: '',
  city: '',
  peopleCount: '1',
  makeupStyle: '',
  additional: '',
  budget: '',
  weddingTime: '',
  needsTravel: false,
  contactPreference: 'WhatsApp',
};

export type BookingResult =
  | { ok: true; demo: boolean; whatsappUrl?: string }
  | { ok: false; error: string };

// Build a human-readable summary used for the review screen and WhatsApp message.
export function bookingSummary(d: BookingData): string {
  const lines = [
    `*New Appointment Enquiry*`,
    ``,
    `*Name:* ${d.fullName}`,
    `*Mobile:* ${d.mobile}`,
    d.email ? `*Email:* ${d.email}` : '',
    `*Service:* ${d.serviceLabel}`,
    `*Event Type:* ${d.eventType}`,
    `*Date:* ${d.eventDate}`,
    d.eventTime ? `*Time:* ${d.eventTime}` : '',
    d.venue ? `*Venue:* ${d.venue}` : '',
    d.city ? `*City:* ${d.city}` : '',
    `*People:* ${d.peopleCount}`,
    d.makeupStyle ? `*Style:* ${d.makeupStyle}` : '',
    d.budget ? `*Budget:* ${d.budget}` : '',
  ];
  if (d.eventType === 'Wedding') {
    if (d.weddingTime) lines.push(`*Ceremony Time:* ${d.weddingTime}`);
    lines.push(`*Artist Travel Needed:* ${d.needsTravel ? 'Yes' : 'No'}`);
  }
  if (d.additional) lines.push(``, `*Additional:* ${d.additional}`);
  lines.push(``, `*Preferred Contact:* ${d.contactPreference}`);
  return lines.filter(Boolean).join('\n');
}

export function whatsappUrl(d: BookingData): string {
  if (!contact.whatsapp) {
    throw new Error('WhatsApp is not configured.');
  }
  const base = `https://wa.me/${contact.whatsapp}`;
  return `${base}?text=${encodeURIComponent(bookingSummary(d))}`;
}

// Service layer — swap this for a real backend call without touching the UI.
export async function submitBooking(d: BookingData): Promise<BookingResult> {
  if (bookingSettings.demoMode) {
    if (d.contactPreference === 'WhatsApp' && contact.whatsapp) {
      return { ok: true, demo: true, whatsappUrl: whatsappUrl(d) };
    }
    return { ok: true, demo: true };
  }
  // Production wiring point:
  // POST to an edge function / API route that writes to the bookings table.
  // Replace the block below with a real fetch when the backend is configured.
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d),
    });
    if (!res.ok) throw new Error('Request failed');
    return { ok: true, demo: false };
  } catch (error) {
    console.error('Booking enquiry could not be submitted.', error);
    return { ok: false, error: 'We could not deliver your enquiry right now. Please try again later.' };
  }
}
