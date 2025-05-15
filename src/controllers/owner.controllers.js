import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Owner } from "../models/owners.model.js";

const createOwner = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingOwner = await Owner.findOne({ email });

    if (existingOwner) {
        throw new ApiError(409, "Owner with this email already exists");
    }

    const createdOwner = await Owner.create({
        fullname,
        email,
        password
    });

    if (!createdOwner) {
        throw new ApiError(500, "Something went wrong while creating the new Owner");
    }

    res.status(201).json(
        new ApiResponse(
            201,
            createdOwner,
            "Owner created successfully"
        )
    );
});

export{
    createOwner
}
