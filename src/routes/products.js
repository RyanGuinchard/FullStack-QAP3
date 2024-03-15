const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('List of products');
});

router.post('/', (req, res) => {
    res.send('Product added successfully');
});

router.put('/:id', (req, res) => {
    res.send(`Product with id ${req.params.id} updated successfully`);
});

router.delete('/:id', (req, res) => {
    res.send(`Product with id ${req.params.id} deleted successfully`);
});


module.exports = router;