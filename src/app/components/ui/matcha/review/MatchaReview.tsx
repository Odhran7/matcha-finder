import React from "react";
import AddReview from "./AddReview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MatchaReview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Review</CardTitle>
      </CardHeader>
      <CardContent>
        <AddReview />
      </CardContent>
    </Card>
  );
};

export default MatchaReview;
