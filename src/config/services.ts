import {
  Crown, Gem, Sparkles, PartyPopper, Star, Scissors,
  type LucideIcon,
} from 'lucide-react';

export type ServiceCategory =
  | 'Bridal'
  | 'Engagement'
  | 'Reception'
  | 'Party Glam'
  | 'Soft Glam'
  | 'Editorial';

export type Service = {
  id: string;
  number: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription: string;
  preparation: string;
  duration: string | null;   // null => "Enquire for details"
  startingPrice: string | null;
  image: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 'bridal-makeup',
    number: '01',
    name: 'Bridal Makeup',
    category: 'Bridal',
    shortDescription:
      'A look crafted for the most important day — timeless, radiant, and unmistakably you.',
    longDescription:
      'Your bridal look begins with a conversation about your vision, your outfit, and the story of your day. Every element is considered — complexion, eyes, lips, and longevity — so you feel as beautiful at the end of the night as you did in the first light.',
    preparation:
      'A pre-consultation is recommended to discuss your outfit, jewellery, and the overall mood you want to carry. Share inspiration images so the look is built around you, not imposed on you.',
    duration: null,
    startingPrice: null,
    image:
      'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Crown,
  },
  {
    id: 'engagement-makeup',
    number: '02',
    name: 'Engagement Makeup',
    category: 'Engagement',
    shortDescription:
      'Soft, romantic, and luminous — a look that holds through every photograph and every promise.',
    longDescription:
      'The engagement is a beginning, and your look should feel like one. A softer palette, a luminous complexion, and details that photograph beautifully without feeling heavy.',
    preparation:
      'Bring references of your engagement outfit and the mood you want to set. We will refine the look together before the day.',
    duration: null,
    startingPrice: null,
    image:
      'https://images.pexels.com/photos/35395104/pexels-photo-35395104.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Gem,
  },
  {
    id: 'reception-makeup',
    number: '03',
    name: 'Reception Makeup',
    category: 'Reception',
    shortDescription:
      'Bolder, more defined, and built to last through an evening of celebration and lights.',
    longDescription:
      'The reception calls for a look with more definition and depth — stronger eyes, richer tones, and a finish that holds under evening lights and long hours of celebration.',
    preparation:
      'Share your reception outfit and venue details. The look is balanced to suit both the room and the gown.',
    duration: null,
    startingPrice: null,
    image:
      'https://images.pexels.com/photos/29354292/pexels-photo-29354292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Sparkles,
  },
  {
    id: 'party-makeup',
    number: '04',
    name: 'Party Makeup',
    category: 'Party Glam',
    shortDescription:
      'Glamour with confidence — a polished, striking look for celebrations and special evenings.',
    longDescription:
      'Whether it is a cocktail evening or a family celebration, this look is about polished glamour — defined features, a flawless base, and a finish that feels camera-ready all night.',
    preparation:
      'Tell us about the occasion and outfit so the intensity and palette match the moment.',
    duration: null,
    startingPrice: null,
    image:
      'https://images.pexels.com/photos/18610284/pexels-photo-18610284.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: PartyPopper,
  },
  {
    id: 'special-occasion-makeup',
    number: '05',
    name: 'Special Occasion Makeup',
    category: 'Soft Glam',
    shortDescription:
      'A refined, natural finish for the moments that matter without needing a stage.',
    longDescription:
      'For ceremonies, photoshoots, and milestones that deserve care without the full weight of a bridal look. Soft, considered, and quietly elegant.',
    preparation:
      'Describe the occasion and the level of formality. We will match the look to the moment.',
    duration: null,
    startingPrice: null,
    image:
      'https://images.pexels.com/photos/18089329/pexels-photo-18089329.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Star,
  },
  {
    id: 'hair-styling-draping',
    number: '06',
    name: 'Hair Styling & Draping',
    category: 'Bridal',
    shortDescription:
      'Finishing touches that complete the look — styling and saree draping to match the moment.',
    longDescription:
      'The look is never complete without the finishing frame. Hair styling and saree draping are available to complement your makeup and bring the whole vision together.',
    preparation:
      'Let us know your outfit, dupatta, and preferred hairstyle. Draping style is chosen to suit your silhouette and comfort.',
    duration: null,
    startingPrice: null,
    image:
      'https://images.pexels.com/photos/8242700/pexels-photo-8242700.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Scissors,
  },
];
