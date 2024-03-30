const asyncErrorWrapper = require('express-async-handler');
const LessonEducator = require('../models/LessonEducator');

const create = asyncErrorWrapper(async (req, res, next) => {

    const data = req.body;

    var lessonEducator = await LessonEducator.create({ 
        company_id: req.user.company_id,
        lesson: data.lesson,
        staff: data.staff
    });

    return res.status(200).
    json({
        success: true,
        data: lessonEducator,
        message: 'LessonEducator created successfully'
    });
});

const getById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var lessonEducator = await LessonEducator.findById(id);
    return res.status(200).
    json({
        success: true,
        data: lessonEducator,
        message: 'LessonEducator get successfully'
    });
});

const getList = asyncErrorWrapper(async (req, res, next) => {

    var lessonEducatorList = await LessonEducator.find({ company_id: req.user.company_id});

    return res.status(200).
    json({
        success: true,
        data: lessonEducatorList,
        message: 'LessonEducator list get successfully'
    });
});

const getListByLesson = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var lessonEducatorList = await LessonEducator.find({ company_id: req.user.company_id, lesson_id: id});

    return res.status(200).
    json({
        success: true,
        data: lessonEducatorList,
        message: 'LessonEducator list get successfully'
    });
});

const getListByEducator = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var lessonEducatorList = await LessonEducator.find({ company_id: req.user.company_id, staff_id: id});

    return res.status(200).
    json({
        success: true,
        data: lessonEducatorList,
        message: 'LessonEducator list get successfully'
    });
});

const remove = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.query;

    await LessonEducator.deleteOne({ id: id });

    return res.status(200).
    json({
        success: true,
        data: {},
        message: 'LessonEducator delete successfully'
    });
});

module.exports = {
    create,
    getById,
    getList,
    remove,
    getListByLesson,
    getListByEducator
};