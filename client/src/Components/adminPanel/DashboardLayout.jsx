import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Header from './Header'
import "../../styles/Adminpanel.css"
import { Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import { setMyclinics } from '../../Reducers/Doctorreducers.js';
import { useDispatch } from 'react-redux';
import { Footer } from "antd/es/layout/layout.js";
const DashboardLayout = () => {

  const Dispatch = useDispatch()
  const getdoctorprofile = async () => {
    try {

      const profileresponse = await axios.post("/Dental/doctor/getdoctprofile",
        {},
         {
        headers: {
          "Content-Type": "multipart/form-data"
        }
        ,


        params: {
          email: localStorage.getItem("email")
        }

      }
      )

      if (profileresponse.data.status === "success") {
        console.log(profileresponse)
        Dispatch(setMyclinics(profileresponse.data.data));
        localStorage.setItem("doctorid", profileresponse.data.data._id)

      }
      else {
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

  useEffect(() => {
    getdoctorprofile()

  }, [])

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const ToggleFunction = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <div className='min-h-screen flex flex-col bg-[#f4f4f5] '>
      <Header className="z-10" isToggleSidebar={ToggleFunction} />
      <div className='flex flex-1  bg-[#f4f4f5] '>
        <Sidebar className={`${isSideBarOpen ? `w-full` : `w-0 `} transition-all duration-500 ease-in-out h-[calc(100vh-90px)] fixed top-[90px] left-0 md:w-1/4 lg:w-1/5 bg-[#fff] rounded-tr-[40px] shadow-[5px_20px_14px_rgba(46,55,164,0.05)] overflow-y-scroll scrollbar-hide`} />

        <main className="flex-1 md:ml-[25%] lg:ml-[20%] px-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;