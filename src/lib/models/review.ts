import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  place: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
