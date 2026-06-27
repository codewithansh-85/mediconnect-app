import React, { useEffect, useState } from "react";
import axios from "axios"
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
const ViewPatients = () => {




  const [page, setPage] = useState(1)
  const limit = 5

  const [totalpages, setTotalpages] = useState(1)

  const [appointments, setAppointments] = useState([])
  const profiledata = useSelector((state) => (state.MyClinics))

  console.log(profiledata)
  const doctorId = profiledata._id
  console.log(doctorId)
  const getdata = async () => {
    try {
      const response = await axios.post(`/Dental/appointment/getappointments/doctor/${doctorId}`,
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
    if (doctorId) {
      getdata()
    }
  }, [page, doctorId])
  // status color mapping
  const statusColor = {
    Upcoming: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
  };

 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">

        {appointments.length === 0 ?
          <div>No appointments found</div> :
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Age/Gender</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Concern</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{app.patientId?.name}</td>
                  <td className="px-6 py-4">{app.patientId?.age} / {app.patientId?.gender}</td>
                  <td className="px-6 py-4">{new Date(app.Appdate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}</td>
                  <td className="px-6 py-4">{app.Apptime}</td>
                  <td className="px-6 py-4">{app.concern}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button className="px-3 py-1 text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
                      <Link to={`/dashboard/patients/viewdetails/${app.patientId?._id}`}>View</Link>
                    </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        <div className={`w-full  justify-center items-center ${appointments.length > 0 ? "flex" : "hidden"}`}>
          <div className=' my-4  '>
            <Pagination showQuickJumper defaultCurrent={2} total={totalpages * 10} className='mx-auto' onChange={handelpageclick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPatients;
