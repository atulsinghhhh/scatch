import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";

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


const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);

        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}


const userLogin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        throw new ApiError(400,"email and password fields are required")
    }
    console.log(password);

    const user=await User.findOne(
        {email})
    if(!user){
        throw new ApiError(409,"You are already registered the user by email")
    }

    const isValidPassword=await user.isPasswordCorrect(password);
    if(!isValidPassword){
        throw new ApiError(400,"Invalid password");
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id);

    const userDetails=await User.findById(user._id).select("-password -refreshToken");
    const options={
        httpsOnly: true,
        secure: true
    }
    res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {user: userDetails,accessToken,refreshToken},
                "User Login successfully"
            )
        )
})

export{
    userRegister,
    userLogin
}