import Doctor1 from "../../assets/Doctor1.jpg";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import doctorEndPoints from "../../config/doctors/doctorApi";
import { format } from "date-fns";



const DoctorDetails = () => {
    const [doctor, setDoctor] = useState(null);
    const { id } = useParams();

    const getNextSevenDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push(format(date, "EEE d"));
        }
        return days;
    };
    
    const availableDays = getNextSevenDays();

    const getAvailableTimeSlots = () => {
        const startHour = 8;  // Start time: 8 AM
        const endHour = 18;   // End time: 6 PM
        // const interval = 30;  // 30-minute interval
    
        const now = new Date();
        let currentHour = now.getHours();
        let currentMinutes = now.getMinutes();
    
        // Adjust to the next 30-minute interval
        if (currentMinutes > 30) {
            currentHour += 1;
            currentMinutes = 0;
        } else if (currentMinutes > 0) {
            currentMinutes = 30;
        }
    
        const times = [];
        for (let hour = startHour; hour < endHour; hour++) {
            for (let min of [0, 30]) {
                if (hour > currentHour || (hour === currentHour && min >= currentMinutes)) {
                    const formattedTime = `${hour % 12 === 0 ? 12 : hour % 12}:${min === 0 ? "00" : "30"} ${hour >= 12 ? "PM" : "AM"}`;
                    times.push(formattedTime);
                }
            }
        }
    
        return times;
    };
    
    const availableTimeSlots = getAvailableTimeSlots();
    

    const fetchDoctorDetails = async () => {
        try {
            const response = await axiosInstance.get(doctorEndPoints.DOCTOR.GET_DOCTOR_BY_ID.replace(":id",id))
            setDoctor(response.data.result.doctor);
            console.log("doctordata", response.data.result.doctor)
        } catch (error) {
            console.error("Error in fetching doctor details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchDoctorDetails();
        }
    }, [id]);

    if (!doctor) {
        return <p className="text-center text-xl mt-20">Loading doctor details...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="bg-blue-regBg min-h-screen p-6 flex flex-col items-center">
                {/* Doctor Profile Section */}
                <div className="bg-white rounded-lg mt-20 shadow-lg p-6 max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                    <img
                        src={doctor.image} // Replace with actual image
                        alt="Doctor"
                        className="w-48 h-52 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-blue-default">{doctor.name}</h2>
                        <p className="text-base text-gray-700 font-semibold">{doctor.qualifications.join(", ")}</p>
                        {/* <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 text-lg">⭐ 4.1</span>
                        </div> */}
                        <p className="text-md text-gray-600 font-medium mt-1">
                            {doctor.specialization} - {doctor.experience}+ years
                        </p>
                        <div className="mt-3">
                            <p className="text-gray-700">
                                <strong>About</strong> ℹ️ <br />
                                {doctor.about}
                            </p>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <p className="text-lg font-bold text-blue-default">
                                Consultation Fee: <span className="text-black"> {doctor.fees}/-</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews & Appointment Booking */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-72 max-w-7xl w-full">

                    {/* Appointment Booking */}
                    <div className="bg-white rounded-lg shadow-lg p-4 gap-6 md:w-[710px]">
                        <h3 className="text-lg font-bold text-blue-default">Book Appointment</h3>
                        <div className="mt-3">
                            <h4 className="text-md font-semibold text-gray-700">
                                Day 📅
                            </h4>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {availableDays.map((day, index) => (
                                <button key={index}
                                className="px-5 py-2 rounded-full bg-blue-default active:bg-blue-700 text-white shadow-md">
                                {day}
                                </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-700">
                                Time Slot ⏰
                            </h4>
                            <div className="flex flex-wrap gap-4 mt-2">
                            {availableTimeSlots.map((time, index) => (
                            <button key={index} className="px-5 py-2 rounded-full text-white shadow-md bg-blue-default">
                                {time}
                            </button>
                            ))}
                            </div>
                        </div>
                        <button className="mt-6 w-full bg-blue-default hover:bg-blue-700 text-white py-3 font-semibold rounded-full shadow-md">
                            Schedule
                        </button>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-lg shadow-lg max-w-[34rem] p-4">
                        <h3 className="text-lg font-bold text-blue-default">Reviews</h3>
                        <div className="mt-3 space-y-3">
                            {/* Review Card */}
                            {[
                                { name: "Mathews", date: "12/12/2023", stars: 5 },
                                { name: "Sam Curran", date: "12/11/2024", stars: 5 },
                                { name: "Tom Rogers", date: "12/02/2024", stars: 4 },
                            ].map((review, index) => (
                                <div key={index} className="flex space-x-4">
                                    <img
                                        src={Doctor1}
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