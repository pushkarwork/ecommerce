const productModel = require("../models/productModel")
const ErrorHandler = require("../utils/ErrorHandler")
const asyncErrorHandler = require("../middleware/asyncError")
const ApiFeatures = require("../utils/features")


// GET ALL PRODUCTS
exports.getAllProducts = asyncErrorHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(productModel.find(), req.query).search().filter()
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products
    })

})

// CREATE NEW PRODUCT
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    req.body.user = req.user.id
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
