import mongoose from "mongoose";

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

export const Owner = mongoose.model("Owner", ownerSchema);
