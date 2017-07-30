'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLScalarType } from 'graphql'
import provinceType from './provinceType'
import { provinceModel }  from '../../mongodb/models'

const cityType = new GraphQLObjectType({
	name: 'City',
	description: 'A city',
	fields: {
		_id: { type: GraphQLString },
    name: { type: GraphQLString },
    subClass: { type: GraphQLString },
    province: {
      type: provinceType,
      resolve: (args, _id) => {
        var items = new Promise((resolve, reject) => {
          return args.provinceId ?
            provinceModel.findOne({_id: args.provinceId}).then(function(province) {
              //console.log(args.provinceId)
              //console.log(province)
              resolve(province)
            }) : null
          })      
        return items
      }
    }
	}
})

export default cityType
