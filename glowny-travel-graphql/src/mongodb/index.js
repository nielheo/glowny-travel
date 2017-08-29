import mongoose from 'mongoose'

import Promise from'bluebird'
mongoose.Promise = Promise

let connString = 'mongodb://native:yAkBhQS6EvUNmQEt@cluster0-shard-00-00-cikhe.mongodb.net:27017,cluster0-shard-00-01-cikhe.mongodb.net:27017,cluster0-shard-00-02-cikhe.mongodb.net:27017/glownyTravel?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
//let connString = 'mongodb://localhost:27017/glownyTravel'

mongoose.connect(connString)

var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( '+++Connected to mongoose')
})

export default mongoose

