const Review = require("../models/reviewModel");
const Doctor = require("../models/doctorModel")
const CustomError = require("../utils/customError");

//Post a review
const reviewService = async ({appointmentId, doctorId, patientId, rating, comments}) => {
    if(!appointmentId || !doctorId || !patientId || !rating || !comments){
        throw new CustomError("All fields are required", 400);
    }

    const exisitingReview = await Review.findOne({appointmentId})
    if(exisitingReview){
        throw new CustomError("Review already exists for this appointment", 400);
    }

    const reviewData = {
        appointmentId,
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

    const avgRatingResult = await Review.aggregate([
        { $match: { doctorId: newReview.doctorId } },
        { $group: { _id: "$doctorId", averageRating: { $avg: "$rating" } } } 
    ]);

    const averageRating = avgRatingResult.length > 0 ? avgRatingResult[0].averageRating.toFixed(1) : 0;

    await Doctor.findByIdAndUpdate(doctorId, {averageRating})

    return populatedReview;
};

//Get reviews of a doctor
const getDoctorReviews = async (doctorId) => {
    const reviews = await Review.find({ doctorId }).populate("patientId", "name");
    return reviews;
    }

//Get reviews of a patient
module.exports = { reviewService, getDoctorReviews }