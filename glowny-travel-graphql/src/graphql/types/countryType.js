'use strict'
import {GraphQLObjectType,GraphQLList, GraphQLInt, GraphQLString} from 'graphql'
import cityType from './cityType'
import { cityModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 });

const countryType = new GraphQLObjectType({
	name: 'Country',
	description: 'A country',
	fields: {
    _id: { type: GraphQLInt },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    //continentId: { type: GraphQLInt },
    cities: {
      type: new GraphQLList(cityType),
      resolve: (args, _id) => {
        let key = 'cities_' + args._id

        return cache.get(key).then(function(cities) {
          if(cities) {
            return cities
          } else {
            return cityModel.find({countryId: args._id}).then(function(cities) {
              return cache.set(key, cities).then(function(cities){
                return cities
              })
                
            })
          } 
        })
        
      }
    }
	}
})

export default countryType
