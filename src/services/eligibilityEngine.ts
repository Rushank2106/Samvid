import { Scheme, UserEligibilityProfile, SchemeMatchResult, EligibilityCriterion } from '../types';

export function parseIncomeLakhs(range: string): number {
  switch (range) {
    case 'Below ₹1 lakh':
      return 1.0;
    case '₹1–2 lakh':
      return 2.0;
    case '₹2–5 lakh':
      return 5.0;
    case '₹5–10 lakh':
      return 10.0;
    case 'Above ₹10 lakh':
      return 15.0;
    default:
      return 5.0; // Default fallback
  }
}

export function parseAgeNumber(ageGroup: string): number {
  switch (ageGroup) {
    case 'Below 18':
      return 16;
    case '18–25':
      return 22;
    case '26–40':
      return 32;
    case '41–60':
      return 50;
    case '60+':
      return 65;
    default:
      return 30;
  }
}

export function evaluateSchemeEligibility(
  scheme: Scheme,
  profile: UserEligibilityProfile
): SchemeMatchResult {
  const criteria: EligibilityCriterion[] = [];
  const reasons: string[] = [];
  const missingCriteria: string[] = [];

  const age = profile.age_number || parseAgeNumber(profile.age_group);
  const income = parseIncomeLakhs(profile.income_range);

  // 1. Age check
  let ageMet = true;
  if (scheme.minimum_age !== undefined && age < scheme.minimum_age) {
    ageMet = false;
    missingCriteria.push(`Minimum age required is ${scheme.minimum_age} years (Current age estimate: ${profile.age_group}).`);
  } else if (scheme.maximum_age !== undefined && age > scheme.maximum_age) {
    ageMet = false;
    missingCriteria.push(`Maximum age limit is ${scheme.maximum_age} years.`);
  }

  if (ageMet) {
    let ageDesc = `Age requirement satisfied (${profile.age_group}`;
    if (scheme.minimum_age !== undefined || scheme.maximum_age !== undefined) {
      ageDesc += ` falls within ${scheme.minimum_age || 0}-${scheme.maximum_age || '60+'} limit`;
    }
    ageDesc += `)`;
    reasons.push(ageDesc);
    criteria.push({ type: 'Age', description: ageDesc, met: true });
  } else {
    criteria.push({ type: 'Age', description: `Age requirement not satisfied`, met: false });
  }

  // 2. Government Level / State check
  let stateMet = true;
  if (scheme.government_level === 'State') {
    if (scheme.state && profile.state.toLowerCase() !== scheme.state.toLowerCase()) {
      stateMet = false;
      missingCriteria.push(`This scheme is specific to ${scheme.state} government residents (Your state: ${profile.state}).`);
    }
  }

  if (stateMet) {
    const stateDesc =
      scheme.government_level === 'Central'
        ? `Central scheme applicable nationwide across all Indian States & UTs (including ${profile.state})`
        : `State restriction matched (${scheme.state})`;
    reasons.push(stateDesc);
    criteria.push({ type: 'State Jurisdiction', description: stateDesc, met: true });
  } else {
    criteria.push({
      type: 'State Jurisdiction',
      description: `State restriction mismatch (Requires ${scheme.state})`,
      met: false
    });
  }

  // 3. Income Check
  let incomeMet = true;
  if (scheme.income_limit_lakhs !== undefined && income > scheme.income_limit_lakhs) {
    incomeMet = false;
    missingCriteria.push(
      `Annual household income exceeds scheme ceiling limit of ₹${scheme.income_limit_lakhs} Lakh/year.`
    );
  }

  if (incomeMet) {
    const incDesc = scheme.income_limit_lakhs
      ? `Income requirement satisfied (${profile.income_range} is within ₹${scheme.income_limit_lakhs} Lakh limit)`
      : `Income requirement satisfied (${profile.income_range})`;
    reasons.push(incDesc);
    criteria.push({ type: 'Income', description: incDesc, met: true });
  } else {
    criteria.push({ type: 'Income', description: `Income limit exceeded`, met: false });
  }

  // 4. Occupation Check
  let occMet = true;
  if (scheme.eligible_occupations && scheme.eligible_occupations.length > 0) {
    const matchOcc = scheme.eligible_occupations.includes(profile.occupation);
    if (!matchOcc) {
      occMet = false;
      missingCriteria.push(
        `Occupation target mismatch (Scheme targets: ${scheme.eligible_occupations.join(', ')})`
      );
    }
  }

  if (occMet) {
    const occDesc = `Occupation criteria matched (${profile.occupation})`;
    reasons.push(occDesc);
    criteria.push({ type: 'Occupation', description: occDesc, met: true });
  } else {
    criteria.push({ type: 'Occupation', description: `Occupation mismatch`, met: false });
  }

  // 5. Goal / Category relevance check
  let goalMatched = false;
  if (profile.goals && profile.goals.includes(scheme.category)) {
    goalMatched = true;
    reasons.push(`Directly matches your stated interest in ${scheme.category}`);
  }

  // Overall Match Calculation (Deterministic, transparent logic)
  const mandatoryMet = ageMet && stateMet && incomeMet && occMet;

  let matchStatus: SchemeMatchResult['matchStatus'];
  let relevanceLabel: SchemeMatchResult['relevanceLabel'];

  if (mandatoryMet) {
    matchStatus = 'Likely Eligible';
    relevanceLabel = goalMatched ? 'Strong profile match' : 'Moderate match';
  } else if (ageMet && stateMet && (occMet || incomeMet)) {
    matchStatus = 'Potentially Eligible';
    relevanceLabel = 'Moderate match';
  } else {
    matchStatus = 'Unlikely Eligible';
    relevanceLabel = 'Low match';
  }

  return {
    scheme,
    matchStatus,
    relevanceLabel,
    reasons,
    criteria,
    missingCriteria
  };
}

export function rankSchemesForUser(
  schemes: Scheme[],
  profile: UserEligibilityProfile
): SchemeMatchResult[] {
  const results = schemes.map((scheme) => evaluateSchemeEligibility(scheme, profile));

  // Sort: Likely Eligible first, then Potentially Eligible, then Unlikely Eligible
  results.sort((a, b) => {
    const scoreMap = { 'Likely Eligible': 3, 'Potentially Eligible': 2, 'Unlikely Eligible': 1 };
    const scoreA = scoreMap[a.matchStatus] + (a.relevanceLabel === 'Strong profile match' ? 0.5 : 0);
    const scoreB = scoreMap[b.matchStatus] + (b.relevanceLabel === 'Strong profile match' ? 0.5 : 0);
    return scoreB - scoreA;
  });

  return results;
}
