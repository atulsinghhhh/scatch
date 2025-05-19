import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    },
    contact: {
        type: Number,
        // required: true
    },
    picture: {
        type: String,
        // required: true
    },
    Cart: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    },
    gstin: {
        type: String,
    }
}, { timestamps: true });

ownerSchema.pre("save",async function(next){  
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();

})

export const Owner = mongoose.model("Owner", ownerSchema);
