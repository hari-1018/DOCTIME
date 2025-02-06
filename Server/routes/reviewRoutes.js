const express  = require('express');
const reviewRouter = express.Router();
const { reviewController } = require("../controllers/reviewController");

reviewRouter.post('/post-review', reviewController);

module.exports = reviewRouter;