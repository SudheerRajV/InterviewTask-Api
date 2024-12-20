import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import { configKeys } from "../config/keys";

dotenv.config();
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  const URI = process.env.DB_URL || configKeys.DB_URL;
  if(!URI)
    throw new Error("Invalid MongoDB connection string");

  const client = new MongoClient(URI);
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db("InterviewTask");
  return db;
};
