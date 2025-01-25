import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { Place } from "@/lib/models";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();
    const existingPlace = await Place.findOne({
      longitude: body.longitude,
      latitude: body.latitude,
    });

    if (existingPlace) {
      return NextResponse.json(
        { error: "Place with these coordinates already exists" },
        { status: 409 }
      );
    }
    const review = await Place.create(body);
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
    const reviews = await Place.find({});
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch reviews: ${error}` },
      { status: 500 }
    );
  }
}
