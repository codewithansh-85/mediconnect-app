import React from 'react'
import AdminPanel from '../adminPanel/DashboardLayout.jsx'
import { useSelector } from 'react-redux';
import ClinicCard from './ClinicCard.jsx';


const MyClinics = () => {
  const profiledata = useSelector((state) => state.MyClinics);
  console.log(profiledata)
  const myclinicslist = profiledata?.clinics




  return (
    <>
      <div>
        <div className='flex flex-col justify-center items-center flex-wrap gap-4  justify-around mx-auto  rounded-lg'>
          <h3 className='text-[#333ca6] font-bold p-4 '>Available at These Clinics</h3>
          {myclinicslist?.length === 0 && <p className='text-[#333ca6] font-bold p-4 text-2xl'>No clinics registered yet</p>}
          {myclinicslist?.length > 0 &&
            myclinicslist?.map((clinics, index) => {
              return <ClinicCard key={clinics._id} clinicdata={clinics} />
            })}
        </div>
      </div>
    </>
  )
}

export default MyClinics