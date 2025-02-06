const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { reviewService } = require("../services/reviewService");

//Post a review
const reviewController = asyncErrorResolver(async (req,res)=>{
    const { patientId, doctorId, rating, comments } = req.body;
    const result = await reviewService({ patientId, doctorId, rating, comments });
    console.log("post review", result);
    res.status(201).json({ status: "success", message: "Review posted successfully", data:result });
})

module.exports = { reviewController }