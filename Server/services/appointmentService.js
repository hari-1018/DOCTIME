const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const CustomError = require("../utils/customError");

//Book appointment
const BookAppointment = async ({ patientId, doctorId, slotDate, slotTime }) => {
    const doctorData = await Doctor.findById(doctorId).select('-password');
    if (!doctorData || !doctorData.availability) {
        throw new CustomError("Doctor is not available at this time", 400);
    }
    console.log("doctorData", doctorData);

    // Initialize slotsBooked as an object if it's undefined
    const slotsBooked = doctorData.slotsBooked || {};

    // Get the booked slots for the date
    const dateSlots = slotsBooked[slotDate] || [];

    // Check if the slot is already booked
    if (dateSlots.includes(slotTime)) {
        throw new CustomError("Slot already booked", 400);
    }

    // Book the slot by adding it to the doctor's slotsBooked
    dateSlots.push(slotTime);
    slotsBooked[slotDate] = dateSlots;  // Assign instead of using .set()

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

    // Update Doctor's slotsBooked (now correctly treated as an object)
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

//Reschedule Appointment
const RescheduleAppointment = async ({ appointmentId, newSlotDate, newSlotTime }) => {
    const existingAppointment = await Appointment.findById(appointmentId);
    if (!existingAppointment) {
        throw new CustomError("Appointment not found", 404);
    }

    const { doctorId, slotDate: oldSlotDate, slotTime: oldSlotTime } = existingAppointment;
    //Fetch the doctor's data
    const doctorData = await Doctor.findById(doctorId).select('-password');
    if (!doctorData || !doctorData.availability) {
        throw new CustomError("Doctor is not available at this time", 400);
    }

    //Initialize slotsBooked if it doesn't exist
    const slotsBooked = { ...doctorData.slotsBooked } || {};

    //Check if the new slot is already booked
    const newDateSlots = slotsBooked[newSlotDate] || [];
    if (newDateSlots.includes(newSlotTime)) {
        throw new CustomError("New slot is already booked", 400);
    }

    //Remove the old slot from the doctor's slotsBooked
    if (slotsBooked[oldSlotDate]) {
        slotsBooked[oldSlotDate] = slotsBooked[oldSlotDate].filter(slot => slot !== oldSlotTime);
        
        // If the date has no more slots, remove the date entry completely
        if (slotsBooked[oldSlotDate].length === 0) {
            delete slotsBooked[oldSlotDate];
        }
    }

    //Add the new slot to the doctor's slotsBooked
    if (!slotsBooked[newSlotDate]) {
        slotsBooked[newSlotDate] = [];
    }
    slotsBooked[newSlotDate].push(newSlotTime);

    //Update the appointment with the new slot details
    existingAppointment.slotDate = newSlotDate;
    existingAppointment.slotTime = newSlotTime;
    await existingAppointment.save();

    //Update the doctor's slotsBooked in the database
    await Doctor.findByIdAndUpdate(doctorId, { slotsBooked }, { new: true });

    //Fetch the updated appointment details
    const updatedAppointment = await Appointment.findById(appointmentId)
        .populate("patientId", "name")
        .populate("doctorId", "name image");

    return {
        appointmentId: updatedAppointment._id,
        slotDate: newSlotDate,
        slotTime: newSlotTime,
        fees: updatedAppointment.fees,
        patientName: updatedAppointment.patientId.name,
        doctorName: updatedAppointment.doctorId.name,
        doctorImage: updatedAppointment.doctorId.image,
    };
};

//Cancel Appointment
const CancelAppointment = async (appointmentId) => {
    if (!appointmentId) {
        throw new Error("Invalid appointment ID");
    }

    const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { cancelled: true },
        { new: true }
    );

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    return appointment;
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

//View details of a appointment
const ViewAppointmentDetails = async (appointmentId) => {
    if(!appointmentId){
        throw new CustomError("Invalid appointment ID", 400);
    }
    const appointment = await Appointment.findById(appointmentId)
       .populate("patientId", "name")
       .populate("doctorId", "name image specialization");

    if(!appointment){
        throw new CustomError("Appointment not found", 404);
    }
    return appointment;
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

module.exports = { BookAppointment, RescheduleAppointment, CancelAppointment, UserViewAppointments, ViewAppointmentDetails, DoctorViewAppointments };