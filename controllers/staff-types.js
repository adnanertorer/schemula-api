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

module.exports = {
    create
};