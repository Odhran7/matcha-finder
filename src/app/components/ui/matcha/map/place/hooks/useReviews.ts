import { Review } from "@/types/Review";
import { useState, useEffect } from "react";

interface useReviewProps {
    id: string;
}

export const useReviews = ({ id }: useReviewProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(() => {
        const getReviews = async () => {
            const res = await fetch(`/api/review?id=${id}`);
            const data = await res.json()
            setReviews(data);
        }
        getReviews()
    }, [id])
    return reviews;
}
