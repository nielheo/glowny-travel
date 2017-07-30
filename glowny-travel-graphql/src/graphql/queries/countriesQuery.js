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
    _id: {
      description: 'id of country',
      type: GraphQLInt
    }
  },
	resolve: (root, args) => {
    
    var items = new Promise((resolve, reject) => {
      let filter = { continentId: args.continentId }
      if(args._id) {
        filter['_id'] = args._id
      }
      return countryModel.find(filter).then(function(countries) {
        resolve(countries)
      })
    })      
    return items
  }
}

export default countryQuery
