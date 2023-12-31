const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product name"]
    },
    description: {
        type: String,
        required: [true, "Please enter Product description"]
    },
    price: {
        type: Number,
        maxLength: 8,
        required: [true, "Please enter Product price"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: [true]
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please enter Product category"]
    },
    stock: {
        type: String,
        required: [true, "Please enter Product stock"],
        maxLength: 4,
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
})

// const productModel = new mongoose.model(productsModel, 'productSchema')\\\
const productModel = new mongoose.model("productModel", productSchema)

module.exports = productModel