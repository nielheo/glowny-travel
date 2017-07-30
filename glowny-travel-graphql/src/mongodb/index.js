import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/glownyTravel')
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( '+++Connected to mongoose')
})

export default db

