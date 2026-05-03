import mongoose, { Document } from "mongoose";
import { carModel } from "./car.model.js";

export interface IReservation extends Document {
    carId: mongoose.Schema.Types.ObjectId;
    startDate: Date,
    endDate: Date,
    name: string,
    phoneNumber: string,
    status: string,
    userGmail: string;
}
const reservationModel = new mongoose.Schema<IReservation>({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: mongoose.model("Car", carModel),
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "En Attend"
    },
    userGmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Reservation", reservationModel);