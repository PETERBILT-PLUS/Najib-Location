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
const express_1 = __importDefault(require("express"));
const socket_js_1 = require("./socket/socket.js");
const admin_router_js_1 = __importDefault(require("./Router/admin.router.js"));
const mongodb_connection_js_1 = require("./Database/mongodb_connection.js");
const reservation_router_js_1 = __importDefault(require("./Router/reservation.router.js"));
const cors_1 = __importDefault(require("cors"));
const DEPLOYMENT = process.env.DEPLOYMENT;
const CLIENT = process.env.CLIENT;
if (!DEPLOYMENT)
    throw new Error("the DEPLOYMENT is not defined please check the .env file");
if (!CLIENT)
    throw new Error("the CLIENT is not defined please check the .env file");
socket_js_1.app.use(express_1.default.json({ limit: "1mb" }));
socket_js_1.app.use(express_1.default.urlencoded({ extended: true }));
socket_js_1.app.use((0, cors_1.default)({
    credentials: false,
    origin: DEPLOYMENT == "development" ? "http://localhost:5173" : CLIENT,
}));
const PORT = Number(process.env.PORT);
const MONGODB_URI = process.env.MONGODB_URI;
if (!PORT)
    throw new Error("the PORT is not defined please check the .env file");
if (!MONGODB_URI)
    throw new Error("the MONGODB_URI is not defined please check the .env file");
socket_js_1.app.use("/admin", admin_router_js_1.default);
socket_js_1.app.use("/user", reservation_router_js_1.default);
socket_js_1.server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongodb_connection_js_1.connectToMongoDb)(MONGODB_URI);
    console.log(`Server is running on port ${PORT}`);
}));
