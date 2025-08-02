const productModel = require("../../models/productModel");

const getCategoryProductController = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category");

        console.log("category", productCategory);

        const productByCategory = [];

        for (const category of productCategory) {
            const product = await productModel.findOne({ category });

            if (product) {
                productByCategory.push(product);
            }
        }

        res.json({
            message: "Category Products",
            data: productByCategory,
            error: false,
            success: true
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryProductController;
