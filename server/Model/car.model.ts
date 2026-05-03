import mongoose, { Document } from "mongoose";

export interface ICar extends Document {
    carName: string,
    carMarque: string,
    carKm: number,
    carPlaces: number;
    carFuel: string;
    carType: string;
    carImages: [string];
    pricePerDay: number;
    carState: string;
}

export const carModel = new mongoose.Schema<ICar>({
    carName: {
        type: String,
        required: true
    },
    carMarque: {
        type: String,
        required: true
    },
    carKm: {
        type: Number,
        required: true
    },
    carPlaces: {
        type: Number,
        required: true
    },
    carFuel: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        required: true
    },
    carImages: {
        type: [String],
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    carState: {
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.model("Car", carModel);