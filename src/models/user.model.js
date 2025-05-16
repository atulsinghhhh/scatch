// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     fullname: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     isadmin: {
//         type: Boolean,
//     },
//     contact: {
//         type: Number,
//     },
//     picture: {
//         type: String,
//     },
//     Cart: {
//         type: Array,
//         default: [],
//     },
//     orders: {
//         type: Array,
//         default: [],
//     },
//     refreshToken: {
//         type: String,
//     }
// }, { timestamps: true });
// userSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password=await bcrypt.hash(this.password,10);
//     }
//     next();
// })

// userSchema.methods.isPasswordCorrect=async function(password){
//     return await bcrypt.compare(password,this.password);
// }

// userSchema.methods.generateAccessToken=function(){
//     return jwt.sign({
//         _id:this._id,
//         email:this.email,
//         username:this.username,
//         fullname:this.fullname,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
//     }
//     )
// }
// userSchema.methods.generateRefreshToken=function(){
//     return jwt.sign({
//         _id:this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
//     }
//     )

// }

// export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        match: /.+\@.+\..+/ // Basic email format validation
    },
    password: {
        type: String,
        required: true,
    },
    isadmin: {
        type: Boolean,
        default: false, // Default value for isadmin
    },
    contact: {
        type: String, // Changed to String to accommodate different formats
    },
    picture: {
        type: String,
    },
    Cart: {
        type: Array,
        default: [],
    },
    orders: {
        type: Array,
        default: [],
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

userSchema.methods.generateRefreshToken = function () {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

export const User = mongoose.model("User ", userSchema);
