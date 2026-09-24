const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const Cart = require("./models/cart");
// const { mongoConnect } = require("./utils/database");

// const Product = require("./models/product");
const User = require("./models/user");

const MONGODB_URI = "mongodb://localhost:27017/artisan";

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log("Session store error", error);
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "my-super-long-secret-key-that-should-be-in-env",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedin || false;
  const cart = req.user ? req.user.cart : { items: [] };
  const cartCount = cart.items
    ? cart.items.reduce((count, p) => count + p.quantity, 0)
    : 0;
  res.locals.cartCount = cartCount;
  next();
});

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "404 Not Found", path: "/404" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
