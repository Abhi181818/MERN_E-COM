const sendToken = (user, statuscode, res) => {
    const token = user.getJWTToken()
    const options = {
        expires: new Date(Date.now() + 4 * 24 * 3600 * 1000),
        httpOnly: true
    }
    res.status(statuscode).cookie("token", token, options).json({
        user, token
    })
}

module.exports = sendToken;