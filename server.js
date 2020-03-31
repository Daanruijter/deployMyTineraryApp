const mongoose = require("mongoose");
const express = require("express");
const config = require("config");

const app = express();

const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

// const db = config.get("mongoURI");

const db =
  "mongodb+srv://dr:sSXGDQnstqEWcLHx@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority";

// ... other imports
const path = require("path");

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

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

//Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "itinerary-app"
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err + "There is no connection"));

mongoose.set("debug", true);
