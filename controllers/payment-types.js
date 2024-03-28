const PaymentType = require('../models/PaymentType');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const create = asyncErrorWrapper(async (req, res, next) => {

    if(req.user.role !== 'admin')
        return next(new CustomError('Bu işlem için erişim yetkiniz yok', 401));

    const { payment_type } = req.body;

    var defaultPaymentType = await PaymentType.create({ 
        payment_type,
        user_id: req.user.id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultPaymentType,
        message: 'PaymentType created successfully'
    });
});

module.exports = {
    create
};