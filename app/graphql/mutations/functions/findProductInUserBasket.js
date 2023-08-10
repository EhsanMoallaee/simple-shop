const { UserModel } = require("../../../models/user.model");
const { deepCopyOfAnObject } = require("../../../utils/deepCopyOfAnObject");

async function findProductInUserBasket(userId, productId) {
    const userProductsBasket = await UserModel.findOne({_id: userId, 'basket.products.productId': productId}, {'basket.products.$': 1});
    const productsBasket = deepCopyOfAnObject(userProductsBasket);
    return productsBasket?.basket?.products?.[0];
}

module.exports = {
    findProductInUserBasket,
}