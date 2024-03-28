const ParticipantType = require('../models/ParticipantType');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const { participant_type_name } = req.body;

    var defaultParticipant = await ParticipantType.create({ 
        participant_type_name,
        company_id: req.user.company_id
    });

    return res.status(200).
    json({
        success: true,
        data: defaultParticipant,
        message: 'ParticipantType created successfully'
    });
});

const getAll = asyncErrorWrapper(async (req, res, next) => {
    var participantTypes = await ParticipantType.find({ company_id : req.user.company_id });

    return res.status(200).
    json({
        success: true,
        data: participantTypes,
        message: 'ParticipantType'
    });
});

const remove = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.query;

    await ParticipantType.deleteOne({ id: id });

    return res.status(200).
    json({
        success: true,
        data: {},
        message: 'ParticipantType delete successfully'
    });
});

const getById = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    var defaultModel = await ParticipantType.findById(id);
    return res.status(200).
    json({
        success: true,
        data: defaultModel,
        message: 'Participant type get successfully'
    });
});

module.exports = {
    create,
    getAll,
    remove,
    getById
};