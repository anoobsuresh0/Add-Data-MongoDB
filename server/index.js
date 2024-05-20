

const express = require('express');
const connectDB = require('./db.js');


const UserModel = require('./models/user.js');

const cors = require('cors');




const app = express();

app.use(express.json());

app.use(cors());

connectDB();


app.get('/',async(req,res)=>{
    const response =await UserModel.find()
    return res.json({user: response})
})


app.post('/add-user',async(req,res)=>{
    const {name,email} = req.body;
    const newUser = new UserModel({name,email});
    await newUser.save();
    res.send("User added successfully")
})


app.listen(3000,()=>{
    console.log("App is running on port 3000")
})