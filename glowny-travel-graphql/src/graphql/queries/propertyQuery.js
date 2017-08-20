'use strict'
import propertyType from '../types/propertyType'
import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import { propertyModel } from '../../mongodb/models'
import { languageType } from '../enums'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

var propertyQuery = {
  type: propertyType,
  args: {
    id: {
      description: 'id of property',
      type: new GraphQLNonNull(GraphQLInt)
    },
    language: {
      type: new GraphQLNonNull(languageType),
      description: 'language',
    }
  },
	resolve: (root, args) => {
    let key = 'property_' + args.id
    return cache.get(key).then((property) => {
      if (property) {
        console.log('from cache')
        console.log(property)
        return {
          ...property,
          language: args.language,
          //name: property.name[args.language] || property.name['en-US'],
          //location: property.location[args.language] || property.location['en-US'],
          //categoryName: property.categoryName[args.language] || property.categoryName['en-US'],
        }
      } else {
        return propertyModel.findOne({_id: args.id}).then((property) => {
          return cache.set(key, property).then((property) => {
            console.log('from db')
            console.log(property)
            //console.log(args.language)
            //console.log(languageType._values.filter(l => l.name === args.language))
            return {
              ...property._doc,
              language: args.language,
              //name: property._doc.name[args.language] || property._doc.name['en-US'],
              //location: property._doc.location[args.language] || property._doc.location['en-US'],
              //categoryName: property._doc.categoryName[args.language] || property._doc.categoryName['en-US'],
            }
          })
          
        })
      }
    })
  }
}

export default propertyQuery
