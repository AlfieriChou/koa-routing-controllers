import * as development from './default.config'
import * as prod from './prod.config'
import * as _ from 'lodash'

const env: string = process.env.NODE_ENV

export let config: Object
if (env === 'development' || '' || 'undefined') {
  config = development.config
}
if (env === 'production') {
  config = prod.config
}
config = _.merge(config, { env: env })
