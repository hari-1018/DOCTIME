import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axiosInstance';
import userEndPoints from '../../config/users/userApi';

const EditUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    image: '',
    age: '',
    height: '',
    weight: '',
  });

  const { id } = useParams();  
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(
          userEndPoints.USER.PROFILE.replace(":id", id)
        );
        console.log('User Edit Details:', response.data.data);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to load user details.');
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) || '' 
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        userEndPoints.USER.EDIT_PROFILE.replace(":id", id),
        user
      );
      console.log('Updated User', response.data);
      navigate(`/user/${id}`);
      toast.success('Profile Updated Successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-default mb-4">
          Edit Profile
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Mobile No.:</label>
          <input
            type="tel"
            name="mobile"
            value={user.mobile || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Profile Image URL:</label>
          <input
            type="text"
            name="image"
            value={user.image || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Age:</label>
          <input
            type="number"
            name="age"
            value={user.age || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Height (cm):</label>
          <input
            type="number"
            name="height"
            value={user.height || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={user.weight || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-default font-semibold text-white px-4 py-2 rounded hover:bg-[#13D4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13D4F6]"
          >
            Update Profile
          </button>
        </div>
      </form>
      <div className="flex justify-center"> 
      <button
            onClick={() => window.history.back()}
            className="bg-blue-default font-semibold mx-auto text-white px-6 py-2 rounded hover:bg-[#13D4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13D4F6] mt-4"
          >
            Go Back
      </button>
      </div>
    </div>
  );
};

export default EditUser;