const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
  category: String,
  title: String,
  description: String,
  contentType: String,
  size: Number,
  image: String,
});

module.exports = imageModel = mongoose.model('images', imageSchema);
