import express from "express";
const router=express.Router();
import { createOwner } from "../controllers/owner.controllers.js";
// import ownerModel from "../models/owners.model.js"

router.get("/",(req,res)=>{
    res.send("hey");
})

router.route("/create").post(
    createOwner

)

router.post("/",(req,res)=>{
    res.send("Hello developer")

})

export default router;