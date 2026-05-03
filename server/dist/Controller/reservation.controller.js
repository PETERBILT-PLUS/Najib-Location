"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCar = exports.getUSerCars = exports.createReservation = void 0;
const reservation_model_1 = __importDefault(require("../Model/reservation.model"));
const car_model_1 = __importDefault(require("../Model/car.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const GMAIL_PASS = process.env.GMAIL_PASS;
const ADMIN_GMAIL = process.env.ADMIN_GMAIL;
if (!GMAIL_PASS) {
    throw new Error("the GMAIL_PASS is not defined please check the .env file");
}
if (!ADMIN_GMAIL) {
    throw new Error("the ADMIN_GMAIL is not defined please check the .env file");
}
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, startDate, endDate, name, phoneNumber, userGmail } = req.body;
        if (!carId || !startDate || !endDate || !name || !phoneNumber || !userGmail) {
            res.status(401).json({ success: false, message: "Manque D'informations" });
            return;
        }
        const newReservation = new reservation_model_1.default({
            carId, startDate, endDate, name, phoneNumber, userGmail
        });
        yield newReservation.save();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: ADMIN_GMAIL,
                pass: GMAIL_PASS
            }
        });
        const mailOptions = {
            from: ADMIN_GMAIL,
            to: ADMIN_GMAIL,
            subject: "Vous avez une nouvelle Réservation chez Rent Car Ismaail",
            text: `Une nouvelle Réservation crée par ${newReservation.userGmail}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ success: false, message: error.message });
            }
            else {
                res.status(200).json({ success: true, message: "Réservation Accepté aves Succcès" });
            }
        });
        res.status(201).json({ success: true, message: "Réservation Crée avec Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not Defined");
    }
});
exports.createReservation = createReservation;
const getUSerCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = Number(req.query.skip) || 0;
        const cars = yield car_model_1.default.find({ carState: "Disponible" }).limit(10).skip(skip);
        if (cars.length === 0) {
            res.status(204).json({ success: true, cars: [] });
            return;
        }
        res.status(200).json({ success: true, cars: cars });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not Defined");
    }
});
exports.getUSerCars = getUSerCars;
const getSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        if (!carId) {
            res.status(401).json({ success: false, message: "Voiture id est Manqué" });
            return;
        }
        const car = yield car_model_1.default.findById(carId);
        if (!car) {
            res.status(404).json({ success: false, message: "Voiture Pas Trouvé" });
            return;
        }
        res.status(200).json({ success: true, car: car });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not Defined");
    }
});
exports.getSingleCar = getSingleCar;
