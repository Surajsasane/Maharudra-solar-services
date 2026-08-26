export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'demo-1',
    name: 'Suraj',
    role: 'Homeowner',
    quote:
      'The planning process felt straightforward and the solar consultation gave clear direction for our home energy needs.',
  },

  {
    id: 'demo-2',
    name: 'Ravi',
    role: 'Facility Manager',
    quote:
      'The layout and service explanation were polished, and the concept made it easier to understand the energy possibilities.',
  },

  {
    id: 'demo-3',
    name: 'Rajik',
    role: 'Property Owner',
    quote:
      'A premium presentation and an easy-to-follow process made the solar journey feel more approachable and well structured.',
  },
];
