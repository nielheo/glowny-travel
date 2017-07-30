'use strict'
import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const countryType = new GraphQLObjectType({
	name: 'Country',
	description: 'A country',
	fields: {
		_id: { type: GraphQLInt },
		name: { type: GraphQLString },
	}
})

export default countryType
