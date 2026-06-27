import React from 'react'
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./../../styles/common.css"
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";


const Footer = () => {
  return (
    <div >
      <div className='flex flex-col lg:flex-row justify-between items-center  p-4 my-2 bg-gradient-to-r from-[#333CA6] to-[#409eff] text-white'>
        <h2 className='font-bold w-full lg:w-[40%] text-white text-center lg:text-left text-[7vmin] text-left'>Working for Your Better Health.</h2>
        <div className='flex flex-col lg:flex-row text-center lg:text-left w-full  lg:w-[60%] justify-center items-center gap-8'>
          <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
            <div className='h-10 w-10 bg-white rounded-full flex justify-center items-center'>
              <RiCustomerServiceFill className='h-6 w-6 text-[#4652d0] ' />
            </div>

            <div>

              <p>Customer Support</p>
              <p>+1 56589 54598</p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
            <div className='h-10 w-10 bg-white rounded-full flex justify-center items-center'>
              <FaRegMessage className='h-6 w-6 text-[#409eff]' />
            </div>
            <div>
              <p>Drop Us an Email</p>
              <p>support@mediconnect.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative min-h-[300px] rounded-lg ">


        {/* Background Image */}


        {/* Gradient Overlay */}
        <div className="absolute rounded-xl bg-gradient-to-r from-[rgba(51,60,166,0.2)] to-[rgba(92,106,255,0.2)] w-full h-full left-0 top-0"></div>

        {/* Content */}
        <div className="relative z-10 px-6 py-2 flex flex-col md:flex-row ">
          <div className='flex-1 text-[#353eaa] text-md leading-relaxed '>
            <div className='  z-10 h-[100px] w-[200px]'>
              <img className='h-full w-full object-cover' src={logo} alt="" />
            </div>
            <p>MediConnect – Seamless connection between doctors and patients for easy appointments and healthcare access.</p>
            <div className='flex my-4 gap-4 text-xl text-gray-700'>
              <div className='h-10 w-10 hover-container cursor-pointer rounded-full flex justify-center items-center bg-[#c9ccf5] hover:text-[#c9ccf5] hover:bg-gray-700 transition duration-300'>
                <FaInstagram className='hover-rotate-y-360 transition-transform duration-1000' />

              </div>
              <div className='h-10 w-10 hover-container cursor-pointer rounded-full flex justify-center items-center bg-[#c9ccf5] hover:text-[#c9ccf5] hover:bg-gray-700 transition duration-300'>
                <FaFacebook className='hover-rotate-y-360 transition-transform duration-1000' />

              </div>
              <div className='h-10 w-10 hover-container cursor-pointer rounded-full flex justify-center items-center bg-[#c9ccf5] hover:text-[#c9ccf5] hover:bg-gray-700 transition duration-300'>
                <FaTwitterSquare className='hover-rotate-y-360 transition-transform duration-1000' />

              </div>
              <div className='h-10 w-10 hover-container cursor-pointer rounded-full flex justify-center items-center bg-[#c9ccf5] hover:text-[#c9ccf5] hover:bg-gray-700 transition duration-300'>
                <FaLinkedin className='hover-rotate-y-360 transition-transform duration-1000' />

              </div>

            </div>
          </div>

          <div className='flex-1'>
            <div className='flex-1 flex flex-col justify-center items-center'>
              <h2 className='font-bold text-[#353eaa]'>Our Specialities</h2>
              <ul className='gap-8 text-center'>

                <li className='text-[#353eaa] transition duration-300'>General Physician</li>

                <li className='text-[#353eaa] transition duration-300'>Gynacology</li>

                <li className='text-[#353eaa] transition duration-300'>Dermatology</li>

                <li className='text-[#353eaa]  transition duration-300'>Pediatrics</li>

                <li className='text-[#353eaa]  transition duration-300'>Neurology</li>

                <li className='text-[#353eaa]  transition duration-300'>Cardiology</li>
                <li className='text-[#353eaa]  transition duration-300'>Orthopedics</li>
                <li className='text-[#353eaa]  transition duration-300'>Psychiatry</li>
                <li className='text-[#353eaa]  transition duration-300'>Dentistry</li>

              </ul>
            </div>

          </div>
          <div className='flex-1 text-center'>
            <div>
              <h2 className='font-bold text-[#353eaa] flex flex-col justify-center items-center'>Usefull Links</h2>
              <ul className='gap-8 '>
                <NavLink to="/" className="relative group">
                  <li className='text-[#353eaa] hover:text-[white] transition duration-300'>Home</li>
                </NavLink>
                <NavLink to="/doctors" className="relative group">
                  <li className='text-[#353eaa] hover:text-[white] transition duration-300'>All Doctors</li>
                </NavLink>
               
                <NavLink to="/about" className="relative group">
                  <li className='text-[#353eaa] hover:text-[white] transition duration-300'>About</li>
                </NavLink>
                <NavLink to="/contact" className="relative group">
                  <li className='text-[#353eaa] hover:text-[white] transition duration-300'>Contact</li>
                </NavLink>
              </ul>
            </div>
          </div>
          <div className='flex-1 '>
           <div className='flex flex-col justify-center items-center'>
             <h2 className='font-bold text-[#353eaa]'>Our services</h2>
            <ul className='gap-8 text-center text-[#353eaa]'>
              <li>Online Consultation</li>
              <li>Appointment Booking</li>
              <li>Lab Test Booking</li>
              <li>Health Records Management</li>
            </ul>
           </div>
          </div>


        </div>
        <hr />
        <p className='text-center text-sm text-gray-500 py-2'>© 2025 MediConnect. All rights reserved.</p>
      </div>


    </div >
  )
}

export default Footer