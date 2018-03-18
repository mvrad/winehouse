const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  mid = require("../bin/middleware");

// GET /collection
router.get("/collection", mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render("collection", { title: "Collection" });
        }
      });
});

// GET /profile
router.get("/profile", mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render("profile", { title: "Profile", name: user.name, favorite: user.favoriteWine });
        }
      });
});

// GET /logout
router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

// GET /login
router.get("/login", mid.loggedOut, function(req, res, next) {
  return res.render("login", { title: "Log In"});
});

// POST /login
router.post("/login", function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        const err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect("/collection");
      }
    });
  } else {
    const err = new Error("Email and password are required.");
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get("/register", mid.loggedOut, function(req, res, next) {
  return res.render("register", { title: "Sign Up" });
});

// POST /register
router.post("/register", function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteWine &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        const err = new Error("Passwords do not match.");
        err.status = 400;
        return next(err);
      }

      // create object with form input
      var userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteWine: req.body.favoriteWine,
        password: req.body.password
      };

      // use schema"s `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect("/profile");
        }
      });

    } else {
      const err = new Error("All fields required.");
      err.status = 400;
      return next(err);
    }
})

// GET /
router.get("/", function(req, res, next) {
  return res.render("index", { title: "Home" });
});

// GET /about
router.get("/about", function(req, res, next) {
  return res.render("about", { title: "About" });
});

module.exports = router;