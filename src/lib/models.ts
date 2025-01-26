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
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
    author: { type: String, required: true, default: "anonymous" },
    tasteRating: { type: Number, required: true, min: 0, max: 10 },
    valueRating: { type: Number, required: true, min: 0, max: 10 },
    serviceRating: { type: Number, required: true, min: 0, max: 10 },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Review", toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ReviewSchema.virtual('overallRating').get(function() {
  return ((this.tasteRating + this.valueRating + this.serviceRating) / 30) * 10;
});


export const Place =
  mongoose.models.Place || mongoose.model("Place", PlaceSchema);
export const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
