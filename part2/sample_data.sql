-- Insert Users
INSERT INTO Users (username, email, password_hash, role) VALUES
('amanda434', 'amanda@example.com', 'hashed123', 'owner'),
('iresha623', 'iresha623@example.com', 'hashed456', 'walker');

INSERT INTO Dogs (owner_id, name, size)
VALUES
((SELECT user_id FROM Users WHERE username = 'amanda434'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'amanda434'), 'Bella', 'small');