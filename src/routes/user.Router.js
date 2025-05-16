import express from "express";
const router =express.Router();
import { userRegister } from "../controllers/users.controllers.js";

// router.route("/register").post((req,res)=>{
//     res.send("User is register sucessfull")
// }

// )

router.route("/register").post(
    userRegister

)

export default router