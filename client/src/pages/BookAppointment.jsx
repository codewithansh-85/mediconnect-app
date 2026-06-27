import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img1 from "../assets/doc1-removed.png"
import SectionWrapper from '../common/SectionWrapper'
import { Box, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaRegStar } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { PiGenderIntersexDuotone } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const BookAppointment = () => {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [concern, setConcern] = useState("")
  const params = useParams()




  // api call to get data of the doc with docid got in params

  const getdata = async () => {
    try {
      const docresponse = await axios.get(`/Dental/doctor/getdata/${params.doctorID}`,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      if (docresponse.data.status === "success") {
        setDoctor(docresponse.data.data)
        console.log(docresponse.data.data)
      }
      else {
        console.log(docresponse.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const doctorId = params.doctorID
  const clinicId = doctor?.clinics[0]?._id
  const token = localStorage.getItem("token")
  console.log('doc ID:', doctorId);
  console.log('clinic ID:', clinicId);


  const handleChange = (e) => {
    setConcern(
      e.target.value
    )
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!token || token === "null") {
        console.log("User not logged in, redirecting...");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Log in to book appointments",
        })
        return navigate("/Login"); // token hi nahi hai to login bhej do
      }
      // console.log("appointment booked successfully")
      const response = await axios.post("/Dental/appointment/book-appointment",
        {
          clinicId,
          doctorId,
          Appdate: selectedDate,
          Apptime: selectedSlot,
          concern
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      if (response.data.Status === "success") {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          draggable: true
        })
        console.log(response.data.data)
        console.log(response.data.message)
        navigate("/Myprofile")
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        })
        console.log(response.data.message)
        navigate("/Login")
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      })
      console.log(`error booking appointment ${error.message}`)
    }

  }
  useEffect(() => {
    console.log('doctorID from useEffect:', params.doctorID);


    getdata();

  }, [params.doctorID]);
  // Generate time slots from 10 AM to 6 PM (1-hour each)
  const timeSlots = [];
  const open = parseInt(doctor?.opentimings.split(":")[0], 10);
  const close = parseInt(doctor?.closetimings.split(":")[0], 10);

  for (let hour = open; hour < close; hour++) {
    const displayHour = hour <= 12 ? hour : hour - 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    timeSlots.push(`${displayHour}:00 ${ampm} - ${displayHour + 1}:00 ${ampm}`);
  }
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };


  // Today ka date
  const today = new Date();

  // Max Date → Aaj se 3 din aage
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 3);



  return (
    <div>
      <SectionWrapper>
        <div className='grid grid-cols-1 p-2  md:grid-cols-2 lg:grid-cols-4 text-center md:text-left items-start min-h-64  my-4 justify-center rounded-xl   border-2'>
          <div className=' h-full flex-1 w-full p-2 '>
            <img className=' object-cover h-full rounded-2xl overflow-hidden w-full ' src={doctor?.doctorimg} alt="" />
          </div>
          <div className=' flex-1 rounded-2xl my-2 w-full relative text-center items-center md:text-left  h-full   rounded'>
            {/* <div className='bg-white/20 blur absolute inset-0'></div> */}
            <p className='font-bold text-[20px]'>{doctor?.username}</p>

            <span className='flex gap-4 align-center justify-center md:justify-start flex-wrap'>
              <p>{doctor?.degree} </p>|
              <p> {doctor?.specialization}</p>
            </span>
            <p className='text-xs border-2 border-black-900 rounded-full px-1 inline-block'>{doctor?.exp} years</p>

            <span className='flex items-center justify-center md:justify-start gap-2 my-2'>
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />

            </span>
            {/* <p className='my-2'>{doctor[0]?.clinics?.map((clinic, index) => (
              <div className='' key={index}>
                <div className=' text-sm'>{clinic.name}, {clinic.address}</div>
              </div>

            ))}</p> */}
            <div className='text-xs font-[550]'>Licence No.<p className='font-medium'>{doctor?.licenseNo}</p></div>

          </div>
          <div className='flex-1 text-sm my-2 leading-relaxed '>
            <p className=' text-sm font-bold mb-2'> Profile Summary</p>
            <p className='flex gap-2 items-center '><FaPhoneAlt />{doctor?.mobileno}</p>
            <p className='flex gap-2 items-center '><BiLogoGmail />{doctor?.email}</p>
            <p className='flex gap-2 items-center '><FaMoneyBillAlt />{doctor?.fee}</p>
            <p className='flex gap-2 items-center '><PiGenderIntersexDuotone />{doctor?.gender}</p>
            <p className='flex gap-2 items-center '><FaLocationDot />{doctor?.address}</p>

          </div>
          <div className='flex-1 my-2'>
            <div className=' text-sm '>
              <p className=' text-sm font-bold mb-2'>About  </p>{doctor?.biography}
            </div>

          </div>
        </div>
        {/* appointment form */}
        <form onSubmit={handleSubmit}>
          <h2 className='font-medium text-xl text-[#333CA6]'>
            Book Your Appointment Now
          </h2>

          {/* select time */}
          <div className='flex flex-col md:flex-row w-full justify-between'>
            <div>
              <h3>Select Preffered time</h3>
              <Box sx={{ display: 'grid', flexWrap: 'wrap', gap: 2, marginTop: 3 }} className="w-full grid-cols-2 md:grid-cols-3 justify-start items-center ">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedSlot === slot ? 'contained' : 'outlined'}
                    color={selectedSlot === slot ? 'primary' : 'inherit'}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
                  </Button>
                ))}


              </Box>

            </div>
            <div>
              <div>
                <h3>Select Preffered date</h3>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{ width: 300, margin: '20px auto' }}>
                    <DatePicker
                      label="Select Appointment Date"
                      value={selectedDate}
                      onChange={(newDate) => setSelectedDate(newDate)}
                      minDate={today}
                      maxDate={maxDate}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Box>

                  {selectedDate && (
                    <Box sx={{ marginTop: 2 }}>
                      <strong>Selected Date:</strong> {selectedDate.toDateString()}
                    </Box>
                  )}
                  {selectedSlot && (
                    <Box sx={{ marginTop: 2 }}>
                      <strong>Selected Slot:</strong> {selectedSlot}
                    </Box>
                  )}
                </LocalizationProvider>
              </div>
              <div className='concern'>
                <TextField id="outlined-basic" value={concern} onChange={handleChange} name='concern' label="Concern" placeholder='e.g.backpain' variant="outlined" />

              </div>
              <div className='clinic my-4'>
                <h3 className='my-1 text-gray-600'>clinic address</h3>
                <p>{doctor?.clinics[0]?.clinicname},</p>
                <p>{doctor?.clinics[0]?.address},&nbsp;{doctor?.clinics[0]?.city},&nbsp;{doctor?.clinics[0]?.state}</p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>

          </div>
          <button type='submit' className='w-[100px] p-4 rounded-full text-white py-2 mx-auto bg-gradient-to-r from-[#333CA6] to-[#409eff]'>Submit</button>
        </form>
      </SectionWrapper>

    </div>
  )
}

export default BookAppointment