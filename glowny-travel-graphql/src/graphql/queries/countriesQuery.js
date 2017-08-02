'use strict'
import countryType from '../types/countryType'
import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import { countryModel } from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

var countryQuery = {
  type: new GraphQLList(countryType),
  args: {
    code: {
      description: 'country code. (If present, continetId will be ignored)',
      type: GraphQLString
    },
    continentId: {
      description: 'id of continent. (Will be ignored if code is present)',
      type: GraphQLInt
    },
  },
	resolve: (root, args) => {
    let key = 'countries_' + args.continentId + '_' + args.code

    return cache.get(key).then((countries) => {
      if (countries) {
        return countries
      } else {
        let filter = {  }
        if(args.code) {
          filter['code'] = args.code
        } else {
          if (args.continentId) {
            filter['continentId'] = args.continentId
          }
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
