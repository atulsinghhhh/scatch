import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        lowercase:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    bgColor:{
        type:String
    },
    panelColor:{
        type:String,
    },
    textColor:{
        type:String
    }

},{timeStamps:true});

export const Product=mongoose.model("Product",productSchema);