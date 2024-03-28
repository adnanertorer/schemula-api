const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');


const getUser = asyncErrorWrapper(async (req, res, next) => {
    /*const { id } = req.params;

    const user = await User.findById(id);*/
    console.log(req);

    return res.status(200).json({success: true, message: 'Successful', data: req.user});
});


module.exports = {
    getUser
}