import express from "express";
import cors from "cors";
import "dotenv/config"; // This imports environment variables from .env file
import connetDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";

// inngest
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const PORT = process.env.PORT || 5002; // Default to 5002 if PORT is not set in .env
app.use(clerkMiddleware());

await connetDB(); // connection with mongodb-Atlas

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Set up the "/api/inngest" (recommended) routes with the serve handler (inngest http end-Point)
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
