const { default: mongoose } = require('mongoose');

const paymentSchema = new mongoose.Schema({
    invoiceNumber: { type: Number },
    verify: { type: Boolean, default: false },
    authority: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    refId: { type: String, default: undefined },
    cardHash: { type: String, default: undefined },
    paymentDate: { type: Number },
    description: { type: String, default: 'Payment for buying courses and products'},
    user: { type: mongoose.Types.ObjectId, ref: 'user'},
    basket: { type: Object, default: {}}
}, { timestamps: true })

module.exports = {
    PaymentModel: mongoose.model('payment', paymentSchema)
}