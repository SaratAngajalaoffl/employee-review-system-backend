import mongoose from "mongoose";
import { employeeModel } from "./employee-model";

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: employeeModel,
        required: true,
    },
    reviewee: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: employeeModel,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    notes: {
        type: String,
        default: "",
    },
    isPending: {
        type: Boolean,
        default: true,
    },
});

export const reviewModel = mongoose.model("Review", reviewSchema);
