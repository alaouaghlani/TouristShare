const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
  {
    title:String,
    description: String,
    photo:String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Post', postSchema);