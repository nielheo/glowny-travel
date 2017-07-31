'use strict'
import { continentType } from '../types'
import {GraphQLList} from 'graphql'
import { continentModel } from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

var continentQuery = {
	type: new GraphQLList(continentType),
	resolve: (root, _id) => {
    let key = 'continents'
    return cache.get(key).then((continents) => {
      if(continents) {
        return continents
      } else {
        return continentModel.find({}).then(function(continents) {
          return cache.set(key, continents).then((continents) => {
            return continents
          })
          
        })
      }
    })
    
  }
}

export default continentQuery
