import { LifeEvent } from '../types';

export const MOCK_LIFE_EVENTS: LifeEvent[] = [
  {
    id: 'le-college',
    title: 'Starting College / Higher Education',
    title_hi: 'कॉलेज / उच्च शिक्षा शुरू करना',
    description: 'Explore scholarships, fee concessions, laptop grants, and student hosteller maintenance support.',
    category: 'Education',
    icon: 'GraduationCap',
    target_occupations: ['Student'],
    target_goals: ['Education']
  },
  {
    id: 'le-business',
    title: 'Starting a Business / Self-Employment',
    title_hi: 'व्यवसाय / स्वरोजगार शुरू करना',
    description: 'Discover collateral-free credit, artisan toolkit grants, interest subsidies, and MSME support.',
    category: 'Business',
    icon: 'Briefcase',
    target_occupations: ['Self-employed', 'Business owner', 'Worker', 'Unemployed'],
    target_goals: ['Business', 'Employment', 'Skill Development']
  },
  {
    id: 'le-farming',
    title: 'Starting Farming & Agriculture Support',
    title_hi: 'खेती और कृषि सहायता',
    description: 'Find income support, Kisan Credit Cards, irrigation subsidies, and crop insurance coverage.',
    category: 'Agriculture',
    icon: 'Tractor',
    target_occupations: ['Farmer', 'Worker'],
    target_goals: ['Agriculture', 'Financial Assistance']
  },
  {
    id: 'le-family',
    title: 'Family Care & Girl Child Welfare',
    title_hi: 'परिवार की देखरेख और बालिका कल्याण',
    description: 'Access direct monthly cash grants for mothers, girl child education savings, and nutrition schemes.',
    category: 'Women and Child Welfare',
    icon: 'HeartHandshake',
    target_occupations: ['Homemaker', 'Self-employed', 'Worker', 'Farmer'],
    target_goals: ['Women and Child Welfare', 'Financial Assistance']
  },
  {
    id: 'le-retirement',
    title: 'Senior Citizen Support & Pension',
    title_hi: 'वरिष्ठ नागरिक सहायता और पेंशन',
    description: 'Secure monthly state/central pensions, free healthcare, and old-age social security assistance.',
    category: 'Pension',
    icon: 'UserCheck',
    target_occupations: ['Senior citizen', 'Homemaker', 'Worker', 'Unemployed'],
    target_goals: ['Pension', 'Healthcare', 'Financial Assistance']
  },
  {
    id: 'le-healthcare',
    title: 'Healthcare & Hospitalization Shield',
    title_hi: 'स्वास्थ्य और अस्पताल सुरक्षा',
    description: 'Get up to ₹5 Lakh cashless hospitalization cards for your entire family.',
    category: 'Healthcare',
    icon: 'Activity',
    target_occupations: ['Worker', 'Farmer', 'Unemployed', 'Homemaker', 'Senior citizen', 'Student'],
    target_goals: ['Healthcare', 'Insurance']
  }
];
