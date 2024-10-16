import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Layout from './assets/components/Layout';
import Sales from './assets/components/Sales';
import Student from './assets/components/Student';
import StudentEnquiry from './assets/components/StudentEnquiry';
import AllEnquiry from './assets/components/AllEnquiry';
import Demo from './assets/components/Demo';
import AllDemo from './assets/components/AllDemo';
import PrivateRoute from './assets/components/PrivateRoute';
import FacultiesLogin from './assets/components/facultySection/FacultiesLogin';
import Faculties from './assets/components/facultySection/Faculties';
import BatchPage from './assets/components/facultySection/Batchpage';
import SalesLogin from './assets/components/SalesLogin'; 
import Unauthorized from './assets/components/Unauthorized';
import EnrolledStudent from './assets/components/AdmissionForm';
import AllEnrolledStudents from './assets/components/AllEnrolledStudent';
import StudentProfile from './assets/components/StudentProfile';
import Navbar from './assets/components/Navbar';
import AttendancePage from './assets/components/facultySection/AttendancePage';
import AkshaySirDashboard from './assets/components/facultySection/AkshaySirDashboard';
import PerformancePage from './assets/components/facultySection/PerformancePage';
// import PropertyForm from './assets/components/Form';

function App() { 
  return (
    <>
      <Layout>
        <Router>
          <Navbar />
          <div className="min-h-screen bg-gray-100 p-6">
            <Routes>
              {/* Public Route for Login */}
              <Route path="/sales/login" element={<SalesLogin />} /> {/* Fixed SalesLogin import */}
              <Route path="/faculties/login" element={<FacultiesLogin />} />

              {/* Landing page with Sales and Faculties links */}
              <Route
                path="/"
                element={
                  <div className="flex justify-center items-center h-screen space-x-12">
                    <Link 
                      to="/sales/login" 
                      className="bg-indigo-600 text-white p-16 rounded-lg shadow-lg text-2xl hover:bg-indigo-700 transition duration-300"
                    >
                      Sales Section
                    </Link>
                    <Link 
                      to="/faculties-login-dashboard" 
                      className="bg-teal-500 text-white p-16 rounded-lg shadow-lg text-2xl hover:bg-teal-600 transition duration-300"
                    >
                      Faculties Section
                    </Link>
                    <Link 
                      to="/HR/login" 
                      className="bg-orange-500 text-white p-16 rounded-lg shadow-lg text-2xl hover:bg-orange-600 transition duration-300"
                    >
                      HR Section
                    </Link>
                    <Link 
                      to="/Admin/login" 
                      className="bg-purple-600 text-white p-16 rounded-lg shadow-lg text-2xl hover:bg-purple-700 transition duration-300"
                    >
                      Admin Section
                    </Link>
                  </div>
                }
              />

              {/* Protected Routes for Sales */}
              <Route path="/sales" element={<PrivateRoute allowedRoles={['sales']}><Sales /></PrivateRoute>} />
              <Route path="/sales/search-student" element={<PrivateRoute allowedRoles={['sales']}><Student /></PrivateRoute>} />
              <Route path="/sales/student-enquiry" element={<PrivateRoute allowedRoles={['sales']}><StudentEnquiry /></PrivateRoute>} />
              <Route path="/sales/all-enquiry" element={<PrivateRoute allowedRoles={['sales']}><AllEnquiry /></PrivateRoute>} />
              <Route path="/sales/demo" element={<PrivateRoute allowedRoles={['sales']}><Demo /></PrivateRoute>} />
              <Route path="/sales/all-demo" element={<PrivateRoute allowedRoles={['sales']}><AllDemo /></PrivateRoute>} />
              <Route path="/sales/enrolled-students" element={<PrivateRoute allowedRoles={['sales']}><EnrolledStudent /></PrivateRoute>} />
              <Route path="/sales/all-enrolled-students" element={<AllEnrolledStudents />} />
              <Route path="/students/:studentId" element={<StudentProfile />} />

              {/* Protected Route for Faculty Dashboard */}
              <Route path="/faculties-login-dashboard" element={<Faculties />} />
              <Route path="/AkshaySirDashboard" element={<AkshaySirDashboard />} />
              <Route path="/AkshaySirDashboard/batch" element={<BatchPage />} />
              <Route path="/AkshaySirDashboard/attendance" element={<AttendancePage />} />
              <Route path="/AkshaySirDashboard/performance" element={<PerformancePage />} />
              {/* Unauthorized Route */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              {/* <Route path="/form" element={<PropertyForm />} /> */}
            </Routes>
          </div>
        </Router>
      </Layout>
    </>
  );
}

export default App;
