const productModel = require("../models/productModel")
const ErrorHandler = require("../utils/ErrorHandler")
const asyncErrorHandler = require("../middleware/asyncError")


// GET ALL PRODUCTS
exports.getAllProducts = asyncErrorHandler(async (req, res) => {
    const products = await productModel.find()
    res.status(200).json({
        success: true,
        products
    })

})

// CREATE NEW PRODUCT
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await productModel.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})
// UPDATE PRODUCT
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found!!', 404))
    }
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true, useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// DELETE PRODUCT
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found!!', 404))
    }
    product = await productModel.findByIdAndRemove(req.params.id)


    res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    })
})

// GET SINGLE PRODUCT DETAILS
exports.getAProduct = asyncErrorHandler(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found!!', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})
