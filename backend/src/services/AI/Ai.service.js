import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateVisualization = async ({
  code,
  language,
  prompt,
}) => {
  const response = await ai.models.generateContent({
    model: process.env.AI_MODEL,
    contents: `
You are an expert DSA code visualization assistant.

Language:
${language}

User code:
${code}

User request:
${prompt}

Explain what this code is doing and describe how it should be visualized interactively.
`,
  });

  return response.text;
};
