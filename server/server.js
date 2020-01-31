//try to connect with MongoDB//
const express =  require("express")
const app = express();

const db = require('./keys').mongoURI;
const mongoose = require('mongoose')

 mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
     .then(() => console.log('Connection to Mongo DB established'))
     .catch(err => console.log(err + "scheisse, de verbinding IS ER NIET!!!"));


// mongoose.connect('mongodb://localhost/testaroo');






// mongoose.connection.once('open', function() {
//   console.log("connection had been made")
// })
// .on('error', function (error){
// console.log(error +   "ERRORRRRRRR")
// })





// const bodyParser = require("body-parser");
// const cors = require("cors");

// const db = require('./keys').mongoURI;
// const mongoose = require("mongoose");
// console.log(db + "ASFDSLSGJSLGGLFSS")
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 5000;

// mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
//     .then(() => console.log('Connection to Mongo DB established'))
//     .catch(err => console.log(err + "scheisse, de verbinding IS ER NIET!!!"));


// const MongoClient = require('mongodb').MongoClient
//     var ObjectID = require('mongodb').ObjectID; // we will use this later
    

// MongoClient.connect('mongodb://dr:2CWRERL6fHjet7kf@ds247027.mlab.com:47027/itinerary-app', (err, db) => {
//   console.log(db +"dbbbbbb")
//   var dbase = db.db("itinerary-app");
//   if (err) return console.log(err + ADFDFADAD)
//   app.listen(port, () => {
//     console.log('app working on 3000')
//   })
// })




// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
// app.use(cors());


// app.use('/cities', require('./routes/cities'))





// mongodb+srv://dr:<password>@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority