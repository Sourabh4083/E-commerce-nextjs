import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  cartItem: [cartItemSchema],
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
