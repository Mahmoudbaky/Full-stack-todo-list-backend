import express from "express";
import passport from "passport";

import * as authController from "../controllers/authController.js";

import { verifyToken } from "../Middleware/verifyToken.js";

export const router = express.Router();

router.post("/signup", authController.postSignUp);

router.post("/login", authController.postLogIn);

router.post("/logout", verifyToken, authController.logOut);
