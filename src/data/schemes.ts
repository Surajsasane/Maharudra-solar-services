export type Scheme = {
  id: string;
  name: string;
  shortDescription: string;
  officialLink?: string;
  details?: {
    eligibility?: string;
    documentation?: string;
    application?: string;
    installation?: string;
    notes?: string;
  };
};

export const schemes: Scheme[] = [
  {
    id: 'pm-surya-ghaar',
    name: 'PM Surya Ghar (Official portal)',
    shortDescription:
      'Official government portal for residential rooftop solar guidance and scheme information. Visit the official site for eligibility, application, and detailed scheme updates.',
    officialLink: 'https://pmsuryaghar.gov.in/',
    details: {
      eligibility:
        'Eligibility requirements vary by scheme and state. Refer to the official portal for the latest eligibility criteria and state-specific guidelines.',
      documentation:
        'Typical documents include identity, address proof, electricity bill, and property documents. The official portal provides the authoritative list for each scheme route.',
      application:
        'Applications and scheme enrollment (if available) are handled via the official portal and/or the local DISCOM/Nodal agency. Use the portal link to find application steps and contact information.',
      installation:
        'Installation is carried out by registered installers; the portal and local DISCOM list approved installers and MNRE-approved equipment lists. Maharudra can assist with planning and paperwork.',
      notes:
        'This site provides a high-level summary and assistance. For definitive scheme details and subsidy/benefit amounts, always consult the official portal linked above or your local nodal agency.',
    },
  },
];
