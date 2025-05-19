import express from "express";
const router=express.Router();
import { createOwner } from "../controllers/owner.controllers.js";
import { addProduct } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";


router.route("/create").post(
    createOwner

)

router.route("/shop").post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    addProduct
)


export default router;