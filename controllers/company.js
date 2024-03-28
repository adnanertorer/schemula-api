const Company = require('../models/Company');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/token-helpers');


const create = asyncErrorWrapper(async (req, res, next) => {
    const { companyUser } = req.body;
    
    var defaultCompany = await Company.create({ 
        name: companyUser.company.name, 
        address: companyUser.company.address,
        phone: companyUser.company.phone,
        company_email: companyUser.company.company_email,
        lat: companyUser.company.lat,
        lng: companyUser.company.lng
    });

    const defaultUser = await User.create({
        name: companyUser.user.name,
        email: companyUser.user.email,
        password: companyUser.user.password,
        role: "user",
        company_id: defaultCompany.id
    });

    return sendJwtToClient(defaultUser, res);
});

module.exports = {
    create
};