import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";

function DoctorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch doctor details
  const fetchDoctorDetails = async () => {
    try {
      const response = await axiosInstance.get(
        adminEndPoints.ADMIN.DOCTOR_DETAILS.replace(":id", id)
      );
      console.log("Doctor details:", response.data.data.doctor);
      setDoctor(response.data.data.doctor);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;

  if (!doctor)
    return (
      <p className="text-center text-lg text-red-500 font-semibold">
        Doctor not found.
      </p>
    );

    const handleEdit = (doctorId) => {
      navigate(`/admin/edit-doctor/${doctorId}`);
    };
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6">
       <div className="flex justify-center mb-4">
        <img
          className="w-56 h-44 object-cover rounded-lg shadow-md"
          src={doctor.image}
          alt={doctor.name}
        />
      </div> 
      <h1 className="text-2xl font-bold text-blue-default text-center mb-2">
        {doctor.name}
      </h1>
      <div className="w-full bg-blue-100 p-4 rounded-lg shadow-sm mb-4">
        <p className="text-lg font-semibold text-gray-700">About</p>
        <p className="text-sm text-gray-700">{doctor.about || "N/A"}</p>
      </div> 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Email</p>
          <p className="text-sm text-gray-600">{doctor.email || "N/A"}</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Specialization</p>
          <p className="text-sm text-gray-600">{doctor.specialization || "N/A"}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Qualifications</p>
          <p className="text-sm text-gray-600">{Array.isArray(doctor.qualifications) ? doctor.qualifications.join(", ") : "N/A"}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Experience</p>
          <p className="text-sm text-gray-600">{doctor.experience} years</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Consultation Fees</p>
          <p className="text-sm text-gray-600">₹ {doctor.fees.toFixed(2)}/-</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Available</p>
          <p className="text-sm text-gray-600">{doctor.availability ? "Yes" : "No"}</p>
        </div>
      </div>
      <div className="flex justify-center mx-auto mt-4 space-x-2">
        <button
          onClick={()=> handleEdit(doctor._id)}
          className="px-6 py-2 bg-blue-default text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Edit 🖋
        </button>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-default text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default DoctorDetails;
