import { employeeModel } from "../models/employee-model";
import { reviewModel } from "../models/review-model";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../utils/response-utils";

export const handleSetAdmin = async (req, res) => {
    try {
        const { id } = req.body; // get id from request body

        const employeeObj = await employeeModel.findById(id);

        if (!employeeObj) throw Error("Employee doesn't exist"); // if employee doesn't exist

        employeeObj.isAdmin = true; // set employee to admin

        await employeeObj.save(); // commit the change to db

        return sendSuccessResponse(res, {
            employee: employeeObj.toObject(),
        });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};

// Controller gets all employees from the employees collection
export const handleGetEmployees = async (_, res) => {
    try {
        const employees = await employeeModel.find();

        return sendSuccessResponse(res, { employees });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};

// Finds the employee by using the id provided in URL params and applies provided updates on the user
export const handleUpdateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const updates = req.body;

        const employeeObj = await employeeModel.findByIdAndUpdate(
            id,
            {
                $set: updates,
            },
            { new: true }
        );

        return sendSuccessResponse(res, { employee: employeeObj.toObject() });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};


// Finds the employee by using the id provided in URL params and deletes the user
export const handleDeleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employeeObj = await employeeModel.findByIdAndDelete(id);

        return sendSuccessResponse(res, { employee: employeeObj.toObject() });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};

// Gets reviews of a particular employee
export const handleGetEmployeeReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const reviews = await reviewModel
            .find({ reviewee: id })
            .populate("reviewer");

        return sendSuccessResponse(res, { reviews });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};
