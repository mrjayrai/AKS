const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{ type: String,required: true},
    barcode:{type : String, required:true},
    description:{type: String,required:true},
    price:{type:Number,required:true},
    measuringUnit:{type:String,required:true},
    images:[{type:String}],
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    wholeSalePrice:{type:Number,required:true},
    thresholdPrice:{type:Number,required:true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}); 

productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product',productSchema);