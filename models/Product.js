import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    categories: {
        type: Array,
    },
}, {timestamps: true});

export default mongoose.model("Product", productSchema);
    