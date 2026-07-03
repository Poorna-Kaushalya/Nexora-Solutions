const express = require("express");

const router = express.Router();

const {

createReview,

getReviews,

getAllReviews,

approveReview,

deleteReview,

ratingSummary

}=require("../controllers/reviewController");

const {

protect,

adminOnly

}=require("../middleware/authMiddleware");


// Public

router.post("/",createReview);

router.get("/",getReviews);

router.get("/summary",ratingSummary);


// Admin

router.get("/admin",protect,adminOnly,getAllReviews);

router.put("/:id/approve",protect,adminOnly,approveReview);

router.delete("/:id",protect,adminOnly,deleteReview);

module.exports=router;