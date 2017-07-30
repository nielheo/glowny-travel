'use strict'
import {GraphQLObjectType, GraphQLString} from 'graphql'

const provinceType = new GraphQLObjectType({
	name: 'Province',
	description: 'A province',
	fields: {
		_id: { type: GraphQLString },
    name: { type: GraphQLString },
    
	}
})

export default provinceType
