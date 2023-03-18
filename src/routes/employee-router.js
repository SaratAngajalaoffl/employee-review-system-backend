import express from "express";
import {
    handleDeleteEmployee,
    handleGetEmployeeReviews,
    handleGetEmployees,
    handleSetAdmin,
    handleUpdateEmployee,
} from "../controllers/employee-controller";
import { verifyAdmin, verifyJWT } from "../utils/jwt-utils";

const employeeRouter = express.Router();

employeeRouter.post("/set-admin", verifyJWT, verifyAdmin, handleSetAdmin);
employeeRouter.get("/", verifyJWT, verifyAdmin, handleGetEmployees);

employeeRouter.get("/:id/reviews", verifyJWT, verifyAdmin, handleGetEmployeeReviews);

employeeRouter.post(
    "/:id/update",
    verifyJWT,
    verifyAdmin,
    handleUpdateEmployee
);
employeeRouter.delete("/:id/delete", verifyJWT, verifyAdmin, handleDeleteEmployee);

export default employeeRouter;
