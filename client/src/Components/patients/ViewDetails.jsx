import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd';
import Swal from 'sweetalert2';

const ViewDetails = () => {
    const params = useParams()
    const id = params.id
    const [profile, setprofile] = useState("")
    const [appointments, setAppointments] = useState([])
    const [page, setPage] = useState(1)
    const limit = 5
    const [totalpages, setTotalpages] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [prescription, setPrescription] = useState("");
    const [remarks, setRemarks] = useState("");

    const [selectedAppointment, setSelectedAppointment] = useState(null);



    const getdata = async () => {
        try {
            const response = await axios.get(`/Dental/patient/getPatientdata/${id}`)
            if (response.data.status === "success") {
                setprofile(response.data.data)

            }
            else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error.message)

        }
    }


    console.log(profile)
    const docProfile = useSelector((state) => (state.MyClinics))
    const doctorId = docProfile._id
    console.log(doctorId)

    const statuscolors = {
        Upcoming: "bg-blue-100 text-blue-600",
        Cancelled: "bg-red-100 text-red-600",
        Completed: "bg-green-100 text-green-600"

    }
    const getAppDetails = async () => {
        try {
            const response = await axios.post("/Dental/appointment/getAppDetails", {
                doctorId,
                patientId: id
            }, {
                params: {
                    page: page,
                    limit: limit
                }
            })
            if (response.data.Status === "success") {
                setAppointments(response.data.data)
                setTotalpages(response.data.totalpages)

            }
            else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error.message)

        }
    }

    useEffect(() => {
        getdata()

    }, [])

    useEffect(() => {
        getAppDetails()
    }, [doctorId, page])
    const handelpageclick = (pageNumber) => {
        setPage(pageNumber)

    }
    console.log(appointments)


    const handleStatusChange = async (appointmentId, newStatus) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `You want to mark this appointment as ${newStatus}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#404ac2",
            cancelButtonColor: "#aaaac4",
            confirmButtonText: `Yes,mark it ${newStatus}!`,
        });
        if (confirm.isConfirmed) {
            try {
                const response = await axios.put(`/Dental/appointment/updatestatus/${appointmentId}`, {
                    status: newStatus
                })
                if (response.data.Status === "success") {
                    getAppDetails()
                    console.log(response.data.message)
                }
                else {
                    console.log(response.data.message)

                }
            } catch (error) {
                console.log(error.message)

            }
        }
    }

    const addPrescription = async (appointmentId) => {
        try {
            const formdata = new FormData()
            formdata.append("prescription", prescription)
            formdata.append("Remarks", remarks)
            formdata.append("id", appointmentId)
            const res = await axios.put(`/Dental/appointment/updateprescription`,
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",

                    }
                }

            );

            console.log(res.data);
            if (res.data.Status === "success") {
                Swal.fire("Success!", "Prescription added successfully!", "success");
                setPrescription("");
                getAppDetails();
                setRemarks("")
                setShowModal(false);
            }
        //     else {
        //         Swal.fire("Failed!", {`${res.data.message}`}, "");

        // }
            


        } catch (err) {
        console.log(err.message);
        Swal.fire("Error", "Failed to add prescription", "error");
    }
}

return (
    <div>
        <h2 className='font-xl p-2'>Patient Details</h2>
        <div className='p-4 space-y-4'>
            <div className='flex gap-4 flex-col md:flex-row justify-center md:justify-start items-center md:items-start' >
                <div className='w-48 h-48 rounded-xl border border-blue-700'>
                    <img className='w-full h-full' src={profile.profileImg} alt="" />
                </div>
                <div className='text-center md:text-left'>
                    <h3 className='text-xl font-medium text-[#4c58db]'>{profile.name}</h3>
                    <span className="text-gray-800 font-semibold">{profile.age}</span>
                    / <span className="text-gray-800 font-semibold">{profile.gender}</span>
                    <div className='space-y-2 flex flex-col justify-center md:justify-start align-center md:align-start'>
                        <div className="flex justify-center md:justify-start">
                            <span className="text-gray-500 font-medium">Contact:&nbsp;</span>
                            <span className="text-gray-800 font-semibold">{profile.contact}</span>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <span className="text-gray-500 font-medium">Email:&nbsp;</span>
                            <span className="text-gray-800 font-semibold">{profile.email}</span>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <span className="text-gray-500 font-medium">Address:&nbsp;</span>
                            <span className="text-gray-800 font-semibold">{profile.address}</span>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <span className="text-gray-500 font-medium">Blood Group:&nbsp;</span>
                            <span className="text-gray-800 font-semibold">{profile.blood_grp}</span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <h2 className='font-xl p-2'>Emergency Contact</h2>
        <div className='p-4 space-y-4'>
            <div className="flex justify-center md:justify-start">
                <span className="text-gray-500 font-medium">Name:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile.Ename}</span>
            </div>
            <div className="flex justify-center md:justify-start">
                <span className="text-gray-500 font-medium">Contact:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile.Econtact}</span>
            </div>
            <div className="flex justify-center md:justify-start">
                <span className="text-gray-500 font-medium">Relation:&nbsp;</span>
                <span className="text-gray-800 font-semibold">{profile.Erelation}</span>
            </div>
        </div>
        <h2 className='font-xl p-2'>Appointment History</h2>
        {appointments && appointments.length > 0 ?
            <div>
                {appointments.map((app) => (
                    <div key={app._id} className=''>
                        <div className={`${app.status === "Cancelled" ? "bg-gray-200" : ""}  p-4 relative space-y-3`}>

                            <div className={` px-3 py-1 rounded-full text-xs font-medium inline-block ${statuscolors[app.status]}`}>
                                {app.status}
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <span className="text-gray-500 font-medium">Patient's Name:&nbsp;</span>
                                <span className="text-gray-800 font-semibold">{app.patientId.name}</span>
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <span className="text-gray-500 font-medium">Concern:&nbsp;</span>
                                <span className="text-gray-800 font-semibold">{app.concern}</span>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between items-center'>
                                <div className="flex justify-center md:justify-start">
                                    <span className="text-gray-500 font-medium">Appointment Date & Time:&nbsp;</span>
                                    <span className="text-gray-800 font-semibold">{new Date(app.Appdate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}{" "}
                                        | {app.Apptime}</span>
                                </div>
                                <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
                                    {app.status !== "Cancelled" && app.status !== "Completed" && (
                                        <>
                                            <button onClick={(() => handleStatusChange(app._id, "Completed"))} className={`${app.status === "Cancelled" ? "cursor-not-allowed" : "cursor:pointer"}  bg-green-100 border border-green-500 text-green-600 rounded-xl px-2 py-1 m-1`}>Visit Appointment</button>
                                            <button onClick={(() => handleStatusChange(app._id, "Cancelled"))} className={`${app.status === "Cancelled" ? "cursor-not-allowed" : "cursor:pointer"}  bg-red-100 border border-red-500 text-red-600 rounded-xl px-2 py-1 m-1`}>Cancel Appointment</button>
                                        </>
                                    )}

                                    {app.status === "Completed" && (
                                        <button onClick={() => {
                                            setSelectedAppointment(app._id);
                                            setShowModal(true)
                                        }}
                                            className={`bg-blue-100 border border-blue-500 text-blue-600 rounded-xl px-2 py-1 m-1 `}>Add Prescription</button>

                                    )}
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>

                ))}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 md:w-96 animate-fade-in">
                            <h2 className="text-lg font-semibold mb-3 text-blue-600">Add Prescription</h2>
                            <div className='my-4'>
                                <label className='block text-sm font-medium text-gray-600 mb-2' htmlFor="">Prescription Image:</label>
                                <input type="file"
                                    name='prescription'
                                    required
                                    className='block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    accept="image/*"
                                    onChange={(e) => setPrescription(e.target.files[0])}
                                />
                            </div>
                            <label className='pb-2' htmlFor="">Remarks:</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows="4"
                                placeholder="Write some remarks..."
                                name='Remarks'
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => addPrescription(selectedAppointment)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div> :
            <div> No Appointments history found</div>

        }

        <div className={`w-full  justify-center items-center ${appointments.length > 0 ? "flex" : "hidden"}`}>
            <div className=' my-4  '>
                <Pagination showQuickJumper defaultCurrent={2} total={totalpages * 10} className='mx-auto' onChange={handelpageclick} />
            </div>
        </div>


    </div>
)
}



export default ViewDetails