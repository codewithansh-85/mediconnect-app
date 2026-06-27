import React, { useEffect, useState } from 'react'
import ClinicCard from './ClinicCard'
import axios from 'axios'
import { Pagination } from 'antd';
import AdminPanel from '../adminPanel/DashboardLayout';



const ClinicList = () => {
    const [page, setPage] = useState(1)
    const limit = 4
    const [cliniclist, setCliniclist] = useState([])
    const [totalpages, setTotalpages] = useState(0)

    const getcliniclist = async () => {
        try {
            const response = await axios.post("/Dental/clinic/cliniclist",
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
                console.log("clinic list etch successfull raha")
                setCliniclist(response.data.list)
                setTotalpages(response.data.totalpages)

            }

            else {
                console.log(response.data.message)
            }

        } catch (error) {
            console.log(`clinic list fetch error${error}`)
        }
    }

    const handelpageclick = (pageNumber) => {
        setPage(pageNumber)

    }
    useEffect(() => {
        console.log("Updated cliniclist state:", cliniclist);
    }, [cliniclist]);
    useEffect(() => {
        getcliniclist()
    }, [page])
    return (
        <>
            <div className='my-4 p-4 flex flex-col gap-10 items-center justify-between'>
                <h1 className='font-bold text-2xl'>Clinics List</h1>
                <div className='flex flex-wrap gap-4  justify-around mx-auto  rounded-lg'>
                    {cliniclist?.map((clinic, index) => {
                        return <ClinicCard key={index} clinicdata={clinic} />;
                    })}
                </div>

                <div className='' >
                    <div className='w-full mx-auto'>
                        <Pagination showQuickJumper defaultCurrent={2} total={totalpages * 10} className='mx-auto' onChange={handelpageclick} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClinicList