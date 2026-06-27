import React, { useState, useEffect } from 'react'
import { IoMdMenu } from "react-icons/io";
import logo from "../../assets/logo.png"
import { useSelector } from 'react-redux';
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {clearMyclinics} from "../../Reducers/Doctorreducers.js"



const Header = ({ isToggleSidebar }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profile, setprofile] = useState(false)
  const setprofileFun = () => {
    setprofile(!profile)
    console.log(profile)
  }
  useEffect(() => {
    if (profile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [profile]);

  const profiledata = useSelector((state) => (state.MyClinics))
  console.log(profiledata)
    const doctorId=localStorage.setItem("doctorId",profiledata._id)

  const logout = () => {
    dispatch(clearMyclinics())
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    navigate("/")
  }
  return (
    <div className='sticky z-[9999] top-0'>
      <div className=' h-[80px] px-4  bg-white  flex items-center justify-between'>
        <IoMdMenu onClick={isToggleSidebar} className='cursor-pointer flex md:hidden' />

        <div className=' h-full w-[200px]'>
          <img className='h-full w-full object-cover' src={logo} alt="logo" />
        </div>

        <div className='flex justify-center items-center cursor-pointer  gap-6'>
          <div className='text-3xl'>
            <IoMdNotifications />

          </div>
          <div className={`h-[44px] w-[44px] flex justify-center items-center rounded-full p-[2px] bg-gradient-to-r from-[#333CA6] to-[#5c6aff]`}>
            <div onClick={setprofileFun} className='h-[40px] w-[40px] overflow-hidden cursor-pointer rounded-full border text-xl flex justify-center items-center font-bold text-[#ffffff] bg-gradient-to-r from-[#333CA6] to-[#5c6aff] border-gray-300'>
              <img src={profiledata.doctorimg} alt="" />
            </div>
          </div>
        </div>


      </div>
      <div className='relative'>
        {profile && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-[9998]"
            onClick={() => setprofile(false)}
          ></div>
        )}
        <div className={`h-[200px] w-[300px] m-2 flex flex-col gap-4 ${profile ? "block" : "hidden"} rounded-md z-[9999] bg-[#ffffff] top-0 p-4 border border-[#333ca6] absolute right-0`}>
          <h3 className='font-bold text-[#333ca6]'>Hello, {profiledata.username}</h3>

          <p onClick={setprofileFun} className='flex justify-left gap-3 items-center'> <FaRegUser className=' text-xl text-[#333ca6]' /><Link to={"/dashboard/doctor/view"}>View Proille</Link></p>
          <p onClick={logout} className='flex cursor-pointer justify-left gap-3 items-center'><HiOutlineLogout className=' text-xl text-[#333ca6]' />
            Logout</p>

        </div>
      </div>
    </div>
  )
}

export default Header