const {validateRegister, validateLogin} = require("../validations/authValidation");
const {Register, Login, GoogleAuth} = require("../services/authService");
const CustomError = require("../utils/customError");
const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { OAuth2Client } = require("google-auth-library");

//Register
const register = asyncErrorResolver(async(req,res)=>{
    const {error} = validateRegister(req.body);
    if(error) throw new CustomError(error.message, 400)

    const response = await Register(req.body);
    res.status(200).json({status: "success", response});
});

//Login
const login = asyncErrorResolver(async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) throw new CustomError(error.message, 400);
    console.log("response", req.body)
    const response = await Login(req.body);
    console.log("login response", response)
    res.status(200).json({status: "success", message: "Logged In Successfully", data:response});
});

//Google Authenticaton
const googleAuth = asyncErrorResolver(async (req, res) => {
    const response = await GoogleAuth(req.body);
    console.log(response)
    res.status(200).json({ status: "success", message: "Successfully logged in with Google", data:response });
});

//Book Appointment
const bookAppointment = asyncErrorResolver(async (req, res) => {
    const { patientId, doctorId, slotDate, slotTime } = req.body;

    const result = await BookAppointment({ patientId, doctorId, slotDate, slotTime });

    res.status(200).json({status: "success", message: "Appointment booked successfully", result });
});

module.exports = { register, login, googleAuth };