const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "Nipper22$",
  port: 5432,
  database: "QAP3"
});

// Function to get all products
async function getAllProducts() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM products");
    return res.rows;
  } finally {
    client.release();
  }
}

// Function to get product by id
async function getProductById(product_id) {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM products WHERE product_id = $1', [product_id]);
      return res.rows[0];
    } finally {
      client.release();
    }
  }

// Function to insert a new product
async function insertProduct(name, price, stock_quantity) {
    const client = await pool.connect();
    try {
        const res = await client.query(
        "INSERT INTO products(name, price, stock_quantity) VALUES($1, $2, $3) RETURNING *",
        [name, price, stock_quantity]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

// Function to delete a product
async function deleteProduct(product_id) {
    const client = await pool.connect();
    try {
        const res = await client.query("DELETE FROM products WHERE product_id = " + product_id + " RETURNING *");
        return res.rows[0];
    } finally {
        client.release();
    }
}

// Function to update product
async function updateProduct(productId, name, price, quantity) {
    const client = await pool.connect();
    try {
        const res = await client.query(
        "UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *",
        [name, price, quantity, productId]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

// Function to patch product
async function patchProduct(product_id, updatedFields) {
    const client = await pool.connect();
    try {
        // Construct the SET clause dynamically based on the updated fields
        const setClause = Object.keys(updatedFields).map((key, index) => {
            return `${key} = $${index + 2}`;
        }).join(', ');

        // Prepare the values array with productId as the first element
        const values = [product_id, ...Object.values(updatedFields)];

        // Construct and execute the SQL query
        const result = await client.query(`UPDATE products SET ${setClause} WHERE product_id = $1 RETURNING *`, values);
        
        return result.rows[0];
    } finally {
        client.release();
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    insertProduct,
    deleteProduct,
    updateProduct,
    patchProduct
};