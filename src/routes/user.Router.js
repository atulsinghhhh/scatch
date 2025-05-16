import express from "express";
const router =express.Router();
import { userRegister,userLogin } from "../controllers/users.controllers.js";

// router.route("/register").post((req,res)=>{
//     res.send("User is register sucessfull")
// }

// )

router.route("/register").post(
    userRegister
)
router.route("/login").post(
    userLogin
)

export default router