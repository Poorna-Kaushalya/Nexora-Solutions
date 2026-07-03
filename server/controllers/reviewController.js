const Review = require("../models/Review");

// Create Review
const createReview = async(req,res)=>{

    try{

        const review = await Review.create(req.body);

        res.status(201).json({

            success:true,
            message:"Review submitted successfully. Waiting for approval.",
            review

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};


// Get Approved Reviews

const getReviews = async(req,res)=>{

    try{

        const reviews = await Review.find({
            approved:true
        }).sort({
            createdAt:-1
        });

        res.json({

            success:true,
            count:reviews.length,
            reviews

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};


// Get All Reviews

const getAllReviews = async(req,res)=>{

    try{

        const reviews = await Review.find().sort({
            createdAt:-1
        });

        res.json({

            success:true,
            reviews

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};


// Approve Review

const approveReview = async(req,res)=>{

    try{

        const review = await Review.findByIdAndUpdate(

            req.params.id,

            {
                approved:true
            },

            {
                new:true
            }

        );

        res.json({

            success:true,
            message:"Review Approved",
            review

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};


// Delete Review

const deleteReview = async(req,res)=>{

    try{

        await Review.findByIdAndDelete(req.params.id);

        res.json({

            success:true,
            message:"Review Deleted"

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};


// Rating Summary

const ratingSummary = async(req,res)=>{

    try{

        const reviews = await Review.find({
            approved:true
        });

        let total = reviews.length;

        let avg = 0;

        if(total>0){

            avg = reviews.reduce((sum,item)=>sum+item.rating,0)/total;

        }

        res.json({

            success:true,

            totalReviews:total,

            averageRating:avg.toFixed(1)

        });

    }

    catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

};


module.exports={

createReview,

getReviews,

getAllReviews,

approveReview,

deleteReview,

ratingSummary

}