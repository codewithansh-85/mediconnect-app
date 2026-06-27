import { AppointmemtController, getAppointment, getAppointmentforDoc,getAppointmentdetails,updatestatus ,updateprescription} from "../controllers/AppointmemtController.js";
import RequireAuth from "../middlewares/RequireAuth.js";
import express from "express"
import { upload } from "../middlewares/multer.js";

const Appointmentrouter = express.Router()

Appointmentrouter.post("/book-appointment", RequireAuth, AppointmemtController)
Appointmentrouter.post("/getappointments/patient/:patientId", getAppointment)
Appointmentrouter.post("/getappointments/doctor/:doctorId", getAppointmentforDoc)
Appointmentrouter.post("/getAppDetails", getAppointmentdetails)
Appointmentrouter.put(`/updatestatus/:appointmentId`, updatestatus)
Appointmentrouter.put(`/updateprescription`,upload.fields([{name:"prescription",maxCount:1}]) ,updateprescription)

    
export default Appointmentrouter