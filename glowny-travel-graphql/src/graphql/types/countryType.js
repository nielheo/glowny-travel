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
    name: { 
      type: GraphQLString,
      resolve: function(prop) {
        //console.log(prop)
        return prop.name[prop.language] || prop.name['en-US'] || ''
      } 
    },
    continentId: { type: GraphQLInt },
    cities: {
      type: new GraphQLList(cityType),
      resolve: (args, _id) => {
        let key = 'cities_' + args._id
        console.log(args)
        return cache.get(key).then(function(cities) {
          console.log('cities from cache')
          console.log(cities)
          if(cities) {
            return cities.map(city => { return {...city, language: args.language}})
          } else {
            return cityModel.find({countryId: args._id}).then(function(cities) {
              console.log('cities from db')
              console.log(args._id)
              console.log(cities)
              return cache.set(key, cities).then(function(cities){
                return cities.map(city => { return {...city._doc, language: args.language}})
              })
                
            })
          } 
        })
        
      }
    }
	}
})

export default countryType
