// // src/components/FacultiesLogin.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const FacultiesLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/faculties/login', { username, password });
//       if (response.data.token) {
//         localStorage.setItem('facultiesAuthToken', response.data.token);
//         localStorage.setItem('facultyUsername', response.data.username); // Store the faculty's username
//         navigate(`/faculties/dashboard/${response.data.username}`); // Redirect to faculty-specific dashboard
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };
  
//   return (
//     <div className="flex justify-center items-center min-h-[85vh] bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-12 rounded-2xl shadow-2xl w-[32rem] space-y-8 mt-8">
//         <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Faculties Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="block w-full mb-6 p-4 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-6 p-4 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-4 rounded-xl text-2xl font-semibold hover:bg-blue-600 transition duration-200"
//         >
//           Login
//         </button>
//       </form>

//       {modalVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h3 className="text-lg font-semibold">{modalMessage}</h3>
//             <button 
//               onClick={closeModal} 
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultiesLogin;




import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State for success message

  const handleLogin = (e) => {
    e.preventDefault();
    // You can replace these with your actual credentials
    const validEmail = 'jay@gmail.com'; // Example email
    const validPassword = '111111'; // Example password

    if (email === validEmail && password === validPassword) {
      setSuccess(true); // Set success to true
      setError(''); // Clear any previous error messages
      onLogin(); // Call the onLogin function passed as a prop
    } else {
      setError('Invalid email or password'); // Set error message for invalid credentials
      setSuccess(false); // Clear success message on error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">Login successful!</p>} {/* Success message */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

