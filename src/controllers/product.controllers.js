import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../models/product.model.js";
import { uploadCloudiary } from "../utils/Cloudiary.js";

const addProduct = asyncHandler(async (req, res) => {

    const { name, price, discount, bgColor, panelColor, textColor } = req.body;
    if (!name || !price || !discount || !bgColor || !panelColor || !textColor) {
        throw new ApiError(400, "All fields are required");
    }
    console.log(name);

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        throw new ApiError(409, "You have already uploaded this product!");
    }

    const profile = req.files?.image?.[0]?.path;
    if (!profile) {
        throw new ApiError(400, "Image field is required");
    }

    const image = await uploadCloudiary(profile);
    // console.log(image);
    if (!image?.url) {
        throw new ApiError(400, "Failed to upload image to Cloudinary");
    }

    const product = await Product.create({
    name,
    price: Number(price),
    discount: Number(discount),
    image: image.url,
    bgColor,
    panelColor,
    textColor
    });

    res.status(201).json(
        new ApiResponse(
            201,
            product,
            "Product created successfully"
    )
    );
});

export { addProduct };
