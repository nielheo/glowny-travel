import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/cities', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select cities with no args, count is 0', function () {
      return test('{ "query": "{viewer{cities(language:en_US){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities.length).to.be.equal(0)
      })
    })

    it('select cities with countryCode:ID, count is bigger than 1', function () {
      return test('{ "query": "{viewer{cities(language:en_US, countryCode:\\"ID\\"){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities.length).to.be.greaterThan(1)
      })
    })

    it('select cities with id:522, count is 1', function () {
      return test('{ "query": "{viewer{cities(language:en_US, id:522){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities.length).to.be.equal(1)
      })
    })

    it('select cities with name:bandung, count is greater than 0', function () {
      return test('{ "query": "{viewer{cities(language:en_US, name:\\"bandung\\"){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities.length).to.be.greaterThan(0)
      })
    })

    it('select cities with name:bandung,countryCode:ID, count is greater than 0', function () {
      return test('{ "query": "{viewer{cities(language:en_US, name:\\"bandung\\", countryCode:\\"ID\\"){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities.length).to.be.greaterThan(0)
      })
    })

    it('select cities with id:522, name:den,countryCode:ID, count is 1', function () {
      return test('{ "query": "{viewer{cities(language:en_US, name:\\"bandung\\", countryCode:\\"ID\\"){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities.length).to.be.greaterThan(1)
      })
    })

    it('select cities - return all expected fields', function () {
      return test('{ "query": "{viewer{cities(language:id_ID,id:6142791){_id name nameLong properties {_id} }}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.cities).to.be.an('array')
        expect(result.data.viewer.cities[0]._id).to.not.be.empty()
        expect(result.data.viewer.cities[0].name).to.not.be.empty()
        expect(result.data.viewer.cities[0].nameLong).to.not.be.empty()
        
      })
    })

    it('select cities without language arg, should return error', function () {
      return test('{ "query": "{viewer{cities{_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select cities with invalid language arg, should return error', function () {
      return test('{ "query": "{viewer{cities(language:xxx){_id name}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })
  })
})
