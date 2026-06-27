import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaHeartbeat, FaLaptopMedical } from "react-icons/fa";
import SectionWrapper from "../common/SectionWrapper.jsx"
const About = () => {
  return (
   <SectionWrapper>
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl  font-bold text-indigo-600 mb-6 text-center"
      >
        About MediConnect
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-3xl text-gray-700 text-sm md:text-xl text-center leading-relaxed mb-10"
      >
        MediConnect is a modern healthcare platform that bridges the gap between 
        doctors and patients. Our goal is to make healthcare more accessible, 
        efficient, and patient-friendly. With features like doctor & patient 
        registration, appointment booking, nearby doctor search, and secure 
        file uploads, we simplify your healthcare journey.
      </motion.p>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition"
        >
          <FaUserMd className="text-indigo-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            For Doctors
          </h3>
          <p className="text-gray-600 text-sm">
            Manage profiles, verify licenses, and connect with patients easily 
            through our secure system.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition"
        >
          <FaHeartbeat className="text-indigo-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            For Patients
          </h3>
          <p className="text-gray-600 text-sm">
            Book appointments, search nearby doctors, and keep track of 
            healthcare needs with ease.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition"
        >
          <FaLaptopMedical className="text-indigo-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Secure & Reliable
          </h3>
          <p className="text-gray-600 text-sm">
            Data security is our priority. All patient records and doctor 
            verifications are handled with utmost care.
          </p>
        </motion.div>
      </div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 bg-gradient-to-l from-[#333CA6] to-[#409eff] text-white rounded-2xl shadow-xl p-4 max-w-4xl text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed">
          To connect patients with the right doctors at the right time, making 
          healthcare seamless and trustworthy. We aim to revolutionize how people 
          access medical services by leveraging technology for better outcomes.
        </p>
      </motion.div>
    </div>
   </SectionWrapper>
  );
};

export default About;
