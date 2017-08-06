'use strict'
import cityType from '../types/cityType'
import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import { cityModel, countryModel } from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

var citiesQuery = {
  type: new GraphQLList(cityType),
  args: {
    countryCode: {
      description: 'code of country',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      description: 'name of city',
      type: GraphQLString
    }
  },
	resolve: (root, args) => {
    let key = 'cities_code_' + args.countryCode

    return cache.get(key).then((cities) => {
      if (cities) {
        return args.name ? cities.filter((city) => {
          return city.name.toLowerCase().indexOf(args.name.toLowerCase()) > -1 ? city : null 
        }) : cities
      } else {
        return cityModel.find({countryCode: args.countryCode}).then((cities) => {
          return cache.set(key, cities).then((cities) => {
            return args.name ? cities.filter((city) => {
              return city.name.toLowerCase().indexOf(args.name.toLowerCase()) > -1 ? city : null 
            }) : cities
          })
          
        })
      }
    })
  }
}

export default citiesQuery
