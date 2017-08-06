import mongoose from '../index.js'
var Schema = mongoose.Schema;

var propertySchema = new Schema({
    _id: Number,
    seqNumber: Number,
    name: String,
    address1: String,
    address2: String,
    city: String,
    stateProvince: String,
    postalCode: String,
    country: String,
    starRating: Number,
    categoryId: Number,
    categoryName: String,
    location: String,
    cityId: Number,
}, {collection:'property'});

// Compile model from schema
var propertyModel = mongoose.model('property', propertySchema)

export default propertyModel