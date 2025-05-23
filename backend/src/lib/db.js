import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb Connected :" + conn.connection.host);
  } catch (err) {
    console.log("mongodb connection error " + err);
  }
};
