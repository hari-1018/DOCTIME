const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Admin = require("../models/adminModel")
const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwt");
const CustomError = require("../utils/customError");
const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');


//Register User
const Register = async(data) =>{
    const {name, email, mobile, password, role} = data;
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new CustomError("User Already Existing, Try Again", 400)
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name, email, mobile, password: hashPassword, role});
    await newUser.save();
    return { message: "User Registered Successfully"}
};

//Login User
const Login = async(data) =>{
    const {email, password} = data;
    let user = await User.findOne({email});
    let role = "user";

    // if(!user){
    //     user = await Doctor.findOne({email});
    //     role = "Doctor";
    // }
    // if (!user) {
    //     user = await Admin.findOne({email});
    //     role = "admin";
    // }

    if(!user){
        throw new CustomError("User Not Found", 404)
    }
    console.log("Password", password);
    console.log("Hashed password", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match", isMatch);

    if(!isMatch) throw new CustomError("Incorrect Email or Password", 401)

    const token = generateToken(user._id, role);
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            isBlocked: user.isBlocked,
            role
        },
        token,
    }
};

//Login Doctor
const DoctorLogin = async(data) =>{
    const {email, password} = data;
    let doctor = await Doctor.findOne({email});
    let role = "doctor";

    if(!doctor){
        throw new CustomError("Doctor Not Found", 404)
    }
    console.log("Password", password);
    console.log("Hashed password", doctor.password);

    const isMatch = await bcrypt.compare(password, doctor.password);
    console.log("Password match", isMatch);

    if(!isMatch) throw new CustomError("Incorrect Email or Password", 401)

    const token = generateToken(doctor._id, role);
    return {
        user: {
            id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            mobile: doctor.mobile,
            role
        },
        token,
    }
};

//Login Admin
const AdminLogin = async(data) =>{
    const {email, password} = data;
    let admin = await Admin.findOne({email});
    let role = "admin";

    if(!admin){
        throw new CustomError("Admin Not Found", 404)
    }
    console.log("Password", password);
    console.log("Hashed password", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match", isMatch);

    if(!isMatch) throw new CustomError("Incorrect Email or Password", 401)

    const token = generateToken(admin._id, role);
    return {
        user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role
        },
        token,
    }
};

//By Google
const GoogleAuth = async (data) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { credential } = data;

    if (!credential) {
        throw new CustomError("No Google credentials provided!", 400);
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Get payload from verified token
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists in the database
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user
    if (!user) {
        user = new User({
            name,
            email,
            password: '', // No password as the user is logging in via Google
            role: 'user', // Default role, change as needed
        });
        await user.save();
    }

    // Generate token for the user
    const token = generateToken(user._id, user.role);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isBlocked: user.isBlocked,
        },
        token,
    };
};




module.exports = {Register, Login, GoogleAuth, DoctorLogin, AdminLogin };