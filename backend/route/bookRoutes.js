const express = require('express');
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/books', auth, bookController.addBook);
router.put('/books/:id', auth, bookController.updateBook);
router.delete('/books/:id', auth, bookController.deleteBook);
router.get('/books', bookController.getBooks);

module.exports = router;
