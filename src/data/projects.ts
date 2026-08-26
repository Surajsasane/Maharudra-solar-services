export type Project = {
  id: string;
  title: string;
  category: 'Residential' | 'Rooftop' | 'Commercial' | 'Solar Plant';
  location: string;
  image: string;
  description: string;
};

export const projectCategories = ['All', 'Residential', 'Rooftop', 'Commercial', 'Solar Plant'] as const;

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Urban Home Solar Upgrade',
    category: 'Residential',
    location: 'Bengaluru',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    description: 'Residential rooftop installation planned for efficient everyday energy use.',
  },
  {
    id: 'project-2',
    title: 'Commercial Rooftop Array',
    category: 'Rooftop',
    location: 'Hyderabad',
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80',
    description: 'A clean rooftop layout designed for office energy optimization.',
  },
  {
    id: 'project-3',
    title: 'Business Energy Setup',
    category: 'Commercial',
    location: 'Pune',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Commercial system concept focused on stable daytime generation.',
  },
  {
    id: 'project-4',
    title: 'Solar Plant Layout',
    category: 'Solar Plant',
    location: 'Nagpur',
    image:
      'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1200&q=80',
    description: 'Large-scale solar plant concept for higher energy generation demand.',
  },
  {
    id: 'project-5',
    title: 'Compact Family Residence',
    category: 'Residential',
    location: 'Chennai',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Compact residential design for reduced dependence on grid energy.',
  },
  {
    id: 'project-6',
    title: 'Multi-Unit Rooftop System',
    category: 'Rooftop',
    location: 'Coimbatore',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    description: 'Multi-unit rooftop perspective designed for balanced generation.',
  },
];
