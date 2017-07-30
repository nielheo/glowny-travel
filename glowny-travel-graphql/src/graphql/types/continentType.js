'use strict'
import {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} from 'graphql'
import countryType from './countryType'
import { countryModel }  from '../../mongodb/models'


const continentType = new GraphQLObjectType({
	name: 'Continent',
	description: 'A continent',
	fields: {
		_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    countries: {
      type: new GraphQLList(countryType),
      resolve: (result, _id) => {
        var items = new Promise((resolve, reject) => {
        //console.log(root)
          return countryModel.find({continentId: result._id}).then(function(countries) {
            resolve(countries)
          })
        })      
        return items
      }
    }
	}
})

export default continentType
