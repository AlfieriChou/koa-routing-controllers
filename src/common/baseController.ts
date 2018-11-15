import { getManager } from 'typeorm'
import { NotFound } from 'ts-httpexceptions'

export class BaseController {
  public getSort (options: string): Object {
    const optionsArr: string[] = options.split(',')
    let sortObj: any = {}
    optionsArr.map(item => {
      let field: string = item.startsWith('-') || item.startsWith('+') ? item.substring(1) : item
      sortObj[field] = item.startsWith('-') ? 'desc' : 'asc'
    })
    return (<Object>sortObj)
  }
  public getDateDuration(start?: Date, end?: Date): Object {
    start = new Date(start)
    if (!end) {
      end = new Date(start)
      end.setDate(start.getDate() + 1)
    } else {
      end = new Date(end)
    }
    return {
      startDate: start,
      endDate: end
    }
  }
  public paginate ({ count, page, size }): Object {
    return {
      page: +page,
      size: +size,
      row_count: count,
      page_count: Math.ceil(count / size)
    }
  }
  public async exists (model: any, options: Object): Promise<Object> {
    const demoRepository = getManager().getRepository(model)
    const exist: any = await demoRepository.findOne(options)
    if (!exist) throw new NotFound('该信息不存在')
    return (<Object>exist)
  }
}
