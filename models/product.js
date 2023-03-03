const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: String,
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
