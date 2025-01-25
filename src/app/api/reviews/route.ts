import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb"
import { Review } from "@/lib/models/review";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();
    const review = await Review.create(body);
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create review ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDb();
    const reviews = await Review.find({});
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch reviews: ${error}` },
      { status: 500 }
    );
  }
}
