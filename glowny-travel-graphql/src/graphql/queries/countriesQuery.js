'use strict'
import countryType from '../types/countryType'
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { countryModel } from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

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
    let key = 'countries_' + args.continentId + '_' + args._id

    return cache.get(key).then((countries) => {
      if (countries) {
        return countries
      } else {
        let filter = { continentId: args.continentId }
        if(args._id) {
          filter['_id'] = args._id
        }
        return countryModel.find(filter).then((countries) => {
          return cache.set(key, countries).then((countries) => {
            return countries
          })
          
        })
      }
    })
  }
}

export default countryQuery
