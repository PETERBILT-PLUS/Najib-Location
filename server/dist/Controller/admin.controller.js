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
exports.getAdminReservations = exports.deleteReservation = exports.getDashboard = exports.rejectReservation = exports.acceptReservation = exports.deleteCar = exports.getCars = exports.updateCar = exports.createVehicule = void 0;
const car_model_1 = __importDefault(require("../Model/car.model"));
const reservation_model_1 = __importDefault(require("../Model/reservation.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const GMAIL_PASS = process.env.GMAIL_PASS;
const ADMIN_GMAIL = process.env.ADMIN_GMAIL;
if (!GMAIL_PASS || !ADMIN_GMAIL) {
    throw new Error("the ADMIN_GMAIL or GMAIL_PASS is not defined please check the .env file");
}
const createVehicule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, pricePerDay, carState } = req.body;
        if (!carName || !carMarque || !carKm || !carPlaces || !carFuel || !carType || !carImages || !pricePerDay || !carState) {
            res.status(401).json({ success: false, message: "Manque D'informations" });
            return;
        }
        const newCar = new car_model_1.default({ carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, pricePerDay, carState });
        yield newCar.save();
        res.status(201).json({ success: true, message: "Voiture Crée avec Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err.stack || "the Stack is not defined");
    }
});
exports.createVehicule = createVehicule;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, carState } = req.body;
        if (!carId || !carName || !carMarque || !carKm || !carPlaces || !carFuel || !carType || !carImages || !carState || !Array.isArray(carImages)) {
            res.status(401).json({ success: false, message: "Manque d'informations" });
            return;
        }
        const updateCar = yield car_model_1.default.findByIdAndUpdate(carId, {
            carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, carState
        });
        if (!updateCar) {
            res.status(404).json({ success: false, message: "Voiture Pas Trouvé" });
            return;
        }
        res.status(200).json({ success: true, message: "Voiture Amélioré avec Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.updateCar = updateCar;
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = Number(req.query.skip) || 0;
        const cars = yield car_model_1.default.find({ carState: "Disponible" }).limit(10).skip(skip);
        if (cars.length === 0) {
            res.status(204).json({ success: true, cars: [] });
        }
        res.status(200).json({ success: true, cars: cars });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, messaeg: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.getCars = getCars;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        if (!carId) {
            res.status(401).json({ success: false, message: "Id de voiture n'est pas definé" });
            return;
        }
        const deleteCar = yield car_model_1.default.findByIdAndDelete(carId);
        if (!deleteCar) {
            res.status(401).json({ success: false, message: "Voiture Pas Trouvé" });
            return;
        }
        res.status(200).json({ success: true, message: "Voiture Supprimé aves Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.deleteCar = deleteCar;
const acceptReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reservationId } = req.body;
        if (!reservationId) {
            res.status(401).json({ success: false, message: "Id de Réservation Pas Trouvé" });
            return;
        }
        const updateReservation = yield reservation_model_1.default.findByIdAndUpdate(reservationId, {
            status: "Accepté"
        }, { new: true });
        if (!updateReservation) {
            res.status(404).json({ success: false, message: "Réservation Pas Trouvé" });
            return;
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: ADMIN_GMAIL,
                pass: GMAIL_PASS
            }
        });
        var mailOptions = {
            from: ADMIN_GMAIL,
            to: updateReservation.userGmail,
            subject: "Réservation Accepté chez Rent Car Ismaail",
            text: 'Votre Réservation a été Accepté Par Rent Car Ismaail'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ success: false, message: error.message });
            }
            else {
                res.status(200).json({ success: true, message: "Réservation Acceté Avec Succès" });
            }
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.acceptReservation = acceptReservation;
const rejectReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reservationId } = req.body;
        if (!reservationId) {
            res.status(401).json({ success: false, message: "Id de Réservation Pas Trouvé" });
            return;
        }
        const updateReservation = yield reservation_model_1.default.findByIdAndUpdate(reservationId, {
            status: "Refusé"
        }, { new: true });
        if (!updateReservation) {
            res.status(404).json({ success: false, message: "Réservation Pas Trouvé" });
            return;
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: ADMIN_GMAIL,
                pass: GMAIL_PASS
            }
        });
        var mailOptions = {
            from: ADMIN_GMAIL,
            to: updateReservation.userGmail,
            subject: "Votre Réservation A été Refusé chez Rent Car Ismaail",
            text: 'Votre Réservation A été Refusé chez Rent Car Ismaail'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ success: false, message: error.message });
            }
            else {
                res.status(200).json({ success: true, message: "Réservation Refusé Avec Succès" });
            }
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.rejectReservation = rejectReservation;
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReservations = yield reservation_model_1.default.countDocuments({ status: "En Attend" });
        const cars = yield car_model_1.default.countDocuments({});
        res.status(200).json({ success: true, newReservations: newReservations, cars: cars });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.getDashboard = getDashboard;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reservationId } = req.query;
        if (!reservationId) {
            res.status(401).json({ success: false, message: "Réservation Id est Manqué" });
            return;
        }
        const deleteReservation = yield reservation_model_1.default.findByIdAndDelete(reservationId);
        if (!deleteReservation) {
            res.status(404).json({ success: false, message: "Réservation Pas Trouvé" });
            return;
        }
        res.status(200).json({ success: true, message: "Réservation Supprimé avec Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.deleteReservation = deleteReservation;
const getAdminReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = Number(req.query.skip) || 0;
        const reservations = yield reservation_model_1.default.find({}).populate("carId").skip(skip).limit(10);
        if (reservations.length === 0) {
            res.status(204).json({ success: true, cars: [], message: "Aucun Réservation" });
            return;
        }
        res.status(200).json({ success: true, reservations: reservations });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log((err === null || err === void 0 ? void 0 : err.stack) || "Stack is not defined");
    }
});
exports.getAdminReservations = getAdminReservations;
