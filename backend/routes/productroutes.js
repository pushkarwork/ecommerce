const express = require("express");

const router = express.Router();


const { getAllProducts, createProduct, updateProduct, deleteProduct, getAProduct, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
router.route('/products').get(getAllProducts);
router.route("/products").post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/products/:id").put(isAuthenticated, authorizeRoles("admin"), updateProduct).delete(isAuthenticated, authorizeRoles("admin"), deleteProduct).get(getAProduct)
router.route("/review").put(isAuthenticated, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticated, deleteReview)


module.exports = router;