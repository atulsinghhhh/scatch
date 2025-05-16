import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";
// import 

const userRegister=asyncHandler(async(req,res)=>{
    const {fullname,email,password}=req.body;

    if(!fullname || !email || !password){
        throw new ApiError(400,"All required fields are required")
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    const user=await User.create({
        fullname,
        email,
        password
    })
    if(!user){
        throw new ApiError(500,"Something went wrong while creating the new user");
    }

    res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User register successfully !!"
        )
    )
})

export{
    userRegister
}