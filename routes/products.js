const router = require("express").Router();
const Product = require("../models/product.js");

router
  .get("/all", async (req, res) => {
    console.log("GET /products/all");
    try {
      const allProducts = await Product.find();
      console.log(allProducts);
      res.status(200).send({ allProducts });
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET /product" + id);
    try {
      const product = await Product.findById(id);
      res.status(200).send(product);
      console.log(product);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .post("/new", async (req, res) => {
    const { body } = req;
    console.log("POST /product/new");
    try {
      const newProduct = new Product(body);
      await newProduct.save();
      res.status(200).json(newProduct);
      console.log("ADD id " + newProduct._id);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { ...resto } = req.body;
    console.log("PUT /product" + id);
    try {
      const editProduct = await Product.findByIdAndUpdate(id, resto, {
        new: true,
      });
      res.status(200).json(editProduct);
      console.log("Moddified Product " + editProduct);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Delete /product" + id);
    try {
      const deleteProduct = await Product.findByIdAndDelete(id);
      res.status(200).json(deleteProduct);
      console.log("product Deleted " + deleteProduct);
    } catch (error) {
      res.status(404).json(error);
    }
  });
module.exports = router;
