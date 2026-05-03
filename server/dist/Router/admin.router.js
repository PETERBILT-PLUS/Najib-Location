"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminMiddleware_js_1 = require("../middleware/adminMiddleware.js");
const admin_controller_js_1 = require("../Controller/admin.controller.js");
const auth_admin_controller_js_1 = require("../Controller/auth.admin.controller.js");
const reservation_controller_js_1 = require("../Controller/reservation.controller.js");
const adminRouter = express_1.default.Router();
// passed
adminRouter.get("/get-dashboard", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.getDashboard);
// passed
adminRouter.get("/get-cars", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.getCars);
// passed
adminRouter.get("/get-reservations", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.getAdminReservations);
// passed
adminRouter.get("/get-single-car/:carId", reservation_controller_js_1.getSingleCar);
// passed
adminRouter.post("/create-admin", auth_admin_controller_js_1.createAdmin);
// passed
adminRouter.post("/login-admin", auth_admin_controller_js_1.loginAdmin);
// passed
adminRouter.post("/create-car", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.createVehicule);
// passed
adminRouter.post("/accept-reservation", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.acceptReservation);
// passed
adminRouter.post("/reject-reservation", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.rejectReservation);
// passed
adminRouter.put("/update-car", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.updateCar);
// passed
adminRouter.delete("/delete-car/:carId", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.deleteCar);
// passed
adminRouter.delete("/delete-reservation", adminMiddleware_js_1.adminMiddleware, admin_controller_js_1.deleteReservation);
exports.default = adminRouter;
