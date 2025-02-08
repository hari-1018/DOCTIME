const {validateRegister, validateLogin} = require("../validations/authValidation");
const {Register, Login, DoctorLogin, GoogleAuth, AdminLogin } = require("../services/authService");
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

//User Login
const login = asyncErrorResolver(async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) throw new CustomError(error.message, 400);
    console.log("response", req.body)
    const response = await Login(req.body);
    console.log("login response", response)
    res.status(200).json({status: "success", message: "Logged In Successfully", data: response});
});

//Doctor Login
const doctorLogin = asyncErrorResolver(async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) throw new CustomError(error.message, 400);
    console.log("login response1", req.body)
    const response = await DoctorLogin(req.body);
    console.log("doctor login response", response)
    res.status(200).json({status: "success", message: "Doctor Logged In Successfully", data: response});
});

//Admin Login
const adminLogin = asyncErrorResolver(async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) throw new CustomError(error.message, 400);
    console.log("admin login response", req.body)
    const response = await AdminLogin(req.body);
    console.log("admin login response", response)
    res.status(200).json({status: "success", message: "Admin Logged In Successfully", data: response});
})

//Google Authenticaton
const googleAuth = asyncErrorResolver(async (req, res) => {
    const response = await GoogleAuth(req.body);
    console.log(response)
    res.status(200).json({ status: "success", message: "Successfully logged in with Google", data: response });
});


module.exports = { register, login, doctorLogin, adminLogin, googleAuth };