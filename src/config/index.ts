import * as development from './default.config'
import * as prod from './prod.config'
import * as _ from 'lodash'

const env: string = process.env.NODE_ENV || 'development'
const configs: Object = {
  development: development.config,
  production: prod.config
}

const defaultConfig: Object = {
  env: env,
  appRoot: process.env.PWD
}

export let config: Object
config = _.merge(defaultConfig, configs[env])
