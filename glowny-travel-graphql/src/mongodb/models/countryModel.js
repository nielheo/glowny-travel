import mongoose from '../index.js'
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    _id: Number,
    code: String,
    name: String,
    continentId: Number
}, {collection:'country'});

// Compile model from schema
var countryModel = mongoose.model('country', countrySchema)

export default countryModel