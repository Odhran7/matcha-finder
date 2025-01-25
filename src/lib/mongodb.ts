import mongoose from "mongoose";

const databaseUri = process.env.DATABASE_URI
if (!databaseUri) {
    throw new Error("No connection uri provided! Please provide one!");
}

export async function connectDb() {
    try {
        const db =  await mongoose.connect(databaseUri!);
        return db;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}
