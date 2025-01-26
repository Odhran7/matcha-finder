import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { Review } from "@/lib/models";

export async function GET(req: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reviews = await Review.find({ _id: id });
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
    const body = await req.json();
    const newReview = await Review.create(body);
    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create review: ${error}` },
      { status: 500 }
    );
  }
}
