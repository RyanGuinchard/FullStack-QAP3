const express = require('express');
const router = express.Router();
const productsDAL = require('../../services/products.dal');

// Display all products
router.get('/', async (req, res) => {
    try {
        const products = await productsDAL.getAllProducts();
        res.render('index', { products: products });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send('Internal Server Error');
    }
});

// Display form to create a new product
router.get('/product/new', (req, res) => {
    res.render('new');
});

// Display a single product by ID
router.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productsDAL.getProductById(productId);
        if (product) {
            res.render('product', { product: product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Display form to edit a product
router.get('/product/edit/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productsDAL.getProductById(productId);
        if (product) {
            res.render('edit', { product: product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Create a new product
router.post('/product', async (req, res) => {
    try {
        const { name, price, quantity: stock_quantity } = req.body;
        const newProduct = await productsDAL.insertProduct(name, price, stock_quantity);
        res.redirect('/');
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send('Internal Server Error');
    }
});

// Update a product
router.patch('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        let updatedFields = { ...req.body };
        delete updatedFields._method; // Exclude the _method field
        await productsDAL.patchProduct(productId, updatedFields);
        res.redirect('/');
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send('Internal Server Error');
    }
});

// Delete a product
router.delete('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await productsDAL.deleteProduct(productId);
        res.redirect('/');
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
