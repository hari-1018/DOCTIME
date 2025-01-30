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

    return {
        appointmentId: newAppointment._id,
        slotDate,
        slotTime,
        fees: doctorData.fees,
    };
};


module.exports = { BookAppointment };