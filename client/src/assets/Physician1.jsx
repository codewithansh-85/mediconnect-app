// Physician.jsx
import React from "react";

const Physician = ({ size = 200, sizew=200, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizew}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <circle cx="32" cy="16" r="8" fill="#60a5fa" stroke={color} />

      {/* Body */}
      <path
        d="M20 48c0-8 5.5-16 12-16s12 8 12 16v8H20v-8z"
        fill="#bfdbfe"
        stroke={color}
      />

      {/* Stethoscope */}
      <path
        d="M40 20c6 4 6 12 0 16"
        stroke={color}
      />
      <circle cx="44" cy="36" r="3" fill="#60a5fa" stroke={color} />

      {/* Cross Badge */}
      <rect x="26" y="30" width="12" height="12" rx="2" fill="white" stroke={color} />
      <path d="M32 32v8M28 36h8" stroke="#ef4444" strokeWidth="2" />

    </svg>
  );
};

export default Physician;
