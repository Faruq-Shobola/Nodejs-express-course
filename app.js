const path = require("path");

const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/home");
const Cart = require("./models/cart");
const sequelize = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const cart = Cart.getCart();
  const cartCount = cart.products.reduce((count, p) => count + p.qty, 0);
  res.locals.cartCount = cartCount;
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "404 Not Found", path: "/404" });
});

sequelize
  .sync()
  .then((result) => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error occured");
  });
