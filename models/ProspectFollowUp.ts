import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const prospectFollowUp = new mongoose.Schema(
 {
  email: { type: String, required: true },
  name: { type: String, required: true },
  followUpCounter: { type: Number, enum: [0, 1, 2], default: 0 },
  typeOfLegalProfessional: { type: String, required: true }
 },
 {
  timestamps: true,
  toJSON: { virtuals: true },
 }
);

// Add plugin that converts mongoose documents to JSON
prospectFollowUp.plugin(toJSON);

// Export the model
export default mongoose.models.ProspectFollowUp || mongoose.model("ProspectFollowUp", prospectFollowUp);
