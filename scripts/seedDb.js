import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { collection: "Place" }
);

const Place = mongoose.models.Place || mongoose.model("Place", PlaceSchema);

const MONGODB_URI = process.env.DATABASE_URI;
console.log(MONGODB_URI)

const importPlaces = async () => {
  const places = JSON.parse(fs.readFileSync(path.join(__dirname, './matcha_locs.json'), 'utf8'));

  for (const place of places) {
    try {
      await Place.create({
        name: place.name,
        longitude: place.lon,
        latitude: place.lat,
        reviews: []
      });
      console.log(`Imported: ${place.name}`);
    } catch (err) {
      console.error(`Error importing ${place.name}:`, err);
    }
  }
};

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return importPlaces();
  })
  .then(() => {
    console.log('Import complete');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
