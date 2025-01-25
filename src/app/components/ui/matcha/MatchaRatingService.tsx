import React from "react";
import MatchaMap from "./map/MatchaMap";
import MatchaReview from "./review/MatchaReview";

const MatchaRatingService = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 container mx-auto p-4 h-full">
      <div className="lg:sticky lg:top-0 sm:h-[calc(100vh-200px)]">
        <MatchaMap/>
      </div>
      <div className="space-y-4">
        <MatchaReview />
      </div>
    </div>
  );
};

export default MatchaRatingService;
