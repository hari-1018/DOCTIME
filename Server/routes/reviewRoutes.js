const express  = require('express');
const reviewRouter = express.Router();
const { reviewController, getDoctorReviewsController } = require("../controllers/reviewController");

reviewRouter.post('/post-review', reviewController);
reviewRouter.get('/:doctorId', getDoctorReviewsController);


module.exports = reviewRouter;