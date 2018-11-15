import { Get, Controller, getMetadataArgsStorage } from 'routing-controllers'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { routingControllersToSpec } from 'routing-controllers-openapi'

const routingControllersOptions = {
  controllers: [`${__dirname}/*.ts`]
}
const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas'
})

const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: { schemas },
  info: {
    'title': 'Demo API document',
    'version': 'v3',
    'description': 'Using swagger3.0 & routing-controllers to generate swagger.json',
    'contact': {
      'name': 'AlfieriChou',
      'email': 'alfierichou@gmail.com',
      'url': 'https://alfierichou.com'
    },
    'license': {
      'name': 'MIT'
    }
  }
})

@Controller()
export class SwaggerController {
  @Get('/swagger.json')
  public swagger () {
    return spec
  }
}
