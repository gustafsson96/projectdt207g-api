const mongoose = require('mongoose');

// Model for table reservations
const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    partySize: {
        type: Number,
        required: true
    }, 
    dateTime: {
        type: Date,
        required: true
    },
    specialRequest: {
        type: String
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;