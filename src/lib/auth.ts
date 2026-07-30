import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthClient } from "better-auth/react";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("smart-travel-planner");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
},
});

export const { signIn, signUp, useSession } = createAuthClient()
