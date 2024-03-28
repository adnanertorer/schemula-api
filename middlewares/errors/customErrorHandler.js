const CustomError = require('../../helpers/error/CustomError');

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if(err.name === 'SyntaxError'){
        customError = new CustomError('Unexpected SyntaxError', 400);
    }

    if(err.name === 'ValidationError'){
        customError = new CustomError(err, 400);
    }

    if(err.name === 'CastError'){
        customError = new CustomError('Format doğru değil', 400);
    }

    res.status(customError.status || 500).json({status: false, message: customError.message});
};

module.exports = customErrorHandler;