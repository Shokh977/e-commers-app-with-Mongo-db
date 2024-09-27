const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODB_URI =
  "mongodb+srv://shokhtv7165:cn2uhE6fOOB0ShMt@cluster0.8b4qa.mongodb.net/shop";

const app = express();

const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });

// setting ejs
app.set("view engine", "ejs");
app.set("views", "views");

// importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoute = require("./routes/auth");
// importing models

const User = require("./models/User");

// getting inserted data from inputs
app.use(bodyParser.urlencoded({ extended: false }));

// using static components setting public folder as a default
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret password",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("66e8f85ae7aadc78686c2f03")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoute);

// this callback helps us to listen server once the database is connected
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Adam",
          email: "text@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
