const User = require('../../models/User');
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if(!user){
        return next(new CustomError('Kullanıcı bulunamadı', 404));
    }

    next();
});

module.exports = {
    checkUserExist
}