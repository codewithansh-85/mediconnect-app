import { PatientModel } from "../models/PatientModel.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const AddPatient = async (req, res) => {

    try {
        const userId = req.user.id

        const { name, age, contact, address, email, gender,DOB,blood_grp,Ename ,Erelation,Econtact} = req.body
        if ([name, age, contact, address, email, gender,DOB,blood_grp,Ename ,Erelation,Econtact].some((fields) =>
            fields?.trim() === "")) {
            return res.status(200).send({
                message: "All fields are required",
                Status: "notsuccess"
            })
        }

        const existingPatient = await PatientModel.findOne({ email })
        if (existingPatient) {
            return res.status(200).send({
                message: "Account Already Exists",
                Status: "notsuccess"
            })
        }

        if (!req.files.profileImg || !req.files.profileImg[0]) {
            return res.status(200).send({
                message: "Profile image is compulsory",
                Status: "notsuccess"
            })
        }

        const profileImgpath = req.files?.profileImg[0]?.path
        if (!profileImgpath) {
            return res.status(200).send({
                message: "Profile image is compulsory",
                Status: "notsuccess"
            })
        }

        const image = await uploadOnCloudinary(profileImgpath)

        const Patient = await PatientModel.create({
            userId,
            name,
            age,
            email,
            contact,
            address,
            gender,
            profileImg: image.url,
            DOB,
            blood_grp,
            Ename ,
            Erelation,
            Econtact
        })

        return res.status(200).send({
            message: "Account Created Successfully!",
            Status: "success",
            data: Patient
        })
    } catch (error) {
        return res.status(500).send({
            message: `patient profile controller ${error.message}`,
            Status: "notsuccess"
        })

    }

}

const updatePatient = async (req, res) => {
    try {
        const updatedata = req.body

        updatedata.updatedAt = new Date();

        const { patientID, ...fieldsToUpdate } = updatedata;

        const updatedpatient = await PatientModel.findByIdAndUpdate(
            patientID,
            fieldsToUpdate,
            { new: true }

        )
        if (!updatedpatient) {
            return res.status(404).send({ message: 'account not found', Status: "notsuccess" });
        }
        return res.status(200).send({
            message: 'Profile updated successfully',
            patient: updatedpatient,
            Status: "success"
        });
    } catch (error) {
        return res.status(500).send({
            message: `update patient controller error ${error.message}`,
            Status: "notsuccess"
        })

    }
}

const getProfileByEmail = async (req, res) => {
    const { email } = req.query
    console.log(email)
    try {
        const patient = await PatientModel.findOne({ email })
        if (!patient) {
            return res.status(200).send({
                status: "notsuccess",
                message: "patient not found",


            });
        }
        return res.status(200).send({
            data: patient,
            status: "success",
            message: "Profile fetched successfully"
        })

    } catch (error) {

        return res.status(500).send({
            message: `server error ${error}`
        })

    }
}

const getProfileById = async (req, res) => {
    const { id } = req.params
    console.log(`patient Id ${id}`)
    try {
        const patient = await PatientModel.findById( id )
        if (!patient) {
            return res.status(200).send({
                status: "notsuccess",
                message: "patient not found",


            });
        }
        return res.status(200).send({
            data: patient,
            status: "success",
            message: "Profile fetched successfully"
        })

    } catch (error) {

        return res.status(500).send({
            message: `server error ${error}`
        })

    }
}









export { AddPatient, updatePatient, getProfileByEmail,getProfileById }