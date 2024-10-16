import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      const response = await axios.post('http://localhost:5000/api/sales/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('salesAuthToken', response.data.token); // Store token
        localStorage.setItem('userRole', 'sales');
        setModalMessage('Login Successful!');
        setModalVisible(true);
        setTimeout(() => {
          navigate('/sales'); // Redirect to sales section
        }, 1500);
      } else {
        setModalMessage('Invalid credentials');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setModalMessage('Login failed');
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal on button click
  };

  const handleClose = () => {
    navigate('/'); // Redirect to home route when cross button is clicked
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100">
      <form onSubmit={handleLogin} className="relative bg-white p-12 rounded-2xl shadow-2xl w-[32rem] space-y-8 mt-8">
        {/* Cross Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          &#10005; {/* Unicode character for the cross (×) symbol */}
        </button>

        <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Sales Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mb-6 p-4 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-6 p-4 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-4 rounded-xl text-2xl font-semibold hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">{modalMessage}</h3>
            <button 
              onClick={closeModal} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesLogin;
