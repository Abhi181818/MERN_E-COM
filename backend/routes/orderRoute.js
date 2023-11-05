const Product = require("../models/prodModel.js")
const Order = require("../models/orderModel.js")
const express = require("express")
const router = express.Router()

//newOrder
router.post("/order/new", async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        // user: req.params._id
    })

    res.status(201).json(order)
})

module.exports = router