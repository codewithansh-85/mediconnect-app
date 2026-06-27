import express from "express";
import { addClinic, getprofileByEmail,updatelogo,getclinicByid,updateClinicProfile, getClinicslist } from "../controllers/cliniccpntroller.js";
import { upload } from "../middlewares/multer.js";
import RequireAuth from "../middlewares/RequireAuth.js";


const clinicrouter=express.Router()
clinicrouter.post("/addclinic",upload.fields([{name:"clinicimages",maxCount:5},{name:"logo",maxCount:1}]),RequireAuth,addClinic)
clinicrouter.post("/getclinicprofile",getprofileByEmail)
clinicrouter.post("/logo",upload.fields([{name:"logo",maxCount:1}]),updatelogo)
clinicrouter.get (`/getdata/:clinicId`,getclinicByid)
clinicrouter.post("/updateClinicProfile",updateClinicProfile)
clinicrouter.post("/cliniclist",getClinicslist)
export {clinicrouter}