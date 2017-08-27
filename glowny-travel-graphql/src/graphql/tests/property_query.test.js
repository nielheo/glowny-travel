import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/property', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select property with id:129912, count is 1', function () {
      return test('{ "query": "{viewer{property(language:en_US, id:129912){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.property).to.not.be.empty()
      })
    })

    it('select property - return all expected fields', function () {
      return test(`{ "query": "{viewer{property(language:id_ID,id:129912){ _id seqNumber name address1 address2 city stateProvince postalCode country latitude longitude starRating categoryId categoryName location image thumbnail cityId locationDescription }}}" }`)
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.property).to.not.be.empty()
        expect(result.data.viewer.property._id).to.be.a('number')
        expect(result.data.viewer.property.seqNumber).to.be.a('number')
        expect(result.data.viewer.property.name).to.not.be.empty()
        expect(result.data.viewer.property.address1).to.not.be.empty()
        expect(result.data.viewer.property.city).to.not.be.empty()
        expect(result.data.viewer.property.postalCode).to.not.be.empty()
        expect(result.data.viewer.property.country).to.not.be.empty()
        expect(result.data.viewer.property.latitude).to.be.a('number')
        expect(result.data.viewer.property.longitude).to.be.a('number')
        expect(result.data.viewer.property.starRating).to.be.a('number')
        expect(result.data.viewer.property.categoryId).to.be.a('number')
        expect(result.data.viewer.property.categoryName).to.not.be.empty()
        expect(result.data.viewer.property.location).to.not.be.empty()
        expect(result.data.viewer.property.image).to.not.be.empty()
        expect(result.data.viewer.property.thumbnail).to.not.be.empty()
        expect(result.data.viewer.property.cityId).to.be.a('number')
        expect(result.data.viewer.property.locationDescription).to.not.be.empty()
      })
    })

    it('select property without id arg, should return error', function () {
      return test('{ "query": "{viewer{property(language:en_UD){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select property without language arg, should return error', function () {
      return test('{ "query": "{viewer{property(id:1054){_id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select property with invalid language arg, should return error', function () {
      return test('{ "query": "{viewer{property(language:xxx){_id name}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })
  })
})
