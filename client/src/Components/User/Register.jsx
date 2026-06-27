import React, { useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import FormData from "form-data"
import { Link, useNavigate } from 'react-router-dom'
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import doc from "../../assets/docregister-removebg.png"
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, TextField } from '@mui/material'
import bg from "../../assets/docbg-removebg.png"
import SectionWrapper from '../../common/SectionWrapper'
const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [formvalue, setFormvalue] = useState({
        email: "",
        mobileNo: "",
        usertype: "",
        password: "",
        confirmPassword: ""
    })

    const [viewPass, setViewPass] = useState(false)
    const [viewCPass, setViewCPass] = useState(false)

    const handlePassView = () => setViewPass(prev => !prev)
    const handleCPassView = () => setViewCPass(prev => !prev)

    const handlechange = (e) => {
        const { name, value } = e.target
        setFormvalue({
            ...formvalue,
            [name]: value
        })
    }

    const handlesubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)

            if (formvalue.password !== formvalue.confirmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Confirm password did not match the Password",
                })
                setLoading(false)
                return
            }

            const formData = new FormData()
            formData.append('email', formvalue.email)
            formData.append('mobileNo', formvalue.mobileNo)
            formData.append('usertype', formvalue.usertype)
            formData.append('password', formvalue.password)

            const registerResponse = await axios.post(
                "/Dental/user/createuser",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            )

            console.log(registerResponse.data)

            if (registerResponse.data.status === "success") {
                setLoading(false)
                Swal.fire({
                    title: registerResponse.data.message,
                    icon: "success",
                    draggable: true
                })
                
                navigate("/login")
            } else {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: registerResponse.data.message,
                })
            }
        } catch (error) {
            setLoading(false)
            console.log("error registering user", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            })
        }
    }

    return (
        <React.Fragment>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className='flex flex-col md:flex-row relative z-[0] items-end justify-center bg-gradient-to-t from-[#333CA6] to-[#409eff] w-full  '>
                <div className="absolute  inset-0 z-[-1]" style={{ backgroundImage: `url(${bg})` }}></div>
               <SectionWrapper>
                 <div>
                    <img src={doc} alt="" />
                </div>
               </SectionWrapper>
              <SectionWrapper>
                  <form className='h-full p-4 w-full mx-auto z-10 bg-white/80 rounded-lg mt-0 md:mt-4  m-4 mr-4' onSubmit={handlesubmit}>

                    <div className="text-[24px] font-bold mb-[25px] text-[rgb(51_60_166)] uppercase text-center">
                        Create Account
                    </div>

                    <Box sx={{ margin: '20px auto' }} className="grid grid-cols-1 md:grid-cols-2  gap-4 justify-around items-center w-full">
                        <TextField
                            id="filled-basic"
                            label="email"
                            variant="filled"
                            className='bg-white/20 rounded-lg'
                            name="email"
                            value={formvalue.email}
                            onChange={handlechange}
                            fullWidth
                            sx={{
                                marginBottom: 2,
                                '& .MuiFilledInput-root': {
                                    paddingTop: '5px',
                                    paddingBottom: '0px',
                                },
                            }}
                        />
                        <TextField
                            id="filled-basic"
                            label="contact"
                            name="mobileNo"
                            className='bg-white/20 rounded-lg'

                            value={formvalue.mobileNo}
                            onChange={handlechange}
                            variant="filled"
                            fullWidth
                            sx={{
                                marginBottom: 2,
                                '& .MuiFilledInput-root': {
                                    paddingTop: '5px',
                                    paddingBottom: '0px',
                                },
                            }}
                        />

                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} className='bg-white/20 rounded-lg'>
                            <InputLabel id="demo-simple-select-filled-label">Usertype</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={formvalue.usertype}
                                onChange={handlechange}
                                className='bg-white/20 rounded-lg'

                                name='usertype'
                            >

                                <MenuItem value="">select</MenuItem>

                                <MenuItem value="doctor">doctor</MenuItem>
                                <MenuItem value="patient">patient</MenuItem>
                                <MenuItem value="clinic">clinic</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='relative'>
                            <TextField
                                id="filled-basic"
                                className='relative bg-white/20 rounded-lg'
                                label="password"

                                onChange={handlechange}

                                value={formvalue.password}
                                variant="filled"
                                type={viewPass ? "text" : "password"}
                                name="password"
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiFilledInput-root': {
                                        paddingTop: '5px',
                                        paddingBottom: '0px',
                                    },
                                }}
                            />




                            <span
                                className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer text-grey-500"
                                onClick={handlePassView}
                            >
                                {viewPass ? <IoIosEyeOff /> : <IoIosEye />}
                            </span>
                        </div>
                        <div className='relative '>
                            <TextField
                                id="filled-basic"
                                className='relative bg-white/20 rounded-lg'
                                name='confirmPassword'

                                onChange={handlechange}
                                value={formvalue.confirmPassword}
                                label="Confirm password"
                                variant="filled"
                                type={viewPass ? "text" : "password"}
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiFilledInput-root': {
                                        paddingTop: '5px',
                                        paddingBottom: '0px',
                                    },
                                }}


                            />
                            <span
                                className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer text-grey-500"
                                onClick={handlePassView}
                            >
                                {viewPass ? <IoIosEyeOff /> : <IoIosEye />}
                            </span>
                        </div>
                    </Box>

                    <div className="flex items-center  justify-between">
                        <button type="submit" className="bg-gradient-to-r from-[#333CA6] to-[#5c6aff] font-medium text-white hover:bg-blue-600 transition duration-300 py-2 px-4 rounded-full">
                            Register
                        </button>
                        <p>
                            Already have an Account? <Link className='text-blue-600' to={"/login"}>Login</Link>
                        </p>
                    </div>
                </form>
              </SectionWrapper>
            </div>
        </React.Fragment>
    )
}

export default Register
