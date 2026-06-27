import React from 'react';
import agriImage from "../assets/agri.jpg";

const Poster = () => {
  return (
    <div
      style={{ backgroundImage: `url(${agriImage})` }}
      className="h-screen bg-no-repeat bg-cover bg-center bg-green-400 flex flex-col lg:flex-row relative border-4 border-white"
    >
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center relative p-4">
        <div className="bg-white  rounded-full flex flex-col justify-center items-end pl-6 ml-[-40%] mt-[-40%] h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]">
          <div className="w-[80%] p-4">
            <h2 className="font-bold text-left text-lg sm:text-xl lg:text-2xl">
              Sustainable Agriculture Research & Education (SARE)
            </h2>
            <p className="font-semibold text-sm sm:text-base">
              Cultivating Innovation for Sustainable farming farming farming farming farming farming farming farming farming
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Big circle */}
        <div className="absolute bottom-4 right-4 h-48 w-48 sm:h-80 sm:w-80 lg:h-[480px] lg:w-[480px] rounded-full border-[10px] sm:border-[20px] lg:border-[30px] border-red-300 bg-red-200"></div>

        {/* Small circles */}
        <div className="absolute bottom-0 right-0 h-24 w-24 sm:h-40 sm:w-40 lg:h-64 lg:w-64 rounded-full border-4 sm:border-6 lg:border-8 bg-red-200 border-red-300 z-10"></div>

        <div className="absolute bottom-[150px] sm:bottom-[200px] lg:bottom-[300px] right-4 h-24 w-24 sm:h-40 sm:w-40 lg:h-64 lg:w-64 rounded-full border-4 sm:border-6 lg:border-8 bg-red-200 border-red-300 z-10"></div>

        <div className="absolute bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-50px] right-[100px] sm:right-[200px] lg:right-[300px] h-24 w-24 sm:h-40 sm:w-40 lg:h-64 lg:w-64 rounded-full border-4 sm:border-6 lg:border-8 bg-red-200 border-red-300 z-10"></div>
      </div>
    </div>
  );
};

export default Poster;
