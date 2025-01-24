const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");

const AddDoctor = async(data) =>{
    const {name, email, image, qualifications, specialization, experience, fees, availability} = data;
    const existingDoctor = await Doctor.findOne({email});
    if(existingDoctor){
        throw new Error("Doctor Already Existing, Try Again")
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password', salt);

    const newDoctor = new Doctor({
        name, email, password,image, qualifications, specialization, experience, fees, availability});
    await newDoctor.save();
    return { 
        message: "Doctor Added Successfully",         
        doctor: {
        id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        image: newDoctor.image,
        qualification: newDoctor.qualifications,
        specialization: newDoctor.specialization,
        experience: newDoctor.experience,
        fees: newDoctor.fees,
        availability: newDoctor.availability,

    }
}
};

const TotalUsers = async () => {
      const totalUsers = await User.countDocuments(); 
      return { 
        message: "Total users fetched successfully", 
        totalUsers 
      };
    };

const TotalDoctors = async () => {
        const totalDoctors = await Doctor.countDocuments(); 
        return { 
          message: "Total users fetched successfully", 
          totalDoctors 
        };
    };
  
  

module.exports = { AddDoctor, TotalUsers, TotalDoctors }