import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateVisualization = async ({ code, language, prompt }) => {
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
4. Important state changes relevant to visualization.
5. What should be visualized.
6. How Next, Previous, Run, Pause and Reset should behave.
7. What should happen if execution encounters an error.

Generate a sequence of visualization states for the algorithm.

For each meaningful visualization step, provide:
- step number
- short description
- relevant variable values
- relevant data structure state
- elements that should be highlighted

For EVERY step, the state MUST contain:
- variables: an object containing the relevant variable values at that step
- dataStructure: an object containing the relevant data structure state at that step
- highlights: an array of elements that should be highlighted

Do not omit any of these fields.
Use empty objects or empty arrays when a field has no relevant value. 

Keep the number of steps reasonable.
Do not create meaningless duplicate steps.

These are visualization states for the MVP, not authoritative debugger execution traces.

Do not invent program behavior.
Do not assume the code is correct.
Distinguish compilation errors from runtime errors.
Focus on DSA and algorithm understanding.

Return the result strictly according to the provided JSON schema.

Important:
- Do not include markdown.
- Do not include explanations outside the JSON.
- Do not invent execution results.
- The execution section describes code structure, not actual execution steps.
- The steps section describes visualization states for the MVP.
- The errors section should only contain issues you can identify from the code itself.
- Actual runtime behavior will later come from the execution engine.
`,
    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          classification: {
            type: "object",

            properties: {
              type: {
                type: "string",
              },

              dataStructure: {
                type: "string",
              },

              algorithm: {
                type: "string",
              },
            },

            required: ["type", "dataStructure", "algorithm"],
          },

          explanation: {
            type: "object",

            properties: {
              summary: {
                type: "string",
              },
            },

            required: ["summary"],
          },

          variables: {
            type: "array",

            items: {
              type: "object",

              properties: {
                name: {
                  type: "string",
                },

                role: {
                  type: "string",
                },
              },

              required: ["name", "role"],
            },
          },

          visualization: {
            type: "object",

            properties: {
              type: {
                type: "string",
              },

              elements: {
                type: "array",

                items: {
                  type: "string",
                },
              },

              importantOperations: {
                type: "array",

                items: {
                  type: "string",
                },
              },
            },

            required: ["type", "elements", "importantOperations"],
          },

          execution: {
            type: "object",

            properties: {
              hasLoop: {
                type: "boolean",
              },

              hasCondition: {
                type: "boolean",
              },

              hasFunctionCalls: {
                type: "boolean",
              },
            },

            required: ["hasLoop", "hasCondition", "hasFunctionCalls"],
          },

          errors: {
            type: "array",

            items: {
              type: "object",

              properties: {
                type: {
                  type: "string",
                },

                message: {
                  type: "string",
                },
              },

              required: ["type", "message"],
            },
          },

          steps: {
            type: "array",

            items: {
              type: "object",

              properties: {
                step: {
                  type: "integer",
                },

                description: {
                  type: "string",
                },

                state: {
                  type: "object",

                  properties: {
                    variables: {
                      type: "object",
                    },

                    dataStructure: {
                      type: "object",
                    },

                    highlights: {
                      type: "array",

                      items: {
                        type: "string",
                      },
                    },
                  },

                  required: ["variables", "dataStructure", "highlights"],
                },
              },

              required: ["step", "description", "state"],
            },
          },
        },

        required: [
          "classification",
          "explanation",
          "variables",
          "visualization",
          "execution",
          "errors",
          "steps",
        ],
      },
    },
  });

  console.log("Gemini response received");

  return JSON.parse(response.text);
};
