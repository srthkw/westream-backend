import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Audio", audioSchema);
