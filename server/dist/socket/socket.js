"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
const CLIENT = process.env.CLIENT;
const DEPLOYMENT = process.env.DEPLOYMENT;
if (!CLIENT)
    throw new Error("the CLIENT is not defined please check the .env file");
if (!DEPLOYMENT)
    throw new Error("the DEPLOYMENT is not defined please check the .env file");
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        credentials: true,
        origin: DEPLOYMENT == "development" ? "http://localhost:5173" : CLIENT,
    }
});
