import { Controller, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { Demo } from '../entity/demo'
import { getManager } from 'typeorm'
import { BaseController } from '../common/baseController'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

@Controller()
export class DemoController extends BaseController {

  @Get('/demos')
  @OpenAPI({ summary: '获取demo信息列表' })
  @ResponseSchema(Demo, {
    isArray: true
  })
  public async index(
    @QueryParam('id') id: number,
    @QueryParam('title') title: string,
    @QueryParam('created_at_start') created_at_start: any,
    @QueryParam('created_at_end') created_at_end: any,
    @QueryParam('order') order: string,
    @QueryParam('pagination') pagination: boolean,
    @QueryParam('page') page: number,
    @QueryParam('size') size: number
  ): Promise<any> {
    let sql = getManager().createQueryBuilder(Demo, 'demo')
    if (id) sql = sql.where('demo.id = :id', { id: id })
    if (title) sql = sql.where('demo.title like :title', { title: '%' + title + '%' })
    if (created_at_start) sql = sql.andWhere('created_at BETWEEN :startDate AND :endDate', super.getDateDuration((<Date>created_at_start), (<Date>created_at_end)))
    if (order) {
      let orderObj : {} = await super.getSort(order)
      sql = sql.orderBy(orderObj)
    }
    if (pagination === true) {
      const count: number = await sql.getCount()
      sql.offset((page - 1) * size).limit(size)
      const result: Object[] = await sql.getMany()
      return {
        result: result,
        paginate: super.paginate({ count, page, size })
      }
    }
    const result: Object[] = await sql.getMany()
    return result
  }

  @Get('/demos/:id')
  @OpenAPI({ summary: '获取demo信息列表' })
  @ResponseSchema(Demo)
  public async show(
    @Param('id') id: number
  ): Promise<Object> {
    const demo: Object = await super.exists(Demo, { id: id })
    return demo
  }

  @Post('/demos')
  @OpenAPI({ summary: '创建demo信息' })
  @ResponseSchema(Demo)
  public async create(
    @Body({ validate: true }) params: Demo
  ): Promise<Object> {
    const demoRepository: any = getManager().getRepository(Demo)
    const newDemo: any = await demoRepository.create({
      title: params.title,
      text: params.text
    })
    const result: Object = await demoRepository.save(newDemo)
    return result
  }

  @Put('/demos/:id')
  @OpenAPI({ summary: '更新demo信息' })
  public async update(
    @Param('id') id: number,
    @Body() demo: any
  ): Promise<Object> {
    const demoRepository: any = getManager().createQueryBuilder(Demo, 'demo')
    await super.exists(Demo, { id: id })
    const result: any = await demoRepository.update(Demo).set((<Object>demo)).where('id = :id', { id: id }).execute()
    return (<Object>result)
  }

  @Delete('/demos/:id')
  @OpenAPI({ summary: '删除demo信息' })
  public async remove(
    @Param('id') id: number
  ): Promise<Object> {
    const demoRepository: any = getManager().createQueryBuilder(Demo, 'demo')
    await super.exists(Demo, { id: id })
    const result: any = await demoRepository.delete().from(Demo).where('id = :id', { id: id }).execute()
    return (<Object>result)
  }
}