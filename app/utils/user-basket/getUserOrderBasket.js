const { UserModel } = require("../../models/user.model");
const { deepCopyOfAnObject } = require("../deepCopyOfAnObject");

async function getUserOrderBasket(userId) {
    const userOrderBasketDetail = await UserModel.aggregate([
        { $match: {_id: userId } },
        { $project: { basket: 1 } },
        { $lookup: {
            from: 'products',
            localField: 'basket.products.productId',
            foreignField: '_id',
            as: 'productsDetail'
        }},
        { $lookup: {
            from: 'courses',
            localField: 'basket.courses.courseId',
            foreignField: '_id',
            as: 'coursesDetail'
        }},
        {
            $addFields: {
                'productsDetail': {
                    $function: {
                        body: function(productsDetail, products) {
                            return productsDetail.map(function(product) {
                                const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count;
                                const totalPrice = count * product.price;
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - (product.discount / 100) * totalPrice
                                }
                            })
                        },
                        args: ['$productsDetail', '$basket.products'],
                        lang: 'js'
                    }
                },
                'coursesDetail': {
                    $function: {
                        body: function(coursesDetail) {
                            return coursesDetail.map(function(course) {
                                return {
                                    ...course,
                                    finalPrice: course.price - (course.discount / 100) * course.price
                                }
                            })
                        },
                        args: ['$coursesDetail'],
                        lang: 'js'
                    }
                },
                'payDetail': {
                    $function: {
                        body: function(coursesDetail, productsDetail, products) {
                            const courseFinalPrice = coursesDetail.reduce(function(total, course) {
                                return total + (course.price - (course.discount / 100) * course.price)
                            }, 0);
                            const pruductFinalPrice = productsDetail.reduce(function(total, product) {
                                const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count;
                                const totalPrice = count * product.price;
                                return total + (totalPrice - (product.discount / 100) * totalPrice)
                            }, 0);
                            const coursesIds = coursesDetail.map( course => course._id.valueOf());
                            const productsIds = productsDetail.map( product => product._id.valueOf());
                            return {
                                coursesIds,
                                productsIds,
                                courseFinalPrice,
                                pruductFinalPrice,
                                finalTotalPrice: courseFinalPrice + pruductFinalPrice
                            }
                        },
                        args: ['$coursesDetail', '$productsDetail', '$basket.products'],
                        lang: 'js'
                    }
                }
            }
        },
        { $project: { basket: 0 } }
    ]);
    return deepCopyOfAnObject(userOrderBasketDetail)
}

module.exports = {
    getUserOrderBasket
}