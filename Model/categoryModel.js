const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
   name:{type:String, required:true}
  });

    const categoryModel = mongoose.model('Category',CategorySchema);

     module.exports = categoryModel;