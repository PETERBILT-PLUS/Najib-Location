import http from "http";
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

export const app = express();
export const server = http.createServer(app);

const CLIENT: string = process.env.CLIENT as string;
const DEPLOYMENT: string = process.env.DEPLOYMENT as string;

if (!CLIENT) throw new Error("the CLIENT is not defined please check the .env file");
if (!DEPLOYMENT) throw new Error("the DEPLOYMENT is not defined please check the .env file");

export const io = new Server(server, {
    cors: {
        credentials: true,
        origin: DEPLOYMENT == "development" ? "http://localhost:5173" : CLIENT,
    }
});
