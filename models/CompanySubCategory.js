const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const companySubCategorySchema = new Schema({
    company_id: {
        type: String,
        required: [true, 'Firma bilgisi eksik']
    },
    sub_category_name: {
        type: String,
        required: [true, 'Lütfen kategori adını yazınız']
    },
    category_id: {
        type: String,
        required: [true, 'Lütfen bir kategori seçiniz']
    },
    is_active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('CompanySubCategory', companySubCategorySchema);