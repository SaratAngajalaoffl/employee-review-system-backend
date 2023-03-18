import mongoose from "mongoose";

// function to connect to database 
export const establishconnection = async () => {
    const mongourl = process.env.MONGODB_URL || "mongodb://localhost:27017/review";

    console.log(`connecting to db at ${mongourl}`);

    await mongoose.connect(mongourl);
};
