import { getManager } from 'typeorm'
import { NotFound } from 'ts-httpexceptions'

export class BaseController {
  getSort (options: string) {
    let optionsArr = options.split(',')
    let sortObj: any = {}
    optionsArr.map(item => {
      let field = item.startsWith('-') || item.startsWith('+') ? item.substring(1) : item
      sortObj[field] = item.startsWith('-') ? 'desc' : 'asc'
    })
    return (<Object>sortObj)
  }
  getDateDuration(start?: Date, end?: Date) {
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
  paginate ({ count, page, size }) {
    return {
      page: +page,
      size: +size,
      row_count: count,
      page_count: Math.ceil(count / size)
    }
  }
  async exists (model: any, options: Object) {
    const demoRepository = getManager().getRepository(model)
    const exist = await demoRepository.findOne(options)
    if (!exist) throw new NotFound('该信息不存在')
    return exist
  }
}
