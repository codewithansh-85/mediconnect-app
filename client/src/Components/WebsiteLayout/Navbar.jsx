import React from 'react'
import logo from "./../../assets/logo.png"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from "react-icons/hi";
import { clearPatient } from '../../Reducers/Doctorreducers'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => (state.Patient))
  console.log(user)
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
  const logout = (() => {
    dispatch(clearPatient())
    setprofile(!profile)

    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("patientid")
    localStorage.removeItem("user")
    navigate("/")

  })
  return (
    <div className='sticky z-[9999] top-0'>
      <div className='flex  items-center overflow-x-hidden justify-between px-4 h-20'>
        <NavLink to="/" className='h-full w-[150px]'>
          <img className='h-full w-full object-cover' src={logo} alt="Dental App Logo" />
        </NavLink>
        <ul className='flex items-center justify-center gap-8'>
          <NavLink to="/" className="relative group">
            <li>Home</li>
            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-500'></span>
          </NavLink>
          <NavLink to="/doctors" className="relative group">
            <li>All Doctors</li>
            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-500'></span>
          </NavLink>

          <NavLink to="/about" className="relative group">
            <li>About</li>
            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-500'></span>
          </NavLink>
          <NavLink to="/contact" className="relative group">
            <li>Contact</li>
            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-500'></span>
          </NavLink>
        </ul>

        <div>
          {(user.length === 0) ? (<NavLink to="/Register">

            <button className='bg-blue-500 p-2 rounded-3xl text-sm text-white hover:bg-blue-600 transition-colors'>
              Create Account
            </button>
          </NavLink>) : (
            <div className={`h-[44px] w-[44px] flex justify-center items-center rounded-full p-[2px] bg-gradient-to-r from-[#333CA6] to-[#5c6aff]`}>
              <div onClick={setprofileFun} className='h-[40px] w-[40px] overflow-hidden cursor-pointer rounded-full border text-xl flex justify-center items-center font-bold text-[#ffffff] bg-gradient-to-r from-[#333CA6] to-[#5c6aff] border-gray-300'>
                <img src={user.profileImg} alt="" />
              </div>
            </div>
          )
          }
          <div className=''>
            {profile &&
              (<div
                className='fixed inset-0 w-full h-full z-[9998] bg-black/40'
                onClick={() => setprofile(false)}></div>
              )
            }
            <div className={`space-y-4 border-2 border-indigo-800 z-[9999] ${profile ? `block` : `hidden`} absolute m-4 rounded-md p-2 top-10 right-0 bg-white`}>
              <h3 className='font-bold text-blue-700 text-lg'>Hello! {user.name}</h3>
              <p className='flex justify-start items-center gap-2' onClick={setprofileFun}><FaRegUserCircle className='text-blue-700' /> <Link to="/Myprofile">View Profile</Link></p>
              <p className='flex justify-start items-center gap-2' onClick={setprofileFun}><BiSolidEdit className='text-blue-700' /><Link to={""}> Edit Profile</Link></p>
              <p className='flex justify-start items-center gap-2 text-red-600' onClick={setprofileFun}><MdDeleteOutline className='text-red-700'  /><Link to={""}>Delete Profile</Link></p>

              <p onClick={logout} className='flex cursor-pointer justify-left gap-3 items-center'><HiOutlineLogout className=' text-xl text-[#333ca6]' />
                Logout</p>

            </div>
          </div>

        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar