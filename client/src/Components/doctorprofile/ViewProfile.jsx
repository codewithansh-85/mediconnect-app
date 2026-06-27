import React, { useEffect, useState } from 'react'
import "./../../styles/view-profile.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaStethoscope } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import AdminPanel from '../adminPanel/DashboardLayout.jsx';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { setMyclinics } from '../../Reducers/Doctorreducers.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IoCallOutline } from "react-icons/io5";
import { RiGraduationCapLine } from "react-icons/ri";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaTransgender } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import ClinicCard from '../clinics/ClinicCard.jsx';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";





// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper modules
import { Navigation, Pagination } from 'swiper/modules';


const ViewProfile = () => {
  const profiledata = useSelector((state) => (state.MyClinics))
  const Dispatch = useDispatch()
  // const [profileres,setProfileres]=useState([])
  console.log(profiledata)

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
        // setProfileres(profileresponse.data.data)

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
  // const [profiledata, setProfiledata] = useState(null)
  const [updated, setUpdated] = useState(false)
  const [loading, setLoading] = useState(false)
  const myclinicslist = profiledata?.clinics
  console.log(myclinicslist)
  useEffect(() => {

  }, [profiledata])
  const handleImageChange = async (e) => {
    setLoading(true)

    try {


      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("doctorimg", file);
      formData.append("id", profiledata?._id)
      const response = await axios.post(
        `/Dental/doctor/updateprofileimg`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.Status === "success") {
        setUpdated(prev => !prev)
        setLoading(false)
        Swal.fire({
          title: response.data.message,
          icon: "success",
        });
        console.log(response.data)

        // setProfiledata((prev) => ({
        //   ...prev,
        //   doctorimg: response.data.doctor?.doctorimg || prev.doctorimg,
        // }));
      } else {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Image update error:", error);
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };




  return (

    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container bg-white p-2 border rounded-[10px] w-full mx-auto  bg-[#ffffff] shadow-[0 2px 5px rgba(0, 0, 0, 0.1)]  rounded-[20px]">
        {/* Profile Section */}
        <div className="profile-section flex flex-col md:flex-row w-full bg-[#f4f4f5] gap-4 p-4 rounded-[20px] items-center md:items-start ">
          <div className="imageDiv z-0 relative w-[200px] h-[200px] rounded-xl flex items-center justify-center border-[3px] border-[#ffffff]" >
            <img
              src={profiledata?.doctorimg || "default-profile.jpg"}
              alt="Profile Picture"
              className="profile-image w-full h-full rounded-xl object-cover"
            />
            <input type="file"
              id='uploadProfileImg'
              name='doctorimg'
              className='hidden'
              onChange={handleImageChange} />
            <label htmlFor='uploadProfileImg' >
              <p className="cursor-pointer h-[30px] w-[30px] bg-gradient-to-r from-[#333CA6] to-[#5c6aff] rounded-full absolute bottom-0 right-0 flex items-center justify-center " ><AddIcon className='text-5xl text-[#ffffff]' /></p>

            </label>
          </div>
          <div className="profile-details flex w-full flex-col gap-2 text-center md:text-left p-2 ">
            <span className='flex justify-between items-center'>
              <h3 className='font-bold text-[#333ca6]'>
                {`Dr ${profiledata?.username}`} </h3>
            </span>
           <span className='flex flex-col md:flex-row justify-between items-center'>
             <h4 className='font-semibold '>{profiledata?.specialization} <span className='font-medium text-xs border rounded-full px-1'>{profiledata?.exp} Years</span> </h4>
            <p className='flex flex-col text-sm'> <span>Availability time </span> {profiledata?.opentimings} - {profiledata?.closetimings} </p>

           </span>
            <div className='flex justify-between items-left w-full '>
              <div className='flex flex-col gap-2' >
                <p className='flex justify-left items-center gap-4'><LuMail className='text-2xl text-[#333CA6]' />{profiledata?.email}</p>
                <p className='flex justify-left items-center gap-4'><IoCallOutline className='text-2xl text-[#333CA6]' />{profiledata?.mobileno}</p>
                <p className='flex justify-left items-center gap-4'><RiGraduationCapLine className='text-2xl text-[#333CA6]' />{profiledata?.degree}</p>
                <p className='flex justify-left items-center gap-4'><RiMoneyRupeeCircleLine  className='text-2xl text-[#333CA6]' />{profiledata?.fee}</p>

              </div>
              <div className='flex flex-col gap-2 mr-6'>
                <p className='flex justify-left items-center gap-4'><LiaBirthdayCakeSolid className='text-3xl text-[#333CA6]' />{profiledata?.doctorage}</p>
                <p class='flex justify-left items-center gap-4'><FaTransgender className='text-2xl text-[#333CA6]' />{profiledata?.gender}</p>
                <p class='flex justify-left items-center gap-4'><BsPersonVcard className='text-2xl text-[#333CA6]' />{profiledata?.licenseNo}</p>
              </div>

            </div>
            <p class='flex justify-left items-center gap-4'><FaLocationDot className='text-2xl text-[#333CA6]' />{profiledata?.address}</p>

          </div>
        </div>
        {/* {info section} */}
        <div className='w-full  mx-auto my-2 p-2 bg-[#f4f4f5] rounded-xl '>
          <h5 className='flex items-center font-bold gap-2 justify-'>Biography</h5>
          <p>{profiledata?.biography}</p>
        </div>
        <div className=''>
          <h3 className='font-bold text-md py-4 text-center text-[#333ca6]'>Available for Appointments At</h3>
          <div className='flex flex-wrap gap-4  justify-around mx-auto  rounded-lg'>
            {myclinicslist?.length === 0 && <p>No clinics registered yet</p>}
            {myclinicslist?.length > 0 &&
              myclinicslist?.map((clinics, index) => {
                return <ClinicCard key={clinics._id} clinicdata={clinics} />
              })}
          </div>

        </div>
        {/* licence image section */}
        <div class="p-6">
          <h5 className='font-bold text-sm py-4'>Licence Images</h5>
          <div className=''>
            <div className=' flex gap-4 w-full flex-wrap'>
              <Swiper
                spaceBetween={20}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}

                // autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Navigation, Pagination]}
                className="mySwiper w-full " // Customize height/width as needed
              >
                {profiledata?.licenseimg?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img || "default-image.jpg"}
                      alt={`licenseimg-${index}`}
                      className="w-full h-full object-contain rounded-xl border-4 border-gray-200 p-2"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </div>

        <button className='mt-4 p-4 rounded-xl py-2 text-white bg-gradient-to-r from-[#333CA6] to-[#5c6aff]'>
          <Link to={`/dashboard/doctor/edit/${localStorage.getItem("doctorid")}`}

          >Update</Link>
        </button>
      </div></>



  )
}

export default ViewProfile;