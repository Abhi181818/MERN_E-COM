const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/userModel.js")
const express = require("express");
const sendToken = require("../utils/jwtToken.js");
const router = express.Router()
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const bcrypt = require("bcryptjs")
const { isAuthUser } = require("../middleware/auth.js");
//new user
router.post("/register", async (req, res, next) => {
    // try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
        name, email, password, displayPic: {
            public_id: "sample",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkms62ywj8noI96YorLX4kg6qHaHcq5lhoj_VYj9I0-A&s"
        }

    })
    // const token = newUser.getJWTToken()
    // res.status(201).json({ newUser, token })
    sendToken(newUser, 201, res)
})


router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("please enter email or password")
    }
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        // console.log("Invalid email or password")
        res.status(401).json("Invalid email or password")
    }
    const isMatched = await user.comparePassword(req.body.password);
    // const isMatched = await bcrypt.compare(password, user.password)
    // console.log(user.password)

    if (!isMatched) {
        res.status(401).json("Invalid Password")
    }
    sendToken(user, 200, res)
})

router.get("/logout", async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({ success: false, message: "logged out" })
})


router.post("/password/forgot", async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const msg = `Your password reset token is: \n ${resetUrl}`


    try {
        await sendEmail({
            email: user.email,
            subject: "Ecom pswd reset",
            message: "hello"
        })
        res.status(200).json({ message: `e-mail send to ${user.email}` })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return res.status(500).json({ message: `${error.message}` })
    }
})

router.put("/password/reset/:token", async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })
    if (!user) {
        return res.status(400).json({ message: "Password token invalid" })
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(404).json({ message: "Password does not match" })
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save()
    sendToken(user, 200, res)
})

router.get("/me", async (req, res, next) => {
    const user = await User.findOne(req.params._id)
    isAuthUser(req, res, next)
    res.status(200).json(user);
})

router.put("/password/update", async (req, res, next) => {
    const user = await User.findOne(req.params._id).select("+password")
    const { oldPassword, newPassword, confirmPassword } = req.body
    // console.log(user)

    const isMatched = await user.comparePassword(oldPassword)
    // const isMatched = await bcrypt.compare(oldPassword, req.params.password)
    if (!isMatched) {
        return res.status(400).json({ message: "invalid old password" })
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "password mismatch" })
    }
    user.password = newPassword;
    await user.save()
    sendToken(user, 200, res)
})

router.get("/admin/users", async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
})
module.exports = router