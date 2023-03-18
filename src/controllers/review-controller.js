import { reviewModel } from "../models/review-model";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../utils/response-utils";

// Create a new review object under review collection
export const handleCreateReview = async (req, res) => {
    try {
        const data = req.body;

        const reviewObj = await reviewModel.create(data);

        return sendSuccessResponse(res, { review: reviewObj });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

// Gets all the reviews that are pending feedback from the user.
export const handleGetPendingReviews = async (req, res) => {
    try {
        const userId = req.decoded._id;

        const pendingReviews = await reviewModel
            .find({
                reviewer: userId,
                isPending: true,
            })
            .populate("reviewer reviewee");

        return sendSuccessResponse(res, { pendingReviews });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

// Finds and applies provided updates to a review object
export const handleUpdateReview = async (req, res) => {
    try {
        const { id } = req.params;

        const updates = req.body;

        const reviewObj = await reviewModel.findByIdAndUpdate(
            id,
            {
                $set: updates,
            },
            { new: true }
        );

        return sendSuccessResponse(res, { review: reviewObj });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

// Finds a review by its ID and deletes it from the database
export const handleDeleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const reviewObj = await reviewModel.findByIdAndDelete(id);

        return sendSuccessResponse(res, { review: reviewObj });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

// This controller handles feedback from the assigned user and sets it in the database
export const handleAddReview = async (req, res) => {
    try {
        const reviewerId = req.decoded._id;

        const { id } = req.params;

        const { notes, rating } = req.body;

        const reviewObj = await reviewModel.findById(id);

        if (!reviewObj.isPending) throw Error("Review already added");

        if (reviewerId !== reviewObj.reviewer.toString())
            throw Error("Review not assigned to user");

        reviewObj.notes = notes;
        reviewObj.rating = rating;
        reviewObj.isPending = false;

        await reviewObj.save();

        return sendSuccessResponse(res, { review: reviewObj });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};
