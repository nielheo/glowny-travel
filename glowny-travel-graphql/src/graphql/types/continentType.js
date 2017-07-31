'use strict'
import {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} from 'graphql'
import countryType from './countryType'
import { countryModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

const continentType = new GraphQLObjectType({
	name: 'Continent',
	description: 'A continent',
	fields: {
		_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    countries: {
      type: new GraphQLList(countryType),
      resolve: (args, _id) => {
        let key = 'countries_' + args._id + '_'

        return cache.get(key).then((countries) => {
          if (countries) {
            return countries
          } else {
            return countryModel.find({continentId: args._id}).then((countries) => {
              return cache.set(key, countries).then((countries) => {
                return countries
              })
            })
          }
        })
        
      }
    }
  }
})

export default continentType
