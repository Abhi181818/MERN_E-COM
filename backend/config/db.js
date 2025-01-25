const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://abhishek:1234@cluster0.afotl22.mongodb.net/ecom'
async function connectDb() {
    await mongoose.connect(mongoURI).then(() => console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}

module.exports = connectDb 
