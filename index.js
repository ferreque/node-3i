// Configuración de express
const express = require("express");
const app = express();
// Configuración del body parser de express
app.use(express.json());
// Config de dotenv
require("dotenv").config();
//Cors
var cors = require("cors");
app.use(cors());

//importo el MOCK
const MOCK = require("./mocks/mocks");
// Seteo en una constante el puerto
const PORT = process.env.PORT || 8000;
//Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Base de datos online! xD");
  } catch (error) {
    console.log(error);
    throw new Error("Error de conexión a DB");
  }
};

const productsRoutes = require("./routes/products");

// Programo endopints
app.use("/products", productsRoutes);
// Endpoints con route
app
  .route("/test")
  .get((req, res) => {
    console.log("GET /products");
    const allProducts = MOCK;
    res.status(200).json(allProducts);
  })
  .post((req, res) => {
    res.json("👌");
    console.log(req.body);
  });

// Funcion que corre la API, si no está no se autoejecuta
app.listen(PORT, () => {
  console.log("server listening on port " + process.env.PORT);
});
dbConnection();
