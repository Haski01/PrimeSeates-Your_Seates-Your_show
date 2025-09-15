import { Inngest } from "inngest";
import User from "../models/UserSchema.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },

  // create user event
  { event: "user.created" },
  async ({ event }) => {
    // fetch data from event.data
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    // create user
    const userDate = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };

    // store user to mongodb-atlas database
    await User.create(userDate);
  }
);

// Inngest Function to delete user to a database

export const functions = [syncUserCreation];
