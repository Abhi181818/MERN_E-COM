const express = require('express')
const Product = require('../models/prodModel.js')
const { getAllProducts, createProduct } = require('../controller/productController.js')
const router = express.Router()
const ErrorHandler = require("../utils/errorHandler.js")
const ApiFeatures = require("../utils/apiFeatures.js")
const { isAuthUser, authorizedRoles } = require('../middleware/auth.js')

// router.route("/products").get(getAllProducts)
// router.route("/product/new").post(createProduct)

router.post("/admin/product/new", async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product })
    isAuthUser(req, res, next)
    authorizedRoles("admin")
})


//getAll //search
router.get("/products", async (req, res, next) => {
    const resultPerPgae = 2
    const prodCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPgae)
    const prods = await apiFeature.query;
    res.status(200).json({ prods, prodCount })
    // isAuthUser(req, res, next)
    // authorizedRoles("admin")
})


//findByIdAndUpdate
router.put("/admin/product/:id", async (req, res, next) => {
    let prod = await Product.findById(req.params.id);
    if (!prod) {
        return next(new ErrorHandler(404))
    }
    prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ prod, prodCount })
    isAuthUser(req, res, next)
    authorizedRoles("admin")

})


//findAndDeleteById
router.delete("/admin/product/:id", async (req, res, next) => {
    let prod = await Product.findByIdAndDelete(req.params.id)
    if (!prod) {
        return res.status(404).send("The product with the given ID was not found.")
    }
    res.status(200).send(`Deleted product ${prod}`)
    isAuthUser(req, res, next)
    authorizedRoles("admin")

})

router.get("/product/:id", async (req, res, next) => {
    let prod = await Product.findById(req.params.id);
    if (!prod) {
        return res.status(500).json("Product not found!")
    }
    res.status(200).json(prod)
})


// create or update review

// router.put("/review", async (req, res, next) => {
//     const review = {
//         user: req.params._id,
//         name: req.params.name,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//     }
//     const prod = await Product.findById(req.body.productId)
//     const isReviewed = prod.reviews.find(req.params.user)
//     if (isReviewed) {
//         prod.reviews.forEach(element => {
//             if (rev => rev.user.toString() === req.user._id.toString())
//                 (element.rating = req.body.rating), (element.comment = req.body.comment)

//         });
//     }
//     else {
//         prod.reviews.push(review);
//         prod.numOfReviews = prod.reviews.length
//     }
//     let avg = 0
//     prod.ratings = prod.reviews.forEach(rev => {
//         avg += rev.rating
//     }) / prod.reviews.length

//     await prod.save({ validateBeforeSave: false })

//     res.status(200).json({message:"review added"})
// })

module.exports = router