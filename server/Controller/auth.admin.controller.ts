import { Request, Response } from "express";
import bcrypt from "bcrypt";
import adminModel, { IAdmin } from "../Model/admin.model";
import jwt from "jsonwebtoken";

const ADMIN_SECRET: string = process.env.ADMIN_SECRET as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!ADMIN_SECRET) throw new Error("the ADMIN_SECRET is not available please check the .env file");
if (!JWT_SECRET) throw new Error("the JWT_SECRET is not defined please check the .env file");

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { username, email, password, admin_secret } = req.body;

        if (!username || !email || !password || !admin_secret) {
            res.status(401).json({ success: false, message: "Manque D'informations" });
            return;
        }

        if (admin_secret != ADMIN_SECRET) {
            res.status(403).json({ success: false, message: "Pas Autorisé, admin secret est faux" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin: IAdmin = new adminModel({ username, email, password: hashedPassword });

        await newAdmin.save();

        res.status(201).json({ success: true, message: "Admin Crée avec Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: "Erreur Interne du Serveur" });
        console.log(err.message);
        console.log(err.stack || "Stack is not defined");
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ success: false, messsage: "Manque D'informations" });
            return;
        }

        const adminExist: IAdmin | null = await adminModel.findOne({ email: email });
        if (!adminExist) {
            res.status(401).json({ success: false, message: "E-mail ou Mot de Passe est incorrect" });
            return;
        }

        const passwordCompare = await bcrypt.compare(password, adminExist.password);

        if (!passwordCompare) {
            res.status(401).json({ success: false, message: "E-mail ou Mot de Passe est incorrect" });
        }

        const token = jwt.sign({ _id: adminExist._id }, JWT_SECRET, { expiresIn: "90d" });

        res.status(200).json({ success: true, token: token, message: "Login Succès" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err.stack || "Stack is not defined");
    }
};