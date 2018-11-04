const express = require("express");
const bodyParser = require("body-parser");
const mangoos = require("mongoose");
const passport = require("passport");

const cors = require("cors"); //щоб сервер міг обробляти запроси cors  з другого домена
const morgan = require("morgan"); // що з сервером

const auhtRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");

const keys = require("./config/keys");

mangoos
  .connect(keys.mongoURI)
  .then(() => {
    console.log("MongoDB conent");
  })
  .catch(error => {
    console.log(error);
  });

const app = express();

// підключення паспорту провірка входу і достопу
app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads')) // робимо папку статичною щоб мати доступ до картинок
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// наші url RestApi перше Routers - де ми все збираємо в купку, controler - описує методи
app.use("/api/auth", auhtRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
