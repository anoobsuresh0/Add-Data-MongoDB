const express = require('express');
const router = express.Router();
const Table = require('./models/table.js');


router.get('/', async (req, res) => {
    try {
      const tables = await Table.find();
      res.json(tables);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    const table = new Table({
      name: req.body.name,
      columns: req.body.columns,
    });
  
    try {
      const newTable = await table.save();
      res.status(201).json(newTable);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = router;
