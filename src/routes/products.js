const express = require('express');
const router = express.Router();

let products = [
        {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        quantity: 1
    },
    {
        id: 2,
        name: 'Product 2',
        price: 20.99,
        quantity: 2
    },
    {
        id: 3,
        name: 'Product 3',
        price: 30.99,
        quantity: 3
    }
];

function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Display all products
router.get('/', (req, res) => {
    res.render('index', { products: products });
});

// Display form to create a new product
router.get('/product/new', (req, res) => {
    res.render('new');
});

// Display a single product
router.get('/product/:id', (req, res) => {
    let product = getProductById(req.params.id);
    if (product) {
        res.render('product', { product: product });
    } else {
        res.status(404).send('Product not found');
    }
});

// Display form to edit a product
router.get('/product/edit/:id', (req, res) => {
    let product = getProductById(req.params.id);
    if (product) {
        res.render('edit', { product: product });
    } else {
        res.status(404).send('Product not found');
    }
});

// Create a new product
router.post('/product', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    };
    products.push(newProduct);
    res.redirect('/');
});

// Update a product
router.patch('/product/:id', (req, res) => {
    const productID = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productID);
    if (productIndex !== -1) {
        products[productIndex].name = req.body.name;
        products[productIndex].price = req.body.price;
        products[productIndex].quantity = req.body.quantity;
        res.redirect('/');
    } else {
        res.status(404).send('Product not found');
    }
});

// Delete a product
router.delete('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.redirect('/');
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;