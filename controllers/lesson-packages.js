const LessonPackage = require('../models/LessonPackage');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {

    const data = req.body;

    var defaultPackage = await LessonPackage.create({ 
        company_id: req.user.company_id,
        lesson_id: data.lesson_id,
        participant_type_id : data.participant_type_id,
        package_name: data.package_name,
        seance_count: data.seance_count,
        seance_price: data.seance_price,
        package_price: data.package_price,
        discount: data.discount,
        description: data.description,
        max_capacity: data.max_capacity,
        participant_type: data.participant_type
    });

    return res.status(200).
    json({
        success: true,
        data: defaultPackage,
        message: 'LessonPackage created successfully'
    });
});

const getById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var defaultPackage = await LessonPackage.findById(id);
    return res.status(200).
    json({
        success: true,
        data: defaultPackage,
        message: 'Package get successfully'
    });
});

const getList = asyncErrorWrapper(async (req, res, next) => {

    var packageList = await LessonPackage.find({ company_id: req.user.company_id});

    return res.status(200).
    json({
        success: true,
        data: packageList,
        message: 'Package list get successfully'
    });
});

const getListByLesson = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    var packageList = await LessonPackage.find({ company_id: req.user.company_id, lesson_id: id});

    return res.status(200).
    json({
        success: true,
        data: packageList,
        message: 'Package list get successfully'
    });
});

const remove = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.query;

    await LessonPackage.deleteOne({ id: id });

    return res.status(200).
    json({
        success: true,
        data: {},
        message: 'Package delete successfully'
    });
});

module.exports = {
    create,
    getById,
    getList,
    remove,
    getListByLesson
};