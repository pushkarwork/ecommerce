const productModel = require("../models/productModel")


// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    const products = await productModel.find()
    res.status(200).json({
        success: true,
        products
    })

}

// CREATE NEW PRODUCT
exports.createProduct = async (req, res, next) => {
    const product = await productModel.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
}

// UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true, useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
}

// DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await productModel.findByIdAndRemove(req.params.id)


    res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    })
}

// GET SINGLE PRODUCT DETAILS
exports.getAProduct = async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}