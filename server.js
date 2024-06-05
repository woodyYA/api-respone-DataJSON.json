// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Endpoint to get all data
app.get('/api/test/list', (req, res) => {
  // Read the JSON file
  fs.readFile(path.join(__dirname, 'DataJSON.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    let jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

// Endpoint to get data filtered by userId
app.get('/api/test/list/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  // Read the JSON file
  fs.readFile(path.join(__dirname, 'DataJSON.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    let jsonData = JSON.parse(data);

    // Filter by userId if provided
    jsonData = jsonData.filter(item => item.userId === userId);

    res.json(jsonData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
