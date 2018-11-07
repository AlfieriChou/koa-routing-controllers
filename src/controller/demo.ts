import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { Demo } from '../entity/demo'
import { getManager } from 'typeorm'
import { Context } from 'koa'
import { paginate } from '../common/pagination'

@Controller()
export class DemoController {

  @Get('/demos')
  async index(@QueryParam('page') page: number, @QueryParam('size') size: number, @QueryParam('pagination') pagination: boolean) {
    let sql = getManager().createQueryBuilder(Demo, 'demo')
    if (pagination === true) {
      const count = await sql.getCount()
      sql.offset((page - 1) * size).limit(size)
      const result = await sql.getMany()
      return {
        result: result,
        paginate: paginate({ count, page, size })
      }
    }
    const result = await sql.getMany()
    return result

  }

  @Get('/demos/:id')
  async show(@Param('id') id: number, ctx: Context) {
    const demoRepository = getManager().getRepository(Demo)
    const demo = await demoRepository.findOne({ id: id })
    if (!demo) ctx.throw('该信息不存在', 404)
    return demo
  }

  @Post('/demos')
  async create(@Body() demo: any) {
    const demoRepository = getManager().getRepository(Demo)
    const newDemo = await demoRepository.create(demo)
    const result = await demoRepository.save(newDemo)
    return result
  }

  @Put('/demos/:id')
  async update(@Param('id') id: number, @Body() demo: any, ctx: Context) {
    const demoRepository = getManager().createQueryBuilder(Demo, 'demo')
    const exists = await demoRepository.where({ id: id })
    if (!exists) ctx.throw('该信息不存在', 404)
    const result = await demoRepository.update(Demo).set(demo).where('id = :id', { id: id }).execute()
    return result
  }

  @Delete('/demos/:id')
  async remove(@Param('id') id: number, ctx: Context) {
    const demoRepository = getManager().createQueryBuilder(Demo, 'demo')
    const exists = await demoRepository.where({ id: id })
    if (!exists) ctx.throw('该信息不存在', 404)
    const result = await demoRepository.delete().from(Demo).where('id = :id', { id: id }).execute()
    return result
  }
}