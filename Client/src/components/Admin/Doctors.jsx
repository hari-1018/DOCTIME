import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import endPoints from "../../config/endPoints";

function AllDoctors() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_ALL_DOCTORS);
      console.log("fetchalldoctors", response.data.result.doctors);
      setCustomers(response.data.result.doctors);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };


  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredCustomers = customers.filter((doctor) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (doctor.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (doctor.email?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (doctor.mobile?.toString().includes(lowerCaseSearchTerm) || false)
    );
  });

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
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border w-30">Name</th>
              <th className="py-2 px-4 border w-30">Email</th>
              <th className="py-2 px-4 border w-30">Specialization</th>
              <th className="py-2 px-4 border w-32">Qualifications</th>
              <th className="py-2 px-4 border w-24">Experience</th>
              <th className="py-2 px-4 border w-24">Fees</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-100">
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
                    {doctor.qualifications || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.experience || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">
                    {doctor.fees || "N/A"}
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
    </div>
  );
}

export default AllDoctors;
