import { Controller, Param, QueryParam, BodyParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { Demo } from '../entity/demo'
import { getManager } from 'typeorm'
import { BaseController } from '../common/baseController'
import { NotFound } from 'ts-httpexceptions'

@Controller()
export class DemoController extends BaseController {

  @Get('/demos')
  async index(
    @QueryParam('id') id: number,
    @QueryParam('title') title: string,
    @QueryParam('created_at_start') created_at_start: any,
    @QueryParam('created_at_end') created_at_end: any,
    @QueryParam('order') order: string,
    @QueryParam('pagination') pagination: boolean,
    @QueryParam('page') page: number,
    @QueryParam('size') size: number
  ) {
    let sql = getManager().createQueryBuilder(Demo, 'demo')
    if (id) sql = sql.where('demo.id = :id', { id: id })
    if (title) sql = sql.where('demo.title like :title', { title: '%' + title + '%' })
    if (created_at_start) sql = sql.andWhere('created_at BETWEEN :startDate AND :endDate', super.getDateDuration(created_at_start, created_at_end))
    if (order) {
      let orderObj : {} = super.getSort(order)
      sql = sql.orderBy(orderObj)
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
  async show(
    @Param('id') id: number
  ) {
    const demo = await super.exists(Demo, { id: id })
    return demo
  }

  @Post('/demos')
  async create(
    @BodyParam('title', { required: true }) title: string,
    @BodyParam('text') text: string
  ) {
    const demoRepository = getManager().getRepository(Demo)
    const newDemo = await demoRepository.create({
      title: title,
      text: text || ''
    })
    const result = await demoRepository.save(newDemo)
    return result
  }

  @Put('/demos/:id')
  async update(
    @Param('id') id: number,
    @Body() demo: any
  ) {
    const demoRepository = getManager().createQueryBuilder(Demo, 'demo')
    await super.exists(Demo, { id: id })
    const result = await demoRepository.update(Demo).set(demo).where('id = :id', { id: id }).execute()
    return result
  }

  @Delete('/demos/:id')
  async remove(
    @Param('id') id: number
  ) {
    const demoRepository = getManager().createQueryBuilder(Demo, 'demo')
    await super.exists(Demo, { id: id })
    const result = await demoRepository.delete().from(Demo).where('id = :id', { id: id }).execute()
    return result
  }
}