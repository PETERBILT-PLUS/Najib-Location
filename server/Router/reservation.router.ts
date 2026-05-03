import express from "express";
import { createReservation, getSingleCar, getUSerCars } from "../Controller/reservation.controller.js";

const reservationRouter = express.Router();

// passed
reservationRouter.get("/get-cars", getUSerCars);

reservationRouter.get("/get-single-car/:carId", getSingleCar);
// passed
reservationRouter.post("/create-reservation", createReservation);

export default reservationRouter;