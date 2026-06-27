import SectionWrapper from "../common/SectionWrapper.jsx"
import img1 from "../assets/doc1-removed.png"
import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import drbg from "../assets/docbg-removebg.png"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination } from 'antd';
import { useParams } from "react-router-dom";

const specializations = ["All", "General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Cardiologist", "Orthopedic", "Psychiatrist", "Dentist"]

export default function DoctorsPage() {
  const params = useParams()
  const filter = params.speciality  
  console.log(filter)
  const [selectedFilter, setSelectedFilter] = useState(filter || specializations[0]);
    useEffect(() => {
    setSelectedFilter(filter || "All"); // URL change hone pe state update
  }, [filter]);

  console.log(selectedFilter)
  const navigate = useNavigate()

  console.log(selectedFilter)
  // function to fetch doctor data from backend
  const [page, setPage] = useState(1)
  const limit = 4
  const [doctorlist, setDoctorlist] = useState([])
  const [totalpages, setTotalpages] = useState(0)
  const getData = async () => {
    try {
      const response = await axios.post(`/Dental/doctor/getdoctorlist/${selectedFilter}`,
        {},
        {
          params: {
            page: page,
            limit: limit
          }
        }
      )
      if (response.data.status === "success") {
        setDoctorlist(response.data.list)
        setTotalpages(response.data.totalpages)
        console.log(response.data.list)
        navigate(`/doctors/${selectedFilter}`)

      }
      else {
        console.log(response.data.message)
        setDoctorlist([])
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handelpageclick = (pageNumber) => {
    setPage(pageNumber)

  }
  useEffect(() => {
    console.log("Updated doctorlist state:", doctorlist);
  }, [doctorlist]);
  useEffect(() => {
    getData()
  }, [page, selectedFilter])
  return (
    <div className="p-8 relative  min-h-screen text-white">
      <div className="absolute  inset-0 z-[-9999]" style={{ backgroundImage: `url(${drbg})` }}></div>
      <div className="bg-gradient-to-r from-[#333CA6CC] to-[#5c6affCC] absolute inset-0 z-[-9998]"></div>
      <div className="z-[10]">
        <h1 className="text-4xl font-bold text-center mb-10">Browse through the doctors specialists.</h1>

        {/* Dropdown Filter */}
        <div className="w-72 z-[100] mx-auto mt-10">
          <Listbox value={selectedFilter} onChange={setSelectedFilter}>
            <div className="relative  mt-1">
              <Listbox.Button className="relative w-full mb-6 bg-white border border-gray-300 rounded-lg shadow-md pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none">
                <span className="block truncate text-black">{selectedFilter}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="w-5 h-5 text-gray-400" />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full mt-1 bg-white shadow-lg max-h-60 z-[9999]    rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                  {specializations.map((spec) => (
                    <Listbox.Option
                      key={spec}
                      value={spec}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {spec}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon className="w-5 h-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

        </div>

        {/* Animated Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 z-[-100] md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorlist.map(doctor => (
            <SectionWrapper key={doctor.id}>
              <div className="bg-white/20 hover:shadow-xl z-[0] group rounded-lg relative">
                <div className='bg-gray-300 rounded-lg overflow-hidden group'>
                  <img
                    src={doctor.doctorimg}
                    alt={doctor.username}
                    className="w-full h-48 overflow-hidden group-hover:scale-110 mx-auto object-cover transition duration-300"
                  />
                </div>
                <div className='p-2 '>
                  <h3 className="font-bold text-xl text-left text-white">{doctor.username}</h3>
                  <p className="text-gray-700 text-white py-2">{doctor.specialization}</p>

                  <span className='flex gap-2 pb-2 justify-between items-center'>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${doctor.status === "Available"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                    >
                      {doctor.status}
                    </span>
                    |

                    <p className='text-xs'>
                      Consultancy Fee: {doctor.fee}
                    </p>

                  </span>
                  <span className=" mx-auto w-full flex items-center justify-center">
                    <Link to={`/book-appointment/${doctor._id}`} className='absolute z-[9999] shadow-xl py-2 px-4 rounded-full bg-white text-blue-600 bottom-0 left-[20%] opacity-0 group-hover:opacity-100 group-hover:bottom-[40%] transition-all duration-300'>
                      Book Appointment
                    </Link>
                  </span>
                  <div className='absolute h-1 w-20 bg-gradient-to-r from-white to-[#409eff] z-[9999] rounded-full bottom-0 left-0 opacity-0 group-hover:opacity-100 group-hover:left-[35%] transition-all duration-300'>

                  </div>

                </div>
                <div className="bg-black/30 absolute inset-0 hidden group-hover:block z-[9998]"></div>
              </div>
            </SectionWrapper>
          ))}
        </div>
        <div className='flex my-2 items-center justify-center' >
          <div className=' '>
            <Pagination showQuickJumper defaultCurrent={2} total={totalpages * 10} className='mx-auto' onChange={handelpageclick} />
          </div>
        </div>
      </div>
    </div>
  );
}
