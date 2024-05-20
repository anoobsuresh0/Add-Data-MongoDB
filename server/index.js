// index.js
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const { UserModel, MarksModel } = require('./models/user.js');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.post('/add-user', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new UserModel({ name, email });
  await newUser.save();
  res.send("User added successfully");
});

app.post('/add-marks', async (req, res) => {
  const { userId, subject, marks } = req.body;
  const newMarks = new MarksModel({ userId, subject, marks });
  await newMarks.save();
  res.send("Marks added successfully");
});

app.get('/users', async (req, res) => {
  const response = await UserModel.find();
  return res.json({ users: response });
});

app.get('/marks', async (req, res) => {
  const response = await MarksModel.find().populate('userId', 'name email');
  return res.json({ marks: response });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
