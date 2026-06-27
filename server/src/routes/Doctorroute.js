import express from "express"
import { addDoctor,viewprofileByEmail,updateDoctorProfile,getdoctorbyid,updateprofileimg,addClinicToDoc,RemoveClinicFromDoc,getdoctorlist,getdoctors} from "../controllers/doctorcontroller.js";
import { upload } from "../middlewares/multer.js";
import RequireAuth from "../middlewares/RequireAuth.js";
const doctorrouter=express.Router();




doctorrouter.post("/add-doctor",upload.fields([{name:"doctorimg",maxCount:1},{name:"licenseimg",maxCount:1}]),RequireAuth, addDoctor)
doctorrouter.post("/getdoctprofile",viewprofileByEmail)
doctorrouter.post("/updateDoctorProfile",updateDoctorProfile)
doctorrouter.get("/getdata/:doctorID",getdoctorbyid)
doctorrouter.post("/updateprofileimg",upload.fields([{name:"doctorimg",maxCount:1}]),updateprofileimg)
doctorrouter.post("/addClinicToDoc",addClinicToDoc)
doctorrouter.post("/RemoveClinicFromDoc",RemoveClinicFromDoc)
doctorrouter.post("/getdoctorlist/:specialization",getdoctorlist)
doctorrouter.get("/getdoctors",getdoctors)
export default doctorrouter;