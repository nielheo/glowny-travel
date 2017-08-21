import mongoose from '../index.js'
var Schema = mongoose.Schema;

var continentSchema = new Schema({
    _id: Number,
    name: {},
}, {collection:'continent'});

// Compile model from schema
var continentModel = mongoose.model('continent', continentSchema )

export default continentModel