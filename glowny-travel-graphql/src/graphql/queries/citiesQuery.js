'use strict'
import cityType from '../types/cityType'
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { cityModel } from '../../mongodb/models'

var citiesQuery = {
  type: new GraphQLList(cityType),
  args: {
    countryId: {
      description: 'id of continent',
      type: new GraphQLNonNull(GraphQLInt)
    },
  },
	resolve: (root, args) => {
    
    var items = new Promise((resolve, reject) => {
      return cityModel.find({countryId: args.countryId}).then(function(cities) {
        resolve(cities)
      })
    })      
    return items
  }
}

export default citiesQuery
