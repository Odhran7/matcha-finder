import React from "react";
import { useReviews } from "./hooks/useReviews";
import { useModal } from "@/app/contexts/Modal/ModalContext";
import AddReview from "./review/AddReview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import type { Review as ReviewType } from "@/types/Review";

interface ReviewProps {
  review: ReviewType;
}
const getRatingColor = (rating: number) => {
  if (rating >= 8) return "!text-[#22c55e] !fill-[#22c55e]"; // Using direct hex values
  if (rating >= 6) return "!text-[#eab308] !fill-[#eab308]";
  if (rating >= 4) return "!text-[#f97316] !fill-[#f97316]";
  return "!text-[#ef4444] !fill-[#ef4444]";
};


const ReviewComponent = ({ review }: ReviewProps) => (
  <div className="border-b border-gray-200 last:border-0 py-4">
    <div className="flex items-center gap-2 mb-2">
      <User className="h-4 w-4" />
      <span className="text-sm text-gray-600">{review.author}</span>
      <div className="ml-auto flex items-center gap-1">
        <Star className={`h-4 w-4 ${getRatingColor(review.overallRating)}`} />
        <span className="text-sm font-medium">{review.overallRating.toFixed(1)}</span>
      </div>
    </div>
    <p className="text-gray-700 mb-3">{review.description}</p>
    <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
      {[
        { label: "Taste", value: review.tasteRating },
        { label: "Value", value: review.valueRating },
        { label: "Service", value: review.serviceRating }
      ].map(({ label, value }) => (
        <div key={label}>
          <p>{label}</p>
          <div className="flex items-center gap-1">
            <Star className={`h-3 w-3 ${getRatingColor(value)}`} />
            <span className={getRatingColor(value)}>{value}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlacePopup = ({ id, name }: { id: string; name: string }) => {
  const { openModal } = useModal();
  const { reviews, isLoading, isError } = useReviews({ id });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading reviews</div>;

  return (
    <div className="w-[500px]">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">{name}</h2>
        <button
          className="bg-matchaGreen hover:bg-matchaGreen/90 text-white px-4 py-2 rounded-lg shadow transition-colors"
          onClick={() => openModal(<AddReview id={id} />)}
        >
          Add Review
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto p-4">
        {!reviews?.length ? (
          <p className="text-gray-500 text-center py-8">No reviews yet</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <ReviewComponent key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacePopup;