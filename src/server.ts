import 'reflect-metadata'
import { useKoaServer } from 'routing-controllers'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import { Context } from 'koa'
import * as views from 'koa-views'
import * as path from 'path'
import * as Router from 'koa-router'
import { config } from './config'
import { databaseInitializer } from './database'
import * as jwt from 'koa-jwt'

const routingControllersOptions = {
  controllers: [`${__dirname}/controller/*.ts`],
  routePrefix: '/v1'
}

const bootstrap = async () => {
  await databaseInitializer()
  const app = new Koa()
  const router = new Router()
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
  app.use(jwt({ secret: 'koa-routing' }).unless({
    path: [/\/login/, /\/register/]
  }))
  app.use(views(path.join('./views'), {map: {html: 'nunjucks'}}))
  router.get('/v1/apidoc', async (ctx) => {
    await ctx.render('index.html', { url: '/v1/swagger.json' })
  })
  app.use(router.routes()).use(router.allowedMethods())
  const server = useKoaServer(app, routingControllersOptions)

  server.listen(config['port'])
  console.log(`Koa server is running on port ${config['port']}.`)
}

bootstrap()