import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import adminModel, { IAdmin } from "../Model/admin.model.js";

declare global {
    namespace Express {
        interface Request {
            admin?: any,
        }
    }
}

const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!JWT_SECRET) throw new Error("the JWT_SECRET is not defined please check the .env file");

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.query.token || req.body.token;

        if (!token) {
            res.status(401).json({ success: false, message: "Token Pas Trouvé" });
            return;
        }
        try {
            const verify = jwt.verify(token, JWT_SECRET) as JwtPayload;

            const adminExist: IAdmin | null = await adminModel.findById(verify._id);
            if (!adminExist) {
                res.status(401).json({ success: false, message: "admin Pas Trouvé Inscrire a Nouveau" })
                return;
            }

            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                res.status(401).json({ success: false, message: "Token Expiré Veillé Inscrire a Nouveau" });
            } else if (error instanceof JsonWebTokenError) {
                res.status(401).json({ success: false, message: "Token Erreur Veillé Inscrire a Nouveau" });
            }
        }
    } catch (error) {
        const err = error as Error;
        console.error(err.message);
        console.error(err?.stack || "stack is not defined");
        res.status(500).json({ success: false, message: "Erreur Interne du Serveur", error: err.message })
    }
};