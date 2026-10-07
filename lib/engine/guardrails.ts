export interface GuardrailCheckResult {
  passed: boolean;
  blocked_reason?: string;
  sanitized_output?: string;
  flags: string[];
}

// 1. Sponsorship Disclosure Guardrail
export function enforceDisclosure(text: string, isSponsored: boolean, brandName?: string): { text: string; disclosureAdded: boolean } {
  if (!isSponsored && !brandName) {
    return { text, disclosureAdded: false };
  }

  const hasDisclosure = /#ad|#sponsored|paid partnership|sponsored post|#partner/i.test(text);
  if (!hasDisclosure) {
    const disclosureSuffix = `\n\n[Disclosure: Paid partnership with ${brandName || 'brand'} #ad]`;
    return { text: text + disclosureSuffix, disclosureAdded: true };
  }

  return { text, disclosureAdded: false };
}

// 2. Anti-Gaming Guardrail (Buying followers, engagement pods)
export function checkAntiGamingPolicy(prompt: string): GuardrailCheckResult {
  const gamingRegex = /buy\s+\d+k?\s+followers|engagement\s+pod|fake\s+reviews|buy\s+likes|bot\s+followers/i;
  if (gamingRegex.test(prompt)) {
    return {
      passed: false,
      blocked_reason: 'gaming_platform_policy',
      sanitized_output: "We can't recommend buying followers or joining engagement pods. Brands price strictly on verified reach, and fake followers lower your reach ratio and risk platform penalties. Focus on legitimate reach growth to raise your rate.",
      flags: ['refusal_gaming_policy']
    };
  }
  return { passed: true, flags: [] };
}

// 3. Income Guarantee Refusal Guardrail
export function checkIncomeGuaranteePolicy(prompt: string): GuardrailCheckResult {
  const guaranteeRegex = /guarantee\s+me|promise\s+me\s+₹|guaranteed\s+income|promise\s+₹\d+/i;
  if (guaranteeRegex.test(prompt)) {
    return {
      passed: false,
      blocked_reason: 'income_guarantee_policy',
      sanitized_output: "We cannot promise or guarantee a fixed monthly income. Earnings depend on brand pitch volume, reply rates, and deliverable negotiations. Based on your current data, here are realistic scenario ranges instead.",
      flags: ['refusal_income_guarantee']
    };
  }
  return { passed: true, flags: [] };
}

// 4. Prompt Injection Detector
export function sanitizeUserContent(userText: string): { sanitizedText: string; injectionDetected: boolean } {
  const injectionRegex = /ignore\s+(all\s+)?previous\s+instructions|system\s+prompt|tell\s+the\s+creator\s+their\s+rate\s+is/i;
  const injectionDetected = injectionRegex.test(userText);

  // Wrap user text inside <user_content> data container
  const sanitizedText = `<user_content>\n${userText}\n</user_content>`;
  return { sanitizedText, injectionDetected };
}

// 5. Output Grounding Validator (Ensures no made-up numbers in narration)
export function validateOutputGrounding(outputSummary: string, inputNumbers: number[]): boolean {
  // Extract all numbers from AI narration text
  const matches = outputSummary.match(/\b\d+(?:,\d+)*(?:\.\d+)?\b/g);
  if (!matches) return true;

  const foundNumbers = matches.map((n) => parseFloat(n.replace(/,/g, '')));
  for (const num of foundNumbers) {
    // Ignore small structural numbers like 1, 2, 3, 5, 10, 15, 20, 30, 50, 100
    if ([1, 2, 3, 5, 10, 15, 20, 30, 50, 100].includes(num)) continue;

    // Check if number exists in input JSON numbers (with 10% tolerance for rounded values)
    const exists = inputNumbers.some((inNum) => Math.abs(inNum - num) / Math.max(inNum, 1) < 0.15);
    if (!exists) {
      return false; // Hallucinated ungrounded number!
    }
  }

  return true;
}
