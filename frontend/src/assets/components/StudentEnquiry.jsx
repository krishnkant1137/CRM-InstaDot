import EnquiryForm from "./EnquiryForm";
import { useNavigate } from 'react-router-dom';

function StudentEnquiry() {
    const navigate = useNavigate(); // Initialize useNavigate
    return(<>
 <EnquiryForm></EnquiryForm>
        <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate('/sales')} // Change to your desired route
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </>
       
    )

}

export default StudentEnquiry;
