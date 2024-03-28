const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type: String,
        required: [true, 'Lütfen firmanızın adını yazınız']
    },
    address: {
        type: String,
         required: [true, 'Lütfen firmanızın adresini yazınız']
        },
    phone: {
        type: String, 
        maxlength: [20, 'En fazla 20 karakter olabilir']
    },
    company_email: {
        type: String, 
        required: [true, 'Lütfen e-posta adresinizi yazınız'],
        unique: [true, 'Bu e-posta adresi kullanılıyor'],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Lütfden e-posta adresinizi yazınız.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    company_logo: {
        type: String,
        default: 'default.jpg'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    lat: {
        type: String,
    },
    lng: {
        type: String,
    }
});

module.exports = mongoose.model('Company', companySchema);