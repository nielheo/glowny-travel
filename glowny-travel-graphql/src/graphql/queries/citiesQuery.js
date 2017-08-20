'use strict'
import cityType from '../types/cityType'
import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import { cityModel, countryModel } from '../../mongodb/models'

import Cacheman from 'cacheman'
var cache = new Cacheman({ ttl: 60 * 60 })

const filterCity = (cities, id, name) => {
  if(!id && !name)
    return cities

  if(id) {
    return cities.filter((city) => {
      return city._id === id ? city : null
    })
  }

  if (name) {
    return cities.filter((city) => {
      return city.name.toLowerCase().indexOf(name.toLowerCase()) > -1 ? city : null 
    }).sort(function(a, b){
      if (a.name.toLowerCase() === name.toLowerCase() 
        && b.name.toLowerCase() !== name.toLowerCase()) return -1

      if (a.name.toLowerCase() !== name.toLowerCase() 
        && b.name.toLowerCase() === name.toLowerCase()) return 1

      let idxa = a.nameLong.toLowerCase().indexOf(name.toLowerCase())
      let idxb = b.nameLong.toLowerCase().indexOf(name.toLowerCase())

      if (idxa === 0 && idxb !== 0) return -1
      if (idxa !== 0 && idxb === 0) return 1

      let counta = a.nameLong.split(',').length
      let countb = b.nameLong.split(',').length

      if (counta < countb) return -1
      if (counta > countb) return 1
      
      if(a.nameLong < b.nameLong) return -1
      if(a.nameLong > b.nameLong) return 1
      return 0;
    })
  }
}

var citiesQuery = {
  type: new GraphQLList(cityType),
  args: {
    countryCode: {
      description: 'code of country',
      type: GraphQLString
    },
    name: {
      description: 'name of city',
      type: GraphQLString,
    },
    id: {
      id: 'id of city',
      type: GraphQLInt,
    }
  },
	resolve: (root, args) => {
    if (args.id) {
      return cityModel.find({_id: args.id}).then((cities) => {
        return cities
      })
    } else if (args.countryCode) {
      let key = 'cities_code_' + args.countryCode

      return cache.get(key).then((cities) => {
        if (cities) {
          return filterCity(cities, args.id, args.name)
        } else {
          return cityModel.find({countryCode: args.countryCode}).then((cities) => {
            return cache.set(key, cities).then((cities) => {
              return filterCity(cities, args.id, args.name)
            })
          })
        }
      })
    } else if (args.name) {
      let key = 'cities_'

      return cache.get(key).then((cities) => {
        if (cities) {
          return filterCity(cities, args.id, args.name)
        } else {
          return cityModel.find().then((cities) => {
            return cache.set(key, cities).then((cities) => {
              return filterCity(cities, args.id, args.name)
            })
          })
        }
      })
      
    } else {
      return []
    }
  }
}

export default citiesQuery
