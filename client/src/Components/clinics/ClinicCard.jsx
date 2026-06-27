import React from 'react'
import { Link } from 'react-router-dom'

const ClinicCard = ({ clinicdata }) => {
    return (
        <div className='w-full'>
            <div className='flex flex-col sm:flex-row justify-between px-8 items-center h-full gap-6 w-full hover:shadow-lg  p-4 rounded-lg bg-[#f8f8f8] hover:bg-[#ffffff] transition-all duration-500 ease-in-out'>
                <div className=' flex flex-col sm:flex-row justify-between items-center  gap-6' >
                    <div className=' border border-[#333CA6] rounded-lg overflow-hidden h-[100px] w-[100px]'><img className='object-contain' src={clinicdata.logo} alt="" /></div>
                    <div className=''>
                        <div className='font-bold'>{clinicdata.clinicname}</div>
                        <div>{clinicdata.address}</div>
                        <div>{clinicdata.clinicType}</div>
                    </div>

                </div>
                <button className='p-2 h-1/2  p-4 rounded-xl py-2 text-white bg-gradient-to-r from-[#333CA6] to-[#5c6aff]  '> <Link to={`/dashboard/Clinics/view/${clinicdata?._id}`}>View Details</Link></button>

            </div>
            <div className="w-full flex justify-center ">
                <div className="w-[90%] border-b border-[#333CA6]"></div>
            </div>
        </div>
    )
}

export default ClinicCard