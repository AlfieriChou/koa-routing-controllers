import { Controller, Ctx, Param, QueryParam, BodyParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { Demo } from '../entity/demo'
import { getManager } from 'typeorm'
import { Context } from 'koa'
import { BaseController } from '../common/baseController'
import { NotFound } from 'ts-httpexceptions'

@Controller()
export class DemoController extends BaseController {

  @Get('/demos')
  async index(@QueryParam('page') page: number, @QueryParam('size') size: number, @QueryParam('pagination') pagination: boolean, @Ctx() ctx: Context) {
    const params = ctx.query
    let sql = getManager().createQueryBuilder(Demo, 'demo')
    if (params.id) sql = sql.where('demo.id = :id', { id: params.id })
    if (params.title) sql = sql.where('demo.title like :title', { title: '%' + params.title + '%' })
    if (params.order) {
      let order : {} = super.getSort(params.order)
      sql = sql.orderBy(order)
    }
    if (pagination === true) {
      const count = await sql.getCount()
      sql.offset((page - 1) * size).limit(size)
      const result = await sql.getMany()
      return {
        result: result,
        paginate: super.paginate({ count, page, size })
      }
    }
    const result = await sql.getMany()
    return result
  }

  @Get('/demos/:id')
  async show(@Param('id') id: number) {
    const demoRepository = getManager().getRepository(Demo)
    const demo = await demoRepository.findOne({ id: id })
    if (!demo) throw new NotFound('该信息不存在')
    return demo
  }

  @Post('/demos')
  async create(@BodyParam('title', { required: true }) title: string, @BodyParam('text') text: string) {
    const demoRepository = getManager().getRepository(Demo)
    const newDemo = await demoRepository.create({
      title: title,
      text: text || ''
    })
    const result = await demoRepository.save(newDemo)
    return result
  }

  @Put('/demos/:id')
  async update(@Param('id') id: number, @Body() demo: any) {
    const demoRepository = getManager().createQueryBuilder(Demo, 'demo')
    const exists = await demoRepository.where({ id: id })
    if (!exists) throw new NotFound('该信息不存在')
    const result = await demoRepository.update(Demo).set(demo).where('id = :id', { id: id }).execute()
    return result
  }

  @Delete('/demos/:id')
  async remove(@Param('id') id: number) {
    const demoRepository = getManager().createQueryBuilder(Demo, 'demo')
    const exists = await demoRepository.where({ id: id })
    if (!exists) throw new NotFound('该信息不存在')
    const result = await demoRepository.delete().from(Demo).where('id = :id', { id: id }).execute()
    return result
  }
}