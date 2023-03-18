import express from "express";
import {
    handleAddReview,
    handleCreateReview,
    handleDeleteReview,
    handleGetPendingReviews,
    handleUpdateReview,
} from "../controllers/review-controller";
import { verifyAdmin, verifyJWT } from "../utils/jwt-utils";

const reviewRouter = new express.Router();

reviewRouter.get("/", verifyJWT, handleGetPendingReviews);

reviewRouter.post("/create", verifyJWT, verifyAdmin, handleCreateReview);

reviewRouter.post("/:id/update", verifyJWT, verifyAdmin, handleUpdateReview);
reviewRouter.post("/:id/delete", verifyJWT, verifyAdmin, handleDeleteReview);

reviewRouter.post("/:id/add_review", verifyJWT, handleAddReview);

export default reviewRouter;
