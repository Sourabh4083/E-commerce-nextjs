import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        price: {
            type: Number,
            required: true,
        },
        image: String,
        category: String,
        stock: {
            type: Number,
            default: 0
        },
        slug: String
    },
    { timestamps: true }

)

export default mongoose.models.Product || mongoose.model("Product", productsSchema)