const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pretty = require('express-prettify');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(pretty({ always: true }));
require('dotenv').config()
app.use("/api", (req,res) => {
   res.send(process.env);
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const book = req.body;
    book.id = books.length + 1;
    books.push(book);
    res.json(book);
});

app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = req.body;
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = book;
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
