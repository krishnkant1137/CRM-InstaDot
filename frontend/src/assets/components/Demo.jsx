import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';

const Demo = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [time, setTime] = useState('');
  const [course, setCourse] = useState('');
  const [demoBy, setDemoBy] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherCourse, setOtherCourse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const demoData = {
      name,
      number,
      time,
      course: isOtherSelected ? otherCourse : course,
      demoBy,
    };

    try {
      await axios.post('http://localhost:5000/api/demo', demoData);
      alert('Demo successfully recorded!');
      // Reset form fields
      setName('');
      setNumber('');
      setTime('');
      setCourse('');
      setDemoBy('');
      setOtherCourse('');
      setIsOtherSelected(false);
    } catch (error) {
      console.error('Error submitting demo:', error);
      alert('Error submitting demo.');
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
    setIsOtherSelected(selectedCourse === 'Other');
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-3xl font-bold text-gray-800">Demo Section</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Student Name"
            className="border border-gray-300 p-2 rounded-lg mb-4 w-1/2"
            required
          />
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter Phone Number"
            className="border border-gray-300 p-2 rounded-lg mb-4 w-1/2"
            required
          />
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter Time Range"
            className="border border-gray-300 p-2 rounded-lg mb-4 w-1/2"
            required
          />
          <select
            value={course}
            onChange={handleCourseChange}
            className="border border-gray-300 p-2 rounded-lg mb-4 w-1/2"
            required
          >
            <option value="">Select Course</option>
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

          {isOtherSelected && (
            <input
              type="text"
              value={otherCourse}
              onChange={(e) => setOtherCourse(e.target.value)}
              placeholder="Enter Other Course"
              className="border border-gray-300 p-2 rounded-lg mb-4 w-1/2"
              required
            />
          )}

          <select
            value={demoBy}
            onChange={(e) => setDemoBy(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mb-4 w-1/2"
            required
          >
            <option value="">Select Teacher</option>
            <option value="teacher-1">Akshay Sir</option>
            <option value="teacher-2">Eshwar Sir</option>
            <option value="teacher-3">Gaurav Sir</option>
            <option value="teacher-4">Vishal Sir</option>
            <option value="teacher-5">Shubham Sir</option>
            <option value="teacher-6">Nipur Sir</option>
          </select>

          <button type="submit" className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200">
            Submit Demo
          </button>
        </div>
      </form>
      {/* Navigation Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate('/sales')} // Change to your desired route
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Demo;
