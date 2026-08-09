import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: { type: String },
    prompt: { type: String },
    response: { type: String },
    language: { type: String },
    code: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const project = mongoose.model("Project", projectSchema);
export default project;
