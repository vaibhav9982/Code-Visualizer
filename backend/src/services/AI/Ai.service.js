import "dotenv/config";
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
You are an AI code-understanding and visualization assistant.

Language:
${language}

Code:
${code}

User request:
${prompt}

Analyze the code and determine:

1. What the code does.
2. The algorithm or data structure.
3. Important variables and state changes.
4. Important execution steps.
5. What should be visualized.
6. How Next, Previous, Run, Pause and Reset should behave.
7. What should happen if execution encounters an error.

Do not invent program behavior.
Do not assume the code is correct.
Distinguish compilation errors from runtime errors.
Focus on DSA and algorithm understanding.
`,
  });

  console.log("Gemini response received");

  return response.text;
};