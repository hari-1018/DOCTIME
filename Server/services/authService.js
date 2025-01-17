const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwt");
const CustomError = require("../utils/customError");

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
    const user = await User.findOne({email});
    if(!user){
        throw new CustomError("User Not Found", 404)
    }
    console.log("Password", password);
    console.log("Hashed password", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match", isMatch);

    if(!isMatch) throw new CustomError("Incorrect Email or Password", 401)

    const token = generateToken(user._id, user.role);
    return {
        message: "Logged In Successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role
        },
        token,
    }
};

module.exports = {Register, Login};