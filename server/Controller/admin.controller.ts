import { Request, Response } from "express";
import carModel, { ICar } from "../Model/car.model";
import reservationModel, { IReservation } from "../Model/reservation.model";
import nodemailer from "nodemailer";


const GMAIL_PASS: string = process.env.GMAIL_PASS as string;
const ADMIN_GMAIL: string = process.env.ADMIN_GMAIL as string;

if (!GMAIL_PASS || !ADMIN_GMAIL) {
    throw new Error("the ADMIN_GMAIL or GMAIL_PASS is not defined please check the .env file");
}

export const createVehicule = async (req: Request, res: Response) => {
    try {
        const { carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, pricePerDay, carState } = req.body;
        if (!carName || !carMarque || !carKm || !carPlaces || !carFuel || !carType || !carImages || !pricePerDay || !carState) {
            res.status(401).json({ success: false, message: "Manque D'informations" });
            return;
        }

        const newCar: ICar = new carModel({ carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, pricePerDay, carState });

        await newCar.save();

        res.status(201).json({ success: true, message: "Voiture Crée avec Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err.stack || "the Stack is not defined");
    }
};

export const updateCar = async (req: Request, res: Response) => {
    try {
        const { carId, carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, carState } = req.body;
        if (!carId || !carName || !carMarque || !carKm || !carPlaces || !carFuel || !carType || !carImages || !carState || !Array.isArray(carImages)) {
            res.status(401).json({ success: false, message: "Manque d'informations" });
            return;
        }

        const updateCar: ICar | null = await carModel.findByIdAndUpdate(carId, {
            carName, carMarque, carKm, carPlaces, carFuel, carType, carImages, carState
        });
        if (!updateCar) {
            res.status(404).json({ success: false, message: "Voiture Pas Trouvé" });
            return;
        }

        res.status(200).json({ success: true, message: "Voiture Amélioré avec Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const getCars = async (req: Request, res: Response) => {
    try {
        const skip = Number(req.query.skip) || 0;

        const cars: ICar[] | [] = await carModel.find({ carState: "Disponible" }).limit(10).skip(skip);

        if (cars.length === 0) {
            res.status(204).json({ success: true, cars: [] });
        }

        res.status(200).json({ success: true, cars: cars });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, messaeg: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const carId = req.params.carId;

        if (!carId) {
            res.status(401).json({ success: false, message: "Id de voiture n'est pas definé" });
            return;
        }

        const deleteCar: ICar | null = await carModel.findByIdAndDelete(carId);

        if (!deleteCar) {
            res.status(401).json({ success: false, message: "Voiture Pas Trouvé" });
            return;
        }

        res.status(200).json({ success: true, message: "Voiture Supprimé aves Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const acceptReservation = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.body;
        if (!reservationId) {
            res.status(401).json({ success: false, message: "Id de Réservation Pas Trouvé" });
            return;
        }

        const updateReservation: IReservation | null = await reservationModel.findByIdAndUpdate(reservationId, {
            status: "Accepté"
        }, { new: true });

        if (!updateReservation) {
            res.status(404).json({ success: false, message: "Réservation Pas Trouvé" });
            return;
        }

        const transporter = nodemailer.createTransport({
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
            } else {
                res.status(200).json({ success: true, message: "Réservation Acceté Avec Succès" });
            }
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const rejectReservation = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.body;
        if (!reservationId) {
            res.status(401).json({ success: false, message: "Id de Réservation Pas Trouvé" });
            return;
        }

        const updateReservation: IReservation | null = await reservationModel.findByIdAndUpdate(reservationId, {
            status: "Refusé"
        }, { new: true });

        if (!updateReservation) {
            res.status(404).json({ success: false, message: "Réservation Pas Trouvé" });
            return;
        }

        const transporter = nodemailer.createTransport({
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
            } else {
                res.status(200).json({ success: true, message: "Réservation Refusé Avec Succès" });
            }
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const newReservations: number = await reservationModel.countDocuments({ status: "En Attend" });

        const cars: number = await carModel.countDocuments({});

        res.status(200).json({ success: true, newReservations: newReservations, cars: cars });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.query;

        if (!reservationId) {
            res.status(401).json({ success: false, message: "Réservation Id est Manqué" });
            return;
        }

        const deleteReservation: IReservation | null = await reservationModel.findByIdAndDelete(reservationId);
        if (!deleteReservation) {
            res.status(404).json({ success: false, message: "Réservation Pas Trouvé" });
            return;
        }

        res.status(200).json({ success: true, message: "Réservation Supprimé avec Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};

export const getAdminReservations = async (req: Request, res: Response) => {
    try {
        const skip: number = Number(req.query.skip) || 0;

        const reservations: IReservation[] | [] = await reservationModel.find({}).populate("carId").skip(skip).limit(10);
        if (reservations.length === 0) {
            res.status(204).json({ success: true, cars: [], message: "Aucun Réservation" });
            return;
        }

        res.status(200).json({ success: true, reservations: reservations });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err?.stack || "Stack is not defined");
    }
};