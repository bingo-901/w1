const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Book = mongoose.model('Book', new mongoose.Schema({
  _id: String, title: String, published: Number, rating: Number, pages: Number
}));

app.use(express.json());

mongoose.connection.on('open', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', console.error);


app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send({ message: 'Book inserted', book });
  } catch (error) {
    res.status(500).send({ error: 'Failed to insert book', details: error.message });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books', details: error.message });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch book', details: error.message });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).send({ message: 'Book not found' });
    res.send({ message: 'Book updated', book });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update book', details: error.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    res.send({ message: 'Book deleted', book });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete book', details: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
