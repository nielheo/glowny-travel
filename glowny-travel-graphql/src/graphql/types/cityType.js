'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLScalarType, GraphQLList } from 'graphql'
import propertyType from './propertyType'
import { provinceModel, propertyModel }  from '../../mongodb/models'

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
    name: { 
      type: GraphQLString,
      resolve: function(prop) {
        return prop.name[prop.language] || prop.name['en-US'] || ''
      } 
    },
    nameLong: { 
      type: GraphQLString,
      resolve: function(prop) {
        return prop.nameLong[prop.language] || prop.nameLong['en-US'] || ''
      } 
    },
    country: {
      type: countryType,
      resolve: (args) => {
        if (args.countryId) {
          return {
            _id: args.countryId,
            //name: args.countryName,
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
        if (args.multicityId) {
          return {
            _id: args.multicityId,
            name: args.multicityName,
          }
        } else {
          return null;
        }
      }
    },
    properties: {
      type: new GraphQLList(propertyType),
      resolve: (args, _id) => {
        let key = 'properties_' + args._id + '_'
        return cache.get(key).then((properties) => {
          if (properties) {
            return properties.map(property => {return {...property, language: args.language}})
          } 
          return propertyModel.find({cityId: args._id}).then((properties) => {
            return cache.set(key, properties).then((properties) => {
              return properties.map(property => {return {...property._doc, language: args.language}})
            })
          })
          
        })
        
      }
    }
	}
})

export default cityType
