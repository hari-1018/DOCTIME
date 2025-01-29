import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axiosInstance from "../../config/axiosInstance";
import endPoints from "../../config/endPoints";
import { Link } from "react-router-dom";

const DoctorListing = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for the search term
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  const userFetchDoctors = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_ALL_DOCTORS);
      console.log("fetchalldoctors", response.data.result.doctors);
      setDoctors(response.data.result.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    userFetchDoctors();
  }, []);

  // Filter doctors by specialization and search term (case-insensitive)
  const filteredDoctors = doctors
    .filter((doctor) => {
      return selectedSpecialization === "All" || doctor.specialization === selectedSpecialization;
    })
    .filter((doctor) => {
      return doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <section className="bg-blue-100 min-h-screen py-8 mt-20">
        {/* Header */}
        <h1 className="text-center text-3xl font-bold text-blue-default mb-2">Our Doctors</h1>
        <p className="text-center text-lg font-normal text-blue-default mb-4">Book an Appointment with Your Trusted Doctor</p>

        <div className="flex flex-col lg:flex-row container mx-auto px-4">
          {/* Sidebar */}
          <div className="lg:w-1/4 flex-shrink-0 mb-6 lg:mb-0">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search Doctors..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setSearchTerm(e.target.value)} // Set the search term on change
                />
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedSpecialization("All")}
                    className={`w-full text-left py-2 px-4 rounded-lg ${
                      selectedSpecialization === "All"
                        ? "bg-blue-600 text-white"
                        : "text-blue-default hover:bg-blue-300 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                </li>
                {doctors
                  .map((doc) => doc.specialization)
                  .filter((value, index, self) => self.indexOf(value) === index) // Unique specializations
                  .sort()
                  .map((spec) => (
                    <li key={spec}>
                      <button
                        onClick={() => setSelectedSpecialization(spec)}
                        className={`w-full text-left py-2 px-4 rounded-lg ${
                          selectedSpecialization === spec
                            ? "bg-blue-600 text-white"
                            : " text-blue-default hover:bg-blue-300 hover:text-white"
                        }`}
                      >
                        {spec}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Doctors Listing */}
          <div className="lg:w-3/4">
            {/* Show "No doctors found" if there are no doctors after filtering */}
            {filteredDoctors.length === 0 ? (
              <div className="text-center mt-40 text-2xl font-bold text-red-600">
                No doctors found..!
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-evenly md:ml-8">
                  {currentDoctors.map((doctor) => (
                    <Link key={doctor.email} to='/doctor' className="bg-white rounded-lg shadow-md p-3">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-48 h-32 mx-auto bg-slate-500 mb-3"
                      />
                      <h3 className="text-center text-lg font-bold text-blue-default mb-2">{doctor.name}</h3>
                      <p className="text-center text-sm text-blue-600">{doctor.specialization}</p>
                      {/* <div className="text-center mb-2">
                        <p className="text-gray-700 font-medium">Qualifications:</p>
                        <ul className="text-sm text-gray-700">
                          {doctor.qualifications.map((qualification, index) => (
                            <li key={index}>{qualification}</li>
                          ))}
                        </ul>
                      </div> */}
                      <p className="text-center text-sm text-black font-semibold mb-2">
                        Experience: {doctor.experience}+ years
                      </p>
                      <p className="text-center text-sm text-red-400">
                        Consulting Fee: ₹ {doctor.fees}/-
                      </p>
                      <p
                        className={`text-center font-bold ${
                          doctor.availability ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {doctor.availability ? "Available" : "Not Available"}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-8">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 mx-1 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-default text-white"
                          : "bg-blue-200 text-blue-default hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorListing;
