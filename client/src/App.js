
import React, { useState, useEffect } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import { setMyclinics, setPatient } from './Reducers/Doctorreducers.js';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom"

function App() {
  const dispatch = useDispatch()

  const getdoctorprofile = async () => {
    try {
      const doctorEmail = localStorage.getItem("doctorEmail")

      if (!doctorEmail) {
        return; // Don't make API call if no email is stored
      }

      const profileresponse = await axios.post("/Dental/doctor/getdoctprofile",
        { email: doctorEmail },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (profileresponse.data.status === "success") {
        console.log(profileresponse)
        dispatch(setMyclinics(profileresponse.data.data));
        console.log(profileresponse.data.data)

        localStorage.setItem("doctorid", profileresponse.data.data._id)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: profileresponse.data.message,
        });
      }
    } catch (error) {
      console.log("error", error)
    }
  }



  const getPatientprofile = async () => {
    try {
      const email = localStorage.getItem("patientEmail"); // email jo tumne save kiya tha
      if (!email) return; // agar email hi nahi hai to API call mat karo

      const response = await axios.post(`/Dental/patient/getPatientprofile`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          params: {
            email: email
          }
        }
      );
      if (response.data.status === "success") {
        dispatch(setPatient(response.data.data))
        console.log(response.data.data)
        localStorage.setItem("patientid", response.data.data._id)

      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getdoctorprofile();
    getPatientprofile()
  }, [dispatch])

  return (
    <div className="App">
      
      <Outlet />
    </div>
  );
}

export default App;
