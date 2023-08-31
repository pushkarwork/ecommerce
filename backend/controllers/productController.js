const productModel = require("../models/productModel")



exports.getAllProducts = async (req, res) => {
    const products = await productModel.find()
    res.status(200).json({
        success: true,
        products
    })

}

exports.createProduct = async (req, res, next) => {
    const product = await productModel.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
}