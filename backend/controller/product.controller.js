import mongoose from "mongoose";
import Product from "../models/Prouduct.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json({ success: true, message: "All the products", data: products });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }
  const newProduct = new Product(product); // creating a new product
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added", data: newProduct });
  } catch (error) {
    console.log(`Error in creating the product ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (e) {
    console.log(`Error : ${e}`);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({success: true,message:"Updated Successfully", data: updatedProduct });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
