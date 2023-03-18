import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 3,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

export const employeeModel = mongoose.model("Employee", employeeSchema);
