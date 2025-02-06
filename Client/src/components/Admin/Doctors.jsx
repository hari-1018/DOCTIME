import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";
function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const DOCTORS_PER_PAGE = 10;

  // State to store the debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_ALL_DOCTORS);
      console.log("fetchalldoctors", response.data.result.doctors);
      const sortedDoctors = response.data.result.doctors.sort(
        (a, b) => b.experience - a.experience
      );
      setDoctors(sortedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Debounce logic: Update debouncedSearchTerm after a delay
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 300ms delay

    return () => clearTimeout(debounceTimer); // Cleanup the timer on unmount or new input
  }, [searchTerm]);

  // Filter doctors based on debounced search term
  const filteredDoctors = doctors.filter((doctor) => {
    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
    return (
      (doctor.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (doctor.email?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (doctor.mobile?.toString().includes(lowerCaseSearchTerm) || false)
    );
  });

  // Calculate paginated data
  const indexOfLastDoctor = currentPage * DOCTORS_PER_PAGE;
  const indexOfFirstDoctor = indexOfLastDoctor - DOCTORS_PER_PAGE;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // Handle page change
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center text-blue-default mt-1 mb-4">
        All Doctors
      </h1>
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-center mb-4">
        <input
          type="text"
          placeholder="Search Doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar text-gray-800 w-full sm:w-64 mb-4 sm:mb-0 border-2 border-blue-400 rounded-full px-3 py-1 focus:outline-blue-400"
        />
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
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-blue-200 text-center">
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
          Page {currentPage} of{" "}
          {Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE)
          }
          className={`px-4 py-2 rounded ${
            currentPage === Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE)
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