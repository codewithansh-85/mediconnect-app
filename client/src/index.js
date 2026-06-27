import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Profile from "./Components/doctorprofile/Profile.jsx"
import ViewProfile from './Components/doctorprofile/ViewProfile.jsx';
import ViewPatients from "./Components/patients/ViewPatients.jsx"
import Editdoctor from './Components/doctorprofile/Editdoctor.jsx';
import AdminPanel from './Components/adminPanel/DashboardLayout.jsx';
import AddClinic from './Components/clinics/AddClinic.jsx';
import ViewClinic from './Components/clinics/ViewClinic.jsx';
import Editclinic from './Components/clinics/Editclinic.jsx';
import ClinicList from './Components/clinics/ClinicList.jsx';
import MyClinics from './Components/clinics/MyClinics.jsx';
import { Provider } from "react-redux"
import store from './Reducers/Store.js';
import LandingPage from './Components/WebsiteLayout/LandingPage.js';
import Home from './pages/Home.jsx';
import AllDoctors from './pages/AllDoctors.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import MyProfile from './pages/MyProfile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import DashboardLayout from './Components/adminPanel/DashboardLayout.jsx';
import CreateProfile from './pages/CreateProfile.jsx';
import ViewDetails from './Components/patients/ViewDetails.jsx';


const router = createBrowserRouter(

  createRoutesFromElements(
    <>

      <Route path='/' element={<LandingPage />}>
        <Route index element={<Home />} />
        <Route path='doctors' element={<AllDoctors />} />
        <Route path='doctors/:speciality' element={<AllDoctors />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='Myprofile' element={<MyProfile />} />
        <Route path='Myappointments' element={<MyAppointments />} />
        <Route path='book-appointment/:doctorID' element={<BookAppointment />} />
        <Route path='add' element={<Profile />} />
        <Route path='createprofile' element={<CreateProfile />} />
        <Route path='Clinics/view/:clinicId' element={<ViewClinic />} />


      </Route>


      <Route path='/dashboard' element={<DashboardLayout />}>

     
        <Route path='doctor/edit/:id' element={<Editdoctor />} />
        <Route path='doctor/view' element={<ViewProfile />} />
        <Route path='add' element={<Profile />} />

        <Route path='patients/viewdetails/:id' element={<ViewDetails />} />

        <Route path='patients/view' element={<ViewPatients />} />

        <Route path='Clinics/add' element={<AddClinic />} />
        <Route path='Clinics/view/:id' element={<ViewClinic />} />
        <Route path='Clinics/list' element={<ClinicList />} />
        <Route path="Clinics/myClinics" element={<MyClinics />} />
        <Route path='clinic/edit/:id' element={<Editclinic />} />
      </Route>



    </>

  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />

  </Provider>

);

