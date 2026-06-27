import express from "express"
import { AddPatient,getProfileByEmail,getProfileById } from "../controllers/PatientController.js";
import { upload } from "../middlewares/multer.js";
import RequireAuth from "../middlewares/RequireAuth.js";


const PatientRouter=express.Router();

PatientRouter.post("/addpatient",upload.fields([{name:"profileImg",maxCount:1}]),RequireAuth,AddPatient)

PatientRouter.post("/getPatientprofile",getProfileByEmail)
PatientRouter.get("/getPatientdata/:id",getProfileById)


export default PatientRouter