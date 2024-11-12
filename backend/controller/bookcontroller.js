const connection = require('../models/db');

exports.addBook = (req, res) => {
  const { title, author, genre, year_of_publication } = req.body;
  
  connection.query(
    'INSERT INTO books (title, author, genre, year_of_publication) VALUES (?, ?, ?, ?)',
    [title, author, genre, year_of_publication],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding book' });
      }
      res.status(201).json({ message: 'Book added successfully' });
    }
  );
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year_of_publication } = req.body;
  
  connection.query(
    'UPDATE books SET title = ?, author = ?, genre = ?, year_of_publication = ? WHERE id = ?',
    [title, author, genre, year_of_publication, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating book' });
      }
      res.json({ message: 'Book updated successfully' });
    }
  );
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting book' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
};

exports.getBooks = (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM books WHERE 1=1';
  const params = [];

  if (genre) {
    sql += ' AND genre = ?';
    params.push(genre);
  }

  if (author) {
    sql += ' AND author = ?';
    params.push(author);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  connection.query(sql, params, (err, books) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching books' });
    }
    res.json(books);
  });
};
