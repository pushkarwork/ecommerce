const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../middleware/asyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel")

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)

    if (!token) {
        return next(new ErrorHandler("Please Login with valid email to access this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JwtSecretKey)
    req.user = await User.findById(decodedData.id)
    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403))
        }
        next()

    }


}