const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async(req,res) => {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({
            _id : addToCartProductId,
            userId : currentUserId
        })

        res.json({
            message : "Product deleted from cart",
            success : true,
            error : false,
            data : deleteProduct
        })
        
    } catch (error) {
        res.json({
            message : error?.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = deleteAddToCartProduct