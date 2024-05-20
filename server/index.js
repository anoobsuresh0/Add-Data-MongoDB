
const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const {TableModel } = require('./models/user.js');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.get('/api/tables', async (req, res) => {
  try {
    const tables = await TableModel.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.post('/api/tables', async (req, res) => {
  const { name, columns } = req.body;
  try {
    
    const newTable = new TableModel({ name, columns });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});










app.post('/api/columns/:tableName', async (req, res) => {
  const { tableName } = req.params;
  const { name, dataType } = req.body;
  try {
    const table = await TableModel.findOne({ name: tableName });
    if (!table) return res.status(404).json({ message: 'Table not found' });
    table.columns.push({ name, dataType });
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




app.listen(3000, () => {
  console.log("App is running on port 3000");
});
