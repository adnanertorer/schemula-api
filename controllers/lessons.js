const Lesson = require('../models/Lesson');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const { lesson_name } = req.body;

    var defaultLesson = await Lesson.create({ 
        lesson_name,
        company_id: req.user.company_id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultLesson,
        message: 'Lesson created successfully'
    });
});

const getById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var defaultLesson = await Lesson.findById(id);
    return res.status(200).
    json({
        success: true,
        data: defaultLesson,
        message: 'Lesson get successfully'
    });
});

const getList = asyncErrorWrapper(async (req, res, next) => {

    var lessonList = await Lesson.find({ company_id: req.user.company_id});

    return res.status(200).
    json({
        success: true,
        data: lessonList,
        message: 'Lesson list get successfully'
    });
});

const remove = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.query;

    await Lesson.deleteOne({ id: id });

    return res.status(200).
    json({
        success: true,
        data: {},
        message: 'Lesson delete successfully'
    });
});

module.exports = {
    create,
    getById,
    getList,
    remove
};