const path = require("path");
const mongoose = require("mongoose");

const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/home");
const authRoutes = require("./routes/auth")
const Cart = require("./models/cart");
// const { mongoConnect } = require("./utils/database");

// const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findOne()
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  const cart = req.user.cart;
  const cartCount = cart.items.reduce((count, p) => count + p.quantity, 0);
  res.locals.cartCount = cartCount;
  next();
});

app.use("/admin", adminRoutes);
app.use(authRoutes)
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "404 Not Found", path: "/404" });
});

mongoose
  .connect("mongodb://localhost:27017/artisan")
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          name: "Faruq",
          email: "test@gmail.com",
        });
        newUser.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
