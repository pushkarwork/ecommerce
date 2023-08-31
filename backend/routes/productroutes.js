const express = require("express");

const router = express.Router();


const { getAllProducts, createProduct, updateProduct, deleteProduct, getAProduct } = require("../controllers/productController")
router.route('/products').get(getAllProducts);
router.route("/products").post(createProduct);
router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getAProduct)


module.exports = router;