const ErrorHandler = require("../utils/ErrorHandler")
const asyncErrorHandler = require("../middleware/asyncError")
const User = require("../models/userModel")
const { getJwtToken, comparePassword } = User
// const comparePassword = User


// register a user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name, email, password, avatar: {
            public_id: "this is sample id",
            url: "this is sample url",
        },
    })
    // Making jwt token of user
    const token = user.getJwtToken()
    res.status(201).json({
        success: true,
        token
    })
})

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email or Password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next (new ErrorHandler("Please Enter valid Email or Password", 401))
    }
    // console.log(user)
    // console.log("12313213123123")
    const isPasswordMatched = await user.comparePassword(password)
    // console.log(user)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const token = user.getJwtToken()


    res.status(200).json({
        success: true,
        token
    })


})