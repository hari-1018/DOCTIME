import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axiosInstance';
import adminEndPoints from '../../config/admin/endPoints';

const EditDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    email: '',
    about: '',
    image: '',
    qualifications: '',
    specialization: '',
    experience: '',
    fees: '',
    availability: true,
  });

  const { id } = useParams();  // Assuming doctorId is passed via the URL
  const navigate = useNavigate();

  // Fetch doctor details on component mount
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axiosInstance.get(
            adminEndPoints.ADMIN.DOCTOR_DETAILS.replace(":id", id)
          );
          console.log('Doctor Edit Details:', response.data.data.doctor);
        setDoctor(response.data.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        toast.error('Failed to load doctor details.');
      }
    };

    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: type === 'checkbox' ? checked : name === 'experience' || name === 'fees' ? Number(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        adminEndPoints.ADMIN.EDIT_DOCTOR.replace(":id", id),
        doctor
      );
      console.log('Updated Doctor', response.data);
      navigate('/admin/all-doctors');
      toast.success('Doctor Updated Successfully! 👨‍⚕️');
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error('Failed to update doctor. Please try again.');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-default mb-4">
          Edit Doctor
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
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
            value={doctor.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

          {/* Email */}
          <div className="mb-4">
          <label className="block mb-2 font-semibold">About:</label>
          <input
            type="text"
            name="about"
            value={doctor.about}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Image URL:</label>
          <input
            type="text"
            name="image"
            value={doctor.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Qualifications:</label>
          <input
            type="text"
            name="qualifications"
            value={doctor.qualifications}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={doctor.experience}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Fees */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Fees:</label>
          <input
            type="number"
            name="fees"
            value={doctor.fees}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Available for Appointments:</label>
          <input
            type="checkbox"
            name="availability"
            checked={doctor.availability}
            onChange={handleChange}
            className="mr-2"
          />
          <span>{doctor.availability ? 'Yes' : 'No'}</span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-default font-semibold text-white px-4 py-2 rounded"
          >
            Update Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
