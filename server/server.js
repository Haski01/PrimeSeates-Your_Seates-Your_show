import express from "express";
import cors from "cors";
import "dotenv/config"; // Loads environment variables from .env
import connetDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";

// Inngest
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

// Svix is used to verify Clerk webhook signatures
import { Webhook } from "svix";

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

// ----------------------
// Clerk Webhook Endpoint
// ----------------------
// This will receive events like user.created, user.updated, user.deleted
// Clerk dashboard -> Add webhook pointing to /api/webhooks/clerk
// Subscribe to user.created, user.updated, user.deleted
app.post(
  "/api/webhooks/clerk",
  bodyParser.raw({ type: "application/json" }), // raw body needed for signature verification
  async (req, res) => {
    const payload = req.body;
    const headers = req.headers;

    try {
      // Verify webhook signature using CLERK_WEBHOOK_SECRET
      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
      const evt = wh.verify(payload, headers);

      console.log("✅ Clerk Webhook Received:", evt.type);

      // Forward event to Inngest -> will trigger your functions
      await inngest.send(evt);

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("❌ Webhook error:", err.message);
      res.status(400).send("Invalid signature");
    }
  }
);

// ----------------------
// Inngest Handler
// ----------------------
// This exposes all your Inngest functions (create, update, delete user)
app.use("/api/inngest", serve({ client: inngest, functions }));

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
