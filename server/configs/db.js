import mongoose from "mongoose";

const connetDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });
    await mongoose.connect(`${process.env.MONGO_URL}/asad`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connetDB;
