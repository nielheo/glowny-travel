'use strict'
import { GraphQLString } from 'graphql'

var echoQuery = {
	type: GraphQLString,
	args: {
		message: {
			type: GraphQLString,
		},
	},
	resolve: function(_, args){
		return `received: ${args.message}`
	},
}

export default echoQuery
