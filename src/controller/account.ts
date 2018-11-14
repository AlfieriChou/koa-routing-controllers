import { Controller, Get, Post, Body } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { Account } from '../entity/account'
import { getManager } from 'typeorm'
import { BaseController } from '../common/baseController'
import { IsString, Length } from 'class-validator'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

class LoginSchema {
  @IsString()
  username: string

  @Length(6, 30)
  password: string
}

@Controller()
export class AccountController extends BaseController {

  private createToken (user: any) {
    let end: Date = new Date()
    end.setDate(end.getDate() + 1)
    let timeStamp: number = Date.parse(end.toString())
    return jwt.sign({
      sub: {user},
      exp: timeStamp
    }, 'koa-routing')
  }

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
  async login (
    @Body({ required: true }) params: LoginSchema
  ) {
    const user: any = await super.exists('Account', { username: params.username })
    if (bcrypt.compare(params.password, user.password)) {
      const result = this.createToken(user)
      return {
        token: result
      }
    } else {
      return '登录失败'
    }
  }
}