import React from 'react'
import banner from "../assets/team-young-specialist-doctors-standing-corridor-hospital.png"
import physician from "../assets/physician.svg"
import gynac from "../assets/Gynac.svg"
import Dermat from "../assets/Dermat.svg"
import Pedia from "../assets/pedia.svg"
import Neuro from "../assets/neuro.svg"
import Gastro from "../assets/gastro.svg"
import axios from "axios"
import { ReactComponent as WayIcon } from "../assets/way-icon.svg";
import "../styles/profile.css"
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import dr1 from "../assets/medical-banner-with-doctor-holding-stethoscope.png"
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper'
import { RiSearch2Fill } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { RiEmotionHappyFill } from "react-icons/ri";
import bg1 from "../assets/bg1.jpg"
import bgimg from "../assets/bgshape2.png"
import bgimg2 from "../assets/bgShape.png"
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import whitePatern from "../assets/white-pattern-lg.png"
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const nextSectionRef = useRef(null)

  const scrollToNext = () => {
    nextSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }




  const getdoctors = async () => {
    try {
      const response = await axios.get("/Dental/doctor/getdoctors")
      if (response.data.status === "success") {
        console.log(response.data.data)
        setDoctors(response.data.data)
      }
      else {
        console.log(response.data.message)
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getdoctors()
  }, [])
  const speciality = [
    {

      title: "General Physician",
      img: physician

    },
    {

      title: "Gynecologist",
      img: gynac

    },
    {

      title: "Dermatologist",
      img: Dermat

    },
    {

      title: "Pediatrician",
      img: Pedia

    },
    {

      title: "Neurologist",
      img: Neuro

    },
    // {

    //   title: "Gastroenterologist",
    //   img: Gastro

    // },

  ]
  
  const handleSec1click = () => {

    navigate("/doctors")

  }
  const handleSpecClick = (selectedFilter) => {
    navigate(`/doctors/${selectedFilter}`)

  }
  return (

    <div className='flex flex-col gap-8'>
      
      <SectionWrapper>
        <div className='relative'>
          <section className='banner-section flex flex-col lg:flex-row lg:items-end mt-4 lg:pb-4 justify-between items-center bg-gradient-to-r from-[#333CA6] to-[#409eff] h-auto rounded-xl'>
            <div className='flex w-full lg:w-[50%] p-6  gap-6 justify-start items-start flex-col text-left'>
              <h2 className='text-4xl leading-relaxed text-white font-bold text-left'>
                Book Appointment
                With Trusted Doctors
              </h2>
              <p className='leading-relaxed text-lg text-white'>
                simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
              </p>
              <button onClick={handleSec1click} className='bg-white text-black px-4 rounded-3xl p-2 '>
                Book Appointment
              </button>
            </div>
            <div className='flex-1 '>
              <img className='h-full w-full object-contain' src={banner} alt="" />
            </div>
          </section>
          <div className='absolute bottom-[-2px] left-0'>
            <img src={whitePatern} alt="" />
          </div>
          <div className=' absolute flex items-center justify-center w-full bottom-[-20px] md:bottom-[-5px]' >
            <div onClick={scrollToNext} className='text-[6vmin] text-center bg-white text-blue-600 border cursor-pointer border-blue-600 animate-bounce rounded-full '>
              <MdOutlineKeyboardDoubleArrowUp />

            </div>
          </div>
        </div>

      </SectionWrapper>
      <SectionWrapper >
        <section ref={nextSectionRef} className='speciality mt-4'>
          <h2 className='font-bold text-2xl text-center text-black'>Find By Speciality</h2>
          <p className='text-lg text-center text-[clamp(14px,2vw,16px)] w-full md:w-[50%] mx-auto '>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</p>
          <div className=' relative'>


            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={4}  // ek row me kitne cards dikhne chahiye

              loop={true}
              autoplay={{
                delay: 1500, // 2 seconds delay
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="my-8 w-[80%]"
            >
              {speciality.map((item, index) => {
                return <SwiperSlide key={index}>
                  <div onClick={() => handleSpecClick(item.title)} className="hover:translate-y-[-10px] w-[200px] flex flex-col items-center justify-center transition-transform duration-500 cursor-pointer">
                    <div className="rounded-full my-4 bg-gradient-to-r from-[#333CA6] to-[#5c6aff] w-[130px] h-[130px] flex items-center justify-center">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <h3 className="text-center">{item.title}</h3>
                  </div>

                </SwiperSlide>

              })}
            </Swiper>



          </div>


        </section >
      </SectionWrapper>
      <SectionWrapper>
        <section className=' relative flex flex-col gap-4 justify-center items-center '>
          <img
            src={bgimg2}
            alt="background"
            className="absolute top-[-200px] overflow-x-hidden transform [transform:rotateX(180deg)] h-50 right-[-300px] z-[-9999] object-contain"
          />
          <h2 className='font-bold text-2xl text-center text-black'>Top Doctors to Book</h2>
          <p className='text-lg text-center text-[clamp(14px,2vw,16px)] w-full md:w-[50%] mx-auto '>Simply browse through our extensive list of trusted doctors.</p>
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {doctors.map((doc, index) => (
              <motion.div
                key={doc.username}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}  // Slightly longer duration for smoother effect
                whileHover={{
                  scale: 1,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
                }}
                className="bg-white group relative rounded-2xl shadow-sm border p-5 cursor-pointer hover:shadow-md transition-shadow duration-300"
              >
                {/* Doctor Image */}
                <img
                  src={doc.doctorimg}
                  alt={doc.username}
                  className="w-full h-48 object-cover rounded-xl mb-4 hover:scale-105 overflow-hidden transition duraction-300 ease-in"
                />

                {/* Availability */}
                {doc.available && (
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-600 text-sm font-medium">Available</span>
                  </div>
                )}

                {/* Doctor Info */}
                <h3 className="font-semibold text-lg">{doc.username}</h3>
                <p className="text-gray-500">{doc.specialization}</p>
                <hr />
                <p className='text-sm mt-4'>Consultancy cost: Rs.{doc.fee}</p>
                <div className='absolute h-1 w-20 bg-gradient-to-r from-[#333CA6] to-[#409eff] rounded-full bottom-0 left-0 opacity-0 group-hover:opacity-100 group-hover:left-[35%] transition-all duration-300'>

                </div>
                <Link to={`/book-appointment/${doc._id}`} className='absolute shadow-xl py-2 px-4 rounded-full bg-white text-gray-500 top-0 left-[20%] opacity-0 group-hover:opacity-100 group-hover:top-[10%] transition-all duration-300'>
                  Book Appointment
                </Link>
              </motion.div>

            ))}

          </div>
          {/* More Doctors Button */}
          <motion.button
            whileHover={{ x: 5 }}
          >
            <Link className="mt-10 px-6 py-3 bg-gradient-to-r from-[#333CA6] to-[#409eff] text-white rounded-full flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
              to={"/doctors"}>See All Doctors <FaArrowRight /></Link>
          </motion.button>

        </section>
      </SectionWrapper>


      <SectionWrapper>

        <section className="relative w-full h-auto flex flex-col md:flex-row items-center justify-center py-4 px-1">

          {/* Background Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#333CA6] to-[#5c6aff]"></div>

          {/* Background Image Layer */}
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-right"
            style={{ backgroundImage: `url(${dr1})` }}
          ></div>

          <img
            src={bgimg}
            alt="background"
            className="absolute  top-[-200px] h-50 left-[-200px] z-[-9999] object-contain"
          />
          <div className='flex items-center justify-center lg:justify-start w-full  '>
            <div className=" bg-white/20  backdrop-blur-md rounded-2xl shadow-lg p-6 w-full lg:w-[40%] m-4 lg:ml-8 text-white">
              <h1 className="text-4xl font-bold leading-snug">
                Book Appointment <br /> With 100+ Trusted Doctors
              </h1>
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Link to={"/register"} className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
                  Create Account
                </Link>
                <Link to={"/doctors"} className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
                  Find Doctors
                </Link>
              </div>
            </div>
          </div>

          {/* Doctor Image (Overlapping Effect) */}
          {/* <div className="  h-full md:w-[80%] hidden lg:block ">
            <img
              src={dr1} // Replace with doctor image
              alt="Doctor"
              className=" h-full w-full object-cover drop-shadow-2xl"
            />
          </div> */}
        </section>
      </SectionWrapper>
      <SectionWrapper>
        <div className='flex  flex-col lg:flex-row justify-center my-4 items-center gap-6  bg-top bg-no-repeat bg-contan w-full' style={{ backgroundImage: `url()` }}>
          <div className='relative flex flex-col text-center  p-4  items-center justify-center  '>
            <div className='icon flex justify-center items-center h-14 w-14 bg-blue-500 rounded-xl'>
              <RiSearch2Fill className=' mx-auto text-3xl text-white/70' />

            </div>
            <div>
              <h3 className='font-bold my-2'>Search For Doctors</h3>
              <p className=''>
                Search for a doctor based on specialization, location, or availability for your Treatements
              </p>
            </div>
            <div className=' hidden lg:block arrow-icon absolute font-red-600 top-[20%] right-[-35%]'>
              <WayIcon className=" font-red-600" />
            </div>
          </div>
          <div className='relative flex flex-col text-center  p-4   items-center justify-center '>
            <div className='icon  flex justify-center items-center  h-14 w-14 bg-blue-500 rounded-xl'>
              <RiShieldUserFill className=' mx-auto text-3xl text-white/70' />

            </div>
            <div>
              <h3 className='font-bold my-2'>Check Doctor Profile</h3>
              <p>
                Explore detailed doctor profiles on our platform to make informed healthcare decisions.              </p>
            </div>
            <div className='hidden lg:block arrow-icon absolute font-red-600 top-[20%] right-[-35%]'>
              <WayIcon className=" text-red-600" />
            </div>
          </div>
          <div className='relative flex flex-col text-center p-4  items-center justify-center '>
            <div className='icon flex justify-center items-center  h-14 w-14 bg-blue-500 rounded-xl'>
              <RiCalendarScheduleFill className=' mx-auto text-3xl text-white/70' />

            </div>
            <div>
              <h3 className='font-bold my-2'>Schedule Appointment</h3>
              <p>
                After choose your preferred doctor, select a convenient time slot, & confirm your appointment.              </p>
            </div>
            <div className='hidden lg:block arrow-icon absolute font-red-600 top-[20%] right-[-35%]'>
              <WayIcon className=" text-red-600" />
            </div>
          </div>
          <div className='relative flex flex-col text-center  items-center justify-center '>
            <div className='icon flex justify-center items-center  h-14 w-14 bg-blue-500 rounded-xl'>
              <RiEmotionHappyFill className=' mx-auto text-3xl text-white/70' />

            </div>
            <div>
              <h3 className='font-bold my-2'>Get Your Solution</h3>
              <p>
                Discuss your health concerns with the doctor and receive the personalized advice & with solution.              </p>
            </div>

          </div>
        </div>
      </SectionWrapper>
    </div >

  )
}

export default Home