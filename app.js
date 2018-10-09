const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  MongoStore = require("connect-mongo")(session),
  PORT = process.env.PORT || 3000,
  app = express();

// mongodb connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://0.0.0.0/wino");
const db = mongoose.connection;
// mongo error
db.on("error", console.error.bind(console, "connection error:"));

// Use sessions for tracking logins
app.use(session({
  secret: "Matt loves you",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from /public
app.use(express.static(__dirname + "/public"));

// View engine setup
app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");

// Include routes
const routes = require("./lib/routes/index");
app.use("/", routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// Error handler
// Define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.render("error", {
    message: err.message
  });
});

// Listen on port 3000
app.listen(PORT, function () {
  console.log(`Express app listening on port ${ PORT }`);
});