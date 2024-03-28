const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Lütfen adınızı yazınız']
    },
    email: {
        type: String,
        required: [true, 'Lütfen e-posta adresinizi yazınız'],
        unique: [true, 'Bu e-posta adresi kullanılıyor'],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Lütfden e-posta adresinizi yazınız.']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    company_id: {
        type: String,
    },
    password: {
        type: String,
        minlength: [6, 'Parolanız en az 6 karakter olmalıdır'],
        required: [true, 'Lütfen parolanızı yazınız'],
        select: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    profile_image: {
        type: String,
        default: 'default.jpg'
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});

userSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHextString = crypto.randomBytes(15).toString('hex');
    const resetPassswordToken = crypto.createHash('SHA256').update(randomHextString).digest('hex');

    console.log(resetPassswordToken);

    const { RESET_PASSWORD_EXPIRE } = process.env;

    this.resetPasswordToken = resetPassswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPassswordToken;
}

userSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;

    const payload = {
        id: this.id,
        name: this.name,
        company_id: this.company_id,
        role: this.role
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });

    return token;
};


userSchema.pre('save', function(next){
    if(!this.isModified('password')){
        console.log('parola degistirilmedi');
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) next(err);
            this.password = hash;
            next();
        });
    })
});




module.exports = mongoose.model('User', userSchema);