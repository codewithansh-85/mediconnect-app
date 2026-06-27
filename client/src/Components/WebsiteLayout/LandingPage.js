import React, {useState, useEffect } from 'react'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPatient } from '../../Reducers/Doctorreducers.js'
import axios from 'axios'
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const LandingPage = () => {
    const Dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // scroll > 300px -> show
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
          Dispatch(setPatient(response.data.data))
          console.log(response.data.data)
          localStorage.setItem("patientid", response.data.data._id)
  
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    useEffect(()=>{
      getPatientprofile()
    })
    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

  }
  return (
    <div className='overflow-x-hidden'>
      <button
        onClick={scrollToTop}
        className={`fixed  bottom-5 right-4 z-[99999] group animate-bounce  ${visible ? "block" : "hidden"}  p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition`}
        aria-label="Scroll to top"
      >
        <MdOutlineKeyboardDoubleArrowUp className='relative ' size={24} />
        <span className="absolute top-0 left-0 w-50 h-[50px] bg-red-200 pointer-events-none opacity-10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></span>

      </button>
      <div className='w-[90%] mx-auto flex flex-col min-h-screen '>
        <Navbar className="fixed top-0 left-0 z-50"/>
        <main className="flex-grow">
            <Outlet/>
        </main>
        <Footer/>
    </div>
    </div>
  )
}

export default LandingPage