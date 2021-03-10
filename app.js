const express = require("express"),
  bodyParser = require("body-parser"),
  // mongoose = require("mongoose"),
  // session = require("express-session"),
  // MongoStore = require("connect-mongo")(session),
  // helmet = require("helmet"),
  // csp = require("helmet-csp"),
  referrerPolicy = require("referrer-policy"),
  expiryDate = new Date(Date.now() + 60 * 60 * 1000),
  PORT = process.env.PORT || 3000,
  app = express();

// Helmet
// app.use(helmet());

// CSP middleware
// app.use(csp({
//   directives: {
//     upgradeInsecureRequests: true,
//     workerSrc: false
//   },
//   loose: false,
//   reportOnly: false,
//   setAllHeaders: true,
//   disableAndroid: false,
//   browserSniff: true
// }));

// Referrer policy
app.use(referrerPolicy());

// Feature policy
// app.use(helmet.featurePolicy({
//   features: {
//     syncXhr: ["'none'"]
//   }
// }));

// MongoDB connection
// const db = mongoose.connection;
// mongoose.connect(process.env.ATLAS_URI || "mongodb://0.0.0.0/wino", {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });
// Mongo error
// db.on("error", console.error.bind(console, "connection error:"));

// Use sessions for tracking logins
// app.set("trust proxy", 1);
// app.use(session({
//   secret: "Matt loves you",
//   name: "sessionId",
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: db
//   }),
//   cookie: {
//     secure: true,
//     httpOnly: true,
//     maxAge: expiryDate
//   }
// }));

// Make user ID available in templates
// app.use(function (req, res, next) {
//   res.locals.currentUser = req.session.userId;
//   next();
// });

// Parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from /public
app.use(express.static(__dirname + "/public"));

// View engine setup
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// Include routes
const routes = require("./routes/index");
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