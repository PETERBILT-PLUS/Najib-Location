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
exports.loginAdmin = exports.createAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../Model/admin.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
if (!ADMIN_SECRET)
    throw new Error("the ADMIN_SECRET is not available please check the .env file");
if (!JWT_SECRET)
    throw new Error("the JWT_SECRET is not defined please check the .env file");
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newAdmin = new admin_model_1.default({ username, email, password: hashedPassword });
        yield newAdmin.save();
        res.status(201).json({ success: true, message: "Admin Crée avec Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: "Erreur Interne du Serveur" });
        console.log(err.message);
        console.log(err.stack || "Stack is not defined");
    }
});
exports.createAdmin = createAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ success: false, messsage: "Manque D'informations" });
            return;
        }
        const adminExist = yield admin_model_1.default.findOne({ email: email });
        if (!adminExist) {
            res.status(401).json({ success: false, message: "E-mail ou Mot de Passe est incorrect" });
            return;
        }
        const passwordCompare = yield bcrypt_1.default.compare(password, adminExist.password);
        if (!passwordCompare) {
            res.status(401).json({ success: false, message: "E-mail ou Mot de Passe est incorrect" });
        }
        const token = jsonwebtoken_1.default.sign({ _id: adminExist._id }, JWT_SECRET, { expiresIn: "90d" });
        res.status(200).json({ success: true, token: token, message: "Login Succès" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message);
        console.log(err.stack || "Stack is not defined");
    }
});
exports.loginAdmin = loginAdmin;
