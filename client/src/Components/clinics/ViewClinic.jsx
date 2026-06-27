import React, { useEffect, useState, } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import AdminPanel from '../adminPanel/DashboardLayout';
import { Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper modules
import { Navigation } from 'swiper/modules';
import { setMyclinics } from '../../Reducers/Doctorreducers';



const ViewClinic = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const profiledata = useSelector((state) => state.MyClinics)
    const myclinicslist = profiledata?.clinics || []

    const params = useParams()
    const [clinicData, setclinicData] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    const getClinicprofile = async () => {
        try {

            const profileresponse = await axios.get(`/Dental/clinic/getdata/${params.clinicId}`, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            },

                // {
                //     params: {
                //         email: localStorage.getItem("CEmail")
                //     }

                // }
            )

            if (profileresponse.data.Status === "success") {
                console.log(profileresponse)
                console.log(profileresponse.data.data._id)
                localStorage.setItem("clinicid", profileresponse.data.data._id)
                setclinicData(profileresponse.data.data)

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
    console.log(clinicData)
    console.log(myclinicslist)
    let isClinicAdded = false;

    if (clinicData?._id && Array.isArray(myclinicslist) && myclinicslist.length > 0) {
         isClinicAdded = myclinicslist.some(
            (clinic) => clinic?._id === clinicData._id
        );
    }

    const handleImageChange = async (e) => {
        setLoading(true)

        try {


            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("logo", file);
            formData.append("id", clinicData?._id)
            const response = await axios.post(
                `/Dental/clinic/logo`,
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

                setclinicData((prev) => ({
                    ...prev,
                    logo: response.data.data?.logo || prev.logo,
                }));
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


    useEffect(() => {
        getClinicprofile()

    }, [updated])
    const doctorid = localStorage.getItem("doctorid")


    const handleAddClinic = async () => {
        if (!clinicData?._id || !doctorid) {
            return Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Doctor email or clinic ID is missing.",
            });
        }
        try {
            setLoading(true);
            const response = await axios.post("/Dental/doctor/addClinicToDoc",
                {
                    doctorid: doctorid,
                    ClinicID: clinicData?._id
                }
            )
            if (response.data.Status === "success") {
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Clinic Added",
                    text: response.data.message || "Clinic successfully added to your dashboard.",
                });
                dispatch(setMyclinics(response.data.populatedDoc))
                navigate(-1)
            } else {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: response.data.message || "Could not add clinic.",
                });
            }
        } catch (err) {
            setLoading(false);
            console.error("Error adding clinic", err);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: err?.response?.data?.message || "Something went wrong!",
            });
        }

    }

 const handleRemoveClinic = async () => {
        if (!clinicData?._id || !doctorid) {
            return Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Doctor email or clinic ID is missing.",
            });
        }
        try {
            setLoading(true);
            const response = await axios.post("/Dental/doctor/RemoveClinicFromDoc",
                {
                    doctorid: doctorid,
                    ClinicID: clinicData?._id
                }
            )
            if (response.data.Status === "success") {
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Clinic Removed",
                    text: response.data.message || "Clinic successfully removed from your dashboard.",
                });
                navigate(-1)
            } else {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: response.data.message || "Could not remove clinic.",
                });
            }
        } catch (err) {
            setLoading(false);
            console.error("Error removing clinic", err);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: err?.response?.data?.message || "Something went wrong!",
            });
        }

    }


    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="container bg-white p-5 border rounded-[10px] w-full mx-auto my-[20px] bg-[#ffffff] shadow-[0 2px 5px rgba(0, 0, 0, 0.1)]  rounded-[20px]">
                {/* Profile Section */}
                <div

                    className={`profile-section bg-gradient-to-r from-[#b6bfff] to-[#7987ff] flex flex-col md:flex-row flex-wrap w-full  p-4 rounded-[20px] items-center md:items-end justify-around`}>
                    <div className="imageDiv relative w-[150px] h-[150px] rounded-full flex items-center justify-center border-[7px] border-[#ffffff] " >
                        <img
                            src={clinicData?.logo || "default-logo.jpg"}
                            alt="logo"
                            className="profile-image w-full h-full rounded-full object-cover"
                        />
                        <input type="file"
                            id='uploadlogo'
                            name='logo'
                            className='hidden'
                            onChange={handleImageChange} />
                        <label htmlFor='uploadlogo' >
                            <p className="cursor-pointer h-[30px] w-[30px] bg-[#ffffff] rounded-full absolute bottom-0 right-2 flex items-center justify-center " ><AddIcon className='text-5xl' /></p>

                        </label>
                    </div>
                    <div className='flex-1 flex flex-col justify-between h-full gap-6  '>
                        <div className='flex flex-col items-center md:items-end'>
                            <h5 className='font-semibold text-sm'>
                                Clinic Timings
                            </h5>
                            <h6 className='text-xs'>
                                {clinicData?.opentimings} AM-{clinicData?.closetimings} PM
                            </h6>
                        </div>
                        <div className="profile-details flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between h-full  ml-4">
                            <h3 className='font-bold text-3xl text-center'>
                                {` ${clinicData?.clinicname}`}</h3>
                            <div className='flex flex-col items-center md:items-end'>

                                <h4 className='ml-6 text-[#333ca6]'>{clinicData?.contact}</h4>
                                <h4 className='ml-6 text-[#333ca6]'>{clinicData?.email}</h4>
                            </div>

                        </div>

                    </div>
                </div>
                {/* About Section */}
                <div className='w-full  '>
                    <div className=" mt-3 about-section bg-[#f4f4f5] p-4 rounded-[20px] ">
                        <div class=" ">


                            <h5 className='flex items-center text-sm font-bold gap-4 mb-2 '>About Us</h5>
                            <p className='text-sm leading-relaxed'>{clinicData?.about}</p>
                        </div>

                    </div>

                </div>
                <div className='flex flex-col lg:flex-row items-start justify-center'>


                    <div className='flex1 w-full p-4 mt-5 flex gap-4 flex-col gap-5 rounded-[20px]'>
                        <div className='flex  gap-10 items-start'>
                            <div class="w-1/2">
                                <h5 className='font-bold text-sm mb-2'>Clinic Type</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.clinicType}
                                </p>
                            </div>

                            <div class="w-1/2">
                                <h5 className='font-bold text-sm mb-2'>Consultancy Fees</h5>
                                <p className='text-sm leading-relaxed'>
                                    Rs. {clinicData?.fees}
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between gap-10 items-start'>
                            <div class="w-1/2">
                                <h5 className='font-bold text-sm mb-2'>Services available</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.services}
                                </p>
                            </div>

                            <div class="w-1/2">
                                <h5 className='font-bold text-sm mb-2'>Address</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.address}
                                </p>
                            </div>

                        </div>



                    </div>


                </div>
                
                <div class="p-6">
                    <h5 className='font-bold text-sm py-4'>Images</h5>
                    <div className=''>
                        <div className=' flex gap-4 flex-wrap'>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={2}
                                navigation
                                pagination={{ clickable: true }}

                                // autoplay={{ delay: 3000, disableOnInteraction: false }}
                                modules={[Navigation]}
                                className="mySwiper w-full h-[300px]"
                            >
                                {clinicData?.clinicimages?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img || "default-image.jpg"}
                                            alt={`clinicImage-${index}`}
                                            className="w-full h-full object-contain rounded-xl border-4 border-gray-200 p-2"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>
                </div>

                <div>
                    {isClinicAdded ?
                        (<button onClick={handleRemoveClinic}  className='mt-4 p-4 rounded-xl py-2 text-white bg-gradient-to-r from-[#333CA6] to-[#5c6aff]'>
                            Remove Clinic
                        </button>) :
                        (<button onClick={handleAddClinic} className='mt-4 p-4 rounded-xl text-white bg-gradient-to-r from-[#333CA6] to-[#5c6aff] py-2'>
                            Add Clinic
                        </button>)}
                </div>


            </div>
        </ >


    )
}


export default ViewClinic;