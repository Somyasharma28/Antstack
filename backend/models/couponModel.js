const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

    code: {
        type: String,
        minlength: [8, 'Coupon Code length should be equal to 8'],
        maxlength: [8, 'Coupon Code length should be equal to 8'],
        trim: true,
        unique: true,
        required: [true, 'Coupon Code is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is required']
    },
    minAmtCode: {
        type: Number,
        required: [true, 'Minimum Amount is required'],
        trim: true
    },
    discType: {
        type: String,
        minlength: [1, 'Discount Type length should be equal to 1'],
        maxlength: [1, 'Discount Type length should be equal to 1'],
        trim: true,
        required: [true, 'Discount Type is required'],
        lowercase: true,
    },
    flatDiscount: {
        type: Number,
        trim: true
    },
    percentDiscount: {
        type: Number,
        trim: true,
        min: [0, 'Percentage should be between 0 to 100'],
        max: [100, 'Percentage should be between 0 to 100']
    },
    maxPercentageAmount: {
        type: Number,
        trim: true
    }
});



const couponModel = mongoose.model("Coupon", couponSchema);

module.exports = couponModel;