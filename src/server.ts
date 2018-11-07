import 'reflect-metadata'
import { useKoaServer } from 'routing-controllers'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import { Context } from 'koa'

createConnection().then(async connection => {
  const app = new Koa()
  app.use(async (ctx: Context, next) => {
    if (ctx.request.method === 'OPTIONS') {
      ctx.response.status = 200
    }
    ctx.response.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
      'Access-Control-Max-Age': '86400000'
    })
    await next()
  })
  app.use(BodyParser())
  app.use(logger())
  const server = useKoaServer(app, {
    controllers: [`${__dirname}/controller/*.ts`]
  })

  server.listen(3000)
  console.log('Koa server is running on port 3000.')
}).catch(error => console.log("TypeORM connection error: ", error))
