const mongoose = require('mongoose');

const uri = 'mongodb+srv://ouaghlaniala:ala123456@cluster0.wshthjj.mongodb.net/My-DB?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
