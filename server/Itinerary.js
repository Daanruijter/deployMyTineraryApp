const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    //5e4417af1c9d440000a62717//

    parentCity_id: {
        type: ObjectID,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true

    },
    hashtags: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    moreInformation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Integer,
        required: true
    }


})


module.exports = mongoose.model('Amsterdam', itinerarySchema)