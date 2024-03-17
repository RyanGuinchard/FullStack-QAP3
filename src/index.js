const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  if (req.body._method) {
    req.method = req.body._method;
  }
  next();
});

// Add logging middleware
app.use((req, res, next) => {
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  next();
});

// Add route files
const productsRouter = require("./routes/products");

//Mount the route file
app.use('/', productsRouter);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});