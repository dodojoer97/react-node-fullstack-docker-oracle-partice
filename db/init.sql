CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO items (id, name) VALUES
  (1, 'Apple'),
  (2, 'Banana'),
  (3, 'Orange')
ON DUPLICATE KEY UPDATE name = VALUES(name);
