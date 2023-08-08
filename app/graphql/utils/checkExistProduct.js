const { ProductModel } = require("../../models/product.model");

async function checkExistProduct(id) {
    const product = await ProductModel.findById(id);
    return product ? product : {};
}

module.exports = {
    checkExistProduct,
}