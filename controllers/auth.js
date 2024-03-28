const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const {sendJwtToClient} = require('../helpers/authorization/token-helpers');
const {validateUserInput, comparePassword} = require('../helpers/input-validations/input-helpers');
const sendEmail = require('../helpers/libraries/sendEmail');

const register = asyncErrorWrapper(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    const defaultUser = await User.create({
        name,
        email,
        password,
        role
    });

    sendJwtToClient(defaultUser, res);
});

const getUser = (req, res, next) =>{
    res.json({success: true, data: {
        id: req.user.id,
        name: req.user.name
    }});
}

const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    console.log(email, password);

    if(!validateUserInput(email, password)){
        return next(new CustomError('Lütfen tüm bilgileri giriniz', 400));
    }

    const user = await User.findOne({email}).select('+password');
    
    if(!comparePassword(password, user.password)){
        return next(new CustomError('Kullanıcı adınız ya da parolanız yanlış!', 400));
    }

    sendJwtToClient(user, res);
});

const errorTest = (req, res, next) => {
    return next(new CustomError('Custom error message', 400));
};

const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;

    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now),
        secure: NODE_ENV === "development" ? false : true
    })
    .json({
        success: true,
        message: 'Çıkış yapıldı'
    });
});

const imageUpload = asyncErrorWrapper(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id, {
        'profile_image': req.savedProfileImage // bu bilgi middleware ile geliyor
    },{
        new: true, // guncellenmis yeni bilgiyi gormek icin eklemek zorundayız
        runValidators: true
    });

    res.status(200).json({success: true, message: 'Upload Successful', data: user});
});

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {

    const resetEmail = req.body.email;

    const user = await User.findOne({email: resetEmail});

    if(!user){
        return next(new CustomError('Kullanıcı bulunamadı', 400));
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    console.log(resetPasswordToken);

    await user.save();

    const resetPasswordUrl = `http:://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken};`

    const mailTemplate = `
        <h3>Parola Sıfırlama</h3>
        <p>Parola sıfırlama linkiniz ${resetPasswordUrl}. Parola sıfırlama işlemini 1 saat içinde yapmanız gerekmektedir.</p>
    `;

    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: 'Parola Sıfırlama İsteği',
            html: mailTemplate
        });

        res.status(200).json({success: true, message: 'Parola resetleme kodu e-posta adresinize gönderildi'});
    } catch (error) {
        console.log(error);
        user.resetPasswordExpire = null;
        user.resetPasswordToken = null;
        
        await user.save();

        return next(new CustomError('Parola sıfırlama maili gönderilemedi', 500));
    }    
});

const resetPassword = asyncErrorWrapper(async (req, res, next) => {

    const { resetPasswordToken } = req.query;
    const [ password ] = req.body;

    if(!resetPasswordToken){
        return next(new CustomError('Hatalı reset token', 400));
    }

    const user = await User.findOne({
        resetPasswordToken: resetPassword,
        resetPasswordExpire: {$gt :Date.now()}
    });

    if(!user){
        return next(new CustomError('Kullanıcı bulunamadı!', 404));
    }

    user.password = password;
    user.resetPasswordExpire = null;
    user.resetPasswordToken = null;

    await user.save();

    res.status(200).json({success: true, message: 'Parola resetleme başarılı!'});
});

module.exports = {
    register,
    errorTest,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword
};