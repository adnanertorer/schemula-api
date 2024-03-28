const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const participantTypeSchema = new Schema({
    company_id: {
        type: String,
        required: [true, 'Erişim yok']
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
});

module.exports = mongoose.model('ParticipantType', participantTypeSchema);