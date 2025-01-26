import React from "react";
import { useReviews } from "./hooks/useReviews";
import { useModal } from "@/app/contexts/Modal/ModalContext";
import AddReview from "./review/AddReview";
import { Star, User } from "lucide-react";
import type { Review as ReviewType } from "@/types/Review";

interface ReviewProps {
  review: ReviewType;
}
const getRatingColor = (rating: number) => {
  if (rating >= 8) return "!text-[#22c55e] !fill-[#22c55e]";
  if (rating >= 6) return "!text-[#eab308] !fill-[#eab308]";
  if (rating >= 4) return "!text-[#f97316] !fill-[#f97316]";
  return "!text-[#ef4444] !fill-[#ef4444]";
};

// const ReviewComponent = ({ review }: ReviewProps) => (
//   <div className="border-b border-gray-200 last:border-0 py-3">
//     <div className="flex items-center gap-2 mb-2">
//       <User className="h-3 w-3 sm:h-4 sm:w-4" />
//       <span className="text-xs sm:text-sm text-gray-600">{review.author}</span>
//       <div className="ml-auto flex items-center gap-1">
//         <Star
//           className={`h-3 w-3 sm:h-4 sm:w-4 ${getRatingColor(
//             review.overallRating
//           )}`}
//         />
//         <span className="text-xs sm:text-sm font-medium">
//           {review.overallRating.toFixed(1)}
//         </span>
//       </div>
//     </div>
//     <p className="text-xs sm:text-sm text-gray-700 mb-2">
//       {review.description}
//     </p>
//     <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-gray-500">
//       {[
//         { label: "Taste", value: review.tasteRating },
//         { label: "Value", value: review.valueRating },
//         { label: "Service", value: review.serviceRating },
//       ].map(({ label, value }) => (
//         <div key={label}>
//           <p>{label}</p>
//           <div className="flex items-center gap-1">
//             <Star
//               className={`h-2 w-2 sm:h-3 sm:w-3 ${getRatingColor(value)}`}
//             />
//             <span className={getRatingColor(value)}>{value}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

const PlacePopup = ({ id, name }: { id: string; name: string }) => {
  const { openModal } = useModal();
  const { reviews, isLoading, isError } = useReviews({ id });

  if (isLoading) return <div className="p-2 text-sm">Loading...</div>;
  if (isError)
    return (
      <div className="p-2 text-sm text-red-500">Error loading reviews</div>
    );

  return (
    <div className="sm:max-w-[280px] max-w-[250px] relative">
      <div className="flex flex-col items-start justify-between p-2 border-b gap-2">
        <h2 className="text-base sm:text-lg font-bold truncate w-full">
          {name}
        </h2>
        <button
          className="w-full bg-matchaGreen hover:bg-matchaGreen/90 text-white px-2 py-1 rounded-md shadow transition-colors text-xs sm:text-sm"
          onClick={() => openModal(<AddReview id={id} />)}
        >
          Add Review
        </button>
      </div>
      <div className="max-h-[200px] overflow-y-auto p-2">
        {!reviews?.length ? (
          <p className="text-gray-500 text-center py-2 text-xs sm:text-sm">
            No reviews yet
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewComponent key={review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

const ReviewComponent = ({ review }: ReviewProps) => (
  <div className="border-b border-gray-200 last:border-0 py-2 text-xs sm:text-sm">
    <div className="flex items-center gap-1 mb-1">
      <User className="h-3 w-3" />
      <span className="text-gray-600 truncate flex-grow">{review.author}</span>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Star className={`h-3 w-3 ${getRatingColor(review.overallRating)}`} />
        <span className="font-medium">{review.overallRating.toFixed(1)}</span>
      </div>
    </div>
    <p className="text-gray-700 mb-1 line-clamp-2">{review.description}</p>
    <div className="grid grid-cols-3 gap-1 text-gray-500">
      {[
        { label: "Taste", value: review.tasteRating },
        { label: "Value", value: review.valueRating },
        { label: "Service", value: review.serviceRating },
      ].map(({ label, value }) => (
        <div key={label} className="flex items-center gap-1">
          <span className="truncate">{label}:</span>
          <Star className={`h-2 w-2 ${getRatingColor(value)}`} />
          <span className={getRatingColor(value)}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default PlacePopup;
