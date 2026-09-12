export interface VerifiedDocumentSource {
  id: string;
  document_name: string;
  category: string;
  issuing_authority: string;
  how_to_obtain: string;
  official_link: string;
  official_source_name: string;
  button_label: string;
}

export const VERIFIED_DOCUMENT_SOURCES: Record<string, VerifiedDocumentSource> = {
  'income_certificate': {
    id: 'income_certificate',
    document_name: 'Income Certificate',
    category: 'Financial & Revenue',
    issuing_authority: 'Revenue Department / Tehsildar / Sub-Divisional Magistrate (SDM)',
    how_to_obtain: 'Apply online via your respective State e-District portal or visit the local Tehsildar office with salary slips, Form 16, or Income Affidavit.',
    official_link: 'https://services.india.gov.in/service/detail/income-certificate',
    official_source_name: 'National Government Services Portal (India.gov.in)',
    button_label: 'Get Income Certificate'
  },
  'caste_certificate': {
    id: 'caste_certificate',
    document_name: 'Caste Certificate (SC/ST/OBC)',
    category: 'Social Category',
    issuing_authority: 'Sub-Divisional Officer (SDO) / Revenue Department',
    how_to_obtain: 'Submit application along with ancestral proof of residence, ration card, and family caste proof on the State e-District portal.',
    official_link: 'https://services.india.gov.in/service/detail/caste-certificate',
    official_source_name: 'National Government Services Portal',
    button_label: 'Get Caste Certificate'
  },
  'domicile_certificate': {
    id: 'domicile_certificate',
    document_name: 'Residence / Domicile Certificate',
    category: 'Identity & Address',
    issuing_authority: 'Tehsildar / Revenue Officer / District Magistrate',
    how_to_obtain: 'Provide proof of continuous residency (electricity bill, land documents, or school certificate) on your State e-District portal.',
    official_link: 'https://services.india.gov.in/service/search?kw=domicile+certificate',
    official_source_name: 'National Government Services Portal',
    button_label: 'Get Residence Certificate'
  },
  'birth_certificate': {
    id: 'birth_certificate',
    document_name: 'Birth Certificate',
    category: 'Identity',
    issuing_authority: 'Municipal Corporation / Civil Registration System (CRS)',
    how_to_obtain: 'Register child birth within 21 days on the official Civil Registration System (CRS) portal or apply online through your local Municipal Corporation portal.',
    official_link: 'https://crsorgi.gov.in',
    official_source_name: 'Civil Registration System (Office of the Registrar General, India)',
    button_label: 'Get Birth Certificate'
  },
  'disability_certificate': {
    id: 'disability_certificate',
    document_name: 'Disability Certificate & UDID Card',
    category: 'Health & Disability',
    issuing_authority: 'Medical Board / Department of Empowerment of Persons with Disabilities',
    how_to_obtain: 'Register on the Unique Disability ID (UDID) portal, upload medical assessment documents, and visit the designated government hospital for evaluation.',
    official_link: 'https://www.swavlambancard.gov.in',
    official_source_name: 'Unique Disability ID (UDID) Portal',
    button_label: 'Get Disability Card (UDID)'
  },
  'aadhaar_card': {
    id: 'aadhaar_card',
    document_name: 'Aadhaar Card',
    category: 'Primary Identity',
    issuing_authority: 'Unique Identification Authority of India (UIDAI)',
    how_to_obtain: 'Download e-Aadhaar online or book an appointment at nearest Aadhaar Seva Kendra via official UIDAI portal.',
    official_link: 'https://myaadhaar.uidai.gov.in',
    official_source_name: 'UIDAI Official Portal (myAadhaar)',
    button_label: 'Get Aadhaar Card'
  },
  'ration_card': {
    id: 'ration_card',
    document_name: 'Ration Card (APL / BPL / NFSA)',
    category: 'Food & Civil Supplies',
    issuing_authority: 'Department of Food & Public Distribution / State PDS',
    how_to_obtain: 'Apply through your State Food & Civil Supplies portal with Aadhaar details of family members and income proof.',
    official_link: 'https://nfsa.gov.in',
    official_source_name: 'National Food Security Portal (NFSA)',
    button_label: 'Get Ration Card'
  },
  'farmer_certificate': {
    id: 'farmer_certificate',
    document_name: 'Land Record (7/12 Extract / Khatian / Farmer Passbook)',
    category: 'Agriculture & Land',
    issuing_authority: 'State Land Records Department / Revenue Department',
    how_to_obtain: 'Access your digitized land record extract (7/12, RoR, Khatauni) from your state Bhulekh / Land Records portal.',
    official_link: 'https://services.india.gov.in/service/search?kw=land+records',
    official_source_name: 'Digital India Land Records / State Bhulekh Portals',
    button_label: 'Get Land Record / Farmer Proof'
  },
  'bank_passbook': {
    id: 'bank_passbook',
    document_name: 'Aadhaar-Seeded Active Bank Account',
    category: 'Banking & DBT',
    issuing_authority: 'Public Sector / Scheduled Commercial Banks',
    how_to_obtain: 'Visit your nearest bank branch or use official banking portal to seed your Aadhaar card with your bank account for Direct Benefit Transfer (DBT).',
    official_link: 'https://dbtbharat.gov.in',
    official_source_name: 'DBT Bharat (Direct Benefit Transfer Portal)',
    button_label: 'Verify DBT Bank Seeding'
  }
};

/**
 * Match a document name string to its verified official source & acquisition link
 */
export function getDocumentSourceInfo(docName: string): VerifiedDocumentSource {
  const lower = docName.toLowerCase();
  
  if (lower.includes('income')) return VERIFIED_DOCUMENT_SOURCES['income_certificate'];
  if (lower.includes('caste') || lower.includes('category')) return VERIFIED_DOCUMENT_SOURCES['caste_certificate'];
  if (lower.includes('domicile') || lower.includes('residence') || lower.includes('address')) return VERIFIED_DOCUMENT_SOURCES['domicile_certificate'];
  if (lower.includes('birth') || lower.includes('age proof')) return VERIFIED_DOCUMENT_SOURCES['birth_certificate'];
  if (lower.includes('disability') || lower.includes('udid') || lower.includes('pwd')) return VERIFIED_DOCUMENT_SOURCES['disability_certificate'];
  if (lower.includes('aadhaar') || lower.includes('id proof')) return VERIFIED_DOCUMENT_SOURCES['aadhaar_card'];
  if (lower.includes('ration')) return VERIFIED_DOCUMENT_SOURCES['ration_card'];
  if (lower.includes('land') || lower.includes('7/12') || lower.includes('kisan') || lower.includes('farmer')) return VERIFIED_DOCUMENT_SOURCES['farmer_certificate'];
  if (lower.includes('bank') || lower.includes('dbt') || lower.includes('passbook')) return VERIFIED_DOCUMENT_SOURCES['bank_passbook'];

  // Default fallback for general government services search
  return {
    id: 'general_service',
    document_name: docName,
    category: 'Government Certificate',
    issuing_authority: 'Respective State Government Revenue / District Authority',
    how_to_obtain: `Apply online via National Government Services Portal or state e-District portal for ${docName}.`,
    official_link: `https://services.india.gov.in/service/search?kw=${encodeURIComponent(docName)}`,
    official_source_name: 'National Government Services Portal (India.gov.in)',
    button_label: `Get ${docName}`
  };
}
