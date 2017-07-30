import { GraphQLObjectType } from 'graphql'

import { echoQuery, continentsQuery, countriesQuery } from './queries'

const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'A viewer',
	fields: {
    continents: continentsQuery,
    countries: countriesQuery,
		//users: usersQuery,
		//roles: rolesQuery,
		//products: productsQuery,
		//shops: shopsQuery,
	},
})

var viewerQuery = {
	type: viewerType,
	resolve: () => {
		return {  }
	}
}

const QueryType = new GraphQLObjectType({
	name: 'query',
	fields: {
		echo: echoQuery,
		viewer: viewerQuery,
	}
})

export default QueryType
