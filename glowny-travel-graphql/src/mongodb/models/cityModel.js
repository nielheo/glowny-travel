import mongoose from '../index.js'
var Schema = mongoose.Schema;

var citySchema = new Schema({
    _id: String,
    name: {},
    nameLong: {},
    multicityId: Number,
    //multicityName: String,
    provinceId: Number,
    //provinceName: String,
    countryId: String,
    //countryCode: String,
    //countryName: String,
    latitude: Number,
    longitude: Number,
    language: String,
}, {collection:'city'});

// Compile model from schema
var cityModel = mongoose.model('city', citySchema)

export default cityModel