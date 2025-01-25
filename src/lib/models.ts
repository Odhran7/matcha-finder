import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { collection: "Place" }
);

const ReviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, default: "anonymous" },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Review" }
);

export const Place =
  mongoose.models.Place || mongoose.model("Place", PlaceSchema);
export const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
