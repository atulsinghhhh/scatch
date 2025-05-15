import mongoose from "mongoose"

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
        required:true
    },
    picture:{
        type: String,
        required:true
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

export const User=mongoose.model("User",userSchema)