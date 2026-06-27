import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from 'antd';

import { useSelector } from "react-redux";
const MyProfile = () => {
  const profile = useSelector((state) => (state.Patient))
  const [appointments, setAppointments] = useState([])
  const [page, setPage] = useState(1)
  const [totalpages, setTotalpages] = useState(0)

  const limit = 4
  console.log(profile)
  const getAppoitments = async () => {
    try {
      const response = await axios.post(`/Dental/appointment/getappointments/patient/${profile._id}`,

        {},
        {
          params: {
            page: page,
            limit: limit
          }
        }

      )
      console.log(response)
      console.log(response.data.list)
      if (response.data.status === "success") {
        console.log("Appointment list fetch successfull raha")
        setAppointments(response.data.list)
        setTotalpages(response.data.totalpages)

      }
      else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(`Appoiintment list fetch error${error}`)

    }
  }
  const handelpageclick = (pageNumber) => {
    setPage(pageNumber)

  }
  useEffect(() => {
    console.log("Updated appointmentlist state:", appointments);
  }, [appointments]);
  useEffect(() => {
    getAppoitments()
  }, [page])
  console.log(appointments)
  const statusColor = {
    Upcoming: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-2">
      <div className="bg-white rounded-3xl shadow-2xl w-full  overflow-hidden flex flex-col ">

        {/* Left Side - Profile Image & Name */}
        <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white flex  items-start gap-6 justify-start p-4 ">
          <img
            src={profile?.profileImg || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-36 h-36 object-cover rounded-xl border-4 border-white shadow-lg "
          />
          <div>
            <h2 className="text-2xl font-bold">{profile?.name}</h2>
            <p className="mt-1 text-blue-100">{profile?.gender} | {profile?.age} yrs</p>
            <span className=" font-semibold">{profile?.contact}</span>
          </div>

          <hr />



        </div>

        {/* Right Side - Details */}
        <div className="flex-1 p-4 flex flex-col justify-center scroll">
          <h2 className="font-bold text-2xl my-2 text-blue-600">Personal Details</h2>
          <hr />
          <div className="grid my-2 leading-relaxed grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">Email:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.email}</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">Contact:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.contact}</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">DOB:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.DOB}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Blood Group:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.blood_grp}</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">Address:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.address}</span>
              </div>

              <hr />


            </div>
            <div className="space-y-2">
              <h3>Emergency Contact </h3>
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">name:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.Ename}</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">relation:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.Erelation}</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-500 font-medium">contact:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile?.Econtact}</span>
              </div>



            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-2xl text-blue-600 py-2">My Appointments</h2>
            <hr />
            {appointments.length === 0 ?
              <p>No Appointments booked yet</p> :
              appointments.map((app) => (
                <div key={app._id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-500 font-medium">Doctor:&nbsp;</span>
                    <span className="text-gray-800 font-semibold">{app.doctorId.username}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium  ${statusColor[app.status]}`}>
                      {app.status}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <span className="text-gray-500 font-medium">Clinic:&nbsp;</span>
                    <span className="text-gray-800 font-semibold">{app.clinicId.clinicname}</span>
                  </div>
                  <div className="flex justify-start">
                    <span className="text-gray-500 font-medium">Concern:&nbsp;</span>
                    <span className="text-gray-800 font-semibold">{app.concern}</span>
                  </div>
                  <div className="flex justify-start">
                    <span className="text-gray-500 font-medium">Appointment Date & Time:&nbsp;</span>
                    <span className="text-gray-800 font-semibold">
                      {new Date(app.Appdate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      | {app.Apptime}
                    </span>                  </div>
                  <hr />
                </div>
              ))}
            <div className={`${appointments.length === 0 ? "hidden ":"flex"}`} >
              <div className='w-full mx-auto'>
                <Pagination showQuickJumper defaultCurrent={2} total={totalpages * 10} className='mx-auto' onChange={handelpageclick} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>



  );
};

export default MyProfile;
