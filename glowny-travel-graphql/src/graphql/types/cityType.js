'use strict'

import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLScalarType } from 'graphql'

const cityType = new GraphQLObjectType({
	name: 'City',
	description: 'A city',
	fields: {
		_id: { type: GraphQLString },
    name: { type: GraphQLString },
    subClass: { type: GraphQLString },
	}
})

export default cityType
