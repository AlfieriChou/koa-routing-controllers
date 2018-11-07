import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class StartTimeMiddleware implements KoaMiddlewareInterface {
  use(context: any, next: (err?: any) => Promise<any>): any {
    console.log('timer is started.')
    next()
  }
}
