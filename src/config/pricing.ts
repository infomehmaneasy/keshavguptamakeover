export type PriceOption = {
  label: string;
  price: string;
};

export type PriceGroup = {
  title: string;
  options: PriceOption[];
};

export const pricingGroups: PriceGroup[] = [
  {
    title: 'Party Makeup',
    options: [
      { label: 'HD (senior artist)', price: '₹3,500' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹5,500' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹7,500' },
    ],
  },
  {
    title: 'Colourful Makeup',
    options: [
      { label: 'HD (senior artist)', price: '₹7,000' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹10,000' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹15,000' },
    ],
  },
  {
    title: 'Cocktail Makeup',
    options: [
      { label: 'HD (senior artist)', price: '₹8,000' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹12,000' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹17,000' },
    ],
  },
  {
    title: 'Bridal Makeup',
    options: [
      { label: 'HD Bridal (senior artist)', price: '₹15,000' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹25,000' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹35,000' },
    ],
  },
  {
    title: 'Reception Bride',
    options: [
      { label: 'HD Bridal (senior artist)', price: '₹10,000' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹20,000' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹30,000' },
    ],
  },
  {
    title: 'Engagement Bride',
    options: [
      { label: 'HD Bridal (senior artist)', price: '₹10,000' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹20,000' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹30,000' },
    ],
  },
  {
    title: 'Groom Makeup',
    options: [
      { label: 'HD (senior artist)', price: '₹3,500' },
      { label: 'Airbrush (Keshav Gupta)', price: '₹5,500' },
      { label: 'Celebrity (Keshav Gupta)', price: '₹7,500' },
    ],
  },
  {
    title: 'Hairstyles',
    options: [
      { label: 'Basic hairstyle', price: '₹1,000–₹3,000' },
      { label: 'Advanced hairstyle', price: '₹2,000–₹5,000' },
    ],
  },
];
