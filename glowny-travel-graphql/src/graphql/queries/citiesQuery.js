'use strict'
import cityType from '../types/cityType'
import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql'
import { cityModel, countryModel } from '../../mongodb/models'
import { languageType } from '../enums'

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
      return city.name['en-US'].toLowerCase().indexOf(name.toLowerCase()) > -1 ? city : null 
    }).sort(function(a, b){
      if (a.name['en-US'].toLowerCase() === name.toLowerCase() 
        && b.name['en-US'].toLowerCase() !== name.toLowerCase()) return -1

      if (a.name['en-US'].toLowerCase() !== name.toLowerCase() 
        && b.name['en-US'].toLowerCase() === name.toLowerCase()) return 1

      let idxa = a.nameLong['en-US'].toLowerCase().indexOf(name.toLowerCase())
      let idxb = b.nameLong['en-US'].toLowerCase().indexOf(name.toLowerCase())

      if (idxa === 0 && idxb !== 0) return -1
      if (idxa !== 0 && idxb === 0) return 1

      let counta = a.nameLong['en-US'].split(',').length
      let countb = b.nameLong['en-US'].split(',').length

      if (counta < countb) return -1
      if (counta > countb) return 1
      
      if(a.nameLong['en-US'] < b.nameLong['en-US']) return -1
      if(a.nameLong['en-US'] > b.nameLong['en-US']) return 1
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
    },
    language: {
      type: new GraphQLNonNull(languageType),
      description: 'language',
    }
  },
	resolve: (root, args) => {
    if (args.id) {
      return cityModel.find({_id: args.id}).then((cities) => {
        //console.log('1')
        //console.log(cities)
        return cities.map(city => { return {...city._doc, language: args.language}})
      })
    } else if (args.countryCode) {
      let key = 'cities_code_' + args.countryCode

      return cache.get(key).then((cities) => {
        //console.log('2')
        //console.log(cities)
        if (cities) {
          return filterCity(cities, args.id, args.name)
            .map(city => { return {...city, language: args.language}})
        } else {
          return cityModel.find({countryCode: args.countryCode}).then((cities) => {
            return cache.set(key, cities).then((cities) => {
              //console.log('2.1')
              //console.log(cities)
              return filterCity(cities, args.id, args.name)
                .map(city => { return {...city._doc, language: args.language}})
            })
          })
        }
      })
    } else if (args.name) {
      let key = 'cities_'

      return cache.get(key).then((cities) => {

        if (cities) {
          //console.log('3')
          //console.log(cities)
          return filterCity(cities, args.id, args.name)
            .map(city => { return {...city, language: args.language}})
        } else {
          return cityModel.find().then((cities) => {
            //console.log('4')
            //console.log(cities)
            return cache.set(key, cities).then((cities) => {
              return filterCity(cities, args.id, args.name)
                .map(city => { return {...city._doc, language: args.language}})
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
