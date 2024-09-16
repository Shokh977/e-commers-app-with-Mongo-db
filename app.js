const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoConnect = require("./util/database").mongoConnect;

// setting ejs
app.set("view engine", "ejs");
app.set("views", "views");

// importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// importing models

const User = require("./models/User");

// getting inserted data from inputs
app.use(bodyParser.urlencoded({ extended: false }));

// using static components setting public folder as a default
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("66e58fb54404d50dcf2b7bd0")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// this callback helps us to listen server once the database is connected
mongoConnect(() => {
  app.listen(3000);
});
