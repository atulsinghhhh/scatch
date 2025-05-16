import express from "express";
const router =express.Router();
import { userRegister,loginUser } from "../controllers/users.controllers.js";

// router.route("/register").post((req,res)=>{
//     res.send("User is register sucessfull")
// }

// )

router.route("/register").post(
    userRegister
)
router.route("/login").post(
    loginUser
)

export default router