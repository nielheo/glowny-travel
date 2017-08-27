import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/countries', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select countries count is 231', function () {
      return test('{ "query": "{viewer{countries(language:en_US){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.countries).to.be.an('array')
        expect(result.data.viewer.countries.length).to.equal(231)
      })
    })

    it('select countries with args code, return 1', function () {
      return test('{ "query": "{viewer{countries(language:en_US,code:\\"ID\\"){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.countries).to.be.an('array')
        expect(result.data.viewer.countries.length).to.equal(1)
      })
    })

    it('select countries with args continentId', function () {
      return test('{ "query": "{viewer{countries(language:en_US,continentId:6023099){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.countries).to.be.an('array')
      })
    })

    it('select countries with args continentId, code', function () {
      return test('{ "query": "{viewer{countries(language:en_US,continentId:6023099,code:\\"ID\\"){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.countries).to.be.an('array')
      })
    })

    it('select countries - return all expected fields', function () {
      return test('{ "query": "{viewer{countries(language:id_ID,code:\\"ID\\"){_id name code continentId cities {_id} }}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.countries).to.be.an('array')
        expect(result.data.viewer.countries[0]._id).to.a('number');
        expect(result.data.viewer.countries[0].name).to.not.be.empty()
        expect(result.data.viewer.countries[0].code).to.not.be.empty()
        
      })
    })

    it('select countries without language arg, should return error', function () {
      return test('{ "query": "{viewer{countries{_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select countries with invalid language arg, should return error', function () {
      return test('{ "query": "{viewer{countries(language:xxx){_id name}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    
  })
    
})
