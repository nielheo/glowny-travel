'use strict'
import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const continentType = new GraphQLObjectType({
	name: 'Continent',
	description: 'A continent',
	fields: {
		_id: { type: GraphQLInt },
		name: { type: GraphQLString },
	}
})

export default continentType
