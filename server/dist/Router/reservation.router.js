"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_controller_js_1 = require("../Controller/reservation.controller.js");
const reservationRouter = express_1.default.Router();
// passed
reservationRouter.get("/get-cars", reservation_controller_js_1.getUSerCars);
reservationRouter.get("/get-single-car/:carId", reservation_controller_js_1.getSingleCar);
// passed
reservationRouter.post("/create-reservation", reservation_controller_js_1.createReservation);
exports.default = reservationRouter;
