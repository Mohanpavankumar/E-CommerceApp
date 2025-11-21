const express = require('express');
const router = express.Router()
const userSignUpController = require("../controller/user/userSignUp.js");
const userSignInController = require('../controller/user/userSignIn.js');
const userDetailsController = require('../controller/user/userDetails.js');
const authToken = require('../middleware/authToken.js');
const userLogout = require('../controller/user/userLogout.js');
const allUsers = require('../controller/user/allUsers.js');
const updateUser = require('../controller/user/updateUser.js');
const uploadProductController = require('../controller/product/uploadProduct.js');
const getProductController = require('../controller/product/getProduct.js');
const updateProductController = require('../controller/product/updateProduct.js');
const getCategoryProductController = require('../controller/product/getCategoryProduct.js');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct.js');
const getProductDetails = require('../controller/product/getProductDetails.js');
const addToCartController = require('../controller/user/addToCartController.js');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct.js');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct.js');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct.js');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct.js');
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout",userLogout)

//admin panel
router.get("/all-users",authToken, allUsers)
router.post("/update-user",authToken, updateUser)

//product
router.post("/uploadProduct",authToken, uploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct", getCategoryProductController)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addToCart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router