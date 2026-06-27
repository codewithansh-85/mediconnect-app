import axios from 'axios';
import React from 'react'
import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const CreateProfile = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("email"),
    contact: localStorage.getItem("mobileno"),
    address: "",
    age: "",
    profileImg: null,
    DOB: "",
    blood_grp: "",
    Ename: "",
    Erelation: "",
    Econtact: "",
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {


    try {
      e.preventDefault();
      const formdata = new FormData()

      formdata.append("name", formData.name)
      formdata.append("gender", formData.gender)
      formdata.append("contact", formData.contact)
      formdata.append("age", formData.age)
      formdata.append("address", formData.address)
      formdata.append("email", formData.email)
      formdata.append("profileImg", formData.profileImg)
      formdata.append("DOB", formData.DOB)
      formdata.append("blood_grp", formData.blood_grp)
      formdata.append("Ename", formData.Ename)
      formdata.append("Erelation", formData.Erelation)
      formdata.append("Econtact", formData.Econtact)

      const response = await axios.post("/Dental/patient/addpatient",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`

          }
        }
      )
      console.log(response.data)
      if (response.data.Status === "success") {
        console.log(response.data.data.email)
        // localStorage.setItem("patientEmail", response.data.data.email)
        navigate("/Myprofile")

        Swal.fire({
          title: response.data.message,
          icon: "success",
          draggable: true
        });
        setFormData({
          name: "", age: "", email: "", contact: "",
          gender: "", address: "", profileImg: null, DOB: "",
          blood_grp: "",
          Ename: "",
          Erelation: "",
          Econtact: "",
        });

      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,

        });
      }
    } catch (error) {
      console.log("error while creating patient profile", error)
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-400 to-blue-700 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white my-4 shadow-lg rounded-2xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Create Profile
        </h2>
        <h3>Personal Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 '>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>



          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}

              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}

              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your contact number"
              required
            />
          </div>
          {/* gender */}
          <div className="mb-4 ">
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="gender"
              value={formData.gender}

              required
            >
              <option value="">Select</option>

              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              value={formData.age}

              name="age"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your age"
              min="1"
              max="100"
            />
          </div>
          {/* Blood Grp */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Blood Group</label>
            <select name="blood_grp" 

              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.blood_grp}

              required id="">
              <option value="" disabled>
                -- Choose Blood Group --
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}

              rows="2"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your address"
            ></textarea>
          </div>


          {/* Profile Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              name="profileImg"
              required
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-600"
            />
          </div>

        </div>
        <hr />
        <h3>Emergency Contact Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 ' >

          {/* Ename */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="Ename"
              value={formData.Ename}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter name"
              required
            />
          </div>

          {/* relation */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Relation</label>
            <input
              type="text"
              name="Erelation"
              value={formData.Erelation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter relation"
              required
            />
          </div>
          {/* Econtact */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="tel"
              name="Econtact"
              value={formData.Econtact}

              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter contact number"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}




export default CreateProfile