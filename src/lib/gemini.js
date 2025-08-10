import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
if (!apiKey) {
  console.error('Missing REACT_APP_GEMINI_API_KEY');
}
const genAI = new GoogleGenerativeAI(apiKey);

// using newer model
export const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function generatePlan({ deficiencies, symptoms, exclusions }) {
  const prompt = `
You are a nutrition assistant. Analyze the user's nutrient deficiencies and symptoms and produce:

1) A short list of FOODS that can help address deficiencies.
2) A GROCERIES list with quantities appropriate for 1 week for a single adult.

Constraints:
- Respect exclusions if provided.
- Prefer commonly available items in India when possible.
- Use simple, whole foods.
- Output STRICT JSON as below. Do not include any commentary outside JSON.

JSON SCHEMA:
{
  "foods": [
    {"name": "string (lowercase common name, e.g. 'spinach')", "why": "string (short reason)"},
    ...
  ],
  "groceries": [
    {"name": "string (lowercase food name)", "qty": number, "unit": "string (e.g. 'bunch','kg','pcs')"},
    ...
  ]
}

User Inputs:
- Deficiencies: ${deficiencies || 'none'}
- Symptoms: ${symptoms || 'none'}
- Exclusions: ${exclusions || 'none'}
`;

  const res = await model.generateContent(prompt);
  const text = res.response.text();

  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonText = text.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonText);

    const foods = Array.isArray(data.foods)
      ? data.foods.map(n => ({
          name: (n.name || '').toString().trim().toLowerCase(),
          why: (n.why || '').toString().trim(),
        }))
      : [];

    const groceries = Array.isArray(data.groceries)
      ? data.groceries.map(g => ({
          name: (g.name || '').toString().trim().toLowerCase(),
          qty: typeof g.qty === 'number' ? g.qty : 1,
          unit: (g.unit || '').toString().trim() || 'pcs',
        }))
      : [];

    return { foods, groceries, raw: text };
  } catch {
    return { foods: [], groceries: [], raw: text };
  }
}
