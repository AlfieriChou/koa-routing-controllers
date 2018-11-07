import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class StartTimeMiddleware implements KoaMiddlewareInterface {
  use(ctx: any, next: (err?: any) => Promise<any>): any {
    console.log('<------- ' + ctx.response.status + ' ' + ctx.request.method + ' ' + ctx.request.url)
    next()
  }
}
