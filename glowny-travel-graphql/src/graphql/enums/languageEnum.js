import { GraphQLEnumType } from 'graphql'

var languageType = new GraphQLEnumType({
  name: 'Language',
  values: {
    'en_US': {
      value: 'en-US'
    },
    'id_ID': {
      value: 'id-ID'
    },
    'ja_JP': {
      value: 'ja-JP'
    },
    'ko_KR': {
      value: 'ko-KR'
    },
    'th_TH': {
      value: 'th-TH'
    },
    'zh_CN': {
      value: 'zh-CN'
    },
  }
})

export default languageType