'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLScalarType, GraphQLList } from 'graphql'
import propertyType from './propertyType'
//import countryType from './countryType'
import { provinceModel, propertyModel, countryModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })


const countryType = new GraphQLObjectType({
	name: 'country',
	description: 'A country',
	fields: {
    _id: { type: GraphQLInt },
    code: { type: GraphQLString },
    name: { 
      type: GraphQLString,
      resolve: function(prop) {
        console.log(prop)
        return prop.name[prop.language] || prop.name['en-US'] || ''
      } 
    },
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
    //language: { type: GraphQLString },
    name: { 
      type: GraphQLString,
      resolve: function(prop) {
        console.log(prop)
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
        let key = 'countries_' 
        //console.log(args)
        return cache.get(key).then((countries) => {
          if (countries) {
            let a =  { ...countries.filter(country => country._id === args.countryId)[0],
              language: args.language }
            console.log(a)
            return a
          } else {
            
            return countryModel.find().then((countries) => {
              return cache.set(key, countries).then((countries) => {
                return { ...countries.filter(country => country._id === args.countryId)[0]._doc,
                  language: args.language }
              })
              
            })
          }
        })
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
        console.log(args)
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
