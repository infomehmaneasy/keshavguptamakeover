export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: 'How do I book an appointment?',
    a: 'Use the appointment form to prepare your request. In this prototype, details are not sent or stored; you can copy them or continue in WhatsApp using the artist’s listed number. A live booking connection must be added before web enquiries can be received directly by the artist.',
  },
  {
    q: 'How early should I book my wedding date?',
    a: 'Wedding and peak-season dates tend to fill quickly. It is best to enquire as early as you can once your date is set. For the most accurate guidance for your specific date, please contact the artist directly.',
  },
  {
    q: 'Do you offer makeup trials?',
    a: 'Please contact the artist to confirm whether trials are available for your occasion and date. Trial arrangements, timing, and any associated costs can be discussed during your enquiry.',
  },
  {
    q: 'Do you travel to wedding venues?',
    a: 'Travel to venues may be possible. Please mention your venue and city in your enquiry so the artist can confirm availability and any travel-related arrangements.',
  },
  {
    q: 'Can I request a specific makeup style?',
    a: 'Yes. The look is built around your vision and references. Share inspiration images and describe the style you want during your enquiry so the artist can tailor the look to you.',
  },
  {
    q: 'Can family members book makeup services?',
    a: 'Multiple people can often be accommodated. In your enquiry, mention how many people require makeup and the services each person needs, and the artist will confirm what is possible for your date.',
  },
  {
    q: 'How do I get a price quotation?',
    a: 'Pricing is shared after your enquiry is reviewed, because it depends on the service, occasion, location, and number of people. Please submit your details through the booking form and the artist will respond with a quotation.',
  },
  {
    q: 'What happens after I submit an enquiry?',
    a: 'Your request is received and reviewed. The artist then contacts you using your preferred method to discuss details, confirm availability, and finalise pricing. Only after this conversation is an appointment confirmed.',
  },
  {
    q: 'How can I reschedule my appointment?',
    a: 'To reschedule, contact the artist as early as possible through your original enquiry channel. Rescheduling is subject to the artist\u2019s availability for the new date.',
  },
];

export type Testimonial = { quote: string; author: string; occasion: string };

// SAMPLE demonstration content — clearly labelled as such in the UI.
// Replace with genuine reviews once supplied.
export const testimonials: Testimonial[] = [
];

export type InstagramPost = {
  image: string;
  url: string | null; // null => no direct post URL yet
  alt: string;
};

export const instagramPosts: InstagramPost[] = [
  {
    image:
      'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: null,
    alt: 'Editorial bridal portrait reference — replace with an approved artist image',
  },
  {
    image:
      'https://images.pexels.com/photos/29354292/pexels-photo-29354292.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: null,
    alt: 'Editorial bridal close-up reference — replace with an approved artist image',
  },
  {
    image:
      'https://images.pexels.com/photos/30825631/pexels-photo-30825631.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: null,
    alt: 'Editorial makeup detail reference — replace with an approved artist image',
  },
  {
    image:
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: null,
    alt: 'Editorial reception makeup reference — replace with an approved artist image',
  },
  {
    image:
      'https://images.pexels.com/photos/35395104/pexels-photo-35395104.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: null,
    alt: 'Editorial bridal jewellery and makeup reference — replace with an approved artist image',
  },
  {
    image:
      'https://images.pexels.com/photos/35470101/pexels-photo-35470101.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: null,
    alt: 'Editorial party makeup reference — replace with an approved artist image',
  },
];

export const appointmentSteps = [
  {
    step: '01',
    title: 'Share Your Vision',
    description: 'Tell us about your occasion, desired look, and preferred date.',
  },
  {
    step: '02',
    title: 'Discuss Your Look',
    description: 'Connect with the artist to discuss requirements, availability, and pricing.',
  },
  {
    step: '03',
    title: 'Confirm Your Appointment',
    description: 'Receive confirmation after the artist verifies the requested date and arrangements.',
  },
];

export const eventTypes: string[] = [
  'Wedding',
  'Engagement',
  'Reception',
  'Party',
  'Special Occasion',
  'Photoshoot',
  'Other',
];

export const makeupStyles: string[] = [
  'Bridal',
  'Soft Glam',
  'Party Glam',
  'Editorial',
  'Natural',
  'Not sure yet',
];

export const contactPreferences: ('WhatsApp' | 'Phone Call')[] = ['WhatsApp', 'Phone Call'];

export const bookingSettings = {
  // Demo mode: prepares the enquiry locally and clearly labels it as not sent.
  // Set to false and wire submitBooking() to a real backend to go live.
  demoMode: true,
  minDate: (() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  })(),
};
