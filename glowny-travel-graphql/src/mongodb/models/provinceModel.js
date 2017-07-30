import mongoose from '../index.js'
var Schema = mongoose.Schema;

var provinceSchema = new Schema({
    _id: String,
    name: String,
    countryId: Number
}, {collection:'province'});

// Compile model from schema
var provinceModel = mongoose.model('province', provinceSchema)

export default provinceModel