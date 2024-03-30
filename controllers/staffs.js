const Staff = require('../models/Staff');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const data = req.body;

    var defaultStaff = await Staff.create({ 
        company_id: req.user.company_id,
        name: data.name,
        surname: data.surname,
        identity_number: data.identity_number,
        email: data.email,
        gsm: data.gsm,
        address: data.address,
        work_start_date: data.work_start_date,
        work_finish_date: data.work_finish_date,
        birthday: data.birthday,
        is_active: data.is_active,
        payment_type: data.payment_type,
        payment_type_id: data.payment_type_id,
        staff_type: data.staff_type,
        staff_type_type_id: data.staff_type_type_id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultStaff,
        message: 'Staff created successfully'
    });
});

const getList = asyncErrorWrapper(async (req, res, next) => {

    var staffs = await Staff.find({ company_id: req.user.company_id});

    return res.status(200).
    json({
        success: true,
        data: staffs,
        message: 'Staff list get successfully'
    });
});

const getById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var staff = await Staff.findById(id);
    return res.status(200).
    json({
        success: true,
        data: staff,
        message: 'Staff get successfully'
    });
});

const remove = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.query;

    await Staff.deleteOne({ id: id });

    return res.status(200).
    json({
        success: true,
        data: {},
        message: 'Staff delete successfully'
    });
});

module.exports = {
    create,
    getList,
    getById,
    remove
};