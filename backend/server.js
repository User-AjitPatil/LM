const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON data in requests

// MySQL Database Connection  
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'ajitpatil@123', 
  database: 'librarymanagement' 
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: 'Title, author, and year are required' });
  }
  const query = 'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author, genre, year], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      return res.status(500).json({ message: 'Failed to add book', error: err.message });
    }
    res.status(201).json({ message: 'Book added successfully' });
  });
});

// Fetch books with pagination and filtering
app.get('/api/books', (req, res) => {
  const { genre, author, page = 1 } = req.query;
  const limit = 10; // Number of books per page
  const offset = (Number(page) - 1) * limit;
  let query = 'SELECT * FROM books WHERE 1=1';
  const queryParams = [];

  // Apply genre and author filters
  if (genre) {
    query += ' AND genre = ?';
    queryParams.push(genre);
  }
  if (author) {
    query += ' AND author = ?';
    queryParams.push(author);
  }

  query += ' LIMIT ? OFFSET ?';
  queryParams.push(limit, offset);

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ message: 'Failed to fetch books' });
    }
    res.json({ books: results });
  });
});

// Update book details
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year } = req.body;
  const query = 'UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?';
  db.query(query, [title, author, genre, year, id], (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).json({ message: 'Failed to update book' });
    }
    res.json({ message: 'Book updated successfully' });
  });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ message: 'Failed to delete book' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});

// signup
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const checkUserQuery = 'SELECT * FROM user WHERE email = ?';
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (result.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    const insertUserQuery = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Failed to sign up user', error: err.message });
      }
      res.status(201).json({ message: 'User signed up successfully' });
    });
  });
});

// login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const query = 'SELECT * FROM user WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not registered with us, please register first.' });
    }
    const user = result[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials, please try again.' });
    }
    res.status(200).json({ message: 'Login successful!' });
  });
});


// Start the server
const PORT = 5000; // Your backend port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
