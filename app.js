const express = require("express");
const ejs = require("ejs");
const Html5QrcodeScanner = require("html5-qrcode"); // Add QrCode
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session"); // flash dependency
const flash = require("connect-flash");
const MongoStore = require("connect-mongo"); // flash dependency
const passport = require("passport");
const LocalStrategy = require("passport-local");
const pages = require("./controllers/pages");
const users = require("./controllers/users");
const User = require("./models/user");
const userRoutes = require("./routes/users");
const parentRoutes = require("./routes/parents");
const canteenWorkerRoutes = require("./routes/canteenWorkers");
const adminRoutes = require("./routes/admins");
const cors = require("cors");

const dbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/food_reservation_system"; // 27017 is the default mongodb port
const app = express();

app.engine("ejs", ejsMate); // use ejs-mate for layout
app.set("view engine", "ejs"); // use .ejs files for frontend
app.use(express.static(path.join(__dirname, "public"))); // connect css & js files in /public
app.use(express.urlencoded({ extended: true })); // parse url-encoded data
app.use(methodOverride("_method")); // enable method override for PUT and DELETE requests

// Test
/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());

/* Allowing the frontend to access the backend. */
app.use(cors());

// session settings
const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  //store: mongo, // by default it uses memory storage, goes away on application restart
  cookies: {
    httpOnly: true,
    //secureOnly: true, // only works on https
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig)); // enable session
app.use(flash()); // enable flash messages (req.flash())

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware
app.use((req, res, next) => {
  //console.log(req.query);
  //console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", pages.index);

app.use("/parent", parentRoutes);

app.use("/canteenWorker", canteenWorkerRoutes);

app.use("/admin", adminRoutes);

//QR scanner thing
app.get("views/canteenWorker/QR", (req, res) => {
  res.render("views/canteenWorker/QR");
});

app.use("/", userRoutes);

const usersRoute = require("./routes/users");
app.use("/", usersRoute);

module.exports = app;
