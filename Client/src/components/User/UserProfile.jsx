import Profile from "../../assets/UserProfile.jpg";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import userEndPoints from "../../config/users/userApi";

const fetchUserDetails = async(id) =>{
    const response = await axiosInstance.get(
      userEndPoints.USER.PROFILE.replace(":id", id)
    )
    console.log("user profile details", response.data.data)
    return response.data.data;
  }

const fetchTotalAppointments = async(userId) => {
    const response = await axiosInstance.get(
      userEndPoints.USER.TOTAL_APPOINTMENTS_COUNT.replace(":userId", userId)
    );
    console.log("user total appo", response.data.data)
    return response.data.data;
};


const UserProfile = () => {
      const navigate = useNavigate();
      const { id } = useParams();
      const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user", id],
        queryFn:()=> fetchUserDetails(id),
        enabled: !!id,
      });

      const { data: totalAppointments } = useQuery({
        queryKey: ["totalAppointments", id],
        queryFn: () => fetchTotalAppointments(id),
        enabled: !!id,
    });
    
      if (isLoading) {
        return (
            <div className="text-center text-gray-500 min-h-screen flex items-center justify-center">
                Loading user details...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
                Error loading user details. Please try again later.
            </div>
        );
    }

    
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-regBg px-4">
        <div className="bg-white shadow-md rounded-xl p-6 text-center w-full max-w-xs md:max-w-md">
          {/* Profile Image */}
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={user?.image || Profile} 
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* User Info */}
          <h2 className="text-lg font-bold mt-4">{user?.name}</h2>
          <p className="text-gray-600 mt-2">{user?.email}</p>
          <p className="text-sm text-gray-600 flex items-center justify-center">{user?.mobile}</p>
  
          {/* Stats Section */}
          <div className="flex justify-around mt-6 text-gray-700 font-semibold">
            <div className="text-center">
              <p className="text-lg text-black">{user?.height}</p>
              <p className="text-sm text-gray-500">Height(cm)</p>
            </div>
            <div className="text-center">
              <p className="text-lg text-black">{user?.weight}</p>
              <p className="text-sm text-gray-500">Weight(kg)</p>
            </div>
                        <div className="text-center">
              <p className="text-lg text-black">{totalAppointments}</p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button onClick={()=> navigate(`/edit-user/${id}`)} className="bg-blue-default text-white font-semibold py-2 px-4 rounded-lg w-1/2 hover:bg-red-600 transition">
              Edit Profile
            </button>
            <button 
                onClick={() => window.history.back()}
                className="bg-blue-default text-white font-semibold py-2 px-4 rounded-lg w-1/2 hover:bg-red-600 transition">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  