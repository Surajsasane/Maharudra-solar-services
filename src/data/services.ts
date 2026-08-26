import {
  BatteryCharging,
  Building2,
  FileText,
  Hammer,
  Home,
  Landmark,
  ShieldCheck,
  SunMedium,
  Wrench,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  fullDescription: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: 'home-solar-installation',
    title: 'Home Solar Installation',
    description: 'Solar systems designed for residential properties.',
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80',
    icon: 'Home',
    fullDescription:
      'Custom rooftop systems for homes, apartments, and family residences with clean design, dependable performance, and future-ready upgrades.',
    features: ['Load analysis', 'Roof planning', 'Energy-efficient layout'],
  },
  {
    id: 'rooftop-solar',
    title: 'Rooftop Solar',
    description: 'Efficient rooftop solar solutions.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    icon: 'Building2',
    fullDescription:
      'Rooftop solar setups tailored to available space, consumption patterns, and visual balance so each installation is practical and attractive.',
    features: ['Space optimization', 'Panel layout', 'System tuning'],
  },
  {
    id: 'solar-plant-installation',
    title: 'Solar Plant Installation',
    description: 'Complete solar plant setup and installation.',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80',
    icon: 'Landmark',
    fullDescription:
      'Large-scale solar plant solutions for facilities requiring higher generation capacity and reliable operational support.',
    features: ['Plant layout', 'Performance planning', 'Turnkey delivery'],
  },
  {
    id: 'solar-consultation',
    title: 'Solar Consultation',
    description: 'Solar planning and system recommendations.',
    image:
      'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=80',
    icon: 'SunMedium',
    fullDescription:
      'We help property owners understand consumption patterns, available roof area, and suitable solar options before moving into installation.',
    features: ['Energy audit', 'System proposals', 'Customer guidance'],
  },
  {
    id: 'government-scheme-assistance',
    title: 'Government Scheme Assistance',
    description: 'Assistance with applicable solar government schemes and processes.',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
    icon: 'FileText',
    fullDescription:
      'A general assistance layer for understanding scheme steps, documentation flow, and application processes without making specific subsidy promises.',
    features: ['Process guidance', 'Document support', 'Application review'],
  },
  {
    id: 'solar-maintenance',
    title: 'Solar Maintenance',
    description: 'Post-installation maintenance and support.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
    icon: 'Wrench',
    fullDescription:
      'Ongoing support for panel cleaning, inspections, troubleshooting, and system checks to maintain smooth long-term operation.',
    features: ['Routine checks', 'Performance review', 'Support visits'],
  },
];

export const iconMap = {
  Home,
  Building2,
  Landmark,
  SunMedium,
  FileText,
  Wrench,
  Hammer,
  BatteryCharging,
  ShieldCheck,
};
