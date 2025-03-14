const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return this.startDate ? value > this.startDate : true;
            },
            message: 'End date must be after the start date'
        }
    },
    routes: [{
        location: { type: String, required: true }
    }],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Calendar', CalendarSchema);
