import mongoose from "mongoose";

export const connectToMongoDb = async (mongoDbURI: string) => {
    try {
        await mongoose.connect(mongoDbURI);
        console.log("Connect To  MongoDB database Succesfully");
    } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
    }
};