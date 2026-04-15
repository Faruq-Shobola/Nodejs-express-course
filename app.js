const path = require("path");

const express = require("express");

const { engine } = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/home");

const app = express();

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: 'main-layout',
    layoutsDir: 'views/layouts'
  }),
);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "404 Not Found" });
});

app.listen(3000);
