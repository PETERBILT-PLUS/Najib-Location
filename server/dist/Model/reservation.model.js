"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_js_1 = require("./car.model.js");
const reservationModel = new mongoose_1.default.Schema({
    carId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: mongoose_1.default.model("Car", car_model_js_1.carModel),
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
exports.default = mongoose_1.default.model("Reservation", reservationModel);
