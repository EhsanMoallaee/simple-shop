const { default: axios } = require("axios");
const createError = require("http-errors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const moment = require("moment-jalali");
const { PaymentModel } = require("../../../models/payment.model");
const { UserModel } = require("../../../models/user.model");
const Controller = require("../controller");
const { getUserOrderBasket } = require("../../../utils/user-basket/getUserOrderBasket");
const { invoiceNumberGenerator } = require("../../../utils/invoiceNumberGenerator");

class PaymentController extends Controller {

    paymentGateway = async (req, res, next) => {
        const user = req.user;
        if(user.basket.courses.length == 0 && user.basket.products.length == 0) {
            throw new createError.BadRequest('Your order basket is empty');
        }
        const basket = (await getUserOrderBasket(user._id))?.[0];
        if(!basket.payDetail.finalTotalPrice) throw new createError.BadRequest('Invalid order basket');
        const zarinpal_request_url = 'https://api.zarinpal.com/pg/v4/payment/request.json';
        const zarinpal_gateway_url = 'https://www.zarinpal.com/pg/StartPay';
        const description = 'Payment for buying products or courses';
        const amount = basket.payDetail?.finalTotalPrice;
        const zarinpal_options = {
            merchant_id: '00000000-0000-0000-0000-000000000000',
            sandBox : true,
            amount,
            description,
            metadata: {
                email: user?.email || 'example@mail.com',
                mobile: user.mobile
            },
            callback_url: 'http://localhost:3000/payment/zarinPal'
        }
        // Info: For product mode uncomment and use line below:
        //const requestResult = await axios.post(zarinpal_request_url, zarinpal_options).then(result => result.data);
        // Info: For develope mode (cause we havn't valid gateway merchant id) use this fake line data:
        const requestResult = {
            data: {
                authority: 'AA0000000005524',
                code: 100
            }
        }
        const {authority, code} = requestResult.data;
        await PaymentModel.create({
            invoiceNumber: invoiceNumberGenerator(),
            paymentDate: moment().format('jYYYYjMMjDDHHmmssSSS'),
            amount,
            authority,
            verify: false,
            user: user._id,
            description,
            basket
        })
        if(code == 100 && authority) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                data: {
                    code,
                    gateway_url: `${zarinpal_gateway_url}/${authority}`
                },
            });
        }
        throw new createError.BadRequest('Invalid data');
    }

    verifyPayment = async (req, res, next) => {
        const { Authority: authority } = req.query;
        const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
        const payment = await PaymentModel.findOne({authority});
        if(!payment) throw new createError.NotFound('Payment to pay not found');
        if(payment?.verify) throw new createError.NotFound('This payment has verifyed before');
        const verifyBody = JSON.stringify({
            authority,
            amount: payment.anount,
            merchant_id: 'AA0000000005524'
        });
        const verifyResult = await fetch(verifyURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: verifyBody
        }).then( result => result.json());
        if(verifyResult.data.code == 100) {
            await PaymentModel.findOneAndUpdate(
                {authority},
                {$set: {
                    refId: verifyResult.data.ref_id,
                    cardHash: verifyResult.data.card_hash,
                }}
            )
            const user = await UserModel.findById(payment.user);
            await UserModel.findOneAndUpdate(
                {_id: payment.user},
                {$set: {
                    courses: [...payment?.basket?.payDetail?.coursesIds || [], ...user.courses ],
                    products: [...payment?.basket?.payDetail?.productsIds || [], ...user.products ],
                    basket: {
                        courses: [],
                        products: []
                    }
                }},
            )
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Payment successfully done'
            })
        }
        throw new createError.BadRequest('Unsuccessfull payment');
    }
}

module.exports = {
    PaymentController: new PaymentController()
}