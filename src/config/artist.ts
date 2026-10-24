// Central artist profile — all editable content lives here.
// Replace placeholder contact details with real ones once supplied.

export const artist = {
  name: 'Keshav Gupta',
  brand: 'KESHAV GUPTA',
  subBrand: 'MAKEOVER',
  tagline: 'THE ART OF YOUR BEAUTY',
  instagramHandle: 'keshav_gupta_makeover',
  instagramUrl: 'https://www.instagram.com/keshav_gupta_makeover/',
};

export type ContactDetails = {
  phone: string | null;
  whatsapp: string | null; // international format, no +
  email: string | null;
  studioAddress: string | null;
  serviceArea: string | null;
  businessHours: string | null;
};

// Until real details are supplied, these render as "Available on request".
export const contact: ContactDetails = {
  phone: '+91 84457 00364',
  whatsapp: '918445700364',
  email: null,
  studioAddress: null,
  serviceArea: null,
  businessHours: null,
};

export function whatsappLink(message: string): string | null {
  if (!contact.whatsapp) return null;
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function phoneLink(): string {
  return contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, '')}` : '';
}

export function mailLink(): string {
  return contact.email ? `mailto:${contact.email}` : '';
}

export function displayContact(value: string | null, fallback = 'Available on request'): string {
  return value ?? fallback;
}
