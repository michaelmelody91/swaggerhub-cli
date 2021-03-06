const { flags } = require('@oclif/command')
const { readFileSync } = require('fs-extra')
const { getApi, postApi } = require('../../requests/api')
const { getApiIdentifierArg, splitPathParams } = require('../../support/command/parse-input')
const { getVersion, parseDefinition } = require('../../utils/oas')
const BaseCommand = require('../../support/command/base-command')
const publish = require('./publish')
const setDefault = require('./setdefault')

class UpdateAPICommand extends BaseCommand {
  
  async updateApi(owner, name, version, flags) {
    const isPrivate = flags.visibility === 'private'
    const updateApiObj = {
      pathParams: [owner, name],
      queryParams: { version, isPrivate },
      body: readFileSync(flags.file)
    }

    return await this.executeHttp({
      execute: () => postApi(updateApiObj), 
      onResolve: this.logCommandSuccess({ owner, name, version }),
      options: { resolveStatus: [403] }
    })
  }

  async run() {
    const { args, flags } = this.parse(UpdateAPICommand)
    const definition = parseDefinition(flags.file)
    const apiVersion = getVersion(definition)
    const requestedApiPath = getApiIdentifierArg(args)
    const [owner, name, version = apiVersion] = splitPathParams(requestedApiPath)

    await this.executeHttp({
      execute: () => getApi([owner, name, version]), 
      onResolve: () => this.updateApi(owner, name, version, flags),
      options: { resolveStatus: [403] }
    })
    const apiPathWithVersion = requestedApiPath.split('/').length === 3 ?
    requestedApiPath :
    `${requestedApiPath}/${apiVersion}`

    if (flags.publish) await publish.run([apiPathWithVersion])
    if (flags.setdefault) await setDefault.run([apiPathWithVersion])
  }
}

UpdateAPICommand.description = `update an API version
The API version from the file will be used unless the version is specified in the command argument.
An error will occur if the API version does not exist.
`

UpdateAPICommand.examples = [
  'swaggerhub api:update organization/api --file api.yaml',
  'swaggerhub api:update organization/api/1.0.0 --file api.json',
  'swaggerhub api:update organization/api/1.0.0 --publish --file api.json',
  'swaggerhub api:update organization/api/1.0.0 --setdefault --file api.json',
  'swaggerhub api:update organization/api/1.0.0 --publish --setdefault --file api.json'
]

UpdateAPICommand.args = [{
  name: 'OWNER/API_NAME/[VERSION]',
  required: true,
  description: 'API to update in SwaggerHub'
}]

UpdateAPICommand.flags = {
  file: flags.string({
    char: 'f', 
    description: 'file location of API to update',
    required: true
  }),
  visibility: flags.string({
    description: 'visibility of API in SwaggerHub',
    options: ['public', 'private'],
    default: 'private'
  }),
  publish: flags.boolean({
    description: 'sets the API version as published',
    default: false,
    required: false,
    dependsOn: ['file']
  }),
  setdefault: flags.boolean({
    description: 'sets API version to be the default',
    default: false,
    required: false,
    dependsOn: ['file']
  }),
  ...BaseCommand.flags
}

module.exports = UpdateAPICommand
