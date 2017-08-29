import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/continens', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select continents count is 1', function () {
      return test('{ "query": "{viewer{continents(language:id_ID){_id name}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.continents).to.be.an('array')
        expect(result.data.viewer.continents.length).to.equal(1)
      })
    })

    it('select continents - return all expected fields', function () {
      return test('{ "query": "{viewer{continents(language:id_ID){_id name countries { _id } }}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.continents).to.be.an('array')
        expect(result.data.viewer.continents[0]._id).to.a('number');
        expect(result.data.viewer.continents[0].name).to.not.be.empty()
        expect(result.data.viewer.continents[0].countries).to.be.an('array')
      })
    })

    it('select continents without language arg, should return error', function () {
      return test('{ "query": "{viewer{continents{_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select continents with invalid language arg, should return error', function () {
      return test('{ "query": "{viewer{continents(language:xxx){_id name}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    
  })
    
})
