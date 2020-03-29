// const db = require('./keys').mongoURI;
const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const app = express();

//for Heroku//
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

const db = config.get("mongoURI");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

//if you are on this path, require this file//
//this creates API routes//
app.use("/cities", require("./routes/cities"));
app.use("/itineraries", require("./routes/itineraries"));
app.use("/createaccount", require("./routes/users"));
app.use("/favourites", require("./routes/users"));
app.use("/login", require("./routes/auth"));
app.use("/currentuser", require("./routes/currentuser"));
app.use("/comments", require("./routes/comments"));

// const serverOptions = {
//   poolSize: 100,
//   socketOptions: {
//     socketTimeoutMS: 6000000
//   }
// };

mongoose
  .connect(db, {
    // server: { sockedOptions: { connectTimeoutMS: 5000 } },

    socketTimeoutMS: 6000000,

    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "itinerary-app"
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err + "There is no connection"));
