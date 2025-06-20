// server.js
const express = require('express');
const db = require('./db');


const app = express();
const PORT = 8080;



//  /api/dogs
app.get('/api/dogs', (req, res) => {
  const sql =
    `SELECT d.name AS dog_name, d.size
     JOIN Users u ON d.owner_id = u.user_id`;
  db.query('SELECT * FROM Dogs', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// /api/walkrequests/open
app.get('/api/walkrequests/open', (req, res) => {
  db.query("SELECT * FROM WalkRequests WHERE status = 'open'", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// /api/walkers/summary
app.get('/api/walkers/summary', (req, res) => {
  const sql = `
    SELECT u.user_id, u.username, COUNT(w.application_id) AS total_applications
    FROM Users u
    LEFT JOIN WalkApplications w ON u.user_id = w.walker_id
    WHERE u.role = 'walker'
    GROUP BY u.user_id, u.username;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
