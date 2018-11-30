import { Post, Body, Controller } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { Account } from '../entity/account'
import { getManager } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { BaseController } from '../common/baseController'

@Controller()
export class Register extends BaseController {
  @Post('/register')
  @OpenAPI({ summary: '账号注册' })
  @ResponseSchema(Account)
  public async register (
    @Body({ required: true }) params: Account
  ): Promise<any> {
    const accountRepository = getManager().getRepository(Account)
    const exists: any = await accountRepository.findOne({ username: params.username })
    if (exists) throw new Error('该用户名已使用')
    const password: string = await bcrypt.hash(params.password, 10)
    const newAccount: any = await accountRepository.create({
      username: params.username,
      password: password
    })
    const result: Object = await accountRepository.save(newAccount)
    return result
  }
}