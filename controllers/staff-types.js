const StaffType = require('../models/StaffType');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const create = asyncErrorWrapper(async (req, res, next) => {

    if(req.user.role !== 'admin')
        return next(new CustomError('Bu işlem için erişim yetkiniz yok', 401));

    const { staff_type_name } = req.body;

    var defaultStaffType = await StaffType.create({ 
        staff_type_name,
        user_id: req.user.id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultStaffType,
        message: 'Staff type created successfully'
    });
});

const getList = asyncErrorWrapper(async (req, res, next) => {

    var staffTypes = await StaffType.find({});

    return res.status(200).
    json({
        success: true,
        data: staffTypes,
        message: 'Staff type list get successfully'
    });
});

const getById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var paymentType = await StaffType.findById(id);
    return res.status(200).
    json({
        success: true,
        data: paymentType,
        message: 'StaffType get successfully'
    });
});

module.exports = {
    create,
    getList,
    getById
};