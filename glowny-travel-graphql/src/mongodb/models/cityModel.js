import mongoose from '../index.js'
var Schema = mongoose.Schema;

var citySchema = new Schema({
    _id: Number,
    name: String,
    subClass: String,
    countryId: Number
}, {collection:'city'});

// Compile model from schema
var cityModel = mongoose.model('city', citySchema)

export default cityModel