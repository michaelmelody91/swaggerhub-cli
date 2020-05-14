const { expect, test } = require('@oclif/test')
const { writeJSONSync, deleteFileSync, readJSONSync } = require('../../src/support/fs')
const mock = require('../__mocks__/config')
const isEqual = require('lodash/isEqual')

const { setConfig, getConfig } = require('../../src/services/config')

describe('config ', () => {
  beforeEach(() => {
    global.configFilePath = mock.configFilePath
    writeJSONSync(mock.configFilePath, mock.config)
  })

  afterEach(() => {
    delete global.configFilePath
    deleteFileSync(mock.configFilePath)
  })

  describe('setConfig', () => {
    test.it('it should update the contents of config file', () => {
      const mockUpdate = {
        ...readJSONSync(mock.configFilePath),
        swaggerHubUrl: 'http://update.test'
      }
      
      setConfig({ swaggerHubUrl: mockUpdate.swaggerHubUrl })

      expect(isEqual(readJSONSync(mock.configFilePath), mockUpdate))
        .to.equal(true)
    })
  })
  
  describe('getConfig', () => {
    test.it('it should return the contents of config file', () => {
      expect(isEqual(getConfig(), mock.config)).to.equal(true)
    })

    test
      .env({ SWAGGERHUB_API_KEY: mock.config.apiKey })
      .it('should return the configured API key from environmental variable', () => {    
        expect(getConfig().apiKey).to.equal(mock.config.apiKey)
        delete process.env.SWAGGERHUB_API_KEY
      })
  
    test
      .env({ SWAGGERHUB_API_KEY: mock.config.apiKey })
      .it('should prioritise environmental variable API key', () => {
        setConfig({ apiKey: 'abcdef00-file-1234-5678-97e0b583f1b9' })
        expect(getConfig().apiKey).to.equal(mock.config.apiKey)
        delete process.env.SWAGGERHUB_API_KEY
      })
  })
})