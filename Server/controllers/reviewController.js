const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { reviewService, getDoctorReviews } = require("../services/reviewService");

//Post a review
const reviewController = asyncErrorResolver(async (req,res)=>{
    const { patientId, doctorId, rating, comments } = req.body;
    const result = await reviewService({ patientId, doctorId, rating, comments });
    console.log("post review", result);
    res.status(201).json({ status: "success", message: "Review posted successfully", data:result });
})

//Get reviews of a doctor
    const getDoctorReviewsController = asyncErrorResolver(async (req, res) => {
    const doctorId = req.params.doctorId;
    const reviews = await getDoctorReviews(doctorId);
    res.status(200).json({ status: "success", message: "Reviews fetched successfully", data: reviews });
})

module.exports = { reviewController, getDoctorReviewsController }