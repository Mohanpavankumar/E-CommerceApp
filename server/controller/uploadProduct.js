const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

async function uploadProductController(req,res) {
    try {

        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "product uploaded successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error ,
            error: true,
            success: false,
        });
    }
}

module.exports = uploadProductController;