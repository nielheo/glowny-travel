'use strict'
import { countryType } from '../types'
import {GraphQLList} from 'graphql'
import { countrytModel } from '../../mongodb/models'

var countryQuery = {
	type: new GraphQLList(countryType),
	resolve: (root, _id) => {
    var items = new Promise((resolve, reject) => {
      return countrytModel.find({}).then(function(countries) {
        resolve(countries)
      })
    })      
    return items
  }
}

export default countryQuery
