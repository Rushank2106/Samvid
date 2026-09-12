import { Scheme } from '../types';

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    title_hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    title_mr: 'पंतप्रधान किसान सन्मान निधी (पीएम-किसान)',
    title_gu: 'પ્રધાનમંત્રી કિસાન સન્માન નિધિ',
    description:
      'A Central Sector scheme to provide income support of ₹6,000 per year to small and marginal landholding farmer families across India in three equal installments.',
    description_hi:
      'भारत भर के छोटे और सीमांत भूमिधारक किसान परिवारों को तीन समान किस्तों में प्रति वर्ष ₹6,000 की आय सहायता प्रदान करने की केंद्रीय योजना।',
    description_mr:
      'भारतातील अल्प आणि अत्यल्प भूधारक शेतकरी कुटुंबांना तीन समान हप्त्यांमध्ये दरवर्षी ₹६,००० चे उत्पन्न सहाय्य प्रदान करणारी केंद्रीय योजना.',
    description_gu:
      'ભારતભરના નાના અને સીમાંત ખેડૂત પરિવારોને વર્ષે ₹૬,૦૦૦ ની આવક સહાય આપતી કેન્દ્રીય યોજના.',
    government_level: 'Central',
    department: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    benefits: [
      'Financial benefit of ₹6,000 per year transferred directly to bank account (DBT)',
      'Paid in three equal installments of ₹2,000 every 4 months',
      'Direct landholding documentation support and Kisan Credit Card access integration'
    ],
    minimum_age: 18,
    income_limit_lakhs: 5,
    eligible_occupations: ['Farmer', 'Self-employed', 'Worker'],
    employment_types: ['Informal', 'Self-employed', 'Unemployed'],
    beneficiary_categories: ['Farmers', 'General', 'OBC', 'SC', 'ST'],
    application_process: [
      'Visit the official PM-KISAN Farmers Corner portal or registered Common Service Centre (CSC).',
      'Click on "New Farmer Registration" and input your Aadhaar number and State.',
      'Enter landholding particulars from land revenue record (Khata/Khasra details).',
      'Upload bank account details and submit e-KYC via Aadhaar OTP.',
      'Track status using Aadhaar or Registered Mobile Number on the official portal.'
    ],
    official_url: 'https://pmkisan.gov.in',
    source_name: 'Official PM-KISAN Portal, Govt. of India',
    source_type: 'Central Government Portal',
    last_verified_at: '2026-08-10',
    active: true,
    tags: ['Farmers', 'Direct Benefit Transfer', 'Agriculture', 'Financial Assistance'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Mandatory identity proof linked with mobile number for e-KYC.',
        mandatory: true,
        how_to_obtain: 'Obtain from nearest UIDAI Aadhaar Seva Kendra or download e-Aadhaar online.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-land-records',
        document_name: 'Land Ownership Document (7/12 Extract / Khasra-Khatauni)',
        description: 'Proof of cultivable landholding in the name of the applicant farmer.',
        mandatory: true,
        how_to_obtain: 'Obtain from State Land Revenue Department or State Bhulekh portal.',
        issuing_authority: 'State Revenue Department'
      },
      {
        id: 'doc-bank-passbook',
        document_name: 'Active Bank Passbook / Aadhaar Seeded Bank Account',
        description: 'Bank account details with IFSC code for Direct Benefit Transfer (DBT).',
        mandatory: true,
        how_to_obtain: 'Issued by your scheduled commercial or regional rural bank.',
        issuing_authority: 'Bank Branch'
      }
    ]
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)',
    title_hi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    title_mr: 'आयुष्मान भारत - पंतप्रधान जन आरोग्य योजना',
    title_gu: 'આયુષ્માન ભારત પીએમ-જેએવાય',
    description:
      'World largest government-funded healthcare scheme providing secondary and tertiary hospitalization cover up to ₹5 lakh per family per year to eligible vulnerable families.',
    description_hi:
      'पात्र वंचित परिवारों को प्रति वर्ष प्रति परिवार ₹5 लाख तक का माध्यमिक और तृतीयक अस्पताल में भर्ती कवर प्रदान करने वाली दुनिया की सबसे बड़ी स्वास्थ्य योजना।',
    description_mr:
      'पात्र गरजू कुटुंबांना दरवर्षी दरकुटुंब ₹५ लाखांपर्यंतचे दुय्यम आणि तृतीयक रुग्णालय उपचार संरक्षण देणारी जगातील सर्वात मोठी आरोग्य योजना.',
    description_gu:
      'પાત્ર પરિવારોને વાર્ષિક ₹૫ લાખ સુધીનું હોસ્પિટલાઈઝેશન કવર પૂરું પાડતી આરોગ્ય યોજના.',
    government_level: 'Central',
    department: 'National Health Authority (NHA)',
    category: 'Healthcare',
    benefits: [
      'Cashless and paperless access to healthcare services at empanelled public and private hospitals',
      'Comprehensive coverage up to ₹5,000,000 (₹5 Lakh) per family annually',
      'Pre-existing conditions covered from Day 1',
      'No restriction on family size, age, or gender'
    ],
    income_limit_lakhs: 2.5,
    eligible_occupations: ['Worker', 'Unemployed', 'Farmer', 'Homemaker', 'Senior citizen', 'Other'],
    employment_types: ['Informal', 'Unemployed', 'Self-employed', 'Retired'],
    beneficiary_categories: ['General', 'OBC', 'SC', 'ST', 'PwD', 'Senior Citizens'],
    application_process: [
      'Check eligibility on the official PM-JAY website ("Am I Eligible") using mobile number or Ration Card.',
      'Visit any empanelled government or private hospital or Ayushman Kendra.',
      'Present your Aadhaar Card or Ration Card to Ayushman Mitra.',
      'Complete biometric verification and get Ayushman Card generated on spot.'
    ],
    official_url: 'https://pmjay.gov.in',
    source_name: 'National Health Authority, Ministry of Health and Family Welfare',
    source_type: 'Official Central Portal',
    last_verified_at: '2026-08-15',
    active: true,
    tags: ['Healthcare', 'Cashless Hospitalization', 'Family Health', 'Ayushman Card'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Identity verification proof for biometric authentication.',
        mandatory: true,
        how_to_obtain: 'Download e-Aadhaar from uidai.gov.in or visit Aadhaar Kendra.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-ration-card',
        document_name: 'Ration Card / SECC Family Verification',
        description: 'Proof of family composition and SECC inclusion.',
        mandatory: true,
        how_to_obtain: 'Issued by State Food and Civil Supplies Department.',
        issuing_authority: 'State Food & Civil Supplies Dept'
      }
    ]
  },
  {
    id: 'pm-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana (PMAY-Urban & Gramin)',
    title_hi: 'प्रधानमंत्री आवास योजना (शहरी एवं ग्रामीण)',
    title_mr: 'पंतप्रधान आवास योजना (शहरी आणि ग्रामीण)',
    title_gu: 'પ્રધાનમંત્રી આવાસ યોજના',
    description:
      'Provides financial assistance and interest subsidy to eligible homeless families and households living in kutcha houses for constructing pucca houses with basic amenities.',
    description_hi:
      'योग्य बेघर परिवारों और कच्चे मकानों में रहने वाले परिवारों को बुनियादी सुविधाओं वाले पक्के मकान बनाने के लिए वित्तीय सहायता और ब्याज सब्सिडी प्रदान करती है।',
    description_mr:
      'पात्र बेघर कुटुंबांना आणि कच्च्या घरात राहणाऱ्यांना पायाभूत सुविधांसह पक्के घर बांधण्यासाठी आर्थिक मदत आणि व्याज अनुदान देते.',
    description_gu:
      'બેઘર પરિવારો અને કાચા ઘરોમાં રહેતા લોકોને પક્કા ઘર બનાવવા માટે નાણાકીય સહાય.',
    government_level: 'Central',
    department: 'Ministry of Housing and Urban Affairs / Ministry of Rural Development',
    category: 'Housing',
    benefits: [
      'Financial grant of ₹1.20 lakh to ₹1.30 lakh for rural beneficiaries (PMAY-G)',
      'Credit Linked Subsidy Scheme (CLSS) up to ₹2.67 lakh interest subsidy for home loans (PMAY-U)',
      'Construction support with toilet (Swachh Bharat) and LPG connection (Ujjwala integration)'
    ],
    minimum_age: 18,
    maximum_age: 70,
    income_limit_lakhs: 3.0,
    eligible_occupations: ['Worker', 'Unemployed', 'Farmer', 'Self-employed', 'Homemaker'],
    employment_types: ['Informal', 'Self-employed', 'Unemployed'],
    beneficiary_categories: ['SC', 'ST', 'OBC', 'General', 'Women', 'PwD'],
    application_process: [
      'For PMAY-G: Names are identified through SECC 2011 list and verified by Gram Sabha.',
      'For PMAY-U: Visit PMAY official portal (pmaymis.gov.in) or nearest CSC.',
      'Select citizen assessment category (e.g. Beneficiary Led Construction or CLSS).',
      'Fill personal details, income details, existing housing status and Aadhaar verification.',
      'Track application status using Application ID.'
    ],
    official_url: 'https://pmaymis.gov.in',
    source_name: 'Ministry of Housing and Urban Affairs, Govt of India',
    source_type: 'Official Portal',
    last_verified_at: '2026-07-28',
    active: true,
    tags: ['Housing', 'Subsidy', 'Pucca House', 'Urban & Rural'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card of Applicant & Family',
        description: 'Mandatory identity proof for all family members.',
        mandatory: true,
        how_to_obtain: 'UIDAI Aadhaar Seva Kendra.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-income-cert',
        document_name: 'Income Certificate',
        description: 'Proof of annual household income issued by competent state authority.',
        mandatory: true,
        how_to_obtain: 'Tehsildar office or State e-District portal.',
        issuing_authority: 'Tehsildar / District Revenue Officer'
      },
      {
        id: 'doc-residence-cert',
        document_name: 'Residence / Domicile Certificate',
        description: 'Proof of residing in the target city/village.',
        mandatory: true,
        how_to_obtain: 'Tehsildar office / Sub-Divisional Magistrate.',
        issuing_authority: 'State Revenue Department'
      }
    ]
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    title_hi: 'पीएम विश्वकर्मा योजना',
    title_mr: 'पीएम विश्वकर्मा योजना',
    title_gu: 'પીએમ વિશ્વકર્મા યોજના',
    description:
      'A holistic central scheme providing recognition, skill upgrade, modern toolkit incentive up to ₹15,000, collateral-free credit support up to ₹3 Lakh, and digital transaction rewards for traditional artisans and craftspeople across 18 trades.',
    description_hi:
      '18 पारंपरिक व्यापारों में लगे कारीगरों और शिल्पकारों को पहचान पत्र, कौशल उन्नयन, ₹15,000 तक का टूलकिट प्रोत्साहन और ₹3 लाख तक का बिना गारंटी ऋण प्रदान करने वाली योजना।',
    description_mr:
      '१८ पारंपरिक व्यवसायांमधील कारागीर आणि सुतारांना ओळखपत्र, कौशल्य विकास, ₹१५,००० टूलकिट अनुदान आणि ₹३ लाखांपर्यंतचे बिनव्याजी/सवलतीचे कर्ज देणारी योजना.',
    description_gu:
      '૧૮ ટ્રેડ્સના પરંપરાગત કારીગરો માટે ટૂલકિટ પ્રોત્સાહન અને ઓછી વ્યાજની લોન આપતી યોજના.',
    government_level: 'Central',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    category: 'Business',
    benefits: [
      'PM Vishwakarma Certificate & ID Card recognizing artisan status',
      'Basic skill training (5-7 days) with ₹500/day stipend & advanced training',
      'Toolkit incentive grant of ₹15,000',
      'Collateral-free credit support of ₹1 Lakh (1st tranche) and ₹2 Lakh (2nd tranche) at concessional 5% interest rate'
    ],
    minimum_age: 18,
    income_limit_lakhs: 5.0,
    eligible_occupations: ['Self-employed', 'Worker', 'Business owner'],
    employment_types: ['Self-employed', 'Informal'],
    beneficiary_categories: ['OBC', 'SC', 'ST', 'General', 'Women'],
    application_process: [
      'Visit nearest Common Service Centre (CSC) for online PM Vishwakarma registration.',
      'Present Aadhaar Card, active Mobile Number, Bank details, and trade category.',
      'Stage 1 Verification by Gram Panchayat / Urban Local Body (ULB).',
      'Stage 2 Recommendation by District Implementation Committee.',
      'Stage 3 Final approval by National Steering Committee.'
    ],
    official_url: 'https://pmvishwakarma.gov.in',
    source_name: 'Ministry of MSME, Govt of India',
    source_type: 'Official Portal',
    last_verified_at: '2026-08-01',
    active: true,
    tags: ['Artisans', 'Skill Development', 'Collateral Free Loans', 'Craftsmen'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Biometric verified identity proof.',
        mandatory: true,
        how_to_obtain: 'UIDAI Kendra.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-bank-passbook',
        document_name: 'Bank Account Details / Passbook',
        description: 'Account details for receiving toolkit grant and stipend.',
        mandatory: true,
        how_to_obtain: 'Bank Branch.',
        issuing_authority: 'Bank Branch'
      },
      {
        id: 'doc-trade-proof',
        document_name: 'Self-Declaration of Traditional Trade',
        description: 'Declaration of practicing one of the 18 eligible traditional family trades (e.g. Carpenter, Blacksmith, Potter, Tailor, Cobbler).',
        mandatory: true,
        how_to_obtain: 'Submitted online via CSC portal during application.',
        issuing_authority: 'Self Declaration'
      }
    ]
  },
  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi (Pradhan Mantri Street Vendor\'s AtmaNirbhar Nidhi)',
    title_hi: 'पीएम स्वनिधि (प्रधानमंत्री स्ट्रीट वेंडर्स आत्मनिर्भर निधि)',
    title_mr: 'पीएम स्वनिधी योजना',
    title_gu: 'પીએમ સ્વનિધિ યોજના',
    description:
      'Micro-credit scheme providing street vendors collateral-free working capital loans starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback incentives for digital transactions.',
    description_hi:
      'स्ट्रीट वेंडरों को 7% ब्याज सब्सिडी और डिजिटल लेनदेन पर कैशबैक के साथ ₹10,000 से ₹50,000 तक का बिना गारंटी कार्यशील पूंजी ऋण प्रदान करने वाली योजना।',
    description_mr:
      'पथविक्रेत्यांना ७% व्याज अनुदानासह ₹१०,००० ते ₹५०,००० पर्यंतचे बिनव्याजी/सवलतीचे खेळते भांडवल कर्ज देणारी योजना.',
    description_gu:
      'શેરી ફેરિયાઓ માટે ડીજીટલ કૅશબૅક સાથે ₹૧૦,૦૦૦ થી ₹૫૦,૦૦૦ ની લોન આપતી યોજના.',
    government_level: 'Central',
    department: 'Ministry of Housing and Urban Affairs (MoHUA)',
    category: 'Financial Assistance',
    benefits: [
      'First tranche working capital loan up to ₹10,000 (1 year tenure)',
      'Second tranche loan up to ₹20,000 on timely repayment',
      'Third tranche loan up to ₹50,000 on timely repayment',
      '7% per annum interest subsidy credited quarterly',
      'Digital transaction cashback up to ₹1,200 per year'
    ],
    minimum_age: 18,
    income_limit_lakhs: 3.0,
    eligible_occupations: ['Self-employed', 'Worker', 'Business owner'],
    employment_types: ['Informal', 'Self-employed'],
    beneficiary_categories: ['General', 'OBC', 'SC', 'ST', 'Women'],
    application_process: [
      'Check Certificate of Vending (CoV) / Identity Card issued by Urban Local Bodies (ULB).',
      'Visit pmsvanidhi.mohua.gov.in or apply through nearby CSC / Bank branch.',
      'Fill online loan application form and select preferred lending institution.',
      'Upload Aadhaar and Vending proof.',
      'Loan disburser processes and sanctions collateral-free amount directly into bank account.'
    ],
    official_url: 'https://pmsvanidhi.mohua.gov.in',
    source_name: 'Ministry of Housing and Urban Affairs',
    source_type: 'Official Portal',
    last_verified_at: '2026-07-20',
    active: true,
    tags: ['Street Vendors', 'Micro Credit', 'Interest Subsidy', 'Working Capital'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Mandatory identity proof linked with active mobile number.',
        mandatory: true,
        how_to_obtain: 'UIDAI Portal.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-vending-card',
        document_name: 'Certificate of Vending / Vendor Identity Card / Letter of Recommendation (LoR)',
        description: 'Proof of street vending activity issued by Municipal Corporation / ULB.',
        mandatory: true,
        how_to_obtain: 'Issued by local Municipal Corporation / Town Vending Committee.',
        issuing_authority: 'Urban Local Body (ULB)'
      }
    ]
  },
  {
    id: 'post-matric-scholarship',
    name: 'National Post-Matric Scholarship Scheme for SC/ST/OBC Students',
    title_hi: 'अनुसूचित जाति/जनजाति/अन्य पिछड़ा वर्ग के छात्रों के लिए उत्तर मैट्रिक छात्रवृत्ति',
    title_mr: 'मॅट्रिकोत्तर शिष्यवृत्ती योजना (अनुसूचित जाती / जमाती / इतर मागासवर्ग)',
    title_gu: 'પોસ્ટ મેટ્રિક સ્કોલરશીપ યોજના',
    description:
      'Provides financial assistance to students belonging to SC, ST, and OBC communities pursuing post-matriculation or post-secondary courses to complete their education.',
    description_hi:
      'मैट्रिक पश्चात् या उच्च शिक्षा प्राप्त कर रहे अनुसूचित जाति, जनजाति और अन्य पिछड़ा वर्ग के छात्रों को वित्तीय सहायता प्रदान करती है।',
    description_mr:
      '१० वी नंतरचे उच्च शिक्षण घेणाऱ्या अनुसूचित जाती, जमाती व इतर मागासवर्गीय विद्यार्थ्यांना शैक्षणिक शुल्क व निर्वाह भत्ता देणारी योजना.',
    description_gu:
      'ઉચ્ચ શિક્ષણ મેળવતા એસસી/એસટી/ઓબીસી વિદ્યાર્થીઓ માટે નાણાકીય શિષ્યવૃત્તિ સહાય.',
    government_level: 'Central',
    department: 'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs',
    category: 'Education',
    benefits: [
      '100% compulsory non-refundable fees reimbursement for degree, diploma, and postgraduate courses',
      'Annual maintenance allowance up to ₹13,500 for hostellers and ₹7,000 for day scholars',
      'Additional disability allowance for students with special needs'
    ],
    minimum_age: 15,
    maximum_age: 35,
    income_limit_lakhs: 2.5,
    eligible_occupations: ['Student'],
    employment_types: ['Student', 'Unemployed'],
    beneficiary_categories: ['SC', 'ST', 'OBC', 'PwD'],
    application_process: [
      'Register on the National Scholarship Portal (scholarships.gov.in) using OTR (One-Time Registration).',
      'Authenticate Aadhaar via face-authentication or Aadhaar OTP.',
      'Fill academic details, course enrolment number, institute name, and category details.',
      'Upload Caste Certificate, Income Certificate, and previous marksheets.',
      'Verification conducted by Institute Nodal Officer, followed by District & State Officers.',
      'Scholarship disbursed directly via Direct Benefit Transfer (DBT) into Aadhaar-seeded bank account.'
    ],
    official_url: 'https://scholarships.gov.in',
    source_name: 'National Scholarship Portal, Govt of India',
    source_type: 'Official Portal',
    last_verified_at: '2026-08-05',
    active: true,
    tags: ['Education', 'Scholarship', 'Students', 'Higher Studies'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Identity verification for NSP OTR registration.',
        mandatory: true,
        how_to_obtain: 'UIDAI Kendra.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-caste-cert',
        document_name: 'Caste Certificate (SC / ST / OBC)',
        description: 'Official proof of belonging to eligible reserved beneficiary category.',
        mandatory: true,
        how_to_obtain: 'Tehsildar office / Sub-Divisional Magistrate office / e-District portal.',
        issuing_authority: 'State Competent Authority'
      },
      {
        id: 'doc-income-cert',
        document_name: 'Income Certificate (Annual household income < ₹2.5 Lakh)',
        description: 'Issued for current financial year.',
        mandatory: true,
        how_to_obtain: 'Tehsildar / District Revenue Officer.',
        issuing_authority: 'Revenue Department'
      },
      {
        id: 'doc-marksheet',
        document_name: 'Previous Qualifying Examination Marksheet',
        description: 'Proof of academic qualification and passing marks.',
        mandatory: true,
        how_to_obtain: 'Issued by School Board / University.',
        issuing_authority: 'Educational Board/University'
      }
    ]
  },
  {
    id: 'goa-dayanand-social-security',
    name: 'Dayanand Social Security Scheme (Goa State)',
    title_hi: 'दयानंद सामाजिक सुरक्षा योजना (गोवा राज्य)',
    title_mr: 'दयानंद सामाजिक सुरक्षा योजना (गोवा राज्य)',
    title_gu: 'દયાનાંદ સામાજિક સુરક્ષા યોજના (ગોવા)',
    description:
      'State welfare scheme of Goa providing monthly pension financial assistance to senior citizens, widows, single women, disabled persons, and vulnerable individuals.',
    description_hi:
      'वरिष्ठ नागरिकों, विधवाओं, एकल महिलाओं, दिव्यांगों और कमजोर व्यक्तियों को मासिक पेंशन वित्तीय सहायता प्रदान करने वाली गोवा राज्य की कल्याणकारी योजना।',
    description_mr:
      'गोव्यातील ज्येष्ठ नागरिक, विधवा, दिव्यांग आणि गरजू घटकांना दरमहा नियमित निवृत्तीवेतन देणारी गोवा राज्य शासनाची प्रमुख योजना.',
    description_gu:
      'ગોવાના સીનિયર સિટિઝન, વિધવા અને દિવ્યાંગો માટે માસિક પેન્શન યોજના.',
    government_level: 'State',
    state: 'Goa',
    department: 'Directorate of Social Welfare, Government of Goa',
    category: 'Pension',
    benefits: [
      'Monthly financial pension assistance of ₹2,000 to ₹3,500 per month',
      'Direct monthly credit to beneficiary bank account',
      'Coverage for Senior Citizens (60+ years), Widows, Disabled Persons (40%+ disability), and Single Women'
    ],
    minimum_age: 18,
    income_limit_lakhs: 1.5,
    eligible_occupations: ['Senior citizen', 'Homemaker', 'Unemployed', 'Worker', 'Other'],
    employment_types: ['Retired', 'Unemployed', 'Informal'],
    beneficiary_categories: ['Senior Citizens', 'Women', 'PwD', 'General', 'SC', 'ST', 'OBC'],
    application_process: [
      'Obtain physical application form from Directorate of Social Welfare, Panaji or download from goa.gov.in.',
      'Attach 15 years Domicile Certificate of Goa, Income Certificate, and Age Proof.',
      'Submit completed application form to Directorate of Social Welfare or local Taluka office.',
      'Field verification conducted by Social Welfare Inspector.',
      'Sanction order issued upon successful verification.'
    ],
    official_url: 'https://goa.gov.in',
    source_name: 'Directorate of Social Welfare, Govt of Goa',
    source_type: 'State Government Portal',
    last_verified_at: '2026-06-12',
    active: true,
    tags: ['Goa State Scheme', 'Pension', 'Senior Citizens', 'Widows', 'Disability'],
    required_documents: [
      {
        id: 'doc-goa-domicile',
        document_name: '15 Years Residence / Domicile Certificate of Goa',
        description: 'Proof of continuous residence in Goa State for minimum 15 years.',
        mandatory: true,
        how_to_obtain: 'Issued by Mamlatdar / Collector office of Goa.',
        issuing_authority: 'Mamlatdar, Govt of Goa'
      },
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Identity and address proof.',
        mandatory: true,
        how_to_obtain: 'UIDAI Kendra.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-income-cert',
        document_name: 'Income Certificate (Family income limit ≤ ₹1.5 Lakh)',
        description: 'Proof of household annual income.',
        mandatory: true,
        how_to_obtain: 'Issued by Mamlatdar office.',
        issuing_authority: 'Mamlatdar'
      }
    ]
  },
  {
    id: 'ladli-behna-yojana',
    name: 'Mukhyamantri Ladli Behna Yojana (Madhya Pradesh State)',
    title_hi: 'मुख्यमंत्री लाडली बहना योजना (मध्य प्रदेश राज्य)',
    title_mr: 'मुख्यमंत्री लाडकी बहीण योजना',
    title_gu: 'મુખ્યમંત્રી લાડલી બહના યોજના',
    description:
      'Empowers women in Madhya Pradesh by providing direct monthly financial support of ₹1,250 directly into bank accounts to enhance financial independence and health.',
    description_hi:
      'वित्तीय स्वतंत्रता और स्वास्थ्य को बढ़ावा देने के लिए बैंक खातों में सीधे ₹1,250 की मासिक वित्तीय सहायता प्रदान करके मध्य प्रदेश में महिलाओं को सशक्त बनाती है।',
    description_mr:
      'महिलांचे आर्थिक स्वावलंबन आणि पोषण सुधारण्यासाठी दरमहा ₹१,२५० चे थेट बँक हस्तांतरण देणारी मध्य प्रदेश राज्य शासनाची अग्रगण्य योजना.',
    description_gu:
      'મધ્યપ્રદેશની મહિલાઓને આર્થિક સ્વાવલંબન માટે દર મહિને ₹૧,૨૫૦ ની સહાય.',
    government_level: 'State',
    state: 'Madhya Pradesh',
    department: 'Department of Women & Child Development, Govt of MP',
    category: 'Women and Child Welfare',
    benefits: [
      'Monthly financial grant of ₹1,250 transferred on the 10th of every month',
      'Increases female financial autonomy and household purchasing power',
      'Covers married, widowed, divorced, and destitute women aged 21 to 60 years'
    ],
    minimum_age: 21,
    maximum_age: 60,
    income_limit_lakhs: 2.5,
    eligible_occupations: ['Homemaker', 'Self-employed', 'Worker', 'Unemployed', 'Farmer'],
    employment_types: ['Informal', 'Unemployed', 'Self-employed'],
    beneficiary_categories: ['Women', 'General', 'OBC', 'SC', 'ST'],
    application_process: [
      'Organized camp registration at Gram Panchayat / Ward level.',
      'Fill physical form or present Samagra Family ID and Aadhaar Card to camp officer.',
      'Live photo capture and Samagra e-KYC verification on spot.',
      'No physical documents needed if Samagra Aadhaar e-KYC and Bank DBT are linked.',
      'Check status on cmladlibehna.mp.gov.in using Samagra ID.'
    ],
    official_url: 'https://cmladlibehna.mp.gov.in',
    source_name: 'Women & Child Development Dept, Govt of Madhya Pradesh',
    source_type: 'State Portal',
    last_verified_at: '2026-08-11',
    active: true,
    tags: ['MP State Scheme', 'Women Empowerment', 'Direct Cash Transfer'],
    required_documents: [
      {
        id: 'doc-samagra-id',
        document_name: 'Samagra Family ID & Member ID',
        description: '8-digit Samagra family portal identification number.',
        mandatory: true,
        how_to_obtain: 'Issued by MP State Samagra portal (samagra.gov.in).',
        issuing_authority: 'MP Govt Samagra Portal'
      },
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card (e-KYC Enabled)',
        description: 'Linked with bank account for active DBT.',
        mandatory: true,
        how_to_obtain: 'UIDAI Portal.',
        issuing_authority: 'UIDAI'
      }
    ]
  },
  {
    id: 'atal-pension-yojana',
    name: 'Atal Pension Yojana (APY)',
    title_hi: 'अटल पेंशन योजना (एपीवाई)',
    title_mr: 'अटल पेन्शन योजना',
    title_gu: 'અટલ પેન્શન યોજના',
    description:
      'Guaranteed monthly pension scheme for citizens in the unorganized sector, providing ₹1,000 to ₹5,000 monthly pension after attaining 60 years of age based on contribution.',
    description_hi:
      'असंगठित क्षेत्र के नागरिकों के लिए गारंटीकृत मासिक पेंशन योजना, जो योगदान के आधार पर 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 तक मासिक पेंशन प्रदान करती है।',
    description_mr:
      'असंघटित क्षेत्रातील नागरिकांसाठी ६० वर्षे पूर्ण झाल्यानंतर दरमहा ₹१,००० ते ₹५,००० ची हमीभावाची पेन्शन देणारी राष्ट्रीय योजना.',
    description_gu:
      '૬૦ વર્ષ પછી દર મહિને ₹૧,૦૦૦ થી ₹૫,૦૦૦ સુધીનું પેન્શન આપતી સેવિંગ્સ યોજના.',
    government_level: 'Central',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    category: 'Pension',
    benefits: [
      'Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 after age 60',
      'Same pension amount paid to spouse upon subscriber death',
      'Nominee receives entire accumulated pension corpus upon death of both subscriber and spouse'
    ],
    minimum_age: 18,
    maximum_age: 40,
    income_limit_lakhs: 10,
    eligible_occupations: ['Worker', 'Farmer', 'Self-employed', 'Homemaker', 'Business owner', 'Unemployed'],
    employment_types: ['Informal', 'Self-employed', 'Unemployed'],
    beneficiary_categories: ['General', 'OBC', 'SC', 'ST', 'Women'],
    application_process: [
      'Approach your bank branch or Post Office where you maintain a savings bank account.',
      'Fill APY registration form or apply online via net banking / mobile banking app.',
      'Provide auto-debit consent for monthly/quarterly/half-yearly contribution.',
      'PRAN (Permanent Retirement Account Number) generated upon confirmation.'
    ],
    official_url: 'https://www.pfrda.org.in',
    source_name: 'PFRDA, Ministry of Finance, Govt of India',
    source_type: 'Central Regulatory Body',
    last_verified_at: '2026-07-15',
    active: true,
    tags: ['Pension', 'Old Age Security', 'Unorganized Workers', 'Financial Support'],
    required_documents: [
      {
        id: 'doc-aadhaar',
        document_name: 'Aadhaar Card',
        description: 'Mandatory identity proof for PRAN creation.',
        mandatory: true,
        how_to_obtain: 'UIDAI Portal.',
        issuing_authority: 'UIDAI'
      },
      {
        id: 'doc-savings-bank',
        document_name: 'Savings Bank Account with Auto-Debit Facility',
        description: 'Active savings account for contribution deduction.',
        mandatory: true,
        how_to_obtain: 'Issued by Bank or India Post Payments Bank.',
        issuing_authority: 'Bank Branch / Post Office'
      }
    ]
  },
  {
    id: 'sukanya-samriddhi-yojana',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    title_hi: 'सुकन्या समृद्धि योजना',
    title_mr: 'सुकन्या समृद्धी योजना',
    title_gu: 'સુકન્યા સમૃદ્ધિ યોજના',
    description:
      'A small deposit savings scheme for girl child launched under Beti Bachao Beti Padhao campaign offering high tax-free interest rate and maturity support for higher education and marriage.',
    description_hi:
      'बेटी बचाओ बेटी पढ़ाओ अभियान के तहत शुरू की गई बालिका के लिए एक छोटी जमा बचत योजना, जो उच्च शिक्षा और विवाह के लिए उच्च कर-मुक्त ब्याज दर प्रदान करती है।',
    description_mr:
      'मुलींच्या उच्च शिक्षण आणि विवाहासाठी उच्च करमुक्त व्याजदर देणारी केंद्र शासनाची विशेष बचत योजना.',
    description_gu:
      'દીકરીના શિક્ષણ અને લગ્ન માટે ઊંચા ટેક્સ ફ્રી વ્યાજ દર સાથેની નાની બચત યોજના.',
    government_level: 'Central',
    department: 'Department of Posts / Ministry of Finance',
    category: 'Women and Child Welfare',
    benefits: [
      'High sovereign government guaranteed tax-free interest rate (8.2% p.a.)',
      'Tax deduction under Section 80C up to ₹1.5 Lakh per financial year',
      'Partial withdrawal up to 50% allowed after girl turns 18 for higher education',
      'Matures after 21 years from account opening date'
    ],
    maximum_age: 10,
    eligible_occupations: ['Student', 'Homemaker', 'Other'],
    beneficiary_categories: ['Women', 'General', 'OBC', 'SC', 'ST'],
    application_process: [
      'Visit nearest Post Office or authorized commercial bank branch.',
      'Fill Sukanya Samriddhi Account opening form.',
      'Submit Birth Certificate of girl child along with parent/guardian Aadhaar and PAN.',
      'Deposit minimum opening amount of ₹250.',
      'Passbook issued immediately for tracking deposits.'
    ],
    official_url: 'https://www.indiapost.gov.in',
    source_name: 'India Post, Ministry of Communications, Govt of India',
    source_type: 'Official Portal',
    last_verified_at: '2026-08-02',
    active: true,
    tags: ['Girl Child', 'Education Savings', 'Tax Free Deposit', 'Beti Bachao'],
    required_documents: [
      {
        id: 'doc-birth-cert',
        document_name: 'Birth Certificate of Girl Child',
        description: 'Proof of age of the girl child (must be below 10 years at account opening).',
        mandatory: true,
        how_to_obtain: 'Issued by Municipal Registrar of Births and Deaths.',
        issuing_authority: 'Municipal Corporation / Gram Panchayat'
      },
      {
        id: 'doc-parent-aadhaar',
        document_name: 'Aadhaar Card & PAN of Parent/Guardian',
        description: 'Identity and address proof of legal guardian.',
        mandatory: true,
        how_to_obtain: 'UIDAI / NSDL IT Dept.',
        issuing_authority: 'UIDAI / Income Tax Dept'
      }
    ]
  }
];
