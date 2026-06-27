import React, { useState, useRef, useEffect } from "react";
import ContactFormComp from "./ContactFormComp";
import img1 from "../../src/assets/contact.png";
import img2 from "../assets/contact2.png";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Register from "../Components/User/Register"
import Login from "../Components/User/Login"
import img3 from "../assets/online-doctor-with-white-coat.png"


const Contactform = () => {
  const [step, setStep] = useState(0);
  const prevStepRef = useRef(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // Screen resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    prevStepRef.current = step;
  }, [step]);

  const handleClick = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1000);
  };

  const handleBackClick = () => {
    setStep(1);
    setTimeout(() => setStep(0), 1000);
  };

  // Clip-path values for desktop & mobile
  const getClipPath = () => {
    if (step === 0) return isLargeScreen ? "ellipse(80% 100% at 0% 15%)" : "ellipse(100% 80% at 50% 0%)";
    if (step === 1) return isLargeScreen ? "ellipse(120% 150% at 0% 50%)" : "ellipse(150% 120% at 50% 0%)";
    if (step === 2) return isLargeScreen ? "ellipse(80% 139% at 80% 16%)" : "ellipse(100% 80% at 50% 80%)";
    return isLargeScreen ? "ellipse(80% 100% at 0% 15%)" : "ellipse(100% 80% at 50% 0%)";
  };

  // Transform values for animation direction
  const getTransform = () => {
    if (step === 2) return isLargeScreen ? "translateX(50%)" : "translateY(-10%)";
    return "translate(0)";
  };

  // Translate classes for inner content
  const getInnerTranslate = () => {
    if (step === 1) return isLargeScreen ? "translate-x-[-100%]" : "translate-y-[-100%]";
    return " ";
  };

  const getBackTranslate = () => {
    if (step === 1) return isLargeScreen ? "translate-x-[200%]" : "translate-y-[200%]";
    return isLargeScreen ? "translate-x-[-83%]" : "translate-y-[10%] translate-x-[-26%]";
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center  overflow-hidden relative">
      {/* Green Div */}
      <div
        className={`${step === 2 ? "order-2" : "order-1"} bg-gradient-to-b from-[#333ca6] to-white z-1000 ${isLargeScreen ? "absolute top-0 left-0 h-screen w-screen" : "relative w-full h-screen"} transition-all ease-in-out `}
        style={{
          width: step === 0 ? (isLargeScreen ? "50%" : "100%") : "100%",
          height: isLargeScreen ? "100vh" : step === 1 ? "100vh" : "40vh",

          clipPath: getClipPath(),
          transform: getTransform(),
          transition:
            step === 1 || (step === 0 && prevStepRef.current === 1)
              ? "clip-path 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out"
              : "transform 1s ease-in-out",
          zIndex: isLargeScreen ? 0 : "auto",
        }}
      >
        <div
          className={`${getInnerTranslate()} transition-transform duration-500 flex justify-center items-center h-full`}
        >
          {/* Left/Top side content */}
          <div className=" flex lg:flex-col w-full items-center justify-center mx-auto p-4 gap-4">
            {step === 0 && (
              <div className=" flex flex-col items-center justify-center gap-2">
                <h3 className="text-white font-bold text-lg">Have an account?</h3>
                <button
                  onClick={handleClick}
                  className="px-4 ml-4 py-2 border-2 border-white bg-transparent rounded-lg text-white text-[3.5vmin] font-bold"
                >
                  Login
                </button>
              </div>

            )}
            <div className={`${step === 2 ? "invisible" : "visible"} h-[70vh] w-[50vw]`}>
              <img className="h-full w-full object-contain" src={img3} alt="" />
            </div>
          </div>

          {/* Right/Bottom side content */}
          {step === 2 && (
            <div className={`${getBackTranslate()} flex lg:flex-col justify-center items-center p-4 gap-4`}>
              <button
                onClick={handleBackClick}
                className="px-4 py-2 border-2 ml-2 border-white bg-transparent rounded-lg text-white font-bold text-[3.5vmin]"
              >
                Create Account
              </button>
              <div className="h-[70vh] w-[70vw]">
                <img className="h-full w-full object-contain" src={img3} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Area */}
      <div className={`lg:h-screen lg:flex ${step === 2 ? "justify-between" : "justify-end"} ${step === 2 ? "order-1" : "order-2"} p-4 items-center w-full`}>
        {(step === 0) && (

          <div className="w-full lg:w-[50vw]">
            <Register />

          </div>
        )}
        {(step === 2) && (
          <div className="w-full lg:w-[50vw]">
            <Login />

          </div>
        )}
      </div>
    </div>
  );
};

export default Contactform;
