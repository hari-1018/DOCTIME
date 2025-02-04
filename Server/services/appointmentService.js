const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const CustomError = require("../utils/customError");

//Book an Appointment
const BookAppointment = async ({ patientId, doctorId, slotDate, slotTime }) => {
    const doctorData = await Doctor.findById(doctorId).select('-password');
    if (!doctorData || !doctorData.availability) {
        throw new CustomError("Doctor is not available at this time", 400);
    }
    console.log("doctorData", doctorData);

    const slotsBooked = doctorData.slotsBooked || new Map();
    const dateSlots = slotsBooked.get(slotDate) || [];

    // Check if the slot is already booked
    if (dateSlots.includes(slotTime)) {
        throw new CustomError("Slot already booked", 400);
    }
    // Book the slot by adding it to the doctor's slotsBooked
    dateSlots.push(slotTime);
    slotsBooked.set(slotDate, dateSlots);

    const appointmentData = {
        patientId,
        doctorId,
        slotDate,
        slotTime,
        fees: doctorData.fees,
    };

    // Create the new appointment
    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    // Update Doctor's slotsBooked
    await Doctor.findByIdAndUpdate(doctorId, { slotsBooked });

    const appointmentDetails = await Appointment.findById(newAppointment._id)
       .populate("patientId", "name")
       .populate("doctorId", "name image");

    return {
        appointmentId: newAppointment._id,
        slotDate,
        slotTime,
        fees: doctorData.fees,
        patientName: appointmentDetails.patientId.name,
        doctorName: appointmentDetails.doctorId.name,
        doctorImage: appointmentDetails.doctorId.image,
    };
};

//User view their appointments 
const UserViewAppointments = async(patientId) =>{
    if(!patientId){
        throw new CustomError("Invalid patient ID", 400);
    }
    const appointments = await Appointment.find({ patientId: patientId })
        .populate("doctorId", "name image specialization")
        .populate("patientId", "name");

    if(!appointments || appointments.length === 0){
        throw new CustomError("No appointments found", 404);
    }
    return appointments;
}

//Fetch appointments of a doctor
const DoctorViewAppointments = async (doctorId) => {
    if(!doctorId){
        throw new CustomError("Invalid doctor ID", 400);
    }
    const appointments = await Appointment.find({ doctorId: doctorId })
       .populate("patientId", "name")
       .populate("doctorId", "name specialization");

    if(!appointments || appointments.length === 0){
        throw new CustomError("No appointments found", 404);
    }
    return appointments;
}

module.exports = { BookAppointment, UserViewAppointments, DoctorViewAppointments };