const {validateRegister, validateLogin} = require("../validations/authValidation");
const {Register, Login} = require("../services/authService");
const CustomError = require("../utils/customError");
const asyncErrorResolver = require("../utils/asyncErrorResolver");

//Register
const register = asyncErrorResolver(async(req,res)=>{
    const {error} = validateRegister(req.body);
    if(error) throw new CustomError(error.message, 400)

    const response = await Register(req.body);
    res.status(200).json({status: "success", message: "User registered successfully", response});
});

//Login
const login = asyncErrorResolver(async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) throw new CustomError(error.message, 400);

    const response = await Login(req.body);
    res.status(200).json({status: "success", message: "User logged in successfully", response});
});

module.exports = {register, login};