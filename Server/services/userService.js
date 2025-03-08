const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const {uploadToS3, generatePresignedUrl} = require('../middlewares/fileUploader')
const CustomError = require("../utils/customError");


//Profile Upload
const profilePictureService = async (file) => {
    if (!file) {
      throw new CustomError("No file uploaded", 400);
    }
  
    const fileUrl = await uploadToS3(file);
    return fileUrl;
};

//Fetch user details id
const userDetailsService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError("User not found");
    }
    const userData = user.toObject();
    if (userData.image) {
      userData.image = await generatePresignedUrl(userData.image);
    }

console.log("user", userData);
    return { user: userData} ;
};

//Edit User
const userEditService = async(id, data) =>{
    const {name, email, image, age, mobile, height, weight} = data;
    console.log("image", image);
    const user = await User.findByIdAndUpdate(id, {name, email, image, age, mobile, height, weight}, {new: true});
    if(!user){
        throw new CustomError("User not found, Try Again")
    }
    console.log("up",user);
    return {
        user
    }
}

//Total Appointments of a user
 const totalAppointmentsService = async (userId) => {
    const appointments = await Appointment.find({patientId: userId});
    return appointments.length;
}


module.exports = { 
    profilePictureService,
    userDetailsService, 
    userEditService, 
    totalAppointmentsService
}