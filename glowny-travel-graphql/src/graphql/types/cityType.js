'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLScalarType } from 'graphql'
import { provinceModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

const countryType = new GraphQLObjectType({
	name: 'country',
	description: 'A country',
	fields: {
    _id: { type: GraphQLInt },
    code: { type: GraphQLString },
    name: { type: GraphQLString },
	}
})

const provinceType = new GraphQLObjectType({
	name: 'province',
	description: 'A province',
	fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
	}
})

const vicinityType = new GraphQLObjectType({
	name: 'vicinity',
	description: 'A multi-city (vicinity)',
	fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
	}
})

const cityType = new GraphQLObjectType({
	name: 'City',
	description: 'A city',
	fields: {
		_id: { type: GraphQLString },
    name: { type: GraphQLString },
    nameLong: { type: GraphQLString },
    provinceId: { type: GraphQLString },
    country: {
      type: countryType,
      resolve: (args) => {
        if (args.countryId) {
          return {
            _id: args.countryId,
            name: args.countryName,
            code: args.countryCode,
          }
        } else {
          return null;
        }
      }
    },
    province: {
      type: provinceType,
      resolve: (args) => {
        if (args.provinceId) {
          return {
            _id: args.provinceId,
            name: args.provinceName,
          }
        } else {
          return null;
        }
      }
    },
    vicinity: {
      type: vicinityType,
      resolve: (args) => {
        if (args.vicinityId) {
          return {
            _id: args.vicinityId,
            name: args.vicinityName,
          }
        } else {
          return null;
        }
      }
    },
	}
})

export default cityType
