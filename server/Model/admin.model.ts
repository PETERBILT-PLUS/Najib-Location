import mongoose, { Document } from "mongoose";

export interface IAdmin extends Document {
    username: string;
    email: string;
    password: string;
}

const AdminModel = new mongoose.Schema<IAdmin>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Admin", AdminModel);