const Category = require('../models/Category');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const { category_name } = req.body;

    var defaultCategory = await Category.create({ 
        category_name,
        company_id: req.user.company_id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultCategory,
        message: 'Category created successfully'
    });
});

const getCategory = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.query;

    var category = await Category.findById({ id: id });

    return res.status(200).
    json({
        success: true,
        data: category,
        message: 'category'
    });
});

const getAllCategory = asyncErrorWrapper(async (req, res, next) => {
    
    var categories = await Category.find({ company_id : req.user.company_id });

    return res.status(200).
    json({
        success: true,
        data: categories,
        message: 'categories'
    });

});

module.exports = {
    create,
    getCategory,
    getAllCategory
};