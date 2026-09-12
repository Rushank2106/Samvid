export type GovernmentLevel = 'All' | 'Central' | 'State';

export type SchemeCategory =
  | 'All'
  | 'Healthcare'
  | 'Education'
  | 'Agriculture'
  | 'Housing'
  | 'Employment'
  | 'Financial Assistance'
  | 'Pension'
  | 'Business'
  | 'Women and Child Welfare'
  | 'Disability'
  | 'Skill Development'
  | 'Insurance'
  | 'Other';

export type AgeGroup = 'Below 18' | '18–25' | '26–40' | '41–60' | '60+';

export type Occupation =
  | 'Student'
  | 'Farmer'
  | 'Business owner'
  | 'Self-employed'
  | 'Private employee'
  | 'Government employee'
  | 'Unemployed'
  | 'Homemaker'
  | 'Senior citizen'
  | 'Worker'
  | 'Other';

export type EmploymentType =
  | 'Formal'
  | 'Informal'
  | 'Self-employed'
  | 'Unemployed'
  | 'Student'
  | 'Retired'
  | 'Other';

export type IncomeRange =
  | 'Below ₹1 lakh'
  | '₹1–2 lakh'
  | '₹2–5 lakh'
  | '₹5–10 lakh'
  | 'Above ₹10 lakh'
  | 'Prefer not to say';

export type MatchStatus = 'Likely Eligible' | 'Potentially Eligible' | 'Unlikely Eligible';

export type ApplicationStatus =
  | 'Planning'
  | 'Documents Required'
  | 'Applied'
  | 'Documents Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected';

export type Language =
  | 'en'
  | 'hi'
  | 'mr'
  | 'gu'
  | 'bn'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur'
  | 'ks'
  | 'sd'
  | 'kok'
  | 'mni'
  | 'ne'
  | 'doi'
  | 'brx'
  | 'sat'
  | 'mai'
  | 'sa';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  applicableStates: string[];
}

export interface RequiredDocument {
  id: string;
  document_name: string;
  description: string;
  mandatory: boolean;
  official_guidance_url?: string;
  official_link?: string;
  how_to_obtain?: string;
  issuing_authority?: string;
}

export interface EligibilityCriterion {
  type: string;
  description: string;
  met: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  title_hi?: string;
  title_mr?: string;
  title_gu?: string;
  description: string;
  description_hi?: string;
  description_mr?: string;
  description_gu?: string;
  government_level: 'Central' | 'State';
  state?: string; // e.g. 'Goa', 'Maharashtra', 'Madhya Pradesh', etc.
  district_scope?: string;
  department: string;
  category: SchemeCategory;
  benefits: string[];
  minimum_age?: number;
  maximum_age?: number;
  income_limit_lakhs?: number; // In Lakhs per year (e.g. 2.5)
  eligible_occupations?: Occupation[];
  employment_types?: EmploymentType[];
  beneficiary_categories?: string[]; // e.g., 'SC', 'ST', 'OBC', 'General', 'Women', 'Farmers', 'PwD'
  family_conditions?: string[];
  application_process: string[];
  official_url: string;
  source_name: string;
  source_type: string; // e.g. 'Official Portal', 'Ministry Website'
  last_verified_at: string;
  active: boolean;
  required_documents: RequiredDocument[];
  tags: string[];
}

export interface FamilyInformation {
  family_members: number;
  has_children: boolean;
  has_senior_citizens: boolean;
  has_students: boolean;
  has_pwd: boolean;
  has_farmer: boolean;
  is_single_parent: boolean;
  other_notes?: string;
}

export interface UserEligibilityProfile {
  age_group: AgeGroup;
  age_number?: number;
  state: string;
  district: string;
  occupation: Occupation;
  employment_type: EmploymentType;
  income_range: IncomeRange;
  family_information: FamilyInformation;
  goals: SchemeCategory[];
  specific_query?: string;
  preferred_language: Language;
}

export interface SchemeMatchResult {
  scheme: Scheme;
  matchStatus: MatchStatus;
  relevanceLabel: 'Strong profile match' | 'Moderate match' | 'Low match';
  reasons: string[];
  criteria: EligibilityCriterion[];
  missingCriteria: string[];
}

export interface DocumentReadinessResult {
  schemeId: string;
  totalRequired: number;
  ownedCount: number;
  percentage: number;
  ownedDocIds: string[];
  missingDocs: RequiredDocument[];
}

export interface ApplicationTrackerItem {
  id: string;
  scheme_id: string;
  scheme_name: string;
  official_url: string;
  status: ApplicationStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ReminderItem {
  id: string;
  scheme_id: string;
  scheme_name: string;
  title: string;
  date: string;
  notes: string;
  completed: boolean;
}

export interface SavedScheme {
  id: string;
  scheme_id: string;
  created_at: string;
}

export interface LifeEvent {
  id: string;
  title: string;
  title_hi: string;
  description: string;
  category: SchemeCategory;
  icon: string;
  target_occupations: Occupation[];
  target_goals: SchemeCategory[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relatedSchemeIds?: string[];
  isVoice?: boolean;
}
