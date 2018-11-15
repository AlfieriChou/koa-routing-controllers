import { Post, Body, Controller } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import { Account } from '../entity/account'
import { getManager } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Controller()
export class Register {
  @Post('/register')
  @OpenAPI({ summary: '账号注册' })
  @ResponseSchema(Account)
  public async register (
    @Body({ required: true }) params: Account
  ) {
    const password: string = await bcrypt.hash(params.password, 10)
    const accountRepository: any = getManager().getRepository(Account)
    const newAccount: any = await accountRepository.create({
      username: params.username,
      password: password
    })
    const result: Object = await accountRepository.save(newAccount)
    return result
  }
}