'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLScalarType } from 'graphql'
import { provinceModel, propertyLocationModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

const propertyType = new GraphQLObjectType({
	name: 'property',
	description: 'A property',
	fields: {
    _id: { type: GraphQLInt },
    seqNumber: { type: GraphQLInt },
    name: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    stateProvince: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    country: { type: GraphQLString },
    starRating: { type: GraphQLFloat },
    categoryId: { type: GraphQLInt },
    categoryName: { type: GraphQLString },
    location: { type: GraphQLString },
    image: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    cityId: { type: GraphQLInt },
    locationDescription: {
      type: GraphQLString,
      resolve: (args, _id) => {
        return propertyLocationModel.findOne({_id: args._id}).then(function(location) {
          return location.locationDescription
        })
      }
    }
  }
})

export default propertyType
