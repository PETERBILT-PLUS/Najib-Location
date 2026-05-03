import express from "express";
import { app, server } from "./socket/socket.js";
import adminRouter from "./Router/admin.router.js";
import { connectToMongoDb } from "./Database/mongodb_connection.js";
import reservationRouter from "./Router/reservation.router.js";
import cors from "cors";

const DEPLOYMENT: string = process.env.DEPLOYMENT as string;
const CLIENT: string = process.env.CLIENT as string;

if (!DEPLOYMENT) throw new Error("the DEPLOYMENT is not defined please check the .env file");
if (!CLIENT) throw new Error("the CLIENT is not defined please check the .env file");

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: false,
    origin: DEPLOYMENT == "development" ? "http://localhost:5173" : CLIENT,
}));

const PORT: number = Number(process.env.PORT) as number;
const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!PORT) throw new Error("the PORT is not defined please check the .env file");
if (!MONGODB_URI) throw new Error("the MONGODB_URI is not defined please check the .env file");

app.use("/admin", adminRouter);
app.use("/user", reservationRouter);

server.listen(PORT, async () => {
    await connectToMongoDb(MONGODB_URI);
    console.log(`Server is running on port ${PORT}`);
});