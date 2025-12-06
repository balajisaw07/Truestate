const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    transactionId: { type: Number, index: true },
    date: { type: Date, index: true },
    customerId: { type: String, index: true },
    customerName: { type: String, index: true },
    phoneNumber: { type: String, index: true },
    gender: { type: String, index: true },
    age: { type: Number, index: true },
    customerRegion: { type: String, index: true },
    customerType: { type: String },
    productId: { type: String },
    productName: { type: String },
    brand: { type: String },
    productCategory: { type: String, index: true },
    tags: [{ type: String }],
    quantity: { type: Number },
    pricePerUnit: { type: Number },
    discountPercentage: { type: Number },
    totalAmount: { type: Number },
    finalAmount: { type: Number },
    paymentMethod: { type: String, index: true },
    orderStatus: { type: String },
    deliveryType: { type: String },
    storeId: { type: String },
    storeLocation: { type: String },
    salespersonId: { type: String },
    employeeName: { type: String }
}, {
    timestamps: true
});

// Text index for full-text search on customer name and phone
saleSchema.index({ customerName: 'text', phoneNumber: 'text' });

// Compound indexes for common query patterns
saleSchema.index({ customerRegion: 1, gender: 1, productCategory: 1 });
saleSchema.index({ date: -1 });

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
