import mongoose from "mongoose"


const AppSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
        required: true
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clinic",
        required: true

    },
    concern: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Upcoming",
        enum: ["Upcoming", "Completed", "Cancelled"]
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    Appdate: {
        type: String,
        required: true,

    },
    Apptime: {
        type: String,
        required: true
    },
    Remarks:{
        type: String,
        default:""
    },
    prescription:{
        type: String,
        default:""
    }

}, {
    timestamps: true
})

export const AppointmentModel = mongoose.model("appointment", AppSchema)