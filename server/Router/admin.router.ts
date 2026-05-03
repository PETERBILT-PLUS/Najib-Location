import express from "express";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { acceptReservation, createVehicule, deleteCar, deleteReservation, getAdminReservations, getCars, getDashboard, rejectReservation, updateCar } from "../Controller/admin.controller.js";
import { createAdmin, loginAdmin } from "../Controller/auth.admin.controller.js";
import { getSingleCar } from "../Controller/reservation.controller.js";

const adminRouter = express.Router();

// passed
adminRouter.get("/get-dashboard", adminMiddleware, getDashboard);
// passed
adminRouter.get("/get-cars", adminMiddleware, getCars);
// passed
adminRouter.get("/get-reservations", adminMiddleware, getAdminReservations);
// passed
adminRouter.get("/get-single-car/:carId", getSingleCar);
// passed
adminRouter.post("/create-admin", createAdmin);
// passed
adminRouter.post("/login-admin", loginAdmin);
// passed
adminRouter.post("/create-car", adminMiddleware, createVehicule);
// passed
adminRouter.post("/accept-reservation", adminMiddleware, acceptReservation);
// passed
adminRouter.post("/reject-reservation", adminMiddleware, rejectReservation);
// passed
adminRouter.put("/update-car", adminMiddleware, updateCar);
// passed
adminRouter.delete("/delete-car/:carId", adminMiddleware, deleteCar);
// passed
adminRouter.delete("/delete-reservation", adminMiddleware, deleteReservation);

export default adminRouter;