const express = require("express");
const app = express();
const PORT = 3000;

// Add route files
const productsRouter = require("./routes/products");

//Mount the route file
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
