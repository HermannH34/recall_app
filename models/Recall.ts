import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const recallSchema = new mongoose.Schema(
 {
  email: { type: String, required: true },
  name: { type: String, required: true },
  motive: { type: String, required: true },
  recallDate: { type: Date, required: true },
  wasRecalled: {type: Boolean, default: false}
 },
 {
  timestamps: true,
  toJSON: { virtuals: true },
 }
);

// Add plugin that converts mongoose documents to JSON
recallSchema.plugin(toJSON);

// Export the model
export default mongoose.models.Recall || mongoose.model("Recall", recallSchema);
