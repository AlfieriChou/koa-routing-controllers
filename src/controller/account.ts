import { Controller, Get } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { Account } from '../entity/account'
import { getManager } from 'typeorm'
import { BaseController } from '../common/baseController'

@Controller()
export class AccountController extends BaseController {
  @Get('/demos')
  @OpenAPI({ summary: '获取account信息列表' })
  @ResponseSchema(Account, {
    isArray: true
  })
  async index () {
    return 'Hello World'
  } 
}