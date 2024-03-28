const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    lesson_name: {
        type: String,
        required: [true, 'Lütfen kategori adını yazınız']
    },
    company_id: {
        type: String,
        required: [true, 'Firma bilgisi eksik']
    },
    lesson_photo: {
        type: String,
        default: 'default.jpg'
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Lesson', lessonSchema);