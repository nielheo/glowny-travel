'use strict'
import {GraphQLObjectType,GraphQLList, GraphQLInt, GraphQLString} from 'graphql'
import cityType from './cityType'
import { cityModel }  from '../../mongodb/models'

const countryType = new GraphQLObjectType({
	name: 'Country',
	description: 'A country',
	fields: {
		_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    cities: {
      type: new GraphQLList(cityType),
      resolve: (args, _id) => {
        var items = new Promise((resolve, reject) => {
          return cityModel.find({countryId: args._id}).then(function(cities) {
            resolve(cities)
          })
        })      
        return items
      }
    }
	}
})

export default countryType
