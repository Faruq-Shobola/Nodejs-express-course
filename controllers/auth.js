const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/auth",
    docTitle: "Login",
  });
};

const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/auth",
    docTitle: "Sign up",
  });
};

const postSignup = (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.redirect("/signup");
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => res.redirect("/login"));
    })
    .catch((err) => console.log(err));
};

const postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }

      return bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          return res.redirect("/admin/dashboard");
        }
        return res.redirect("/login");
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getLogin,
  getSignup,
  postSignup,
  postLogin,
};
