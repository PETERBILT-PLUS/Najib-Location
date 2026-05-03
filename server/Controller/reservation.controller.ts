import { Request, Response } from "express";
import reservationModel, { IReservation } from "../Model/reservation.model";
import carModel, { ICar } from "../Model/car.model";
import nodemailer from "nodemailer";


const GMAIL_PASS: string = process.env.GMAIL_PASS as string;
const ADMIN_GMAIL: string = process.env.ADMIN_GMAIL as string;

if (!GMAIL_PASS) {
    throw new Error("the GMAIL_PASS is not defined please check the .env file");
}

if (!ADMIN_GMAIL) {
    throw new Error("the ADMIN_GMAIL is not defined please check the .env file");
}

export const createReservation = async (req: Request, res: Response) => {
    try {
        const { carId, startDate, endDate, name, phoneNumber, userGmail } = req.body;

        if (!carId || !startDate || !endDate || !name || !phoneNumber || !userGmail) {
            res.status(401).json({ success: false, message: "Manque D'informations" });
            return;
        }

        const newReservation: IReservation = new reservationModel({
            carId, startDate, endDate, name, phoneNumber, userGmail
        });

        await newReservation.save();

        const transporter = nodemailer.createTransport({
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
            } else {
                res.status(200).json({ success: true, message: "Réservation Accepté aves Succcès" });
            }
        });

        res.status(201).json({ success: true, message: "Réservation Crée avec Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not Defined")
    }
};

export const getUSerCars = async (req: Request, res: Response) => {
    try {
        const skip: number = Number(req.query.skip) || 0;

        const cars: ICar[] | [] = await carModel.find({ carState: "Disponible" }).limit(10).skip(skip);

        if (cars.length === 0) {
            res.status(204).json({ success: true, cars: [] });
            return;
        }

        res.status(200).json({ success: true, cars: cars });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not Defined")
    }
};

export const getSingleCar = async (req: Request, res: Response) => {
    try {
        const { carId } = req.params;
        if (!carId) {
            res.status(401).json({ success: false, message: "Voiture id est Manqué" });
            return;
        }

        const car: ICar | null = await carModel.findById(carId);
        if (!car) {
            res.status(404).json({ success: false, message: "Voiture Pas Trouvé" });
            return;
        }

        res.status(200).json({ success: true, car: car });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not Defined")
    }
};