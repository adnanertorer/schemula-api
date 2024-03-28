const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const paymentTypeSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'Erişim yok']
    },
    payment_type: {
        type: String,
        required: [true],
        enum: ['Seans', 'Aylık']
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('PaymentType', paymentTypeSchema);