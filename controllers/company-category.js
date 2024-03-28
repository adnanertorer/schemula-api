const CompanyCategory = require('../models/CompanyCategory');
const CompanySubCategory = require('../models/CompanySubCategory');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const { selectedCompanyLesson } = req.body;

    if(selectedCompanyLesson.categoryId){
        const selectedCategory = await Category.findById(selectedCompanyLesson.categoryId);
        selectedCompanyLesson.categoryName = selectedCategory.category_name;
    }

    if(selectedCompanyLesson.subCategoryId){
        const selectedSubCategory = await SubCategory.findById(selectedCompanyLesson.subCategoryId);
        selectedCompanyLesson.subCategoryName = selectedSubCategory.sub_category_name;
    }

    var isExistCategory = await CompanyCategory.findOne({ 
        category_name: selectedCompanyLesson.categoryName,
         company_id: req.user.company_id
        });

    if(!isExistCategory){
        var defaultCompanyCategory = await CompanyCategory.create({
            category_name: selectedCompanyLesson.categoryName,
            company_id: req.user.company_id,
        });
    }

    var isExistSubCategory = await CompanySubCategory.findOne({
        company_id: req.user.company_id,
        sub_category_name: selectedCompanyLesson.subCategoryName,
    });

    if(!isExistSubCategory) {
        var defaultCompanySubCategory = await CompanySubCategory.create({
            company_id: req.user.company_id,
            sub_category_name: selectedCompanyLesson.subCategoryName,
            category_id: defaultCompanyCategory.id
        });
    }

    return res.status(200).
    json({
        success: true,
        data: defaultCategory,
        message: 'Category created successfully'
    });
});

module.exports = {
    create
};