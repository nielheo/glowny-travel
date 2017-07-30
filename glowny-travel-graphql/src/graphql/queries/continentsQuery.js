'use strict'
import { continentType } from '../types'
import {GraphQLList} from 'graphql'
import { continentModel } from '../../mongodb/models'


var continentQuery = {
	type: new GraphQLList(continentType),
	resolve: (root, _id) => {
    var items = new Promise((resolve, reject) => {
      return continentModel.find({}).then(function(continents) {
        resolve(continents)
      })
    })      
    return items
  }
}

export default continentQuery
