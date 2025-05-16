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
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken; // save refresh token in db
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error); // Log the error for debugging
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const userDetails = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true, // Changed from httpsOnly to httpOnly
        secure: process.env.NODE_ENV === 'production' // Set secure based on environment
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: userDetails,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly: true, // Changed from httpsOnly to httpOnly
        secure: process.env.NODE_ENV === 'production' // Set secure based on environment
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken",options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged Out"
            )
        )
})



// const generateAccessAndRefreshTokens= async(userId)=>{
//     try {
//         const user=await User.findById(userId);

//         const accessToken=user.generateAccessToken();
//         const refreshToken=user.generateRefreshToken();

//        user.refreshToken=refreshToken; // save refresh token in db
//         await user.save({validateBeforeSave:false});

//         return {accessToken,refreshToken};  
        
//     } catch (error) {
//         throw new ApiError(500,"Something went wrong while generating refresh and acces token")
        
//     }
// }

// const loginUser=asyncHandler( async (req,res)=>{
//     /* email or username  password req.body
//     check if user exists
//     check if password is correct 
//     generate access token and refresh token
//     send cookie
//     return response*/

//     const {email,username,password}=req.body;
//     if(!username && !email){
//         throw new ApiError(400,"Username or email is required");
//     }

//     const user=await User.findOne({
//         $or:[ // we write object inside the array
//             {username},
//             {email}
//         ]
//     })

//     if(!user){
//         throw new ApiError(404,"User not found with this username or email");
//     }

//     const isPasswordValid=await user.isPasswordCorrect(password);
//     if(!isPasswordValid){
//         throw new ApiError(400,"Invalid password");
//     }

//     const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

//     const userDetails=await User.findById(user._id).select("-password -refreshToken");

//     const options={
//         httpsOnly: true,
//         secure: true
//     }
//     return res.status(200)
//     .cookie("accessToken",accessToken,options)
//     .cookie("refreshToken",refreshToken,options)
//     .json(
//         new ApiResponse(
//             200,
//             {
//                 user: userDetails,accessToken,refreshToken
//             },
//             "User logged in successfully"
//         )
//     )
// })
export{
    userRegister,
    loginUser,
    logoutUser
}