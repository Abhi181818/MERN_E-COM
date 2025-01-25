const JWT = require("jsonwebtoken")
const User = require("../models/userModel.js")
exports.isAuthUser = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)

    if (!token) {
        res.status(401).json("Please login!!!")
    }
    const decoded = JWT.verify(token, "1234")
    req.user = await User.findById(decoded._id)
    next();
}

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json("cannot access")
        }
        next()
    }
}
