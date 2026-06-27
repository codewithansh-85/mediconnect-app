import React, { useState } from 'react'
import "./../../styles/login.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import doc from "../../assets/docregister-removebg.png"
import { Box, TextField } from '@mui/material'
import bg from "../../assets/docbg-removebg.png"
import SectionWrapper from '../../common/SectionWrapper'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setPatient } from '../../Reducers/Doctorreducers'
const Login = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [viewPass, setViewPass] = useState(false)
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    usertype: ""
  })

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // toggle password
  const handlePassView = () => setViewPass(prev => !prev)

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post("/Dental/user/loginuser", formValue)
      const { status, message, user, token,} = res.data

      if (status === "success") {
        // store user details
        localStorage.setItem("email", user.email)
        localStorage.setItem("usertype", user.usertype)
        localStorage.setItem("mobileno", user.mobileNo)
        console.log(user.usertype)
        localStorage.setItem("token", token)
        console.log(`Login Response ID:${user._id}`)
        Swal.fire({
          title: message,
          icon: "success",
          draggable: true
        })

        // usertype ke hisaab se profile check
        if (user.usertype === "doctor") {
          const profileRes = await axios.post("/Dental/doctor/getdoctprofile", {}, {
            headers: { "Content-Type": "multipart/form-data" },
            params: { email: user.email, usertype: user.usertype }
          })
          
          if (profileRes.data.status === "success") {
            navigate("/dashboard/doctor/view")
          } else {
            navigate("/add")
          }
        }
        else if (user.usertype === "Clinic") {
          const profileRes = await axios.post("/Dental/clinic/getclinicprofile", {}, {
            headers: { "Content-Type": "multipart/form-data" },
            params: { email: user.email, usertype: user.usertype }
          })

          if (profileRes.data.status === "success") {
            navigate("/dashboard/Clinics/view")
          } else {
            navigate("/Clinics/add")
          }
        }
        // else if (user.usertype === "Admin") {
        //   navigate("/admin/dashboard")
        // }
        else if (user.usertype === "patient") {  
          const profileRes = await axios.post("/Dental/patient/getPatientprofile", {}, {
            headers: { "Content-Type": "multipart/form-data" },
            params: { email: user.email, usertype: user.usertype }
          })

          if (profileRes.data.status === "success") {
            console.log(profileRes.data.data)
            dispatch(setPatient(profileRes.data.data))
            navigate("/Myprofile")
          } else {
            navigate("/createprofile")
          }
        }
        else {
          Swal.fire("Error", "Invalid user type!", "error")
        }

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        })
      }

    } catch (error) {
      console.log("Error while logging in: ", error)
      Swal.fire("Error", "Something went wrong. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full mt-10 m-auto'>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='flex flex-col md:flex-row relative z-[0] items-center pr-0 md:pr-2 md:items-end justify-center bg-gradient-to-t from-[#333CA6] to-[#409eff] w-full  '>
        <div className="absolute  inset-0 z-[-1]" style={{ backgroundImage: `url(${bg})` }}></div>
        <SectionWrapper>
          <div>
            <img src={doc} alt="" />
          </div>
        </SectionWrapper>
        <SectionWrapper className="w-full">
          <form className='h-full p-2 w-full mx-auto z-10 bg-white/80 rounded-lg mt-0 md:mt-4  m-4' onSubmit={handleSubmit}>

            <div className="text-[24px] font-bold mb-[25px] text-[rgb(51_60_166)] uppercase text-center">
              Login
            </div>

            <Box sx={{ margin: '20px auto' }} className="grid grid-cols-1 md:grid-cols-2  gap-4 justify-around items-center w-full">
              <TextField
                id="filled-basic"
                label="email"
                variant="filled"
                className='bg-white/20 rounded-lg'
                name="email"
                value={formValue.email}
                onChange={handleChange}
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
                  value={formValue.usertype}
                  onChange={handleChange}
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

                  onChange={handleChange}

                  value={formValue.password}
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

            </Box>

            <div className="flex items-center  justify-between">
              <button type="submit" className="bg-gradient-to-r from-[#333CA6] to-[#5c6aff] font-medium text-white hover:bg-blue-600 transition duration-300 py-2 px-4 rounded-full">
                Login
              </button>
              <p>
                Create Account? <Link className='text-blue-600' to={"/Register"}>Register</Link>
              </p>
            </div>
          </form>
        </SectionWrapper>
      </div>

    </div>
  )
}

export default Login
