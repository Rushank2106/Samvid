import { Scheme, UserEligibilityProfile, Language } from '../types';
import { MOCK_SCHEMES } from '../data/mockSchemes';
import { getDocumentSourceInfo } from '../data/documentSources';
import { evaluateSchemeEligibility } from './eligibilityEngine';

export async function explainSchemeInSimpleLanguage(
  scheme: Scheme,
  lang: Language = 'en'
): Promise<string> {
  const docsList = scheme.required_documents
    .map((d) => {
      const src = getDocumentSourceInfo(d.document_name);
      return `- **${d.document_name}** (${d.mandatory ? 'Mandatory' : 'Optional'})\n  *Source:* ${src.issuing_authority}\n  *How to get:* ${src.how_to_obtain}\n  *Official Link:* [${src.button_label}](${src.official_link})`;
    })
    .join('\n\n');

  const benefitsList = scheme.benefits.map((b) => `- ${b}`).join('\n');
  const stepsList = scheme.application_process.map((step, idx) => `${idx + 1}. ${step}`).join('\n');

  if (lang === 'hi') {
    return (
      `### **${scheme.name}**\n` +
      `**विभाग:** ${scheme.department} (${scheme.government_level} सरकार)\n\n` +
      `**मुख्य लाभ:**\n${benefitsList}\n\n` +
      `**पात्रता शर्तें:**\n` +
      `- आयु सीमा: ${scheme.minimum_age ? `न्यूनतम ${scheme.minimum_age} वर्ष` : 'कोई न्यूनतम सीमा नहीं'} ${scheme.maximum_age ? `से ${scheme.maximum_age} वर्ष तक` : ''}\n` +
      `- आय सीमा: ${scheme.income_limit_lakhs ? `वार्षिक पारिवारिक आय ₹${scheme.income_limit_lakhs} लाख/वर्ष से कम` : 'कोई आय सीमा नहीं'}\n` +
      `- योग्य वर्ग: ${scheme.eligible_occupations?.join(', ') || 'सभी नागरिक'}\n\n` +
      `**आवश्यक दस्तावेज़ और प्राप्त करने के तरीके:**\n${docsList}\n\n` +
      `**आवेदन प्रक्रिया:**\n${stepsList}\n\n` +
      `**सत्यापित आधिकारिक पोर्टल:** [आधिकारिक वेबसाइट पर जाएं](${scheme.official_url})`
    );
  }

  if (lang === 'mr') {
    return (
      `### **${scheme.name}**\n` +
      `**विभाग:** ${scheme.department} (${scheme.government_level} शासन)\n\n` +
      `**मुख्य फायदे:**\n${benefitsList}\n\n` +
      `**पात्रता निकष:**\n` +
      `- वयोमर्यादा: ${scheme.minimum_age ? `किमान ${scheme.minimum_age} वर्षे` : 'किमान अट नाही'} ${scheme.maximum_age ? `ते ${scheme.maximum_age} वर्षे` : ''}\n` +
      `- उत्पन्न मर्यादा: ${scheme.income_limit_lakhs ? `वार्षिक कौटुंबिक उत्पन्न ₹${scheme.income_limit_lakhs} लाखांच्या आत` : 'उत्पन्न अट नाही'}\n` +
      `- पात्र घटक: ${scheme.eligible_occupations?.join(', ') || 'सर्व नागरिक'}\n\n` +
      `**आवश्यक कागदपत्रे व मिळवण्याचा मार्ग:**\n${docsList}\n\n` +
      `**अर्ज प्रक्रिया:**\n${stepsList}\n\n` +
      `**अधिकृत संकेतस्थळ:** [अधिकृत पोर्टलवर जा](${scheme.official_url})`
    );
  }

  return (
    `### **${scheme.name}**\n` +
    `**Managed by:** ${scheme.department} (${scheme.government_level} Government)\n\n` +
    `**Core Benefits:**\n${benefitsList}\n\n` +
    `**Eligibility Criteria:**\n` +
    `- Age requirement: ${scheme.minimum_age ? `Minimum ${scheme.minimum_age} years` : 'No minimum age'} ${scheme.maximum_age ? `up to ${scheme.maximum_age} years` : ''}\n` +
    `- Income limit: ${scheme.income_limit_lakhs ? `Annual income below ₹${scheme.income_limit_lakhs} Lakh/year` : 'No income ceiling'}\n` +
    `- Eligible occupations: ${scheme.eligible_occupations?.join(', ') || 'All citizens'}\n\n` +
    `**Required Documents & Acquisition Sources:**\n${docsList}\n\n` +
    `**Application Steps:**\n${stepsList}\n\n` +
    `**Official Verified Portal:** [Visit Official Portal](${scheme.official_url})`
  );
}

