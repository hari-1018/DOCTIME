const Review = require("../models/reviewModel");
const CustomError = require("../utils/customError");

//Post a review
const reviewService = async ({ doctorId, patientId, rating, comments}) => {
    if(!doctorId || !patientId || !rating || !comments){
        throw new CustomError("All fields are required", 400);
    }

    const reviewData = {
        doctorId,
        patientId,
        rating,
        comments
    };

    const newReview = new Review(reviewData);
    await newReview.save();

    const populatedReview = await Review.findById(newReview._id)
    .populate("patientId", "name") // Fetch patient's name
    .populate("doctorId", "name specialization"); 

    return populatedReview;
};

//Get reviews of a doctor
const getDoctorReviews = async (doctorId) => {
    const reviews = await Review.find({ doctorId }).populate("patientId", "name");
    return reviews;
    }

//Get reviews of a patient
module.exports = { reviewService, getDoctorReviews }