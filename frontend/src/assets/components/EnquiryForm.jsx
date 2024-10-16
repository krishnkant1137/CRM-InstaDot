import React, { useState } from "react";
import axios from "axios";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    enquiryDate: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    collegeName: "",
    stream: "",
    passingYear: "",
    courseName: "",
    otherCourse: "", // Initialize for other course input
    source: "",
    otherSource: "", // Initialize for other source input
  });
  const [showOtherCourse, setShowOtherCourse] = useState(false);
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "courseName" && value === "Other") {
      setShowOtherCourse(true);
    } else if (name === "source" && value === "Other") {
      setShowOtherSource(true);
    } else {
      setShowOtherCourse(false);
      setShowOtherSource(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the enquiryDate to ISO string for consistency
      const formattedData = {
        ...formData,
        enquiryDate: new Date(formData.enquiryDate).toISOString(),
      };
      await axios.post("http://localhost:5000/api/enquiry", formattedData);
      setShowModal(true);

      // Reset form data, including other course and source fields
      setFormData({
        enquiryDate: "",
        fullName: "",
        mobileNumber: "",
        email: "",
        address: "",
        collegeName: "",
        stream: "",
        passingYear: "",
        courseName: "",
        otherCourse: "",
        source: "",
        otherSource: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting enquiry");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackToSales = () => {
    // Navigate to the Sales section (modify with your route)
    window.location.href = "/sales";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Student Enquiry Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enquiry Date
            </label>
            <input
              type="date"
              name="enquiryDate"
              value={formData.enquiryDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="College Name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stream
              </label>
              <input
                type="text"
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                placeholder="Stream"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passing Year
            </label>
            <input
              type="text"
              name="passingYear"
              value={formData.passingYear}
              onChange={handleChange}
              placeholder="Passing Year"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="Business Analytics">Business Analytics</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Data Science">Data Science</option>
              <option value="Java Full Stack">Java Full Stack</option>
              <option value="MERN Stack">MERN Stack</option>
              <option value="React Development">React Development</option>
              <option value="Python Development">Python Development</option>
              <option value="Salesforce">Salesforce</option>
              <option value="Software Testing">Software Testing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="DSA">DSA</option>
              <option value="Regarding Internship">Regarding Internship</option>
              <option value="Regarding Placement">Regarding Placement</option>
              <option value="Other">Other</option>
            </select>
            {showOtherCourse && (
              <input
                type="text"
                name="otherCourse"
                value={formData.otherCourse}
                onChange={handleChange}
                placeholder="Please specify the course"
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Source
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Source</option>
              <option value="Google">Google</option>
              <option value="Direct">Direct</option>
              <option value="Just Dial">Just Dial</option>
              <option value="Sulekha">Sulekha</option>
              <option value="Referred by Friends">Referred by Friends</option>
              <option value="Referred by Faculty">Referred by Faculty</option>
              <option value="Calling">Calling</option>
              <option value="Social Media">Social Media</option>
              <option value="Other">Other</option>
            </select>
            {showOtherSource && (
              <input
                type="text"
                name="otherSource"
                value={formData.otherSource}
                onChange={handleChange}
                placeholder="Please specify the source"
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
