const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const staffTypeSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'Erişim yok']
    },
    staff_type_name: {
        type: String,
        required: [true, 'Lütfen personel türünü yazınız']
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('StaffType', staffTypeSchema);