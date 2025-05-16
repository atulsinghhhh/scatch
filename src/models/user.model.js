import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    fullname: {
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required: true,
        lowercase: true
    },
    isadmin:{
        type: Boolean
    },
    contact:{
        type: Number,
        // required:true
    },
    picture:{
        type: String,
        // required:true
    },
    Cart:{
        type:Array,
        default:[]
    },
    orders:{
        type:Array,
        default:[]
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User=mongoose.model("User",userSchema)