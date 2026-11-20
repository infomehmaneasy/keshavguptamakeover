import type { ServiceCategory } from './services';

export type PortfolioCategory = ServiceCategory | 'Colour full' | 'Groom';

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  caption: string;
  image: string;
  span: 'feature' | 'tall' | 'wide' | 'square';
};

export const portfolioCategories: { id: PortfolioCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'All Looks' },
  { id: 'Bridal', label: 'Bridal' },
  { id: 'Engagement', label: 'Engagement' },
  { id: 'Reception', label: 'Reception' },
  { id: 'Party Glam', label: 'Party Glam' },
  { id: 'Soft Glam', label: 'Soft Glam' },
  { id: 'Editorial', label: 'Editorial' },
  { id: 'Colour full', label: 'Colour full' },
  { id: 'Groom', label: 'Groom' },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    category: 'Bridal',
    title: 'The Bride in Red',
    caption: 'A timeless bridal finish in deep traditional tones.',
    image:
      'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'feature',
  },
  {
    id: 'p2',
    category: 'Bridal',
    title: 'Golden Hour Bride',
    caption: 'Luminous complexion with soft, sculpted definition.',
    image:
      'https://images.pexels.com/photos/29354292/pexels-photo-29354292.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'tall',
  },
  {
    id: 'p3',
    category: 'Editorial',
    title: 'Studio Study',
    caption: 'Editorial lighting meets precise, deliberate detail.',
    image:
      'https://images.pexels.com/photos/30825631/pexels-photo-30825631.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'square',
  },
  {
    id: 'p4',
    category: 'Reception',
    title: 'Evening Glamour',
    caption: 'Deeper definition for an evening of celebration.',
    image:
      'https://images.pexels.com/photos/20790059/pexels-photo-20790059.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'wide',
  },
  {
    id: 'p5',
    category: 'Bridal',
    title: 'Heritage Bridal',
    caption: 'Jewellery, tradition, and a flawless base.',
    image:
      'https://images.pexels.com/photos/35395104/pexels-photo-35395104.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'tall',
  },
  {
    id: 'p6',
    category: 'Soft Glam',
    title: 'Quiet Radiance',
    caption: 'A soft glam look for an intimate ceremony.',
    image:
      'https://images.pexels.com/photos/36519701/pexels-photo-36519701.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'square',
  },
  {
    id: 'p7',
    category: 'Engagement',
    title: 'The Promise',
    caption: 'Romantic tones for a beginning worth remembering.',
    image:
      'https://images.pexels.com/photos/17001511/pexels-photo-17001511.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'feature',
  },
  {
    id: 'p8',
    category: 'Party Glam',
    title: 'Cocktail Hour',
    caption: 'Polished glamour built for the camera.',
    image:
      'https://images.pexels.com/photos/35470101/pexels-photo-35470101.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'tall',
  },
  {
    id: 'p9',
    category: 'Bridal',
    title: 'Classic Bride',
    caption: 'Traditional jewellery framed by a luminous finish.',
    image:
      'https://images.pexels.com/photos/18089329/pexels-photo-18089329.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'square',
  },
  {
    id: 'p10',
    category: 'Reception',
    title: 'The Reception Look',
    caption: 'Richer tones for an evening that lasts.',
    image:
      'https://images.pexels.com/photos/36951359/pexels-photo-36951359.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'wide',
  },
  {
    id: 'p11',
    category: 'Editorial',
    title: 'Close Study',
    caption: 'Detail work — eyes, skin, and intention.',
    image:
      'https://images.pexels.com/photos/30825617/pexels-photo-30825617.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'tall',
  },
  {
    id: 'p12',
    category: 'Soft Glam',
    title: 'Natural Glow',
    caption: 'Minimal product, maximum confidence.',
    image:
      'https://images.pexels.com/photos/35395102/pexels-photo-35395102.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'square',
  },
  {
    id: 'p13',
    category: 'Bridal',
    title: 'Red & Gold',
    caption: 'Vibrant tradition with a radiant finish.',
    image:
      'https://images.pexels.com/photos/29368877/pexels-photo-29368877.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'tall',
  },
  {
    id: 'p14',
    category: 'Engagement',
    title: 'Soft Promise',
    caption: 'A softer palette for a softer occasion.',
    image:
      'https://images.pexels.com/photos/30496017/pexels-photo-30496017.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'square',
  },
  {
    id: 'p15',
    category: 'Party Glam',
    title: 'Glam Notes',
    caption: 'Bold, confident, and camera-ready.',
    image:
      'https://images.pexels.com/photos/3460676/pexels-photo-3460676.jpeg?auto=compress&cs=tinysrgb&w=1200',
    span: 'feature',
  },
];
