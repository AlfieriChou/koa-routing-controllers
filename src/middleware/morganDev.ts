import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class StartTimeMiddleware implements KoaMiddlewareInterface {
  use(ctx: any, next: (err?: any) => Promise<any>): any {
    console.log('-------> ' + ctx.request.method + ' ' + ctx.request.url)
    next()
  }
}

@Middleware({ type: 'after' })
export class EndTimeMiddleware implements KoaMiddlewareInterface {
  use(ctx: any, next: (err?: any) => Promise<any>): any {
    console.log('<------- ' + ctx.response.status + ' ' + ctx.request.method + ' ' + ctx.request.url)
    next()
  }
}
