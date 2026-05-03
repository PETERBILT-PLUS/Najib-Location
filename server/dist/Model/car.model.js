"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.carModel = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Car", exports.carModel);
