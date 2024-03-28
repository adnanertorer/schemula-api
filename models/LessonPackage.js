const { default: mongoose } = require("mongoose");
const ParticipantType = require('./ParticipantType');

const Schema = mongoose.Schema;

const lessonPackageSchema = new Schema({
    company_id: {
        type: String,
        required: [true, 'Firma bilgisi eksik']
    },
    lesson_id: {
        type: String,
        required: [true, 'Ders bilgisi eksik']
    },
    participant_type_id: {
        type: String,
        required: [true, 'Katılımcı türünü seçiniz']
    },
    participant_type: {
        _id: {
            type: String,
        },
        participant_type_name: {
            type: String,
            required: [true],
            enum: ['Yetişkin', 'Çocuk', 'Genel']
        },
        is_active: {
            type: Boolean,
            default: true
        },
    },
    package_name: {
        type: String,
        required: [true, 'Paket adını seçiniz']
    },
    seance_count: {
        type: Number,
        required: [true, 'Seans sayısınız seçiniz']
    },
    seance_price: {
        type: Number,
        required: [true, 'Seans ücretini yazınız']
    },
    package_price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    description: {
        type: String,
    },
    max_capacity: {
        type: Number,
        required: [true, 'Lütfen maksimum öğrenci sayısını yazınız']
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('LessonPackage', lessonPackageSchema);