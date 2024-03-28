const Staff = require('../models/Staff');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const { name, surname, identity_number, email, gsm, address, work_start_date, work_finish_date, birthday, payment_type_name, staff_type_name } = req.body;

    var defaultStaff = await Staff.create({ 
        company_id: req.user.company_id,
        name,
        surname,
        identity_number,
        email,
        gsm,
        address,
        work_start_date,
        work_finish_date,
        birthday,
        payment_type_name,
        staff_type_name
    });

    return res.status(200).
    json({
        success: true,
        data: defaultStaff,
        message: 'Staff created successfully'
    });
});

module.exports = {
    create
};