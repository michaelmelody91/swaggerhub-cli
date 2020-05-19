const path = require('path')
const { writeJSONSync, fileExistsSync } = require('../support/fs')
const { configDefaults } = require('../../package.json').oclif
const { pipe } = require('../utils/compositions')

const createConfigFile = (filePath, config) => writeJSONSync(filePath, config)

const createConfigPath = ({ configDir }) => path.join(configDir, 'config.json')

const initConfig = filePath => !fileExistsSync(filePath) && createConfigFile(filePath, configDefaults)

const setAsGlobalPath = filePath => global.configFilePath = filePath

const setAsGlobalUserAgent = ({ userAgent, name }) =>
  global.shUserAgent = userAgent.replace(name, `${name}-cli`)

const SetupConfig = async ({ config: defaults }) => {
  setAsGlobalUserAgent(defaults)
  pipe(defaults)(createConfigPath, setAsGlobalPath, initConfig)
}

module.exports = SetupConfig
