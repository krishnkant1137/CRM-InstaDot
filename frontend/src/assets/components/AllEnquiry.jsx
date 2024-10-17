import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/enquiry');
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      alert('Error fetching enquiries');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-3xl font-bold text-gray-800">All Enquiries</h1>
      <div className="flex justify-center mt-4">
        <button onClick={() => navigate('/sales')} className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200">
          Back to Sales Section
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Number</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Response</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{formatDate(enquiry.enquiryDate)}</td>
                  <td className="px-4 py-2 border">{enquiry.fullName}</td>
                  <td className="px-4 py-2 border">{enquiry.mobileNumber}</td>
                  <td className="px-4 py-2 border">{enquiry.courseName}</td>
                  <td className="px-4 py-2 border">{enquiry.response || 'No Response'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No Enquiries Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEnquiry;
