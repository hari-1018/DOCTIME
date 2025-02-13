import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch doctor details
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(
        adminEndPoints.ADMIN.USER_DETAILS.replace(":id", id)
      );
      console.log("User details:", response.data.data.user);
      setUser(response.data.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;

  if (!user)
    return (
      <p className="text-center text-lg text-red-500 font-semibold">
        Doctor not found.
      </p>
    );

    const handleEdit = (patientId) => {
      navigate(`/admin/edit-user/${patientId}`);
    };
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6">
       <div className="flex justify-center mb-4">
        <img
          className="w-56 h-44 object-cover rounded-lg shadow-md"
          src={user.image}
          alt={user.name}
        />
      </div> 
      <h1 className="text-2xl font-bold text-blue-default text-center mb-2">
        {user.name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Email</p>
          <p className="text-sm text-gray-600">{user.email || "N/A"}</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Mobile</p>
          <p className="text-sm text-gray-600">{user.mobile || "N/A"}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Age</p>
          <p className="text-sm text-gray-600">{user.age}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Height</p>
          <p className="text-sm text-gray-600">{user.height} cm</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Weight</p>
          <p className="text-sm text-gray-600">{user.weight} kg</p>
        </div>
      </div>
      <div className="flex justify-center mx-auto mt-4 space-x-2">
        <button
          onClick={()=> handleEdit(user._id)}
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

export default UserDetails;
