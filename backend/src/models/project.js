import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    aiAnalysis: {
      classification: {
        type: {
          type: String,
          required: true,
        },

        dataStructure: {
          type: String,
          required: true,
        },

        algorithm: {
          type: String,
          required: true,
        },
      },

      explanation: {
        summary: {
          type: String,
          required: true,
        },
      },

      variables: [
        {
          name: {
            type: String,
            required: true,
          },

          role: {
            type: String,
            required: true,
          },
        },
      ],

      visualization: {
        type: {
          type: String,
          required: true,
        },

        elements: [String],

        importantOperations: [String],
      },

      execution: {
        hasLoop: Boolean,
        hasCondition: Boolean,
        hasFunctionCalls: Boolean,
      },

      errors: [
        {
          type: String,
          message: String,
        },
      ],
      steps: [
        {
          step: {
            type: Number,
            required: true,
          },

          description: {
            type: String,
            required: true,
          },

          state: {
            variables: {
              type: mongoose.Schema.Types.Mixed,
              default: {},
            },

            dataStructure: {
              type: mongoose.Schema.Types.Mixed,
              default: {},
            },

            highlights: {
              type: [String],
              default: [],
            },
          },
        },
      ],
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },

    generatedVisualization: {
      code: {
        type: String,
      },

      explanation: {
        type: String,
      },

      type: {
        type: String,
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
