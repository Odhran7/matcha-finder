import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { Review, Place } from "@/lib/models";

export async function GET(req: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reviews = await Review.find({ placeId: id });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to get reviews ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDb();
    const data = await req.json();
    
    const newReview = await Review.create(data);
    await Place.findByIdAndUpdate(
      data.placeId,
      { $push: { reviews: newReview._id } }
    );

    return NextResponse.json(newReview);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Failed to create review: ${error}` },
      { status: 500 }
    );
  }
}