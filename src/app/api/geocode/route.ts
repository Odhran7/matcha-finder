import { NextResponse } from "next/server";

const API_KEY = process.env.GEOCODE_API_KEY;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    console.log(address);

    const results = [];

    if (!address) {
      return NextResponse.json(
        { error: "Address must not be empty" },
        { status: 400 }
      );
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${API_KEY}`;

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Error with api" }, { status: 500 });
    }

    const data = await response.json();
    for (const feature of data.features) {
      results.push({
        name: feature.properties.name,
        addressOne: feature.properties.address_line1,
        addressTwo: feature.properties.address_line2,
        longitude: feature.properties.lon,
        latitude: feature.properties.lat,
      });
    }
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to geocode: ${error}` },
      { status: 500 }
    );
  }
}
