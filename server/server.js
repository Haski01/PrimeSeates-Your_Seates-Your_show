import express from "express";
import cors from "cors";
import "dotenv/config"; // Loads environment variables from .env
import connetDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
// import bodyParser from "body-parser";

// Inngest
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

// Svix is used to verify Clerk webhook signatures
// import { Webhook } from "svix";

// Initialize App
const app = express();
const PORT = process.env.PORT || 5002; // fallback port

// Connect MongoDB Atlas
await connetDB(); // ensures DB is connected before starting

// Middleware
app.use(express.json());
app.use(cors());

// Clerk middleware -> for authentication on your routes
app.use(clerkMiddleware());

// API routes
app.get("/", (req, res) => {
  res.send("Hello World! 🚀 Server is running.");
});

// Set up the "/api/inngest" (recommended) routes with the serve handler (inngest http end-Point)
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
