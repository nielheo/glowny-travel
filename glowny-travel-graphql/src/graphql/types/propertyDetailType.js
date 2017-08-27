'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLScalarType } from 'graphql'
import { provinceModel, propertyLocationModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

const propertyType = new GraphQLObjectType({
	name: 'propertyDetail',
	description: 'A property',
	fields: {
    _id: { type: GraphQLInt },
    seqNumber: { type: GraphQLInt },
    name: { 
      type: GraphQLString, 
      resolve: function(prop) {
        //console.log(prop)
        return prop.name[prop.language] || prop.name['en-US'] || '' 
      } 
    },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    stateProvince: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    country: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    starRating: { type: GraphQLFloat },
    categoryId: { type: GraphQLInt },
    categoryName: { 
      type: GraphQLString, 
      resolve: function(prop) {
        return prop.categoryName[prop.language] || prop.categoryName['en-US'] || ''
      }  
    },
    location: { 
      type: GraphQLString, 
      resolve: function(prop) {
        return prop.location[prop.language] || prop.location['en-US'] || ''
      }  
    },
    image: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    cityId: { type: GraphQLInt },
    locationDescription: {
      type: GraphQLString,
      resolve: (args, _id) => {
        return propertyLocationModel.findOne({_id:args._id}).then(function(location) {
          return location && location.name[args.language] || ''
        })
      }
    }
  }
})

export default propertyType
