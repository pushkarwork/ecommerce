const express = require("express");

const router = express.Router();


const { getAllProducts, createProduct } = require("../controllers/productController")
router.route('/products').get(getAllProducts);
router.route("/products").post(createProduct);


module.exports = router;