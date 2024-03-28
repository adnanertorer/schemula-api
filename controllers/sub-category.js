const SubCategory = require('../models/SubCategory');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const { category_id, sub_category_name } = req.body;

    var defaultSubCategory = await SubCategory.create({ 
        category_id,
        sub_category_name,
        company_id: req.user.company_id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultSubCategory,
        message: 'SubCategory created successfully'
    });
});

module.exports = {
    create
};