import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
// import { IoIosArrowForward } from "react-icons/io";
import SidebarSubmenu from './SidebarSubmenu';
import { FaHospitalUser } from "react-icons/fa";
import { FaProcedures } from 'react-icons/fa';
import { FaClinicMedical } from "react-icons/fa";
import { useSelector } from 'react-redux';



const Sidebar = ({ isOpen, className }) => {
    const profiledata = useSelector((state) => (state.MyClinics))
    const [handleDropdown, setHandleDropdown] = useState("")

    const toggleDropdown = (name) => {
        setHandleDropdown(handleDropdown === name ? "" : name)

    }
    const doctorid = localStorage.getItem("doctorid")
    return (
        <div className={`sidebar z-50 ${className} `}>
            <div className="sidebar-inner  w-full px-1 ">
                <div className=' flex flex-col justify-center sticky top-0 items-center mx-auto bg-gradient-to-br from-[#d0d5ff] to-[#aab4ff] py-7'>
                    <div className='h-[108px] w-[108px]  flex justify-center items-center rounded-full p-[2px] bg-gradient-to-r from-[#333CA6] to-[#5c6aff] ">
'>
                        <div className='h-[100px] w-[100px] rounded-full flex items-center justify-center overflow-hidden '>
                            <img className='object-contain' src={profiledata.doctorimg} alt="" />
                        </div>

                    </div>
                    <div className='flex w-[100%] flex-col items-center justify-center p-2 text-center flex-wrap break-all pt-6'>
                        <h3 className='font-semibold'>Dr.{profiledata.username}</h3>
                        <p className='text-sm'>{profiledata.email}</p>
                        <p className='text-sm'>{profiledata.mobileno}</p>
                    </div>
                </div>
                {/* /dashboard */}
                <ul className="text-sm list-none">
                    <div className='flex items-center justify-start gap-3 text-[16px] text-[rgb(51_60_166)]'>
                        <MdDashboard size={25} />
                        <h2 className='font-bold text-[rgb(51_60_166)]'>Doctor Dashboard</h2>
                    </div>

                    {/* Dropdown for Doctors */}

                    <SidebarSubmenu
                        title="Doctor"
                        icon={FaHospitalUser}
                        isopen={handleDropdown === "Doctor"}
                        onClick={() => toggleDropdown("Doctor")}
                        sublinks={
                            [
                                { label: "Edit Profile", to: `/dashboard/doctor/edit/${doctorid}` },
                                { label: "View Profile ", to: "/dashboard/doctor/view" }


                            ]}

                    />

                    {/* Dropdown for patients */}
                    <SidebarSubmenu
                        title="Patient"
                        icon={FaProcedures}
                        isopen={handleDropdown === "Patient"}
                        onClick={() => toggleDropdown("Patient")}
                        sublinks={
                            [
                                { label: "view Patient", to: "/dashboard/patients/view" },


                            ]}

                    />
                    <SidebarSubmenu
                        title="Clinics"
                        icon={FaClinicMedical}
                        isopen={handleDropdown === "Clinics"}
                        onClick={() => toggleDropdown("Clinics")}
                        sublinks={
                            [
                                { label: "Clinics List", to: "/dashboard/Clinics/list" },

                                { label: "My Clinics", to: "/dashboard/Clinics/myClinics" },

                            ]}

                    />
                </ul>
            </div>

        </div>
    )
}

export default Sidebar