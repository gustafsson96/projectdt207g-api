const mongoose = require('mongoose');

// Model for menu items
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required.']
    },
    ingredients: {
        type: [String],
        required: true,
        validate: [array => array.length > 0, 'At least one ingredient is required.']
    },
    price: {
        type: Number,
        required: [true, 'Price is required.']
    },
    vegan_alternative: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;