import mongoose from '../index.js'
var Schema = mongoose.Schema;

var citySchema = new Schema({
    _id: Number,
    name: String,
    nameLong: String,
    multicityId: Number,
    multicityName: String,
    provinceId: Number,
    provinceName: String,
    countryId: Number,
    countryCode: String,
    countryName: String,
    latitude: Number,
    longitude: Number,
}, {collection:'city'});

// Compile model from schema
var cityModel = mongoose.model('city', citySchema)

export default cityModel