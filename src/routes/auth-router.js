import express from "express";

import {
    handleGetAuth,
    handleLogin,
    handleSignup,
} from "../controllers/auth-controller";
import { verifyJWT } from "../utils/jwt-utils";

const authRouter = express.Router();

authRouter.post("/register", handleSignup);
authRouter.post("/login", handleLogin);
authRouter.get("/", verifyJWT, handleGetAuth);

export default authRouter;
