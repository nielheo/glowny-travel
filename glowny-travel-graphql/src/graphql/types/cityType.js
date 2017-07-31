'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLScalarType } from 'graphql'
import provinceType from './provinceType'
import { provinceModel }  from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

const cityType = new GraphQLObjectType({
	name: 'City',
	description: 'A city',
	fields: {
		_id: { type: GraphQLString },
    name: { type: GraphQLString },
    subClass: { type: GraphQLString },
    provinceId: { type: GraphQLString },
    
    province: {
      type: provinceType,
      resolve: (args, _id) => {
        if (!args.provinceId)
          return null;
        
        let key = 'province_' + args.provinceId

        return cache.get(key).then(function(province) {
          if(province) {
            return province
          } else {
            return provinceModel.findOne({_id: args.provinceId}).then(function(province) {
              return cache.set(key, province).then(function(province){
                return province
              })
            })
          } 
        })
      }
    }
	}
})

export default cityType
