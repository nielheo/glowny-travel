'use strict'
import { continentType } from '../types'
import {GraphQLList, GraphQLNonNull} from 'graphql'
import { continentModel } from '../../mongodb/models'
import { languageType } from '../enums'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

var continentQuery = {
  type: new GraphQLList(continentType),
  args: {
    language: {
      type: new GraphQLNonNull(languageType),
      description: 'language',
    }
  },
	resolve: (root, args) => {
    let key = 'continents'
    return cache.get(key).then((continents) => {
      if(continents) {
        return continents.map(continent => { return { ...continent, language: args.language }})
      } else {
        return continentModel.find({}).then(function(continents) {
          return cache.set(key, continents).then((continents) => {
            return continents.map(continent => { return { ...continent._doc, language: args.language }})
          })
          
        })
      }
    })
    
  }
}

export default continentQuery
