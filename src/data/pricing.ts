export type PricingPlan = {
  id: string;
  name: string;
  capacity: string;
  subtitle: string;
  price: string;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: '3.10kw',
    name: '3.10 KW Solar System',
    capacity: 'Approx. 3.1 kW DC',
    subtitle: 'On-grid rooftop system (single phase) — 250–300 sq ft area',
    price: '₹1,90,000',
    features: [
      'Panels: Waree WS (MNRE listed)',
      'Grid-Tied Inverter: Sunsathi/Polycab (on-grid)',
      'Mounting structure (GI pipe welded), junction boxes, ACDB/DCDB, MCBs, Type-2 SPDs',
      'Cabling: Polycab DC/AC cables, PVC conduits',
      'Earthing & Lightning arrestor',
      'Online monitoring (Wi‑Fi stick — client to provide connectivity)',
    ],
  },
  {
    id: '5kw',
    name: '5 KW Solar System',
    capacity: '5.0 kW DC',
    subtitle: 'On-grid rooftop system (single phase) — ~500 sq ft area',
    price: '₹2,90,000',
    features: [
      'Panels: Waree WS (MNRE listed) — 9 Nos',
      'Grid-Tied Inverter: Sunsathi/Polycab (on-grid)',
      'Mounting structure (GI pipe welded), junction boxes, ACDB/DCDB, MCBs, Type-2 SPDs',
      'Cabling: Polycab DC/AC cables, PVC conduits',
      'Earthing & Lightning arrestor',
      'Online monitoring (Wi‑Fi stick — client to provide connectivity)',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Solar Plan',
    capacity: 'Customised solution',
    subtitle: 'Tailored rooftop solar design for larger loads, special roof layouts, or custom requirements',
    price: 'Custom Quote',
    features: [
      'Custom system sizing based on actual electricity load',
      'Roof suitability study and site feasibility review',
      'Flexible panel and inverter configuration',
      'Higher capacity planning for future expansion',
      'Detailed proposal after site inspection',
    ],
  },
];
