import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', genre: '', year: '' });
  const [filters, setFilters] = useState({ genre: '', author: '' });

  // Fetch books with filters and pagination
  const fetchBooks = async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { page, genre: filters.genre, author: filters.author },
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Add a new book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', formData);
      fetchBooks(); // Refresh book list after adding
      setFormData({ title: '', author: '', genre: '', year: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks(); // Refresh book list after deleting
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, [filters]);

  return (
    <div className='flex flex-col items-center mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center mb-6 uppercase'>Library Management System</h1>

      {/* Add Book Form */}
      <form onSubmit={handleSubmit} className='bg-slate-700 shadow-md rounded px-8 py-6 mb-6 w-full max-w-lg'>
        <h2 className='text-2xl text-slate-950 font-bold mb-2'>Add a New Book</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className='mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <input
              type='text'
              name='author'
              placeholder='Author'
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              className='mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <input
              type='text'
              name='genre'
              placeholder='Genre'
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              required
              className='mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <input
              type='number'
              name='year'
              placeholder='Year of Publication'
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
              className='mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded'
            />
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200'
        >
          Add Book
        </button>
      </form>

      {/* Filters */}
      <div className='bg-slate-700 shadow-md rounded px-8 py-6 mb-6 w-full max-w-lg'>
        <h2 className='text-2xl text-slate-950 font-bold mb-2'>Filter Books</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <input
              type='text'
              name='author'
              placeholder='Filter by Author'
              value={filters.author}
              onChange={(e) => setFilters({ ...filters, author: e.target.value })}
              className='mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <input
              type='text'
              name='genre'
              placeholder='Filter by Genre'
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className='mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded'
            />
          </div>
        </div>
        <button
          onClick={() => fetchBooks()}
          className='mt-4 w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200'
        >
          Apply Filters
        </button>
      </div>

      {/* Book List */}
      <div className='w-full max-w-lg'>
      <h2 className='text-xl font-semibold mb-4'>Book List</h2>
        {books.length > 0 ? (
          <ul className='bg-slate-700 text-black shadow-md rounded p-4'>
            {books.map((book) => (
              <li key={book.id} className='flex justify-between items-center border-b border-gray-200 py-2'>
                <div>
                  <strong>{book.title}</strong> by {book.author} ({book.genre}, {book.year})
                </div>
                <button
                  onClick={() => deleteBook(book.id)}
                  className='bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 transition duration-200'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-600 text-center'>No books found</p>
        )}
      </div>
    </div>
  );
};

export default Library;
