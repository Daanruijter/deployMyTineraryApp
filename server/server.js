const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


const MongoClient = require('mongodb').MongoClient
    var ObjectID = require('mongodb').ObjectID; // we will use this later
    

MongoClient.connect('mongodb://dr:2CWRERL6fHjet7kf@ds247027.mlab.com:47027/itinerary-app', (err, db) => {
  var dbase = db.db("itinerary-app");
  if (err) return console.log(err)
  app.listen(port, () => {
    console.log('app working on 3000')
  })
})




app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());


app.use('/cities', require('./routes/cities'))





// mongodb+srv://dr:<password>@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority