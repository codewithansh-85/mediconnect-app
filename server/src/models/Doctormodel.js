import mongoose from "mongoose";

const Doctorschema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   // users collection ka reference
            required: true
        },

        username: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        fee: {
            type: String,
            required: true,
            trim: true
        },
        exp: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true

        },
        doctorage: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,

            required: true,
            trim: true
        },
        DOB: {
            type: String,
            required: true,
            trim: true
        },
        mobileno: {
            type: String,
            required: true,
            trim: true
        },

        degree: {
            type: String,
            required: true,
            trim: true
        },
        doctorimg: {
            type: String,
            required: true

        },
        opentimings: {
            type: String,
            required: true
        },

        closetimings: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true,
            trim: true

        },
        licenseNo: {
            type: String,
            required: true,
            trim: true

        },
        licenseimg: [{
            type: String,
            required: true

        }],
        status: {
            type: Boolean,
            default: true
        },
        isprofile: {
            type: Boolean,
            default: false
        },
        biography: {
            type: String,
            required: true,
        },
        clinics: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "clinic"
            }
        ]
    },
    {
        timestamps: true
    }
)
export const Doctormodel = mongoose.model("Doctor", Doctorschema);