const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const CustomError = require("../utils/customError");


//Fetch user details id
const userDetailsService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError("User not found");
    }

    return user ;
};

//Edit Doctor
const userEditService = async(id, data) =>{
    const {name, email, image, age, mobile, height, weight} = data;
    const user = await User.findByIdAndUpdate(id, {name, email, image, age, mobile, height, weight}, {new: true});
    if(!user){
        throw new CustomError("User not found, Try Again")
    }
    return {
        user,
    }
}

//Total Appointments of a user
 const totalAppointmentsService = async (userId) => {
    const appointments = await Appointment.find({patientId: userId});
    return appointments.length;
}


module.exports = { userDetailsService, userEditService, totalAppointmentsService}