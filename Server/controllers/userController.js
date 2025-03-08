const CustomError = require("../utils/customError");
const asyncErrorResolver = require("../utils/asyncErrorResolver");
const {
    profilePictureService,
    userDetailsService, 
    userEditService, 
    totalAppointmentsService 
} = require("../services/userService");


//Profile Upload
const profilePictureController = asyncErrorResolver(async (req, res ) => {
    console.log("hello");
    console.log('file', req.file);
    const result = await profilePictureService(req.file);
    console.log("ki",result);
    res.status(200).json({ status: "success", message: "Uploaded Successfully", data: result });
});


//Fetch User By ID
const userDetailsController = asyncErrorResolver(async (req, res) => {
    const {user} = await userDetailsService(req.params.id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    // console.log("get user by id", user);
    res.status(200).json({ status: "success", message: "User fetched successfully", data: user });
});

//Edit User
const editUserController = asyncErrorResolver(async (req, res) => {
    const {id} = req.params;
    // console.log("testing id", id);
    const response = await userEditService(id, req.body);
    console.log("req.body", req.body)
    console.log("editdr", response)
    res.status(201).json({status: "success", message: "User updated successfully",  data:response});
});

//Total appointments of a user
const totalAppointmentsController = asyncErrorResolver(async (req, res) => {
    const userId = req.params.userId;
    const totalAppointments = await totalAppointmentsService(userId);
    res.status(200).json({ status: "success", message: "Total appointments fetched successfully", data: totalAppointments });
});


module.exports = {
    profilePictureController,
    userDetailsController, 
    editUserController,
    totalAppointmentsController,
}