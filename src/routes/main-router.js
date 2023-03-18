import express from "express";
import authRouter from "./auth-router";
import employeeRouter from "./employee-router";
import reviewRouter from "./review-router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
router.use("/review", reviewRouter);

export default router;
