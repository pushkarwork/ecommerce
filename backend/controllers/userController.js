const ErrorHandler = require("../utils/ErrorHandler")
const asyncErrorHandler = require("../middleware/asyncError")
const User = require("../models/userModel")
const { getJwtToken, comparePassword } = User
const sendToken = require("../utils/jwtToken")
// const { options } = require("../routes/productroutes")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");


// register a user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name, email, password, avatar: {
            public_id: "this is sample id",
            url: "this is sample url",
        },
    })
    console.log("hi")
    // Making jwt token of user
    sendToken(user, 201, res)
})

// USER LOGIN
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email or Password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Please Enter valid Email or Password", 401))
    }
    // console.log(user)
    // console.log("12313213123123")
    const isPasswordMatched = await user.comparePassword(password)
    // console.log(user)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const token = user.getJwtToken()


    sendToken(user, 200, res)

})

// LOGOUT USER
exports.logout = asyncErrorHandler(async (req, res, next) => {

    res.cookie("token", "", {
        expiresIn: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
})


// forgot user password

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `your reset password token is : \n\n ${resetPasswordUrl}`
    try {
        await sendEmail({
            email: user.email,
            subject: `regarding reset password`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

})


// RESET PASSWORD
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or expired", 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user, 200, res)

})


// GET USER PROFILE DETAILS

exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// UPDATE USER PROFILE PASSWORD

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user, 200, res)
})


// UPDATE USER PROFILE EXCEPT PASSWORD

exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })

})

// GET ALL USERS---ADMIN

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})


// GET SINGLE USER---ADMIN

exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user
    })
})


// UPDATE USER PROFILE ROLE---ADMIN
exports.updateRole = asyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })

})

// DELETE USER ---ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 400))
    }


    await User.findByIdAndRemove(req.params.id)


    res.status(200).json({
        success: true
    })

})