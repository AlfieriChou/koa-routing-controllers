import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class AuthMiddleware implements KoaMiddlewareInterface {
  use(ctx: any, next: (err?: any) => Promise<any>): any {
    next()
  }
}
