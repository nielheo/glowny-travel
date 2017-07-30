'use strict'
import countryType from '../types/countryType'
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { countryModel } from '../../mongodb/models'

var countryQuery = {
  type: new GraphQLList(countryType),
  args: {
    continentId: {
      description: 'id of continent',
      type: new GraphQLNonNull(GraphQLInt)
    },
  },
	resolve: (root, args) => {
    
    var items = new Promise((resolve, reject) => {
      return countryModel.find({continentId: args.continentId}).then(function(countries) {
        resolve(countries)
      })
    })      
    return items
  }
}

export default countryQuery
