import { Controller, Get, Post, Body } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { Account } from '../entity/account'
import { getManager } from 'typeorm'
import { BaseController } from '../common/baseController'
import { IsString } from 'class-validator'

class LoginSchema {
  @IsString()
  username: string

  @IsString()
  password: string
}

@Controller()
export class AccountController extends BaseController {
  @Get('/accounts')
  @OpenAPI({ summary: '获取account信息列表' })
  @ResponseSchema(Account, {
    isArray: true
  })
  async index () {
    return 'Hello World'
  }

  @Post('/login')
  @OpenAPI({ summary: '账号登录' })
  @ResponseSchema(Account)
  async login (@Body({ required: true }) params: LoginSchema) {
    return params
  }
}