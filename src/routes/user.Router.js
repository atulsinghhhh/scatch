import express from "express";
const router =express.Router();
import { userRegister,loginUser,logoutUser } from "../controllers/users.controllers.js";
import { verfiyJWT } from "../middlewares/auth.middlewares.js";


router.route("/register").post(
    userRegister
)
router.route("/login").post(
    loginUser
)

// secure routes
router.route("/logout").post(
    verfiyJWT,
    logoutUser
)

export default router