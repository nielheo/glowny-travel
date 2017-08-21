'use strict'
import countryType from '../types/countryType'
import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import { countryModel } from '../../mongodb/models'
import { languageType } from '../enums'

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
    language: {
      type: new GraphQLNonNull(languageType),
      description: 'language',
    }
  },
	resolve: (root, args) => {
    let key = 'countries_'
    let countries
    return cache.get(key).then((countries) => {
      if (countries) {
        
        return countries.filter(country => (args.code ? country.code === args.code : true) 
              && (args.continentId ? country.continentId === args.continentId : true)).map(
                country => { return {...country, language: args.language}}
              )
      } else {
        
        return countryModel.find().then((countries) => {
          return cache.set(key, countries).then((countries) => {
            //console.log(countries)
            return countries.filter(country => (args.code ? country.code === args.code : true) 
              && (args.continentId ? country.continentId === args.continentId : true)).map(
                country => { return {...country._doc, language: args.language}}
              )
          })
          
        })
      }
    })
  }
}

export default countryQuery
