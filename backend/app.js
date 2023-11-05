const express = require('express')
const app = express()
const cors = require("cors")
const middleware = require("../backend/middleware/error.js")
const cookieParser = require('cookie-parser')
const userRoute = require("./routes/userRoute.js")
const productRoute = require("./routes/productRoute.js")
const orderRoute = require("./routes/orderRoute.js")
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)
app.use(middleware)

module.exports = app