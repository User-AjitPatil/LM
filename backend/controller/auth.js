const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../models/db');

exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  connection.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, users) => {
      if (err || users.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }

      const user = users[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    }
  );
};
