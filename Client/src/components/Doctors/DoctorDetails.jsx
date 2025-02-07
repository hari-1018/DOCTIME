import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import doctorEndPoints from "../../config/doctors/doctorApi";
import userEndPoints from "../../config/users/userApi";
import { format, addDays, isToday, parse } from "date-fns";

const DoctorDetails = () => {
    const [doctor, setDoctor] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleSelectDay = (day) => {
        setSelectedDay(day);
        setSelectedTime(null); // Reset time selection when changing day
    };
    
    const handleSelectTime = (time) => {
        setSelectedTime(time);
    };

    const getNextSevenDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = addDays(new Date(), i);
            days.push({ label: format(date, "EEE d"), value: format(date, "yyyy-MM-dd") });
        }
        return days;
    };

    const availableDays = getNextSevenDays();

    const getAvailableTimeSlots = () => {
        const startHour = 8;
        const endHour = 18;
        const times = [];
        
        for (let hour = startHour; hour < endHour; hour++) {
            for (let min of [0, 30]) {
                const formattedTime = `${hour % 12 === 0 ? 12 : hour % 12}:${min === 0 ? "00" : "30"} ${hour >= 12 ? "PM" : "AM"}`;
                times.push({ label: formattedTime, value: `${hour}:${min === 0 ? "00" : "30"}` });
            }
        }
        
        if (selectedDay && isToday(parse(selectedDay.value, "yyyy-MM-dd", new Date()))) {
            const currentHour = new Date().getHours();
            return times.filter(time => {
                const [hour, minute] = time.value.split(":").map(Number);
                return hour > currentHour;
            });
        }
        
        return times;
    };

    const availableTimeSlots = selectedDay ? getAvailableTimeSlots() : [];
    
    const fetchDoctorDetails = async () => {
        try {
            const response = await axiosInstance.get(doctorEndPoints.DOCTOR.GET_DOCTOR_BY_ID.replace(":id", id));
            setDoctor(response.data.result.doctor);
        } catch (error) {
            console.error("Error in fetching doctor details:", error);
        }
    };

    const fetchDoctorReviews = async () => {
        try {
            const response = await axiosInstance.get(userEndPoints.USER.GET_REVIEWS_OF_DOCTOR.replace(":id", id));
            console.log("doctor reviews", response.data.data);
            setReviews(response.data.data);
        } catch (error) {
            console.error("Error in fetching doctor reviews:", error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchDoctorDetails();
            fetchDoctorReviews();
        }
    }, [id]);

    if (!doctor) {
        return <p className="text-center text-xl mt-20">Loading doctor details...</p>;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    const handleBooking = async () => {
        if (!selectedDay || !selectedTime) {
            alert("Please select both a date and a time slot before booking.");
            return;
        }

        try {
            await axiosInstance.post(
                userEndPoints.USER.BOOK_APPOINTMENT,
                {
                    patientId: userId,
                    doctorId: doctor._id,
                    slotDate: selectedDay.value,
                    slotTime: selectedTime.label,
                }
            );

            alert("Appointment booked successfully!");
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-blue-regBg min-h-screen p-6 flex flex-col items-center">
                {/* Doctor Profile */}
                <div className="bg-white rounded-lg mt-20 shadow-lg p-6 max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                    <img 
                        src={doctor.image} 
                        alt="Doctor" 
                        className="w-48 h-52 rounded-lg object-cover" />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-blue-default">{doctor.name}</h2>
                        <p className="text-base text-gray-700 font-semibold">{doctor.qualifications.join(", ")}</p>
                        <p className="text-md text-gray-600 font-medium mt-1">{doctor.specialization} - {doctor.experience}+ years</p>
                        <div className="mt-3">
                            <p className="text-gray-700"><strong>About</strong> ℹ️ <br />{doctor.about}</p>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <p className="text-lg font-bold text-blue-default">Consultation Fee: <span className="text-black"> {doctor.fees}/-</span></p>
                        </div>
                    </div>
                </div>
                
                {/* Booking and Reviews Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-6 md:gap-72 max-w-7xl w-full">

                {/* Booking */}
                <div className="bg-white rounded-lg shadow-lg p-4 gap-6 md:w-[715px]">
                    <h3 className="text-lg font-bold text-blue-default">Book Appointment</h3>
                    <div className="mt-3">
                        <h4 className="text-md font-semibold text-gray-700">Day 📅</h4>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {availableDays.map((day, index) => (
                                <button key={index} onClick={() => handleSelectDay(day)} className={`px-5 py-2 rounded-full text-white shadow-md ${selectedDay?.value === day.value ? "bg-red-500" : "bg-blue-default"}`}>
                                    {day.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {selectedDay && (
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-700">Time Slot ⏰</h4>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {availableTimeSlots.map((time, index) => (
                                    <button key={index} onClick={() => handleSelectTime(time)} className={`px-3 py-2 rounded-full text-white shadow-md ${selectedTime?.value === time.value ? "bg-red-500" : "bg-blue-default"}`}>
                                        {time.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <button onClick={handleBooking} className="mt-6 w-full bg-blue-default hover:bg-blue-700 text-white py-3 font-semibold rounded-full shadow-md">Schedule</button>
                </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-lg shadow-lg max-w-[34rem] p-4 mt-6 md:mt-0">
                        <h3 className="text-lg font-bold text-blue-default">Reviews</h3>
                        <div className="space-y-1" >
                            {/* Review Card */}
                            {reviews.map((review, index) => (
                                <div key={index} className="flex space-x-4">
                                    {/* <img
                                        src={Doctor1}
                                        alt="User"
                                        className="w-12 h-12 rounded-full object-cover"
                                    /> */}
                                    <div>
                                        <h4 className="font-bold text-gray-800">{review.patientId.name}</h4>
                                        <p className="text-sm text-gray-500">{format(new Date(review.createdAt), "dd/MM/yyyy")}</p>
                                        <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                                        <p className="text-gray-600 text-sm ">{review.comments}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
            </div>
            <Footer />
        </>
    );
};

export default DoctorDetails;
