'use client';

import React from "react";
import dynamic from "next/dynamic";
const MatchaMap = dynamic(() => import("./map/MatchaMap"), { ssr: false });

const MatchaRatingService = () => {
  return (
    <div className="h-full w-full">
        <MatchaMap/>
    </div>
  );
};

export default MatchaRatingService;
