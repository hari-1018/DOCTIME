import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";

function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_ALL_USERS);
      console.log("fetchallusers", response.data.result.users);
      setPatients(response.data.result.users);
    } catch (error) {
      console.error("Error fetching Patients:", error);
    }
  };

  const handleBlockUnblock = (userId, isBlocked) => {
    setSelectedPatient(userId);
    setActionType(isBlocked ? "unblock" : "block");
    setShowConfirmModal(true);
  };

  const confirmBlockUnblock = async () => {
    if (selectedPatient) {
      try {
        const endpoint =
          actionType === "block"
            ? adminEndPoints.ADMIN.BLOCK_USER(selectedPatient)
            : adminEndPoints.ADMIN.UNBLOCK_USER(selectedPatient);
        await axiosInstance.patch(endpoint);
        fetchPatients();
        setShowConfirmModal(false);
      } catch (error) {
        console.error("Error updating Patient status:", error);
      }
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (patient.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (patient.email?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (patient.mobile?.toString().includes(lowerCaseSearchTerm) || false)
    );
  });

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center text-blue-default mt-1 mb-4">
        All Patients
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-center mb-4">
        <input
          type="text"
          placeholder="Search Patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar text-gray-800 w-full sm:w-64 mb-4 sm:mb-0 border-2 border-blue-400 rounded-full px-3 py-1 focus:outline-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-default text-white">
              <th className="py-2 px-4 border w-20">ID</th>
              <th className="py-2 px-4 border w-40">Patient Name</th>
              <th className="py-2 px-4 border w-40">Email</th>
              <th className="py-2 px-4 border w-32">Mobile No.</th>
              <th className="py-2 px-4 border w-20">Status</th>
              <th className="py-2 px-4 border w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id} className="hover:bg-blue-200 text-center">
                  <td className="py-2 px-2 border text-gray-800">
                    {patient._id}
                  </td>
                  <td className="py-2 px-2 border text-gray-800">
                    {patient.name || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-800">
                    {patient.email || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-800">
                    {patient.mobile || "N/A"}
                  </td>
                  <td className="py-2 px-2 border">
                    <span
                      className={`font-bold ${
                        patient.isBlocked
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {patient.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="py-2 px-2 border">
                    <button
                      onClick={() =>
                        handleBlockUnblock(patient._id, patient.isBlocked)
                      }
                      className={`border-2 p-2 rounded ${
                        patient.isBlocked
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {patient.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No Patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 ml-64">
            <h2 className="text-lg font-bold mb-4 text-blue-default text-center">
              Are you sure you want to {actionType} this Patient?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockUnblock}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPatients;
