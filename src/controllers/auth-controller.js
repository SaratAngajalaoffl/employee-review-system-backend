import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../utils/response-utils";
import { generateHash, verifyHash } from "../utils/bcrypt-utils";
import { employeeModel } from "../models/employee-model";
import { generateToken } from "../utils/jwt-utils.js";

// Gets required parameters from the post request body, validates them and creates a new user. Generates a JWT for the new user and sends it in response.
export const handleSignup = async (req, res) => {
    try {
        const { username, password, fullName } = req.body;

        const userObj = await employeeModel.findOne({ username });

        if (!!userObj) throw Error("User with username already exists");

        const passwordHash = await generateHash(password);

        const newUserObj = await employeeModel.create({
            username,
            fullName,
            password: passwordHash,
        });

        const accessToken = await generateToken({
            ...newUserObj.toObject(),
            password: undefined,
        });

        return sendSuccessResponse(res, {
            user: { ...newUserObj.toObject(), password: undefined },
            accessToken,
        });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};

// Checks the provided username and password match with an existing user, creates a JWT for him and sends it in the response.
export const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userObj = await employeeModel
            .findOne({ username })
            .select("+password");

        if (!userObj) throw Error("No user with username exists");

        if (!verifyHash(password, userObj.password))
            throw Error("Password Mismatch");

        const accessToken = await generateToken({
            ...userObj.toObject(),
            password: undefined,
        });

        return sendSuccessResponse(res, {
            user: { ...userObj.toObject(), password: undefined },
            accessToken,
        });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};

// Verifies a JWT and sends the details of that user to the frontend
export const handleGetAuth = async (req, res) => {
    try {
        const userData = req.decoded;

        return sendSuccessResponse(res, {
            user: userData,
        });
    } catch (err) {
        return sendErrorResponse(res, err.message);
    }
};
