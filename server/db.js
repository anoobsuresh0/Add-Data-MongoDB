const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://admin:admin123@culster1.srr8hop.mongodb.net/task?retryWrites=true&w=majority&appName=Culster1', 
        
        );
        console.log(`MongoDb connected`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};


module.exports = connectDB;