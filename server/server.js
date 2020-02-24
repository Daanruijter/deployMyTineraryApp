

const db = require('./keys').mongoURI;
const mongoose = require('mongoose')
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

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
app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))
app.use('/Create-account', require('./routes/users'))

 mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, dbName: 'itinerary-app' })
     .then(() => console.log('Connection to Mongo DB established'))
     .catch(err => console.log(err + "There is no connection"));







