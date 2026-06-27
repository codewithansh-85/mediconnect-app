import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   // users collection ka reference
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        age: {
            type: Number,
            required: true,
            trim: true,
        },
        contact: {
            type: Number,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        profileImg: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            trim: true,
        },
        DOB: {
            type: String,
            required: true,
            trim: true,
        },
        blood_grp: {
            type: String,
            required: true,
            trim: true,
        },
        Ename: {
            type: String,
            required: true,
            trim: true,
        },
        Erelation: {
            type: String,
            required: true,
            trim: true,
        },
        Econtact: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
)

export const PatientModel = mongoose.model("patient", PatientSchema)