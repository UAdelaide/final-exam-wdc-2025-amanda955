// server.js
const express = require('express');
const db = require('./db');


const app = express();
const PORT = 8080;



//  /api/dogs
app.get('/api/dogs', (req, res) => {
  console.log('GET /api/dogs endpoint called');
  const sql = `
    SELECT d.name AS dog_name, d.size, u.username AS owner_username
    FROM Dogs d
    JOIN Users u ON d.owner_id = u.user_id;
  `;
  const sql2 = `
    SELECT name, size, owner_id FROM Dogs;
  `;
  db.query(sql2, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
});

// /api/walkrequests/open
app.get('/api/walkrequests/open', (req, res) => {
  console.log('GET /api/walkrequests/open endpoint called');
  const sql = `
    SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username
    FROM WalkRequests wr
    JOIN Dogs d ON wr.dog_id = d.dog_id
    JOIN Users u ON d.owner_id = u.user_id
    WHERE wr.status = 'open';
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// /api/walkers/summary
app.get('/api/walkers/summary', (req, res) => {
  console.log('GET /api/walkers/summary endpoint called');
  const sql = `
    SELECT u.username AS walker_username, COUNT(r.rating_id) AS total_ratings,
    ROUND(AVG(r.rating), 1) AS average_rating,
    COUNT(CASE WHEN wr.status = 'completed' THEN 1 END) AS completed_walks
    FROM Users u
    LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id AND wa.status = 'accepted'
    LEFT JOIN WalkRequests wr ON wa.request_id = wr.request_id
    LEFT JOIN WalkRatings r ON wr.request_id = r.request_id
    WHERE u.role = 'walker'
    GROUP BY u.user_id, u.username;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
