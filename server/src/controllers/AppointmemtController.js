import mongoose from "mongoose";
import { PatientModel } from "../models/PatientModel.js";
import { AppointmentModel } from "../models/Appointmentmodel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const AppointmemtController = async (req, res) => {
    try {
        const { clinicId, doctorId, Appdate, Apptime, concern } = req.body;
        const userId = req.user.id
        const patient = await PatientModel.findOne({ userId })
        if (!patient) {
            return res.status(404).send({
                message: "Patient not found",
                Status: "notsuccess"
            });
        }

        console.log(patient)
        if ([clinicId, doctorId, Appdate, Apptime, concern].some((Field) => {
            Field.trim() === ""
        })) {
            return res.status(200).send({
                message: "All fields are required",
                Status: "notsuccess"
            })
        }

        // const Appointment=await AppointmentModel.find({Appdate})
        const appointment = await AppointmentModel.create({
            patientId: patient._id,
            clinicId,
            Appdate,
            Apptime,
            doctorId,
            concern,
        })
        return res.status(200).send({
            message: "Appointment booked successfully",
            Status: "success",
            data: appointment
        })
    } catch (error) {
        return res.status(500).send({
            message: `Appointment error ${error}`,
            Status: "notsuccess"
        })
    }
}


const getAppointment = async (req, res) => {
    try {
        const { patientId } = req.params
        console.log(`patientId came to controller from params ${patientId}`)
        const { page, limit } = req.query;
        console.log(page, limit)

        const totalappointments = await AppointmentModel.countDocuments({
            patientId: patientId
        });
        console.log("totalappointments", totalappointments)

        const Appointments = await AppointmentModel.find({ patientId })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("doctorId", "username specialization")
            .populate("clinicId", "clinicname address")
            .sort({ createdAt: -1 });
        console.log(Appointments)

        if (!Appointments || Appointments.length === 0) {
            return res.status(200).send({
                message: "No appointments found",
                status: "notsuccess"
            });
        }
        res.status(200).send(
            {
                message: "Appointments are fetched",
                list: Appointments,
                totalpages: Math.ceil(totalappointments / limit),
                currentpage: page,
                status: "success"
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                message: `Appointments error : ${error}`,
                status: "failed"
            }
        )

    }
};

const getAppointmentforDoc = async (req, res) => {
    try {
        const { doctorId } = req.params
        console.log(`doctorId came to controller from params ${doctorId}`)
        const { page, limit } = req.query;
        console.log(page, limit)

        const totalappointments = await AppointmentModel.countDocuments({
            doctorId
        });
        console.log("totalappointments", totalappointments)

        const Appointments = await AppointmentModel.find({ doctorId })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("patientId", "name age gender")
            .populate("clinicId", "clinicname address")
            .sort({ createdAt: -1 });
        console.log(Appointments)

        if (!Appointments || Appointments.length === 0) {
            return res.status(200).send({
                message: "No appointments found",
                status: "notsuccess"
            });
        }
        res.status(200).send(
            {
                message: "Appointments are fetched",
                list: Appointments,
                totalpages: Math.ceil(totalappointments / limit),
                currentpage: page,
                status: "success"
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                message: `Appointments error : ${error}`,
                status: "failed"
            }
        )

    }

}

const getAppointmentdetails = async (req, res) => {
    try {
        const { doctorId, patientId } = req.body
        const { page, limit } = req.query
        const filter = {
            patientId: patientId,
            doctorId: doctorId
        }
        const totalappointments = await AppointmentModel.countDocuments(filter)
        console.log("totalappointments", totalappointments)

        const Appointments = await AppointmentModel.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("patientId", "name age gender concern")
            .sort({ createdAt: -1 });
        console.log(Appointments)
        if (!Appointments || Appointments.length === 0) {
            return res.status(200).send({
                message: "No Appointments Found",
                Status: "notsuccess"
            })
        }
        return res.status(200).send({
            data: Appointments,
            Status: "success",
            message: "Appointments fetched successfully",
            totalpages: Math.ceil(totalappointments / limit),
            currentpage: page,
        })
    } catch (error) {
        res.status(500).send({
            Status: "notsuccess",
            message: `Appointments error : ${error}`
        })
    }
}

const updatestatus=async(req,res)=>{
try {
    const {appointmentId}=req.params
    console.log(appointmentId)
    const {status}=req.body

    if(!appointmentId || !status){
        return res.status(200).send({
            Status:"notsuccess",
            message:"Appointment Id or status not available"
        })
    }
    const updated =await AppointmentModel.findByIdAndUpdate(
        appointmentId,
        {status:status},
        {new:true}
    ) 

    return res.status(200).send({
        Status:"success",
        message:"status updated successfully",
        data:updated
    })
} catch (error) {
     return res.status(500).send({
        Status:"notsuccess",
        message:error.message,
    })
}
}


const updateprescription=async(req,res)=>{
    try {
    const {id,remarks}=req.body


    if(!id || !remarks){
        return res.status(200).send({
            Status:"notsuccess",
            message:"Appointment Id or remarks not available"
        })
    }

     if (!req.files.prescription || !req.files.prescription[0]) {
            return res.status(200).send({
                message: "prescription image is compulsory",
                Status: "notsuccess"
            })
        }

        const prescriptionImgpath = req.files?.prescription[0]?.path
        if (!prescriptionImgpath) {
            return res.status(200).send({
                message: "prescription image is compulsory",
                Status: "notsuccess"
            })
        }

        const image = await uploadOnCloudinary(prescriptionImgpath)

    const updated =await AppointmentModel.findByIdAndUpdate(
        id,
            {
                Remarks: remarks,
                prescription: image.url
            },
            { new: true }
    ) 

    return res.status(200).send({
        Status:"success",
        message:"status updated successfully",
        data:updated
    })
} catch (error) {
     return res.status(500).send({
        Status:"notsuccess",
        message:error.message,
    })
}
}

export { AppointmemtController, getAppointment, getAppointmentforDoc, getAppointmentdetails,updatestatus,updateprescription }