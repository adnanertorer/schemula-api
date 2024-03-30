const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const lessonEducatorSchema = mongoose.Schema({
    company_id: {
        type: String,
        required: [true, 'Firma bilgisi eksik']
    },
    lesson_id: {
        type: String,
        required: [true, 'Ders bilgisi eksik'],
    },
    lesson: {
        _id : {
            type: String,
            required: [true, 'Ders bilgisi eksik'],
        },
        lesson_name: {
            type: String,
            required: [true, 'Lütfen kategori adını yazınız']
        },
        lesson_photo: {
            type: String,
            default: 'default.jpg'
        },
    },
    staff_id: {
        type: String,
        required: [true, 'Personel bilgisi eksik'],
    },
    staff: {
        _id: {
            type: String,
            required: [true, 'Personel bilgisi eksik'],
        },
        name: {
            type: String,
            required: [true, 'Lütfen adını yazınız']
        },
        surname: {
            type: String,
            required: [true, 'Lütfen soyadını yazınız']
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
    }
});

module.exports = mongoose.model('LessonEducator', lessonEducatorSchema);