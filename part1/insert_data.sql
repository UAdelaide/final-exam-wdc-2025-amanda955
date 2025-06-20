-- five users
INSERT INTO Users (username, email, password_hash, role)
VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('amanda434', 'amanda@example.com', 'amandahash434', 'owner'),
('iresha623', 'iresha@example.com', 'ireshahash623', 'walker');

-- five dogs
INSERT INTO Dogs (owner_id, name, size)
VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'amanda434'), 'Ben', 'small'),
((SELECT user_id FROM Users WHERE username = 'amanda434'), 'Rex', 'medium'),
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Tom', 'small');

-- five walk requests
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')),
 '2025-06-10 08:00:00', 30, 'Parklands', 'open'),

((SELECT dog_id FROM Dogs WHERE name = 'Bella' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')),
 '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),

((SELECT dog_id FROM Dogs WHERE name = 'Ben' AND owner_id = (SELECT user_id FROM Users WHERE username = 'amanda434')),
 '2025-06-10 10:30:00', 30, 'Cranbrook Ave', 'completed'),

((SELECT dog_id FROM Dogs WHERE name = 'Rex' AND owner_id = (SELECT user_id FROM Users WHERE username = 'amanda434')),
 '2025-06-10 11:30:00', 30, 'Victor Ave', 'open'),

((SELECT dog_id FROM Dogs WHERE name = 'Tom' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')),
 '2025-06-10 08:30:00', 45, 'Glen Ave', 'accepted');
