const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchasesSchema = new Schema({

    userId:{type: String},
    purchasesId:{ type: String, required: true},
    total:{type: String, required: true},
    paymentMethod:{type:String}


}, {
    timestamps: true,
});

const Purchases = mongoose.model('Purchases', purchasesSchema);

module.exports = Purchases;