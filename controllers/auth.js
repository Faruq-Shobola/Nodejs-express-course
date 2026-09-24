const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getLogin = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? message[0] : null;
  res.render("auth/login", {
    path: "/auth",
    docTitle: "Login",
    errorMessage: message,
  });
};

const getSignup = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? message[0] : null;
  res.render("auth/signup", {
    path: "/auth",
    docTitle: "Sign up",
    errorMessage: message,
  });
};

const postSignup = (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect("/signup");
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "An account with this email already exists.");
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
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      return bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedin = true;
          req.session.userId = user._id.toString();
          return req.session.save((err) => {
            if (err) console.log(err);
            return res.redirect("/admin/dashboard");
          });
        }
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      });
    })
    .catch((err) => console.log(err));
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

module.exports = {
  getLogin,
  getSignup,
  postSignup,
  postLogin,
  postLogout,
};
