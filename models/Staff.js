const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    company_id: {
        type: String,
        required: [true, 'Firma bilgisi eksik']
    },
    name: {
        type: String,
        required: [true, 'Lütfen adını yazınız']
    },
    surname: {
        type: String,
        required: [true, 'Lütfen soyadını yazınız']
    },
    identity_number: {
        type: String,
        maxLength: [11, 'En fazla 11 karakter olabilir'],
        minLength: [11, 'En az 11 karakter olabilir'],
        required: [true, 'Lütfen kimlik numarasını yazınız']
    },
    email: {
        type: String,
        required: [true, 'Lütfen e-posta adresinizi yazınız'],
        unique: [true, 'Bu e-posta adresi kullanılıyor'],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Lütfen e-posta adresinizi doğru formatta yazınız.']
    },
    gsm: {
        type: String,
        maxLength: [20, 'En fazla 20 karakter olabilir'],
        required: [true, 'Lütfen telefon numarasını yazınız']
    },
    address: {
        type: String,
        required: [true, 'Lütfen adres bilgisini yazınız']
    },
    work_start_date: {
        type: Date,
        required: [true, 'Lütfen işe başlama tarihini']
    },
    work_finish_date: {
        type: Date
    },
    birthday: {
        type: Date
    },
    payment_type_name: {
        type: String,
        required: [true, 'Lütfen maaş türünü seçiniz']
    },
    staff_type_name: {
        type: String,
        required: [true, 'Lütfen çalışan türünü seçiniz']
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Staff', staffSchema);