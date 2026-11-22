import type { Service, ServiceCategory } from './services';

export type PortfolioCategory =
  | ServiceCategory
  | 'Cocktail'
  | 'Color Full'
  | 'Bridal Airbrush'
  | 'Celebrity Party';

type PortfolioMedia =
  | { src: string; type: 'image' }
  | { src: string; type: 'video'; poster: string };

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  caption: string;
  media: PortfolioMedia;
  serviceId: Service['id'];
};

export const portfolioCategories: { id: PortfolioCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'All Looks' },
  { id: 'Engagement', label: 'Engagement' },
  { id: 'Bridal', label: 'Bridal' },
  { id: 'Cocktail', label: 'Cocktail' },
  { id: 'Color Full', label: 'Color Full' },
  { id: 'Bridal Airbrush', label: 'Bridal Airbrush' },
  { id: 'Celebrity Party', label: 'Celebrity Party' },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'engagement-celebrity',
    category: 'Engagement',
    title: 'Engagement Glow',
    caption: 'A polished, camera-ready finish for an unforgettable celebration.',
    media: { src: '/1-portfolio.jpg', type: 'image' },
    serviceId: 'engagement-makeup',
  },
  {
    id: 'bridal-celebrity',
    category: 'Bridal',
    title: 'Bridal Elegance',
    caption: 'A timeless bridal look framed by rich colour and intricate jewels.',
    media: { src: '/2-portfolio.jpg', type: 'image' },
    serviceId: 'bridal-makeup',
  },
  {
    id: 'cocktail-celebrity',
    category: 'Cocktail',
    title: 'Cocktail Glam',
    caption: 'Smoky definition and luminous skin, styled for the evening.',
    media: { src: '/3-portfolio.jpg', type: 'image' },
    serviceId: 'party-makeup',
  },
  {
    id: 'color-full-celebrity',
    category: 'Color Full',
    title: 'Colorful Celebration',
    caption: 'Soft rose tones and playful detail, finished with a radiant glow.',
    media: { src: '/4.JPG', type: 'image' },
    serviceId: 'special-occasion-makeup',
  },
  {
    id: 'bridal-airbrush',
    category: 'Bridal Airbrush',
    title: 'Airbrush Bridal Finish',
    caption: "A closer look at Keshav's bridal airbrush artistry.",
    media: { src: '/5.MP4', type: 'video', poster: '/5-poster.jpg' },
    serviceId: 'bridal-makeup',
  },
  {
    id: 'celebrity-party',
    category: 'Celebrity Party',
    title: 'Celebrity Party Look',
    caption: 'A statement party look, polished for lights and photographs.',
    media: { src: '/6.m4v', type: 'video', poster: '/6-poster.jpg' },
    serviceId: 'party-makeup',
  },
];
