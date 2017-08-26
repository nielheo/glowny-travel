import mongoose from '../index.js'
var Schema = mongoose.Schema;

var propertyLocationSchema = new Schema({
    _id: String,
    name: {},
}, {collection:'propertyLocation'});

// Compile model from schema
var propertyLocationModel = mongoose.model('propertyLocation', propertyLocationSchema )

export default propertyLocationModel