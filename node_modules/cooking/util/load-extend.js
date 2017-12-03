'use strict'

const logger = require('./logger')
const isObject = require('./is').Object
const pluginExists = require('./check').pluginExists

/* istanbul ignore next */
const importExtend = function (extend, cooking, options) {
  require(`cooking-${extend}`)(cooking, options)
  logger.success(`Loaded success: ${extend}`)
}

/* istanbul ignore next */
/**
 * 加载并装配插件
 * @param  {array} extends
 * @param  {object} config - webpack config
 */
module.exports = function (_extends, cooking) {
  const isObj = isObject(_extends)

  Object.keys(_extends || {}).forEach(key => {
    const extend = isObj ? key : _extends[key]
    const options = isObj ? _extends[key] : {}
    const extendName = extend.split('@')[0]
    const packageName = `cooking-${extendName}`

    if (!pluginExists(packageName)) {
      logger.fatal(`Please install ${packageName}, run 'npm i ${packageName} -D'`)
    }

    importExtend(extendName, cooking, options)
  })
  console.log()
}
