const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    UPI: { type: String, required: true },
    nameonupi: { type: String, required: true },
    password: { type: String, required: true },
    walletbalance: { type: Number, default: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', userSchema);
