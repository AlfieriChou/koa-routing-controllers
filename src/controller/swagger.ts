import { Render, Get, Controller, getMetadataArgsStorage } from 'routing-controllers'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { Context } from 'koa'

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
    description: 'Using `routing-controllers-openapi` to generate api document.',
    title: 'API document',
    version: '1.0.0'
  }
})

@Controller()
export class SwaggerController {
  @Get('/swagger.json')
  async swagger (ctx: Context) {
    return spec
  }
}
