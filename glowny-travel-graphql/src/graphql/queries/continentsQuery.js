'use strict'
import { continentType } from '../types'
import db from '../../mongodb'

const Continents = db.collection('continent')

var continentQuery = {
	type: continentType,
	resolve: (root, _id) => {
    var items = new Promise((resolve, reject) => {
      return Continents.findOne({}, function(err, continents){
        err ? reject(err) : resolve(continents)
      })
    })      
    return items
  }
}

export default continentQuery
