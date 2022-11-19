const mongoose = require('mongoose');
const Schema =mongoose.Schema
const postSchema = new Schema({
    name:String,
    location:String,
    likes:{type:Number,default:0},
    description: String,
    postImage: String,
    date: Date
    }
    )
const post = mongoose.model('post', postSchema);
module.exports=post