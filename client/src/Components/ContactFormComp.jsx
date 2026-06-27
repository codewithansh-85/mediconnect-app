import React, { useState } from "react";

const ContactFormComp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="h-auto  lg:w-[45vw] mx-auto ">
      <div className="bg-white shadow-lg rounded-lg w-full mx-auto h-full p-4 ">
        <h2 className="text-[3vmin] font-bold mb-6 text-center text-green-600">Contact Us</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Name */}
          <div>
            <label className="block mb-2 text-[2vmin] font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-[1.5vmin] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-[2vmin] font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border text-[1.5vmin] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-[2vmin] font-medium">Message</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 text-[1.5vmin] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-blue-300 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 text-[2.5vmin]"
            >
              Send Message
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactFormComp;
