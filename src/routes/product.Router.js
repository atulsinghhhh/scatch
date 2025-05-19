import express from "express";
const router =express();
import { addProduct } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

router.route("/shop").post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    addProduct
)


export default router
