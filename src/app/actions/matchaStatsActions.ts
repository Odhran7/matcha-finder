import { connectDb } from "@/lib/mongodb";
import { Review } from "@/lib/models";
// import { Place } from "@/lib/models";


export const getHighestRatedPlace = async () => {
    try {
        await connectDb();
        const highestRated = await Review.aggregate([
            {
                $group: {
                    _id: "$placeId",
                    averageTaste: { $avg: "$tasteRating" },
                    averageValue: { $avg: "$valueRating" },
                    averageService: { $avg: "$serviceRating" },
                    reviewCount: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    overallRating: {
                        $multiply: [
                            { $divide: [
                                { $add: ["$averageTaste", "$averageValue", "$averageService"] },
                                30
                            ]},
                            10
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "Place",
                    localField: "_id",
                    foreignField: "_id",
                    as: "place"
                }
            },
            { $unwind: "$place" },
            {
                $project: {
                    name: "$place.name",
                    longitude: "$place.longitude",
                    latitude: "$place.latitude",
                    averageTaste: 1,
                    averageValue: 1,
                    averageService: 1,
                    overallRating: 1,
                    reviewCount: 1
                }
            },
            { $sort: { overallRating: -1 } },
            { $limit: 1 }
        ]);

        return highestRated[0] || null;

    } catch (error) {
        console.error(`Error getting highest rated place: ${error}`);
        throw error;
    }
}


export const getTopRatedPlaces = async (limit = 5) => {
    try {
        await connectDb();

        const topRated = await Review.aggregate([
            {
                $group: {
                    _id: "$placeId",
                    averageTaste: { $avg: "$tasteRating" },
                    averageValue: { $avg: "$valueRating" },
                    averageService: { $avg: "$serviceRating" },
                    reviewCount: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    overallRating: {
                        $multiply: [
                            { $divide: [
                                { $add: ["$averageTaste", "$averageValue", "$averageService"] },
                                30
                            ]},
                            10
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "Place",
                    localField: "_id",
                    foreignField: "_id",
                    as: "place"
                }
            },
            { $unwind: "$place" },
            {
                $project: {
                    name: "$place.name",
                    longitude: "$place.longitude",
                    latitude: "$place.latitude",
                    averageTaste: 1,
                    averageValue: 1,
                    averageService: 1,
                    overallRating: 1,
                    reviewCount: 1
                }
            },
            { $sort: { overallRating: -1 } },
            { $limit: limit }
        ]);

        return topRated;

    } catch (error) {
        console.error(`Error getting top rated places: ${error}`);
        throw error;
    }
}
