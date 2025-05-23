const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const categoryModel = require('./categoryModel');


const PostSchema = new Schema({
    title:{type:String, required:true},
    subtitle: {type:String, required:true},
    image: {type:String, required:true},
    description :{type:String},
    projectName:{type:String, required:true},
    detail:{type:String},
    category: {type:String, required: true},
    client:{type:String}

  });

  const postModel = mongoose.model('Post',PostSchema);
  module.exports = postModel;