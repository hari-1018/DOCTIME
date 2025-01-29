import Doctor1 from "../../assets/Doctor1.jpg"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
const DoctorDetails = () => {
    return (
        <>
            <Navbar />
            <div className="bg-blue-regBg min-h-screen p-6 flex flex-col items-center">
                {/* Doctor Profile Section */}
                <div className="bg-white rounded-lg mt-20 shadow-lg p-6 max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                    <img
                        src={Doctor1} // Replace with actual image
                        alt="Doctor"
                        className="w-48 h-48 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-blue-700">Dr. David Wilson</h2>
                        <p className="text-lg text-gray-600 font-semibold">MBBS</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 text-lg">⭐ 4.1</span>
                        </div>
                        <p className="text-md text-gray-600 font-medium mt-1">
                            General Physician - 4 Years
                        </p>
                        <div className="mt-3">
                            <p className="text-gray-700">
                                <strong>About</strong> ℹ️ <br />
                                Dr. Wilson is an expert in cardiovascular health, specializing in
                                diagnosing and treating heart diseases.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <p className="text-lg font-bold text-blue-700">
                                Consultation Fee: <span className="text-black">200/-</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews & Appointment Booking */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-72 max-w-7xl w-full">

                    {/* Appointment Booking */}
                    <div className="bg-white rounded-lg shadow-lg p-8 gap-6 md:w-[710px]">
                        <h3 className="text-lg font-bold text-blue-700">Book Appointment</h3>
                        <div className="mt-3">
                            <h4 className="text-md font-semibold text-gray-700">
                                Day 📅
                            </h4>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {["Today 11", "Sun 12", "Mon 13", "Tue 14", "Wed 15", "Thu 16", "Fri 17"].map(
                                    (day, index) => (
                                        <button
                                            key={index}
                                            className={`px-4 py-2 rounded-full text-white shadow-md ${index === 2 ? "bg-blue-700" : "bg-blue-400"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-700">
                                Time Slot ⏰
                            </h4>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {[
                                    "9.00 AM",
                                    "9.30 AM",
                                    "10.00 AM",
                                    "10.30 AM",
                                    "11.00 AM",
                                    "11.30 AM",
                                    "12.00 AM",
                                ].map((time, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-white shadow-md ${index === 1 ? "bg-blue-700" : "bg-blue-400"
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-full shadow-md">
                            Schedule
                        </button>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-lg shadow-lg max-w-md ml-16">
                        <h3 className="text-lg font-bold text-blue-700">Reviews</h3>
                        <div className="mt-4 space-y-4">
                            {/* Review Card */}
                            {[
                                { name: "Mathews", date: "12/12/2023", stars: 5 },
                                { name: "Sam Curran", date: "12/11/2024", stars: 5 },
                                { name: "Tom Rogers", date: "12/02/2024", stars: 4 },
                            ].map((review, index) => (
                                <div key={index} className="flex space-x-4">
                                    <img
                                        src="https://via.placeholder.com/50"
                                        alt="User"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-800">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                        <p className="text-yellow-500">{"⭐".repeat(review.stars)}</p>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Lorem Ipsum Odor Amet, Consectetur Adipiscing Elit.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default DoctorDetails