const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const companyCategorySchema = new Schema({
    company_id: {
        type: String,
        required: [true, 'Firma bilgisi eksik']
    },
    category_name: {
        type: String,
        required: [true, 'Lütfen kategori adını yazınız']
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('CompanyCategory', companyCategorySchema);