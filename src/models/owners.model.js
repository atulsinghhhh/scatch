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
    },
    picture: {
        type: String,
    },
    Cart: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
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
