import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";
import useDebounce from "../../hooks/useDebounce";

// Fetch all doctors
const fetchDoctors = async ({page=1, limit=10}) => {
  const response = await axiosInstance.get(
    `${adminEndPoints.ADMIN.GET_ALL_DOCTORS}?page=${page}&limit=${limit}`
  );
  console.log("alldoctorsinadmin", response.data.data)
  return response.data.data;
};

function AllDoctors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const DOCTORS_PER_PAGE = 10;

  // State to store the debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //React Query to fetch doctors
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctors", currentPage],
    queryFn: () => fetchDoctors({ 
      page: currentPage, limit: DOCTORS_PER_PAGE
    }),
    keepPreviousData: true,
  });

  // Filter doctors based on debounced search term
  const filteredDoctors = data?.doctors?.filter((doctor) => {
    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
    return (
      (doctor.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (doctor.email?.toLowerCase().includes(lowerCaseSearchTerm) || false)
    );
  });

  //Sort the doctors according to their experience
  // eslint-disable-next-line no-unused-vars
  const sortedDoctors = filteredDoctors?.sort((a, b) =>
    b.experience - a.experience
  );

  // Handle page change
  const handleNextPage = () => {
    if(currentPage < data.totalPages){
    setCurrentPage(prev => prev + 1);
  };
};

  const handlePrevPage = () => {
    if(currentPage > 1){
    setCurrentPage(prev => prev - 1);
  };
  };

  const handleAdd = () => {
    navigate('/admin/add-doctor');
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/admin/view-doctor/${doctorId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading doctors: {error.message}</div>;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center text-blue-default mt-1 mb-4">
        All Doctors
      </h1>
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-center mb-4">
        <input
          type="text"
          placeholder="Search Doctors...   🔍"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar text-gray-800 w-full sm:w-44 mb-4 sm:mb-0 border-2 border-blue-400 rounded-full px-3 py-1 focus:outline-blue-400"
        />
      </div>

      <div className="flex justify-center mb-4 mt-2">
        <button onClick={handleAdd} className="bg-blue-default text-white font-bold rounded-full py-2 px-4 flex items-center">
          Add New Doctor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-default text-white">
              <th className="py-2 px-4 border w-30">Name</th>
              <th className="py-2 px-4 border w-30">Email</th>
              <th className="py-2 px-4 border w-30">Specialization</th>
              <th className="py-2 px-4 border w-28">Qualifications</th>
              <th className="py-2 px-4 border w-28">Years of Experience</th>
              <th className="py-2 px-4 border w-20">Fees</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-blue-200 text-center cursor-pointer" onClick={()=> handleDoctorClick(doctor._id)}>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.name}
                  </td>
                  <td className="py-2 px-2 border text-gray-600 font-bold">
                    {doctor.email || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.specialization || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.qualifications.join(", ") || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.experience || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.fees || "N/A"}/-
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No Doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-default text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600 mt-2">
          Page {currentPage} of {data.totalPages} pages
        </span>
        <button
          onClick={handleNextPage}
          disabled={ currentPage === data.totalPages }
          className={`px-4 py-2 rounded ${
            currentPage === data.totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-default text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllDoctors;