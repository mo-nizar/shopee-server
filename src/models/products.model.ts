import mongoose from "mongoose";


export const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  is_enabled: Boolean,
})

// Create a Mongoose model called "UserModel" based on the userSchema
export const productModel = mongoose.model("products", productSchema);


export default productModel;