export async function processAssistantQuery(
  userQuery: string,
  profile?: UserEligibilityProfile,
  lang: Language = 'en'
): Promise<{
  text: string;
  primaryScheme?: Scheme;
  recommendedSchemes: Scheme[];
  missingDocs: { name: string; sourceInfo: ReturnType<typeof getDocumentSourceInfo> }[];
  relatedSchemeIds: string[];
}> {
  const lowerQuery = userQuery.toLowerCase();
  const matchedSchemes: Scheme[] = [];

  // Match schemes by exact or semantic terms
  MOCK_SCHEMES.forEach((scheme) => {
    const textSearch = `${scheme.name} ${scheme.category} ${scheme.department} ${scheme.tags.join(' ')} ${scheme.description}`.toLowerCase();
    if (
      lowerQuery.includes(scheme.category.toLowerCase()) ||
      lowerQuery.split(' ').some((word) => word.length > 3 && textSearch.includes(word))
    ) {
      matchedSchemes.push(scheme);
    }
  });

  // Intent specific queries
  if (lowerQuery.includes('farmer') || lowerQuery.includes('kisan') || lowerQuery.includes('agriculture')) {
    MOCK_SCHEMES.filter((s) => s.category === 'Agriculture' || s.tags.includes('Farmers')).forEach((s) => {
      if (!matchedSchemes.some((m) => m.id === s.id)) matchedSchemes.push(s);
    });
  }

  if (lowerQuery.includes('health') || lowerQuery.includes('hospital') || lowerQuery.includes('ayushman') || lowerQuery.includes('medical')) {
    MOCK_SCHEMES.filter((s) => s.category === 'Healthcare').forEach((s) => {
      if (!matchedSchemes.some((m) => m.id === s.id)) matchedSchemes.push(s);
    });
  }

  if (lowerQuery.includes('student') || lowerQuery.includes('education') || lowerQuery.includes('scholarship') || lowerQuery.includes('college')) {
    MOCK_SCHEMES.filter((s) => s.category === 'Education').forEach((s) => {
      if (!matchedSchemes.some((m) => m.id === s.id)) matchedSchemes.push(s);
    });
  }

  if (lowerQuery.includes('pension') || lowerQuery.includes('senior') || lowerQuery.includes('atal')) {
    MOCK_SCHEMES.filter((s) => s.category === 'Pension').forEach((s) => {
      if (!matchedSchemes.some((m) => m.id === s.id)) matchedSchemes.push(s);
    });
  }

  if (lowerQuery.includes('house') || lowerQuery.includes('housing') || lowerQuery.includes('awas') || lowerQuery.includes('home')) {
    MOCK_SCHEMES.filter((s) => s.category === 'Housing').forEach((s) => {
      if (!matchedSchemes.some((m) => m.id === s.id)) matchedSchemes.push(s);
    });
  }

  const primaryScheme = matchedSchemes[0] || MOCK_SCHEMES[0];
  
  // Find additional relevant schemes matching user eligibility profile
  let additionalSchemes: Scheme[] = [];
  if (profile) {
    additionalSchemes = MOCK_SCHEMES.filter((s) => s.id !== primaryScheme.id).filter((s) => {
      const evalRes = evaluateSchemeEligibility(s, profile);
      return evalRes.matchStatus !== 'Unlikely Eligible';
    });
  }

  if (additionalSchemes.length === 0) {
    additionalSchemes = MOCK_SCHEMES.filter((s) => s.id !== primaryScheme.id).slice(0, 2);
  } else {
    additionalSchemes = additionalSchemes.slice(0, 2);
  }

  const relatedSchemeIds = [primaryScheme.id, ...additionalSchemes.map((s) => s.id)];

  // Identify required documents and missing documents for primary scheme
  const missingDocs = primaryScheme.required_documents.map((d) => ({
    name: d.document_name,
    sourceInfo: getDocumentSourceInfo(d.document_name)
  }));

  // Build grounded response markdown text
  const primaryDocsText = missingDocs
    .map(
      (md) =>
        `• **${md.name}**\n  *How to obtain:* ${md.sourceInfo.how_to_obtain}\n  *Issuing Body:* ${md.sourceInfo.issuing_authority}\n  *Official Link:* [${md.sourceInfo.button_label}](${md.sourceInfo.official_link})`
    )
    .join('\n\n');

  const additionalText = additionalSchemes
    .map(
      (s) =>
        `### 🌟 **${s.name}** (${s.government_level} Government)\n` +
        `**Short Description:** ${s.description}\n` +
        `**Benefits:** ${s.benefits[0]}\n` +
        `**Key Eligibility:** ${s.eligible_occupations?.join(', ') || 'General Citizens'}\n` +
        `**Required Documents:** ${s.required_documents.map((d) => d.document_name).join(', ')}\n` +
        `**Official Link:** [Visit Portal](${s.official_url})`
    )
    .join('\n\n---\n\n');

  let text = '';
  if (lang === 'hi') {
    text =
      `### 📌 **मुख्य योजना: ${primaryScheme.name}** (${primaryScheme.government_level} सरकार)\n` +
      `**विभाग:** ${primaryScheme.department}\n` +
      `**विवरण:** ${primaryScheme.description_hi || primaryScheme.description}\n\n` +
      `**मुख्य लाभ:**\n${primaryScheme.benefits.map((b) => `- ${b}`).join('\n')}\n\n` +
      `**आवश्यक दस्तावेज़ और आधिकारिक प्राप्त लिंक:**\n${primaryDocsText}\n\n` +
      `**आधिकारिक पोर्टल:** [यहाँ से आवेदन करें](${primaryScheme.official_url})\n\n` +
      `---\n\n` +
      `### 🎯 **अन्य योजनाएँ जिनके लिए आप पात्र हो सकते हैं:**\n\n` +
      additionalText;
  } else if (lang === 'mr') {
    text =
      `### 📌 **मुख्य योजना: ${primaryScheme.name}** (${primaryScheme.government_level} शासन)\n` +
      `**विभाग:** ${primaryScheme.department}\n` +
      `**माहिती:** ${primaryScheme.description_mr || primaryScheme.description}\n\n` +
      `**मुख्य फायदे:**\n${primaryScheme.benefits.map((b) => `- ${b}`).join('\n')}\n\n` +
      `**आवश्यक कागदपत्रे व अधिकृत दुवे:**\n${primaryDocsText}\n\n` +
      `**अधिकृत पोर्टल:** [येथून अर्ज करा](${primaryScheme.official_url})\n\n` +
      `---\n\n` +
      `### 🎯 **इतर योजना ज्यांच्यासाठी आपण पात्र असू शकता:**\n\n` +
      additionalText;
  } else {
    text =
      `### 📌 **Requested Scheme: ${primaryScheme.name}** (${primaryScheme.government_level} Government)\n` +
      `**Department:** ${primaryScheme.department}\n` +
      `**Overview:** ${primaryScheme.description}\n\n` +
      `**Core Benefits:**\n${primaryScheme.benefits.map((b) => `- ${b}`).join('\n')}\n\n` +
      `**Required Documents & Official Acquisition Links:**\n${primaryDocsText}\n\n` +
      `**Official Portal:** [Apply on Official Website](${primaryScheme.official_url})\n\n` +
      `---\n\n` +
      `### 🎯 **Other schemes you may also be eligible for:**\n\n` +
      additionalText;
  }

  return {
    text,
    primaryScheme,
    recommendedSchemes: additionalSchemes,
    missingDocs,
    relatedSchemeIds
  };
}

export function checkSchemeGenuineStatus(queryText: string): {
  isVerified: boolean;
  statusTitle: string;
  explanation: string;
  matchedOfficialUrl?: string;
  sourceName?: string;
} {
  const lower = queryText.toLowerCase();

  const foundScheme = MOCK_SCHEMES.find(
    (s) =>
      s.name.toLowerCase().includes(lower) ||
      s.tags.some((t) => t.toLowerCase().includes(lower)) ||
      lower.includes(s.id)
  );

  if (foundScheme) {
    return {
      isVerified: true,
      statusTitle: 'Verified from an official government source.',
      explanation: `The scheme "${foundScheme.name}" is listed in official government records of ${foundScheme.source_name}. Complete your application safely on the official portal: ${foundScheme.official_url}.`,
      matchedOfficialUrl: foundScheme.official_url,
      sourceName: foundScheme.source_name
    };
  }

  return {
    isVerified: false,
    statusTitle: 'We could not verify this scheme from official government portals.',
    explanation:
      'Beware of fake websites asking for fees, Aadhaar/PAN passwords, or money transfers for welfare schemes. Verified government portals end strictly with .gov.in or .nic.in and do not charge application processing fees.'
  };
}
