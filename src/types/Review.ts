export interface Review {
    _id: string;
    author: string;
    overallRating: number;
    tasteRating: number;
    valueRating: number;
    serviceRating: number;
    description: string;
    createdAt: Date;
}
