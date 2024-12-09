import express from "express";
import passport from "passport";

import * as authController from "../controllers/authController.js";

export const router = express.Router();

router.post("/signup", authController.postSignUp);

router.post("/login", authController.postLogIn);

router.post("/logout", authController.logOut);
